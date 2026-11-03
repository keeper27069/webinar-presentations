import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LessonPlayer, PresenterView, type LessonDefinition } from '@engine';
import { useLocale, useUi } from '@/i18n';
import { findLesson } from '@/lessons/registry';

export function LessonPage({ presenter = false }: { presenter?: boolean }) {
  const { module, slug, scene } = useParams();
  const locale = useLocale();
  const ui = useUi();
  const nav = useNavigate();
  const meta = findLesson(module, slug);
  const [lesson, setLesson] = useState<LessonDefinition | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLesson(null);
    setError(false);
    if (!meta?.load) return;
    let alive = true;
    meta
      .load()
      .then((m) => alive && setLesson(m.default))
      .catch(() => alive && setError(true));
    return () => {
      alive = false;
    };
  }, [meta]);

  useEffect(() => {
    const t = lesson?.content[locale]?.title;
    document.title = t ? (presenter ? `▤ ${t}` : t) : 'Bit Lab';
  }, [lesson, locale, presenter]);

  if (!meta || meta.status !== 'ready' || error) {
    return (
      <div className="center-msg">
        <p>{ui.notFound}</p>
        <Link to={`/${locale}`} className="btn btn--accent">
          {ui.backToCatalog}
        </Link>
      </div>
    );
  }
  if (!lesson) return <div className="center-msg">{ui.loading}</div>;

  const base = `/${locale}/${meta.module}/${meta.slug}`;
  if (presenter) return <PresenterView lesson={lesson} meta={meta} locale={locale} />;

  return (
    <LessonPlayer
      key={meta.id}
      lesson={lesson}
      meta={meta}
      locale={locale}
      initialScene={Math.max(0, (Number(scene) || 1) - 1)}
      presenterUrl={`${base}/presenter`}
      onSceneChange={(i) => {
        const target = `${base}/${i + 1}`;
        if (window.location.pathname !== target) nav(target, { replace: true });
      }}
    />
  );
}
