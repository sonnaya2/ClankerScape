# Final adversarial audit

**Audit date:** 2026-08-07  
**Branch:** `planning/dragon-route-foundation`  
**Verdict:** application review-ready; exact route freeze blocked by incomplete canonical task rows.

## Severity summary

| Severity | Finding | Resolution |
|---|---|---|
| Blocker | Hard/Elite/Master task corpus is not yet fully available/reconciled | Website fails closed; six-hourly/manual source sync imports numeric rows and requires 1,152 / 109,380 |
| Blocker | True Equilibrium is resolved from the wrong domain in the current combat engine | All affected combat benchmarks rejected until relic alignment is sourced and resolver fixed |
| Route-impacting | Official FAQ conflicts on Daemonheim reward-shop access | Wilderness/Daemonheim value remains unscored where the shop matters |
| Critical correction | Rejuvenated had been treated as a working default | Removed; all missed Tier 1–5 relics must be priced |
| Critical correction | Perkfection was described too narrowly | All official utility/combat channels represented; proc uplift modeled as affected share ×20% |
| Critical correction | Ordinary late-game relic reset was entertained | Removed; only three Blessing-progression resets are tracked |
| Critical correction | 8% burden of proof was arbitrary | Replaced with max(30 minutes, 3% remaining P50) plus non-overlapping conservative ranges |
| Data correction | Relic-choice total was stated as 21 during investigation | Validator enforces the official count of 20 |
| Architecture correction | Vite/React were assumed before need was proven | First release is dependency-free static ES modules |

## Data integrity

Validated invariants:

- Dragon target: 48,000 points;
- official total: 1,152 tasks / 109,380 points;
- sum of published regional task totals: 1,152;
- sum of published regional point totals: 109,380;
- 20 relic choices;
- 24 Blessing cards;
- three Blessing resets;
- ordinary relic reset unavailable;
- task IDs unique and numeric when present;
- valid task point bands only;
- `Equilibrium League/Tasks` source only;
- exact relic-tier and Blessing-slot/path cardinalities;
- exact relic, Blessing, region, and automatic Karamja thresholds.

The repository includes a fail-closed unavailable placeholder until source sync succeeds. A successful sync may replace it with the current partial canonical rows, but route freezing remains blocked until exact totals reconcile. This prevents a stale Catalyst corpus or speculative rows from masquerading as Equilibrium data. New rows enter `unclassified` and count toward no point bank until reviewed; the importer does not manufacture skilling/PvM categories.

## Route findings

### Region totals are insufficient

Misthalin, Havenhythe, Karamja, and Global already contain a large theoretical point pool, but that says nothing about time-to-Dragon. Many points may require levels, gear, bosses, long chains, or unavailable combinations. Region choice therefore uses reachable points and P50/P90 time rather than total points.

No elective region is recommended until task-level portfolios exist.

### Mixed queue is mandatory

A Dragon route should not be “skilling” or “PvM” as a single identity. It needs both immediate queues because their marginal value changes with gear, levels, supplies, fatigue, retries, and shared setup. The site keeps both next actions visible and a reserve bank separate.

### Reserve must be executable

The 4,000-point reserve is counted from real unfinished tasks assigned to the reserve bank. It is not calculated from total unclaimed League points.

## Perkfection audit

Perkfection can save time in five different ways:

1. setup/material acquisition;
2. machine throughput/capacity when critical-path output is required;
3. charge maintenance;
4. workbench/blueprint travel and access;
5. augmented combat through two extra gizmos and more-frequent helpful proc perks.

The fifth channel is intentionally conservative. A 20% increase in helpful-perk trigger frequency scales only the throughput attributable to those perks. It does not multiply total combat damage by 1.20.

The three shipped presets produce approximately 73, 163, and 332 minutes saved. They are sensitivity examples, not empirical route measurements.

Perkfection remains unscored until at least one plausible Rejuvenated relic has a positive remaining-route minute estimate.

## Rejuvenated audit

The comparator set is every missed Tier 1–5 relic. The best option can be a broad route engine rather than the apparently strongest combat pick.

The audit specifically corrected narrow readings of Animal Wrangler, Antiquarian, and Devout. Their cross-domain value must be included before Rejuvenated can be rejected.

## Reset audit

The user’s proposed late-game “redo the relics” strategy is not supported by published rules. Ordinary relics remain permanent choices.

The only reset strategy implemented is for Blessing progression:

- maximum three resets;
- each reset archives the current epoch;
- reset does not change relics;
- late reset must repay before Dragon after rebuild/setup cost;
- blocked combat mechanics cannot be decisive.

## UI/render audit

Observed render checks:

| Viewport | Result |
|---|---|
| 1600×900 | 8/8 route rows fully above fold; no document overflow; no console/page errors |
| 1280×800 | 8/8 route rows fully above fold; no document overflow; no console/page errors |
| 390×844 | route and both next-action queues visible before deep status; no document overflow; no console/page errors |

A separate populated partial-snapshot pass exercised task classification, parking, completion accounting, source-dialog labeling/focus restoration, and row density. It retained 8/8 rows above fold at 1600×900 and 1280×800, with no document overflow or console/page errors at desktop, laptop, or 390×844.

All five tabs were rendered at desktop and phone widths. Keyboard Left/Right/Home/End navigation moves selection and focus through a real tablist; each active view is a labelled tabpanel, and Dragon progress exposes numeric progressbar semantics. The source dialog restores focus to its task action after closing. Wide region/Blessing tables scroll inside their own surfaces rather than widening the document.

A denied-storage pass also remained interactive instead of throwing: state continued in memory and the header visibly marked local progress as not persisted.

The interface intentionally contains no hero, KPI card strip, generated fantasy art, translucent glass, ambient animation, or “AI insight” panel.

## Security/privacy audit

The implemented application:

- has no production dependency;
- makes only same-origin requests for its two static JSON files; Wiki ingestion runs locally/in CI rather than in the browser;
- stores progress locally;
- exports/imports versioned JSON;
- rejects imports above 2 MB;
- renders imported values as data/text;
- has no account, analytics, cookies, remote database, proxy, or credentials;
- uses `noopener noreferrer` for external tabs;
- sanitizes displayed task text through plain-text extraction and HTML escaping;
- refuses empty or duplicate task snapshots;
- skips commits when a scheduled source check finds the same revision and parsed rows;
- retains RuneScape Wiki attribution/licence metadata for imported task text.

## Remaining work after full task publication

1. Run source sync and inspect parser output.
2. Verify all five tiers, locality mappings, requirements, duplicate IDs, and exact totals.
3. Add initial task classifications and time estimates with provenance.
4. Build reachable portfolios for every region package.
5. Re-score all Tier 1–7 relic decisions against the actual remaining route.
6. Import corrected combat benchmarks only after known source conflicts are resolved.
7. Run P50/P90 route simulations and freeze the first executable Dragon route.
8. Repeat render, security, and full-diff review before merge/deployment.
