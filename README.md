# ClankerScape

ClankerScape is a read-only RuneScape 3 **Leagues II: Equilibrium** route to the 48,000-point Dragon trophy.

The primary public page shows one working route rather than asking the player to build one:

- regions: **Desert → Asgarnia → Anachronia**;
- relics: **Golden Touch → Animal Wrangler → Voidwalker → Crystal Grace → Production Master → Rejuvenated (+ Devout) → Infernal Fire**;
- combat: **Necromancy first**, with Magic added after Crystal Grace;
- blessings: **Big Boned → Abyssal Cinders → Avernic Rampage → Demon's Mark → True Equilibrium → Lord of Light → Tempered Heart → Genesis Essence**.

The checked-in task snapshot currently contains **533 Easy and Medium tasks worth 11,110 points**. Hard, Elite, and Master rows are still missing, so exact task-by-task ordering remains provisional even though the public strategy is fixed.

## Public site

GitHub Pages publishes the primary static route page at `/`. That route remains read-only: it has no progress controls, save state, forms, calculators, import/export, accounts, analytics, cookies, or remote database.

A separate **Combat UX prototype** is published at `/combat-prototype.html`. It is a presentation and interaction study for the companion Equilibrium combat interface, not a combat calculator and not a second stateful app. Its controls only switch prototype views and disclosures in the browser; it deliberately performs no combat calculation, persistence, analytics, API writes, accounts, or remote database work.

The prototype tests a focused-workbench design: one dominant stage, a narrow context rail, a concise resolved-summary rail, progressive disclosure for expert mechanics, and selective EverSense-Web-inspired instrument/print treatments. Its top prototype switch also exposes Instrument, Dark print, and Expert compact alternatives for direct visual comparison.

The visual system is intentionally shared with the companion Equilibrium project: compact near-black RuneScape tool surfaces, restrained gold and teal, serif display type, hard rules, and real RuneScape region/relic/Blessing/combat art. ClankerScape does **not** use generated art. Public image references are pinned to a specific Equilibrium repository revision so a deployment cannot silently change underneath the prototype or route; see [NOTICE.md](NOTICE.md) for attribution.

## Route research

The repository still keeps the source-locked task snapshot and route/relic/Blessing domain code for research and verification. Those tools are not product UI.

Refresh task data with:

```bash
npm run sync:tasks
npm run validate
```

The importer only reads numeric rows from `Equilibrium League/Tasks`; it will not mix in Catalyst tasks. A fully frozen row-by-row route still requires **1,152 tasks and 109,380 points** to reconcile.

## Checks

```bash
npm run verify
```

This runs syntax, source/data, parser, route, Blessing, Tier 6, read-only route UI, and Combat prototype regression checks.

RuneScape Wiki task text and referenced game art keep their source licences and attribution. See [NOTICE.md](NOTICE.md). RuneScape and Jagex are trademarks of Jagex Limited; this is an unofficial fan project.
