import { copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'prototype');
const out = path.join(root, '_site');

const sourceHtml = await readFile(path.join(source, 'combat-prototype.html'), 'utf8');
const html = sourceHtml
  .replace(
    '</head>',
    '  <link rel="stylesheet" href="./combat-prototype-v2.css">\n  <link rel="stylesheet" href="./combat-prototype-v2-polish.css">\n</head>',
  )
  .replace(
    '</body>',
    '  <script src="./combat-prototype-v2.js"></script>\n</body>',
  );

await Promise.all([
  writeFile(path.join(out, 'combat-prototype.html'), html, 'utf8'),
  copyFile(path.join(source, 'combat-prototype.css'), path.join(out, 'combat-prototype.css')),
  copyFile(path.join(source, 'combat-prototype.js'), path.join(out, 'combat-prototype.js')),
  copyFile(path.join(source, 'combat-prototype-v2.css'), path.join(out, 'combat-prototype-v2.css')),
  copyFile(path.join(source, 'combat-prototype-v2-polish.css'), path.join(out, 'combat-prototype-v2-polish.css')),
  copyFile(path.join(source, 'combat-prototype-v2.js'), path.join(out, 'combat-prototype-v2.js')),
]);

console.log('Built Combat UX prototype at /combat-prototype.html');
