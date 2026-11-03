import { LiveCode, SceneFrame, useLessonContent, useStep } from '@engine';
import type { Content } from '../content/schema';

export default function S10() {
  const t = useLessonContent<Content>().scenes.s10;
  const [step] = useStep();
  return (
    <SceneFrame variant="code" showTakeaway={step >= 1}>
      <LiveCode
        name="challenge"
        preview={false}
        task={t.task}
        editorHeight={500}
        files={{ js: t.steps[0].js }}
        steps={t.steps.map((s) => ({ label: s.label, files: { js: s.js } }))}
      />
    </SceneFrame>
  );
}
