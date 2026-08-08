import {
  PERKFECTION_PRESETS,
  bestRejuvenatedCandidate,
  calculatePerkfectionSavings,
  evaluateTierSixDecision,
  finiteNonNegative,
} from './domain/perkfection.js';
import {
  BLESSING_PATHS,
  MAX_BLESSING_RESETS,
  activeBlessingIds,
  createBlessingState,
  currentBlessingEpoch,
  godTierAlignments,
  resetBlessingProgression,
  setBlessingPick,
} from './domain/blessings.js';
import {
  BANKS,
  completedTaskTotals,
  electiveSelectionValid,
  nextQueueAction,
  nextRegionGate,
  regionProjection,
  routeCoverage,
  taskCoverageGate,
  taskStateFor,
  theoreticalSelectedPool,
} from './domain/route.js';

const STORAGE_KEY = 'clankerscape:v1';
const STATE_VERSION = 1;
const app = document.querySelector('#app');
const header = document.querySelector('#topbar-state');
const importInput = document.querySelector('#import-progress');
const taskDialog = document.querySelector('#task-dialog');
const taskDialogBody = document.querySelector('#task-dialog-body');

const defaultPerkInputs = { ...PERKFECTION_PRESETS.balanced };
const TASK_BANK_OPTIONS = Object.freeze(['unclassified', ...BANKS]);

function defaultState() {
  return {
    version: STATE_VERSION,
    activeTab: 'route',
    points: 0,
    completedTasks: 0,
    electedRegions: [],
    routeBankFilter: 'all',
    routeSearch: '',
    taskState: {},
    relicSelections: {},
    rejuvenatedSavings: {},
    perkInputs: { ...defaultPerkInputs },
    regionInputs: {},
    blessing: createBlessingState(),
    reserveTarget: 4000,
  };
}

let facts = null;
let snapshot = null;
let state = defaultState();
let loadError = null;
let storageAvailable = true;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function safeUrl(value) {
  try {
    const url = new URL(value, window.location.href);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : '#';
  } catch {
    return '#';
  }
}

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(Number(value) || 0);
}

function formatMinutes(value) {
  const minutes = finiteNonNegative(value);
  if (minutes < 60) return `${formatNumber(minutes, 1)}m`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes - hours * 60;
  return remainder < 0.1 ? `${hours}h` : `${hours}h ${formatNumber(remainder, 0)}m`;
}

function normaliseBlessingState(value) {
  const fallback = createBlessingState();
  if (!value || !Array.isArray(value.epochs)) return fallback;
  const epochs = value.epochs
    .filter((epoch) => epoch && Array.isArray(epoch.picks))
    .map((epoch, index) => ({
      id: Number.isInteger(epoch.id) ? epoch.id : index + 1,
      createdAt: typeof epoch.createdAt === 'string' ? epoch.createdAt : null,
      ...(typeof epoch.closedAt === 'string' ? { closedAt: epoch.closedAt } : {}),
      picks: Array.from({ length: 6 }, (_, pickIndex) => {
        const pick = epoch.picks[pickIndex];
        return BLESSING_PATHS.includes(pick) ? pick : null;
      }),
    }));
  return {
    resetsUsed: Math.min(MAX_BLESSING_RESETS, Math.max(0, Number(value.resetsUsed) || 0)),
    epochs: epochs.length ? epochs : fallback.epochs,
  };
}

function normaliseState(value) {
  const base = defaultState();
  if (!value || typeof value !== 'object') return base;
  const electedRegions = Array.isArray(value.electedRegions)
    ? [...new Set(value.electedRegions.filter((id) => typeof id === 'string'))].slice(0, 3)
    : [];
  return {
    ...base,
    activeTab: ['route', 'relics', 'regions', 'blessings', 'sources'].includes(value.activeTab)
      ? value.activeTab
      : base.activeTab,
    points: finiteNonNegative(value.points),
    completedTasks: finiteNonNegative(value.completedTasks),
    electedRegions,
    routeBankFilter: value.routeBankFilter === 'all' || TASK_BANK_OPTIONS.includes(value.routeBankFilter)
      ? value.routeBankFilter
      : 'all',
    routeSearch: typeof value.routeSearch === 'string' ? value.routeSearch.slice(0, 100) : '',
    taskState: value.taskState && typeof value.taskState === 'object' ? value.taskState : {},
    relicSelections: value.relicSelections && typeof value.relicSelections === 'object' ? value.relicSelections : {},
    rejuvenatedSavings: value.rejuvenatedSavings && typeof value.rejuvenatedSavings === 'object'
      ? value.rejuvenatedSavings
      : {},
    perkInputs: { ...base.perkInputs, ...(value.perkInputs && typeof value.perkInputs === 'object' ? value.perkInputs : {}) },
    regionInputs: value.regionInputs && typeof value.regionInputs === 'object' ? value.regionInputs : {},
    blessing: normaliseBlessingState(value.blessing),
    reserveTarget: finiteNonNegative(value.reserveTarget, 4000),
  };
}

function loadLocalState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = normaliseState(JSON.parse(raw));
  } catch {
    storageAvailable = false;
    state = defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
}

function updateState(mutator, { render = true } = {}) {
  const next = mutator(structuredClone(state));
  state = normaliseState(next ?? state);
  saveState();
  if (render) renderApp();
}

async function loadData() {
  const [factsResponse, tasksResponse] = await Promise.all([
    fetch('./data/league-facts.json', { cache: 'no-store' }),
    fetch('./data/equilibrium-tasks.snapshot.json', { cache: 'no-store' }),
  ]);
  if (!factsResponse.ok) throw new Error(`League facts returned HTTP ${factsResponse.status}`);
  if (!tasksResponse.ok) throw new Error(`Task snapshot returned HTTP ${tasksResponse.status}`);
  facts = await factsResponse.json();
  snapshot = await tasksResponse.json();
}

function currentTotals() {
  const sourced = completedTaskTotals(snapshot?.tasks ?? [], state);
  return {
    points: Math.max(state.points, sourced.points),
    tasks: Math.max(state.completedTasks, sourced.tasksCompleted),
    sourcedPoints: sourced.points,
    sourcedTasks: sourced.tasksCompleted,
  };
}

function nextRelicThreshold(points) {
  return facts.relicThresholds.find((entry) => points < entry.points) ?? null;
}

function tierSixResult() {
  const calculation = calculatePerkfectionSavings(state.perkInputs);
  const best = bestRejuvenatedCandidate(facts.relics, state.rejuvenatedSavings);
  const decision = best
    ? evaluateTierSixDecision({
        perkfectionSavedMinutes: calculation.totalSaved,
        perkfectionUncertaintyMinutes: state.perkInputs.perkfectionUncertaintyMinutes,
        rejuvenatedSavedMinutes: best.minutesSaved,
        rejuvenatedUncertaintyMinutes: state.perkInputs.rejuvenatedUncertaintyMinutes,
        remainingRouteMinutes: state.perkInputs.remainingRouteMinutes,
      })
    : {
        winner: null,
        status: 'unscored',
        margin: Math.max(30, finiteNonNegative(state.perkInputs.remainingRouteMinutes) * 0.03),
        perkRange: [
          Math.max(0, calculation.totalSaved - finiteNonNegative(state.perkInputs.perkfectionUncertaintyMinutes)),
          calculation.totalSaved + finiteNonNegative(state.perkInputs.perkfectionUncertaintyMinutes),
        ],
        rejuvenatedRange: [0, 0],
        reason: 'Enter a route-time estimate for every plausible missed Tier 1–5 relic before comparing this permanent choice.',
      };
  return { calculation, best, decision };
}

function sourceBadge() {
  const gate = taskCoverageGate(snapshot);
  const labels = {
    ready: 'source locked',
    partial: 'partial source',
    blocked: 'source blocked',
  };
  return `<span class="source-badge source-${gate.status}" title="${escapeHtml(gate.detail)}">${labels[gate.status]}</span>`;
}

function renderHeader() {
  const totals = currentTotals();
  const gate = nextRegionGate(totals.tasks);
  const pointProgress = Math.min(100, (totals.points / facts.target.points) * 100);
  header.innerHTML = `
    <div class="brand-block">
      <div class="brand">ClankerScape</div>
      <div class="brand-sub">Dragon route workbench</div>
    </div>
    <label class="header-metric">
      <span>Points</span>
      <input type="number" min="0" max="109380" step="10" value="${totals.points}" data-state-field="points" aria-label="Current League points">
      <b>/ 48,000</b>
    </label>
    <label class="header-metric">
      <span>Tasks</span>
      <input type="number" min="0" max="1152" step="1" value="${totals.tasks}" data-state-field="completedTasks" aria-label="Completed League tasks">
      <b>${gate ? `next ${gate.tasks}` : 'all regions open'}</b>
    </label>
    <div class="header-progress" role="progressbar" aria-label="Dragon point progress" aria-valuemin="0" aria-valuemax="48000" aria-valuenow="${Math.min(facts.target.points, totals.points)}">
      <span style="width:${pointProgress.toFixed(2)}%"></span>
    </div>
    <div class="header-source">${sourceBadge()}<small>${snapshot.source?.revision ? `Wiki rev ${snapshot.source.revision}` : 'no Wiki revision'}${storageAvailable ? '' : ' · local progress not persisted'}</small></div>
    <div class="header-actions">
      <button type="button" class="quiet-button" data-action="export">Export</button>
      <button type="button" class="quiet-button" data-action="import">Import</button>
      <button type="button" class="danger-button" data-action="reset-state">Reset local</button>
    </div>`;
}

function renderTabs() {
  const tabs = [
    ['route', 'Route ledger'],
    ['relics', 'Relics'],
    ['regions', 'Regions'],
    ['blessings', 'Blessings'],
    ['sources', 'Sources'],
  ];
  return `<nav class="tabs" role="tablist" aria-label="Workbench sections">${tabs.map(([id, label]) => {
    const active = state.activeTab === id;
    return `
    <button type="button" id="tab-${id}" role="tab" aria-selected="${active}" aria-controls="panel-${id}" tabindex="${active ? '0' : '-1'}" class="tab-button ${active ? 'is-active' : ''}" data-tab="${id}">${label}</button>`;
  }).join('')}</nav>`;
}

function auditGateRows() {
  const rows = [
    ['Source', 'Import numeric Wiki task rows', 'Blocked until canonical rows are present', 'blocker'],
    ['Route', 'Do not freeze the 175-task region', 'Region totals are not reachable portfolios', 'hold'],
    ['Route', 'Build both skilling and PvM banks', 'Dragon speed needs fast switching, not one narrow lane', 'required'],
    ['Points', 'Maintain a 4,000-point reserve', 'Reserve must be real task rows, not headroom prose', 'required'],
    ['Relic', 'Compare every T1–T5 miss at Tier 6', 'Rejuvenated is one full earlier relic', 'required'],
    ['Relic', 'Do not treat 20% perk procs as 20% DPS', 'Only the affected proc share receives the increase', 'required'],
    ['Blessing', 'Track three Blessing resets', 'Ordinary relics have no published reset', 'verified'],
    ['Combat', 'Block True Equilibrium benchmarks', 'Relic alignment is unresolved in the current engine', 'blocker'],
  ];
  return rows.map((row, index) => `
    <tr class="gate-row">
      <td class="seq">${index + 1}</td>
      <td><span class="status-mark status-${row[3]}">${escapeHtml(row[3])}</span></td>
      <td><strong>${escapeHtml(row[1])}</strong><small>${escapeHtml(row[2])}</small></td>
      <td>${escapeHtml(row[0])}</td>
      <td>—</td>
      <td>—</td>
      <td>${row[3] === 'blocker' ? 'stop' : 'gate'}</td>
    </tr>`).join('');
}

function taskRows(tasks) {
  return tasks.map((task, index) => {
    const taskState = taskStateFor(state, task.id);
    const locality = task.locality ?? task.localityKey ?? 'Unmapped';
    return `
      <tr class="task-row ${taskState.complete ? 'is-complete' : ''} ${taskState.deferred ? 'is-deferred' : ''}">
        <td class="seq">${index + 1}</td>
        <td class="complete-cell"><input type="checkbox" ${taskState.complete ? 'checked' : ''} data-task-complete="${escapeHtml(task.id)}" aria-label="Mark ${escapeHtml(task.name)} complete"></td>
        <td class="task-title-cell">
          <button type="button" class="task-link" data-open-task="${escapeHtml(task.id)}">${escapeHtml(task.name)}</button>
          <small>#${task.wikiTaskId} · ${escapeHtml(task.tier)}</small>
        </td>
        <td>${escapeHtml(locality)}</td>
        <td>
          <select data-task-bank="${escapeHtml(task.id)}" aria-label="Queue bank for ${escapeHtml(task.name)}">
            ${TASK_BANK_OPTIONS.map((bank) => `<option value="${bank}" ${taskState.bank === bank ? 'selected' : ''}>${bank.replaceAll('-', ' ')}</option>`).join('')}
          </select>
        </td>
        <td class="number">+${task.points}</td>
        <td><input class="minutes-input" type="number" min="0" step="0.5" placeholder="—" value="${taskState.minutes ?? ''}" data-task-minutes="${escapeHtml(task.id)}" aria-label="Expected minutes for ${escapeHtml(task.name)}"></td>
        <td class="task-state-cell"><label><input type="checkbox" ${taskState.deferred ? 'checked' : ''} data-task-deferred="${escapeHtml(task.id)}" aria-label="Park ${escapeHtml(task.name)}"><span>Park</span></label><span class="source-mini" title="Wiki revision ${snapshot.source?.revision ?? 'unavailable'}">r${snapshot.source?.revision ?? '—'}</span></td>
      </tr>`;
  }).join('');
}

function filteredTasks() {
  const search = state.routeSearch.trim().toLowerCase();
  const bank = state.routeBankFilter;
  return (snapshot.tasks ?? [])
    .filter((task) => {
      const taskState = taskStateFor(state, task.id);
      if (bank !== 'all' && taskState.bank !== bank) return false;
      if (!search) return true;
      return [task.name, task.description, task.requirements, task.locality, task.localityKey]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search));
    })
    .sort((a, b) => {
      const aState = taskStateFor(state, a.id);
      const bState = taskStateFor(state, b.id);
      if (aState.complete !== bState.complete) return aState.complete ? 1 : -1;
      if (aState.deferred !== bState.deferred) return aState.deferred ? 1 : -1;
      const aMinutes = Number(aState.minutes);
      const bMinutes = Number(bState.minutes);
      const aRate = Number.isFinite(aMinutes) && aMinutes > 0 ? a.points / aMinutes : -1;
      const bRate = Number.isFinite(bMinutes) && bMinutes > 0 ? b.points / bMinutes : -1;
      return bRate - aRate || b.points - a.points || a.name.localeCompare(b.name);
    });
}

function switchboard() {
  const tasks = snapshot.tasks ?? [];
  const skilling = nextQueueAction(tasks, state, 'skilling');
  const pvm = nextQueueAction(tasks, state, 'pvm');
  const coverage = routeCoverage(tasks, state);
  const reservePoints = coverage.reserve.points;
  const totals = currentTotals();
  const relic = nextRelicThreshold(totals.points);
  const region = nextRegionGate(totals.tasks);
  const tierSix = tierSixResult();
  const currentEpoch = currentBlessingEpoch(state.blessing);
  const gods = godTierAlignments(currentEpoch.picks);

  const nextTask = (entry, empty) => entry
    ? `<strong>${escapeHtml(entry.task.name)}</strong><span>+${entry.task.points} · ${entry.state.minutes ? `${entry.state.minutes}m` : 'time missing'}</span>`
    : `<strong>${empty}</strong><span>Queue a sourced task and enter minutes.</span>`;

  const decision = tierSix.decision.winner === 'perkfection'
    ? 'Perkfection leads'
    : tierSix.decision.winner === 'rejuvenated'
      ? `Rejuvenated: ${tierSix.best?.name ?? 'candidate needed'}`
      : 'Tier 6 remains close';

  return `
    <aside class="switchboard" aria-label="Route switchboard">
      <div class="switchboard-heading"><span>Switchboard</span><b>${taskCoverageGate(snapshot).status}</b></div>
      <section class="next-action">
        <h3>Skilling next</h3>
        ${nextTask(skilling, 'No immediate skilling task')}
      </section>
      <section class="next-action">
        <h3>PvM next</h3>
        ${nextTask(pvm, 'No immediate PvM task')}
      </section>
      <dl class="rail-list">
        <div><dt>Reserve</dt><dd class="${reservePoints >= state.reserveTarget ? 'good' : 'warn'}">${formatNumber(reservePoints)} / ${formatNumber(state.reserveTarget)} pts</dd></div>
        <div><dt>Immediate banks</dt><dd>${formatNumber(coverage['immediate-skilling'].points + coverage['immediate-pvm'].points)} pts</dd></div>
        <div><dt>Region gate</dt><dd>${region ? `${totals.tasks} → ${region.tasks}` : 'open'}</dd></div>
        <div><dt>Relic gate</dt><dd>${relic ? `${formatNumber(totals.points)} → ${formatNumber(relic.points)}` : 'T7 reached'}</dd></div>
        <div><dt>Tier 6</dt><dd>${escapeHtml(decision)}</dd></div>
        <div><dt>Blessing resets</dt><dd>${MAX_BLESSING_RESETS - state.blessing.resetsUsed} left</dd></div>
        <div><dt>God paths</dt><dd>${gods[1] ?? '—'} / ${gods[2] ?? '—'}</dd></div>
      </dl>
      <div class="permanent-warning"><b>Relic reset unavailable</b><span>Only Blessing progression has three published resets.</span></div>
    </aside>`;
}

function renderRoute() {
  const gate = taskCoverageGate(snapshot);
  const tasks = filteredTasks();
  const shown = tasks.slice(0, 40);
  const tableRows = snapshot.tasks.length ? taskRows(shown) : auditGateRows();
  return `
    <section id="panel-route" class="panel route-panel" role="tabpanel" aria-labelledby="tab-route route-title" tabindex="0">
      <div class="source-gate source-gate-${gate.status}">
        <div><b>${escapeHtml(gate.title)}</b><span>${escapeHtml(gate.detail)}</span></div>
        <a href="${safeUrl(facts.sources['wiki-tasks'].url)}" target="_blank" rel="noopener noreferrer">Open canonical task page</a>
      </div>
      <div class="workbench-grid">
        <article class="ledger">
          <div class="ledger-heading">
            <div><p class="eyebrow">Active work window</p><h2 id="route-title">${snapshot.tasks.length ? 'Verified task ledger' : 'Route decision gates'}</h2></div>
            <div class="ledger-controls">
              <label>Bank<select data-route-filter="bank"><option value="all">all banks</option>${TASK_BANK_OPTIONS.map((bank) => `<option value="${bank}" ${state.routeBankFilter === bank ? 'selected' : ''}>${bank.replaceAll('-', ' ')}</option>`).join('')}</select></label>
              <label>Find<input type="search" value="${escapeHtml(state.routeSearch)}" placeholder="task or locality" data-route-filter="search"></label>
              <label>Reserve<input type="number" min="0" step="100" value="${state.reserveTarget}" data-state-field="reserveTarget"></label>
            </div>
          </div>
          <div class="table-scroll">
            <table class="route-table">
              <thead><tr><th>#</th><th>Done</th><th>Action / source</th><th>Locality</th><th>Bank</th><th>Pts</th><th>Min</th><th>State / source</th></tr></thead>
              <tbody>${tableRows}</tbody>
            </table>
          </div>
          <div class="ledger-foot"><span>${snapshot.tasks.length ? `${shown.length} shown · ${snapshot.coverage.observedTasks} sourced` : 'No fake task order is rendered.'}</span><span>Completed, deferred and estimates stay in this browser.</span></div>
        </article>
        ${switchboard()}
      </div>
    </section>`;
}

function relicSelection(tier) {
  return state.relicSelections[String(tier)] ?? null;
}

function relicRowsForTier(tier) {
  return facts.relics.filter((relic) => relic.tier === tier).map((relic) => {
    const selected = relicSelection(tier) === relic.id;
    const saving = finiteNonNegative(state.rejuvenatedSavings[relic.id]);
    return `
      <article class="relic-row ${selected ? 'is-selected' : ''}">
        <button type="button" class="relic-pick" data-relic-select="${relic.id}" data-relic-tier="${tier}" aria-pressed="${selected}">
          <span class="relic-code">T${tier}</span>
          <span><b>${escapeHtml(relic.name)}</b><small>${escapeHtml(relic.summary)}</small></span>
          <strong>${selected ? 'selected' : 'select'}</strong>
        </button>
        <details><summary>Verified card effects</summary><ul>${relic.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join('')}</ul></details>
        ${tier <= 5 ? `<label class="saved-minutes">Rejuvenated value <input type="number" min="0" step="5" value="${saving || ''}" placeholder="0" data-rejuvenated-saving="${relic.id}"> min</label>` : ''}
      </article>`;
  }).join('');
}

function numberInput(label, key, suffix = 'min') {
  const value = state.perkInputs[key] ?? 0;
  return `<label class="calc-field"><span>${label}</span><input type="number" min="0" step="0.5" value="${value}" data-perk-input="${key}"><b>${suffix}</b></label>`;
}

function renderPerkfectionCalculator() {
  const { calculation, best, decision } = tierSixResult();
  const winner = decision.winner === 'perkfection'
    ? 'Perkfection clears the burden of proof'
    : decision.winner === 'rejuvenated'
      ? `Rejuvenated clears it with ${best?.name ?? 'the best earlier relic'}`
      : 'No safe Tier 6 winner yet';
  const tone = decision.winner ?? (decision.status === 'unscored' ? 'unscored' : 'close');

  return `
    <section class="calculator" aria-labelledby="perkfection-title">
      <div class="section-heading">
        <div><p class="eyebrow">Tier 6 break-even</p><h2 id="perkfection-title">Perkfection vs Rejuvenated</h2></div>
        <div class="preset-buttons">${Object.entries(PERKFECTION_PRESETS).map(([id, preset]) => `<button type="button" data-perk-preset="${id}">${escapeHtml(preset.label)}</button>`).join('')}</div>
      </div>
      <div class="calc-grid">
        <div class="calc-inputs">
          <h3>Remaining-route assumptions</h3>
          ${numberInput('Remaining route P50', 'remainingRouteMinutes')}
          <div class="calc-pair-heading"><span>Channel</span><span>Without</span><span>With</span></div>
          <div class="calc-pair"><span>Invention setup/materials</span><input type="number" min="0" step="1" value="${state.perkInputs.setupWithout}" data-perk-input="setupWithout"><input type="number" min="0" step="1" value="${state.perkInputs.setupWith}" data-perk-input="setupWith"></div>
          <div class="calc-pair"><span>Critical-path machines</span><input type="number" min="0" step="1" value="${state.perkInputs.machinesWithout}" data-perk-input="machinesWithout"><input type="number" min="0" step="1" value="${state.perkInputs.machinesWith}" data-perk-input="machinesWith"></div>
          <div class="calc-pair"><span>Charge maintenance</span><input type="number" min="0" step="1" value="${state.perkInputs.chargeWithout}" data-perk-input="chargeWithout"><input type="number" min="0" step="1" value="${state.perkInputs.chargeWith}" data-perk-input="chargeWith"></div>
          <div class="calc-pair"><span>Workbench/blueprint travel</span><input type="number" min="0" step="1" value="${state.perkInputs.travelWithout}" data-perk-input="travelWithout"><input type="number" min="0" step="1" value="${state.perkInputs.travelWith}" data-perk-input="travelWith"></div>
          ${numberInput('Augmented combat remaining', 'augmentedCombatMinutes')}
          ${numberInput('Extra gizmo throughput', 'extraGizmoThroughputPercent', '%')}
          ${numberInput('Affected proc-perk share', 'helpfulPerkContributionPercent', '%')}
          ${numberInput('Perkfection uncertainty', 'perkfectionUncertaintyMinutes')}
          ${numberInput('Rejuvenated uncertainty', 'rejuvenatedUncertaintyMinutes')}
        </div>
        <div class="calc-results">
          <div class="decision-box decision-${tone}"><p>Audit result</p><h3>${escapeHtml(winner)}</h3><span>${escapeHtml(decision.reason)}</span></div>
          <dl class="breakdown">
            <div><dt>Setup/materials</dt><dd>${formatMinutes(calculation.setupSaved)}</dd></div>
            <div><dt>Machines</dt><dd>${formatMinutes(calculation.machineSaved)}</dd></div>
            <div><dt>Charge</dt><dd>${formatMinutes(calculation.chargeSaved)}</dd></div>
            <div><dt>Travel/blueprints</dt><dd>${formatMinutes(calculation.travelSaved)}</dd></div>
            <div><dt>Combat</dt><dd>${formatMinutes(calculation.combatSaved)}</dd></div>
            <div class="total"><dt>Perkfection P50</dt><dd>${formatMinutes(calculation.totalSaved)}</dd></div>
            <div><dt>Best Rejuvenated</dt><dd>${best ? `${escapeHtml(best.name)} · ${formatMinutes(best.minutesSaved)}` : 'none entered'}</dd></div>
            <div><dt>Required margin</dt><dd>${formatMinutes(decision.margin)}</dd></div>
            <div><dt>Perkfection range</dt><dd>${formatMinutes(decision.perkRange[0])}–${formatMinutes(decision.perkRange[1])}</dd></div>
            <div><dt>Rejuvenated range</dt><dd>${formatMinutes(decision.rejuvenatedRange[0])}–${formatMinutes(decision.rejuvenatedRange[1])}</dd></div>
          </dl>
          <p class="formula-note">The 20% proc line only scales the share of throughput produced by affected helpful proc perks. Machine time counts only when its output is on the Dragon critical path.</p>
        </div>
      </div>
    </section>`;
}

function renderRelics() {
  return `
    <section id="panel-relics" class="panel relic-panel" role="tabpanel" aria-labelledby="tab-relics" tabindex="0">
      <div class="section-heading"><div><p class="eyebrow">All 20 official choices</p><h2>Relic opportunity-cost ledger</h2></div><p class="section-note">No ordinary relic reset is published. Rejuvenated adds one earlier pick; it does not repair a bad choice.</p></div>
      ${renderPerkfectionCalculator()}
      <div class="relic-tiers">${[1, 2, 3, 4, 5, 6, 7].map((tier) => `<section class="relic-tier"><h3>Tier ${tier}<span>${facts.relics.filter((relic) => relic.tier === tier).length} choices</span></h3><div>${relicRowsForTier(tier)}</div></section>`).join('')}</div>
    </section>`;
}

function regionInput(regionId, key) {
  return state.regionInputs[regionId]?.[key] ?? '';
}

function renderRegions() {
  const pool = theoreticalSelectedPool(facts, state.electedRegions);
  const rows = facts.regions.filter((region) => region.id !== 'global').map((region) => {
    const elective = region.unlock === 'elective';
    const selected = elective ? state.electedRegions.includes(region.id) : true;
    const projection = regionProjection(region, state.regionInputs[region.id]);
    return `
      <tr class="${selected ? 'is-selected' : ''}">
        <td>${elective ? `<input type="checkbox" ${selected ? 'checked' : ''} data-region-select="${region.id}" aria-label="Select ${escapeHtml(region.name)}">` : '<span class="locked-mark">locked</span>'}</td>
        <td><b>${escapeHtml(region.name)}</b><small>${escapeHtml(region.unlock)}</small></td>
        <td class="number">${formatNumber(region.tasks)}</td>
        <td class="number">${formatNumber(region.points)}</td>
        <td class="number">${region.blessingTasks}</td>
        <td><input type="number" min="0" max="${region.points}" step="10" value="${regionInput(region.id, 'reachablePoints')}" placeholder="—" data-region-input="${region.id}:reachablePoints"></td>
        <td><input type="number" min="0" step="5" value="${regionInput(region.id, 'p50Minutes')}" placeholder="—" data-region-input="${region.id}:p50Minutes"></td>
        <td><input type="number" min="0" step="5" value="${regionInput(region.id, 'p90Minutes')}" placeholder="—" data-region-input="${region.id}:p90Minutes"></td>
        <td>${projection.status === 'scored' ? `${formatNumber(projection.pointsPerHour, 0)} pts/h` : '<span class="unknown">unscored</span>'}</td>
        <td><details><summary>${region.autoCompletedQuests.length} quests</summary><ul>${region.autoCompletedQuests.map((quest) => `<li>${escapeHtml(quest)}</li>`).join('')}</ul></details></td>
      </tr>`;
  }).join('');

  return `
    <section id="panel-regions" class="panel regions-panel" role="tabpanel" aria-labelledby="tab-regions" tabindex="0">
      <div class="section-heading"><div><p class="eyebrow">Three elective picks</p><h2>Reachable portfolio comparison</h2></div><p class="section-note">Published region totals are upper bounds, not route value. Enter only points and times your actual build can reach.</p></div>
      <div class="pool-summary">
        <div><span>Elective picks</span><b>${state.electedRegions.length} / 3</b></div>
        <div><span>Theoretical pool</span><b>${formatNumber(pool.points)} pts</b></div>
        <div><span>Pool tasks</span><b>${formatNumber(pool.tasks)}</b></div>
        <div><span>Blessing tasks</span><b>${formatNumber(pool.blessingTasks)} / 30</b></div>
        <div class="pool-warning"><span>Route verdict</span><b>${snapshot.coverage.status === 'full' ? 'score with task rows' : 'hold all elective defaults'}</b></div>
      </div>
      <div class="table-scroll"><table class="region-table"><thead><tr><th>Pick</th><th>Region</th><th>Tasks</th><th>Official pts</th><th>Bless</th><th>Reachable pts</th><th>P50 min</th><th>P90 min</th><th>Rate</th><th>Auto quests</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="conflict-note"><b>Route-impacting source conflict:</b> official FAQ text conflicts on Dungeoneering reward-shop access without Wilderness. Wilderness scoring must not assume either interpretation.</div>
    </section>`;
}

function blessingChoiceFor(slot, path) {
  return facts.blessings.find((blessing) => blessing.progressionSlot === slot && blessing.path === path);
}

function blessingPathButton(index, slot, path, currentPick) {
  const blessing = blessingChoiceFor(slot, path);
  return `<button type="button" class="path-pick path-${path.toLowerCase()} ${currentPick === path ? 'is-active' : ''}" data-blessing-pick="${index}:${path}" aria-pressed="${currentPick === path}"><span>${path}</span><b>${escapeHtml(blessing?.name ?? 'Unrevealed')}</b></button>`;
}

function godChoice(godTier, path) {
  return facts.blessings.find((blessing) => blessing.godTier === godTier && blessing.path === path);
}

function renderBlessings() {
  const epoch = currentBlessingEpoch(state.blessing);
  const gods = godTierAlignments(epoch.picks);
  const activeIds = new Set(activeBlessingIds(facts, epoch.picks));
  const pathSlots = [1, 2, 3, 5, 6, 7];
  const rows = pathSlots.map((slot, index) => {
    const label = slot <= 3 ? `Tier ${slot}` : `Tier ${slot - 1}`;
    return `<div class="blessing-row"><div class="blessing-tier-label"><span>Slot ${slot}</span><b>${label}</b></div>${BLESSING_PATHS.map((path) => blessingPathButton(index, slot, path, epoch.picks[index])).join('')}</div>`;
  });
  rows.splice(3, 0, `<div class="god-row"><div><span>Slot 4</span><b>God Tier 1</b></div><strong>${gods[1] ? `${gods[1]} · ${godChoice(1, gods[1])?.name}` : 'Needs first three path picks'}</strong></div>`);
  rows.push(`<div class="god-row"><div><span>Slot 8</span><b>God Tier 2</b></div><strong>${gods[2] ? `${gods[2]} · ${godChoice(2, gods[2])?.name}` : 'Needs final three path picks'}</strong></div>`);

  const matrix = [1, 2, 3, 4, 5, 6, 7, 8].map((slot) => {
    const entries = BLESSING_PATHS.map((path) => blessingChoiceFor(slot, path));
    const label = slot === 4 ? 'God 1' : slot === 8 ? 'God 2' : `T${slot > 4 ? slot - 1 : slot}`;
    return `<tr><td>${label}</td>${entries.map((blessing) => `<td class="path-cell path-${blessing.path.toLowerCase()} ${activeIds.has(blessing.id) ? 'is-active' : ''}"><b>${escapeHtml(blessing.name)}</b><span>${escapeHtml(blessing.summary)}</span><small>${escapeHtml(blessing.support)}</small>${blessing.blocker ? `<em>${escapeHtml(blessing.blocker)}</em>` : ''}</td>`).join('')}</tr>`;
  }).join('');

  const history = state.blessing.epochs.map((historyEpoch, index) => {
    const historyGods = godTierAlignments(historyEpoch.picks);
    return `<tr><td>${historyEpoch.id}</td><td>${historyEpoch.picks.map((pick) => pick?.[0] ?? '—').join(' · ')}</td><td>${historyGods[1] ?? '—'}</td><td>${historyGods[2] ?? '—'}</td><td>${index === state.blessing.epochs.length - 1 ? 'active' : 'reset'}</td></tr>`;
  }).join('');

  return `
    <section id="panel-blessings" class="panel blessings-panel" role="tabpanel" aria-labelledby="tab-blessings" tabindex="0">
      <div class="section-heading"><div><p class="eyebrow">Epoch ${epoch.id}</p><h2>Blessing path and reset ledger</h2></div><div class="reset-summary"><b>${MAX_BLESSING_RESETS - state.blessing.resetsUsed} resets left</b><button type="button" class="danger-button" data-action="blessing-reset" ${state.blessing.resetsUsed >= MAX_BLESSING_RESETS ? 'disabled' : ''}>Use Blessing reset</button></div></div>
      <div class="reset-warning"><b>This resets Blessing progression only.</b><span>There is no published ordinary-relic reset, including late game. Rejuvenated is an extra earlier-tier choice, not a reset.</span></div>
      <div class="blessing-picker">${rows.join('')}</div>
      <div class="blessing-history"><h3>Epoch history</h3><table><thead><tr><th>Epoch</th><th>Path picks</th><th>God 1</th><th>God 2</th><th>State</th></tr></thead><tbody>${history}</tbody></table></div>
      <div class="table-scroll"><table class="blessing-matrix"><thead><tr><th>Tier</th><th>Order</th><th>Balance</th><th>Chaos</th></tr></thead><tbody>${matrix}</tbody></table></div>
    </section>`;
}

function renderSources() {
  const coverage = snapshot.coverage;
  const sourceRows = Object.values(facts.sources).map((source) => `<tr><td>${escapeHtml(source.authority)}</td><td><a href="${safeUrl(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.name)}</a></td><td>${facts.verifiedAt}</td></tr>`).join('');
  const conflicts = facts.sourceConflicts.map((conflict) => `<li><b>${escapeHtml(conflict.id)}</b><span>${escapeHtml(conflict.summary)}</span><em>${escapeHtml(conflict.severity)}</em></li>`).join('');
  const mechanics = facts.verifiedMechanics.map((item) => `<li><b>${escapeHtml(item.id)}</b><span>${escapeHtml(item.summary)}</span><em>${escapeHtml(item.status)}</em></li>`).join('');
  return `
    <section id="panel-sources" class="panel sources-panel" role="tabpanel" aria-labelledby="tab-sources" tabindex="0">
      <div class="section-heading"><div><p class="eyebrow">Fail-closed provenance</p><h2>Source and audit status</h2></div><p class="section-note">Repo data is a cache. Current official Jagex text and the canonical numeric Wiki rows remain the authority.</p></div>
      <div class="source-status-grid">
        <div><span>Task coverage</span><b>${escapeHtml(coverage.status)}</b></div>
        <div><span>Wiki revision</span><b>${coverage.status === 'unavailable' ? 'none' : snapshot.source.revision}</b></div>
        <div><span>Rows / points</span><b>${formatNumber(coverage.observedTasks)} / ${formatNumber(coverage.observedPoints)}</b></div>
        <div><span>Official total</span><b>1,152 / 109,380</b></div>
        <div><span>Reconciled</span><b>${coverage.reconciled ? 'yes' : 'no'}</b></div>
        <div><span>Route freeze</span><b>${coverage.reconciled ? 'allowed after time audit' : 'blocked'}</b></div>
      </div>
      <section class="source-section"><h3>Authority chain</h3><table><thead><tr><th>Authority</th><th>Source</th><th>Verified</th></tr></thead><tbody>${sourceRows}</tbody></table></section>
      <section class="source-section"><h3>Blocking or route-impacting conflicts</h3><ul class="evidence-list conflict-list">${conflicts}</ul></section>
      <section class="source-section"><h3>Verified League mechanics used by the planner</h3><ul class="evidence-list">${mechanics}</ul></section>
      <section class="audit-verdict"><b>Current verdict: website ready for review; final Dragon order blocked by unreleased task tiers.</b><span>The site can ingest the canonical page automatically and will only mark the corpus full when both official totals reconcile.</span></section>
    </section>`;
}

function renderPanel() {
  if (loadError) return `<section class="fatal-error"><h2>Data load failed</h2><p>${escapeHtml(loadError.message)}</p><p>Serve the repository over HTTP; browser file URLs cannot load the JSON source files.</p></section>`;
  switch (state.activeTab) {
    case 'relics': return renderRelics();
    case 'regions': return renderRegions();
    case 'blessings': return renderBlessings();
    case 'sources': return renderSources();
    default: return renderRoute();
  }
}

function renderApp() {
  if (!facts || !snapshot) return;
  renderHeader();
  app.innerHTML = `${renderTabs()}${renderPanel()}`;
}

function updateTaskState(taskId, patch) {
  updateState((draft) => {
    const current = taskStateFor(draft, taskId);
    draft.taskState[taskId] = { ...current, ...patch };
    return draft;
  });
}

function openTaskDialog(taskId, opener) {
  const task = snapshot.tasks.find((entry) => entry.id === taskId);
  if (!task) return;
  taskDialogBody.innerHTML = `
    <div class="dialog-source"><span>Equilibrium League/Tasks</span><b>Wiki task #${task.wikiTaskId}</b><em>revision ${snapshot.source.revision ?? 'unavailable'}</em></div>
    <h2 id="task-dialog-title">${escapeHtml(task.name)}</h2>
    ${task.description ? `<section><h3>Canonical information</h3><p>${escapeHtml(task.description)}</p></section>` : ''}
    ${task.requirements ? `<section><h3>Requirements</h3><p>${escapeHtml(task.requirements)}</p></section>` : ''}
    <section><h3>Route state</h3><p>${escapeHtml(taskStateFor(state, task.id).bank.replaceAll('-', ' '))} · ${task.points} points · ${taskStateFor(state, task.id).minutes ?? 'no'} minute estimate</p></section>
    <a class="source-action" href="${safeUrl(snapshot.source.url)}" target="_blank" rel="noopener noreferrer">Open canonical Wiki page</a>`;
  taskDialog.dataset.returnFocus = opener?.dataset.openTask ?? '';
  taskDialog.showModal();
  taskDialog.querySelector('[data-dialog-close]')?.focus();
}

function exportProgress() {
  const payload = {
    schemaVersion: STATE_VERSION,
    exportedAt: new Date().toISOString(),
    sourceRevision: snapshot.source?.revision ?? null,
    state,
  };
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'clankerscape-progress.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

async function importProgress(file) {
  if (!file || file.size > 2 * 1024 * 1024) throw new Error('Progress file must be smaller than 2 MB.');
  const payload = JSON.parse(await file.text());
  if (payload.schemaVersion !== STATE_VERSION || !payload.state) throw new Error('Unsupported progress schema.');
  state = normaliseState(payload.state);
  saveState();
  renderApp();
}

function onClick(event) {
  const tab = event.target.closest('[data-tab]');
  if (tab) {
    const id = tab.dataset.tab;
    updateState((draft) => { draft.activeTab = id; return draft; });
    document.querySelector(`[data-tab="${CSS.escape(id)}"]`)?.focus();
    return;
  }

  const action = event.target.closest('[data-action]');
  if (action) {
    if (action.dataset.action === 'export') exportProgress();
    if (action.dataset.action === 'import') importInput.click();
    if (action.dataset.action === 'reset-state' && window.confirm('Delete all local ClankerScape progress and estimates?')) {
      state = defaultState();
      saveState();
      renderApp();
    }
    if (action.dataset.action === 'blessing-reset') {
      if (!window.confirm('Archive this Blessing epoch and spend one of the three progression resets? Relics will not change.')) return;
      const result = resetBlessingProgression(state.blessing, new Date().toISOString());
      if (result.error) window.alert(result.error);
      else updateState((draft) => { draft.blessing = result.state; return draft; });
    }
    return;
  }

  const taskOpener = event.target.closest('[data-open-task]');
  if (taskOpener) {
    openTaskDialog(taskOpener.dataset.openTask, taskOpener);
    return;
  }

  const relicButton = event.target.closest('[data-relic-select]');
  if (relicButton) {
    updateState((draft) => {
      draft.relicSelections[String(relicButton.dataset.relicTier)] = relicButton.dataset.relicSelect;
      return draft;
    });
    return;
  }

  const preset = event.target.closest('[data-perk-preset]');
  if (preset) {
    updateState((draft) => {
      draft.perkInputs = { ...PERKFECTION_PRESETS[preset.dataset.perkPreset] };
      return draft;
    });
    return;
  }

  const blessingPick = event.target.closest('[data-blessing-pick]');
  if (blessingPick) {
    const [indexRaw, path] = blessingPick.dataset.blessingPick.split(':');
    updateState((draft) => {
      const current = currentBlessingEpoch(draft.blessing).picks[Number(indexRaw)];
      draft.blessing = setBlessingPick(draft.blessing, Number(indexRaw), current === path ? null : path);
      return draft;
    });
  }
}

function onChange(event) {
  const stateField = event.target.closest('[data-state-field]');
  if (stateField) {
    updateState((draft) => {
      draft[stateField.dataset.stateField] = finiteNonNegative(stateField.value);
      return draft;
    });
    return;
  }

  const complete = event.target.closest('[data-task-complete]');
  if (complete) {
    const task = snapshot.tasks.find((entry) => entry.id === complete.dataset.taskComplete);
    const prior = taskStateFor(state, task.id).complete;
    updateState((draft) => {
      const current = taskStateFor(draft, task.id);
      draft.taskState[task.id] = { ...current, complete: complete.checked };
      if (complete.checked !== prior) {
        draft.points = Math.max(0, draft.points + (complete.checked ? task.points : -task.points));
        draft.completedTasks = Math.max(0, draft.completedTasks + (complete.checked ? 1 : -1));
      }
      return draft;
    });
    return;
  }


  const deferred = event.target.closest('[data-task-deferred]');
  if (deferred) {
    updateTaskState(deferred.dataset.taskDeferred, { deferred: deferred.checked });
    return;
  }

  const bank = event.target.closest('[data-task-bank]');
  if (bank) {
    updateTaskState(bank.dataset.taskBank, { bank: bank.value });
    return;
  }

  const minutes = event.target.closest('[data-task-minutes]');
  if (minutes) {
    updateTaskState(minutes.dataset.taskMinutes, { minutes: minutes.value === '' ? null : finiteNonNegative(minutes.value) });
    return;
  }

  const routeFilter = event.target.closest('[data-route-filter]');
  if (routeFilter) {
    updateState((draft) => {
      if (routeFilter.dataset.routeFilter === 'bank') draft.routeBankFilter = routeFilter.value;
      if (routeFilter.dataset.routeFilter === 'search') draft.routeSearch = routeFilter.value;
      return draft;
    });
    return;
  }

  const perkInput = event.target.closest('[data-perk-input]');
  if (perkInput) {
    updateState((draft) => {
      draft.perkInputs[perkInput.dataset.perkInput] = finiteNonNegative(perkInput.value);
      return draft;
    });
    return;
  }

  const rejuvInput = event.target.closest('[data-rejuvenated-saving]');
  if (rejuvInput) {
    updateState((draft) => {
      draft.rejuvenatedSavings[rejuvInput.dataset.rejuvenatedSaving] = finiteNonNegative(rejuvInput.value);
      return draft;
    });
    return;
  }

  const regionSelect = event.target.closest('[data-region-select]');
  if (regionSelect) {
    const id = regionSelect.dataset.regionSelect;
    updateState((draft) => {
      const selected = new Set(draft.electedRegions);
      if (regionSelect.checked) selected.add(id);
      else selected.delete(id);
      const candidate = [...selected];
      if (!electiveSelectionValid(candidate)) {
        window.alert('Only three elective regions can be selected.');
        return draft;
      }
      draft.electedRegions = candidate;
      return draft;
    });
    return;
  }

  const regionInput = event.target.closest('[data-region-input]');
  if (regionInput) {
    const [regionId, key] = regionInput.dataset.regionInput.split(':');
    updateState((draft) => {
      draft.regionInputs[regionId] = {
        ...(draft.regionInputs[regionId] ?? {}),
        [key]: regionInput.value === '' ? '' : finiteNonNegative(regionInput.value),
      };
      return draft;
    });
  }
}

document.addEventListener('click', onClick);
document.addEventListener('change', onChange);
importInput.addEventListener('change', async () => {
  try {
    await importProgress(importInput.files?.[0]);
  } catch (error) {
    window.alert(error instanceof Error ? error.message : 'Unable to import progress.');
  } finally {
    importInput.value = '';
  }
});

taskDialog.addEventListener('close', () => {
  const id = taskDialog.dataset.returnFocus;
  if (!id) return;
  document.querySelector(`[data-open-task="${CSS.escape(id)}"]`)?.focus();
});

taskDialog.addEventListener('click', (event) => {
  if (event.target === taskDialog || event.target.closest('[data-dialog-close]')) taskDialog.close();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && taskDialog.open) {
    taskDialog.close();
    return;
  }

  const tab = event.target.closest?.('[role="tab"]');
  if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  if (!tabs.length) return;
  const current = tabs.indexOf(tab);
  let next = current;
  if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
  if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = tabs.length - 1;
  event.preventDefault();
  tabs[next].click();
});

loadLocalState();
try {
  await loadData();
} catch (error) {
  loadError = error instanceof Error ? error : new Error('Unknown data-loading error');
  facts = { target: { points: 48000 }, relicThresholds: [], sources: {}, relics: [], blessings: [] };
  snapshot = { coverage: { status: 'unavailable' }, source: {}, tasks: [] };
}
renderApp();
