# ClankerScape design direction

ClankerScape is a dense player-built route workbench, not a landing page, SaaS dashboard, fantasy illustration, or recommendation feed.

## First viewport

At 1600×900 and 1280×800, show before scrolling:

- current points and task count;
- source/reconciliation state;
- active route ledger;
- at least eight usable task/audit rows;
- immediate skilling and PvM actions;
- reserve coverage;
- next region/relic gates;
- Tier 6 state;
- Blessing resets left;
- ordinary-relic reset warning.

No hero, oversized logo, artwork, marketing copy, KPI card strip, or explanatory wall may precede the route.

## Main structure

- compact sticky progress/source header;
- five direct tabs: Route, Relics, Regions, Blessings, Sources;
- route ledger owns most desktop width;
- one switchboard rail for actionable route state;
- independent completion and source controls;
- local import/export and reset controls;
- tables become labelled ledger entries on phones;
- wide comparison matrices scroll inside their own surfaces.

## Tier 6 treatment

Neither Perkfection nor Rejuvenated is the visual or data default.

Initial state:

```text
Tier 6 · unscored
Perkfection P50: scenario output
Best Rejuvenated candidate: no route-time estimate entered
```

A winner appears only when it clears `max(30 minutes, 3% of remaining route P50)` and conservative uncertainty ranges do not overlap.

## Visual language

- warm near-black/charcoal surfaces;
- cream primary text and warm-grey metadata;
- restrained gold for thresholds/permanent choices;
- teal for active/focus/progress;
- red/orange only for blockers, conflicts, or destructive actions;
- square or 2–4 px corners;
- thin borders and no glow;
- system sans with tabular numerals;
- no private font or generated image.

## Copy

Use direct player language:

- `No canonical task snapshot`
- `Hold all elective defaults`
- `No safe Tier 6 winner yet`
- `Relic reset unavailable`
- `3 resets left`
- `Queue a sourced task and enter minutes`

Avoid marketing and pseudo-intelligence language.

## Responsive contract

Desktop:

- eight rows fully visible at 1600×900 and 1280×800;
- no document-level horizontal overflow;
- route and switchboard remain one coherent work surface.

Phone:

- compact progress header;
- tabs remain directly reachable;
- source gate, both next-action queues, and active route appear before deep status;
- route rows become readable vertical entries;
- every newly sourced task starts unclassified; bank assignment and parking are explicit controls;
- region/Blessing tables scroll locally;
- source dialog uses full height;
- no document-level horizontal overflow.

## Accessibility/runtime

- semantic buttons, labels, tables, and dialog;
- visible keyboard focus;
- reduced-motion support;
- colour never carries the only state signal;
- no whole-row multi-action button;
- external links labeled and safe;
- loading/error/partial/full source states are visible;
- no console or page errors in rendered review.
