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

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.sc{position:relative;width:420px;height:330px;border-radius:20px;background:linear-gradient(#cfe8ff,#eef7ff);overflow:hidden;box-shadow:0 10px 30px #0001}
.gr{position:absolute;left:0;right:0;bottom:0;height:30px;background:#7bc96f}
.ball{position:absolute;left:180px;width:60px;height:60px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#ffb199,#f2573a);transition:bottom .6s cubic-bezier(.3,.7,.4,1)}
.vy{position:absolute;right:14px;top:12px;padding:6px 12px;border-radius:10px;background:#16181f;color:#fff;font:800 16px JetBrains Mono,monospace}
.ar{position:absolute;left:250px;font-size:34px}`;
const sc = (y: number, vy: string, arrow: string) => `<div class="wrap"><div class="sc"><div class="gr"></div><div class="ball" style="bottom:${30 + y}px"></div><span class="ar" style="bottom:${40 + y}px">${arrow}</span><span class="vy">y=${y} · vy=${vy}</span></div></div>`;

export default kit({
  id: 'react-g02',
  title: "Как в играх работают физика и гравитация ¦ O'yinlarda fizika va gravitatsiya qanday ishlaydi ¦ How physics and gravity work in games",
  question: "Почему персонаж в игре прыгает плавно, а потом падает всё быстрее? ¦ Nega o'yindagi qahramon silliq sakraydi, keyin esa tobora tezroq tushadi? ¦ Why does a game character jump smoothly and then fall faster and faster?",
  route: ["Гравитация ¦ Gravitatsiya ¦ Gravity", "Прыжок ¦ Sakrash ¦ The jump", "Отскок ¦ Sakrab qaytish ¦ Bouncing", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🏀',
      kicker: "React · общая тема 2 ¦ React · umumiy mavzu 2 ¦ React · general topic 2",
      title: "Две цифры управляют прыжком ¦ Ikki raqam sakrashni boshqaradi ¦ Two numbers control a jump",
      chat: "в какой игре самые классные прыжки? ¦ qaysi o'yinda eng zo'r sakrashlar bor? ¦ which game has the best jumps?",
      lead: "У персонажа есть высота (y) и скорость (vy). Каждый кадр гравитация чуть уменьшает скорость, а скорость меняет высоту. Из этих двух строчек получается настоящий прыжок. ¦ Qahramonning balandligi (y) va tezligi (vy) bor. Har kadrda gravitatsiya tezlikni biroz kamaytiradi, tezlik esa balandlikni o'zgartiradi. Shu ikki qatordan haqiqiy sakrash hosil bo'ladi. ¦ A character has a height (y) and a speed (vy). Every frame gravity reduces the speed a little, and the speed changes the height. Those two lines make a real jump.",
      facts: ["vy = vy − gravity ¦ vy = vy − gravity ¦ vy = vy − gravity", "y = y + vy ¦ y = y + vy ¦ y = y + vy", "Земля: y не меньше 0 ¦ Yer: y 0 dan kam emas ¦ Ground: y never below 0"],
      takeaway: "Смотрим прыжок кадр за кадром. ¦ Sakrashni kadrma-kadr ko'ramiz. ¦ Watch a jump frame by frame.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Прыжок по кадрам ¦ Kadrlar bo'yicha sakrash ¦ A jump, frame by frame",
      chat: "в какой момент скорость равна нулю? ¦ qaysi paytda tezlik nolga teng? ¦ when is the speed zero?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: '// jump!\nvy = 14;', line: 2, html: sc(0, '14', '⬆️'), say: "Нажали «прыжок» — дали скорость вверх 14. ¦ «Sakrash» bosildi — yuqoriga 14 tezlik berdik. ¦ Press jump: an upward speed of 14." },
        { code: 'vy = vy - gravity; // 14 → 8\ny = y + vy;', line: 1, html: sc(120, '8', '⬆️'), say: "Мяч летит вверх, но гравитация каждый кадр отнимает скорость. ¦ To'p yuqoriga uchadi, lekin gravitatsiya har kadrda tezlikni kamaytiradi. ¦ The ball rises, but gravity takes speed away each frame." },
        { code: '// top: vy = 0', html: sc(165, '0', '⏸️'), say: "Наверху скорость 0 — мяч на миг «зависает». ¦ Tepada tezlik 0 — to'p bir lahza «osilib qoladi». ¦ At the top the speed is 0 — the ball hangs for a moment." },
        { code: 'vy = vy - gravity; // 0 → -8\ny = y + vy;', line: 1, html: sc(80, '-8', '⬇️'), say: "Скорость стала минусом — мяч падает, и всё быстрее! ¦ Tezlik minus bo'ldi — to'p tushadi va tobora tezroq! ¦ The speed goes negative — the ball falls, faster and faster!" },
        { code: 'if (y < 0) { y = 0; }', line: 1, html: sc(0, '-14', '💥'), say: "Коснулся земли — y не даём уйти ниже 0. ¦ Yerga tegdi — y ni 0 dan pastga tushirmaymiz. ¦ It hits the ground — y can't go below 0." },
      ],
      takeaway: "Гравитация меняет скорость, скорость меняет высоту. ¦ Gravitatsiya tezlikni, tezlik esa balandlikni o'zgartiradi. ¦ Gravity changes speed; speed changes height.",
      notes: { min: 6 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Отскок: мяч прыгает всё ниже ¦ Sakrab qaytish: to'p tobora pastroq sakraydi ¦ Bouncing: each hop is lower",
      chat: "что будет, если bounce = 1? ¦ bounce = 1 bo'lsa nima bo'ladi? ¦ what if bounce = 1?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: 'if (y < 0) {\n  y = 0;\n  vy = -vy * bounce; // 0.6\n}', line: 3, html: sc(100, '8.4', '⬆️'), say: "При ударе скорость переворачивается и теряет 40% — мяч отскакивает ниже. ¦ Zarbada tezlik ag'dariladi va 40% ini yo'qotadi — to'p pastroq sakraydi. ¦ On impact the speed flips and loses 40% — a lower bounce." },
        { code: '// bounce again', html: sc(36, '5', '⬆️'), say: "Ещё отскок — ещё ниже. ¦ Yana sakrash — yana pastroq. ¦ Another bounce, lower again." },
        { code: 'if (Math.abs(vy) < 1) vy = 0;', line: 1, html: sc(0, '0', '😴'), say: "Скорость совсем маленькая — останавливаем мяч. ¦ Tezlik juda kichik — to'pni to'xtatamiz. ¦ The speed is tiny, so stop the ball." },
      ],
      takeaway: "bounce = 1 — прыгает вечно, 0 — сразу «прилипает», 0.6 — как настоящий мяч. ¦ bounce = 1 — abadiy sakraydi, 0 — darhol «yopishadi», 0.6 — haqiqiy to'pdek. ¦ bounce = 1 bounces forever, 0 sticks at once, 0.6 feels like a real ball.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 3,
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
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Больше gravity — короче и ниже прыжок ¦ gravity ko'proq — sakrash qisqaroq va pastroq ¦ More gravity means a shorter, lower jump", truth: true, explain: "Скорость гаснет быстрее. ¦ Tezlik tezroq so'nadi. ¦ Speed fades faster." },
        { text: "В играх физика всегда как в жизни ¦ O'yinlarda fizika doim hayotdagidek ¦ Game physics always matches real life", truth: false, explain: "Числа подбирают, чтобы было весело. ¦ Raqamlar qiziqarli bo'lishi uchun tanlanadi. ¦ Numbers are tuned to feel fun." },
        { text: "Физика считается каждый кадр ¦ Fizika har kadrda hisoblanadi ¦ Physics is calculated every frame", truth: true, explain: "Около 60 раз в секунду. ¦ Soniyasiga 60 martaga yaqin. ¦ About 60 times a second." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: настроить прыжок ¦ Missiya: sakrashni sozlash ¦ Mission: tune the jump",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Прыжок ощущается классно! ¦ Sakrash zo'r seziladi! ¦ The jump feels great!",
      items: [
        { title: "Прыжок на Луне (слабая гравитация) ¦ Oydagi sakrash (zaif gravitatsiya) ¦ A jump on the Moon (weak gravity)", choices: ['gravity = 0.1', 'gravity = 3'], correct: 0, explain: "Меньше гравитация — выше и дольше. ¦ Gravitatsiya kamroq — balandroq va uzoqroq. ¦ Less gravity, higher and longer." },
        { title: "Мяч должен прыгать как резиновый ¦ To'p rezinadek sakrashi kerak ¦ The ball should bounce like rubber", choices: ['bounce = 0.9', 'bounce = 0'], correct: 0, explain: "Почти не теряет скорость. ¦ Tezlikni deyarli yo'qotmaydi. ¦ It barely loses speed." },
        { title: "Персонаж провалился под землю ¦ Qahramon yer ostiga tushib ketdi ¦ The character fell through the floor", choices: ['if (y < 0) y = 0', 'vy = vy + 1'], correct: 0, explain: "Проверка столкновения с землёй. ¦ Yer bilan to'qnashuvni tekshirish. ¦ A ground collision check." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: физика в играх ¦ Xulosa: o'yinlarda fizika ¦ Summary: game physics",
      chat: "какую гравитацию поставите в своей игре? ¦ o'yiningizda qanday gravitatsiya qo'yasiz? ¦ what gravity will your game use?",
      answer: "Игровая физика — это несколько чисел и строк, которые считаются каждый кадр: гравитация уменьшает скорость (vy = vy − gravity), скорость меняет высоту (y = y + vy), а проверка земли не даёт провалиться и делает отскок (vy = −vy × bounce). Меняя gravity и bounce, можно сделать прыжок как на Луне или как у резинового мяча. ¦ O'yin fizikasi — har kadrda hisoblanadigan bir nechta raqam va qator: gravitatsiya tezlikni kamaytiradi (vy = vy − gravity), tezlik balandlikni o'zgartiradi (y = y + vy), yer tekshiruvi esa tushib ketishga yo'l qo'ymaydi va sakrab qaytishni yasaydi (vy = −vy × bounce). gravity va bounce'ni o'zgartirib, sakrashni Oydagidek yoki rezina to'pdek qilish mumkin. ¦ Game physics is a few numbers and lines computed each frame: gravity reduces speed (vy = vy − gravity), speed changes height (y = y + vy), and a ground check stops you falling through and makes a bounce (vy = −vy × bounce). Tweak gravity and bounce to jump like on the Moon or like a rubber ball.",
      icon: '🏀',
      badge: "Физик игр ¦ O'yin fizigi ¦ Game physicist",
      badgeSub: "React · общая 2 ¦ React · umumiy 2 ¦ React · general 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте в демо «лунную» и «юпитерскую» гравитацию. ¦ Demoda «oy» va «yupiter» gravitatsiyasini yasang. ¦ Make “Moon” and “Jupiter” gravity in the demo.",
        "Добавьте второй мяч с другим bounce. ¦ Boshqa bounce'li ikkinchi to'pni qo'shing. ¦ Add a second ball with a different bounce.",
      ],
      takeaway: "Дальше: как работают вирусы и антивирусы. ¦ Keyingisi: viruslar va antiviruslar qanday ishlaydi. ¦ Next: how viruses and antivirus software work.",
      notes: { min: 2 },
    },
  ],
});
