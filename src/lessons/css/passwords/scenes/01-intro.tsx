import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bit, PollReveal, Reveal, SceneFrame, useLessonContent, useSceneState, useStep } from '@engine';
import type { Content } from '../content/schema';
import { Vault } from '../art/Vault';

export default function S01() {
  const c = useLessonContent<Content>();
  const t = c.scenes.s01;
  const [step, setStep] = useStep();
  const [picked, setPicked] = useSceneState<number | null>('picked', null);
  const [open, setOpen] = useState(picked != null);

  return (
    <SceneFrame hideChat={step === 0} showTakeaway={picked != null}>
      <div className="row" style={{ height: '100%', alignItems: 'center', gap: 60 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Vault open={open} />
          <div style={{ position: 'absolute', right: -40, bottom: -10 }}>
            <Bit size={190} mood={picked == null ? 'thinking' : 'surprised'} />
          </div>
        </div>
        <div className="fill col" style={{ gap: 32 }}>
          {step === 0 ? (
            <motion.div className="col" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} style={{ gap: 36 }}>
              <div className="tag" style={{ alignSelf: 'flex-start', fontSize: 26 }}>
                ❓ {c.title}
              </div>
              <h2 style={{ fontSize: 68, lineHeight: 1.1 }}>{c.bigQuestion}</h2>
              <button className="btn btn--accent btn--lg" style={{ alignSelf: 'flex-start' }} onClick={() => setStep(1)}>
                🔓 {t.start}
              </button>
            </motion.div>
          ) : (
            <Reveal at={1}>
              <PollReveal
                columns={2}
                options={t.options.map((o) => ({ label: o }))}
                correct={3}
                onPick={(i) => {
                  setPicked(i);
                  setOpen(true);
                }}
                result={<p style={{ fontSize: 32, fontWeight: 700 }}>{t.reveal}</p>}
              />
            </Reveal>
          )}
        </div>
      </div>
    </SceneFrame>
  );
}
