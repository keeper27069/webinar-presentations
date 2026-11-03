import { DragSort, SceneFrame, useLessonContent, useSceneState } from '@engine';
import type { Content } from '../content/schema';

export default function S09() {
  const t = useLessonContent<Content>().scenes.s09;
  const [checked, setChecked] = useSceneState('checked', false);
  const code = (s: string) => <code style={{ fontFamily: 'var(--font-code)', fontSize: 34 }}>{s}</code>;
  return (
    <SceneFrame showTakeaway={checked}>
      <DragSort
        items={t.items.map((it, i) => ({ id: `t${i}`, label: it.text }))}
        zones={[
          { id: 'for', label: code('for') },
          { id: 'while', label: code('while') },
          { id: 'forof', label: code('for...of') },
        ]}
        answer={Object.fromEntries(t.items.map((it, i) => [`t${i}`, it.zone]))}
        explain={Object.fromEntries(t.explain.map((e, i) => [`t${i}`, e]))}
        onChecked={() => setChecked(true)}
      />
    </SceneFrame>
  );
}
