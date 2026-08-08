import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const app = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const shipped = `${index}\n${app}\n${css}`;

const retired = [
  'Route ledger',
  'Switchboard',
  'Action / source',
  'State / source',
  '>Park<',
  'Reset local',
  'Data status',
  'Source and audit status',
  'Fail-closed provenance',
  'Dragon route workbench',
  'Opening route workbench',
  'Your plan',
  'Skip for now',
  'route-side',
  'switchboard',
  'workbench-head',
  'Your pts',
  'T6 saved',
  'Unsorted',
];

test('retired labels and side-panel chrome stay out of the site', () => {
  for (const value of retired) {
    assert.equal(shipped.includes(value), false, `retired UI returned: ${value}`);
  }
});

test('navigation contains only player-facing pages', () => {
  assert.match(app, /\['route', 'Route'\]/);
  assert.match(app, /\['relics', 'Relics'\]/);
  assert.match(app, /\['regions', 'Regions'\]/);
  assert.match(app, /\['blessings', 'Blessings'\]/);
  assert.doesNotMatch(app, /\['sources',/);
});

test('generic AI chrome does not return', () => {
  assert.doesNotMatch(css, /gradient|glow|backdrop-filter|border-radius/i);
});
