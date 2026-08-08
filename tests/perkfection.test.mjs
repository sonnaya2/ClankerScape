import assert from 'node:assert/strict';
import test from 'node:test';
import {
  PERKFECTION_PRESETS,
  bestRejuvenatedCandidate,
  calculatePerkfectionSavings,
  evaluateTierSixDecision,
} from '../src/domain/perkfection.js';

test('balanced preset measures direct and combat savings without treating 20% proc frequency as 20% DPS', () => {
  const result = calculatePerkfectionSavings(PERKFECTION_PRESETS.balanced);
  assert.equal(result.directSaved, 147);
  assert.ok(Math.abs(result.helpfulProcThroughput - 0.012) < 1e-12);
  assert.ok(Math.abs(result.combatThroughputGain - 0.042) < 1e-12);
  assert.ok(Math.abs(result.combatSaved - 16.12284069097888) < 1e-9);
  assert.ok(Math.abs(result.totalSaved - 163.12284069097888) < 1e-9);
});

test('a 10% affected helpful-perk share saves about two minutes in 100 combat minutes, not twenty', () => {
  const result = calculatePerkfectionSavings({
    augmentedCombatMinutes: 100,
    helpfulPerkContributionPercent: 10,
  });
  assert.ok(Math.abs(result.helpfulProcThroughput - 0.02) < 1e-12);
  assert.ok(result.combatSaved > 1.9 && result.combatSaved < 2);
});

test('Tier 6 remains close when uncertainty intervals overlap', () => {
  const result = evaluateTierSixDecision({
    perkfectionSavedMinutes: 160,
    perkfectionUncertaintyMinutes: 40,
    rejuvenatedSavedMinutes: 130,
    rejuvenatedUncertaintyMinutes: 40,
    remainingRouteMinutes: 1500,
  });
  assert.equal(result.winner, null);
  assert.equal(result.status, 'close');
  assert.equal(result.margin, 45);
});

test('Perkfection only wins after clearing the permanent-choice margin and uncertainty', () => {
  const result = evaluateTierSixDecision({
    perkfectionSavedMinutes: 300,
    perkfectionUncertaintyMinutes: 20,
    rejuvenatedSavedMinutes: 180,
    rejuvenatedUncertaintyMinutes: 20,
    remainingRouteMinutes: 1800,
  });
  assert.equal(result.winner, 'perkfection');
  assert.equal(result.status, 'clear');
  assert.equal(result.margin, 54);
});

test('best Rejuvenated candidate considers every missed Tier 1–5 relic', () => {
  const relics = [
    { id: 't1', tier: 1, name: 'One' },
    { id: 't4', tier: 4, name: 'Four' },
    { id: 't6', tier: 6, name: 'Six' },
  ];
  const best = bestRejuvenatedCandidate(relics, { t1: 30, t4: 95, t6: 999 });
  assert.equal(best.id, 't4');
  assert.equal(best.minutesSaved, 95);
});
