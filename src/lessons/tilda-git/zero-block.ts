import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#0f1430}
.art{position:relative;height:340px;overflow:hidden;background:linear-gradient(160deg,#141b45,#2b1f5c)}
.title{position:absolute;color:#fff;font-weight:800;margin:0}
.text{position:absolute;color:#b9c2ff;margin:0}
.btn{position:absolute;background:#ff6f91;color:#fff;border:0;border-radius:24px;font-weight:700}
.ball{position:absolute;border-radius:50%;background:radial-gradient(circle at 30% 30%,#ffd76a,#ff8a3d)}`;
const DESK = `<style>.title{left:60px;top:90px;font-size:44px}.text{left:60px;top:160px;font-size:18px;width:340px}.btn{left:60px;top:240px;padding:14px 28px;font-size:16px}.ball{left:520px;top:60px;width:220px;height:220px}</style>`;
const MOB = `<style>.title{left:20px;top:150px;font-size:30px}.text{left:20px;top:196px;font-size:15px;width:260px}.btn{left:20px;top:270px;padding:12px 22px;font-size:15px}.ball{left:90px;top:20px;width:120px;height:120px}</style>`;
const BODY = `<div class="art"><div class="ball"></div><h1 class="title">Orbit Studio</h1><p class="text">Designing sites that feel like space travel</p><button class="btn">Launch 🚀</button></div>`;

export default kit({
  id: 'tilda-git-t02',
  title: "Основы Zero Block и адаптивный дизайн ¦ Zero Block asoslari va moslashuvchan dizayn ¦ Zero Block basics and responsive design",
  question: "Как сделать на Tilda свой уникальный блок, который красиво выглядит и на телефоне? ¦ Tilda'da telefonda ham chiroyli ko'rinadigan o'z noyob blokingizni qanday yaratish mumkin? ¦ How do you make your own unique Tilda block that also looks great on a phone?",
  route: ["Что такое Zero Block ¦ Zero Block nima ¦ What Zero Block is", "Элементы ¦ Elementlar ¦ Elements", "Координаты ¦ Koordinatalar ¦ Coordinates", "Адаптив ¦ Moslashuv ¦ Responsive", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎨',
      kicker: "Tilda · Git · техническая тема 2 ¦ Tilda · Git · texnik mavzu 2 ¦ Tilda · Git · technical topic 2",
      title: "Чистый холст внутри Tilda ¦ Tilda ichidagi toza tuval ¦ A blank canvas inside Tilda",
      chat: "что нарисуем на пустом холсте? предлагайте! ¦ bo'sh tuvalga nima chizamiz? taklif qiling! ¦ what shall we draw on the blank canvas? suggest!",
      lead: "Готовые блоки похожи у тысяч сайтов. Zero Block — пустой холст, на котором вы сами размещаете текст, картинки, кнопки и фигуры. ¦ Tayyor bloklar minglab saytlarda bir xil. Zero Block — bo'sh tuval, unda matn, rasm, tugma va shakllarni o'zingiz joylashtirasiz. ¦ Ready blocks look alike on thousands of sites. Zero Block is a blank canvas where you place text, images, buttons and shapes yourself.",
      facts: [
        "Шаблон — быстро, но как у всех ¦ Shablon — tez, lekin hammaniki kabi ¦ Template: fast, but like everyone else's",
        "Zero Block — уникальный дизайн ¦ Zero Block — noyob dizayn ¦ Zero Block: a unique design",
        "И отдельная раскладка для телефона ¦ Va telefon uchun alohida joylashuv ¦ Plus a separate phone layout",
      ],
      takeaway: "Сегодня соберём свою обложку и настроим её для телефона. ¦ Bugun o'z muqovamizni yig'amiz va uni telefon uchun sozlaymiz. ¦ Today we'll build our own cover and tune it for phones.",
      notes: { say: ["Покажите в настоящей Tilda: «Все блоки» → Zero Block → «Редактировать блок».", "Названия кнопок могут немного отличаться в новых версиях Tilda."], switch: "Tilda ¦ Tilda ¦ Tilda", min: 3 },
    },
    {
      type: 'cards',
      stage: 1,
      title: "Из чего собирают Zero Block ¦ Zero Block nimadan yig'iladi ¦ What Zero Block is built from",
      chat: "какой элемент добавим первым? ¦ birinchi qaysi elementni qo'shamiz? ¦ which element do we add first?",
      cards: [
        { icon: '🔤', front: "Текст ¦ Matn ¦ Text", back: "Заголовки и абзацы. Шрифт, размер, цвет — в панели справа. ¦ Sarlavha va xatboshilar. Shrift, o'lcham, rang — o'ngdagi panelda. ¦ Headings and paragraphs. Font, size, colour in the right panel." },
        { icon: '🖼️', front: "Изображение ¦ Rasm ¦ Image", back: "Фото и иллюстрации. Можно скруглить углы и добавить тень. ¦ Foto va illyustratsiyalar. Burchaklarni yumaloqlash va soya qo'shish mumkin. ¦ Photos and illustrations, with rounded corners and shadows." },
        { icon: '⬛', front: "Фигура ¦ Shakl ¦ Shape", back: "Прямоугольники и круги — фон, плашки, декор. ¦ To'rtburchak va doiralar — fon, plashkalar, bezak. ¦ Rectangles and circles for backgrounds, badges, decor." },
        { icon: '🔘', front: "Кнопка ¦ Tugma ¦ Button", back: "Ссылка на раздел, форму или другую страницу. ¦ Bo'lim, forma yoki boshqa sahifaga havola. ¦ A link to a section, form or another page." },
        { icon: '📐', front: "Артборд ¦ Artbord ¦ Artboard", back: "Сам холст: его высота и фон. Элементы живут внутри. ¦ Tuvalning o'zi: balandligi va foni. Elementlar ichida yashaydi. ¦ The canvas itself: its height and background. Elements live inside." },
        { icon: '🧲', front: "Сетка ¦ To'r ¦ Grid", back: "Grid container — элементы выравниваются по ширине контента, а не по краю экрана. ¦ Grid container — elementlar ekran chetiga emas, kontent kengligiga tekislanadi. ¦ Grid container aligns elements to the content width, not the screen edge." },
      ],
      takeaway: "Всего несколько типов элементов — а комбинаций бесконечно много. ¦ Elementlar turi bir nechta — kombinatsiyalar esa cheksiz. ¦ Only a few element types, but endless combinations.",
      notes: { say: ["Открывайте карточки и сразу добавляйте такой же элемент в Tilda."], switch: "Tilda ¦ Tilda ¦ Tilda", min: 5 },
    },
    {
      type: 'live',
      stage: 2,
      title: "Координаты: как элемент знает, где стоять ¦ Koordinatalar: element qayerda turishini qanday biladi ¦ Coordinates: how an element knows where to stand",
      chat: "куда сдвинуть кнопку? пишите числа left и top ¦ tugmani qayerga siljitamiz? left va top raqamlarini yozing ¦ where should the button move? write left and top numbers",
      task: "✍️ Меняйте left и top — так работает перетаскивание в Zero Block ¦ ✍️ left va top'ni o'zgartiring — Zero Block'da sudrash shunday ishlaydi ¦ ✍️ Change left and top — that's how dragging works in Zero Block",
      steps: [
        { label: "Один элемент ¦ Bitta element ¦ One element", html: `<div class="art"><button class="btn">Launch 🚀</button></div>`, css: `${CSS}\n.btn {\n  left: 60px;\n  top: 140px;\n  padding: 14px 28px;\n}` },
        { label: "Вся обложка ¦ Butun muqova ¦ Whole cover", html: BODY, css: `${CSS}\n.title { left: 60px; top: 90px; font-size: 44px; }\n.text { left: 60px; top: 160px; width: 340px; }\n.btn { left: 60px; top: 240px; padding: 14px 28px; }\n.ball { left: 520px; top: 60px; width: 220px; height: 220px; }` },
      ],
      takeaway: "В Zero Block у каждого элемента есть X и Y — отступ от левого и верхнего края. Это position: absolute из CSS. ¦ Zero Block'da har bir elementning X va Y'i bor — chap va yuqori chetdan masofa. Bu CSS'dagi position: absolute. ¦ Every Zero Block element has X and Y — distance from the left and top. That's CSS position: absolute.",
      notes: { say: ["Покажите поля X и Y в панели Tilda и сравните с left/top здесь."], min: 6 },
    },
    {
      type: 'poll',
      stage: 3,
      title: "Что случится на телефоне? ¦ Telefonda nima bo'ladi? ¦ What happens on a phone?",
      chat: "голосуйте 1–3 ¦ 1–3 bilan ovoz bering ¦ vote 1–3",
      question: "Кружок стоит на left: 520px. Экран телефона — 320–480px. Что будет? ¦ Doira left: 520px'da turibdi. Telefon ekrani — 320–480px. Nima bo'ladi? ¦ The circle sits at left: 520px. A phone screen is 320–480px wide. What happens?",
      options: [
        { label: "Tilda сама всё уменьшит ¦ Tilda o'zi hammasini kichraytiradi ¦ Tilda shrinks everything itself" },
        { label: "Кружок уедет за край экрана ¦ Doira ekran chetidan chiqib ketadi ¦ The circle slides off the screen", detail: "Верно ✔ ¦ To'g'ri ✔ ¦ Correct ✔" },
        { label: "Страница не откроется ¦ Sahifa ochilmaydi ¦ The page won't open" },
      ],
      correct: 1,
      result: "Координаты абсолютные — 520px не помещается в 320px. Поэтому для каждого размера экрана раскладку настраивают отдельно. ¦ Koordinatalar mutlaq — 520px 320px'ga sig'maydi. Shuning uchun har bir ekran o'lchami uchun joylashuv alohida sozlanadi. ¦ Coordinates are absolute — 520px won't fit in 320px. So each screen size gets its own layout.",
      takeaway: "Свобода Zero Block = ответственность за каждый размер экрана. ¦ Zero Block erkinligi = har bir ekran o'lchami uchun mas'uliyat. ¦ Zero Block's freedom = responsibility for every screen size.",
      notes: { say: ["После голосования переключите в Tilda на мобильный размер и покажите, что элемент вылез."], min: 3 },
    },
    {
      type: 'numbers',
      stage: 3,
      title: "Брейкпоинты Zero Block ¦ Zero Block brekpointlari ¦ Zero Block breakpoints",
      chat: "какой экран у вас прямо сейчас? ¦ hozir sizda qanday ekran? ¦ what screen are you on right now?",
      facts: [
        { icon: '🖥️', value: '1200', label: "Компьютер — основной размер ¦ Kompyuter — asosiy o'lcham ¦ Desktop — the main size" },
        { icon: '💻', value: '960', label: "Планшет горизонтально ¦ Planshet gorizontal ¦ Tablet, landscape" },
        { icon: '📲', value: '640', label: "Планшет вертикально ¦ Planshet vertikal ¦ Tablet, portrait" },
        { icon: '📱', value: '480', label: "Телефон горизонтально ¦ Telefon gorizontal ¦ Phone, landscape" },
        { icon: '📱', value: '320', label: "Телефон вертикально ¦ Telefon vertikal ¦ Phone, portrait" },
      ],
      takeaway: "Сначала делаем 1200, потом переключаемся на каждый размер и двигаем элементы. Это те же media queries, только мышкой. ¦ Avval 1200'ni qilamiz, keyin har bir o'lchamga o'tib elementlarni siljitamiz. Bu o'sha media queries, faqat sichqoncha bilan. ¦ Build 1200 first, then switch to each size and move elements. Same as media queries, just with the mouse.",
      notes: { say: ["Это стандартный набор размеров Zero Block — покажите переключатель сверху редактора. Если в вашей версии набор другой, скажите об этом."], min: 3 },
    },
    {
      type: 'browser',
      stage: 3,
      title: "Одна обложка — две раскладки ¦ Bitta muqova — ikki joylashuv ¦ One cover, two layouts",
      chat: "какая версия вам нравится больше? ¦ qaysi versiya sizga ko'proq yoqadi? ¦ which version do you like more?",
      tabs: [
        { label: "1200 · компьютер ¦ 1200 · kompyuter ¦ 1200 · desktop", url: 'orbit-studio.example', css: CSS, html: DESK + BODY, note: "Текст слева, кружок справа — места хватает. ¦ Matn chapda, doira o'ngda — joy yetarli. ¦ Text on the left, circle on the right — plenty of room." },
        { label: "320 · без настройки ¦ 320 · sozlamasiz ¦ 320 · not tuned", url: 'orbit-studio.example', css: CSS, html: DESK + BODY, width: 320, note: "Та же раскладка на телефоне: кружок уехал, текст не влезает. ¦ Telefonda o'sha joylashuv: doira chiqib ketdi, matn sig'maydi. ¦ Same layout on a phone: the circle is gone, the text doesn't fit." },
        { label: "320 · настроено ¦ 320 · sozlangan ¦ 320 · tuned", url: 'orbit-studio.example', css: CSS, html: MOB + BODY, width: 320, note: "Кружок сверху и меньше, шрифт мельче, всё в одну колонку. ¦ Doira yuqorida va kichikroq, shrift maydaroq, hammasi bitta ustunda. ¦ Smaller circle on top, smaller font, everything in one column." },
      ],
      takeaway: "На телефоне элементы обычно встают в одну колонку: картинка → заголовок → текст → кнопка. ¦ Telefonda elementlar odatda bitta ustunga tiziladi: rasm → sarlavha → matn → tugma. ¦ On phones elements usually stack in one column: image → heading → text → button.",
      notes: { say: ["Повторите то же в Tilda на брейкпоинте 320."], switch: "Tilda ¦ Tilda ¦ Tilda", min: 6 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Где это настраивают? ¦ Buni qayerda sozlashadi? ¦ Where is this set?",
      chat: "пишите: «размер шрифта на телефоне — брейкпоинт 320» ¦ yozing: «telefondagi shrift o'lchami — 320 brekpoint» ¦ write: “phone font size — breakpoint 320”",
      zones: [
        { id: 'all', label: "Один раз для всех экранов ¦ Barcha ekranlar uchun bir marta ¦ Once for all screens", icon: '🌐' },
        { id: 'bp', label: "Отдельно на брейкпоинте ¦ Brekpointda alohida ¦ Per breakpoint", icon: '📱' },
      ],
      items: [
        { text: "Текст заголовка ¦ Sarlavha matni ¦ The heading text", zone: 'all', why: "Текст один — меняется только вид. ¦ Matn bitta — faqat ko'rinish o'zgaradi. ¦ The text is the same; only looks change." },
        { text: "Размер шрифта на телефоне ¦ Telefondagi shrift o'lchami ¦ Font size on phone", zone: 'bp' },
        { text: "Позиция кружка X и Y ¦ Doira pozitsiyasi X va Y ¦ The circle's X and Y", zone: 'bp' },
        { text: "Ссылка у кнопки ¦ Tugma havolasi ¦ The button's link", zone: 'all' },
        { text: "Высота артборда ¦ Artbord balandligi ¦ Artboard height", zone: 'bp' },
      ],
      takeaway: "Содержимое общее, а размеры и позиции — свои для каждого экрана. ¦ Kontent umumiy, o'lcham va pozitsiyalar esa har bir ekranga o'ziniki. ¦ Content is shared; sizes and positions are per screen.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Раскладку для телефона можно не проверять ¦ Telefon joylashuvini tekshirmasa ham bo'ladi ¦ No need to check the phone layout", truth: false, explain: "Большинство посетителей приходят с телефона. ¦ Tashrif buyuruvchilarning ko'pi telefondan keladi. ¦ Most visitors come from phones." },
        { text: "Элемент можно скрыть только на телефоне ¦ Elementni faqat telefonda yashirish mumkin ¦ You can hide an element on phones only", truth: true, explain: "Лишний декор на маленьком экране лучше убрать. ¦ Kichik ekranda ortiqcha bezakni olib tashlagan ma'qul. ¦ Extra decor is better hidden on small screens." },
        { text: "Zero Block заменяет знание дизайна ¦ Zero Block dizayn bilimining o'rnini bosadi ¦ Zero Block replaces design skills", truth: false, explain: "Холст свободный — отступы, контраст и иерархию решаете вы. ¦ Tuval erkin — bo'shliqlar, kontrast va ierarxiyani siz hal qilasiz. ¦ The canvas is free — spacing, contrast and hierarchy are your call." },
      ],
      takeaway: "Хороший Zero Block — это дизайн, который вы проверили на всех экранах. ¦ Yaxshi Zero Block — barcha ekranlarda tekshirilgan dizayn. ¦ A good Zero Block is a design checked on every screen.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: обложка без багов ¦ Missiya: xatosiz muqova ¦ Mission: a bug-free cover",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Обложка выглядит отлично на всех экранах! ¦ Muqova barcha ekranlarda a'lo ko'rinadi! ¦ The cover looks great on every screen!",
      items: [
        { title: "С какого размера начинать? ¦ Qaysi o'lchamdan boshlash kerak? ¦ Which size do you start with?", choices: ['320', '1200'], correct: 1, explain: "В Zero Block основная версия — 1200, остальные подстраиваем. ¦ Zero Block'da asosiy versiya — 1200, qolganlarini moslaymiz. ¦ In Zero Block 1200 is the main version; the rest are adjusted." },
        { title: "Кнопка вылезла на 320 ¦ Tugma 320'da chiqib ketdi ¦ The button spills out at 320", choices: ["Сдвинуть её на брейкпоинте 320 ¦ Uni 320 brekpointda siljitish ¦ Move it at breakpoint 320", "Удалить кнопку везде ¦ Tugmani hamma joyda o'chirish ¦ Delete it everywhere"], correct: 0, explain: "Правим только там, где сломано. ¦ Faqat buzilgan joyda tuzatamiz. ¦ Fix it only where it broke." },
        { title: "Чтобы выровнять по контенту ¦ Kontent bo'yicha tekislash uchun ¦ To align with the content", choices: ["Grid container ¦ Grid container ¦ Grid container", "Window container ¦ Window container ¦ Window container"], correct: 0, explain: "Grid — по сетке контента, Window — по краю окна браузера. ¦ Grid — kontent to'ri bo'yicha, Window — brauzer oynasi cheti bo'yicha. ¦ Grid follows the content grid; Window follows the browser edge." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Zero Block ¦ Xulosa: Zero Block ¦ Summary: Zero Block",
      chat: "пришлите ссылку на свою обложку из Zero Block! ¦ Zero Block'dagi muqovangiz havolasini yuboring! ¦ share your Zero Block cover!",
      answer: "Zero Block — пустой холст в Tilda: текст, картинки, фигуры и кнопки ставятся по координатам X и Y, как position: absolute. Поэтому дизайн делают на 1200, а затем переключаются на брейкпоинты 960, 640, 480 и 320 и для каждого двигают, уменьшают или скрывают элементы. ¦ Zero Block — Tilda'dagi bo'sh tuval: matn, rasm, shakl va tugmalar position: absolute kabi X va Y koordinatalari bo'yicha qo'yiladi. Shuning uchun dizayn 1200'da qilinadi, so'ngra 960, 640, 480 va 320 brekpointlarga o'tib, har birida elementlar siljitiladi, kichraytiriladi yoki yashiriladi. ¦ Zero Block is Tilda's blank canvas: text, images, shapes and buttons sit at X and Y coordinates, like position: absolute. So you design at 1200, then switch to 960, 640, 480 and 320 and move, shrink or hide elements for each.",
      icon: '🎨',
      badge: "Дизайнер Zero Block ¦ Zero Block dizayneri ¦ Zero Block designer",
      badgeSub: "Tilda · Git · техническая 2 ¦ Tilda · Git · texnik 2 ¦ Tilda · Git · technical 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте в Zero Block обложку для выдуманной студии: заголовок, текст, кнопка, декор. ¦ Zero Block'da o'ylab topilgan studiya uchun muqova yarating: sarlavha, matn, tugma, bezak. ¦ Make a Zero Block cover for a made-up studio: heading, text, button, decor.",
        "Настройте её на 320 и пришлите скриншоты компьютерной и мобильной версии. ¦ Uni 320'da sozlang va kompyuter hamda mobil versiya skrinshotlarini yuboring. ¦ Tune it for 320 and send desktop and mobile screenshots.",
      ],
      takeaway: "Следующая тема — алгоритмы: как сделать длинную программу короче. ¦ Keyingi mavzu — algoritmlar: uzun dasturni qanday qisqartirish mumkin. ¦ Next: algorithms — making a long program shorter.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
