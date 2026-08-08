import assert from 'node:assert/strict';
import test from 'node:test';
import {
  nextRegionGate,
  regionProjection,
  taskCoverageGate,
  taskStateFor,
  theoreticalSelectedPool,
} from '../src/domain/route.js';

test('task-count gates match the published 50/175/300/450 thresholds', () => {
  assert.equal(nextRegionGate(0).tasks, 50);
  assert.equal(nextRegionGate(50).tasks, 175);
  assert.equal(nextRegionGate(175).tasks, 300);
  assert.equal(nextRegionGate(300).tasks, 450);
  assert.equal(nextRegionGate(450), null);
});

test('partial task data blocks route freezing', () => {
  const result = taskCoverageGate({ coverage: { status: 'partial', observedTasks: 300, reconciled: false } });
  assert.equal(result.status, 'partial');
  assert.match(result.detail, /route claims remain blocked/i);
});

test('region projections require coherent reachable points and P50/P90 estimates', () => {
  const region = { points: 8000 };
  assert.equal(regionProjection(region, { reachablePoints: 3000, p50Minutes: 0, p90Minutes: 50 }).status, 'unscored');
  assert.equal(regionProjection(region, { reachablePoints: 3000, p50Minutes: 100, p90Minutes: 90 }).status, 'unscored');
  const scored = regionProjection(region, { reachablePoints: 3000, p50Minutes: 120, p90Minutes: 180 });
  assert.equal(scored.status, 'scored');
  assert.equal(scored.pointsPerHour, 1500);
});

test('selected pool includes global, starting, automatic, and at most chosen elective regions', () => {
  const facts = {
    startingRegions: ['start-a', 'start-b'],
    automaticRegion: { id: 'auto' },
    regions: [
      { id: 'global', points: 100, tasks: 1, blessingTasks: 0 },
      { id: 'start-a', points: 200, tasks: 2, blessingTasks: 5 },
      { id: 'start-b', points: 300, tasks: 3, blessingTasks: 5 },
      { id: 'auto', points: 400, tasks: 4, blessingTasks: 5 },
      { id: 'pick', points: 500, tasks: 5, blessingTasks: 5 },
      { id: 'other', points: 999, tasks: 9, blessingTasks: 5 },
    ],
  };
  assert.deepEqual(theoreticalSelectedPool(facts, ['pick']), { points: 1500, tasks: 15, blessingTasks: 20 });
});


test('unreviewed sourced tasks remain unclassified and outside every point bank', () => {
  const taskState = taskStateFor({ taskState: {} }, 'wiki:1');
  assert.equal(taskState.bank, 'unclassified');
  assert.equal(taskState.category, 'unclassified');
});
