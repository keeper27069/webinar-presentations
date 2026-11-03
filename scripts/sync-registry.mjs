#!/usr/bin/env node
/**
 * Regenerates the kit-lesson block of src/lessons/registry.ts from the spec files
 * src/lessons/<module>/<slug>.ts (id + planned minutes = sum of notes.min).
 *   node scripts/sync-registry.mjs
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';

const root = new URL('../src/lessons/', import.meta.url).pathname;
const START = '  // <kit>';
const END = '  // </kit>';
const lines = [];
for (const mod of readdirSync(root)) {
  const dir = path.join(root, mod);
  if (!statSync(dir).isDirectory()) continue;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.ts')) continue;
    const src = readFileSync(path.join(dir, f), 'utf8');
    if (!src.includes("from '@engine/kit'")) continue;
    const id = /id:\s*'([a-z-]+-[gt]\d+)'/.exec(src)?.[1];
    if (!id) continue;
    const minutes = [...src.matchAll(/\bmin:\s*(\d+)\s*,?\s*\}/g)].reduce((a, m) => a + Number(m[1]), 0);
    lines.push([id, `  '${id}': { load: () => import('./${mod}/${f.replace(/\.ts$/, '')}'), minutes: ${minutes} },`]);
  }
}
const order = ['html', 'css', 'bootstrap', 'tilda-git', 'js', 'react'];
const rank = (id) => {
  const m = /^(.*)-([gt])(\d+)$/.exec(id);
  return order.indexOf(m[1]) * 1000 + (m[2] === 't' ? 500 : 0) + Number(m[3]);
};
lines.sort((a, b) => rank(a[0]) - rank(b[0]));
const reg = path.join(root, 'registry.ts');
const t = readFileSync(reg, 'utf8');
const a = t.indexOf(START);
const b = t.indexOf(END);
if (a < 0 || b < 0) throw new Error('kit markers not found in registry.ts');
writeFileSync(reg, t.slice(0, a + START.length) + '\n' + lines.map((l) => l[1]).join('\n') + '\n' + t.slice(b));
console.log(`${lines.length} kit lessons, ${lines.reduce((s, l) => s + Number(/minutes: (\d+)/.exec(l[1])[1]), 0)} min`);
