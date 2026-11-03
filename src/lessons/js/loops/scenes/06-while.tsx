import { motion } from 'framer-motion';
import { Bit, CodeBlock, SimControls, SceneFrame, useLessonContent, useSceneState, useSimulation } from '@engine';
import type { Content } from '../content/schema';

const GOAL = 100;
interface S {
  money: number;
  weeks: number;
}

export default function S06() {
  const t = useLessonContent<Content>().scenes.s06;
  const [w, setW] = useSceneState<number>('w', 15);
  const sim = useSimulation<S>({
    initial: () => ({ money: 0, weeks: 0 }),
    step: (s) => ({ money: s.money + w, weeks: s.weeks + 1 }),
    done: (s) => s.money >= GOAL,
    interval: 800,
  });
  const fill = Math.min(1, sim.state.money / 120);
  const activeLine = sim.finished ? 8 : sim.state.weeks > 0 ? 5 : 4;

  return (
    <SceneFrame showTakeaway={sim.finished}>
      <div className="row" style={{ height: '100%', gap: 48 }}>
        <div className="col" style={{ width: 760, gap: 20 }}>
          <div className="row" style={{ gap: 10, alignItems: 'center' }}>
            <span className="muted">{t.weeklyLabel}:</span>
            {[15, 20, 30].map((n) => (
              <button
                key={n}
                className={`seg ${w === n ? 'is-active' : ''}`}
                onClick={() => {
                  setW(n);
                  sim.reset();
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <CodeBlock code={t.code(w)} lang="js" activeLine={sim.state.weeks > 0 || sim.playing ? activeLine : null} />
          <SimControls sim={sim} speeds={[1, 3]} />
        </div>
        <div className="fill row" style={{ gap: 40, alignItems: 'flex-end' }}>
          <svg width="320" height="440" viewBox="0 0 320 440" role="img" aria-label="jar">
            <rect x="40" y="40" width="240" height="380" rx="40" fill="rgba(255,255,255,.08)" stroke="#c7d0ff" strokeWidth="6" />
            <rect x="80" y="20" width="160" height="34" rx="10" fill="#c7d0ff" />
            <motion.rect x="52" width="216" rx="30" fill="#ffd166" animate={{ y: 408 - 360 * fill, height: 360 * fill }} transition={{ type: 'spring', stiffness: 80, damping: 14 }} />
            <line x1="40" x2="280" y1={408 - 360 * (GOAL / 120)} y2={408 - 360 * (GOAL / 120)} stroke="#2ee59d" strokeWidth="5" strokeDasharray="12 10" />
            <text x="160" y={398 - 360 * (GOAL / 120)} textAnchor="middle" fill="#2ee59d" fontSize="26" fontWeight="800">
              {t.goal}: {GOAL}
            </text>
            {sim.state.weeks > 0 && !sim.finished && (
              <motion.text key={sim.state.weeks} x="160" fontSize="56" textAnchor="middle" initial={{ y: 0, opacity: 1 }} animate={{ y: 380 - 360 * fill, opacity: 0 }} transition={{ duration: 0.7 }}>
                🪙
              </motion.text>
            )}
          </svg>
          <div className="col fill" style={{ gap: 20 }}>
            <div className="glass">
              <div className="muted">{t.money}</div>
              <div className="big-number">{sim.state.money}</div>
            </div>
            <div className="glass">
              <div className="muted">{t.weeks}</div>
              <div className="big-number" style={{ color: 'var(--accent)' }}>
                {sim.state.weeks}
              </div>
            </div>
            {sim.finished && (
              <motion.div className="row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ gap: 14, alignItems: 'center' }}>
                <Bit size={110} mood="proud" />
                <b style={{ fontSize: 30 }}>{t.result(sim.state.weeks, sim.state.money)}</b>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
