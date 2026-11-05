import { kit } from '@engine/kit';

const CSS = `.dev{margin:0 auto;border:6px solid #16181f;border-radius:26px;padding:14px;background:#f4f5f8;height:520px;overflow:hidden}
.dev h3{margin:0 0 10px;font-size:22px}
.g{display:grid;gap:10px}
.g i{display:grid;place-items:center;height:90px;border-radius:14px;background:#3d7bff;color:#fff;font:800 26px Manrope,system-ui;font-style:normal}
.w{font:800 18px JetBrains Mono,monospace;color:#3d7bff;text-align:center;margin-bottom:8px}`;
const dev = (w: number, cols: number, label: string) =>
  `<div class="w">${label} · ${w}px</div><div class="dev" style="width:${w}px"><h3>🛍️ Shop</h3><div class="g" style="grid-template-columns:repeat(${cols},1fr)"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i></div></div>`;

export default kit({
  id: 'css-t01',
  title: "Медиазапросы ¦ Media so'rovlar ¦ Media queries",
  question: "Как один сайт красиво выглядит и на компьютере, и на телефоне? ¦ Bitta sayt kompyuterda ham, telefonda ham qanday chiroyli ko'rinadi? ¦ How does one site look great on both a computer and a phone?",
  route: ["Проблема ¦ Muammo ¦ The problem", "Как это работает ¦ Qanday ishlaydi ¦ How it works", "Синтаксис ¦ Sintaksis ¦ Syntax", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '📱',
      kicker: "CSS · техническая тема 1 ¦ CSS · texnik mavzu 1 ¦ CSS · technical topic 1",
      title: "Сайт, который меняет форму ¦ Shaklini o'zgartiradigan sayt ¦ A site that changes shape",
      chat: "с чего вы чаще открываете сайты — с телефона или компьютера? ¦ saytlarni ko'proq nimadan ochasiz — telefondanmi yoki kompyuterdanmi? ¦ do you open sites more on a phone or a computer?",
      lead: "Экран телефона узкий, компьютера — широкий. Медиазапрос говорит сайту: «если экран узкий — перестройся». ¦ Telefon ekrani tor, kompyuterniki — keng. Media so'rov saytga aytadi: «ekran tor bo'lsa — qayta tuzil». ¦ Phone screens are narrow, computers wide. A media query tells the site: “if the screen is narrow, rearrange”.",
      facts: ["Один код — все экраны ¦ Bitta kod — barcha ekranlar ¦ One code, every screen", "Условие по ширине ¦ Kenglik bo'yicha shart ¦ A condition on width", "Колонки перестраиваются ¦ Ustunlar qayta tuziladi ¦ Columns rearrange"],
      takeaway: "Посмотрим, как одна страница «перетекает» под разные экраны. ¦ Bitta sahifa turli ekranlarga qanday «oqib o'tishini» ko'ramiz. ¦ Let's watch one page flow across different screens.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Один магазин — три экрана ¦ Bitta do'kon — uchta ekran ¦ One shop, three screens",
      chat: "сколько колонок поместится на телефоне? ¦ telefonga nechta ustun sig'adi? ¦ how many columns fit on a phone?",
      css: CSS,
      lang: 'css',
      steps: [
        { code: '.grid {\n  grid-template-columns: repeat(3, 1fr);\n}', line: 2, html: dev(640, 3, '💻'), say: "Компьютер: широко — три колонки. ¦ Kompyuter: keng — uchta ustun. ¦ Computer: wide — three columns." },
        { code: '@media (max-width: 900px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}', line: 1, html: dev(440, 2, '📟'), say: "Планшет: экран уже — две колонки. ¦ Planshet: ekran torroq — ikkita ustun. ¦ Tablet: narrower — two columns." },
        { code: '@media (max-width: 600px) {\n  .grid { grid-template-columns: 1fr; }\n}', line: 1, html: dev(260, 1, '📱'), say: "Телефон: одна колонка, листаем вниз. ¦ Telefon: bitta ustun, pastga varaqlaymiz. ¦ Phone: one column — just scroll down." },
      ],
      takeaway: "Карточки те же — меняется только их раскладка. ¦ Kartochkalar o'sha — faqat ularning joylashuvi o'zgaradi. ¦ Same cards — only the layout changes.",
      notes: { say: ["Покажите то же вживую: сужайте окно браузера на любом сайте."], min: 5 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Как браузер решает ¦ Brauzer qanday qaror qiladi ¦ How the browser decides",
      chat: "какой стиль сработает на экране 500px? ¦ 500px ekranda qaysi uslub ishlaydi? ¦ which style applies on a 500px screen?",
      actors: [
        { id: 'phone', icon: '📱', label: "Экран 500px ¦ 500px ekran ¦ 500px screen" },
        { id: 'q', text: "Ширина ≤ 600px? ¦ Kenglik ≤ 600px? ¦ Width ≤ 600px?" },
        { id: 'yes', text: "Да → 1 колонка ¦ Ha → 1 ustun ¦ Yes → 1 column" },
        { id: 'no', text: "Нет → 3 колонки ¦ Yo'q → 3 ustun ¦ No → 3 columns" },
      ],
      steps: [
        { say: "Браузер узнаёт ширину экрана. ¦ Brauzer ekran kengligini aniqlaydi. ¦ The browser checks the screen width.", at: { phone: [15, 50] } },
        { say: "И задаёт вопрос из медиазапроса. ¦ Va media so'rovdagi savolni beradi. ¦ It asks the media query's question.", at: { q: [50, 50] }, lines: [['phone', 'q']], pulse: ['q'] },
        { say: "500 меньше 600 — значит «да»! ¦ 500 600 dan kichik — demak «ha»! ¦ 500 is under 600 — so “yes”!", at: { yes: [82, 25], no: [82, 75] }, lines: [['phone', 'q'], ['q', 'yes']], pulse: ['yes'] },
      ],
      takeaway: "Медиазапрос — это if для CSS: «если экран такой — примени эти стили». ¦ Media so'rov — CSS uchun if: «ekran shunday bo'lsa — bu uslublarni qo'lla». ¦ A media query is CSS's if: “if the screen is like this, use these styles”.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Не только колонки ¦ Faqat ustunlar emas ¦ Not just columns",
      chat: "что ещё стоит менять на телефоне? ¦ telefonda yana nimani o'zgartirish kerak? ¦ what else should change on a phone?",
      lang: 'css',
      css: 'h1{margin:0 0 8px;transition:all .7s}p{color:#666;font-size:22px}.hero{padding:26px;border-radius:20px;background:#eef4ff}',
      steps: [
        { code: 'h1 { font-size: 56px; }', html: '<div class="hero"><h1 style="font-size:56px">Big Sale 🔥</h1><p>Everything −50%</p></div>', say: "На компьютере заголовок большой. ¦ Kompyuterda sarlavha katta. ¦ On a computer the heading is big." },
        { code: '@media (max-width: 600px) {\n  h1 { font-size: 32px; }\n}', line: 2, html: '<div class="hero" style="max-width:280px;margin:0 auto"><h1 style="font-size:32px">Big Sale 🔥</h1><p>Everything −50%</p></div>', say: "На телефоне — поменьше, чтобы влез. ¦ Telefonda — kichikroq, sig'ishi uchun. ¦ On a phone it shrinks so it fits." },
      ],
      takeaway: "Шрифты, отступы, видимость — всё можно менять медиазапросом. ¦ Shriftlar, bo'shliqlar, ko'rinish — hammasini media so'rov bilan o'zgartirish mumkin. ¦ Fonts, spacing, visibility — media queries can change them all.",
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Попробуйте сами ¦ O'zingiz sinab ko'ring ¦ Try it yourself",
      chat: "при какой ширине станет 1 колонка? ¦ qaysi kenglikda 1 ustun bo'ladi? ¦ at what width does it become 1 column?",
      task: "✍️ Поменяйте 600px на 900px и сравните ¦ ✍️ 600px'ni 900px'ga o'zgartiring va solishtiring ¦ ✍️ Change 600px to 900px and compare",
      steps: [{ label: "Сетка ¦ To'r ¦ Grid", html: '<div class="grid">\n  <div>🍕</div><div>🍔</div><div>🍟</div>\n  <div>🌮</div><div>🍩</div><div>🥤</div>\n</div>', css: 'body{font-family:Manrope,system-ui}\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.grid div {\n  font-size: 48px; text-align: center;\n  padding: 20px; border-radius: 16px; background: #eef4ff;\n}\n@media (max-width: 600px) {\n  .grid { grid-template-columns: 1fr; }\n}' }],
      takeaway: "Окно предпросмотра узкое — поэтому правило сработало. ¦ Ko'rish oynasi tor — shuning uchun qoida ishladi. ¦ The preview is narrow, so the rule kicks in.",
      notes: { say: ["В DevTools включите режим телефона (Ctrl+Shift+M) и покажите то же."], min: 6 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Для телефона нужен отдельный сайт ¦ Telefon uchun alohida sayt kerak ¦ Phones need a separate site", truth: false, explain: "Один сайт + медиазапросы. ¦ Bitta sayt + media so'rovlar. ¦ One site plus media queries." },
        { text: "max-width: 600px — «экран 600px и уже» ¦ max-width: 600px — «600px va undan tor ekran» ¦ max-width: 600px means “600px or narrower”", truth: true, explain: "max — максимум. ¦ max — maksimum. ¦ max = maximum." },
        { text: "Большинство людей заходят на сайты с телефона ¦ Ko'pchilik saytlarga telefondan kiradi ¦ Most people visit sites on phones", truth: true, explain: "Поэтому телефон проверяют первым. ¦ Shuning uchun telefon birinchi tekshiriladi. ¦ So check phones first." },
      ],
      takeaway: "Сайт без медиазапросов на телефоне — как газета под лупой. ¦ Media so'rovsiz sayt telefonda — lupa ostidagi gazeta kabi. ¦ A site without media queries on a phone is like reading a newspaper through a straw.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: сайт для всех экранов ¦ Missiya: barcha ekranlar uchun sayt ¦ Mission: a site for every screen",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сайт красивый на любом экране! ¦ Sayt istalgan ekranda chiroyli! ¦ The site looks great on any screen!",
      items: [
        { title: "Стиль только для узких экранов ¦ Faqat tor ekranlar uchun uslub ¦ A style for narrow screens only", choices: ['@media (max-width: 600px)', '@media (min-width: 600px)'], correct: 0, explain: "max — «до 600px». ¦ max — «600px gacha». ¦ max means “up to 600px”." },
        { title: "Сколько колонок на телефоне? ¦ Telefonda nechta ustun? ¦ How many columns on a phone?", choices: ['1', '5'], correct: 0, explain: "Узко — одна колонка. ¦ Tor — bitta ustun. ¦ Narrow means one column." },
        { title: "Как быстро проверить телефон? ¦ Telefonni qanday tez tekshirish mumkin? ¦ Quickest phone check?", choices: ["Режим телефона в DevTools ¦ DevTools'dagi telefon rejimi ¦ DevTools phone mode", "Купить 10 телефонов ¦ 10 ta telefon sotib olish ¦ Buy 10 phones"], correct: 0, explain: "Ctrl+Shift+M в Chrome. ¦ Chrome'da Ctrl+Shift+M. ¦ Ctrl+Shift+M in Chrome." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: медиазапросы ¦ Xulosa: media so'rovlar ¦ Summary: media queries",
      chat: "пришлите скриншот своего сайта на телефоне! ¦ saytingizning telefondagi skrinshotini yuboring! ¦ share a screenshot of your site on a phone!",
      answer: "Медиазапрос — это «если» для CSS: @media (max-width: 600px) { … } применяет стили только на экранах уже 600px. Так один сайт перестраивается: три колонки на компьютере, две на планшете и одна на телефоне, а шрифты становятся меньше. Проверяйте телефон в режиме DevTools. ¦ Media so'rov — CSS uchun «agar»: @media (max-width: 600px) { … } uslublarni faqat 600px'dan tor ekranlarda qo'llaydi. Shunday qilib bitta sayt qayta tuziladi: kompyuterda uchta, planshetda ikkita va telefonda bitta ustun, shriftlar esa kichrayadi. Telefonni DevTools rejimida tekshiring. ¦ A media query is CSS's “if”: @media (max-width: 600px) { … } applies styles only on screens narrower than 600px. One site rearranges itself: three columns on a computer, two on a tablet, one on a phone, with smaller fonts. Check phones in DevTools mode.",
      icon: '📱',
      badge: "Мастер всех экранов ¦ Barcha ekranlar ustasi ¦ Every-screen master",
      badgeSub: "CSS · техническая 1 ¦ CSS · texnik 1 ¦ CSS · technical 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте сетку из 6 карточек: 3 колонки → 2 → 1. ¦ 6 ta kartochkali to'r yarating: 3 ustun → 2 → 1. ¦ Build a 6-card grid: 3 columns → 2 → 1.",
        "Проверьте её в режиме телефона в DevTools. ¦ Uni DevTools'ning telefon rejimida tekshiring. ¦ Check it in DevTools phone mode.",
      ],
      takeaway: "Дальше: CSS Grid — раскладка сеткой. ¦ Keyingisi: CSS Grid — to'r bilan joylashtirish. ¦ Next: CSS Grid — layout with a grid.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
