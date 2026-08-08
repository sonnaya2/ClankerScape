---
name: clankerscape-review
description: Perform a hostile-to-defects review of ClankerScape route data, decision gates, UI, copy, Wiki sourcing, security and implementation. Critique the work, not the person.
---

# ClankerScape review

Use this after substantial work and before a PR is marked ready. This is a read-only audit pass.

Be severe about defects and conservative about claims. Do not repair findings during the audit.

## Severity

- **BLOCKER** — fabricated/stale route fact, illegal dependency, leaked secret/private material, broken build, inaccessible core action, data loss, copied prohibited content, or an unsupported irreversible decision.
- **HIGH** — wrong objective, narrow opportunity-cost analysis, bad region/relic/Blessing recommendation, Wiki-source confusion, unusable responsive layout, or major AI/SaaS structure.
- **MEDIUM** — hidden blocker, fake precision, weak queue balance, duplicated information, unclear hierarchy, weak error state, or avoidable performance cost.
- **LOW** — polish defect with no route-correctness or core-usability effect.

Do not bury a blocker under cosmetic findings.

## Establish scope

1. inspect branch, status, PR and complete diff;
2. identify changed source claims, decisions, route states, components and viewports;
3. name the evidence required;
4. return `BLOCKED` when evidence cannot be observed.

## Source and task audit

Check:

- 48,000-point target and 50/175/300/450 task gates;
- current task/point/region/Blessing totals;
- Equilibrium facts are separate from Catalyst stand-ins;
- every production task has numeric Wiki task ID, source revision and verification state;
- task tier, points, region and requirements come from source data;
- no copied public route order/commentary;
- no blacklisted source use;
- source facts, route assumptions, player state and decision records are separate;
- unknown time/mechanics are not displayed as zero or confirmed;
- route source revision conflicts are visible.

## Route-portfolio audit

Check:

- hard feasibility excludes illegal tasks before ranking;
- pre-450 ranking prioritises task gates;
- post-450 ranking prioritises deterministic/reliable points;
- immediate/deep skilling, immediate/deep PvM and reserve banks exist;
- both next actions are actually executable;
- guaranteed-next-points and reserve claims reconcile with real rows;
- switching cost is considered;
- P50/P90, failure, crowding and supply-rebuild risk are not hidden;
- completed history remains stable when future recommendations change;
- candidate corpus reaches 48,000 with meaningful reserve slack.

Fail any route that depends on one boss, one rare drop or one activity family while deterministic alternatives exist.

## Region audit

Check:

- no region is chosen to justify a relic;
- total regional points are not used as the decision by themselves;
- the 175/300/450 gates compare reachable rows, setup, queue split, Blessing access and P50/P90 time;
- Asgarnia is not treated as mandatory merely for Invention;
- final-region recommendation shows decisive rows and uncertainty;
- close projections are labelled close.

## Relic audit

Check every irreversible pick for opportunity cost.

Mandatory checks:

- Tier 2 compares Animal Wrangler, Superheated and Divine Druid across the complete route, not one favourite skill;
- Tier 3 compares route-wide travel, Slayer/PvM and Farming/patch value;
- Tier 4 compares Crystal Grace, Antiquarian and Transmutation against actual task banks;
- Tier 5 and Tier 6 are treated as a paired decision;
- Rejuvenated compares every missed Tier 1–5 relic;
- Perkfection is not default or described as broadly optimal without passing its 8% P50/P90 burden-of-proof gate against the best missed earlier relic;
- Tier 7 compares Infernal Fire, Icyenic Faith and Naragi Edict over the remaining encounter portfolio, not dummy DPS;
- ordinary relics are not shown as resettable without a current source.

A neat synergy is not evidence. Name the tasks and minutes it changes.

## Blessing audit

Check:

- exactly three confirmed resets unless current official data changes;
- reset history and remaining charges are visible;
- a reset shows every path choice/God Blessing it erases;
- early, mixed and late packages are treated as candidate epochs;
- Lord of Light and Tempered Heart are Order choices in the official reveal;
- God Tier derivation uses the correct three-choice segment;
- True Equilibrium uses the current sourced alignment/path interpretation and labels any source conflict;
- reset recommendation meets the route-time threshold after setup/death/supply costs;
- unsupported combat interactions are benchmarked or visibly provisional.

## UI audit

Fail the design when:

- route rows are not visible immediately;
- a hero, decorative header, KPI strip or marketing copy precedes the work;
- the ledger is fragmented into a card garden;
- glass, glow, blur, gradients or giant rounded panels replace hierarchy;
- skilling/PvM next actions are hard to find;
- blocked rows do not name blockers;
- progress facts repeat across panels;
- mobile places the complete status rail before the active route;
- the modal confuses route commentary with Wiki text;
- decision-critical data is hover- or colour-only;
- desktop rows accidentally render mobile metadata as extra grid cells;
- fewer than eight usable route rows appear above fold at the target desktop width.

### Route-row controls

Reject a row implemented as one monolithic button.

Verify:

- completion changes local state only;
- task title/Wiki action opens source content only;
- row selection does not complete the task;
- focus order and labels distinguish all actions;
- closing the wrapper restores focus and scroll.

Inspect rendered laptop, desktop and phone states. Source review alone cannot pass UI work.

## Wiki/source-wrapper audit

- Canonical League tasks are found by numeric task ID, not assumed article titles.
- The canonical task page is cached by revision rather than fetched per row.
- Related boss/item/mechanic pages are separate links.
- Live failures and source-revision changes are visible.
- Remote content is parsed inertly and sanitised/structured before rendering.
- Missing/duplicate task rows fail closed.
- No iframe, login, proxy, credential or silent relay.
- CORS capability is tested from the real Pages origin.
- Offline snapshot fallback remains useful.

## Copy audit

Flag:

- optimise your journey;
- seamless;
- powerful insights;
- unlock your potential;
- ultimate companion;
- intelligent route;
- game-changing experience;
- efficient progression;
- optimal synergy;
- friendly filler that delays the action.

Replace vague claims with the actual task, blocker, threshold, source state or reason.

## Security/provenance audit

Reject:

- `.env` or auth-state files;
- tokens, API keys, passwords, private keys, cookies or client secrets;
- private account email/connector metadata;
- copied private code, CSS, fonts, screenshots, assets or settings;
- arbitrary outbound domains;
- unsafe imported JSON;
- unsanitised remote HTML;
- workflows with unnecessary permissions.

Review secret-pattern matches as evidence, not by blindly suppressing documentation hits.

## Performance audit

- Do not fetch source content for every row at startup.
- Deduplicate in-flight/cached requests.
- Avoid mounting the complete corpus when a bounded working window is enough.
- Keep scoring and decisions pure/testable.
- Avoid repeated parsing/sorting on every render or keystroke.
- Do not add a UI kit, animation framework, backend or Three.js without measured need.

## Result format

```text
CLANKERSCAPE REVIEW — <target>
Status: READY | READY WITH FOLLOW-UP | NOT READY | BLOCKED

Blocker/high findings:
- file/route/state — defect — consequence

Route/source findings:
- ...

Decision findings:
- ...

Rendered UI findings:
- ...

Wiki/security findings:
- ...

Commands and evidence:
- ...

Coverage not verified:
- ...

Required repair:
- exact next action
```

Do not write `looks good`. State what was checked.
