import { copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'prototype');
const out = path.join(root, '_site');
const buildRevision = (process.env.GITHUB_SHA || 'local-dev').slice(0, 12);
const versioned = (asset) => `${asset}?v=${buildRevision}`;

const sourceHtml = await readFile(path.join(source, 'combat-prototype.html'), 'utf8');
let html = sourceHtml
  .replace(
    '</head>',
    `  <link rel="stylesheet" href="${versioned('./combat-prototype-v2.css')}">\n  <link rel="stylesheet" href="${versioned('./combat-prototype-v2-polish.css')}">\n  <link rel="stylesheet" href="${versioned('./combat-prototype-v3.css')}">\n  <link rel="stylesheet" href="${versioned('./combat-prototype-v4.css')}">\n  <link rel="stylesheet" href="${versioned('./combat-prototype-v5.css')}">\n  <link rel="stylesheet" href="${versioned('./combat-prototype-v6.css')}">\n</head>`,
  )
  .replace(
    '</body>',
    `  <script src="${versioned('./combat-prototype-v2.js')}"></script>\n  <script src="${versioned('./combat-prototype-v3.js')}"></script>\n  <script src="${versioned('./combat-prototype-v4.js')}"></script>\n  <script src="${versioned('./combat-prototype-v5.js')}"></script>\n  <script src="${versioned('./combat-prototype-v6.js')}"></script>\n</body>`,
  );

// The base stylesheet/script are authored in the source HTML, so version them too.
html = html
  .replace('./combat-prototype.css"', `${versioned('./combat-prototype.css')}"`)
  .replace('./combat-prototype.js"', `${versioned('./combat-prototype.js')}"`)
  .replace('</head>', `  <meta name="prototype-build" content="${buildRevision}">\n</head>`);

await Promise.all([
  writeFile(path.join(out, 'combat-prototype.html'), html, 'utf8'),
  // Keep previous visual-generation aliases working and publish the newest one.
  writeFile(path.join(out, 'combat-prototype-v5.html'), html, 'utf8'),
  writeFile(path.join(out, 'combat-prototype-v6.html'), html, 'utf8'),
  copyFile(path.join(source, 'combat-prototype.css'), path.join(out, 'combat-prototype.css')),
  copyFile(path.join(source, 'combat-prototype.js'), path.join(out, 'combat-prototype.js')),
  copyFile(path.join(source, 'combat-prototype-v2.css'), path.join(out, 'combat-prototype-v2.css')),
  copyFile(path.join(source, 'combat-prototype-v2-polish.css'), path.join(out, 'combat-prototype-v2-polish.css')),
  copyFile(path.join(source, 'combat-prototype-v2.js'), path.join(out, 'combat-prototype-v2.js')),
  copyFile(path.join(source, 'combat-prototype-v3.css'), path.join(out, 'combat-prototype-v3.css')),
  copyFile(path.join(source, 'combat-prototype-v3.js'), path.join(out, 'combat-prototype-v3.js')),
  copyFile(path.join(source, 'combat-prototype-v4.css'), path.join(out, 'combat-prototype-v4.css')),
  copyFile(path.join(source, 'combat-prototype-v4.js'), path.join(out, 'combat-prototype-v4.js')),
  copyFile(path.join(source, 'combat-prototype-v5.css'), path.join(out, 'combat-prototype-v5.css')),
  copyFile(path.join(source, 'combat-prototype-v5.js'), path.join(out, 'combat-prototype-v5.js')),
  copyFile(path.join(source, 'combat-prototype-v6.css'), path.join(out, 'combat-prototype-v6.css')),
  copyFile(path.join(source, 'combat-prototype-v6.js'), path.join(out, 'combat-prototype-v6.js')),
]);

console.log(`Built Combat UX prototype at /combat-prototype.html (${buildRevision})`);
