import type { ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { DEFAULT_LOCALE } from '@engine/types';
import { LocaleProvider, isLocale } from '@/i18n';
import { Home } from '@/catalog/Home';
import { ModulePage } from '@/catalog/ModulePage';
import { LessonPage } from './LessonPage';

function WithLocale({ children }: { children: ReactNode }) {
  const { lang } = useParams();
  if (!isLocale(lang)) return <Navigate to={`/${DEFAULT_LOCALE}`} replace />;
  return <LocaleProvider locale={lang}>{children}</LocaleProvider>;
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
          <Route path="/:lang" element={<WithLocale><Home /></WithLocale>} />
          <Route path="/:lang/:module" element={<WithLocale><ModulePage /></WithLocale>} />
          <Route path="/:lang/:module/:slug/presenter" element={<WithLocale><LessonPage presenter /></WithLocale>} />
          <Route path="/:lang/:module/:slug/:scene?" element={<WithLocale><LessonPage /></WithLocale>} />
          <Route path="*" element={<Navigate to={`/${DEFAULT_LOCALE}`} replace />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  );
}
