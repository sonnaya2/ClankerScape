# League data contract

## Authority

1. Current official Jagex League announcements/rules.
2. Canonical RuneScape Wiki Equilibrium pages and numeric task IDs.
3. Reviewed repository snapshots with source URL, revision, and verification date.
4. Combat repositories only when their implementation agrees with stronger sources.

Repository code, tests, comments, and old snapshots are evidence—not authority.

## Task snapshot

`data/equilibrium-tasks.snapshot.json` is accepted as complete only when:

- source page title is `Equilibrium League/Tasks`;
- all task IDs are numeric and unique;
- all point values map to a known tier;
- task count is 1,152;
- point sum is 109,380;
- `coverage.status` is `full`;
- `coverage.reconciled` is true.

Any other state is partial/unavailable and blocks final route freezing. Imported rows begin `unclassified` and do not enter any route bank until a player/reviewer explicitly assigns them.

## Source importer

`scripts/sync-equilibrium-tasks.mjs`:

- requests parsed Wiki HTML plus revision ID;
- sets a finite timeout and 20 MB response ceiling;
- strips script/style/markup into text;
- finds task rows only by numeric `data-taskid`/ID;
- validates point tiers;
- rejects duplicate IDs;
- writes a revisioned snapshot;
- performs no write/commit when revision and parsed content are unchanged;
- runs six-hourly after merge and can be dispatched manually;
- never falls back to Catalyst data.

## League facts

`data/league-facts.json` contains reviewed official-card and League-frame facts. `scripts/validate-data.mjs` enforces cross-record totals and choice/reset counts.

A factual change must update:

- the smallest affected record;
- source/provenance fields;
- verification date;
- tests/invariants when the domain contract changes.

Conflicting sources remain explicit records. They are not blended into a convenient answer.

## Imported-content licence

Original ClankerScape records are project-authored. Task names/information/requirements parsed from the RuneScape Wiki retain the snapshot's canonical source, revision, and CC BY-NC-SA 3.0 metadata. See `NOTICE.md`; imported material is not silently relicensed under the repository's CC0 licence.
