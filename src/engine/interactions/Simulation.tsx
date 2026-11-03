import { useCallback, useState } from 'react';
import { useUi } from '@/i18n';
import { useTicker } from '../scene/hooks';

/**
 * Deterministic step simulation: `step(state)` returns the next state,
 * `done(state)` stops playback. Scenes render `state` however they like.
 */
export function useSimulation<S>({ initial, step, done, interval = 600 }: { initial: () => S; step: (s: S) => S; done?: (s: S) => boolean; interval?: number }) {
  const [state, setState] = useState<S>(initial);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const finished = done?.(state) ?? false;

  const doStep = useCallback(() => {
    setState((s) => (done?.(s) ? s : step(s)));
  }, [step, done]);

  useTicker(playing && !finished, interval / speed, doStep);

  return {
    state,
    setState,
    playing,
    finished,
    speed,
    setSpeed,
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
    toggle: () => setPlaying((p) => !p),
    stepOnce: doStep,
    reset: () => {
      setPlaying(false);
      setState(initial());
    },
  };
}

export type Sim = ReturnType<typeof useSimulation<any>>;

export function SimControls({ sim, speeds = [1, 4, 20] }: { sim: Sim; speeds?: number[] }) {
  const ui = useUi();
  return (
    <div className="sim-controls">
      <button className="btn btn--accent" onClick={sim.toggle} disabled={sim.finished}>
        {sim.playing ? `❚❚ ${ui.pause}` : `▶ ${ui.play}`}
      </button>
      <button className="btn btn--ghost" onClick={sim.stepOnce} disabled={sim.finished || sim.playing}>
        +1 {ui.step}
      </button>
      <button className="btn btn--ghost" onClick={sim.reset}>
        ↺ {ui.reset}
      </button>
      {speeds.length > 1 && (
        <div className="sim-controls__speed">
          {speeds.map((s) => (
            <button key={s} className={`seg ${sim.speed === s ? 'is-active' : ''}`} onClick={() => sim.setSpeed(s)}>
              ×{s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
