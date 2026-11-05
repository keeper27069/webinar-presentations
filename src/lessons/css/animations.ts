import { kit } from '@engine/kit';

const CSS = `.track{position:relative;height:200px;border-radius:20px;background:#f4f5f8;margin-top:30px}
.ball{position:absolute;left:20px;top:50px;width:100px;height:100px;border-radius:50%;background:#f2573a;display:grid;place-items:center;font-size:50px}
.btn{display:inline-block;margin:20px;padding:22px 40px;border-radius:18px;font:800 30px Manrope,system-ui;color:#fff;background:#3d7bff}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-120px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes beat{0%,100%{transform:scale(1)}50%{transform:scale(1.35)}}
.row{display:flex;justify-content:space-around;align-items:flex-end;height:320px;font-size:90px}`;

export default kit({
  id: 'css-t03',
  title: "Анимации в CSS ¦ CSS'da animatsiyalar ¦ Animations in CSS",
  question: "Как заставить кнопки и картинки двигаться без единой строчки JavaScript? ¦ Bitta qator JavaScript'siz tugma va rasmlarni qanday harakatlantirish mumkin? ¦ How do you make buttons and pictures move without a line of JavaScript?",
  route: ["Движение ¦ Harakat ¦ Motion", "transition ¦ transition ¦ transition", "@keyframes ¦ @keyframes ¦ @keyframes", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎬',
      kicker: "CSS · техническая тема 3 ¦ CSS · texnik mavzu 3 ¦ CSS · technical topic 3",
      title: "Оживляем страницу ¦ Sahifani jonlantiramiz ¦ Bringing the page to life",
      chat: "какая анимация на сайтах вам нравится? ¦ saytlardagi qaysi animatsiya sizga yoqadi? ¦ which website animation do you like?",
      lead: "transition делает любое изменение плавным. @keyframes — целый мультик, который крутится сам. ¦ transition har qanday o'zgarishni silliq qiladi. @keyframes — o'zi aylanadigan butun multfilm. ¦ transition makes any change smooth. @keyframes is a whole cartoon that plays by itself.",
      facts: ["transition — плавный переход ¦ transition — silliq o'tish ¦ transition: a smooth change", "@keyframes — кадры мультика ¦ @keyframes — multfilm kadrlari ¦ @keyframes: cartoon frames", "Без JavaScript ¦ JavaScript'siz ¦ No JavaScript"],
      takeaway: "Сегодня мяч прыгнет, кнопка оживёт, а сердце забьётся. ¦ Bugun to'p sakraydi, tugma jonlanadi, yurak esa uradi. ¦ Today a ball bounces, a button wakes up and a heart beats.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Рывок или плавно? ¦ Sakrabmi yoki silliqmi? ¦ Jump or glide?",
      chat: "в чём разница между шагами 2 и 3? ¦ 2 va 3-qadamlar orasida qanday farq bor? ¦ what's the difference between steps 2 and 3?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.ball {\n  left: 20px;\n}', html: '<div class="track"><div class="ball" style="transition:none;left:20px">⚽</div></div>', say: "Мяч стоит слева. ¦ To'p chapda turibdi. ¦ The ball sits on the left." },
        { code: '.ball {\n  left: 600px;\n}', line: 2, html: '<div class="track"><div class="ball" style="transition:none;left:600px">⚽</div></div>', say: "Без transition он телепортируется рывком. ¦ transition'siz u keskin teleportatsiya qiladi. ¦ Without transition it teleports in a jump." },
        { code: '.ball {\n  left: 20px;\n  transition: left 1.2s;\n}', line: 3, html: '<div class="track"><div class="ball" style="transition:left 1.2s ease-in-out;left:20px">⚽</div></div>', say: "С transition — плавно катится обратно! ¦ transition bilan — silliq orqaga dumalaydi! ¦ With transition it rolls back smoothly!" },
      ],
      takeaway: "transition: что меняем + за сколько секунд. ¦ transition: nimani o'zgartiramiz + necha soniyada. ¦ transition: what changes + how many seconds.",
      notes: { say: ["Покажите шаги 2→3 несколько раз (← и →)."], min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Кнопка, которая оживает ¦ Jonlanadigan tugma ¦ A button that comes alive",
      chat: "что ещё изменить при наведении? ¦ ustiga olib kelganda yana nimani o'zgartirish kerak? ¦ what else should change on hover?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.btn {\n  transition: all 0.4s;\n}', html: '<div style="text-align:center;padding-top:60px"><span class="btn">Buy 🛒</span></div>', say: "Обычная кнопка. ¦ Oddiy tugma. ¦ A normal button." },
        { code: '.btn:hover {\n  transform: scale(1.15);\n  background: #f2573a;\n}', line: 2, html: '<div style="text-align:center;padding-top:60px"><span class="btn" style="transform:scale(1.15);background:#f2573a;box-shadow:0 14px 30px #f2573a55">Buy 🛒</span></div>', say: "Навели мышку — кнопка выросла и покраснела. ¦ Sichqonchani olib keldik — tugma kattalashdi va qizardi. ¦ Hover: the button grows and turns red." },
      ],
      takeaway: ":hover + transition — самый частый эффект на сайтах. ¦ :hover + transition — saytlardagi eng keng tarqalgan effekt. ¦ :hover + transition is the web's most common effect.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 2,
      title: "@keyframes: мультик из кадров ¦ @keyframes: kadrlardan multfilm ¦ @keyframes: a cartoon of frames",
      chat: "какую анимацию добавить сердцу? ¦ yurakka qanday animatsiya qo'shamiz? ¦ which animation shall the heart get?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '@keyframes bounce {\n  50% { transform: translateY(-120px); }\n}\n.ball { animation: bounce 1s infinite; }', line: 4, html: '<div class="row"><span style="animation:bounce 1s ease-in-out infinite">🏀</span><span>⏳</span><span>❤️</span></div>', say: "bounce: на середине мяч вверху — и так бесконечно. ¦ bounce: o'rtada to'p yuqorida — va shunday cheksiz. ¦ bounce: halfway the ball is up — forever." },
        { code: '@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n.timer { animation: spin 2s linear infinite; }', line: 4, html: '<div class="row"><span style="animation:bounce 1s ease-in-out infinite">🏀</span><span style="animation:spin 2s linear infinite">⏳</span><span>❤️</span></div>', say: "spin: полный оборот — так делают «загрузку». ¦ spin: to'liq aylanish — «yuklanish» shunday qilinadi. ¦ spin: a full turn — that's how loaders work." },
        { code: '@keyframes beat {\n  50% { transform: scale(1.35); }\n}\n.heart { animation: beat 0.8s infinite; }', line: 4, html: '<div class="row"><span style="animation:bounce 1s ease-in-out infinite">🏀</span><span style="animation:spin 2s linear infinite">⏳</span><span style="animation:beat .8s ease-in-out infinite">❤️</span></div>', say: "beat: сердце увеличивается и уменьшается. ¦ beat: yurak kattalashib-kichrayadi. ¦ beat: the heart grows and shrinks." },
      ],
      takeaway: "@keyframes — это кадры: «в начале так, на середине так, в конце так». ¦ @keyframes — kadrlar: «boshida shunday, o'rtada shunday, oxirida shunday». ¦ @keyframes are frames: “like this at the start, like this halfway, like this at the end”.",
      notes: { min: 5 },
    },
    {
      type: 'sort',
      stage: 2,
      title: "transition или @keyframes? ¦ transition'mi yoki @keyframes'mi? ¦ transition or @keyframes?",
      chat: "пишите: «1 — transition» ¦ yozing: «1 — transition» ¦ write: “1 — transition”",
      zones: [
        { id: 't', label: "transition ¦ transition ¦ transition", icon: '🫧' },
        { id: 'k', label: "@keyframes ¦ @keyframes ¦ @keyframes", icon: '🎞️' },
      ],
      items: [
        { text: "Кнопка краснеет при наведении ¦ Tugma ustiga olib kelinganda qizaradi ¦ A button turns red on hover", zone: 't' },
        { text: "Значок загрузки крутится всё время ¦ Yuklanish belgisi doim aylanadi ¦ A loading icon spins all the time", zone: 'k' },
        { text: "Меню плавно выезжает по клику ¦ Menyu bosilganda silliq chiqadi ¦ A menu slides out on click", zone: 't' },
        { text: "Сердце «бьётся» на странице ¦ Yurak sahifada «uradi» ¦ A heart “beats” on the page", zone: 'k' },
      ],
      takeaway: "Реакция на действие — transition. Мультик сам по себе — @keyframes. ¦ Harakatga javob — transition. O'zi aylanadigan multfilm — @keyframes. ¦ Reacting to an action: transition. A self-running cartoon: @keyframes.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Своя анимация ¦ O'z animatsiyangiz ¦ Your own animation",
      chat: "какой эмодзи заставим прыгать? ¦ qaysi emojini sakratamiz? ¦ which emoji shall we make jump?",
      task: "✍️ Поменяйте 1s на 0.3s, а -60px на -150px ¦ ✍️ 1s'ni 0.3s'ga, -60px'ni -150px'ga o'zgartiring ¦ ✍️ Change 1s to 0.3s and -60px to -150px",
      steps: [{ label: "Прыжок ¦ Sakrash ¦ Jump", html: '<div class="frog">🐸</div>', css: '.frog {\n  font-size: 100px;\n  text-align: center;\n  margin-top: 160px;\n  animation: jump 1s ease-in-out infinite;\n}\n@keyframes jump {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-60px); }\n}' }],
      takeaway: "Меняем время и высоту — меняется характер движения. ¦ Vaqt va balandlikni o'zgartiramiz — harakat xarakteri o'zgaradi. ¦ Change the time and height and the motion's personality changes.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: аниматор ¦ Missiya: animator ¦ Mission: animator",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Страница ожила! ¦ Sahifa jonlandi! ¦ The page is alive!",
      items: [
        { title: "Плавная смена цвета за 0.5 с ¦ 0.5 s da silliq rang o'zgarishi ¦ A smooth colour change over 0.5 s", choices: ['transition: background 0.5s', 'animation: 0.5s'], correct: 0, explain: "transition для реакции. ¦ Reaksiya uchun transition. ¦ transition for reactions." },
        { title: "Повторять бесконечно ¦ Cheksiz takrorlash ¦ Repeat forever", choices: ['infinite', 'forever'], correct: 0, explain: "animation: spin 2s infinite. ¦ animation: spin 2s infinite. ¦ animation: spin 2s infinite." },
        { title: "Полный оборот ¦ To'liq aylanish ¦ A full turn", choices: ['rotate(360deg)', 'rotate(100%)'], correct: 0, explain: "360 градусов. ¦ 360 daraja. ¦ 360 degrees." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: анимации ¦ Xulosa: animatsiyalar ¦ Summary: animations",
      chat: "пришлите свою прыгающую анимацию! ¦ sakraydigan animatsiyangizni yuboring! ¦ share your jumping animation!",
      answer: "transition делает изменения плавными: transition: left 1.2s — и мяч катится, а не телепортируется. С :hover так оживают кнопки. @keyframes — это кадры мультика: «в начале так, на середине так», а animation: bounce 1s infinite крутит его бесконечно — так прыгают мячи, крутится загрузка и бьётся сердце. ¦ transition o'zgarishlarni silliq qiladi: transition: left 1.2s — va to'p teleportatsiya qilmaydi, dumalaydi. :hover bilan tugmalar shunday jonlanadi. @keyframes — multfilm kadrlari: «boshida shunday, o'rtada shunday», animation: bounce 1s infinite esa uni cheksiz aylantiradi — to'plar shunday sakraydi, yuklanish aylanadi va yurak uradi. ¦ transition makes changes smooth: transition: left 1.2s and the ball rolls instead of teleporting; with :hover buttons come alive. @keyframes are cartoon frames — “like this at the start, like this halfway” — and animation: bounce 1s infinite loops them forever: bouncing balls, spinning loaders, beating hearts.",
      icon: '🎬',
      badge: "Аниматор ¦ Animator ¦ Animator",
      badgeSub: "CSS · техническая 3 ¦ CSS · texnik 3 ¦ CSS · technical 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте кнопку, которая плавно растёт при наведении. ¦ Ustiga olib kelinganda silliq kattalashadigan tugma yarating. ¦ Make a button that smoothly grows on hover.",
        "Сделайте свой значок загрузки на @keyframes. ¦ @keyframes'da o'z yuklanish belgingizni yarating. ¦ Build your own loading icon with @keyframes.",
      ],
      takeaway: "Дальше: CSS-переменные — один цвет на весь сайт. ¦ Keyingisi: CSS o'zgaruvchilari — butun sayt uchun bitta rang. ¦ Next: CSS variables — one colour for the whole site.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
