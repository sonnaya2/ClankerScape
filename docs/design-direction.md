# ClankerScape design direction

Status: approval draft. This document defines the visual and interaction contract before components exist.

## Product classification

ClankerScape is a **dense game-route workbench**.

It is not:

- a landing page;
- a SaaS dashboard;
- a generic fantasy UI;
- a RuneScape Wiki skin;
- an app-store product page;
- a collection of decorative cards.

The page should resemble a careful player-made route ledger: fast to scan, dense without being cramped, and visibly built around the decisions a League racer makes while playing.

## First-view contract

At a 1600 × 900 desktop viewport, the first screen must show all of the following without scrolling:

- current League Points out of 48,000;
- completed task count and the next 50/175/300/450 threshold;
- the active route phase;
- at least eight executable route rows;
- the next skilling action;
- the next PvM action;
- current regions;
- the approaching irreversible choice;
- relic and Blessing progress, including remaining Blessing resets.

If the first view contains a slogan, oversized logo, illustration, empty header field, or explanatory paragraph instead of route rows, the design has failed.

## Desktop wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ CLANKERSCAPE   12,480 / 48,000 pts   327 tasks   NEXT REGION 450   PHASE D   Sources: current│
├──────────────────────────────────────────────────────────────┬──────────────────────────────┤
│ ROUTE                                                        │ SWITCHBOARD                  │
│                                                              │                              │
│ Phase D · Asgarnia infrastructure                327 → 450   │ DO NEXT                      │
│ ┌────┬──────────────────────────┬──────────┬─────┬───────┐   │ Skilling                     │
│ │327 │ Build first invention...│ Asgarnia│ +1  │ 12 min│   │ Finish 80 Smithing chain    │
│ │328 │ Kill General Graardor   │ PvM      │ +1  │  4 min│   │ [open step]                 │
│ │329 │ Process unfinished pots │ Skilling │ +3  │  2 min│   │                              │
│ │330 │ Complete easy mastery...│ PvM      │ +2  │  8 min│   │ PvM                          │
│ │331 │ Reach 90 Invention      │ Mixed    │ +1  │passive│   │ Graardor mastery cluster     │
│ │332 │ Equip crafted item      │ Produce  │ +1  │ <1 min│   │ [open step]                 │
│ │333 │ ...                     │          │     │       │   │                              │
│ └────┴──────────────────────────┴──────────┴─────┴───────┘   │ DECISION AHEAD               │
│                                                              │ T6: Perkfection              │
│ Next phase · Hold final region pick until score is current   │ Runner-up: Rejuvenated       │
│                                                              │ Why: combat + invention      │
│ Completed rows (collapsed)                                   │                              │
│ Deferred / blocked                                           │ REGIONS                      │
│                                                              │ Misthalin · Havenhythe       │
│                                                              │ Karamja · Desert · Asgarnia  │
│                                                              │ Final: Anachronia (pending)  │
│                                                              │                              │
│                                                              │ BLESSINGS                    │
│                                                              │ B → C → C · Demon's Mark     │
│                                                              │ 2 resets left                │
└──────────────────────────────────────────────────────────────┴──────────────────────────────┘
```

This is a structural sketch, not a visual template. The implementation should improve spacing, hierarchy, and responsive behaviour without drifting into card-based dashboard composition.

## Information hierarchy

### Level 1: the next action

The route-row action title is the strongest text on the page. The player should be able to glance over from the game and find the next step immediately.

### Level 2: progress and decision thresholds

Points, task count, next region threshold, and irreversible choices are persistent but compact. They must never require scrolling to a separate dashboard.

### Level 3: why the row matters

A row may show a terse reason such as:

- `opens Desert`
- `3 tasks from one batch`
- `Blessing 9/12`
- `gear + 200 points`
- `passive while travelling`

Do not show a paragraph in the ledger. Full notes belong in the row detail/Wiki modal.

### Level 4: provenance and assumptions

Source state, estimate confidence, and the distinction between route commentary and live Wiki text are available on demand. They must be visible enough to prevent false certainty but not drown the main route.

## Route row anatomy

Every row is one semantic button or link-like control, not a nested pile of clickable boxes.

Recommended columns:

1. sequence or task-count checkpoint;
2. action title;
3. locality/region;
4. queue/category;
5. task and point gain;
6. estimated active time;
7. blocker/status;
8. a quiet source-state marker.

A route row should not contain:

- an icon for every field;
- a large thumbnail;
- a gradient badge;
- three different button styles;
- a second title that repeats the first;
- hover-only information needed to choose the action.

### Status states

- **Do now** — normal active row.
- **Queued** — muted but available.
- **Blocked** — explicit blocker text; do not merely reduce opacity.
- **Deferred** — reason and reconsider trigger.
- **Completed** — compact, retained in history.
- **Skipped for Dragon** — visibly intentional, not an error.

Use colour as reinforcement, never as the only state signal.

## Switchboard

The side rail exists to prevent route collapse when one track stalls.

It contains:

- one next skilling action;
- one next PvM action;
- a reason to switch;
- current bottlenecks;
- next relic/Blessing/region decision;
- current region set;
- Blessing reset count.

It does not contain generic statistics, recent activity feeds, streaks, achievements, charts, social widgets, or “insights.”

On narrower desktop widths, the rail may become a top strip with two queue columns. It must not shrink the route ledger into an unreadable sliver.

## Wiki modal

Activating any route row opens a source wrapper.

### Header

- route action title;
- resolved RuneScape Wiki page title;
- source freshness/fetch time;
- close control.

### Body order

1. route-specific reason and expected gain;
2. requirements and blockers;
3. current plain-text Wiki extract;
4. assumptions/estimate confidence;
5. full article link.

The route note and live Wiki content must have different labels and surfaces. Never make a model-authored summary look like Wiki text.

### Interaction

- keyboard focus enters the modal;
- Escape closes it;
- focus returns to the row;
- loading, missing-page, network-error, and stale-cache states are designed;
- no iframe;
- no unsanitised HTML;
- no automatic fetch for rows the player never opens.

A 120–160 ms opacity/position transition is acceptable when motion is enabled. No spring bounce, blur reveal, glow, or scaling card animation.

## Mobile layout

At phone widths:

- the top bar becomes two compact lines;
- route rows become labelled ledger entries, not a horizontally scrolling table;
- the queue switcher sits above the active row group;
- phase and threshold information remains visible;
- the switchboard follows the active rows in a fixed information order;
- the Wiki wrapper becomes a full-height sheet;
- actions remain at least 44 px tall without inflating every surface into giant cards.

Do not hide the PvM/skilling switch or irreversible-choice warning behind a hamburger menu.

## Visual tokens

These are directional rather than final values.

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

Do not cargo-cult these exact colours. Verify contrast in the rendered page. Teal and gold are accents, not a requirement to colour every border.

### Typography

- Use a high-legibility system sans for all route data.
- Use tabular numerals for points, task counts, and time.
- A restrained display face may appear in `ClankerScape` and major phase labels only.
- Do not use monospace for ordinary UI copy to simulate “technical” seriousness.
- Avoid all-caps paragraphs. Small utility labels may be uppercase if tracking and contrast remain readable.

### Borders, depth, and corners

- One border is enough to define most surfaces.
- Nested boxes should be the exception.
- Use 2–4 px radii or square corners.
- Use a small shadow only for the modal or a genuinely raised layer.
- No glow shadows.
- No double neon hairlines.

## Icons and imagery

The route must work without images.

Allowed later, after provenance review:

- small official RuneScape item, region, skill, relic, or Blessing icons already curated in Equilibrium;
- direct official Jagex League assets where reuse is appropriate;
- simple original CSS geometry for generic state markers.

Not allowed:

- generated art;
- copied screenshots of another tool;
- third-party design-reference images from the private skill repository;
- decorative fantasy landscapes;
- AI-made “RuneScape-like” iconography;
- a giant League logo consuming the first viewport.

## Motion policy

Motion must communicate state.

Acceptable:

- a completed row contracts into history;
- the active queue indicator moves between Skilling and PvM;
- a progress bar advances after a completion;
- the modal enters and exits;
- a decision warning appears when a threshold is reached.

Rejected:

- ambient particles;
- parallax;
- floating icons;
- pulsing CTA buttons;
- endlessly animated progress effects;
- hover scale on every row;
- Three.js background scenes.

ClankerScape currently has no Three.js use case. Do not add one to satisfy a technology preference.

## Copy rules

Use direct labels:

- `Do next`
- `Switch to PvM`
- `Blocked by 80 Smithing`
- `Unlock Desert now`
- `Hold final region pick`
- `Recheck after Tier 6`
- `2 Blessing resets left`
- `Skip for Dragon`

Reject generic AI/product language:

- “optimise your journey”
- “seamless experience”
- “powerful insights”
- “unlock your potential”
- “master your adventure”
- “your ultimate companion”
- “intelligent recommendations”

Explanations should state the actual reason: `Three fast tasks share the same bar batch` is better than `Efficiently maximise your progression`.

## Rendered review checklist

A review must inspect the rendered route, not only source code.

### Desktop

- Is route content visible immediately?
- Can the next action be found in under two seconds?
- Is the side rail useful or merely filled?
- Are there eight or more real rows above the fold?
- Is cumulative progress readable without giant numbers?
- Do blocked rows explain themselves?
- Does the page feel like one working surface rather than twelve cards?
- Are there any gradients, glows, blur layers, or decorative empty areas?

### Mobile

- Is the active route still first?
- Can the player switch queue without opening navigation?
- Are point/task thresholds readable?
- Are rows touchable without becoming oversized?
- Does the full-height Wiki sheet preserve focus and scroll correctly?

### Accessibility

- visible keyboard focus;
- logical heading order;
- modal labelling and focus restoration;
- reduced-motion behaviour;
- contrast checked in actual browser output;
- no status conveyed only by colour;
- readable zoom at 200%;
- semantic buttons/links rather than clickable `div`s.

## Pre-mortem: what would make this look like AI slop

1. A 300 px header containing a logo, subtitle, and empty atmospheric background.
2. Four oversized progress cards before the route begins.
3. Every route step wrapped in a rounded translucent card with an icon, badge, and glow.
4. Gold gradients used as a substitute for hierarchy.
5. An “AI recommendation” panel that restates the next row in vague prose.
6. Too many status chips and not enough actual task information.
7. Repeating `Phase`, `Current phase`, and `Phase progress` labels in separate surfaces.
8. Decorative RuneScape imagery copied from another site.
9. A modal that embeds the Wiki page wholesale and becomes a second website inside the app.
10. A phone layout that hides the route behind tabs or a hamburger.

Any implementation showing three or more of these should be stopped and restructured rather than polished.

## Approval target

Before coding, approve the following composition:

- compact progress header;
- route ledger as the dominant surface;
- two-queue switchboard rail;
- phase dividers based on real unlock thresholds;
- dense clickable rows;
- plain-text live Wiki modal;
- warm stone/cream/gold/teal visual language;
- no hero, dashboard card strip, generated art, or ambient animation.
