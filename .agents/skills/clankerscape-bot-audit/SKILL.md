---
name: clankerscape-bot-audit
description: Run a read-only anti-slop audit of ClankerScape UI and copy after substantial visual work.
---

# ClankerScape bot audit

Read-only. Compare the rendered app and source against `clankerscape-ui`.

## Severity

- **BUSTED** — instantly reads as generated SaaS, admin console, or generic dashboard.
- **TELL** — suspicious in aggregate.
- **SMELL** — acceptable alone, bad in clusters.
- **WASHED** — anti-slop cleanup erased RuneScape identity or useful density.

## Sweep

Check for:

- hero/CTA, KPI tiles, card gardens, empty status rails, dead acreage;
- gradients, glass, glow, blur, uniform radii, navy dashboard chrome;
- repeated badges, repeated totals, placeholder initials used as fake icons;
- desktop tables merely clipped inside phone scroll boxes;
- internal model terms exposed as controls;
- one control repeated in every row when it can live in task details;
- title-case microcopy, slogans, generic claims, unexplained abbreviations, or warnings with no action;
- missing RuneScape material, path colour, tier structure, or progression identity;
- cleanup that turns every page into the same beige wireframe.

## Report

```text
BOT AUDIT — <target>
BUSTED (n): location — finding — reason
TELL   (n): ...
SMELL  (n): ...
WASHED (n): ...
Verdict: BUSTED | SUSPICIOUS | WASHED | PASSES
Coverage not verified: ...
```

Any BUSTED finding, three TELLs on one screen, or meaningful WASHED finding prevents `PASSES`.
