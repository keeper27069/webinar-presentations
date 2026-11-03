import type { CSSProperties, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUi } from '@/i18n';
import { usePlayer } from '../player/context';
import { useSceneText } from './hooks';

interface Props {
  children: ReactNode;
  /** lab = dark lab backdrop, code = editor-focused, light = light surface, center = centered hero */
  variant?: 'lab' | 'code' | 'light' | 'center';
  /** Show the takeaway strip (usually after the interaction is done) */
  showTakeaway?: boolean;
  /** Hide the chat chip even if the scene has a chatPrompt */
  hideChat?: boolean;
  hideTitle?: boolean;
  /** Background art layer (absolute, behind content) */
  backdrop?: ReactNode;
  style?: CSSProperties;
}

export function SceneFrame({ children, variant = 'lab', showTakeaway = false, hideChat, hideTitle, backdrop, style }: Props) {
  const text = useSceneText();
  const { hintOpen } = usePlayer();
  const ui = useUi();

  return (
    <section className={`scene scene--${variant}`} style={style}>
      {backdrop && <div className="scene__backdrop">{backdrop}</div>}
      {(!hideTitle || (!hideChat && text.chatPrompt)) && (
        <header className="scene__head">
          {!hideTitle && (
            <motion.h1
              className="scene__title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              {text.title}
            </motion.h1>
          )}
          {!hideChat && text.chatPrompt && <ChatPrompt text={text.chatPrompt} />}
        </header>
      )}
      <div className="scene__body">{children}</div>
      <AnimatePresence>
        {showTakeaway && text.takeaway && (
          <motion.div
            className="scene__takeaway"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 160, damping: 18 }}
          >
            <span className="scene__takeaway-icon">💡</span>
            {text.takeaway}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {hintOpen && text.hint && (
          <motion.aside
            className="scene__hint"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <b>{ui.hint}</b>
            {text.hint}
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}

export function ChatPrompt({ text }: { text: string }) {
  const ui = useUi();
  return (
    <motion.div
      className="chat-prompt"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 140, damping: 16 }}
    >
      <span className="chat-prompt__icon" aria-hidden>
        💬
      </span>
      <span>
        <b>{ui.chatPrefix}</b> {text}
      </span>
    </motion.div>
  );
}

/** Appears when the scene step reaches `at` */
export function Reveal({ at, children, className, y = 24 }: { at: number; children: ReactNode; className?: string; y?: number }) {
  const { step } = usePlayer();
  return (
    <AnimatePresence>
      {step >= at && (
        <motion.div
          className={className}
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: y / 2 }}
          transition={{ type: 'spring', stiffness: 150, damping: 18 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** ⭐ layer for older students (14–17), opened on click */
export function DeepDive({ title, children, open, onToggle }: { title: string; children: ReactNode; open: boolean; onToggle: () => void }) {
  const ui = useUi();
  return (
    <div className={`deep ${open ? 'is-open' : ''}`}>
      <button className="deep__btn" onClick={onToggle}>
        ⭐ {ui.deeper}: {title}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="deep__body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
