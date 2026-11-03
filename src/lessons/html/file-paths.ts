import { kit } from '@engine/kit';

const TREE = `my-site/
├── index.html
├── about.html
├── css/
│   └── style.css
├── img/
│   ├── logo.png
│   └── cat.jpg
└── pages/
    └── contacts.html`;

export default kit({
  id: 'html-t02',
  title: "Пути к файлам и структура проекта ¦ Fayl yo'llari va loyiha tuzilmasi ¦ File paths and project structure",
  question: "Почему картинка или стиль «не подключаются», хотя файл лежит рядом? ¦ Nega fayl yonida tursa ham rasm yoki uslub «ulanmaydi»? ¦ Why won't an image or stylesheet load even though the file is right there?",
  route: ["Проблема ¦ Muammo ¦ Problem", "Папки ¦ Papkalar ¦ Folders", "Пути ¦ Yo'llar ¦ Paths", "Ошибки ¦ Xatolar ¦ Bugs", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '📁',
      kicker: "HTML · техническая тема 2 ¦ HTML · texnik mavzu 2 ¦ HTML · technical topic 2",
      title: "Картинка, которая не появилась ¦ Paydo bo'lmagan rasm ¦ The image that never showed up",
      chat: "бывало, что картинка не загружалась? что вы делали? ¦ rasm yuklanmagan holat bo'lganmi? nima qildingiz? ¦ has an image ever failed to load for you? what did you do?",
      lead: "Браузер ищет файлы не «где-то рядом», а точно по адресу, который вы написали. Одна буква — и файл потерян. ¦ Brauzer fayllarni «yaqin atrofda» emas, aynan siz yozgan manzil bo'yicha qidiradi. Bitta harf — va fayl yo'qoldi. ¦ The browser does not look “somewhere nearby” — it follows the exact address you wrote. One wrong letter and the file is lost.",
      takeaway: "Путь к файлу — это маршрут, по которому браузер идёт от вашей страницы к картинке. ¦ Fayl yo'li — brauzer sahifangizdan rasmga boradigan marshrut. ¦ A file path is the route the browser walks from your page to the image.",
      notes: { say: ["Спросите про «битые» картинки — у всех было.", "→ — главная мысль."], min: 3 },
    },
    {
      type: 'walk',
      stage: 1,
      title: "Структура аккуратного проекта ¦ Tartibli loyiha tuzilmasi ¦ A tidy project structure",
      chat: "как вы раскладываете файлы в своих проектах? ¦ loyihalaringizda fayllarni qanday joylashtirasiz? ¦ how do you organise files in your projects?",
      lang: 'html',
      code: TREE,
      marks: [
        { line: 1, text: "Корень проекта — одна папка, в которой лежит всё. Её и загружают на сервер. ¦ Loyiha ildizi — hamma narsa turadigan bitta papka. Aynan u serverga yuklanadi. ¦ The project root is one folder that holds everything. That is what you upload to a server." },
        { line: 2, text: "index.html — главная страница. Сервер открывает её, если в адресе нет имени файла. ¦ index.html — bosh sahifa. Manzilda fayl nomi bo'lmasa, server uni ochadi. ¦ index.html is the home page. The server opens it when the address has no file name." },
        { line: 4, text: "Стили — в папке css/. ¦ Uslublar — css/ papkasida. ¦ Styles live in css/." },
        { line: 6, text: "Все картинки — в img/. Так их легко найти и заменить. ¦ Barcha rasmlar — img/'da. Shunda ularni topish va almashtirish oson. ¦ All images go in img/. Easy to find and replace." },
        { line: 9, text: "Дополнительные страницы можно сложить в pages/. Но тогда пути из них меняются — это главная ловушка урока. ¦ Qo'shimcha sahifalarni pages/'ga solish mumkin. Lekin unda ulardan yo'llar o'zgaradi — bu darsning asosiy tuzog'i. ¦ Extra pages can go in pages/. But then paths from them change — the main trap of this lesson." },
      ],
      takeaway: "Одна корневая папка, внутри css/, img/, js/ — и никаких файлов «на рабочем столе». ¦ Bitta ildiz papka, ichida css/, img/, js/ — va «ish stolida» hech qanday fayl yo'q. ¦ One root folder with css/, img/, js/ inside — and no files lying on the desktop.",
      notes: { say: ["→ по строкам дерева.", "Совет: имена папок и файлов — латиницей, маленькими буквами, без пробелов."], min: 4 },
    },
    {
      type: 'poll',
      stage: 2,
      title: "Как подключить cat.jpg? ¦ cat.jpg'ni qanday ulash kerak? ¦ How do we link cat.jpg?",
      chat: "мы в index.html. голосуйте 1–4 ¦ biz index.html'damiz. 1–4 bilan ovoz bering ¦ we are in index.html. vote 1–4",
      question: "<img src=\"???\"> в файле index.html ¦ index.html faylida <img src=\"???\"> ¦ <img src=\"???\"> inside index.html",
      options: [
        { label: 'cat.jpg', detail: "Ищет рядом с index.html — там его нет ¦ index.html yonidan qidiradi — u yerda yo'q ¦ Looks next to index.html — not there" },
        { label: 'img/cat.jpg', detail: "Зайти в img/ и взять cat.jpg ✔ ¦ img/'ga kirib cat.jpg'ni olish ✔ ¦ Go into img/ and take cat.jpg ✔" },
        { label: 'C:\\Users\\Ali\\my-site\\img\\cat.jpg', detail: "Работает только на компьютере Али ¦ Faqat Alining kompyuterida ishlaydi ¦ Works only on Ali's computer" },
        { label: '../img/cat.jpg', detail: "../ выходит из my-site — промах ¦ ../ my-site'dan chiqib ketadi — xato ¦ ../ leaves my-site — miss" },
      ],
      correct: 1,
      result: "Относительный путь читается от папки текущей страницы: из index.html заходим в img/ и берём cat.jpg. ¦ Nisbiy yo'l joriy sahifa papkasidan o'qiladi: index.html'dan img/'ga kirib cat.jpg'ni olamiz. ¦ A relative path starts from the current page's folder: from index.html go into img/ and take cat.jpg.",
      takeaway: "Относительный путь начинается от папки, где лежит текущая страница. ¦ Nisbiy yo'l joriy sahifa turgan papkadan boshlanadi. ¦ A relative path starts from the folder where the current page lives.",
      notes: { say: ["Покажите дерево снова (O → сцена 2), если нужно.", "Вариант 3 часто «работает» у ученика, но ломается у всех остальных."], answer: "img/cat.jpg", min: 4 },
    },
    {
      type: 'cards',
      stage: 2,
      title: "Словарь путей ¦ Yo'llar lug'ati ¦ A path dictionary",
      chat: "что значат две точки ../? ¦ ikki nuqta ../ nimani anglatadi? ¦ what do the two dots ../ mean?",
      cards: [
        { icon: '📄', front: 'cat.jpg', back: "Файл в той же папке, что и страница. ¦ Sahifa bilan bir papkadagi fayl. ¦ A file in the same folder as the page." },
        { icon: '📂', front: 'img/cat.jpg', back: "Зайти в папку img, взять файл. ¦ img papkasiga kirib, faylni olish. ¦ Go into the img folder, take the file." },
        { icon: '⬆️', front: '../', back: "Подняться на одну папку вверх. ../../ — на две. ¦ Bitta papka yuqoriga ko'tarilish. ../../ — ikkita. ¦ Go up one folder. ../../ goes up two." },
        { icon: '🏠', front: '/img/cat.jpg', back: "От корня сайта. На сервере удобно, но с диска (file://) не сработает. ¦ Sayt ildizidan. Serverda qulay, lekin diskdan (file://) ishlamaydi. ¦ From the site root. Handy on a server, but fails when opened from disk (file://)." },
        { icon: '🌍', front: 'https://…/cat.jpg', back: "Абсолютный адрес в интернете — картинка с другого сайта. ¦ Internetdagi mutlaq manzil — boshqa saytdagi rasm. ¦ An absolute web address — an image from another site." },
        { icon: '🚫', front: 'C:\\…\\cat.jpg', back: "Путь по вашему диску. Никогда не используйте его в сайте. ¦ Diskingiz bo'yicha yo'l. Saytda hech qachon ishlatmang. ¦ A path on your own disk. Never use it in a site." },
      ],
      takeaway: "Для своих файлов — относительные пути. Для чужих сайтов — полный адрес https://. ¦ O'z fayllaringiz uchun — nisbiy yo'llar. Boshqa saytlar uchun — to'liq https:// manzil. ¦ Use relative paths for your own files and full https:// addresses for other sites.",
      notes: { say: ["Открывайте 1–6. Особое внимание — ../ и C:\\."], min: 4 },
    },
    {
      type: 'flow',
      stage: 2,
      title: "Браузер идёт по пути ../css/style.css ¦ Brauzer ../css/style.css yo'li bo'ylab yuradi ¦ The browser follows ../css/style.css",
      chat: "мы в pages/contacts.html. куда ведёт ../? ¦ biz pages/contacts.html'damiz. ../ qayerga olib boradi? ¦ we are in pages/contacts.html. where does ../ lead?",
      nodes: [
        { icon: '📍', label: "Где я? ¦ Men qayerdaman? ¦ Where am I?", text: "Страница pages/contacts.html. Значит, стою в папке pages/. ¦ Sahifa pages/contacts.html. Demak, pages/ papkasida turibman. ¦ The page is pages/contacts.html, so I am standing in pages/." },
        { icon: '⬆️', label: '../', text: "Поднимаюсь на одну папку вверх — в корень my-site/. ¦ Bitta papka yuqoriga — my-site/ ildiziga ko'tarilaman. ¦ I go up one folder — to the root my-site/." },
        { icon: '📂', label: 'css/', text: "Захожу в папку css/. ¦ css/ papkasiga kiraman. ¦ I go into css/." },
        { icon: '🎨', label: 'style.css', text: "Нашёл файл! Стили подключены. ¦ Faylni topdim! Uslublar ulandi. ¦ Found it! The styles are linked." },
      ],
      takeaway: "Читайте путь как маршрут: «где я» → «вверх» → «в папку» → «файл». ¦ Yo'lni marshrut kabi o'qing: «qayerdaman» → «yuqoriga» → «papkaga» → «fayl». ¦ Read a path like directions: “where am I” → “up” → “into a folder” → “the file”.",
      notes: { say: ["Если бы написали css/style.css, браузер искал бы pages/css/style.css — и не нашёл бы."], min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Сработает ли путь из index.html? ¦ index.html'dan yo'l ishlaydimi? ¦ Will the path work from index.html?",
      chat: "пишите: «img/logo.png — да» ¦ yozing: «img/logo.png — ha» ¦ write: “img/logo.png — yes”",
      zones: [
        { id: 'ok', label: "Сработает ¦ Ishlaydi ¦ Works", icon: '✅' },
        { id: 'bad', label: "Не сработает ¦ Ishlamaydi ¦ Fails", icon: '❌' },
      ],
      items: [
        { text: 'css/style.css', zone: 'ok' },
        { text: 'img/logo.png', zone: 'ok' },
        { text: 'pages/contacts.html', zone: 'ok' },
        { text: 'style.css', zone: 'bad', why: "Файл лежит в css/, а не рядом. ¦ Fayl yonida emas, css/'da. ¦ The file is in css/, not next to the page." },
        { text: 'Img/Logo.png', zone: 'bad', why: "На сервере регистр важен: Img ≠ img. ¦ Serverda registr muhim: Img ≠ img. ¦ On a server case matters: Img ≠ img." },
        { text: 'images/logo.png', zone: 'bad', why: "Папка называется img. ¦ Papka img deb nomlangan. ¦ The folder is called img." },
        { text: '../img/logo.png', zone: 'bad', why: "../ выводит за пределы проекта. ¦ ../ loyihadan tashqariga olib chiqadi. ¦ ../ leaves the project." },
      ],
      takeaway: "Путь должен совпадать с реальными именами папок и файлов — буква в букву. ¦ Yo'l papka va fayllarning haqiqiy nomlari bilan harfma-harf mos bo'lishi kerak. ¦ A path must match the real folder and file names letter for letter.",
      notes: { say: ["Используйте дерево из сцены 2. «Проверить» — ошибки подсветятся с объяснением."], min: 4 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Найдите сломанный путь ¦ Buzilgan yo'lni toping ¦ Find the broken path",
      chat: "номер строки ¦ qator raqami ¦ line number",
      snippets: [
        { title: "pages/contacts.html: стили не работают ¦ pages/contacts.html: uslublar ishlamayapti ¦ pages/contacts.html: styles don't work", lang: 'html', code: `<!-- pages/contacts.html -->\n<head>\n  <link rel="stylesheet" href="css/style.css">\n</head>`, line: 3, explain: "Из папки pages/ нужно сначала подняться: ../css/style.css. ¦ pages/ papkasidan avval ko'tarilish kerak: ../css/style.css. ¦ From pages/ you must go up first: ../css/style.css.", fix: '<link rel="stylesheet" href="../css/style.css">' },
        { title: "На сервере пропал логотип ¦ Serverda logotip yo'qoldi ¦ The logo vanished on the server", lang: 'html', code: `<header>\n  <img src="img\\logo.png" alt="Logo">\n</header>`, line: 2, explain: "Обратный слэш \\ — привычка Windows. В вебе пути пишут через /. ¦ Teskari slash \\ — Windows odati. Vebda yo'llar / bilan yoziladi. ¦ A backslash \\ is a Windows habit. On the web paths use /.", fix: '<img src="img/logo.png" alt="Logo">' },
        { title: "Картинка видна только у меня ¦ Rasm faqat menda ko'rinadi ¦ The image only shows for me", lang: 'html', code: `<main>\n  <h1>My cat</h1>\n  <img src="C:/Users/Ali/Desktop/cat.jpg">\n</main>`, line: 3, explain: "Путь по диску Али. Скопируйте картинку в img/ и напишите img/cat.jpg. ¦ Ali diskidagi yo'l. Rasmni img/'ga ko'chiring va img/cat.jpg deb yozing. ¦ That is Ali's disk. Copy the image into img/ and write img/cat.jpg.", fix: '<img src="img/cat.jpg" alt="My cat">' },
      ],
      takeaway: "Три главные ошибки путей: забыли ../, написали \\ вместо /, указали путь по своему диску. ¦ Yo'llardagi uchta asosiy xato: ../ unutildi, / o'rniga \\ yozildi, o'z diskingiz yo'li ko'rsatildi. ¦ The three classic path bugs: a missing ../, \\ instead of /, and a path on your own disk.",
      notes: { say: ["Чат пишет номер строки, вы кликаете."], min: 5 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правила имён файлов ¦ Fayl nomlari qoidalari ¦ File naming rules",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Имя «Моя картинка.png» — нормальное ¦ «Mening rasmim.png» nomi — normal ¦ “My picture.png” is a fine name", truth: false, explain: "Пробелы и кириллица ломают адреса. Лучше my-picture.png. ¦ Probel va kirill harflari manzillarni buzadi. my-picture.png yaxshiroq. ¦ Spaces and non-Latin letters break addresses. Use my-picture.png." },
        { text: "На сервере Logo.png и logo.png — разные файлы ¦ Serverda Logo.png va logo.png — har xil fayllar ¦ On a server Logo.png and logo.png are different files", truth: true, explain: "Поэтому пишите имена только маленькими буквами. ¦ Shuning uchun nomlarni faqat kichik harflar bilan yozing. ¦ That is why names should be all lowercase." },
        { text: "index.html открывается, даже если его не написать в адресе ¦ index.html manzilda yozilmasa ham ochiladi ¦ index.html opens even if you leave it out of the address", truth: true, explain: "site.uz/ = site.uz/index.html. ¦ site.uz/ = site.uz/index.html. ¦ site.uz/ = site.uz/index.html." },
        { text: "Расширение .jpg и .png можно не писать ¦ .jpg va .png kengaytmasini yozmasa ham bo'ladi ¦ You can skip the .jpg or .png extension", truth: false, explain: "Без расширения это другое имя файла. ¦ Kengaytmasiz bu boshqa fayl nomi. ¦ Without the extension it is a different file name." },
      ],
      takeaway: "Имена файлов: латиница, маленькие буквы, дефис вместо пробела, с расширением. ¦ Fayl nomlari: lotin harflari, kichik harflar, probel o'rniga defis, kengaytma bilan. ¦ File names: Latin letters, lowercase, hyphens instead of spaces, with an extension.",
      notes: { say: ["Голосование по пунктам, раскрытие 1–4."], min: 3 },
    },
    {
      type: 'cheatsheet',
      stage: 4,
      title: "Шпаргалка по путям ¦ Yo'llar bo'yicha shpargalka ¦ Paths cheat sheet",
      sheetTitle: "Как добраться до файла ¦ Faylga qanday yetib borish ¦ How to reach a file",
      items: [
        { icon: '📄', text: "Рядом со страницей ¦ Sahifa yonida ¦ Next to the page", code: 'cat.jpg' },
        { icon: '📂', text: "В папке рядом ¦ Yondagi papkada ¦ In a folder next to it", code: 'img/cat.jpg' },
        { icon: '⬆️', text: "Подняться вверх ¦ Yuqoriga ko'tarilish ¦ Go up", code: '../css/style.css' },
        { icon: '🌍', text: "Чужой сайт ¦ Boshqa sayt ¦ Another site", code: 'https://example.com/a.png' },
        { icon: '🔡', text: "Имена ¦ Nomlar ¦ Names", code: 'my-photo-1.jpg' },
        { icon: '🚫', text: "Никогда ¦ Hech qachon ¦ Never", code: 'C:\\Users\\…' },
      ],
      notes: { say: ["Скриншот на память."], min: 2 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: пути к файлам ¦ Xulosa: fayl yo'llari ¦ Summary: file paths",
      chat: "какую ошибку с путями вы делали чаще всего? ¦ yo'llar bilan qaysi xatoni ko'p qilgansiz? ¦ which path mistake have you made most often?",
      answer: "Браузер ищет файл строго по пути от текущей страницы. Держите проект в одной папке, называйте файлы латиницей и маленькими буквами, а ../ используйте, чтобы подняться вверх. ¦ Brauzer faylni joriy sahifadan qat'iy yo'l bo'yicha qidiradi. Loyihani bitta papkada saqlang, fayllarni lotin va kichik harflar bilan nomlang, yuqoriga chiqish uchun ../ ishlating. ¦ The browser finds files strictly by the path from the current page. Keep the project in one folder, name files in lowercase Latin, and use ../ to go up.",
      icon: '📁',
      badge: "Навигатор по папкам ¦ Papkalar navigatori ¦ Folder navigator",
      badgeSub: "HTML · техническая 2 ¦ HTML · texnik 2 ¦ HTML · technical 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Разложите свой проект по папкам css/, img/ и проверьте, что всё подключается. ¦ Loyihangizni css/, img/ papkalariga joylang va hammasi ulanishini tekshiring. ¦ Sort your project into css/ and img/ and check everything still loads.",
        "Переименуйте файлы с пробелами и заглавными буквами. ¦ Probel va bosh harfli fayllarni qayta nomlang. ¦ Rename any files with spaces or capitals.",
      ],
      takeaway: "Аккуратная папка проекта — половина работающего сайта. ¦ Tartibli loyiha papkasi — ishlaydigan saytning yarmi. ¦ A tidy project folder is half of a working site.",
      notes: { say: ["Итог, домашнее задание."], min: 2 },
    },
  ],
});
