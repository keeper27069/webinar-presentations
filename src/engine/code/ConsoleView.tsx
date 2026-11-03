import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUi } from '@/i18n';

/** Read-only console panel for simulations (lines appear with a small animation). */
export function ConsoleView({ lines, height = 360, title }: { lines: string[]; height?: number; title?: string }) {
  const ui = useUi();
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (box.current) box.current.scrollTop = box.current.scrollHeight;
  }, [lines.length]);
  return (
    <div className="col" style={{ gap: 0 }}>
      <div className="live__label">{title ?? ui.console}</div>
      <div ref={box} className="live__logs" style={{ height, maxHeight: height }}>
        <AnimatePresence initial={false}>
          {lines.map((l, i) => (
            <motion.div key={i} className="live__log" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
              {l}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
