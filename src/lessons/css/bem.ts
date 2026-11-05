import { kit } from '@engine/kit';

const CSS = `.card{width:380px;margin:20px auto;padding:20px;border-radius:22px;background:#fff;box-shadow:0 10px 30px #0001;border:4px solid transparent;font-family:Manrope,system-ui}
.tag{display:inline-block;padding:3px 10px;border-radius:8px;font:800 16px JetBrains Mono,monospace;margin-bottom:6px}
.e{border-radius:12px;padding:8px;border:3px dashed transparent}
.blk{border-color:#3d7bff}.blk .bt{background:#dbeafe;color:#1d4ed8}
.el{border-color:#0fb5a6}.el .et{background:#ccfbf1;color:#0f766e}
.mod{background:#fff1ec}.mod .mt{background:#ffe0d6;color:#c2410c}
.img{font-size:70px;text-align:center}.ttl{font-size:28px;font-weight:800}.btn{display:inline-block;padding:10px 22px;border-radius:12px;background:#16181f;color:#fff;font-weight:800}`;
const card = (b: boolean, e: boolean, m: boolean) =>
  `<div class="card ${b ? 'blk' : ''} ${m ? 'mod' : ''}">${b ? '<span class="tag bt">card</span>' : ''}${m ? ' <span class="tag mt">card--sale</span>' : ''}
<div class="e ${e ? 'el' : ''}">${e ? '<span class="tag et">card__image</span>' : ''}<div class="img">🍩</div></div>
<div class="e ${e ? 'el' : ''}">${e ? '<span class="tag et">card__title</span>' : ''}<div class="ttl">Donut</div></div>
<div class="e ${e ? 'el' : ''}">${e ? '<span class="tag et">card__button</span>' : ''}<span class="btn" style="${m ? 'background:#f2573a' : ''}">Buy</span></div></div>`;

export default kit({
  id: 'css-t09',
  title: "БЭМ: понятные имена классов ¦ BEM: tushunarli klass nomlari ¦ BEM: clear class names",
  question: "Как называть классы, чтобы через месяц не запутаться в своём же коде? ¦ Bir oydan keyin o'z kodingizda adashmaslik uchun klasslarni qanday nomlash kerak? ¦ How do you name classes so you don't get lost in your own code a month later?",
  route: ["Хаос ¦ Tartibsizlik ¦ Chaos", "Блок ¦ Blok ¦ Block", "Элемент ¦ Element ¦ Element", "Модификатор ¦ Modifikator ¦ Modifier", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🧩',
      kicker: "CSS · техническая тема 9 ¦ CSS · texnik mavzu 9 ¦ CSS · technical topic 9",
      title: "Имена как адрес: город, улица, дом ¦ Nomlar manzil kabi: shahar, ko'cha, uy ¦ Names like an address: city, street, house",
      chat: "какие названия классов вы обычно придумываете? ¦ odatda qanday klass nomlarini o'ylab topasiz? ¦ what class names do you usually invent?",
      lead: "Классы «box1», «red», «big2» быстро превращаются в хаос. БЭМ — правило: блок, элемент, модификатор. ¦ «box1», «red», «big2» klasslari tezda tartibsizlikka aylanadi. BEM — qoida: blok, element, modifikator. ¦ Classes like “box1”, “red”, “big2” turn into chaos fast. BEM is a rule: block, element, modifier.",
      facts: ["Блок: card ¦ Blok: card ¦ Block: card", "Элемент: card__title ¦ Element: card__title ¦ Element: card__title", "Модификатор: card--sale ¦ Modifikator: card--sale ¦ Modifier: card--sale"],
      takeaway: "Посмотрим на одну карточку через «очки БЭМ». ¦ Bitta kartochkaga «BEM ko'zoynagi» orqali qaraymiz. ¦ Let's look at one card through BEM glasses.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Карточка через очки БЭМ ¦ BEM ko'zoynagi orqali kartochka ¦ A card through BEM glasses",
      chat: "как назовёте кнопку внутри карточки? ¦ kartochka ichidagi tugmani qanday nomlaysiz? ¦ what would you name the button inside the card?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<div class="box1">\n  <div class="pic">…</div>\n  <div class="big2">…</div>\n</div>', html: card(false, false, false), say: "Обычная карточка. Имена классов — кто во что горазд. ¦ Oddiy kartochka. Klass nomlari — kim qanday xohlasa. ¦ A normal card with random class names." },
        { code: '<div class="card">', line: 1, html: card(true, false, false), say: "Блок — самостоятельная часть: card. ¦ Blok — mustaqil qism: card. ¦ The block is a standalone piece: card." },
        { code: '<div class="card">\n  <div class="card__image">…</div>\n  <h3 class="card__title">…</h3>\n  <a class="card__button">…</a>\n</div>', line: 2, html: card(true, true, false), say: "Элементы — части блока: имя блока + __ + часть. ¦ Elementlar — blok qismlari: blok nomi + __ + qism. ¦ Elements are parts of the block: block name + __ + part." },
        { code: '<div class="card card--sale">', line: 1, html: card(true, true, true), say: "Модификатор — вариант: card--sale, «карточка со скидкой». ¦ Modifikator — variant: card--sale, «chegirmali kartochka». ¦ A modifier is a variant: card--sale, “a card on sale”." },
      ],
      takeaway: "__ — «часть чего-то», -- — «другой вариант». ¦ __ — «nimaningdir qismi», -- — «boshqa variant». ¦ __ means “part of”, -- means “another version”.",
      notes: { min: 6 },
    },
    {
      type: 'sort',
      stage: 2,
      title: "Блок, элемент или модификатор? ¦ Blok, element yoki modifikator? ¦ Block, element or modifier?",
      chat: "пишите: «1 — элемент» ¦ yozing: «1 — element» ¦ write: “1 — element”",
      zones: [
        { id: 'b', label: "Блок ¦ Blok ¦ Block", icon: '📦' },
        { id: 'e', label: "Элемент ¦ Element ¦ Element", icon: '🧩' },
        { id: 'm', label: "Модификатор ¦ Modifikator ¦ Modifier", icon: '🎨' },
      ],
      items: [
        { text: 'menu', zone: 'b' },
        { text: 'menu__link', zone: 'e' },
        { text: 'menu__link--active', zone: 'm', why: "Активная ссылка — вариант элемента. ¦ Faol havola — element varianti. ¦ The active link is a variant of an element." },
        { text: 'button--big', zone: 'm' },
        { text: 'header__logo', zone: 'e' },
      ],
      takeaway: "По имени сразу понятно, где класс живёт и что делает. ¦ Nomidan klass qayerda yashashi va nima qilishi darhol tushunarli. ¦ The name alone tells you where a class lives and what it does.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Хаос и БЭМ ¦ Tartibsizlik va BEM ¦ Chaos vs BEM",
      chat: "в каком коде проще найти кнопку меню? ¦ qaysi kodda menyu tugmasini topish osonroq? ¦ where is the menu button easier to find?",
      left: { icon: '🌀', label: "Хаос ¦ Tartibsizlik ¦ Chaos", code: `.box1 { }\n.red { }\n.big2 { }\n.new-new { }`, lang: 'css' },
      right: { icon: '🧩', label: "БЭМ ¦ BEM ¦ BEM", code: `.menu { }\n.menu__link { }\n.menu__link--active { }\n.menu__button { }`, lang: 'css' },
      verdict: "В БЭМ имена длиннее, зато их можно читать как предложение. ¦ BEM'da nomlar uzunroq, lekin ularni gap kabi o'qish mumkin. ¦ BEM names are longer, but they read like a sentence.",
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Добавьте модификатор ¦ Modifikator qo'shing ¦ Add a modifier",
      chat: "какой вариант кнопки сделаем? ¦ tugmaning qanday variantini qilamiz? ¦ which button variant shall we make?",
      task: "✍️ Добавьте второй кнопке класс button--danger ¦ ✍️ Ikkinchi tugmaga button--danger klassini qo'shing ¦ ✍️ Give the second button the class button--danger",
      steps: [{ label: "Кнопки ¦ Tugmalar ¦ Buttons", html: '<button class="button">Save</button>\n<button class="button">Delete</button>', css: 'body { font-family: Manrope, system-ui; padding: 30px; }\n.button {\n  padding: 14px 28px; margin: 6px;\n  border: 0; border-radius: 14px;\n  background: #3d7bff; color: #fff;\n  font-size: 22px; font-weight: 800;\n}\n.button--danger {\n  background: #ef4b4b;\n}' }],
      takeaway: "Базовый стиль один, а вариантов — сколько угодно. ¦ Asosiy uslub bitta, variantlar esa — xohlagancha. ¦ One base style, as many variants as you like.",
      notes: { min: 5 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: порядок в классах ¦ Missiya: klasslarda tartib ¦ Mission: tidy classes",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Классы понятны любому! ¦ Klasslar har kimga tushunarli! ¦ Anyone can read your classes!",
      items: [
        { title: "Заголовок внутри блока news ¦ news bloki ichidagi sarlavha ¦ A title inside a news block", choices: ['news__title', 'title-news-1'], correct: 0, explain: "Блок + __ + элемент. ¦ Blok + __ + element. ¦ Block + __ + element." },
        { title: "Большая кнопка ¦ Katta tugma ¦ A big button", choices: ['button--big', 'button__big'], correct: 0, explain: "Вариант — через --. ¦ Variant — -- orqali. ¦ Variants use --." },
        { title: "Что значит __? ¦ __ nimani anglatadi? ¦ What does __ mean?", choices: ["Часть блока ¦ Blok qismi ¦ Part of a block", "Другой цвет ¦ Boshqa rang ¦ Another colour"], correct: 0, explain: "Элемент блока. ¦ Blok elementi. ¦ An element of the block." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: БЭМ ¦ Xulosa: BEM ¦ Summary: BEM",
      chat: "переименуйте один класс своего сайта по БЭМ! ¦ saytingizdagi bitta klassni BEM bo'yicha qayta nomlang! ¦ rename one of your classes the BEM way!",
      answer: "БЭМ — правило имён: блок (card) — самостоятельная часть, элемент (card__title) — часть блока через два подчёркивания, модификатор (card--sale) — вариант через два дефиса. Имена длиннее, зато по ним сразу видно, где класс живёт и что делает, и команда не путается. ¦ BEM — nomlash qoidasi: blok (card) — mustaqil qism, element (card__title) — ikki pastki chiziq orqali blok qismi, modifikator (card--sale) — ikki defis orqali variant. Nomlar uzunroq, lekin ulardan klass qayerda yashashi va nima qilishi darhol ko'rinadi, jamoa esa adashmaydi. ¦ BEM is a naming rule: a block (card) is a standalone piece, an element (card__title) is part of it via two underscores, and a modifier (card--sale) is a variant via two dashes. Names get longer, but they show where a class lives and what it does, so the team never gets lost.",
      icon: '🧩',
      badge: "Мастер имён ¦ Nomlar ustasi ¦ Naming master",
      badgeSub: "CSS · техническая 9 ¦ CSS · texnik 9 ¦ CSS · technical 9",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Переименуйте классы своей карточки по БЭМ. ¦ Kartochkangiz klasslarini BEM bo'yicha qayta nomlang. ¦ Rename your card's classes the BEM way.",
        "Сделайте вариант card--dark. ¦ card--dark variantini yarating. ¦ Make a card--dark variant.",
      ],
      takeaway: "Дальше: новые возможности CSS — :has() и вложенность. ¦ Keyingisi: CSS'ning yangi imkoniyatlari — :has() va ichma-ichlik. ¦ Next: new CSS powers — :has() and nesting.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
