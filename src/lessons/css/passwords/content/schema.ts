import type { LessonContentBase, SceneText } from '@engine/types';
import type { TimeUnits } from '../shared';

export interface Content extends LessonContentBase {
  units: TimeUnits;
  locale: string;
  scenes: {
    s01: SceneText & { start: string; options: string[]; reveal: string };
    s02: SceneText & { spots: { label: string; text: string }[] };
    s03: SceneText & { warning: string; inList: string; notInList: string };
    s04: SceneText & { digitsLabel: string; tries: string; found: string; combos: string; human: string; computer: string };
    s05: SceneText & {
      lengthLabel: string;
      sets: { lower: string; upper: string; digits: string; symbols: string };
      alphabet: string;
      combos: string;
      time: string;
      example: string;
      speedNote: string;
    };
    s06: SceneText & { round: string; rounds: { why: string; aNote: string; bNote: string }[]; crackTime: string };
    s07: SceneText & { zonePattern: string; zoneBrute: string; explain: Record<string, string> };
    s08: SceneText & {
      plainTitle: string;
      hashTitle: string;
      leakBtn: string;
      leaked: string;
      storeHashes: string;
      storePlain: string;
      machine: string;
      input: string;
      output: string;
      oneWay: string;
      colUser: string;
      colStored: string;
    };
    s09: SceneText & { table: string; tableFound: string; tableMiss: string; addSalt: string; removeSalt: string; sameWarn: string; saltLabel: string };
    s10: SceneText & { password: string; fast: string; slow: string; perSec: string; costLabel: string; deepTitle: string; deepText: string; userWait: string };
    s11: SceneText & { task: string; steps: string[]; html: string; css: string[] };
    s12: SceneText & { sites: string[]; leakBtn: string; samePw: string; diffPw: string; twoFa: string; hacked: string; safe: string; codeAsk: string };
    s13: SceneText & { sheetTitle: string; items: string[] };
    s14: SceneText & { items: { title: string; body: string; choices: string[]; correct: number; explain: string }[]; shield: string };
    s15: SceneText & { answer: string; badge: string; badgeSub: string; homeworkTitle: string; homework: string[]; again: string; sheet: string };
  };
}
