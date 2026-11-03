import { motion } from 'framer-motion';
import { SceneFrame, useLessonContent, useSceneState } from '@engine';
import type { Content } from '../content/schema';
import { SETS, examplePassword, formatTime, log10Combos, log10Seconds, sci, strength, strengthColor, type SetKey } from '../shared';

const KEYS: SetKey[] = ['lower', 'upper', 'digits', 'symbols'];

export default function S05() {
  const c = useLessonContent<Content>();
  const t = c.scenes.s05;
  const [len, setLen] = useSceneState<number>('len', 8);
  const [sets, setSets] = useSceneState<SetKey[]>('sets', ['lower', 'upper', 'digits', 'symbols']);
  const alphabet = sets.reduce((a, s) => a + SETS[s], 0) || SETS.lower;
  const lc = log10Combos(alphabet, len);
  const ls = log10Seconds(lc);
  const { mant, exp } = sci(lc);
  const color = strengthColor(ls);
  const toggle = (k: SetKey) => setSets((s) => (s.includes(k) ? (s.length > 1 ? s.filter((x) => x !== k) : s) : [...s, k]));

  return (
    <SceneFrame showTakeaway={len >= 14}>
      <div className="row" style={{ height: '100%', gap: 48 }}>
        <div className="col" style={{ width: 860, gap: 22 }}>
          <div className="glass col" style={{ gap: 14 }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="muted">{t.lengthLabel}</span>
              <span className="big-number" style={{ fontSize: 64 }}>{len}</span>
            </div>
            <input type="range" min={4} max={24} value={len} onChange={(e) => setLen(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)', height: 40 }} aria-label={t.lengthLabel} />
            <div className="row" style={{ gap: 10 }}>
              {[8, 12, 16, 20].map((n) => (
                <button key={n} className={`seg ${len === n ? 'is-active' : ''}`} onClick={() => setLen(n)}>
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className="row" style={{ gap: 16 }}>
            {KEYS.map((k) => (
              <motion.button
                key={k}
                whileTap={{ scale: 0.95 }}
                className={`seg ${sets.includes(k) ? 'is-active' : ''}`}
                style={{ flex: 1, height: 84, fontSize: 32, fontFamily: 'var(--font-code)' }}
                onClick={() => toggle(k)}
              >
                {t.sets[k]}
              </motion.button>
            ))}
          </div>
          <div className="glass" style={{ fontFamily: 'var(--font-code)', fontSize: 40, letterSpacing: '0.04em', overflowWrap: 'anywhere' }}>
            <span className="muted" style={{ fontFamily: 'var(--font-body)', fontSize: 24, display: 'block' }}>
              {t.example}
            </span>
            {examplePassword(len, sets)}
          </div>
        </div>
        <div className="fill col" style={{ gap: 22 }}>
          <div className="row" style={{ gap: 22 }}>
            <div className="glass fill">
              <div className="muted">{t.alphabet}</div>
              <div className="big-number" style={{ fontSize: 60 }}>{alphabet}</div>
            </div>
            <div className="glass fill">
              <div className="muted">{t.combos}</div>
              <div className="big-number" style={{ fontSize: 60 }}>
                {mant}×10<sup style={{ fontSize: 34 }}>{exp}</sup>
              </div>
            </div>
          </div>
          <div className="glass col" style={{ gap: 18, borderColor: color }}>
            <div className="muted">{t.time}</div>
            <motion.div key={formatTime(ls, c.units, c.locale)} className="big-number" style={{ fontSize: 64, color }} initial={{ scale: 0.9, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }}>
              {formatTime(ls, c.units, c.locale)}
            </motion.div>
            <div style={{ height: 30, borderRadius: 15, background: 'rgba(255,255,255,.1)', overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', background: color, borderRadius: 15 }} animate={{ width: `${strength(ls) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} />
            </div>
            <p className="muted" style={{ fontSize: 22 }}>ⓘ {t.speedNote}</p>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}
