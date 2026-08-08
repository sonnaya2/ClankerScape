---
name: clankerscape-route
description: Research, score, and maintain the ClankerScape first-to-Dragon route using sourced Equilibrium tasks, phase-aware task-count and point optimisation, and separate skilling/PvM queues.
---

# ClankerScape route planning

Use this skill for task ingestion, route ordering, region choices, relic choices, Blessing paths, and route commentary.

## Objective

Reach 48,000 Equilibrium League Points quickly without turning the route into one uninterrupted grind. Keep a viable skilling queue and PvM queue so the player can switch when blocked, tired, undergeared, or waiting on RNG.

Stop optimising at Dragon. Do not silently convert the project into a max-points guide.

## Source hierarchy

1. Current official Jagex League rules and reveals.
2. Current RuneScape Wiki Equilibrium task/mechanic pages.
3. Provenanced canonical data in `sonnaya2/Equilibrium`.
4. PvME or RS Analysis only for mechanics the Wiki does not cover.

Never use:

- another player's route ordering;
- public user guide pages as route templates;
- Reddit, YouTube comments, Facebook, or Twitter/X;
- `RS3-Dev/TheRSGuide.com` or its code/content;
- Catalyst rows as if they were Equilibrium tasks;
- invented placeholders.

A blocked source remains blocked. Mark uncertainty instead of filling the gap.

## Two optimisation modes

### Before 450 completed tasks

Region unlocks are task-count milestones. Prefer tasks per active minute, locality batching, prerequisite overlap, passive XP, and Blessing progress. A low-point task may be correct when it opens the next region sooner.

### After 450 completed tasks

All region picks are available. Prefer reliable points per active minute, clustered rewards, gear progression, Blessing progress, and tasks already near completion. Penalise setup, failure risk, time gates, and rare-drop tails.

Do not use one static score across both modes.

## Default macro route

- Start: Misthalin + Havenhythe.
- 50 tasks: automatic Karamja.
- 175 tasks: Kharidian Desert.
- 300 tasks: Asgarnia.
- 450 tasks: default Anachronia after a live comparison; Tirannwn then Wilderness are fallbacks.

Desert is the count accelerator. Asgarnia is the mixed task/infrastructure bridge. Anachronia is the default point-density finisher.

Re-run the comparison when the full task list changes. Total regional points alone do not decide the final pick.

## Default relic route

1. Golden Touch
2. Superheated
3. Assassin's Insight
4. Crystal Grace
5. Production Master
6. Perkfection
7. Infernal Fire

For every irreversible pick, retain a runner-up and list the sourced task clusters each option accelerates.

Do not claim normal relics can be reset. Confirmed reset charges apply to Blessing progression. Rejuvenated grants an additional earlier relic; it does not rewrite prior selections.

## Default Blessing route

Early low-gear path:

- Big Boned
- Abyssal Cinders
- Avernic Rampage
- Demon's Mark

Mid/late default candidates:

- True Equilibrium
- Unholy Critual
- Perfidious for the crit/Inferno speed branch, or Envenomed for the Perkfection/Power Archive infrastructure branch

Keep three confirmed Blessing reset charges in a visible ledger. Bank resets until a current path materially blocks progress. Maintain an Order/Genesis Essence recovery branch for weak gear and a Balance/Power Archive branch for developed poison/perk infrastructure.

Do not call a final path without benchmarking representative targets in the Equilibrium combat engine.

## Task record discipline

Sourced facts and route estimates are different data.

A task fact includes its name, region, tier, points, requirements, Wiki page, source URL, and verification date. A route estimate includes setup time, active time, RNG range, failure risk, synergy, and confidence.

Never overwrite a sourced field with an estimate. Never give an estimate the visual treatment of a confirmed rule.

## Queue discipline

Every phase must expose:

- one executable skilling action;
- one executable PvM action;
- the reason each is currently valuable;
- a trigger for switching.

Switch queues when:

- the next row is blocked by a level/item;
- expected RNG exceeds the player's tolerance;
- a boss repeatedly fails;
- a new relic/Blessing/region changes the ranking;
- a production batch or stored-resource threshold is ready;
- the current activity becomes mentally stale.

The route may recommend, but the player can mark rows do-now, queued, blocked, deferred, completed, or skipped for Dragon. Recalculate future recommendations without rewriting completed history.

## Final-region comparison

At task 450 calculate, for each candidate:

- tasks reachable now with less than 15 minutes of setup;
- tasks reachable in the next four active hours;
- reliable points after excluding severe time gates and extreme RNG;
- Blessing-task access;
- synergy with current levels, relics, gear, and queued prerequisites.

Show the decisive rows and assumptions. Do not output an unexplained score badge.

## Validation

Before publishing a route update:

- compare task/point totals to the official table;
- reject duplicate task IDs;
- reject rows missing a Wiki title/source exception;
- reject tiers or point values absent from source data;
- verify region availability and unlock thresholds;
- verify relic/Blessing names and reset accounting;
- scan commentary for copied route prose;
- identify assumptions with confidence and date.

When data is incomplete, publish the macro route and blocked decisions—not fake detail.
