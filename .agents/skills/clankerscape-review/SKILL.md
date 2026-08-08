---
name: clankerscape-review
description: Read-only release and PR audit for Clankerscape covering route evidence, region legality, Wiki safety, secrets, rendered UI, accessibility, and generic AI/SaaS fingerprints. Use after substantial changes and before a PR is marked ready.
---

# Clankerscape review

This is a read-only audit. Do not fix findings during the audit pass. Report exact evidence, then perform a separate repair pass.

## Establish scope

1. inspect branch, status, and diff;
2. identify changed routes, data, scripts, source claims, states, and viewports;
3. name the required evidence;
4. return `BLOCKED` rather than pretending unobserved behavior passed.

## Source and route audit

Check:

- every production task is Equilibrium, not Catalyst;
- source titles and revisions exist;
- totals reconcile or conflicts are documented;
- route tasks stay inside unlocked regions;
- dependencies, item sources, shops, teleports, and quests are region-safe;
- cumulative tasks hit 50/175/300/450 legally;
- cumulative points hit selected Relic thresholds legally;
- Blessing tasks hit 1/3/5/9/12/16/20/26 legally;
- provisional decisions retain invalidation conditions;
- no public player route or blacklisted source was copied;
- unknown time/mechanics are not represented as zero or confirmed.

## Wiki/security audit

Check:

- remote HTML is sanitized through one isolated boundary;
- no iframe, login, proxy, API key, or credentials;
- malformed responses fail closed;
- relative/unsafe links are handled;
- revision mismatch is visible;
- offline fallback remains useful;
- common secret/key patterns are scanned;
- no private code, CSS, art, fonts, screenshots, environment data, or repository credentials leaked;
- workflows use least required permissions.

## Rendered UI audit

Observe the actual application at laptop, desktop, and phone widths.

Check:

- first viewport performs route work;
- the route ledger dominates the composition;
- phase and preparation controls stay near affected data;
- route rows remain scannable;
- completion and Wiki actions do not conflict;
- dialog focus returns correctly;
- no horizontal overflow, clipping, collisions, or accidental dead space;
- loading, error, conflict, unavailable, completed, parked, and empty states;
- keyboard focus and reduced motion;
- console errors and failed requests.

## Anti-slop classification

### BUSTED

- marketing hero or CTA before the route;
- glass/aurora/blue-purple startup dashboard;
- feature-card garden or fake KPI strip;
- copied third-party RuneScape layout;
- generated art in the shipped site.

### TELL

- repeated status pills;
- uniform large radii/padding;
- idle glows;
- duplicated headings/totals/actions;
- generic “optimize your journey” copy;
- cards used where rows or a table are clearer;
- ornamental animation.

### WASHED

- all RuneScape identity and semantic state flattened into sterile grey wireframes;
- density removed in the name of cleanliness;
- useful source and region signals hidden to look minimal.

One BUSTED issue, three TELLs on one screen, or a meaningful WASHED issue prevents a pass.

## Result format

```text
CLANKERSCAPE REVIEW — <target>
Status: PASS | FAIL | BLOCKED

Source/route findings:
- ...

Wiki/security findings:
- ...

Rendered UI findings:
- ...

AI/SaaS fingerprints:
- BUSTED / TELL / WASHED ...

Evidence inspected:
- commands, routes, states, viewports, screenshots, traces

Coverage not verified:
- ...

Required repair:
- exact next action
```
