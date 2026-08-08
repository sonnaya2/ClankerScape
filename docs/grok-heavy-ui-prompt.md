# Grok Heavy comparison prompt

Use this only for a fresh independent UI comparison. The output is not implementation authority. Do not provide ClankerScape code, private repositories, credentials, private screenshots, another site's UI, or the previous Grok result.

---

You are designing one high-fidelity working screen for **ClankerScape**, an unofficial RuneScape 3 Leagues II: Equilibrium first-to-Dragon route workbench.

The app is free and has no monetisation goal. It helps a competitive player reach 48,000 League Points while preserving both a skilling point bank and a PvM point bank. Design the working route screen itself—not a hero, pitch, onboarding page, dashboard preamble, or content portal.

Produce an original static implementation in one self-contained HTML/CSS/JavaScript file, or a minimal React component when your environment renders that more reliably. Do not copy code, layout, route order, commentary, or visual treatment from the RuneScape Wiki, another RS3 tool, a public route, or another website. Do not use external images, generated images, stock art, scraped assets, or third-party component libraries. CSS geometry and clearly labelled fixture data are enough.

## Product model

ClankerScape does not have one rigid recommendation queue. It maintains:

- immediate skilling tasks;
- deeper skilling preparation;
- immediate PvM tasks;
- deeper PvM/boss preparation;
- reserve RNG/time-gated tasks.

The player always sees one executable `Skilling next` action and one executable `PvM next` action when the fixture state permits. The interface also exposes the trigger for switching between them.

Region, relic and Blessing decisions are gates with evidence and uncertainty, not recommendation badges.

## Required first viewport

At 1600×900, without scrolling, show:

- ClankerScape as a compact utility label;
- current points out of 48,000;
- completed tasks and next 50/175/300/450 region threshold;
- active route phase;
- task-source revision/status;
- at least eight usable route rows;
- separate `Skilling next` and `PvM next` actions;
- guaranteed-next-points and reserve coverage;
- current regions and approaching region gate;
- current relics and the approaching relic decision;
- current Blessing epoch and reset count;
- a task title/Wiki action that opens a source wrapper;
- a separate completion control that does not open the wrapper.

## Fixture state

Use clearly labelled sample data. Do not present fixture tasks, points or estimates as real Equilibrium route facts.

The sample decision state should demonstrate uncertainty rather than freeze a route:

- fixed regions: Misthalin, Havenhythe, Karamja;
- first elective: Desert selected as a provisional seed;
- second elective gate: Asgarnia versus Morytania is close;
- final elective: unresolved;
- Tier 6 working leader: Rejuvenated;
- Rejuvenated candidate extra relic: Devout versus Production Master comparison;
- Perkfection status: does not currently pass the burden-of-proof gate;
- early Blessing epoch: Big Boned → Abyssal Cinders → Avernic Rampage → Demon's Mark;
- resets remaining: 2;
- one visible source conflict/provisional estimate;
- a mixed guaranteed point bank using both skilling and PvM rows.

Do not imply that Perkfection, Asgarnia, Anachronia, Infernal Fire, or any other irreversible choice is final.

## Route-row interaction

A route row is not one giant button.

It has distinct semantic controls:

- completion checkbox/button: changes completion only;
- task title/Wiki action: opens source context only;
- row body: may select details;
- queue/defer action when needed.

Show visible action, locality, queue/category, gain, expected time, blocker/status and source state. Blocked rows name the blocker. Unknown time uses an unavailable mark, not zero. Meaningful information is not hover-only.

## Source wrapper

The source wrapper should be designed around a canonical League task row identified by numeric task ID, not the assumption that every task title is a standalone Wiki article.

Show:

- route action;
- canonical task page and task ID;
- route reason;
- requirements/blockers;
- current task-row content placeholder;
- related boss/item/mechanic article actions;
- source revision/freshness;
- direct Wiki action;
- loading, offline/CORS, missing-row and stale-revision states.

Route commentary and Wiki content must have different labels/surfaces. No iframe or wholesale Wiki embed.

The wrapper is keyboard-operable, traps focus while open, closes with Escape, and restores focus/scroll.

## Mobile

Provide a credible phone adaptation with this order:

1. compact two-line progress/source header;
2. `Skilling next` / `PvM next` switcher;
3. active route rows immediately;
4. approaching irreversible decision;
5. deeper region/relic/Blessing information;
6. completed/deferred/reserve groups.

Do not place the full status rail before the route. Do not hide queue switching or the next decision in a hamburger. Use a dedicated mobile row layout rather than squeezing the desktop grid.

Mobile-only metadata must be hidden at desktop widths and must not become extra desktop grid children.

## Visual direction

- dense player-built game utility;
- warm near-black/charcoal stone surfaces;
- cream text;
- restrained gold for thresholds and permanent decisions;
- restrained teal/emerald for active/focus/progress;
- red/orange only for real blockers, source conflicts or destructive reset consequences;
- square or 2–4 px corners;
- thin borders and restrained depth;
- readable type rather than tiny text used to force density;
- tabular numerals for points, tasks and time;
- route remains usable with no images.

## Hard rejections

- no hero, slogan or marketing paragraph;
- no pricing, CTA, testimonials, feature grid or KPI-card strip;
- no glassmorphism or backdrop blur;
- no blue-purple SaaS palette;
- no gradient text or aurora/blob background;
- no glowing borders, pulsing controls, hover scaling or ambient particles;
- no oversized rounded card garden;
- no giant logo or decorative empty header;
- no AI recommendation panel or AI-marketing language;
- no hamburger hiding route controls;
- no iframe/wholesale Wiki embed;
- no copied RuneScape interface chrome;
- no generated imagery;
- no Three.js background.

Motion is limited to useful state changes and respects reduced motion.

Aim for a credible player tool rather than generic premium polish or a sterile black spreadsheet.

## Required self-audit

After producing the implementation:

1. render desktop and phone;
2. confirm at least eight usable desktop rows above fold;
3. confirm mobile metadata is hidden on desktop;
4. confirm completion and Wiki actions are independent;
5. list the five largest remaining usability, hierarchy or AI-generated design defects;
6. do not praise the work;
7. explain the required correction for each defect.

---

## Comparison rules for ClankerScape

When reviewing the result:

- use it only to expose tunnel vision or a better information arrangement;
- do not copy its code;
- do not copy polished motifs without a measured reason;
- reject any hard-rejection pattern;
- compare route scan speed, above-fold density, queue clarity, decision visibility, source-wrapper clarity, phone ordering, readability and visual restraint;
- retain ClankerScape's source, route, security and data contracts;
- discard every fixture route recommendation.
