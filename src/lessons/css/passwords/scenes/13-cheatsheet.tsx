import { Bit, CheatSheet, SceneFrame, useLessonContent } from '@engine';
import type { Content } from '../content/schema';

const ICONS = ['📏', '🚫', '🔀', '✉️', '📱', '🗝', '🤐'];

export default function S13() {
  const t = useLessonContent<Content>().scenes.s13;
  return (
    <SceneFrame>
      <div className="row" style={{ height: '100%', gap: 36, alignItems: 'center' }}>
        <div className="fill">
          <CheatSheet title={t.sheetTitle} items={t.items.map((text, i) => ({ icon: ICONS[i], text }))} />
        </div>
        <Bit size={260} mood="proud" />
      </div>
    </SceneFrame>
  );
}
