import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

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
  'Unsorted',
];

test('the public site is the fixed route, not a planner', () => {
  assert.match(index, /Desert <i>→<\/i> Asgarnia <i>→<\/i> Anachronia/);
  assert.match(index, /Golden Touch/);
  assert.match(index, /Animal Wrangler/);
  assert.match(index, /Voidwalker/);
  assert.match(index, /Crystal Grace/);
  assert.match(index, /Production Master/);
  assert.match(index, /Rejuvenated/);
  assert.match(index, /\+ Devout/);
  assert.match(index, /Infernal Fire/);
  assert.doesNotMatch(index, /<(?:button|input|select|textarea)\b/i);
  assert.doesNotMatch(index, /localStorage|sessionStorage|import-progress|contenteditable/i);
  assert.doesNotMatch(index, /<script\b/i);
});

test('retired planner and audit labels stay out of the public page', () => {
  for (const value of retired) {
    assert.equal(index.includes(value), false, `retired UI returned: ${value}`);
  }
});

test('navigation is only the four route sections', () => {
  const nav = index.match(/<nav[\s\S]*?<\/nav>/)?.[0] ?? '';
  assert.match(nav, />Route</);
  assert.match(nav, />Regions</);
  assert.match(nav, />Relics</);
  assert.match(nav, />Blessings</);
  assert.doesNotMatch(nav, /Sources|Data|Settings|Save|Import|Export/i);
});

test('generic AI chrome does not return', () => {
  assert.doesNotMatch(css, /gradient|glow|backdrop-filter|border-radius/i);
  assert.doesNotMatch(index, /hero|dashboard|KPI|workspace|optimi[sz]e your|unlock your/i);
});

test('RuneScape palette stays dark with restrained brass and teal', () => {
  assert.match(css, /--bg:\s*#071012/);
  assert.match(css, /--gold:\s*#c8a963/);
  assert.match(css, /--teal:\s*#4c928a/);
  assert.doesNotMatch(css, /--paper|#dfcda3|#f1e4c4/i);
});
