---
name: clankerscape-wiki
description: Live RuneScape Wiki retrieval, sanitization, revision, fallback, and dialog interaction rules for Clankerscape. Use before changing task imports, Wiki links, remote HTML, source freshness, caching, or the task information dialog.
---

# Clankerscape Wiki integration

Every actionable route row must be able to open current source context without losing route position. The Wiki is a source, not embedded application chrome.

## Public API only

Use the anonymous MediaWiki Action API with `origin=*`. Do not use a login, credential, proxy, iframe, bypass, or hidden scraping service.

Recommended request:

```text
https://runescape.wiki/api.php
?action=parse
&page=<encoded title>
&prop=text|revid|displaytitle
&format=json
&formatversion=2
&origin=*
```

Use `AbortController`, a finite timeout, and runtime response validation.

## Separate snapshot from live context

- Route legality uses a pinned, validated task snapshot.
- The dialog may fetch the current Wiki revision.
- A newer live revision does not silently mutate the route.
- Show a source-update warning and queue the task for review.

## Untrusted HTML boundary

Remote HTML is hostile until sanitized.

Allow only the smallest set needed for useful reading: headings, paragraphs, lists, simple tables, links, code, emphasis, and basic structural containers.

Remove:

- scripts;
- styles and inline style attributes;
- iframes and embeds;
- forms and inputs;
- event handlers;
- unsafe URLs;
- arbitrary remote classes/IDs;
- navigation chrome;
- unsupported media.

Strip or tightly restrict images in version 1. Rewrite relative Wiki links. External links use `noopener noreferrer`.

Isolate the only sanitized HTML render boundary in a small component with hostile fixtures.

## Dialog interaction

- Task title or row activation opens the dialog.
- Completion checkbox does not open it.
- Use correct accessible dialog semantics.
- Trap focus while open.
- Escape and close button close it.
- Restore focus to the originating row.
- Preserve the route scroll position.
- On phone, use a full-viewport dialog with a persistent close control.

## Loading and failure

Loading state names the page being requested. Do not use a generic spinner-only void.

On timeout, offline state, blocked request, malformed response, or sanitizer failure:

1. show the pinned local task title, description, and requirements;
2. label it as snapshot content;
3. retain a direct Wiki link;
4. keep completion controls usable;
5. never claim the live Wiki loaded.

## Caching

Cache successful responses by page title and revision for the current session. Do not persist large remote HTML blobs indefinitely. Do not cache malformed or failed responses as success.

## Importer

The complete task list is imported by a manual/build-time script and committed as normalized data. The client dialog is not the task database. Import validation must reconcile Jagex totals and retain page revision/provenance.

## Tests

Cover:

- encoded titles and anchors;
- CORS query construction;
- abort and timeout;
- malformed JSON;
- missing parse fields;
- hostile script/style/event fixtures;
- relative and unsafe links;
- revision mismatch;
- offline snapshot fallback;
- focus restoration and scroll preservation.
