import { Link } from 'react-router-dom';
import type { LessonMeta } from '@engine/types';
import { useLocale, useUi } from '@/i18n';

export function LessonCard({ l, showModule = false }: { l: LessonMeta; showModule?: boolean }) {
  const locale = useLocale();
  const ui = useUi();
  const ready = l.status === 'ready';
  const body = (
    <>
      <div className="lcard__top">
        <span className="lcard__num">
          {l.kind === 'general' ? '◆' : '</>'} {l.number}
        </span>
        {showModule && <span className="lcard__module">{ui.modules[l.module]}</span>}
        <span className={`lcard__status ${ready ? 'is-ready' : ''}`}>{ready ? ui.ready : ui.soon}</span>
      </div>
      <h3 className="lcard__title">{l.title[locale]}</h3>
      <p className="lcard__summary">{l.summary[locale]}</p>
      {ready && l.minutes && <div className="lcard__meta">{ui.minutes(l.minutes)}</div>}
    </>
  );
  return ready ? (
    <Link to={`/${locale}/${l.module}/${l.slug}`} className="lcard is-ready" data-module={l.module}>
      {body}
    </Link>
  ) : (
    <div className="lcard" data-module={l.module} aria-disabled>
      {body}
    </div>
  );
}
