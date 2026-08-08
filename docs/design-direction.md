# ClankerScape design direction

ClankerScape opens on the task list. No landing page, sales copy, or dashboard preamble.

## Layout

- black RuneScape masthead with Route, Relics, Regions, and Blessings only;
- points, task count, next region, and Dragon progress in one score strip;
- one source warning when task tiers are missing;
- full-width task list with no side rail;
- task rows show done, task, area, points, and plan; time lives in task details;
- relic effects and Tier 6 inputs stay collapsed until needed;
- region quests and estimates stay collapsed; phones use region cards;
- desktop Blessings use three path columns; phones stack Order, Balance, and Chaos under each tier.

## Look

- dark ink frame;
- worn parchment work surface;
- gold for active chrome and Dragon progression;
- Order blue, Balance green, and Chaos red only for Blessing data;
- square controls, hard borders, offset shadows, condensed headings, and tabular numbers;
- no gradients, glow, glass, floating panels, rounded card grids, decorative badges, or idle motion.

The print-shop structure comes from EverSense. The material, hierarchy, and colours belong to RuneScape.

## Copy

Keep labels short and literal:

- `Not planned`
- `Skill now`
- `PvM now`
- `Spare`
- `Skip`
- `533 / 1,152 Wiki tasks loaded`

Do not ship audit jargon, source columns, repeated revision tags, model field names, slogans, or explanations that restate the control beside them.

## Checks

- no document-level horizontal overflow at 1600×900, 1280×800, or 390×844;
- no console, page, or network errors;
- task plan/time, completion, relic, Tier 6, region estimate, Blessing, reset, and save controls work;
- keyboard tabs and task-dialog focus work;
- `clankerscape-bot-audit` passes;
- no retired labels or side-panel classes return.
