import { DragSort, SceneFrame, useLessonContent, useSceneState } from '@engine';
import type { Content } from '../content/schema';

const ITEMS = [
  { id: 'p1', pw: 'Zafar2010', zone: 'pattern' },
  { id: 'p2', pw: 'P@ssw0rd', zone: 'pattern' },
  { id: 'p3', pw: 'qwerty123', zone: 'pattern' },
  { id: 'p4', pw: 'iloveyou!', zone: 'pattern' },
  { id: 'p5', pw: 'Toshkent2024', zone: 'pattern' },
  { id: 'p6', pw: 'olma-bulut-poyezd-kitob-tun', zone: 'brute' },
  { id: 'p7', pw: 'gT7#mQ!29zLp', zone: 'brute' },
  { id: 'p8', pw: '22.05.2012', zone: 'pattern' },
];

export default function S07() {
  const t = useLessonContent<Content>().scenes.s07;
  const [checked, setChecked] = useSceneState('checked', false);
  return (
    <SceneFrame showTakeaway={checked}>
      <DragSort
        items={ITEMS.map((i) => ({ id: i.id, label: <span style={{ fontFamily: 'var(--font-code)' }}>{i.pw}</span> }))}
        zones={[
          { id: 'pattern', label: t.zonePattern, icon: <span style={{ fontSize: 40 }}>📖</span> },
          { id: 'brute', label: t.zoneBrute, icon: <span style={{ fontSize: 40 }}>⏳</span> },
        ]}
        answer={Object.fromEntries(ITEMS.map((i) => [i.id, i.zone]))}
        explain={t.explain}
        onChecked={() => setChecked(true)}
      />
    </SceneFrame>
  );
}
