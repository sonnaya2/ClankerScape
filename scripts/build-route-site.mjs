import { mkdir, readFile, rm, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const taskFile = path.join(root, 'data/equilibrium-tasks.snapshot.json');
const planFile = path.join(root, 'data/route-plan.json');
const noteFile = path.join(root, 'data/route-notes.json');
const outDir = path.join(root, '_site');

const tasksDoc = JSON.parse(await readFile(taskFile, 'utf8'));
const plan = JSON.parse(await readFile(planFile, 'utf8'));
const routeNotes = JSON.parse(await readFile(noteFile, 'utf8'));

function invariant(ok, message) { if (!ok) throw new Error(`Route site build blocked: ${message}`); }
invariant(tasksDoc.source.revision === plan.sourceRevision, `task revision moved from ${plan.sourceRevision} to ${tasksDoc.source.revision}; re-audit route before publishing`);
invariant(tasksDoc.coverage.observedTasks === plan.sourceObservedTasks, 'observed task count changed; re-audit route');
invariant(tasksDoc.coverage.observedPoints === plan.sourceObservedPoints, 'observed point total changed; re-audit route');
invariant(tasksDoc.coverage.status === 'partial' && tasksDoc.coverage.reconciled === false, 'route seed expects the current Easy/Medium-only snapshot');

const taskById = new Map(tasksDoc.tasks.map(task => [task.wikiTaskId, task]));
function task(id) { const value = taskById.get(id); invariant(value, `missing wiki task ${id}`); return value; }
function esc(value='') { return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;'); }
function slug(value) { return String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
function maxNumber(text='') { return Math.max(0, ...[...String(text).matchAll(/\b\d+\b/g)].map(match => Number(match[0]))); }
function friction(row) {
  const name = row.name.toLowerCase();
  const req = (row.requirements || '').toLowerCase();
  let value = maxNumber(req) * 0.6 + (row.points === 10 ? -15 : -5);
  for (const [needle, weight] of [['complete 25',60],['complete 75',100],['complete 100',120],['200 times',50],['1,000',70],['diary',45],['clue',45],['runesphere',50],['geodes',50],['25 times',60],['quest:',15],['level 60',35],['level 50',25],['level 40',15]]) if (name.includes(needle)) value += weight;
  if (!req) value -= 10;
  return value;
}
function unsafeBeforeAsgarnia(row) {
  const text = `${row.name} ${row.requirements || ''}`.toLowerCase();
  return plan.unsafeBeforeAsgarnia.some(value => text.includes(value));
}

const opening = [...plan.first50, ...plan.karamja, ...plan.mid, ...plan.toT3, ...plan.to175];
invariant(opening.length === 175 && new Set(opening).size === 175, 'opening route IDs are not exactly 175 unique tasks');

const used175 = new Set(opening);
const beforeAsgarniaLocalities = new Set(['Global','Misthalin','Havenhythe','Karamja','Desert']);
const candidates = tasksDoc.tasks
  .filter(row => beforeAsgarniaLocalities.has(row.locality) && !used175.has(row.wikiTaskId) && !unsafeBeforeAsgarnia(row))
  .map(row => ({...row, routeScore: friction(row) - (row.locality === 'Desert' ? 8 : 0)}));
const selected = new Set(candidates.sort((a,b) => a.routeScore-b.routeScore || b.points-a.points).slice(0,125).map(row => row.wikiTaskId));
const desert = plan.desertPriority.filter(id => selected.has(id));
const localityOrder = new Map([['Global',1],['Misthalin',2],['Havenhythe',3],['Karamja',4]]);
const remainder = [...selected].filter(id => !desert.includes(id)).sort((a,b) => {
  const A=task(a), B=task(b);
  return (localityOrder.get(A.locality) ?? 9) - (localityOrder.get(B.locality) ?? 9) || friction(A)-friction(B) || B.points-A.points || a-b;
});
const to300 = [...desert, ...remainder];
invariant(to300.length === 125, '175→300 route no longer resolves to 125 tasks');

const route325 = [...opening, ...to300, ...plan.asgarnia];
invariant(route325.length === 325 && new Set(route325).size === 325, 'route through Asgarnia is not 325 unique tasks');
const chosenPublished = new Set(['Global','Misthalin','Havenhythe','Karamja','Desert','Asgarnia']);
const used325 = new Set(route325);
const trailing = tasksDoc.tasks.filter(row => chosenPublished.has(row.locality) && !used325.has(row.wikiTaskId)).sort((a,b) => {
  const order = new Map([['Global',0],['Misthalin',1],['Havenhythe',2],['Karamja',3],['Desert',4],['Asgarnia',5]]);
  return (order.get(a.locality)??9)-(order.get(b.locality)??9) || friction(a)-friction(b) || b.points-a.points || a.wikiTaskId-b.wikiTaskId;
}).map(row => row.wikiTaskId);
invariant(trailing.length === 67, `expected 67 remaining published rows, got ${trailing.length}`);
const route = [...route325, ...trailing];
invariant(route.length === 392 && new Set(route).size === 392, 'published route ceiling must be 392 unique rows');

const phases = [
  [1,50,'01','Lumbridge opener','Misthalin','Get Karamja unlocked without leaving a dense local loop.'],
  [51,65,'02','Karamja cash + clockwise sweep','Karamja','Stronghold cash first, then one island pass. T2 lands at the end.'],
  [66,112,'03','Draynor → Um → Varrock → Fort','Misthalin','Build Necromancy, travel, cashable skilling thresholds and T3.'],
  [113,175,'04','Havenhythe + starting-region closeout','Havenhythe / Misthalin','Use Voidwalker and finish cheap starting-region tasks until the first elective.'],
  [176,218,'05','Desert first pass','Desert','Do the newly unlocked locality in one sweep; carry 1,000 coins for the carpet.'],
  [219,300,'06','T4 climb → 300 tasks','Global / starting regions','Crystal Grace comes online, then finish the cheapest published rows to the second elective.'],
  [301,325,'07','Asgarnia infrastructure','Asgarnia','Falador, Taverley, Mining Guild and first-kill combat. T5 lands on this sweep.'],
  [326,392,'08','Published backlog','Chosen regions','Consume the remaining published Easy/Medium rows only as requirements become legal.'],
];

const milestones = new Map([[1,'T1 · Golden Touch'],[50,'Karamja unlocked'],[65,'T2 · Animal Wrangler'],[112,'T3 · Voidwalker'],[175,'Desert unlocked'],[218,'T4 · Crystal Grace'],[300,'Asgarnia unlocked'],[325,'T5 · Production Master']]);
let cumulative = 0;
const records = route.map((id,index) => { const row=task(id); cumulative += row.points; return {n:index+1,row,cumulative}; });
invariant(records.at(-1).cumulative === 7920, `published route should total 7,920 points, got ${records.at(-1).cumulative}`);

function prepRows(n) {
  return (routeNotes.prepBefore[String(n)] || []).map(item => `<div class="prep-row"><span class="step-mark">${esc(item.label)}</span><p>${esc(item.text)}</p></div>`).join('');
}
function taskRow(record) {
  const {n,row,cumulative}=record;
  const note=routeNotes.notes[String(row.wikiTaskId)] || '';
  const milestone=milestones.get(n);
  return `${prepRows(n)}<article class="route-task region-${slug(row.locality)}${milestone?' milestone-task':''}">
<div class="task-no"><small>task</small><strong>${String(n).padStart(3,'0')}</strong></div>
<div class="task-main"><h3>${esc(row.name)}</h3>${note?`<p>${esc(note)}</p>`:''}<div class="task-meta"><span>${esc(row.locality)}</span>${row.requirements?`<span>Req: ${esc(row.requirements)}</span>`:''}<span>Wiki #${row.wikiTaskId}</span></div></div>
<div class="task-score"><strong>+${row.points}</strong><small>${cumulative.toLocaleString('en-US')} pts</small></div>${milestone?`<div class="milestone-label">${esc(milestone)}</div>`:''}</article>`;
}
function phase([start,end,number,title,place,description]) {
  return `<section class="route-phase" id="phase-${number}"><header class="phase-head"><div><span>Phase ${number}</span><h2>${esc(title)}</h2><p>${esc(description)}</p></div><strong>${start}–${end}</strong></header><div class="phase-place">${esc(place)}</div><div class="route-list">${records.slice(start-1,end).map(taskRow).join('')}</div></section>`;
}

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#071012"><meta name="description" content="ClankerScape: literal step-by-step RS3 Equilibrium route to Dragon."><title>ClankerScape — Dragon route sheet</title><link rel="icon" href="./favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="./styles.css"><link rel="stylesheet" href="./route-sheet.css"></head><body>
<header class="masthead"><div class="masthead-inner"><a class="brand" href="#top">ClankerScape</a><div class="route-lock"><small>LOCKED ROUTE</small><strong>Desert → Asgarnia → Anachronia</strong></div><div class="target"><small>DRAGON</small><strong>48,000</strong></div></div></header>
<main id="top"><section class="route-summary"><div><span>Relics</span><strong>${plan.relics.map(esc).join(' → ')}</strong></div><div><span>Combat</span><strong>Necromancy first · Magic after Crystal Grace</strong></div><div><span>Blessings</span><strong>${plan.blessings.map(esc).join(' → ')}</strong></div></section>
<section class="route-crests" aria-label="Region route">
  <div><img src="https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/regions/misthalin.webp" alt=""><small>Start</small><strong>Misthalin</strong></div>
  <div><img src="https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/regions/havenhythe.webp" alt=""><small>Start</small><strong>Havenhythe</strong></div>
  <div><img src="https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/regions/karamja.webp" alt=""><small>50</small><strong>Karamja</strong></div>
  <div class="chosen"><img src="https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/regions/desert.webp" alt=""><small>175</small><strong>Desert</strong></div>
  <div class="chosen"><img src="https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/regions/asgarnia.webp" alt=""><small>300</small><strong>Asgarnia</strong></div>
  <div class="chosen"><img src="https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/regions/anachronia.webp" alt=""><small>450</small><strong>Anachronia</strong></div>
</section>
<nav class="phase-nav" aria-label="Route jumps"><a href="#phase-01">1–50</a><a href="#phase-02">Karamja</a><a href="#phase-03">Um / Varrock</a><a href="#phase-04">175</a><a href="#phase-05">Desert</a><a href="#phase-07">Asgarnia</a><a href="#source-gap">Gap</a></nav>
<section class="route-intro"><h1>Do this. In this order.</h1><p>Task numbers below are completed-task count. Prep rows do not add a task. Requirements come from the current canonical Easy/Medium snapshot; the walkthrough stops where the source stops.</p></section>
${phases.map(phase).join('\n')}
${prepRows(393)}<section class="source-gap" id="source-gap"><div class="gap-number">393 → 450</div><div><span>ROUTE PAUSES HERE</span><h2>58 task slots are not published yet.</h2><p>Jagex has published the full Easy/Medium list, but Hard, Elite and Master are still withheld until immediately before launch. The selected six-region path has 392 currently published rows. I am not inventing the remaining 58 tasks.</p><p>When those tiers land, this section gets replaced with the literal steps to 450, then Anachronia opens and the route continues to 48,000.</p></div></section>
<section class="future-route"><h2>After the missing tiers publish</h2><div class="future-grid"><div><small>450 tasks</small><strong>Unlock Anachronia</strong><p>Do the local arrival/base-camp cluster first, then use Animal Wrangler overlap for BGH/Farming/Hunter points.</p></div><div><small>12,000 points</small><strong>Rejuvenated + Devout</strong><p>Take Devout as the extra earlier-tier relic. Ordinary relics are not resettable.</p></div><div><small>20,000 points</small><strong>Infernal Fire</strong><p>Use the final combat package for first clears and short high-value boss/mastery clusters.</p></div><div><small>Finish</small><strong>48,000</strong><p>After 450, stop caring about task count. Take the shortest reliable 80/200/400-point clusters and keep roughly 4,000 easy points in reserve until Dragon is locked.</p></div></div></section>
<footer><p>Current task snapshot: revision ${tasksDoc.source.revision} · ${tasksDoc.coverage.observedTasks} Easy/Medium rows · ${tasksDoc.coverage.observedPoints.toLocaleString('en-US')} published points. Public route uses no editable state.</p><div><a href="https://secure.runescape.com/m=news/leagues-equilibrium-reveals---releasing-august-10th">Jagex League reveal ↗</a><a href="https://runescape.wiki/w/Equilibrium_League/Tasks">Equilibrium task list ↗</a></div></footer></main></body></html>`;

await rm(outDir,{recursive:true,force:true});
await mkdir(outDir,{recursive:true});
await writeFile(path.join(outDir,'index.html'),html);
await copyFile(path.join(root,'styles.css'),path.join(outDir,'styles.css'));
await copyFile(path.join(root,'route-sheet.css'),path.join(outDir,'route-sheet.css'));
await copyFile(path.join(root,'favicon.svg'),path.join(outDir,'favicon.svg'));
await writeFile(path.join(outDir,'.nojekyll'),'');
console.log(`Built ${records.length} route tasks through ${records.at(-1).cumulative.toLocaleString('en-US')} points from Wiki revision ${tasksDoc.source.revision}`);
