import { motion } from 'framer-motion';
import { Achievement, SceneFrame, useLessonContent, usePlayer } from '@engine';
import type { Content } from '../content/schema';

export default function S15() {
  const c = useLessonContent<Content>();
  const t = c.scenes.s15;
  const p = usePlayer();
  return (
    <SceneFrame showTakeaway>
      <div className="row" style={{ height: '100%', gap: 56, alignItems: 'center' }}>
        <div className="col fill" style={{ gap: 28 }}>
          <div className="muted" style={{ fontSize: 28 }}>❓ {c.bigQuestion}</div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.25 }}>
            {t.answer}
          </motion.p>
          <div className="glass col" style={{ gap: 10 }}>
            <b style={{ fontSize: 28 }}>🏠 {t.homeworkTitle}</b>
            {t.homework.map((h, i) => (
              <span key={i} style={{ fontSize: 27 }}>
                {i + 1}. {h}
              </span>
            ))}
          </div>
          <div className="row" style={{ gap: 14 }}>
            <button className="btn btn--ghost" onClick={() => p.goTo(4)}>
              🧪 {t.again}
            </button>
            <button className="btn btn--ghost" onClick={() => p.goTo(12)}>
              📋 {t.sheet}
            </button>
          </div>
        </div>
        <div style={{ width: 520 }}>
          <Achievement title={t.badge} subtitle={t.badgeSub} icon="🔐" />
        </div>
      </div>
    </SceneFrame>
  );
}
