import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { StageScaleContext } from './context';

export const STAGE_W = 1920;
export const STAGE_H = 1080;

/**
 * Fixed 1920×1080 canvas scaled to fit the window (letterboxed).
 * Everything inside uses stage pixels, so the layout is identical on any screen and in the stream.
 */
export function Stage({ children, module }: { children: ReactNode; module?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      setScale(Math.min(r.width / STAGE_W, r.height / STAGE_H));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} className="stage-wrap">
      <div
        className="stage"
        data-stage
        data-module={module}
        style={{ width: STAGE_W, height: STAGE_H, transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        <StageScaleContext.Provider value={scale}>{children}</StageScaleContext.Provider>
      </div>
    </div>
  );
}
