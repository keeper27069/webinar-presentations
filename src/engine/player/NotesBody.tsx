import { useUi } from '@/i18n';
import type { SceneNotes } from '../types';

export function NotesBody({ notes }: { notes: SceneNotes }) {
  const ui = useUi();
  return (
    <div className="notes-body">
      {notes.switchTo && (
        <p className="notes-body__switch">
          ⇄ {ui.switchToLabel}: <b>{notes.switchTo}</b>
        </p>
      )}
      <h4>{ui.sayLabel}</h4>
      <ul>
        {notes.say.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      {notes.askChat && (
        <>
          <h4>💬 {ui.askChatLabel}</h4>
          <p className="notes-body__ask">{notes.askChat}</p>
        </>
      )}
      {notes.expectChat && notes.expectChat.length > 0 && (
        <>
          <h4>{ui.expectLabel}</h4>
          <ul>
            {notes.expectChat.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      )}
      {notes.answer && (
        <>
          <h4>✓ {ui.answerLabel}</h4>
          <p>{notes.answer}</p>
        </>
      )}
    </div>
  );
}
