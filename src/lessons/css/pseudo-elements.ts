import { kit } from '@engine/kit';

const CSS = `.t{font:800 40px Manrope,system-ui;padding:40px 10px;position:relative;display:inline-block}
.new::before{content:"🔥 ";}
.u{position:relative}.u::after{content:"";position:absolute;left:0;bottom:30px;height:8px;border-radius:4px;background:#f2573a;width:0;transition:width .8s}
.u.on::after{width:100%}
.q{font:700 28px Manrope,system-ui;padding:30px 40px;position:relative;background:#f4f5f8;border-radius:20px;margin:20px}
.q.on::before{content:"“";position:absolute;left:8px;top:-20px;font-size:110px;color:#3d7bff}`;

export default kit({
  id: 'css-t05',
  title: "::before и ::after ¦ ::before va ::after ¦ ::before and ::after",
  question: "Как добавить на страницу украшение, не трогая HTML? ¦ HTML'ga tegmasdan sahifaga bezakni qanday qo'shish mumkin? ¦ How do you add decoration without touching the HTML?",
  route: ["Невидимые помощники ¦ Ko'rinmas yordamchilar ¦ Invisible helpers", "::before ¦ ::before ¦ ::before", "::after ¦ ::after ¦ ::after", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '✨',
      kicker: "CSS · техническая тема 5 ¦ CSS · texnik mavzu 5 ¦ CSS · technical topic 5",
      title: "Украшения из CSS ¦ CSS'dan bezaklar ¦ Decorations made of CSS",
      chat: "какие украшения вы видели у кнопок и заголовков? ¦ tugma va sarlavhalarda qanday bezaklarni ko'rgansiz? ¦ what decorations have you seen on buttons and headings?",
      lead: "У каждого тега есть два невидимых помощника: ::before — «перед» и ::after — «после». В них можно положить значок, линию или текст. ¦ Har bir tegning ikkita ko'rinmas yordamchisi bor: ::before — «oldin» va ::after — «keyin». Ularga belgi, chiziq yoki matn qo'yish mumkin. ¦ Every tag has two invisible helpers: ::before and ::after. You can put an icon, a line or text in them.",
      facts: ["::before — в начале ¦ ::before — boshida ¦ ::before — at the start", "::after — в конце ¦ ::after — oxirida ¦ ::after — at the end", "Нужен content ¦ content kerak ¦ Needs content"],
      takeaway: "HTML не трогаем — всё рисует CSS. ¦ HTML'ga tegmaymiz — hammasini CSS chizadi. ¦ No HTML changes — CSS draws it all.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "::before — значок перед текстом ¦ ::before — matn oldidan belgi ¦ ::before — an icon before the text",
      chat: "какой значок поставить перед «Новинка»? ¦ «Yangilik» oldiga qanday belgi qo'yamiz? ¦ which icon goes before “New”?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '<p class="new">Новинка</p> ¦ <p class="new">Yangilik</p> ¦ <p class="new">New</p>', lang: 'html', html: '<span class="t">Новинка</span> ¦ <span class="t">Yangilik</span> ¦ <span class="t">New</span>', say: "Обычный текст в HTML. ¦ HTML'dagi oddiy matn. ¦ Plain text in HTML." },
        { code: '.new::before {\n  content: "🔥 ";\n}', line: 2, html: '<span class="t new">Новинка</span> ¦ <span class="t new">Yangilik</span> ¦ <span class="t new">New</span>', say: "::before вставил огонёк — а HTML тот же! ¦ ::before olovchani qo'ydi — HTML esa o'sha! ¦ ::before added a flame — the HTML is unchanged!" },
      ],
      takeaway: "content — что показать: значок, слово или пусто. ¦ content — nimani ko'rsatish: belgi, so'z yoki bo'sh. ¦ content says what to show: an icon, a word or nothing.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 2,
      title: "::after — линия, которая выезжает ¦ ::after — chiqib keladigan chiziq ¦ ::after — a sliding underline",
      chat: "где вы видели такие подчёркивания? ¦ bunday tagchiziqlarni qayerda ko'rgansiz? ¦ where have you seen underlines like this?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.link::after {\n  content: "";\n  width: 0;\n  height: 8px;\n}', line: 3, html: '<span class="t u">Menu</span>', say: "::after — пустая полоска нулевой ширины. ¦ ::after — nol kenglikdagi bo'sh chiziq. ¦ ::after is an empty bar with zero width." },
        { code: '.link:hover::after {\n  width: 100%;\n}', line: 2, html: '<span class="t u on">Menu</span>', say: "Навели мышку — полоска плавно выехала! ¦ Sichqonchani olib keldik — chiziq silliq chiqib keldi! ¦ Hover — the bar slides out smoothly!" },
      ],
      takeaway: "Пустой content: \"\" + размеры = декоративная фигура. ¦ Bo'sh content: \"\" + o'lchamlar = bezak shakli. ¦ Empty content: \"\" plus a size gives you a decorative shape.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Большая кавычка для цитаты ¦ Iqtibos uchun katta qo'shtirnoq ¦ A big quote mark",
      chat: "чья цитата будет на сайте? ¦ saytda kimning iqtibosi bo'ladi? ¦ whose quote goes on the site?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '<blockquote>Код — это искусство</blockquote> ¦ <blockquote>Kod — bu san\'at</blockquote> ¦ <blockquote>Code is art</blockquote>', lang: 'html', html: '<div class="q">Код — это искусство</div> ¦ <div class="q">Kod — bu san\'at</div> ¦ <div class="q">Code is art</div>', say: "Простая цитата. ¦ Oddiy iqtibos. ¦ A plain quote." },
        { code: 'blockquote::before {\n  content: "“";\n  font-size: 110px;\n}', line: 2, html: '<div class="q on">Код — это искусство</div> ¦ <div class="q on">Kod — bu san\'at</div> ¦ <div class="q on">Code is art</div>', say: "::before добавил огромную кавычку. ¦ ::before ulkan qo'shtirnoq qo'shdi. ¦ ::before adds a giant quote mark." },
      ],
      takeaway: "Украшения в CSS — не мусорят в HTML. ¦ CSS'dagi bezaklar HTML'ni ifloslantirmaydi. ¦ CSS decorations keep the HTML clean.",
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Без content псевдоэлемент не появится ¦ content'siz psevdoelement paydo bo'lmaydi ¦ Without content the pseudo-element won't appear", truth: true, explain: "Даже пустой: content: \"\". ¦ Hatto bo'sh: content: \"\". ¦ Even an empty one: content: \"\"." },
        { text: "::before добавляет новый тег в HTML ¦ ::before HTML'ga yangi teg qo'shadi ¦ ::before adds a new tag to the HTML", truth: false, explain: "Его рисует только CSS. ¦ Uni faqat CSS chizadi. ¦ Only CSS draws it." },
        { text: "У одного тега может быть и ::before, и ::after ¦ Bitta tegda ::before ham, ::after ham bo'lishi mumkin ¦ One tag can have both ::before and ::after", truth: true, explain: "Два помощника на каждый тег. ¦ Har bir teg uchun ikkita yordamchi. ¦ Two helpers per tag." },
      ],
      takeaway: "Два невидимых помощника + content = украшения без HTML. ¦ Ikki ko'rinmas yordamchi + content = HTML'siz bezaklar. ¦ Two invisible helpers + content = decoration without HTML.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Украсьте заголовок ¦ Sarlavhani bezang ¦ Decorate the heading",
      chat: "какие значки поставить по бокам? ¦ yon tomonlarga qanday belgilar qo'yamiz? ¦ which icons go on each side?",
      task: "✍️ Поменяйте значки в content ¦ ✍️ content'dagi belgilarni o'zgartiring ¦ ✍️ Change the icons in content",
      steps: [{ label: "Заголовок ¦ Sarlavha ¦ Heading", html: '<h1 class="title">Sale</h1>', css: '.title {\n  font-family: Manrope, system-ui;\n  font-size: 56px; text-align: center;\n}\n.title::before {\n  content: "⭐ ";\n}\n.title::after {\n  content: " ⭐";\n}' }],
      takeaway: "Один класс — а заголовок уже праздничный. ¦ Bitta klass — sarlavha esa allaqachon bayramona. ¦ One class and the heading looks festive.",
      notes: { min: 5 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: декоратор ¦ Missiya: dekorator ¦ Mission: decorator",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Страница украшена без лишних тегов! ¦ Sahifa ortiqcha teglarsiz bezatildi! ¦ Decorated without extra tags!",
      items: [
        { title: "Значок перед текстом ¦ Matn oldidagi belgi ¦ An icon before the text", choices: ['::before', '::after'], correct: 0, explain: "before — «перед». ¦ before — «oldin». ¦ before = in front." },
        { title: "Пустая полоска ¦ Bo'sh chiziq ¦ An empty bar", choices: ['content: "";', 'content: none;'], correct: 0, explain: "Пустая строка — фигура без текста. ¦ Bo'sh satr — matnsiz shakl. ¦ An empty string gives a shape with no text." },
        { title: "Где пишем ::after? ¦ ::after qayerda yoziladi? ¦ Where does ::after go?", choices: ["В CSS ¦ CSS'da ¦ In CSS", "В HTML ¦ HTML'da ¦ In HTML"], correct: 0, explain: "Это часть стилей. ¦ Bu uslublarning bir qismi. ¦ It's part of the styles." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: псевдоэлементы ¦ Xulosa: psevdoelementlar ¦ Summary: pseudo-elements",
      chat: "пришлите свой украшенный заголовок! ¦ bezatilgan sarlavhangizni yuboring! ¦ share your decorated heading!",
      answer: "У каждого тега есть два невидимых помощника: ::before появляется в начале, ::after — в конце. Им обязательно нужен content: значок, текст или пустая строка для фигуры. Так добавляют огоньки, кавычки и выезжающие подчёркивания, не трогая HTML. ¦ Har bir tegning ikkita ko'rinmas yordamchisi bor: ::before boshida, ::after — oxirida paydo bo'ladi. Ularga albatta content kerak: belgi, matn yoki shakl uchun bo'sh satr. Shunday qilib HTML'ga tegmasdan olovchalar, qo'shtirnoqlar va chiqib keladigan tagchiziqlar qo'shiladi. ¦ Every tag has two invisible helpers: ::before at the start and ::after at the end. They need content: an icon, text or an empty string for a shape. That's how flames, quote marks and sliding underlines appear without touching the HTML.",
      icon: '✨',
      badge: "Декоратор ¦ Dekorator ¦ Decorator",
      badgeSub: "CSS · техническая 5 ¦ CSS · texnik 5 ¦ CSS · technical 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте ссылки меню с выезжающим подчёркиванием через ::after. ¦ ::after orqali chiqib keladigan tagchiziqli menyu havolalarini yarating. ¦ Make menu links with a sliding ::after underline.",
        "Добавьте значок «🔥» перед словом «Новинка» через ::before. ¦ ::before orqali «Yangilik» so'zi oldiga «🔥» belgisini qo'shing. ¦ Add a “🔥” before “New” with ::before.",
      ],
      takeaway: "Дальше: px, %, rem, vw — в чём измерять размеры. ¦ Keyingisi: px, %, rem, vw — o'lchamlarni nimada o'lchash kerak. ¦ Next: px, %, rem, vw — which units to use.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
