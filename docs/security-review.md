# Security, privacy, and source review

**Status:** implementation review complete for the current branch.

## Runtime surface

ClankerScape is a static, dependency-free application. It has no backend, authentication, analytics, cookies, advertising, remote database, proxy, service worker, or production package install.

Browser state contains only local route progress and estimates. The application does not collect a player name, account identifier, WikiSync identity, device fingerprint, or telemetry.

## Import/export

Progress imports:

- are capped at 2 MB;
- require the current schema version;
- are parsed as JSON data;
- are normalized into known fields;
- never render imported HTML;
- do not replace the canonical League facts/task snapshot.

Exports contain local state, export time, schema version, and source revision only.

## Source ingestion

The browser fetches only same-origin static JSON/CSS/ES modules and does not ingest unsanitized remote Wiki HTML. `scripts/sync-equilibrium-tasks.mjs` performs the source import in a controlled local/CI context and:

- uses a finite timeout;
- caps response size;
- removes scripts, styles, tags, and unsupported entities;
- extracts only numeric task rows;
- validates IDs, point tiers, and duplicates;
- refuses an empty snapshot;
- marks incomplete totals partial;
- writes nothing when the revision and parsed snapshot are unchanged.

Task text is escaped again before browser rendering.

## External links

Only reviewed official Jagex/RuneScape Wiki URLs are stored in the source snapshot. New-tab links use `noopener noreferrer`.

## Workflow permissions

- verification workflow: `contents: read`;
- source-sync workflow: `contents: write` only because it may commit a refreshed snapshot;
- Pages workflow: manual dispatch only, with `contents: read`, `pages: write`, and `id-token: write`;
- no secrets or third-party credentials are required.

## Secret/private-source scan

Application files contain no token, password, private key, cookie, account email, connector identifier, local auth state, private screenshot, private font, or copied private application source.

## Licensing and attribution

Original code/project-authored documentation remain under CC0. Populated Wiki task snapshots retain canonical URL, revision, fetch time, and CC BY-NC-SA 3.0 metadata; imported Wiki text is not represented as CC0. See `NOTICE.md`.

## Dependency/supply-chain result

Production dependency count: **zero**. GitHub Actions use reviewed first-party actions pinned to major versions. There is no runtime CDN or UI package.

## Verdict

PASS for code review. The manual Pages workflow stages only the static application files and has not been run. Repeat the review after any dependency, automatic deployment, backend, analytics, live remote browser fetch, or account integration is proposed.
