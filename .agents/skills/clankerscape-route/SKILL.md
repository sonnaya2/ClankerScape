---
name: clankerscape-route
description: Source, legality, optimization, and uncertainty rules for the Clankerscape Dragon route. Use before changing task data, task order, regional picks, Relics, Blessings, estimates, alternatives, or route explanations.
---

# Clankerscape route

The route goal is minimum elapsed time to 48,000 Equilibrium League Points. It is not a max-points route and not a generic recommendation list.

## Evidence boundary

Use Jagex, the canonical RuneScape Wiki task records, and verified owner-authored Equilibrium data. Never import another player's ordered route. Never inspect the blacklisted TheRSGuide repository.

A task is not routable until its identity, region, tier, points, requirements, and source revision are known. Unknown values stay unknown.

## Hard legality

Reject a route step when:

- its region is not unlocked at that point;
- a dependency, quest, item source, transport, or skill method crosses into a locked region;
- its prerequisite state is absent;
- its task record is a Catalyst placeholder;
- its completion depends on an unverified mechanic without a visible `VERIFY` gate;
- cumulative points/tasks do not support the selected Relic, Blessing, or region state.

Check complete dependency chains, not only the task's displayed region.

## Objective by phase

Before 450 tasks, optimize lexicographically:

1. earliest next task-count gate;
2. profitable Blessing breakpoint;
3. profitable Relic breakpoint;
4. transport/power/cluster value;
5. points per minute;
6. lower RNG, crowding, setup, and uncertainty.

After 450 tasks:

1. earliest 48,000 points;
2. profitable remaining power breakpoints;
3. deterministic points per minute;
4. cluster amortization;
5. lower variance and crowding.

Do not reduce this to a global points/minute sort.

## Catalyst lessons

Carry forward process, not exact tasks:

- tasks are progression currency and dependency nodes;
- re-solve after every power threshold;
- delay RNG until route power improves it;
- avoid large production work just before Production Master;
- prefer clusters that combine points, gear, unlocks, and follow-on tasks;
- hard-block cross-region prerequisites;
- label uncertainty rather than narrating past it.

## Current provisional choices

Region order:

1. Asgarnia at 175;
2. Kharidian Desert at 300;
3. Anachronia at 450.

Relics:

1. Golden Touch;
2. Superheated;
3. Voidwalker;
4. Crystal Grace;
5. Production Master;
6. Rejuvenated, defaulting to Assassin's Insight;
7. Infernal Fire, with an Icyenic Faith contingency.

Blessings:

1. Big Boned;
2. Abyssal Cinders;
3. Avernic Rampage;
4. Demon's Mark;
5. True Equilibrium;
6. Lord of Light;
7. Tempered Heart;
8. Genesis Essence.

These are decision records, not immutable constants. Preserve their invalidation conditions from `plan.md`.

## Mandatory comparisons

Before route freeze:

- Asgarnia versus Morytania for the first elective;
- Anachronia versus Tirannwn/Wilderness for final point conversion;
- Assassin's Insight versus Survivalist as the Rejuvenated pick;
- Infernal Fire versus Icyenic Faith on actual route encounters;
- True Equilibrium versus Havoc Born with Big Boned and Lord of Light interactions;
- Lord of Light versus Unholy Critual/Tearing Thorns where encounter shape matters.

Use actual route minutes and cumulative legality. Do not compare isolated tooltip percentages.

## Route step explanation

Every step needs one concise reason based on a real constraint, for example:

- `Finishes the 175-task gate without another bank trip.`
- `Held until Production Master; processing now is 14 minutes faster.`
- `Opens three Desert tasks and the next Blessing kill.`
- `Parked: crowded boss, use the two deterministic alternates first.`

Never use generic reasons such as `efficient progression` or `good value`.

## Estimates

- Store active, travel, setup, and expected waiting time separately when evidence supports them.
- Use `null`, not zero, for unknown time.
- Record confidence and sample count.
- A live observation changing an estimate by at least 20% triggers re-ranking.
- Do not silently edit the route around one outlier run.

## Route freeze

A route may be labelled candidate only after task totals reconcile, all dependencies are legal, region and Blessing gates pass, cumulative points reach each planned threshold, and a second review challenges every step above five minutes.
