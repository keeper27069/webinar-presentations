import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bit, CodeBlock, SceneFrame, useLessonContent, useStep } from '@engine';
import type { Content } from '../content/schema';

export default function S01() {
  const c = useLessonContent<Content>();
  const t = c.scenes.s01;
  const [step] = useStep();
  const [lines, setLines] = useState(5);

  useEffect(() => {
    if (step < 1) {
      setLines(5);
      return;
    }
    const id = window.setInterval(() => setLines((n) => (n >= 1000 ? 1000 : Math.min(1000, n + Math.ceil(n / 9)))), 70);
    return () => window.clearInterval(id);
  }, [step]);

  const code = Array.from({ length: 5 }, () => `console.log('${t.greeting}');`).join('\n') + `\n// ${t.more}`;

  return (
    <SceneFrame showTakeaway={step >= 1}>
      <div className="row" style={{ height: '100%', gap: 56, alignItems: 'center' }}>
        <div className="col" style={{ width: 900, gap: 20 }}>
          <motion.div animate={step >= 1 ? { y: [0, -14, 0] } : {}} transition={{ duration: 0.25, repeat: step >= 1 && lines < 1000 ? Infinity : 0 }}>
            <CodeBlock code={code} lang="js" fontSize={34} />
          </motion.div>
          <div className="muted" style={{ fontSize: 28 }}>❓ {c.bigQuestion}</div>
        </div>
        <div className="fill col" style={{ alignItems: 'center', gap: 24 }}>
          <div className="big-number" style={{ fontSize: 180, color: lines >= 1000 ? 'var(--error)' : 'var(--accent)' }}>
            {new Intl.NumberFormat(c.locale).format(lines)}
          </div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>{t.linesLabel}</div>
          <Bit size={200} mood={step >= 1 ? 'worried' : 'thinking'} />
          {step >= 1 && lines >= 1000 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass" style={{ fontSize: 28, fontWeight: 700 }}>
              😵 {t.tired}
            </motion.div>
          )}
        </div>
      </div>
    </SceneFrame>
  );
}
