import { useCallback, useEffect, useRef, useState } from 'react';
import { readStore, writeStore } from '../player/store';
import { usePlayer, useSceneCtx } from '../player/context';
import type { LessonContentBase, SceneText } from '../types';

/** Content of the current lesson in the current locale */
export function useLessonContent<C extends LessonContentBase>(): C {
  return usePlayer().content as C;
}

/** Text of the current scene */
export function useSceneText<T extends SceneText = SceneText>(): T {
  return useSceneCtx().text as T;
}

/** Current internal step of the scene (0-based) and a setter */
export function useStep(): [number, (n: number) => void] {
  const p = usePlayer();
  return [p.step, p.setStep];
}

/**
 * Persistent per-scene state. Survives navigation and reload (sessionStorage);
 * cleared by "reset scene" (R).
 */
export function useSceneState<T>(name: string, initial: T | (() => T)) {
  const { storeKey } = useSceneCtx();
  const k = `${storeKey}:${name}`;
  const [v, setV] = useState<T>(() => {
    const s = readStore<T>(k);
    if (s !== undefined) return s;
    return typeof initial === 'function' ? (initial as () => T)() : initial;
  });
  useEffect(() => {
    writeStore(k, v);
  }, [k, v]);
  return [v, setV] as const;
}

/** Register a handler for keys 1–9 while the component is mounted */
export function useNumberKeys(handler: (n: number) => void, enabled = true) {
  const { setNumberHandler } = usePlayer();
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    if (!enabled) return;
    const h = (n: number) => ref.current(n);
    setNumberHandler(h);
    return () => setNumberHandler(null);
  }, [enabled, setNumberHandler]);
}

/** Simple interval-driven simulation */
export function useTicker(running: boolean, ms: number, onTick: () => void) {
  const ref = useRef(onTick);
  ref.current = onTick;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => ref.current(), ms);
    return () => window.clearInterval(id);
  }, [running, ms]);
}

export function useToggle(initial = false): [boolean, () => void, (v: boolean) => void] {
  const [v, setV] = useState(initial);
  const toggle = useCallback(() => setV((x) => !x), []);
  return [v, toggle, setV];
}
