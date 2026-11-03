import { useUi } from '@/i18n';
import { usePlayer } from './context';
import { NotesBody } from './NotesBody';

/** Single-screen fallback (N). The presenter window (P) is preferred because this is visible on stream. */
export function NotesOverlay({ onClose }: { onClose: () => void }) {
  const p = usePlayer();
  const ui = useUi();
  const sc = p.lesson.scenes[p.sceneIndex];
  const text = p.content.scenes[sc.key];
  return (
    <aside className="notes-overlay">
      <div className="notes-overlay__warn">
        ⚠ {ui.notesWarning}
        <button onClick={onClose}>×</button>
      </div>
      <NotesBody notes={text.notes} />
    </aside>
  );
}
