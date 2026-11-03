import { motion } from 'framer-motion';
import { Bit, SceneFrame, useLessonContent, useSceneState, useTicker } from '@engine';
import type { Content } from '../content/schema';

const TARGETS: Record<number, number> = { 3: 742, 4: 2741, 6: 482913 };

export default function S04() {
  const c = useLessonContent<Content>();
  const t = c.scenes.s04;
  const [digits, setDigits] = useSceneState<number>('digits', 3);
  const [tries, setTries] = useSceneState<number>('tries', 0);
  const [running, setRunning] = useSceneState<boolean>('running', false);
  const target = TARGETS[digits];
  const found = tries >= target;
  // Speed up for longer codes so the demo stays ~10–15 seconds
  const inc = digits === 3 ? 7 : digits === 4 ? 23 : 4111;
  useTicker(running && !found, 40, () => setTries((n) => Math.min(target, n + inc)));
  const nf = new Intl.NumberFormat(c.locale);
  const current = String(Math.min(tries, target)).padStart(digits, '0');

  return (
    <SceneFrame showTakeaway={found}>
      <div className="row" style={{ height: '100%', gap: 56, alignItems: 'center' }}>
        <div className="col" style={{ alignItems: 'center', gap: 28, width: 820 }}>
          <div style={{ display: 'flex', gap: 14 }}>
            {current.split('').map((d, i) => (
              <motion.div
                key={i}
                className="card"
                style={{ width: digits > 4 ? 104 : 130, height: 170, display: 'grid', placeItems: 'center', fontFamily: 'var(--font-code)', fontSize: 92, fontWeight: 700, padding: 0, background: found ? '#c9f7e4' : 'var(--surface)' }}
                animate={running && !found ? { y: [0, -6, 0] } : {}}
                transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.05 }}
              >
                {d}
              </motion.div>
            ))}
          </div>
          <div className="row" style={{ gap: 12 }}>
            <span className="muted" style={{ alignSelf: 'center' }}>{t.digitsLabel}:</span>
            {[3, 4, 6].map((d) => (
              <button
                key={d}
                className={`seg ${digits === d ? 'is-active' : ''}`}
                onClick={() => {
                  setDigits(d);
                  setTries(0);
                  setRunning(false);
                }}
              >
                {d}
              </button>
            ))}
            <button className="btn btn--accent" onClick={() => (found ? (setTries(0), setRunning(true)) : setRunning(!running))}>
              {running && !found ? '❚❚' : '▶'} 🤖
            </button>
          </div>
        </div>
        <div className="fill col" style={{ gap: 24 }}>
          <div className="glass">
            <div className="muted">{t.tries}</div>
            <div className="big-number">{nf.format(Math.min(tries, target))}</div>
          </div>
          <div className="glass">
            <div className="muted">{t.combos}</div>
            <div className="big-number" style={{ color: 'var(--accent)' }}>
              {nf.format(Math.pow(10, digits))}
            </div>
            <div style={{ fontSize: 26, marginTop: 8 }} className="muted">
              {Array(digits).fill('10').join(' × ')}
            </div>
          </div>
          {found && (
            <motion.div className="row" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ alignItems: 'center', gap: 20 }}>
              <Bit size={120} mood="surprised" />
              <div className="col" style={{ gap: 6, fontSize: 26 }}>
                <b className="ok" style={{ fontSize: 36 }}>🔓 {t.found}</b>
                <span>🧍 {t.human}</span>
                <span>💻 {t.computer}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </SceneFrame>
  );
}
