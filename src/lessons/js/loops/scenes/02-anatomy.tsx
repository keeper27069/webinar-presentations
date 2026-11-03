import { AnimatePresence, motion } from 'framer-motion';
import { ConsoleView, SimControls, SceneFrame, useLessonContent, useSceneState, useSimulation } from '@engine';
import type { Content } from '../content/schema';

type Phase = 'init' | 'check' | 'body' | 'update' | 'done';
interface S {
  i: number;
  phase: Phase;
  out: string[];
  last: boolean | null;
}
type Part = 'start' | 'condition' | 'step' | 'body';
const PART_OF: Record<Phase, Part | null> = { init: 'start', check: 'condition', body: 'body', update: 'step', done: null };
const COLORS: Record<Part, string> = { start: '#3ee6ff', condition: '#ffd166', step: '#ff5cc8', body: '#2ee59d' };

const next = (s: S): S => {
  switch (s.phase) {
    case 'init':
      return { ...s, i: 1, phase: 'check' };
    case 'check': {
      const ok = s.i <= 5;
      return { ...s, last: ok, phase: ok ? 'body' : 'done' };
    }
    case 'body':
      return { ...s, out: [...s.out, String(s.i)], phase: 'update' };
    case 'update':
      return { ...s, i: s.i + 1, phase: 'check' };
    default:
      return s;
  }
};

export default function S02() {
  const t = useLessonContent<Content>().scenes.s02;
  const [part, setPart] = useSceneState<Part | null>('part', null);
  const sim = useSimulation<S>({ initial: () => ({ i: 0, phase: 'init', out: [], last: null }), step: next, done: (s) => s.phase === 'done', interval: 700 });
  const active = PART_OF[sim.state.phase];

  const Seg = ({ p, children }: { p: Part; children: string }) => (
    <motion.button
      onClick={() => setPart(p)}
      animate={{ backgroundColor: active === p ? `${COLORS[p]}55` : 'rgba(0,0,0,0)', boxShadow: part === p ? `0 0 0 4px ${COLORS[p]}` : '0 0 0 0px transparent' }}
      style={{ border: 0, borderBottom: `5px solid ${COLORS[p]}`, color: COLORS[p], font: 'inherit', padding: '2px 8px', borderRadius: 8 }}
    >
      {children}
    </motion.button>
  );

  return (
    <SceneFrame showTakeaway={sim.finished}>
      <div className="row" style={{ height: '100%', gap: 40 }}>
        <div className="col" style={{ width: 1060, gap: 24 }}>
          <div className="code" style={{ padding: '28px 32px', fontSize: 44, lineHeight: 1.6 }}>
            <div>
              <span className="tk-kw">for</span> (<Seg p="start">let i = 1</Seg>; <Seg p="condition">i &lt;= 5</Seg>; <Seg p="step">i++</Seg>) {'{'}
            </div>
            <div style={{ paddingLeft: 56 }}>
              <Seg p="body">console.log(i);</Seg>
            </div>
            <div>{'}'}</div>
          </div>
          <AnimatePresence mode="wait">
            {part && (
              <motion.div key={part} className="glass" style={{ borderColor: COLORS[part], fontSize: 30 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <b style={{ color: COLORS[part] }}>{t.parts[part]}:</b> {t.partText[part]}
              </motion.div>
            )}
          </AnimatePresence>
          {/* Running track */}
          <div className="glass" style={{ position: 'relative', height: 150, padding: '20px 40px' }}>
            <div style={{ position: 'absolute', left: 60, right: 60, top: 82, height: 6, background: 'rgba(255,255,255,.15)', borderRadius: 3 }} />
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} style={{ position: 'absolute', left: `calc(60px + ${(n - 1) * 25}% - ${(n - 1) * 30}px)`, top: 26, textAlign: 'center', width: 60 }}>
                <div style={{ fontSize: 34 }}>{sim.state.out.includes(String(n)) ? '🚩' : '🏳️'}</div>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: 22 }} className="muted">
                  i={n}
                </div>
              </div>
            ))}
            {sim.state.i > 0 && (
              <motion.div
                style={{ position: 'absolute', top: 58, fontSize: 48 }}
                animate={{ left: `calc(60px + ${Math.min(sim.state.i - 1, 4.6) * 25}% - ${Math.min(sim.state.i - 1, 4.6) * 30}px)` }}
                transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              >
                🏃
              </motion.div>
            )}
          </div>
          <SimControls sim={sim} speeds={[1, 3]} />
        </div>
        <div className="fill col" style={{ gap: 22 }}>
          <div className="glass">
            <div className="muted" style={{ fontSize: 22 }}>i</div>
            <div className="big-number">{sim.state.i || '—'}</div>
          </div>
          <motion.div key={sim.state.phase + sim.state.i} className="glass" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} style={{ fontSize: 30, fontWeight: 800, borderColor: active ? COLORS[active] : 'var(--ok)' }}>
            ▶ {t.phase[sim.state.phase]}
            {sim.state.last != null && sim.state.phase !== 'init' && (
              <div style={{ fontSize: 24, marginTop: 6, color: sim.state.last ? 'var(--ok)' : 'var(--error)' }}>
                {sim.state.i} &lt;= 5 → {sim.state.last ? t.checkTrue : t.checkFalse}
              </div>
            )}
          </motion.div>
          <ConsoleView lines={sim.state.out} height={300} />
        </div>
      </div>
    </SceneFrame>
  );
}
