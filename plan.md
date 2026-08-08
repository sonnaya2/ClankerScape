# ClankerScape Dragon Route — Final Audited Plan

**Status:** website implemented; route engine review-ready; exact Dragon ordering blocked by the incomplete canonical task corpus.  
**Target:** first practical 48,000 League Points for the Dragon trophy.  
**Source lock:** current official Jagex League rules and the canonical numeric RuneScape Wiki Equilibrium task rows. Repository data is a cache, not authority.

## Verdict on the previous plan

The previous plan was not ready to become a route. It had useful structure, but several conclusions were still dressed up as strategy:

1. It treated **Rejuvenated** as the likely Tier 6 default without pricing every missed Tier 1–5 relic.
2. It described **Perkfection** too narrowly and therefore understated both its route utility and its uncertainty.
3. It used an arbitrary percentage burden of proof instead of a permanent-choice margin tied to remaining route time.
4. It discussed a possible late ordinary-relic reset even though no such mechanic is published.
5. It leaned on region totals before a reachable task portfolio existed.
6. It implied the complete task corpus had been audited although the canonical page currently lacks the final Hard, Elite, and Master rows.
7. It contained confident working favourites before the combat and source conflicts that could reverse them were resolved.

Those defaults are removed. Unknowns stay unknown.

## Verified League frame

The route engine may rely on these facts:

- Dragon requires **48,000 League Points**.
- The published region totals reconcile to **1,152 tasks** and **109,380 points**.
- Misthalin and Havenhythe are starting regions.
- Karamja unlocks automatically at **50 completed tasks**.
- Elective regions unlock at **175, 300, and 450 completed tasks**; only three elective regions may be chosen.
- Relic thresholds are 10, 750, 1,750, 3,500, 6,000, 12,000, and 20,000 points.
- Blessing progression unlocks at 1, 3, 5, 9, 12, 16, 20, and 26 Blessing tasks.
- There are **20 relic choices**, not 21: five three-choice tiers, two Tier 6 choices, and three Tier 7 choices.
- There are 24 path/God Blessing cards.
- Blessing progression has up to **three resets**.
- No ordinary-relic reset is published.
- Rejuvenated grants one additional relic from an earlier tier; it does not replace or repair an existing choice.

## Hard source gate

The website must not freeze a final route until the numeric canonical snapshot satisfies all of these:

1. source page is `Equilibrium League/Tasks`;
2. every row has a unique numeric Wiki task ID;
3. every task has one valid point value: 10, 30, 80, 200, or 400;
4. all five tiers are present;
5. row count equals 1,152;
6. point sum equals 109,380;
7. no Catalyst/testing row is present;
8. source revision and fetch time are recorded.

A partial import remains useful for early execution, but its missing tiers remain a visible blocker. Every imported task starts `unclassified`, contributes to no bank, and cannot silently become a skilling/PvM recommendation or a “complete” route.

## Optimisation objective

The objective is not maximum theoretical points or maximum isolated DPM. It is minimum expected wall-clock time to 48,000 points while preserving enough optionality to switch between easy skilling and PvM.

For every task or task cluster, estimate:

- direct completion time;
- setup and travel;
- requirements and unlock dependencies;
- shared preparation reused by other tasks;
- failure/retry cost;
- supply and banking cost;
- P50 and P90 time;
- relic/Blessing/region assumptions;
- whether its points belong to the active route or a reserve.

The route keeps five banks:

1. immediate skilling;
2. deep skilling;
3. immediate PvM;
4. deep PvM;
5. reserve.

After the 450-task region gate, maintain at least **4,000 guaranteed reserve points** in real, reachable task rows. “There are plenty of points left” is not a reserve.

## Route phases

### Phase A — start to 50 tasks

Use only verified Easy/Medium rows and obvious low-setup completions. Build both immediate queues from the start. Avoid a long skilling grind that leaves no PvM release valve and avoid boss preparation whose points repay only after an elective region.

### Phase B — Karamja to 175 tasks

Exploit automatic Karamja access and shared unlocks. Keep the first elective region undecided until each candidate has a reachable task portfolio, not just an official point total.

### Phase C — 175 to 300 tasks

Choose the first elective region only when its conservative portfolio beats alternatives after setup, failure, and opportunity cost. Re-score the second pick from the new state; do not assume the best first region is part of the best three-region package.

### Phase D — 300 to 450 tasks

The third-region choice must be evaluated as a package problem. Include cross-region task auto-completion, automatic quest completion, Blessing-task access, gear routes, bosses, and travel effects.

### Phase E — 450 tasks to 48,000 points

The objective changes from task-count speed to point speed. Keep the skilling and PvM queues independently executable, draw from whichever has the best current risk-adjusted return, and preserve the 4,000-point reserve until the finish is locked.

## Region audit

Published regional points are upper bounds. They do not prove the fastest region.

The website therefore exposes, for every elective region:

- official tasks and points;
- auto-completed quests;
- Blessing-task contribution;
- user-audited reachable points;
- P50 and P90 route time;
- reachable points per hour;
- selected-package theoretical pool.

No region is selected by default. The decision remains `unscored` until the task corpus and route estimates exist.

The Wilderness/Daemonheim reward-shop language in the official FAQ is internally inconsistent. Any region score depending on that shop remains blocked until the source is clarified.

## Complete relic audit

Every relic must be scored in **remaining-route minutes**, including non-obvious effects.

| Tier | Relics | Route channels that must be priced |
|---|---|---|
| 1 | Endless Harvest; Survivalist; Golden Touch | banking/persistence; doubled gathering and Archaeology; Agility/Thieving/coins/Prayer/supplies |
| 2 | Animal Wrangler; Superheated; Divine Druid | Fishing/Hunter/Farming/BGH/charms; Cooking/Firemaking/Smithing/materials; Herblore/Summoning/Divination |
| 3 | Assassin’s Insight; Nature’s Network; Voidwalker | combat access/accuracy; transport and Farming; movement/travel/combat positioning |
| 4 | Crystal Grace; Transmutation; Antiquarian | crystal/equipment access; resource conversion; Archaeology restoration/chronotes/materials |
| 5 | Clue Compass; Production Master; Devout | clue routing; production batching; mobile banking/familiar scaling/Prayer |
| 6 | Perkfection; Rejuvenated | Invention compression and combat perks versus the best missed Tier 1–5 relic |
| 7 | Infernal Fire; Naragi Edict; Icyenic Faith | route-weighted combat, survival, healing, revive, and encounter coverage |

Three relics the previous plan especially risked underrating:

- **Animal Wrangler** is not merely a Fishing relic. Its Hunter, BGH, Farming, beans, marks, charms, seeds, and banking effects can remove several different route bottlenecks.
- **Antiquarian** is not cosmetic convenience. Material reduction, restoration throughput, and chronote multiplication can compress an Archaeology-heavy route.
- **Devout** is not only Prayer. A mobile bank and heavily scaled familiar can change travel, supply, and boss execution time.

## Tier 6 — Perkfection versus Rejuvenated

Neither is the default.

### Perkfection channels

The official card includes:

- two extra freely swappable gizmo slots while augmented gear is worn;
- 10× XP-capacitor storage and charging;
- no junk chance, toggleable;
- 10× Invention materials;
- no augmented-item or machine charge drain;
- machines unlocked from level 1, operating 10× faster with 10× capacity;
- workbench teleports and unlocked Dwarven/Goblin blueprints;
- helpful perks triggering 20% more often, without stacking the item-level-20 benefit.

The 20% line is **not** a 20% DPS multiplier. If affected proc perks generate 6% of throughput, the direct proc uplift is 1.2% before interaction with the rest of the build.

The implemented P50 model is:

```text
direct saved
  = setup/material time removed
  + critical-path machine time removed
  + charge-maintenance time removed
  + workbench/blueprint travel removed

helpful-proc throughput
  = affected helpful-perk throughput share × 20%

combat throughput gain
  = extra-gizmo throughput + helpful-proc throughput

combat time with Perkfection
  = augmented combat minutes / (1 + combat throughput gain)

Perkfection P50 saved
  = direct saved + combat time saved
```

Machine speed counts only when the machine output is on the Dragon critical path. Ten-times capacity is not ten-times saved time when the machine was idle or unnecessary.

### Illustrative—not recommended—presets

The website ships editable examples to expose sensitivity:

- light Invention route: about **73 minutes** saved;
- mixed Dragon route: about **163 minutes** saved;
- Invention-heavy route: about **332 minutes** saved.

These are scenario inputs, not sourced universal values and not a Perkfection recommendation.

### Rejuvenated channels

For every missed Tier 1–5 relic, estimate the remaining time it would save from Tier 6 onward. This must include task unlocking, supply creation, travel, banking, gear access, failure reduction, and shared setup—not just XP rate.

The best missed earlier relic is the Rejuvenated comparator. A zero/blank ledger leaves Tier 6 unscored.

### Permanent-choice decision rule

A Tier 6 winner is clear only when both conditions hold:

1. P50 advantage exceeds `max(30 minutes, 3% of remaining route time)`; and
2. conservative uncertainty intervals do not overlap.

Otherwise the result is `close` and no permanent pick is forced.

## Reset audit

### Ordinary relics

There is no published ordinary-relic reset, early or late. The route must assume one permanent choice per relic tier.

Rejuvenated adds one earlier-tier relic. It does not:

- refund a previous relic;
- replace a bad relic;
- reopen every tier;
- let the route respec at Dragon.

### Blessings

Blessing progression can be reset three times. The website stores each path as a separate epoch so the previous plan is not erased.

A late Blessing reset is justified only when:

- the remaining task portfolio has materially changed;
- the new path package saves more time than rebuilding Blessing progression and changing gear/rotations;
- the saving repays before 48,000 points;
- the comparison survives P90/failure/supply costs;
- no blocked mechanic is decisive.

Do not spend a reset merely because a later combat package looks stronger on a dummy.

## Blessing audit

The first three path picks derive God Tier 1; the final three derive God Tier 2. Two or more picks on a path grant that path’s God Blessing. One of each derives Balance.

The planner tracks all six path picks, both derived God Blessings, three resets, and epoch history.

`True Equilibrium` remains blocked for combat ranking because the official card scales from distinct **relic alignments**, while the current Equilibrium combat resolver scales from distinct Blessing paths. Passing tests in the combat repository do not override the official card.

Unsupported incoming-damage, survival, revive, healing, poison, or phase mechanics remain labeled unmodeled/partial/scenario-dependent rather than converted into fake zero damage.

## Website implementation

The first release is a dependency-free static application:

- `index.html` — accessible shell and source dialog;
- `styles.css` — dense responsive ledger UI;
- `src/app.js` — local state and rendering;
- `src/domain/route.js` — task banks, gates, coverage, and region projections;
- `src/domain/perkfection.js` — Tier 6 break-even model;
- `src/domain/blessings.js` — path derivation and reset epochs;
- `data/league-facts.json` — reviewed fact snapshot;
- `data/equilibrium-tasks.snapshot.json` — canonical numeric task snapshot;
- `scripts/sync-equilibrium-tasks.mjs` — fail-closed Wiki importer with unchanged-revision no-op;
- `scripts/validate-data.mjs` — source/data invariants;
- `.github/workflows/pages.yml` — manual-only static Pages deployment.

React/Vite were removed from the first-release architecture because the application does not need them yet. The static ES-module design has no production package dependency, deploys directly to GitHub Pages, and is easier to audit. A framework can be reconsidered only when the full 1,152-row corpus creates measured state or rendering pressure.

## Product behavior

The website provides:

- compact point/task/source header;
- dominant route ledger;
- separate immediate skilling and PvM next actions;
- explicit unclassified intake, five route banks, parking, and reserve coverage;
- all 20 relics with verified card details;
- editable Rejuvenated minute values;
- Perkfection sensitivity calculator and uncertainty ranges;
- all regions with reachable P50/P90 scoring;
- all Blessing cards, derived God paths, reset count, and epoch history;
- source/conflict dashboard;
- local progress import/export;
- no account, analytics, backend, or generated art.

When the task snapshot is unavailable, the ledger renders eight concrete audit gates instead of fabricated task rows.

## Verification gates

Before merge:

- syntax, data, parser, route, Blessing, and Tier 6 tests pass;
- task source remains fail-closed;
- 20 relics and 24 Blessings validate;
- official regional totals reconcile;
- desktop shows at least eight usable rows above the fold;
- 1280×800 and 1600×900 have no horizontal overflow;
- phone widths have no document-level horizontal overflow;
- every tab renders without console or page errors;
- completion and source actions remain separate;
- keyboard tabs, labelled tabpanels, progress semantics, and dialog focus restoration work;
- denied local storage falls back to visibly non-persistent in-memory state;
- local import rejects oversized/incompatible data;
- no secret, account data, remote analytics, or unnecessary dependency is introduced.

## Current release decision

The website is ready for code review and the manual deployment path is prepared but has not been run. The exact Dragon route is **not** ready to freeze until the canonical task snapshot reconciles to all 1,152 tasks and 109,380 points, then every region/relic/Blessing decision is rerun against the reachable task portfolios.

That is the correct failure mode. A confident route built from missing task tiers would be worse than no final route.
