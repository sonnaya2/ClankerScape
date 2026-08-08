# Skills audit and provenance

This document records every repository skill consulted during the ClankerScape pre-implementation pass, what was taken from it, and what was deliberately not copied.

## Policy

- Only `sonnaya2/Equilibrium` and `sonnaya2/EverSense-Web` were used as repository sources.
- No code or design was taken from another project.
- The blacklisted `RS3-Dev/TheRSGuide.com` repository was not opened, cloned, or used.
- No public Wiki user route was used as an ordering template.
- No private reference screenshot or image from EverSense-Web was copied into this public repository.
- Private skill text was not wholesale copied. Project-specific rules were rewritten into ClankerScape composite skills.
- No local settings, environment files, credentials, account data, or private connector metadata were transferred.

## Consulted Equilibrium skills

### `.agents/skills/equilibrium-ui/SKILL.md`

Used for:

- classifying the product as a player tool rather than a SaaS dashboard;
- the warm near-black/stone, cream, restrained-gold, teal-active-state visual family;
- square/nearly-square corners and restrained depth;
- dense task browsing and rendered desktop/phone review;
- the rule that Three.js belongs only where a map or spatial surface genuinely needs it.

Not copied:

- Equilibrium's application route map;
- component code;
- page layouts;
- CSS;
- brand copy;
- any map implementation.

### `.agents/skills/league-data/SKILL.md`

Used for:

- fixed starting regions and the three-elective-region model;
- the distinction between region, relic, and Blessing progression;
- the requirement to source current League facts rather than Catalyst stand-ins;
- reset-aware Blessing persistence.

Not copied:

- Equilibrium application state code;
- generated shards;
- data pipeline implementation;
- stale task rows.

### `.agents/skills/league-blessings/SKILL.md`

Used for:

- Blessing path names and progression grouping;
- derived God Blessings;
- the need to model Blessing resets as history rewrites;
- identifying mechanics that require combat-engine comparison instead of intuition.

Not copied:

- combat implementation;
- tests;
- hard-coded recommendations;
- unverified mechanics.

## Consulted EverSense-Web skills

EverSense-Web is private. Only the high-level design/review rules intentionally rewritten below are exposed in ClankerScape.

### `.claude/skills/no-slop-ui/SKILL.md`

Used for:

- rejection of hero sections, card gardens, fake KPI strips, glass stacks, idle glow, radius soup, duplicated headings, and dead acreage;
- requiring the first viewport to perform the product's real job;
- motion only when it explains state.

### `.claude/skills/human-grade/SKILL.md`

Used for:

- selecting the correct product class before styling;
- preserving a coherent working surface;
- verifying rendered output rather than trusting source intent;
- limiting the work to skills relevant to the page.

### `.claude/skills/ui-audit/SKILL.md`

Used for:

- read-only rendered review at desktop and phone widths;
- checking focus, reduced motion, loading, empty, error, console, and network states;
- explicit pass/fail/blocker outcomes.

### `.claude/skills/ui-humanizer/SKILL.md`

Used for:

- removing decorative gradients/glow/blur/repeated panels/dead space;
- retaining intentional game character instead of washing the page into sterile gray;
- repairing real hierarchy defects rather than applying a cosmetic “human” filter.

### `.claude/skills/text-humanizer/SKILL.md`

Used for:

- direct factual labels;
- deleting slogans, fake enthusiasm, and product-marketing language;
- specific errors and blockers;
- natural sentence rhythm and sentence-case UI copy.

### `.claude/skills/data-readability/SKILL.md`

Used for:

- explicit units and stable labels;
- tabular numerals;
- visible sort/filter/queue state;
- no hover-only meaningful data;
- separating source facts from route estimates.

### `.claude/skills/bot-audit/SKILL.md`

Used for:

- inspecting CSS, structure, copy, data presentation, and code artifacts together;
- distinguishing severe structural tells from minor style smells;
- checking for over-washed “anti-slop” results as well as obvious AI decoration.

Not copied from any EverSense-Web skill:

- screenshots or visual-reference files;
- proprietary app code;
- exact project-specific examples;
- local configuration;
- repository settings;
- credentials or private URLs.

## Identified but not used in this pass

The repositories contain additional skills, including combat, data-sync, equipment, map, browser testing, documentation search, and other implementation guidance. They were not loaded into the planning conclusions merely because they existed. A later implementation may consult a relevant allowed skill when the corresponding work begins, and this audit must then be updated.

## New ClankerScape skills created

### `.agents/skills/clankerscape-ui/SKILL.md`

Purpose:

- enforce the route-workbench product class;
- define required page composition;
- reject common AI/SaaS visual structures;
- govern route rows, copy, motion, responsive behaviour, and rendered review.

Source relationship:

- original ClankerScape-specific synthesis of the allowed Equilibrium UI direction and EverSense human-grade/no-slop/readability rules;
- no verbatim private skill copy.

### `.agents/skills/clankerscape-route/SKILL.md`

Purpose:

- enforce source hierarchy;
- optimise task count before 450 and points after 450;
- maintain separate skilling and PvM queues;
- record the default region/relic/Blessing thesis and its decision gates;
- prevent Catalyst stand-ins or copied routes from becoming truth.

Source relationship:

- original ClankerScape-specific synthesis of current official League facts and allowed Equilibrium domain guidance.

### `.agents/skills/clankerscape-review/SKILL.md`

Purpose:

- perform a severe technical review of route correctness, UI structure, copy, Wiki sourcing, security, provenance, and performance;
- produce an evidence-based readiness verdict;
- direct hostility toward defects rather than people.

Source relationship:

- original ClankerScape-specific review procedure informed by the allowed UI audit and bot-audit principles.

## Public-repository disclosure check

Safe to disclose publicly:

- names of the allowed source repositories already named by the owner;
- names/paths of consulted skills;
- the ClankerScape-specific rules committed here;
- official Jagex and RuneScape Wiki source links;
- route assumptions clearly labelled as assumptions.

Not safe to disclose:

- account email addresses;
- access tokens or connector details;
- private repository contents unrelated to this project;
- private visual references;
- local auth/browser state;
- unpublished credentials or settings.

## Maintenance rule

Whenever a new repository skill is consulted or adapted:

1. add it to this document;
2. state exactly what was used;
3. state what was not copied;
4. review whether the resulting public text exposes private material;
5. run the secret/provenance audit before committing.
