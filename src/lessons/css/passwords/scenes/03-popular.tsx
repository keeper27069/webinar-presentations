import { motion } from 'framer-motion';
import { ChatBoard, SceneFrame, useLessonContent, useStep } from '@engine';
import type { Content } from '../content/schema';
import { isCommon } from '../shared';

const SEEDS = ['123456', 'qwerty', 'password', '111111', 'iloveyou', 'abc123', 'admin', 'football'];

export default function S03() {
  const t = useLessonContent<Content>().scenes.s03;
  const [step] = useStep();
  return (
    <SceneFrame showTakeaway={step >= 1}>
      <div className="col" style={{ height: '100%' }}>
        <motion.div
          className="glass"
          style={{ padding: '18px 26px', borderColor: '#ff6b6b', background: 'rgba(255,107,107,.12)', fontWeight: 800, fontSize: 30 }}
          animate={{ boxShadow: ['0 0 0 0 rgba(255,107,107,0)', '0 0 0 6px rgba(255,107,107,.35)', '0 0 0 0 rgba(255,107,107,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚠ {t.warning}
        </motion.div>
        <div className="fill">
          <ChatBoard
            seeds={SEEDS}
            match={(s) => (isCommon(s) ? { tag: 'hit', badge: `🚨 ${t.inList}` } : { tag: 'miss', badge: t.notInList })}
          />
        </div>
      </div>
    </SceneFrame>
  );
}
