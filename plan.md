# Clankerscape — Dragon-first route and implementation plan

**Status:** planning gate; owner approval required before production UI implementation
**Repository:** `sonnaya2/ClankerScape`
**Target League:** RuneScape 3 Leagues II: Equilibrium
**Primary goal:** minimize elapsed time from League launch to the **Dragon Trophy at 48,000 League Points**
**Source snapshot:** 7 August 2026
**Next-chat target:** GPT-5.6 Sol Pro with this file as the authoritative handoff

This file is deliberately more complete than a normal project plan. A fresh implementation chat should be able to start from it without replaying the research conversation or loading the Equilibrium repository wholesale.

---

## 0. Approval boundary

Do not build the production interface until the owner approves the following together:

1. the route-workbench visual direction;
2. the provisional region, Relic, and Blessing choices;
3. the live RuneScape Wiki dialog contract;
4. the public/private skill provenance rules;
5. the static, local-first architecture;
6. the launch-day task import and route-freeze process.

Work allowed before approval:

- source verification;
- this plan and related skill files;
- read-only audits;
- a disposable local wireframe or screenshot used only for review;
- secret scanning;
- an independent comparison prototype on a separate branch.

Work not allowed before approval:

- committing the production React application;
- importing a complete third-party route;
- copying another RuneScape site's layout;
- publishing generated imagery;
- enabling analytics, accounts, payments, ads, a backend, or a CMS;
- silently treating provisional route choices as final.

---

## 1. Product goal

Clankerscape is a **race route workbench** for one concrete job: following and maintaining the fastest defensible path to 48,000 points in Equilibrium.

It is not:

- a landing page;
- a SaaS dashboard;
- a generic all-purpose RuneScape portal;
- a content farm;
- an AI-branded product;
- a marketplace, social network, or monetized service;
- a clone of the RuneScape Wiki, Equilibrium, TheRSGuide.com, or any public player's route.

The site should feel like a compact route sheet built by a competitive player who expects to keep the Wiki open, change decisions when live information lands, and move quickly. It should not try to persuade anyone that it is important.

### Success condition

A player can open the page, see the exact next task, understand why it is next, inspect the relevant Wiki material without losing their place, mark it complete, and move to the next legal step. The route must remain usable during launch-day source churn and partial outages.

### Non-goals for version 1

- account sync;
- server-side persistence;
- collaborative editing;
- a general task database browser;
- automatic in-game telemetry beyond any later, explicitly approved WikiSync integration;
- a combat simulator inside Clankerscape;
- a Three.js map;
- route generation from an LLM at runtime;
- a public route-sharing ecosystem.

---

## 2. Hard operating rules

### Source hierarchy

Use sources in this order:

1. Jagex League announcements and launch notes;
2. the canonical RuneScape Wiki League pages and task records;
3. verified, structured data already authored in `sonnaya2/Equilibrium`;
4. PvME or RS Analysis only for a mechanic that the first three do not resolve;
5. owner observations from live play, clearly marked as observations.

Do not use Reddit, Facebook, Twitter/X, YouTube comments, public Wiki user-route pages, or generic route guides as route authority.

### Blacklist

Do not inspect, fetch, clone, cite, or copy from:

- `https://github.com/RS3-Dev/TheRSGuide.com`

Its licence is irrelevant to this project. Treat it as unavailable.

### No route theft

Do not import another player's ordered route, even when it is public. Public task facts may be used; another person's sequencing, annotations, grouping, or prose may not.

### No generated art

No image produced by a generative model may ship in the repository or site. Generative vision may be used privately to inspect a screenshot, but not as an asset source.

### No access-control bypass

Do not bypass Cloudflare, CAPTCHAs, account controls, IP restrictions, or rate limits. Do not create deceptive accounts or request the owner's credentials. Anonymous public APIs and normal cached source fallbacks are sufficient.

### Reference URLs

- Jagex reveal and FAQ: `https://secure.runescape.com/m=news/leagues-equilibrium-reveals---releasing-august-10th`
- Canonical task page: `https://runescape.wiki/w/Equilibrium_League/Tasks`
- MediaWiki Action API: `https://www.mediawiki.org/wiki/API:Main_page`
- MediaWiki parse module: `https://www.mediawiki.org/wiki/API:Parsing_wikitext`
- MediaWiki cross-origin requests: `https://www.mediawiki.org/wiki/API:Cross-site_requests`
- GitHub Pages custom workflow: `https://docs.github.com/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages`
- Owner-authored Equilibrium source repository: `https://github.com/sonnaya2/Equilibrium`

Do not add route-guide mirrors or public user-route pages to this source list.

### Unknown means unknown

A missing task, requirement, mechanic, point value, or interaction remains visibly unverified. Never fill a gap with a plausible guess merely to make the route appear complete.

---

## 3. Verified League constraints

The following facts are treated as current, source-backed constraints for the route model.

### Launch and trophy

- Equilibrium launches on 10 August 2026.
- Dragon Trophy requires **48,000 League Points**.
- The League contains **109,380 nominal points across 1,152 tasks**, but a player cannot access all regions.

Primary source: Jagex, “Leagues: EQUILIBRIUM Reveals — Releasing August 10th.”

### Region progression

- Starting regions: **Misthalin** and **Havenhythe**.
- **Karamja** unlocks automatically at 50 completed tasks.
- Elective region 1 unlocks at 175 completed tasks.
- Elective region 2 unlocks at 300 completed tasks.
- Elective region 3 unlocks at 450 completed tasks.
- Exactly three elective regions may be chosen.

### Relic thresholds

| Tier | League Points |
| ---: | ------------: |
| 1 | 10 |
| 2 | 750 |
| 3 | 1,750 |
| 4 | 3,500 |
| 5 | 6,000 |
| 6 | 12,000 |
| 7 | 20,000 |

### Blessing thresholds

Each unlocked region provides five Blessing tasks. Six total regions provide 30 possible Blessing tasks, and 26 are required for God Tier II.

| Blessing progression slot | Blessing tasks completed |
| ------------------------: | -----------------------: |
| Tier 1 | 1 |
| Tier 2 | 3 |
| Tier 3 | 5 |
| God Tier I | 9 |
| Tier 4 | 12 |
| Tier 5 | 16 |
| Tier 6 | 20 |
| God Tier II | 26 |

Blessing tasks are combat-oriented. Jagex's published range runs from killing a Lumbridge goblin to defeating the Black Stone Dragon.

### Regional totals

| Region | Points | Tasks | Nominal points/task |
| --- | ---: | ---: | ---: |
| Global | 34,950 | 392 | 89.16 |
| Misthalin | 13,430 | 141 | 95.25 |
| Havenhythe | 2,060 | 50 | 41.20 |
| Karamja | 3,870 | 57 | 67.89 |
| Anachronia | 8,210 | 57 | 144.04 |
| Asgarnia | 6,760 | 65 | 104.00 |
| Kharidian Desert | 8,360 | 73 | 114.52 |
| Fremennik Province | 4,800 | 61 | 78.69 |
| Kandarin | 5,940 | 63 | 94.29 |
| Morytania | 6,760 | 64 | 105.63 |
| Tirannwn | 7,340 | 64 | 114.69 |
| Wilderness | 6,900 | 65 | 106.15 |

Nominal density is useful only after task time, prerequisites, crowding, and power requirements are known. It must never decide a region by itself.

### Useful rule changes

- Players start in Lumbridge; Lumbridge and Havenhythe lodestones begin unlocked.
- WikiSync is available in the League onboarding.
- Invention is available without Asgarnia, but the Invention Guild and machines require Asgarnia.
- Necromancy and the City of Um are part of Misthalin; Kili's Knowledge progression tasks are skipped.
- A Construction workbench is available in Lumbridge.
- Clues, tetracompasses, Slayer tasks, and Reaper tasks respect unlocked regions.
- Daemonheim itself is Wilderness-locked, but Dungeoneering remains trainable through Elite Dungeons, and the reward shop is available outside the wall.
- Shops use simplified infinite stock.
- Bosses use accelerated spawn settings.
- The 30,000 damage cap and normal life-point cap are removed.
- Multi-region area tasks are auto-skipped and completed with the relevant region.

These rules materially reduce the value of choosing Wilderness solely for Dungeoneering access and materially increase the value of Misthalin-first Necromancy.

---

## 4. Current uncertainty and the launch-day gate

The official Easy and Medium task list has been sent to the RuneScape Wiki. Jagex stated that the remaining task tiers would be published immediately before launch. In the current research environment, the live Equilibrium task page cannot be fetched reliably enough to build an exact, audited 48,000-point order.

Therefore:

- the **strategy**, region order, and power choices can be reviewed now;
- the **exact task sequence cannot be frozen now** without inventing or copying data;
- production route data must be generated from a fresh Wiki snapshot once the full list is available;
- every task record must retain its source page, source revision, and verification status;
- no implementation may ship a fake “complete route” made from Catalyst placeholders.

### Route-freeze gate

The route becomes eligible to label `candidate-v1` only when all of the following pass:

1. the full task list is imported from the canonical Equilibrium task page;
2. task totals and regional totals reconcile with Jagex's published values, or every mismatch is explained;
3. all route tasks resolve to the six chosen regions or Global;
4. every dependency chain is region-safe;
5. every required Blessing threshold is reachable in the proposed order;
6. cumulative task counts hit 50, 175, 300, and 450 legally;
7. cumulative points hit each planned Relic threshold legally;
8. no route task is copied from a public player's route notes;
9. a second pass challenges every estimate above five minutes;
10. the owner approves the final region and power choices.

---

## 5. Catalyst lessons carried forward

The prior Catalyst route work provides process lessons, not task data to copy.

### Preserve these principles

- Treat tasks as **progression currency and a dependency graph**, not a list of nearby checkboxes.
- Optimize the complete path: points per minute, task-count gates, player power, future throughput, travel, XP timing, supplies, gear, and cluster density.
- A task with mediocre immediate points can be correct when it opens a fast cluster, a Relic, a Blessing, transport, gear, or a training method.
- Re-solve after each major power breakpoint. The optimal route before a Relic is not the optimal route after it.
- Delay RNG-heavy grinds until increased drop rates, damage, teleports, or better gear materially improve them.
- Do not perform expensive production training immediately before the Production Master threshold.
- Preserve hard region boundaries through every prerequisite, shop, teleport, quest step, and item source.
- Mark uncertain transitions `VERIFY`; do not bury them in prose.
- Prior Catalyst planning centred the opener on dense Lumbridge/Misthalin work before a clustered Karamja trip. Preserve the clustering principle, not an exact inherited order.
- Fire Cape/Jad-style clusters are valuable when one trip produces points, equipment, combat progression, and follow-on tasks. The Equilibrium task list must prove the exact cluster before it is routed.

### Do not preserve blindly

- Catalyst's point thresholds were different.
- Catalyst had a different region model and no Blessing track.
- Catalyst task times, crowding, shops, combat balance, and task completion rates are not Equilibrium evidence.
- The old exact sequence is not a substitute for a new dependency solve.

---

## 6. Route optimization model

A single “points divided by minutes” sort is wrong before 450 tasks. The route should use a lexicographic objective that changes by phase.

### Hard feasibility layer

A route step is invalid when any of these fail:

- region is not unlocked at that point;
- prerequisite task or item is unavailable;
- required quest is not completed or auto-completed;
- required transport has not been unlocked;
- required skill level cannot be reached with the preceding training plan;
- required Blessing or Relic is not yet active;
- the task relies on a cross-region source that the route does not possess;
- a source is unverified and the step is not explicitly marked `VERIFY`.

### Phase objective

Before the 450-task region gate:

1. minimize time to the next task-count milestone;
2. do not miss a reachable Blessing breakpoint that increases throughput;
3. do not delay a Relic breakpoint when the detour pays back before the next region gate;
4. prefer clusters that also unlock transport, skills, gear, or future tasks;
5. then prefer points per minute;
6. penalize RNG, crowding, long setup, and uncertain mechanics.

After 450 tasks:

1. minimize time to 48,000 points;
2. preserve any still-profitable Blessing or Relic breakpoint;
3. prefer high-point deterministic tasks over low-value completion volume;
4. amortize setup across clusters;
5. park low-confidence, crowded, or RNG-heavy tasks behind deterministic alternatives.

### Step scoring fields

Every candidate task should expose, even if some values are initially unknown:

- direct points;
- task-count contribution;
- expected active time;
- expected waiting or crowding time;
- setup time;
- travel time;
- prerequisite cost;
- future minutes saved;
- power gained;
- cluster unlocks;
- confidence;
- variance/RNG risk;
- source revision;
- region and Blessing feasibility.

Do not compress these into one unexplained “score” in the UI. The solver may use a composite internally, but the route explanation must name the real reason.

### Re-solve events

Re-run route ranking after:

- Karamja unlock;
- each elective region unlock;
- each Relic tier;
- each Blessing tier;
- a major transport unlock;
- a major gear breakpoint;
- a Wiki task revision;
- a live observation that changes a time estimate by at least 20%;
- a mechanic correction that changes route legality.

---

## 7. Provisional region plan

### Default order

1. **Asgarnia** at 175 tasks
2. **Kharidian Desert** at 300 tasks
3. **Anachronia** at 450 tasks

Together with Global, Misthalin, Havenhythe, and Karamja, this gives a nominal accessible pool of **77,640 points**, leaving **29,640 points of theoretical slack** over Dragon. The slack is essential: the route should never depend on completing nearly everything available.

### Why Asgarnia first

Asgarnia is the provisional throughput pick, not the raw-density pick.

It contains Falador, Burthorpe, Taverley, Port Sarim, the Dwarven Mine, Trollheim, God Wars Dungeon, and the Invention Guild. Jagex auto-completes several access quests, including Troll Stronghold, Dwarf Cannon, Recruitment Drive, and The Knight's Sword. At the 175-task stage, compact transport, broad skilling access, early combat encounters, and future Invention-machine access may pay back faster than a region with a better nominal point/task ratio.

This remains provisional because regional task-tier distribution and live travel time are more important than the area list.

### Why Desert second

The Desert has the largest elective task count and the highest elective total points. Its auto-completed quest set removes substantial normal-game setup. It is the working candidate for the 300-to-450 task-count push while also beginning the higher-point conversion phase; the full task-time model still decides whether it remains there.

### Why Anachronia third

Anachronia has the highest nominal points per task among electives. It also includes Orthen, the base camp, Ranch Out of Time, Dream of Iaia, the agility course, and Slayer infrastructure. It is a natural final-region candidate once the route no longer needs another large task-count injection and can focus on high-value conversion.

### Region swap rules

The default order is not sacred. Replace a pick when the full task model shows one of the following:

- projected Dragon ETA improves by at least **8%** after uncertainty penalties;
- the default route cannot reach 26 viable Blessing tasks without a severe boss wall;
- a candidate region supplies a mandatory gear or material chain with no efficient alternative;
- live crowding invalidates a major default cluster;
- the task list shows the first region has too few sub-five-minute tasks to justify its position.

### Primary alternatives

- **Morytania for Asgarnia:** primary alternative when Araxxor, Barrows, Slayer Tower, Araxyte Hive, or other combat/Blessing tasks dominate the route.
- **Wilderness for Asgarnia or Anachronia:** only when actual task and Blessing value beats the alternatives. Do not pick it merely for Daemonheim or the reward shop.
- **Tirannwn for Anachronia:** high nominal density, but likely to carry higher combat and access requirements. Choose only after task-time validation.
- **Kandarin:** broad skilling and dig-site utility, but its lower nominal density and many spread-out areas demand a concrete cluster advantage.
- **Fremennik:** currently the weakest nominal points/task candidate and needs a major task-time or gear advantage to enter the default route.

---

## 8. Provisional Relic plan

### Default sequence

| Tier | Pick | Route purpose | Confidence |
| ---: | --- | --- | --- |
| 1 | **Golden Touch** | Early Agility, Thieving, coins, Prayer feathers, shortcut reliability, automation | High |
| 2 | **Superheated** | Collapse Firemaking/Cooking/Smithing actions, double bars, improve supply flow | High |
| 3 | **Voidwalker** | Remove transport friction and supply useful random resources while region count expands | Medium-high |
| 4 | **Crystal Grace** | Unlock all magic, rune access, rune output, Necromancy ritual speed and ingredient relief, Prayer XP | High |
| 5 | **Production Master** | Process production batches at once and avoid wasting training before the threshold | High |
| 6 | **Rejuvenated → Assassin's Insight** | Add a late-route Slayer/combat throughput option without giving up Voidwalker | Medium |
| 7 | **Infernal Fire** | Death Mark execute and universal combat bonus for the final point conversion | Medium-high, mechanic-gated |

### Why these picks

#### Golden Touch

The route needs early coins, task-count velocity, movement, reliable shortcuts, Agility progress, and Thieving automation. Golden Touch directly attacks those constraints and also generates Goldenhawk feathers for Prayer or coins. It is more route-shaped than a passive gathering convenience at the first ten points.

#### Superheated

Superheated removes several independent production loops: caught fish can cook automatically, cut logs can burn automatically, smelting yields double bars, and Smithing progresses much faster. The route should exploit this immediately rather than manually training the same skills just before the unlock.

#### Voidwalker

The Abyssal Conduit provides unlimited teleports from a broad set of jewellery destinations. Before all three elective regions are unlocked, travel reduction applies to a much wider portion of the task graph than a single-skill accelerator. Void shards also provide route-relevant supplies.

#### Crystal Grace

Crystal Grace is unusually aligned with a Necromancy-first route: all magic spells, unrestricted unlocked-region rune-altar access, increased rune output, ingredient-free glyphs and light sources, and capped ritual speed. Its Prayer effect also supports Big Boned/Lord of Light/Icyenic comparisons.

#### Production Master

This is the reason to defer large Crafting, Herblore, Fletching, Cooking, Construction, and Smithing batches. The route should bank materials, cross 6,000 points, then convert the stored work at the faster rate.

#### Rejuvenated into Assassin's Insight

At 12,000 points, Rejuvenated can add a previous-tier Relic. The default second pick is Assassin's Insight because the remaining path is expected to be combat-, Slayer-, and Blessing-heavy. It adds Slayer teleports, assignment control, boosted elite spawns, boosted elite Slayer XP, and guaranteed ushabti capture.

This is the least-settled Relic decision. **Survivalist** replaces Assassin's Insight when the imported 12,000-to-48,000 route contains materially more gathering/Archaeology time than Slayer time. The route model must compare both using total remaining minutes, not total number of matching tasks.

#### Infernal Fire

A consistently applied Death Mark ending fights at 20% life is a major boss-time reduction, and the Avernic Star adds universal damage and Prayer bonus. Keep Infernal Fire as default only if launch testing confirms Death Mark applies to the bosses that dominate the final route.

### T7 contingency

Switch to **Icyenic Faith** when any of these are true:

- key route bosses block or materially delay Death Mark;
- prayer-bonus scaling with Lord of Light and the Tome produces a better measured kill-time profile;
- survival failures or supply time erase Infernal Fire's theoretical execute advantage;
- the Equilibrium combat engine and live samples agree that Icyenic wins the route's actual encounter set.

Naragi Edict is a safety fallback, not the default race pick. Its revive and level boost may rescue a wall, but a route should not plan around dying.

---

## 9. Provisional Blessing plan

### Default sequence

| Slot | Pick | Path | Route purpose |
| ---: | --- | --- | --- |
| 1 | **Big Boned** | Balance | Max-life increase and player-sourced per-hit damage; works with Necromancy conjures |
| 2 | **Abyssal Cinders** | Chaos | Per-hit bonus damage and Inferno procs |
| 3 | **Avernic Rampage** | Chaos | Free-adrenaline windows that can change cast legality |
| God I | **Demon's Mark** | Chaos majority | Weakness-based accuracy for early boss progression |
| 4 | **True Equilibrium** | Balance | Synergistic base damage, armour, life, crit, crit damage, and Prayer per unique Relic alignment |
| 5 | **Lord of Light** | Order | Basic-triggered multi-hit AoE, Prayer scaling, armour scaling, and healing |
| 6 | **Tempered Heart** | Order | Passive 6% adrenaline every 1.2 seconds |
| God II | **Genesis Essence** | Order majority | Treat equipped weapons as tier 120 |

### Why the first block is Balance → Chaos → Chaos

Big Boned is a strong Necromancy opener because Jagex states that it applies to player-attributable damage and includes conjures, while excluding familiar and dreadnip damage. Cinders adds direct hit throughput. Avernic Rampage is state-changing rather than a flat average and can accelerate thresholds, ultimates, and special attacks.

Two Chaos picks produce Demon's Mark at God Tier I, which removes a major early boss accuracy problem by calculating accuracy against the target's weakness.

### Why True Equilibrium is the current T4 default

An earlier rough route favoured Havoc Born for its clean 20% damage increase. That is not good enough reasoning for this build.

Havoc Born also reduces maximum life and armour by 25%. Those penalties directly weaken:

- Big Boned's max-life-based rider;
- Lord of Light's armour-based damage;
- survivability and therefore food/supply time.

True Equilibrium adds life, armour, Prayer, crit chance, crit damage, and base ability damage for each unique Relic alignment. The actual gain depends on the selected Relics' alignments, so the route must calculate the real count rather than assuming three. With two or three unique alignments, it is likely to be more coherent with the rest of the build than Havoc Born.

### T4 benchmark requirement

Before route freeze, compare at least:

1. True Equilibrium + Big Boned + Lord of Light;
2. Havoc Born + Big Boned + Lord of Light;
3. Higher Power in a basic-heavy rotation without style ultimates.

Use the actual Relic alignment count, prayer bonus, armour, maximum life, encounter size, and cast sequence. Do not compare only tooltip percentages.

### Why Lord of Light and Tempered Heart

Lord of Light provides five Light of Saradomin triggers from basic attacks, multi-target coverage, Prayer-based scaling, armour-based damage, and healing. Tempered Heart turns the later route into an adrenaline-rich state without depending on the next cast to generate it.

Together they produce an Order majority in the second path block and therefore Genesis Essence at God Tier II. Tier-120 weapons remove or reduce the need for a late, region-specific weapon grind.

### Blessing alternatives

- **Unholy Critual** may beat Lord of Light in a single-target, high-crit Inferno build. It must also be evaluated for the path consequence: paired with Havoc and Tempered, it may produce the wrong God Tier II.
- **Tearing Thorns** becomes attractive when long damage-over-time abilities and large targets dominate the final route.
- **Envenomed** is a poison-specific alternative when live boss poison rules and Herblore levels support it.
- **Sacred Fervor** requires a different early path and may outperform Demon's Mark only when accuracy is already solved and cooldown compression wins actual kill time.

---

## 10. Combat and training stance

### Primary combat style

Use **Necromancy first**.

Reasons:

- City of Um is included in starting Misthalin;
- Kili's Knowledge progression tasks are skipped;
- Big Boned explicitly works with conjures;
- Crystal Grace removes ritual and rune friction;
- Necromancy offers a self-contained early progression path without selecting another region solely to unlock the style.

Magic becomes the secondary style after Crystal Grace. Do not lock a final rotation before launch mechanics and the task encounter set are known.

### Training rules

- Bank production materials before 6,000 points when doing so does not block a task milestone.
- Avoid large manual production batches immediately before Production Master.
- Use Golden Touch to fund shop-based and construction requirements rather than grinding coins separately.
- Use Superheated to combine gathering and production whenever the task only cares about the result.
- Train only to the next route requirement plus a small buffer; do not chase 99s because the multiplier makes them look cheap.
- Re-evaluate Slayer after Assassin's Insight becomes available through Rejuvenated.
- Do not choose Wilderness just to train Dungeoneering.
- Separate “XP gained” from “resources gained”; Survivalist's doubled resources do not grant doubled XP.

---

## 11. Route phases

Exact task IDs are inserted only after the full Wiki import. The phase contracts below are the route skeleton and should not be converted into fabricated task names.

### Phase 0 — launch sync

Goal: obtain a source-consistent task snapshot before racing against stale assumptions.

Actions:

- fetch the canonical Equilibrium task page and revision;
- import all available tiers;
- reconcile 1,152 tasks and regional totals;
- diff against the pre-launch snapshot;
- identify auto-completed tasks and source corrections;
- run the region/Blessing feasibility model;
- freeze `candidate-v1` or publish a visible `route not frozen` state.

Time budget: minutes, not hours. The importer and validation must be built before launch.

### Phase 1 — first 10 points and Golden Touch

Goal: complete the shortest legal sourced task that reaches 10 points, select Golden Touch, and immediately exploit it.

Do not spend time manually training Agility, Thieving, or coins before the Relic unless that exact action is the fastest first task.

### Phase 2 — 10 points to 50 tasks

Goal: unlock Karamja with the shortest dependency-safe task-count path.

Priority order:

1. one-action and interface/equip/shop tasks in Lumbridge and nearby Misthalin;
2. compact Havenhythe tasks reachable from its active lodestone;
3. tasks that activate lodestones, teleports, banks, tools, or future skill methods;
4. early Necromancy and Prayer actions that also set up the first Blessing tasks;
5. deterministic sub-five-minute skill thresholds;
6. only then slower points tasks.

Avoid:

- long quests unless they unlock several immediate tasks;
- production stockpiles that become faster at 750/3,500/6,000 points;
- early RNG drops;
- long travel for a single easy task.

### Phase 3 — Karamja, 750 points, and 175 tasks

Goal: turn the first Karamja trip into a cluster rather than a sightseeing detour.

The imported route should group:

- Brimhaven/POH access;
- Shilo/Tai Bwo Wannai/Herblore Habitat requirements;
- TzHaar combat and equipment tasks;
- gathering and shop actions that support later production;
- Karamja Blessing tasks that are already safe;
- any Fire Cape/Jad cluster proven by the actual task list.

Cross 750 points and select Superheated as early as its payback justifies. Continue to 175 completed tasks, then select Asgarnia unless the region model triggers a swap rule.

### Phase 4 — Asgarnia, 1,750/3,500/6,000 points, and 300 tasks

Goal: combine task-count velocity with the main utility power spikes.

Expected sequence:

- activate Asgarnia transport and bank loops;
- take compact Falador/Burthorpe/Taverley/Port Sarim tasks;
- exploit auto-completed northern quests;
- use Voidwalker at 1,750 points to compress remaining travel;
- use Crystal Grace at 3,500 points to open spells, rune routes, rituals, and Prayer efficiency;
- bank production materials until 6,000 points;
- take Production Master and immediately discharge the prepared production cluster;
- reach 300 tasks without spending hours on low-point completionism.

### Phase 5 — Desert, 12,000 points, and 450 tasks

Goal: use the region with the largest elective task count to finish the region-unlock race while shifting toward higher points.

Expected clusters:

- Al Kharid and low-friction starting actions;
- Menaphos/Sophanem/Het's Oasis task loops;
- Kharid-et and Archaeology only when the time model supports it;
- Desert combat and Blessing tasks;
- production tasks made cheap by Superheated/Crystal Grace/Production Master;
- any auto-completed-quest task chains.

At 12,000 points, take Rejuvenated and default to Assassin's Insight unless the remaining-route comparison selects Survivalist.

### Phase 6 — Anachronia, 20,000 points, and 26 Blessing tasks

Goal: unlock the final high-density region, complete the strongest deterministic clusters, reach Tier 7, and finish the Blessing track without a late weapon grind.

Expected clusters:

- base-camp and transport setup;
- agility, Orthen, Ranch Out of Time, and Dream of Iaia tasks when their setup amortizes;
- Anachronia Slayer tasks after Assassin's Insight;
- region bosses and Blessing tasks in ascending measured difficulty;
- 20,000-point Relic selection after an Infernal Fire versus Icyenic check;
- 26th Blessing task and Genesis Essence as soon as the resulting Tier-120 weapons save more time than the detour costs.

### Phase 7 — 20,000 to 48,000 points

Goal: pure Dragon conversion.

Route rules:

- sort by expected points per active minute after prerequisites are sunk;
- keep deterministic elite/master tasks ahead of long RNG tasks;
- group bosses by loadout, location, aura/prayer setup, and instance rather than task order;
- use the fastest boss spawn settings where appropriate;
- exploit the removed damage cap;
- stop training a skill when the next available task no longer beats the alternative point rate;
- maintain at least two alternate tasks for every crowded or mechanically uncertain step;
- cross 48,000 and stop. Do not optimize beyond the stated goal in the Dragon route.

---

## 12. Route data contract

### `TaskRecord`

```ts
export interface TaskRecord {
  id: string;
  name: string;
  description: string;
  tier: "easy" | "medium" | "hard" | "elite" | "master";
  points: number;
  region: RegionId | "global";
  locality?: string;
  requirements: string[];
  skills: Array<{ skill: string; level: number; boostable?: boolean }>;
  blessingTask: boolean;
  autoCompleted?: boolean;
  wikiTaskId: number;
  wikiSource: WikiPageRef;
  contextWikiRefs: WikiPageRef[];
  sourceRevision: number;
  verifiedAt: string;
  status: "verified" | "provisional" | "conflict";
}
```

### `RouteStep`

```ts
export interface RouteStep {
  id: string;
  taskId: string;
  phase: RoutePhase;
  order: number;
  expectedMinutes: number | null;
  confidence: "high" | "medium" | "low" | "verify";
  prerequisiteTaskIds: string[];
  requiredItems: string[];
  requiredState: string[];
  prepare: string[];
  do: string;
  keepAfter?: string[];
  routeReason: string;
  alternatives: string[];
  crowdingRisk?: "low" | "medium" | "high";
  rngRisk?: "none" | "low" | "medium" | "high";
}
```

### `WikiPageRef`

```ts
export interface WikiPageRef {
  title: string;
  anchor?: string;
  oldid?: number;
  canonicalUrl: string;
}
```

### `DecisionRecord`

Use explicit records for region, Relic, and Blessing decisions so a later source update can invalidate a decision without rewriting route prose.

Fields:

- decision type;
- chosen option;
- alternatives;
- evidence;
- assumptions;
- model version;
- status;
- invalidation conditions;
- last review date.

### Progress state

Local-only progress should include:

- route version;
- task source revision;
- completed step IDs;
- skipped/parked step IDs;
- user notes;
- current phase;
- optional timestamps for live estimate calibration.

Provide JSON import/export. Do not create accounts to solve local persistence.

---

## 13. Wiki information dialog

The owner's requirement is binding: **every actionable route row opens a wrapper that dynamically pulls its RuneScape Wiki information into an in-page dialog.**

This applies to route rows, not every prose line in this Markdown file.

### Interaction contract

- Clicking the task title or a dedicated Wiki affordance opens the dialog.
- Clicking the completion checkbox only changes completion state; it must not open the dialog.
- The full row may open the dialog when the click did not originate from another control.
- Keyboard: `Enter` opens the focused row; `Space` toggles its checkbox only when the checkbox itself is focused.
- Closing the dialog returns focus to the originating row.
- The route scroll position is preserved.

### Fetch contract

Use the anonymous MediaWiki Action API from the browser. The canonical task dialog should fetch the League task page once per revision and select the matching row by its numeric `data-taskid`; do not assume a task title is itself a Wiki article. Related mechanic, item, boss, or location pages may be listed separately in `contextWikiRefs`.

```text
https://runescape.wiki/api.php
  ?action=parse
  &page=Equilibrium_League/Tasks
  &prop=text|revid|displaytitle
  &format=json
  &formatversion=2
  &origin=*
```

- No Wiki login.
- No proxy.
- No iframe.
- No API key.
- No user credentials.
- Use `AbortController` and cancel a previous request when a different row opens.
- Apply a finite timeout.
- Enforce a conservative response-size ceiling before parsing.
- Parse the response in an inert document, locate exactly one `tr[data-taskid="…"]`, then sanitize only that extracted fragment for rendering.
- Cache the parsed canonical page by `title + revision` for the session so opening each row does not refetch the full task table.
- Do not silently replace the route's pinned revision with live content.

### Browser feasibility gate

Before the static architecture is treated as proven, run a real browser spike from the eventual GitHub Pages origin and confirm that the RuneScape Wiki returns readable anonymous CORS responses for the parse request. This environment could verify the documented MediaWiki contract but could not complete that origin-specific browser test.

If the spike fails because of CORS, Cloudflare, or a site policy:

1. keep the dialog and local snapshot fallback working;
2. label live Wiki retrieval unavailable;
3. do not add a proxy, worker, login, JSONP path, or third-party relay without owner approval;
4. return the architecture decision to review because fully dynamic content and static-only hosting would then conflict.

### Rendering contract

Remote Wiki HTML is untrusted.

- Sanitize through a strict allowlist before any `dangerouslySetInnerHTML` boundary.
- Remove scripts, styles, forms, iframes, media embeds, inline event handlers, arbitrary IDs, and unsupported classes.
- Strip or tightly restrict images in version 1; the route needs information, not a remote image gallery.
- Rewrite relative links to the RuneScape Wiki.
- External links open with `noopener noreferrer`.
- Preserve headings, paragraphs, lists, simple tables, code, and source links.
- Show the page title, fetched revision, and a direct “Open on Wiki” action.

### Failure contract

When the live API is unavailable:

1. show the locally stored task description and requirements;
2. label it as the route snapshot rather than live Wiki content;
3. retain the direct Wiki link;
4. keep the route usable;
5. never display an empty modal with “something went wrong.”

### Freshness contract

When the fetched revision differs from the route's source revision:

- show `Wiki updated since this route was frozen`;
- provide the new revision number;
- do not automatically change route legality or estimates;
- log the task for source review.

---

## 14. Task ingestion and source validation

### Canonical task import

Create a build-time/manual script, not a runtime scraper:

```text
scripts/import-equilibrium-tasks.mts
```

Responsibilities:

1. fetch the canonical Wiki page/revision through the public API;
2. parse task rows or task templates into normalized records;
3. retain source title, revision, anchors, and raw identifiers;
4. validate tiers, points, regions, and Blessing flags;
5. write deterministic JSON;
6. produce a reconciliation report;
7. fail on duplicate IDs or unexplained total drift.

### Generated data

Recommended tracked files:

```text
data/tasks.snapshot.json
src/data/tasks.generated.json
src/data/route.candidate.json
src/data/decisions.json
```

Keep one canonical task snapshot and one route file. Do not create parallel hand-maintained copies.

### Reconciliation checks

- 1,152 total tasks when the full list is published;
- 109,380 nominal points;
- exact regional task and point totals from the Jagex table;
- five Blessing tasks per non-Global region;
- no unknown region IDs;
- no route task outside selected regions;
- every route task has a Wiki reference;
- every source revision is numeric;
- no Catalyst record appears in the production route.

Any mismatch may be a real Wiki/Jagex correction. Report it; do not force the data to match by deleting rows.

---

## 15. Interface design

### Product class

**Route workbench / field notebook.**

The first viewport performs the route's job. There is no hero, slogan, feature pitch, countdown spectacle, testimonial, pricing block, or decorative KPI garden.

### Desktop composition

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ CLANKERSCAPE · route v1 · wiki rev #### · import/export · source status   │
├──────────────┬───────────────────────────────────────┬─────────────────────┤
│ PHASES       │ ROUTE LEDGER                          │ CONTEXT / PREP      │
│              │                                       │                     │
│ Start        │ 184  [ ] Task title          +80     │ Next gate           │
│ 50 Karamja   │      Region · 4m · verified          │ Items to carry       │
│ 175 Pick 1   │      one-line route reason            │ Skills required      │
│ 300 Pick 2   │                                       │ Alternatives         │
│ 450 Pick 3   │ 185  [✓] Completed task       +30    │ Parked RNG tasks     │
│ 20k / T7     │                                       │ Source conflicts     │
│ 48k Dragon   │ ...                                   │                     │
└──────────────┴───────────────────────────────────────┴─────────────────────┘
```

#### Top utility strip

Keep it compact. It should show:

- brand;
- route version;
- task source revision/freshness;
- current task and point totals;
- import/export;
- a source-conflict indicator only when conflicts exist.

Do not repeat the same totals in decorative cards below it.

#### Phase rail

The left rail is a table of gates, not navigation theatre. Each row shows:

- gate name;
- completed/current/future state;
- cumulative tasks and points;
- chosen region/Relic/Blessing when relevant.

The rail may become sticky on desktop.

#### Route ledger

The centre is the primary surface. Rows are dense and readable, not identical rounded cards.

Each row shows:

- route ordinal;
- completion checkbox;
- exact task title;
- numeric Wiki task ID in data, not necessarily on-screen;
- points and tier;
- region/locality;
- expected time or `—`;
- confidence/source state;
- one short route reason;
- a visible Wiki affordance.

Expanded row details may show preparation, items to retain, and alternates. The route should not render a paragraph wall in every collapsed row.

#### Context inspector

The right inspector answers questions about the selected/current step:

- what to carry;
- what must already be true;
- what this unlocks;
- why it is placed here;
- what to do when crowded or blocked;
- source revision and uncertainty.

It is not a generic “details card” repeated for every section.

### Race mode

Provide one optional focused mode after the base interface works:

- show the next 8–12 steps;
- keep carry/prep information visible;
- hide long rationale and completed history;
- preserve a one-click return to the full ledger.

Do not make race mode a separate application or an animated presentation.

### Mobile composition

- compact sticky status strip;
- phase selector as horizontally scrollable tabs or a concise select control;
- one-column route ledger;
- context inspector as a bottom sheet or inline expansion;
- Wiki dialog uses the full viewport with a persistent close control;
- no desktop sidebars squeezed into cards.

### Visual system

Initial direction, subject to rendered review:

- warm matte near-black base;
- slightly lighter charcoal/stone working surfaces;
- cream primary text;
- muted warm-grey metadata;
- restrained brass/gold for structure and important thresholds;
- one teal/emerald progression/focus accent;
- red/orange only for actual risk, conflict, or blocked state;
- square or 2–4 px corners;
- one-pixel borders;
- minimal shadow reserved for the modal layer;
- system sans for reading;
- system mono/tabular numerals where comparison benefits.

Forbidden:

- glassmorphism;
- backdrop blur;
- aurora or blob backgrounds;
- blue-purple startup gradients;
- gradient text;
- idle glow;
- hover scale-and-glow;
- large rounded rectangles everywhere;
- feature-card gardens;
- giant empty acreage;
- fantasy parchment texture spam;
- copied RuneScape Wiki chrome;
- copied RS3 site navigation;
- generated images.

### Motion

Use motion only to explain state:

- row completion/parking transition;
- row detail expansion;
- dialog open/close;
- phase progress change;
- source-update notice.

Keep it short, interruptible, and disabled by `prefers-reduced-motion`. Version 1 has no Three.js because a 3D surface does not improve route execution.

---

## 16. Technical architecture

### Stack

- Vite;
- React 19;
- TypeScript with strict mode;
- plain CSS or CSS Modules;
- DOMPurify or an equivalently small, audited sanitizer;
- Vitest and Testing Library;
- Playwright;
- GitHub Pages through GitHub Actions.

Do not add Tailwind, a component library, a database, an API server, authentication, analytics, a state-management library, or Three.js without a demonstrated need.

### Local-first state

Use a small versioned storage adapter around `localStorage`.

- validate persisted data at the boundary;
- tolerate old or corrupt state by preserving valid completion IDs and dropping invalid fields;
- provide export/import;
- do not store fetched Wiki HTML indefinitely;
- do not collect telemetry.

### Recommended repository shape

```text
.github/workflows/pages.yml
.agents/skills/
  clankerscape-ui/SKILL.md
  clankerscape-route/SKILL.md
  clankerscape-wiki/SKILL.md
  clankerscape-review/SKILL.md

docs/
  grok-heavy-ui-prompt.md

scripts/
  import-equilibrium-tasks.mts
  validate-route.mts
  audit-secrets.mts

src/
  app/
  components/
  data/
  route/
  state/
  wiki/
  styles/
  test/

data/
  tasks.snapshot.json

README.md
plan.md
```

### Boundaries

- `src/route/` owns route legality, ordering, cumulative gates, alternatives, and explanation data.
- `src/wiki/` owns CORS capability detection, fetch, inert parsing, task-row extraction, sanitization, caching, and dialog content transformation.
- React components render route results; they do not calculate source legality inline.
- Generated task data is never edited in a component.
- The UI does not import from the private EverSense repository.
- Equilibrium code is not copied wholesale. Only small, clearly compatible owner-authored data contracts or source records may be adapted, with provenance and licence review.

---

## 17. Security, privacy, and secret policy

### Secrets

The application needs no secret at runtime or build time.

Do not introduce:

- API keys;
- OAuth credentials;
- Wiki credentials;
- GitHub tokens in repository files;
- analytics IDs;
- private repository URLs embedded in shipped JavaScript;
- private source excerpts;
- `.env` requirements for ordinary builds.

### Required secret checks

Before every PR is marked ready:

- scan tracked files for AWS-style access-key prefixes;
- scan for GitHub and model-provider personal-access-token prefixes;
- scan for private-key headers;
- scan for password/token assignments and credential-bearing URLs;
- inspect `.env*`, workflow, and lockfile diffs;
- inspect generated source maps and build output when relevant;
- verify no private EverSense code, art, font, screenshot, or config was copied.

A pattern hit is a review prompt, not automatic proof of a secret. Keep the scanner's literal signatures in its own audited script rather than repeating realistic credential prefixes throughout public documentation.

### Remote content safety

- allow network requests only to the canonical Wiki API and explicit external Wiki links;
- sanitize all remote HTML;
- do not render remote scripts or styles;
- do not use an iframe;
- do not persist user credentials;
- use `noopener noreferrer` for external navigation;
- fail closed on malformed API responses.

### Privacy

- no analytics;
- no cookies;
- no account identifiers;
- no fingerprinting;
- no server logs controlled by this project;
- local completion data stays in the user's browser unless they explicitly export it.

---

## 18. Testing and review

### Unit coverage

Minimum focused tests:

- task normalization and duplicate rejection;
- region legality by phase;
- cumulative task and point gates;
- Blessing threshold sequence;
- Relic threshold sequence;
- route alternatives and parked state;
- storage migration and corrupt-state handling;
- Wiki URL construction;
- MediaWiki response validation;
- sanitizer allowlist and hostile fixture removal;
- canonical task-row extraction by `data-taskid`;
- duplicate or missing task-row failure;
- relative-link rewriting;
- source-revision mismatch behavior.

### End-to-end coverage

- first viewport shows the working route, not a hero;
- completing a task advances progress without opening the Wiki dialog;
- clicking a task title opens the correct Wiki dialog;
- closing returns focus and preserves scroll;
- live Wiki success, CORS-unavailable, timeout, oversized response, missing/duplicate task row, malformed response, and offline fallback;
- desktop, laptop, and phone widths;
- keyboard route traversal;
- visible focus;
- reduced motion;
- import/export round trip;
- no horizontal overflow;
- no console errors or failed same-origin assets.

### Rendered audit sequence

For every material UI pass:

1. run typecheck and focused tests;
2. render laptop width;
3. list and fix the five largest visual/interaction defects;
4. render desktop width;
5. render phone width;
6. inspect populated, loading, error, unavailable, conflict, and empty states;
7. inspect console and network;
8. run the Clankerscape review skill;
9. classify any AI-UI fingerprints;
10. do not call it passing when evidence is unavailable.

### Harsh review standard

Be severe about the work, not abusive toward people.

Reject a change when it:

- invents data;
- hides uncertainty;
- adds decorative structure before working information;
- duplicates labels or totals;
- makes a route row harder to scan;
- adds animation without a state explanation;
- uses a card where a row/table is clearer;
- exposes implementation jargon;
- copies a private or third-party visual pattern too literally;
- weakens keyboard or mobile use;
- adds a dependency to avoid writing a small component;
- passes tests by changing the test instead of fixing the behavior.

---

## 19. GitHub Pages plan

Use a custom GitHub Actions workflow with the official Pages actions:

- `actions/configure-pages`;
- `actions/upload-pages-artifact`;
- `actions/deploy-pages`.

Workflow permissions:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Use `concurrency` to prevent stale concurrent deployments. Build the Vite app with the repository base path unless a custom domain is configured later.

The repository's Pages endpoint currently returns 404, meaning Pages is not configured. After boilerplate is approved and merged, the owner may need to open **Settings → Pages** and select **GitHub Actions** as the source. Do not enable a custom domain, analytics, or third-party deployment service as part of version 1.

---

## 20. Licence and attribution

- The repository currently uses **CC0 1.0 Universal** for owner-authored work. CC0 does not and cannot waive rights the owner does not possess.
- RuneScape Wiki-derived task data remains subject to the Wiki's CC BY-NC-SA terms and must retain required attribution and source links. Do not represent it as CC0.
- Jagex names, marks, and media remain Jagex property and must be handled under the Jagex Fan Content Policy. Do not represent them as CC0.
- No private EverSense asset or code licence is transferred to this repository.
- Keep route annotations original; factual task text and source excerpts should be minimized to what the utility needs.

Before public deployment, add a concise licence/attribution page and a `NOTICE` or equivalent scope statement that separates owner-authored CC0 material from Wiki data and Jagex material.

---

## 21. Commit and review protocol

The purpose of frequent checkpoints is to reduce context-loss and regression risk, not to manufacture empty history.

### Planning PR

Use coherent commits:

1. initialize the repository with README;
2. add safety ignores;
3. add this plan;
4. add Clankerscape skills;
5. add the independent Grok brief;
6. review the complete diff and correct it before requesting approval.

### Implementation work

- commit after each small, working vertical slice;
- target roughly 5–15 minutes of meaningful work per checkpoint during risky changes, but never commit broken or empty churn solely to satisfy a clock;
- review the accumulated diff every 30–60 minutes or after a major route/data/UI boundary;
- run focused checks before each commit and broader checks before a PR update;
- keep PRs draft until the rendered route and source gates pass;
- do not merge implementation before owner approval.

### Regression stop rule

When repeated review finds high-confidence hallucinations, fabricated mechanics, or regressions across two consecutive repair passes:

1. stop implementation;
2. leave the branch unmerged;
3. write `docs/handoff-YYYY-MM-DD.md` containing current state, known failures, last good commit, exact commands, and next actions;
4. request a fresh context window.

---

## 22. Skill provenance and inventory

### Current Equilibrium skills inspected

- `combat-math`
- `combat-sim`
- `data-sync`
- `equilibrium-data-majors`
- `equilibrium-poison`
- `equilibrium-ui`
- `equipment-effects`
- `league-blessings`
- `league-data`
- `lean-implementation`
- `map-3d`
- `playwright-e2e`
- `simple-commit-messages`
- `test-maintainer`

Use current Equilibrium versions, not duplicated legacy copies. Only `equilibrium-ui`, `league-blessings`, `league-data`, `lean-implementation`, `data-sync`, `playwright-e2e`, `simple-commit-messages`, and `test-maintainer` are likely to be directly relevant to Clankerscape. Combat skills become relevant only for the planned blessing/relic benchmark; the combat engine is not copied into this app.

### Owner-authorized private design skills inspected

- `bot-audit`
- `data-readability`
- `find-docs`
- `human-grade`
- `no-slop-ui`
- `text-humanizer`
- `ui-audit`
- `ui-humanizer`

These are treated as private review guidance. No private product code, CSS, art, screenshots, fonts, assets, environment configuration, or application-specific design language may be copied into Clankerscape.

### New Clankerscape skills created in this PR

- `clankerscape-ui` — original product and visual contract;
- `clankerscape-route` — route legality, optimization, and uncertainty contract;
- `clankerscape-wiki` — live Wiki dialog, sanitization, and source-freshness contract;
- `clankerscape-review` — read-only source, UI, security, and anti-slop release audit.

These files are original summaries adapted to Clankerscape's needs. They do not reproduce private skill text. **Files copied verbatim into the public repository: none.**

No separate skill named `claude-frontend`, `frontend-design`, or an equivalent was present in the permitted current repositories. The closest authorized UI system is the private human-grade/no-slop/audit set listed above. Its written rules and visual-reference captions were inspected. The connector could not render the private binary reference images, so this plan does not claim their pixels were reviewed; no private application assets or binary references are included here.

---

## 23. Implementation phases and acceptance gates

### Phase A — approval package

Deliverables:

- README;
- `.gitignore`;
- this plan;
- four project skills;
- Grok Heavy comparison prompt;
- secret scan;
- draft PR.

Gate: owner approves or requests plan changes.

### Phase B — static route shell

Deliverables:

- Vite/React/TypeScript setup;
- original route-workbench shell;
- representative local fixture data only;
- desktop/mobile layout;
- no production route claim.

Gate:

- first viewport performs the route job;
- no hero/SaaS/glass/glow/card garden;
- rendered audit passes;
- no copied assets.

### Phase C — task import and validation

Deliverables:

- Wiki import script;
- canonical snapshot;
- reconciliation report;
- task schema and validators;
- no Catalyst production data.

Gate: official totals reconcile or conflicts are documented.

### Phase D — Wiki dialog

Deliverables:

- real-origin CORS capability spike;
- API client;
- task-row extraction by `data-taskid`;
- strict sanitizer;
- accessible dialog;
- revision mismatch and offline fallback;
- tests with hostile fixtures.

Gate: every representative route row opens sourced content; no unsanitized remote HTML.

### Phase E — route engine and candidate route

Deliverables:

- dependency and gate validation;
- region/Relic/Blessing decision records;
- exact candidate task sequence;
- alternatives and `VERIFY` steps;
- cumulative points/tasks report.

Gate: route-freeze checklist passes and owner approves choices.

### Phase F — race state and calibration

Deliverables:

- completion/park/skip state;
- import/export;
- race mode;
- optional local timestamps and estimate adjustments;
- route version migration.

Gate: completion survives reload/import and never mutates source data.

### Phase G — Pages deployment

Deliverables:

- Pages workflow;
- production build;
- base-path verification;
- licence/attribution page;
- final rendered and secret audit.

Gate: owner enables GitHub Actions Pages source when necessary and approves publication.

---

## 24. Independent UI comparison

The independent Grok Heavy brief is stored at:

```text
docs/grok-heavy-ui-prompt.md
```

Its job is to produce a materially independent route-workbench composition under the same hard constraints. It must not merely restyle the three-column proposal above. Compare the result on:

- route scan speed;
- dead space;
- source visibility;
- Wiki dialog usability;
- mobile collapse;
- visual identity;
- AI/SaaS fingerprints;
- implementation complexity.

Do not average two weak designs together. Keep the stronger composition and steal only ideas that solve a measured problem.

---

## 25. Approval checklist for the owner

Review these decisions before implementation:

- [ ] Product is a route workbench, not a hero/landing/dashboard product.
- [ ] No Three.js in version 1.
- [ ] Desktop direction: phase rail + route ledger + context inspector.
- [ ] Mobile direction: one-column ledger + bottom-sheet/inline context.
- [ ] Every actionable route row opens a dynamic, sanitized Wiki dialog.
- [ ] Region default: Asgarnia → Desert → Anachronia.
- [ ] Relics: Golden Touch → Superheated → Voidwalker → Crystal Grace → Production Master → Rejuvenated/Assassin's Insight → Infernal Fire.
- [ ] T7 contingency: Icyenic Faith when the encounter benchmark or Death Mark rules demand it.
- [ ] Blessings: Big Boned → Cinders → Avernic → Demon's Mark → True Equilibrium → Lord of Light → Tempered Heart → Genesis Essence.
- [ ] True Equilibrium is benchmarked against Havoc Born rather than assumed.
- [ ] Necromancy is the primary early style.
- [ ] Exact task route waits for the full canonical Wiki task list and validation.
- [ ] Static GitHub Pages architecture, local progress, no accounts/backend/analytics.
- [ ] Public repository contains no private EverSense product code/assets/fonts/screenshots.
- [ ] Implementation remains in draft PRs until rendered and source audits pass.

---

## 26. Fresh-chat resume instructions

A new GPT-5.6 Sol Pro chat should:

1. read `plan.md` in full;
2. read the four `.agents/skills/clankerscape-*` files;
3. inspect the current PR and repository state;
4. confirm whether the owner approved the checklist above;
5. do not begin Phase B without approval;
6. when approved, implement Phase B only—do not jump ahead to fake production task data;
7. use current Jagex and Wiki sources before any data claim;
8. keep all implementation inside `sonnaya2/ClankerScape`;
9. use Equilibrium only as an owner-approved source/data/mechanics reference;
10. use private design skills only as review guidance;
11. never inspect the blacklisted repository;
12. report blockers honestly and produce a handoff file if regression stop conditions trigger.
