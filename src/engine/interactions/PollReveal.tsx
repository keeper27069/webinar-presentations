import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNumberKeys, useSceneState } from '../scene/hooks';

export interface PollOption {
  label: ReactNode;
  detail?: ReactNode;
}

interface Props {
  options: PollOption[];
  /** Index of the correct option; omit for opinion polls */
  correct?: number;
  /** Shown after the mentor picks the chat's winning option */
  result?: ReactNode | ((picked: number) => ReactNode);
  onPick?: (i: number) => void;
  name?: string;
  columns?: number;
}

/** The chat votes 1–N, the mentor clicks (or presses the number) of the winning option → reveal. */
export function PollReveal({ options, correct, result, onPick, name = 'poll', columns }: Props) {
  const [picked, setPicked] = useSceneState<number | null>(name, null);
  const pick = (i: number) => {
    if (i < 0 || i >= options.length) return;
    setPicked(i);
    onPick?.(i);
  };
  useNumberKeys((n) => pick(n - 1));

  return (
    <div className="poll">
      <div className="poll__options" style={{ gridTemplateColumns: `repeat(${columns ?? Math.min(options.length, 4)}, 1fr)` }}>
        {options.map((o, i) => {
          const isPicked = picked === i;
          const state =
            picked == null ? '' : correct == null ? (isPicked ? 'is-picked' : 'is-dim') : i === correct ? 'is-correct' : isPicked ? 'is-wrong' : 'is-dim';
          return (
            <motion.button
              key={i}
              className={`poll__opt ${state}`}
              onClick={() => pick(i)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              animate={state === 'is-wrong' ? { x: [0, -10, 10, -6, 6, 0] } : state === 'is-correct' ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.45 }}
            >
              <span className="poll__num">{i + 1}</span>
              <span className="poll__label">{o.label}</span>
              {o.detail && picked != null && <span className="poll__detail">{o.detail}</span>}
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked != null && result && (
          <motion.div className="poll__result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {typeof result === 'function' ? result(picked) : result}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
