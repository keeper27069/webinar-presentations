import type { LessonDefinition } from '@engine/types';
import type { Content } from './content/schema';
import ru from './content/ru';
import uz from './content/uz';
import en from './content/en';
import S01 from './scenes/01-intro';
import S02 from './scenes/02-accounts';
import S03 from './scenes/03-popular';
import S04 from './scenes/04-bruteforce';
import S05 from './scenes/05-lab';
import S06 from './scenes/06-battle';
import S07 from './scenes/07-patterns';
import S08 from './scenes/08-hashing';
import S09 from './scenes/09-salt';
import S10 from './scenes/10-slow-hash';
import S11 from './scenes/11-css-meter';
import S12 from './scenes/12-domino';
import S13 from './scenes/13-cheatsheet';
import S14 from './scenes/14-mission';
import S15 from './scenes/15-finale';

const lesson: LessonDefinition<Content> = {
  id: 'css-g09',
  content: { ru, uz, en },
  scenes: [
    { key: 's01', stage: 0, steps: 2, Component: S01 },
    { key: 's02', stage: 0, Component: S02 },
    { key: 's03', stage: 0, steps: 2, Component: S03 },
    { key: 's04', stage: 0, Component: S04 },
    { key: 's05', stage: 1, Component: S05 },
    { key: 's06', stage: 1, Component: S06 },
    { key: 's07', stage: 2, Component: S07 },
    { key: 's08', stage: 3, Component: S08 },
    { key: 's09', stage: 3, Component: S09 },
    { key: 's10', stage: 3, Component: S10 },
    { key: 's11', stage: 4, steps: 2, Component: S11 },
    { key: 's12', stage: 4, Component: S12 },
    { key: 's13', stage: 4, Component: S13 },
    { key: 's14', stage: 5, Component: S14 },
    { key: 's15', stage: 5, Component: S15 },
  ],
};

export default lesson;
