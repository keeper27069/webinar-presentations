import { Hotspots, SceneFrame, useLessonContent, useSceneState } from '@engine';
import type { Content } from '../content/schema';
import { Phone, PHONE_SPOTS } from '../art/Phone';

export default function S02() {
  const t = useLessonContent<Content>().scenes.s02;
  const [done, setDone] = useSceneState('done', false);
  return (
    <SceneFrame showTakeaway={done}>
      <Hotspots
        width={368}
        height={560}
        art={<Phone />}
        labels={false}
        onAllVisited={() => setDone(true)}
        spots={t.spots.map((s, i) => ({
          id: `a${i}`,
          x: PHONE_SPOTS[i].x,
          y: PHONE_SPOTS[i].y,
          label: s.label,
          content: <p>{s.text}</p>,
          icon: i + 1,
        }))}
      />
    </SceneFrame>
  );
}
