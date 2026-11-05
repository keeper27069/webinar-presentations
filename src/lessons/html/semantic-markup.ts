import { kit } from '@engine/kit';

const BOX_CSS = `.pg{display:grid;grid-template-rows:auto auto 1fr auto;gap:10px;height:100%}
.pg>*{display:flex;align-items:center;justify-content:center;border-radius:14px;font:800 24px Manrope,system-ui;background:#e8eaf0;color:#8a90a3;min-height:64px}
.pg .main{min-height:200px}
.pg header{background:#ffe0d6;color:#c2410c}.pg nav{background:#dbeafe;color:#1d4ed8}.pg main{background:#dcfce7;color:#15803d}.pg footer{background:#ede9fe;color:#6d28d9}`;
const page = (h: string, n: string, m: string, f: string) => `<div class="pg">${h}${n}${m}${f}</div>`;
const DIVS = page('<div>div</div>', '<div>div</div>', '<div class="main">div</div>', '<div>div</div>');

const LIVE_HTML = `<header>🍩 Donut Lab</header>
<nav>Menu · Prices · Contacts</nav>
<main>
  <article>
    <h2>New: berry donut</h2>
    <p>Pink, sweet and very soft.</p>
  </article>
</main>
<footer>© Donut Lab</footer>`;
const LIVE_CSS = `body{font-family:Manrope,system-ui;margin:0}
header{padding:20px;background:#f2573a;color:#fff;font-size:28px;font-weight:800}
nav{padding:12px 20px;background:#ffe0d6}
main{padding:20px}
article{padding:18px;border-radius:16px;background:#f4f5f8}
footer{padding:14px 20px;color:#888}`;

export default kit({
  id: 'html-t01',
  title: "Семантическая вёрстка ¦ Semantik vyorstka ¦ Semantic markup",
  question: "Как подписать части страницы, чтобы их понимал и человек, и робот? ¦ Sahifa qismlarini inson ham, robot ham tushunadigan qilib qanday belgilash mumkin? ¦ How do you label page parts so both people and robots understand them?",
  route: ["Коробки ¦ Qutilar ¦ Boxes", "Подписи ¦ Belgilar ¦ Labels", "Кто читает ¦ Kim o'qiydi ¦ Who reads", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🏷️',
      kicker: "HTML · техническая тема 1 ¦ HTML · texnik mavzu 1 ¦ HTML · technical topic 1",
      title: "Подписанные коробки ¦ Belgilangan qutilar ¦ Labelled boxes",
      chat: "как вы подписываете коробки при переезде? ¦ ko'chishda qutilarni qanday belgilaysiz? ¦ how do you label boxes when moving house?",
      lead: "Можно сложить всё в одинаковые коробки div. А можно подписать: «шапка», «меню», «главное», «подвал». ¦ Hammasini bir xil div qutilarga solish mumkin. Yoki belgilash mumkin: «sarlavha», «menyu», «asosiy», «pastki qism». ¦ You can pack everything into identical div boxes — or label them: header, menu, main, footer.",
      facts: ["header — шапка ¦ header — sarlavha ¦ header — the top", "main — главное ¦ main — asosiy ¦ main — the content", "footer — подвал ¦ footer — pastki qism ¦ footer — the bottom"],
      takeaway: "Семантика = теги с понятными именами. ¦ Semantika = tushunarli nomli teglar. ¦ Semantics = tags with meaningful names.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Из div — в понятные теги ¦ div'dan — tushunarli teglarga ¦ From divs to meaningful tags",
      chat: "какая часть самая верхняя? ¦ qaysi qism eng yuqorida? ¦ which part is at the very top?",
      css: BOX_CSS,
      steps: [
        { code: '<div>…</div>\n<div>…</div>\n<div>…</div>\n<div>…</div>', html: DIVS, say: "Одни div — непонятно, где что. ¦ Faqat div — nima qayerdaligi tushunarsiz. ¦ All divs: no idea what's what." },
        { code: '<header>…</header>\n<div>…</div>\n<div>…</div>\n<div>…</div>', line: 1, html: page('<header>header</header>', '<div>div</div>', '<div class="main">div</div>', '<div>div</div>'), say: "header — шапка: логотип и название. ¦ header — sarlavha: logotip va nom. ¦ header: the logo and name." },
        { code: '<header>…</header>\n<nav>…</nav>\n<div>…</div>\n<div>…</div>', line: 2, html: page('<header>header</header>', '<nav>nav</nav>', '<div class="main">div</div>', '<div>div</div>'), say: "nav — меню со ссылками. ¦ nav — havolali menyu. ¦ nav: the menu of links." },
        { code: '<header>…</header>\n<nav>…</nav>\n<main>…</main>\n<div>…</div>', line: 3, html: page('<header>header</header>', '<nav>nav</nav>', '<main class="main">main</main>', '<div>div</div>'), say: "main — главное содержимое страницы. ¦ main — sahifaning asosiy mazmuni. ¦ main: the page's main content." },
        { code: '<header>…</header>\n<nav>…</nav>\n<main>…</main>\n<footer>…</footer>', line: 4, html: page('<header>header</header>', '<nav>nav</nav>', '<main class="main">main</main>', '<footer>footer</footer>'), say: "footer — подвал: контакты и копирайт. ¦ footer — pastki qism: kontaktlar va mualliflik. ¦ footer: contacts and copyright." },
      ],
      takeaway: "Выглядит так же, но теперь каждая часть подписана. ¦ Ko'rinishi o'sha, lekin endi har bir qism belgilangan. ¦ It looks the same, but every part now has a label.",
      notes: { say: ["Цвета здесь — только для наглядности; сами теги цвет не меняют."], min: 6 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Кто читает эти подписи? ¦ Bu belgilarni kim o'qiydi? ¦ Who reads these labels?",
      chat: "кому ещё нужны подписи на странице? ¦ sahifadagi belgilar yana kimga kerak? ¦ who else needs the labels?",
      actors: [
        { id: 'page', icon: '📄', label: "Страница ¦ Sahifa ¦ Page" },
        { id: 'google', icon: '🤖', label: "Робот Google ¦ Google roboti ¦ Google's robot" },
        { id: 'reader', icon: '🔊', label: "Чтец для незрячих ¦ Ko'zi ojizlar uchun o'quvchi ¦ Screen reader" },
        { id: 'dev', icon: '🧑‍💻', label: "Другой программист ¦ Boshqa dasturchi ¦ Another developer" },
        { id: 'q1', text: "Где главное? ¦ Asosiysi qayerda? ¦ Where's the main bit?" },
        { id: 'a1', text: "В main! ¦ main'da! ¦ In main!" },
      ],
      steps: [
        { say: "Ваша страница с подписанными частями. ¦ Belgilangan qismlarga ega sahifangiz. ¦ Your page with labelled parts.", at: { page: [50, 50, 1.2] } },
        { say: "Робот Google ищет главное, чтобы показать в поиске. ¦ Google roboti qidiruvda ko'rsatish uchun asosiysini qidiradi. ¦ Google's robot looks for the main part to show in search.", at: { google: [15, 30], q1: [15, 72] }, lines: [['google', 'page']] },
        { say: "Подпись main сразу отвечает! ¦ main belgisi darhol javob beradi! ¦ The main label answers right away!", hide: ['q1'], at: { a1: [50, 18] }, pulse: ['page'], lines: [['google', 'page']] },
        { say: "Чтец для незрячих людей тоже понимает: «вот меню, вот текст». ¦ Ko'zi ojizlar uchun o'quvchi ham tushunadi: «mana menyu, mana matn». ¦ A screen reader understands too: “here's the menu, here's the text”.", at: { reader: [85, 30] }, lines: [['google', 'page'], ['reader', 'page']] },
        { say: "И другому программисту проще читать ваш код. ¦ Va boshqa dasturchiga kodingizni o'qish osonroq. ¦ And other developers read your code faster.", at: { dev: [50, 85] }, lines: [['google', 'page'], ['reader', 'page'], ['dev', 'page']] },
      ],
      takeaway: "Семантика помогает поиску, людям с плохим зрением и команде. ¦ Semantika qidiruvga, ko'rishi zaif odamlarga va jamoaga yordam beradi. ¦ Semantics helps search engines, people with low vision and your team.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Соберите страницу сами ¦ Sahifani o'zingiz yig'ing ¦ Build the page yourself",
      chat: "что добавим во второй article? ¦ ikkinchi article'ga nima qo'shamiz? ¦ what goes in a second article?",
      task: "✍️ Добавьте ещё один article внутрь main ¦ ✍️ main ichiga yana bitta article qo'shing ¦ ✍️ Add another article inside main",
      steps: [{ label: "Пончиковая ¦ Ponchikxona ¦ Donut shop", html: LIVE_HTML, css: LIVE_CSS }],
      takeaway: "article — отдельная самостоятельная часть: новость, пост, карточка товара. ¦ article — alohida mustaqil qism: yangilik, post, mahsulot kartochkasi. ¦ article is a standalone piece: a news item, a post, a product card.",
      notes: { min: 6 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какой тег подходит? ¦ Qaysi teg mos keladi? ¦ Which tag fits?",
      chat: "пишите: «1 — footer» ¦ yozing: «1 — footer» ¦ write: “1 — footer”",
      zones: [
        { id: 'header', label: '<header>', icon: '🔝' },
        { id: 'nav', label: '<nav>', icon: '🧭' },
        { id: 'main', label: '<main>', icon: '📰' },
        { id: 'footer', label: '<footer>', icon: '🔚' },
      ],
      items: [
        { text: "Логотип и название сайта ¦ Logotip va sayt nomi ¦ The logo and site name", zone: 'header' },
        { text: "Ссылки «Меню · Цены · Контакты» ¦ «Menyu · Narxlar · Kontaktlar» havolalari ¦ “Menu · Prices · Contacts” links", zone: 'nav' },
        { text: "Статья про новый пончик ¦ Yangi ponchik haqida maqola ¦ An article about a new donut", zone: 'main' },
        { text: "Телефон и © 2026 ¦ Telefon va © 2026 ¦ Phone and © 2026", zone: 'footer' },
      ],
      takeaway: "Сверху вниз: header → nav → main → footer. ¦ Yuqoridan pastga: header → nav → main → footer. ¦ Top to bottom: header → nav → main → footer.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: подпиши страницу ¦ Missiya: sahifani belgila ¦ Mission: label the page",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Страницу поймёт любой! ¦ Sahifani har kim tushunadi! ¦ Anyone can understand the page!",
      items: [
        { title: "Меню со ссылками ¦ Havolali menyu ¦ A menu of links", choices: ['<nav>', '<footer>'], correct: 0, explain: "nav — навигация. ¦ nav — navigatsiya. ¦ nav = navigation." },
        { title: "Главное содержимое ¦ Asosiy mazmun ¦ The main content", choices: ['<main>', '<div>'], correct: 0, explain: "main на странице один. ¦ Sahifada main bitta bo'ladi. ¦ There's one main per page." },
        { title: "Меняет ли семантика внешний вид? ¦ Semantika tashqi ko'rinishni o'zgartiradimi? ¦ Does semantics change the look?", choices: ["Нет, только смысл ¦ Yo'q, faqat ma'noni ¦ No, only the meaning", "Да, делает красиво ¦ Ha, chiroyli qiladi ¦ Yes, it makes it pretty"], correct: 0, explain: "Вид задаёт CSS. ¦ Ko'rinishni CSS belgilaydi. ¦ CSS sets the look." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: семантика ¦ Xulosa: semantika ¦ Summary: semantics",
      chat: "пришлите скриншот своей подписанной страницы! ¦ belgilangan sahifangiz skrinshotini yuboring! ¦ share a screenshot of your labelled page!",
      answer: "Вместо одинаковых div подписываем части страницы: header — шапка, nav — меню, main — главное, article — отдельная статья или карточка, footer — подвал. Внешне ничего не меняется, но страницу лучше понимают Google, чтецы для незрячих и другие программисты. ¦ Bir xil div'lar o'rniga sahifa qismlarini belgilaymiz: header — sarlavha, nav — menyu, main — asosiy, article — alohida maqola yoki kartochka, footer — pastki qism. Tashqi tomondan hech narsa o'zgarmaydi, lekin sahifani Google, ko'zi ojizlar uchun o'quvchilar va boshqa dasturchilar yaxshiroq tushunadi. ¦ Instead of identical divs we label the parts: header — top, nav — menu, main — content, article — a standalone piece, footer — bottom. Nothing changes visually, but Google, screen readers and other developers understand the page better.",
      icon: '🏷️',
      badge: "Мастер подписей ¦ Belgilar ustasi ¦ Label master",
      badgeSub: "HTML · техническая 1 ¦ HTML · texnik 1 ¦ HTML · technical 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте страницу своего хобби из header, nav, main и footer. ¦ Hobbingiz sahifasini header, nav, main va footer'dan yarating. ¦ Build a hobby page from header, nav, main and footer.",
        "Добавьте в main два article. ¦ main ichiga ikkita article qo'shing. ¦ Put two articles inside main.",
      ],
      takeaway: "Дальше: как подключать картинки и файлы. ¦ Keyingisi: rasm va fayllarni qanday ulash. ¦ Next: linking images and files.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
