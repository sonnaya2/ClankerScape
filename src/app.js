import {
  PERKFECTION_PRESETS,
  bestRejuvenatedCandidate,
  calculatePerkfectionSavings,
  evaluateTierSixDecision,
  finiteNonNegative,
} from './domain/perkfection.js';
import {
  BLESSING_PATHS,
  MAX_BLESSING_RESETS,
  createBlessingState,
  currentBlessingEpoch,
  godTierAlignments,
  resetBlessingProgression,
  setBlessingPick,
} from './domain/blessings.js';
import {
  completedTaskTotals,
  electiveSelectionValid,
  nextQueueAction,
  nextRegionGate,
  regionProjection,
  routeCoverage,
  taskStateFor,
  theoreticalSelectedPool,
} from './domain/route.js';

const STORAGE_KEY = 'clankerscape:v1';
const STATE_VERSION = 1;
const app = document.querySelector('#app');
const header = document.querySelector('#topbar-state');
const importInput = document.querySelector('#import-progress');
const taskDialog = document.querySelector('#task-dialog');
const taskDialogBody = document.querySelector('#task-dialog-body');

const defaultPerkInputs = { ...PERKFECTION_PRESETS.balanced };
const TASK_ROUTES = Object.freeze([
  ['unclassified', 'Not planned'],
  ['immediate-skilling', 'Skill now'],
  ['immediate-pvm', 'PvM now'],
  ['deep-skilling', 'Skill later'],
  ['deep-pvm', 'PvM later'],
  ['reserve', 'Spare'],
  ['skip', 'Skip'],
]);
const TASK_ROUTE_VALUES = new Set(TASK_ROUTES.map(([value]) => value));
const TASK_ROUTE_LABELS = new Map(TASK_ROUTES);

function defaultState() {
  return {
    version: STATE_VERSION,
    activeTab: 'route',
    points: 0,
    completedTasks: 0,
    electedRegions: [],
    routeBankFilter: 'all',
    routeSearch: '',
    taskState: {},
    relicSelections: {},
    rejuvenatedSavings: {},
    rejuvenatedCandidate: null,
    perkInputs: { ...defaultPerkInputs },
    regionInputs: {},
    blessing: createBlessingState(),
    reserveTarget: 4000,
  };
}

let facts = null;
let snapshot = null;
let state = defaultState();
let loadError = null;
let storageAvailable = true;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function safeUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '#';
  } catch {
    return '#';
  }
}

function titleCase(value) {
  const text = String(value ?? '');
  return text ? text[0].toUpperCase() + text.slice(1) : '';
}

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(Number(value) || 0);
}

function formatMinutes(value) {
  const minutes = finiteNonNegative(value);
  if (minutes < 60) return `${formatNumber(minutes, 1)}m`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes - hours * 60;
  return remainder < 0.1 ? `${hours}h` : `${hours}h ${formatNumber(remainder, 0)}m`;
}

function percent(value, total) {
  const numerator = Number(value);
  const denominator = Number(total);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) return 0;
  return Math.max(0, Math.min(100, (numerator / denominator) * 100));
}

function taskRoute(taskState) {
  return taskState.deferred ? 'skip' : taskState.bank;
}

function taskRouteLabel(taskState) {
  return TASK_ROUTE_LABELS.get(taskRoute(taskState)) ?? 'Not planned';
}

function normaliseBlessingState(value) {
  const fallback = createBlessingState();
  if (!value || !Array.isArray(value.epochs)) return fallback;
  const epochs = value.epochs
    .filter((epoch) => epoch && Array.isArray(epoch.picks))
    .map((epoch, index) => ({
      id: Number.isInteger(epoch.id) ? epoch.id : index + 1,
      createdAt: typeof epoch.createdAt === 'string' ? epoch.createdAt : null,
      ...(typeof epoch.closedAt === 'string' ? { closedAt: epoch.closedAt } : {}),
      picks: Array.from({ length: 6 }, (_, pickIndex) => {
        const pick = epoch.picks[pickIndex];
        return BLESSING_PATHS.includes(pick) ? pick : null;
      }),
    }));
  return {
    resetsUsed: Math.min(MAX_BLESSING_RESETS, Math.max(0, Number(value.resetsUsed) || 0)),
    epochs: epochs.length ? epochs : fallback.epochs,
  };
}

function normaliseState(value) {
  const base = defaultState();
  if (!value || typeof value !== 'object') return base;
  const electedRegions = Array.isArray(value.electedRegions)
    ? [...new Set(value.electedRegions.filter((id) => typeof id === 'string'))].slice(0, 3)
    : [];
  return {
    ...base,
    activeTab: ['route', 'relics', 'regions', 'blessings'].includes(value.activeTab)
      ? value.activeTab
      : base.activeTab,
    points: finiteNonNegative(value.points),
    completedTasks: finiteNonNegative(value.completedTasks),
    electedRegions,
    routeBankFilter: value.routeBankFilter === 'all' || TASK_ROUTE_VALUES.has(value.routeBankFilter)
      ? value.routeBankFilter
      : 'all',
    routeSearch: typeof value.routeSearch === 'string' ? value.routeSearch.slice(0, 100) : '',
    taskState: value.taskState && typeof value.taskState === 'object' ? value.taskState : {},
    relicSelections: value.relicSelections && typeof value.relicSelections === 'object'
      ? value.relicSelections
      : {},
    rejuvenatedSavings: value.rejuvenatedSavings && typeof value.rejuvenatedSavings === 'object'
      ? value.rejuvenatedSavings
      : {},
    rejuvenatedCandidate: typeof value.rejuvenatedCandidate === 'string'
      ? value.rejuvenatedCandidate
      : null,
    perkInputs: {
      ...base.perkInputs,
      ...(value.perkInputs && typeof value.perkInputs === 'object' ? value.perkInputs : {}),
    },
    regionInputs: value.regionInputs && typeof value.regionInputs === 'object' ? value.regionInputs : {},
    blessing: normaliseBlessingState(value.blessing),
    reserveTarget: finiteNonNegative(value.reserveTarget, 4000),
  };
}

function loadLocalState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = normaliseState(JSON.parse(raw));
  } catch {
    storageAvailable = false;
    state = defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
}

function updateState(mutator, { render = true } = {}) {
  const next = mutator(structuredClone(state));
  state = normaliseState(next ?? state);
  saveState();
  if (render) renderApp();
}

async function loadData() {
  const [factsResponse, tasksResponse] = await Promise.all([
    fetch('./data/league-facts.json', { cache: 'no-store' }),
    fetch('./data/equilibrium-tasks.snapshot.json', { cache: 'no-store' }),
  ]);
  if (!factsResponse.ok) throw new Error(`League facts returned HTTP ${factsResponse.status}`);
  if (!tasksResponse.ok) throw new Error(`Task list returned HTTP ${tasksResponse.status}`);
  facts = await factsResponse.json();
  snapshot = await tasksResponse.json();
}

function currentTotals() {
  const sourced = completedTaskTotals(snapshot?.tasks ?? [], state);
  return {
    points: Math.max(state.points, sourced.points),
    tasks: Math.max(state.completedTasks, sourced.tasksCompleted),
  };
}

function nextRelicThreshold(points) {
  return facts.relicThresholds.find((entry) => points < entry.points) ?? null;
}

function relicThresholdForTier(tier) {
  return facts.relicThresholds.find((entry) => entry.tier === tier)?.points ?? null;
}

function blessingThresholdForSlot(slot) {
  return facts.blessingThresholds.find((entry) => entry.progressionSlot === slot)?.tasks ?? null;
}

function missingTaskTiers() {
  const all = ['easy', 'medium', 'hard', 'elite', 'master'];
  const observed = new Set(snapshot.coverage?.observedTiers ?? []);
  return all.filter((tier) => !observed.has(tier));
}

function renderTabs() {
  const tabs = [
    ['route', 'Route'],
    ['relics', 'Relics'],
    ['regions', 'Regions'],
    ['blessings', 'Blessings'],
  ];
  return `<nav class="main-tabs" role="tablist" aria-label="ClankerScape sections">${tabs.map(([id, label]) => {
    const active = state.activeTab === id;
    return `<button type="button" id="tab-${id}" role="tab" aria-selected="${active}" aria-controls="panel-${id}" tabindex="${active ? '0' : '-1'}" class="main-tab ${active ? 'is-active' : ''}" data-tab="${id}">${label}</button>`;
  }).join('')}</nav>`;
}

function renderHeader() {
  const totals = currentTotals();
  const progress = percent(totals.points, facts.target.points);
  const region = nextRegionGate(totals.tasks);
  const regionCopy = region ? `${Math.max(0, region.tasks - totals.tasks)} tasks to ${region.label}` : 'All regions open';
  header.innerHTML = `
    <div class="brand-lockup">
      <span class="brand-seal" aria-hidden="true">CS</span>
      <span class="brand-copy"><strong>ClankerScape</strong><small>Equilibrium</small></span>
    </div>
    ${renderTabs()}
    <div class="score-strip">
      <label><span>Points</span><input type="number" min="0" max="109380" step="10" value="${totals.points}" data-state-field="points" aria-label="Current League points"></label>
      <b>/ 48,000</b>
      <label><span>Tasks</span><input type="number" min="0" max="1152" step="1" value="${totals.tasks}" data-state-field="completedTasks" aria-label="Completed League tasks"></label>
      <em>${escapeHtml(regionCopy)}</em>
      <span class="score-progress" role="progressbar" aria-label="Dragon point progress" aria-valuemin="0" aria-valuemax="48000" aria-valuenow="${Math.min(facts.target.points, totals.points)}"><i style="width:${progress.toFixed(2)}%"></i></span>
    </div>
    <details class="file-menu">
      <summary>Save</summary>
      <div>
        <button type="button" data-action="export">Export</button>
        <button type="button" data-action="import">Import</button>
        <button type="button" class="danger-link" data-action="reset-state">Clear</button>
        <small>${storageAvailable ? 'Saved here' : 'Not saved'}</small>
      </div>
    </details>`;
}

function renderCoverageBanner() {
  const coverage = snapshot.coverage ?? {};
  const wikiUrl = facts.sources?.['wiki-tasks']?.url ?? snapshot.source?.url;
  if (coverage.status === 'full' && coverage.reconciled) {
    return `<div class="coverage-banner is-ready"><b>All 1,152 Wiki tasks loaded.</b><a href="${safeUrl(wikiUrl)}" target="_blank" rel="noopener noreferrer">Wiki</a></div>`;
  }
  if ((snapshot.tasks ?? []).length) {
    const missing = missingTaskTiers().map(titleCase).join(', ');
    return `<div class="coverage-banner"><b>${formatNumber(coverage.observedTasks)} / 1,152 Wiki tasks loaded</b><span>${missing || 'More tiers'} missing, so this is not the final route.</span><a href="${safeUrl(wikiUrl)}" target="_blank" rel="noopener noreferrer">Wiki</a></div>`;
  }
  return `<div class="coverage-banner is-empty"><b>No tasks loaded.</b><a href="${safeUrl(wikiUrl)}" target="_blank" rel="noopener noreferrer">Open Wiki</a></div>`;
}

function taskRouteOptions(selected) {
  return TASK_ROUTES.map(([value, label]) => `<option value="${value}" ${selected === value ? 'selected' : ''}>${label}</option>`).join('');
}

function taskRows(tasks) {
  return tasks.map((task) => {
    const taskState = taskStateFor(state, task.id);
    const route = taskRoute(taskState);
    const locality = task.locality ?? task.localityKey ?? 'Unmapped';
    return `<tr class="task-row ${taskState.complete ? 'is-complete' : ''} ${route === 'skip' ? 'is-skipped' : ''}">
      <td class="task-done"><input type="checkbox" ${taskState.complete ? 'checked' : ''} data-task-complete="${escapeHtml(task.id)}" aria-label="Mark ${escapeHtml(task.name)} complete"></td>
      <td class="task-name"><button type="button" data-open-task="${escapeHtml(task.id)}">${escapeHtml(task.name)}</button><small>${escapeHtml(titleCase(task.tier))}</small></td>
      <td class="task-area" data-label="Area">${escapeHtml(locality)}</td>
      <td class="task-points" data-label="Pts">${formatNumber(task.points)}</td>
      <td class="task-route" data-label="Plan"><select data-task-route="${escapeHtml(task.id)}" aria-label="Plan for ${escapeHtml(task.name)}">${taskRouteOptions(route)}</select></td>
    </tr>`;
  }).join('');
}

function filteredTasks() {
  const search = state.routeSearch.trim().toLowerCase();
  const routeFilter = state.routeBankFilter;
  return (snapshot.tasks ?? [])
    .filter((task) => {
      const taskState = taskStateFor(state, task.id);
      if (routeFilter !== 'all' && taskRoute(taskState) !== routeFilter) return false;
      if (!search) return true;
      return [task.name, task.description, task.requirements, task.locality, task.localityKey]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search));
    })
    .sort((a, b) => {
      const aState = taskStateFor(state, a.id);
      const bState = taskStateFor(state, b.id);
      if (aState.complete !== bState.complete) return aState.complete ? 1 : -1;
      if (aState.deferred !== bState.deferred) return aState.deferred ? 1 : -1;
      const aMinutes = Number(aState.minutes);
      const bMinutes = Number(bState.minutes);
      const aRate = Number.isFinite(aMinutes) && aMinutes > 0 ? a.points / aMinutes : -1;
      const bRate = Number.isFinite(bMinutes) && bMinutes > 0 ? b.points / bMinutes : -1;
      return bRate - aRate || b.points - a.points || a.name.localeCompare(b.name);
    });
}

function renderNextTasks() {
  const tasks = snapshot.tasks ?? [];
  const choices = [
    ['Skill now', nextQueueAction(tasks, state, 'skilling')],
    ['PvM now', nextQueueAction(tasks, state, 'pvm')],
  ].filter(([, entry]) => entry);
  if (!choices.length) return '';
  return `<div class="next-tasks">${choices.map(([label, entry]) => `<div><span>${label}</span><button type="button" data-open-task="${escapeHtml(entry.task.id)}">${escapeHtml(entry.task.name)}</button><b>${formatNumber(entry.task.points)} pts${entry.state.minutes ? ` · ${formatMinutes(entry.state.minutes)}` : ''}</b></div>`).join('')}</div>`;
}

function renderRouteGates() {
  const totals = currentTotals();
  const coverage = routeCoverage(snapshot.tasks ?? [], state);
  const region = nextRegionGate(totals.tasks);
  const relic = nextRelicThreshold(totals.points);
  return `<div class="route-gates">
    <span><small>Region</small><b>${region ? `${Math.max(0, region.tasks - totals.tasks)} tasks to ${escapeHtml(region.label)}` : 'All open'}</b></span>
    <span><small>Relic</small><b>${relic ? `${formatNumber(Math.max(0, relic.points - totals.points))} pts to T${relic.tier}` : 'Tier 7 reached'}</b></span>
    <label><small>Spare points</small><b>${formatNumber(coverage.reserve.points)} /</b><input type="number" min="0" step="100" value="${state.reserveTarget}" data-state-field="reserveTarget" aria-label="Spare point target"></label>
  </div>`;
}

function renderRoute() {
  const tasks = filteredTasks();
  const shown = tasks.slice(0, 40);
  const hasTasks = (snapshot.tasks ?? []).length > 0;
  const filterOptions = [`<option value="all">All</option>`, ...TASK_ROUTES.map(([value, label]) => `<option value="${value}" ${state.routeBankFilter === value ? 'selected' : ''}>${label}</option>`)].join('');
  return `<section id="panel-route" class="page route-page" role="tabpanel" aria-labelledby="tab-route" tabindex="0">
    ${renderCoverageBanner()}
    ${renderNextTasks()}
    ${renderRouteGates()}
    <section class="task-sheet">
      <header class="task-toolbar">
        <div><h1>Tasks</h1></div>
        <div class="task-controls">
          <label><span>Show</span><select data-route-filter="bank">${filterOptions}</select></label>
          <label class="task-search"><span>Find</span><input type="search" value="${escapeHtml(state.routeSearch)}" placeholder="Task or area" data-route-filter="search"></label>
        </div>
      </header>
      ${hasTasks ? `<div class="table-scroll"><table class="route-table"><thead><tr><th aria-label="Done"></th><th>Task</th><th>Area</th><th>Pts</th><th>Plan</th></tr></thead><tbody>${taskRows(shown)}</tbody></table></div><footer class="sheet-foot"><span>${formatNumber(shown.length)} shown</span><span>${formatNumber(tasks.length)} match</span></footer>` : `<div class="empty-table"><b>No task list yet.</b><a href="${safeUrl(facts.sources?.['wiki-tasks']?.url)}" target="_blank" rel="noopener noreferrer">Open Wiki</a></div>`}
    </section>
  </section>`;
}

function relicSelection(tier) {
  return state.relicSelections[String(tier)] ?? null;
}

function relicChoicesForTier(tier) {
  return facts.relics.filter((relic) => relic.tier === tier).map((relic) => {
    const selected = relicSelection(tier) === relic.id;
    return `<article class="relic-choice ${selected ? 'is-selected' : ''}">
      <button type="button" class="relic-pick" data-relic-select="${relic.id}" data-relic-tier="${tier}" aria-pressed="${selected}">
        <span><b>${escapeHtml(relic.name)}</b><small>${escapeHtml(relic.summary)}</small></span>
        <i aria-hidden="true">${selected ? '✓' : ''}</i>
      </button>
      <details><summary>Effects</summary><ul>${relic.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul></details>
    </article>`;
  }).join('');
}

function missedRelics() {
  return facts.relics.filter((relic) => relic.tier <= 5 && relicSelection(relic.tier) !== relic.id);
}

function currentRejuvenatedCandidate() {
  const candidates = missedRelics();
  const requested = candidates.find((relic) => relic.id === state.rejuvenatedCandidate);
  const best = bestRejuvenatedCandidate(candidates, state.rejuvenatedSavings);
  return requested ?? best ?? candidates[0] ?? null;
}

function calcField(label, key, suffix = 'min') {
  return `<label class="calc-field"><span>${label}</span><input type="number" min="0" step="0.5" value="${state.perkInputs[key] ?? 0}" data-perk-input="${key}"><b>${suffix}</b></label>`;
}

function calcPair(label, withoutKey, withKey) {
  return `<div class="calc-pair"><span>${label}</span><input type="number" min="0" step="1" value="${state.perkInputs[withoutKey]}" data-perk-input="${withoutKey}" aria-label="${label} without Perkfection"><input type="number" min="0" step="1" value="${state.perkInputs[withKey]}" data-perk-input="${withKey}" aria-label="${label} with Perkfection"></div>`;
}

function tierSixResult() {
  const calculation = calculatePerkfectionSavings(state.perkInputs);
  const best = bestRejuvenatedCandidate(missedRelics(), state.rejuvenatedSavings);
  const decision = best
    ? evaluateTierSixDecision({
        perkfectionSavedMinutes: calculation.totalSaved,
        perkfectionUncertaintyMinutes: state.perkInputs.perkfectionUncertaintyMinutes,
        rejuvenatedSavedMinutes: best.minutesSaved,
        rejuvenatedUncertaintyMinutes: state.perkInputs.rejuvenatedUncertaintyMinutes,
        remainingRouteMinutes: state.perkInputs.remainingRouteMinutes,
      })
    : {
        winner: null,
        status: 'unscored',
        margin: Math.max(30, finiteNonNegative(state.perkInputs.remainingRouteMinutes) * 0.03),
        perkRange: [
          Math.max(0, calculation.totalSaved - finiteNonNegative(state.perkInputs.perkfectionUncertaintyMinutes)),
          calculation.totalSaved + finiteNonNegative(state.perkInputs.perkfectionUncertaintyMinutes),
        ],
        rejuvenatedRange: [0, 0],
      };
  return { calculation, best, decision };
}

function renderPerkfectionCalculator() {
  const { calculation, best, decision } = tierSixResult();
  const candidate = currentRejuvenatedCandidate();
  const candidates = missedRelics();
  const priced = candidates.filter((relic) => finiteNonNegative(state.rejuvenatedSavings[relic.id]) > 0).length;
  let pick = 'Too close';
  let note = 'The ranges overlap.';
  if (decision.status === 'unscored') {
    pick = 'No comparison yet';
    note = 'Add a time for one missed relic.';
  } else if (decision.winner === 'perkfection') {
    pick = 'Perkfection';
    note = 'Clear lead.';
  } else if (decision.winner === 'rejuvenated') {
    pick = best?.name ?? 'Extra relic';
    note = 'Clear lead.';
  }
  const candidateOptions = candidates.map((relic) => `<option value="${relic.id}" ${candidate?.id === relic.id ? 'selected' : ''}>T${relic.tier} · ${escapeHtml(relic.name)}</option>`).join('');
  return `<section class="t6-sheet">
    <header><div><small>Tier 6</small><h2>Perkfection or one extra relic</h2></div><div class="preset-buttons">${Object.keys(PERKFECTION_PRESETS).map((id) => `<button type="button" data-perk-preset="${id}">${id === 'balanced' ? 'Mixed' : titleCase(id)}</button>`).join('')}</div></header>
    <div class="t6-result">
      <span><small>Current result</small><b>${escapeHtml(pick)}</b><em>${escapeHtml(note)}</em></span>
      <span><small>Perkfection</small><b>${formatMinutes(calculation.totalSaved)}</b></span>
      <span><small>Best extra relic</small><b>${best ? `${escapeHtml(best.name)} · ${formatMinutes(best.minutesSaved)}` : '—'}</b></span>
    </div>
    <details class="t6-edit"><summary>Compare them</summary><div class="t6-grid"><div class="perk-times">
      ${calcField('Route left', 'remainingRouteMinutes')}
      <div class="calc-head"><span></span><b>Without</b><b>With</b></div>
      ${calcPair('Setup & materials', 'setupWithout', 'setupWith')}
      ${calcPair('Machines', 'machinesWithout', 'machinesWith')}
      ${calcPair('Charges', 'chargeWithout', 'chargeWith')}
      ${calcPair('Bench travel', 'travelWithout', 'travelWith')}
      ${calcField('Combat left', 'augmentedCombatMinutes')}
      <details class="more-times"><summary>More inputs</summary>
        ${calcField('Extra gizmos', 'extraGizmoThroughputPercent', '%')}
        ${calcField('Affected proc share', 'helpfulPerkContributionPercent', '%')}
        ${calcField('Perkfection ±', 'perkfectionUncertaintyMinutes')}
        ${calcField('Extra relic ±', 'rejuvenatedUncertaintyMinutes')}
      </details>
    </div><section class="extra-relic-times"><h3>Extra relic</h3>${candidate ? `
      <label><span>Relic</span><select data-rejuvenated-candidate>${candidateOptions}</select></label>
      <label><span>Time saved</span><span class="minute-entry"><input type="number" min="0" step="5" value="${finiteNonNegative(state.rejuvenatedSavings[candidate.id]) || ''}" placeholder="—" data-rejuvenated-saving="${candidate.id}"><b>min</b></span></label>
      <small>${priced} priced · the best value is used</small>` : '<p>Pick relics from tiers 1–5 first.</p>'}</section><dl>
      <div><dt>Setup</dt><dd>${formatMinutes(calculation.setupSaved)}</dd></div>
      <div><dt>Machines</dt><dd>${formatMinutes(calculation.machineSaved)}</dd></div>
      <div><dt>Charges</dt><dd>${formatMinutes(calculation.chargeSaved)}</dd></div>
      <div><dt>Travel</dt><dd>${formatMinutes(calculation.travelSaved)}</dd></div>
      <div><dt>Combat</dt><dd>${formatMinutes(calculation.combatSaved)}</dd></div>
      <div><dt>Required lead</dt><dd>${formatMinutes(decision.margin)}</dd></div>
      <div><dt>Perkfection range</dt><dd>${formatMinutes(decision.perkRange[0])}–${formatMinutes(decision.perkRange[1])}</dd></div>
      <div><dt>Extra relic range</dt><dd>${formatMinutes(decision.rejuvenatedRange[0])}–${formatMinutes(decision.rejuvenatedRange[1])}</dd></div>
    </dl></div><p>The 20% proc line only affects those perks. Idle machines save no time.</p></details>
  </section>`;
}

function renderRelicTier(tier) {
  const threshold = relicThresholdForTier(tier);
  return `<section class="relic-tier"><header><b>T${tier}</b><span>${threshold === null ? '' : `${formatNumber(threshold)} pts`}</span></header><div>${relicChoicesForTier(tier)}</div></section>`;
}

function renderRelics() {
  return `<section id="panel-relics" class="page relic-page" role="tabpanel" aria-labelledby="tab-relics" tabindex="0">
    <header class="page-heading"><h1>Relics</h1><p>Relics do not reset.</p></header>
    <div class="relic-list">${[1, 2, 3, 4, 5].map(renderRelicTier).join('')}</div>
    ${renderPerkfectionCalculator()}
    <div class="relic-list relic-late">${[6, 7].map(renderRelicTier).join('')}</div>
  </section>`;
}

function regionInput(regionId, key) {
  return state.regionInputs[regionId]?.[key] ?? '';
}

function regionAccess(region) {
  if (region.unlock === 'starting') return 'Start';
  if (region.unlock === 'automatic-50-tasks') return '50 tasks';
  if (region.unlock === 'elective') return 'Pick';
  if (region.unlock === 'always') return 'All';
  return titleCase(String(region.unlock).replaceAll('-', ' '));
}

function regionQuestList(region) {
  return `<details class="region-quests"><summary>${region.autoCompletedQuests.length} quests</summary><ul>${region.autoCompletedQuests.map((quest) => `<li>${escapeHtml(quest)}</li>`).join('')}</ul></details>`;
}

function regionEstimate(region, projection) {
  const label = projection.status === 'scored' ? `${formatNumber(projection.pointsPerHour)} pts/hr` : 'Estimate';
  return `<details class="region-estimate"><summary>${label}</summary><div>
    <label><span>Reachable points</span><input type="number" min="0" step="10" value="${regionInput(region.id, 'reachablePoints')}" placeholder="—" data-region-input="${region.id}:reachablePoints"></label>
    <label><span>Typical time</span><span><input type="number" min="0" step="5" value="${regionInput(region.id, 'p50Minutes')}" placeholder="—" data-region-input="${region.id}:p50Minutes"><b>min</b></span></label>
    <label><span>Slow time</span><span><input type="number" min="0" step="5" value="${regionInput(region.id, 'p90Minutes')}" placeholder="—" data-region-input="${region.id}:p90Minutes"><b>min</b></span></label>
  </div></details>`;
}

function regionPickControl(region, selected) {
  return region.unlock === 'elective'
    ? `<input type="checkbox" ${selected ? 'checked' : ''} data-region-select="${region.id}" aria-label="Pick ${escapeHtml(region.name)}">`
    : `<b class="fixed-region">${escapeHtml(regionAccess(region))}</b>`;
}

function renderRegions() {
  const pool = theoreticalSelectedPool(facts, state.electedRegions);
  const regions = facts.regions.filter((region) => region.id !== 'global');
  const rows = regions.map((region) => {
    const elective = region.unlock === 'elective';
    const selected = elective ? state.electedRegions.includes(region.id) : true;
    const projection = regionProjection(region, state.regionInputs[region.id]);
    return `<tr class="${selected ? 'is-selected' : ''}">
      <td>${regionPickControl(region, selected)}</td>
      <td class="region-name"><b>${escapeHtml(region.name)}</b></td>
      <td>${formatNumber(region.tasks)}</td>
      <td>${formatNumber(region.points)}</td>
      <td>${formatNumber(region.blessingTasks)}</td>
      <td>${regionQuestList(region)}</td>
      <td>${regionEstimate(region, projection)}</td>
    </tr>`;
  }).join('');
  const cards = regions.map((region) => {
    const elective = region.unlock === 'elective';
    const selected = elective ? state.electedRegions.includes(region.id) : true;
    const projection = regionProjection(region, state.regionInputs[region.id]);
    return `<article class="region-card ${selected ? 'is-selected' : ''}"><header>${regionPickControl(region, selected)}<div><b>${escapeHtml(region.name)}</b><span>${formatNumber(region.tasks)} tasks · ${formatNumber(region.points)} pts · ${formatNumber(region.blessingTasks)} blessing tasks</span></div></header><footer>${regionQuestList(region)}${regionEstimate(region, projection)}</footer></article>`;
  }).join('');
  const missing = missingTaskTiers().map(titleCase).join(', ');
  return `<section id="panel-regions" class="page regions-page" role="tabpanel" aria-labelledby="tab-regions" tabindex="0">
    <header class="page-heading"><h1>Regions</h1><p>${missing ? `${missing} still missing.` : 'Pick three.'}</p></header>
    <div class="region-total"><b>${state.electedRegions.length} / 3 picked</b><span>${formatNumber(pool.points)} points</span><span>${formatNumber(pool.tasks)} tasks</span><span>${formatNumber(pool.blessingTasks)} blessing tasks</span></div>
    <div class="region-desktop table-scroll"><table class="region-table"><thead><tr><th>Pick</th><th>Region</th><th>Tasks</th><th>Pts</th><th>Blessing</th><th>Quests</th><th>Estimate</th></tr></thead><tbody>${rows}</tbody></table></div>
    <div class="region-cards">${cards}</div>
    <details class="rule-note"><summary>Wilderness / Daemonheim</summary><p>Reward-shop access is unclear, so it is not scored.</p></details>
  </section>`;
}

function blessingChoiceFor(slot, path) {
  return facts.blessings.find((blessing) => blessing.progressionSlot === slot && blessing.path === path);
}

function godChoice(godTier, path) {
  return facts.blessings.find((blessing) => blessing.godTier === godTier && blessing.path === path);
}

function blessingPathButton(index, slot, path, currentPick) {
  const blessing = blessingChoiceFor(slot, path);
  const active = currentPick === path;
  return `<button type="button" class="blessing-pick path-${path.toLowerCase()} ${active ? 'is-active' : ''}" data-blessing-pick="${index}:${path}" aria-pressed="${active}" title="${escapeHtml(blessing?.summary ?? '')}"><small class="mobile-path">${path}</small><b>${escapeHtml(blessing?.name ?? 'Unrevealed')}</b><span>${escapeHtml(blessing?.summary ?? '')}</span></button>`;
}

function blessingGodRow(godTier, path) {
  const slot = godTier === 1 ? 4 : 8;
  const choice = path ? godChoice(godTier, path) : null;
  return `<div class="god-row"><header><small>${blessingThresholdForSlot(slot)} tasks</small><b>God ${godTier}</b></header><div class="${path ? `path-${path.toLowerCase()}` : ''}"><b>${escapeHtml(choice?.name ?? 'Pick the three tiers above')}</b>${choice?.summary ? `<span>${escapeHtml(choice.summary)}</span>` : ''}</div></div>`;
}

function renderBlessings() {
  const current = currentBlessingEpoch(state.blessing);
  const gods = godTierAlignments(current.picks);
  const pathSlots = [1, 2, 3, 5, 6, 7];
  const desktopRows = pathSlots.map((slot, index) => {
    const tier = slot <= 3 ? slot : slot - 1;
    return `<div class="blessing-row"><header><small>${blessingThresholdForSlot(slot)} tasks</small><b>T${tier}</b></header>${BLESSING_PATHS.map((path) => blessingPathButton(index, slot, path, current.picks[index])).join('')}</div>`;
  });
  desktopRows.splice(3, 0, blessingGodRow(1, gods[1]));
  desktopRows.push(blessingGodRow(2, gods[2]));

  const mobileRows = pathSlots.map((slot, index) => {
    const tier = slot <= 3 ? slot : slot - 1;
    const row = `<section class="blessing-mobile-tier"><header><small>${blessingThresholdForSlot(slot)} tasks</small><b>T${tier}</b></header><div>${BLESSING_PATHS.map((path) => blessingPathButton(index, slot, path, current.picks[index])).join('')}</div></section>`;
    if (index === 2) return `${row}${blessingGodRow(1, gods[1])}`;
    if (index === 5) return `${row}${blessingGodRow(2, gods[2])}`;
    return row;
  }).join('');

  const archived = state.blessing.epochs.slice(0, -1);
  const history = archived.length ? `<details class="history-panel"><summary>Past paths (${archived.length})</summary><div class="table-scroll"><table><thead><tr><th>Set</th><th>Picks</th><th>God 1</th><th>God 2</th></tr></thead><tbody>${archived.map((entry) => {
    const entryGods = godTierAlignments(entry.picks);
    return `<tr><td>${entry.id}</td><td>${entry.picks.map((pick) => pick?.[0] ?? '—').join(' · ')}</td><td>${entryGods[1] ?? '—'}</td><td>${entryGods[2] ?? '—'}</td></tr>`;
  }).join('')}</tbody></table></div></details>` : '';

  return `<section id="panel-blessings" class="page blessings-page" role="tabpanel" aria-labelledby="tab-blessings" tabindex="0">
    <header class="page-heading blessing-heading"><div><h1>Blessings</h1><p>Relics stay locked.</p></div><div class="reset-control"><b>${MAX_BLESSING_RESETS - state.blessing.resetsUsed}</b><span>resets left</span><button type="button" data-action="blessing-reset" ${state.blessing.resetsUsed >= MAX_BLESSING_RESETS ? 'disabled' : ''}>Reset</button></div></header>
    <div class="blessing-board blessing-desktop"><div class="blessing-columns"><b>Tier</b>${BLESSING_PATHS.map((path) => `<b class="path-${path.toLowerCase()}">${path}</b>`).join('')}</div>${desktopRows.join('')}</div>
    <div class="blessing-mobile">${mobileRows}</div>
    ${history}
  </section>`;
}

function renderPanel() {
  if (loadError) {
    return `<section class="fatal-error"><h1>Data did not load</h1><p>${escapeHtml(loadError.message)}</p><p>Run the site through a local server.</p></section>`;
  }
  switch (state.activeTab) {
    case 'relics': return renderRelics();
    case 'regions': return renderRegions();
    case 'blessings': return renderBlessings();
    default: return renderRoute();
  }
}

function renderApp() {
  if (!facts || !snapshot) return;
  document.documentElement.dataset.route = state.activeTab;
  renderHeader();
  app.innerHTML = renderPanel();
}

function updateTaskState(taskId, patch) {
  updateState((draft) => {
    const current = taskStateFor(draft, taskId);
    draft.taskState[taskId] = { ...current, ...patch };
    return draft;
  });
}

function openTaskDialog(taskId, opener) {
  const task = snapshot.tasks.find((entry) => entry.id === taskId);
  if (!task) return;
  const taskState = taskStateFor(state, task.id);
  const description = String(task.description ?? '').trim();
  const showDescription = description && description.replace(/[.\s]+$/g, '') !== task.name.replace(/[.\s]+$/g, '');
  taskDialogBody.innerHTML = `
    <div class="dialog-ticket"><b>${escapeHtml(titleCase(task.tier))}</b><span>${formatNumber(task.points)} pts</span><span>${escapeHtml(task.locality ?? task.localityKey ?? 'Unmapped')}</span></div>
    <h2 id="task-dialog-title">${escapeHtml(task.name)}</h2>
    ${showDescription ? `<p>${escapeHtml(description)}</p>` : ''}
    ${task.requirements ? `<section><h3>Requires</h3><p>${escapeHtml(task.requirements)}</p></section>` : ''}
    <section class="dialog-plan"><h3>Plan</h3><div><label><span>When</span><select data-task-route="${escapeHtml(task.id)}">${taskRouteOptions(taskRoute(taskState))}</select></label><label><span>Time</span><span><input type="number" min="0" step="0.5" placeholder="—" value="${taskState.minutes ?? ''}" data-task-minutes="${escapeHtml(task.id)}"><b>min</b></span></label></div></section>
    <footer class="dialog-foot"><a href="${safeUrl(snapshot.source.url)}" target="_blank" rel="noopener noreferrer">Wiki #${task.wikiTaskId}</a><small>r${snapshot.source.revision ?? '—'}</small></footer>`;
  taskDialog.dataset.returnFocus = opener?.dataset.openTask ?? '';
  taskDialog.showModal();
  taskDialog.querySelector('[data-dialog-close]')?.focus();
}

function exportProgress() {
  const payload = {
    schemaVersion: STATE_VERSION,
    exportedAt: new Date().toISOString(),
    sourceRevision: snapshot.source?.revision ?? null,
    state,
  };
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'clankerscape-progress.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

async function importProgress(file) {
  if (!file || file.size > 2 * 1024 * 1024) throw new Error('Use a ClankerScape file smaller than 2 MB.');
  const payload = JSON.parse(await file.text());
  if (payload.schemaVersion !== STATE_VERSION || !payload.state) throw new Error('This is not a ClankerScape progress file.');
  state = normaliseState(payload.state);
  saveState();
  renderApp();
}

function onClick(event) {
  const tab = event.target.closest('[data-tab]');
  if (tab) {
    const id = tab.dataset.tab;
    updateState((draft) => { draft.activeTab = id; return draft; });
    document.querySelector(`[data-tab="${CSS.escape(id)}"]`)?.focus();
    return;
  }

  const action = event.target.closest('[data-action]');
  if (action) {
    action.closest('details')?.removeAttribute('open');
    if (action.dataset.action === 'export') exportProgress();
    if (action.dataset.action === 'import') importInput.click();
    if (action.dataset.action === 'reset-state' && window.confirm('Clear saved progress and estimates?')) {
      state = defaultState();
      saveState();
      renderApp();
    }
    if (action.dataset.action === 'blessing-reset') {
      if (!window.confirm('Reset blessings? Relics do not change.')) return;
      const result = resetBlessingProgression(state.blessing, new Date().toISOString());
      if (result.error) window.alert(result.error);
      else updateState((draft) => { draft.blessing = result.state; return draft; });
    }
    return;
  }

  const taskOpener = event.target.closest('[data-open-task]');
  if (taskOpener) {
    openTaskDialog(taskOpener.dataset.openTask, taskOpener);
    return;
  }

  const relicButton = event.target.closest('[data-relic-select]');
  if (relicButton) {
    updateState((draft) => {
      const tier = String(relicButton.dataset.relicTier);
      draft.relicSelections[tier] = draft.relicSelections[tier] === relicButton.dataset.relicSelect
        ? null
        : relicButton.dataset.relicSelect;
      return draft;
    });
    return;
  }

  const preset = event.target.closest('[data-perk-preset]');
  if (preset) {
    updateState((draft) => {
      draft.perkInputs = { ...PERKFECTION_PRESETS[preset.dataset.perkPreset] };
      return draft;
    });
    return;
  }

  const blessingPick = event.target.closest('[data-blessing-pick]');
  if (blessingPick) {
    const [indexRaw, path] = blessingPick.dataset.blessingPick.split(':');
    updateState((draft) => {
      const current = currentBlessingEpoch(draft.blessing).picks[Number(indexRaw)];
      draft.blessing = setBlessingPick(draft.blessing, Number(indexRaw), current === path ? null : path);
      return draft;
    });
  }
}

function onChange(event) {
  const stateField = event.target.closest('[data-state-field]');
  if (stateField) {
    updateState((draft) => {
      draft[stateField.dataset.stateField] = finiteNonNegative(stateField.value);
      return draft;
    });
    return;
  }

  const complete = event.target.closest('[data-task-complete]');
  if (complete) {
    const task = snapshot.tasks.find((entry) => entry.id === complete.dataset.taskComplete);
    if (!task) return;
    const prior = taskStateFor(state, task.id).complete;
    updateState((draft) => {
      const current = taskStateFor(draft, task.id);
      draft.taskState[task.id] = { ...current, complete: complete.checked };
      if (complete.checked !== prior) {
        draft.points = Math.max(0, draft.points + (complete.checked ? task.points : -task.points));
        draft.completedTasks = Math.max(0, draft.completedTasks + (complete.checked ? 1 : -1));
      }
      return draft;
    });
    return;
  }

  const taskRouteSelect = event.target.closest('[data-task-route]');
  if (taskRouteSelect) {
    const route = taskRouteSelect.value;
    if (route === 'skip') updateTaskState(taskRouteSelect.dataset.taskRoute, { deferred: true });
    else updateTaskState(taskRouteSelect.dataset.taskRoute, { bank: route, deferred: false });
    return;
  }

  const minutes = event.target.closest('[data-task-minutes]');
  if (minutes) {
    updateTaskState(minutes.dataset.taskMinutes, {
      minutes: minutes.value === '' ? null : finiteNonNegative(minutes.value),
    });
    return;
  }

  const routeFilter = event.target.closest('[data-route-filter]');
  if (routeFilter) {
    updateState((draft) => {
      if (routeFilter.dataset.routeFilter === 'bank') draft.routeBankFilter = routeFilter.value;
      if (routeFilter.dataset.routeFilter === 'search') draft.routeSearch = routeFilter.value;
      return draft;
    });
    return;
  }

  const perkInput = event.target.closest('[data-perk-input]');
  if (perkInput) {
    updateState((draft) => {
      draft.perkInputs[perkInput.dataset.perkInput] = finiteNonNegative(perkInput.value);
      return draft;
    });
    return;
  }

  const rejuvCandidate = event.target.closest('[data-rejuvenated-candidate]');
  if (rejuvCandidate) {
    updateState((draft) => {
      draft.rejuvenatedCandidate = rejuvCandidate.value;
      return draft;
    });
    return;
  }

  const rejuvInput = event.target.closest('[data-rejuvenated-saving]');
  if (rejuvInput) {
    updateState((draft) => {
      draft.rejuvenatedSavings[rejuvInput.dataset.rejuvenatedSaving] = finiteNonNegative(rejuvInput.value);
      return draft;
    });
    return;
  }

  const regionSelect = event.target.closest('[data-region-select]');
  if (regionSelect) {
    const id = regionSelect.dataset.regionSelect;
    updateState((draft) => {
      const selected = new Set(draft.electedRegions);
      if (regionSelect.checked) selected.add(id);
      else selected.delete(id);
      const candidate = [...selected];
      if (!electiveSelectionValid(candidate)) {
        window.alert('You can pick three regions.');
        return draft;
      }
      draft.electedRegions = candidate;
      return draft;
    });
    return;
  }

  const regionInputElement = event.target.closest('[data-region-input]');
  if (regionInputElement) {
    const [regionId, key] = regionInputElement.dataset.regionInput.split(':');
    updateState((draft) => {
      draft.regionInputs[regionId] = {
        ...(draft.regionInputs[regionId] ?? {}),
        [key]: regionInputElement.value === '' ? '' : finiteNonNegative(regionInputElement.value),
      };
      return draft;
    });
  }
}

document.addEventListener('click', onClick);
document.addEventListener('change', onChange);
importInput.addEventListener('change', async () => {
  try {
    await importProgress(importInput.files?.[0]);
  } catch (error) {
    window.alert(error instanceof Error ? error.message : 'Could not import that file.');
  } finally {
    importInput.value = '';
  }
});

taskDialog.addEventListener('close', () => {
  const id = taskDialog.dataset.returnFocus;
  if (!id) return;
  document.querySelector(`[data-open-task="${CSS.escape(id)}"]`)?.focus();
});

taskDialog.addEventListener('click', (event) => {
  if (event.target === taskDialog || event.target.closest('[data-dialog-close]')) taskDialog.close();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && taskDialog.open) {
    taskDialog.close();
    return;
  }
  const tab = event.target.closest?.('[role="tab"]');
  if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  if (!tabs.length) return;
  const current = tabs.indexOf(tab);
  let next = current;
  if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
  if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = tabs.length - 1;
  event.preventDefault();
  tabs[next].click();
});

loadLocalState();
try {
  await loadData();
} catch (error) {
  loadError = error instanceof Error ? error : new Error('Unknown data error');
  facts = {
    target: { points: 48000 },
    relicThresholds: [],
    blessingThresholds: [],
    sources: {},
    relics: [],
    blessings: [],
    regions: [],
    startingRegions: [],
    automaticRegion: { id: 'karamja' },
  };
  snapshot = { coverage: { status: 'unavailable', observedTasks: 0, observedPoints: 0 }, source: {}, tasks: [] };
}
renderApp();
