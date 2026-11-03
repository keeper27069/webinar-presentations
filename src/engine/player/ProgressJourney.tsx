import { motion } from 'framer-motion';
import { usePlayer } from './context';

/** Animated route map: DISCOVER → … → FINAL MISSION */
export function ProgressJourney() {
  const p = usePlayer();
  const stages = p.content.route;
  const current = p.lesson.scenes[p.sceneIndex]?.stage ?? 0;
  const progress = (p.sceneIndex + 1) / p.lesson.scenes.length;

  return (
    <nav className="journey" aria-label="progress">
      <div className="journey__track">
        <motion.div className="journey__fill" animate={{ scaleX: progress }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
      </div>
      <ol className="journey__stages">
        {stages.map((s, i) => {
          const first = p.lesson.scenes.findIndex((sc) => sc.stage === i);
          return (
            <li key={i} className={`journey__stage ${i < current ? 'is-done' : ''} ${i === current ? 'is-current' : ''}`}>
              <button onClick={() => first >= 0 && p.goTo(first)} tabIndex={-1}>
                <span className="journey__dot">{i < current ? '✓' : i + 1}</span>
                <span className="journey__label">{s}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
