# Adversarial planning review — draft PR #2, revision 2

Review target: `planning/dragon-route-foundation`  
Scope: route strategy, opportunity cost, information architecture, source integrity and implementation readiness

## Verdict

**REVISED PACKAGE IS READY FOR OWNER REVIEW. NOT READY FOR MERGE OR PRODUCTION IMPLEMENTATION.**

The first planning verdict is withdrawn. It approved a narrow relic/region thesis that treated Perkfection as a strong mixed-route default. That conclusion failed basic opportunity-cost analysis.

The revised plan now:

- explicitly retracts Perkfection as the Tier 6 default;
- treats Tier 5 and Tier 6 as one paired decision;
- defaults to Rejuvenated while comparing every missed Tier 1–5 relic;
- removes Invention synergy as a reason to force Asgarnia;
- replaces one ranked queue with five point banks and two always-visible next actions;
- treats Blessings as reset-triggered combat epochs;
- benchmarks all three Tier 7 relics against the remaining encounter portfolio;
- separates completion and Wiki actions in the UI contract;
- incorporates the rendered Grok comparison without copying its code or invalid route assumptions.

The strategy is now materially better, but the exact row-by-row route remains blocked by the incomplete task corpus.

## Blockers before production route implementation

### 1. Full Equilibrium task corpus is unavailable to this review

Consequence:

- exact task ordering cannot be validated;
- task-time estimates cannot be calibrated;
- region gates cannot be resolved;
- Tier 2/Tier 4 sensitivity cannot be resolved;
- Rejuvenated's best extra relic cannot be chosen;
- Tier 7/Blessing encounter weighting cannot be final.

Required:

- import canonical tasks with numeric IDs, tiers, points, regions, requirements, Blessing flags and source revision;
- reconcile official totals;
- reject Catalyst production rows;
- create separate source facts and route assumptions;
- regenerate decisions from the sourced corpus.

### 2. Irreversible decision system awaits owner review

Pending approval is now the system in `plan.md` section 21, not the old fixed seven-item route.

Core decisions:

- five point banks plus two executable next actions;
- live region gates rather than forced Asgarnia/Anachronia;
- no frozen Tier 2 favourite before task import;
- Rejuvenated-first Tier 6 with a Perkfection burden of proof;
- portfolio-weighted Tier 7 selection;
- reset-triggered Blessing epochs;
- corrected row/control and mobile information architecture.

## Correction review

### Perkfection

Previous claim:

> Perkfection is a strong mixed-route default with Asgarnia.

Revised finding:

> Unsupported and likely wrong.

Perkfection competes with one complete additional Tier 1–5 relic. The comparison must include the best missed relic, not a weak generic alternative. Production Master + Devout alone is a broad pairing that attacks substantially more of the remaining route than Invention-only acceleration.

Perkfection now requires:

- sourced remaining Invention/perk/machine gains;
- comparison against every missed earlier relic;
- at least 8% P50 improvement after uncertainty;
- P90 win after setup, RNG, failure and supply costs.

This correction is correctly recorded in the plan, route skill and review skill.

### Asgarnia

Previous route partially used Asgarnia to support Perkfection.

Revised finding:

- Invention itself is globally accessible under the League rules;
- Asgarnia is still useful for its Guild/machines, workshops, GWD/Nex/AoD/Vorago/ED1 and other content;
- it must win the 300-task portfolio comparison on reachable tasks, queue balance and total route time;
- it is no longer automatic.

### Tier 5–6 pairing

The revised Production Master/Devout hypothesis is a stronger starting comparison because it supports both route queues:

- Production Master converts stored materials into tasks, XP and equipment;
- Devout removes banking friction and adds familiar utility/combat power.

This is still a hypothesis, not a frozen pair. Rejuvenated must compare all missed earlier relics at 12,000 points.

### Tier 2

The old plan underestimated Animal Wrangler by treating it as a narrow fishing/Hunter option. Its official effect spans Fishing, Hunter, Farming, Big Game Hunter, charms, seeds/herbs, beans and banking.

The revised plan correctly keeps Animal Wrangler, Superheated and Divine Druid unresolved until the task corpus can compare their whole-route value.

### Tier 7

Infernal Fire is no longer called the automatic speed pick.

Required comparison now includes:

- Death Mark eligibility/phase behaviour;
- Prayer bonus and Icyenic scaling;
- Naragi burst/first-clear value;
- kill duration;
- death/failure rate;
- food, familiar and banking time;
- remaining skilling points that reduce required boss volume.

This is the correct objective: remaining Dragon time, not dummy damage.

## Blessing review

The revised epoch model is stronger than a static path.

### Early candidate

- Big Boned
- Abyssal Cinders
- Avernic Rampage
- Demon's Mark

This is coherent for low gear and accuracy.

### Mixed candidate

- Big Boned
- Striking Light
- Avernic Rampage
- Splash Zone

This creates one path of each alignment and provides a broad generalist state after accuracy is solved.

### Late packages

- Order/Genesis: True Equilibrium + Lord of Light + Tempered Heart;
- Chaos/Chaotic Insight: Havoc/True benchmark + Unholy Critual + Perfidious;
- Balance/Power Archive: True Equilibrium + Tearing Thorns + Envenomed;
- Higher Power basic engine: Higher Power + Lord of Light + Tempered Heart.

The official reveal places Lord of Light and Tempered Heart in Order. The revised review skill now guards this path assignment.

Remaining uncertainty:

- True Equilibrium's published wording says `relic alignment`; the current Equilibrium implementation models distinct Blessing paths. The source conflict must be resolved or shown as provisional before displaying a multiplier.
- Combat interactions still require representative benchmarks.

## Route-portfolio review

The five-bank model fixes a major weakness in the original plan.

Required banks:

1. immediate skilling;
2. deep skilling;
3. immediate PvM;
4. deep PvM;
5. reserve.

The visible `guaranteed next 2,000 points` and 4,000-point reserve-corpus goals are useful anti-fragility requirements. They must reconcile with actual route rows rather than become decorative metrics.

The plan correctly distinguishes pre-450 task-count optimisation from post-450 deterministic/reliable point conversion.

## Data-model review

The revised plan now explicitly separates:

- `TaskFact`;
- `RouteAssumption`;
- `PlayerTaskState`;
- `DecisionGate`;
- `RoutePortfolio`.

This is the correct boundary. A scoring run cannot rewrite source facts, and imported progress cannot mutate route data.

## Grok comparison review

The supplied mock was rendered at desktop, laptop and phone widths and with its source modal open.

Useful:

- compact header;
- ledger/switchboard split;
- two next actions;
- concise phone metadata;
- restrained dark palette.

Blocking defects:

- mobile metadata leaks into the desktop grid and makes rows excessively tall;
- desktop fails the eight-rows-above-fold contract;
- each row is a monolithic button;
- phone puts too much status before the route;
- desktop text is too small;
- fixture data looks too real;
- Perkfection/Asgarnia assumptions are invalid;
- task-title-as-article source model is wrong.

The revised design contract addresses each defect. The implementation must be original; Grok code and screenshots remain local review artifacts.

## UI review

### Structural result

Pass for planning:

- route ledger owns the page;
- progress/source header is compact;
- skilling and PvM actions remain visible;
- route portfolios and decision gates are adjacent to the ledger;
- completion/source actions are independent;
- mobile route precedes deep status;
- no hero, KPI garden, glass, glow or ambient animation is planned.

### Rendered result

Blocked. There is still no ClankerScape application to inspect.

The Grok mock is comparison evidence, not evidence that ClankerScape passes rendered QA.

First implementation review must verify:

- laptop/desktop/phone;
- at least eight real desktop rows above fold;
- readable desktop type;
- correct mobile/desktop metadata visibility;
- independent completion/Wiki interactions;
- focus/scroll restoration;
- queue switching;
- loading/CORS/offline/conflict/source states;
- reduced motion;
- console/network.

## Wiki-wrapper review

The revised task-ID model is more accurate than the previous title-only model.

Required:

- canonical task page cached by revision;
- numeric `data-taskid` lookup;
- missing/duplicate match failure;
- inert parse and sanitised/structured output;
- related article links separately;
- real Pages-origin CORS test;
- useful local snapshot fallback;
- no iframe, login, proxy or silent relay.

## Security and provenance

Planning content remains low risk, but the secret review must be re-run after this revision because the changed-file count and plan contents changed.

No executable application, workflow, dependency, generated asset or deployment configuration should enter this approval PR.

## Scope

The proposed stack remains intentionally small:

- Vite;
- React;
- TypeScript;
- plain CSS/CSS Modules;
- focused tests and Playwright;
- static Pages deployment.

Do not add Next.js, backend, auth, analytics, component library, state framework, animation framework or Three.js merely because another repository uses it.

## Approval recommendation

The revised package is suitable for owner review because it no longer pretends the static relic/region line is solved.

After approval, the correct next unit remains a minimal static shell with clearly labelled fixture data and the corrected control/layout contracts. The production route still waits for the sourced task corpus.
