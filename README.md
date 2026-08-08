# ClankerScape

ClankerScape is a local-first RuneScape 3 **Leagues II: Equilibrium** route workbench for reaching the 48,000-point Dragon trophy. It tracks a source-locked task ledger, explicit unclassified intake, separate skilling/PvM point banks, region opportunity cost, all 20 relic choices, Blessing epochs/resets, and a break-even comparison for Perkfection versus Rejuvenated.

The application deliberately does **not** publish a fake final route while the canonical Equilibrium task page is incomplete. Newly synced rows remain unclassified until reviewed. The checked-in snapshot starts fail-closed and may be refreshed to the current partial corpus by source sync; the route screen shows unresolved decisions instead of silently substituting Catalyst tasks or guessed Hard/Elite/Master rows.

## Run locally

```bash
npm run verify
npm run serve
```

Open `http://localhost:4173`.

No install step is required. The production application is dependency-free HTML, CSS, and ES modules. A manual-only Pages workflow is included but is not run automatically.

## Source sync

```bash
npm run sync:tasks
npm run validate
```

`scripts/sync-equilibrium-tasks.mjs` reads numeric task rows from the canonical RuneScape Wiki page. A snapshot is marked `full` only when it contains exactly **1,152 tasks** worth **109,380 points**. Anything else remains `partial` and blocks route freezing.

The six-hourly/manual GitHub Action in `.github/workflows/source-sync.yml` performs the same fail-closed import and creates no commit when the source revision and parsed rows are unchanged. It never accepts Catalyst rows as Equilibrium truth.

## Verification

`npm run verify` runs syntax checks, data invariants, parser tests, route-domain tests, Blessing reset/derivation tests, and the Perkfection model tests.

Current audited facts and remaining blockers are in [plan.md](plan.md) and [docs/final-audit.md](docs/final-audit.md).

## Data and privacy

Progress, estimates, region selections, relic choices, and Blessing epochs remain in browser local storage unless explicitly exported. ClankerScape has no account system, analytics, cookies, remote database, or player-name collection.

Original project code/docs use the repository CC0 licence; imported RuneScape Wiki task text retains its source licence and attribution. See [NOTICE.md](NOTICE.md).

RuneScape and Jagex are trademarks of Jagex Limited. ClankerScape is an unofficial fan tool and is not endorsed by Jagex.
