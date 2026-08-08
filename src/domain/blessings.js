export const BLESSING_PATHS = Object.freeze(['Order', 'Balance', 'Chaos']);
export const PATH_SLOTS = Object.freeze([1, 2, 3, 5, 6, 7]);
export const MAX_BLESSING_RESETS = 3;

export function deriveGodTier(picks) {
  const segment = picks.slice(0, 3).filter((pick) => BLESSING_PATHS.includes(pick));
  if (segment.length < 3) return null;
  const counts = Object.fromEntries(BLESSING_PATHS.map((path) => [path, 0]));
  for (const path of segment) counts[path] += 1;
  for (const path of BLESSING_PATHS) {
    if (counts[path] >= 2) return path;
  }
  return BLESSING_PATHS.every((path) => counts[path] === 1) ? 'Balance' : null;
}

export function godTierAlignments(pathPicks) {
  return {
    1: deriveGodTier(pathPicks.slice(0, 3)),
    2: deriveGodTier(pathPicks.slice(3, 6)),
  };
}

export function createBlessingState() {
  return {
    resetsUsed: 0,
    epochs: [{ id: 1, createdAt: null, picks: Array(6).fill(null) }],
  };
}

export function currentBlessingEpoch(state) {
  return state.epochs[state.epochs.length - 1];
}

export function setBlessingPick(state, pickIndex, path) {
  if (!Number.isInteger(pickIndex) || pickIndex < 0 || pickIndex >= 6) return state;
  if (path !== null && !BLESSING_PATHS.includes(path)) return state;
  const epochs = state.epochs.map((epoch, index) => {
    if (index !== state.epochs.length - 1) return epoch;
    const picks = [...epoch.picks];
    picks[pickIndex] = path;
    return { ...epoch, picks };
  });
  return { ...state, epochs };
}

export function resetBlessingProgression(state, timestamp = null) {
  if (state.resetsUsed >= MAX_BLESSING_RESETS) {
    return { state, error: 'All three Blessing progression resets have already been used.' };
  }
  const current = currentBlessingEpoch(state);
  const archived = { ...current, closedAt: timestamp };
  const next = {
    id: current.id + 1,
    createdAt: timestamp,
    picks: Array(6).fill(null),
  };
  return {
    state: {
      resetsUsed: state.resetsUsed + 1,
      epochs: [...state.epochs.slice(0, -1), archived, next],
    },
    error: null,
  };
}

export function activeBlessingIds(facts, picks) {
  const bySlotAndPath = new Map(
    facts.blessings
      .filter((blessing) => blessing.godTier === null)
      .map((blessing) => [`${blessing.progressionSlot}:${blessing.path}`, blessing.id]),
  );
  const active = [];
  for (let index = 0; index < picks.length; index += 1) {
    const path = picks[index];
    const slot = PATH_SLOTS[index];
    const id = path ? bySlotAndPath.get(`${slot}:${path}`) : null;
    if (id) active.push(id);
  }
  const gods = godTierAlignments(picks);
  for (const [godTier, path] of Object.entries(gods)) {
    if (!path) continue;
    const choice = facts.blessings.find((blessing) => blessing.godTier === Number(godTier) && blessing.path === path);
    if (choice) active.push(choice.id);
  }
  return active;
}
