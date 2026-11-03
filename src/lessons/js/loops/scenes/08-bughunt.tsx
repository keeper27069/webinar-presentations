import { BugHunt, SceneFrame, useLessonContent, useStep } from '@engine';
import type { Content } from '../content/schema';

export default function S08() {
  const t = useLessonContent<Content>().scenes.s08;
  const [step] = useStep();
  return (
    <SceneFrame variant="code" showTakeaway={step >= 1}>
      <BugHunt snippets={t.snippets.map((s) => ({ title: s.title, code: s.code, bugs: [{ line: s.line, explain: s.explain, fix: s.fix }] }))} />
    </SceneFrame>
  );
}
