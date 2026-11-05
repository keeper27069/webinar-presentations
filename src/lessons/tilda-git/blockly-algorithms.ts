import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.maze{position:relative;display:grid;grid-template-columns:repeat(5,70px);grid-template-rows:repeat(5,70px);gap:6px;padding:12px;border-radius:20px;background:#fff;box-shadow:0 10px 30px #0001}
.c{border-radius:12px;background:#eceef3}.c.p{background:#ccf3ee}.c.w{background:#3a3f52}
.bot{position:absolute;width:70px;height:70px;display:grid;place-items:center;font-size:48px}
.goal{position:absolute;width:70px;height:70px;display:grid;place-items:center;font-size:44px}
.cnt{position:absolute;right:-12px;top:-14px;padding:4px 12px;border-radius:999px;background:#0fb5a6;color:#fff;font:800 16px JetBrains Mono,monospace}`;
// path: from (0,4) up to (0,0)? keep simple: start bottom-left, go right 4, then up 4
const PATH = new Set(['0,4', '1,4', '2,4', '3,4', '4,4', '4,3', '4,2', '4,1', '4,0']);
const at = (x: number, y: number) => `left:${12 + x * 76}px;top:${12 + y * 76}px`;
const maze = (x: number, y: number, lines: number, face = '🤖') => {
  let cells = '';
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) cells += `<div class="c ${PATH.has(`${c},${r}`) ? 'p' : (c + r) % 3 === 0 ? 'w' : ''}"></div>`;
  return `<div class="wrap"><div class="maze">${cells}<div class="goal" style="${at(4, 0)}">🏁</div><div class="bot" style="${at(x, y)}">${face}</div><span class="cnt">${lines} blocks</span></div></div>`;
};

export default kit({
  id: 'tilda-git-t03',
  title: "Алгоритмы и оптимизация (Blockly) ¦ Algoritmlar va optimallashtirish (Blockly) ¦ Algorithms and optimisation (Blockly)",
  question: "Как одну и ту же задачу решить короче и проще? ¦ Bitta vazifani qanday qilib qisqaroq va osonroq hal qilish mumkin? ¦ How do you solve the same task shorter and simpler?",
  route: ["Алгоритм ¦ Algoritm ¦ Algorithm", "Длинно ¦ Uzun ¦ The long way", "Повтор ¦ Takror ¦ Repeat", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🤖',
      kicker: "Tilda · Git · техническая тема 3 ¦ Tilda · Git · texnik mavzu 3 ¦ Tilda · Git · technical topic 3",
      title: "Робот понимает только команды ¦ Robot faqat buyruqlarni tushunadi ¦ The robot only understands commands",
      chat: "как объяснить роботу дорогу до двери? ¦ robotga eshikkacha yo'lni qanday tushuntirish mumkin? ¦ how would you explain the way to the door to a robot?",
      lead: "Компьютер не догадывается — он выполняет команды по порядку. Набор таких команд для решения задачи и есть алгоритм. ¦ Kompyuter taxmin qilmaydi — u buyruqlarni tartib bilan bajaradi. Vazifani hal qilish uchun shunday buyruqlar to'plami — algoritm. ¦ Computers don't guess — they run commands in order. A set of commands that solves a task is an algorithm.",
      facts: ["Чёткие шаги ¦ Aniq qadamlar ¦ Clear steps", "Строгий порядок ¦ Qat'iy tartib ¦ A strict order", "Понятный результат ¦ Tushunarli natija ¦ A clear result"],
      takeaway: "Ведём робота к флажку — сначала длинно. ¦ Robotni bayroqchaga olib boramiz — avval uzun yo'l bilan. ¦ Let's guide the robot to the flag — the long way first.",
      notes: { say: ["Для живой сборки откройте Blockly Games «Maze»."], min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Длинная программа ¦ Uzun dastur ¦ The long program",
      chat: "сколько блоков понадобится? угадайте! ¦ nechta blok kerak bo'ladi? taxmin qiling! ¦ how many blocks will it take? guess!",
      lang: 'text',
      css: CSS,
      steps: [
        { code: '(start)', html: maze(0, 4, 0), say: "Робот внизу слева, флажок — справа вверху. ¦ Robot pastda chapda, bayroqcha — yuqorida o'ngda. ¦ The robot is bottom-left; the flag is top-right." },
        { code: 'move forward\nmove forward', line: 2, html: maze(2, 4, 2), say: "Два «вперёд» — робот прошёл две клетки. ¦ Ikkita «oldinga» — robot ikki katak yurdi. ¦ Two “forward” blocks: two squares." },
        { code: 'move forward\nmove forward\nmove forward\nmove forward', line: 4, html: maze(4, 4, 4), say: "Ещё два — дошли до угла. ¦ Yana ikkita — burchakka yetdik. ¦ Two more and we reach the corner." },
        { code: 'move forward ×4\nturn left\nmove forward\nmove forward\nmove forward\nmove forward', line: 6, html: maze(4, 0, 9, '🥳'), say: "Поворот и ещё 4 шага — флажок! Но вышло 9 блоков. ¦ Burilish va yana 4 qadam — bayroqcha! Lekin 9 ta blok chiqdi. ¦ A turn and 4 more steps — the flag! But that's 9 blocks." },
      ],
      takeaway: "Работает, но длинно: одно и то же много раз. ¦ Ishlaydi, lekin uzun: bir xil narsa ko'p marta. ¦ It works but it's long: the same thing over and over.",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Блок «повторить» ¦ «Takrorla» bloki ¦ The “repeat” block",
      chat: "как сократить программу? ¦ dasturni qanday qisqartirish mumkin? ¦ how can we shorten it?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: 'repeat 4 times:\n  move forward', line: 1, html: maze(4, 4, 2), say: "«Повтори 4 раза: вперёд» — 2 блока вместо 4. ¦ «4 marta takrorla: oldinga» — 4 ta o'rniga 2 ta blok. ¦ “Repeat 4 times: forward” — 2 blocks instead of 4." },
        { code: 'repeat 4 times:\n  move forward\nturn left', line: 3, html: maze(4, 4, 3), say: "Поворачиваем налево. ¦ Chapga buramiz. ¦ Turn left." },
        { code: 'repeat 4 times:\n  move forward\nturn left\nrepeat 4 times:\n  move forward', line: 4, html: maze(4, 0, 5, '🥳'), say: "Ещё один повтор — флажок! Всего 5 блоков вместо 9. ¦ Yana bitta takror — bayroqcha! 9 ta o'rniga jami 5 ta blok. ¦ One more repeat — the flag! 5 blocks instead of 9." },
      ],
      takeaway: "Повтор делает программу короче и понятнее. Это оптимизация. ¦ Takror dasturni qisqaroq va tushunarliroq qiladi. Bu optimallashtirish. ¦ Repeat makes programs shorter and clearer — that's optimisation.",
      notes: { min: 5 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "9 блоков или 5? ¦ 9 ta blokmi yoki 5 tami? ¦ 9 blocks or 5?",
      chat: "какую программу легче исправить? ¦ qaysi dasturni tuzatish osonroq? ¦ which program is easier to fix?",
      left: { icon: '📜', label: "Длинно ¦ Uzun ¦ Long", code: 'move forward\nmove forward\nmove forward\nmove forward\nturn left\nmove forward\nmove forward\nmove forward\nmove forward', lang: 'text' },
      right: { icon: '✨', label: "Коротко ¦ Qisqa ¦ Short", code: 'repeat 4 times:\n  move forward\nturn left\nrepeat 4 times:\n  move forward', lang: 'text' },
      verdict: "Если клеток станет 10 — в короткой программе меняем одно число. ¦ Kataklar 10 ta bo'lsa — qisqa dasturda bitta raqamni o'zgartiramiz. ¦ If there are 10 squares, the short program changes just one number.",
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Компьютер сам догадается, куда идти ¦ Kompyuter qayerga borishni o'zi taxmin qiladi ¦ The computer guesses where to go", truth: false, explain: "Он делает только то, что написано. ¦ U faqat yozilganini qiladi. ¦ It only does what's written." },
        { text: "Порядок команд важен ¦ Buyruqlar tartibi muhim ¦ Command order matters", truth: true, explain: "Повернуть до или после шага — разный путь. ¦ Qadamdan oldin yoki keyin burilish — har xil yo'l. ¦ Turning before or after a step changes the path." },
        { text: "Короткая программа делает то же самое ¦ Qisqa dastur xuddi shuni qiladi ¦ The short program does the same", truth: true, explain: "Результат тот же, кода меньше. ¦ Natija o'sha, kod kamroq. ¦ Same result, less code." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: оптимизатор ¦ Missiya: optimallashtiruvchi ¦ Mission: optimiser",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Программа короткая и работает! ¦ Dastur qisqa va ishlaydi! ¦ The program is short and works!",
      items: [
        { title: "«вперёд» 6 раз подряд ¦ Ketma-ket 6 marta «oldinga» ¦ “forward” 6 times in a row", choices: ["repeat 6: forward", "6 отдельных блоков ¦ 6 ta alohida blok ¦ 6 separate blocks"], correct: 0, explain: "Повтор вместо копий. ¦ Nusxalar o'rniga takror. ¦ Repeat instead of copies." },
        { title: "Что такое алгоритм? ¦ Algoritm nima? ¦ What's an algorithm?", choices: ["Шаги по порядку для решения задачи ¦ Vazifani hal qilish uchun tartibli qadamlar ¦ Ordered steps to solve a task", "Картинка робота ¦ Robot rasmi ¦ A robot picture"], correct: 0, explain: "Как рецепт. ¦ Retsept kabi. ¦ Like a recipe." },
        { title: "Клеток стало 8 вместо 4 ¦ Kataklar 4 ta o'rniga 8 ta bo'ldi ¦ 8 squares instead of 4", choices: ["Поменять repeat 4 на repeat 8 ¦ repeat 4 ni repeat 8 ga almashtirish ¦ Change repeat 4 to repeat 8", "Дописать 4 блока ¦ 4 ta blok qo'shish ¦ Add 4 blocks"], correct: 0, explain: "Одно число — и готово. ¦ Bitta raqam — va tayyor. ¦ One number and done." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: алгоритмы и повтор ¦ Xulosa: algoritmlar va takror ¦ Summary: algorithms and repeat",
      chat: "пройдите первый уровень Blockly Maze! ¦ Blockly Maze'ning birinchi bosqichini o'ting! ¦ beat level 1 of Blockly Maze!",
      answer: "Алгоритм — это чёткие шаги в строгом порядке. Компьютер не догадывается, а выполняет команды одну за другой. Одну задачу можно решить длинно (одни и те же блоки много раз) или коротко — с блоком «повторить». Короткая программа делает то же самое, её легче читать и менять: это и есть оптимизация. ¦ Algoritm — qat'iy tartibdagi aniq qadamlar. Kompyuter taxmin qilmaydi, buyruqlarni birin-ketin bajaradi. Bitta vazifani uzun (bir xil bloklar ko'p marta) yoki qisqa — «takrorla» bloki bilan hal qilish mumkin. Qisqa dastur xuddi shuni qiladi, uni o'qish va o'zgartirish oson: bu optimallashtirish. ¦ An algorithm is clear steps in a strict order. Computers don't guess; they run commands one by one. A task can be solved the long way (the same blocks over and over) or the short way with a “repeat” block. The short program does the same and is easier to read and change — that's optimisation.",
      icon: '🤖',
      badge: "Укротитель роботов ¦ Robotlar tarbiyachisi ¦ Robot tamer",
      badgeSub: "Tilda · Git · техническая 3 ¦ Tilda · Git · texnik 3 ¦ Tilda · Git · technical 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Пройдите 5 уровней Blockly Games «Maze». ¦ Blockly Games «Maze»ning 5 ta bosqichini o'ting. ¦ Beat 5 levels of Blockly Games “Maze”.",
        "Найдите уровень, где повтор сокращает программу. ¦ Takror dasturni qisqartiradigan bosqichni toping. ¦ Find a level where repeat shortens the program.",
      ],
      takeaway: "Дальше: создаём игру вместе с AI. ¦ Keyingisi: AI bilan birga o'yin yaratamiz. ¦ Next: building a game together with AI.",
      notes: { min: 2 },
    },
  ],
});
