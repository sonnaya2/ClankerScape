# ClankerScape design direction

Status: revised approval draft. This is the visual and interaction contract before production components exist.

The supplied Grok comparison was rendered and audited. Its ledger/switchboard idea is useful; its code, fixture strategy and route assumptions are not implementation input. See `docs/grok-ui-audit.md`.

## Product class

ClankerScape is a **dense game-route workbench / field ledger**.

It is not:

- a landing page;
- a SaaS dashboard;
- a generic fantasy interface;
- a RuneScape Wiki skin;
- an app-store product page;
- a decorative card collection;
- a single inflexible checklist.

The page should look like a careful player-built route sheet: fast to scan, dense without being cramped, and visibly organised around race decisions.

## First-view contract

At 1600 × 900, before scrolling, show:

- current League Points / 48,000;
- completed tasks and next 50/175/300/450 threshold;
- active route phase;
- at least eight usable route rows;
- `Skilling next`;
- `PvM next`;
- guaranteed-next-points/reserve state;
- current regions;
- approaching irreversible decision;
- current relics and candidate Rejuvenated pick;
- Blessing epoch and resets remaining;
- task-source revision/status.

A slogan, oversized logo, illustration, empty atmospheric header, KPI strip or explanatory paragraph before the route is a design failure.

## Desktop composition

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ CLANKERSCAPE · 12,480 / 48,000 · 327 tasks · next 450 · source rev #### · import/export      │
├──────────────────────────────────────────────────────────────┬───────────────────────────────┤
│ ROUTE LEDGER                                                 │ SWITCHBOARD                   │
│                                                              │                               │
│ Phase E · 327 → 450                         reserve 4,000     │ SKILLING NEXT                 │
│ #   ✓   action                       area   gain   time state │ exact executable action       │
│ 327 [ ] [task title / Wiki]          Desert +30    3m  ready │ switch trigger                │
│ 328 [ ] [task title / Wiki]          Global +80    7m  ready │                               │
│ 329 [ ] [task title / Wiki]          Asg.   +10    —   verify│ PVM NEXT                      │
│ 330 [ ] [task title / Wiki]          ...                         exact executable action       │
│ ... at least eight usable rows above fold                     │ switch trigger                │
│                                                              │                               │
│ Completed · Deferred · Blocked · Reserve                     │ DECISION AHEAD                │
│                                                              │ T6 Rejuvenated                │
│                                                              │ candidate: Devout             │
│                                                              │ compare all missed T1–T5      │
└──────────────────────────────────────────────────────────────┴───────────────────────────────┘
```

This is structural, not a pixel template.

### Compact header

Show once:

- ClankerScape;
- points;
- task count and next region gate;
- phase;
- route/source revision;
- import/export;
- source conflict only when one exists.

Do not repeat the same totals in cards or the switchboard.

### Route ledger

The ledger owns most of the width and visual emphasis.

Rows are structured data, not rounded cards. Use stable columns and tabular numerals. Keep the task title strongest.

Show:

1. sequence;
2. completion control;
3. action title / Wiki action;
4. locality and region;
5. queue/category;
6. task/point gain;
7. expected time or `—`;
8. blocker/status;
9. source freshness.

Collapsed rows show one short route reason only when it changes the decision. Expanded detail may show requirements, carry items, retained items, alternatives, switch trigger, P50/P90 and source assumptions.

### Separate controls

A route row is **not one giant button**.

- completion checkbox/button: changes local completion state only;
- title/Wiki action: opens source wrapper only;
- row body: selects context for the inspector/rail;
- queue/defer action: changes route state only.

These controls require distinct accessible names and visible focus.

### Switchboard

The rail exists to preserve optionality, not fill empty space.

It contains:

- skilling next;
- PvM next;
- switch trigger;
- guaranteed-next-points coverage;
- current bottlenecks;
- approaching region/relic/Blessing decision;
- candidate Rejuvenated relic;
- current Blessing epoch/reset count;
- reserve warnings.

It does not contain:

- generic statistics;
- recent activity;
- streaks;
- charts;
- social widgets;
- achievements;
- repeated progress totals;
- “AI insights.”

Start with one rail surface. Add an inner boundary only when it groups a real interaction or destructive decision.

## Portfolio visibility

The route system has five banks:

- immediate skilling;
- deep skilling;
- immediate PvM;
- deep PvM;
- reserve.

Do not render five equal dashboard cards. The active ledger shows the current working window. A compact bank selector/filter and the switchboard communicate the portfolio.

After 450 tasks, show:

- guaranteed next point total;
- contribution from skilling;
- contribution from PvM;
- reserve corpus;
- any bank with insufficient coverage.

## Decision treatment

Region, relic, Blessing-reset and Tier-7 choices are not recommendation badges.

A decision view shows:

- candidates;
- current leader;
- confidence;
- decisive task clusters;
- P50/P90 difference;
- queue impact;
- invalidation conditions;
- permanent/reset consequence;
- direct source links.

When two projections overlap inside uncertainty, write `close` and explain why. Do not fabricate a clean winner.

### Perkfection treatment

Perkfection is not displayed as the Tier 6 default.

The default decision row is:

```text
Tier 6 · Rejuvenated
Candidate extra relic: <current leader>
Perkfection: fails / passes burden of proof
```

Perkfection can lead only when the route engine shows it beating the best missed Tier 1–5 relic by the plan's required margin.

## Wiki source wrapper

Every actionable task title opens current source context.

### Header

- route action title;
- canonical League task page;
- task ID;
- fetched revision/time;
- close control.

### Body order

1. route reason;
2. requirements/blockers;
3. current canonical task-row content;
4. related boss/item/mechanic links;
5. assumptions/confidence;
6. source freshness/conflict;
7. direct Wiki action.

Route commentary and Wiki content use different labels and surfaces. Never style model-authored text as a Wiki quote.

### Interaction

- completion control does not open the wrapper;
- title/Wiki action opens it;
- Escape and close button close it;
- focus is trapped and then restored to the originating action;
- route scroll is preserved;
- no iframe;
- no unsanitised HTML;
- no fetch for every row at startup;
- loading, CORS, offline, timeout, missing-row, duplicate-row, oversized-response, stale-revision and conflict states exist.

A short 120–160 ms position/opacity transition is acceptable when motion is enabled. No spring, blur, glow or scale reveal.

## Mobile composition

The Grok mock showed that compressed second-line metadata can work. It also placed too much status before the route.

Phone order:

1. compact two-line header;
2. two-column or segmented `Skilling next` / `PvM next` switcher;
3. active route rows immediately;
4. approaching destructive/permanent decision;
5. deeper region/relic/Blessing detail;
6. completed/deferred/reserve groups.

Do not place the complete switchboard above the route. Do not hide the two queues or next decision in a hamburger.

Mobile rows become labelled ledger entries, not a horizontally scrolling table. Keep touch targets usable without turning each entry into a giant card.

The Wiki wrapper becomes a full-height sheet with a persistent close control.

## Responsive implementation rule

Desktop and mobile metadata must not coexist as unhidden grid children.

- hide mobile-only metadata by default;
- reveal it only in the mobile layout;
- keep desktop grid child count aligned with defined columns;
- verify row height and above-fold density from rendered screenshots;
- do not trust intended CSS names.

This directly prevents the Grok desktop failure where mobile metadata wrapped beneath every row and doubled the page height.

## Visual language

Directional tokens:

```css
:root {
  --bg: #11110f;
  --surface-1: #171714;
  --surface-2: #1d1c18;
  --surface-3: #24221d;
  --border: #39352d;
  --border-strong: #625844;
  --text: #eee7d8;
  --text-muted: #aaa294;
  --gold: #c8a964;
  --teal: #4aa58f;
  --danger: #b85f55;
  --radius: 3px;
}
```

Do not cargo-cult exact values. Check rendered contrast.

- warm near-black and charcoal stone surfaces;
- cream primary text;
- warm-grey metadata;
- restrained gold for thresholds/permanent choices;
- teal/emerald for active/focus/progress;
- red/orange only for real blockers, conflicts or destructive resets;
- square or 2–4 px corners;
- thin quiet borders;
- small shadow only for a genuinely raised layer;
- no glow shadow.

## Typography

- high-legibility system sans for route data;
- tabular numerals for points, tasks and time;
- restrained display face only for the name or major phase labels when separately approved/licensed;
- no private EverSense font;
- no monospace body text to simulate seriousness;
- no all-caps paragraphs;
- utility labels may be uppercase when small and readable.

Desktop route text must not be shrunk merely to achieve density. Fix layout first.

## Icons and imagery

The route works with no images.

Allowed after provenance review:

- small official RuneScape skill, item, region, relic or Blessing icons already curated by the owner;
- direct official Jagex League assets where reuse is appropriate;
- simple original CSS geometry for generic states.

Not allowed:

- generated art;
- copied screenshots of another tool;
- private visual-reference screenshots;
- decorative fantasy landscapes;
- AI-made RuneScape-like icons;
- giant League art consuming the first viewport.

## Motion

Motion communicates state only:

- completion/parking;
- queue focus switch;
- detail expansion;
- progress threshold;
- source conflict;
- wrapper open/close.

Rejected:

- ambient particles;
- parallax;
- floating icons;
- pulsing controls;
- endless progress animation;
- hover scaling;
- Three.js background.

Version 1 has no Three.js use case.

## Copy

Use direct player language:

- `Do next`
- `Switch to PvM`
- `Blocked by 80 Smithing`
- `Hold region pick`
- `Recheck at 12,000 points`
- `Rejuvenated candidate: Devout`
- `Perkfection: 14% slower at P90`
- `2 Blessing resets left`
- `Skip for Dragon`

Reject:

- optimise your journey;
- seamless experience;
- powerful insights;
- unlock your potential;
- ultimate companion;
- intelligent recommendation;
- efficient progression;
- optimal synergy.

State the actual reason: `Three tasks share this bar batch` beats `Efficiently maximise progression`.

## Rendered review

### Laptop and desktop

- route begins immediately;
- next action found in under two seconds;
- at least eight usable rows above fold at target desktop width;
- mobile metadata does not leak into desktop layout;
- rail is useful rather than filled;
- blocked rows explain themselves;
- point coverage and reserve are understandable;
- no repeated totals/titles/actions/status badges;
- no glow, blur, decorative gradient or empty acreage;
- completion and Wiki actions are independent.

### Mobile

- both next actions remain visible;
- active route appears before deep status detail;
- next permanent/reset decision remains visible without navigation;
- rows are touchable without giant-card bloat;
- full-height Wiki sheet restores focus and scroll.

### Accessibility/runtime

- visible focus;
- semantic controls/headings/dialog;
- logical focus order;
- no state communicated only by colour;
- readable at 200% zoom;
- reduced motion;
- console and network checked;
- populated, loading, error, conflict, blocked, completed and reserve states observed.

## Anti-slop pre-mortem

Stop and restructure when the screen contains three or more of these:

1. oversized brand/header before route work;
2. progress card strip;
3. translucent rounded route cards;
4. gold gradients instead of hierarchy;
5. AI recommendation panel restating a row;
6. status-chip clutter;
7. duplicate phase/progress labels;
8. copied RuneScape decoration;
9. whole Wiki site embedded inside the modal;
10. phone route hidden below status panels;
11. every rail group boxed separately;
12. entire route row acting as completion and source button at once.

## Approval target

- compact progress/source header;
- route ledger as dominant surface;
- separate completion and source controls;
- two-action switchboard;
- five-bank route model without five dashboard cards;
- decision gates with evidence and uncertainty;
- mobile route before deep status;
- canonical task-row Wiki wrapper;
- warm stone/cream/gold/teal language;
- no hero, glass, glow, generated art or ambient animation.
