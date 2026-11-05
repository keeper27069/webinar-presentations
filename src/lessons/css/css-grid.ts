import { kit } from '@engine/kit';

const CSS = `.g{display:grid;gap:12px;height:480px}
.g i{display:grid;place-items:center;border-radius:16px;font:800 30px Manrope,system-ui;font-style:normal;color:#fff;background:#3d7bff}
.g i:nth-child(2){background:#7c5cff}.g i:nth-child(3){background:#0fb5a6}.g i:nth-child(4){background:#f2573a}.g i:nth-child(5){background:#e9a400}.g i:nth-child(6){background:#f0509b}`;
const six = (style: string, extra: string[] = []) =>
  `<div class="g" style="${style}">${['A', 'B', 'C', 'D', 'E', 'F'].map((t, i) => `<i style="${extra[i] ?? ''}">${t}</i>`).join('')}</div>`;

export default kit({
  id: 'css-t02',
  title: "CSS Grid: раскладка сеткой ¦ CSS Grid: to'r bilan joylashtirish ¦ CSS Grid: layout with a grid",
  question: "Как разложить блоки по странице ровной сеткой, как плитку? ¦ Bloklarni sahifa bo'ylab plitka kabi tekis to'r bilan qanday joylashtirish mumkin? ¦ How do you lay blocks out in a neat grid, like tiles?",
  route: ["Сетка ¦ To'r ¦ The grid", "Колонки ¦ Ustunlar ¦ Columns", "Большие блоки ¦ Katta bloklar ¦ Big blocks", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🧱',
      kicker: "CSS · техническая тема 2 ¦ CSS · texnik mavzu 2 ¦ CSS · technical topic 2",
      title: "Страница как шоколадка ¦ Sahifa shokolad plitkasi kabi ¦ A page like a chocolate bar",
      chat: "где вы видели сетку из карточек? ¦ kartochkalar to'rini qayerda ko'rgansiz? ¦ where have you seen a grid of cards?",
      lead: "Grid делит место на ровные клеточки, как плитку шоколада. Блоки сами встают по клеточкам. ¦ Grid joyni shokolad plitkasi kabi tekis kataklarga bo'ladi. Bloklar o'zlari kataklarga joylashadi. ¦ Grid splits space into even cells, like a chocolate bar. Blocks drop into the cells by themselves.",
      facts: ["display: grid — включить ¦ display: grid — yoqish ¦ display: grid turns it on", "Колонки и промежутки ¦ Ustunlar va oraliqlar ¦ Columns and gaps", "Блок на несколько клеток ¦ Bir nechta katakli blok ¦ Blocks spanning cells"],
      takeaway: "Смотрим, как три строчки CSS расставляют шесть блоков. ¦ Uch qator CSS oltita blokni qanday joylashtirishini ko'ramiz. ¦ Watch three lines of CSS arrange six blocks.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Включаем сетку ¦ To'rni yoqamiz ¦ Switching the grid on",
      chat: "сколько колонок сделать? ¦ nechta ustun qilamiz? ¦ how many columns shall we make?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.box {\n  display: grid;\n}', line: 2, html: six('grid-template-columns:1fr'), say: "Просто grid — все блоки друг под другом. ¦ Shunchaki grid — barcha bloklar bir-birining ostida. ¦ Plain grid: blocks stack one under another." },
        { code: '.box {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}', line: 3, html: six('grid-template-columns:1fr 1fr'), say: "Две колонки по одной доле (1fr). ¦ Bir ulushdan (1fr) ikkita ustun. ¦ Two columns, one share (1fr) each." },
        { code: '.box {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}', line: 3, html: six('grid-template-columns:repeat(3,1fr)'), say: "repeat(3, 1fr) — три равные колонки. ¦ repeat(3, 1fr) — uchta teng ustun. ¦ repeat(3, 1fr): three equal columns." },
        { code: '.box {\n  grid-template-columns: 2fr 1fr 1fr;\n}', line: 2, html: six('grid-template-columns:2fr 1fr 1fr'), say: "2fr — первая колонка вдвое шире. ¦ 2fr — birinchi ustun ikki baravar kengroq. ¦ 2fr makes the first column twice as wide." },
      ],
      takeaway: "fr — «доля» свободного места. ¦ fr — bo'sh joyning «ulushi». ¦ fr means a “share” of the free space.",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Промежутки gap ¦ gap oraliqlari ¦ Gaps",
      chat: "какой промежуток красивее? ¦ qaysi oraliq chiroyliroq? ¦ which gap looks nicer?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: 'gap: 0;', html: six('grid-template-columns:repeat(3,1fr);gap:0'), say: "Без промежутков блоки слипаются. ¦ Oraliqlarsiz bloklar yopishib qoladi. ¦ Without gaps the blocks stick together." },
        { code: 'gap: 30px;', line: 1, html: six('grid-template-columns:repeat(3,1fr);gap:30px'), say: "gap раздвигает их ровно — без лишних отступов. ¦ gap ularni tekis ajratadi — ortiqcha bo'shliqlarsiz. ¦ gap spaces them evenly — no extra margins needed." },
      ],
      takeaway: "Один gap вместо десятка margin. ¦ O'nlab margin o'rniga bitta gap. ¦ One gap instead of a dozen margins.",
      notes: { min: 2 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Блок на несколько клеток ¦ Bir nechta katakli blok ¦ A block spanning cells",
      chat: "какой блок сделать главным? ¦ qaysi blokni asosiy qilamiz? ¦ which block should be the star?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.a { }', html: six('grid-template-columns:repeat(3,1fr)'), say: "Все блоки одного размера. ¦ Barcha bloklar bir xil o'lchamda. ¦ All blocks are the same size." },
        { code: '.a {\n  grid-column: span 2;\n}', line: 2, html: six('grid-template-columns:repeat(3,1fr)', ['grid-column:span 2']), say: "span 2 — блок A занял две колонки. ¦ span 2 — A bloki ikkita ustunni egalladi. ¦ span 2: block A takes two columns." },
        { code: '.a {\n  grid-column: span 2;\n  grid-row: span 2;\n}', line: 3, html: six('grid-template-columns:repeat(3,1fr)', ['grid-column:span 2;grid-row:span 2']), say: "И две строки — получилась «витрина». ¦ Va ikkita qator — «vitrina» hosil bo'ldi. ¦ Two rows too — a showcase tile." },
      ],
      takeaway: "Так делают главную новость или большой баннер. ¦ Asosiy yangilik yoki katta banner shunday qilinadi. ¦ That's how big headline tiles and banners are made.",
      notes: { min: 4 },
    },
    {
      type: 'poll',
      stage: 2,
      title: "Сколько колонок? ¦ Nechta ustun? ¦ How many columns?",
      chat: "голосуйте 1–3 ¦ 1–3 bilan ovoz bering ¦ vote 1–3",
      question: "grid-template-columns: 1fr 1fr 1fr 1fr — это… ¦ grid-template-columns: 1fr 1fr 1fr 1fr — bu… ¦ grid-template-columns: 1fr 1fr 1fr 1fr is…",
      options: [
        { label: "1 колонка ¦ 1 ustun ¦ 1 column" },
        { label: "4 колонки ¦ 4 ustun ¦ 4 columns", detail: "Верно ✔ ¦ To'g'ri ✔ ¦ Correct ✔" },
        { label: "4 строки ¦ 4 qator ¦ 4 rows" },
      ],
      correct: 1,
      result: "Сколько значений — столько колонок. Короче: repeat(4, 1fr). ¦ Nechta qiymat — shuncha ustun. Qisqaroq: repeat(4, 1fr). ¦ One value per column. Shorter: repeat(4, 1fr).",
      takeaway: "Считаем значения — получаем колонки. ¦ Qiymatlarni sanaymiz — ustunlarni olamiz. ¦ Count the values to get the columns.",
      notes: { say: ["Голосование."], min: 2 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Галерея на Grid ¦ Grid'dagi galereya ¦ A Grid gallery",
      chat: "какой эмодзи сделать большим? ¦ qaysi emojini katta qilamiz? ¦ which emoji gets the big tile?",
      task: "✍️ Поменяйте число колонок и span у .big ¦ ✍️ Ustunlar sonini va .big'ning span'ini o'zgartiring ¦ ✍️ Change the column count and .big's span",
      steps: [{ label: "Галерея ¦ Galereya ¦ Gallery", html: '<div class="gallery">\n  <div class="big">🏔️</div>\n  <div>🌊</div><div>🌵</div>\n  <div>🌸</div><div>🍁</div>\n</div>', css: 'body{font-family:Manrope,system-ui}\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.gallery div {\n  display: grid; place-items: center;\n  font-size: 56px; padding: 20px;\n  border-radius: 16px; background: #eef4ff;\n}\n.big {\n  grid-column: span 2;\n  grid-row: span 2;\n}' }],
      takeaway: "Пять строчек CSS — и галерея как в журнале. ¦ Besh qator CSS — va jurnaldagidek galereya. ¦ Five lines of CSS and you have a magazine-style gallery.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: плиточник ¦ Missiya: plitkachi ¦ Mission: tile master",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сетка идеально ровная! ¦ To'r juda tekis! ¦ The grid is perfectly neat!",
      items: [
        { title: "Включить сетку ¦ To'rni yoqish ¦ Switch the grid on", choices: ['display: grid', 'display: table'], correct: 0, explain: "grid — сетка. ¦ grid — to'r. ¦ grid = the grid." },
        { title: "Три равные колонки ¦ Uchta teng ustun ¦ Three equal columns", choices: ['repeat(3, 1fr)', '3px 3px 3px'], correct: 0, explain: "fr — доли места. ¦ fr — joy ulushlari. ¦ fr = shares of space." },
        { title: "Блок на 2 колонки ¦ 2 ustunli blok ¦ A block over 2 columns", choices: ['grid-column: span 2', 'width: 2'], correct: 0, explain: "span — «растянись». ¦ span — «cho'zil». ¦ span = stretch across." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: CSS Grid ¦ Xulosa: CSS Grid ¦ Summary: CSS Grid",
      chat: "пришлите свою галерею! ¦ galereyangizni yuboring! ¦ share your gallery!",
      answer: "display: grid превращает блок в сетку. grid-template-columns задаёт колонки: repeat(3, 1fr) — три равные, 2fr — вдвое шире. gap делает ровные промежутки, а grid-column: span 2 растягивает блок на две колонки — так делают большие баннеры и галереи. ¦ display: grid blokni to'rga aylantiradi. grid-template-columns ustunlarni belgilaydi: repeat(3, 1fr) — uchta teng, 2fr — ikki baravar keng. gap tekis oraliqlar yaratadi, grid-column: span 2 esa blokni ikki ustunga cho'zadi — katta bannerlar va galereyalar shunday qilinadi. ¦ display: grid turns a block into a grid. grid-template-columns sets the columns: repeat(3, 1fr) for three equal ones, 2fr for twice as wide. gap adds even spacing, and grid-column: span 2 stretches a block over two columns — how big banners and galleries are built.",
      icon: '🧱',
      badge: "Мастер сеток ¦ To'rlar ustasi ¦ Grid master",
      badgeSub: "CSS · техническая 2 ¦ CSS · texnik 2 ¦ CSS · technical 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте галерею из 7 фото, где одно фото занимает 2×2 клетки. ¦ Bitta foto 2×2 katakni egallaydigan 7 fotoli galereya yarating. ¦ Build a 7-photo gallery with one 2×2 photo.",
        "Добавьте медиазапрос: на телефоне — одна колонка. ¦ Media so'rov qo'shing: telefonda — bitta ustun. ¦ Add a media query: one column on phones.",
      ],
      takeaway: "Дальше: анимации — заставим всё двигаться. ¦ Keyingisi: animatsiyalar — hammasini harakatlantiramiz. ¦ Next: animations — making things move.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
