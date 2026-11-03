import type { ComponentType } from 'react';

export type Locale = 'uz' | 'ru' | 'en';
export const LOCALES: Locale[] = ['uz', 'ru', 'en'];
export const DEFAULT_LOCALE: Locale = 'uz';

export type ModuleId = 'html' | 'css' | 'bootstrap' | 'tilda-git' | 'js' | 'react';
export type LessonKind = 'general' | 'technical';
export type L10n<T = string> = Record<Locale, T>;

/** What the mentor sees in the presenter window. Never shown on the stream stage. */
export interface SceneNotes {
  /** 2–5 bullets: what to say */
  say: string[];
  /** Question to ask the chat */
  askChat?: string;
  /** Likely chat answers and how to react */
  expectChat?: string[];
  /** Correct answer / explanation */
  answer?: string;
  /** Planned minutes for the scene */
  minutes: number;
  /** "VS Code", "Tilda", "browser" — when the mentor switches apps */
  switchTo?: string;
}

export interface SceneText {
  title: string;
  /** Shown as "💬 Write in chat: …" */
  chatPrompt?: string;
  hint?: string;
  takeaway?: string;
  notes: SceneNotes;
}

export interface LessonContentBase {
  title: string;
  bigQuestion: string;
  /** Names of route stages for the progress map */
  route: string[];
  scenes: Record<string, SceneText>;
}

export interface SceneDefinition {
  /** Key in content.scenes, e.g. 's01' */
  key: string;
  /** Index into content.route */
  stage: number;
  /** Number of internal reveal steps advanced with → (default 1 = no internal steps) */
  steps?: number;
  /** The scene component (reads its text via useSceneText / useLessonContent) */
  Component: ComponentType;
}

export interface LessonDefinition<C extends LessonContentBase = LessonContentBase> {
  id: string;
  scenes: SceneDefinition[];
  content: Record<Locale, C>;
}

export interface LessonMeta {
  id: string;
  module: ModuleId;
  kind: LessonKind;
  number: number;
  slug: string;
  title: L10n;
  summary: L10n;
  status: 'planned' | 'ready';
  /** Planned minutes; filled for ready lessons */
  minutes?: number;
  load?: () => Promise<{ default: LessonDefinition<any> }>;
}
