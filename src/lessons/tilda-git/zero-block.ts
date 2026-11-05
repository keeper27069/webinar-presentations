import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.art{position:relative;width:520px;height:320px;border-radius:16px;background:#fff4e6;box-shadow:0 10px 30px #0001;overflow:hidden;outline:3px dashed #0fb5a6;outline-offset:-3px}
.el{position:absolute}
.ttl{left:30px;top:40px;font-size:34px;font-weight:800;line-height:1.1;width:260px}
.btn{left:30px;top:200px;padding:12px 24px;border-radius:12px;background:#0fb5a6;color:#fff;font-weight:800}
.dot{left:340px;top:60px;width:150px;height:150px;border-radius:50%;background:#f2573a;display:grid;place-items:center;font-size:70px}
.lbl{position:absolute;left:8px;bottom:8px;padding:3px 10px;border-radius:8px;background:#16181f;color:#fff;font:700 14px JetBrains Mono,monospace}
.m1 .dot{left:200px;top:140px}.m2 .dot{left:340px;top:150px;width:110px;height:110px;font-size:50px}
.phone{width:280px;height:420px}
.phone .ttl{width:220px;font-size:28px}
.phone .dot{left:300px}
.fix .dot{left:70px;top:200px;width:130px;height:130px;font-size:60px}.fix .btn{top:350px}.fix .ttl{top:30px}`;
const art = (cls: string, lbl: string) => `<div class="wrap"><div class="art ${cls}"><div class="el ttl">Fresh bread every morning</div><div class="el btn">Order</div><div class="el dot">🥐</div><span class="lbl">${lbl}</span></div></div>`;

export default kit({
  id: 'tilda-git-t02',
  title: "Основы Zero Block и адаптивный дизайн ¦ Zero Block asoslari va adaptiv dizayn ¦ Zero Block basics and responsive design",
  question: "Как сделать на Tilda свой уникальный блок, который красиво выглядит и на телефоне? ¦ Tilda'da telefonda ham chiroyli ko'rinadigan o'z noyob blokingizni qanday yasash mumkin? ¦ How do you make a unique Tilda block that also looks good on phones?",
  route: ["Холст ¦ Kanvas ¦ The canvas", "Координаты ¦ Koordinatalar ¦ Coordinates", "Телефон ¦ Telefon ¦ Phone", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎨',
      kicker: "Tilda · Git · техническая тема 2 ¦ Tilda · Git · texnik mavzu 2 ¦ Tilda · Git · technical topic 2",
      title: "Чистый холст внутри Tilda ¦ Tilda ichidagi toza kanvas ¦ A blank canvas inside Tilda",
      chat: "что нарисуем на пустом холсте? ¦ bo'sh kanvasga nima chizamiz? ¦ what shall we put on the blank canvas?",
      lead: "Готовые блоки похожи у тысяч сайтов. Zero Block — пустой холст: вы сами ставите текст, картинки, кнопки и фигуры куда хотите. ¦ Tayyor bloklar minglab saytlarda o'xshash. Zero Block — bo'sh kanvas: matn, rasm, tugma va shakllarni o'zingiz xohlagan joyga qo'yasiz. ¦ Ready blocks look alike on thousands of sites. Zero Block is a blank canvas: you place text, images, buttons and shapes wherever you like.",
      facts: ["Шаблон — быстро, но как у всех ¦ Shablon — tez, lekin hammadagidek ¦ Templates are quick but common", "Zero Block — уникальный дизайн ¦ Zero Block — noyob dizayn ¦ Zero Block is unique", "Отдельная раскладка для телефона ¦ Telefon uchun alohida joylashuv ¦ A separate phone layout"],
      takeaway: "Посмотрим, как элемент «знает», где стоять. ¦ Element qayerda turishini qanday «bilishini» ko'ramiz. ¦ Let's see how an element knows where to stand.",
      notes: { say: ["Покажите в Tilda: «Все блоки» → Zero Block → «Редактировать блок». Названия кнопок могут отличаться."], min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Из чего собирают Zero Block ¦ Zero Block nimadan yig'iladi ¦ What a Zero Block is made of",
      chat: "какой элемент добавим первым? ¦ qaysi elementni birinchi qo'shamiz? ¦ which element first?",
      actors: [
        { id: 'board', icon: '🟧', label: "Артборд — холст ¦ Artbord — kanvas ¦ Artboard — the canvas" },
        { id: 't', icon: '🔤', label: "Текст ¦ Matn ¦ Text" },
        { id: 'i', icon: '🖼️', label: "Изображение ¦ Rasm ¦ Image" },
        { id: 'f', icon: '⚪', label: "Фигура ¦ Shakl ¦ Shape" },
        { id: 'b', icon: '🔘', label: "Кнопка ¦ Tugma ¦ Button" },
      ],
      steps: [
        { say: "Артборд — сам холст: его высота и фон. ¦ Artbord — kanvasning o'zi: uning balandligi va foni. ¦ The artboard is the canvas itself: height and background.", at: { board: [60, 50, 2.2] } },
        { say: "Добавляем текст и картинку… ¦ Matn va rasm qo'shamiz… ¦ Add text and an image…", at: { t: [10, 25], i: [10, 75] } },
        { say: "…и тянем их на холст — куда захотим! ¦ …va ularni kanvasga sudraymiz — xohlagan joyga! ¦ …and drag them onto the canvas — anywhere!", at: { t: [48, 34], i: [72, 62] } },
        { say: "Фигура и кнопка — и обложка готова. ¦ Shakl va tugma — va muqova tayyor. ¦ A shape and a button and the cover is done.", at: { f: [74, 30], b: [46, 70] }, pulse: ['t', 'i', 'f', 'b'] },
      ],
      takeaway: "Всего 4–5 типов элементов — а вариантов бесконечно много. ¦ Atigi 4–5 turdagi element — variantlar esa cheksiz. ¦ Only 4–5 element types, endless combinations.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "X и Y: адрес элемента ¦ X va Y: element manzili ¦ X and Y: an element's address",
      chat: "куда сдвинуть круассан? пишите числа ¦ kruassanni qayerga suramiz? raqamlarni yozing ¦ where shall we move the croissant? write numbers",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.croissant {\n  position: absolute;\n  left: 340px; /* X */\n  top: 60px;   /* Y */\n}', line: 3, html: art('', 'X 340 · Y 60'), say: "У каждого элемента есть X (от левого края) и Y (от верхнего). ¦ Har bir elementda X (chap chetdan) va Y (yuqori chetdan) bor. ¦ Each element has an X (from the left) and a Y (from the top)." },
        { code: '.croissant {\n  left: 200px;\n  top: 140px;\n}', line: 2, html: art('m1', 'X 200 · Y 140'), say: "Меняем X и Y — элемент переехал. Это и есть перетаскивание! ¦ X va Y ni o'zgartiramiz — element ko'chdi. Sudrash aynan shu! ¦ Change X and Y and it moves. That's what dragging does!" },
        { code: '.croissant {\n  left: 340px;\n  top: 150px;\n  width: 110px;\n}', line: 4, html: art('m2', 'X 340 · Y 150 · W 110'), say: "А ещё размер — ширина и высота. ¦ Va yana o'lcham — kenglik va balandlik. ¦ Plus size: width and height." },
      ],
      takeaway: "Zero Block — это position: absolute из CSS с удобными ручками. ¦ Zero Block — bu qulay tutqichli CSS'dagi position: absolute. ¦ Zero Block is CSS position: absolute with handy handles.",
      notes: { say: ["Покажите поля X и Y в панели Tilda и сравните."], min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "А на телефоне? ¦ Telefonda-chi? ¦ And on a phone?",
      chat: "что случится с круассаном на узком экране? ¦ tor ekranda kruassan bilan nima bo'ladi? ¦ what happens to the croissant on a narrow screen?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '/* desktop: 1200px */\n.croissant { left: 340px; }', line: 2, html: art('', 'Desktop'), say: "На компьютере всё красиво. ¦ Kompyuterda hammasi chiroyli. ¦ On a computer it looks great." },
        { code: '/* phone: 320px */\n.croissant { left: 340px; } 😱', line: 2, html: art('phone', 'Phone 320px'), say: "Экран телефона уже 340 пикселей — круассан уехал за край! ¦ Telefon ekrani 340 pikseldan tor — kruassan chetdan chiqib ketdi! ¦ The phone is narrower than 340px — the croissant falls off the edge!" },
        { code: '/* phone layout */\n.croissant {\n  left: 70px;\n  top: 200px;\n}', line: 3, html: art('phone fix', 'Phone ✓'), say: "Решение: в Zero Block для телефона делают свою раскладку — переставляем элементы. ¦ Yechim: Zero Block'da telefon uchun alohida joylashuv qilinadi — elementlarni qayta joylaymiz. ¦ The fix: Zero Block has a separate phone layout — rearrange the elements." },
      ],
      takeaway: "Для каждого размера экрана — своя расстановка. Это и есть адаптив. ¦ Har bir ekran o'lchami uchun — o'z joylashuvi. Bu adaptiv. ¦ A layout per screen size — that's responsive design.",
      notes: { say: ["Покажите переключатель ширин в Zero Block (компьютер, планшет, телефон)."], min: 5 },
    },
    {
      type: 'poll',
      stage: 2,
      title: "Проверим ¦ Tekshiramiz ¦ Quick check",
      chat: "голосуйте 1–3 ¦ 1–3 ovoz bering ¦ vote 1–3",
      question: "Кнопка стоит на X 900. Экран телефона 360px. Что будет? ¦ Tugma X 900 da turibdi. Telefon ekrani 360px. Nima bo'ladi? ¦ A button sits at X 900. The phone is 360px wide. What happens?",
      options: [
        { label: "Tilda сама всё уменьшит ¦ Tilda hammasini o'zi kichraytiradi ¦ Tilda shrinks everything itself" },
        { label: "Кнопку не будет видно, пока не настроим телефон ¦ Telefonni sozlamagunimizcha tugma ko'rinmaydi ¦ The button is hidden until we set up the phone layout" },
        { label: "Кнопка станет больше ¦ Tugma kattaroq bo'ladi ¦ The button gets bigger" },
      ],
      correct: 1,
      result: "Координаты не меняются сами — раскладку для телефона настраиваем вручную. ¦ Koordinatalar o'z-o'zidan o'zgarmaydi — telefon joylashuvini qo'lda sozlaymiz. ¦ Coordinates don't change themselves — set the phone layout by hand.",
      notes: { min: 2 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Свой Zero Block в коде ¦ Koddagi o'z Zero Block'ingiz ¦ Your own Zero Block in code",
      chat: "покажите, куда поставили элементы! ¦ elementlarni qayerga qo'yganingizni ko'rsating! ¦ show where you placed the elements!",
      task: "✍️ Меняйте left и top у круассана и кнопки ¦ ✍️ Kruassan va tugmaning left va top qiymatlarini o'zgartiring ¦ ✍️ Change left and top for the croissant and button",
      steps: [{ label: "Холст ¦ Kanvas ¦ Canvas", html: '<div class="art">\n  <h2 class="ttl">Fresh bread every morning</h2>\n  <a class="btn">Order</a>\n  <div class="dot">🥐</div>\n</div>', css: 'body { font-family: Manrope, system-ui; margin: 0; }\n.art { position: relative; height: 300px; background: #fff4e6; }\n.ttl { position: absolute; left: 20px; top: 20px; width: 200px; }\n.btn {\n  position: absolute; left: 20px; top: 200px;\n  padding: 10px 20px; border-radius: 10px;\n  background: #0fb5a6; color: white;\n}\n.dot {\n  position: absolute; left: 240px; top: 60px;\n  font-size: 90px;\n}' }],
      takeaway: "Перетаскивание в Tilda = те же left и top. ¦ Tilda'da sudrash = o'sha left va top. ¦ Dragging in Tilda = the same left and top.",
      notes: { min: 5 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: обложка пекарни ¦ Missiya: novvoyxona muqovasi ¦ Mission: the bakery cover",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Обложка красива везде! ¦ Muqova hamma joyda chiroyli! ¦ The cover looks good everywhere!",
      items: [
        { title: "Что значит Y? ¦ Y nimani anglatadi? ¦ What does Y mean?", choices: ["Отступ сверху ¦ Yuqoridan bo'shliq ¦ Distance from the top", "Цвет ¦ Rang ¦ Colour"], correct: 0, explain: "Y = top. ¦ Y = top. ¦ Y = top." },
        { title: "Элемент уехал на телефоне ¦ Element telefonda chiqib ketdi ¦ An element slides off on a phone", choices: ["Настроить раскладку для телефона ¦ Telefon joylashuvini sozlash ¦ Set the phone layout", "Удалить его ¦ Uni o'chirish ¦ Delete it"], correct: 0, explain: "У каждого экрана своя расстановка. ¦ Har bir ekranning o'z joylashuvi bor. ¦ Each screen has its own layout." },
        { title: "Когда нужен Zero Block? ¦ Zero Block qachon kerak? ¦ When is Zero Block needed?", choices: ["Нужен уникальный дизайн ¦ Noyob dizayn kerak ¦ You need a unique design", "Хватит обычного меню ¦ Oddiy menyu yetadi ¦ A normal menu will do"], correct: 0, explain: "Для простого — готовые блоки. ¦ Oddiy narsa uchun — tayyor bloklar. ¦ Simple things use ready blocks." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Zero Block ¦ Xulosa: Zero Block ¦ Summary: Zero Block",
      chat: "что сделаете в Zero Block первым? ¦ Zero Block'da birinchi nima qilasiz? ¦ what will you build first in Zero Block?",
      answer: "Zero Block — пустой холст в Tilda, где вы сами расставляете текст, картинки, фигуры и кнопки. У каждого элемента есть координаты X и Y — это left и top из CSS (position: absolute). На узком экране элементы могут уехать за край, поэтому для телефона делают отдельную раскладку. ¦ Zero Block — Tilda'dagi bo'sh kanvas, unda matn, rasm, shakl va tugmalarni o'zingiz joylashtirasiz. Har bir elementning X va Y koordinatalari bor — bu CSS'dagi left va top (position: absolute). Tor ekranda elementlar chetdan chiqib ketishi mumkin, shuning uchun telefon uchun alohida joylashuv qilinadi. ¦ Zero Block is a blank Tilda canvas where you place text, images, shapes and buttons yourself. Each element has X and Y coordinates — CSS left and top (position: absolute). On narrow screens elements can slide off, so phones get a separate layout.",
      icon: '🎨',
      badge: "Художник Zero Block ¦ Zero Block rassomi ¦ Zero Block artist",
      badgeSub: "Tilda · Git · техническая 2 ¦ Tilda · Git · texnik 2 ¦ Tilda · Git · technical 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте обложку в Zero Block из 4 элементов. ¦ Zero Block'da 4 ta elementdan muqova yasang. ¦ Build a 4-element cover in Zero Block.",
        "Настройте её для телефона. ¦ Uni telefon uchun sozlang. ¦ Set it up for phones.",
      ],
      takeaway: "Дальше: алгоритмы в Blockly. ¦ Keyingisi: Blockly'da algoritmlar. ¦ Next: algorithms in Blockly.",
      notes: { min: 2 },
    },
  ],
});
