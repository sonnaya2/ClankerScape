import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const PAGE_TITLE = 'Equilibrium League/Tasks';
const SOURCE_URL = 'https://runescape.wiki/w/Equilibrium_League/Tasks';
const API_URL = new URL('https://runescape.wiki/api.php');
API_URL.search = new URLSearchParams({
  action: 'parse',
  page: PAGE_TITLE,
  prop: 'text|revid',
  format: 'json',
  formatversion: '2',
  disableeditsection: '1',
}).toString();

const OUTPUT = resolve(process.argv[2] ?? 'data/equilibrium-tasks.snapshot.json');
const POINT_TO_TIER = new Map([
  [10, 'easy'],
  [30, 'medium'],
  [80, 'hard'],
  [200, 'elite'],
  [400, 'master'],
]);
const OFFICIAL_TOTALS = Object.freeze({ tasks: 1152, points: 109380 });
const MAX_RESPONSE_BYTES = 20 * 1024 * 1024;

function decodeHtmlEntities(value) {
  const named = {
    amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
    ndash: '–', mdash: '—', hellip: '…', times: '×', middot: '·',
  };
  return value.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const hex = entity[1]?.toLowerCase() === 'x';
      const number = Number.parseInt(entity.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(number) ? String.fromCodePoint(number) : match;
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

export function textFromHtml(value) {
  return decodeHtmlEntities(value
    .replace(/<br\s*\/?\s*>/gi, ' ')
    .replace(/<sup\b[^>]*>[\s\S]*?<\/sup>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function attribute(source, name) {
  const expression = new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`, 'i');
  const match = source.match(expression);
  return match?.[1] ?? match?.[2];
}

function localityLabel(cellHtml) {
  const title = attribute(cellHtml, 'title');
  if (title?.trim()) return decodeHtmlEntities(title.trim());
  const alt = attribute(cellHtml, 'alt');
  if (alt?.trim()) return decodeHtmlEntities(alt.trim());
  return textFromHtml(cellHtml) || null;
}

export function parseTaskRows(html, revision) {
  const rows = html.match(/<tr\b[\s\S]*?<\/tr>/gi) ?? [];
  const records = [];

  for (const row of rows) {
    const rawId = attribute(row, 'data-taskid') ?? attribute(row, 'id');
    if (!rawId || !/^\d+$/.test(rawId)) continue;

    const cells = [...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((match) => match[1]);
    if (cells.length < 5) continue;

    let pointsIndex = -1;
    let points = null;
    for (let index = cells.length - 1; index >= 0; index -= 1) {
      const exact = textFromHtml(cells[index]).match(/(?:^|\s)(10|30|80|200|400)(?:\s|$)/);
      if (!exact) continue;
      const candidate = Number(exact[1]);
      if (POINT_TO_TIER.has(candidate)) {
        pointsIndex = index;
        points = candidate;
        break;
      }
    }
    if (pointsIndex < 4 || points === null) continue;

    const name = textFromHtml(cells[pointsIndex - 3]);
    if (!name) continue;

    const information = textFromHtml(cells[pointsIndex - 2]);
    const requirements = textFromHtml(cells[pointsIndex - 1]);
    const localityCell = cells[pointsIndex - 4];
    const locality = localityLabel(localityCell);
    const localityKey = attribute(row, 'data-tbz-area-for-filtering')?.toLowerCase() ?? null;
    const tier = POINT_TO_TIER.get(points);

    records.push({
      id: `wiki:${rawId}`,
      wikiTaskId: Number(rawId),
      name,
      description: information && information !== name ? information : null,
      requirements: requirements && requirements !== 'N/A' ? requirements : null,
      tier,
      points,
      locality,
      localityKey,
      source: {
        pageTitle: PAGE_TITLE,
        revision,
        url: SOURCE_URL,
      },
    });
  }

  records.sort((a, b) => a.wikiTaskId - b.wikiTaskId);
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record.wikiTaskId)) {
      throw new Error(`Duplicate Wiki task ID ${record.wikiTaskId}`);
    }
    seen.add(record.wikiTaskId);
  }
  return records;
}

async function fetchSource() {
  const response = await fetch(API_URL, {
    headers: {
      'User-Agent': 'ClankerScape/0.1 RuneScape fan route tool (https://github.com/sonnaya2/ClankerScape)',
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) throw new Error(`RuneScape Wiki returned HTTP ${response.status}`);
  const declaredLength = Number(response.headers.get('content-length') ?? '0');
  if (declaredLength > MAX_RESPONSE_BYTES) throw new Error(`Wiki response exceeded ${MAX_RESPONSE_BYTES} bytes`);
  const raw = await response.text();
  if (Buffer.byteLength(raw) > MAX_RESPONSE_BYTES) throw new Error(`Wiki response exceeded ${MAX_RESPONSE_BYTES} bytes`);
  return JSON.parse(raw);
}

export async function syncEquilibriumTasks(output = OUTPUT) {
  const payload = await fetchSource();
  const html = payload?.parse?.text;
  const revision = payload?.parse?.revid;
  if (typeof html !== 'string' || !html) throw new Error('Wiki response did not contain parsed task HTML');
  if (!Number.isInteger(revision)) throw new Error('Wiki response did not contain a numeric revision');

  const tasks = parseTaskRows(html, revision);
  if (tasks.length === 0) throw new Error('No numeric Equilibrium task rows were found; refusing to write an empty snapshot');

  const tiers = [...new Set(tasks.map((task) => task.tier))].sort();
  const observedPoints = tasks.reduce((sum, task) => sum + task.points, 0);
  const fullCoverage = tasks.length === OFFICIAL_TOTALS.tasks && observedPoints === OFFICIAL_TOTALS.points;
  const snapshot = {
    schemaVersion: 1,
    source: {
      pageTitle: PAGE_TITLE,
      url: SOURCE_URL,
      revision,
      fetchedAt: new Date().toISOString(),
      licence: 'CC BY-NC-SA 3.0',
    },
    coverage: {
      status: fullCoverage ? 'full' : 'partial',
      observedTiers: tiers,
      observedTasks: tasks.length,
      observedPoints,
      officialTasks: OFFICIAL_TOTALS.tasks,
      officialPoints: OFFICIAL_TOTALS.points,
      reconciled: fullCoverage,
      note: fullCoverage
        ? 'All five task tiers reconcile with the official Jagex totals.'
        : 'The source does not yet reconcile with the complete official task pool. Route freezing remains blocked.',
    },
    tasks,
  };

  let existing = null;
  try {
    existing = JSON.parse(await readFile(output, 'utf8'));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  const comparable = (value) => {
    if (!value || typeof value !== 'object') return value;
    return {
      ...value,
      source: value.source ? { ...value.source, fetchedAt: null } : value.source,
    };
  };
  const unchanged = existing
    && JSON.stringify(comparable(existing)) === JSON.stringify(comparable(snapshot));

  if (!unchanged) {
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');
  }
  return { snapshot: unchanged ? existing : snapshot, revision, tasks, tiers, changed: !unchanged };
}

const invokedAsScript = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (invokedAsScript) {
  const { tasks, revision, tiers, changed } = await syncEquilibriumTasks();
  console.log(`${changed ? 'Wrote' : 'Checked'} ${tasks.length} Equilibrium tasks from Wiki revision ${revision} (${tiers.join(', ')})`);
}
