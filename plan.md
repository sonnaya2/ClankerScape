# ClankerScape — Dragon route implementation plan

Status: **pre-implementation approval gate**  
Branch: `planning/dragon-route-foundation`  
Target: RuneScape 3 Leagues II: Equilibrium, first practical route to **48,000 League Points**  
Site purpose: a free, unofficial route workbench. No monetisation, accounts, analytics, sales copy, or product theatre.

This file is the handoff document for a fresh GPT-5.6 Pro/Sol coding session. It records the current evidence, route thesis, design constraints, implementation order, review protocol, and unresolved decisions. Do not start application boilerplate until the user approves this package.

---

## 1. Mission

Build **ClankerScape**, a static GitHub Pages app that helps one player execute a first-to-Dragon Equilibrium route without having to stare at a giant unordered task table.

The app must answer four questions immediately:

1. What should I do next?
2. What can I switch to when this step is blocked, boring, RNG-heavy, or too difficult?
3. What region, relic, or blessing decision is approaching?
4. Why is this step in the route, and what does the current RuneScape Wiki say about it?

The route is not a claim that every player should follow the same path. It is an aggressive race plan built around fast task-count milestones first, then high points per hour, with a deliberately strong split between low-friction skilling and PvM.

---

## 2. Hard constraints

### Product

- Name the app **ClankerScape**.
- It is a route workbench, not a landing page, SaaS dashboard, content funnel, or commercial product.
- No hero section, feature grid, testimonials, pricing, waitlist, CTA strip, fake KPI cards, or marketing prose.
- The first viewport must contain executable route steps.
- No account system, server database, telemetry, advertising, donations, or monetisation hooks.
- Store local progress in the browser. Export/import may be added as a plain JSON file later.

### Visual design

- No glassmorphism.
- No blue-purple SaaS gradients, gradient text, aurora blobs, idle glows, glow-on-hover, or decorative motion.
- No rounded card garden. Use square or nearly square working surfaces, quiet borders, and restrained depth.
- No generated images.
- Do not clone the RuneScape Wiki or another RuneScape route site.
- Use real game terminology and, only where licensing/provenance is clear, existing official game icons already curated in Equilibrium or direct Jagex assets.
- Do not copy code, layout, or route content from `RS3-Dev/TheRSGuide.com`. Treat it as a hard blacklist even if a search result exposes it.
- Do not copy public user route pages. Public task facts may be sourced; another player's ordering and commentary may not.

### Allowed code and design sources

- `sonnaya2/Equilibrium`
- `sonnaya2/EverSense-Web`
- New code written specifically for ClankerScape

Do not copy code from any other repository. General library documentation may be consulted to use a dependency correctly, but implementation must be original.

### Wiki wrapper

Every executable route row must be a `WikiAwareStep`. Activating the row opens a modal/drawer that fetches current RuneScape Wiki information for that row's declared page title. No row may be added without a source target or an explicit `sourceUnavailable` reason.

### Safety and integrity

- Never commit credentials, cookies, account details, local settings, private URLs, `.env` files, auth state, or generated browser profiles.
- Do not attempt to bypass Cloudflare, solve captchas through evasion, swap IPs, or create service accounts.
- Do not expose contents of the private EverSense repository beyond project-specific rules intentionally rewritten for ClankerScape.
- Do not treat a blocked source as permission to invent data.

---

## 3. Current verified League facts

Primary official source: Jagex, **“Leagues: EQUILIBRIUM Reveals — Releasing August 10th”**, 28 July 2026, continuously updated through the reveal period.

Verified facts used by this plan:

- League launch: 10 August 2026.
- Dragon Trophy: **48,000 points**.
- Total published pool: **109,380 points across 1,152 tasks**.
- Starting regions: Misthalin and Havenhythe.
- Karamja unlocks automatically at 50 completed tasks.
- Elective regions unlock at 175, 300, and 450 completed tasks.
- Only three elective regions may be selected.
- Each region has five Blessing tasks.
- Blessing progression thresholds are 1, 3, 5, 9, 12, 16, 20, and 26 Blessing tasks.
- Relic thresholds are 10, 750, 1,750, 3,500, 6,000, 12,000, and 20,000 points.
- The Blessing passive track grants one progression reset at Tier 1, God Tier One, and God Tier Two: **three confirmed Blessing resets total**.
- Jagex describes Blessing tasks as combat-oriented, ranging from a Lumbridge goblin to Black Stone Dragon and Combat Mastery achievements.
- Invention tutorial access is automatic, but the Invention Guild and machines require Asgarnia.
- Boss respawn presets are accelerated.
- Shops use simplified effectively infinite stock.
- Area tasks whose requirements span multiple regions auto-complete when the necessary region is unlocked.

Official regional totals:

| Pool | Points | Tasks | Average points per listed task |
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

The average column is not a route score. It mixes easy through master tasks and ignores prerequisites. It is useful only as a rough signal: Desert has the largest elective task pool, while Anachronia has the highest total point density.

### Evidence not yet complete

At the time of this planning pass, the current RuneScape Wiki task page is live but blocked to this environment. The Equilibrium repository still contains a task contract and Catalyst stand-in data, not a verified current Equilibrium task corpus. Jagex says the full Easy and Medium list is available and the remaining tiers will be released immediately before launch.

Consequences:

- Do not publish a fake line-by-line route from memory.
- Do not assign a task tier or point value unless the source record carries it.
- The macro route below is a strong default, not a finished speedrun script.
- The exact row order must be regenerated after the task table is ingested and scored.

---

## 4. Route thesis

The race has two different optimisation problems.

### Before 450 tasks: maximise task count per active minute

Region unlocks are based on completed tasks, not points. Before the final elective unlock, a quick 10-point task can be more valuable than a slow 200-point task because it opens another region and a larger task bank sooner.

The route should therefore favour:

- clustered easy and medium tasks;
- passive level thresholds completed while travelling;
- production batches that complete several tasks from one material chain;
- guaranteed drops and deterministic unlocks;
- short PvM tasks that also advance Blessings, Slayer, gear, or Combat Mastery;
- tasks that satisfy prerequisites for several later rows.

### After 450 tasks: maximise reliable points per active minute

Once all regions are chosen, raw task count loses most of its strategic value. The route should shift toward:

- hard and elite tasks with low setup;
- bosses that expose several kill, drop, mastery, and equipment tasks at once;
- skilling thresholds already close to completion;
- production tasks compressed by Superheated and Production Master;
- PvM task clusters accelerated by Assassin's Insight, Perkfection, Blessings, and Infernal Fire;
- deterministic tasks before rare-drop fishing.

### Two active queues

The route must always maintain two usable next-step queues:

- **Skilling queue** — training, production, unlock, travel, and supply steps.
- **PvM queue** — Blessing tasks, Slayer, bosses, Combat Mastery, and equipment goals.

A player can switch queues without losing the route's logic. Switch when any of these are true:

- the next task is waiting on a level or item;
- expected RNG time exceeds the configured tolerance;
- a boss repeatedly fails;
- the current activity becomes mentally stale;
- a new relic, blessing, region, or gear threshold makes the other queue much faster;
- the route reaches a batching checkpoint and should consume accumulated supplies.

The UI must never pretend one “optimal” next action remains optimal after the account state changes.

---

## 5. Region route

### Default sequence

1. **Misthalin + Havenhythe** — fixed start.
2. **Karamja at 50 tasks** — automatic.
3. **Kharidian Desert at 175 tasks** — first elective.
4. **Asgarnia at 300 tasks** — second elective.
5. **Anachronia at 450 tasks** — default final elective, subject to the final-pick gate below.

### Why Desert first

- It has the largest elective task count: 73.
- It has the largest elective point total: 8,360.
- Its quest completion package removes a long prerequisite chain.
- It offers skilling, Slayer, mid-tier combat, bosses, Menaphos reputation, and production rather than a single narrow activity.
- At 175 tasks the dominant objective is still tasks per hour, so the largest mixed task bank is more useful than a region whose value is concentrated in elite PvM.

### Why Asgarnia second

- It adds 65 tasks, enough to help reach the 450-task gate.
- It unlocks the Invention Guild and machines, which makes Perkfection materially better rather than merely decorative.
- It supplies a broad boss ladder and gear path instead of forcing an immediate jump to late-game encounters.
- Its skilling and production infrastructure complements Desert and the fixed regions.
- It keeps both queues healthy: workshops and guild tasks on the skilling side, God Wars/Nex and Slayer progression on the PvM side.

### Why Anachronia is the default final pick

- At 8,210 points over 57 tasks, it has the highest listed point density of any elective region.
- The final pick occurs after the task-count race is complete, so point density and high-value task clusters matter more than raw task count.
- Its autocompleted quests remove high-level prerequisites.
- It supplies late-game skilling, Big Game Hunter, Slayer, archaeology, dinosaur farming, Raksha, Rex content, and other high-point targets.
- Infernal Fire and the late Blessing setup are intended to turn its PvM rows into point spikes rather than account walls.

### Final-pick gate

Do not make the 450-task selection from total points alone. The app must calculate three snapshots from the final published task list:

- `reachableNow`: tasks whose requirements are already met or need less than 15 minutes of setup;
- `reachableSoon`: tasks expected within the next four active hours;
- `deepPool`: remaining points after excluding time gates, extreme RNG, and goals beyond the Dragon race.

Default to Anachronia unless another region beats it on `reachableSoon` by a meaningful margin.

Fallback order:

1. **Tirannwn** if its Prifddinas/skilling and boss rows yield a larger immediately reachable point bank than Anachronia.
2. **Wilderness** if Dungeoneering, Forinthry, and combat rows are unusually efficient and the account has already built the needed combat profile.
3. Do not select a lower-total region merely for a single attractive task.

The selection screen must show the actual scored difference, not an unexplained recommendation badge.

---

## 6. Relic route

Ordinary relic selections are treated as permanent. Jagex has confirmed Blessing progression resets, not general relic respecs. **Rejuvenated allows one additional relic from an earlier tier; it is not evidence that existing relic choices can be rewritten.** If Jagex publishes a relic reset mechanic later, add it from a source rather than assuming it.

### Default relic path

| Tier | Pick | Route function | Main risk / review gate |
| --- | --- | --- | --- |
| 1 | **Golden Touch** | Passive Agility while moving/skilling; deterministic Thieving; enormous early coins; Prayer conversion; noted/tripled loot; removes two unpleasant early grinds. | Survivalist may win if the final task list contains an unusually dense Archaeology/gathering count sprint. |
| 2 | **Superheated** | Compresses Woodcutting→Firemaking, Fishing→Cooking, Mining→Smithing; double/bonus bars; rapid smithing; ceremonial sword payouts; broadest early cross-skill coverage. | Animal Wrangler wins only if Hunter/Farming/Fishing tasks dominate the 175–450 route enough to offset Smithing/Firemaking/Cooking compression. |
| 3 | **Assassin's Insight** | Slayer teleports, two assignment choices, min/max length control, free prefer/block, elite spawn/XP boosts, guaranteed Ushabti capture. Creates a repeatable PvM queue rather than pure travel convenience. | Voidwalker may save more travel if the task list is extremely scattered; score this rather than guessing. |
| 4 | **Crystal Grace** | All magic spells; powerful Runecrafting multipliers; accelerated Necromancy rituals; no glyph/light ingredients; extra Prayer XP. Builds combat and three task-heavy skills together. | Transmutation may beat it if high-tier resource creation tasks are abundant and conversion economics are favourable. |
| 5 | **Production Master** | Processes production batches at once, gives portable benefits, +6 production boosts, infinite urn support, and one-action masterwork production where applicable. Converts accumulated materials into a large task burst and gear. | Clue Connoisseur becomes competitive only if verified clue tasks offer a large guaranteed point bank; do not choose it for hypothetical rare rewards. |
| 6 | **Perkfection** | Two additional swappable gizmo slots, 10x disassembly materials, free charge, faster/larger machines, better helpful perks, all tech. Supports Invention tasks and the late PvM point sprint. | Rejuvenated is the count-sprint alternative. Benchmark an added Animal Wrangler or Nature's Network against Perkfection's combat and Invention point gain before locking. |
| 7 | **Infernal Fire** | All styles apply Death Mark; execute at 20% life; adrenaline on execute; offensive pocket stats. The speed default for a confident racer. | Icyenic Faith is the safety branch if deaths and supply loss cost more time than Infernal Fire saves. Naragi Edict is a burst/safety hybrid but has a 90-second cycle. |

### Relic decision policy

Each pick should be accompanied by:

- source text;
- current recommended pick;
- runner-up;
- task rows materially accelerated by each choice;
- projected time saved before 450 tasks;
- projected points gained per hour after 450;
- irreversible-choice warning.

No relic pick should be presented as “best” without stating the account state and race phase it is best for.

---

## 7. Blessing route and reset schedule

Blessings are the resettable combat progression. Treat them as a staged loadout, not a permanent single-path identity.

### Early default: low-gear damage plus accuracy

Public path tiers 1–3:

1. **Big Boned** — +50% maximum life points and a flat rider equal to 5% of maximum life on qualifying damage. It is unusually strong before normal weapon scaling is established and also increases survival.
2. **Abyssal Cinders** — 15% ability-damage rider on qualifying attack hits plus Inferno rolls.
3. **Avernic Rampage** — free-adrenaline windows for abilities and special attacks.

This yields **Demon's Mark** at God Tier One because two of the first three selections are Chaos. Demon's Mark removes weakness/accuracy friction from early bossing and poorly geared combat.

Keep the first reset banked. Do not spend a reset merely to change one low-value mob encounter.

### Mid-game default: preserve the early engine, add broad stats

At public Blessing Tier IV, default to **True Equilibrium**. Its value scales with distinct relic alignments. The chosen relic route is intentionally diversified, but the app must read the canonical alignment field and display the exact multiplier; never infer alignment from card position in code.

At public Blessing Tier V, default to **Unholy Critual** for critical chance and Inferno-on-crit.

At public Blessing Tier VI, there are two benchmark branches:

- **Speed branch: Perfidious** — multiplies Inferno activation and produces a Chaos God Tier Two path. Best when the crit/Inferno engine is already deleting encounters and useful equipment set effects are available for Chaotic Insight.
- **Infrastructure branch: Envenomed** — creates a Balance God Tier Two path with True Equilibrium and leads to Power Archive. Best when Perkfection, stored gizmos, poison, and repeatable bossing are online.

The Equilibrium combat engine should compare both against representative targets before the implementation calls either one final.

### Gear-poor emergency respec: Order engine

Use a banked reset when the route reaches hard PvM but lacks weapons, armour, or reliable kill speed:

- Teragard's Aegis
- Striking Light
- Steadfast Will
- Sacred Fervor
- Higher Power
- Lord of Light
- Tempered Heart
- Genesis Essence

This sacrifices the normal style ultimates through Higher Power but gives a self-contained basic/Light engine, steady adrenaline, reduced cooldowns, and tier-120 weapon treatment. It is a route recovery tool, not the automatic default.

### Perk/poison respec: Balance engine

Use when Invention and poison infrastructure are genuinely ready:

- Big Boned
- Barkscales or another second Balance choice required for Splash Zone
- the best tier-three choice for the target set
- Splash Zone
- True Equilibrium
- Tearing Thorns
- Envenomed
- Power Archive

This is strongest when multi-target/large-tile bosses, damage-over-time effects, poison, and doubled stored perks all contribute. It should not be recommended against poison-immune or short-lived targets without a sourced model.

### Reset accounting

The UI must show three reset tokens and a ledger of when each was spent.

Recommended policy:

1. Bank the Tier 1 reset.
2. Spend the God Tier One reset only if the current path is blocking the 20,000-point/Tier-7 climb.
3. At God Tier Two, run the final engine comparison and spend the newly granted reset only when another loadout wins by a meaningful margin.

A reset warning must show which current choices and derived God blessings will be replaced.

---

## 8. Macro route phases

These phases define the page structure. They are not substitutes for the final sourced task rows.

### Phase A — Start to 50 tasks: open Karamja

Objective: deterministic task count, first relics, first Blessing, cash, transport, and basic combat.

- Complete tutorial/menu/first-action rows immediately.
- Use Golden Touch movement XP from the first minute; avoid dedicated Agility unless a task threshold is one short session away.
- Batch low-level gathering and production only when one inventory chain completes several tasks.
- Take the first trivial combat/Blessing rows early so Big Boned comes online.
- Establish Necromancy or the selected primary style without over-gearing.
- Keep one skilling row and one PvM row ready at all times.
- Stop the instant 50 tasks completes; unlock Karamja before cleaning up leftovers.

### Phase B — 50 to 175 tasks: build the account engine

Objective: expand the cheap task bank, reach early relic thresholds, and prepare Desert entry.

- Sweep Karamja travel, skilling, Fight Kiln/TzHaar-adjacent, and quest-unlocked rows by locality.
- Use Superheated to cross-complete Fishing/Cooking and Mining/Smithing tasks.
- Route Slayer and short boss rows through Assassin's Insight as soon as Tier 3 is reached.
- Train skills through task thresholds, not arbitrary round numbers.
- Delay long rare-drop rows unless they unlock several follow-ups.
- Enter Desert at 175 tasks immediately.

### Phase C — 175 to 300 tasks: Desert count flood

Objective: exploit the largest elective task bank while raising combat and production together.

- Run a locality sweep through unlocked Desert/Menaphos content.
- Prioritise rows made free by autocompleted quests.
- Interleave reputation, skilling, Slayer, and boss rows to avoid waiting on one track.
- Reach Crystal Grace and use its ritual/Runecrafting/Prayer compression.
- Build supplies and gear for Asgarnia rather than grinding a perfect Desert setup.
- Unlock Asgarnia at 300 tasks immediately.

### Phase D — 300 to 450 tasks: Asgarnia infrastructure and mixed sprint

Objective: finish the count race while establishing the PvM setup that will convert the final region into points.

- Open Invention Guild/machines and begin deterministic perk/material production.
- Sweep Asgarnia's low-setup tasks before deep boss farming.
- Use God Wars/Nex/Slayer as the PvM queue and production/Invention/global thresholds as the skilling queue.
- At 6,000 points use Production Master to turn stored materials into a task burst and gear.
- At 12,000 points benchmark Perkfection versus Rejuvenated before choosing.
- Prepare the final-region comparison before task 450; do not stop at the unlock screen to research from scratch.

### Phase E — 450 tasks to 20,000 points: point conversion

Objective: choose the best immediately reachable final-region bank and unlock Tier 7.

- Default to Anachronia after the final-pick gate.
- Take deterministic hard/elite rows before rare-drop grinds.
- Alternate Anachronia skilling/BGH/archaeology rows with Asgarnia/Desert PvM clusters.
- Complete enough Blessing tasks to unlock the mid/final combat engine.
- Avoid cleaning every easy task merely because it is visible; the objective is now points per hour.

### Phase F — 20,000 to 48,000 points: Dragon finish

Objective: use Infernal Fire and the final Blessing build to harvest high-value clusters.

- Execute boss clusters that award kills, mastery, drops, equipment, and global tasks together.
- Use the skilling queue for near-complete hard/elite thresholds and Production Master bursts when PvM stalls.
- Maintain a “guaranteed next 2,000 points” list so a bad drop streak never halts progress.
- Do not chase completionism, cosmetics, or a 200m task unless the projected points per hour beats the remaining deterministic bank.
- Stop at 48,000. The site is a Dragon route, not a max-points route.

---

## 9. Task ingestion and scoring

### Source hierarchy

1. Current Jagex League announcement/rules.
2. Current RuneScape Wiki Equilibrium task and mechanic pages.
3. Equilibrium repository canonical data with provenance.
4. PvME or RS Analysis only when the Wiki is incomplete, and only for mechanics—not copied routes.

Never use Reddit, YouTube comments, Facebook, Twitter/X, another route author's ordering, or the blacklisted repository.

### Task record

Each task should carry at least:

```ts
interface RouteTask {
  id: string;
  name: string;
  description: string;
  tier: "easy" | "medium" | "hard" | "elite" | "master";
  points: number;
  region: RegionId | "global";
  locality?: string;
  category: "skilling" | "pvm" | "unlock" | "travel" | "production" | "mixed";
  skills: string[];
  requirements: Requirement[];
  unlocks: string[];
  wikiTitle: string;
  wikiSection?: string;
  sourceUrl: string;
  sourceVerifiedAt: string;
  confidence: "verified" | "provisional" | "blocked";
  estimate: {
    setupMinutes: number;
    activeMinutes: number;
    rngMinutesP50?: number;
    rngMinutesP90?: number;
    timeGated: boolean;
  };
  synergy: {
    relics: string[];
    blessings: string[];
    regions: string[];
    followUps: string[];
  };
}
```

Estimates are route assumptions and must be stored separately from sourced facts.

### Phase-aware score

Before 450 tasks:

```text
score = tasksPerMinute
      + unlockPressure
      + prerequisiteOverlap
      + localityBatching
      + passiveTrainingValue
      + blessingProgressValue
      - setupCost
      - rngPenalty
      - timeGatePenalty
```

After 450 tasks:

```text
score = pointsPerMinute
      + clusterBonus
      + gearProgressValue
      + blessingProgressValue
      + nearCompletionBonus
      - setupCost
      - rngPenalty
      - failureRisk
```

Do not collapse the score to one unexplained number in the UI. Show the decisive reasons in plain language.

### Human override

The player may mark a task:

- do now;
- queued;
- blocked;
- skip for Dragon;
- completed;
- reconsider after unlock.

The route recalculates around those states. It must not reorder completed history.

---

## 10. Wiki information wrapper

GitHub Pages has no server, so the wrapper must use the public MediaWiki API from the browser.

Recommended request:

- `action=query`
- `prop=extracts|info`
- `inprop=url`
- `explaintext=1`
- `redirects=1`
- `origin=*`
- explicit `titles=<declared wikiTitle>`

Rules:

- Fetch only after the user opens a row. Do not prefetch hundreds of pages.
- Deduplicate in-flight requests.
- Cache successful extracts in session storage with a timestamp.
- Render plain text, not unsanitised Wiki HTML.
- Show the resolved page title, fetch time, source state, and a link to the full article.
- Keep the route's own note visibly separate from live Wiki text.
- On failure, show the exact failure and the direct source link; never substitute invented copy.
- Respect redirects and page-missing responses.
- Add an accessible modal title, focus trap, Escape handling, close button, and focus restoration.
- On phone widths, use a full-height sheet without decorative animation.

Every route row must provide a valid `wikiTitle` or an explicit source exception that fails validation in development.

---

## 11. Website design direction

### Product class

**Dense game-route workbench.** It should look like a serious player-built tool that happens to have RuneScape character, not a fantasy landing page or an analytics dashboard.

### Desktop composition

Target a 1500–1650 px working frame.

1. **Compact top bar**
   - ClankerScape wordmark as a small utility label, not a billboard.
   - Current points / 48,000.
   - Completed tasks / next region threshold.
   - Current phase.
   - Import/export and source status as quiet actions.

2. **Route ledger (primary surface, roughly 70%)**
   - Phase dividers tied to 50/175/300/450 task milestones and 20k/48k points.
   - Dense rows with step, action, area, queue, expected gain, cumulative state, and blockers.
   - The task/action title is the strongest element.
   - Numerical columns use tabular numerals.
   - Completed rows collapse but remain inspectable.
   - Activating any row opens the live Wiki wrapper.

3. **Switchboard rail (roughly 30%)**
   - “Skilling next” and “PvM next” as two working queues, not decorative cards.
   - Current region set and next irreversible decision.
   - Relic path, Blessing path, and remaining resets.
   - Bottlenecks and stored resources.
   - Final-region comparison at task 450.

4. **No dashboard tile strip**
   - Progress belongs in the header and ledger, not five oversized KPI cards.

### Mobile composition

- One route column.
- Sticky compact progress header.
- Queue switcher directly above the active step.
- Side rail content becomes ordered sections below the next steps.
- Wiki modal becomes a full-height sheet.
- No horizontally squeezed desktop table; each row becomes a compact ledger entry with stable labels.

### Visual language

- Warm near-black and charcoal stone surfaces.
- Cream primary text.
- Restrained gold for phase structure and major thresholds.
- Teal/emerald for active/focus/progress state.
- Red only for real blockers or destructive reset consequences.
- Square or 2–4 px corners.
- Thin borders and small shadow only where layer separation needs it.
- System sans for reading; a restrained display face may be used only for the name/major phase labels.
- No gradient text, glass blur, giant background art, particle fields, glowing borders, or hover scaling.
- Motion only for useful state change: row completion, queue change, and modal entry. Respect reduced motion.

### Copy

Use direct player language:

- “Do next”
- “Switch to PvM”
- “Blocked by 80 Smithing”
- “Unlock Desert now”
- “Hold final region pick”
- “3 Blessing resets left”

Avoid “optimise your journey,” “unlock your potential,” “seamless,” “powerful platform,” and other generic product copy.

---

## 12. Technical architecture

### Stack

Use a small static client application:

- Vite
- React
- TypeScript
- plain CSS or CSS modules with tokens
- Vitest for domain/unit tests
- Playwright for a small set of route interactions and responsive checks
- GitHub Actions deployment to GitHub Pages

Do not add a component library, state framework, animation framework, backend, hosted database, or Three.js. This screen does not need them.

### Suggested structure

```text
src/
  app/
    App.tsx
    routes.ts
  components/
    RouteLedger.tsx
    RouteRow.tsx
    QueueSwitchboard.tsx
    ProgressHeader.tsx
    WikiModal.tsx
    DecisionGate.tsx
  domain/
    route.ts
    scoring.ts
    progress.ts
    decisions.ts
    wiki.ts
  data/
    verified/
    assumptions/
    route/
  styles/
    tokens.css
    app.css
  test/
public/
  icons/          # only curated, attributable game assets
scripts/
  validate-route-data.ts
  audit-secrets.mjs
  audit-sources.mjs
.github/workflows/
  test.yml
  pages.yml
```

Keep source facts, route assumptions, and user progress separate. A scoring estimate must never overwrite a sourced task field.

### State

- Browser-local progress only.
- Versioned localStorage schema.
- Safe normalisation of imported data.
- Route definition immutable at runtime.
- Completion history remains stable when the recommended future order changes.
- Share/export data contains no personal information.

---

## 13. Implementation sequence

### Approval phase — current branch

1. Commit this plan.
2. Commit design direction and anti-slop audit rules.
3. Commit skill provenance and project-specific composite skills.
4. Commit security/source audit.
5. Commit Grok Heavy comparison prompt.
6. Open a draft PR.
7. Review the diff and report defects before asking for approval.

No app boilerplate in this phase.

### Phase 1 — data foundation

1. Add the static app scaffold and Pages workflow.
2. Build task/source schemas and validators.
3. Ingest the current Wiki task table without copying guide ordering.
4. Add official region/relic/blessing facts with provenance.
5. Add a separate route-assumption file.
6. Validate counts against official totals and fail on drift.

### Phase 2 — route engine

1. Implement progress state and phase-aware scoring.
2. Implement skilling/PvM queues.
3. Implement region and relic decision gates.
4. Implement Blessing reset ledger.
5. Generate the first sourced route ordering.
6. Compare critical Blessing branches using the Equilibrium combat engine outside the UI, then import only the conclusions and benchmark metadata.

### Phase 3 — working UI

1. Build the route ledger and compact header.
2. Build the switchboard rail.
3. Build Wiki modal and failure states.
4. Add completion/block/skip interactions.
5. Add phone layout.
6. Use curated icons only after provenance review.

### Phase 4 — rendered QA

1. Render at desktop width.
2. Identify and fix the five largest visual or usability defects.
3. Render again.
4. Verify phone width, keyboard navigation, reduced motion, modal focus, loading, empty, and error states.
5. Run the bot/slop audit and data-readability audit.
6. Run tests and production build.

### Phase 5 — Pages

1. Merge only after approval and green checks.
2. Enable GitHub Pages from the workflow if the connector/account settings allow it.
3. If Pages cannot be enabled programmatically, ask the user to enable GitHub Actions as the Pages source; do not pretend it is live.

---

## 14. Review and commit protocol

Use small, reviewable commits. Time is not a substitute for meaningful boundaries; commit when a coherent unit is complete.

Suggested commit boundaries:

- plan and evidence;
- design contract;
- source/skill/security contract;
- app scaffold;
- task schema/ingestion;
- route engine;
- Wiki wrapper;
- ledger UI;
- responsive/accessible polish;
- final audit fixes.

After each substantial unit:

- inspect the full diff;
- run relevant validation/tests;
- check that no generated or unrelated files entered the commit;
- check source claims against provenance;
- check that UI copy is direct and not marketing language;
- check for secret patterns.

Every 30–60 minutes of implementation, perform a broader read-only review of the branch. If repeated regressions or fabricated claims appear, stop implementation and update this handoff with the exact known-good commit, failures, and next steps for a fresh context window.

Be harsh about defects, but report them technically. Abuse is not a review method.

---

## 15. Security and provenance gates

Before every PR update:

- reject `.env*`, auth state, cookies, browser profiles, private keys, tokens, passwords, and local settings;
- scan for `AKIA`, `ghp_`, `github_pat_`, `Bearer `, `BEGIN PRIVATE KEY`, `client_secret`, `password=`, and obvious token assignments;
- inspect outbound domains;
- allow runtime content requests only to the RuneScape Wiki API and explicit source links;
- do not include private repository URLs, account email addresses, or connector metadata;
- maintain an allowed-source register;
- retain source title, URL, and verification date for factual records;
- mark assumptions as assumptions.

The current base repository contains only a CC0 license and a short README. No shared secret was found in that base state.

---

## 16. Known risks

1. **Task page unavailable to the current environment.** The route cannot be final until the task table is ingested.
2. **Hard/Elite release timing.** The best final region and several relic sensitivity checks can change when the full list lands.
3. **Relic permanence confusion.** Only Blessing resets are currently confirmed. Do not present relic respec as a feature.
4. **True Equilibrium alignment count.** Read canonical alignment data; do not infer it from visual row placement.
5. **Live Wiki API availability/CORS.** Test from the deployed Pages origin and provide a clear fallback.
6. **Route estimates becoming fake precision.** Keep sourced facts and estimates separate and show confidence/ranges.
7. **Overbuilding.** The useful product is one excellent route screen and one reliable modal, not seven shallow routes.
8. **Visual overcorrection.** Avoid both SaaS slop and a sterile gray spreadsheet. RuneScape character should come from real terminology, restrained game assets, and task structure.
9. **Unbounded data loading.** Fetch Wiki information on demand and paginate/filter the route ledger where needed.
10. **Tunnel vision.** Compare the approved design against the independent Grok Heavy concept without copying its code or accepting its decisions blindly.

---

## 17. Approval questions

The user should approve or change these before implementation:

1. Region default: **Desert → Asgarnia → Anachronia**, with Tirannwn/Wilderness final-pick fallbacks.
2. Relics: **Golden Touch → Superheated → Assassin's Insight → Crystal Grace → Production Master → Perkfection → Infernal Fire**.
3. Early Blessings: **Big Boned → Abyssal Cinders → Avernic Rampage → Demon's Mark**.
4. Late Blessing benchmark: crit/Inferno/Chaotic Insight versus Envenomed/Power Archive, with an Order emergency respec.
5. Single-screen route workbench layout rather than a multi-route marketing shell.
6. Vite/React static GitHub Pages architecture.
7. Plain-text live Wiki extracts in a modal rather than embedding Wiki HTML or an iframe.

---

## 18. Exact next actions for a fresh GPT-5.6 Pro/Sol chat

1. Read this file, `docs/design-direction.md`, `docs/skills-audit.md`, `docs/security-review.md`, and the open PR diff.
2. Re-check the current Jagex announcement and RuneScape Wiki task page for changes.
3. Do not use Catalyst task rows as Equilibrium truth.
4. Do not inspect or copy the blacklisted repository.
5. Ask for approval only if the decisions in section 17 have not been answered.
6. After approval, scaffold the smallest static app on the existing planning branch or a new implementation branch.
7. Commit the scaffold before ingesting the task corpus.
8. Build validators before route ordering.
9. Implement the live Wiki wrapper before styling hundreds of rows.
10. Render and review the actual UI; do not judge it from JSX alone.

---

## 19. Definition of done

ClankerScape is ready for public use when:

- every visible task row is sourced and opens a working live Wiki wrapper;
- current points, task count, unlock thresholds, regions, relics, Blessings, and reset state are visible without opening a settings page;
- the player can switch between a skilling and PvM next-step queue;
- the final-region gate explains its recommendation with current reachable tasks/points;
- no task tier, points value, requirement, or mechanic is fabricated;
- local progress survives reload and can be exported/imported safely;
- desktop and phone layouts are usable by keyboard and touch;
- the UI passes the project bot/slop, readability, accessibility, source, and secret audits;
- tests and production build pass;
- GitHub Pages serves the static build;
- the route stops optimising at 48,000 points rather than drifting into max-points completionism.
