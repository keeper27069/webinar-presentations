/**
 * Kit lesson spec. Every natural-language string is written as 'ru ¦ uz ¦ en'
 * (see localize.ts). One spec file = one lesson in three languages.
 */
import type { CodeLang } from '../code/highlight';

export interface KitNotes {
  /** 2–4 bullets: what the mentor says */
  say: string[];
  /** Question for the chat */
  ask?: string;
  /** Likely chat answers and how to react */
  expect?: string[];
  /** Correct answer */
  answer?: string;
  /** Planned minutes */
  min: number;
  /** App to switch to (VS Code, Tilda, browser) */
  switch?: string;
}

interface Base {
  /** Index into the lesson route */
  stage: number;
  title: string;
  /** Chat chip: "💬 Write in chat: …" */
  chat?: string;
  hint?: string;
  takeaway?: string;
  notes: KitNotes;
}

export interface IntroScene extends Base {
  type: 'intro';
  icon: string;
  kicker?: string;
  /** Big question revealed on → */
  lead: string;
  /** Up to 3 short facts / hooks under the question */
  facts?: string[];
}
export interface PollScene extends Base {
  type: 'poll';
  question?: string;
  options: { label: string; detail?: string }[];
  correct?: number;
  result: string;
  columns?: number;
}
export interface PredictScene extends Base {
  type: 'predict';
  label: string;
  min: number;
  max: number;
  answer: number;
  scale?: 'linear' | 'log';
  unit?: string;
  result: string;
}
export interface BoardScene extends Base {
  type: 'board';
  seeds?: string[];
  /** Lower-case keywords: a chat idea containing one of them is a "hit" */
  hits?: string[];
  hitBadge?: string;
  missBadge?: string;
  placeholder?: string;
  footer?: string;
}
export interface SortScene extends Base {
  type: 'sort';
  zones: { id: string; label: string; icon?: string }[];
  items: { text: string; zone: string; why?: string }[];
}
export interface CardsScene extends Base {
  type: 'cards';
  cards: { icon: string; front: string; back: string }[];
  columns?: number;
}
export interface FlowScene extends Base {
  type: 'flow';
  nodes: { icon: string; label: string; text: string }[];
}
export interface TimelineScene extends Base {
  type: 'timeline';
  events: { year: string; icon: string; label: string; text: string }[];
}
export interface CompareSide {
  label: string;
  icon: string;
  points?: string[];
  code?: string;
  lang?: CodeLang;
}
export interface CompareScene extends Base {
  type: 'compare';
  left: CompareSide;
  right: CompareSide;
  verdict?: string;
}
export interface TrueFalseScene extends Base {
  type: 'truefalse';
  statements: { text: string; truth: boolean; explain: string }[];
}
export interface DialogScene extends Base {
  type: 'dialog';
  /** Two speakers: a (left) and b (right) */
  a: { name: string; icon: string };
  b: { name: string; icon: string };
  messages: { from: 'a' | 'b'; text: string; flag?: string; good?: string }[];
}
export interface TerminalScene extends Base {
  type: 'terminal';
  lines: { cmd: string; out?: string[]; note: string }[];
}
export interface WalkScene extends Base {
  type: 'walk';
  code: string;
  lang: CodeLang;
  marks: { line: number; text: string }[];
}
export interface LiveScene extends Base {
  type: 'live';
  task?: string;
  /** Console-only (JS) instead of a page preview */
  console?: boolean;
  steps: { label: string; html?: string; css?: string; js?: string }[];
}
export interface OutputScene extends Base {
  type: 'output';
  snippets: { label: string; code: string; output: string[]; explain: string; lang?: CodeLang }[];
}
export interface BugsScene extends Base {
  type: 'bugs';
  snippets: { title: string; code: string; lang?: CodeLang; line: number; explain: string; fix?: string }[];
}
export interface BrowserScene extends Base {
  type: 'browser';
  tabs: { label: string; url: string; html: string; css?: string; note?: string }[];
}
export interface NumbersScene extends Base {
  type: 'numbers';
  facts: { icon: string; value: string; label: string }[];
}
export interface CheatScene extends Base {
  type: 'cheatsheet';
  sheetTitle: string;
  items: { icon: string; text: string; code?: string }[];
  columns?: number;
}
export interface MissionScene extends Base {
  type: 'mission';
  goal: string;
  items: { title: string; choices: string[]; correct: number; explain: string }[];
}
export interface FinaleScene extends Base {
  type: 'finale';
  answer: string;
  icon: string;
  badge: string;
  badgeSub: string;
  homeworkTitle: string;
  homework: string[];
}

export type KitScene =
  | IntroScene
  | PollScene
  | PredictScene
  | BoardScene
  | SortScene
  | CardsScene
  | FlowScene
  | TimelineScene
  | CompareScene
  | TrueFalseScene
  | DialogScene
  | TerminalScene
  | WalkScene
  | LiveScene
  | OutputScene
  | BugsScene
  | BrowserScene
  | NumbersScene
  | CheatScene
  | MissionScene
  | FinaleScene;

export type KitType = KitScene['type'];

export interface KitSpec {
  id: string;
  title: string;
  question: string;
  route: string[];
  scenes: KitScene[];
}
