# Skills audit and provenance

This document records repository skills consulted during the ClankerScape planning pass, what informed the project, and what was deliberately not copied.

## Policy

- Only `sonnaya2/Equilibrium` and the owner-authorised private `sonnaya2/EverSense-Web` were used as repository sources.
- No code or design was taken from another project.
- `RS3-Dev/TheRSGuide.com` was not opened, cloned, searched or used.
- No public Wiki user route was used as an ordering template.
- No private EverSense screenshot, font, asset, CSS, component or application code was copied into this public repository.
- Private skill text was not copied wholesale. ClankerScape rules were rewritten for this project.
- No settings, environment files, credentials, account data, browser state or connector metadata were transferred.

## Consulted Equilibrium skills

### `.agents/skills/equilibrium-ui/SKILL.md`

Used for:

- classifying the product as a player tool rather than SaaS;
- warm near-black/stone, cream, restrained gold and teal/emerald active-state direction;
- square/nearly-square geometry and restrained depth;
- dense task surfaces and rendered desktop/phone review;
- keeping Three.js out of non-spatial UI.

Not copied:

- Equilibrium route/page layouts;
- components;
- Tailwind/CSS;
- brand copy;
- map implementation;
- assets.

### `.agents/skills/league-data/SKILL.md`

Used for:

- starting/automatic/elective region structure;
- separating region, relic and Blessing progression;
- treating regions as dependency graphs;
- keeping Catalyst stand-ins visibly separate from Equilibrium facts;
- modelling Blessing resets as path-history changes.

Not copied:

- application state code;
- generated shards;
- data-pipeline implementation;
- Catalyst task rows;
- hard-coded route choices.

### `.agents/skills/league-blessings/SKILL.md`

Used for:

- Blessing progression and God-tier derivation;
- support labels such as modeled, partially modeled, scenario-dependent and not modeled;
- identifying hit-scope, scheduled-event and state-changing mechanics;
- requiring combat-engine comparison rather than tooltip ranking;
- treating unsupported mechanics as unknown/excluded rather than ordinary zero.

Not copied:

- combat implementation;
- tests;
- generated Blessing data;
- provisional interaction assumptions as confirmed facts.

The official Jagex reveal remains primary when a repository table/path assignment conflicts with the current reveal image.

### `.agents/skills/combat-math/SKILL.md`

Used for:

- source hierarchy for combat numbers;
- separating damage formulas from simulation timing;
- explicit Damage Potential, critical layers, hit caps, modifier order and intermediate rounding;
- requiring explicit target/loadout inputs and support status;
- keeping League modifiers outside base combat formulas;
- rejecting dummy-output comparison as mechanics proof.

Not copied:

- combat formulas or implementation;
- ability/equipment tables;
- tests or golden values;
- engine modules.

ClankerScape does not calculate combat damage.

### `.agents/skills/combat-sim/SKILL.md`

Used for:

- explicit opening state;
- tick/cooldown/resource/cast-legality semantics;
- scheduled-event provenance;
- distinguishing attached damage from real hits;
- state branching for randomness that changes future legality;
- separating fixed-window and natural-completion metrics;
- preserving support/exclusion and approximation metadata.

Not copied:

- simulation code;
- runtime state shapes;
- branch implementation;
- event schedulers;
- combat UI.

ClankerScape imports versioned benchmark results only. `docs/combat-benchmark-plan.md` records the public comparison contract.

## Consulted EverSense-Web skills

EverSense-Web is private. Only high-level review guidance rewritten below is exposed.

### `.claude/skills/no-slop-ui/SKILL.md`

Used for:

- rejecting heroes, card gardens, fake KPI strips, glass, idle glow, radius soup, duplicated chrome and dead acreage;
- requiring the first viewport to perform the product's real job;
- limiting motion to state explanation.

### `.claude/skills/human-grade/SKILL.md`

Used for:

- selecting a product class before styling;
- preserving one coherent working surface;
- using only the relevant review skills;
- verifying rendered output instead of trusting source intent.

### `.claude/skills/ui-audit/SKILL.md`

Used for:

- read-only rendered review at laptop/desktop/phone widths;
- checking focus, reduced motion, loading, error, console and network states;
- returning PASS/FAIL/BLOCKED based on observed evidence.

### `.claude/skills/ui-humanizer/SKILL.md`

Used for:

- repairing concrete gradient/glow/blur/card/dead-space defects;
- retaining game character instead of washing the tool into sterile grey;
- fixing shared structure before one-off cosmetic patches.

### `.claude/skills/text-humanizer/SKILL.md`

Used for:

- direct factual labels;
- deleting slogans, fake enthusiasm and marketing language;
- naming real errors, blockers, versions, units and next actions;
- avoiding polished pseudo-intelligence in route reasons.

### `.claude/skills/data-readability/SKILL.md`

Used for:

- explicit units and stable labels;
- tabular numerals;
- visible queue/filter/sort state;
- distinguishing unavailable from zero;
- separating source facts, route estimates and decision results;
- keeping meaningful data available without hover.

### `.claude/skills/bot-audit/SKILL.md`

Used for:

- auditing visual/CSS structure, copy, data presentation and code artifacts together;
- distinguishing severe AI/SaaS patterns from smaller smells;
- checking for sterile anti-slop overcorrection.

Not copied from EverSense-Web:

- private screenshots or visual-reference files;
- product code or CSS;
- fonts;
- components;
- exact app-specific examples;
- environment/configuration;
- repository settings;
- credentials/private URLs.

## Repository skills identified but not loaded into planning conclusions

Equilibrium contains additional skills for data sync, major-data authoring, poison, equipment effects, map work, browser testing, commits and test maintenance.

They were not loaded merely because they exist. A later implementation should load only the relevant current skill and update this audit.

Examples:

- `data-sync` when task/import pipelines are implemented;
- `playwright-e2e` when browser tests exist;
- `test-maintainer` before editing substantial tests;
- `equipment-effects` when a benchmark depends on set/perk activation;
- `equilibrium-poison` when Envenomed/poison scenarios are benchmarked.

## New ClankerScape skills created

### `.agents/skills/clankerscape-ui/SKILL.md`

Purpose:

- enforce the route-workbench product class;
- define the compact header, dominant ledger and switchboard;
- require independent completion/source actions;
- govern desktop/mobile information order;
- reject AI/SaaS visual structures;
- require rendered density, focus, source and responsive verification.

Source relationship:

- original ClankerScape-specific synthesis of permitted UI/review principles;
- no private skill copy or application code.

### `.agents/skills/clankerscape-route/SKILL.md`

Purpose:

- enforce source hierarchy and hard feasibility;
- maintain five point banks;
- change optimisation objective at 450 tasks;
- compare regions through reachable portfolios;
- treat Tier 5–6 as a paired gate;
- make Rejuvenated compare every missed relic;
- apply a burden of proof to Perkfection;
- model Blessing epochs/resets and Tier-7 package comparisons.

Source relationship:

- original project-specific route procedure informed by official League rules and the permitted Equilibrium domain/combat contracts.

### `.agents/skills/clankerscape-review/SKILL.md`

Purpose:

- perform a severe read-only review of source/task integrity, route portfolios, opportunity cost, UI, Wiki safety, security and performance;
- explicitly catch the Perkfection/Asgarnia shortcut that the first plan missed;
- produce an evidence-based readiness verdict.

Source relationship:

- original ClankerScape review procedure informed by the permitted audit principles.

## Other planning documents created

- `plan.md` — complete strategy/implementation handoff;
- `docs/design-direction.md` — rendered UI contract;
- `docs/grok-ui-audit.md` — read-only comparison findings from the supplied Grok artifact;
- `docs/combat-benchmark-plan.md` — public contract for importing stateful Equilibrium benchmark results;
- `docs/planning-review.md` — adversarial review and correction log;
- `docs/security-review.md` — secret/private-source/runtime threat review;
- `docs/grok-heavy-ui-prompt.md` — independent comparison brief with no fixed route recommendations.

The owner-supplied Grok HTML and local screenshots were reviewed but were not copied into the repository.

## Public-repository disclosure check

Safe to disclose:

- source repository names already authorised by the owner;
- names/paths of consulted skills;
- rewritten ClankerScape rules;
- official Jagex/Wiki links;
- route assumptions clearly labelled as assumptions;
- defects observed in the owner-supplied comparison artifact without copying it.

Not safe to disclose:

- account email addresses;
- access tokens/connector details;
- private repository content unrelated to this project;
- private visual references;
- local auth/browser state;
- unpublished credentials/settings;
- local materialisation paths.

## Maintenance rule

Whenever another repository skill is consulted or adapted:

1. add it here;
2. state exactly what informed the project;
3. state what was not copied;
4. review public/private exposure;
5. re-run the secret/provenance audit before the PR is marked ready.
