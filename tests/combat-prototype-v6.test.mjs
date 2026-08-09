import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../_site/combat-prototype.html', import.meta.url), 'utf8');
const v6Css = await readFile(new URL('../_site/combat-prototype-v6.css', import.meta.url), 'utf8');
const v6Js = await readFile(new URL('../_site/combat-prototype-v6.js', import.meta.url), 'utf8');

test('V6 compacts Stats into icon-backed tiles', () => {
  assert.match(html, /combat-prototype-v6\.css/);
  assert.match(html, /combat-prototype-v6\.js/);
  assert.match(v6Js, /compact-stat-grid-v6/);
  assert.match(v6Js, /stat-tile-v6/);
  for (const icon of [
    'skills/attack.webp',
    'skills/strength.webp',
    'skills/defence.webp',
    'skills/constitution.webp',
    'combat/melee-abilities.webp',
  ]) assert.ok(v6Js.includes(icon), `missing stat icon mapping: ${icon}`);
  assert.match(v6Css, /\.compact-stat-grid-v6[\s\S]*repeat\(3/i);
  assert.match(v6Css, /\.stat-tile-v6[\s\S]*min-height:\s*40px/i);
});

test('V6 moves Buffs and Effects into the Stats panel', () => {
  assert.match(v6Js, /effects-inside-stats-v6/);
  assert.match(v6Js, /statsModule\.append\(effectsModule\)/);
  assert.match(v6Js, /Buffs & effects/);
  assert.match(v6Css, /\.effects-inside-stats-v6/);
  assert.match(v6Css, /\.effects-inside-stats-v6 \.buff-category-stage\.buff-direct-grid[\s\S]*repeat\(4/i);
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
