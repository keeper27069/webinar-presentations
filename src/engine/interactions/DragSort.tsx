import { useRef, useState, type ReactNode, type PointerEvent as RPointerEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUi } from '@/i18n';
import { useStageScale } from '../player/context';
import { useSceneState } from '../scene/hooks';

export interface SortItem {
  id: string;
  label: ReactNode;
}
export interface SortZone {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
}

interface Props {
  items: SortItem[];
  zones: SortZone[];
  /** itemId → correct zoneId */
  answer: Record<string, string>;
  /** itemId → short explanation shown after checking */
  explain?: Record<string, ReactNode>;
  name?: string;
  onChecked?: (allCorrect: boolean) => void;
  checkLabel?: string;
}

type Placement = Record<string, string | null>;

/**
 * Sort cards into groups. Drag with the mouse, or click a card then click a zone
 * (more reliable while streaming). Stage-scale aware.
 */
export function DragSort({ items, zones, answer, explain, name = 'sort', onChecked, checkLabel }: Props) {
  const ui = useUi();
  const scale = useStageScale();
  const [place, setPlace] = useSceneState<Placement>(`${name}:place`, () => Object.fromEntries(items.map((i) => [i.id, null])));
  const [checked, setChecked] = useSceneState<boolean>(`${name}:checked`, false);
  const [selected, setSelected] = useState<string | null>(null);
  const [focusExplain, setFocusExplain] = useState<string | null>(null);
  const drag = useRef<{ id: string; x0: number; y0: number; el: HTMLElement; moved: boolean } | null>(null);

  const placeItem = (id: string, zone: string | null) => {
    setPlace((p) => ({ ...p, [id]: zone }));
    setChecked(false);
    setSelected(null);
  };

  const onDown = (e: RPointerEvent<HTMLElement>, id: string) => {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    drag.current = { id, x0: e.clientX, y0: e.clientY, el, moved: false };
  };
  const onMove = (e: RPointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = (e.clientX - d.x0) / scale;
    const dy = (e.clientY - d.y0) / scale;
    if (!d.moved && Math.hypot(dx, dy) > 6) d.moved = true;
    if (d.moved) {
      d.el.style.transform = `translate(${dx}px, ${dy}px) rotate(2deg) scale(1.04)`;
      d.el.style.zIndex = '50';
      d.el.style.pointerEvents = 'none';
    }
  };
  const onUp = (e: RPointerEvent<HTMLElement>) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    d.el.style.transform = '';
    d.el.style.zIndex = '';
    d.el.style.pointerEvents = '';
    if (!d.moved) {
      if (checked && explain?.[d.id]) setFocusExplain(d.id);
      setSelected((s) => (s === d.id ? null : d.id));
      return;
    }
    const hit = document.elementsFromPoint(e.clientX, e.clientY).find((n) => (n as HTMLElement).dataset?.zone);
    const zone = (hit as HTMLElement | undefined)?.dataset.zone ?? null;
    placeItem(d.id, zone === '__tray' ? null : zone);
  };

  const check = () => {
    setChecked(true);
    const ok = items.every((i) => place[i.id] === answer[i.id]);
    onChecked?.(ok);
  };
  const allPlaced = items.every((i) => place[i.id]);
  const correctCount = items.filter((i) => place[i.id] === answer[i.id]).length;

  const renderChip = (it: SortItem) => {
    const z = place[it.id];
    const state = checked && z ? (answer[it.id] === z ? 'is-correct' : 'is-wrong') : '';
    return (
      <motion.div
        layout
        key={it.id}
        className={`chip ${selected === it.id ? 'is-selected' : ''} ${state}`}
        onPointerDown={(e) => onDown(e, it.id)}
        onPointerMove={onMove}
        onPointerUp={onUp}
        role="button"
        tabIndex={0}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {state === 'is-correct' && <span className="chip__mark">✓</span>}
        {state === 'is-wrong' && <span className="chip__mark">✗</span>}
        {it.label}
      </motion.div>
    );
  };

  return (
    <div className="sort">
      <div className="sort__tray" data-zone="__tray" onClick={() => selected && placeItem(selected, null)}>
        {items.filter((i) => !place[i.id]).map(renderChip)}
      </div>
      <div className="sort__zones" style={{ gridTemplateColumns: `repeat(${zones.length}, 1fr)` }}>
        {zones.map((z) => (
          <div
            key={z.id}
            className={`sort__zone ${selected ? 'is-target' : ''}`}
            data-zone={z.id}
            onClick={() => selected && placeItem(selected, z.id)}
          >
            <div className="sort__zone-head">
              {z.icon}
              <span>{z.label}</span>
            </div>
            <div className="sort__zone-items">{items.filter((i) => place[i.id] === z.id).map(renderChip)}</div>
          </div>
        ))}
      </div>
      <div className="sort__footer">
        <button className="btn btn--accent" onClick={check} disabled={!allPlaced}>
          {checkLabel ?? ui.check}
        </button>
        {checked && (
          <motion.span className="sort__score" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            {correctCount === items.length ? `🎉 ${ui.allDone}` : `${correctCount} / ${items.length}`}
          </motion.span>
        )}
        <AnimatePresence mode="wait">
          {checked && focusExplain && explain?.[focusExplain] && (
            <motion.div key={focusExplain} className="sort__explain" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {explain[focusExplain]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
