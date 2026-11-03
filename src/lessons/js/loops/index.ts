import type { LessonDefinition } from '@engine/types';
import type { Content } from './content/schema';
import ru from './content/ru';
import uz from './content/uz';
import en from './content/en';
import S01 from './scenes/01-problem';
import S02 from './scenes/02-anatomy';
import S03 from './scenes/03-predict';
import S04 from './scenes/04-live';
import S05 from './scenes/05-clap';
import S06 from './scenes/06-while';
import S07 from './scenes/07-for-of';
import S08 from './scenes/08-bughunt';
import S09 from './scenes/09-choose';
import S10 from './scenes/10-challenge';
import S11 from './scenes/11-cheatsheet';
import S12 from './scenes/12-finale';

const lesson: LessonDefinition<Content> = {
  id: 'js-t03',
  content: { ru, uz, en },
  scenes: [
    { key: 's01', stage: 0, steps: 2, Component: S01 },
    { key: 's02', stage: 1, Component: S02 },
    { key: 's03', stage: 1, Component: S03 },
    { key: 's04', stage: 2, steps: 2, Component: S04 },
    { key: 's05', stage: 2, Component: S05 },
    { key: 's06', stage: 2, Component: S06 },
    { key: 's07', stage: 2, Component: S07 },
    { key: 's08', stage: 3, steps: 2, Component: S08 },
    { key: 's09', stage: 4, Component: S09 },
    { key: 's10', stage: 4, steps: 2, Component: S10 },
    { key: 's11', stage: 5, Component: S11 },
    { key: 's12', stage: 5, Component: S12 },
  ],
};

export default lesson;
