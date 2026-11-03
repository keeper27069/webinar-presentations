import { PredictOutput, SceneFrame, useLessonContent } from '@engine';
import type { Content } from '../content/schema';

const SNIPPETS = [
  { code: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}', output: ['1', '2', '3', '4', '5'] },
  { code: 'for (let i = 0; i < 10; i += 2) {\n  console.log(i);\n}', output: ['0', '2', '4', '6', '8'] },
  { code: 'for (let i = 10; i > 0; i -= 3) {\n  console.log(i);\n}', output: ['10', '7', '4', '1'] },
];

export default function S03() {
  const t = useLessonContent<Content>().scenes.s03;
  return (
    <SceneFrame showTakeaway>
      <PredictOutput
        snippets={SNIPPETS.map((s, i) => ({
          ...s,
          label: t.labels[i],
          trace: s.output.map(() => 2),
          explain: t.explain[i],
        }))}
      />
    </SceneFrame>
  );
}
