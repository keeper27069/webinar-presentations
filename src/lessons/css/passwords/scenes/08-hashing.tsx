import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneFrame, useLessonContent, useSceneState } from '@engine';
import type { Content } from '../content/schema';
import { USERS, sha256 } from '../shared';

export default function S08() {
  const t = useLessonContent<Content>().scenes.s08;
  const [mode, setMode] = useSceneState<'plain' | 'hash'>('mode', 'plain');
  const [leaked, setLeaked] = useSceneState<boolean>('leaked', false);
  const [word, setWord] = useSceneState<string>('word', 'salom');
  const hash = useMemo(() => sha256(word), [word]);
  const short = (h: string) => `${h.slice(0, 14)}…`;

  return (
    <SceneFrame showTakeaway={leaked && mode === 'hash'}>
      <div className="row" style={{ height: '100%', gap: 40 }}>
        <div className="col" style={{ width: 860, gap: 18 }}>
          <div className="row" style={{ gap: 12, alignItems: 'center' }}>
            <h2 style={{ fontSize: 36 }}>🗄 {t.plainTitle}</h2>
            <span className="fill" />
            <button className={`seg ${mode === 'plain' ? 'is-active' : ''}`} onClick={() => { setMode('plain'); setLeaked(false); }}>
              {t.storePlain}
            </button>
            <button className={`seg ${mode === 'hash' ? 'is-active' : ''}`} onClick={() => { setMode('hash'); setLeaked(false); }}>
              {t.storeHashes}
            </button>
          </div>
          <motion.div className="card" style={{ padding: 0, overflow: 'hidden' }} animate={leaked ? { boxShadow: '0 0 0 6px #ff6b6b' } : { boxShadow: '0 0 0 0px #ff6b6b' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 28 }}>
              <thead>
                <tr style={{ background: 'var(--surface-2)', textAlign: 'left' }}>
                  <th style={{ padding: '14px 22px' }}>{t.colUser}</th>
                  <th style={{ padding: '14px 22px' }}>{t.colStored}</th>
                </tr>
              </thead>
              <tbody>
                {USERS.map((u) => (
                  <tr key={u.name} style={{ borderTop: '1px solid #dfe3ff' }}>
                    <td style={{ padding: '14px 22px', fontWeight: 800 }}>{u.name}</td>
                    <td style={{ padding: '14px 22px', fontFamily: 'var(--font-code)', fontSize: 25 }}>
                      <AnimatePresence mode="wait">
                        <motion.span key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ color: mode === 'plain' ? '#c4302b' : '#4a5288' }}>
                          {mode === 'plain' ? u.password : short(sha256(u.password))}
                        </motion.span>
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
          <div className="row" style={{ gap: 16, alignItems: 'center' }}>
            <button className="btn btn--accent" onClick={() => setLeaked(true)}>
              🦹 {t.leakBtn}
            </button>
            <AnimatePresence>
              {leaked && (
                <motion.b initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ fontSize: 30, color: mode === 'plain' ? 'var(--error)' : 'var(--ok)' }}>
                  {mode === 'plain' ? `😱 ${t.leaked}` : `🧩 ${short(sha256(USERS[0].password))} = ?`}
                </motion.b>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="fill col" style={{ gap: 18 }}>
          <h2 style={{ fontSize: 36 }}>⚙️ {t.hashTitle}</h2>
          <div className="glass col" style={{ gap: 16 }}>
            <label className="muted">{t.input}</label>
            <input
              value={word}
              onChange={(e) => setWord(e.target.value.slice(0, 24))}
              style={{ height: 76, padding: '0 22px', fontSize: 40, fontFamily: 'var(--font-code)', borderRadius: 18, border: 0, color: 'var(--ink)' }}
              aria-label={t.input}
            />
            <div className="row" style={{ alignItems: 'center', gap: 12 }}>
              <motion.span style={{ fontSize: 40, display: 'inline-block' }} animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} key={word}>
                ⚙️
              </motion.span>
              <span className="tag">{t.machine}</span>
              <label className="muted">{t.output}</label>
            </div>
            <div style={{ fontFamily: 'var(--font-code)', fontSize: 24, lineHeight: 1.4, wordBreak: 'break-all', color: 'var(--cyan)' }}>
              {hash.match(/.{1,16}/g)!.map((chunk, i) => (
                <motion.span key={`${word}-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }} style={{ display: 'inline-block', marginRight: 10 }}>
                  {chunk}
                </motion.span>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 24 }}>🥩➡️🍝 {t.oneWay}</p>
        </div>
      </div>
    </SceneFrame>
  );
}
