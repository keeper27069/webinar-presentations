import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useUi } from '@/i18n';
import { useSceneState } from '../scene/hooks';

interface Props {
  min: number;
  max: number;
  answer: number;
  /** Integer steps on a linear scale (default) or log10 scale */
  scale?: 'linear' | 'log';
  format?: (v: number) => ReactNode;
  initial?: number;
  name?: string;
  result?: ReactNode;
  label?: ReactNode;
}

/** The chat writes a number, the mentor sets the slider, then reveals the truth. */
export function PredictSlider({ min, max, answer, scale = 'linear', format = (v) => v, initial, name = 'predict', result, label }: Props) {
  const ui = useUi();
  const toPos = (v: number) => (scale === 'log' ? (Math.log10(v) - Math.log10(min)) / (Math.log10(max) - Math.log10(min)) : (v - min) / (max - min));
  const fromPos = (p: number) => (scale === 'log' ? Math.pow(10, Math.log10(min) + p * (Math.log10(max) - Math.log10(min))) : Math.round(min + p * (max - min)));
  const [pos, setPos] = useSceneState<number>(`${name}:pos`, toPos(initial ?? (scale === 'log' ? Math.sqrt(min * max) : (min + max) / 2)));
  const [revealed, setRevealed] = useSceneState<boolean>(`${name}:rev`, false);
  const value = fromPos(pos);

  return (
    <div className="predict">
      {label && <div className="predict__label">{label}</div>}
      <div className="predict__value">{format(value)}</div>
      <div className="predict__track">
        <input
          type="range"
          min={0}
          max={1000}
          value={Math.round(pos * 1000)}
          onChange={(e) => {
            setPos(Number(e.target.value) / 1000);
            setRevealed(false);
          }}
          aria-label="prediction"
        />
        {revealed && (
          <motion.div className="predict__answer" style={{ left: `${toPos(answer) * 100}%` }} initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}>
            <span>{format(answer)}</span>
          </motion.div>
        )}
      </div>
      <div className="predict__actions">
        <button className="btn btn--accent" onClick={() => setRevealed(true)}>
          {ui.reveal}
        </button>
      </div>
      {revealed && result && (
        <motion.div className="predict__result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {result}
        </motion.div>
      )}
    </div>
  );
}
