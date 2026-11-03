import { Bit, CheatSheet, SceneFrame, useLessonContent } from '@engine';
import type { Content } from '../content/schema';

const ICONS = ['🔢', '⏳', '🎒', '🛑', '🎯', '0️⃣'];

export default function S11() {
  const t = useLessonContent<Content>().scenes.s11;
  return (
    <SceneFrame>
      <div className="row" style={{ height: '100%', gap: 36, alignItems: 'center' }}>
        <div className="fill">
          <CheatSheet title={t.sheetTitle} items={t.items.map((it, i) => ({ icon: ICONS[i], text: it.text, code: it.code }))} />
        </div>
        <Bit size={240} mood="proud" />
      </div>
    </SceneFrame>
  );
}
