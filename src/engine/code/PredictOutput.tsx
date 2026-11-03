import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUi } from '@/i18n';
import { useNumberKeys, useSceneState } from '../scene/hooks';
import { CodeBlock } from './CodeBlock';
import type { CodeLang } from './highlight';

export interface OutputSnippet {
  label: ReactNode;
  code: string;
  /** Exact output lines, prepared in advance (deterministic) */
  output: string[];
  /** Optional: code line that produced each output line, for the trace marker */
  trace?: number[];
  lang?: CodeLang;
  explain?: ReactNode;
}

/** Code on screen → the chat guesses the output → the mentor runs it line by line. */
export function PredictOutput({ snippets, name = 'out' }: { snippets: OutputSnippet[]; name?: string }) {
  const ui = useUi();
  const [active, setActive] = useSceneState<number>(`${name}:active`, 0);
  const [guesses, setGuesses] = useSceneState<Record<number, string[]>>(`${name}:guesses`, {});
  const [ranTo, setRanTo] = useState(-1);
  const [running, setRunning] = useState(false);
  const [value, setValue] = useState('');
  useNumberKeys((n) => n <= snippets.length && switchTo(n - 1));

  const sn = snippets[active];
  const g = guesses[active] ?? [];
  const done = ranTo >= sn.output.length - 1;
  const norm = (s: string) => s.replace(/[\s,;]+/g, ' ').trim().toLowerCase();
  const target = norm(sn.output.join(' '));

  function switchTo(i: number) {
    setActive(i);
    setRanTo(-1);
    setRunning(false);
  }

  useEffect(() => {
    if (!running) return;
    if (ranTo >= sn.output.length - 1) {
      setRunning(false);
      return;
    }
    const id = window.setTimeout(() => setRanTo((r) => r + 1), sn.output.length > 12 ? 160 : 450);
    return () => window.clearTimeout(id);
  }, [running, ranTo, sn.output.length]);

  return (
    <div className="pout">
      {snippets.length > 1 && (
        <div className="pout__tabs">
          {snippets.map((s, i) => (
            <button key={i} className={`seg ${i === active ? 'is-active' : ''}`} onClick={() => switchTo(i)}>
              {i + 1}. {s.label}
            </button>
          ))}
        </div>
      )}
      <div className="pout__body">
        <div className="pout__code">
          <CodeBlock code={sn.code} lang={sn.lang ?? 'js'} activeLine={running && sn.trace ? sn.trace[Math.max(0, ranTo)] : null} />
          <div className="pout__actions">
            <button
              className="btn btn--accent"
              onClick={() => {
                setRanTo(-1);
                setRunning(true);
              }}
            >
              ▶ {ui.run}
            </button>
          </div>
        </div>
        <div className="pout__side">
          <div className="pout__guesses">
            <div className="live__label">{ui.chatGuesses}</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!value.trim()) return;
                setGuesses({ ...guesses, [active]: [...g, value.trim()].slice(-6) });
                setValue('');
              }}
            >
              <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="1 2 3 …" />
            </form>
            <div className="pout__chips">
              {g.map((x, i) => (
                <span key={i} className={`pchip ${done ? (norm(x) === target ? 'is-correct' : 'is-wrong') : ''}`}>
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="pout__console">
            <div className="live__label">{ui.console}</div>
            <div className="pout__lines">
              <AnimatePresence>
                {sn.output.slice(0, ranTo + 1).map((o, i) => (
                  <motion.div key={`${active}-${i}`} className="live__log" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}>
                    {o}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          {done && sn.explain && (
            <motion.div className="pout__explain" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              {sn.explain}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
