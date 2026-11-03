import { LOCALES, type LessonContentBase, type LessonDefinition, type Locale, type SceneText } from '../types';
import { localize, problems } from './localize';
import { KIT, stepsOf } from './scenes';
import type { KitScene, KitSpec } from './types';

export type * from './types';
export { localize, uzFix } from './localize';

const key = (i: number) => `s${String(i + 1).padStart(2, '0')}`;

function sceneText(s: KitScene): SceneText & Record<string, unknown> {
  const { chat, notes, ...rest } = s;
  return {
    ...rest,
    chatPrompt: chat,
    notes: { say: notes.say, askChat: notes.ask, expectChat: notes.expect, answer: notes.answer, minutes: notes.min, switchTo: notes.switch },
  };
}

/** Build a full three-language lesson from one kit spec */
export function kit(spec: KitSpec): LessonDefinition {
  const content = {} as Record<Locale, LessonContentBase>;
  for (const loc of LOCALES) {
    const l = localize(spec, loc, spec.id);
    content[loc] = {
      title: l.title,
      bigQuestion: l.question,
      route: l.route,
      scenes: Object.fromEntries(l.scenes.map((s, i) => [key(i), sceneText(s)])),
    };
  }
  spec.scenes.forEach((s, i) => {
    if (s.stage < 0 || s.stage >= spec.route.length) problems.push(`${spec.id} ${key(i)}: stage ${s.stage} outside route`);
  });
  if (problems.length) {
    console.error(`[kit] ${spec.id}: ${problems.length} problem(s)\n` + problems.join('\n'));
    problems.length = 0;
  }
  return {
    id: spec.id,
    content,
    scenes: spec.scenes.map((s, i) => ({ key: key(i), stage: s.stage, steps: stepsOf(s), Component: KIT[s.type] })),
  };
}

/** Total planned minutes of a spec (for the registry) */
export const minutesOf = (spec: KitSpec) => spec.scenes.reduce((a, s) => a + s.notes.min, 0);
