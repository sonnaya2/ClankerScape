import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../_site/combat-prototype.html', import.meta.url), 'utf8');
const v5Css = await readFile(new URL('../_site/combat-prototype-v5.css', import.meta.url), 'utf8');
const v5Js = await readFile(new URL('../_site/combat-prototype-v5.js', import.meta.url), 'utf8');

test('V5 builds the approved generated-reference composition', () => {
  assert.match(html, /combat-prototype-v5\.css/);
  assert.match(html, /combat-prototype-v5\.js/);
  for (const contract of [
    'reference-workbench',
    'loadout-page-list',
    'Main Melee',
    'change-equipment-action',
    'combat-current-focus',
    'monolith-layout-v5',
    'Effects & Buffs',
    'effects-filter-bar',
    'View full breakdown',
    'prototype-tip',
  ]) assert.ok(v5Js.includes(contract), `missing V5 generated-reference contract: ${contract}`);
});

test('V5 keeps equipment and attachment catalogues contextual', () => {
  assert.match(v5Js, /active\?\.click\(\)/);
  assert.match(v5Js, /\[data-open-perks\]/);
  assert.match(v5Js, /\.relic-socket/);
  assert.match(v5Js, /Change equipment/);
  assert.match(v5Js, /Change perks/);
  assert.match(v5Js, /Change relics/);
});

test('V5 adds category filtering and turns More buffs into an overflow menu', () => {
  for (const label of ['All', 'Debuffs', 'Poison', 'Boosts', 'Relics', 'Other']) {
    assert.ok(v5Js.includes(`'${label}'`), `missing effects filter: ${label}`);
  }
  assert.match(v5Js, /more-effects-disclosure--menu/);
  assert.match(v5Css, /\.more-effects-disclosure--menu \.more-effects-grid[\s\S]*position:\s*absolute/i);
});

test('V5 follows the reference without reintroducing generated-dashboard styling', () => {
  assert.doesNotMatch(v5Css, /linear-gradient|radial-gradient|backdrop-filter|glassmorphism/i);
  assert.doesNotMatch(v5Css, /inset\s+3px\s+0\s+0/i);
  assert.match(v5Css, /\.reference-workbench[\s\S]*grid-template-columns:\s*168px minmax\(0, 1fr\) 276px/i);
  assert.match(v5Css, /\.gear-stage-grid[\s\S]*grid-template-columns:\s*340px minmax\(0, 1fr\)/i);
  assert.match(v5Css, /\.attachment-core-grid[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\) 300px/i);
});

test('V5 remains presentation-only', () => {
  assert.doesNotMatch(v5Js, /calculateAbility|simulate\(|worker|fetch\(/i);
});
