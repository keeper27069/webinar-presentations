import type { ComponentType, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUi } from '@/i18n';
import { SceneFrame } from '../scene/SceneFrame';
import { useNumberKeys, useSceneState, useSceneText, useStep } from '../scene/hooks';
import { PollReveal } from '../interactions/PollReveal';
import { PredictSlider } from '../interactions/PredictSlider';
import { ChatBoard } from '../interactions/ChatBoard';
import { DragSort } from '../interactions/DragSort';
import { CodeBlock } from '../code/CodeBlock';
import { LiveCode } from '../code/LiveCode';
import { PredictOutput } from '../code/PredictOutput';
import { BugHunt } from '../code/BugHunt';
import { CheatSheet } from '../finale/CheatSheet';
import { FinalMission } from '../finale/FinalMission';
import { Achievement } from '../finale/Achievement';
import { Bit } from '../art/Bit';
import type {
  BoardScene,
  BrowserScene,
  BugsScene,
  CardsScene,
  CheatScene,
  CompareScene,
  CompareSide,
  DialogScene,
  FinaleScene,
  FlowScene,
  IntroScene,
  KitScene,
  KitType,
  LiveScene,
  MissionScene,
  NumbersScene,
  OutputScene,
  PollScene,
  PredictScene,
  SortScene,
  TerminalScene,
  TimelineScene,
  TrueFalseScene,
  WalkScene,
} from './types';

/** Current scene data (already localized) */
function useK<T extends KitScene>(): T {
  return useSceneText() as unknown as T;
}

const fmt = (v: number) => (Math.abs(v) < 10 && v % 1 ? v.toFixed(1) : Math.round(v).toLocaleString('ru-RU'));

/* ───────── intro ───────── */
function Intro() {
  const s = useK<IntroScene>();
  const [step] = useStep();
  return (
    <SceneFrame showTakeaway={step >= 1}>
      <div className="kit-intro">
        <motion.div className="kit-intro__icon" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'tween', duration: 0.5 }}>
          {s.icon}
        </motion.div>
        <div className="kit-intro__text">
          {s.kicker && <div className="kit-kicker">{s.kicker}</div>}
          <AnimatePresence mode="wait">
            {step >= 1 ? (
              <motion.h2 key="lead" className="kit-intro__lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {s.lead}
              </motion.h2>
            ) : (
              <motion.div key="tease" className="kit-intro__tease" exit={{ opacity: 0 }}>
                <Bit size={150} mood="thinking" />
                <span>→</span>
              </motion.div>
            )}
          </AnimatePresence>
          {step >= 1 && s.facts && (
            <div className="kit-intro__facts">
              {s.facts.map((f, i) => (
                <motion.div key={i} className="glass kit-fact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15 }}>
                  {f}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SceneFrame>
  );
}

/* ───────── poll ───────── */
function Poll() {
  const s = useK<PollScene>();
  const [picked, setPicked] = useSceneState<number | null>('picked', null);
  return (
    <SceneFrame showTakeaway={picked != null}>
      <div className="col" style={{ height: '100%', gap: 22 }}>
        {s.question && <div className="kit-q">{s.question}</div>}
        <PollReveal options={s.options} correct={s.correct} result={s.result} onPick={setPicked} columns={s.columns} />
      </div>
    </SceneFrame>
  );
}

/* ───────── predict ───────── */
function Predict() {
  const s = useK<PredictScene>();
  const [step] = useStep();
  return (
    <SceneFrame showTakeaway={step >= 1}>
      <div className="row" style={{ height: '100%', gap: 40, alignItems: 'center' }}>
        <div className="fill">
          <PredictSlider
            label={s.label}
            min={s.min}
            max={s.max}
            answer={s.answer}
            scale={s.scale}
            format={(v) => `${fmt(v)}${s.unit ? ` ${s.unit}` : ''}`}
            result={s.result}
          />
        </div>
        <Bit size={200} mood="thinking" />
      </div>
    </SceneFrame>
  );
}

/* ───────── board ───────── */
function Board() {
  const s = useK<BoardScene>();
  const [step] = useStep();
  const hits = (s.hits ?? []).map((h) => h.toLowerCase());
  return (
    <SceneFrame showTakeaway={step >= 1}>
      <ChatBoard
        seeds={s.seeds}
        placeholder={s.placeholder}
        max={8}
        footer={s.footer ? <div className="muted kit-small">{s.footer}</div> : undefined}
        match={(text) => {
          if (!hits.length) return null;
          const t = text.toLowerCase();
          return hits.some((h) => t.includes(h)) ? { tag: 'hit', badge: s.hitBadge } : s.missBadge ? { tag: 'miss', badge: s.missBadge } : null;
        }}
      />
    </SceneFrame>
  );
}

/* ───────── sort ───────── */
function Sort() {
  const s = useK<SortScene>();
  const [checked, setChecked] = useSceneState('checked', false);
  return (
    <SceneFrame showTakeaway={checked}>
      <DragSort
        items={s.items.map((it, i) => ({ id: `t${i}`, label: it.text }))}
        zones={s.zones.map((z) => ({ id: z.id, label: z.label, icon: z.icon }))}
        answer={Object.fromEntries(s.items.map((it, i) => [`t${i}`, it.zone]))}
        explain={Object.fromEntries(s.items.flatMap((it, i) => (it.why ? [[`t${i}`, it.why]] : [])))}
        onChecked={() => setChecked(true)}
      />
    </SceneFrame>
  );
}

/* ───────── cards ───────── */
function Cards() {
  const s = useK<CardsScene>();
  const ui = useUi();
  const [open, setOpen] = useSceneState<number[]>('open', []);
  const toggle = (i: number) => {
    if (i < 0 || i >= s.cards.length) return;
    setOpen(open.includes(i) ? open.filter((x) => x !== i) : [...open, i]);
  };
  useNumberKeys((n) => toggle(n - 1));
  const cols = s.columns ?? (s.cards.length <= 3 ? s.cards.length : s.cards.length === 4 ? 2 : s.cards.length <= 6 ? 3 : 4);
  const rows = Math.ceil(s.cards.length / cols);
  return (
    <SceneFrame showTakeaway={open.length === s.cards.length}>
      <div className="kit-cards" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {s.cards.map((c, i) => {
          const isOpen = open.includes(i);
          return (
            <motion.button key={i} className={`kit-card ${isOpen ? 'is-open' : ''}`} onClick={() => toggle(i)} whileHover={{ y: -3 }}>
              <span className="kit-card__num">{i + 1}</span>
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="b" className="kit-card__back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <b>
                      {c.icon} {c.front}
                    </b>
                    <span>{c.back}</span>
                  </motion.span>
                ) : (
                  <motion.span key="f" className="kit-card__front" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <span className="kit-card__icon">{c.icon}</span>
                    <b>{c.front}</b>
                    <span className="muted kit-small">{ui.tapToFlip}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </SceneFrame>
  );
}

/* ───────── flow / timeline ───────── */
function Track({ nodes }: { nodes: { icon: string; label: string; text: string; year?: string }[] }) {
  const [step, setStep] = useStep();
  const cur = Math.min(step, nodes.length - 1);
  const n = nodes[cur];
  return (
    <SceneFrame showTakeaway={cur === nodes.length - 1}>
      <div className="kit-track">
        <div className="kit-track__row">
          {nodes.map((node, i) => (
            <div key={i} className="kit-track__cell">
              <button className={`kit-node ${i === cur ? 'is-active' : i < cur ? 'is-done' : ''}`} onClick={() => setStep(i)}>
                {node.year && <span className="kit-node__year">{node.year}</span>}
                <span className="kit-node__icon">{node.icon}</span>
                <span className="kit-node__label">{node.label}</span>
              </button>
              {i < nodes.length - 1 && <span className={`kit-track__arrow ${i < cur ? 'is-done' : ''}`}>→</span>}
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={cur} className="glass kit-track__panel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <span className="kit-track__big">{n.icon}</span>
            <div className="col" style={{ gap: 8 }}>
              <b className="kit-h3">
                {n.year ? `${n.year} · ` : ''}
                {n.label}
              </b>
              <p className="kit-p">{n.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SceneFrame>
  );
}
function Flow() {
  return <Track nodes={useK<FlowScene>().nodes} />;
}
function Timeline() {
  return <Track nodes={useK<TimelineScene>().events} />;
}

/* ───────── compare ───────── */
function Side({ side, tone }: { side: CompareSide; tone: 'a' | 'b' }) {
  return (
    <div className={`kit-side kit-side--${tone}`}>
      <div className="kit-side__head">
        <span>{side.icon}</span>
        <b>{side.label}</b>
      </div>
      {side.code && <CodeBlock code={side.code} lang={side.lang ?? 'html'} fontSize={22} />}
      {side.points && (
        <ul className="kit-side__points">
          {side.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
function Compare() {
  const s = useK<CompareScene>();
  const [step] = useStep();
  return (
    <SceneFrame showTakeaway={step >= 1 && !s.verdict}>
      <div className="col" style={{ height: '100%', gap: 18 }}>
        <div className="kit-compare">
          <Side side={s.left} tone="a" />
          <span className="kit-compare__vs">VS</span>
          {step >= 1 ? (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', minWidth: 0 }}>
              <Side side={s.right} tone="b" />
            </motion.div>
          ) : (
            <div className="kit-side kit-side--hidden">
              <Bit size={160} mood="thinking" />
              <span className="kit-h3">{s.right.icon} ?</span>
            </div>
          )}
        </div>
        {step >= 1 && s.verdict && (
          <motion.div className="kit-verdict" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            💡 {s.verdict}
          </motion.div>
        )}
      </div>
    </SceneFrame>
  );
}

/* ───────── true / false ───────── */
function TrueFalse() {
  const s = useK<TrueFalseScene>();
  const ui = useUi();
  const [shown, setShown] = useSceneState<number[]>('shown', []);
  const show = (i: number) => i >= 0 && i < s.statements.length && !shown.includes(i) && setShown([...shown, i]);
  useNumberKeys((n) => show(n - 1));
  return (
    <SceneFrame showTakeaway={shown.length === s.statements.length}>
      <div className="kit-tf">
        {s.statements.map((st, i) => {
          const on = shown.includes(i);
          return (
            <button key={i} className={`kit-tf__row ${on ? (st.truth ? 'is-true' : 'is-false') : ''}`} onClick={() => show(i)}>
              <span className="kit-tf__num">{i + 1}</span>
              <span className="kit-tf__text">
                <b>{st.text}</b>
                {on && (
                  <motion.span className="kit-tf__explain" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {st.explain}
                  </motion.span>
                )}
              </span>
              <span className="kit-tf__verdict">{on ? (st.truth ? `✅ ${ui.truth}` : `❌ ${ui.myth}`) : '?'}</span>
            </button>
          );
        })}
      </div>
    </SceneFrame>
  );
}

/* ───────── dialog ───────── */
function Dialog() {
  const s = useK<DialogScene>();
  const [step] = useStep();
  const visible = s.messages.slice(0, step + 1);
  return (
    <SceneFrame showTakeaway={step >= s.messages.length - 1}>
      <div className="kit-dialog" data-allow-overflow>
        {visible.map((m, i) => {
          const who = m.from === 'a' ? s.a : s.b;
          return (
            <motion.div key={i} className={`kit-msg kit-msg--${m.from}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="kit-msg__ava">{who.icon}</span>
              <div className="kit-msg__bubble">
                <span className="kit-msg__name">{who.name}</span>
                <span>{m.text}</span>
                {m.flag && <span className="kit-msg__flag">⚠️ {m.flag}</span>}
                {m.good && <span className="kit-msg__good">✅ {m.good}</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SceneFrame>
  );
}

/* ───────── terminal ───────── */
function Terminal() {
  const s = useK<TerminalScene>();
  const [step] = useStep();
  const cur = Math.min(step, s.lines.length - 1);
  return (
    <SceneFrame variant="code" showTakeaway={cur === s.lines.length - 1}>
      <div className="row" style={{ height: '100%', gap: 32 }}>
        <div className="kit-term" data-allow-overflow>
          <div className="kit-term__bar">
            <i />
            <i />
            <i />
          </div>
          <div className="kit-term__body">
            {s.lines.slice(0, cur + 1).map((l, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={i === cur ? 'is-cur' : ''}>
                <div className="kit-term__cmd">
                  <span>$</span> {l.cmd}
                </div>
                {l.out?.map((o, j) => (
                  <div key={j} className="kit-term__out">
                    {o}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={cur} className="glass kit-note" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <span className="kit-note__step">
              {cur + 1} / {s.lines.length}
            </span>
            <p className="kit-p">{s.lines[cur].note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </SceneFrame>
  );
}

/* ───────── code walkthrough ───────── */
function Walk() {
  const s = useK<WalkScene>();
  const [step] = useStep();
  const cur = Math.min(step, s.marks.length - 1);
  const mark = s.marks[cur];
  return (
    <SceneFrame variant="code" showTakeaway={cur === s.marks.length - 1}>
      <div className="row" style={{ height: '100%', gap: 32, alignItems: 'flex-start' }}>
        <div className="fill" style={{ minWidth: 0 }}>
          <CodeBlock code={s.code} lang={s.lang} activeLine={mark.line} fontSize={s.code.split('\n').length > 14 ? 22 : 26} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={cur} className="glass kit-note" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
            <span className="kit-note__step">
              {cur + 1} / {s.marks.length}
            </span>
            <p className="kit-p">{mark.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </SceneFrame>
  );
}

/* ───────── live code ───────── */
function Live() {
  const s = useK<LiveScene>();
  const [step] = useStep();
  const files = (st: LiveScene['steps'][number]) => ({ html: st.html, css: st.css, js: st.js });
  return (
    <SceneFrame variant="code" showTakeaway={step >= 1}>
      <LiveCode
        name="live"
        preview={!s.console}
        task={s.task}
        editorHeight={440}
        files={files(s.steps[0])}
        steps={s.steps.length > 1 ? s.steps.map((st) => ({ label: st.label, files: files(st) })) : undefined}
      />
    </SceneFrame>
  );
}

/* ───────── predict output ───────── */
function Output() {
  const s = useK<OutputScene>();
  const [step] = useStep();
  return (
    <SceneFrame variant="code" showTakeaway={step >= 1}>
      <PredictOutput snippets={s.snippets.map((sn) => ({ label: sn.label, code: sn.code, output: sn.output, explain: sn.explain, lang: sn.lang }))} />
    </SceneFrame>
  );
}

/* ───────── bug hunt ───────── */
function Bugs() {
  const s = useK<BugsScene>();
  const [step] = useStep();
  return (
    <SceneFrame variant="code" showTakeaway={step >= 1}>
      <BugHunt snippets={s.snippets.map((sn) => ({ title: sn.title, code: sn.code, lang: sn.lang, bugs: [{ line: sn.line, explain: sn.explain, fix: sn.fix }] }))} />
    </SceneFrame>
  );
}

/* ───────── browser mock ───────── */
function Browser() {
  const s = useK<BrowserScene>();
  const ui = useUi();
  const [step] = useStep();
  const [tab, setTab] = useSceneState('tab', 0);
  const [code, setCode] = useSceneState('code', false);
  useNumberKeys((n) => n <= s.tabs.length && setTab(n - 1));
  const t = s.tabs[Math.min(tab, s.tabs.length - 1)];
  const doc = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;font-family:system-ui,sans-serif}${t.css ?? ''}</style></head><body>${t.html}</body></html>`;
  return (
    <SceneFrame showTakeaway={step >= 1}>
      <div className="col" style={{ height: '100%', gap: 16 }}>
        <div className="row" style={{ gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {s.tabs.map((x, i) => (
            <button key={i} className={`seg ${i === tab ? 'is-active' : ''}`} onClick={() => setTab(i)}>
              {i + 1}. {x.label}
            </button>
          ))}
          <span className="fill" />
          <button className="btn btn--ghost btn--sm" onClick={() => setCode(!code)}>
            {code ? `🖥 ${ui.showPage}` : `</> ${ui.showCode}`}
          </button>
        </div>
        <div className="row fill" style={{ gap: 24, minHeight: 0 }}>
          <div className="kit-browser">
            <div className="kit-browser__bar">
              <i />
              <i />
              <i />
              <span className="kit-browser__url">🔒 {t.url}</span>
            </div>
            {code ? (
              <pre className="kit-browser__code" data-allow-overflow>
                {(t.css ? `<style>\n${t.css.trim()}\n</style>\n` : '') + t.html.trim()}
              </pre>
            ) : (
              <iframe key={tab} title={t.label} sandbox="" srcDoc={doc} className="kit-browser__frame" />
            )}
          </div>
          {t.note && (
            <motion.div key={tab} className="glass kit-note" style={{ width: 460 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="kit-p">{t.note}</p>
            </motion.div>
          )}
        </div>
      </div>
    </SceneFrame>
  );
}

/* ───────── numbers ───────── */
function Numbers() {
  const s = useK<NumbersScene>();
  const [step] = useStep();
  return (
    <SceneFrame showTakeaway={step >= s.facts.length - 1}>
      <div className="kit-numbers" style={{ gridTemplateColumns: `repeat(${Math.min(s.facts.length, 3)}, 1fr)` }}>
        {s.facts.map((f, i) => (
          <div key={i} className={`glass kit-num ${i <= step ? 'is-on' : ''}`}>
            <span className="kit-num__icon">{f.icon}</span>
            {i <= step ? (
              <motion.span className="kit-num__value" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {f.value}
              </motion.span>
            ) : (
              <span className="kit-num__value muted">?</span>
            )}
            <span className="kit-num__label">{f.label}</span>
          </div>
        ))}
      </div>
    </SceneFrame>
  );
}

/* ───────── cheat sheet ───────── */
function Cheat() {
  const s = useK<CheatScene>();
  return (
    <SceneFrame>
      <div className="row" style={{ height: '100%', gap: 32, alignItems: 'center' }}>
        <div className="fill" style={{ minWidth: 0 }}>
          <CheatSheet title={s.sheetTitle} items={s.items} columns={s.columns} />
        </div>
        <Bit size={200} mood="proud" />
      </div>
    </SceneFrame>
  );
}

/* ───────── mission ───────── */
function Mission() {
  const s = useK<MissionScene>();
  return (
    <SceneFrame>
      <FinalMission
        items={s.items.map((it, i) => ({
          id: `m${i}`,
          title: it.title,
          choices: it.choices.map((c, j) => ({ id: `c${j}`, label: c })),
          correct: `c${it.correct}`,
          explain: it.explain,
        }))}
        visual={(good, total, checked) => (
          <div className="kit-goal">
            <Bit size={170} mood={!checked ? 'thinking' : good === total ? 'proud' : 'worried'} />
            <span className="kit-goal__score">{checked ? `${good} / ${total}` : '🎯'}</span>
            <span className="kit-small">{s.goal}</span>
          </div>
        )}
      />
    </SceneFrame>
  );
}

/* ───────── finale ───────── */
function Finale() {
  const s = useK<FinaleScene>();
  return (
    <SceneFrame showTakeaway>
      <div className="row" style={{ height: '100%', gap: 48, alignItems: 'center' }}>
        <div className="col fill" style={{ gap: 24, minWidth: 0 }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="kit-answer">
            {s.answer}
          </motion.p>
          <div className="glass col" style={{ gap: 8 }}>
            <b style={{ fontSize: 28 }}>🏠 {s.homeworkTitle}</b>
            {s.homework.map((h, i) => (
              <span key={i} style={{ fontSize: 26 }}>
                {i + 1}. {h}
              </span>
            ))}
          </div>
        </div>
        <div style={{ width: 460 }}>
          <Achievement title={s.badge} subtitle={s.badgeSub} icon={s.icon} />
        </div>
      </div>
    </SceneFrame>
  );
}

export const KIT: Record<KitType, ComponentType> = {
  intro: Intro,
  poll: Poll,
  predict: Predict,
  board: Board,
  sort: Sort,
  cards: Cards,
  flow: Flow,
  timeline: Timeline,
  compare: Compare,
  truefalse: TrueFalse,
  dialog: Dialog,
  terminal: Terminal,
  walk: Walk,
  live: Live,
  output: Output,
  bugs: Bugs,
  browser: Browser,
  numbers: Numbers,
  cheatsheet: Cheat,
  mission: Mission,
  finale: Finale,
};

/** Number of → steps inside each scene type */
export function stepsOf(s: KitScene): number {
  switch (s.type) {
    case 'intro':
    case 'predict':
    case 'board':
    case 'compare':
    case 'live':
    case 'output':
    case 'bugs':
    case 'browser':
      return 2;
    case 'flow':
      return s.nodes.length;
    case 'timeline':
      return s.events.length;
    case 'dialog':
      return s.messages.length;
    case 'terminal':
      return s.lines.length;
    case 'walk':
      return s.marks.length;
    case 'numbers':
      return s.facts.length;
    default:
      return 1;
  }
}

export type { ReactNode };
