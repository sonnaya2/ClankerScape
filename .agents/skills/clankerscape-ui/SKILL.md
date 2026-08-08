---
name: clankerscape-ui
description: Design and review ClankerScape as a dense human-made RuneScape League route workbench, not a SaaS landing page or generic fantasy dashboard.
---

# ClankerScape UI

Use this skill for any ClankerScape page, component, style, interaction, or visual review.

## Product test

Before writing code, state the page's player job in one sentence. If the page is not helping the player execute, inspect, or revise the Dragon route, remove it.

ClankerScape is a game-route workbench. The first viewport must perform the job.

## Required composition

The primary screen contains:

- a compact progress header;
- a route ledger as the dominant surface;
- separate next-step queues for skilling and PvM;
- current region/relic/Blessing state;
- the next irreversible decision;
- a source-aware Wiki modal opened by every route row.

Prefer one coherent working surface over repeated cards and nested panels.

## Visual language

- Warm near-black and stone surfaces.
- Cream text.
- Restrained gold for phase/threshold structure.
- Teal or emerald for active progress and focus.
- Red only for real blockers or reset consequences.
- Square or nearly square corners.
- Thin quiet borders.
- Minimal shadow for genuine layer separation.
- Tabular numerals for points, tasks, and time.

The route must remain usable with no images loaded.

## Reject immediately

- hero sections;
- product slogans;
- feature or KPI card strips;
- pricing, testimonials, waitlists, or CTA theatre;
- glassmorphism;
- blue-purple SaaS gradients;
- gradient text;
- aurora blobs;
- idle glow or pulsing buttons;
- oversized logos or decorative fantasy scenes;
- giant empty header space;
- rounded card gardens;
- panels nested inside panels without a real hierarchy need;
- a different icon, badge, and border treatment for every field;
- generic “AI recommendation” prose;
- copied RuneScape Wiki or third-party route layouts;
- generated images.

## Route rows

Each route row is one semantic interactive control.

Show the action first, then locality, queue/category, gain, time, and blocker. Do not hide decision-critical information behind hover. A blocked row names its blocker. A skipped row says why it is skipped for Dragon.

Every row opens the live Wiki wrapper. Keep route commentary visibly separate from source text.

## Copy

Use direct player language:

- Do next
- Switch to PvM
- Blocked by 80 Smithing
- Unlock Desert now
- Hold final region pick
- Skip for Dragon
- 2 Blessing resets left

Delete vague product phrases such as “optimise your journey,” “seamless experience,” “powerful insights,” or “ultimate companion.” Replace them with the actual action or reason.

## Motion

Motion is allowed only when it explains state: completing a row, switching queues, advancing progress, opening the modal, or surfacing a decision warning. Respect reduced motion. Do not add ambient animation or Three.js without a demonstrated player benefit.

## Responsive behaviour

Desktop is a route ledger plus switchboard. Mobile is a single route column with a compact queue switcher and full-height Wiki sheet. Do not squeeze a desktop table or hide core route controls in a hamburger.

## Review loop

1. Render the route at desktop width.
2. Name the five largest usability or hierarchy failures.
3. Fix those failures before fine polish.
4. Render again.
5. Verify phone width, keyboard focus, reduced motion, modal focus restoration, loading, empty, and error states.
6. Run the ClankerScape review skill.

Judge the rendered page, not the intent expressed in component names.
