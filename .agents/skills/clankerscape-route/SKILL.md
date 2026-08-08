---
name: clankerscape-route
description: Research, score, and maintain the ClankerScape first-to-Dragon route using sourced Equilibrium tasks, five point banks, phase-aware ranking, region/relic decision gates, and reset-triggered Blessing epochs.
---

# ClankerScape route planning

Use this skill for task ingestion, route order, point banks, regions, relics, Blessings, estimates, alternatives, and route commentary.

## Objective

Reach 48,000 League Points quickly and reliably while preserving a strong skilling route and a strong PvM route. Stop at Dragon.

Do not reduce the race to one brittle queue or one permanent build thesis.

## Source hierarchy

1. Current official Jagex League rules and reveals.
2. Current canonical RuneScape Wiki Equilibrium tasks and mechanics.
3. Provenanced canonical data in `sonnaya2/Equilibrium`.
4. PvME or RS Analysis only for unresolved mechanics, never route ordering.

Never use:

- another player's route order or commentary;
- public Wiki user-guide pages as templates;
- Reddit, YouTube comments, Facebook, or Twitter/X;
- `RS3-Dev/TheRSGuide.com`;
- Catalyst rows as Equilibrium truth;
- remembered or plausible placeholder tasks.

Unknown stays unknown.

## Hard feasibility

Exclude a task when:

- its region or dependency chain is unavailable;
- a required quest, item, shop, transport, level or activity is unavailable;
- its source is missing/conflicted;
- the required Relic/Blessing is not active;
- it is Catalyst test data;
- the player has marked it blocked/deferred.

Show the exact exclusion reason. Do not give illegal tasks a low score.

## Five point banks

Always maintain:

1. immediate skilling;
2. deep skilling;
3. immediate PvM;
4. deep PvM;
5. reserve RNG/time-gated/crowded tasks.

After 450 tasks, try to expose a guaranteed-next-2,000-point list with meaningful contributions from both skilling and PvM. Keep at least 4,000 feasible reserve points beyond the 48,000 finish corpus.

## Before 450 tasks

Optimise lexicographically:

1. time to next 50/175/300/450 task gate;
2. profitable Blessing breakpoint;
3. profitable Relic breakpoint;
4. transport, skill, gear and prerequisite unlocks;
5. locality batching;
6. tasks per active minute;
7. points per active minute;
8. lower RNG, crowding, failure and uncertainty.

A fast low-point task may correctly beat a slow high-point task.

## After 450 tasks

Optimise lexicographically:

1. deterministic points available now;
2. reliable points per active minute;
3. profitable remaining Relic/Blessing breakpoints;
4. cluster value;
5. optionality and queue balance;
6. lower P90 time, failure, crowding and supply rebuilding;
7. raw expected points per minute.

Do not let high-EV rare tails displace a deterministic floor.

## Optionality and switch cost

Reward a step only when it names the additional tasks, supplies, travel or queue alternatives it opens.

Track switching costs: banking/loadout, travel, aura/prayer/familiar changes, instance setup, warm-up/failure and attention. Switch queues when the alternative gain exceeds those costs.

## Region gates

Do not freeze a region solely from total points or to justify a relic.

Working seed:

- 175: Desert is provisional favourite;
- 300: Asgarnia/Morytania/Kandarin/Wilderness complement gate;
- 450: Anachronia/Tirannwn/Wilderness/Morytania reachable-portfolio gate.

At every gate compare:

- verified fast tasks;
- reachable-now and reachable-next-window tasks;
- deterministic floor;
- skilling/PvM split;
- Blessing tasks;
- setup/travel/crowding;
- dependency overlap;
- supplies and gear;
- P50/P90 completion.

When projections overlap inside uncertainty, show a close result rather than inventing a margin.

## Relic gates

Ordinary relics are permanent unless a current source says otherwise. Blessing progression has the confirmed resets.

### Tier 1

Working favourite: Golden Touch. Compare Survivalist and Endless Harvest against the actual early 50/175-task route.

### Tier 2

No frozen default before task import. Compare Animal Wrangler, Superheated and Divine Druid across pre-450 task count, supplies, later PvM and remaining Dragon time. Do not undercount Animal Wrangler's Fishing/Hunter/Farming/BGH/charm/seed scope.

### Tier 3

Working favourite: Voidwalker for route-wide travel. Assassin's Insight wins when Slayer/Blessing/PvM banks dominate. Nature's Network wins when Farming/patch travel and Animal Wrangler synergy dominate.

### Tier 4

Working favourite: Crystal Grace. Antiquarian wins on a sufficiently large Archaeology corpus. Transmutation wins when it removes region-resource blockers or converts a stored bank into faster tasks/gear.

### Tier 5–6 paired gate

Test Production Master + Devout first.

At 6,000:

- Production Master first when a banked production burst rapidly reaches 12,000;
- Devout first when portable banking/familiar power immediately wins;
- Clue Connoisseur only when sourced clue tasks provide a reliable point bank.

At 12,000:

- Rejuvenated is the working default;
- compare every missed Tier 1–5 relic;
- choose the one that removes the most remaining Dragon time.

Perkfection is not default. It wins only when sourced remaining Invention/perk/machine gains beat the best missed earlier relic by at least 8% after uncertainty and P90 penalties.

### Tier 7

Benchmark Infernal Fire, Icyenic Faith and Naragi Edict against the remaining encounter portfolio. Include Death Mark eligibility, Prayer bonus, Blessing package, kill duration, deaths, supplies, first clears and remaining skilling points. Choose lowest remaining route time, not dummy DPS.

## Blessing epochs

Track three reset charges and the exact history each reset would erase.

### True Equilibrium source blocker

The official Tier IV card says True Equilibrium scales **for each relic alignment selected**.

The current Equilibrium engine instead calls `uniqueBlessingPathCount` and scales the effect from distinct Blessing paths. That is an upstream source/implementation conflict.

Until it is fixed:

- do not assume one Order, one Balance and one Chaos Blessing produces three True Equilibrium stacks;
- do not use current True Equilibrium engine results in any route decision;
- do not infer relic alignment from icon colour or chart position without verified source data;
- treat every package containing True Equilibrium as blocked or run an explicitly labelled comparison with the effect excluded;
- require relic-alignment provenance and a corrected Equilibrium commit before importing a result.

See `docs/true-equilibrium-source-conflict.md`.

### Early accuracy candidate

- Big Boned
- Abyssal Cinders
- Avernic Rampage
- Demon's Mark

### Mixed generalist candidate after accuracy is solved

- Big Boned
- Striking Light
- Avernic Rampage
- Splash Zone

This candidate does not imply any True Equilibrium stack count. Its value must stand on Big Boned, Light, Avernic and Splash Zone until relic alignment is sourced.

### Late packages

The following are candidates only. Any package containing True Equilibrium remains blocked by the source conflict.

Order/Genesis:

- True Equilibrium **or a sourced Tier IV alternative**
- Lord of Light
- Tempered Heart
- Genesis Essence

Chaos/Chaotic Insight:

- Havoc Born or True Equilibrium benchmark
- Unholy Critual
- Perfidious
- Chaotic Insight when the segment has Chaos majority

Balance/Power Archive:

- True Equilibrium
- Tearing Thorns
- Envenomed
- Power Archive

Higher Power basic engine:

- Higher Power
- Lord of Light
- Tempered Heart
- Genesis Essence

Recommend a reset only when it removes a real blocker or lowers P50 remaining route by at least 8% and still wins at P90 after setup/death/supply costs. A result using the known-bad True Equilibrium resolver cannot satisfy this gate.

## Task records

Keep separate:

- sourced `TaskFact`;
- route `RouteAssumption`;
- local `PlayerTaskState`;
- region/relic/Blessing `DecisionGate`;
- five-bank `RoutePortfolio`.

A scoring pass never rewrites source facts. Player state never mutates the task corpus.

## Estimates

Store setup, travel, active, waiting, P50 RNG, P90 RNG and retry time separately. Unknown is `null`, not zero. Record confidence and sample count. Re-rank when live observations change an estimate by at least 20%.

## Route explanations

Name the actual reason:

- `Completes the 175-task gate without another bank trip.`
- `Held for Production Master; current processing wastes 11 minutes.`
- `Opens three Desert tasks and the next Blessing kill.`
- `Parked: high crowding; use the two deterministic alternatives first.`

Never use `efficient progression`, `good value`, `optimal synergy`, or an unexplained score.

## Route freeze

A candidate route requires:

- full task import and total reconciliation;
- no Catalyst production rows;
- legal dependencies and cumulative gates;
- sourced region/relic/Blessing decisions;
- no decision depending on the known-bad True Equilibrium resolver;
- 48,000-point finish plus reserve corpus;
- two meaningful queues where source data permits;
- second review of every step over five minutes;
- owner approval of irreversible decisions.
