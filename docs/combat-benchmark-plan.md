# Combat benchmark plan

Status: planning contract. ClankerScape does not implement combat math. It imports versioned comparison results produced by the Equilibrium combat engine.

## Blocking source conflict

The official True Equilibrium card scales from **relic alignment**. The current Equilibrium resolver scales it from distinct **Blessing paths** through `uniqueBlessingPathCount`.

That implementation is not valid benchmark input.

Until `docs/true-equilibrium-source-conflict.md` is resolved upstream:

- packages containing True Equilibrium are blocked;
- they may be run only with True Equilibrium excluded and the exclusion made explicit;
- ClankerScape rejects any imported result whose True Equilibrium count is derived from Blessing paths;
- a corrected result must include selected relic alignments, their sources and the resolved distinct-alignment count.

Do not replace the blocked result with an automatic Havoc Born recommendation.

## Purpose

Use representative combat scenarios to compare:

- early Big Boned/Cinders/Avernic/Demon's Mark;
- mixed Big Boned/Striking Light/Avernic/Splash Zone;
- Order/Genesis variants, with True Equilibrium blocked until fixed;
- Chaos/Chaotic Insight variants using sourced Tier IV alternatives;
- Balance/Power Archive variants after True Equilibrium is fixed or explicitly excluded;
- Higher Power/Lord of Light/Tempered Heart/Genesis Essence;
- Infernal Fire, Icyenic Faith and Naragi Edict variants.

Do not rank these from tooltip percentages or one dummy DPM result.

## Engine rules

Follow Equilibrium's current skills:

- `combat-math` owns sourced formulas, Damage Potential, crit layers, caps, rounding and modifier order;
- `combat-sim` owns ticks, cast legality, cooldown/resource clocks, scheduled events, state-changing randomness and horizon accounting;
- `league-blessings` owns Blessing facts and support status.

Current engine code is evidence only when it agrees with current sources. A test or implemented resolver does not override an official card.

ClankerScape imports result metadata only. It does not copy the engine.

## Scenario portfolio

Build scenarios from the actual remaining Dragon route after regions and tasks are known. Include:

- short, medium and long single targets;
- multi-target/wave combat;
- large targets;
- poisonable and poison-immune targets;
- Death-Mark-eligible and ineligible/phase-gated targets;
- low-gear first clears and repeat clears;
- high incoming-damage encounters where survival time matters.

Weight scenarios by their expected contribution to the remaining route, not by prestige.

## Inputs

Record explicitly:

- style, bar, weapon configuration/tier, armour, life, Prayer bonus and critical stats;
- set effects, equipped/stored perks and Herblore level;
- Relics/Blessings;
- relic alignment and its source status when True Equilibrium is present;
- opening adrenaline, cooldowns, stacks, conjures, windows and target debuffs;
- target Damage Potential/weakness, size, life state, poisonability and target count.

Run cold-start, realistic route-start and repeat-clear opening states when relevant. Do not bury a zero-resource/everything-ready assumption.

## Randomness

Expected value is allowed only when randomness changes damage without changing future state.

Use state branching when randomness changes adrenaline, cooldowns, windows, stacks, future events, target state or later cast legality. Avernic Rampage is the obvious example.

If exact branching is too expensive, expose the seeded approximation method, sample count and any discarded probability mass. Do not compare an exact result with an undocumented approximation.

## Metrics

Keep these distinct:

- **fixed-window:** only damage that lands inside a stated tick window, divided by that window;
- **natural-completion:** all scheduled tails through the rotation's own end, divided by actual elapsed ticks.

Report the denominator, opening state, ending state, casts, real hits, generated effects, excluded mechanics and support status.

The combat engine is not a boss-phase simulator. Route-level estimates separately add phase downtime, setup, retries, food/familiar/banking time, travel and number of required clears.

## Unsupported survival

Do not convert Icyenic protection/Soul Split, Naragi healing/revive, Lord of Light healing, Big Boned survival or other unsupported incoming-combat effects into guessed damage.

Label each mechanic as modeled, partially modeled, scenario-dependent or not modeled, and retain `mechanics unverified` where applicable. Unsupported does not mean ordinary zero.

## Decision rule

Recommend a Blessing reset or Tier 7 package only when it:

- lowers P50 remaining route time by at least 8%;
- still wins at P90 after setup, failure and supply costs;
- repays before 48,000 points;
- does not depend on one disputed mechanic or rare encounter;
- exposes the decisive scenarios and exclusions;
- contains no known source/implementation conflict that can change the winner.

When results overlap within uncertainty, report `close` and prefer broader coverage, lower failure cost and fewer unverified mechanics.

## Imported result requirements

Every result must include:

- schema and benchmark version;
- Equilibrium commit/source revision;
- package and scenario IDs;
- explicit opening state and target assumptions;
- fixed-window or natural-completion metric and denominator ticks;
- expected damage and ending state;
- support/exclusion metadata;
- RNG method and approximation metadata;
- verification date;
- for True Equilibrium, selected relic alignments and provenance.

Reject results without this metadata, results produced by the current Blessing-path True Equilibrium resolver, or results that conceal a blocked mechanic as zero.
