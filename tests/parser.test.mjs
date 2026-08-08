import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { parseTaskRows, syncEquilibriumTasks, textFromHtml } from '../scripts/sync-equilibrium-tasks.mjs';

test('task parser requires numeric Wiki IDs and extracts locality, tier, requirements, and provenance', () => {
  const html = `
    <table><tbody>
      <tr data-taskid="42" data-tbz-area-for-filtering="misthalin">
        <td><img alt="Misthalin: Lumbridge"></td>
        <td>First task</td>
        <td>Do the thing.</td>
        <td>10 Mining</td>
        <td>10</td>
      </tr>
      <tr data-taskid="nonnumeric"><td>X</td><td>Ignore</td><td></td><td></td><td>30</td></tr>
      <tr data-taskid="77">
        <td title="Karamja: Brimhaven"></td>
        <td>Second &amp; task</td>
        <td>More info</td>
        <td>N/A</td>
        <td>200</td>
      </tr>
    </tbody></table>`;
  const rows = parseTaskRows(html, 12345);
  assert.equal(rows.length, 2);
  assert.deepEqual(rows[0], {
    id: 'wiki:42',
    wikiTaskId: 42,
    name: 'First task',
    description: 'Do the thing.',
    requirements: '10 Mining',
    tier: 'easy',
    points: 10,
    locality: 'Misthalin: Lumbridge',
    localityKey: 'misthalin',
    source: {
      pageTitle: 'Equilibrium League/Tasks',
      revision: 12345,
      url: 'https://runescape.wiki/w/Equilibrium_League/Tasks',
    },
  });
  assert.equal(rows[1].name, 'Second & task');
  assert.equal(rows[1].tier, 'elite');
  assert.equal(rows[1].requirements, null);
});

test('task parser rejects duplicate numeric IDs', () => {
  const html = `
    <tr data-taskid="1"><td>A</td><td>One</td><td>Info</td><td>N/A</td><td>10</td></tr>
    <tr data-taskid="1"><td>B</td><td>Two</td><td>Info</td><td>N/A</td><td>30</td></tr>`;
  assert.throws(() => parseTaskRows(html, 1), /Duplicate Wiki task ID 1/);
});

test('text extraction strips active markup and decodes common entities', () => {
  assert.equal(textFromHtml('<script>x</script><b>A&amp;B</b><br>C'), 'A&B C');
});


test('source sync does not rewrite an unchanged revision and row set', { concurrency: false }, async () => {
  const directory = await mkdtemp(join(tmpdir(), 'clankerscape-sync-'));
  const output = join(directory, 'snapshot.json');
  const originalFetch = globalThis.fetch;
  const html = `
    <table><tbody>
      <tr data-taskid="91" data-tbz-area-for-filtering="global">
        <td title="Global"></td><td>Stable task</td><td>Do it.</td><td>N/A</td><td>10</td>
      </tr>
    </tbody></table>`;
  globalThis.fetch = async () => new Response(JSON.stringify({ parse: { text: html, revid: 98765 } }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

  try {
    const first = await syncEquilibriumTasks(output);
    const firstBytes = await readFile(output, 'utf8');
    const second = await syncEquilibriumTasks(output);
    const secondBytes = await readFile(output, 'utf8');
    assert.equal(first.changed, true);
    assert.equal(second.changed, false);
    assert.equal(secondBytes, firstBytes);
  } finally {
    globalThis.fetch = originalFetch;
    await rm(directory, { recursive: true, force: true });
  }
});
