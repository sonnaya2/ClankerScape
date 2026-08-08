# Security, privacy, and source review

Status: revised pre-implementation planning branch.

## Scope

Base repository:

- `README.md`
- `LICENSE`

Draft PR #2 currently changes only Markdown planning/review files:

- `plan.md`
- `docs/design-direction.md`
- `docs/grok-heavy-ui-prompt.md`
- `docs/grok-ui-audit.md`
- `docs/combat-benchmark-plan.md`
- `docs/true-equilibrium-source-conflict.md`
- `docs/planning-review.md`
- `docs/skills-audit.md`
- this review
- three project-specific skills under `.agents/skills/`

There is no application runtime, package manifest, workflow, generated build, executable script, copied asset or deployed site in this branch.

## Base repository result

The initial repository contained a CC0 licence and short README. No credential, token, environment value, private key, cookie, auth state, account identifier or source secret was present.

## Excluded data

Nothing in this PR was copied from Equilibrium or EverSense-Web that could expose:

- `.env` or example environment values;
- local Claude/agent settings;
- browser profiles or saved login state;
- API keys, access tokens, cookies or session IDs;
- connector metadata;
- account email addresses;
- private screenshots or visual-reference assets;
- fonts;
- deployment credentials/configuration;
- unrelated private-repository code;
- local materialisation paths or machine usernames.

The owner-supplied Grok HTML and local screenshots were reviewed but not committed.

## Secret-pattern gate

Every PR diff must be reviewed for common access-key/token/private-key patterns, credential assignments, credential-bearing URLs, account emails and connector/session identifiers.

Documentation may name a pattern as part of a security checklist. A textual checklist hit is reviewed separately from an actual high-entropy value or assignment.

## Revised final diff scan

Draft PR #2 was re-scanned after the route correction, Grok audit, combat benchmark contract and True Equilibrium source-conflict record were added.

Changed-file inventory:

- 12 Markdown files;
- no executable code;
- no package/lockfile;
- no workflow;
- no generated output;
- no image/font/binary asset;
- no browser state;
- no environment/configuration file.

Searches/checks performed:

- connector/session identifiers;
- common private-account email domains;
- private-key delimiters;
- model/cloud/GitHub token prefixes and common encoded-token openings;
- local sandbox/materialisation paths;
- credential-bearing assignments/URLs;
- private implementation/assets copied from EverSense-Web;
- blacklisted repository content;
- owner-supplied Grok source/screenshots;
- raw connector responses or private account metadata copied into the new source-conflict report.

Result:

- no credential-shaped value or assignment;
- no account email address;
- no connector or session identifier;
- no private-key material;
- no cookie/auth state;
- no local path;
- no hidden outbound-service configuration;
- no copied private source, CSS, font, image or screenshot;
- no copied Grok code or asset;
- no blacklisted repository material;
- no private connector payload in the True Equilibrium conflict report.

This result applies to the planning PR only. It does not cover future dependencies, workflows, GitHub secrets, runtime requests, imported data or deployed output.

## Runtime threat model

### Canonical Wiki task content

Risk:

- remote HTML/script/style/event-handler injection;
- malformed or unexpectedly large task-page responses;
- duplicate/missing numeric task rows;
- source revision changes;
- CORS/Cloudflare/network failure;
- excessive requests.

Controls:

- anonymous public MediaWiki API only;
- no credentials, proxy, iframe, JSONP or hidden relay;
- finite timeout and response-size ceiling;
- parse in an inert document;
- locate exactly one row by numeric `data-taskid`;
- sanitise or convert only the extracted task fragment to structured/plain text;
- strip scripts, styles, forms, iframes, event handlers and unsafe URLs;
- cache the canonical page by source revision instead of fetching it per row;
- validate response shape and fail closed;
- show missing, duplicate, stale, CORS, offline and timeout states;
- retain a local route snapshot and direct Wiki link;
- test CORS from the real GitHub Pages origin before calling the architecture proven.

### Related article links

Risk:

- arbitrary remote destinations or tab takeover.

Controls:

- build links from explicit reviewed source records;
- allow only approved Jagex/Wiki/mechanic domains;
- never trust links copied from unsanitised remote markup;
- use `noopener noreferrer` for new tabs;
- show destination/source labels.

### Imported progress JSON

Risk:

- oversized/malicious payload;
- prototype pollution or invalid state;
- route corruption;
- imported text rendered as HTML.

Controls:

- strict file-size cap;
- parse as data only;
- versioned schema validation;
- ignore unknown keys;
- normalise task IDs against the current corpus;
- preserve source facts/route definition as immutable;
- preview replacement and retain a rollback copy;
- render notes as text only.

### Local storage

Risk:

- stale schema;
- corrupt state;
- accidental personal-data collection.

Controls:

- store task IDs, decisions, queue states, notes and optional local timestamps only;
- no player name, WikiSync account data, analytics, cookies or device fingerprinting;
- version/normalise state;
- provide reset/export controls.

### Combat benchmark imports

Risk:

- stale/incompatible benchmark schema;
- unsupported mechanics presented as complete;
- engine result confused with route estimate;
- untrusted metadata/text;
- known source/implementation conflicts imported as valid results.

Controls:

- schema/version/engine-commit validation;
- require opening state, target, metric denominator, support/exclusion and RNG metadata;
- treat imported strings as data/text only;
- reject incompatible or incomplete results;
- keep route-level setup/failure/supply estimates separate from engine output;
- reject True Equilibrium results derived from Blessing paths or lacking selected relic-alignment provenance.

### Dependencies and workflows

Risk:

- unnecessary supply-chain surface;
- malicious package scripts;
- over-broad workflow permissions;
- leaked source maps/build files.

Controls:

- minimal stack;
- no UI kit, analytics SDK, animation framework, backend client or Three.js without measured need;
- pin/review lockfile and package scripts;
- least-privilege Pages workflow;
- inspect generated output/source maps before deployment;
- run dependency/security tooling before merge.

## Source-integrity policy

Primary:

- current official Jagex League announcements/rules;
- current canonical RuneScape Wiki Equilibrium pages;
- provenanced canonical data in `sonnaya2/Equilibrium`.

Current official Jagex text/card art overrides an older repository interpretation when they conflict. Repository code or passing tests are not source authority.

Conditional mechanics only:

- PvME;
- RS Analysis;
- official library/framework documentation.

Forbidden route/code sources:

- `RS3-Dev/TheRSGuide.com`;
- public user route pages;
- Reddit;
- YouTube comments;
- Facebook;
- Twitter/X;
- copied layouts/code from other RS3 tools;
- Catalyst stand-ins presented as Equilibrium truth.

Archive.org may be used only as a labelled historical last resort and cannot silently override newer official data.

## Public/private boundary

The public repository may contain:

- rewritten project skills;
- public source URLs;
- clearly labelled route assumptions;
- public source-conflict reports;
- versioned benchmark metadata/results;
- reviewed game icons later when licensing/provenance is documented;
- generated build output only when the Pages workflow requires it.

It must not contain:

- private repository material unrelated to ClankerScape;
- private reference screenshots/fonts/assets;
- Grok source/screenshots;
- login credentials/auth state;
- connector responses;
- private attachments/account details.

## GitHub Pages

Pages remains unconfigured in this planning phase. There is no approved application to deploy.

After an approved workflow exists, the owner may need to select GitHub Actions as the Pages source in repository settings. Do not claim a live deployment until the URL is verified.

## Verdict

**PASS for the 12-file revised planning PR diff.**

No shared secret or private account/source material was identified. Repeat the full review after application code, dependencies, workflows, runtime Wiki requests, import/export and build output exist.
