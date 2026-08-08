# Grok UI comparison audit

Status: read-only comparison review  
Artifact: owner-supplied self-contained HTML mock from a Grok Heavy attempt  
Policy: use it to challenge information architecture only. Do not copy its code, CSS, fixture text or route decisions.

## Result

**Useful comparison, failed implementation.**

The mock found a credible high-level structure:

- compact progress header;
- route ledger as the primary surface;
- switchboard with separate skilling and PvM next actions;
- restrained warm-dark palette;
- compact phone route rows;
- source modal with route note and Wiki section.

It also contains a desktop layout defect severe enough that the implementation cannot be used as a base. The route assumptions are invalid because the fixture inherited the withdrawn Perkfection thesis.

## Rendered evidence

The supplied file was rendered locally at desktop, laptop and phone widths and with the source modal open.

Observed states:

- desktop route;
- laptop route;
- phone route;
- desktop source modal;
- keyboard focus/modal close behaviour.

The rendered screenshots and source file are local review artifacts. They are not copied into this public repository.

## Good ideas to retain

### Compact utility header

The header exposes points, task count, next threshold, phase and source status in one line without a hero or marketing block.

Keep the compactness. Improve type size and hierarchy rather than replacing it with cards.

### Ledger/switchboard split

The main route remains the dominant surface while a narrower rail keeps both next actions and approaching decisions visible.

This is a better product shape than separate dashboard and route pages.

### Two active queues

`Skilling next` and `PvM next` are visible together. This directly supports the revised route-portfolio model.

Keep the concept, but source the actions from the route engine and show switch triggers.

### Phone metadata compression

On phone, each route step uses a strong title and one concise metadata line. This scans better than a squeezed desktop table.

Keep the principle, not the CSS.

### Restrained material language

The mock avoids hero art, glass, blue-purple gradients, idle glow and giant rounded cards. The warm dark/cream/gold/teal family is directionally suitable.

## Blockers

### 1. Mobile metadata breaks the desktop grid

The route row defines a desktop grid, then renders a second mobile metadata block as an additional child. That block is not hidden at desktop widths.

Consequence:

- it becomes an extra grid item;
- wraps below the intended columns;
- forces every row to become very tall;
- makes the desktop document roughly twice the intended height;
- destroys the eight-rows-above-fold requirement.

The first rendered desktop screenshot is approximately 1759 px tall at a 1600 × 900 target. This is not a small spacing issue; the layout structure is wrong.

Required correction:

- hide mobile metadata by default;
- reveal it only inside the mobile media query;
- verify actual grid-child count against declared columns;
- inspect screenshot height and row density.

### 2. Whole row is one button

The mock wraps the complete route row in one button that opens source information.

Consequence:

- there is no independent completion action;
- future completion checkboxes would create nested/competing controls;
- row selection, completion and source opening cannot be distinguished by keyboard or assistive technology.

Required structure:

- completion control;
- task title/Wiki action;
- optional row-selection surface;
- optional queue/defer action;
- distinct labels and focus states.

### 3. Phone status precedes too much route content

The phone composition places:

- both next actions;
- decision section;
- regions;
- relics;
- Blessings;

before the active ledger.

The route is still usable, but the status rail delays the primary work.

Required phone order:

1. compact header;
2. two next actions;
3. active route rows;
4. approaching decision;
5. deeper region/relic/Blessing detail.

### 4. Desktop text is too small

The mock achieves density partly through very small type. This will fail for extended use and zoom.

Required correction:

- fix grid/layout waste first;
- use normal readable route text;
- keep metadata quiet through hierarchy, not tiny fonts;
- verify at 100% and 200% zoom.

### 5. Fixture data reads as real route data

Rows such as `Complete easy Combat Mastery (Graardor)` and the listed point/task gains are mock fixtures, but the interface does not clearly identify them as such.

Required correction:

- fixture builds carry a persistent `sample data` marker;
- no production-looking points/times before source import;
- source conflict/provisional state remains visible per row.

### 6. Invalid Perkfection route thesis

The mock shows Perkfection as the Tier 6 default and Asgarnia infrastructure as the route phase.

That recommendation has been withdrawn. Tier 6 is now a Rejuvenated-first decision gate comparing every missed Tier 1–5 relic. Asgarnia must win on its real task portfolio.

Do not preserve any fixture, label or hierarchy that treats Perkfection as the expected route.

### 7. Wiki model assumes task title equals article title

League tasks are rows in the canonical task table and carry numeric task IDs. A task title may not resolve to a dedicated Wiki article.

Required model:

- canonical task page and revision;
- numeric `wikiTaskId` lookup;
- one extracted/sanitised task row;
- related boss/item/mechanic articles as separate links;
- cached canonical page rather than one full request per task.

### 8. Above-fold contract fails

Because of the metadata/grid bug, the rendered desktop does not show eight compact usable rows above fold.

This contract must be tested from a screenshot, not inferred from the number of fixture objects in source.

## Modal review

Good:

- modal is visually separate from route;
- route note and Wiki placeholder have separate headings;
- close control is visible;
- focus enters the modal and returns on close in the reviewed interaction.

Needs correction:

- task ID/revision must be visible;
- content source must use canonical task-row lookup;
- completion remains outside/independent;
- missing/duplicate row, CORS, offline and stale-revision states need explicit designs;
- no placeholder should be mistaken for a successful live fetch.

## AI/slop audit

### BUSTED

None of the major marketing/glass/aurora/hero patterns are present.

### TELL

- excessively tiny desktop type used to force density;
- switchboard subsections risk becoming a vertical card/status stack;
- mock route state presented too confidently;
- uniformly terse status language can read like generated dashboard fixture copy.

### WASHED risk

The restrained palette is good, but the page is close to a sterile black data sheet. RuneScape identity should come from real task terminology, restrained sourced icons and meaningful region/relic/Blessing state—not decorative fantasy art or gradients.

## What the implementation may borrow

- compact top status line;
- dominant ledger plus narrower switchboard;
- simultaneous skilling/PvM next actions;
- concise mobile metadata line;
- restrained warm-dark palette;
- full-height phone source sheet.

## What the implementation may not borrow

- source code or CSS;
- fixture task names/points/times;
- Perkfection or Asgarnia route assumptions;
- monolithic row button;
- task-title-as-article Wiki model;
- mobile status ordering;
- unverified data presentation;
- private local artifact paths or screenshots.

## Comparison verdict

Use the Grok result as evidence that the ledger/switchboard composition is worth pursuing. Reimplement the structure from the ClankerScape contracts, with:

- separate actions;
- corrected responsive DOM/CSS;
- real route portfolios;
- task-ID source lookup;
- readable desktop type;
- route-before-deep-status phone ordering;
- no static Perkfection thesis.
