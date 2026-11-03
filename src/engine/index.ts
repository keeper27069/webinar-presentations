// Public API of the lesson engine. See ENGINE.md for usage.
export * from './types';
export { LessonPlayer } from './player/LessonPlayer';
export { PresenterView } from './player/PresenterView';
export { Stage, STAGE_W, STAGE_H } from './player/Stage';
export { usePlayer, useSceneCtx, useStageScale } from './player/context';

export { SceneFrame, ChatPrompt, Reveal, DeepDive } from './scene/SceneFrame';
export { useLessonContent, useSceneText, useStep, useSceneState, useNumberKeys, useTicker, useToggle } from './scene/hooks';

export { PollReveal, type PollOption } from './interactions/PollReveal';
export { PredictSlider } from './interactions/PredictSlider';
export { ChatBoard, type BoardCard } from './interactions/ChatBoard';
export { DragSort, type SortItem, type SortZone } from './interactions/DragSort';
export { Hotspots, type Hotspot } from './interactions/Hotspots';
export { useSimulation, SimControls, type Sim } from './interactions/Simulation';

export { CodeBlock } from './code/CodeBlock';
export { ConsoleView } from './code/ConsoleView';
export { LiveCode, guardLoops, type CodeFiles, type CodeStep } from './code/LiveCode';
export { BugHunt, type BugSnippet } from './code/BugHunt';
export { PredictOutput, type OutputSnippet } from './code/PredictOutput';
export { highlightLine, type CodeLang } from './code/highlight';

export { FinalMission, type MissionItem } from './finale/FinalMission';
export { CheatSheet, type CheatItem } from './finale/CheatSheet';
export { Achievement } from './finale/Achievement';
export { Confetti } from './feedback/Confetti';
export { Bit, type BitMood } from './art/Bit';
