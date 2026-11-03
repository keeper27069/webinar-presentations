import type { LessonContentBase, SceneText } from '@engine/types';

export interface Content extends LessonContentBase {
  locale: string;
  scenes: {
    s01: SceneText & { greeting: string; more: string; linesLabel: string; tired: string };
    s02: SceneText & { parts: { start: string; condition: string; step: string; body: string }; partText: { start: string; condition: string; step: string; body: string }; phase: Record<'init' | 'check' | 'body' | 'update' | 'done', string>; checkTrue: string; checkFalse: string };
    s03: SceneText & { labels: string[]; explain: string[] };
    s04: SceneText & { task: string; steps: { label: string; js: string }[] };
    s05: SceneText & { divisorLabel: string; clap: string; code: (d: number) => string };
    s06: SceneText & { weeklyLabel: string; money: string; weeks: string; goal: string; code: (w: number) => string; result: (w: number, m: number) => string };
    s07: SceneText & { items: string[]; code: string; inBag: string; deepTitle: string; deepCode: string; deepText: string };
    s08: SceneText & { snippets: { title: string; code: string; line: number; explain: string; fix: string }[] };
    s09: SceneText & { items: { text: string; zone: 'for' | 'while' | 'forof' }[]; explain: string[] };
    s10: SceneText & { task: string; steps: { label: string; js: string }[] };
    s11: SceneText & { sheetTitle: string; items: { text: string; code?: string }[] };
    s12: SceneText & { answer: string; badge: string; badgeSub: string; homeworkTitle: string; homework: string[]; again: string };
  };
}
