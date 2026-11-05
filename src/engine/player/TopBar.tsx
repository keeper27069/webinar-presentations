import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LOCALES } from '../types';
import { LOCALE_SHORT, useLocale, useUi } from '@/i18n';
import { usePlayer } from './context';

/**
 * Calm top bar: back + title on the left, a thin progress line, and only two
 * controls on the right — the scene counter and one "⋯" menu (language, hint,
 * reset, notes). Keyboard shortcuts keep working as before.
 */
export function TopBar({ onOverview, presenterUrl }: { onOverview: () => void; presenterUrl: string }) {
  const p = usePlayer();
  const ui = useUi();
  const locale = useLocale();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const total = p.lesson.scenes.length;
  const stage = p.lesson.scenes[p.sceneIndex]?.stage ?? 0;

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  }, [open]);

  const run = (fn: () => void) => () => {
    fn();
    setOpen(false);
  };

  return (
    <header className="topbar">
      <Link to={`/${locale}/${p.meta.module}`} className="tb-back" title={ui.backToCatalog} aria-label={ui.backToCatalog}>
        ←
      </Link>
      <div className="topbar__left">
        <span className="topbar__module">{ui.modules[p.meta.module]}</span>
        <span className="topbar__title">{p.content.title}</span>
      </div>
      <span className="topbar__stage">{p.content.route[stage]}</span>
      <div className="topbar__right">
        <button className="tb-count" onClick={onOverview} title={`${ui.overview} (O)`}>
          {p.sceneIndex + 1}
          <span> / {total}</span>
        </button>
        <div className="tb-menu" ref={menuRef}>
          <button className="tb-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="menu">
            ⋯
          </button>
          {open && (
            <div className="tb-menu__pop" role="menu">
              <div className="tb-langs">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    className={`tb-lang ${l === locale ? 'is-active' : ''}`}
                    onClick={run(() => nav(`/${l}/${p.meta.module}/${p.meta.slug}/${p.sceneIndex + 1}`, { replace: true }))}
                  >
                    {LOCALE_SHORT[l]}
                  </button>
                ))}
              </div>
              <button className="tb-item" onClick={run(p.toggleHint)}>
                💡 {ui.hint} <kbd>H</kbd>
              </button>
              <button className="tb-item" onClick={run(p.resetScene)}>
                ↺ {ui.reset} <kbd>R</kbd>
              </button>
              <button className="tb-item" onClick={run(() => window.open(presenterUrl, `presenter-${p.lesson.id}`, 'width=1100,height=800'))}>
                📝 {ui.presenter} <kbd>P</kbd>
              </button>
              <button className="tb-item" onClick={run(onOverview)}>
                🗂️ {ui.overview} <kbd>O</kbd>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="tb-progress">
        <motion.div className="tb-progress__fill" animate={{ scaleX: (p.sceneIndex + 1) / total }} transition={{ type: 'spring', stiffness: 120, damping: 22 }} />
      </div>
    </header>
  );
}
