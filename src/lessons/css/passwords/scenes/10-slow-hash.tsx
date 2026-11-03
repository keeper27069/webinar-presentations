import { motion } from 'framer-motion';
import { DeepDive, SceneFrame, useLessonContent, useSceneState } from '@engine';
import type { Content } from '../content/schema';
import { FAST_GUESSES_PER_SEC, formatTime, log10Combos, log10Seconds, strength, strengthColor } from '../shared';

const L = log10Combos(94, 8);

export default function S10() {
  const c = useLessonContent<Content>();
  const t = c.scenes.s10;
  const [slow, setSlow] = useSceneState<number>('slow', 0); // log10 slowdown 0..6
  const [deep, setDeep] = useSceneState<boolean>('deep', false);
  const nf = new Intl.NumberFormat(c.locale);
  const fastL = log10Seconds(L);
  const slowL = log10Seconds(L, FAST_GUESSES_PER_SEC / Math.pow(10, slow));
  const userWait = 1e-7 * Math.pow(10, slow); // one login check on the server, seconds
  const nf2 = new Intl.NumberFormat(c.locale, { maximumFractionDigits: 2 });

  const Lane = ({ icon, label, perSec, l }: { icon: string; label: string; perSec: number; l: number }) => (
    <div className="glass col" style={{ gap: 14 }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <b style={{ fontSize: 32 }}>
          {icon} {label}
        </b>
        <span className="muted" style={{ fontSize: 24 }}>
          {nf.format(Math.round(perSec))} {t.perSec}
        </span>
      </div>
      <div style={{ height: 34, borderRadius: 17, background: 'rgba(255,255,255,.1)', overflow: 'hidden' }}>
        <motion.div style={{ height: '100%', background: strengthColor(l), borderRadius: 17 }} animate={{ width: `${strength(l) * 100}%` }} transition={{ type: 'spring', stiffness: 100, damping: 18 }} />
      </div>
      <div className="big-number" style={{ fontSize: 60, color: strengthColor(l) }}>
        {formatTime(l, c.units, c.locale)}
      </div>
    </div>
  );

  return (
    <SceneFrame showTakeaway={slow >= 5}>
      <div className="row" style={{ height: '100%', gap: 44 }}>
        <div className="col fill" style={{ gap: 20 }}>
          <div className="tag" style={{ alignSelf: 'flex-start', fontSize: 24, fontFamily: 'var(--font-code)' }}>
            🔑 {t.password}: Tg7#Lp2!
          </div>
          <Lane icon="⚡" label={t.fast} perSec={FAST_GUESSES_PER_SEC} l={fastL} />
          <Lane icon="🐢" label={t.slow} perSec={FAST_GUESSES_PER_SEC / Math.pow(10, slow)} l={slowL} />
        </div>
        <div className="col" style={{ width: 600, gap: 26 }}>
          <div className="glass col" style={{ gap: 14 }}>
            <span className="muted">{t.costLabel}</span>
            <div className="big-number" style={{ fontSize: 72 }}>×{nf.format(Math.pow(10, slow))}</div>
            <input type="range" min={0} max={6} step={1} value={slow} onChange={(e) => setSlow(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--accent)', height: 40 }} aria-label={t.costLabel} />
            <span style={{ fontSize: 24 }}>
              ⏱ {t.userWait}: <b>{userWait < 0.01 ? `< ${nf2.format(0.01)}` : nf2.format(userWait)} s</b>
            </span>
          </div>
          <DeepDive title={t.deepTitle} open={deep} onToggle={() => setDeep(!deep)}>
            <p>{t.deepText}</p>
          </DeepDive>
        </div>
      </div>
    </SceneFrame>
  );
}
