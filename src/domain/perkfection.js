export const PERKFECTION_PRESETS = Object.freeze({
  light: Object.freeze({
    label: 'Light Invention example',
    remainingRouteMinutes: 900,
    setupWithout: 45,
    setupWith: 10,
    machinesWithout: 15,
    machinesWith: 2,
    chargeWithout: 10,
    chargeWith: 0,
    travelWithout: 10,
    travelWith: 2,
    augmentedCombatMinutes: 240,
    extraGizmoThroughputPercent: 2,
    helpfulPerkContributionPercent: 4,
    perkfectionUncertaintyMinutes: 25,
    rejuvenatedUncertaintyMinutes: 25,
  }),
  balanced: Object.freeze({
    label: 'Illustrative mixed case',
    remainingRouteMinutes: 1500,
    setupWithout: 90,
    setupWith: 15,
    machinesWithout: 45,
    machinesWith: 5,
    chargeWithout: 20,
    chargeWith: 0,
    travelWithout: 15,
    travelWith: 3,
    augmentedCombatMinutes: 400,
    extraGizmoThroughputPercent: 3,
    helpfulPerkContributionPercent: 6,
    perkfectionUncertaintyMinutes: 40,
    rejuvenatedUncertaintyMinutes: 40,
  }),
  heavy: Object.freeze({
    label: 'Invention-heavy example',
    remainingRouteMinutes: 2400,
    setupWithout: 180,
    setupWith: 25,
    machinesWithout: 90,
    machinesWith: 10,
    chargeWithout: 40,
    chargeWith: 0,
    travelWithout: 30,
    travelWith: 5,
    augmentedCombatMinutes: 600,
    extraGizmoThroughputPercent: 4,
    helpfulPerkContributionPercent: 8,
    perkfectionUncertaintyMinutes: 55,
    rejuvenatedUncertaintyMinutes: 55,
  }),
});

export function finiteNonNegative(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : fallback;
}

export function calculatePerkfectionSavings(input) {
  const setupWithout = finiteNonNegative(input.setupWithout);
  const setupWith = finiteNonNegative(input.setupWith);
  const machinesWithout = finiteNonNegative(input.machinesWithout);
  const machinesWith = finiteNonNegative(input.machinesWith);
  const chargeWithout = finiteNonNegative(input.chargeWithout);
  const chargeWith = finiteNonNegative(input.chargeWith);
  const travelWithout = finiteNonNegative(input.travelWithout);
  const travelWith = finiteNonNegative(input.travelWith);
  const augmentedCombatMinutes = finiteNonNegative(input.augmentedCombatMinutes);
  const extraGizmoThroughput = finiteNonNegative(input.extraGizmoThroughputPercent) / 100;
  const helpfulPerkContribution = finiteNonNegative(input.helpfulPerkContributionPercent) / 100;

  const setupSaved = Math.max(0, setupWithout - setupWith);
  const machineSaved = Math.max(0, machinesWithout - machinesWith);
  const chargeSaved = Math.max(0, chargeWithout - chargeWith);
  const travelSaved = Math.max(0, travelWithout - travelWith);

  // “Helpful perks trigger 20% more often” only increases the slice of throughput
  // caused by affected proc perks. It is not a blanket 20% DPS increase.
  const helpfulProcThroughput = helpfulPerkContribution * 0.20;
  const combatThroughputGain = extraGizmoThroughput + helpfulProcThroughput;
  const combatWith = combatThroughputGain > 0
    ? augmentedCombatMinutes / (1 + combatThroughputGain)
    : augmentedCombatMinutes;
  const combatSaved = Math.max(0, augmentedCombatMinutes - combatWith);

  const directSaved = setupSaved + machineSaved + chargeSaved + travelSaved;
  const totalSaved = directSaved + combatSaved;

  return {
    setupSaved,
    machineSaved,
    chargeSaved,
    travelSaved,
    directSaved,
    helpfulProcThroughput,
    combatThroughputGain,
    combatSaved,
    totalSaved,
  };
}

export function bestRejuvenatedCandidate(relics, savingsByRelic) {
  const candidates = relics
    .filter((relic) => relic.tier <= 5)
    .map((relic) => ({
      ...relic,
      minutesSaved: finiteNonNegative(savingsByRelic?.[relic.id]),
    }))
    .sort((a, b) => b.minutesSaved - a.minutesSaved || a.tier - b.tier || a.name.localeCompare(b.name));
  const best = candidates[0] ?? null;
  return best && best.minutesSaved > 0 ? best : null;
}

export function evaluateTierSixDecision({
  perkfectionSavedMinutes,
  perkfectionUncertaintyMinutes,
  rejuvenatedSavedMinutes,
  rejuvenatedUncertaintyMinutes,
  remainingRouteMinutes,
}) {
  const perk = finiteNonNegative(perkfectionSavedMinutes);
  const perkUncertainty = finiteNonNegative(perkfectionUncertaintyMinutes);
  const rejuvenated = finiteNonNegative(rejuvenatedSavedMinutes);
  const rejuvenatedUncertainty = finiteNonNegative(rejuvenatedUncertaintyMinutes);
  const remaining = finiteNonNegative(remainingRouteMinutes);
  const margin = Math.max(30, remaining * 0.03);

  const perkLow = Math.max(0, perk - perkUncertainty);
  const perkHigh = perk + perkUncertainty;
  const rejuvenatedLow = Math.max(0, rejuvenated - rejuvenatedUncertainty);
  const rejuvenatedHigh = rejuvenated + rejuvenatedUncertainty;
  const p50Edge = perk - rejuvenated;

  if (p50Edge > margin && perkLow > rejuvenatedHigh) {
    return {
      winner: 'perkfection',
      status: 'clear',
      margin,
      p50Edge,
      perkRange: [perkLow, perkHigh],
      rejuvenatedRange: [rejuvenatedLow, rejuvenatedHigh],
      reason: 'Perkfection clears both the irreversible-choice margin and the conservative uncertainty interval.',
    };
  }

  if (-p50Edge > margin && rejuvenatedLow > perkHigh) {
    return {
      winner: 'rejuvenated',
      status: 'clear',
      margin,
      p50Edge,
      perkRange: [perkLow, perkHigh],
      rejuvenatedRange: [rejuvenatedLow, rejuvenatedHigh],
      reason: 'The best missed earlier relic clears both the irreversible-choice margin and the conservative uncertainty interval.',
    };
  }

  return {
    winner: null,
    status: 'close',
    margin,
    p50Edge,
    perkRange: [perkLow, perkHigh],
    rejuvenatedRange: [rejuvenatedLow, rejuvenatedHigh],
    reason: 'The estimates overlap or fail the safety margin. Do not force a permanent Tier 6 pick from this evidence.',
  };
}
