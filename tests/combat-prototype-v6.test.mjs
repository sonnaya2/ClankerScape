import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../_site/combat-prototype.html', import.meta.url), 'utf8');
const v6Css = await readFile(new URL('../_site/combat-prototype-v6.css', import.meta.url), 'utf8');
const v6Js = await readFile(new URL('../_site/combat-prototype-v6.js', import.meta.url), 'utf8');

test('V6 compacts combat inputs into icon-backed content-sized tiles', () => {
  assert.match(html, /combat-prototype-v6\.css/);
  assert.match(html, /combat-prototype-v6\.js/);
  assert.match(v6Js, /compact-stat-grid-v6/);
  assert.match(v6Js, /stat-tile-v6/);
  for (const icon of [
    'skills/attack.webp',
    'skills/strength.webp',
    'skills/defence.webp',
    'skills/constitution.webp',
    'skills/herblore.webp',
    'combat/melee-abilities.webp',
  ]) assert.ok(v6Js.includes(icon), `missing stat icon mapping: ${icon}`);
  assert.match(v6Css, /\.compact-stat-grid-v6[\s\S]*display:\s*flex/i);
  assert.match(v6Css, /\.stat-tile-v6[\s\S]*flex:\s*0 0 122px/i);
  assert.doesNotMatch(v6Css, /\.compact-stat-grid-v6[\s\S]{0,180}repeat\(3/i);
});

test('V6 folds Current HP into Constitution instead of spending another stat tile', () => {
  assert.match(v6Js, /currentHpRow/);
  assert.match(v6Js, /constitutionTile/);
  assert.match(v6Js, /stat-subrow-v6/);
  assert.match(v6Css, /\.stat-tile-v6--life/);
});

test('V6 moves Herblore out of Poison and into combat inputs', () => {
  assert.match(v6Js, /data-buff-panel="poison"/);
  assert.match(v6Js, /herblore level/);
  assert.match(v6Js, /herblore-stat-row-v6/);
  assert.match(v6Js, /dataset\.stat = 'herblore-level'/);
  assert.match(v6Js, /poison-potency-only-v6/);
});

test('V6 keeps Buffs and Effects with combat settings without stretching categories', () => {
  assert.match(v6Js, /effects-inside-stats-v6/);
  assert.match(v6Js, /statsModule\.append\(effectsModule\)/);
  assert.match(v6Js, /Buffs & effects/);
  assert.match(v6Css, /\.effects-inside-stats-v6/);
  assert.match(v6Css, /buff-category-stage\.buff-direct-grid[\s\S]*display:\s*flex/i);
  assert.match(v6Css, /buff-category-stage\.buff-direct-grid > \.buff-category[\s\S]*flex:\s*0 0 150px/i);
});

test('V6 keeps advanced stats and More buffs as disclosure instead of permanent height', () => {
  assert.match(v6Js, /advanced-stats-v6/);
  assert.match(v6Css, /\.advanced-stats-v6 > summary/);
  assert.match(v6Css, /more-effects-disclosure--menu/);
});

test('V6 remains presentation-only and avoids generic generated-dashboard styling', () => {
  assert.doesNotMatch(v6Js, /calculateAbility|simulate\(|worker|fetch\(/i);
  assert.doesNotMatch(v6Css, /linear-gradient|radial-gradient|backdrop-filter|glassmorphism/i);
  assert.doesNotMatch(v6Css, /inset\s+3px\s+0\s+0/i);
});
