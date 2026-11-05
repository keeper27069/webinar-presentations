import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%}
.hero{width:500px;padding:10px;font-family:serif;transition:all .7s}
.hero h1{margin:0 0 6px;font-size:24px}.hero p{margin:0 0 10px}.hero button{font-size:14px}
.font{font-family:Manrope,system-ui}.font h1{font-size:44px;font-weight:800;line-height:1.05}.font p{font-size:20px}
.col{background:#fff4e6;border-radius:24px}.col h1{color:#16181f}.col p{color:#8a6d4b}.col button{background:#f2573a;color:#fff;border:0}
.pad{padding:40px}.pad p{margin:0 0 24px}.pad button{padding:16px 34px;border-radius:14px;font-size:20px;font-weight:800}`;
const hero = (cls: string) => `<div class="wrap"><div class="hero ${cls}"><h1>Fresh bread every morning 🥐</h1><p>Bakery “Non Uyi” · Tashkent</p><button>Order now</button></div></div>`;

export default kit({
  id: 'css-g04',
  title: "Клиент прислал дизайн из Figma ¦ Mijoz Figma'dan dizayn yubordi ¦ A client sent a Figma design",
  question: "Как превратить красивую картинку дизайнера в настоящий сайт? ¦ Dizaynerning chiroyli rasmini qanday qilib haqiqiy saytga aylantirish mumkin? ¦ How do you turn a designer's picture into a real website?",
  route: ["Путь ¦ Yo'l ¦ The path", "Собираем ¦ Yig'amiz ¦ Building", "Правила ¦ Qoidalar ¦ Rules", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎨',
      kicker: "CSS · общая тема 4 ¦ CSS · umumiy mavzu 4 ¦ CSS · general topic 4",
      title: "Макет — это картинка. Сайт — это код ¦ Maket — bu rasm. Sayt — bu kod ¦ A mockup is a picture. A site is code",
      chat: "вы слышали про Figma? ¦ Figma haqida eshitganmisiz? ¦ have you heard of Figma?",
      lead: "Дизайнер рисует сайт в Figma — это как рисунок. Наша задача — повторить его кодом: те же цвета, шрифты и отступы. ¦ Dizayner saytni Figma'da chizadi — bu rasmga o'xshaydi. Bizning vazifamiz — uni kod bilan takrorlash: o'sha ranglar, shriftlar va bo'shliqlar. ¦ A designer draws the site in Figma, like a picture. Our job is to repeat it in code: same colours, fonts and spacing.",
      facts: ["Figma — программа для дизайна ¦ Figma — dizayn dasturi ¦ Figma is a design tool", "Из макета берём точные цифры ¦ Maketdan aniq raqamlarni olamiz ¦ We take exact numbers from it", "Верстальщик = переводчик картинки в код ¦ Maketchi = rasmni kodga tarjimon ¦ A coder translates pictures into code"],
      takeaway: "Посмотрим весь путь от макета до сайта. ¦ Maketdan saytgacha bo'lgan butun yo'lni ko'ramiz. ¦ Let's see the whole path from mockup to site.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "От картинки к сайту ¦ Rasmdan saytgacha ¦ From picture to site",
      chat: "какой шаг кажется самым сложным? ¦ qaysi qadam eng qiyin tuyuladi? ¦ which step seems hardest?",
      actors: [
        { id: 'fig', icon: '🎨', label: "Макет ¦ Maket ¦ Mockup" },
        { id: 'ruler', icon: '📏', label: "Снимаем размеры ¦ O'lchamlarni olamiz ¦ Take measurements" },
        { id: 'html', icon: '📄', label: "HTML: блоки ¦ HTML: bloklar ¦ HTML: blocks" },
        { id: 'css', icon: '💅', label: "CSS: красота ¦ CSS: chiroy ¦ CSS: styling" },
        { id: 'site', icon: '🌐', label: "Готовый сайт ¦ Tayyor sayt ¦ Finished site" },
        { id: 'n1', text: "#F2573A" }, { id: 'n2', text: "44px" }, { id: 'n3', text: "Manrope" },
      ],
      steps: [
        { say: "Клиент прислал ссылку на макет. ¦ Mijoz maketga havola yubordi. ¦ The client sends a link to the mockup.", at: { fig: [10, 50, 1.2] }, pulse: ['fig'] },
        { say: "Кликаем на элементы и выписываем цифры: цвет, размер, шрифт. ¦ Elementlarni bosamiz va raqamlarni yozib olamiz: rang, o'lcham, shrift. ¦ Click elements and note the numbers: colour, size, font.", at: { ruler: [30, 50], n1: [30, 18, 0.8], n2: [30, 84, 0.8], n3: [12, 84, 0.8] }, lines: [['fig', 'ruler']] },
        { say: "Сначала HTML: какие блоки есть на странице. ¦ Avval HTML: sahifada qanday bloklar bor. ¦ First HTML: which blocks are on the page.", hide: ['n3'], at: { html: [50, 50] }, lines: [['fig', 'ruler'], ['ruler', 'html']] },
        { say: "Потом CSS: вставляем выписанные цифры. ¦ Keyin CSS: yozib olingan raqamlarni qo'yamiz. ¦ Then CSS: plug in the numbers we noted.", at: { css: [70, 50], n1: [70, 18, 0.8], n2: [70, 84, 0.8] }, lines: [['fig', 'ruler'], ['ruler', 'html'], ['html', 'css']] },
        { say: "Сравниваем с макетом — совпало. Сайт готов! ¦ Maket bilan solishtiramiz — mos keldi. Sayt tayyor! ¦ Compare with the mockup — it matches. Done!", hide: ['n1', 'n2'], at: { site: [90, 50, 1.2] }, lines: [['fig', 'ruler'], ['ruler', 'html'], ['html', 'css'], ['css', 'site'], ['site', 'fig', "= ✓"]], pulse: ['site'] },
      ],
      takeaway: "Макет → цифры → HTML → CSS → сравнить. ¦ Maket → raqamlar → HTML → CSS → solishtirish. ¦ Mockup → numbers → HTML → CSS → compare.",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Собираем блок по макету ¦ Blokni maket bo'yicha yig'amiz ¦ Building a block from the mockup",
      chat: "что поменяем первым? ¦ birinchi nimani o'zgartiramiz? ¦ what shall we change first?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '<h1>Fresh bread…</h1>\n<p>Bakery…</p>\n<button>Order now</button>', lang: 'html', html: hero(''), say: "Только HTML: всё есть, но выглядит скучно. ¦ Faqat HTML: hammasi bor, lekin zerikarli ko'rinadi. ¦ Only HTML: it's all there, but it looks dull." },
        { code: 'font-family: Manrope;\nfont-size: 44px;\nfont-weight: 800;', html: hero('font'), say: "Шрифт и размер — ровно как в макете. ¦ Shrift va o'lcham — aynan maketdagidek. ¦ Font and size exactly as in the mockup." },
        { code: 'background: #FFF4E6;\ncolor: #8A6D4B;\n/* button */\nbackground: #F2573A;', html: hero('font col'), say: "Цвета копируем из Figma кодом — не на глаз. ¦ Ranglarni Figma'dan kod bilan ko'chiramiz — taxminan emas. ¦ Copy the colour codes from Figma, don't eyeball them." },
        { code: 'padding: 40px;\nmargin-bottom: 24px;\nborder-radius: 14px;', html: hero('font col pad'), say: "Отступы и скругления — и блок совпал с макетом! ¦ Bo'shliqlar va yumaloqlash — va blok maketga mos keldi! ¦ Spacing and rounding — and the block matches!" },
      ],
      takeaway: "Каждая цифра из макета превращается в строчку CSS. ¦ Maketdagi har bir raqam CSS qatoriga aylanadi. ¦ Every number in the mockup becomes a line of CSS.",
      notes: { min: 6 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "На глаз или по макету? ¦ Taxminan yoki maket bo'yicha? ¦ Eyeballing or following the mockup?",
      chat: "какой клиент будет доволен? ¦ qaysi mijoz mamnun bo'ladi? ¦ which client will be happy?",
      left: { icon: '👀', label: "На глаз ¦ Taxminan ¦ Eyeballing", points: ["«Примерно такой оранжевый» ¦ «Taxminan shunday to'q sariq» ¦ “Roughly that orange”", "Отступы разные везде ¦ Bo'shliqlar har joyda har xil ¦ Spacing differs everywhere", "Клиент просит переделать ¦ Mijoz qayta qilishni so'raydi ¦ The client asks for a redo"] },
      right: { icon: '📏', label: "По макету ¦ Maket bo'yicha ¦ Following it", points: ["Точный код цвета #F2573A ¦ Aniq rang kodi #F2573A ¦ Exact colour code #F2573A", "Отступы как у дизайнера ¦ Bo'shliqlar dizaynerdagidek ¦ Spacing as designed", "Клиент сразу доволен ¦ Mijoz darhol mamnun ¦ The client is happy at once"] },
      verdict: "Точность экономит время: меньше переделок. ¦ Aniqlik vaqtni tejaydi: kamroq qayta ishlash. ¦ Precision saves time: fewer redos.",
      notes: { min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Где взять? ¦ Qayerdan olish kerak? ¦ Where does it come from?",
      chat: "пишите: «1 — из макета» ¦ yozing: «1 — maketdan» ¦ write: “1 — from the mockup”",
      zones: [
        { id: 'fig', label: "Из макета ¦ Maketdan ¦ From the mockup", icon: '🎨' },
        { id: 'ask', label: "Спросить у дизайнера ¦ Dizaynerdan so'rash ¦ Ask the designer", icon: '💬' },
      ],
      items: [
        { text: "Цвет кнопки ¦ Tugma rangi ¦ Button colour", zone: 'fig' },
        { text: "Размер заголовка ¦ Sarlavha o'lchami ¦ Heading size", zone: 'fig' },
        { text: "Как выглядит на телефоне, если не нарисовано ¦ Chizilmagan bo'lsa, telefonda qanday ko'rinishi ¦ How it looks on a phone if it isn't drawn", zone: 'ask', why: "Не придумывайте сами — уточните. ¦ O'zingiz o'ylab topmang — aniqlang. ¦ Don't guess — ask." },
        { text: "Картинки и иконки (экспорт) ¦ Rasmlar va ikonkalar (eksport) ¦ Images and icons (export)", zone: 'fig' },
        { text: "Что делает кнопка после нажатия ¦ Tugma bosilgandan keyin nima qiladi ¦ What the button does when tapped", zone: 'ask' },
      ],
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "В Figma можно кликнуть на элемент и увидеть его размеры ¦ Figma'da elementni bosib, uning o'lchamlarini ko'rish mumkin ¦ In Figma you can click an element to see its sizes", truth: true, explain: "Справа появятся цвет, шрифт и размеры. ¦ O'ngda rang, shrift va o'lchamlar paydo bo'ladi. ¦ Colour, font and size appear on the right." },
        { text: "Макет можно просто вставить на сайт картинкой ¦ Maketni saytga shunchaki rasm qilib qo'yish mumkin ¦ You can just put the mockup on the site as an image", truth: false, explain: "Картинку не нажать и не прочитать Google — нужен код. ¦ Rasmni bosib bo'lmaydi va Google uni o'qiy olmaydi — kod kerak. ¦ An image can't be clicked or read by Google — you need code." },
        { text: "Если что-то непонятно в макете — нормально спросить ¦ Maketda biror narsa tushunarsiz bo'lsa — so'rash normal ¦ It's fine to ask if something in the mockup is unclear", truth: true, explain: "Вопрос — это 1 минута. Переделка — день. ¦ Savol — 1 daqiqa. Qayta ishlash — bir kun. ¦ A question takes a minute; a redo takes a day." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Повторите макет ¦ Maketni takrorlang ¦ Match the mockup",
      chat: "покажите, насколько получилось похоже! ¦ qanchalik o'xshash chiqqanini ko'rsating! ¦ show how close you got!",
      task: "✍️ Поставьте цифры из «макета»: фон #FFF4E6, кнопка #F2573A, отступ 40px ¦ ✍️ «Maket» raqamlarini qo'ying: fon #FFF4E6, tugma #F2573A, bo'shliq 40px ¦ ✍️ Use the mockup numbers: background #FFF4E6, button #F2573A, padding 40px",
      steps: [{ label: "Блок ¦ Blok ¦ Block", html: '<div class="hero">\n  <h1>Fresh bread every morning 🥐</h1>\n  <p>Bakery “Non Uyi” · Tashkent</p>\n  <button>Order now</button>\n</div>', css: '.hero {\n  font-family: Manrope, system-ui;\n  background: white;\n  padding: 10px;\n  border-radius: 24px;\n}\nh1 { font-size: 40px; }\nbutton {\n  padding: 16px 34px;\n  border: 0; border-radius: 14px;\n  background: gray; color: white;\n  font-size: 20px;\n}' }],
      takeaway: "Так работает верстальщик каждый день. ¦ Maketchi har kuni shunday ishlaydi. ¦ That's a coder's everyday work.",
      notes: { min: 5 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: заказ от пекарни ¦ Missiya: novvoyxonadan buyurtma ¦ Mission: a bakery order",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Пекарня довольна! ¦ Novvoyxona mamnun! ¦ The bakery is happy!",
      items: [
        { title: "С чего начать? ¦ Nimadan boshlash kerak? ¦ Where to start?", choices: ["Выписать цвета, шрифты, размеры ¦ Ranglar, shriftlar, o'lchamlarni yozib olish ¦ Note colours, fonts and sizes", "Сразу писать CSS на глаз ¦ Darhol taxminan CSS yozish ¦ Start writing CSS by eye"], correct: 0, explain: "Сначала цифры, потом код. ¦ Avval raqamlar, keyin kod. ¦ Numbers first, then code." },
        { title: "Нет мобильной версии ¦ Mobil versiya yo'q ¦ No mobile version", choices: ["Спросить дизайнера ¦ Dizaynerdan so'rash ¦ Ask the designer", "Не делать её ¦ Uni qilmaslik ¦ Skip it"], correct: 0, explain: "Уточнить — быстрее, чем переделывать. ¦ Aniqlash — qayta qilishdan tezroq. ¦ Asking is faster than redoing." },
        { title: "Как проверить работу? ¦ Ishni qanday tekshirish kerak? ¦ How to check the work?", choices: ["Сравнить с макетом рядом ¦ Maket bilan yonma-yon solishtirish ¦ Compare side by side with the mockup", "Отправить не глядя ¦ Qaramasdan yuborish ¦ Send it without looking"], correct: 0, explain: "Сравниваем экран и макет. ¦ Ekran va maketni solishtiramiz. ¦ Compare the screen and the mockup." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: от Figma к сайту ¦ Xulosa: Figma'dan saytgacha ¦ Summary: from Figma to a site",
      chat: "какой сайт вы бы нарисовали в Figma? ¦ Figma'da qanday sayt chizgan bo'lardingiz? ¦ what site would you draw in Figma?",
      answer: "Макет из Figma — это картинка, а сайт — код. Работаем так: открываем макет, кликаем на элементы и выписываем точные цвета, шрифты и размеры, потом собираем блоки в HTML и вставляем цифры в CSS, а в конце сравниваем с макетом. Если чего-то нет в макете — спрашиваем дизайнера, а не придумываем. ¦ Figma maketi — bu rasm, sayt esa — kod. Shunday ishlaymiz: maketni ochamiz, elementlarni bosamiz va aniq ranglar, shriftlar va o'lchamlarni yozib olamiz, keyin HTML'da bloklarni yig'amiz va raqamlarni CSS'ga qo'yamiz, oxirida esa maket bilan solishtiramiz. Maketda biror narsa bo'lmasa — o'ylab topmaymiz, dizaynerdan so'raymiz. ¦ A Figma mockup is a picture; a site is code. The workflow: open the mockup, click elements and note exact colours, fonts and sizes, build the blocks in HTML, plug the numbers into CSS, and finally compare with the mockup. If something is missing, ask the designer instead of guessing.",
      icon: '🎨',
      badge: "Переводчик дизайна ¦ Dizayn tarjimoni ¦ Design translator",
      badgeSub: "CSS · общая 4 ¦ CSS · umumiy 4 ¦ CSS · general 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Откройте любой бесплатный макет в Figma и выпишите 3 цвета и 2 размера шрифта. ¦ Figma'da istalgan bepul maketni oching va 3 ta rang hamda 2 ta shrift o'lchamini yozib oling. ¦ Open any free Figma mockup and note 3 colours and 2 font sizes.",
        "Сверстайте один блок из него. ¦ Undan bitta blokni yasang. ¦ Build one block from it.",
      ],
      takeaway: "Дальше: что делать, если клиент просит просто «красивый сайт». ¦ Keyingisi: mijoz shunchaki «chiroyli sayt» so'rasa nima qilish kerak. ¦ Next: what to do when a client just wants “a beautiful site”.",
      notes: { min: 2 },
    },
  ],
});
