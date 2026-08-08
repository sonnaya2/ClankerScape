---
name: clankerscape-ui
description: Binding interface and visual rules for Clankerscape. Use before creating or materially changing routes, layout, components, CSS, copy, responsive behavior, or interaction design.
---

# Clankerscape UI

Clankerscape is a zero-revenue RuneScape League route workbench. The interface exists to execute a sourced route quickly. It is not a landing page, SaaS dashboard, generic fantasy skin, or Wiki clone.

## Product class

Use **route workbench / field notebook** as the product class.

The first viewport must show working route information: current phase, next tasks, cumulative gates, source state, and preparation. Never place a marketing hero or decorative overview before the route.

## Primary composition

Desktop should give most width to a route ledger. A compact phase rail and a context/preparation inspector may flank it when the viewport supports them. Mobile becomes one route column with phase controls and inline or bottom-sheet context.

Do not force desktop sidebars into mobile cards.

## Route rows

A collapsed route row must show:

- ordinal;
- separate completion control;
- exact task title;
- tier and points;
- region/locality;
- expected time or an honest unavailable mark;
- confidence/source state;
- one short route reason;
- visible Wiki affordance.

Use structured rows, not identical decorative cards. Expanded detail may show prerequisites, carry items, retained items, alternatives, crowding, and RNG risk.

Every actionable row opens the sourced Wiki dialog through its title or row activation. The completion checkbox only changes completion state.

## Visual language

- warm matte near-black and charcoal/stone surfaces;
- cream text and warm-grey metadata;
- restrained brass/gold for structure and thresholds;
- one teal/emerald progression and focus accent;
- risk colors only for actual warning, conflict, or blocked states;
- square or nearly square corners;
- thin borders;
- tabular numerals where comparison benefits;
- system fonts unless a separately reviewed, redistributable font is intentionally added.

No private EverSense fonts, art, CSS, screenshots, or components may enter this repository.

## Reject

- marketing heroes, taglines, conversion copy, feature pitches, pricing, testimonials;
- glassmorphism, backdrop blur, aurora blobs, idle glow, gradient text, blue-purple startup chrome;
- feature-card gardens, fake KPI tiles, repeated status pills, radius soup;
- large empty acreage before the working surface;
- copied RuneScape Wiki or third-party RuneScape layouts;
- generated images;
- ornamental animation loops;
- title-case labels for ordinary controls;
- generic copy that could describe any planner.

## Motion

Motion explains a state change only: row completion, expansion, dialog entry/exit, phase progress, or source update. Keep it short and interruptible. Respect `prefers-reduced-motion`.

Three.js is out of scope for version 1. Add it only when a specific spatial decision cannot be communicated more clearly in 2D.

## Data readability

- Keep points, task count, expected minutes, confidence, and source revision distinct.
- Show units.
- Keep unavailable different from zero.
- Keep active filters and shown/total counts near the affected data.
- Use color as a secondary cue, never the only cue.
- Avoid unexplained composite route scores in the UI.

## Copy

Use direct, specific language. Name the task, gate, region, source state, or error. Avoid polished product claims and AI-marketing vocabulary.

Good: `Wiki revision 184233 changed after route v1 was frozen.`
Bad: `Unlock smarter insights with live, seamless route intelligence.`

## Accessibility

- visible focus;
- real buttons, links, checkboxes, headings, lists, and dialog semantics;
- closing a dialog restores focus to its originating row;
- keyboard route traversal remains usable;
- no hover-only essential information;
- target sizes remain usable on phone;
- contrast is checked on the rendered page, not assumed from token names.

## Rendered verification

For material changes:

1. inspect laptop width;
2. fix the five largest defects;
3. inspect desktop width;
4. inspect phone width;
5. inspect populated, loading, error, conflict, unavailable, and empty states;
6. inspect console/network and keyboard focus;
7. run `clankerscape-review`.

Do not claim a route or viewport passed when it was not observed.
