import { Link, useNavigate } from 'react-router-dom';
import { LOCALES } from '../types';
import { LOCALE_SHORT, useLocale, useUi } from '@/i18n';
import { usePlayer } from './context';
import { ProgressJourney } from './ProgressJourney';

export function TopBar({ onOverview, presenterUrl }: { onOverview: () => void; presenterUrl: string }) {
  const p = usePlayer();
  const ui = useUi();
  const locale = useLocale();
  const nav = useNavigate();
  const total = p.lesson.scenes.length;

  return (
    <header className="topbar">
      <div className="topbar__left">
        <Link to={`/${locale}/${p.meta.module}`} className="topbar__module" title={ui.backToCatalog}>
          <span className="topbar__dot" />
          {ui.modules[p.meta.module]}
        </Link>
        <span className="topbar__title">{p.content.title}</span>
      </div>
      <ProgressJourney />
      <div className="topbar__right">
        <button className="tb-btn tb-btn--count" onClick={onOverview} title={`${ui.overview} (O)`}>
          {p.sceneIndex + 1}
          <span>/{total}</span>
        </button>
        <button className="tb-btn" onClick={p.toggleHint} title={`${ui.hint} (H)`} aria-pressed={p.hintOpen}>
          ?
        </button>
        <button className="tb-btn" onClick={p.resetScene} title={`${ui.reset} (R)`}>
          ↺
        </button>
        <button
          className="tb-btn"
          onClick={() => window.open(presenterUrl, `presenter-${p.lesson.id}`, 'width=1100,height=800')}
          title={`${ui.presenter} (P)`}
        >
          ▤
        </button>
        <div className="tb-langs">
          {LOCALES.map((l) => (
            <button
              key={l}
              className={`tb-lang ${l === locale ? 'is-active' : ''}`}
              onClick={() => nav(`/${l}/${p.meta.module}/${p.meta.slug}/${p.sceneIndex + 1}`, { replace: true })}
            >
              {LOCALE_SHORT[l]}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
