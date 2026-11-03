import { motion } from 'framer-motion';
import { PollReveal, SceneFrame, useLessonContent, useSceneState } from '@engine';
import type { Content } from '../content/schema';
import { formatTime, log10Combos, log10Seconds, log10Words, strength, strengthColor } from '../shared';

const ROUNDS = [
  { a: 'aB3$x', b: 'qmtrvzkple', la: log10Combos(94, 5), lb: log10Combos(26, 10) },
  { a: 'Tg7#Lp2!', b: 'jwqzmtrkvbnx', la: log10Combos(94, 8), lb: log10Combos(26, 12) },
  { a: 'Tg7#Lp2!', b: 'olma-bulut-poyezd-kitob-tun', la: log10Combos(94, 8), lb: log10Words(5) },
];

export default function S06() {
  const c = useLessonContent<Content>();
  const t = c.scenes.s06;
  const [round, setRound] = useSceneState<number>('round', 0);
  const [done, setDone] = useSceneState<number[]>('done', []);
  const r = ROUNDS[round];
  const info = t.rounds[round];

  const Bar = ({ l, label }: { l: number; label: string }) => {
    const ls = log10Seconds(l);
    return (
      <div className="col" style={{ gap: 8 }}>
        <div className="row" style={{ justifyContent: 'space-between', fontSize: 26 }}>
          <b>{label}</b>
          <b style={{ color: strengthColor(ls) }}>{formatTime(ls, c.units, c.locale)}</b>
        </div>
        <div style={{ height: 28, borderRadius: 14, background: 'rgba(255,255,255,.1)', overflow: 'hidden' }}>
          <motion.div style={{ height: '100%', background: strengthColor(ls), borderRadius: 14 }} initial={{ width: 0 }} animate={{ width: `${strength(ls) * 100}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} />
        </div>
      </div>
    );
  };

  return (
    <SceneFrame showTakeaway={done.includes(2)}>
      <div className="col" style={{ height: '100%', gap: 26 }}>
        <div className="row" style={{ gap: 12 }}>
          {ROUNDS.map((_, i) => (
            <button key={i} className={`seg ${round === i ? 'is-active' : ''} ${done.includes(i) ? 'is-done' : ''}`} onClick={() => setRound(i)}>
              {t.round} {i + 1}
            </button>
          ))}
        </div>
        <PollReveal
          key={round}
          name={`poll${round}`}
          correct={1}
          columns={2}
          onPick={() => !done.includes(round) && setDone([...done, round])}
          options={[
            { label: <code style={{ fontFamily: 'var(--font-code)', fontSize: 46 }}>{r.a}</code>, detail: info.aNote },
            { label: <code style={{ fontFamily: 'var(--font-code)', fontSize: r.b.length > 16 ? 36 : 46 }}>{r.b}</code>, detail: info.bNote },
          ]}
          result={
            <div className="glass col" style={{ gap: 18 }}>
              <Bar l={r.la} label={`1 · ${t.crackTime}`} />
              <Bar l={r.lb} label={`2 · ${t.crackTime}`} />
              <p style={{ fontSize: 28, fontWeight: 700 }}>💡 {info.why}</p>
            </div>
          }
        />
      </div>
    </SceneFrame>
  );
}
