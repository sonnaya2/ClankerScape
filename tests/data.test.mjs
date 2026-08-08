import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const facts = JSON.parse(await readFile(new URL('../data/league-facts.json', import.meta.url), 'utf8'));
const snapshot = JSON.parse(await readFile(new URL('../data/equilibrium-tasks.snapshot.json', import.meta.url), 'utf8'));

test('official region totals reconcile exactly', () => {
  assert.equal(facts.regions.reduce((sum, region) => sum + region.tasks, 0), 1152);
  assert.equal(facts.regions.reduce((sum, region) => sum + region.points, 0), 109380);
});

test('official choice counts are complete and ordinary relic resets remain unavailable', () => {
  assert.equal(facts.relics.length, 20);
  assert.equal(facts.blessings.length, 24);
  assert.equal(facts.blessingResets.total, 3);
  assert.equal(facts.relicReset.available, false);
});

test('task snapshot fails closed and never accepts Catalyst records as Equilibrium truth', () => {
  assert.ok(['unavailable', 'partial', 'full'].includes(snapshot.coverage.status));
  assert.equal(snapshot.source.pageTitle, 'Equilibrium League/Tasks');
  assert.equal(snapshot.source.url, 'https://runescape.wiki/w/Equilibrium_League/Tasks');

  const points = snapshot.tasks.reduce((sum, task) => sum + task.points, 0);
  assert.equal(snapshot.coverage.observedTasks, snapshot.tasks.length);
  assert.equal(snapshot.coverage.observedPoints, points);
  assert.equal(new Set(snapshot.tasks.map((task) => task.wikiTaskId)).size, snapshot.tasks.length);
  for (const task of snapshot.tasks) {
    assert.ok(Number.isInteger(task.wikiTaskId));
    assert.ok([10, 30, 80, 200, 400].includes(task.points));
    assert.notEqual(task.sourceLeague, 'catalyst');
    assert.notEqual(task.testingOnly, true);
  }

  if (snapshot.coverage.status === 'unavailable') {
    assert.equal(snapshot.tasks.length, 0);
    assert.equal(snapshot.coverage.reconciled, false);
  }
  if (snapshot.coverage.status === 'full') {
    assert.equal(snapshot.tasks.length, 1152);
    assert.equal(points, 109380);
    assert.equal(snapshot.coverage.reconciled, true);
  }
});
