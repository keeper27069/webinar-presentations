import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#10142e;color:#fff}
.game{max-width:520px;margin:10px auto;text-align:center}
.field{position:relative;height:120px;background:linear-gradient(#1d2a5c,#14204a);border-radius:16px;margin:12px 0;overflow:hidden}
.hero,.enemy{position:absolute;top:36px;font-size:44px;transition:left .3s}
.state{font-size:26px;font-weight:800;margin:6px 0}
input{width:100%}
.hp{font-size:18px;color:#b9c2ff}`;
const JS = `const { useState } = React;

// The enemy's "brain": a state machine
function decide(distance, hp) {
  if (hp < 30) return 'flee';
  if (distance < 2) return 'attack';
  if (distance < 6) return 'chase';
  return 'patrol';
}

const LOOK = {
  patrol: '🚶 Patrol',
  chase: '🏃 Chase',
  attack: '⚔️ Attack',
  flee: '🏳️ Flee',
};

function App() {
  const [distance, setDistance] = useState(8);
  const [hp, setHp] = useState(100);
  const state = decide(distance, hp);

  return (
    <div className="game">
      <div className="field">
        <span className="hero" style={{ left: '20px' }}>🧑‍🚀</span>
        <span className="enemy" style={{ left: 40 + distance * 45 + 'px' }}>👾</span>
      </div>
      <div className="state">{LOOK[state]}</div>
      <label>Distance: {distance}
        <input type="range" min="0" max="10" value={distance}
          onChange={(e) => setDistance(Number(e.target.value))} />
      </label>
      <label className="hp">Enemy HP: {hp}
        <input type="range" min="0" max="100" value={hp}
          onChange={(e) => setHp(Number(e.target.value))} />
      </label>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.st{display:grid;gap:10px;width:420px}
.s{display:flex;align-items:center;gap:14px;padding:12px 18px;border-radius:14px;background:#fff;box-shadow:0 4px 14px #0001;font-size:20px;font-weight:800;opacity:.4}
.s b{font-size:34px}.s.on{opacity:1;outline:3px solid #0ea5d9;scale:1.04}`;
const ST: [string, string, string][] = [['patrol', '🚶', 'Patrol'], ['chase', '🏃', 'Chase'], ['attack', '⚔️', 'Attack'], ['search', '❓', 'Search']];
const states = (on: string) => `<div class="wrap"><div class="st">${ST.map(([k, e, n]) => `<div class="s ${k === on ? 'on' : ''}"><b>${e}</b>${n}</div>`).join('')}</div></div>`;
const SM = "if (dist < 2)        state = 'attack';\nelse if (dist < 6)   state = 'chase';\nelse if (lostPlayer) state = 'search';\nelse                 state = 'patrol';";

export default kit({
  id: 'react-g01',
  title: "Как «думают» враги в играх ¦ O'yinlarda dushmanlar qanday «o'ylaydi» ¦ How game enemies “think”",
  question: "Откуда враг в игре знает, когда гнаться за вами, а когда сдаться? ¦ O'yindagi dushman qachon sizni quvishni, qachon taslim bo'lishni qayerdan biladi? ¦ How does a game enemy know when to chase you and when to give up?",
  route: ["Режимы ¦ Rejimlar ¦ Modes", "В игре ¦ O'yinda ¦ In the game", "Код ¦ Kod ¦ The code", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '👾',
      kicker: "React · общая тема 1 ¦ React · umumiy mavzu 1 ¦ React · general topic 1",
      title: "У врага есть «настроения» ¦ Dushmanning «kayfiyatlari» bor ¦ Enemies have “moods”",
      chat: "какой враг в играх кажется вам самым умным? ¦ o'yinlarda qaysi dushman sizga eng aqlli tuyuladi? ¦ which game enemy seems smartest to you?",
      lead: "Враг не думает, как человек. У него есть несколько режимов — патруль, погоня, атака, поиск — и простые правила, когда переключаться. Это называется «машина состояний». ¦ Dushman odam kabi o'ylamaydi. Uning bir nechta rejimi bor — patrul, quvish, hujum, qidiruv — va qachon almashish haqida oddiy qoidalar. Bu «holatlar mashinasi» deb ataladi. ¦ Enemies don't think like people. They have a few modes — patrol, chase, attack, search — and simple rules for switching. That's called a “state machine”.",
      facts: ["Режим = что делаю сейчас ¦ Rejim = hozir nima qilyapman ¦ Mode = what I'm doing now", "Правило = когда менять ¦ Qoida = qachon almashtirish ¦ Rule = when to switch", "Проверка каждый кадр ¦ Har kadrda tekshiruv ¦ Checked every frame"],
      takeaway: "Смотрим на врага в деле. ¦ Dushmanni amalda ko'ramiz. ¦ Let's watch an enemy in action.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Охранник и игрок ¦ Qo'riqchi va o'yinchi ¦ The guard and the player",
      chat: "что сделает охранник, если вы спрячетесь? ¦ yashirinib olsangiz qo'riqchi nima qiladi? ¦ what will the guard do if you hide?",
      actors: [
        { id: 'e', icon: '👾', label: "Патруль ¦ Patrul ¦ Patrol" },
        { id: 'p', icon: '🧑', label: "Игрок ¦ O'yinchi ¦ Player" },
        { id: 'box', icon: '📦', label: "Укрытие ¦ Panoh ¦ Cover" },
        { id: 'eye', text: "👁️ 6 m" },
      ],
      steps: [
        { say: "Охранник ходит туда-сюда — режим «патруль». ¦ Qo'riqchi u yoqdan-bu yoqqa yuradi — «patrul» rejimi. ¦ The guard walks back and forth — patrol mode.", at: { e: [20, 40], p: [90, 80], box: [60, 82], eye: [20, 14] } },
        { say: "Патрулирует дальше… ¦ Patrulni davom ettiradi… ¦ Still patrolling…", at: { e: [44, 40], eye: [44, 14] } },
        { say: "Игрок подошёл ближе 6 метров — «Вижу!». Режим «погоня». ¦ O'yinchi 6 metrdan yaqin keldi — «Ko'ryapman!». «Quvish» rejimi. ¦ The player comes within 6 m — “I see you!” Chase mode.", at: { p: [70, 52] }, set: { e: { icon: '😠', label: "Погоня! ¦ Quvish! ¦ Chase!" } }, lines: [['e', 'p', '5 m']], pulse: ['e'] },
        { say: "Совсем рядом — режим «атака». ¦ Juda yaqin — «hujum» rejimi. ¦ Right next to them — attack mode.", at: { e: [62, 48] }, set: { e: { icon: '⚔️', label: "Атака! ¦ Hujum! ¦ Attack!" } }, lines: [['e', 'p', '1 m']] },
        { say: "Игрок спрятался за ящиком — враг потерял его: «поиск». ¦ O'yinchi quti ortiga yashirindi — dushman uni yo'qotdi: «qidiruv». ¦ The player hides behind a crate — the enemy loses them: search.", at: { p: [62, 90, 0.8], e: [40, 44] }, set: { e: { icon: '🤔', label: "Поиск… ¦ Qidiruv… ¦ Searching…" } } },
        { say: "Никого не нашёл — снова патруль. ¦ Hech kimni topmadi — yana patrul. ¦ Found nobody — back to patrol.", at: { e: [20, 40] }, set: { e: { icon: '👾', label: "Патруль ¦ Patrul ¦ Patrol" } } },
      ],
      takeaway: "Патруль → погоня → атака → поиск → патруль. Всего 4 режима — а выглядит умно! ¦ Patrul → quvish → hujum → qidiruv → patrul. Atigi 4 ta rejim — lekin aqlli ko'rinadi! ¦ Patrol → chase → attack → search → patrol. Just 4 modes, yet it looks smart!",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Правила переключения ¦ Almashish qoidalari ¦ The switching rules",
      chat: "на каком расстоянии враг начнёт погоню? ¦ dushman qaysi masofada quvishni boshlaydi? ¦ at what distance does the chase start?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: '// dist = 10\n' + SM, line: 5, html: states('patrol'), say: "Игрок далеко (10) — ни одно условие не true, остаётся патруль. ¦ O'yinchi uzoqda (10) — birorta shart true emas, patrul qoladi. ¦ The player is far (10): no condition is true, so patrol." },
        { code: '// dist = 5\n' + SM, line: 3, html: states('chase'), say: "5 < 6 — true: погоня! ¦ 5 < 6 — true: quvish! ¦ 5 < 6 is true: chase!" },
        { code: '// dist = 1\n' + SM, line: 2, html: states('attack'), say: "1 < 2 — атака! Проверка идёт сверху вниз. ¦ 1 < 2 — hujum! Tekshiruv yuqoridan pastga boradi. ¦ 1 < 2 — attack! Checks run top to bottom." },
        { code: '// lostPlayer = true\n' + SM, line: 4, html: states('search'), say: "Игрок пропал из виду — поиск. ¦ O'yinchi ko'zdan g'oyib bo'ldi — qidiruv. ¦ The player vanished from view — search." },
      ],
      takeaway: "Цепочка if/else + 60 проверок в секунду = «умный» враг. ¦ if/else zanjiri + soniyasiga 60 tekshiruv = «aqlli» dushman. ¦ An if/else chain checked 60 times a second makes a “smart” enemy.",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 3,
      react: true,
      title: "Управляем врагом ¦ Dushmanni boshqaramiz ¦ Controlling the enemy",
      chat: "какое расстояние поставить, чтобы враг атаковал? ¦ dushman hujum qilishi uchun qanday masofa qo'yish kerak? ¦ what distance makes the enemy attack?",
      task: "✍️ Двигайте ползунки. Потом поменяйте числа в decide() ¦ ✍️ Slayderlarni suring. Keyin decide()dagi raqamlarni o'zgartiring ¦ ✍️ Move the sliders, then change the numbers in decide()",
      steps: [
        { label: "Враг на React ¦ React'dagi dushman ¦ The enemy in React", html: '<div id="root"></div>', css: CSS, js: JS },
      ],
      takeaway: "Ползунок меняет состояние (useState) — React сам перерисовывает врага. Это и есть связь с React. ¦ Slayder holatni o'zgartiradi (useState) — React dushmanni o'zi qayta chizadi. React bilan bog'liqlik shu. ¦ A slider changes state (useState), and React redraws the enemy itself. That's the React link.",
      notes: { say: ["Пример написан на React — код прочитаем в технических темах. Сейчас достаточно двигать ползунки и менять числа."], min: 7 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какой режим включится? ¦ Qaysi rejim yoqiladi? ¦ Which mode kicks in?",
      chat: "пишите: «1 — погоня» ¦ yozing: «1 — quvish» ¦ write: “1 — chase”",
      zones: [
        { id: 'p', label: "Патруль ¦ Patrul ¦ Patrol", icon: '🚶' },
        { id: 'c', label: "Погоня ¦ Quvish ¦ Chase", icon: '🏃' },
        { id: 'a', label: "Атака ¦ Hujum ¦ Attack", icon: '⚔️' },
      ],
      items: [
        { text: "Игрок в 20 метрах ¦ O'yinchi 20 metrda ¦ The player is 20 m away", zone: 'p' },
        { text: "Игрок в 4 метрах ¦ O'yinchi 4 metrda ¦ The player is 4 m away", zone: 'c' },
        { text: "Игрок вплотную ¦ O'yinchi yonma-yon ¦ The player is right there", zone: 'a' },
        { text: "Вокруг никого ¦ Atrofda hech kim yo'q ¦ Nobody around", zone: 'p' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: свой враг ¦ Missiya: o'z dushmaning ¦ Mission: your own enemy",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Враг ведёт себя интересно! ¦ Dushman qiziqarli harakat qiladi! ¦ The enemy behaves in a fun way!",
      items: [
        { title: "Враг слишком лёгкий ¦ Dushman juda oson ¦ The enemy is too easy", choices: ["Увеличить радиус обзора ¦ Ko'rish radiusini oshirish ¦ Increase its vision radius", "Удалить режим атаки ¦ Hujum rejimini o'chirish ¦ Delete attack mode"], correct: 0, explain: "Заметит раньше — сложнее спрятаться. ¦ Oldinroq sezadi — yashirinish qiyinroq. ¦ It spots you sooner — harder to hide." },
        { title: "Что такое машина состояний? ¦ Holatlar mashinasi nima? ¦ What's a state machine?", choices: ["Режимы + правила перехода ¦ Rejimlar + o'tish qoidalari ¦ Modes + switching rules", "Мощный компьютер ¦ Kuchli kompyuter ¦ A powerful computer"], correct: 0, explain: "Простые правила — живое поведение. ¦ Oddiy qoidalar — jonli xulq. ¦ Simple rules, lively behaviour." },
        { title: "Как часто враг проверяет правила? ¦ Dushman qoidalarni qanchalik tez-tez tekshiradi? ¦ How often are the rules checked?", choices: ["Каждый кадр ¦ Har kadrda ¦ Every frame", "Раз в минуту ¦ Daqiqada bir marta ¦ Once a minute"], correct: 0, explain: "Поэтому реагирует мгновенно. ¦ Shuning uchun bir zumda javob beradi. ¦ That's why it reacts instantly." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: ИИ врагов ¦ Xulosa: dushmanlar AI'si ¦ Summary: enemy AI",
      chat: "придумайте пятый режим для врага! ¦ dushman uchun beshinchi rejimni o'ylab toping! ¦ invent a fifth mode for the enemy!",
      answer: "«Мозг» врага в игре — машина состояний: несколько режимов (патруль, погоня, атака, поиск) и правила, когда переключаться, например «если игрок ближе 6 метров — погоня». Цепочка if/else проверяется каждый кадр сверху вниз, поэтому враг реагирует мгновенно. Меняя числа — радиус обзора, скорость — можно сделать игру легче или сложнее. ¦ O'yindagi dushman «miyasi» — holatlar mashinasi: bir nechta rejim (patrul, quvish, hujum, qidiruv) va qachon almashish qoidalari, masalan «o'yinchi 6 metrdan yaqin bo'lsa — quvish». if/else zanjiri har kadrda yuqoridan pastga tekshiriladi, shuning uchun dushman bir zumda javob beradi. Raqamlarni — ko'rish radiusi, tezlikni o'zgartirib, o'yinni osonroq yoki qiyinroq qilish mumkin. ¦ An enemy's “brain” is a state machine: a few modes (patrol, chase, attack, search) and rules for switching, like “if the player is within 6 m, chase”. The if/else chain is checked top to bottom every frame, so the enemy reacts instantly. Tweaking numbers — vision radius, speed — makes the game easier or harder.",
      icon: '👾',
      badge: "Создатель врагов ¦ Dushmanlar yaratuvchisi ¦ Enemy designer",
      badgeSub: "React · общая 1 ¦ React · umumiy 1 ¦ React · general 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Нарисуйте схему режимов врага из любимой игры. ¦ Sevimli o'yiningizdagi dushman rejimlari sxemasini chizing. ¦ Sketch the modes of an enemy from your favourite game.",
        "Поменяйте в демо радиус обзора и скорость. ¦ Demoda ko'rish radiusi va tezlikni o'zgartiring. ¦ Change the vision radius and speed in the demo.",
      ],
      takeaway: "Дальше: как в играх работает физика. ¦ Keyingisi: o'yinlarda fizika qanday ishlaydi. ¦ Next: how physics works in games.",
      notes: { min: 2 },
    },
  ],
});
