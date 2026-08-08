---
name: clankerscape-review
description: Perform a hostile-to-defects review of ClankerScape route data, UI, copy, security, and implementation without turning criticism into personal abuse.
---

# ClankerScape review

Use this after every substantial implementation unit and before a PR is marked ready.

Be severe about defects and conservative about claims. Critique the work, not the person.

## Severity

- **BLOCKER** — fabricated or stale route fact, secret exposure, broken build, inaccessible core action, data loss, copied prohibited content, or a decision that can permanently damage the route.
- **HIGH** — wrong scoring objective, bad region/relic/Blessing recommendation, Wiki source confusion, unusable responsive layout, or major AI-slop structure.
- **MEDIUM** — unclear hierarchy, hidden blocker, duplicated information, weak error state, fake precision, or avoidable performance cost.
- **LOW** — polish issue that does not change route correctness or core usability.

Do not dilute a BLOCKER with a long list of cosmetic notes.

## Route/data audit

Check:

- official 48,000-point target and 50/175/300/450 task thresholds;
- regional counts and points against current sources;
- distinction between Equilibrium facts and Catalyst stand-ins;
- source URL, verification date, and confidence for every route row;
- task tier and points values come from data rather than assumptions;
- no copied route ordering or commentary;
- phase-aware scoring changes at 450 tasks;
- final-region recommendation explains reachable rows;
- irreversible relic decisions have runner-ups and sensitivity notes;
- ordinary relics are not presented as resettable without proof;
- exactly three confirmed Blessing resets are accounted for unless current official data changes;
- completed history remains stable when future recommendations change.

## UI audit

Fail the design when:

- route rows are not visible immediately;
- a hero, decorative header, KPI strip, or marketing copy precedes the work;
- the route is fragmented into a card garden;
- glass, glow, blur, gradients, or giant rounded panels replace hierarchy;
- the next skilling or PvM action is hard to find;
- blocked rows lack blocker text;
- the page repeats the same progress fact in several panels;
- mobile hides queue switching or irreversible decisions;
- the modal confuses route commentary with live Wiki text;
- important information appears only on hover or through colour.

Inspect the rendered page at desktop and phone widths. Source review alone is insufficient.

## Copy audit

Search for vague product language and replace it with facts or actions.

Flag:

- optimise your journey;
- seamless;
- powerful insights;
- unlock your potential;
- ultimate companion;
- intelligent route;
- game-changing experience;
- friendly filler that delays the action.

Also flag unnatural clipped fragments, repetitive labels, and explanations that merely restate the heading.

## Source/Wiki audit

- Every route row declares a Wiki title or explicit source exception.
- Live fetch failures are visible.
- Plain text is rendered; unsanitised source HTML is not injected.
- The resolved source title and fetch time are shown.
- Cached text is labelled with age.
- Route commentary and Wiki text use different labels.
- No iframe embeds the full Wiki.
- Runtime requests are limited to approved domains.

## Security audit

Reject commits containing:

- `.env` files;
- auth state, cookies, or browser profiles;
- access tokens, API keys, passwords, private keys, or client secrets;
- private account email addresses or connector metadata;
- copied local settings;
- unreviewed outbound domains;
- unsafe imported JSON handling;
- unsanitised HTML injection.

Search at minimum for `AKIA`, `ghp_`, `github_pat_`, `Bearer `, `BEGIN PRIVATE KEY`, `client_secret`, `password=`, and token-like assignments.

## Performance audit

- Do not fetch Wiki pages for every row at startup.
- Deduplicate in-flight and cached source requests.
- Avoid rendering the full corpus when the current phase needs a bounded ledger window.
- Do not introduce heavy state, UI, animation, or Three.js dependencies.
- Keep scoring pure and testable.
- Avoid repeated parsing or sorting on every keystroke.

## Review output

Report findings in this order:

1. BLOCKER/HIGH issues with file and exact consequence.
2. Route/data correctness concerns.
3. UI and accessibility defects.
4. Security and provenance status.
5. Tests/build status.
6. A direct verdict: `READY`, `READY WITH FOLLOW-UP`, or `NOT READY`.

When no issue is found in a category, say what was actually checked. Do not write “looks good” without evidence.
