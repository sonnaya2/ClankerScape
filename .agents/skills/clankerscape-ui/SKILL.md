---
name: clankerscape-ui
description: Design and review ClankerScape as a RuneScape route tool with EverSense-style neo-brutalist print structure and no generated-dashboard habits.
---

# ClankerScape UI

ClankerScape is a **tool workbench**, not a landing page, SaaS dashboard, audit console, or spreadsheet reskin. The first viewport must let the player read tasks and make route decisions.

## Structure

Use only four primary pages: Route, Relics, Regions, and Blessings.

- Route shows Dragon progress, missing task coverage, region/relic gates, spare points, filters, and the task list.
- A task row shows only completion, task, area, points, and plan. Time and requirements belong in task details.
- Relics are grouped by tier. Effects stay collapsed. Tier 6 comparison stays below tiers 1–5 and opens only when the player asks to compare it.
- Regions show official counts first. Quest lists and time estimates stay collapsed. Phones use region rows/cards, never a clipped desktop table.
- Blessings use the three real paths. Desktop uses a three-column path board; phones stack the three choices under each tier.

Do not expose internal model language as normal UI. Never ship `state`, `source`, `unclassified`, `bank`, `park`, `provenance`, `audit result`, `switchboard`, or database terms as player-facing labels. Use plain actions such as `Not planned`, `Skill now`, `PvM now`, `Spare`, `Skip`, `Estimate`, and `Effects`.

## Visual language

Combine EverSense print structure with RuneScape material:

- worn parchment working surfaces;
- near-black ink frame and masthead;
- gold for active chrome and Dragon progression;
- Order blue, Balance green, and Chaos red only where those paths are data;
- 2–3px hard borders, offset shadows, square geometry, condensed headings, tabular numbers;
- restrained paper grain or halftone, not a decorative backdrop competing with data.

No gradients, glass, blur, glow, auroras, generic dark navy, radius soup, floating cards, KPI gardens, marketing heroes, decorative badges, hover scaling, or generated fantasy art.

## Density and copy

Dense does not mean every field is always visible. Keep the default reading order clean and move expert inputs into details, popovers, or the task sheet where they are used.

Use short factual copy. Do not add slogans, explanatory subtitles that repeat the heading, title-case micro-labels, or warnings without a next action. A count appears once unless the second occurrence supports a different decision.

## Render checks

Verify 1600×900, 1280×800, and 390×844 with real partial task data. Check all four pages, task planning/completion, selected relics, expanded Tier 6 comparison, region estimates, selected Blessings, reset history, save menu, storage failure, keyboard focus, document overflow, console, and network.

Run `clankerscape-bot-audit` after substantial UI work. Any BUSTED finding or three TELLs on one screen block approval.
