import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const canonical = await readFile(new URL('../_site/combat-prototype.html', import.meta.url), 'utf8');
const v5Alias = await readFile(new URL('../_site/combat-prototype-v5.html', import.meta.url), 'utf8');
const v6Alias = await readFile(new URL('../_site/combat-prototype-v6.html', import.meta.url), 'utf8');

test('combat prototype assets are cache-busted per build', () => {
  assert.match(canonical, /combat-prototype-v6\.css\?v=[A-Za-z0-9_-]+/);
  assert.match(canonical, /combat-prototype-v6\.js\?v=[A-Za-z0-9_-]+/);
  assert.match(canonical, /combat-prototype-v5\.css\?v=[A-Za-z0-9_-]+/);
  assert.match(canonical, /combat-prototype-v5\.js\?v=[A-Za-z0-9_-]+/);
  assert.match(canonical, /combat-prototype\.css\?v=[A-Za-z0-9_-]+/);
  assert.match(canonical, /combat-prototype\.js\?v=[A-Za-z0-9_-]+/);
  assert.match(canonical, /name="prototype-build" content="[A-Za-z0-9_-]+"/);
});

test('version aliases serve the same current prototype shell', () => {
  assert.equal(v5Alias, canonical);
  assert.equal(v6Alias, canonical);
  assert.match(v6Alias, /combat-prototype-v6\.js/);
});
