---
name: clankerscape-ui
description: Design and review ClankerScape as a dense human-made RuneScape League route workbench with independent completion/source controls, balanced skilling/PvM queues, and no SaaS or generic fantasy structure.
---

# ClankerScape UI

Use this skill for any page, component, style, interaction or rendered review.

## Product test

State the page's player job in one sentence. Remove anything that does not help execute, inspect or revise the Dragon route.

ClankerScape is a route workbench. The first viewport performs the job.

## Required composition

The primary screen contains:

- compact progress/source header;
- route ledger as the dominant surface;
- separate executable `Skilling next` and `PvM next` actions;
- guaranteed-next-points/reserve state;
- current region/relic/Blessing state;
- next irreversible decision;
- source-aware Wiki wrapper for every route task.

Prefer one ledger surface and one switchboard surface. Do not turn every subsection into another card.

## First-view contract

At the target desktop width:

- route rows begin immediately below the compact header;
- at least eight usable route rows appear above fold;
- both next actions are visible;
- next region/relic/Blessing gate is visible;
- current points/tasks/source state are readable without giant numbers;
- no hero, art panel or explanatory paragraph precedes the route.

## Route-row controls

A row is not one monolithic button.

- completion checkbox/button changes local completion state only;
- task title or explicit Wiki action opens source context only;
- row body may select inspector context;
- queue/defer action changes route state only;
- focus labels and order make these actions unambiguous.

Show:

- sequence;
- action title;
- locality/region;
- queue/category;
- task/point gain;
- expected time or honest unavailable mark;
- blocker/status;
- source freshness.

Do not hide decision-critical information behind hover. Blocked rows name the blocker. Skipped rows say why they are skipped for Dragon.

## Switchboard

Show only information that changes the next decision:

- skilling next;
- PvM next;
- switch trigger;
- guaranteed point coverage;
- current bottlenecks;
- approaching region/relic/Blessing gate;
- current Blessing epoch and reset count;
- candidate Rejuvenated pick;
- reserve warnings.

No activity feed, chart, streak, achievement, generic insight, repeated total or decorative KPI.

## Mobile order

Phone layout order:

1. two-line progress/source header;
2. compact skilling/PvM next switcher;
3. active route rows;
4. approaching irreversible decision;
5. deeper region/relic/Blessing detail;
6. completed/deferred/reserve groups.

Do not place the full switchboard above the active route. Do not squeeze a desktop table or hide queue switching in a hamburger.

Use a separate mobile row layout. Mobile-only metadata must be hidden at desktop widths; it may not become accidental extra grid children.

## Wiki wrapper

- Canonical task context comes from numeric Wiki task ID.
- Route note and Wiki text have distinct labels/surfaces.
- Related boss/item/mechanic articles are separate actions.
- Completion remains available outside the modal.
- Focus enters the modal/sheet, Escape closes it, and focus/scroll return to the source action.
- Design loading, offline, CORS, missing, duplicate-row, stale-revision and conflict states.
- No iframe or unsanitised source HTML.

## Visual language

- warm near-black and stone surfaces;
- cream text;
- warm-grey metadata;
- restrained gold for thresholds/permanent choices;
- teal or emerald for active/focus/progress;
- red/orange only for actual blockers, conflicts or destructive reset consequences;
- square or 2–4 px corners;
- thin quiet borders;
- minimal shadow for real layer separation;
- tabular numerals for points, tasks and time.

The route remains usable with no images loaded.

## Reject immediately

- hero or slogan;
- feature/KPI card strip;
- pricing, testimonials, waitlist or CTA theatre;
- glass/backdrop blur;
- blue-purple SaaS gradients;
- gradient text;
- aurora blobs;
- idle glow, pulse or hover scale;
- oversized logo or fantasy scene;
- giant empty header space;
- rounded card garden;
- repeated panels/titles/counts/status pills;
- icon/badge treatment for every field;
- generic AI recommendation prose;
- copied Wiki or third-party route layout;
- generated imagery;
- ornamental Three.js.

## Copy

Use direct labels:

- `Do next`
- `Switch to PvM`
- `Blocked by 80 Smithing`
- `Hold region pick`
- `Recheck at 12,000 points`
- `Rejuvenated candidate: Devout`
- `2 Blessing resets left`
- `Skip for Dragon`

Delete vague product phrases such as `optimise your journey`, `seamless`, `powerful insights`, `ultimate companion`, `efficient progression` and `optimal synergy`.

## Motion

Motion explains a state change only:

- complete/park row;
- switch queue focus;
- expand details;
- open/close wrapper;
- advance threshold;
- surface source conflict.

Keep it short and interruptible. Respect reduced motion. No ambient animation.

## Responsive/readability checks

- desktop route has at least eight usable rows above fold;
- desktop metadata remains in its intended columns;
- laptop ledger does not collapse into a narrow sliver;
- phone route begins before deep status details;
- touch targets remain usable without giant cards;
- unavailable differs from zero;
- state is not colour-only;
- meaningful data is not hover-only;
- text remains readable at 200% zoom.

## Review loop

1. render laptop;
2. name/fix the five largest defects;
3. render desktop and verify density;
4. render phone and verify content order;
5. inspect populated/loading/error/conflict/blocked/completed/reserve states;
6. inspect keyboard, focus, reduced motion, console and network;
7. run `clankerscape-review`.

Judge the rendered page, not component names or intent.
