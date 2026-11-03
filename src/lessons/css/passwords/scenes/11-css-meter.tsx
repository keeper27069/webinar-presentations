import { LiveCode, SceneFrame, useLessonContent, useStep } from '@engine';
import type { Content } from '../content/schema';

export default function S11() {
  const t = useLessonContent<Content>().scenes.s11;
  const [step] = useStep();
  return (
    <SceneFrame variant="code" showTakeaway={step >= 1}>
      <LiveCode
        name="meter"
        task={`🎨 ${t.task}`}
        editorHeight={520}
        files={{ html: t.html, css: t.css[0] }}
        steps={t.steps.map((label, i) => ({ label, files: { html: t.html, css: t.css[i] } }))}
      />
    </SceneFrame>
  );
}
