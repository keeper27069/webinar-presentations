import { createContext, useContext } from 'react';
import type { LessonContentBase, LessonDefinition, LessonMeta, SceneText } from '../types';

export interface PlayerApi {
  lesson: LessonDefinition;
  meta: LessonMeta;
  content: LessonContentBase;
  sceneIndex: number;
  step: number;
  next: () => void;
  prev: () => void;
  goTo: (scene: number, step?: number) => void;
  setStep: (step: number) => void;
  resetScene: () => void;
  resetLesson: () => void;
  hintOpen: boolean;
  toggleHint: () => void;
  /** Set by interactive components: handler for keys 1–9 in the active scene */
  setNumberHandler: (h: ((n: number) => void) | null) => void;
}

export const PlayerContext = createContext<PlayerApi | null>(null);

export function usePlayer(): PlayerApi {
  const p = useContext(PlayerContext);
  if (!p) throw new Error('usePlayer must be used inside LessonPlayer');
  return p;
}

export interface SceneCtx {
  key: string;
  index: number;
  /** `${lessonId}:${sceneKey}` — prefix for scene state */
  storeKey: string;
  text: SceneText;
}

export const SceneContext = createContext<SceneCtx | null>(null);

export function useSceneCtx(): SceneCtx {
  const s = useContext(SceneContext);
  if (!s) throw new Error('useSceneCtx must be used inside a scene');
  return s;
}

/** Stage scale (screen px per stage px). Needed for pointer math in drag interactions. */
export const StageScaleContext = createContext<number>(1);
export const useStageScale = () => useContext(StageScaleContext);
