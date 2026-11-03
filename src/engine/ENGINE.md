# Lesson engine — reference

Source of truth for building lesson scenes. Import everything from `@engine`.
Keep this file updated whenever the engine changes.

## Lesson structure

```
src/lessons/<module>/<slug>/
  index.ts              LessonDefinition: id, scenes [{ key, stage, steps?, Component }], content { ru, uz, en }
  shared.ts             language-independent data (answers, numbers, code helpers)   — optional
  content/schema.ts     interface Content extends LessonContentBase { scenes: { s01: SceneText & {...}, … } }
  content/{ru,uz,en}.ts export default { … } satisfies Content
  scenes/NN-name.tsx    one component per scene
  art/*.tsx             original SVG illustrations
```

Register in `src/lessons/registry.ts` → `READY`: `'css-g09': { load: () => import('./css/passwords'), minutes: 59 }`.

## Stage budget (1920×1080)

- Top bar 96px; scene padding 40px top/bottom, 80px sides → usable width **1760px**.
- Scene header: title (72px/line) + chat chip (2–3 lines ≈ 110–150px) + 28px gap.
- Body height ≈ **730px** with a one-line title, ≈ **650px** with a two-line title.
- The takeaway strip costs ≈ **110px** when shown. Plan the body for the state *with* the takeaway.
- Minimum sizes: text 32px (small 24px), code 26–28px, buttons 48–68px tall.
- Bottom-right 220×100px holds the nav arrows (semi-transparent).

## Scene building blocks

| Component / hook | Use |
|---|---|
| `SceneFrame({ variant?, showTakeaway?, hideChat?, hideTitle?, backdrop? })` | Every scene. Renders title, 💬 chat chip, hint (H), takeaway strip. |
| `Reveal({ at })` | Show children when the scene step ≥ `at` (needs `steps` in the scene definition). |
| `DeepDive({ title, open, onToggle })` | ⭐ layer for older students. |
| `useLessonContent<Content>()` | Current-language content. |
| `useSceneText()` | Current scene's `SceneText`. |
| `useStep()` → `[step, setStep]` | Internal reveal steps (→ advances them before the next scene). |
| `useSceneState(name, initial)` | Persistent per-scene state (survives back/forward and F5; R resets). JSON values only. |
| `useNumberKeys(fn)` | Keys 1–9 while the component is mounted. |
| `useTicker(running, ms, fn)` | Interval helper. |

## Interactions

| Component | Props (short) | Mechanic |
|---|---|---|
| `PollReveal` | `options[{label, detail?}]`, `correct?`, `result?`, `onPick?`, `columns?`, `name?` | Chat votes 1–N, mentor picks → reveal. Max 2 per lesson. |
| `PredictSlider` | `min, max, answer, scale?: 'log', format?, result?` | Chat writes a number, mentor sets it, reveal truth. |
| `ChatBoard` | `seeds?, match?(text) → {tag, badge?}, placeholder?` | Mentor types chat ideas → cards. `tag` → CSS `is-<tag>` (`hit`, `miss`). |
| `DragSort` | `items[{id,label}], zones[{id,label,icon?}], answer{item→zone}, explain?, onChecked?` | Drag or click card → click zone. Stage-scale aware. |
| `Hotspots` | `art, spots[{id,x%,y%,label,content}], width, height, labels?, onAllVisited?` | Clickable illustration; keys 1–9. |
| `useSimulation({ initial, step, done?, interval })` + `SimControls({ sim, speeds? })` | Deterministic step model: play / +1 step / reset / speed. |

## Code

| Component | Props (short) | Mechanic |
|---|---|---|
| `CodeBlock` | `code, lang: 'js'|'css'|'html', activeLine?, highlight?, onLineClick?, lineClass?, lineExtra?, fontSize?` | Highlighted read-only code with an animated active-line marker. |
| `LiveCode` | `files{html?,css?,js?}, steps?[{label, files}], preview?: boolean, task?, editorHeight?` | CodeMirror + sandboxed iframe. HTML/CSS update live; JS on ▶. Loops are guarded (stop after 10,000 iterations). `preview={false}` = console-only. |
| `PredictOutput` | `snippets[{label, code, output[], trace?, explain?}]` | Chat guesses output; mentor runs line by line. |
| `BugHunt` | `snippets[{title, code, bugs[{line, explain, fix?}]}]` | Chat writes the line number; mentor clicks. |
| `ConsoleView` | `lines[], height?` | Console panel for simulations. |

## Finale

| Component | Props | |
|---|---|---|
| `CheatSheet` | `title, items[{icon, text, code?}], columns?` | Screenshot-able summary. |
| `FinalMission` | `items[{id,title,body?,choices[{id,label}],correct,explain}], visual(good,total,checked)` | Decisions → check → consequences; wrong answers can be fixed. |
| `Achievement` | `title, subtitle?, icon, level?` | Badge + confetti. |
| `Bit({ size, mood })` | `'happy'|'thinking'|'surprised'|'worried'|'proud'` | The shared mascot. |

## Rules

- No natural-language strings in scene components — everything comes from `content/*`.
- Fake data only (fictional users, brands, domains). No real API keys, no required network.
- Mark intentionally overflowing containers with `data-allow-overflow` (smoke test skips them).
- Utility classes: `row`, `col`, `fill`, `glass`, `card`, `big-number`, `muted`, `ok`, `bad`, `tag`, `btn btn--accent|ghost|sm|lg`, `seg is-active`.
