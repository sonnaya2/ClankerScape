# ClankerScape

ClankerScape plans a RuneScape 3 **Leagues II: Equilibrium** route to the 48,000-point Dragon trophy.

The checked-in task file currently has **533 Easy and Medium tasks worth 11,110 points**. Hard, Elite, and Master are still missing from the task page, so the site does not claim a finished Dragon route.

## Run it

```bash
npm run verify
npm run serve
```

Open `http://localhost:4173`.

The site is plain HTML, CSS, and JavaScript. No install step, account, analytics, cookies, or remote database.

## What it tracks

- task completion, when to do it, and an optional time estimate;
- separate skilling and PvM queues;
- region picks, quests, and optional time estimates;
- all relic choices;
- Perkfection versus Rejuvenated;
- Blessing picks and three resets;
- local progress import and export.

## Refresh tasks

```bash
npm run sync:tasks
npm run validate
```

The importer only reads numeric rows from `Equilibrium League/Tasks`. It will not mix in Catalyst tasks. The full file must reconcile to **1,152 tasks and 109,380 points** before the route can be treated as complete.

## Checks

```bash
npm run verify
```

This runs syntax checks, data checks, parser tests, route tests, Blessing tests, Tier 6 tests, and UI-copy guards.

RuneScape Wiki task text keeps its source licence and attribution. See [NOTICE.md](NOTICE.md). RuneScape and Jagex are trademarks of Jagex Limited; this is an unofficial fan tool.
