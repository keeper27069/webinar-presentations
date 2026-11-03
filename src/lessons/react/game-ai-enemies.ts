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

export default kit({
  id: 'react-g01',
  title: "Как «думают» враги в играх ¦ O'yinlardagi dushmanlar qanday «o'ylaydi» ¦ How game enemies “think”",
  question: "Откуда враг в игре знает, когда патрулировать, а когда нападать? ¦ O'yindagi dushman qachon patrul qilish, qachon hujum qilishni qayerdan biladi? ¦ How does a game enemy know when to patrol and when to attack?",
  route: ["Загадка ¦ Topishmoq ¦ Puzzle", "Состояния ¦ Holatlar ¦ States", "Мозг врага ¦ Dushman miyasi ¦ The enemy's brain", "Связь с React ¦ React bilan bog'liqlik ¦ The React link", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '👾',
      kicker: "React · общая тема 1 ¦ React · umumiy mavzu 1 ¦ React · general topic 1",
      title: "У врага нет мыслей — у него есть правила ¦ Dushmanning fikri yo'q — uning qoidalari bor ¦ Enemies don't think — they follow rules",
      chat: "в какой игре враги кажутся вам самыми умными? ¦ qaysi o'yinda dushmanlar sizga eng aqlli tuyuladi? ¦ which game's enemies seem smartest to you?",
      lead: "Враг «замечает» вас, бежит следом, атакует и убегает, когда ранен. Кажется, что он думает. На самом деле это набор состояний и условий — те же if и переменные, что вы уже знаете. ¦ Dushman sizni «sezadi», ortingizdan yuguradi, hujum qiladi va yaralanganda qochadi. U o'ylayotgandek tuyuladi. Aslida bu holatlar va shartlar to'plami — siz biladigan o'sha if va o'zgaruvchilar. ¦ An enemy “spots” you, chases, attacks and runs when hurt. It seems to think. Really it's a set of states and conditions — the same ifs and variables you know.",
      facts: ["Состояние — что враг делает сейчас ¦ Holat — dushman hozir nima qilyapti ¦ State: what the enemy is doing now", "Условие — когда сменить состояние ¦ Shart — holatni qachon almashtirish ¦ Condition: when to switch", "Это и есть игровой «AI» ¦ Bu o'yindagi «AI»ning o'zi ¦ That is game “AI”"],
      takeaway: "Сегодня соберём мозг врага и увидим, как это похоже на useState в React. ¦ Bugun dushman miyasini yig'amiz va bu React'dagi useState'ga qanchalik o'xshashini ko'ramiz. ¦ Today we'll build an enemy brain and see how much it resembles useState in React.",
      notes: { say: ["Игровой AI ≠ нейросети: в большинстве игр это правила и состояния."], min: 3 },
    },
    {
      type: 'poll',
      stage: 0,
      title: "Почему враг вас заметил? ¦ Dushman sizni nega sezdi? ¦ Why did the enemy spot you?",
      chat: "голосуйте 1–3 ¦ 1–3 bilan ovoz bering ¦ vote 1–3",
      question: "Вы подошли к охраннику в стелс-игре, и он вас заметил. Что произошло? ¦ Stels-o'yinda qo'riqchiga yaqinlashdingiz va u sizni sezdi. Nima bo'ldi? ¦ You crept up on a guard in a stealth game and he spotted you. What happened?",
      options: [
        { label: "Он догадался ¦ U taxmin qildi ¦ He guessed" },
        { label: "Сработало условие: расстояние < N и вы в поле зрения ¦ Shart ishladi: masofa < N va siz ko'rish maydonidasiz ¦ A condition fired: distance < N and you're in view", detail: "Верно ✔ ¦ To'g'ri ✔ ¦ Correct ✔" },
        { label: "Игра подглядывает в камеру ¦ O'yin kameradan kuzatadi ¦ The game peeks through your camera" },
      ],
      correct: 1,
      result: "Игра каждый кадр проверяет: далеко ли игрок, видно ли его, шумит ли он. Если условие true — охранник переходит в состояние «тревога». ¦ O'yin har kadrda tekshiradi: o'yinchi uzoqdami, ko'rinadimi, shovqin qilyaptimi. Shart true bo'lsa — qo'riqchi «xavotir» holatiga o'tadi. ¦ Every frame the game checks: is the player far, visible, noisy? If true, the guard switches to “alert”.",
      takeaway: "«Заметил» = условие стало true. ¦ «Sezdi» = shart true bo'ldi. ¦ “Spotted” = a condition became true.",
      notes: { say: ["Голосование."], min: 3 },
    },
    {
      type: 'cards',
      stage: 1,
      title: "Четыре состояния врага ¦ Dushmanning to'rt holati ¦ An enemy's four states",
      chat: "какое состояние добавили бы вы? ¦ siz qanday holat qo'shgan bo'lardingiz? ¦ which state would you add?",
      cards: [
        { icon: '🚶', front: "Патруль ¦ Patrul ¦ Patrol", back: "Ходит по маршруту, пока игрок далеко. ¦ O'yinchi uzoqda bo'lganda marshrut bo'ylab yuradi. ¦ Walks a route while the player is far away." },
        { icon: '🏃', front: "Погоня ¦ Ta'qib ¦ Chase", back: "Игрок ближе 6 клеток — бежит к нему. ¦ O'yinchi 6 katakdan yaqin — unga yuguradi. ¦ Player within 6 cells: run towards them." },
        { icon: '⚔️', front: "Атака ¦ Hujum ¦ Attack", back: "Игрок совсем рядом — бьёт. ¦ O'yinchi juda yaqin — uradi. ¦ Player right next to it: strike." },
        { icon: '🏳️', front: "Бегство ¦ Qochish ¦ Flee", back: "Здоровья мало — убегает. Это условие важнее всех. ¦ Sog'lig'i kam — qochadi. Bu shart hammasidan muhimroq. ¦ Low health: run away. This rule beats all others." },
      ],
      takeaway: "Враг всегда в одном состоянии. Переход — по условию. ¦ Dushman doim bitta holatda bo'ladi. O'tish — shart bo'yicha. ¦ The enemy is always in one state; transitions follow conditions.",
      notes: { say: ["Это называется конечный автомат (finite state machine)."], min: 4 },
    },
    {
      type: 'flow',
      stage: 1,
      title: "Каждый кадр игры ¦ O'yinning har bir kadri ¦ Every frame of the game",
      chat: "сколько раз в секунду это происходит? ¦ bu soniyada necha marta sodir bo'ladi? ¦ how many times a second does this happen?",
      nodes: [
        { icon: '👀', label: "Посмотреть ¦ Qarash ¦ Sense", text: "Где игрок? Сколько у меня здоровья? ¦ O'yinchi qayerda? Sog'lig'im qancha? ¦ Where's the player? How's my health?" },
        { icon: '🧠', label: "Решить ¦ Qaror qilish ¦ Decide", text: "Условия выбирают новое состояние. ¦ Shartlar yangi holatni tanlaydi. ¦ Conditions pick a new state." },
        { icon: '🎬', label: "Сделать ¦ Bajarish ¦ Act", text: "Двигаться, бить или убегать. ¦ Harakatlanish, urish yoki qochish. ¦ Move, strike or flee." },
        { icon: '🖼️', label: "Нарисовать ¦ Chizish ¦ Draw", text: "Экран обновляется под новое состояние. ¦ Ekran yangi holatga moslab yangilanadi. ¦ The screen updates for the new state." },
      ],
      takeaway: "Цикл повторяется 30–60 раз в секунду — поэтому враг реагирует мгновенно. ¦ Tsikl soniyasiga 30–60 marta takrorlanadi — shuning uchun dushman bir zumda javob beradi. ¦ The loop runs 30–60 times a second, so the enemy reacts instantly.",
      notes: { min: 3 },
    },
    {
      type: 'walk',
      stage: 2,
      title: "Мозг врага в коде ¦ Koddagi dushman miyasi ¦ The enemy's brain in code",
      chat: "почему проверка здоровья стоит первой? ¦ nega sog'liq tekshiruvi birinchi turibdi? ¦ why is the health check first?",
      code: `function decide(distance, hp) {\n  if (hp < 30) return 'flee';\n  if (distance < 2) return 'attack';\n  if (distance < 6) return 'chase';\n  return 'patrol';\n}`,
      lang: 'js',
      marks: [
        { line: 2, text: "Самое важное правило — первым: раненый враг убегает, даже если игрок рядом. ¦ Eng muhim qoida — birinchi: yarador dushman o'yinchi yaqin bo'lsa ham qochadi. ¦ The most important rule first: a hurt enemy flees even if the player is close." },
        { line: 3, text: "Ближе 2 — атака. ¦ 2 dan yaqin — hujum. ¦ Closer than 2: attack." },
        { line: 4, text: "Ближе 6 — погоня. ¦ 6 dan yaqin — ta'qib. ¦ Closer than 6: chase." },
        { line: 5, text: "Ничего не подошло — патруль по умолчанию. ¦ Hech biri mos kelmadi — sukut bo'yicha patrul. ¦ Nothing matched: patrol by default." },
      ],
      takeaway: "Порядок условий = характер врага. Поменяйте местами — и он станет «смелым». ¦ Shartlar tartibi = dushman xarakteri. O'rnini almashtiring — va u «jasur» bo'lib qoladi. ¦ Condition order is the enemy's personality. Swap them and it turns “brave”.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 2,
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
      type: 'compare',
      stage: 3,
      title: "Враг в игре и компонент в React ¦ O'yindagi dushman va React'dagi komponent ¦ A game enemy and a React component",
      chat: "что общего у врага и кнопки «лайк»? ¦ dushman va «layk» tugmasi o'rtasida qanday umumiylik bor? ¦ what do an enemy and a “like” button have in common?",
      left: { icon: '👾', label: "Враг ¦ Dushman ¦ Enemy", points: ["Состояние: patrol / chase / attack ¦ Holat: patrol / chase / attack ¦ State: patrol / chase / attack", "Событие: игрок подошёл ¦ Hodisa: o'yinchi yaqinlashdi ¦ Event: the player came close", "Экран: другая анимация ¦ Ekran: boshqa animatsiya ¦ Screen: a different animation"] },
      right: { icon: '❤️', label: "Кнопка «лайк» ¦ «Layk» tugmasi ¦ A like button", points: ["Состояние: liked = true / false ¦ Holat: liked = true / false ¦ State: liked = true / false", "Событие: клик ¦ Hodisa: bosish ¦ Event: a click", "Экран: красное или серое сердце ¦ Ekran: qizil yoki kulrang yurak ¦ Screen: a red or grey heart"] },
      verdict: "Одна идея: состояние + событие → новый экран. В React это useState. ¦ Bitta g'oya: holat + hodisa → yangi ekran. React'da bu useState. ¦ One idea: state + event → a new screen. In React that's useState.",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какое состояние включится? ¦ Qaysi holat yoqiladi? ¦ Which state switches on?",
      chat: "пишите: «1 — chase» ¦ yozing: «1 — chase» ¦ write: “1 — chase”",
      zones: [
        { id: 'patrol', label: "🚶 Патруль ¦ 🚶 Patrul ¦ 🚶 Patrol" },
        { id: 'chase', label: "🏃 Погоня ¦ 🏃 Ta'qib ¦ 🏃 Chase" },
        { id: 'attack', label: "⚔️ Атака ¦ ⚔️ Hujum ¦ ⚔️ Attack" },
        { id: 'flee', label: "🏳️ Бегство ¦ 🏳️ Qochish ¦ 🏳️ Flee" },
      ],
      items: [
        { text: "distance 9, hp 80 ¦ distance 9, hp 80 ¦ distance 9, hp 80", zone: 'patrol' },
        { text: "distance 4, hp 80 ¦ distance 4, hp 80 ¦ distance 4, hp 80", zone: 'chase' },
        { text: "distance 1, hp 90 ¦ distance 1, hp 90 ¦ distance 1, hp 90", zone: 'attack' },
        { text: "distance 1, hp 20 ¦ distance 1, hp 20 ¦ distance 1, hp 20", zone: 'flee', why: "hp < 30 проверяется первым. ¦ hp < 30 birinchi tekshiriladi. ¦ hp < 30 is checked first." },
      ],
      takeaway: "Прочитали условия сверху вниз — предсказали поведение. ¦ Shartlarni yuqoridan pastga o'qidik — xatti-harakatni bashorat qildik. ¦ Read the conditions top-down and you can predict behaviour.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Враги в играх обычно работают на нейросетях ¦ O'yinlardagi dushmanlar odatda neyrotarmoqlarda ishlaydi ¦ Game enemies usually run on neural networks", truth: false, explain: "Чаще всего это состояния, условия и поиск пути. ¦ Ko'pincha bu holatlar, shartlar va yo'l qidirish. ¦ Mostly states, conditions and pathfinding." },
        { text: "Разработчики специально делают врагов «глупее» ¦ Dasturchilar dushmanlarni ataylab «ahmoqroq» qilishadi ¦ Developers make enemies “dumber” on purpose", truth: true, explain: "Идеальный враг не промахивается — с ним неинтересно играть. ¦ Ideal dushman xato qilmaydi — u bilan o'ynash qiziq emas. ¦ A perfect enemy never misses — no fun to play." },
        { text: "Порядок условий меняет поведение ¦ Shartlar tartibi xatti-harakatni o'zgartiradi ¦ Condition order changes behaviour", truth: true, explain: "Первое true выигрывает. ¦ Birinchi true g'olib bo'ladi. ¦ The first true wins." },
      ],
      takeaway: "Хороший игровой AI — не самый умный, а самый интересный. ¦ Yaxshi o'yin AI'si — eng aqllisi emas, eng qiziqarlisi. ¦ Good game AI isn't the smartest — it's the most fun.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'board',
      stage: 3,
      title: "Придумайте нового врага ¦ Yangi dushman o'ylab toping ¦ Invent a new enemy",
      chat: "враг + его особое правило ¦ dushman + uning maxsus qoidasi ¦ an enemy + its special rule",
      seeds: ["Призрак: исчезает, если на него смотрят ¦ Arvoh: unga qarashsa yo'qoladi ¦ Ghost: vanishes when you look at it", "Слизень: делится на два при hp < 50 ¦ Shilliqqurt: hp < 50 bo'lganda ikkiga bo'linadi ¦ Slime: splits in two when hp < 50"],
      placeholder: "Враг из чата… ¦ Chatdagi dushman… ¦ An enemy from chat…",
      footer: "Каждое правило — это одно условие if. ¦ Har bir qoida — bitta if sharti. ¦ Every rule is one if condition.",
      takeaway: "Вы только что спроектировали игровой AI. ¦ Siz hozirgina o'yin AI'sini loyihalashtirdingiz. ¦ You just designed game AI.",
      notes: { say: ["Вписывайте идеи чата, для одной покажите, как она выглядела бы в decide()."], min: 4 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: босс уровня ¦ Missiya: daraja boshlig'i ¦ Mission: the level boss",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Босс готов к бою! ¦ Boshliq jangga tayyor! ¦ The boss is ready to fight!",
      items: [
        { title: "Босс никогда не убегает ¦ Boshliq hech qachon qochmaydi ¦ The boss never flees", choices: ["Убрать правило flee ¦ flee qoidasini olib tashlash ¦ Remove the flee rule", "Увеличить скорость ¦ Tezlikni oshirish ¦ Increase speed"], correct: 0, explain: "Нет условия — нет состояния. ¦ Shart yo'q — holat yo'q. ¦ No condition, no state." },
        { title: "Враг в состоянии одновременно… ¦ Dushman bir vaqtda… holatda ¦ An enemy is in… at once", choices: ["одном ¦ bitta ¦ one state", "всех четырёх ¦ to'rttasida ¦ all four"], correct: 0, explain: "Конечный автомат — всегда одно состояние. ¦ Chekli avtomat — doim bitta holat. ¦ A state machine is always in one state." },
        { title: "В React состояние хранит… ¦ React'da holatni… saqlaydi ¦ In React, state is held by…", choices: ['useState', 'console.log'], correct: 0, explain: "Изменили — экран перерисовался. ¦ O'zgartirdik — ekran qayta chizildi. ¦ Change it and the screen redraws." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: AI врагов ¦ Xulosa: dushmanlar AI'si ¦ Summary: enemy AI",
      chat: "какого врага вы добавите в свою игру? ¦ o'yiningizga qanday dushman qo'shasiz? ¦ which enemy will you add to your game?",
      answer: "Враги в играх не думают — они живут в одном из состояний (патруль, погоня, атака, бегство) и каждый кадр условиями решают, куда перейти. Порядок условий задаёт характер. Это та же идея, что useState в React: состояние + событие → новый экран. ¦ O'yinlardagi dushmanlar o'ylamaydi — ular holatlardan birida yashaydi (patrul, ta'qib, hujum, qochish) va har kadrda shartlar bilan qayerga o'tishni hal qiladi. Shartlar tartibi xarakterni belgilaydi. Bu React'dagi useState bilan bir xil g'oya: holat + hodisa → yangi ekran. ¦ Game enemies don't think: they live in one state (patrol, chase, attack, flee) and each frame conditions decide where to go next. Condition order sets the personality. It's the same idea as useState in React: state + event → a new screen.",
      icon: '👾',
      badge: "Создатель врагов ¦ Dushman yaratuvchi ¦ Enemy designer",
      badgeSub: "React · общая 1 ¦ React · umumiy 1 ¦ React · general 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Нарисуйте схему состояний своего врага: кружки-состояния и стрелки-условия. ¦ O'z dushmaningizning holatlar sxemasini chizing: doira-holatlar va strelka-shartlar. ¦ Draw your enemy's state diagram: circles for states, arrows for conditions.",
        "Допишите в decide() пятое состояние. ¦ decide()ga beshinchi holatni qo'shing. ¦ Add a fifth state to decide().",
      ],
      takeaway: "Следующая тема — физика в играх: как данные превращаются в движение. ¦ Keyingi mavzu — o'yinlardagi fizika: ma'lumotlar harakatga qanday aylanadi. ¦ Next: game physics — how data becomes motion.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
