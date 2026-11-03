import { useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUi } from '@/i18n';
import { useSceneState } from '../scene/hooks';

export interface BoardCard {
  id: string;
  text: string;
  /** Result of `match` — e.g. 'hit' to highlight */
  tag?: string;
}

interface Props {
  /** Prepared examples in case the chat is quiet */
  seeds?: string[];
  /** Classify a card: return a tag (used as CSS modifier `is-<tag>`) and an optional badge */
  match?: (text: string) => { tag: string; badge?: ReactNode } | null;
  placeholder?: string;
  name?: string;
  /** Max cards shown */
  max?: number;
  footer?: ReactNode;
}

/** The mentor types the best ideas from the chat — they appear as cards on the board. */
export function ChatBoard({ seeds = [], match, placeholder, name = 'board', max = 12, footer }: Props) {
  const ui = useUi();
  const [cards, setCards] = useSceneState<BoardCard[]>(name, []);
  const [value, setValue] = useState('');
  const seedIdx = useRef(0);

  const add = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setCards((c) => [...c, { id: `${Date.now()}-${c.length}`, text: t }].slice(-max));
    setValue('');
  };
  const addSeed = () => {
    const unused = seeds.filter((s) => !cards.some((c) => c.text === s));
    if (unused.length === 0) return;
    add(unused[seedIdx.current++ % unused.length]);
  };

  return (
    <div className="board">
      <form
        className="board__form"
        onSubmit={(e) => {
          e.preventDefault();
          add(value);
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? ui.addIdeaPlaceholder}
          aria-label={ui.addIdeaPlaceholder}
          maxLength={60}
        />
        <button type="submit" className="btn btn--accent">
          {ui.addIdea}
        </button>
        {seeds.length > 0 && (
          <button type="button" className="btn btn--ghost" onClick={addSeed}>
            {ui.suggestExamples}
          </button>
        )}
      </form>
      <div className="board__cards">
        <AnimatePresence>
          {cards.map((c, i) => {
            const m = match?.(c.text) ?? null;
            return (
              <motion.button
                layout
                key={c.id}
                className={`board__card ${m ? `is-${m.tag}` : ''}`}
                initial={{ opacity: 0, scale: 0.6, rotate: i % 2 ? 4 : -4 }}
                animate={{ opacity: 1, scale: 1, rotate: i % 2 ? 1.5 : -1.5 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                onClick={() => setCards((cs) => cs.filter((x) => x.id !== c.id))}
                title="×"
              >
                <span className="board__text">{c.text}</span>
                {m?.badge && <span className="board__badge">{m.badge}</span>}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
      {footer}
    </div>
  );
}
