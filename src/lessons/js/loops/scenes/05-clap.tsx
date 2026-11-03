import { motion } from 'framer-motion';
import { CodeBlock, ConsoleView, SimControls, SceneFrame, useLessonContent, useSceneState, useSimulation } from '@engine';
import type { Content } from '../content/schema';

interface S {
  i: number;
  claps: number[];
  line: number;
}

export default function S05() {
  const t = useLessonContent<Content>().scenes.s05;
  const [d, setD] = useSceneState<number>('d', 3);
  const sim = useSimulation<S>({
    initial: () => ({ i: 0, claps: [], line: 1 }),
    step: (s) => {
      const i = s.i + 1;
      const clap = i % d === 0;
      return { i, claps: clap ? [...s.claps, i] : s.claps, line: clap ? 3 : 2 };
    },
    done: (s) => s.i >= 20,
    interval: 450,
  });

  return (
    <SceneFrame showTakeaway={sim.finished}>
      <div className="row" style={{ height: '100%', gap: 40 }}>
        <div className="col" style={{ width: 760, gap: 20 }}>
          <div className="row" style={{ gap: 10, alignItems: 'center' }}>
            <span className="muted">{t.divisorLabel}:</span>
            {[2, 3, 5].map((n) => (
              <button
                key={n}
                className={`seg ${d === n ? 'is-active' : ''}`}
                onClick={() => {
                  setD(n);
                  sim.reset();
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <CodeBlock code={t.code(d)} lang="js" activeLine={sim.state.i > 0 && !sim.finished ? sim.state.line : null} />
          <SimControls sim={sim} speeds={[1, 3]} />
          <ConsoleView lines={sim.state.claps.map((n) => `${n} ${t.clap}`)} height={220} />
        </div>
        <div className="fill" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, alignContent: 'start' }}>
          {Array.from({ length: 20 }, (_, k) => k + 1).map((n) => {
            const isCur = sim.state.i === n;
            const clapped = sim.state.claps.includes(n);
            return (
              <motion.div
                key={n}
                className="card"
                style={{ height: 130, padding: 0, display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontSize: 46, position: 'relative', background: clapped ? 'var(--warn)' : n <= sim.state.i ? '#dfe3ff' : 'var(--surface)' }}
                animate={isCur ? { scale: 1.12 } : { scale: 1 }}
              >
                {n}
                {clapped && (
                  <motion.span style={{ position: 'absolute', top: -12, right: -8, fontSize: 44 }} initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }}>
                    👏
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </SceneFrame>
  );
}
