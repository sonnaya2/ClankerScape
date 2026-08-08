---
name: clankerscape-ui
description: Design and review ClankerScape as a fixed RuneScape Dragon route with EverSense-style neo-brutalist structure and no generated-dashboard habits.
---

# ClankerScape UI

ClankerScape is the route itself. It is **not** a route builder, SaaS dashboard, audit console, spreadsheet, or editable planner.

## Public structure

The public page is read-only and opinionated:

- Route — the ordered start-to-Dragon phases and the skilling/PvM switches.
- Regions — the chosen unlock order, not a region picker.
- Relics — the chosen relic line, not a comparison form.
- Blessings — the chosen Blessing line, with only genuinely unresolved mechanics marked for recheck.

No progress checkboxes, plan dropdowns, time inputs, sliders, local save state, import/export, user estimates, source controls, or configuration UI belong on the public page. Research calculators and source data may remain in the repository without becoming product chrome.

Do not expose internal model language as UI. Never ship `state`, `source`, `unclassified`, `bank`, `park`, `provenance`, `audit result`, `switchboard`, or database terms as player-facing labels.

## Visual language

Use the current RuneScape web palette as the direction rather than parchment-heavy fantasy UI:

- blue-black / green-black page and masthead;
- dark teal working surfaces;
- warm brass/gold for progression and active route decisions;
- warm off-white text and desaturated grey-green secondary text;
- teal as a small functional accent;
- 1–3px hard borders, square geometry, offset hard shadows, serif RuneScape-flavoured headings and tabular numbers;
- no large beige/cream surfaces.

Keep the EverSense influence in the **structure**, not by copying its colours: strong rule lines, print-like hierarchy, asymmetric emphasis, and dense useful information.

No gradients, glass, blur, glow, auroras, generic navy dashboard chrome, radius soup, floating cards, KPI gardens, marketing heroes, decorative badges, hover scaling, fake icons, or generated fantasy art.

## Density and copy

The first viewport should communicate the route immediately: Dragon target, region order, and the first phases. Copy is short and operational.

Do not add slogans, explanatory subtitles that restate headings, repeated totals, source metadata in primary chrome, or warnings without a consequence. A caveat belongs next to the exact route choice it affects.

## Anti-slop review

After substantial UI work, run `clankerscape-bot-audit` against the rendered page and source.

Block approval for:

- any editable planner control on the public page;
- any BUSTED finding;
- three TELLs on one screen;
- meaningful WASHED finding;
- cream/parchment taking over the page;
- the route being less visible than framework, source, or status UI.

## Render checks

Verify 1600×900, 1280×800, and 390×844. Check anchors, responsive phase rows, region/relic/blessing sequences, document overflow, keyboard focus, console/network errors, and that the deployed page contains no forms or client-side state.
