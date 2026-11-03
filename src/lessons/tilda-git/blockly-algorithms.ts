import { kit } from '@engine/kit';

/** Code where each line is "ru ¦ uz ¦ en" → one whole block per language */
const blk = (s: string) =>
  [0, 1, 2]
    .map((i) =>
      s
        .split('\n')
        .map((line) => {
          const p = line.split('¦');
          return p.length < 3 ? line : (line.match(/^\s*/)?.[0] ?? '') + (p[i] ?? '').trim();
        })
        .join('\n'),
    )
    .join('\n¦\n');

const LONG = blk(`шаг вперёд ¦ oldinga qadam ¦ move forward
шаг вперёд ¦ oldinga qadam ¦ move forward
шаг вперёд ¦ oldinga qadam ¦ move forward
шаг вперёд ¦ oldinga qadam ¦ move forward
повернуть направо ¦ oʻngga burilish ¦ turn right
шаг вперёд ¦ oldinga qadam ¦ move forward
шаг вперёд ¦ oldinga qadam ¦ move forward
шаг вперёд ¦ oldinga qadam ¦ move forward
шаг вперёд ¦ oldinga qadam ¦ move forward`);

export default kit({
  id: 'tilda-git-t03',
  title: "Алгоритмы и оптимизация (Blockly) ¦ Algoritmlar va optimallashtirish (Blockly) ¦ Algorithms and optimisation (Blockly)",
  question: "Как одну и ту же задачу решить короче и проще? ¦ Bitta vazifani qanday qilib qisqaroq va soddaroq hal qilish mumkin? ¦ How do you solve the same task in a shorter, simpler way?",
  route: ["Что такое алгоритм ¦ Algoritm nima ¦ What an algorithm is", "Длинная программа ¦ Uzun dastur ¦ A long program", "Повтор ¦ Takrorlash ¦ Repeat", "Оптимизация ¦ Optimallashtirish ¦ Optimisation", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🤖',
      kicker: "Tilda · Git · техническая тема 3 ¦ Tilda · Git · texnik mavzu 3 ¦ Tilda · Git · technical topic 3",
      title: "Робот, который понимает только команды ¦ Faqat buyruqlarni tushunadigan robot ¦ A robot that only understands commands",
      chat: "как объяснить роботу дорогу до двери? ¦ robotga eshikkacha yo'lni qanday tushuntirish mumkin? ¦ how would you explain the way to the door to a robot?",
      lead: "Компьютер не догадывается — он выполняет команды по порядку. Набор таких команд для решения задачи и есть алгоритм. ¦ Kompyuter taxmin qilmaydi — u buyruqlarni tartib bilan bajaradi. Vazifani hal qilish uchun shunday buyruqlar to'plami — algoritmdir. ¦ A computer doesn't guess; it runs commands in order. A set of commands that solves a task is an algorithm.",
      facts: [
        "Чёткие шаги ¦ Aniq qadamlar ¦ Clear steps",
        "Строгий порядок ¦ Qat'iy tartib ¦ A strict order",
        "Понятный результат ¦ Tushunarli natija ¦ A clear result",
      ],
      takeaway: "Сегодня научимся писать алгоритмы в блоках и делать их короче. ¦ Bugun bloklarda algoritm yozishni va ularni qisqartirishni o'rganamiz. ¦ Today we'll write algorithms in blocks and make them shorter.",
      notes: { say: ["Блоки здесь показаны текстом. Для живой сборки откройте Blockly-игру (например, Blockly Games «Maze») — заметки скажут, когда."], min: 3 },
    },
    {
      type: 'flow',
      stage: 0,
      title: "Алгоритм из жизни: утро ¦ Hayotdan algoritm: tong ¦ A real-life algorithm: the morning",
      chat: "какой шаг поставили бы первым? ¦ birinchi qaysi qadamni qo'yardingiz? ¦ which step would you put first?",
      nodes: [
        { icon: '⏰', label: "Будильник ¦ Budilnik ¦ Alarm", text: "Проснуться в 7:00. ¦ Soat 7:00 da uyg'onish. ¦ Wake up at 7:00." },
        { icon: '🪥', label: "Умыться ¦ Yuvinish ¦ Wash up", text: "Зубы, лицо. ¦ Tish, yuz. ¦ Teeth, face." },
        { icon: '🍳', label: "Завтрак ¦ Nonushta ¦ Breakfast", text: "Если есть время — яичница, иначе — бутерброд. ¦ Vaqt bo'lsa — quymoq, aks holda — buterbrod. ¦ If there's time, eggs; otherwise a sandwich." },
        { icon: '🎒', label: "Рюкзак ¦ Ryukzak ¦ Backpack", text: "Проверить: тетради, ручка, телефон. ¦ Tekshirish: daftarlar, ruchka, telefon. ¦ Check: notebooks, pen, phone." },
        { icon: '🚪', label: "Выйти ¦ Chiqish ¦ Leave", text: "Закрыть дверь. Готово! ¦ Eshikni yopish. Tayyor! ¦ Lock the door. Done!" },
      ],
      takeaway: "Даже в утреннем алгоритме есть условие («если есть время») и повтор (проверить три вещи). ¦ Tonggi algoritmda ham shart («vaqt bo'lsa») va takrorlash (uch narsani tekshirish) bor. ¦ Even the morning has a condition (“if there's time”) and a repeat (check three things).",
      notes: { say: ["Спросите чат: что сломается, если поменять шаги местами?"], min: 3 },
    },
    {
      type: 'walk',
      stage: 1,
      title: "Ведём робота к звезде ¦ Robotni yulduzgacha olib boramiz ¦ Guiding the robot to the star",
      chat: "сколько блоков в этой программе? ¦ bu dasturda nechta blok bor? ¦ how many blocks are in this program?",
      code: LONG,
      lang: 'text',
      marks: [
        { line: 1, text: "Четыре одинаковых блока подряд — робот идёт 4 клетки вперёд. ¦ Ketma-ket to'rtta bir xil blok — robot 4 katak oldinga yuradi. ¦ Four identical blocks in a row: the robot walks 4 cells." },
        { line: 5, text: "Поворот. ¦ Burilish. ¦ A turn." },
        { line: 6, text: "И снова четыре одинаковых блока. Всего 9 блоков. ¦ Va yana to'rtta bir xil blok. Jami 9 ta blok. ¦ And four identical blocks again. 9 blocks in total." },
      ],
      takeaway: "Программа работает, но она длинная и однообразная. Если путь будет 100 клеток — 100 блоков? ¦ Dastur ishlaydi, lekin u uzun va bir xil. Yo'l 100 katak bo'lsa — 100 ta blokmi? ¦ It works, but it's long and repetitive. A 100-cell path — 100 blocks?",
      notes: { say: ["Соберите эту программу в Blockly-лабиринте, если удобно."], switch: "Blockly ¦ Blockly ¦ Blockly", min: 4 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Блок «повторить» ¦ «Takrorlash» bloki ¦ The “repeat” block",
      chat: "сколько блоков стало справа? ¦ o'ngda nechta blok qoldi? ¦ how many blocks are on the right now?",
      left: { icon: '🐢', label: "9 блоков ¦ 9 ta blok ¦ 9 blocks", code: LONG, lang: 'text' },
      right: { icon: '⚡', label: "4 блока ¦ 4 ta blok ¦ 4 blocks", code: blk(`повторить 4 раза: ¦ 4 marta takrorla: ¦ repeat 4 times:\n  шаг вперёд ¦ oldinga qadam ¦ move forward\nповернуть направо ¦ oʻngga burilish ¦ turn right\nповторить 4 раза: ¦ 4 marta takrorla: ¦ repeat 4 times:\n  шаг вперёд ¦ oldinga qadam ¦ move forward`), lang: 'text' },
      verdict: "Результат одинаковый, но справа программа короче, и путь в 100 клеток — это просто «повторить 100 раз». ¦ Natija bir xil, lekin o'ngdagi dastur qisqaroq, 100 katakli yo'l esa shunchaki «100 marta takrorla». ¦ Same result, but the right one is shorter, and a 100-cell path is just “repeat 100 times”.",
      notes: { say: ["→ — правая колонка. В Blockly это блок «повторить» с вложенными блоками внутри."], min: 4 },
    },
    {
      type: 'live',
      stage: 2,
      console: true,
      title: "То же самое на JavaScript ¦ Xuddi shu JavaScript'da ¦ The same in JavaScript",
      chat: "сколько раз повторить? пишите число ¦ necha marta takrorlaymiz? raqam yozing ¦ how many times? write a number",
      task: "✍️ Блоки — это настоящий код. Поменяйте число в цикле ¦ ✍️ Bloklar — haqiqiy kod. Tsikldagi raqamni o'zgartiring ¦ ✍️ Blocks are real code. Change the loop's number",
      steps: [
        { label: "Без повтора ¦ Takrorsiz ¦ No repeat", js: `console.log('🤖 step');\nconsole.log('🤖 step');\nconsole.log('🤖 step');\nconsole.log('🤖 step');\nconsole.log('↪️ turn right');` },
        { label: "С повтором ¦ Takror bilan ¦ With repeat", js: `for (let i = 1; i <= 4; i++) {\n  console.log('🤖 step ' + i);\n}\nconsole.log('↪️ turn right');` },
        { label: "Функция ¦ Funksiya ¦ A function", js: `function walk(cells) {\n  for (let i = 1; i <= cells; i++) {\n    console.log('🤖 step ' + i);\n  }\n}\n\nwalk(4);\nconsole.log('↪️ turn right');\nwalk(2);` },
      ],
      takeaway: "«Повторить N раз» в Blockly = цикл for в JavaScript. Вы уже программируете! ¦ Blockly'dagi «N marta takrorla» = JavaScript'dagi for tsikli. Siz allaqachon dasturlayapsiz! ¦ Blockly's “repeat N times” = a JavaScript for loop. You're already coding!",
      notes: { say: ["Шаг 3: функция walk — ещё один способ не повторяться. Подробно функции будут в модуле JS."], min: 6 },
    },
    {
      type: 'poll',
      stage: 3,
      title: "Найдите самый короткий путь ¦ Eng qisqa yo'lni toping ¦ Find the shortest program",
      chat: "голосуйте 1–3 ¦ 1–3 bilan ovoz bering ¦ vote 1–3",
      question: "Робот рисует квадрат: 4 раза «шаг, шаг, шаг, поворот». Какая программа короче? ¦ Robot kvadrat chizadi: 4 marta «qadam, qadam, qadam, burilish». Qaysi dastur qisqaroq? ¦ The robot draws a square: 4× “step, step, step, turn”. Which program is shortest?",
      options: [
        { label: "16 блоков подряд ¦ Ketma-ket 16 ta blok ¦ 16 blocks in a row" },
        { label: "4 × (повторить 3: шаг; поворот) ¦ 4 × (3 takrorla: qadam; burilish) ¦ 4 × (repeat 3: step; turn)" },
        { label: "повторить 4: (повторить 3: шаг; поворот) ¦ 4 takrorla: (3 takrorla: qadam; burilish) ¦ repeat 4: (repeat 3: step; turn)", detail: "Верно ✔ — повтор внутри повтора ¦ To'g'ri ✔ — takror ichida takror ¦ Correct ✔ — a repeat inside a repeat" },
      ],
      correct: 2,
      result: "Вложенный повтор: внешний — 4 стороны квадрата, внутренний — 3 шага. Всего 4 блока вместо 16. ¦ Ichma-ich takror: tashqisi — kvadratning 4 tomoni, ichkisi — 3 qadam. 16 o'rniga jami 4 ta blok. ¦ A nested repeat: the outer one for 4 sides, the inner one for 3 steps. 4 blocks instead of 16.",
      takeaway: "Ищите, что повторяется, — и заворачивайте это в «повторить». ¦ Nima takrorlanayotganini qidiring — va uni «takrorla»ga o'rang. ¦ Look for what repeats, and wrap it in “repeat”.",
      notes: { say: ["Нарисуйте квадрат в Blockly-черепашке, если есть время."], min: 4 },
    },
    {
      type: 'output',
      stage: 3,
      title: "Что выведет программа? ¦ Dastur nimani chiqaradi? ¦ What does the program print?",
      chat: "пишите ответ до того, как я покажу ¦ men ko'rsatishimdan oldin javob yozing ¦ write your answer before I reveal it",
      snippets: [
        { label: "Повтор 3 раза ¦ 3 marta takror ¦ Repeat 3 times", code: `for (let i = 0; i < 3; i++) {\n  console.log('⭐');\n}`, output: ['⭐', '⭐', '⭐'], explain: "i = 0, 1, 2 — три прохода. ¦ i = 0, 1, 2 — uchta o'tish. ¦ i = 0, 1, 2 — three passes." },
        { label: "Вложенный повтор ¦ Ichma-ich takror ¦ A nested repeat", code: `for (let side = 1; side <= 2; side++) {\n  for (let s = 1; s <= 2; s++) {\n    console.log('step');\n  }\n  console.log('turn');\n}`, output: ['step', 'step', 'turn', 'step', 'step', 'turn'], explain: "Внутренний цикл выполняется целиком на каждом проходе внешнего. ¦ Ichki tsikl tashqi tsiklning har bir o'tishida to'liq bajariladi. ¦ The inner loop runs fully on each outer pass." },
      ],
      takeaway: "Вложенные повторы — мощный инструмент, но читайте их снаружи внутрь. ¦ Ichma-ich takrorlar — kuchli vosita, lekin ularni tashqaridan ichkariga o'qing. ¦ Nested repeats are powerful — read them from outside in.",
      notes: { say: ["Сначала ответы чата, потом раскрываем."], min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Можно ли упростить? ¦ Soddalashtirish mumkinmi? ¦ Can it be simplified?",
      chat: "пишите: «1 — повтор» или «1 — уже коротко» ¦ yozing: «1 — takror» yoki «1 — allaqachon qisqa» ¦ write: “1 — repeat” or “1 — already short”",
      zones: [
        { id: 'loop', label: "Завернуть в «повторить» ¦ «Takrorla»ga o'rash ¦ Wrap in “repeat”", icon: '🔁' },
        { id: 'ok', label: "Уже коротко ¦ Allaqachon qisqa ¦ Already short", icon: '✅' },
      ],
      items: [
        { text: "шаг, шаг, шаг, шаг, шаг, шаг ¦ qadam, qadam, qadam, qadam, qadam, qadam ¦ step ×6", zone: 'loop' },
        { text: "шаг, поворот, прыжок ¦ qadam, burilish, sakrash ¦ step, turn, jump", zone: 'ok', why: "Нет одинаковых частей. ¦ Bir xil qismlar yo'q. ¦ No repeating parts." },
        { text: "(шаг, поворот) × 4 ¦ (qadam, burilish) × 4 ¦ (step, turn) × 4", zone: 'loop' },
        { text: "взять ключ, открыть дверь ¦ kalitni olish, eshikni ochish ¦ pick up key, open door", zone: 'ok' },
      ],
      takeaway: "Оптимизация — не «всегда короче», а «без лишних повторов». ¦ Optimallashtirish — «doim qisqaroq» emas, balki «ortiqcha takrorlarsiz». ¦ Optimisation isn't “always shorter”; it's “no needless repeats”.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: лабиринт за минимум блоков ¦ Missiya: minimal bloklar bilan labirint ¦ Mission: the maze in the fewest blocks",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Робот дошёл до звезды за 4 блока! ¦ Robot yulduzga 4 blokda yetib keldi! ¦ The robot reached the star in 4 blocks!",
      items: [
        { title: "Что такое алгоритм? ¦ Algoritm nima? ¦ What is an algorithm?", choices: ["Чёткие шаги для решения задачи ¦ Vazifani hal qilish uchun aniq qadamlar ¦ Clear steps that solve a task", "Любая картинка с кодом ¦ Kodli istalgan rasm ¦ Any picture with code"], correct: 0, explain: "Шаги + порядок + результат. ¦ Qadamlar + tartib + natija. ¦ Steps + order + result." },
        { title: "10 шагов вперёд — это… ¦ 10 qadam oldinga — bu… ¦ 10 steps forward is…", choices: ["10 блоков ¦ 10 ta blok ¦ 10 blocks", "повторить 10: шаг ¦ 10 takrorla: qadam ¦ repeat 10: step"], correct: 1, explain: "Повтор вместо копий. ¦ Nusxalar o'rniga takror. ¦ Repeat instead of copies." },
        { title: "«Повторить» в JavaScript ¦ JavaScript'da «takrorla» ¦ “Repeat” in JavaScript", choices: ['for', 'console'], correct: 0, explain: "for (let i = 0; i < 10; i++) { … } ¦ for (let i = 0; i < 10; i++) { … } ¦ for (let i = 0; i < 10; i++) { … }" },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: алгоритмы ¦ Xulosa: algoritmlar ¦ Summary: algorithms",
      chat: "сколько блоков у вас вышло в лабиринте? ¦ labirintda sizda nechta blok chiqdi? ¦ how many blocks did your maze take?",
      answer: "Алгоритм — чёткие шаги в строгом порядке. Длинную программу делают короче, когда находят повторяющиеся части и заворачивают их в «повторить N раз» (в JavaScript — цикл for), а повторы внутри повторов — во вложенный цикл. Результат тот же, а читать и менять программу проще. ¦ Algoritm — qat'iy tartibdagi aniq qadamlar. Uzun dastur takrorlanuvchi qismlarni topib, ularni «N marta takrorla»ga (JavaScript'da — for tsikli), takror ichidagi takrorlarni esa ichma-ich tsiklga o'rash orqali qisqartiriladi. Natija o'sha, dasturni o'qish va o'zgartirish esa osonroq. ¦ An algorithm is clear steps in a strict order. You shorten a long program by finding repeating parts and wrapping them in “repeat N times” (a for loop in JavaScript), and repeats within repeats in a nested loop. Same result, easier to read and change.",
      icon: '🤖',
      badge: "Оптимизатор ¦ Optimallashtiruvchi ¦ Optimiser",
      badgeSub: "Tilda · Git · техническая 3 ¦ Tilda · Git · texnik 3 ¦ Tilda · Git · technical 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Пройдите 5 уровней Blockly-лабиринта, стараясь использовать как можно меньше блоков. ¦ Blockly labirintining 5 ta darajasini imkon qadar kam blok bilan o'ting. ¦ Beat 5 Blockly maze levels using as few blocks as you can.",
        "Запишите свой утренний алгоритм и найдите в нём повтор и условие. ¦ Tonggi algoritmingizni yozing va undagi takror va shartni toping. ¦ Write down your morning algorithm and find a repeat and a condition in it.",
      ],
      takeaway: "Следующий шаг — игра с AI: идея → правила → работающий проект. ¦ Keyingi qadam — AI bilan o'yin: g'oya → qoidalar → ishlaydigan loyiha. ¦ Next: a game with AI — idea → rules → working project.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
