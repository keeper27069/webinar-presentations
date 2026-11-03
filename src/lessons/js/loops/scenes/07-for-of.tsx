import { motion } from 'framer-motion';
import { CodeBlock, ConsoleView, DeepDive, SimControls, SceneFrame, useLessonContent, useSceneState, useSimulation } from '@engine';
import type { Content } from '../content/schema';

export default function S07() {
  const t = useLessonContent<Content>().scenes.s07;
  const [deep, setDeep] = useSceneState('deep', false);
  const n = t.items.length;
  const sim = useSimulation<number>({ initial: () => -1, step: (i) => i + 1, done: (i) => i >= n - 1, interval: 1000 });
  const idx = sim.state;

  return (
    <SceneFrame showTakeaway={sim.finished}>
      <div className="row" style={{ height: '100%', gap: 40 }}>
        <div className="col" style={{ width: 980, gap: 22 }}>
          <CodeBlock code={t.code} lang="js" activeLine={idx >= 0 && !sim.finished ? 5 : null} fontSize={26} />
          {/* Conveyor */}
          <div className="glass" data-allow-overflow style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 30, height: 14, background: 'repeating-linear-gradient(90deg,#4c5490 0 30px,#2a3170 30px 60px)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 10, bottom: 44, width: 180, marginLeft: -90, border: '4px dashed var(--cyan)', borderRadius: 20 }} />
            <div style={{ position: 'absolute', left: '50%', top: 12, transform: 'translateX(-50%)', fontSize: 20, fontWeight: 800, color: 'var(--cyan)' }}>item</div>
            {t.items.map((it, i) => {
              const offset = i - idx; // 0 = in scanner
              const [emoji] = it.split(' ');
              return (
                <motion.div
                  key={i}
                  style={{ position: 'absolute', bottom: 50, width: 130, height: 130, marginLeft: -65, display: 'grid', placeItems: 'center', fontSize: 80, borderRadius: 24, background: offset === 0 ? 'rgba(62,230,255,.2)' : 'rgba(255,255,255,.06)' }}
                  animate={{ left: `calc(50% + ${offset * 210}px)`, opacity: offset < -2 ? 0 : 1 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 16 }}
                >
                  {emoji}
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="fill col" style={{ gap: 22 }}>
          <SimControls sim={sim} speeds={[1]} />
          {!deep && (
          <div className="glass">
            <div className="muted" style={{ fontFamily: 'var(--font-code)' }}>item</div>
            <div style={{ fontSize: 48, fontWeight: 800 }}>{idx >= 0 ? t.items[idx] : '—'}</div>
          </div>
          )}
          <ConsoleView lines={t.items.slice(0, idx + 1).map((it) => `${t.inBag}: ${it}`)} height={deep ? 120 : 210} />
          <DeepDive title={t.deepTitle} open={deep} onToggle={() => setDeep(!deep)}>
            <CodeBlock code={t.deepCode} lang="js" fontSize={22} />
            <p style={{ marginTop: 10 }}>{t.deepText}</p>
          </DeepDive>
        </div>
      </div>
    </SceneFrame>
  );
}
