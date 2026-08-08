const TASK_TIERS = Object.freeze(['easy', 'medium', 'hard', 'elite', 'master']);

const BANKS = Object.freeze([
  'immediate-skilling',
  'deep-skilling',
  'immediate-pvm',
  'deep-pvm',
  'reserve',
]);

export { BANKS };

export function nextRegionGate(completedTasks) {
  const count = Number.isFinite(Number(completedTasks)) ? Math.max(0, Number(completedTasks)) : 0;
  if (count < 50) return { tasks: 50, label: 'Karamja', kind: 'automatic' };
  if (count < 175) return { tasks: 175, label: 'first elective region', kind: 'elective' };
  if (count < 300) return { tasks: 300, label: 'second elective region', kind: 'elective' };
  if (count < 450) return { tasks: 450, label: 'third elective region', kind: 'elective' };
  return null;
}

export function taskCoverageGate(snapshot) {
  if (!snapshot || snapshot.coverage?.status === 'unavailable') {
    return {
      status: 'blocked',
      title: 'No canonical task snapshot',
      detail: 'Do not freeze a Dragon route until numeric Wiki task rows have been imported.',
    };
  }
  if (snapshot.coverage.status !== 'full' || snapshot.coverage.reconciled !== true) {
    const observed = new Set(snapshot.coverage.observedTiers ?? []);
    const missing = TASK_TIERS.filter((tier) => !observed.has(tier));
    const missingDetail = missing.length
      ? ` Missing tiers: ${missing.map((tier) => tier[0].toUpperCase() + tier.slice(1)).join(', ')}.`
      : ' Published rows still do not reconcile with the official totals.';
    return {
      status: 'partial',
      title: `${snapshot.coverage.observedTasks} of 1,152 tasks sourced`,
      detail: `Use published rows for early planning only.${missingDetail} Final route claims remain blocked.`,
    };
  }
  return {
    status: 'ready',
    title: 'Full task corpus reconciled',
    detail: 'The numeric task rows match the official 1,152-task and 109,380-point totals.',
  };
}

export function taskStateFor(routeState, taskId) {
  return routeState.taskState?.[taskId] ?? {
    complete: false,
    bank: 'unclassified',
    minutes: null,
    category: 'unclassified',
    deferred: false,
  };
}

export function taskEfficiency(task, taskState) {
  const minutes = Number(taskState.minutes);
  if (!Number.isFinite(minutes) || minutes <= 0) return null;
  return task.points / minutes;
}

export function rankTaskCandidates(tasks, routeState, bank) {
  return tasks
    .map((task) => ({ task, state: taskStateFor(routeState, task.id) }))
    .filter(({ state }) => !state.complete && !state.deferred && state.bank === bank)
    .map((entry) => ({ ...entry, efficiency: taskEfficiency(entry.task, entry.state) }))
    .sort((a, b) => {
      if (a.efficiency === null && b.efficiency !== null) return 1;
      if (a.efficiency !== null && b.efficiency === null) return -1;
      if (a.efficiency !== null && b.efficiency !== null && a.efficiency !== b.efficiency) {
        return b.efficiency - a.efficiency;
      }
      return b.task.points - a.task.points || a.task.name.localeCompare(b.task.name);
    });
}

export function nextQueueAction(tasks, routeState, category) {
  const bank = category === 'pvm' ? 'immediate-pvm' : 'immediate-skilling';
  return rankTaskCandidates(tasks, routeState, bank)[0] ?? null;
}

export function routeCoverage(tasks, routeState) {
  const totals = Object.fromEntries(BANKS.map((bank) => [bank, { points: 0, tasks: 0, minutes: 0, estimatedTasks: 0 }]));
  for (const task of tasks) {
    const state = taskStateFor(routeState, task.id);
    if (state.complete || !BANKS.includes(state.bank)) continue;
    const bucket = totals[state.bank];
    bucket.points += task.points;
    bucket.tasks += 1;
    const minutes = Number(state.minutes);
    if (Number.isFinite(minutes) && minutes > 0) {
      bucket.minutes += minutes;
      bucket.estimatedTasks += 1;
    }
  }
  return totals;
}

export function completedTaskTotals(tasks, routeState) {
  let tasksCompleted = 0;
  let points = 0;
  for (const task of tasks) {
    if (!taskStateFor(routeState, task.id).complete) continue;
    tasksCompleted += 1;
    points += task.points;
  }
  return { tasksCompleted, points };
}

export function electiveSelectionValid(regionIds) {
  return new Set(regionIds).size <= 3;
}

export function theoreticalSelectedPool(facts, electiveRegionIds) {
  const included = new Set(['global', ...facts.startingRegions, facts.automaticRegion.id, ...electiveRegionIds]);
  return facts.regions
    .filter((region) => included.has(region.id))
    .reduce((totals, region) => ({
      points: totals.points + region.points,
      tasks: totals.tasks + region.tasks,
      blessingTasks: totals.blessingTasks + region.blessingTasks,
    }), { points: 0, tasks: 0, blessingTasks: 0 });
}

export function regionProjection(region, input = {}) {
  const reachablePoints = Number(input.reachablePoints);
  const p50Minutes = Number(input.p50Minutes);
  const p90Minutes = Number(input.p90Minutes);
  const valid = Number.isFinite(reachablePoints) && reachablePoints >= 0
    && Number.isFinite(p50Minutes) && p50Minutes > 0
    && Number.isFinite(p90Minutes) && p90Minutes >= p50Minutes;
  if (!valid) return { status: 'unscored', pointsPerHour: null };
  return {
    status: 'scored',
    pointsPerHour: reachablePoints / (p50Minutes / 60),
    reachableShare: region.points > 0 ? reachablePoints / region.points : 0,
    p50Minutes,
    p90Minutes,
  };
}
