import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNumberKeys, useSceneState } from '../scene/hooks';

export interface Hotspot {
  id: string;
  /** Position in % of the art box */
  x: number;
  y: number;
  label: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
}

interface Props {
  art: ReactNode;
  spots: Hotspot[];
  name?: string;
  /** width × height of the art box in stage px */
  width?: number;
  height?: number;
  /** Where the info card appears */
  panel?: 'right' | 'bottom';
  onAllVisited?: () => void;
  /** Show text labels next to the spots (turn off when the art is dense) */
  labels?: boolean;
}

/** Clickable objects in an illustration; each opens a short explanation. Keys 1–9 open spots. */
export function Hotspots({ art, spots, name = 'spots', width = 1100, height = 700, panel = 'right', onAllVisited, labels = true }: Props) {
  const [open, setOpen] = useSceneState<string | null>(`${name}:open`, null);
  const [visited, setVisited] = useSceneState<string[]>(`${name}:visited`, []);
  const openSpot = (id: string) => {
    setOpen(id);
    if (!visited.includes(id)) {
      const v = [...visited, id];
      setVisited(v);
      if (v.length === spots.length) onAllVisited?.();
    }
  };
  useNumberKeys((n) => spots[n - 1] && openSpot(spots[n - 1].id));
  const current = spots.find((s) => s.id === open);

  return (
    <div className={`hotspots hotspots--${panel}`}>
      <div className="hotspots__art" style={{ width, height }}>
        {art}
        {spots.map((s, i) => (
          <motion.button
            key={s.id}
            className={`hotspot ${open === s.id ? 'is-open' : ''} ${visited.includes(s.id) ? 'is-visited' : ''}`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            onClick={() => openSpot(s.id)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 260, damping: 16 }}
          >
            <span className="hotspot__pulse" />
            <span className="hotspot__icon">{s.icon ?? i + 1}</span>
            {labels && <span className="hotspot__label">{s.label}</span>}
          </motion.button>
        ))}
      </div>
      <div className="hotspots__panel">
        <AnimatePresence mode="wait">
          {current ? (
            <motion.div key={current.id} className="hotspots__card" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3>{current.label}</h3>
              <div>{current.content}</div>
            </motion.div>
          ) : (
            <motion.div key="empty" className="hotspots__empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span>👆</span>1 – {spots.length}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="hotspots__dots">
          {spots.map((s) => (
            <span key={s.id} className={visited.includes(s.id) ? 'is-on' : ''} />
          ))}
        </div>
      </div>
    </div>
  );
}
