#!/usr/bin/env node
/**
 * Smoke test for lessons.
 *   npm run smoke -- <lessonId|all> [--lang uz,ru,en] [--no-shots]
 *   BASE_URL=http://localhost:5173 npm run smoke -- css-g09   (use a running server)
 *
 * For each language it opens scene 1 at 1920×1080 and presses → until the end:
 *  - console errors / page errors           → error
 *  - → does not change step or scene        → error (dead end)
 *  - element outside the 1920×1080 stage    → error
 *  - clipped content (overflow:hidden)      → warning
 * Then it clicks the buttons of every scene ("monkey pass") and checks again.
 * Screenshots: .smoke/<lessonId>/<lang>-<scene>-<step|after>.png
 * Requires Playwright: npm i -D playwright && npx playwright install chromium
 */
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright';

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--')) ?? 'all';
const langs = (args.find((a) => a.startsWith('--lang='))?.split('=')[1] ?? 'uz,ru,en').split(',');
const shots = !args.includes('--no-shots');

// Lesson list from the registry sources (no TS import needed)
const topics = readFileSync(new URL('../src/lessons/topics.ts', import.meta.url), 'utf8');
const registry = readFileSync(new URL('../src/lessons/registry.ts', import.meta.url), 'utf8');
const ready = [...registry.matchAll(/'([a-z-]+-[gt]\d+)':\s*\{\s*load/g)].map((m) => m[1]);
const lessons = ready
  .filter((id) => target === 'all' || id === target)
  .map((id) => {
    const m = new RegExp(`\\['${id}',\\s*'([^']+)'`).exec(topics);
    return { id, module: id.replace(/-[gt]\d+$/, ''), slug: m?.[1] };
  });
if (!lessons.length) {
  console.error(`No ready lesson "${target}". Ready: ${ready.join(', ')}`);
  process.exit(2);
}

let server = null;
let base = process.env.BASE_URL;
if (!base) {
  base = 'http://localhost:4173';
  server = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], { stdio: 'ignore', shell: true });
  await sleep(2500);
}

const browser = await chromium.launch();
const errors = [];
const warnings = [];

const CHECK = () => {
  const stage = document.querySelector('[data-stage]');
  if (!stage) return { out: [], clipped: [] };
  const sr = stage.getBoundingClientRect();
  const out = [];
  const clipped = [];
  const scope = stage.querySelector('.scene-area') ?? stage;
  const body = stage.querySelector('.scene__body');
  const br = body?.getBoundingClientRect();
  for (const el of scope.querySelectorAll('*')) {
    if (el.closest('[data-allow-overflow]')) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const name = `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]} "${(el.textContent ?? '').trim().slice(0, 40)}"`;
    if (r.right > sr.right + 2 || r.bottom > sr.bottom + 2 || r.left < sr.left - 2) out.push(name);
    else if (br && body.contains(el) && (r.bottom > br.bottom + 4 || r.right > br.right + 4)) out.push(`${name} (spills out of the scene body — overlaps takeaway/edges)`);
    if ((cs.overflow === 'hidden' || cs.overflowX === 'hidden' || cs.overflowY === 'hidden') && !el.matches('iframe, .scene-area, .scene-motion, .scene, .live__cm, .cm-editor, .deep__body, .mission__explain')) {
      if (el.scrollHeight > el.clientHeight + 3 || el.scrollWidth > el.clientWidth + 3) clipped.push(name);
    }
  }
  return { out: [...new Set(out)].slice(0, 5), clipped: [...new Set(clipped)].slice(0, 5) };
};

for (const l of lessons) {
  mkdirSync(`.smoke/${l.id}`, { recursive: true });
  for (const lang of langs) {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    const tag = `${l.id}/${lang}`;
    page.on('console', (m) => m.type() === 'error' && errors.push(`${tag}: console: ${m.text()}`));
    page.on('pageerror', (e) => errors.push(`${tag}: pageerror: ${e.message}`));
    await page.goto(`${base}/${lang}/${l.module}/${l.slug}/1`);
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
    await page.waitForSelector('.player', { timeout: 15000 });
    const state = () => page.$eval('.player', (e) => ({ scene: +e.dataset.scene, step: +e.dataset.step, steps: +e.dataset.steps, total: +e.dataset.total }));
    let s = await state();
    const seen = [];
    for (let guard = 0; guard < 200; guard++) {
      await sleep(450);
      const where = `${tag} scene ${s.scene + 1} step ${s.step + 1}`;
      const c = await page.evaluate(CHECK);
      c.out.forEach((n) => errors.push(`${where}: outside stage: ${n}`));
      c.clipped.forEach((n) => warnings.push(`${where}: clipped: ${n}`));
      if (shots) await page.screenshot({ path: `.smoke/${l.id}/${lang}-${String(s.scene + 1).padStart(2, '0')}-${s.step + 1}.png` });
      seen.push(s.scene);
      if (s.scene === s.total - 1 && s.step === s.steps - 1) break;
      await page.keyboard.press('ArrowRight');
      await sleep(80);
      const n = await state();
      if (n.scene === s.scene && n.step === s.step) {
        errors.push(`${where}: dead end — → did not advance`);
        break;
      }
      s = n;
    }
    // Monkey pass: click the scene's buttons and re-check
    for (let i = 0; i < s.total; i++) {
      await page.goto(`${base}/${lang}/${l.module}/${l.slug}/${i + 1}`);
      await page.waitForSelector('.player');
      await sleep(400);
      const buttons = await page.$$('.scene button:not([disabled]), .scene .chip, .scene .code__line.is-clickable');
      for (const b of buttons.slice(0, 14)) {
        try {
          await b.click({ timeout: 800 });
          await sleep(160);
        } catch {
          /* element may have disappeared */
        }
      }
      await sleep(900);
      const where = `${tag} scene ${i + 1} (after clicks)`;
      const c = await page.evaluate(CHECK);
      c.out.forEach((n) => errors.push(`${where}: outside stage: ${n}`));
      c.clipped.forEach((n) => warnings.push(`${where}: clipped: ${n}`));
      if (shots) await page.screenshot({ path: `.smoke/${l.id}/${lang}-${String(i + 1).padStart(2, '0')}-after.png` });
    }
    await page.close();
  }
  // Notes completeness (content files)
  for (const lang of langs) {
    const file = readFileSync(new URL(`../src/lessons/${l.module}/${l.slug}/content/${lang}.ts`, import.meta.url), 'utf8');
    const minutes = [...file.matchAll(/minutes:\s*(\d+)/g)].map((m) => +m[1]);
    if (minutes.some((m) => m <= 0)) errors.push(`${l.id}/${lang}: scene with minutes <= 0`);
    console.log(`${l.id}/${lang}: ${minutes.length} scenes with notes, ${minutes.reduce((a, b) => a + b, 0)} min planned`);
  }
}

await browser.close();
server?.kill();
const uniq = (a) => [...new Set(a)];
uniq(warnings).forEach((w) => console.log('⚠', w));
uniq(errors).forEach((e) => console.log('✗', e));
console.log(`\n${uniq(errors).length} errors, ${uniq(warnings).length} warnings`);
process.exit(errors.length ? 1 : 0);
