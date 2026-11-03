import type { LessonMeta, LessonKind, ModuleId } from '@engine/types';
import { TOPICS } from './topics';

export const MODULES: ModuleId[] = ['html', 'css', 'bootstrap', 'tilda-git', 'js', 'react'];

/**
 * Ready lessons: id → loader. Adding a lesson = one line here.
 * Lessons are code-split, so the catalog stays light.
 */
const READY: Record<string, { load: LessonMeta['load']; minutes: number }> = {
  'css-g09': { load: () => import('./css/passwords'), minutes: 59 },
  'js-t03': { load: () => import('./js/loops'), minutes: 53 },
};

export const LESSONS: LessonMeta[] = TOPICS.map(([id, slug, ru, uz, en, sru, suz, sen]) => {
  const m = /^(.*)-([gt])(\d+)$/.exec(id)!;
  const ready = READY[id];
  return {
    id,
    module: m[1] as ModuleId,
    kind: (m[2] === 'g' ? 'general' : 'technical') as LessonKind,
    number: Number(m[3]),
    slug,
    title: { ru, uz, en },
    summary: { ru: sru, uz: suz, en: sen },
    status: ready ? 'ready' : 'planned',
    minutes: ready?.minutes,
    load: ready?.load,
  };
});

export function findLesson(module: string | undefined, slug: string | undefined): LessonMeta | undefined {
  return LESSONS.find((l) => l.module === module && l.slug === slug);
}

export function lessonsOf(module: ModuleId, kind?: LessonKind) {
  return LESSONS.filter((l) => l.module === module && (!kind || l.kind === kind)).sort((a, b) => a.number - b.number);
}
