import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.cover{width:500px;padding:30px;border-radius:18px;background:#eceef3;text-align:center;box-shadow:0 10px 30px #0001}
.cover h2{margin:0 0 8px;font-size:30px}.cover p{margin:0 0 16px;color:#6b7183;font-size:18px}.cover span{display:inline-block;padding:10px 22px;border-radius:10px;background:#16181f;color:#fff;font-weight:800}
.c2 h2{font-size:34px}.col{background:linear-gradient(160deg,#ffe8cc,#fff4e6)}.col span{background:#0fb5a6}.col h2{color:#8a4b14}
.pad{padding:56px 30px}
.tag{display:inline-block;margin-bottom:10px;padding:4px 12px;border-radius:8px;font:800 14px JetBrains Mono,monospace;background:#16181f;color:#fff}`;
const cover = (cls: string, title: string, tag: string) => `<div class="wrap"><div><span class="tag">${tag}</span><div class="cover ${cls}"><h2>${title}</h2><p>Fresh bread every morning</p><span>Order</span></div></div></div>`;

export default kit({
  id: 'tilda-git-t01',
  title: "Знакомство с интерфейсом Tilda ¦ Tilda interfeysi bilan tanishuv ¦ Getting to know the Tilda interface",
  question: "Как собрать сайт из готовых блоков без кода — за несколько минут? ¦ Tayyor bloklardan kodsiz saytni bir necha daqiqada qanday yig'ish mumkin? ¦ How do you build a site from ready blocks, no code, in minutes?",
  route: ["Кубики ¦ Kubiklar ¦ Building blocks", "Блок ¦ Blok ¦ A block", "6 шагов ¦ 6 qadam ¦ 6 steps", "Код или Tilda ¦ Kod yoki Tilda ¦ Code or Tilda", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🧱',
      kicker: "Tilda · Git · техническая тема 1 ¦ Tilda · Git · texnik mavzu 1 ¦ Tilda · Git · technical topic 1",
      title: "Сайт из кубиков ¦ Kubiklardan sayt ¦ A site made of blocks",
      chat: "сколько минут нужно на простой сайт без кода? ¦ kodsiz oddiy saytga necha daqiqa kerak? ¦ how many minutes for a simple site without code?",
      lead: "Tilda — конструктор сайтов: страница собирается из готовых блоков, как из кубиков. Сегодня соберём сайт пекарни. ¦ Tilda — sayt konstruktori: sahifa tayyor bloklardan kubiklar kabi yig'iladi. Bugun novvoyxona saytini yig'amiz. ¦ Tilda is a site builder: a page is assembled from ready blocks like toy bricks. Today we build a bakery site.",
      facts: ["Сотни готовых блоков ¦ Yuzlab tayyor bloklar ¦ Hundreds of ready blocks", "Тексты и фото меняете сами ¦ Matn va rasmlarni o'zingiz o'zgartirasiz ¦ You swap in your own text and photos", "Публикация — одной кнопкой ¦ Nashr — bitta tugma bilan ¦ Publish with one button"],
      takeaway: "Смотрим, как страница собирается из кубиков. ¦ Sahifa kubiklardan qanday yig'ilishini ko'ramiz. ¦ Watch a page snap together from blocks.",
      notes: { say: ["Tilda нельзя встроить в презентацию — здесь симуляция, сборку показывайте в настоящей Tilda.", "Названия разделов могут немного отличаться в новых версиях интерфейса."], min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Страница собирается из блоков ¦ Sahifa bloklardan yig'iladi ¦ A page snaps together",
      chat: "какой блок поставим первым? ¦ qaysi blokni birinchi qo'yamiz? ¦ which block goes first?",
      actors: [
        { id: 'lib', icon: '📚', label: "Библиотека блоков ¦ Bloklar kutubxonasi ¦ Block library" },
        { id: 'm', text: "☰ Меню ¦ ☰ Menyu ¦ ☰ Menu" },
        { id: 'c', text: "🖼️ Обложка ¦ 🖼️ Muqova ¦ 🖼️ Cover" },
        { id: 's', text: "🥐 Услуги ¦ 🥐 Xizmatlar ¦ 🥐 Services" },
        { id: 'f', text: "📝 Форма ¦ 📝 Forma ¦ 📝 Form" },
        { id: 'z', text: "⬇️ Подвал ¦ ⬇️ Pastki qism ¦ ⬇️ Footer" },
      ],
      steps: [
        { say: "Слева — библиотека: меню, обложки, формы, подвалы. ¦ Chapda — kutubxona: menyular, muqovalar, formalar, pastki qismlar. ¦ On the left: the library — menus, covers, forms, footers.", at: { lib: [14, 50, 1.3], m: [40, 8, 0.7], c: [40, 29, 0.7], s: [40, 50, 0.7], f: [40, 71, 0.7], z: [40, 92, 0.7] } },
        { say: "Берём меню — оно встаёт наверх страницы. ¦ Menyuni olamiz — u sahifa tepasiga joylashadi. ¦ Take a menu — it sits at the top.", at: { m: [74, 8, 0.75] }, pulse: ['m'] },
        { say: "Под ним — обложка и услуги. ¦ Uning ostida — muqova va xizmatlar. ¦ Below it: the cover and services.", at: { c: [74, 29, 0.75], s: [74, 50, 0.75] } },
        { say: "Форма заказа и подвал — страница готова! ¦ Buyurtma formasi va pastki qism — sahifa tayyor! ¦ An order form and a footer — the page is ready!", at: { f: [74, 71, 0.75], z: [74, 92, 0.75] }, pulse: ['m', 'c', 's', 'f', 'z'] },
      ],
      takeaway: "Страница = блоки друг под другом. ¦ Sahifa = bir-birining ostidagi bloklar. ¦ A page is blocks stacked one under another.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "У блока две вкладки ¦ Blokning ikkita bo'limi bor ¦ Every block has two tabs",
      chat: "какой текст напишем на обложке? ¦ muqovaga qanday matn yozamiz? ¦ what text goes on the cover?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: 'Block: Cover\n  Title: "Your title"', html: cover('', 'Your title', 'Cover'), say: "Новый блок — с текстом-заглушкой. ¦ Yangi blok — o'rinbosar matn bilan. ¦ A new block with placeholder text." },
        { code: 'Content\n  Title: "Non House 🥖"', line: 2, html: cover('c2', 'Non House 🥖', 'Content'), say: "«Контент» — меняем тексты и фото. ¦ «Kontent» — matn va rasmlarni o'zgartiramiz. ¦ “Content”: change the text and photos." },
        { code: 'Settings\n  Background: #FFE8CC\n  Button: #0FB5A6', line: 2, html: cover('c2 col', 'Non House 🥖', 'Settings'), say: "«Настройки» — цвета фона и кнопки. ¦ «Sozlamalar» — fon va tugma ranglari. ¦ “Settings”: background and button colours." },
        { code: 'Settings\n  Padding top: 120\n  Padding bottom: 120', line: 2, html: cover('c2 col pad', 'Non House 🥖', 'Settings'), say: "И отступы — блок «дышит». ¦ Va bo'shliqlar — blok «nafas oladi». ¦ And spacing — the block can breathe." },
      ],
      takeaway: "Контент — что написано. Настройки — как выглядит. ¦ Kontent — nima yozilgan. Sozlamalar — qanday ko'rinadi. ¦ Content is what it says; Settings is how it looks.",
      notes: { min: 5 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Сайт за 6 шагов ¦ 6 qadamda sayt ¦ A site in 6 steps",
      chat: "на каком шаге вы сейчас? ¦ hozir qaysi qadamdasiz? ¦ which step are you on now?",
      actors: [
        { id: 'p', icon: '📁', label: "Проект ¦ Loyiha ¦ Project" },
        { id: 'pg', icon: '📄', label: "Страница ¦ Sahifa ¦ Page" },
        { id: 'b', icon: '🧱', label: "Блоки ¦ Bloklar ¦ Blocks" },
        { id: 'ct', icon: '✏️', label: "Контент ¦ Kontent ¦ Content" },
        { id: 'pv', icon: '📱', label: "Предпросмотр ¦ Ko'rib chiqish ¦ Preview" },
        { id: 'pub', icon: '🚀', label: "Опубликовать ¦ Nashr qilish ¦ Publish" },
        { id: 'url', text: "nonhouse.tilda.ws" },
      ],
      steps: [
        { say: "1. Создаём проект «Non House» — это будущий сайт. ¦ 1. «Non House» loyihasini yaratamiz — bu bo'lajak sayt. ¦ 1. Create a “Non House” project — the future site.", at: { p: [10, 40] } },
        { say: "2. Добавляем страницу — главную. ¦ 2. Sahifa qo'shamiz — bosh sahifani. ¦ 2. Add a page — the home page.", at: { pg: [26, 40] }, lines: [['p', 'pg']] },
        { say: "3. Ставим блоки: меню, обложка, форма. ¦ 3. Bloklarni qo'yamiz: menyu, muqova, forma. ¦ 3. Add blocks: menu, cover, form.", at: { b: [42, 40] }, lines: [['p', 'pg'], ['pg', 'b']] },
        { say: "4. Меняем тексты и фото на свои. ¦ 4. Matn va rasmlarni o'zimiznikiga almashtiramiz. ¦ 4. Swap in our own text and photos.", at: { ct: [58, 40] }, lines: [['p', 'pg'], ['pg', 'b'], ['b', 'ct']] },
        { say: "5. Смотрим предпросмотр — и на телефоне тоже. ¦ 5. Ko'rib chiqamiz — telefonda ham. ¦ 5. Preview it — on a phone too.", at: { pv: [74, 40] }, lines: [['p', 'pg'], ['pg', 'b'], ['b', 'ct'], ['ct', 'pv']] },
        { say: "6. «Опубликовать» — и сайт доступен всем по ссылке! ¦ 6. «Nashr qilish» — va sayt hammaga havola orqali ochiq! ¦ 6. “Publish” — and the site is live for everyone!", at: { pub: [90, 40, 1.2], url: [74, 80] }, lines: [['p', 'pg'], ['pg', 'b'], ['b', 'ct'], ['ct', 'pv'], ['pv', 'pub']], pulse: ['pub', 'url'] },
      ],
      takeaway: "Проект → страница → блоки → контент → предпросмотр → публикация. ¦ Loyiha → sahifa → bloklar → kontent → ko'rib chiqish → nashr. ¦ Project → page → blocks → content → preview → publish.",
      notes: { min: 5 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "Код или Tilda? ¦ Kod yoki Tilda? ¦ Code or Tilda?",
      chat: "что бы вы выбрали для сайта пекарни? ¦ novvoyxona sayti uchun nimani tanlagan bo'lardingiz? ¦ which would you pick for a bakery site?",
      left: { icon: '💻', label: "Свой код ¦ O'z kodingiz ¦ Your own code", points: ["Можно всё что угодно ¦ Istalgan narsa mumkin ¦ Anything is possible", "Дольше делать ¦ Uzoqroq vaqt ketadi ¦ Takes longer", "Бесплатный хостинг есть ¦ Bepul hosting bor ¦ Free hosting exists"] },
      right: { icon: '🧱', label: 'Tilda', points: ["Сайт за час ¦ Bir soatda sayt ¦ A site in an hour", "Клиент правит тексты сам ¦ Mijoz matnlarni o'zi tuzatadi ¦ The client edits text themselves", "Ограничено блоками и тарифом ¦ Bloklar va tarif bilan cheklangan ¦ Limited by blocks and plan"] },
      verdict: "Простой сайт быстро — Tilda. Необычная логика — код. Знание HTML и CSS помогает в обоих. ¦ Oddiy saytni tez — Tilda. G'ayrioddiy mantiq — kod. HTML va CSS bilimi ikkalasida ham yordam beradi. ¦ A simple site fast: Tilda. Unusual logic: code. HTML and CSS help with both.",
      notes: { min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Где какой раздел? ¦ Qaysi bo'lim qayerda? ¦ Which section does what?",
      chat: "пишите: «1 — Настройки» ¦ yozing: «1 — Sozlamalar» ¦ write: “1 — Settings”",
      zones: [
        { id: 'c', label: "Контент ¦ Kontent ¦ Content", icon: '✏️' },
        { id: 's', label: "Настройки ¦ Sozlamalar ¦ Settings", icon: '🎨' },
      ],
      items: [
        { text: "Поменять заголовок ¦ Sarlavhani o'zgartirish ¦ Change the heading", zone: 'c' },
        { text: "Поменять цвет фона ¦ Fon rangini o'zgartirish ¦ Change the background colour", zone: 's' },
        { text: "Загрузить фото хлеба ¦ Non rasmini yuklash ¦ Upload a bread photo", zone: 'c' },
        { text: "Увеличить отступы ¦ Bo'shliqlarni kattalashtirish ¦ Increase the spacing", zone: 's' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: сайт пекарни ¦ Missiya: novvoyxona sayti ¦ Mission: the bakery site",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сайт пекарни опубликован! ¦ Novvoyxona sayti nashr qilindi! ¦ The bakery site is live!",
      items: [
        { title: "Где взять готовую обложку? ¦ Tayyor muqovani qayerdan olish mumkin? ¦ Where's a ready cover?", choices: ["Библиотека блоков ¦ Bloklar kutubxonasi ¦ The block library", "Нарисовать в Paint ¦ Paint'da chizish ¦ Draw it in Paint"], correct: 0, explain: "Сотни блоков по категориям. ¦ Toifalar bo'yicha yuzlab bloklar. ¦ Hundreds of blocks by category." },
        { title: "Как проверить вид на телефоне? ¦ Telefondagi ko'rinishni qanday tekshirish mumkin? ¦ How to check the phone view?", choices: ["Предпросмотр ¦ Ko'rib chiqish ¦ Preview", "Сразу опубликовать ¦ Darhol nashr qilish ¦ Publish straight away"], correct: 0, explain: "Сначала смотрим, потом публикуем. ¦ Avval ko'ramiz, keyin nashr qilamiz. ¦ Look first, then publish." },
        { title: "Цвет кнопки меняют в… ¦ Tugma rangi qayerda o'zgartiriladi… ¦ Button colour lives in…", choices: ["Настройках ¦ Sozlamalarda ¦ Settings", "Контенте ¦ Kontentda ¦ Content"], correct: 0, explain: "Вид — в Настройках. ¦ Ko'rinish — Sozlamalarda. ¦ Looks go in Settings." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: интерфейс Tilda ¦ Xulosa: Tilda interfeysi ¦ Summary: the Tilda interface",
      chat: "какой сайт соберёте на Tilda? ¦ Tilda'da qanday sayt yig'asiz? ¦ what site will you build on Tilda?",
      answer: "Tilda — конструктор: страница собирается из готовых блоков из библиотеки. У каждого блока есть «Контент» (тексты и фото) и «Настройки» (цвета, отступы). Путь такой: проект → страница → блоки → контент → предпросмотр на компьютере и телефоне → публикация одной кнопкой. Простой сайт на Tilda делается быстро, а знание HTML и CSS помогает сделать его лучше. ¦ Tilda — konstruktor: sahifa kutubxonadagi tayyor bloklardan yig'iladi. Har bir blokda «Kontent» (matn va rasmlar) va «Sozlamalar» (ranglar, bo'shliqlar) bor. Yo'l shunday: loyiha → sahifa → bloklar → kontent → kompyuter va telefonda ko'rib chiqish → bitta tugma bilan nashr. Tilda'da oddiy sayt tez yasaladi, HTML va CSS bilimi esa uni yaxshiroq qilishga yordam beradi. ¦ Tilda is a builder: a page is assembled from ready blocks in the library. Each block has “Content” (text and photos) and “Settings” (colours, spacing). The path: project → page → blocks → content → preview on desktop and phone → publish with one button. Simple sites come together fast, and HTML and CSS skills make them better.",
      icon: '🧱',
      badge: "Сборщик сайтов ¦ Sayt yig'uvchi ¦ Site builder",
      badgeSub: "Tilda · Git · техническая 1 ¦ Tilda · Git · texnik 1 ¦ Tilda · Git · technical 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Соберите на Tilda страницу из 5 блоков. ¦ Tilda'da 5 ta blokdan sahifa yig'ing. ¦ Build a 5-block page on Tilda.",
        "Опубликуйте её и пришлите ссылку. ¦ Uni nashr qiling va havolani yuboring. ¦ Publish it and share the link.",
      ],
      takeaway: "Дальше: Zero Block — свой уникальный дизайн. ¦ Keyingisi: Zero Block — o'z noyob dizayningiz. ¦ Next: Zero Block — your own unique design.",
      notes: { min: 2 },
    },
  ],
});
