import { useEffect, useRef, useState } from 'react';
import type { LessonDefinition, LessonMeta, Locale } from '../types';
import { uiFor } from '@/i18n';
import { openChannel } from './sync';
import { NotesBody } from './NotesBody';

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Second window for the mentor: notes, timers, next scene. Not shared on stream. */
export function PresenterView({ lesson, locale }: { lesson: LessonDefinition; meta: LessonMeta; locale: Locale }) {
  const ui = uiFor(locale);
  const content = lesson.content[locale];
  const [scene, setScene] = useState(0);
  const [step, setStep] = useState(0);
  const [connected, setConnected] = useState(false);
  const [now, setNow] = useState(Date.now());
  const sceneStart = useRef(Date.now());
  const lessonStart = useRef(Date.now());
  const chan = useRef<ReturnType<typeof openChannel> | null>(null);

  useEffect(() => {
    const c = openChannel(lesson.id, (m) => {
      if (m.t === 'state') {
        setConnected(true);
        setScene((prev) => {
          if (prev !== m.scene) sceneStart.current = Date.now();
          return m.scene;
        });
        setStep(m.step);
      }
    });
    chan.current = c;
    c.post({ t: 'hello' });
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      c.close();
      window.clearInterval(id);
    };
  }, [lesson.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        chan.current?.post({ t: 'cmd', cmd: 'next' });
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        chan.current?.post({ t: 'cmd', cmd: 'prev' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const sc = lesson.scenes[scene];
  const text = content.scenes[sc.key];
  const nextSc = lesson.scenes[scene + 1];
  const sceneSec = Math.floor((now - sceneStart.current) / 1000);
  const totalSec = Math.floor((now - lessonStart.current) / 1000);
  const planned = text.notes.minutes * 60;
  const plannedTotal = lesson.scenes.reduce((a, s) => a + (content.scenes[s.key]?.notes.minutes ?? 0), 0);
  const over = sceneSec > planned;

  return (
    <div className="presenter">
      <header className="presenter__head">
        <div>
          <div className="presenter__eyebrow">{ui.presenterTitle} · {content.title}</div>
          <h1>
            {scene + 1}/{lesson.scenes.length} — {text.title}
          </h1>
          <div className="presenter__stage">
            {content.route[sc.stage]} · {ui.step} {step + 1}/{sc.steps ?? 1}
            {!connected && <span className="presenter__offline"> · ⚠ {ui.presenterOffline}</span>}
          </div>
        </div>
        <div className="presenter__timers">
          <div className={`presenter__timer ${over ? 'is-over' : ''}`}>
            <span>{ui.sceneTimer}</span>
            <b>{fmt(sceneSec)}</b>
            <small>
              {ui.planned} {text.notes.minutes}:00
            </small>
          </div>
          <div className="presenter__timer">
            <span>{ui.totalTimer}</span>
            <b>{fmt(totalSec)}</b>
            <small>
              {ui.planned} {plannedTotal}:00
            </small>
          </div>
        </div>
      </header>
      <main className="presenter__main">
        <section className="presenter__notes">
          {text.chatPrompt && (
            <p className="presenter__chat">
              💬 {ui.chatPrefix} {text.chatPrompt}
            </p>
          )}
          <NotesBody notes={text.notes} />
        </section>
        <aside className="presenter__side">
          <div className="presenter__controls">
            <button onClick={() => chan.current?.post({ t: 'cmd', cmd: 'prev' })}>← {ui.prev}</button>
            <button className="is-primary" onClick={() => chan.current?.post({ t: 'cmd', cmd: 'next' })}>
              {ui.next} →
            </button>
          </div>
          {nextSc && (
            <div className="presenter__next">
              <span>{ui.nextScene}</span>
              <b>{content.scenes[nextSc.key]?.title}</b>
            </div>
          )}
          <ol className="presenter__list">
            {lesson.scenes.map((s, i) => (
              <li key={s.key} className={i === scene ? 'is-current' : ''}>
                <button onClick={() => chan.current?.post({ t: 'goto', scene: i })}>
                  {i + 1}. {content.scenes[s.key]?.title} <small>{content.scenes[s.key]?.notes.minutes}′</small>
                </button>
              </li>
            ))}
          </ol>
        </aside>
      </main>
    </div>
  );
}
