import { motion } from 'framer-motion';
import { useUi } from '@/i18n';
import { usePlayer } from './context';

export function SceneOverview({ onClose }: { onClose: () => void }) {
  const p = usePlayer();
  const ui = useUi();
  return (
    <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}>
      <div className="overview" onClick={(e) => e.stopPropagation()}>
        <h2>{ui.overview}</h2>
        <div className="overview__grid">
          {p.lesson.scenes.map((s, i) => (
            <button
              key={s.key}
              className={`overview__item ${i === p.sceneIndex ? 'is-current' : ''}`}
              onClick={() => {
                p.goTo(i);
                onClose();
              }}
            >
              <span className="overview__num">{i + 1}</span>
              <span className="overview__stage">{p.content.route[s.stage]}</span>
              <span className="overview__title">{p.content.scenes[s.key]?.title}</span>
            </button>
          ))}
        </div>
        <p className="overview__help">{ui.keyboardHelp}</p>
      </div>
    </motion.div>
  );
}
