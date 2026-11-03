import { motion } from 'framer-motion';
import { Bit, FinalMission, SceneFrame, useLessonContent } from '@engine';
import type { Content } from '../content/schema';

function Shield({ good, total, checked, label }: { good: number; total: number; checked: boolean; label: string }) {
  const segs = Array.from({ length: total }, (_, i) => i < good);
  return (
    <div className="col" style={{ alignItems: 'center', gap: 10 }}>
      <svg width="250" height="283" viewBox="0 0 300 340" role="img" aria-label={label}>
        <path d="M150 10 L280 60 V170 C280 250 220 305 150 330 C80 305 20 250 20 170 V60 Z" fill="#141b55" stroke="#8fa0ff" strokeWidth="6" />
        {segs.map((on, i) => (
          <motion.rect
            key={i}
            x="60"
            width="180"
            height="34"
            rx="10"
            y={250 - i * 40}
            initial={false}
            animate={{ fill: on ? '#2ee59d' : 'rgba(255,255,255,.08)' }}
            transition={{ delay: checked ? i * 0.15 : 0 }}
          />
        ))}
      </svg>
      <div style={{ position: 'relative', marginTop: -110 }}>
        <Bit size={120} mood={!checked ? 'thinking' : good === total ? 'proud' : 'worried'} />
      </div>
      <b>{label}</b>
    </div>
  );
}

export default function S14() {
  const t = useLessonContent<Content>().scenes.s14;
    return (
    <SceneFrame>
      <FinalMission
        items={t.items.map((it, i) => ({
          id: `m${i}`,
          title: it.title,
          body: it.body || undefined,
          choices: it.choices.map((label, j) => ({ id: String(j), label })),
          correct: String(it.correct),
          explain: it.explain,
        }))}
        visual={(good, total, checked) => {
          return (
            <>
              <Shield good={good} total={total} checked={checked} label={t.shield} />
              {checked && good === total && <p style={{ fontSize: 26, fontWeight: 800, textAlign: 'center', color: 'var(--ok)' }}>💡 {t.takeaway}</p>}
            </>
          );
        }}
      />
    </SceneFrame>
  );
}
