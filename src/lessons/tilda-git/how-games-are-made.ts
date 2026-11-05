import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.scr{position:relative;width:500px;height:300px;border-radius:18px;background:linear-gradient(#8fd3ff,#d9f2ff 70%,#7bc96f 70%);overflow:hidden;box-shadow:0 10px 30px #0002}
.hero{position:absolute;left:20px;top:150px;font-size:64px}
.coin{position:absolute;left:400px;top:160px;font-size:44px}
.hud{position:absolute;right:14px;top:10px;padding:4px 12px;border-radius:999px;background:#16181f;color:#fff;font:800 16px JetBrains Mono,monospace}
.f2 .hero{left:130px}.f3 .hero{left:250px;top:90px}.f4 .hero{left:390px;top:150px}.f4 .coin{opacity:0;scale:2}`;
const scr = (cls: string, frame: number, coins: number) => `<div class="wrap"><div class="scr ${cls}"><div class="hero">🦊</div><div class="coin">🪙</div><span class="hud">frame ${frame} · 🪙 ${coins}</span></div></div>`;

export default kit({
  id: 'tilda-git-g02',
  title: "Как устроены игры: Roblox, Minecraft, Unity ¦ O'yinlar qanday tuzilgan: Roblox, Minecraft, Unity ¦ How games work: Roblox, Minecraft, Unity",
  question: "Что происходит внутри игры 60 раз в секунду? ¦ O'yin ichida soniyasiga 60 marta nima sodir bo'ladi? ¦ What happens inside a game 60 times a second?",
  route: ["Кадры ¦ Kadrlar ¦ Frames", "Игровой цикл ¦ O'yin sikli ¦ The game loop", "Движки ¦ Dvijoklar ¦ Engines", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎮',
      kicker: "Tilda · Git · общая тема 2 ¦ Tilda · Git · umumiy mavzu 2 ¦ Tilda · Git · general topic 2",
      title: "Игра — это очень быстрый мультик ¦ O'yin — bu juda tez multfilm ¦ A game is a very fast cartoon",
      chat: "в какую игру вы играете чаще всего? ¦ qaysi o'yinni ko'proq o'ynaysiz? ¦ which game do you play most?",
      lead: "Игра рисует картинку-кадр 60 раз в секунду. Перед каждым кадром она проверяет кнопки, двигает героев и считает очки. Это игровой цикл. ¦ O'yin soniyasiga 60 marta kadr-rasm chizadi. Har bir kadrdan oldin u tugmalarni tekshiradi, qahramonlarni harakatlantiradi va ochkolarni hisoblaydi. Bu o'yin sikli. ¦ A game draws a picture — a frame — 60 times a second. Before each frame it checks buttons, moves characters and counts points. That's the game loop.",
      facts: ["60 кадров в секунду ¦ Soniyasiga 60 kadr ¦ 60 frames per second", "Цикл: кнопки → движение → рисунок ¦ Sikl: tugmalar → harakat → rasm ¦ Loop: input → update → draw", "Движок делает самое сложное ¦ Dvijok eng qiyin ishni qiladi ¦ The engine does the hard parts"],
      takeaway: "Посмотрим на игру кадр за кадром. ¦ O'yinga kadrma-kadr qaraymiz. ¦ Let's watch a game frame by frame.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 0,
      title: "Кадр за кадром ¦ Kadrma-kadr ¦ Frame by frame",
      chat: "что меняется между кадрами? ¦ kadrlar orasida nima o'zgaradi? ¦ what changes between frames?",
      lang: 'js',
      css: CSS,
      steps: [
        { code: 'fox.x = 20;', html: scr('', 1, 0), say: "Кадр 1: лиса стоит слева. ¦ 1-kadr: tulki chapda turibdi. ¦ Frame 1: the fox stands on the left." },
        { code: '// → pressed\nfox.x = fox.x + 110;', line: 2, html: scr('f2', 2, 0), say: "Игрок жмёт →. Игра прибавила к x — лиса сдвинулась. ¦ O'yinchi → ni bosadi. O'yin x ga qo'shdi — tulki siljidi. ¦ The player presses →. The game adds to x and the fox moves." },
        { code: '// space pressed\nfox.y = fox.y - 60; // jump', line: 2, html: scr('f2 f3', 3, 0), say: "Пробел — прыжок: уменьшили y. ¦ Probel — sakrash: y ni kamaytirdik. ¦ Space means jump: y goes down." },
        { code: 'if (fox touches coin) {\n  coins = coins + 1;\n}', line: 2, html: scr('f2 f3 f4', 4, 1), say: "Лиса коснулась монеты — монета исчезла, счёт +1. ¦ Tulki tangaga tegdi — tanga yo'qoldi, hisob +1. ¦ The fox touches the coin: it vanishes and the score goes up." },
      ],
      takeaway: "Каждый кадр — немного новых чисел: x, y, очки. ¦ Har bir kadr — biroz yangi raqamlar: x, y, ochkolar. ¦ Every frame is just a few new numbers: x, y, score.",
      notes: { min: 5 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Игровой цикл ¦ O'yin sikli ¦ The game loop",
      chat: "сколько раз в секунду крутится цикл? ¦ sikl soniyasiga necha marta aylanadi? ¦ how many times a second does the loop run?",
      actors: [
        { id: 'in', icon: '🎮', label: "1. Кнопки ¦ 1. Tugmalar ¦ 1. Input" },
        { id: 'up', icon: '🧮', label: "2. Движение и очки ¦ 2. Harakat va ochkolar ¦ 2. Update" },
        { id: 'dr', icon: '🖼️', label: "3. Нарисовать кадр ¦ 3. Kadr chizish ¦ 3. Draw" },
        { id: 'n', text: "×60 в секунду ¦ soniyasiga ×60 ¦ ×60 per second" },
      ],
      steps: [
        { say: "Шаг 1: какие кнопки нажал игрок? ¦ 1-qadam: o'yinchi qaysi tugmalarni bosdi? ¦ Step 1: which buttons did the player press?", at: { in: [50, 14] }, pulse: ['in'] },
        { say: "Шаг 2: сдвинуть героев, проверить столкновения, посчитать очки. ¦ 2-qadam: qahramonlarni siljitish, to'qnashuvlarni tekshirish, ochkolarni hisoblash. ¦ Step 2: move characters, check collisions, count points.", at: { up: [84, 70] }, lines: [['in', 'up']], pulse: ['up'] },
        { say: "Шаг 3: нарисовать новый кадр. ¦ 3-qadam: yangi kadr chizish. ¦ Step 3: draw the new frame.", at: { dr: [16, 70] }, lines: [['in', 'up'], ['up', 'dr']], pulse: ['dr'] },
        { say: "И сначала! 60 раз в секунду — поэтому движение кажется плавным. ¦ Va boshidan! Soniyasiga 60 marta — shuning uchun harakat silliq ko'rinadi. ¦ And again! 60 times a second — that's why motion looks smooth.", at: { n: [50, 56] }, lines: [['in', 'up'], ['up', 'dr'], ['dr', 'in']], pulse: ['n'] },
      ],
      takeaway: "Кнопки → движение → рисунок → снова. ¦ Tugmalar → harakat → rasm → yana. ¦ Input → update → draw → repeat.",
      notes: { min: 4 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "На чём делают известные игры ¦ Mashhur o'yinlar nimada yasaladi ¦ What famous games are built with",
      chat: "на чём бы вы хотели сделать игру? ¦ o'yinni nimada yasashni xohlardingiz? ¦ what would you build a game with?",
      actors: [
        { id: 'rb', icon: '🟥', label: 'Roblox' },
        { id: 'mc', icon: '⛏️', label: 'Minecraft' },
        { id: 'un', icon: '🎲', label: 'Unity' },
        { id: 'l1', text: 'Luau' },
        { id: 'l2', text: 'Java · C++' },
        { id: 'l3', text: 'C#' },
      ],
      steps: [
        { say: "Roblox Studio: свои миры пишут на языке Luau (это версия Lua). ¦ Roblox Studio: o'z dunyolarini Luau tilida yozishadi (bu Lua versiyasi). ¦ Roblox Studio: worlds are scripted in Luau, a version of Lua.", at: { rb: [16, 34, 1.2], l1: [16, 74] }, lines: [['rb', 'l1']], pulse: ['rb'] },
        { say: "Minecraft: Java Edition написана на Java, Bedrock — на C++. ¦ Minecraft: Java Edition Java'da, Bedrock — C++'da yozilgan. ¦ Minecraft: Java Edition is written in Java, Bedrock in C++.", at: { mc: [50, 34, 1.2], l2: [50, 74] }, lines: [['rb', 'l1'], ['mc', 'l2']], pulse: ['mc'] },
        { say: "Unity — движок для тысяч игр, скрипты на C#. ¦ Unity — minglab o'yinlar uchun dvijok, skriptlar C#'da. ¦ Unity powers thousands of games; scripts are in C#.", at: { un: [84, 34, 1.2], l3: [84, 74] }, lines: [['rb', 'l1'], ['mc', 'l2'], ['un', 'l3']], pulse: ['un'] },
      ],
      takeaway: "Движок рисует, считает физику и звук — вы пишете правила игры. ¦ Dvijok chizadi, fizika va tovushni hisoblaydi — siz o'yin qoidalarini yozasiz. ¦ The engine handles drawing, physics and sound — you write the game's rules.",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Кто это делает в команде игры? ¦ O'yin jamoasida buni kim qiladi? ¦ Who does this on a game team?",
      chat: "пишите: «1 — программист» ¦ yozing: «1 — dasturchi» ¦ write: “1 — programmer”",
      zones: [
        { id: 'code', label: "Программист ¦ Dasturchi ¦ Programmer", icon: '💻' },
        { id: 'art', label: "Художник ¦ Rassom ¦ Artist", icon: '🎨' },
        { id: 'gd', label: "Геймдизайнер ¦ Geymdizayner ¦ Game designer", icon: '🧠' },
      ],
      items: [
        { text: "+1 очко за монету ¦ Tanga uchun +1 ochko ¦ +1 point per coin", zone: 'code' },
        { text: "Нарисовать лису ¦ Tulkini chizish ¦ Draw the fox", zone: 'art' },
        { text: "Придумать уровни и правила ¦ Bosqichlar va qoidalarni o'ylab topish ¦ Invent levels and rules", zone: 'gd' },
        { text: "Прыжок по пробелу ¦ Probel bilan sakrash ¦ Jump on space", zone: 'code' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Игру делает один человек ¦ O'yinni bitta odam yasaydi ¦ One person makes a game", truth: false, explain: "Обычно команда, но маленькие игры делают и в одиночку. ¦ Odatda jamoa, lekin kichik o'yinlarni yolg'iz ham qilishadi. ¦ Usually a team, though small games can be solo." },
        { text: "Плавное движение — это много кадров подряд ¦ Silliq harakat — bu ketma-ket ko'p kadrlar ¦ Smooth motion is many frames in a row", truth: true, explain: "Как мультфильм. ¦ Multfilm kabi. ¦ Like a cartoon." },
        { text: "В Roblox можно программировать самому ¦ Roblox'da o'zing dasturlash mumkin ¦ You can program in Roblox yourself", truth: true, explain: "В Roblox Studio на Luau. ¦ Roblox Studio'da Luau'da. ¦ In Roblox Studio with Luau." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: свой мини-уровень ¦ Missiya: o'z mini-bosqiching ¦ Mission: your own mini level",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Уровень работает! ¦ Bosqich ishlaydi! ¦ The level works!",
      items: [
        { title: "Как сдвинуть героя вправо? ¦ Qahramonni o'ngga qanday siljitish mumkin? ¦ How to move a hero right?", choices: ["Увеличить x ¦ x ni oshirish ¦ Increase x", "Увеличить очки ¦ Ochkolarni oshirish ¦ Increase the score"], correct: 0, explain: "x — положение по горизонтали. ¦ x — gorizontal holat. ¦ x is horizontal position." },
        { title: "На каком языке скрипты в Unity? ¦ Unity'da skriptlar qaysi tilda? ¦ Unity's scripting language?", choices: ['C#', 'HTML'], correct: 0, explain: "Unity использует C#. ¦ Unity C#'dan foydalanadi. ¦ Unity uses C#." },
        { title: "Что идёт после «нарисовать кадр»? ¦ «Kadr chizish»dan keyin nima keladi? ¦ What comes after “draw”?", choices: ["Снова проверить кнопки ¦ Yana tugmalarni tekshirish ¦ Check input again", "Игра заканчивается ¦ O'yin tugaydi ¦ The game ends"], correct: 0, explain: "Это цикл. ¦ Bu sikl. ¦ It's a loop." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: как устроены игры ¦ Xulosa: o'yinlar qanday tuzilgan ¦ Summary: how games work",
      chat: "какую игру вы бы сделали первой? ¦ birinchi qaysi o'yinni yasagan bo'lardingiz? ¦ which game would you make first?",
      answer: "Игра — это игровой цикл, который крутится около 60 раз в секунду: проверить кнопки → сдвинуть героев и посчитать очки → нарисовать кадр. Каждый кадр — просто новые числа x, y и очков. Движок берёт на себя графику, физику и звук: в Roblox пишут на Luau, Minecraft сделан на Java и C++, а в Unity скрипты на C#. ¦ O'yin — soniyasiga 60 martaga yaqin aylanadigan o'yin sikli: tugmalarni tekshirish → qahramonlarni siljitish va ochkolarni hisoblash → kadr chizish. Har bir kadr — shunchaki x, y va ochkolarning yangi raqamlari. Dvijok grafika, fizika va tovushni o'z zimmasiga oladi: Roblox'da Luau'da yozishadi, Minecraft Java va C++'da yasalgan, Unity'da esa skriptlar C#'da. ¦ A game is a loop running about 60 times a second: check input → move characters and count points → draw a frame. Each frame is just new numbers for x, y and score. The engine handles graphics, physics and sound: Roblox uses Luau, Minecraft is built with Java and C++, and Unity scripts are in C#.",
      icon: '🎮',
      badge: "Будущий геймдев ¦ Kelajakdagi geymdev ¦ Future game dev",
      badgeSub: "Tilda · Git · общая 2 ¦ Tilda · Git · umumiy 2 ¦ Tilda · Git · general 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Опишите игровой цикл любимой игры: кнопки, движение, кадр. ¦ Sevimli o'yiningizning o'yin siklini tasvirlang: tugmalar, harakat, kadr. ¦ Describe your favourite game's loop: input, update, draw.",
        "Откройте Roblox Studio или Scratch и сдвиньте героя по кнопке. ¦ Roblox Studio yoki Scratch'ni oching va qahramonni tugma bilan siljiting. ¦ Open Roblox Studio or Scratch and move a hero with a key.",
      ],
      takeaway: "Дальше: как 100 программистов пишут одно приложение. ¦ Keyingisi: 100 dasturchi bitta ilovani qanday yozadi. ¦ Next: how 100 programmers write one app.",
      notes: { min: 2 },
    },
  ],
});
