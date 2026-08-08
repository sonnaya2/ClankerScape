import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const index = await readFile(new URL('../_site/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

test('public page is a literal read-only route sheet', () => {
  assert.match(index, /Do this\. In this order\./);
  assert.match(index, /Talk to Hans and find out how old you are/);
  assert.match(index, /pay exactly 875 coins/);
  assert.match(index, /one-time 10,000 coins/);
  assert.match(index, /pick 10 bananas, fill Luthas(?:'|&#x27;|&#39;) crate/);
  assert.match(index, /Bring 1,000 coins/);
  assert.match(index, /task<\/small><strong>050<\/strong>/);
  assert.match(index, /Karamja unlocked/);
  assert.match(index, /392/);
  assert.match(index, /58 task slots are not published yet/);
  assert.doesNotMatch(index, /<(?:button|input|select|textarea)\b/i);
  assert.doesNotMatch(index, /<script\b|localStorage|sessionStorage|contenteditable/i);
});

test('working route choices remain explicit', () => {
  for (const value of [
    'Desert → Asgarnia → Anachronia',
    'Golden Touch', 'Animal Wrangler', 'Voidwalker', 'Crystal Grace',
    'Production Master', 'Rejuvenated + Devout', 'Infernal Fire',
    'Big Boned', 'Abyssal Cinders', 'Avernic Rampage', "Demon’s Mark",
    'True Equilibrium', 'Lord of Light', 'Tempered Heart', 'Genesis Essence',
  ]) assert.ok(index.includes(value), `missing route choice: ${value}`);
});

test('Catalyst-only route mechanics never leak into Equilibrium walkthrough', () => {
  for (const value of ['Excavator', 'Golden Footed', "Fairy’s Flight", "Fairy's Flight"]) {
    assert.equal(index.includes(value), false, `Catalyst mechanic leaked: ${value}`);
  }
});

test('generic AI dashboard chrome stays absent', () => {
  assert.doesNotMatch(css, /gradient|glow|backdrop-filter|border-radius/i);
  assert.doesNotMatch(index, /dashboard|workspace|KPI|optimi[sz]e your|unlock your potential|State \/ source|>Park</i);
});
