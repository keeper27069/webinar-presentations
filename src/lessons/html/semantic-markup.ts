import { kit } from '@engine/kit';

const OUTLINE = `body { font-family: system-ui; margin: 0; padding: 12px; }
header, nav, main, article, aside, footer, section {
  display: block; position: relative;
  border: 3px dashed #ff8a3d; border-radius: 10px;
  margin: 8px; padding: 26px 12px 10px;
}
header::before, nav::before, main::before, article::before,
aside::before, footer::before, section::before {
  position: absolute; top: 2px; left: 8px;
  font: 700 13px monospace; color: #ff8a3d;
}
header::before { content: 'header'; }
nav::before { content: 'nav'; }
main::before { content: 'main'; }
article::before { content: 'article'; }
aside::before { content: 'aside'; }
footer::before { content: 'footer'; }
section::before { content: 'section'; }
div { border: 2px dotted #9aa3c7; margin: 6px; padding: 6px; }`;

const DIVS = `<div class="top">
  <div class="logo">Bit Blog</div>
  <div class="menu">
    <a href="#">Home</a> <a href="#">Posts</a>
  </div>
</div>
<div class="content">
  <div class="post">
    <h1>How to learn HTML</h1>
    <p>Start with tags...</p>
  </div>
</div>
<div class="bottom">© 2026 Bit Blog</div>`;

const SEMANTIC = `<header>
  <div class="logo">Bit Blog</div>
  <nav>
    <a href="#">Home</a> <a href="#">Posts</a>
  </nav>
</header>
<main>
  <article>
    <h1>How to learn HTML</h1>
    <p>Start with tags...</p>
  </article>
</main>
<footer>© 2026 Bit Blog</footer>`;

export default kit({
  id: 'html-t01',
  title: "Семантическая вёрстка ¦ Semantik vyorstka ¦ Semantic markup",
  question: "Если страница из одних <div> работает, зачем нужны header, nav, main и footer? ¦ Faqat <div>'lardan iborat sahifa ishlasa, header, nav, main va footer nima uchun kerak? ¦ If a page made only of <div>s works, why do we need header, nav, main and footer?",
  route: ["Проблема ¦ Muammo ¦ Problem", "Теги ¦ Teglar ¦ Tags", "Переделка ¦ Qayta qilish ¦ Rebuild", "Зачем ¦ Nima uchun ¦ Why", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🏷️',
      kicker: "HTML · техническая тема 1 ¦ HTML · texnik mavzu 1 ¦ HTML · technical topic 1",
      title: "Суп из div ¦ div'lardan sho'rva ¦ Div soup",
      chat: "сколько <div> в вашем последнем проекте? ¦ oxirgi loyihangizda nechta <div> bor? ¦ how many <div>s are in your last project?",
      lead: "Страница из одних <div> выглядит нормально. Но человек, программист и Google видят в ней только «коробку в коробке». ¦ Faqat <div>'lardan iborat sahifa yaxshi ko'rinadi. Lekin inson, dasturchi va Google unda faqat «quti ichida quti»ni ko'radi. ¦ A page of only <div>s looks fine. But people, programmers and Google see only “a box inside a box”.",
      takeaway: "Семантика — это теги, которые говорят не «как выглядит», а «что это». ¦ Semantika — «qanday ko'rinadi» emas, «bu nima»ni aytadigan teglar. ¦ Semantics means tags that say “what it is”, not “how it looks”.",
      notes: { say: ["Спросите, сколько div у них в проектах. Обычно — «много».", "→ — главный вопрос."], min: 3 },
    },
    {
      type: 'compare',
      stage: 0,
      title: "Одна страница — два кода ¦ Bitta sahifa — ikki kod ¦ One page, two codes",
      chat: "в каком коде быстрее найти меню? ¦ qaysi kodda menyuni tezroq topish mumkin? ¦ in which code is the menu easier to find?",
      left: { icon: '📦', label: "Только div ¦ Faqat div ¦ Only div", code: DIVS, lang: 'html' },
      right: { icon: '🏷️', label: "Семантика ¦ Semantika ¦ Semantic", code: SEMANTIC, lang: 'html' },
      verdict: "В браузере обе страницы выглядят одинаково. Но во второй сразу видно, где шапка, меню, статья и подвал. ¦ Brauzerda ikkala sahifa bir xil ko'rinadi. Lekin ikkinchisida sarlavha, menyu, maqola va pastki qism darhol ko'rinadi. ¦ Both look the same in the browser. But in the second you instantly see the header, menu, article and footer.",
      notes: { say: ["Спросите: где меню? В левом коде надо читать классы, в правом — сразу <nav>."], min: 4 },
    },
    {
      type: 'cards',
      stage: 1,
      title: "7 главных семантических тегов ¦ 7 asosiy semantik teg ¦ The 7 main semantic tags",
      chat: "какой тег вы уже использовали? ¦ qaysi tegni allaqachon ishlatgansiz? ¦ which tag have you used already?",
      columns: 4,
      cards: [
        { icon: '🔝', front: '<header>', back: "Шапка: логотип, название, иногда меню. ¦ Sarlavha qismi: logotip, nom, ba'zan menyu. ¦ The header: logo, name, sometimes the menu." },
        { icon: '🧭', front: '<nav>', back: "Главная навигация — меню со ссылками. ¦ Asosiy navigatsiya — havolali menyu. ¦ Main navigation — the menu of links." },
        { icon: '🎯', front: '<main>', back: "Главное содержимое. На странице только один. ¦ Asosiy mazmun. Sahifada faqat bitta. ¦ The main content. Only one per page." },
        { icon: '📰', front: '<article>', back: "Самостоятельный кусок: пост, новость, карточка товара. ¦ Mustaqil qism: post, yangilik, mahsulot kartochkasi. ¦ A self-contained piece: a post, news item, product card." },
        { icon: '🧩', front: '<section>', back: "Раздел с заголовком: «Отзывы», «Цены». ¦ Sarlavhali bo'lim: «Sharhlar», «Narxlar». ¦ A themed section with a heading: “Reviews”, “Prices”." },
        { icon: '📌', front: '<aside>', back: "Боковое, дополнительное: реклама, «читайте также». ¦ Yon, qo'shimcha: reklama, «shuningdek o'qing». ¦ Side content: ads, “read also”." },
        { icon: '🔚', front: '<footer>', back: "Подвал: контакты, копирайт, ссылки. ¦ Pastki qism: kontaktlar, mualliflik huquqi, havolalar. ¦ The footer: contacts, copyright, links." },
      ],
      takeaway: "Все они ведут себя как <div>, но несут смысл. ¦ Ularning hammasi <div> kabi ishlaydi, lekin ma'no tashiydi. ¦ They all behave like <div> but carry meaning.",
      notes: { say: ["Открывайте 1–7. Для каждого спросите, где он на YouTube или в Telegram Web."], min: 5 },
    },
    {
      type: 'sort',
      stage: 1,
      title: "Какой тег подходит? ¦ Qaysi teg mos keladi? ¦ Which tag fits?",
      chat: "пишите: «копирайт — footer» ¦ yozing: «mualliflik — footer» ¦ write: “copyright — footer”",
      zones: [
        { id: 'header', label: '<header>' },
        { id: 'nav', label: '<nav>' },
        { id: 'article', label: '<article>' },
        { id: 'aside', label: '<aside>' },
        { id: 'footer', label: '<footer>' },
      ],
      items: [
        { text: "Логотип и название сайта ¦ Logotip va sayt nomi ¦ Logo and site name", zone: 'header' },
        { text: "Ссылки «Главная, Уроки, Контакты» ¦ «Bosh sahifa, Darslar, Kontaktlar» havolalari ¦ Links “Home, Lessons, Contacts”", zone: 'nav' },
        { text: "Пост «Как выучить HTML» ¦ «HTML'ni qanday o'rganish» posti ¦ The post “How to learn HTML”", zone: 'article' },
        { text: "Карточка товара в магазине ¦ Do'kondagi mahsulot kartochkasi ¦ A product card in a shop", zone: 'article' },
        { text: "Блок «Читайте также» сбоку ¦ Yondagi «Shuningdek o'qing» bloki ¦ A “Read also” box on the side", zone: 'aside' },
        { text: "© 2026 и телефон ¦ © 2026 va telefon ¦ © 2026 and a phone number", zone: 'footer' },
      ],
      takeaway: "Спросите себя: «Что это за кусок?» — ответ подскажет тег. ¦ O'zingizdan so'rang: «Bu qanday qism?» — javob tegni aytadi. ¦ Ask yourself “What is this piece?” — the answer names the tag.",
      notes: { say: ["Раскладка по подсказкам чата → «Проверить»."], min: 4 },
    },
    {
      type: 'live',
      stage: 2,
      title: "Переделываем div → семантику ¦ div → semantikaga o'tkazamiz ¦ Rebuilding div → semantic",
      chat: "какой div превратим следующим? ¦ keyingi qaysi div'ni aylantiramiz? ¦ which div shall we convert next?",
      task: "✍️ Оранжевые рамки — семантика, серые — div ¦ ✍️ To'q sariq ramkalar — semantika, kulranglar — div ¦ ✍️ Orange frames are semantic, grey ones are div",
      steps: [
        { label: "Только div ¦ Faqat div ¦ Only div", html: DIVS, css: OUTLINE },
        { label: "Семантика ¦ Semantika ¦ Semantic", html: SEMANTIC, css: OUTLINE },
      ],
      takeaway: "Внешне ничего не изменилось, а код стал понятным: у каждой части есть имя. ¦ Tashqi tomondan hech narsa o'zgarmadi, kod esa tushunarli bo'ldi: har bir qismning nomi bor. ¦ Nothing changed visually, but the code is clear now: every part has a name.",
      notes: { say: ["Начните с «Только div» и меняйте теги вручную по просьбе чата: .top → header, .menu → nav…", "CSS подписывает каждый семантический тег — видно на стриме.", "Не забудьте менять и закрывающий тег!"], switch: "Можно повторить в VS Code ¦ VS Code'da takrorlash mumkin ¦ You can repeat it in VS Code", min: 7 },
    },
    {
      type: 'dialog',
      stage: 3,
      title: "Как страницу «слышит» незрячий человек ¦ Ko'zi ojiz inson sahifani qanday «eshitadi» ¦ How a blind person “hears” a page",
      chat: "как, по-вашему, пользуются сайтами незрячие люди? ¦ sizningcha, ko'zi ojiz odamlar saytlardan qanday foydalanadi? ¦ how do you think blind people use websites?",
      a: { name: "Экранная читалка ¦ Ekran o'quvchisi ¦ Screen reader", icon: '🔊' },
      b: { name: "Пользователь ¦ Foydalanuvchi ¦ User", icon: '🧑‍🦯' },
      messages: [
        { from: 'a', text: "Страница 1: «Группа. Группа. Ссылка Home. Ссылка Posts. Группа. Группа…» ¦ 1-sahifa: «Guruh. Guruh. Home havolasi. Posts havolasi. Guruh. Guruh…» ¦ Page 1: “Group. Group. Link Home. Link Posts. Group. Group…”", flag: "Только div — ничего не понятно ¦ Faqat div — hech narsa tushunarsiz ¦ Only divs — nothing makes sense" },
        { from: 'b', text: "Где здесь меню? Где статья? Придётся слушать всё подряд. ¦ Menyu qayerda? Maqola qayerda? Hammasini ketma-ket tinglashga to'g'ri keladi. ¦ Where is the menu? Where is the article? I have to listen to everything." },
        { from: 'a', text: "Страница 2: «Навигация, 2 ссылки. Основное содержимое. Статья: How to learn HTML». ¦ 2-sahifa: «Navigatsiya, 2 havola. Asosiy mazmun. Maqola: How to learn HTML». ¦ Page 2: “Navigation, 2 links. Main content. Article: How to learn HTML”.", good: "Семантика читается вслух ¦ Semantika ovoz chiqarib o'qiladi ¦ Semantics is read aloud" },
        { from: 'b', text: "Отлично, перехожу сразу к статье! ¦ Zo'r, darhol maqolaga o'taman! ¦ Great, jumping straight to the article!" },
      ],
      takeaway: "Семантические теги — это «оглавление» страницы для программ: читалок, поисковиков, переводчиков. ¦ Semantik teglar — dasturlar uchun sahifa «mundarijasi»: o'quvchi dasturlar, qidiruv tizimlari, tarjimonlar. ¦ Semantic tags are the page's “table of contents” for programs: screen readers, search engines, translators.",
      notes: { say: ["Экранные читалки (NVDA, VoiceOver) реально так работают — можно включить VoiceOver на Mac: Cmd+F5."], min: 4 },
    },
    {
      type: 'poll',
      stage: 3,
      title: "Кому помогает семантика? ¦ Semantika kimga yordam beradi? ¦ Who does semantics help?",
      chat: "голосуйте 1–4 ¦ 1–4 bilan ovoz bering ¦ vote 1–4",
      options: [
        { label: "Программистам ¦ Dasturchilarga ¦ Programmers", detail: "Код читается как план ¦ Kod reja kabi o'qiladi ¦ Code reads like a plan" },
        { label: "Google и поиску ¦ Google va qidiruvga ¦ Google and search", detail: "Понимает, где главный текст ¦ Asosiy matn qayerdaligini tushunadi ¦ Knows where the main text is" },
        { label: "Незрячим людям ¦ Ko'zi ojizlarga ¦ Blind users", detail: "Читалка видит разделы ¦ O'quvchi dastur bo'limlarni ko'radi ¦ The screen reader sees sections" },
        { label: "Всем сразу ¦ Hammaga birdan ¦ Everyone at once", detail: "Верно! ¦ To'g'ri! ¦ Correct!" },
      ],
      correct: 3,
      result: "Семантика бесплатна — те же теги, — а пользу получают все: вы, команда, поисковики и пользователи. ¦ Semantika bepul — o'sha teglar, — foydani esa hamma oladi: siz, jamoa, qidiruv tizimlari va foydalanuvchilar. ¦ Semantics is free — just different tags — and everyone benefits: you, your team, search engines and users.",
      takeaway: "Семантика ничего не стоит, но делает сайт лучше для всех. ¦ Semantika hech narsaga tushmaydi, lekin saytni hamma uchun yaxshiroq qiladi. ¦ Semantics costs nothing and makes the site better for everyone.",
      notes: { say: ["Голосование. Любой ответ частично верен — правильный «всем»."], min: 3 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Найдите неправильный тег ¦ Noto'g'ri tegni toping ¦ Find the wrong tag",
      chat: "номер строки ¦ qator raqami ¦ line number",
      snippets: [
        { title: "Меню в подвале? ¦ Menyu pastki qismda? ¦ A menu in the footer?", lang: 'html', code: `<header>\n  <h1>Bit Shop</h1>\n  <footer>\n    <a href="#">Home</a> <a href="#">Cart</a>\n  </footer>\n</header>`, line: 3, explain: "Меню со ссылками — это <nav>, а не <footer>. ¦ Havolali menyu — <footer> emas, <nav>. ¦ A menu of links is <nav>, not <footer>.", fix: '<nav> … </nav>' },
        { title: "Два главных ¦ Ikkita asosiy ¦ Two mains", lang: 'html', code: `<main>\n  <h1>Lessons</h1>\n</main>\n<main>\n  <p>New lesson every week</p>\n</main>`, line: 4, explain: "<main> на странице должен быть один. Второй — <section> внутри первого. ¦ Sahifada <main> bitta bo'lishi kerak. Ikkinchisi — birinchisi ichidagi <section>. ¦ A page has one <main>. The second should be a <section> inside it.", fix: '<section>' },
        { title: "Карточки товаров ¦ Mahsulot kartochkalari ¦ Product cards", lang: 'html', code: `<main>\n  <aside>\n    <h2>Sneakers</h2>\n    <p>499 000 so'm</p>\n  </aside>\n</main>`, line: 2, explain: "Карточка товара — самостоятельный кусок: <article>. <aside> — для дополнительного. ¦ Mahsulot kartochkasi — mustaqil qism: <article>. <aside> — qo'shimcha narsa uchun. ¦ A product card stands alone: <article>. <aside> is for extras.", fix: '<article>' },
      ],
      takeaway: "Ошибка в семантике не ломает страницу — поэтому её надо замечать самим. ¦ Semantika xatosi sahifani buzmaydi — shuning uchun uni o'zimiz sezishimiz kerak. ¦ A semantic mistake does not break the page — so you have to catch it yourself.",
      notes: { say: ["Чат пишет номер строки — вы кликаете."], min: 4 },
    },
    {
      type: 'walk',
      stage: 3,
      title: "Скелет типичной страницы ¦ Odatiy sahifa skeleti ¦ The skeleton of a typical page",
      chat: "где на этой странице будет поиск по сайту? ¦ bu sahifada sayt bo'yicha qidiruv qayerda bo'ladi? ¦ where would site search go on this page?",
      lang: 'html',
      code: `<body>\n  <header>\n    <img src="logo.svg" alt="Bit Lab">\n    <nav>…</nav>\n  </header>\n  <main>\n    <section>\n      <h2>New lessons</h2>\n      <article>…</article>\n      <article>…</article>\n    </section>\n    <aside>Top students</aside>\n  </main>\n  <footer>© 2026</footer>\n</body>`,
      marks: [
        { line: 2, text: "Шапка — сверху на каждой странице сайта. ¦ Sarlavha qismi — saytning har bir sahifasining yuqorisida. ¦ The header sits at the top of every page." },
        { line: 4, text: "Меню внутри шапки — частый и правильный вариант. ¦ Sarlavha ichidagi menyu — keng tarqalgan va to'g'ri variant. ¦ A menu inside the header is common and correct." },
        { line: 6, text: "Всё уникальное для этой страницы — в <main>. ¦ Bu sahifaga xos hamma narsa — <main>'da. ¦ Everything unique to this page goes in <main>." },
        { line: 7, text: "Раздел с заголовком h2 — <section>. ¦ h2 sarlavhali bo'lim — <section>. ¦ A section with an h2 heading is a <section>." },
        { line: 9, text: "Каждая карточка урока — <article>. ¦ Har bir dars kartochkasi — <article>. ¦ Each lesson card is an <article>." },
        { line: 14, text: "Подвал одинаковый на всех страницах. ¦ Pastki qism barcha sahifalarda bir xil. ¦ The footer is the same on every page." },
      ],
      takeaway: "Типичная страница: header → main (section, article, aside) → footer. ¦ Odatiy sahifa: header → main (section, article, aside) → footer. ¦ A typical page: header → main (section, article, aside) → footer.",
      notes: { say: ["→ по строкам. Ответ на вопрос: поиск обычно в <header>, можно в <form role=\"search\">."], min: 4 },
    },
    {
      type: 'cheatsheet',
      stage: 4,
      title: "Шпаргалка по семантике ¦ Semantika bo'yicha shpargalka ¦ Semantics cheat sheet",
      sheetTitle: "«Что это?» → тег ¦ «Bu nima?» → teg ¦ “What is it?” → tag",
      items: [
        { icon: '🔝', text: "Шапка сайта ¦ Sayt sarlavhasi ¦ Site header", code: '<header>' },
        { icon: '🧭', text: "Меню ¦ Menyu ¦ Menu", code: '<nav>' },
        { icon: '🎯', text: "Главное, одно на странице ¦ Asosiy, sahifada bitta ¦ The main part, one per page", code: '<main>' },
        { icon: '📰', text: "Пост, новость, карточка ¦ Post, yangilik, kartochka ¦ Post, news, card", code: '<article>' },
        { icon: '🧩', text: "Раздел с заголовком ¦ Sarlavhali bo'lim ¦ A section with a heading", code: '<section>' },
        { icon: '📌', text: "Дополнительное сбоку ¦ Yondagi qo'shimcha ¦ Extra side content", code: '<aside>' },
        { icon: '🔚', text: "Подвал ¦ Pastki qism ¦ Footer", code: '<footer>' },
        { icon: '📦', text: "Просто обёртка для стилей ¦ Uslub uchun oddiy o'ram ¦ Just a wrapper for styling", code: '<div>' },
      ],
      notes: { say: ["Скриншот на память. div не запрещён — он для обёрток без смысла."], min: 2 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: семантическая вёрстка ¦ Xulosa: semantik vyorstka ¦ Summary: semantic markup",
      chat: "какой div в своём проекте вы замените первым? ¦ loyihangizdagi qaysi div'ni birinchi almashtirasiz? ¦ which div in your project will you replace first?",
      answer: "Семантические теги выглядят как <div>, но говорят, что внутри. Так код понятнее вам и команде, а сайт — поисковикам и людям с экранными читалками. ¦ Semantik teglar <div>'ga o'xshaydi, lekin ichida nima borligini aytadi. Shunda kod sizga va jamoaga, sayt esa qidiruv tizimlari va ekran o'quvchisi ishlatadiganlarga tushunarli bo'ladi. ¦ Semantic tags look like <div> but say what is inside. Your code gets clearer for you and your team, and your site for search engines and screen-reader users.",
      icon: '🏷️',
      badge: "Архитектор страниц ¦ Sahifa arxitektori ¦ Page architect",
      badgeSub: "HTML · техническая 1 ¦ HTML · texnik 1 ¦ HTML · technical 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Переделайте свой проект: замените div на header, nav, main, footer. ¦ Loyihangizni qayta qiling: div'larni header, nav, main, footer'ga almashtiring. ¦ Rework your project: replace divs with header, nav, main, footer.",
        "Посчитайте, сколько div осталось — и зачем каждый. ¦ Nechta div qolganini sanang — va har biri nima uchun. ¦ Count the divs left — and why each one stays.",
      ],
      takeaway: "Сначала спросите «что это?», потом выбирайте тег. ¦ Avval «bu nima?» deb so'rang, keyin teg tanlang. ¦ Ask “what is it?” first, then choose the tag.",
      notes: { say: ["Итог и домашнее задание."], min: 2 },
    },
  ],
});
