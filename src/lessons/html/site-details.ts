import { kit } from '@engine/kit';

const TAB_CSS = `.bar{display:flex;gap:8px;padding:14px 14px 0;background:#e6e8ee;border-radius:16px 16px 0 0}
.tab{display:flex;align-items:center;gap:10px;min-width:280px;padding:12px 18px;background:#fff;border-radius:12px 12px 0 0;font-size:22px;font-weight:700}
.tab .ico{width:30px;height:30px;border-radius:8px;background:#cfd3dc;display:grid;place-items:center;font-size:22px}
.page{height:300px;background:#fff;border:1px solid #e6e8ee;border-top:0;border-radius:0 0 16px 16px;display:grid;place-items:center;font-size:30px;color:#999}
.msg{margin-top:20px;max-width:460px;padding:14px;border-radius:18px;background:#e7f3ff}
.msg a{color:#2563eb;font-size:20px}
.prev{margin-top:10px;border-left:4px solid #2563eb;padding:6px 12px;background:#fff;border-radius:8px}
.prev b{display:block;font-size:22px}.prev span{font-size:18px;color:#555}.prev i{display:block;height:120px;margin-top:8px;border-radius:10px;background:linear-gradient(135deg,#f2573a,#ffb347)}`;
const tab = (ico: string, title: string, extra = '') =>
  `<div class="bar"><div class="tab"><span class="ico">${ico}</span>${title}</div></div><div class="page">🍩</div>${extra}`;

export default kit({
  id: 'html-g05',
  title: "Мелочи, которые делают сайт настоящим ¦ Saytni haqiqiy qiladigan mayda detallar ¦ Small details that make a site real",
  question: "Почему одни ссылки в Telegram выглядят красиво, а другие — нет? ¦ Nega Telegramda ba'zi havolalar chiroyli ko'rinadi, boshqalari — yo'q? ¦ Why do some links look great in Telegram and others don't?",
  route: ["Загадка ¦ Topishmoq ¦ Puzzle", "Вкладка ¦ Yorliq ¦ The tab", "Иконка ¦ Belgi ¦ The icon", "Превью ¦ Ko'rinish ¦ The preview", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '✨',
      kicker: "HTML · общая тема 5 ¦ HTML · umumiy mavzu 5 ¦ HTML · general topic 5",
      title: "Три строчки — и сайт как у больших ¦ Uch qator — va sayt kattalarnikidek ¦ Three lines and your site looks pro",
      chat: "что вы замечаете во вкладке браузера? ¦ brauzer yorlig'ida nimani sezasiz? ¦ what do you notice on a browser tab?",
      lead: "Название во вкладке, маленькая иконка и красивая карточка ссылки — это всего несколько строк HTML. ¦ Yorliqdagi nom, kichik belgi va chiroyli havola kartochkasi — bor-yo'g'i bir necha qator HTML. ¦ The tab name, a tiny icon and a nice link card are just a few lines of HTML.",
      facts: ["Название вкладки ¦ Yorliq nomi ¦ The tab title", "Иконка сайта ¦ Sayt belgisi ¦ The site icon", "Карточка ссылки ¦ Havola kartochkasi ¦ The link card"],
      takeaway: "Сегодня добавим все три к сайту пончиковой. ¦ Bugun uchalasini ham ponchikxona saytiga qo'shamiz. ¦ Today we add all three to a donut shop site.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Название во вкладке ¦ Yorliqdagi nom ¦ The tab title",
      chat: "как назовём сайт? ¦ saytni qanday nomlaymiz? ¦ what shall we call the site?",
      css: TAB_CSS,
      steps: [
        { code: '<head>\n</head>', html: tab('', 'index.html'), say: "Без названия во вкладке видно имя файла. Некрасиво! ¦ Nomsiz yorliqda fayl nomi ko'rinadi. Chiroyli emas! ¦ Without a title the tab shows the file name. Not nice!" },
        { code: '<head>\n  <title>Donut Lab</title>\n</head>', line: 2, html: tab('', 'Donut Lab'), say: "Тег title пишет название во вкладке. ¦ title tegi yorliqqa nom yozadi. ¦ The title tag writes the tab's name." },
      ],
      takeaway: "title — первое, что человек видит во вкладке и в поиске Google. ¦ title — inson yorliqda va Google qidiruvida ko'radigan birinchi narsa. ¦ title is the first thing people see on the tab and in Google.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Маленькая иконка ¦ Kichik belgi ¦ The tiny icon",
      chat: "какую иконку поставим? ¦ qanday belgi qo'yamiz? ¦ which icon shall we use?",
      css: TAB_CSS,
      steps: [
        { code: '<title>Donut Lab</title>', html: tab('', 'Donut Lab'), say: "Серый квадратик — иконки пока нет. ¦ Kulrang kvadrat — belgi hali yo'q. ¦ A grey square: no icon yet." },
        { code: '<title>Donut Lab</title>\n<link rel="icon" href="donut.png">', line: 2, html: tab('🍩', 'Donut Lab'), say: "Тег link с rel=\"icon\" ставит картинку во вкладку. ¦ rel=\"icon\" li link tegi yorliqqa rasm qo'yadi. ¦ A link tag with rel=\"icon\" puts a picture on the tab." },
      ],
      takeaway: "Это называется favicon. Его видно во вкладках и закладках. ¦ Bu favicon deyiladi. U yorliqlarda va xatcho'plarda ko'rinadi. ¦ It's called a favicon — shown on tabs and bookmarks.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 3,
      title: "Красивая ссылка в Telegram ¦ Telegramda chiroyli havola ¦ A nice link in Telegram",
      chat: "какое описание напишем? ¦ qanday tavsif yozamiz? ¦ what description shall we write?",
      css: TAB_CSS,
      steps: [
        { code: '<head>\n  <title>Donut Lab</title>\n</head>', html: '<div class="msg"><a>donut-lab.example</a></div>', say: "Без подсказок мессенджер показывает голую ссылку. ¦ Ko'rsatmalarsiz messenjer quruq havolani ko'rsatadi. ¦ Without hints the messenger shows a bare link." },
        { code: '<meta property="og:title"\n      content="Donut Lab">\n<meta property="og:description"\n      content="Fresh donuts 🍩">', line: 1, html: '<div class="msg"><a>donut-lab.example</a><div class="prev"><b>Donut Lab</b><span>Fresh donuts 🍩</span></div></div>', say: "Теги meta добавляют название и описание. ¦ meta teglari nom va tavsif qo'shadi. ¦ meta tags add a title and description." },
        { code: '<meta property="og:image"\n      content="cover.jpg">', line: 1, html: '<div class="msg"><a>donut-lab.example</a><div class="prev"><b>Donut Lab</b><span>Fresh donuts 🍩</span><i></i></div></div>', say: "А og:image — картинку. Теперь ссылку хочется открыть! ¦ og:image esa — rasm. Endi havolani ochgingiz keladi! ¦ And og:image adds a picture. Now people want to click!" },
      ],
      takeaway: "meta-теги видят не люди, а мессенджеры и поисковики. ¦ meta teglarni odamlar emas, messenjer va qidiruv tizimlari ko'radi. ¦ meta tags are read by messengers and search engines, not people.",
      notes: { say: ["Покажите живой пример: отправьте ссылку на любой большой сайт в Telegram."], min: 5 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какой тег за что отвечает? ¦ Qaysi teg nima uchun javob beradi? ¦ Which tag does what?",
      chat: "пишите: «1 — title» ¦ yozing: «1 — title» ¦ write: “1 — title”",
      zones: [
        { id: 'title', label: '<title>', icon: '🏷️' },
        { id: 'icon', label: '<link rel="icon">', icon: '🍩' },
        { id: 'meta', label: '<meta og:…>', icon: '💬' },
      ],
      items: [
        { text: "Текст во вкладке ¦ Yorliqdagi matn ¦ The tab text", zone: 'title' },
        { text: "Картинка во вкладке ¦ Yorliqdagi rasm ¦ The tab picture", zone: 'icon' },
        { text: "Карточка в Telegram ¦ Telegramdagi kartochka ¦ The Telegram card", zone: 'meta' },
        { text: "Заголовок в поиске Google ¦ Google qidiruvidagi sarlavha ¦ The heading in Google results", zone: 'title' },
      ],
      takeaway: "Всё это живёт в head — «невидимой» части страницы. ¦ Bularning hammasi head'da — sahifaning «ko'rinmas» qismida yashaydi. ¦ All of these live in the head — the page's “invisible” part.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Тег title виден на самой странице ¦ title tegi sahifaning o'zida ko'rinadi ¦ The title tag shows on the page itself", truth: false, explain: "Только во вкладке и в поиске. ¦ Faqat yorliqda va qidiruvda. ¦ Only on the tab and in search." },
        { text: "Без og:image ссылка в Telegram будет без картинки ¦ og:image bo'lmasa Telegramdagi havola rasmsiz bo'ladi ¦ Without og:image the Telegram link has no picture", truth: true, explain: "Мессенджер не знает, что показать. ¦ Messenjer nimani ko'rsatishni bilmaydi. ¦ The messenger doesn't know what to show." },
        { text: "Эти мелочи делают сайт солиднее ¦ Bu mayda detallar saytni jiddiyroq qiladi ¦ These details make a site look more trustworthy", truth: true, explain: "Люди охотнее открывают красивые ссылки. ¦ Odamlar chiroyli havolalarni ko'proq ochadi. ¦ People click nice links more." },
      ],
      takeaway: "Маленькие детали = большое доверие. ¦ Kichik detallar = katta ishonch. ¦ Small details = big trust.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: сайт как у больших ¦ Missiya: kattalarnikidek sayt ¦ Mission: a pro-looking site",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сайт выглядит профессионально! ¦ Sayt professional ko'rinadi! ¦ The site looks professional!",
      items: [
        { title: "Название во вкладке ¦ Yorliqdagi nom ¦ The tab name", choices: ['<title>', '<h1>'], correct: 0, explain: "h1 — на странице, title — во вкладке. ¦ h1 — sahifada, title — yorliqda. ¦ h1 is on the page; title is on the tab." },
        { title: "Иконка во вкладке ¦ Yorliqdagi belgi ¦ The tab icon", choices: ['<link rel="icon">', '<img>'], correct: 0, explain: "Это favicon. ¦ Bu favicon. ¦ That's the favicon." },
        { title: "Картинка в Telegram ¦ Telegramdagi rasm ¦ The Telegram picture", choices: ['og:image', 'og:color'], correct: 0, explain: "og:image + адрес картинки. ¦ og:image + rasm manzili. ¦ og:image + the picture's address." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: мелочи сайта ¦ Xulosa: saytning mayda detallari ¦ Summary: site details",
      chat: "пришлите ссылку на свой сайт с превью! ¦ saytingiz havolasini ko'rinishi bilan yuboring! ¦ share your site's link with its preview!",
      answer: "В невидимой части страницы — head — живут три важные мелочи: title даёт название вкладке и поиску, link rel=\"icon\" ставит маленькую иконку, а meta-теги og:title, og:description и og:image делают красивую карточку ссылки в Telegram. ¦ Sahifaning ko'rinmas qismi — head'da uchta muhim mayda detal yashaydi: title yorliq va qidiruvga nom beradi, link rel=\"icon\" kichik belgi qo'yadi, og:title, og:description va og:image meta teglari esa Telegramda chiroyli havola kartochkasini yaratadi. ¦ In the invisible part of the page — the head — live three key details: title names the tab and search result, link rel=\"icon\" adds a tiny icon, and og:title, og:description and og:image meta tags make a nice link card in Telegram.",
      icon: '✨',
      badge: "Мастер деталей ¦ Detallar ustasi ¦ Detail master",
      badgeSub: "HTML · общая 5 ¦ HTML · umumiy 5 ¦ HTML · general 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте своей странице title и иконку. ¦ Sahifangizga title va belgi qo'shing. ¦ Give your page a title and an icon.",
        "Найдите в Telegram ссылку без картинки и ссылку с картинкой. ¦ Telegramda rasmsiz va rasmli havolani toping. ¦ Find a Telegram link with a preview and one without.",
      ],
      takeaway: "Общие темы HTML пройдены! Дальше — практика: семантика. ¦ HTML umumiy mavzulari tugadi! Keyingisi — amaliyot: semantika. ¦ HTML general topics done! Next: practice with semantic tags.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
