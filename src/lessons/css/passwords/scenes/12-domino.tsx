import { AnimatePresence, motion } from 'framer-motion';
import { SceneFrame, useLessonContent, useSceneState } from '@engine';
import type { Content } from '../content/schema';

const ICONS = ['🎮', '✉️', '💬', '🛒', '📒'];

export default function S12() {
  const t = useLessonContent<Content>().scenes.s12;
  const [same, setSame] = useSceneState<boolean>('same', true);
  const [twoFa, setTwoFa] = useSceneState<boolean>('2fa', false);
  const [leak, setLeak] = useSceneState<boolean>('leak', false);
  const [seen, setSeen] = useSceneState<string[]>('seen', []);
  const fallen = (i: number) => leak && !twoFa && (same || i === 0);
  const mark = (k: string) => !seen.includes(k) && setSeen([...seen, k]);

  return (
    <SceneFrame showTakeaway={seen.includes('diff') && seen.includes('2fa')}>
      <div className="col" style={{ height: '100%', gap: 36 }}>
        <div className="row" style={{ gap: 14 }}>
          <button className={`seg ${same ? 'is-active' : ''}`} onClick={() => { setSame(true); setLeak(false); }}>
            🔁 {t.samePw}
          </button>
          <button className={`seg ${!same ? 'is-active' : ''}`} onClick={() => { setSame(false); setLeak(false); mark('diff'); }}>
            🔀 {t.diffPw}
          </button>
          <button className={`seg ${twoFa ? 'is-active' : ''}`} onClick={() => { setTwoFa(!twoFa); setLeak(false); if (!twoFa) mark('2fa'); }}>
            📱 {t.twoFa}
          </button>
        </div>
        <div className="row" style={{ gap: 30, justifyContent: 'center', alignItems: 'flex-end', height: 420, perspective: 900 }}>
          {t.sites.map((s, i) => (
            <motion.div
              key={i}
              className="col"
              style={{ alignItems: 'center', gap: 14, transformOrigin: 'bottom right' }}
              animate={fallen(i) ? { rotate: 72, y: 30, opacity: 0.9 } : { rotate: 0, y: 0, opacity: 1 }}
              transition={{ delay: fallen(i) ? i * 0.25 : 0, type: 'spring', stiffness: 90, damping: 12 }}
            >
              <div
                className="card"
                style={{ width: 220, height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 16, background: fallen(i) ? '#ffd6d6' : leak && i === 0 && twoFa ? '#fff3cf' : 'var(--surface)' }}
              >
                <span style={{ fontSize: 80 }}>{ICONS[i]}</span>
                <b style={{ fontSize: 30, textAlign: 'center' }}>{s}</b>
                <span style={{ fontFamily: 'var(--font-code)', fontSize: 22, color: 'var(--ink-muted)' }}>{same ? '••• A •••' : `••• ${'ABCDE'[i]} •••`}</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 24, color: fallen(i) ? 'var(--error)' : 'var(--ok)' }}>{leak ? (fallen(i) ? `💥 ${t.hacked}` : `🛡 ${t.safe}`) : ' '}</span>
            </motion.div>
          ))}
        </div>
        <div className="row" style={{ gap: 24, alignItems: 'center' }}>
          <button className="btn btn--accent btn--lg" onClick={() => setLeak(true)} disabled={leak}>
            💧 {t.leakBtn}
          </button>
          <AnimatePresence>
            {leak && twoFa && (
              <motion.div className="glass row" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} style={{ alignItems: 'center', gap: 16, padding: '14px 22px' }}>
                <span style={{ fontSize: 40 }}>📱</span>
                <span style={{ fontSize: 28, fontWeight: 800 }}>{t.codeAsk}: ••••••</span>
                <span style={{ fontSize: 40 }}>🚫🦹</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SceneFrame>
  );
}
