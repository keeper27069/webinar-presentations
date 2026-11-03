import { AnimatePresence, motion } from 'framer-motion';
import { SceneFrame, useLessonContent, useSceneState } from '@engine';
import type { Content } from '../content/schema';
import { USERS, sha256 } from '../shared';

/** Tiny excerpt of an attacker's precomputed table */
const TABLE: Record<string, string> = { [sha256('123456')]: '123456', [sha256('password')]: 'password', [sha256('qwerty')]: 'qwerty' };

export default function S09() {
  const t = useLessonContent<Content>().scenes.s09;
  const [salted, setSalted] = useSceneState<boolean>('salted', false);
  const rows = USERS.map((u) => {
    const h = sha256(salted ? u.salt + u.password : u.password);
    return { ...u, h, found: TABLE[h] };
  });
  const dupes = new Set(rows.filter((r, i) => rows.findIndex((x) => x.h === r.h) !== i).map((r) => r.h));

  return (
    <SceneFrame showTakeaway={salted}>
      <div className="row" style={{ height: '100%', gap: 40 }}>
        <div className="col fill" style={{ gap: 16 }}>
          {rows.map((r) => (
            <motion.div
              key={r.name}
              layout
              className="glass row"
              style={{ alignItems: 'center', gap: 22, padding: '18px 26px', borderColor: dupes.has(r.h) ? 'var(--error)' : r.found ? 'var(--warn)' : 'var(--line)' }}
            >
              <b style={{ width: 130, fontSize: 30 }}>{r.name}</b>
              <AnimatePresence>
                {salted && (
                  <motion.span className="tag" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0 }} style={{ fontFamily: 'var(--font-code)', background: 'rgba(255,209,102,.25)', color: 'var(--warn)' }}>
                    🧂 {t.saltLabel}: {r.salt}
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.span key={r.h} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: 'var(--font-code)', fontSize: 26, color: 'var(--cyan)' }} className="fill">
                {r.h.slice(0, 22)}…
              </motion.span>
              <span style={{ fontSize: 22, fontWeight: 800, color: r.found ? 'var(--warn)' : 'var(--muted)', width: 230, textAlign: 'right' }}>
                {r.found ? `🔓 ${t.tableFound}` : t.tableMiss}
              </span>
            </motion.div>
          ))}
          <AnimatePresence>
            {dupes.size > 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ color: 'var(--error)', fontWeight: 800, fontSize: 30 }}>
                ⚠ {t.sameWarn}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="col" style={{ width: 520, gap: 24 }}>
          <div className="card col" style={{ gap: 12 }}>
            <b style={{ fontSize: 28 }}>📕 {t.table}</b>
            {Object.entries(TABLE).map(([h, p]) => (
              <div key={h} style={{ fontFamily: 'var(--font-code)', fontSize: 22 }}>
                {h.slice(0, 14)}… = <b>{p}</b>
              </div>
            ))}
            <div style={{ fontFamily: 'var(--font-code)', fontSize: 22, color: 'var(--ink-muted)' }}>… × 1 000 000 000</div>
          </div>
          <button className="btn btn--accent btn--lg" onClick={() => setSalted(!salted)}>
            🧂 {salted ? t.removeSalt : t.addSalt}
          </button>
        </div>
      </div>
    </SceneFrame>
  );
}
