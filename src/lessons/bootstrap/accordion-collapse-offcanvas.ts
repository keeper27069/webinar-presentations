import { kit } from '@engine/kit';

const HEAD = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>';
const FAQ = `${HEAD}\n<div class="container py-3">\n<div class="accordion" id="faq">\n  <div class="accordion-item">\n    <h2 class="accordion-header">\n      <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#q1">How old do I need to be?</button>\n    </h2>\n    <div id="q1" class="accordion-collapse collapse show" data-bs-parent="#faq">\n      <div class="accordion-body">From 10 to 17 years old.</div>\n    </div>\n  </div>\n  <div class="accordion-item">\n    <h2 class="accordion-header">\n      <button class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#q2">Do I need a laptop?</button>\n    </h2>\n    <div id="q2" class="accordion-collapse collapse" data-bs-parent="#faq">\n      <div class="accordion-body">Yes, any laptop with a browser.</div>\n    </div>\n  </div>\n</div>\n</div>`;
const OFF = `${HEAD}\n<nav class="navbar bg-body-tertiary px-3">\n  <b>Bit Shop</b>\n  <button class="btn btn-outline-dark" data-bs-toggle="offcanvas" data-bs-target="#menu">☰ Menu</button>\n</nav>\n<div class="offcanvas offcanvas-start" id="menu">\n  <div class="offcanvas-header">\n    <h5>Menu</h5>\n    <button class="btn-close" data-bs-dismiss="offcanvas"></button>\n  </div>\n  <div class="offcanvas-body">\n    <a class="d-block mb-2" href="#">🏠 Home</a>\n    <a class="d-block mb-2" href="#">👟 Sneakers</a>\n    <a class="d-block" href="#">🛒 Cart</a>\n  </div>\n</div>`;

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.btn{display:inline-block;padding:12px 22px;border-radius:12px;background:#7c5cff;color:#fff;font-weight:800;font-size:20px}
.panel{width:420px;margin-top:14px;max-height:0;overflow:hidden;opacity:0;border-radius:14px;background:#f1edff;font-size:20px;padding:0 20px}
.open .panel{max-height:200px;opacity:1;padding:18px 20px}
.acc{width:460px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 10px 30px #0001}
.it{border-bottom:2px solid #eceef3}.q{display:flex;justify-content:space-between;padding:16px 20px;font-size:20px;font-weight:800}
.q::after{content:'⌄';transition:transform .5s}.a{max-height:0;overflow:hidden;padding:0 20px;font-size:18px;color:#5c6275}
.it.on .q{background:#f1edff;color:#5b3fd6}.it.on .q::after{transform:rotate(180deg)}.it.on .a{max-height:120px;padding:4px 20px 16px}
.phone{position:relative;width:300px;height:420px;border-radius:30px;border:10px solid #16181f;background:#f6f7fa;overflow:hidden}
.bar{display:flex;justify-content:space-between;padding:14px;font-weight:800;font-size:18px;background:#fff}
.menu{position:absolute;inset:0 30% 0 0;background:#fff;box-shadow:10px 0 30px #0003;padding:20px;font-size:20px;line-height:2;transform:translateX(-105%)}
.dim{position:absolute;inset:0;background:#0000;pointer-events:none}
.slide .menu{transform:none}.slide .dim{background:#0005}.slide .menu{z-index:2}`;
const col = (open: boolean) => `<div class="wrap"><div class="${open ? 'open' : ''}"><span class="btn">Show the answer ${open ? '▲' : '▼'}</span><div class="panel">🎉 Lessons start on Monday at 10:00!</div></div></div>`;
const acc = (on: number) => `<div class="wrap"><div class="acc">${['How old do I need to be?', 'Do I need a laptop?', 'How much does it cost?'].map((q, i) => `<div class="it ${on === i ? 'on' : ''}"><div class="q">${q}</div><div class="a">${['From 10 to 17.', 'Yes, any laptop.', 'First lesson is free.'][i]}</div></div>`).join('')}</div></div>`;
const phone = (open: boolean) => `<div class="wrap"><div class="phone ${open ? 'slide' : ''}"><div class="bar"><span>Bit Shop</span><span>☰</span></div><div style="padding:20px;font-size:60px;text-align:center">👟</div><div class="dim"></div><div class="menu">🏠 Home<br>👟 Sneakers<br>🛒 Cart</div></div></div>`;

export default kit({
  id: 'bootstrap-t02',
  title: "Accordion, Collapse и Offcanvas ¦ Accordion, Collapse va Offcanvas ¦ Accordion, Collapse and Offcanvas",
  question: "Как спрятать лишнее и показать по нажатию — без единой строчки JavaScript? ¦ Ortiqchani qanday yashirib, bosilganda ko'rsatish mumkin — bitta qator JavaScript'siz? ¦ How do you hide things and reveal them on click — without writing JavaScript?",
  route: ["Collapse ¦ Collapse ¦ Collapse", "Accordion ¦ Accordion ¦ Accordion", "Offcanvas ¦ Offcanvas ¦ Offcanvas", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🪗',
      kicker: "Bootstrap · техническая тема 2 ¦ Bootstrap · texnik mavzu 2 ¦ Bootstrap · technical topic 2",
      title: "Прятать и показывать ¦ Yashirish va ko'rsatish ¦ Hide and reveal",
      chat: "где вы видели раскрывающиеся вопросы или выезжающее меню? ¦ ochiladigan savollar yoki chiqib keladigan menyuni qayerda ko'rgansiz? ¦ where have you seen expanding questions or a slide-out menu?",
      lead: "Collapse прячет блок, Accordion раскрывает вопросы по одному, Offcanvas выдвигает меню сбоку. Всё это включается атрибутами в HTML. ¦ Collapse blokni yashiradi, Accordion savollarni bittadan ochadi, Offcanvas menyuni yon tomondan chiqaradi. Bularning hammasi HTML atributlari bilan yoqiladi. ¦ Collapse hides a block, Accordion opens questions one at a time, Offcanvas slides a menu in. All switched on with HTML attributes.",
      facts: ["data-bs-toggle — «что делать» ¦ data-bs-toggle — «nima qilish» ¦ data-bs-toggle — “what to do”", "data-bs-target — «с кем» ¦ data-bs-target — «kim bilan» ¦ data-bs-target — “which element”", "JavaScript уже внутри Bootstrap ¦ JavaScript allaqachon Bootstrap ichida ¦ The JavaScript is inside Bootstrap"],
      takeaway: "Смотрим, как это работает — по шагам. ¦ Qanday ishlashini qadam-baqadam ko'ramiz. ¦ Let's watch it work, step by step.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 0,
      title: "Collapse: кнопка открывает блок ¦ Collapse: tugma blokni ochadi ¦ Collapse: a button opens a block",
      chat: "что напишем в спрятанном блоке? ¦ yashirin blokga nima yozamiz? ¦ what shall we hide in the block?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<button data-bs-toggle="collapse"\n        data-bs-target="#info">\n  Show the answer\n</button>\n<div class="collapse" id="info">…</div>', line: 5, html: col(false), say: "Класс collapse прячет блок. Кнопка знает его id: #info. ¦ collapse klassi blokni yashiradi. Tugma uning id'sini biladi: #info. ¦ The collapse class hides the block. The button knows its id: #info." },
        { code: '<!-- 👆 click -->\n<div class="collapse show" id="info">', line: 2, html: col(true), say: "Нажали — Bootstrap добавил класс show, и блок плавно раскрылся. ¦ Bosildi — Bootstrap show klassini qo'shdi va blok silliq ochildi. ¦ Click: Bootstrap adds show and the block slides open." },
        { code: '<div class="collapse" id="info">', line: 1, html: col(false), say: "Ещё клик — show убрали, блок спрятался. ¦ Yana bosish — show olib tashlandi, blok yashirindi. ¦ Click again: show is removed and it hides." },
      ],
      takeaway: "collapse = спрятано, collapse show = видно. ¦ collapse = yashirin, collapse show = ko'rinadi. ¦ collapse = hidden, collapse show = visible.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Accordion: открыт только один ¦ Accordion: faqat bittasi ochiq ¦ Accordion: only one open",
      chat: "какой вопрос открыть? пишите номер ¦ qaysi savolni ochamiz? raqamini yozing ¦ which question shall we open? write its number",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<div class="accordion" id="faq">\n  <div class="accordion-item">…</div>\n  <div class="accordion-item">…</div>\n  <div class="accordion-item">…</div>\n</div>', html: acc(-1), say: "Три вопроса — ответы спрятаны. ¦ Uchta savol — javoblar yashirin. ¦ Three questions, answers hidden." },
        { code: '<button data-bs-target="#q1">\n<div id="q1" class="collapse show"\n     data-bs-parent="#faq">', line: 2, html: acc(0), say: "Открыли первый вопрос. ¦ Birinchi savolni ochdik. ¦ Open the first question." },
        { code: '<button data-bs-target="#q2">\n<div id="q2" class="collapse show"\n     data-bs-parent="#faq">', line: 3, html: acc(1), say: "Открыли второй — первый закрылся сам! Это делает data-bs-parent. ¦ Ikkinchisini ochdik — birinchisi o'zi yopildi! Buni data-bs-parent qiladi. ¦ Open the second and the first closes itself — that's data-bs-parent." },
        { code: '<button data-bs-target="#q3">', line: 1, html: acc(2), say: "Всегда открыт только один ответ — аккуратно и коротко. ¦ Doim faqat bitta javob ochiq — tartibli va qisqa. ¦ Only one answer is open at a time: tidy and short." },
      ],
      takeaway: "Accordion = несколько Collapse, которые знают друг о друге. ¦ Accordion = bir-birini biladigan bir nechta Collapse. ¦ An accordion is several collapses that know about each other.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Offcanvas: меню выезжает сбоку ¦ Offcanvas: menyu yondan chiqadi ¦ Offcanvas: a menu slides in",
      chat: "какие пункты добавим в меню? ¦ menyuga qaysi bandlarni qo'shamiz? ¦ which items shall we add to the menu?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<button data-bs-toggle="offcanvas"\n        data-bs-target="#menu">☰</button>\n<div class="offcanvas offcanvas-start"\n     id="menu">…</div>', line: 3, html: phone(false), say: "Меню спрятано за левым краем экрана. ¦ Menyu ekranning chap chetida yashirin. ¦ The menu waits off the left edge." },
        { code: '<!-- 👆 ☰ click -->\n<div class="offcanvas offcanvas-start show"', line: 2, html: phone(true), say: "Нажали ☰ — меню выехало, а фон затемнился. ¦ ☰ bosildi — menyu chiqdi, fon esa qorong'ilashdi. ¦ Tap ☰: the menu slides in and the page dims." },
        { code: '<button data-bs-dismiss="offcanvas">\n  ✕\n</button>', line: 1, html: phone(false), say: "Крестик с data-bs-dismiss — и меню уехало обратно. ¦ data-bs-dismiss'li xoch — va menyu orqaga ketdi. ¦ A close button with data-bs-dismiss sends it back." },
      ],
      takeaway: "offcanvas-start — слева, -end — справа, -top и -bottom — сверху и снизу. ¦ offcanvas-start — chapdan, -end — o'ngdan, -top va -bottom — yuqori va pastdan. ¦ offcanvas-start = left, -end = right, -top and -bottom too.",
      notes: { say: ["В Bootstrap 6 этот компонент называется Drawer — урок про шестую версию."], min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какой компонент подойдёт? ¦ Qaysi komponent mos keladi? ¦ Which component fits?",
      chat: "пишите: «1 — Accordion» ¦ yozing: «1 — Accordion» ¦ write: “1 — Accordion”",
      zones: [
        { id: 'c', label: 'Collapse', icon: '📦' },
        { id: 'a', label: 'Accordion', icon: '🪗' },
        { id: 'o', label: 'Offcanvas', icon: '🗂️' },
      ],
      items: [
        { text: "10 вопросов «Частые вопросы» ¦ 10 ta «Ko'p so'raladigan savollar» ¦ 10 FAQ questions", zone: 'a' },
        { text: "Меню на телефоне ¦ Telefondagi menyu ¦ A phone menu", zone: 'o' },
        { text: "Кнопка «Показать ещё текст» ¦ «Ko'proq matn ko'rsatish» tugmasi ¦ A “Read more” button", zone: 'c' },
        { text: "Корзина, которая выезжает справа ¦ O'ngdan chiqadigan savat ¦ A cart sliding in from the right", zone: 'o' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Живой Bootstrap ¦ Jonli Bootstrap ¦ Real Bootstrap",
      chat: "добавьте свой третий вопрос! ¦ o'zingizning uchinchi savolingizni qo'shing! ¦ add your own third question!",
      task: "✍️ Покликайте вопросы и меню, потом допишите свой пункт ¦ ✍️ Savollar va menyuni bosib ko'ring, keyin o'z bandingizni qo'shing ¦ ✍️ Click the questions and menu, then add your own item",
      steps: [
        { label: "Accordion ¦ Accordion ¦ Accordion", html: FAQ },
        { label: "Offcanvas ¦ Offcanvas ¦ Offcanvas", html: OFF },
      ],
      takeaway: "Ни строчки JavaScript — всё делают атрибуты. ¦ Bitta qator JavaScript yo'q — hammasini atributlar qiladi. ¦ Not one line of JavaScript — the attributes do it all.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: страница школы ¦ Missiya: maktab sahifasi ¦ Mission: a school page",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Страница аккуратная и удобная! ¦ Sahifa tartibli va qulay! ¦ The page is tidy and easy!",
      items: [
        { title: "Какой атрибут говорит «с кем работать»? ¦ Qaysi atribut «kim bilan ishlash»ni aytadi? ¦ Which attribute says “which element”?", choices: ['data-bs-target', 'data-bs-toggle'], correct: 0, explain: "target — цель, toggle — действие. ¦ target — maqsad, toggle — harakat. ¦ target is the element, toggle is the action." },
        { title: "Чтобы открытым был только один вопрос ¦ Faqat bitta savol ochiq bo'lishi uchun ¦ To keep only one answer open", choices: ['data-bs-parent', 'class="show"'], correct: 0, explain: "parent связывает вопросы вместе. ¦ parent savollarni birlashtiradi. ¦ parent links them together." },
        { title: "Меню справа ¦ O'ngdagi menyu ¦ A menu on the right", choices: ['offcanvas-end', 'offcanvas-start'], correct: 0, explain: "end — конец строки, то есть справа. ¦ end — qator oxiri, ya'ni o'ng. ¦ end means the right side." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: прятать и показывать ¦ Xulosa: yashirish va ko'rsatish ¦ Summary: hide and reveal",
      chat: "какой компонент добавите на свой сайт? ¦ saytingizga qaysi komponentni qo'shasiz? ¦ which component will you add to your site?",
      answer: "Collapse прячет блок классом collapse и показывает, добавляя show. Accordion — это несколько Collapse с общим data-bs-parent, поэтому открыт только один ответ. Offcanvas выдвигает панель сбоку: offcanvas-start слева, offcanvas-end справа. Кнопкам нужны data-bs-toggle (что делать) и data-bs-target (с каким элементом), а JavaScript уже внутри Bootstrap. ¦ Collapse blokni collapse klassi bilan yashiradi va show qo'shib ko'rsatadi. Accordion — umumiy data-bs-parent'li bir nechta Collapse, shuning uchun faqat bitta javob ochiq. Offcanvas panelni yondan chiqaradi: offcanvas-start chapdan, offcanvas-end o'ngdan. Tugmalarga data-bs-toggle (nima qilish) va data-bs-target (qaysi element bilan) kerak, JavaScript esa allaqachon Bootstrap ichida. ¦ Collapse hides a block with the collapse class and shows it by adding show. An accordion is several collapses sharing data-bs-parent, so only one answer is open. Offcanvas slides a panel in: offcanvas-start from the left, offcanvas-end from the right. Buttons need data-bs-toggle (the action) and data-bs-target (the element); the JavaScript is built into Bootstrap.",
      icon: '🪗',
      badge: "Мастер панелей ¦ Panellar ustasi ¦ Panel master",
      badgeSub: "Bootstrap · техническая 2 ¦ Bootstrap · texnik 2 ¦ Bootstrap · technical 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте блок «Частые вопросы» из 5 пунктов. ¦ 5 banddan iborat «Ko'p so'raladigan savollar» blokini yasang. ¦ Build a 5-item FAQ block.",
        "Добавьте мобильное меню на Offcanvas. ¦ Offcanvas'da mobil menyu qo'shing. ¦ Add an Offcanvas phone menu.",
      ],
      takeaway: "Дальше: подсказки и уведомления — Tooltip, Popover, Toast. ¦ Keyingisi: maslahatlar va bildirishnomalar — Tooltip, Popover, Toast. ¦ Next: hints and notifications — Tooltip, Popover, Toast.",
      notes: { min: 2 },
    },
  ],
});
