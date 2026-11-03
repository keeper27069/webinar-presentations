import { kit } from '@engine/kit';

const HTML = `<div class="world"><div id="ball">🏀</div><div class="ground"></div></div><div class="ui"><button id="jump">⬆️ Jump</button><span id="info"></span></div>`;
const CSS = `body{margin:0;font-family:system-ui;background:#0f1633;color:#fff}
.world{position:relative;height:300px;margin:10px;border-radius:16px;background:linear-gradient(#25356f,#101a3f);overflow:hidden}
#ball{position:absolute;left:46%;font-size:48px;line-height:1}
.ground{position:absolute;left:0;right:0;bottom:0;height:20px;background:#2e9d5b}
.ui{display:flex;gap:16px;align-items:center;justify-content:center}
button{padding:10px 18px;border:0;border-radius:10px;background:#ff6f91;color:#fff;font-weight:800;font-size:18px}
#info{font-family:monospace;font-size:16px;color:#b9c2ff}`;
const JS = `let y = 0;          // height above ground, px
let vy = 0;         // vertical speed, px per frame
const gravity = 0.6;
const bounce = 0.6; // keeps 60% of speed on landing

const ball = document.querySelector('#ball');
document.querySelector('#jump').onclick = () => { vy = 14; };

function frame() {
  vy = vy - gravity;      // 1. gravity changes speed
  y = y + vy;             // 2. speed changes position
  if (y < 0) {            // 3. collision with the ground
    y = 0;
    vy = -vy * bounce;
    if (Math.abs(vy) < 1) vy = 0;
  }
  ball.style.bottom = 20 + y + 'px';   // 4. draw
  document.querySelector('#info').textContent =
    'y=' + y.toFixed(0) + '  vy=' + vy.toFixed(1);
  requestAnimationFrame(frame);
}
frame();`;

export default kit({
  id: 'react-g02',
  title: "Как в играх работают физика и гравитация ¦ O'yinlarda fizika va gravitatsiya qanday ishlaydi ¦ How physics and gravity work in games",
  question: "Как игра понимает, что мяч должен упасть, отскочить или остановиться? ¦ O'yin to'p tushishi, sakrashi yoki to'xtashi kerakligini qanday tushunadi? ¦ How does a game know a ball should fall, bounce or stop?",
  route: ["Кадры ¦ Kadrlar ¦ Frames", "Скорость и гравитация ¦ Tezlik va gravitatsiya ¦ Speed and gravity", "Столкновения ¦ To'qnashuvlar ¦ Collisions", "Связь с React ¦ React bilan bog'liqlik ¦ The React link", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🏀',
      kicker: "React · общая тема 2 ¦ React · umumiy mavzu 2 ¦ React · general topic 2",
      title: "Мультик из чисел ¦ Raqamlardan multfilm ¦ A cartoon made of numbers",
      chat: "в какой игре вам нравится физика? ¦ qaysi o'yinda fizika sizga yoqadi? ¦ which game's physics do you like?",
      lead: "В игре нет настоящей гравитации. Каждый кадр программа немного меняет числа — скорость и позицию — и заново рисует экран. 60 таких кадров в секунду наш глаз видит как плавное движение. ¦ O'yinda haqiqiy gravitatsiya yo'q. Har kadrda dastur raqamlarni — tezlik va pozitsiyani — biroz o'zgartiradi va ekranni qaytadan chizadi. Soniyasiga 60 ta shunday kadrni ko'zimiz silliq harakat sifatida ko'radi. ¦ There's no real gravity in a game. Each frame the program nudges numbers — speed and position — and redraws the screen. Sixty such frames a second look like smooth motion.",
      facts: ["Позиция — где объект ¦ Pozitsiya — obyekt qayerda ¦ Position: where it is", "Скорость — куда и как быстро ¦ Tezlik — qayerga va qanchalik tez ¦ Velocity: where and how fast", "Гравитация — уменьшает скорость вверх ¦ Gravitatsiya — yuqoriga tezlikni kamaytiradi ¦ Gravity: drains upward speed"],
      takeaway: "Изменили данные → перерисовали экран. Так же работает React. ¦ Ma'lumotni o'zgartirdik → ekranni qayta chizdik. React ham shunday ishlaydi. ¦ Change the data → redraw the screen. React works the same way.",
      notes: { min: 3 },
    },
    {
      type: 'predict',
      stage: 0,
      title: "Сколько кадров в секунду? ¦ Soniyasiga nechta kadr? ¦ How many frames per second?",
      chat: "ваш прогноз — число! ¦ bashoratingiz — raqam! ¦ your guess — a number!",
      label: "Сколько раз в секунду обычно обновляется экран в игре на телефоне? ¦ Telefondagi o'yinda ekran soniyasiga odatda necha marta yangilanadi? ¦ How many times a second does a phone game usually update the screen?",
      min: 0,
      max: 240,
      answer: 60,
      unit: "кадров ¦ kadr ¦ frames",
      result: "Обычно 60 кадров в секунду (FPS), на игровых экранах — 120 и больше. Значит, физика пересчитывается каждые ~16 мс. ¦ Odatda soniyasiga 60 kadr (FPS), o'yin ekranlarida — 120 va undan ko'p. Demak, fizika har ~16 ms da qayta hisoblanadi. ¦ Usually 60 FPS, 120+ on gaming screens. So physics is recalculated every ~16 ms.",
      takeaway: "Меньше 30 FPS — игра «тормозит». ¦ 30 FPS dan kam — o'yin «qotadi». ¦ Under 30 FPS a game feels laggy.",
      notes: { min: 3 },
    },
    {
      type: 'flow',
      stage: 1,
      title: "Один кадр физики ¦ Fizikaning bitta kadri ¦ One physics frame",
      chat: "что будет, если убрать шаг 3? ¦ 3-qadamni olib tashlasak nima bo'ladi? ¦ what if we remove step 3?",
      nodes: [
        { icon: '⬇️', label: "Гравитация ¦ Gravitatsiya ¦ Gravity", text: "vy = vy − gravity ¦ vy = vy − gravity ¦ vy = vy − gravity" },
        { icon: '➡️', label: "Движение ¦ Harakat ¦ Move", text: "y = y + vy ¦ y = y + vy ¦ y = y + vy" },
        { icon: '💥', label: "Столкновение ¦ To'qnashuv ¦ Collide", text: "Ушли под землю? Вернуть на землю и отскочить. ¦ Yer ostiga tushdikmi? Yerga qaytarish va sakratish. ¦ Below ground? Put it back and bounce." },
        { icon: '🖼️', label: "Рисуем ¦ Chizamiz ¦ Draw", text: "Ставим мяч на новую высоту. ¦ To'pni yangi balandlikka qo'yamiz. ¦ Place the ball at its new height." },
      ],
      takeaway: "Без шага 3 мяч провалится сквозь землю — классический баг игр. ¦ 3-qadamsiz to'p yerdan o'tib ketadi — o'yinlarning klassik xatosi. ¦ Without step 3 the ball falls through the floor — a classic game bug.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 1,
      title: "Прыгающий мяч ¦ Sakraydigan to'p ¦ A bouncing ball",
      chat: "какую гравитацию поставим? Луна — 0.1! ¦ qanday gravitatsiya qo'yamiz? Oy — 0.1! ¦ what gravity shall we use? The Moon is 0.1!",
      task: "✍️ Меняйте gravity и bounce, затем ▶ ¦ ✍️ gravity va bounce'ni o'zgartiring, keyin ▶ ¦ ✍️ Change gravity and bounce, then ▶",
      steps: [
        { label: "Физика ¦ Fizika ¦ Physics", html: HTML, css: CSS, js: JS },
      ],
      takeaway: "Четыре строки физики — и мяч падает, отскакивает и останавливается сам. ¦ To'rt qator fizika — va to'p o'zi tushadi, sakraydi va to'xtaydi. ¦ Four lines of physics and the ball falls, bounces and settles on its own.",
      notes: { say: ["Попросите чат: gravity 0.1 (Луна), 2 (Юпитер), bounce 1.0 (вечный мяч), 0.2 (пластилин)."], min: 8 },
    },
    {
      type: 'walk',
      stage: 2,
      title: "Сердце физики ¦ Fizika yuragi ¦ The heart of the physics",
      chat: "почему vy становится отрицательным? ¦ nega vy manfiy bo'lib qoladi? ¦ why does vy turn negative?",
      code: `vy = vy - gravity;\ny = y + vy;\nif (y < 0) {\n  y = 0;\n  vy = -vy * bounce;\n}`,
      lang: 'js',
      marks: [
        { line: 1, text: "Каждый кадр гравитация отнимает немного скорости. Мяч летит вверх всё медленнее, потом — вниз. ¦ Har kadrda gravitatsiya biroz tezlikni oladi. To'p yuqoriga tobora sekinroq uchadi, keyin — pastga. ¦ Each frame gravity removes a little speed. The ball rises slower and slower, then falls." },
        { line: 2, text: "Позиция меняется на скорость. Отрицательная скорость — движение вниз. ¦ Pozitsiya tezlikka o'zgaradi. Manfiy tezlik — pastga harakat. ¦ Position changes by velocity. Negative velocity means falling." },
        { line: 3, text: "Проверка столкновения: мяч ниже земли? ¦ To'qnashuv tekshiruvi: to'p yerdan pastdami? ¦ Collision check: is the ball below ground?" },
        { line: 5, text: "Разворачиваем скорость и теряем часть энергии — отскок. ¦ Tezlikni teskari qilamiz va energiyaning bir qismini yo'qotamiz — sakrash. ¦ Flip the speed and lose some energy — a bounce." },
      ],
      takeaway: "Скорость меняет позицию, гравитация меняет скорость. ¦ Tezlik pozitsiyani o'zgartiradi, gravitatsiya tezlikni o'zgartiradi. ¦ Velocity changes position; gravity changes velocity.",
      notes: { min: 5 },
    },
    {
      type: 'cards',
      stage: 2,
      title: "Как игры проверяют столкновения ¦ O'yinlar to'qnashuvni qanday tekshiradi ¦ How games check collisions",
      chat: "какой способ самый быстрый? ¦ qaysi usul eng tez? ¦ which method is fastest?",
      cards: [
        { icon: '⬜', front: "Прямоугольники ¦ To'rtburchaklar ¦ Boxes", back: "Каждый объект — невидимый прямоугольник. Пересеклись — столкнулись. Очень быстро. ¦ Har bir obyekt — ko'rinmas to'rtburchak. Kesishdi — to'qnashdi. Juda tez. ¦ Every object is an invisible box. Overlap means collision. Very fast." },
        { icon: '⚪', front: "Круги ¦ Doiralar ¦ Circles", back: "Расстояние между центрами меньше суммы радиусов — удар. ¦ Markazlar orasidagi masofa radiuslar yig'indisidan kichik — zarba. ¦ Centres closer than the sum of radii: hit." },
        { icon: '🔺', front: "Точная форма ¦ Aniq shakl ¦ Exact shape", back: "Проверка по многоугольникам — точнее, но дороже. ¦ Ko'pburchaklar bo'yicha tekshirish — aniqroq, lekin qimmatroq. ¦ Polygon checks: more precise, more expensive." },
        { icon: '🧱', front: "Движок ¦ Dvijok ¦ Engine", back: "Unity, Godot и другие считают физику за вас. ¦ Unity, Godot va boshqalar fizikani siz uchun hisoblaydi. ¦ Unity, Godot and others do the physics for you." },
      ],
      takeaway: "Игры часто «жульничают»: хитбокс проще, чем картинка, зато быстро. ¦ O'yinlar ko'pincha «aldaydi»: xitboks rasmdan soddaroq, lekin tez. ¦ Games often cheat: the hitbox is simpler than the picture, but fast.",
      notes: { min: 4 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "Игра и React ¦ O'yin va React ¦ A game and React",
      chat: "что в React играет роль «кадра»? ¦ React'da «kadr» rolini nima o'ynaydi? ¦ what plays the role of a “frame” in React?",
      left: { icon: '🎮', label: "Игра ¦ O'yin ¦ Game", points: ["Данные: y, vy ¦ Ma'lumot: y, vy ¦ Data: y, vy", "Каждый кадр меняем данные ¦ Har kadrda ma'lumotni o'zgartiramiz ¦ Change data every frame", "Рисуем экран из данных ¦ Ekranni ma'lumotdan chizamiz ¦ Draw the screen from data"] },
      right: { icon: '⚛️', label: 'React', points: ["Данные: состояние useState ¦ Ma'lumot: useState holati ¦ Data: useState state", "Меняем при событии (клик, ответ API) ¦ Hodisada o'zgartiramiz (bosish, API javobi) ¦ Change on events (clicks, API answers)", "React перерисовывает компонент ¦ React komponentni qayta chizadi ¦ React re-renders the component"] },
      verdict: "Одна формула: экран = функция(данные). В игре — 60 раз в секунду, в React — при каждом изменении состояния. ¦ Bitta formula: ekran = funksiya(ma'lumot). O'yinda — soniyasiga 60 marta, React'da — har bir holat o'zgarishida. ¦ One formula: screen = function(data). In a game 60 times a second; in React on every state change.",
      notes: { min: 4 },
    },
    {
      type: 'output',
      stage: 3,
      title: "Посчитайте кадры ¦ Kadrlarni hisoblang ¦ Count the frames",
      chat: "пишите ответ до того, как я покажу ¦ men ko'rsatishimdan oldin javob yozing ¦ write your answer before I reveal it",
      snippets: [
        { label: "3 кадра ¦ 3 kadr ¦ 3 frames", code: `let y = 0, vy = 6;\nconst gravity = 2;\nfor (let f = 1; f <= 3; f++) {\n  vy = vy - gravity;\n  y = y + vy;\n  console.log('frame ' + f + ': y=' + y);\n}`, output: ['frame 1: y=4', 'frame 2: y=6', 'frame 3: y=6'], explain: "vy: 4, 2, 0 — мяч поднимается всё медленнее и в 3-м кадре зависает в верхней точке. ¦ vy: 4, 2, 0 — to'p tobora sekinroq ko'tariladi va 3-kadrda eng yuqori nuqtada to'xtaydi. ¦ vy: 4, 2, 0 — the ball rises slower and hangs at the top in frame 3." },
      ],
      takeaway: "Верхняя точка прыжка — когда скорость стала 0. ¦ Sakrashning eng yuqori nuqtasi — tezlik 0 bo'lganda. ¦ The top of a jump is where the velocity hits 0.",
      notes: { say: ["Сначала ответы чата."], min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "В играх физика всегда как в реальности ¦ O'yinlarda fizika doim haqiqatdagidek ¦ Game physics always matches reality", truth: false, explain: "Прыжки в играх часто выше и «легче» — так веселее. ¦ O'yinlardagi sakrashlar ko'pincha balandroq va «yengilroq» — shunday qiziqroq. ¦ Game jumps are often higher and floatier — it's more fun." },
        { text: "Если игра тормозит, объекты могут «проскочить» стену ¦ O'yin qotsa, obyektlar devordan «sakrab o'tishi» mumkin ¦ If a game lags, objects can tunnel through walls", truth: true, explain: "За долгий кадр объект сдвинулся сразу на большое расстояние. ¦ Uzoq kadrda obyekt birdaniga katta masofaga siljiydi. ¦ In a long frame the object jumps a big distance at once." },
        { text: "Хитбокс персонажа может отличаться от картинки ¦ Personaj xitboksi rasmdan farq qilishi mumkin ¦ A character's hitbox can differ from its picture", truth: true, explain: "Обычно это простой прямоугольник или капсула. ¦ Odatda bu oddiy to'rtburchak yoki kapsula. ¦ Usually a simple box or capsule." },
      ],
      takeaway: "Игровая физика — не точная наука, а инструмент для интересной игры. ¦ O'yin fizikasi — aniq fan emas, qiziqarli o'yin uchun vosita. ¦ Game physics isn't exact science — it's a tool for fun.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Что меняет что? ¦ Nima nimani o'zgartiradi? ¦ What changes what?",
      chat: "пишите: «1 — скорость» ¦ yozing: «1 — tezlik» ¦ write: “1 — velocity”",
      zones: [
        { id: 'v', label: "Меняет скорость ¦ Tezlikni o'zgartiradi ¦ Changes velocity", icon: '💨' },
        { id: 'p', label: "Меняет позицию ¦ Pozitsiyani o'zgartiradi ¦ Changes position", icon: '📍' },
      ],
      items: [
        { text: "Гравитация ¦ Gravitatsiya ¦ Gravity", zone: 'v' },
        { text: "Скорость ¦ Tezlik ¦ Velocity", zone: 'p' },
        { text: "Нажатие «прыжок» ¦ «Sakrash» bosilishi ¦ Pressing jump", zone: 'v', why: "Прыжок задаёт скорость вверх, а уже она поднимает мяч. ¦ Sakrash yuqoriga tezlik beradi, u esa to'pni ko'taradi. ¦ A jump sets upward velocity, which then lifts the ball." },
        { text: "Отскок от земли ¦ Yerdan sakrash ¦ Bouncing off the ground", zone: 'v' },
      ],
      takeaway: "Почти все силы меняют скорость, а позицию меняет только сама скорость. ¦ Deyarli barcha kuchlar tezlikni o'zgartiradi, pozitsiyani esa faqat tezlikning o'zi o'zgartiradi. ¦ Almost every force changes velocity; only velocity changes position.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: платформер ¦ Missiya: platformer ¦ Mission: a platformer",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Герой прыгает как надо! ¦ Qahramon kerakdek sakraydi! ¦ The hero jumps just right!",
      items: [
        { title: "Прыжки слишком высокие ¦ Sakrashlar juda baland ¦ Jumps are too high", choices: ["Увеличить gravity ¦ gravity'ni oshirish ¦ Increase gravity", "Увеличить vy прыжка ¦ Sakrash vy'ini oshirish ¦ Increase the jump vy"], correct: 0, explain: "Больше гравитация — ниже прыжок. ¦ Gravitatsiya ko'p — sakrash past. ¦ More gravity, lower jumps." },
        { title: "Герой провалился под пол ¦ Qahramon poldan tushib ketdi ¦ The hero fell through the floor", choices: ["Нет проверки столкновения ¦ To'qnashuv tekshiruvi yo'q ¦ No collision check", "Слишком яркий фон ¦ Fon juda yorqin ¦ The background is too bright"], correct: 0, explain: "if (y < 0) { y = 0 } ¦ if (y < 0) { y = 0 } ¦ if (y < 0) { y = 0 }" },
        { title: "Мяч прыгает вечно ¦ To'p abadiy sakraydi ¦ The ball bounces forever", choices: ['bounce = 1', 'bounce = 0.5'], correct: 0, explain: "1 — энергия не теряется. ¦ 1 — energiya yo'qolmaydi. ¦ 1 means no energy is lost." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: игровая физика ¦ Xulosa: o'yin fizikasi ¦ Summary: game physics",
      chat: "какую физику вы бы добавили в свою игру? ¦ o'yiningizga qanday fizika qo'shgan bo'lardingiz? ¦ what physics would you add to your game?",
      answer: "Игра 60 раз в секунду повторяет кадр: гравитация меняет скорость, скорость меняет позицию, проверка столкновений не пускает объект сквозь пол, а затем экран перерисовывается. Отскок — развернуть скорость и потерять часть энергии. Это та же формула, что в React: экран = функция(данные), только React обновляет экран при изменении состояния. ¦ O'yin soniyasiga 60 marta kadrni takrorlaydi: gravitatsiya tezlikni o'zgartiradi, tezlik pozitsiyani o'zgartiradi, to'qnashuv tekshiruvi obyektni poldan o'tkazmaydi, keyin ekran qayta chiziladi. Sakrash — tezlikni teskari qilish va energiyaning bir qismini yo'qotish. Bu React'dagi formula: ekran = funksiya(ma'lumot), faqat React ekranni holat o'zgarganda yangilaydi. ¦ A game repeats a frame 60 times a second: gravity changes velocity, velocity changes position, a collision check stops things passing through the floor, then the screen redraws. A bounce flips the velocity and loses some energy. It's React's formula too — screen = function(data) — except React redraws when state changes.",
      icon: '🏀',
      badge: "Физик игр ¦ O'yin fizigi ¦ Game physicist",
      badgeSub: "React · общая 2 ¦ React · umumiy 2 ¦ React · general 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте мячу движение по горизонтали (x, vx) и отскок от стен. ¦ To'pga gorizontal harakat (x, vx) va devorlardan sakrashni qo'shing. ¦ Give the ball horizontal motion (x, vx) and wall bounces.",
        "Сделайте кнопки «Луна» и «Юпитер», меняющие гравитацию. ¦ Gravitatsiyani o'zgartiradigan «Oy» va «Yupiter» tugmalarini yarating. ¦ Add “Moon” and “Jupiter” buttons that change gravity.",
      ],
      takeaway: "Следующая тема — вирусы и антивирусы: как защитить себя и свой проект. ¦ Keyingi mavzu — viruslar va antiviruslar: o'zingizni va loyihangizni qanday himoya qilish. ¦ Next: viruses and antivirus — protecting yourself and your project.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
