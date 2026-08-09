import { copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'prototype');
const out = path.join(root, '_site');

await Promise.all([
  copyFile(path.join(source, 'combat-prototype.html'), path.join(out, 'combat-prototype.html')),
  copyFile(path.join(source, 'combat-prototype.css'), path.join(out, 'combat-prototype.css')),
  copyFile(path.join(source, 'combat-prototype.js'), path.join(out, 'combat-prototype.js')),
]);

console.log('Built Combat UX prototype at /combat-prototype.html');
