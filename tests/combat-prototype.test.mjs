import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../_site/combat-prototype.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../_site/combat-prototype.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../_site/combat-prototype.js', import.meta.url), 'utf8');
const v2Css = await readFile(new URL('../_site/combat-prototype-v2.css', import.meta.url), 'utf8');
const v2Polish = await readFile(new URL('../_site/combat-prototype-v2-polish.css', import.meta.url), 'utf8');
const v2Js = await readFile(new URL('../_site/combat-prototype-v2.js', import.meta.url), 'utf8');
const v3Css = await readFile(new URL('../_site/combat-prototype-v3.css', import.meta.url), 'utf8');
const v3Js = await readFile(new URL('../_site/combat-prototype-v3.js', import.meta.url), 'utf8');

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

test('V2 consolidates loadout state instead of adding more destinations', () => {
  assert.match(html, /combat-prototype-v2\.css/);
  assert.match(html, /combat-prototype-v2-polish\.css/);
  assert.match(html, /combat-prototype-v2\.js/);

  for (const contract of [
    'equipmentPicker',
    'openEquipmentPicker',
    'Prayer / curse',
    'loadout-attachment-stage',
    'perkPicker',
    'monolith-slots',
    'relicPicker',
    'buff-direct-grid',
  ]) assert.ok(v2Js.includes(contract), `missing V2 loadout contract: ${contract}`);

  assert.match(v2Js, /\[data-subtab="arch"\]\'\)\?\.remove\(\)/);
  assert.match(v2Js, /\[data-subtab="invention"\]\'\)\?\.remove\(\)/);
  assert.match(v2Css, /\.gear-stage-grid > \.equipment-browser\s*\{[\s\S]*display:\s*none/i);
});

test('equipment, perk, and archaeology catalogues are contextual native dialogs', () => {
  assert.match(v2Js, /document\.createElement\('dialog'\)/);
  assert.match(v2Js, /showModal\(\)/);
  assert.match(v2Js, /equipment-picker-dialog/);
  assert.match(v2Css, /\.picker-dialog/);
  assert.match(v2Css, /\.perk-picker-dialog/);
  assert.match(v2Css, /\.relic-picker-dialog/);
  assert.match(v2Css, /::backdrop/);
});

test('V2 removes asymmetric thick selected-edge treatment', () => {
  assert.doesNotMatch(v2Css, /inset\s+3px\s+0\s+0/i);
  assert.match(v2Css, /\.equipment-row\.is-selected[\s\S]*outline:\s*1px solid var\(--teal\)/i);
  assert.match(v2Css, /\.slot\.is-selected[\s\S]*box-shadow:\s*inset 0 0 0 1px/i);
});

test('Buffs returns common controls to direct access and prayer leaves Buffs', () => {
  assert.match(v2Js, /\[data-buff-cat="prayers"\][\s\S]*remove\(\)/);
  assert.match(v2Js, /buff-direct-workbench/);
  assert.match(v2Js, /directOrder = \['debuff', 'poison', 'boosts', 'relics'\]/);
  assert.match(v2Js, /League \/ rare effects/);
  assert.match(v2Css, /buff-category-stage\.buff-direct-grid/);
});

test('V3 makes Loadout the home for stats and remaining effects', () => {
  assert.match(html, /combat-prototype-v3\.css/);
  assert.match(html, /combat-prototype-v3\.js/);
  assert.match(v3Js, /\[data-subtab="stats"\]\'\)\?\.remove\(\)/);
  assert.match(v3Js, /\[data-subtab="buffs"\]\'\)\?\.remove\(\)/);
  assert.match(v3Js, /loadout-stats-module/);
  assert.match(v3Js, /statsModule\.append\(statsGroups\)/);
  assert.match(v3Js, /loadout-effects-module/);
  assert.match(v3Js, /effectsModule\.append\(activeEffects\)/);
  assert.match(v3Js, /effectsModule\.append\(buffWorkbench\)/);
});

test('V3 aligns Archaeology vertically beside Invention', () => {
  assert.match(v3Js, /attachment-core-grid/);
  assert.match(v3Js, /coreGrid\.append\(inventionBlock, monolithBlock\)/);
  assert.match(v3Css, /\.attachment-core-grid\s*\{[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\) 276px/i);
  assert.match(v3Css, /\.monolith-module \.arch-energy-rail\s*\{[\s\S]*flex-direction:\s*column/i);
  assert.match(v3Css, /\.monolith-module \.monolith-slots\s*\{[\s\S]*grid-template-columns:\s*1fr !important/i);
});

test('V3 keeps the main Loadout dense rather than duplicating resolved stats', () => {
  assert.match(v3Css, /\.loadout-stats-module \.derived-row\s*\{[\s\S]*display:\s*none/i);
  assert.match(v3Js, /resolved output stays in Setup Summary/);
  assert.match(v3Css, /\.loadout-effects-module \.buff-category-stage\.buff-direct-grid\s*\{[\s\S]*repeat\(4/i);
});

test('prototype uses the same pinned Equilibrium RuneScape art source', () => {
  assert.ok(js.includes(artRoot));
  assert.doesNotMatch(html, /https?:\/\//i);
  assert.doesNotMatch(css + v2Css + v2Polish + v3Css, /url\(\s*["']?https?:\/\//i);
});

test('prototype remains a presentation prototype rather than engine code', () => {
  assert.match(html, /presentation only · no engine/);
  assert.doesNotMatch(js + v2Js + v3Js, /damage\s*[+*\/-]=|calculateAbility|simulate\(|worker|fetch\(/i);
});

test('new visual layers avoid generic AI dashboard treatment', () => {
  assert.doesNotMatch(html, />\s*(?:dashboard|workspace|KPI|unlock your potential|optimi[sz]e your)\s*</i);
  assert.doesNotMatch(css + v2Css + v2Polish + v3Css, /backdrop-filter|glassmorphism|radial-gradient|linear-gradient/i);
});
