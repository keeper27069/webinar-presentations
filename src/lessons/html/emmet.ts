import { kit } from '@engine/kit';

const CSS = `.typed{font:800 40px JetBrains Mono,monospace;color:#f2573a;margin-bottom:18px}
.card{padding:22px;border-radius:18px;background:#fff3e0;font-size:26px}
ul{margin:0;padding-left:30px;font-size:28px}li{margin:6px 0}
nav{display:flex;gap:10px}nav a{padding:12px 20px;border-radius:999px;background:#dbeafe;font-weight:800;font-size:22px}
p{font-size:22px;color:#555;line-height:1.5}`;

export default kit({
  id: 'html-t03',
  title: "Emmet: HTML в 10 раз быстрее ¦ Emmet: HTML 10 barobar tez ¦ Emmet: HTML 10× faster",
  question: "Как написать 20 строк HTML, нажав всего несколько клавиш? ¦ Bir nechta tugmani bosib 20 qator HTML'ni qanday yozish mumkin? ¦ How do you write 20 lines of HTML with a few keystrokes?",
  route: ["Волшебство ¦ Sehr ¦ Magic", "Знаки ¦ Belgilar ¦ Symbols", "Повтор ¦ Takrorlash ¦ Repeat", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '⚡',
      kicker: "HTML · техническая тема 3 ¦ HTML · texnik mavzu 3 ¦ HTML · technical topic 3",
      title: "Короткое слово → целый блок кода ¦ Qisqa so'z → butun kod bloki ¦ A short word → a whole block of code",
      chat: "сколько секунд вы пишете один тег? ¦ bitta tegni necha soniyada yozasiz? ¦ how many seconds does one tag take you?",
      lead: "Emmet — помощник в VS Code. Пишете короткое сокращение, жмёте Tab — и появляется готовый HTML. ¦ Emmet — VS Code'dagi yordamchi. Qisqartma yozasiz, Tab'ni bosasiz — va tayyor HTML paydo bo'ladi. ¦ Emmet is a VS Code helper. Type a short abbreviation, press Tab, and ready HTML appears.",
      facts: ["Уже встроен в VS Code ¦ VS Code'ga o'rnatilgan ¦ Built into VS Code", "Жмём Tab ¦ Tab'ni bosamiz ¦ Press Tab", "Меньше опечаток ¦ Kamroq xatolar ¦ Fewer typos"],
      takeaway: "Сегодня — пять сокращений, которые экономят часы. ¦ Bugun — soatlarni tejaydigan beshta qisqartma. ¦ Today: five abbreviations that save hours.",
      notes: { say: ["Повторяйте каждое сокращение вживую в VS Code."], switch: "VS Code ¦ VS Code ¦ VS Code", min: 3 },
    },
    {
      type: 'show',
      stage: 0,
      title: "! + Tab — каркас страницы ¦ ! + Tab — sahifa karkasi ¦ ! + Tab — the page skeleton",
      chat: "сколько строк появилось? ¦ nechta qator paydo bo'ldi? ¦ how many lines appeared?",
      css: CSS,
      steps: [
        { code: '!', html: '<div class="typed">!</div>', say: "Пишем один восклицательный знак… ¦ Bitta undov belgisini yozamiz… ¦ Type a single exclamation mark…" },
        { code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Document</title>\n</head>\n<body>\n\n</body>\n</html>', html: '<div class="typed">! → 10 lines ✨</div><p>&lt;html&gt; &lt;head&gt; &lt;title&gt; &lt;body&gt;…</p>', say: "…Tab — и готов весь каркас страницы! ¦ …Tab — va butun sahifa karkasi tayyor! ¦ …press Tab and the whole page skeleton is ready!" },
      ],
      takeaway: "! + Tab — так начинают почти каждую новую страницу. ¦ ! + Tab — deyarli har bir yangi sahifa shunday boshlanadi. ¦ ! + Tab is how almost every new page starts.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Точка, стрелка и звёздочка ¦ Nuqta, strelka va yulduzcha ¦ Dot, arrow and star",
      chat: "что сделает ul>li*3? ¦ ul>li*3 nima qiladi? ¦ what will ul>li*3 do?",
      css: CSS,
      steps: [
        { code: 'div.card\n↓\n<div class="card"></div>', html: '<div class="typed">div.card</div><div class="card">.card</div>', say: "Точка = класс. ¦ Nuqta = klass. ¦ A dot = a class." },
        { code: 'ul>li\n↓\n<ul>\n  <li></li>\n</ul>', html: '<div class="typed">ul&gt;li</div><ul><li>…</li></ul>', say: "Стрелка > = «внутрь». ¦ > strelka = «ichiga». ¦ The arrow > means “inside”." },
        { code: 'ul>li*3\n↓\n<ul>\n  <li></li>\n  <li></li>\n  <li></li>\n</ul>', html: '<div class="typed">ul&gt;li*3</div><ul><li>…</li><li>…</li><li>…</li></ul>', say: "Звёздочка * = «повтори 3 раза». ¦ * yulduzcha = «3 marta takrorla». ¦ The star * means “repeat 3 times”." },
        { code: 'nav>a*4\n↓\n<nav>\n  <a href=""></a> ×4\n</nav>', html: '<div class="typed">nav&gt;a*4</div><nav><a>1</a><a>2</a><a>3</a><a>4</a></nav>', say: "Меню из 4 ссылок — одной строкой! ¦ 4 ta havolali menyu — bitta qatorda! ¦ A 4-link menu in one line!" },
      ],
      takeaway: ". — класс, > — внутрь, * — повтор. ¦ . — klass, > — ichiga, * — takrorlash. ¦ . = class, > = inside, * = repeat.",
      notes: { say: ["Пусть чат угадывает результат до того, как вы нажмёте Tab."], min: 6 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Нумерация и текст-заглушка ¦ Raqamlash va to'ldiruvchi matn ¦ Numbering and filler text",
      chat: "зачем нужен текст-заглушка? ¦ to'ldiruvchi matn nima uchun kerak? ¦ why use filler text?",
      css: CSS,
      steps: [
        { code: 'li.item$*3\n↓\n<li class="item1"></li>\n<li class="item2"></li>\n<li class="item3"></li>', html: '<div class="typed">li.item$*3</div><ul><li>item1</li><li>item2</li><li>item3</li></ul>', say: "$ ставит номер: 1, 2, 3. ¦ $ raqam qo'yadi: 1, 2, 3. ¦ $ adds a number: 1, 2, 3." },
        { code: 'p>lorem10', html: '<div class="typed">p&gt;lorem10</div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do.</p>', say: "lorem10 — 10 слов текста-заглушки. ¦ lorem10 — 10 so'zli to'ldiruvchi matn. ¦ lorem10 gives 10 words of filler text." },
      ],
      takeaway: "Заглушка помогает увидеть дизайн, пока нет настоящего текста. ¦ To'ldiruvchi haqiqiy matn bo'lmaguncha dizaynni ko'rishga yordam beradi. ¦ Filler text lets you see the design before real text exists.",
      notes: { min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какое сокращение? ¦ Qaysi qisqartma? ¦ Which abbreviation?",
      chat: "пишите: «1 — ul>li*5» ¦ yozing: «1 — ul>li*5» ¦ write: “1 — ul>li*5”",
      zones: [
        { id: 'a', label: '!', icon: '📄' },
        { id: 'b', label: 'ul>li*5', icon: '📋' },
        { id: 'c', label: 'div.box', icon: '📦' },
      ],
      items: [
        { text: "Каркас новой страницы ¦ Yangi sahifa karkasi ¦ A new page skeleton", zone: 'a' },
        { text: "Список из пяти пунктов ¦ Beshta bandli ro'yxat ¦ A five-item list", zone: 'b' },
        { text: "Блок с классом box ¦ box klassli blok ¦ A block with class box", zone: 'c' },
      ],
      takeaway: "Подбирайте сокращение по результату, который хотите получить. ¦ Qisqartmani olmoqchi bo'lgan natijaga qarab tanlang. ¦ Pick the abbreviation by the result you want.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Соберите меню кафе ¦ Kafe menyusini yig'ing ¦ Build a café menu",
      chat: "какие блюда добавим? ¦ qanday taomlarni qo'shamiz? ¦ which dishes shall we add?",
      task: "✍️ В VS Code: section.menu>h2+ul>li*4 → Tab. Здесь — допишите блюда ¦ ✍️ VS Code'da: section.menu>h2+ul>li*4 → Tab. Bu yerda — taomlarni yozing ¦ ✍️ In VS Code: section.menu>h2+ul>li*4 → Tab. Here: fill in the dishes",
      steps: [{ label: "Меню ¦ Menyu ¦ Menu", html: '<section class="menu">\n  <h2>Menu</h2>\n  <ul>\n    <li>🍕 Pizza</li>\n    <li>🍔 Burger</li>\n    <li></li>\n    <li></li>\n  </ul>\n</section>', css: 'body{font-family:Manrope,system-ui}.menu{padding:20px;border-radius:20px;background:#fff3e0}h2{margin:0 0 10px}li{font-size:24px;margin:6px 0}' }],
      takeaway: "+ ставит теги рядом: h2+ul — заголовок и список друг за другом. ¦ + teglarni yonma-yon qo'yadi: h2+ul — sarlavha va ro'yxat ketma-ket. ¦ + puts tags side by side: h2+ul is a heading followed by a list.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: скоростной верстальщик ¦ Missiya: tezkor maketchi ¦ Mission: speed coder",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Вы пишете HTML в 10 раз быстрее! ¦ HTML'ni 10 barobar tez yozasiz! ¦ You write HTML 10× faster!",
      items: [
        { title: "Три пункта списка ¦ Uchta ro'yxat bandi ¦ Three list items", choices: ['ul>li*3', 'ul+li+3'], correct: 0, explain: "> — внутрь, * — повтор. ¦ > — ichiga, * — takrorlash. ¦ > inside, * repeat." },
        { title: "Блок с классом card ¦ card klassli blok ¦ A block with class card", choices: ['div.card', 'div#card'], correct: 0, explain: "Точка — класс, решётка — id. ¦ Nuqta — klass, panjara — id. ¦ Dot = class, hash = id." },
        { title: "Какая клавиша разворачивает сокращение? ¦ Qisqartmani qaysi tugma ochadi? ¦ Which key expands it?", choices: ['Tab', 'Shift'], correct: 0, explain: "Пишем и жмём Tab. ¦ Yozamiz va Tab'ni bosamiz. ¦ Type, then Tab." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Emmet ¦ Xulosa: Emmet ¦ Summary: Emmet",
      chat: "какое сокращение вам понравилось больше всего? ¦ sizga qaysi qisqartma ko'proq yoqdi? ¦ which abbreviation did you like most?",
      answer: "Emmet превращает короткие сокращения в HTML по нажатию Tab. ! — каркас страницы, точка — класс, > — «внутрь», + — «рядом», * — «повтори», $ — номер, lorem — текст-заглушка. Так страницы пишутся быстрее и с меньшим числом опечаток. ¦ Emmet qisqa qisqartmalarni Tab bosilganda HTML'ga aylantiradi. ! — sahifa karkasi, nuqta — klass, > — «ichiga», + — «yonma-yon», * — «takrorla», $ — raqam, lorem — to'ldiruvchi matn. Shunday qilib sahifalar tezroq va kamroq xatolar bilan yoziladi. ¦ Emmet turns short abbreviations into HTML when you press Tab. ! = page skeleton, dot = class, > = inside, + = beside, * = repeat, $ = number, lorem = filler text. Pages get written faster with fewer typos.",
      icon: '⚡',
      badge: "Скоростной верстальщик ¦ Tezkor maketchi ¦ Speed coder",
      badgeSub: "HTML · техническая 3 ¦ HTML · texnik 3 ¦ HTML · technical 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Соберите через Emmet меню из 5 ссылок: nav>a*5 ¦ Emmet orqali 5 ta havolali menyu yig'ing: nav>a*5 ¦ Build a 5-link menu with Emmet: nav>a*5",
        "Сделайте 3 карточки: div.card*3>h3+p>lorem8 ¦ 3 ta kartochka yarating: div.card*3>h3+p>lorem8 ¦ Make 3 cards: div.card*3>h3+p>lorem8",
      ],
      takeaway: "Дальше: какие теги можно класть друг в друга. ¦ Keyingisi: qaysi teglarni bir-birining ichiga qo'yish mumkin. ¦ Next: which tags can go inside which.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
