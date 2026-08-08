# Security, privacy, and source review

Status: pre-implementation planning branch.

## Scope reviewed

Base repository at the start of this pass:

- `README.md`
- `LICENSE`

Planning additions:

- `plan.md`
- `docs/design-direction.md`
- `docs/skills-audit.md`
- `docs/grok-heavy-ui-prompt.md`
- `docs/planning-review.md`
- this review
- three project-specific skill files under `.agents/skills/`

There is no application runtime, dependency manifest, workflow, build output, or deployed site in this branch yet.

## Base repository result

The original repository contained a CC0 license and a two-line README. No credential, token, environment value, private key, cookie, auth state, account identifier, or source secret was present.

## Data intentionally excluded

The following were not copied from Equilibrium or EverSense-Web:

- `.env` or `.env.example` files;
- local Claude/agent settings;
- browser profiles or saved login state;
- API keys, access tokens, cookies, or session IDs;
- GitHub connector metadata;
- account email addresses;
- private screenshots or design-reference assets;
- deployment configuration containing credentials;
- unrelated private-repository code;
- local paths or machine usernames.

## Secret-pattern gate

Every PR diff must be checked for at least:

```text
AKIA
ASIA
ghp_
gho_
ghu_
ghs_
ghr_
github_pat_
Bearer 
BEGIN PRIVATE KEY
BEGIN RSA PRIVATE KEY
BEGIN OPENSSH PRIVATE KEY
client_secret
clientSecret
password=
password:
api_key
apiKey
access_token
refresh_token
sessionid
cookie:
```

A textual match is reviewed rather than blindly suppressed. Documentation may name a pattern as part of this checklist; that does not make it a credential. Actual high-entropy values or assignments are blockers.

## Current planning-content review

The authored planning content contains:

- public repository names already supplied by the owner;
- public Jagex and RuneScape Wiki source concepts;
- project-specific route/design rules;
- names of private-repository skill files intentionally disclosed by the owner;
- no secret values.

The files do not contain:

- user email addresses;
- passwords;
- account login details;
- tokens;
- private keys;
- cookies;
- hidden connector IDs;
- copied private source code.

## Final PR diff scan

Draft PR #2 was reviewed across all nine changed files after the planning review was added.

Checks performed:

- verified that the changed-file list contains only planning, design, review, provenance, and project-skill Markdown files;
- searched the complete patch for connector/session metadata and common private-account email domains;
- searched for private-key delimiters and common token prefixes/encodings;
- reviewed expected matches inside this document's secret-pattern checklist separately from real assignments or high-entropy values;
- checked that no application configuration, dependency file, workflow, generated asset, browser state, or executable source entered the planning PR;
- checked that the private EverSense contribution is described as rewritten project rules rather than copied code or visual assets.

Result:

- no credential-shaped value or assignment;
- no email address;
- no connector or session identifier;
- no private key material;
- no cookie or auth state;
- no hidden outbound service configuration;
- no copied private image or implementation file.

This scan covers the planning PR only. It does not cover future dependencies, GitHub Actions secrets, runtime requests, import/export code, or deployed build output.

## Runtime threat model for implementation

### Live Wiki content

Risk:

- injecting untrusted or unexpectedly complex Wiki HTML;
- source page changes;
- CORS/network failure;
- excessive requests.

Controls:

- use `action=query` with plain-text extracts;
- never inject unsanitised HTML;
- render route commentary separately from source text;
- fetch only when a row is opened;
- deduplicate in-flight requests;
- cache successful extracts in session storage with timestamp;
- display missing-page, stale-cache, and network-error states;
- maintain an outbound-domain allowlist.

### Imported progress JSON

Risk:

- oversized or malicious payloads;
- prototype pollution or invalid state;
- route corruption.

Controls:

- cap file size;
- parse as data only;
- validate every field against a versioned schema;
- ignore unknown keys;
- normalise IDs against the current route corpus;
- never render imported strings as HTML;
- offer a preview before replacement;
- preserve a rollback copy in local storage.

### Local storage

Risk:

- stale schema;
- corrupt state;
- accidental collection of personal data.

Controls:

- store task IDs, route choices, and progress only;
- no names, account IDs, WikiSync data, analytics, or device fingerprinting;
- version and normalise state;
- provide clear reset/export controls.

### External links

Risk:

- unexpected domains or tab takeover.

Controls:

- build links from explicit source records, not arbitrary fetched markup;
- allow Jagex, RuneScape Wiki, and approved mechanic sources only;
- use `rel="noopener noreferrer"` for new tabs;
- show the destination label.

### Dependencies

Risk:

- unnecessary supply-chain surface.

Controls:

- keep the stack minimal;
- no UI kit, analytics SDK, animation framework, or backend client;
- pin lockfile versions;
- review package scripts;
- run audit tooling before merge;
- avoid dependencies for functionality easily implemented safely in a few lines.

## Source-integrity policy

Allowed primary sources:

- official Jagex League announcements and rules;
- current RuneScape Wiki Equilibrium pages;
- provenanced data in `sonnaya2/Equilibrium`.

Conditional mechanic sources:

- PvME;
- RS Analysis;
- official library/framework documentation during implementation.

Forbidden route/code sources:

- `RS3-Dev/TheRSGuide.com`;
- public user route pages;
- Reddit;
- YouTube comments;
- Facebook;
- Twitter/X;
- copied layouts or code from other RS3 tools;
- Catalyst stand-ins presented as Equilibrium truth.

Archive.org may be used only as a clearly labelled last-resort historical snapshot. An archived value cannot silently override a newer official source.

## Public/private boundary

The public ClankerScape repository may contain:

- rewritten project-specific skills;
- public source URLs;
- route assumptions and benchmarks;
- generated build output only if the chosen Pages workflow requires it;
- game icons with reviewed provenance/licensing.

It must not contain:

- private repository material unrelated to ClankerScape;
- private visual-reference screenshots;
- login credentials or auth state;
- connector responses;
- private issue attachments;
- private account information.

## GitHub Pages status

Pages has not been enabled in this planning phase. There is no boilerplate to deploy, and implementation is intentionally waiting for approval. If the GitHub connector cannot change the Pages source after a workflow exists, the user must enable GitHub Actions as the source in repository settings. Do not claim deployment before verifying the live URL.

## Current verdict

**PASS for the complete planning PR diff.**

No shared secret or private account data has been identified. The implementation phase must repeat this review after dependencies, workflows, runtime source requests, and import/export code exist.
