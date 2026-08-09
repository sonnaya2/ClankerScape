import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../_site/combat-prototype.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../_site/combat-prototype.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../_site/combat-prototype.js', import.meta.url), 'utf8');

const artRoot = 'https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/';

test('combat prototype covers the complete combat IA', () => {
  for (const value of [
    'Loadout', 'Rotation', 'Analysis', 'Gear', 'Stats', 'Buffs', 'Arch', 'Invention',
    'Abilities', 'Target', 'Setup summary', 'RNG / fidelity', 'Stateful limitations',
  ]) assert.ok(html.includes(value), `missing combat prototype surface: ${value}`);
});

test('prototype implements the design-document disclosure model', () => {
  for (const value of [
    'Filters', 'Passives', 'Set effects', 'Advanced assumptions', 'Scenario modeling',
    'Optimizer dock', 'Damage', 'Timeline', 'Model notes',
  ]) assert.ok(html.includes(value), `missing disclosure surface: ${value}`);
  assert.match(html, /active-effects-strip/);
});

test('prototype exposes the recommended and alternative design lenses', () => {
  for (const lens of ['focused', 'instrument', 'print', 'compact']) {
    assert.match(html, new RegExp(`data-lens="${lens}"`));
  }
  assert.match(css, /prototype-instrument/);
  assert.match(css, /prototype-print/);
  assert.match(css, /prototype-compact/);
});

test('prototype uses the same pinned Equilibrium RuneScape art source', () => {
  assert.ok(js.includes(artRoot));
  assert.doesNotMatch(html, /https?:\/\//i);
  assert.doesNotMatch(css, /url\(\s*["']?https?:\/\//i);
});

test('prototype remains a presentation prototype rather than engine code', () => {
  assert.match(html, /presentation only · no engine/);
  assert.doesNotMatch(js, /damage\s*[+*\/-]=|calculateAbility|simulate\(|worker|fetch\(/i);
});

test('new visual layer avoids generic AI dashboard treatment', () => {
  assert.doesNotMatch(html, />\s*(?:dashboard|workspace|KPI|unlock your potential|optimi[sz]e your)\s*</i);
  assert.doesNotMatch(css, /backdrop-filter|glassmorphism|radial-gradient|linear-gradient/i);
});
