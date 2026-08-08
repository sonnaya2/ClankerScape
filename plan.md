# ClankerScape — first-to-Dragon route and implementation plan

Status: **revised pre-implementation approval gate**  
Branch: `planning/dragon-route-foundation`  
Target: RuneScape 3 Leagues II: Equilibrium — reach **48,000 League Points** as quickly and reliably as possible  
Product: a free, local-first route workbench. No monetisation, accounts, analytics, sales copy, or product theatre.

This is the handoff document for a fresh GPT-5.6 Pro/Sol implementation chat. It replaces the earlier narrow route thesis. Do not add application boilerplate until this package has been reviewed.

---

## 0. Correction log

The first planning pass was wrong in an important way.

It treated **Perkfection** as the default Tier 6 relic because Asgarnia and Invention appeared to form a neat late-game package. That was shallow optimisation. Tier 6 is a direct choice between:

- **Perkfection** — a large Invention package; and
- **Rejuvenated** — another complete relic from any earlier tier.

Perkfection therefore competes with the best missed Tier 1–5 relic, not with a small generic bonus. It cannot be the default without proving that its remaining-route time savings beat combinations such as:

- Production Master + Devout;
- Animal Wrangler + Production Master;
- Superheated + Devout;
- Crystal Grace + Antiquarian;
- Voidwalker + Assassin's Insight;
- or another account-specific pairing.

That proof does not exist. **Perkfection is withdrawn as the default. Rejuvenated is the working Tier 6 default.** Perkfection stays in the model only as a high-burden exception.

The same error contaminated the region reasoning: Asgarnia was partially being selected to make Perkfection look better. Invention itself is globally available; Asgarnia is required for the Invention Guild and machines, not the skill. Asgarnia must now win on its actual task portfolio, boss ladder, production access, travel and Blessing value.

The old fixed line

```text
Desert → Asgarnia → Anachronia
Golden Touch → Superheated → Assassin's Insight → Crystal Grace → Production Master → Perkfection → Infernal Fire
```

is no longer an approved route. It is only one candidate state for comparison.

---

## 1. Mission

Build **ClankerScape**, a static GitHub Pages app that helps a competitive player reach Dragon without following one brittle activity chain.

The app must answer six questions immediately:

1. What is the best executable skilling action right now?
2. What is the best executable PvM action right now?
3. What can I switch to when the current activity is blocked, boring, crowded, risky, or unlucky?
4. Which irreversible region or relic decision is approaching?
5. Which Blessing reset is available, and what would spending it replace?
6. Why is this step in the route, and what does the current RuneScape Wiki say about it?

The route is not a single sacred list. It is a sourced race plan with:

- a primary recommendation;
- independent skilling and PvM point banks;
- explicit switch triggers;
- reserve tasks for RNG or crowding failures;
- decision gates for regions, relics and Blessing resets;
- a deterministic safety floor to Dragon.

Stop optimising when the player crosses 48,000 points. Do not turn the project into a max-points guide.

---

## 2. Hard constraints

### Product

- Name the app **ClankerScape**.
- The main screen is a route workbench, not a landing page or dashboard preamble.
- The first viewport contains executable route rows.
- No accounts, server database, telemetry, advertising, donations, payments, social feed, or hosted profile.
- Progress stays in the browser and can later be exported/imported as validated JSON.
- No runtime LLM route generation. Route logic is deterministic and inspectable.

### Visual design

- No hero section, feature grid, testimonial, pricing, waitlist, CTA strip, or fake KPI cards.
- No glassmorphism, backdrop blur, blue-purple startup gradients, gradient text, aurora blobs, idle glow, glow-on-hover, or ambient animation.
- No rounded card garden. Use one working ledger, one switchboard, quiet borders and restrained depth.
- No generated images.
- Do not clone the RuneScape Wiki or another RuneScape tool.
- Do not copy code, layout, route order, or commentary from `RS3-Dev/TheRSGuide.com`.
- Do not copy public user routes or public Wiki user-guide ordering.

### Allowed project sources

- `sonnaya2/Equilibrium`
- `sonnaya2/EverSense-Web` for owner-authorised review guidance only
- new code written specifically for ClankerScape
- official framework/library documentation when implementation begins

Do not copy private application code, CSS, fonts, images, screenshots, configuration, credentials, or product-specific visual language into the public repository.

### Source wrapper

Every executable route row is source-aware. The completion control and source-opening control are separate:

- checkbox/button: changes local completion state only;
- task title or Wiki action: opens the in-page source wrapper;
- row background: may select the row for the inspector, but must not accidentally complete it.

No production row may exist without a canonical task source and numeric Wiki task ID, or a visible `source unavailable` development failure.

### Access and safety

- Do not bypass Cloudflare, CAPTCHAs, authentication, rate limits, IP restrictions, or account controls.
- Do not create throwaway accounts or request credentials.
- A blocked source remains blocked. Do not invent data to make the route look finished.
- Never commit `.env` files, tokens, cookies, browser profiles, auth state, local settings, account details, private keys, connector metadata, or copied private-repository material.

---

## 3. Current verified League rules

Primary official source:

```text
https://secure.runescape.com/m=news/leagues-equilibrium-reveals---releasing-august-10th
```

### Progression

- Launch: 10 August 2026.
- Dragon Trophy: **48,000 points**.
- Total published pool: **109,380 points across 1,152 tasks**.
- Starting regions: Misthalin and Havenhythe.
- Karamja unlocks automatically at 50 completed tasks.
- Elective regions unlock at 175, 300 and 450 completed tasks.
- Exactly three elective regions may be selected.
- Relic thresholds: 10, 750, 1,750, 3,500, 6,000, 12,000 and 20,000 points.
- Blessing thresholds: 1, 3, 5, 9, 12, 16, 20 and 26 Blessing tasks.
- Each unlocked region provides five Blessing tasks.
- The Blessing passive track grants three resets: Tier 1, God Tier I and God Tier II.

### Regional totals

| Pool | Points | Tasks | Nominal points/task |
| --- | ---: | ---: | ---: |
| Global | 34,950 | 392 | 89.2 |
| Misthalin | 13,430 | 141 | 95.2 |
| Havenhythe | 2,060 | 50 | 41.2 |
| Karamja | 3,870 | 57 | 67.9 |
| Kharidian Desert | 8,360 | 73 | 114.5 |
| Anachronia | 8,210 | 57 | 144.0 |
| Tirannwn | 7,340 | 64 | 114.7 |
| Wilderness | 6,900 | 65 | 106.2 |
| Asgarnia | 6,760 | 65 | 104.0 |
| Morytania | 6,760 | 64 | 105.6 |
| Kandarin | 5,940 | 63 | 94.3 |
| Fremennik Province | 4,800 | 61 | 78.7 |

Nominal density is not a route score. It ignores tier distribution, prerequisites, setup, travel, skill levels, combat difficulty, time gates, RNG and crowding.

### Rules that affect route value

- WikiSync is available during onboarding.
- Boss spawn settings are accelerated.
- Shops use simplified infinite stock.
- The 30,000 damage cap and normal life-point cap are removed.
- Area tasks with cross-region requirements are auto-skipped/completed with the relevant region.
- Invention is globally available through the Tier 1 passive. Asgarnia is still required for the Invention Guild and machines.
- Necromancy and the City of Um are in starting Misthalin; Kili's Knowledge tasks are skipped.
- Construction is available from Lumbridge.
- Clues, tetracompasses, Slayer assignments and Reaper assignments respect unlocked regions.
- Daemonheim itself is Wilderness-locked, but Dungeoneering can still be trained through available alternatives and its reward shop is accessible outside the wall under the published League rules.
- Dungeoneering tokens receive Tier 3 and Tier 5 passive multipliers.
- Survivalist's extra resources do not grant extra XP.
- Big Boned works with almost all player-sourced damage, including conjures, but not familiar or dreadnip damage.

### Task-data blocker

The canonical task page is live, but this environment cannot currently read the complete table reliably. Jagex has published Easy and Medium tasks and states the remaining tiers will arrive immediately before launch.

Until a full snapshot is imported and reconciled:

- do not publish a row-by-row speed route;
- do not assign task points, tier, requirements or estimated time from memory;
- do not use Catalyst rows as Equilibrium truth;
- do not make region or relic choices appear final;
- keep this document at the strategy/decision-system level.

---

## 4. Optimisation model

The old plan treated the route like one ranked list. The revised model treats it as a **portfolio with gates**.

### Hard feasibility

A task is not executable when any of these fail:

- its region is locked;
- a required item, quest, skill, transport, shop or activity is unavailable;
- a dependency crosses into a locked region;
- a required Relic or Blessing is not active;
- the route lacks a source-backed completion rule;
- the player has marked it blocked or deferred;
- the task is a Catalyst stand-in;
- the task's source revision conflicts with the frozen route and has not been reviewed.

Hard feasibility runs before scoring. An illegal task never receives a low score; it is excluded with a named reason.

### Before 450 tasks

The primary objective is time to the next region gate.

Lexicographic priority:

1. shortest legal time to the next task-count milestone;
2. reachable Blessing threshold that repays its detour before the next gate;
3. reachable Relic threshold that repays its detour before the next gate;
4. transport, skill, gear and prerequisite unlocks;
5. locality batching and low bank friction;
6. task count per active minute;
7. points per minute;
8. lower RNG, failure, crowding and uncertainty.

A 10-point task may outrank a 200-point task when it opens a region much sooner.

### After 450 tasks

The primary objective is time to 48,000 points.

Lexicographic priority:

1. deterministic points available now;
2. reliable points per active minute;
3. profitable final Relic/Blessing breakpoints;
4. cluster value: one setup producing several tasks, drops, mastery goals or gear upgrades;
5. optionality: preserving at least one strong skilling and one strong PvM alternative;
6. lower P90 completion time, failure risk, crowding and supply rebuilding;
7. raw expected points per minute.

Do not let a high expected value with a terrible tail dominate a deterministic route.

### Optionality value

A route step receives optionality value when it:

- opens several follow-up tasks across both queues;
- creates a fallback activity during crowding or RNG;
- improves travel for many regions;
- produces supplies needed by both skilling and combat;
- reduces the risk that one boss or one drop blocks Dragon.

Optionality is not a vague bonus. The explanation must name the newly executable rows or clusters.

### Switch cost

Switching activities is not free. Track:

- bank/loadout preparation;
- travel;
- aura/prayer/familiar changes;
- instance setup;
- re-learning or failure warm-up;
- attention cost for active methods.

The route should switch queues when the alternative's gain exceeds this cost, not merely because its raw score is slightly higher.

### Estimate discipline

Store separately:

- setup minutes;
- travel minutes;
- active minutes;
- expected waiting/crowding minutes;
- P50 RNG time;
- P90 RNG time;
- failure/retry time;
- confidence and sample count.

Unknown is `null`, never zero.

A live observation that changes a route estimate by at least 20% triggers re-ranking. One outlier does not silently rewrite the route.

---

## 5. The five point banks

The route engine maintains five banks rather than one queue.

### 1. Immediate skilling bank

Deterministic tasks executable now with little setup:

- level thresholds already close;
- one-action production/equipment tasks;
- banked-material batches;
- nearby gathering and utility tasks;
- transport, shop and interface actions;
- low-risk skilling bosses where applicable.

### 2. Deep skilling bank

Tasks that need meaningful preparation but form a coherent future cluster:

- Production Master batches;
- Archaeology qualification/collection chains;
- Farming/Hunter/Fishing packages;
- Runecrafting/ritual packages;
- high-level production and equipment goals;
- region-specific skilling hubs.

### 3. Immediate PvM bank

Reliable combat tasks available now:

- Blessing kills;
- first kills;
- low-risk mastery tasks;
- Slayer targets with controlled assignments;
- guaranteed equipment/progression tasks;
- bosses already supported by current gear and supplies.

### 4. Deep PvM bank

High-value clusters requiring gear, practice or setup:

- boss kill + mastery + drop + equip chains;
- multi-boss regional ladders;
- high-level Slayer and elite spawns;
- long encounter chains;
- final Blessing bosses.

### 5. Reserve bank

Do not place these in the critical path while deterministic alternatives remain:

- rare-drop tails;
- severe time gates;
- crowded launch bottlenecks;
- tasks with disputed mechanics;
- bosses above the current failure tolerance;
- completionist goals that do not repay before Dragon.

### Guaranteed-next-points contract

After 450 tasks, the workbench should try to maintain:

- a visible **guaranteed next 2,000 points** list;
- a skilling route to at least part of that total;
- a PvM route to at least part of that total;
- replacements for any step with medium/high RNG or crowding risk.

The candidate corpus should contain at least **4,000 points of reserve slack** beyond the 48,000 finish. The player still stops at 48,000; the extra corpus prevents one bad assumption from killing the route.

---

## 6. Region decision system

### No region is selected to justify a relic

Region choice is upstream. Relic synergy may break a close tie, but a weak region portfolio is not rescued by Perkfection, an outfit, one boss or one attractive item.

### Working seed, not a lock

The current simulation seed remains:

```text
175: Kharidian Desert
300: Asgarnia or Morytania gate
450: Anachronia, Tirannwn or Wilderness gate
```

This is intentionally broader than the old fixed Desert → Asgarnia → Anachronia line.

### Gate at 175 tasks

Score every elective region against the current account using:

- verified sub-five-minute tasks;
- total reachable task count in the next two active hours;
- immediate skilling bank;
- immediate PvM/Blessing bank;
- travel/setup burden;
- auto-completed quest value;
- supplies and gear opened;
- dependency compatibility with starting regions and Karamja.

**Desert is the provisional favourite**, because it has the largest elective task count and point pool and offers both skilling and PvM. It is not selected from totals alone.

Primary challengers:

- **Asgarnia** — broad guild/workshop access and a long boss ladder;
- **Morytania** — Slayer, Barrows, Araxxor, Everlight and multi-skill Vyre routes;
- **Kandarin** — very broad skilling, Farming, Fishing, Archaeology and transport;
- **Wilderness** — Dungeoneering, Elite Dungeons, Slayer and a large utility package.

### Gate at 300 tasks

The second elective should repair the weaker queue.

If Desert or the first region has already supplied enough skilling but combat is weak, compare:

- Asgarnia's GWD1/Nex/AoD/Vorago/ED1 ladder;
- Morytania's Barrows/Araxxor/Slayer ladder;
- Wilderness's ED2/ED3/Slayer/Dungeoneering ladder.

If combat is healthy but deterministic skilling points are weak, compare:

- Kandarin's Farming/Fishing/Divination/Archaeology package;
- Asgarnia's workshops and guilds;
- Morytania's Everlight/Vyre/utility package.

**Asgarnia remains a credible generalist, not an automatic pick.** Its Invention Guild is one line in the comparison, not the thesis.

### Gate at 450 tasks

For each unselected candidate, compute:

- `reachableNow`: requirements met or under 15 minutes of setup;
- `reachableFourHours`: realistic next-four-active-hour corpus;
- `deterministicFloor`: points after excluding severe RNG/time gates;
- `p50Points` and `p90Points` for the same active window;
- skilling/PvM split;
- Blessing-task feasibility;
- gear and supply unlocks;
- dependency overlap with completed work;
- switch cost and crowding exposure.

Current final-region roles:

- **Anachronia** — highest nominal point density; BGH, Ranch, agility, Orthen, Slayer, Raksha, Rex Matriarchs and other mixed content.
- **Tirannwn** — dense Prifddinas skilling, Slayer, crystal equipment, Lost Grove/Solak and high-level supplies.
- **Wilderness** — Dungeoneering, ED2/ED3, Slayer, Runecrafting, Archaeology and numerous utility unlocks.
- **Morytania** — strong combat/Slayer and a useful skilling floor when not selected earlier.
- **Kandarin** — strong deterministic skilling/Archaeology/Farming/Fishing floor.

Anachronia remains the provisional high-density finisher. Select it only when the reachable portfolio wins, not because 8,210 / 57 looks attractive.

### Close-result rule

When two region projections overlap within estimate uncertainty:

- display the result as close;
- show the decisive task clusters;
- favour the region with the stronger deterministic floor and better queue balance;
- do not manufacture a recommendation margin.

---

## 7. Relic decision tree

### Relic permanence

Ordinary relics are treated as permanent unless a current source explicitly adds a reset mechanic. The confirmed resets belong to Blessing progression. Rejuvenated grants another earlier-tier relic; it does not rewrite previous relic picks.

Every relic gate must show:

- all choices;
- source text;
- current route benefit;
- next-best choice;
- tasks/clusters accelerated;
- P50/P90 minutes saved before Dragon;
- irreversible warning;
- invalidation conditions.

### Tier 1 — 10 points

Choices:

- **Golden Touch** — Agility while moving/skilling, failure-free Thieving, extreme coin multiplier, noted/triple loot and Goldenhawk Prayer/coin conversion.
- **Survivalist** — top gathering tools, doubled resources, Mining/Archaeology acceleration and artifact restoration benefits.
- **Endless Harvest** — broad auto-banking, persistent resource nodes and gathering upgrades.

Working favourite: **Golden Touch**.

Why:

- its Agility, Thieving, coin and Prayer value is most time-sensitive at the beginning;
- it removes several independent early bottlenecks;
- the route cannot recover lost early travel XP or failed-pickpocket time later.

Golden Touch loses when the imported early task corpus proves that a gathering/Archaeology opener reaches 50/175 materially faster with Survivalist. Endless Harvest wins only when auto-banking/node persistence beats both active-speed packages over the measured early route.

### Tier 2 — 750 points

Choices:

- **Animal Wrangler** — Fishing, Hunter, Farming, BGH, charms, seeds/herbs, beans and banking.
- **Superheated** — Firemaking, Cooking, Mining, Smithing, bars, burial equipment and supplies.
- **Divine Druid** — Herblore, Summoning, Divination, charms, familiars, potions, memories and supplies.

There is **no approved static default** before the task import.

The previous plan understated Animal Wrangler. It affects three major skills, both fixed starting-region and possible Anachronia content, BGH safety, farm animals, charms and supply generation. Superheated remains a broad production accelerator. Divine Druid may dominate a combat-supply or Summoning route.

Gate rule:

1. calculate tasks reached before the 300-task gate;
2. calculate supplies/gear that reduce later PvM time;
3. calculate remaining value after 450;
4. penalise duplicated benefits from future relics/passives;
5. choose the largest total Dragon-time reduction.

Working pair to test first: **Animal Wrangler versus Superheated**. Divine Druid enters the lead when Herblore/Summoning/Divination tasks and familiar value are large enough.

### Tier 3 — 1,750 points

Choices:

- **Voidwalker** — broad unlimited jewellery teleports plus useful shard supplies.
- **Assassin's Insight** — Slayer teleports, assignment control, elite spawns/XP and guaranteed ushabti capture.
- **Nature's Network** — fairy ring/spirit tree/farm-patch travel, instant harvest, instant growth, compost and seed efficiency.

Working favourite before full data: **Voidwalker**, because travel savings apply across the widest route while regions are still opening.

Switch favourites when:

- Assassin's Insight opens a larger immediate Slayer/Blessing/PvM bank;
- Nature's Network combines with Animal Wrangler and the selected regions to produce a much larger deterministic Farming/transport bank;
- the route's actual travel matrix shows Voidwalker destinations rarely match the chosen clusters.

Tier 3 is also a common Rejuvenated target later. Do not decide the extra pick at 1,750 points.

### Tier 4 — 3,500 points

Choices:

- **Crystal Grace** — all spells, rune altar access/output, ritual acceleration, free glyph/light ingredients and Prayer support.
- **Antiquarian** — all Archaeology relics, 1,000 monolith energy, storage, Fixate, focus, materials, chronotes and caskets.
- **Transmutation** — unrestricted resource upgrading/downgrading and banked stack processing.

Working favourite: **Crystal Grace**, especially with starting Misthalin Necromancy.

It loses when:

- Archaeology tasks across Misthalin/Desert/Anachronia/Kandarin/Morytania form a larger reachable point bank with Antiquarian;
- Transmutation removes critical region-resource blockers or converts a stored resource bank into enough fast tasks/gear to beat both;
- the route already has spells/runes/ritual requirements solved cheaply.

### Tier 5 and Tier 6 — one paired decision

Tier 5 choices:

- **Clue Connoisseur**
- **Production Master**
- **Devout**

Tier 6 choices:

- **Perkfection**
- **Rejuvenated**

Treat 6,000 and 12,000 points as one two-stage decision.

#### Primary pairing hypothesis

The first pairing to test is:

```text
Production Master + Devout
```

Why the pair is broad:

- Production Master converts accumulated supplies into production tasks, skill thresholds and equipment.
- Devout provides portable banking/noting, a large familiar inventory, major familiar special efficiency and combat/skilling familiar value.
- Together they support both queues and remove bank friction from almost every remaining phase.

#### Which one comes first?

At 6,000 points:

- choose **Production Master first** when a banked production burst can reach 12,000 quickly;
- choose **Devout first** when portable banking, familiar power or trip extension immediately accelerates the route more;
- choose **Clue Connoisseur first** only when sourced clue tasks/caskets form a large, reliable point bank rather than a speculative rare-reward plan.

At 12,000 points:

- choose **Rejuvenated** by default;
- re-score every missed Tier 1–5 relic;
- select the missed relic that removes the most remaining Dragon time.

The extra relic is not predetermined. It may be:

- the other member of Production Master/Devout;
- Animal Wrangler;
- Superheated;
- Divine Druid;
- Survivalist;
- Assassin's Insight;
- Nature's Network;
- Antiquarian;
- Transmutation;
- Clue Connoisseur;
- or another missed earlier choice supported by the route corpus.

#### Perkfection burden of proof

Perkfection is selected only when all of these pass:

1. remaining Invention tasks, machines, gizmos, materials and perk-enabled PvM are sourced;
2. their time savings are measured over the remaining route;
3. the comparison includes the best missed Tier 1–5 relic, not a weak strawman;
4. Perkfection improves projected Dragon time by at least 8% after uncertainty penalties;
5. the gain remains under a P90 comparison and does not depend on a tiny number of rare-drop tasks.

Until then, Perkfection is **not recommended**.

### Tier 7 — 20,000 points

Choices:

- **Infernal Fire** — universal Death Mark, execute at 20%, adrenaline on execute and offensive pocket stats.
- **Icyenic Faith** — Prayer-based damage/crit scaling, stronger protection prayers and Soul Split behaviour.
- **Naragi Edict** — timed level-255 burst, large repeated heals, revive and defensive/offensive pocket stats.

No automatic winner.

Run a weighted encounter-portfolio benchmark before selecting:

- remaining bosses and mastery tasks;
- Death Mark eligibility and phase behaviour;
- kill duration and downtime;
- Prayer bonus;
- current Blessing package;
- death/failure rate;
- food, familiar and banking time;
- first-kill versus farmed-kill value;
- burst-window compatibility;
- expected remaining skilling points, which reduce the number of bosses required.

Working packages to compare:

- **Infernal Fire + Chaos/crit package** for short, Death-Markable fights and strong set effects;
- **Icyenic Faith + Order/Light package** for sustained universal damage, crit and survival;
- **Naragi Edict** for difficult first clears, mastery rescue and high failure-cost encounters.

Choose the package with the lowest total remaining route time, not the highest dummy DPS.

---

## 8. Blessing epochs and resets

Blessings are the resettable combat system. Model them as **epochs with triggers**, not one permanent path.

### Reset ledger

Track:

- three total reset charges;
- where each charge was granted;
- current six path selections;
- both derived God Blessings;
- the exact choices that will be erased;
- benchmark/result that justified the reset;
- points and bosses remaining after the reset.

Do not spend a reset for a tiny local improvement. A reset should alter a meaningful route phase.

### Epoch A — low-gear accuracy

Working opener:

```text
Tier 1: Big Boned       (Balance)
Tier 2: Abyssal Cinders (Chaos)
Tier 3: Avernic Rampage (Chaos)
God I:  Demon's Mark    (Chaos)
```

Purpose:

- Big Boned gives a strong low-gear rider and survival, including conjure-hosted damage;
- Cinders adds direct hit throughput and Inferno rolls;
- Avernic changes future cast affordability;
- Demon's Mark removes a major early accuracy/weakness bottleneck.

Bank the first reset unless another path is required to clear a route-defining encounter.

### Epoch B — mixed generalist after accuracy is solved

Candidate reset:

```text
Tier 1: Big Boned       (Balance)
Tier 2: Striking Light  (Order)
Tier 3: Avernic Rampage (Chaos)
God I:  Splash Zone     (Balance: one of each path)
```

Purpose:

- preserve Big Boned;
- add a basic-attack Light engine;
- preserve free-adrenaline windows;
- gain AoE/multi-target scaling;
- expose all three alignments for maximum True Equilibrium value if the live mechanic matches the published model.

Do not force this reset. Compare it against retaining Cinders/Demon's Mark on the actual next encounter set.

### Epoch C1 — Order/Genesis late package

```text
Tier 4: True Equilibrium (Balance)
Tier 5: Lord of Light    (Order)
Tier 6: Tempered Heart   (Order)
God II: Genesis Essence  (Order)
```

Purpose:

- broad stat package from True Equilibrium;
- basic-triggered multi-hit Light, Prayer/armour scaling and healing;
- passive adrenaline;
- tier-120 weapon treatment.

This is the first package to test with Icyenic Faith. It is also a strong gear-poor recovery line because Genesis reduces dependence on a late weapon grind.

### Epoch C2 — Chaos/Chaotic Insight speed package

```text
Tier 4: Havoc Born or True Equilibrium benchmark
Tier 5: Unholy Critual
Tier 6: Perfidious
God II: Chaotic Insight when the second segment has Chaos majority
```

Purpose:

- direct damage or broad stats;
- crit-driven Inferno;
- stronger/faster Inferno, Grasp and Light effects;
- multiplied equipment-set contribution.

Use only when:

- the account has useful set effects;
- Death Mark works on the encounter portfolio;
- the loss of life/armour from Havoc does not erase the damage gain through deaths, supplies or weakened Big Boned/Lord interactions;
- the combat benchmark beats the Order package on total route time.

### Epoch C3 — Balance/Power Archive poison/DoT package

```text
Tier 4: True Equilibrium
Tier 5: Tearing Thorns
Tier 6: Envenomed
God II: Power Archive
```

Purpose:

- DoT duration and Grasp triggers;
- poison amplification and temporary poison-immunity removal;
- doubled eligible perk ranks from stored gizmos;
- strong large-target/multi-hit potential.

Use only when poison, DoT and stored perk infrastructure are genuinely online. Do not recommend it against short-lived targets or when setup time exceeds the remaining boss savings.

### Epoch C4 — Higher Power basic engine

```text
Tier 4: Higher Power
Tier 5: Lord of Light
Tier 6: Tempered Heart
God II: Genesis Essence
```

Purpose:

- self-contained basic/Light/adrenaline engine;
- tier-120 weapon treatment;
- avoids relying on a normal late weapon and complex ultimate rotation.

Cost:

- loses Berserk, Death's Swiftness, Living Death and Sunshine.

Treat it as an encounter-specific or gear-poor package, not an automatic recommendation.

### Reset trigger

A reset is recommended only when:

- the current path blocks a required fight;
- another package reduces the P50 remaining route by at least 8%;
- the improvement remains at P90 after death/supply/setup costs;
- enough points remain for the gain to repay the reset;
- the user can see exactly which current choices and God Blessings will disappear.

---

## 9. Combat and training stance

### Combat style

Start with **Necromancy as the working default**, because City of Um is in starting Misthalin and Kili progression is skipped.

Do not make Necromancy a permanent doctrine. Re-score styles when:

- a major weapon/armour set drops;
- Genesis Essence is unlocked;
- a Blessing package favours basics, crits, poison or set effects;
- a region opens a stronger style-specific boss ladder;
- the next encounter has a decisive weakness or mechanic.

### Training

- Train to the next route requirement plus a small buffer, not arbitrary round numbers.
- Bank production materials when a near-future relic will process them much faster.
- Do not delay a region/task milestone merely to build a perfect future batch.
- Separate resource gain from XP gain; Survivalist's doubled resources are not doubled XP.
- Convert Golden Touch coins into concrete task/supply time savings rather than hoarding them.
- Use Animal Wrangler, Superheated, Divine Druid, Crystal Grace, Antiquarian and Production Master only where their actual output advances tasks or gear.
- Avoid long rare-drop farming while a deterministic bank remains.

---

## 10. Macro route phases

Exact task IDs are inserted only after the full task import.

### Phase 0 — source sync

Before racing:

- fetch the canonical task page and revision;
- import all published tiers;
- reconcile 1,152 tasks and 109,380 points or document every discrepancy;
- identify Blessing tasks, auto-completions and source corrections;
- reject Catalyst records;
- generate region/relic sensitivity reports;
- freeze a versioned route or visibly state `route not frozen`.

The importer and validator should already exist before launch.

### Phase A — first 10 points

- take the shortest sourced legal task to Tier 1;
- select the Tier 1 relic through the early-task comparison;
- immediately exploit its unique early value;
- do not perform redundant manual training first.

### Phase B — 10 points to 50 tasks

Primary objective: Karamja.

Maintain:

- immediate skilling queue from Lumbridge/Misthalin/Havenhythe;
- immediate PvM/Blessing queue;
- short transport/shop/equip actions;
- no long quest, RNG or production detour without cluster payoff.

Stop cleanup at 50 tasks and take Karamja.

### Phase C — Karamja to 175 tasks

- cluster Brimhaven, Shilo, TzHaar, Herblore Habitat and other sourced localities;
- use the Tier 2 gate against the actual next-300-task corpus;
- build a skilling bank and a PvM/Jad/Blessing bank;
- cross 1,750 points and choose Tier 3 based on route-wide travel/Slayer/Farming value;
- prepare the 175-region comparison before reaching the gate.

### Phase D — 175 to 300 tasks

- select the region with the strongest verified count portfolio, not the highest total points;
- exploit auto-completed quest chains;
- reach 3,500 points and run the Crystal Grace/Antiquarian/Transmutation gate;
- keep the weaker queue supplied;
- prepare the 300-region complement comparison.

### Phase E — 300 to 450 tasks

- select the region that repairs the weaker queue;
- bank materials for the Tier 5 decision without blocking task count;
- at 6,000 points choose Production Master, Devout or Clue Connoisseur from immediate payback;
- at 12,000 points default to Rejuvenated and select the best missed earlier relic;
- build the final-region comparison before task 450.

### Phase F — 450 tasks to 20,000 points

- select the final region from reachable portfolio data;
- switch from task-count optimisation to reliable points;
- maintain all five banks;
- complete Blessing tasks in a measured difficulty order;
- reserve at least two alternatives for crowded or uncertain steps;
- benchmark Tier 7 against the actual remaining encounter portfolio.

### Phase G — 20,000 to 48,000 points

- select the Tier 7 package with the lowest remaining route time;
- use boss clusters when kill/mastery/drop/equip tasks stack;
- use deterministic skilling batches whenever PvM stalls;
- keep a visible guaranteed-next-2,000 list;
- park rare tails until deterministic alternatives are exhausted;
- cross 48,000 and stop.

---

## 11. Route data model

Keep source facts, route assumptions, decisions and player state separate.

### `TaskFact`

```ts
interface TaskFact {
  id: string;
  wikiTaskId: number;
  name: string;
  description: string;
  tier: "easy" | "medium" | "hard" | "elite" | "master";
  points: number;
  region: RegionId | "global";
  locality?: string;
  category: "skilling" | "pvm" | "unlock" | "travel" | "production" | "mixed";
  skills: Array<{ skill: string; level: number; boostable?: boolean }>;
  requirements: Requirement[];
  blessingTask: boolean;
  autoCompleted?: boolean;
  source: {
    pageTitle: "Equilibrium League/Tasks";
    revision: number;
    canonicalUrl: string;
    verifiedAt: string;
  };
  status: "verified" | "provisional" | "conflict";
}
```

### `RouteAssumption`

```ts
interface RouteAssumption {
  taskId: string;
  setupMinutes: number | null;
  travelMinutes: number | null;
  activeMinutes: number | null;
  waitMinutes: number | null;
  rngP50Minutes: number | null;
  rngP90Minutes: number | null;
  retryMinutes: number | null;
  confidence: "high" | "medium" | "low" | "verify";
  sampleCount: number;
  crowdingRisk: "low" | "medium" | "high";
  failureRisk: "low" | "medium" | "high";
  routeReason: string;
  switchTrigger?: string;
  alternatives: string[];
  lastReviewedAt: string;
}
```

### `PlayerTaskState`

```ts
interface PlayerTaskState {
  taskId: string;
  state: "available" | "do-now" | "queued" | "blocked" | "deferred" | "completed" | "skipped-dragon";
  note?: string;
  completedAt?: string;
}
```

### `DecisionGate`

```ts
interface DecisionGate {
  id: string;
  type: "region" | "relic" | "blessing-reset" | "tier7-package";
  threshold: number;
  candidates: DecisionCandidate[];
  currentLeader?: string;
  confidence: "high" | "medium" | "low" | "blocked";
  decisiveEvidence: string[];
  invalidationConditions: string[];
  resolvedAt?: string;
}
```

### `RoutePortfolio`

```ts
interface RoutePortfolio {
  immediateSkilling: string[];
  deepSkilling: string[];
  immediatePvm: string[];
  deepPvm: string[];
  reserve: string[];
  guaranteedNextPoints: number;
  candidateReservePoints: number;
}
```

The route engine joins these records. A scoring pass never mutates source facts, and imported player state never mutates the route corpus.

---

## 12. Wiki information wrapper

Every actionable row opens current source context without losing route position.

### Canonical task source

A League task title is not necessarily its own Wiki article. Route tasks must carry numeric `wikiTaskId` values.

The wrapper should:

1. fetch the canonical `Equilibrium League/Tasks` page through the public MediaWiki API;
2. cache the parsed page by source revision for the session;
3. locate exactly one task row by `data-taskid`;
4. extract only that row's useful text in an inert document;
5. sanitise the fragment or convert it to structured plain text;
6. show related boss/item/mechanic article links separately.

Do not issue a full task-page request for every click once the same revision is cached.

### Public API

Use anonymous MediaWiki requests from the browser. No login, proxy, iframe, API key or credentials.

Before treating the static architecture as proven, run a real browser test from the eventual GitHub Pages origin. If CORS or Cloudflare blocks the request:

- keep the local route snapshot available;
- label live Wiki content unavailable;
- retain direct source links;
- return the architecture conflict for owner review;
- do not quietly add a proxy, worker, relay or login.

### Modal content order

1. route action and completion state;
2. route-specific reason;
3. requirements and blockers;
4. current Wiki task row;
5. related article links;
6. estimate assumptions/confidence;
7. source revision/freshness;
8. direct Wiki action.

Route commentary and Wiki content use distinct labels. Never make model-authored text look like a Wiki quote.

### Interaction

- completion checkbox does not open the modal;
- task title/Wiki action opens it;
- Escape and close button close it;
- focus is trapped while open and restored to the originating title/action;
- route scroll position is preserved;
- phone uses a full-height sheet;
- loading, missing-row, duplicate-row, oversized-response, CORS, timeout, stale-revision and offline states are designed.

---

## 13. Interface design

### Product class

**Dense route workbench / field ledger.**

The route, not the brand, owns the first viewport.

### Desktop composition

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ CLANKERSCAPE · 12,480 / 48,000 · 327 tasks · next gate 450 · source rev ####│
├─────────────────────────────────────────────────────┬────────────────────────┤
│ ROUTE LEDGER                                        │ SWITCHBOARD            │
│                                                     │                        │
│ Phase E · 327 → 450                                 │ SKILLING NEXT          │
│ [✓] 327 Task title      area  +pts  time  source    │ exact action           │
│ [ ] 328 Task title      area  +pts  time  source    │ switch trigger         │
│ [ ] 329 Task title      area  +pts  time  source    │                        │
│ ... at least eight executable rows above fold       │ PVM NEXT               │
│                                                     │ exact action           │
│ Guaranteed next 2,000 · reserve 4,000               │ switch trigger         │
│                                                     │                        │
│ Completed / deferred / reserve                      │ DECISION AHEAD         │
│                                                     │ T6: Rejuvenated        │
│                                                     │ candidate extra relic  │
└─────────────────────────────────────────────────────┴────────────────────────┘
```

### Row anatomy

A row is not one giant button.

- completion checkbox/button: local completion only;
- title/Wiki action: opens source wrapper;
- row body: may select inspector context;
- status action: changes queue/deferred state when present.

Desktop columns:

1. sequence;
2. completion;
3. action title;
4. locality/region;
5. queue/category;
6. task/point gain;
7. expected time;
8. blocker/status;
9. source freshness.

Do not duplicate mobile metadata as accidental extra desktop grid cells.

### Switchboard

The rail contains:

- skilling next;
- PvM next;
- switch trigger;
- guaranteed-next-points coverage;
- current bottlenecks;
- approaching region/relic/Blessing gate;
- current relics and candidate Rejuvenated pick;
- current Blessing epoch and resets;
- reserve warnings.

It does not contain fake KPIs, charts, social feeds, streaks, “insights” or repeated totals.

### Mobile

The Grok comparison proved the compact metadata treatment can work, but its ordering needs correction.

Phone order:

1. compact two-line progress header;
2. skilling/PvM next switcher;
3. active route rows immediately;
4. approaching decision warning;
5. deeper relic/region/Blessing detail;
6. completed/deferred/reserve groups.

Do not place the entire rail above the route. The player should reach the ledger after the two next-action summaries, not after several screens of status.

### Visual language

- warm near-black and charcoal stone surfaces;
- cream primary text;
- muted warm-grey metadata;
- restrained gold for thresholds and permanent decisions;
- teal/emerald for active progress and focus;
- red/orange only for real blockers, source conflicts or destructive reset consequences;
- square or 2–4 px corners;
- one-pixel borders;
- minimal shadow for the modal layer;
- system sans for reading;
- tabular numerals for points, tasks and time.

### Hard rejection list

- hero;
- giant logo;
- marketing slogan;
- KPI cards;
- feature grid;
- glass/blur;
- gradient text;
- blue-purple SaaS chrome;
- aurora blobs;
- idle glow;
- hover scale-and-glow;
- card gardens;
- giant empty header acreage;
- generated art;
- copied RuneScape site chrome;
- fake AI recommendation prose;
- ornamental Three.js.

### Motion

Use short state-driven motion only for:

- completing/parking a row;
- opening/closing details;
- switching queue focus;
- advancing a threshold;
- surfacing a source conflict.

Respect `prefers-reduced-motion`. Version 1 has no Three.js use case.

---

## 14. Grok comparison audit

The supplied Grok mock is evidence, not source code.

Useful ideas:

- compact utility header;
- ledger/switchboard split;
- restrained dark material language;
- phone rows that collapse metadata into a readable second line;
- clear separation of next skilling and next PvM actions.

Defects:

1. Desktop mobile-metadata elements are not hidden. They become extra grid children, wrap vertically and make the 1600×900 page roughly twice the intended height.
2. The desktop fails the eight-rows-above-fold contract.
3. The entire row is one button, so completion and source-opening cannot remain separate.
4. The phone places almost the entire switchboard before the route.
5. Text is too small on desktop.
6. Fixture labels are presented too much like real tasks.
7. The route inherits the invalid Perkfection thesis.
8. The Wiki model assumes every task title is an article rather than a row in the canonical task table.

Do not copy the Grok HTML or CSS. Preserve only the information-architecture ideas that survive these defects.

---

## 15. Technical architecture

### Stack

- Vite;
- React;
- strict TypeScript;
- plain CSS or CSS Modules;
- a small, audited HTML sanitiser only if structured task-row HTML is retained;
- Vitest and Testing Library;
- Playwright;
- GitHub Pages through GitHub Actions.

Do not add Tailwind, a component library, a backend, hosted database, authentication, analytics, a state framework, an animation framework or Three.js without measured need.

### Suggested structure

```text
.github/workflows/
  test.yml
  pages.yml

.agents/skills/
  clankerscape-ui/SKILL.md
  clankerscape-route/SKILL.md
  clankerscape-review/SKILL.md

scripts/
  import-equilibrium-tasks.mts
  validate-route.mts
  audit-secrets.mts
  compare-decisions.mts

src/
  app/
  components/
  data/
  decisions/
  route/
  state/
  wiki/
  styles/
  test/

data/
  tasks.snapshot.json
  route.assumptions.json
  decisions.json
```

### Boundaries

- `route/` owns legality, banks, ranking, alternatives and cumulative progression.
- `decisions/` owns region/relic/Blessing/Tier-7 comparisons.
- `wiki/` owns fetch, capability detection, parsing, extraction, sanitisation, caching and freshness.
- `state/` owns local player state and migration.
- React renders results; it does not calculate route legality or damage.
- Combat benchmarks run through Equilibrium outside ClankerScape and import versioned results/metadata, not the engine itself.

---

## 16. Task ingestion and validation

Create a manual/build-time importer:

```text
scripts/import-equilibrium-tasks.mts
```

It must:

1. fetch the canonical task page and revision;
2. parse numeric task IDs and fields;
3. retain raw source provenance;
4. normalise regions, tiers, points, requirements and Blessing flags;
5. write deterministic JSON;
6. produce a reconciliation report;
7. fail on duplicate IDs, missing sources and unexplained total drift.

Validation:

- 1,152 tasks when full list is published;
- 109,380 nominal points;
- official regional totals;
- five Blessing tasks per region;
- no unknown region IDs;
- no production Catalyst records;
- every route task has a numeric Wiki task ID;
- every decision uses only unlocked/available content;
- route reaches all selected gates legally;
- candidate route contains at least 52,000 points of feasible/reserve corpus while the finish remains 48,000.

A source mismatch may be a real correction. Report it; do not delete or mutate records merely to force totals.

---

## 17. Security and privacy

The app needs no secret.

Reject:

- `.env*` except a deliberately empty/example file;
- API keys;
- OAuth credentials;
- Wiki credentials;
- GitHub tokens in files;
- analytics IDs;
- private repository URLs in shipped JavaScript;
- browser/auth state;
- private EverSense code/assets/fonts/screenshots/config;
- arbitrary remote HTML or unreviewed outbound domains.

Before every PR-ready state:

- scan tracked files for common credential prefixes and private-key headers;
- inspect workflows and lockfile scripts;
- inspect source maps/build output when present;
- verify runtime requests are limited to the approved Wiki/Jagex sources;
- verify imported JSON is size-capped and schema-validated;
- verify no user identifier is collected.

Local progress contains task IDs, decisions, notes and timestamps only. No analytics, cookies, account names, device fingerprint or server-controlled logs.

---

## 18. Testing and review

### Unit/domain tests

- task parsing and duplicate rejection;
- source total reconciliation;
- region legality and dependency chains;
- cumulative 50/175/300/450 task gates;
- cumulative Relic/Blessing thresholds;
- five-bank classification;
- deterministic-floor and P50/P90 ranking;
- optionality and switch-cost handling;
- Rejuvenated candidate comparison;
- Perkfection burden-of-proof gate;
- Blessing reset history and God derivation;
- source revision conflicts;
- storage migration/import rollback;
- Wiki task-row extraction by numeric ID;
- hostile/missing/duplicate/oversized Wiki responses.

### End-to-end tests

- first viewport contains real route work, not a hero;
- at least eight desktop rows above fold;
- completion does not open the Wiki wrapper;
- Wiki action does not complete the task;
- row selection, queue changes and modal focus are keyboard-usable;
- focus/scroll restore after close;
- skilling and PvM next actions remain visible on phone;
- active route starts before deep switchboard detail on phone;
- populated, loading, offline, conflict, missing, blocked, deferred, completed and reserve states;
- import/export round trip;
- CORS capability state;
- no overflow, clipping or console errors;
- reduced motion.

### Rendered review loop

1. render laptop width;
2. list the five largest defects;
3. fix them before polish;
4. render desktop width;
5. verify eight-row density;
6. render phone width;
7. inspect all relevant states;
8. inspect console/network;
9. run the ClankerScape review skill;
10. classify AI/SaaS fingerprints;
11. return `BLOCKED` for unobserved acceptance criteria.

### Review standard

Be severe about the work, not abusive toward people.

Reject a change when it:

- invents data;
- hides uncertainty;
- optimises one narrow synergy while ignoring opportunity cost;
- labels an unsupported pick “best”;
- weakens either queue without an explicit reason;
- creates a card garden;
- duplicates totals/status;
- uses decorative motion;
- exposes implementation jargon;
- copies private or third-party material;
- changes tests to bless broken behaviour;
- claims rendered verification from source inspection.

---

## 19. Implementation sequence

### Phase A — revised approval package

- replace the invalid static route thesis;
- update route/UI/review skills;
- add Grok comparison audit;
- re-run secret/provenance review;
- keep PR draft;
- request owner review only after the diff is internally consistent.

### Phase B — minimal shell

- Vite/React/TypeScript scaffold;
- route ledger and switchboard with clearly labelled fixture data;
- separate completion/source controls;
- desktop/laptop/phone layouts;
- no production route claim.

Gate: rendered UI passes structure, density and anti-slop review.

### Phase C — task importer

- source snapshot;
- parser/normaliser;
- reconciliation report;
- provenance and conflict handling.

Gate: official totals reconcile or every mismatch is documented.

### Phase D — route/decision engine

- feasibility graph;
- five banks;
- phase-aware ranking;
- region gates;
- relic decision tree;
- Blessing epochs/reset ledger;
- deterministic floor and reserve.

Gate: decisions explain decisive rows and uncertainty.

### Phase E — Wiki wrapper

- real-origin CORS spike;
- canonical task-page cache;
- task-row extraction;
- sanitisation/plain-text transform;
- related article links;
- accessible modal/sheet;
- offline and source-conflict states.

### Phase F — exact candidate route

- import full task list;
- calibrate estimates;
- generate ordered route and alternatives;
- run region/relic/Blessing/Tier-7 comparisons;
- verify 48,000 finish plus reserve corpus.

Gate: route-freeze checklist passes and owner approves the actual irreversible decisions.

### Phase G — progress/race features

- local completion/queue/defer/skip state;
- import/export;
- focused race mode;
- optional local timing calibration;
- version migration.

### Phase H — Pages

- tests/build workflow;
- Pages workflow;
- base-path verification;
- licence/attribution notice;
- final source/security/rendered review;
- owner enables GitHub Actions Pages source when required.

---

## 20. Commit and regression protocol

Use small coherent commits, not clock-driven junk.

- commit after each working vertical slice;
- during risky implementation, aim for a meaningful checkpoint roughly every 5–15 minutes;
- review the accumulated diff every 30–60 minutes or after a major boundary;
- run focused checks before commits and broader checks before PR updates;
- do not merge, deploy or enable Pages without approval.

Stop when two consecutive repair passes still contain high-confidence fabricated mechanics, source confusion or regressions.

Then:

1. leave the branch unmerged;
2. record the last known-good commit;
3. write `docs/handoff-YYYY-MM-DD.md` with failures, commands and next steps;
4. request a fresh context window.

---

## 21. Current approval questions

Review these, not the invalid old seven-item list:

1. **Decision model:** five point banks and two always-visible next actions instead of one rigid route queue.
2. **Regions:** Desert remains the 175 seed; the 300 and 450 picks are live portfolio gates rather than fixed Asgarnia/Anachronia assumptions.
3. **Tier 2:** no frozen default before task import; Animal Wrangler, Superheated and Divine Druid receive a real route comparison.
4. **Tier 5–6:** treat as a paired gate; Rejuvenated is default and selects the best missed Tier 1–5 relic. Perkfection has an 8% burden-of-proof threshold.
5. **Tier 7:** benchmark Infernal Fire, Icyenic Faith and Naragi Edict against the remaining encounter portfolio.
6. **Blessings:** use reset-triggered combat epochs rather than one permanent path.
7. **UI:** compact header, dominant ledger, separate completion/Wiki controls, two-action switchboard and mobile route-before-deep-status order.
8. **Architecture:** static Vite/React/TypeScript, local progress, no backend/analytics.
9. **Wiki:** canonical task-page row lookup by numeric task ID, related article links separately.

---

## 22. Fresh-chat resume instructions

A new GPT-5.6 Pro/Sol chat should:

1. read this file completely;
2. read `docs/design-direction.md`, `docs/grok-ui-audit.md`, `docs/skills-audit.md`, `docs/security-review.md` and `docs/planning-review.md`;
3. read the three ClankerScape skills;
4. inspect the current draft PR and branch diff;
5. verify whether the current owner has approved section 21;
6. re-check the current Jagex announcement and Wiki task data;
7. never use Catalyst task rows as Equilibrium truth;
8. never inspect or copy the blacklisted repository;
9. keep implementation inside `sonnaya2/ClankerScape`;
10. use Equilibrium only as an owner-approved data/mechanics/benchmark reference;
11. use private design skills only as review guidance;
12. do not begin a production route before source reconciliation;
13. do not restore Perkfection as default without passing its burden-of-proof gate;
14. report blockers honestly and write a handoff when regression-stop conditions trigger.

---

## 23. Definition of done

ClankerScape is ready for public use when:

- every route row is sourced and opens the correct Wiki task context;
- completion and source actions are independent;
- task facts, assumptions, decisions and player state are separate;
- the player always has a useful skilling and PvM next action where the source corpus permits;
- region/relic/Blessing recommendations expose their decisive evidence and uncertainty;
- Blessing resets are modelled as history changes;
- Rejuvenated compares every missed earlier relic;
- Perkfection cannot win through an unexamined Invention-synergy shortcut;
- the route maintains a deterministic point floor and reserve corpus;
- local state survives reload and safe import/export;
- desktop/laptop/phone routes are usable with keyboard and touch;
- source, secret, anti-slop, data-readability and accessibility reviews pass;
- tests and production build pass;
- GitHub Pages serves the static build;
- the route stops at 48,000 points.
