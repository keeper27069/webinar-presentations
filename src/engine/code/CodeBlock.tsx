import type { CSSProperties, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { highlightLine, type CodeLang } from './highlight';

interface Props {
  code: string;
  lang?: CodeLang;
  /** 1-based line currently executing (animated marker) */
  activeLine?: number | null;
  /** 1-based lines to emphasise */
  highlight?: number[];
  onLineClick?: (line: number) => void;
  lineClass?: (line: number) => string | undefined;
  /** Extra node rendered at the end of a line (e.g. a badge) */
  lineExtra?: (line: number) => ReactNode;
  fontSize?: number;
  style?: CSSProperties;
  title?: ReactNode;
}

export function CodeBlock({ code, lang = 'js', activeLine, highlight = [], onLineClick, lineClass, lineExtra, fontSize, style, title }: Props) {
  const lines = code.replace(/\n$/, '').split('\n');
  return (
    <div className="code" style={{ ...style, ...(fontSize ? { fontSize } : {}) }}>
      {title && <div className="code__title">{title}</div>}
      <pre className="code__pre">
        {lines.map((l, idx) => {
          const n = idx + 1;
          const cls = ['code__line', highlight.includes(n) && 'is-hl', activeLine === n && 'is-active', onLineClick && 'is-clickable', lineClass?.(n)]
            .filter(Boolean)
            .join(' ');
          return (
            <div key={idx} className={cls} onClick={onLineClick ? () => onLineClick(n) : undefined}>
              {activeLine === n && <motion.span layoutId="code-active" className="code__active-bar" />}
              <span className="code__ln">{n}</span>
              <span className="code__src">{l.length ? highlightLine(l, lang) : ' '}</span>
              {lineExtra?.(n)}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
