import { kit } from '@engine/kit';

const SITE = '<header><h1>World Wide Web</h1></header><nav><a>About</a> <a>People</a> <a>Help</a></nav><section class="cards"><div class="c">📄 Pages</div><div class="c">🔗 Links</div><div class="c">🌍 Everyone</div></section>';
const Y1991 = 'body{font-family:Times New Roman,serif}header h1{font-size:34px;margin:0 0 10px;font-weight:700}nav a{color:#0000ee;text-decoration:underline;margin-right:10px}.cards{margin-top:16px}.c{margin:6px 0}';
const Y2000 = `${Y1991} body{background:#000080;color:#ffff00;font-family:Comic Sans MS,cursive}header h1{color:#ff00ff;text-align:center}nav{background:#c0c0c0;padding:8px;border:4px outset #fff}nav a{color:#000080}`;
const Y2010 = 'body{background:#eee;color:#333;font-family:Arial}header{background:linear-gradient(#5a8be0,#2f5fb8);color:#fff;padding:16px;border-radius:6px}header h1{margin:0;font-size:30px}nav{margin:12px 0}nav a{color:#2f5fb8;margin-right:14px;text-decoration:none;font-weight:700}.cards{display:flex;gap:10px}.c{flex:1;background:#fff;border:1px solid #ccc;padding:14px;border-radius:6px}';
const Y2026 = 'body{background:#f4f5f8;color:#16181f;font-family:Manrope,system-ui}header{padding:10px 0}header h1{margin:0;font-size:40px;font-weight:800}nav{display:flex;gap:10px;margin:14px 0}nav a{padding:10px 18px;border-radius:999px;background:#fff;box-shadow:0 4px 14px #0001;text-decoration:none;color:#16181f;font-weight:700}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.c{background:#fff;border-radius:22px;padding:22px;text-align:center;font-size:24px;font-weight:700;box-shadow:0 10px 24px #0001}';

export default kit({
  id: 'html-g03',
  title: "Первый сайт и 30 лет перемен ¦ Birinchi sayt va 30 yillik o'zgarishlar ¦ The first website and 30 years of change",
  question: "Как выглядел самый первый сайт — и что в нём осталось до сих пор? ¦ Eng birinchi sayt qanday ko'rinishda edi — va undan hozirgacha nima qolgan? ¦ What did the very first site look like — and what's still the same?",
  route: ["Загадка ¦ Topishmoq ¦ Puzzle", "1991 ¦ 1991 ¦ 1991", "Машина времени ¦ Vaqt mashinasi ¦ Time machine", "Что осталось ¦ Nima qoldi ¦ What stayed", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🕰️',
      kicker: "HTML · общая тема 3 ¦ HTML · umumiy mavzu 3 ¦ HTML · general topic 3",
      title: "Сайту больше 30 лет ¦ Saytga 30 yildan oshdi ¦ Websites are over 30",
      chat: "как думаете, как выглядел первый сайт? ¦ sizningcha, birinchi sayt qanday ko'rinishda edi? ¦ what do you think the first site looked like?",
      lead: "В 1991 году появился первый сайт: только текст и синие ссылки. Сегодня сайты другие — а основа та же! ¦ 1991-yilda birinchi sayt paydo bo'ldi: faqat matn va ko'k havolalar. Bugun saytlar boshqacha — lekin asos o'sha! ¦ In 1991 the first site appeared: just text and blue links. Sites look different now — but the base is the same!",
      facts: ["Автор — Тим Бернерс-Ли ¦ Muallif — Tim Berners-Li ¦ Made by Tim Berners-Lee", "Был только текст ¦ Faqat matn bor edi ¦ Text only", "Язык — тот же HTML ¦ Til — o'sha HTML ¦ Same HTML language"],
      takeaway: "Сегодня сядем в машину времени и посмотрим, как менялись сайты. ¦ Bugun vaqt mashinasiga o'tirib, saytlar qanday o'zgarganini ko'ramiz. ¦ Today we ride a time machine through web history.",
      notes: { say: ["Первый сайт можно открыть: info.cern.ch — покажите в браузере."], switch: "Браузер ¦ Brauzer ¦ Browser", min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Зачем придумали сайты ¦ Saytlar nima uchun o'ylab topilgan ¦ Why websites were invented",
      chat: "как учёные делились работой до интернета? ¦ internetgacha olimlar ishini qanday ulashgan? ¦ how did scientists share work before the web?",
      actors: [
        { id: 'a', icon: '👩‍🔬', label: "Учёный 1 ¦ Olim 1 ¦ Scientist 1" },
        { id: 'b', icon: '👨‍🔬', label: "Учёный 2 ¦ Olim 2 ¦ Scientist 2" },
        { id: 'c', icon: '🧑‍🔬', label: "Учёный 3 ¦ Olim 3 ¦ Scientist 3" },
        { id: 'paper', icon: '📄' },
        { id: 'web', icon: '🕸️', label: "Паутина ссылок ¦ Havolalar to'ri ¦ A web of links" },
      ],
      steps: [
        { say: "Учёные в разных странах писали статьи. ¦ Turli mamlakatlardagi olimlar maqolalar yozardi. ¦ Scientists in different countries wrote papers.", at: { a: [15, 30], b: [85, 30], c: [50, 80], paper: [15, 55, 0.6] } },
        { say: "Делиться было трудно: почта, дискеты… ¦ Ulashish qiyin edi: pochta, disketalar… ¦ Sharing was slow: post, floppy disks…", at: { paper: [40, 45, 0.6] } },
        { say: "Тим Бернерс-Ли придумал страницы со ссылками. ¦ Tim Berners-Li havolali sahifalarni o'ylab topdi. ¦ Tim Berners-Lee invented pages with links.", at: { web: [50, 45], paper: [50, 45, 0] }, lines: [['a', 'web'], ['b', 'web'], ['c', 'web']], pulse: ['web'] },
        { say: "Нажал на ссылку — и сразу открыл чужую статью! ¦ Havolani bosdi — va darhol boshqaning maqolasini ochdi! ¦ Click a link and you're reading someone else's paper!", lines: [['a', 'web'], ['b', 'web'], ['c', 'web'], ['a', 'b']] },
      ],
      takeaway: "Сайты придумали, чтобы делиться знаниями за один клик. ¦ Saytlar bilimni bir bosishda ulashish uchun o'ylab topilgan. ¦ Websites were invented to share knowledge in one click.",
      notes: { say: ["Это было в CERN, в Швейцарии, в 1989–1991 годах."], min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Машина времени: один сайт за 30 лет ¦ Vaqt mashinasi: 30 yilda bitta sayt ¦ Time machine: one site over 30 years",
      chat: "какой год вам нравится больше? ¦ sizga qaysi yil ko'proq yoqadi? ¦ which year do you like best?",
      steps: [
        { code: '<h1>World Wide Web</h1>\n<a>About</a> <a>People</a>', html: SITE, css: Y1991, say: "1991: чёрный текст и синие ссылки. ¦ 1991: qora matn va ko'k havolalar. ¦ 1991: black text and blue links." },
        { code: '<body bgcolor="navy">\n<marquee>Welcome!!!</marquee>', html: SITE, css: Y2000, say: "2000: яркие цвета и кнопки «как в Windows». ¦ 2000: yorqin ranglar va «Windows'dagidek» tugmalar. ¦ 2000: loud colours and Windows-style buttons." },
        { code: 'header {\n  background: linear-gradient(…);\n}', html: SITE, css: Y2010, say: "2010: градиенты и аккуратные блоки. ¦ 2010: gradiyentlar va ozoda bloklar. ¦ 2010: gradients and neat boxes." },
        { code: '.card {\n  border-radius: 22px;\n  box-shadow: …;\n}', html: SITE, css: Y2026, say: "Сегодня: воздух, скругления и мягкие тени. ¦ Bugun: bo'sh joy, yumaloq burchaklar va yumshoq soyalar. ¦ Today: space, rounded corners and soft shadows." },
      ],
      takeaway: "Вид менялся, а HTML внутри остался тем же. ¦ Ko'rinish o'zgardi, ichidagi HTML esa o'sha qoldi. ¦ The look changed; the HTML inside stayed the same.",
      notes: { say: ["Обратите внимание: HTML не менялся — менялись только стили (CSS)."], min: 6 },
    },
    {
      type: 'poll',
      stage: 3,
      title: "Что осталось с 1991 года? ¦ 1991-yildan nima qolgan? ¦ What's left from 1991?",
      chat: "голосуйте 1–3 ¦ 1–3 bilan ovoz bering ¦ vote 1–3",
      options: [
        { label: "Ничего ¦ Hech narsa ¦ Nothing" },
        { label: "Теги и ссылки ¦ Teglar va havolalar ¦ Tags and links", detail: "Верно ✔ ¦ To'g'ri ✔ ¦ Correct ✔" },
        { label: "Только цвета ¦ Faqat ranglar ¦ Only the colours" },
      ],
      correct: 1,
      result: "Первый сайт открывается и сегодня — браузеры всё ещё понимают его HTML. ¦ Birinchi sayt bugun ham ochiladi — brauzerlar hali ham uning HTML'ini tushunadi. ¦ The first site still opens today — browsers still understand its HTML.",
      takeaway: "HTML — один из самых «долгоживущих» языков. ¦ HTML — eng «uzoq yashaydigan» tillardan biri. ¦ HTML is one of the longest-living languages.",
      notes: { say: ["Голосование."], min: 2 },
    },
    {
      type: 'show',
      stage: 3,
      title: "Ссылка — главное изобретение ¦ Havola — asosiy ixtiro ¦ The link: the key invention",
      chat: "куда поставим ссылку? ¦ havolani qayerga qo'yamiz? ¦ where shall the link go?",
      css: 'p{font-size:30px;padding:40px 10px}a{color:#2563eb;font-weight:800}a.big{display:inline-block;padding:14px 26px;border-radius:999px;background:#f2573a;color:#fff;text-decoration:none}',
      steps: [
        { code: '<p>Мои котики</p> ¦ <p>Mushuklarim</p> ¦ <p>My cats</p>', html: '<p>Мои котики</p> ¦ <p>Mushuklarim</p> ¦ <p>My cats</p>', say: "Обычный текст никуда не ведёт. ¦ Oddiy matn hech qayerga olib bormaydi. ¦ Plain text leads nowhere." },
        { code: '<a href="cats.html">Мои котики</a> ¦ <a href="cats.html">Mushuklarim</a> ¦ <a href="cats.html">My cats</a>', html: '<p><a>Мои котики</a></p> ¦ <p><a>Mushuklarim</a></p> ¦ <p><a>My cats</a></p>', say: "Тег a делает из текста дверь на другую страницу. ¦ a tegi matnni boshqa sahifaga eshikka aylantiradi. ¦ The a tag turns text into a door to another page." },
        { code: '<a class="big" href="cats.html">…</a>', html: '<p><a class="big">Мои котики 🐱</a></p> ¦ <p><a class="big">Mushuklarim 🐱</a></p> ¦ <p><a class="big">My cats 🐱</a></p>', say: "Сегодня ссылки часто выглядят как кнопки. ¦ Bugun havolalar ko'pincha tugmalarga o'xshaydi. ¦ Today links often look like buttons." },
      ],
      takeaway: "Без ссылок не было бы «паутины» — интернета страниц. ¦ Havolalarsiz «to'r» — sahifalar interneti bo'lmasdi. ¦ Without links there'd be no “web” of pages.",
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Первый сайт был с видео ¦ Birinchi saytda video bor edi ¦ The first site had videos", truth: false, explain: "Только текст и ссылки. ¦ Faqat matn va havolalar. ¦ Just text and links." },
        { text: "Первый сайт можно открыть и сейчас ¦ Birinchi saytni hozir ham ochish mumkin ¦ You can still open the first site", truth: true, explain: "Адрес: info.cern.ch ¦ Manzil: info.cern.ch ¦ Address: info.cern.ch" },
        { text: "Современные сайты тоже на HTML ¦ Zamonaviy saytlar ham HTML'da ¦ Modern sites use HTML too", truth: true, explain: "YouTube, Instagram — внутри HTML. ¦ YouTube, Instagram — ichida HTML. ¦ YouTube, Instagram — HTML inside." },
      ],
      takeaway: "Учите HTML — и вы говорите на языке всех сайтов мира. ¦ HTML'ni o'rganing — va siz dunyodagi barcha saytlar tilida gaplashasiz. ¦ Learn HTML and you speak the language of every site.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: историк интернета ¦ Missiya: internet tarixchisi ¦ Mission: web historian",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Вы прошли 30 лет за урок! ¦ Siz bir darsda 30 yilni bosib o'tdingiz! ¦ You crossed 30 years in one lesson!",
      items: [
        { title: "Год первого сайта ¦ Birinchi sayt yili ¦ The first site's year", choices: ['1991', '2010'], correct: 0, explain: "1991, CERN. ¦ 1991, CERN. ¦ 1991, CERN." },
        { title: "Что делает тег a? ¦ a tegi nima qiladi? ¦ What does the a tag do?", choices: ["Ссылку ¦ Havola ¦ A link", "Картинку ¦ Rasm ¦ A picture"], correct: 0, explain: "Дверь на другую страницу. ¦ Boshqa sahifaga eshik. ¦ A door to another page." },
        { title: "Что менялось за 30 лет больше всего? ¦ 30 yilda eng ko'p nima o'zgardi? ¦ What changed most in 30 years?", choices: ["Внешний вид ¦ Tashqi ko'rinish ¦ The look", "Теги HTML ¦ HTML teglari ¦ HTML tags"], correct: 0, explain: "Стили — да, основа — нет. ¦ Uslublar — ha, asos — yo'q. ¦ Styles yes, the base no." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: 30 лет сайтов ¦ Xulosa: 30 yillik saytlar ¦ Summary: 30 years of sites",
      chat: "каким будет сайт через 30 лет? ¦ 30 yildan keyin sayt qanday bo'ladi? ¦ what will sites look like in 30 years?",
      answer: "Первый сайт сделал Тим Бернерс-Ли в 1991 году, чтобы учёные делились статьями через ссылки. Там был только текст. С тех пор сайты стали яркими, потом аккуратными, а сейчас — с воздухом и скруглениями. Но внутри всё тот же HTML с тегами и ссылками. ¦ Birinchi saytni Tim Berners-Li 1991-yilda olimlar havolalar orqali maqola ulashishi uchun yaratgan. Unda faqat matn bor edi. O'shandan beri saytlar yorqin, keyin ozoda, hozir esa bo'sh joy va yumaloq burchaklarga ega bo'ldi. Lekin ichida hamon teglar va havolalarga ega o'sha HTML. ¦ Tim Berners-Lee made the first site in 1991 so scientists could share papers through links. It was text only. Sites then got loud, then neat, and now spacious and rounded. But inside it's still the same HTML with tags and links.",
      icon: '🕰️',
      badge: "Историк веба ¦ Veb tarixchisi ¦ Web historian",
      badgeSub: "HTML · общая 3 ¦ HTML · umumiy 3 ¦ HTML · general 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Откройте info.cern.ch и найдите на нём 3 ссылки. ¦ info.cern.ch'ni oching va undan 3 ta havola toping. ¦ Open info.cern.ch and find 3 links.",
        "Нарисуйте, каким будет сайт через 30 лет. ¦ 30 yildan keyin sayt qanday bo'lishini chizing. ¦ Draw a website from 30 years in the future.",
      ],
      takeaway: "Дальше: как браузер читает ваш код. ¦ Keyingisi: brauzer kodingizni qanday o'qiydi. ¦ Next: how the browser reads your code.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
