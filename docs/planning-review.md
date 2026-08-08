# Adversarial planning review — draft PR #2

Review target: `planning/dragon-route-foundation`  
Review scope: route correctness, information architecture, source integrity, and implementation readiness

## Verdict

**READY FOR USER APPROVAL. NOT READY FOR MERGE OR FULL IMPLEMENTATION.**

The PR succeeds at its current job: it defines a coherent first-to-Dragon thesis, a non-SaaS route-workbench structure, project-specific skills, source boundaries, and a fresh-context handoff. It deliberately does not prove the final row-by-row route or the rendered UI.

No application code should be added until the seven decisions in `plan.md` section 17 are approved.

## Blockers

### 1. The final Equilibrium task corpus is not available to this review

**Consequence:** the exact ordering, point curve, time estimates, final-region comparison, and relic sensitivity tests cannot be validated.

The Equilibrium repository task layer still exposes a Catalyst stand-in contract rather than a current sourced Equilibrium corpus. The current Wiki task page could not be read in this environment. The plan correctly stops at a macro route instead of filling the gap with remembered or plausible tasks.

Required before a row-level route exists:

- ingest the current task table;
- retain task IDs, tiers, points, regions, requirements, sources, and verification dates;
- verify totals against the current official table;
- reject any row whose tier or point value is not sourced;
- regenerate the route from the sourced corpus.

### 2. The irreversible choices are awaiting owner approval

**Consequence:** implementation now would harden disputed assumptions into UI and data contracts before the route is accepted.

Pending decisions:

- Desert → Asgarnia → default Anachronia;
- Golden Touch → Superheated → Assassin's Insight → Crystal Grace → Production Master → Perkfection → Infernal Fire;
- Big Boned → Abyssal Cinders → Avernic Rampage → Demon's Mark;
- the two late-Blessing benchmark branches;
- the single-screen ledger composition;
- Vite/React static architecture;
- the plain-text Wiki modal.

## High-risk assumptions that remain provisional

### Final region

Anachronia is a credible default because its official pool has high point density and a useful mix of skilling and PvM. That is not enough to make it automatic.

The implementation must compare account-reachable rows at task 450. When projected values overlap within the estimate uncertainty, show the close result rather than inventing a hidden margin or silently forcing Anachronia.

### Tier 6 relic

Perkfection is a strong mixed-route default with Asgarnia because it supports Invention tasks, machines, materials, additional gizmos, and late PvM. Rejuvenated can still win if a second earlier relic produces a larger reachable task or point bank.

This choice requires a task-corpus benchmark. Card text alone is not enough.

### Tier 7 relic

Infernal Fire is the speed default, not a universal safety choice. Icyenic Faith or Naragi Edict can be faster in practice if the offensive pick causes repeated deaths, supply rebuilding, or failed high-value encounters.

The UI should present this as a risk branch rather than a simplistic damage ranking.

### Late Blessings

The crit/Inferno path and the Envenomed/Power Archive path need different targets and infrastructure. Neither is final from card text alone.

Benchmark inputs must include:

- poison immunity;
- target size and multi-target value;
- available perks and stored gizmos;
- critical-strike profile;
- kill duration;
- useful equipment set effects;
- gear quality and failure rate.

The Order/Genesis Essence route is a recovery branch for weak gear, not evidence that the default route failed.

### True Equilibrium

The plan correctly requires canonical relic alignment data. Do not infer alignment from card position, icon colour, route prose, or apparent variety.

Until the alignment field is sourced, any displayed True Equilibrium total is unverified.

## Data-model review

The plan understands the important boundary: source facts and route estimates are different things. The illustrative `RouteTask` interface currently nests estimates and synergy beside sourced fields. That is acceptable as documentation but must not become one mutable persistence record.

Implementation should separate:

```ts
interface TaskFact {
  // sourced and versioned fields only
}

interface RouteAssumption {
  taskId: string;
  // time, RNG, failure risk, synergy and confidence
}

interface PlayerTaskState {
  taskId: string;
  // completed, blocked, queued, skipped and local notes
}
```

Join these at the route-engine boundary. A scoring pass must not rewrite source facts, and imported player state must not modify the route corpus.

## UI review

### Structural result: pass for planning

The proposed composition is appropriate:

- the route ledger owns the page;
- progress is compact;
- skilling and PvM actions remain simultaneously available;
- region, relic, and Blessing decisions stay adjacent to the route;
- the Wiki wrapper separates route commentary from live source text;
- there is no hero, CTA strip, fake metric garden, glass stack, or ambient animation plan.

### Rendered result: blocked

There is no application, browser route, CSS, responsive state, console output, network trace, screenshot, or keyboard interaction to inspect. A source-only plan cannot pass rendered QA.

The first implementation review must verify:

- eight real rows above the fold at the target desktop width;
- the side rail does not become a vertical card garden;
- the ledger remains readable at laptop width;
- mobile does not hide queue switching or the next irreversible choice;
- the modal traps and restores focus;
- source loading, missing, stale, and error states are legible;
- reduced motion removes nonessential transitions;
- no decorative gradient, glow, or blur residue appears.

### Main visual failure risk

The likely failure is not insufficient decoration. It is turning every useful switchboard section into a bordered card until the page becomes the dashboard the plan rejects.

Begin with one ledger surface and one rail surface. Add an inner boundary only when it clarifies a real interaction or state group.

## Wiki-wrapper review

The plain-text, on-demand MediaWiki approach is the right default for a static Pages app.

Required implementation checks:

- test cross-origin requests from the deployed Pages origin;
- use a declared page title from the task record;
- deduplicate concurrent requests;
- cap cached text and storage age;
- label cached data as cached;
- render source text as text rather than source markup;
- preserve a direct article link when the API fails;
- treat redirects and missing pages explicitly;
- do not prefetch the corpus.

## Security and provenance review

**PASS for the planning PR.** The complete result is recorded in `docs/security-review.md`.

The public/private boundary is appropriately conservative: the PR records which private skills informed the project, but publishes rewritten ClankerScape rules rather than private code or screenshots.

## Copy review

The user-facing examples are direct and task-oriented. The planning files avoid sales claims and generic product slogans.

Implementation warning: do not turn scoring reasons into polished pseudo-intelligence such as `ClankerScape recommends this optimal action`. Show the actual reason, such as `3 nearby tasks share the same bar batch` or `opens Desert at 175`.

## Scope review

The proposed stack is intentionally small. That is correct.

Do not add:

- Next.js merely because Equilibrium uses it;
- a backend;
- authentication;
- analytics;
- a component library;
- a state framework;
- an animation package;
- Three.js;
- a second route before the main route screen works.

The first useful release is one sourced route screen, local progress, two queues, decision gates, and a reliable Wiki modal.

## Approval recommendation

Approve the package only if the seven decisions in `plan.md` section 17 match the intended race strategy.

After approval, the correct next unit is the smallest static scaffold plus schemas and validators. It is not a polished mock dashboard and it is not a hand-written list of unsourced tasks.
