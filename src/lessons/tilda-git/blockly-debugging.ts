import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.maze{position:relative;display:grid;grid-template-columns:repeat(5,70px);grid-template-rows:repeat(5,70px);gap:6px;padding:12px;border-radius:20px;background:#fff;box-shadow:0 10px 30px #0001}
.c{border-radius:12px;background:#3a3f52}.c.p{background:#ccf3ee}
.bot{position:absolute;width:70px;height:70px;display:grid;place-items:center;font-size:48px}
.goal{position:absolute;width:70px;height:70px;display:grid;place-items:center;font-size:44px}
.bang{position:absolute;width:70px;height:70px;display:grid;place-items:center;font-size:40px;opacity:0}
.hit .bang{opacity:1}
.tag{position:absolute;right:-12px;top:-14px;padding:4px 12px;border-radius:999px;background:#16181f;color:#fff;font:800 15px JetBrains Mono,monospace}`;
// path: (0,4)→(2,4) up to (2,2) right to (4,2) up to (4,0)
const PATH = new Set(['0,4', '1,4', '2,4', '2,3', '2,2', '3,2', '4,2', '4,1', '4,0']);
const at = (x: number, y: number) => `left:${12 + x * 76}px;top:${12 + y * 76}px`;
const maze = (x: number, y: number, tag: string, o: { face?: string; hit?: [number, number] } = {}) => {
  let cells = '';
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) cells += `<div class="c ${PATH.has(`${c},${r}`) ? 'p' : ''}"></div>`;
  const hit = o.hit ? `<div class="bang" style="${at(o.hit[0], o.hit[1])}">💥</div>` : '';
  return `<div class="wrap"><div class="maze ${o.hit ? 'hit' : ''}">${cells}<div class="goal" style="${at(4, 0)}">🏁</div>${hit}<div class="bot" style="${at(x, y)}">${o.face ?? '🤖'}</div><span class="tag">${tag}</span></div></div>`;
};

export default kit({
  id: 'tilda-git-t07',
  title: "Отладка, Repeat и условия (Blockly) ¦ Xatolarni tuzatish, Repeat va shartlar (Blockly) ¦ Debugging, Repeat and conditions (Blockly)",
  question: "Как самому найти ошибку в программе и научить её принимать решения? ¦ Dasturdagi xatoni o'zing qanday topish va uni qaror qabul qilishga o'rgatish mumkin? ¦ How do you find a bug yourself and teach a program to make decisions?",
  route: ["Баг ¦ Xato ¦ The bug", "Отладка ¦ Tuzatish ¦ Debugging", "Условие ¦ Shart ¦ Conditions", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🐞',
      kicker: "Tilda · Git · техническая тема 7 ¦ Tilda · Git · texnik mavzu 7 ¦ Tilda · Git · technical topic 7",
      title: "Робот врезался в стену ¦ Robot devorga urildi ¦ The robot hit a wall",
      chat: "почему программа может делать не то, что мы хотели? ¦ nega dastur biz xohlagan narsani qilmasligi mumkin? ¦ why might a program do something we didn't want?",
      lead: "Баг — ошибка в программе. Компьютер не ошибается: он точно выполняет то, что мы написали. Значит, ошибку ищем в своих шагах. ¦ Bag — dasturdagi xato. Kompyuter xato qilmaydi: u biz yozganini aniq bajaradi. Demak, xatoni o'z qadamlarimizdan qidiramiz. ¦ A bug is a mistake in a program. Computers don't slip: they do exactly what we wrote. So we look for the mistake in our steps.",
      facts: ["Найти, где сломалось ¦ Qayerda buzilganini topish ¦ Find where it broke", "Понять почему ¦ Nega ekanini tushunish ¦ Understand why", "Исправить и проверить ¦ Tuzatish va tekshirish ¦ Fix and re-test"],
      takeaway: "Отладка — нормальная часть работы, а не провал. ¦ Tuzatish — ishning odatiy qismi, muvaffaqiyatsizlik emas. ¦ Debugging is a normal part of the job, not a failure.",
      notes: { say: ["Для живой отладки откройте Blockly-лабиринт."], min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Ищем баг по шагам ¦ Xatoni qadam-baqadam qidiramiz ¦ Hunting the bug step by step",
      chat: "на каком шаге робот свернул не туда? ¦ robot qaysi qadamda noto'g'ri burildi? ¦ at which step did the robot go wrong?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: 'repeat 2: forward\nturn right\nrepeat 2: forward', line: 2, html: maze(2, 4, 'run ▶', { face: '😵', hit: [2, 4] }), say: "Запускаем — робот врезался в стену! ¦ Ishga tushiramiz — robot devorga urildi! ¦ Run it — the robot crashes into a wall!" },
        { code: 'repeat 2: forward   ✓\nturn right          ?\nrepeat 2: forward', line: 1, html: maze(2, 4, 'step 1 ✓'), say: "Идём по шагам: первые два «вперёд» — верно, робот у поворота. ¦ Qadam-baqadam boramiz: birinchi ikkita «oldinga» — to'g'ri, robot burilishda. ¦ Step through: the first two “forward” blocks are right." },
        { code: 'repeat 2: forward   ✓\nturn right          ✗\nrepeat 2: forward', line: 2, html: maze(2, 4, 'step 2 ✗', { face: '🤔' }), say: "Шаг 2: путь идёт вверх, а мы повернули направо. Вот баг! ¦ 2-qadam: yo'l yuqoriga ketadi, biz esa o'ngga burildik. Mana xato! ¦ Step 2: the path goes up but we turned right. There's the bug!" },
        { code: 'repeat 2: forward\nturn left\nrepeat 2: forward', line: 2, html: maze(2, 2, 'fixed ✓'), say: "Меняем одно — right на left — и запускаем снова. Робот на месте! ¦ Bittasini o'zgartiramiz — right'ni left'ga — va yana ishga tushiramiz. Robot joyida! ¦ Change one thing — right to left — and run again. It works!" },
      ],
      takeaway: "Запустить → найти шаг → понять причину → исправить одно → проверить. ¦ Ishga tushirish → qadamni topish → sababni tushunish → bittasini tuzatish → tekshirish. ¦ Run → find the step → understand why → fix one thing → re-run.",
      notes: { say: ["Частая ошибка — менять блоки наугад, не понимая причину."], min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Условие: робот решает сам ¦ Shart: robot o'zi hal qiladi ¦ A condition: the robot decides",
      chat: "что делать роботу, если впереди стена? ¦ oldinda devor bo'lsa, robot nima qilishi kerak? ¦ what should the robot do if there's a wall ahead?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: 'repeat until 🏁:\n  if path ahead:\n    forward\n  else:\n    turn', line: 1, html: maze(0, 4, 'if / else'), say: "Вместо точного списка — правило: «если впереди путь — иди, иначе — поворачивай». ¦ Aniq ro'yxat o'rniga — qoida: «oldinda yo'l bo'lsa — yur, aks holda — buril». ¦ Instead of an exact list, a rule: “if there's a path ahead, go; else turn”." },
        { code: 'repeat until 🏁:\n  if path ahead:\n    forward\n  else:\n    turn', line: 3, html: maze(2, 4, 'path → forward'), say: "Путь есть — идёт вперёд. ¦ Yo'l bor — oldinga yuradi. ¦ Path ahead — move forward." },
        { code: 'repeat until 🏁:\n  if path ahead:\n    forward\n  else:\n    turn', line: 5, html: maze(2, 2, 'wall → turn'), say: "Стена — поворачивает и снова проверяет. ¦ Devor — buriladi va yana tekshiradi. ¦ A wall — it turns and checks again." },
        { code: 'repeat until 🏁:\n  if path ahead:\n    forward\n  else:\n    turn', line: 1, html: maze(4, 0, '🏁 ✓', { face: '🥳' }), say: "Так робот проходит даже лабиринт, который видит впервые! ¦ Shunday qilib robot birinchi marta ko'rgan labirintdan ham o'tadi! ¦ This way the robot solves even a maze it has never seen!" },
      ],
      takeaway: "if / else — программа выбирает действие по ситуации. ¦ if / else — dastur vaziyatga qarab harakatni tanlaydi. ¦ if / else lets a program choose based on the situation.",
      notes: { say: ["Упрощение: в настоящей Blockly-игре направление поворота задаёте сами (налево/направо)."], min: 5 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Список или правило? ¦ Ro'yxatmi yoki qoidami? ¦ A list or a rule?",
      chat: "какая программа справится с новым лабиринтом? ¦ qaysi dastur yangi labirint bilan uddalaydi? ¦ which program handles a new maze?",
      left: { icon: '📜', label: "Точный список ¦ Aniq ro'yxat ¦ An exact list", code: 'forward\nforward\nturn left\nforward\n…', lang: 'text', points: ["Работает только для одного лабиринта ¦ Faqat bitta labirint uchun ishlaydi ¦ Works for one maze only"] },
      right: { icon: '🧠', label: "Правило ¦ Qoida ¦ A rule", code: 'repeat until 🏁:\n  if path ahead: forward\n  else: turn', lang: 'text', points: ["Подходит для многих лабиринтов ¦ Ko'p labirintlarga mos ¦ Fits many mazes"] },
      verdict: "Повтор + условие = программа, которая думает. ¦ Takror + shart = o'ylaydigan dastur. ¦ Repeat + condition = a program that thinks.",
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Баг значит, что компьютер сломался ¦ Bag kompyuter buzilganini anglatadi ¦ A bug means the computer is broken", truth: false, explain: "Он сделал ровно то, что написано. ¦ U aynan yozilganini qildi. ¦ It did exactly what was written." },
        { text: "Лучше менять по одной вещи за раз ¦ Bir martada bitta narsani o'zgartirgan ma'qul ¦ Change one thing at a time", truth: true, explain: "Так понятно, что помогло. ¦ Shunda nima yordam bergani tushunarli. ¦ Then you know what helped." },
        { text: "if нужен, чтобы повторять ¦ if takrorlash uchun kerak ¦ if is for repeating", truth: false, explain: "if выбирает, repeat повторяет. ¦ if tanlaydi, repeat takrorlaydi. ¦ if chooses; repeat repeats." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: отладчик ¦ Missiya: tuzatuvchi ¦ Mission: debugger",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Робот дошёл до флажка! ¦ Robot bayroqchaga yetdi! ¦ The robot reached the flag!",
      items: [
        { title: "Робот врезался. Первый шаг? ¦ Robot urildi. Birinchi qadam? ¦ The robot crashed. First step?", choices: ["Найти, на каком шаге ¦ Qaysi qadamda ekanini topish ¦ Find which step", "Переписать всё ¦ Hammasini qayta yozish ¦ Rewrite everything"], correct: 0, explain: "Сначала найти место. ¦ Avval joyni topish. ¦ Find the spot first." },
        { title: "«если стена — поверни» — это… ¦ «devor bo'lsa — buril» — bu… ¦ “if wall, turn” is…", choices: ["Условие ¦ Shart ¦ A condition", "Повтор ¦ Takror ¦ A repeat"], correct: 0, explain: "if / else. ¦ if / else. ¦ if / else." },
        { title: "Нашли причину ¦ Sababni topdik ¦ You found the cause", choices: ["Исправить одно и запустить ¦ Bittasini tuzatib, ishga tushirish ¦ Fix one thing and run", "Поменять 5 блоков сразу ¦ Birdan 5 ta blokni o'zgartirish ¦ Change 5 blocks at once"], correct: 0, explain: "Одно изменение — одна проверка. ¦ Bitta o'zgarish — bitta tekshiruv. ¦ One change, one test." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: отладка и условия ¦ Xulosa: tuzatish va shartlar ¦ Summary: debugging and conditions",
      chat: "какой самый смешной баг у вас был? ¦ sizda eng kulgili xato qanday bo'lgan? ¦ what's the funniest bug you've had?",
      answer: "Баг — ошибка в наших шагах, а не в компьютере. Отладка идёт по шагам: запустить, найти место, понять причину, исправить одну вещь и снова проверить. Условие if / else позволяет программе выбирать действие по ситуации, а вместе с повтором получается правило, которое справляется даже с новым лабиринтом. ¦ Bag — kompyuterda emas, bizning qadamlarimizdagi xato. Tuzatish qadam-baqadam boradi: ishga tushirish, joyni topish, sababni tushunish, bitta narsani tuzatish va yana tekshirish. if / else sharti dasturga vaziyatga qarab harakat tanlash imkonini beradi, takror bilan birga esa hatto yangi labirint bilan ham uddalaydigan qoida hosil bo'ladi. ¦ A bug is a mistake in our steps, not in the computer. Debugging goes step by step: run, find the spot, understand why, fix one thing and re-test. if / else lets a program choose by situation, and together with repeat you get a rule that solves even a new maze.",
      icon: '🐞',
      badge: "Охотник на баги ¦ Xato ovchisi ¦ Bug hunter",
      badgeSub: "Tilda · Git · техническая 7 ¦ Tilda · Git · texnik 7 ¦ Tilda · Git · technical 7",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Пройдите уровни Blockly Maze с блоком if. ¦ Blockly Maze'ning if bloki bor bosqichlarini o'ting. ¦ Beat the Blockly Maze levels with the if block.",
        "Найдите и исправьте баг в любой своей программе по 4 шагам. ¦ O'z dasturingizdagi xatoni 4 qadam bo'yicha toping va tuzating. ¦ Find and fix a bug in one of your programs using the 4 steps.",
      ],
      takeaway: "Технические темы пройдены! Дальше — общие темы. ¦ Texnik mavzular tugadi! Keyingisi — umumiy mavzular. ¦ Technical topics done! Next: general topics.",
      notes: { min: 2 },
    },
  ],
});
