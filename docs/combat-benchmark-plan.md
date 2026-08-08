# Combat benchmark contract

ClankerScape does not implement RS3 combat. It may import versioned benchmark results from the Equilibrium stateful combat simulator only when the benchmark is compatible, source-clean, and relevant to remaining route time.

## Required metadata

Every imported result must name:

- engine commit/schema;
- loadout and selected relic/Blessing package;
- target and target size/weakness/defence;
- starting resources, cooldowns, stacks, summons, buffs, and target state;
- rotation/action policy;
- fixed-window or natural-completion denominator;
- RNG treatment and retained probability mass;
- modeled, partial, scenario-dependent, and excluded mechanics;
- supply, failure, setup, and encounter assumptions kept outside engine DPM.

## Rejection gates

Reject a result when:

- its selected mechanic conflicts with a stronger current source;
- an unsupported mechanic is represented as zero;
- branch loss or approximation can reverse the winner and is undisclosed;
- attached riders are counted as independent hits incorrectly;
- opening state is missing;
- it uses an incompatible engine version;
- it cannot be mapped to a route encounter/time estimate.

`True Equilibrium` results are currently rejected because the official card scales from distinct relic alignments while the current combat resolver derives its count from Blessing paths.

## Route conversion

Engine damage is only one input. Convert a combat package to route time using:

- encounter count;
- kill/phase time distribution;
- setup and travel;
- supply creation and banking;
- death/failure probability and recovery;
- learning/consistency cost;
- whether the package improves non-combat tasks or unlocks.

## Permanent/reset decision rule

Recommend a Tier 7 package or Blessing reset only when it:

- beats the best alternative by at least `max(30 minutes, 3% of remaining route P50)`;
- has conservative uncertainty ranges that do not overlap;
- still wins at P90 after setup, failure, and supply costs;
- repays before 48,000 points;
- is not carried by one disputed mechanic or rare encounter;
- exposes decisive scenarios and exclusions.

Otherwise report `close` and prefer broader coverage, lower failure cost, and fewer unverified mechanics.
