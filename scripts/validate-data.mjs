import { readFile } from 'node:fs/promises';

const facts = JSON.parse(await readFile('data/league-facts.json', 'utf8'));
const snapshot = JSON.parse(await readFile('data/equilibrium-tasks.snapshot.json', 'utf8'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(facts.schemaVersion === 1, 'league-facts schemaVersion must be 1');
assert(facts.target.points === 48000, 'Dragon target must be 48,000 points');
assert(facts.officialTotals.tasks === 1152, 'Official task total must be 1,152');
assert(facts.officialTotals.points === 109380, 'Official point total must be 109,380');

const regionTasks = facts.regions.reduce((sum, region) => sum + region.tasks, 0);
const regionPoints = facts.regions.reduce((sum, region) => sum + region.points, 0);
assert(regionTasks === facts.officialTotals.tasks, `Region task totals drifted: ${regionTasks}`);
assert(regionPoints === facts.officialTotals.points, `Region point totals drifted: ${regionPoints}`);
assert(facts.relics.length === 20, `Expected 20 relic choices, got ${facts.relics.length}`);
assert(facts.blessings.length === 24, `Expected 24 Blessing cards, got ${facts.blessings.length}`);
assert(facts.blessingResets.total === 3, 'Blessing reset total must be 3');
assert(facts.relicReset.available === false, 'Ordinary relic reset must remain unavailable without a source');

const relicIds = new Set();
const relicTierCounts = new Map();
for (const relic of facts.relics) {
  assert(typeof relic.id === 'string' && relic.id, 'Every relic needs a stable ID');
  assert(!relicIds.has(relic.id), `Duplicate relic ID ${relic.id}`);
  relicIds.add(relic.id);
  assert(Number.isInteger(relic.tier) && relic.tier >= 1 && relic.tier <= 7, `Invalid relic tier for ${relic.id}`);
  relicTierCounts.set(relic.tier, (relicTierCounts.get(relic.tier) ?? 0) + 1);
  assert(relic.source === 'official-reveal', `Relic ${relic.id} lacks primary-source provenance`);
}
for (const [tier, expected] of [[1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 2], [7, 3]]) {
  assert(relicTierCounts.get(tier) === expected, `Tier ${tier} relic count drifted`);
}

const blessingIds = new Set();
const blessingPaths = new Set(['Order', 'Balance', 'Chaos']);
const expectedBlessingGroups = new Map([
  ['path:1', 3], ['path:2', 3], ['path:3', 3], ['god:1', 3],
  ['path:5', 3], ['path:6', 3], ['path:7', 3], ['god:2', 3],
]);
const blessingGroups = new Map();
for (const blessing of facts.blessings) {
  assert(typeof blessing.id === 'string' && blessing.id, 'Every Blessing needs a stable ID');
  assert(!blessingIds.has(blessing.id), `Duplicate Blessing ID ${blessing.id}`);
  blessingIds.add(blessing.id);
  assert(blessingPaths.has(blessing.path), `Invalid Blessing path for ${blessing.id}`);
  assert(blessing.source === 'official-reveal', `Blessing ${blessing.id} lacks primary-source provenance`);
  const key = blessing.godTier === null ? `path:${blessing.progressionSlot}` : `god:${blessing.godTier}`;
  blessingGroups.set(key, (blessingGroups.get(key) ?? 0) + 1);
}
for (const [group, expected] of expectedBlessingGroups) {
  assert(blessingGroups.get(group) === expected, `${group} Blessing count drifted`);
}
assert(blessingGroups.size === expectedBlessingGroups.size, 'Unexpected Blessing progression group detected');

assert(JSON.stringify(facts.electiveRegionMilestones) === JSON.stringify([175, 300, 450]), 'Elective region milestones drifted');
assert(facts.automaticRegion.id === 'karamja' && facts.automaticRegion.taskCount === 50, 'Automatic Karamja gate drifted');
assert(JSON.stringify(facts.relicThresholds.map((entry) => entry.points)) === JSON.stringify([10, 750, 1750, 3500, 6000, 12000, 20000]), 'Relic thresholds drifted');
assert(JSON.stringify(facts.blessingThresholds.map((entry) => entry.tasks)) === JSON.stringify([1, 3, 5, 9, 12, 16, 20, 26]), 'Blessing thresholds drifted');
assert(facts.sources?.['official-reveal']?.authority === 'primary', 'Official reveal source must remain primary');
assert(facts.sources?.['wiki-tasks']?.url === 'https://runescape.wiki/w/Equilibrium_League/Tasks', 'Canonical Wiki task URL drifted');

assert(snapshot.schemaVersion === 1, 'task snapshot schemaVersion must be 1');
assert(['unavailable', 'partial', 'full'].includes(snapshot.coverage.status), 'Unknown task coverage status');
assert(Array.isArray(snapshot.tasks), 'task snapshot tasks must be an array');
assert(snapshot.source?.pageTitle === 'Equilibrium League/Tasks', 'Task snapshot page title drifted');
assert(snapshot.source?.url === 'https://runescape.wiki/w/Equilibrium_League/Tasks', 'Task snapshot source URL drifted');
assert(snapshot.coverage.officialTasks === facts.officialTotals.tasks, 'Snapshot official task total drifted');
assert(snapshot.coverage.officialPoints === facts.officialTotals.points, 'Snapshot official point total drifted');
const ids = new Set();
for (const task of snapshot.tasks) {
  assert(Number.isInteger(task.wikiTaskId), 'Every task must have a numeric Wiki task ID');
  assert(!ids.has(task.wikiTaskId), `Duplicate task ID ${task.wikiTaskId}`);
  ids.add(task.wikiTaskId);
  assert(['easy', 'medium', 'hard', 'elite', 'master'].includes(task.tier), `Unknown tier ${task.tier}`);
  assert([10, 30, 80, 200, 400].includes(task.points), `Unknown points ${task.points}`);
  assert(task.source?.pageTitle === 'Equilibrium League/Tasks', 'Catalyst or unknown task source detected');
}

const taskPoints = snapshot.tasks.reduce((sum, task) => sum + task.points, 0);
assert(taskPoints === snapshot.coverage.observedPoints, 'Snapshot observed point count drifted');
assert(snapshot.tasks.length === snapshot.coverage.observedTasks, 'Snapshot observed task count drifted');
if (snapshot.coverage.status === 'full') {
  assert(snapshot.tasks.length === facts.officialTotals.tasks, 'Full snapshot does not match official task count');
  assert(taskPoints === facts.officialTotals.points, 'Full snapshot does not match official point count');
  assert(snapshot.coverage.reconciled === true, 'Full snapshot must be reconciled');
}

console.log(`Validated League facts and ${snapshot.tasks.length} sourced task rows (${snapshot.coverage.status})`);
