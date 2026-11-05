import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bit } from '@engine/art/Bit';
import { useLocale, useUi } from '@/i18n';
import { LESSONS, MODULES, lessonsOf } from '@/lessons/registry';
import { Header } from './Header';
import { LessonCard } from './LessonCard';

const MODULE_GLYPH: Record<string, string> = { html: '</>', css: '{ }', bootstrap: 'B', 'tilda-git': '⎇', js: 'JS', react: '⚛' };

export function Home() {
  const ui = useUi();
  const locale = useLocale();
  const [q, setQ] = useState('');
  const found = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return null;
    return LESSONS.filter((l) => [l.title.ru, l.title.uz, l.title.en, l.summary[locale]].some((t) => t.toLowerCase().includes(s)));
  }, [q, locale]);

  return (
    <div className="catalog">
      <Header />
      <section className="hero">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {ui.homeTitle}
          </motion.h1>
          <p>{ui.homeLead}</p>
          <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={ui.search} aria-label={ui.search} />
          <p className="hero__count">{ui.readyOf(LESSONS.filter((l) => l.status === 'ready').length, LESSONS.length)}</p>
        </div>
        <div className="hero__bit">
          <Bit size={280} mood="happy" />
        </div>
      </section>

      {found ? (
        <section className="grid">
          {found.length === 0 && <p className="muted">{ui.searchEmpty}</p>}
          {found.map((l) => (
            <LessonCard key={l.id} l={l} showModule />
          ))}
        </section>
      ) : (
        <section className="modules">
          {MODULES.map((m, i) => {
            const all = lessonsOf(m);
            const ready = all.filter((l) => l.status === 'ready').length;
            return (
              <motion.div key={m} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                <Link to={`/${locale}/${m}`} className="mcard" data-module={m}>
                  <span className="mcard__glyph">{MODULE_GLYPH[m]}</span>
                  <h2>{ui.modules[m]}</h2>
                  <p>
                    {lessonsOf(m, 'general').length} · {ui.general.toLowerCase()} &nbsp;|&nbsp; {lessonsOf(m, 'technical').length} · {ui.technical.toLowerCase()}
                  </p>
                  <div className="mcard__bar">
                    <span style={{ width: `${(ready / all.length) * 100}%` }} />
                  </div>
                  <small>{ui.readyOf(ready, all.length)}</small>
                </Link>
              </motion.div>
            );
          })}
        </section>
      )}
      <p className="home__credits">
        Emoji: <a href="https://github.com/jdecked/twemoji" target="_blank" rel="noreferrer">Twemoji</a> ·{' '}
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC-BY 4.0</a>
      </p>
    </div>
  );
}
