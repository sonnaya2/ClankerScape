# UI redesign audit

**Target:** `planning/dragon-route-foundation`  
**Direction:** EverSense neo-brutalist print structure mixed with RuneScape parchment, ink, gold, and Blessing-path colours.

## Removed

- dark enterprise dashboard styling;
- right-hand switchboard/status rail;
- `Park`, `State / source`, `Action / source`, `Unsorted`, `T6 saved`, and `Your pts` labels;
- per-row time boxes and source revision tags;
- per-relic Tier 6 estimate fields;
- always-visible region P50/P90/reachable-point inputs;
- horizontally clipped phone versions of the region and Blessing tables;
- placeholder relic initial emblems and repeated `Pick` labels.

## Current default views

- Route: one source line, three real gates, filters, and a five-column task list.
- Relics: tier rails, three direct choices, collapsed effects, and one collapsed Tier 6 comparison.
- Regions: official counts with collapsed quests and estimates; phone-native region cards.
- Blessings: three path columns on desktop and a labelled path stack on phones.

## Rendered checks

| State | Result |
|---|---|
| 1600×900 — all four pages | no document overflow |
| 1280×800 — route | no document overflow |
| 390×844 — route, regions, blessings | no document overflow; no clipped desktop table |
| task details | plan and time save locally; focus returns on close |
| task completion | points/tasks update and the completed task leaves the active list |
| selected relics and Tier 6 comparison | selected state and comparison inputs render without overflow |
| region estimate | opens inside the chosen row; inputs remain bounded |
| Blessing picks | selected path and derived God Blessing update |
| save menu | export, import, and clear remain behind one menu |
| console/network | zero errors after favicon and final asset pass |

## Bot audit

```text
BOT AUDIT — ClankerScape redesign
BUSTED (0)
TELL   (0)
SMELL  (1): repeated plan selects in the task list — retained because rapid classification is the primary job
WASHED (0)
Verdict: PASSES
Coverage not verified: 200% browser zoom and screen-reader announcement order
```
