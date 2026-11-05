/**
 * Visual explainers: concepts shown by animation instead of words.
 *  - Show:    code changes step by step, the result on the right animates smoothly
 *  - Animate: icons move around a stage (packets fly, robots walk, data flows)
 */
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneFrame } from '../scene/SceneFrame';
import { useSceneText, useStep } from '../scene/hooks';
import { CodeBlock } from '../code/CodeBlock';

/** Shrink the code font for long lines or many lines so nothing is clipped. */
function codeSize(code: string): number {
  const lines = code.split('\n');
  const wide = Math.max(...lines.map((l) => l.length));
  let size = lines.length > 8 ? 24 : 30;
  if (wide > 30) size = Math.min(size, Math.floor(30 * 30 / wide));
  return Math.max(17, size);
}
import { emojiHtml } from '../../emoji/html';
import type { AnimateScene, KitScene, ShowScene } from './types';

const useK = <T extends KitScene>() => useSceneText() as unknown as T;

/* ───────── Show: code → animated result ───────── */

/** Every property change in the preview animates; new elements pop in */
const PREVIEW_BASE = `
:host { all: initial; display: block; width: 100%; height: 100%; }
.__root { width: 100%; height: 100%; box-sizing: border-box; padding: 28px; overflow: hidden;
  font-family: Manrope, system-ui, sans-serif; font-size: 26px; color: #16181f; background: #fff; }
.__root * { transition: all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1); box-sizing: border-box; }
.__in { animation: __pop 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.3) both; }
@keyframes __pop { from { opacity: 0; transform: scale(0.6) translateY(20px); } to { opacity: 1; transform: none; } }
img.emoji { width: 1.1em; height: 1.1em; vertical-align: -0.18em; display: inline-block; }
`;

/** Minimal DOM morph: keeps matching nodes so CSS transitions can play */
function morph(from: Node, to: Node) {
  const a = Array.from(from.childNodes);
  const b = Array.from(to.childNodes);
  b.forEach((nb, i) => {
    const na = a[i];
    if (!na) {
      const clone = nb.cloneNode(true);
      if (clone instanceof Element) clone.classList.add('__in');
      from.appendChild(clone);
    } else if (na.nodeType !== nb.nodeType || (na instanceof Element && nb instanceof Element && na.tagName !== nb.tagName)) {
      const clone = nb.cloneNode(true);
      if (clone instanceof Element) clone.classList.add('__in');
      from.replaceChild(clone, na);
    } else if (na.nodeType === Node.TEXT_NODE) {
      if (na.nodeValue !== nb.nodeValue) na.nodeValue = nb.nodeValue;
    } else if (na instanceof Element && nb instanceof Element) {
      for (const attr of Array.from(na.attributes)) if (!nb.hasAttribute(attr.name) && attr.name !== 'class') na.removeAttribute(attr.name);
      for (const attr of Array.from(nb.attributes)) if (na.getAttribute(attr.name) !== attr.value) na.setAttribute(attr.name, attr.value);
      if (!nb.hasAttribute('class') && na.getAttribute('class') === '__in') na.removeAttribute('class');
      morph(na, nb);
    }
  });
  for (let i = a.length - 1; i >= b.length; i--) from.removeChild(a[i]);
}

function AnimatedPreview({ html, css }: { html: string; css: string }) {
  const host = useRef<HTMLDivElement>(null);
  const parts = useRef<{ style: HTMLStyleElement; root: HTMLDivElement } | null>(null);
  useLayoutEffect(() => {
    const el = host.current;
    if (!el || parts.current) return;
    const shadow = el.shadowRoot ?? el.attachShadow({ mode: 'open' });
    const base = document.createElement('style');
    base.textContent = PREVIEW_BASE;
    const style = document.createElement('style');
    const root = document.createElement('div');
    root.className = '__root';
    shadow.append(base, style, root);
    parts.current = { style, root };
  }, []);
  useEffect(() => {
    const p = parts.current;
    if (!p) return;
    // scope "body"/"html" selectors of lesson CSS to the preview root
    p.style.textContent = css.replace(/(^|[},\s])(html|body)(?=[\s{,.:])/g, '$1.__root');
    const next = document.createElement('div');
    next.innerHTML = emojiHtml(html);
    morph(p.root, next);
  }, [html, css]);
  return <div ref={host} className="kit-show__preview" />;
}

function Show() {
  const s = useK<ShowScene>();
  const [step] = useStep();
  const cur = Math.min(step, s.steps.length - 1);
  const st = s.steps[cur];
  return (
    <SceneFrame variant="code" showTakeaway={cur === s.steps.length - 1}>
      <div className="kit-show">
        <div className="kit-show__left">
          <AnimatePresence mode="wait">
            <motion.div key={cur} className="kit-show__code" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <CodeBlock code={st.code} lang={st.lang ?? s.lang ?? 'html'} activeLine={st.line} fontSize={codeSize(st.code)} />
            </motion.div>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.p key={cur} className="kit-show__say" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <span className="kit-show__n">{cur + 1}</span>
              {st.say}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="kit-show__right">
          <span className="kit-show__label">▶︎</span>
          <AnimatedPreview html={st.html} css={(s.css ?? '') + '\n' + (st.css ?? '')} />
        </div>
      </div>
    </SceneFrame>
  );
}

/* ───────── Animate: moving icons ───────── */

type Pos = { x: number; y: number; s: number };

/** Author coordinates are 0–100; keep actors (and their labels) inside the stage */
const px = (x: number) => 7 + x * 0.86;
const py = (y: number) => 10 + y * 0.74;

function Animate() {
  const s = useK<AnimateScene>();
  const [step] = useStep();
  const cur = Math.min(step, s.steps.length - 1);

  // positions and looks accumulate over steps; `hide` removes an actor
  const frames = useMemo(() => {
    const pos: Record<string, Pos | undefined> = {};
    const look: Record<string, { icon?: string; text?: string; label?: string }> = {};
    for (const a of s.actors) look[a.id] = { icon: a.icon, text: a.text, label: a.label };
    return s.steps.map((st) => {
      for (const [id, v] of Object.entries(st.at ?? {})) pos[id] = { x: px(v[0]), y: py(v[1]), s: v[2] ?? 1 };
      for (const id of st.hide ?? []) pos[id] = undefined;
      for (const [id, v] of Object.entries(st.set ?? {})) look[id] = { ...look[id], ...v };
      return { pos: { ...pos }, look: JSON.parse(JSON.stringify(look)) as typeof look };
    });
  }, [s]);
  const f = frames[cur];
  const st = s.steps[cur];

  return (
    <SceneFrame showTakeaway={cur === s.steps.length - 1}>
      <div className="kit-anim">
        <div className="kit-anim__stage">
          <svg className="kit-anim__lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            {(st.lines ?? []).map(([a, b], i) => {
              const pa = f.pos[a];
              const pb = f.pos[b];
              if (!pa || !pb) return null;
              return <motion.line key={`${a}-${b}-${i}`} x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />;
            })}
          </svg>
          {(st.lines ?? []).map(([a, b, label], i) => {
            const pa = f.pos[a];
            const pb = f.pos[b];
            if (!label || !pa || !pb) return null;
            return (
              <motion.span key={`l${i}`} className="kit-anim__linelabel" style={{ left: `${(pa.x + pb.x) / 2}%`, top: `${(pa.y + pb.y) / 2}%` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                {label}
              </motion.span>
            );
          })}
          {s.actors.map((a) => {
            const p = f.pos[a.id];
            const lk = f.look[a.id];
            const pulse = st.pulse?.includes(a.id);
            return (
              <motion.div
                key={a.id}
                className={`kit-actor ${lk.text ? 'kit-actor--text' : ''} ${pulse ? 'is-pulse' : ''}`}
                initial={false}
                animate={p ? { left: `${p.x}%`, top: `${p.y}%`, scale: p.s, opacity: 1 } : { opacity: 0, scale: 0.4 }}
                transition={{ type: 'spring', stiffness: 90, damping: 16 }}
              >
                {lk.icon && <span className="kit-actor__icon">{lk.icon}</span>}
                {lk.text && <span className="kit-actor__text">{lk.text}</span>}
                {lk.label && <span className="kit-actor__label">{lk.label}</span>}
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={cur} className="kit-anim__say" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span className="kit-show__n">{cur + 1}</span>
            {st.say}
          </motion.p>
        </AnimatePresence>
      </div>
    </SceneFrame>
  );
}

export const VISUAL = { show: Show, animate: Animate };
