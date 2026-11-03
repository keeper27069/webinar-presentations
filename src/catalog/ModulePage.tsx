import { Link, Navigate, useParams } from 'react-router-dom';
import type { ModuleId } from '@engine/types';
import { useLocale, useUi } from '@/i18n';
import { MODULES, lessonsOf } from '@/lessons/registry';
import { Header } from './Header';
import { LessonCard } from './LessonCard';

export function ModulePage() {
  const { module } = useParams();
  const locale = useLocale();
  const ui = useUi();
  if (!MODULES.includes(module as ModuleId)) return <Navigate to={`/${locale}`} replace />;
  const m = module as ModuleId;

  return (
    <div className="catalog" data-module={m}>
      <Header />
      <div className="module-head">
        <Link to={`/${locale}`} className="back">
          ← {ui.backToCatalog}
        </Link>
        <h1>{ui.modules[m]}</h1>
      </div>
      <div className="module-cols">
        {(['general', 'technical'] as const).map((k) => (
          <section key={k} className="module-col">
            <h2>{k === 'general' ? ui.general : ui.technical}</h2>
            <p className="muted">{k === 'general' ? ui.generalHint : ui.technicalHint}</p>
            <div className="module-list">
              {lessonsOf(m, k).map((l) => (
                <LessonCard key={l.id} l={l} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
