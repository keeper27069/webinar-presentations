import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUi } from '@/i18n';
import { useNumberKeys, useSceneState } from '../scene/hooks';
import { CodeBlock } from './CodeBlock';
import type { CodeLang } from './highlight';

export interface BugSnippet {
  title: ReactNode;
  code: string;
  lang?: CodeLang;
  bugs: { line: number; explain: ReactNode; fix?: string }[];
}

/** The chat writes the line number with the bug; the mentor clicks it. Keys 1–9 switch snippets. */
export function BugHunt({ snippets, name = 'bugs' }: { snippets: BugSnippet[]; name?: string }) {
  const ui = useUi();
  const [active, setActive] = useSceneState<number>(`${name}:active`, 0);
  const [found, setFound] = useSceneState<Record<number, number[]>>(`${name}:found`, {});
  const [miss, setMiss] = useState<number | null>(null);
  const [last, setLast] = useState<number | null>(null);
  useNumberKeys((n) => n <= snippets.length && setActive(n - 1));

  const sn = snippets[active];
  const f = found[active] ?? [];
  const click = (line: number) => {
    const bug = sn.bugs.find((b) => b.line === line);
    if (bug) {
      if (!f.includes(line)) setFound({ ...found, [active]: [...f, line] });
      setLast(line);
      setMiss(null);
    } else {
      setMiss(line);
      window.setTimeout(() => setMiss((m) => (m === line ? null : m)), 1200);
    }
  };
  const shown = sn.bugs.find((b) => b.line === last && f.includes(b.line)) ?? null;

  return (
    <div className="bughunt">
      <div className="bughunt__tabs">
        {snippets.map((s, i) => {
          const done = (found[i]?.length ?? 0) === s.bugs.length;
          return (
            <button key={i} className={`seg ${i === active ? 'is-active' : ''} ${done ? 'is-done' : ''}`} onClick={() => { setActive(i); setLast(null); }}>
              {done ? '✓' : i + 1} {s.title}
            </button>
          );
        })}
      </div>
      <div className="bughunt__body">
        <CodeBlock
          code={sn.code}
          lang={sn.lang ?? 'js'}
          onLineClick={click}
          lineClass={(n) => (f.includes(n) ? 'is-bug' : miss === n ? 'is-miss' : undefined)}
          lineExtra={(n) =>
            miss === n ? (
              <motion.span className="code__badge is-ok" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                {ui.lineOk}
              </motion.span>
            ) : f.includes(n) ? (
              <span className="code__badge is-bug">🐞</span>
            ) : null
          }
        />
        <div className="bughunt__side">
          <div className="bughunt__counter">
            🐞 {f.length} / {sn.bugs.length}
          </div>
          <AnimatePresence mode="wait">
            {shown && (
              <motion.div key={`${active}-${shown.line}`} className="bughunt__explain" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <b>#{shown.line}</b> {shown.explain}
                {shown.fix && <CodeBlock code={shown.fix} lang={sn.lang ?? 'js'} />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
