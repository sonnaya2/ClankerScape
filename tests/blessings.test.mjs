import assert from 'node:assert/strict';
import test from 'node:test';
import {
  MAX_BLESSING_RESETS,
  createBlessingState,
  deriveGodTier,
  godTierAlignments,
  resetBlessingProgression,
  setBlessingPick,
} from '../src/domain/blessings.js';

test('two matching paths derive that God Blessing', () => {
  assert.equal(deriveGodTier(['Chaos', 'Balance', 'Chaos']), 'Chaos');
  assert.equal(deriveGodTier(['Order', 'Order', 'Balance']), 'Order');
});

test('one of each path derives Balance', () => {
  assert.equal(deriveGodTier(['Order', 'Balance', 'Chaos']), 'Balance');
});

test('God Tier 1 and 2 use separate three-pick segments', () => {
  assert.deepEqual(
    godTierAlignments(['Chaos', 'Chaos', 'Order', 'Order', 'Balance', 'Chaos']),
    { 1: 'Chaos', 2: 'Balance' },
  );
});

test('Blessing resets archive the current epoch and stop after three', () => {
  let state = createBlessingState();
  state = setBlessingPick(state, 0, 'Order');
  for (let count = 0; count < MAX_BLESSING_RESETS; count += 1) {
    const result = resetBlessingProgression(state, `t${count}`);
    assert.equal(result.error, null);
    state = result.state;
  }
  assert.equal(state.resetsUsed, 3);
  assert.equal(state.epochs.length, 4);
  assert.equal(state.epochs[0].picks[0], 'Order');
  const blocked = resetBlessingProgression(state, 'too-late');
  assert.match(blocked.error, /three Blessing progression resets/);
});
