import { kit } from '@engine/kit';

const CSS = `.wrap{width:420px;margin:20px auto;padding:16px;border-radius:18px;background:#f4f5f8}
.card{padding:16px;border-radius:14px;background:#fff;font:700 22px Manrope,system-ui;margin-bottom:10px}
.dbg *{outline:2px solid #ef4b4b}
.bm{width:420px;margin:30px auto;font:800 18px JetBrains Mono,monospace;text-align:center}
.m{padding:26px;background:#f9cc9d}.b{padding:6px;background:#fddd9b}.p{padding:26px;background:#c3d08b}.c{padding:26px;background:#8cb6c0;color:#fff}`;
const cards = (wide: string, dbg = false) =>
  `<div class="wrap ${dbg ? 'dbg' : ''}"><div class="card">🍕 Pizza</div><div class="card" style="width:${wide}">🍔 Burger — the biggest one</div><div class="card">🍟 Fries</div></div>`;

export default kit({
  id: 'css-t08',
  title: "Ищем ошибки в CSS через DevTools ¦ DevTools orqali CSS'dagi xatolarni qidiramiz ¦ Hunting CSS bugs with DevTools",
  question: "Блок вылез за край — как за минуту найти, кто виноват? ¦ Blok chetdan chiqib ketdi — bir daqiqada kim aybdor ekanini qanday topish mumkin? ¦ A block sticks out — how do you find the culprit in a minute?",
  route: ["Баг ¦ Bug ¦ The bug", "Рамки ¦ Ramkalar ¦ Outlines", "Коробка элемента ¦ Element qutisi ¦ The box model", "Исправляем ¦ Tuzatamiz ¦ Fixing", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔍',
      kicker: "CSS · техническая тема 8 ¦ CSS · texnik mavzu 8 ¦ CSS · technical topic 8",
      title: "Детектив для CSS ¦ CSS uchun detektiv ¦ A detective for CSS",
      chat: "что вы делаете, когда вёрстка «поехала»? ¦ maket «surilib ketganda» nima qilasiz? ¦ what do you do when a layout breaks?",
      lead: "DevTools — лупа браузера. Наводите на элемент — и видите его размеры, отступы и все стили. ¦ DevTools — brauzer lupasi. Elementga olib kelasiz — va uning o'lchamlari, bo'shliqlari va barcha uslublarini ko'rasiz. ¦ DevTools is the browser's magnifying glass. Point at an element and see its size, spacing and every style.",
      facts: ["F12 — открыть ¦ F12 — ochish ¦ F12 opens it", "Наведи — увидишь размеры ¦ Olib kel — o'lchamlarni ko'rasan ¦ Hover to see sizes", "Меняй стили на лету ¦ Uslublarni darhol o'zgartir ¦ Edit styles live"],
      takeaway: "Сегодня найдём и починим баг за три шага. ¦ Bugun bugni uch qadamda topamiz va tuzatamiz. ¦ Today we find and fix a bug in three steps.",
      notes: { say: ["Открывайте DevTools вживую на любом сайте по ходу урока."], switch: "DevTools ¦ DevTools ¦ DevTools", min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Расследование бага ¦ Bugni tergov qilish ¦ Investigating a bug",
      chat: "какая карточка виновата? ¦ qaysi kartochka aybdor? ¦ which card is to blame?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '/* что-то вылезло… */ ¦ /* nimadir chiqib ketdi… */ ¦ /* something sticks out… */', html: cards('560px'), say: "Одна карточка вылезает за край. Почему? ¦ Bitta kartochka chetdan chiqib turibdi. Nega? ¦ One card sticks out. Why?" },
        { code: '* {\n  outline: 2px solid red;\n}', line: 2, html: cards('560px', true), say: "Обводим всё красной рамкой — сразу видно все коробки. ¦ Hammasini qizil ramka bilan o'raymiz — barcha qutilar darhol ko'rinadi. ¦ Outline everything in red — every box shows up." },
        { code: '.burger {\n  width: 560px; /* ← виновник */\n} ¦ .burger {\n  width: 560px; /* ← aybdor */\n} ¦ .burger {\n  width: 560px; /* ← the culprit */\n}', line: 2, html: cards('560px', true), say: "В DevTools видно: у бургера ширина 560px. ¦ DevTools'da ko'rinadi: burgerning kengligi 560px. ¦ DevTools shows the burger card is 560px wide." },
        { code: '.burger {\n  width: 100%;\n}', line: 2, html: cards('auto'), say: "Меняем на 100% — карточка встала на место! ¦ 100% ga o'zgartiramiz — kartochka joyiga tushdi! ¦ Change it to 100% — the card slots back in!" },
      ],
      takeaway: "Рамки → найти виновника → поменять значение в DevTools → перенести в код. ¦ Ramkalar → aybdorni topish → DevTools'da qiymatni o'zgartirish → kodga ko'chirish. ¦ Outline → find the culprit → tweak it in DevTools → copy into your code.",
      notes: { min: 6 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Коробка элемента ¦ Element qutisi ¦ The element's box",
      chat: "какой слой самый внешний? ¦ qaysi qatlam eng tashqi? ¦ which layer is the outermost?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.card {\n  width: 200px;\n}', line: 2, html: '<div class="bm"><div class="m" style="padding:0;background:transparent"><div class="b" style="padding:0;background:transparent"><div class="p" style="padding:0;background:transparent"><div class="c">content</div></div></div></div></div>', say: "В центре — само содержимое. ¦ Markazda — mazmunning o'zi. ¦ In the middle: the content itself." },
        { code: '.card {\n  padding: 26px;\n}', line: 2, html: '<div class="bm"><div class="m" style="padding:0;background:transparent"><div class="b" style="padding:0;background:transparent"><div class="p">padding<div class="c">content</div></div></div></div></div>', say: "padding — отступ внутри (зелёный). ¦ padding — ichki bo'shliq (yashil). ¦ padding: space inside (green)." },
        { code: '.card {\n  border: 6px solid;\n}', line: 2, html: '<div class="bm"><div class="m" style="padding:0;background:transparent"><div class="b">border<div class="p">padding<div class="c">content</div></div></div></div></div>', say: "border — рамка (жёлтая). ¦ border — ramka (sariq). ¦ border: the frame (yellow)." },
        { code: '.card {\n  margin: 26px;\n}', line: 2, html: '<div class="bm"><div class="m">margin<div class="b">border<div class="p">padding<div class="c">content</div></div></div></div></div>', say: "margin — отступ снаружи (оранжевый). Как в DevTools! ¦ margin — tashqi bo'shliq (to'q sariq). DevTools'dagidek! ¦ margin: space outside (orange) — just like DevTools!" },
      ],
      takeaway: "margin → border → padding → content. DevTools рисует их этими цветами. ¦ margin → border → padding → content. DevTools ularni shu ranglarda chizadi. ¦ margin → border → padding → content, in DevTools' own colours.",
      notes: { min: 5 },
    },
    {
      type: 'animate',
      stage: 3,
      title: "Три клика до решения ¦ Yechimgacha uch bosish ¦ Three clicks to a fix",
      chat: "какой шаг самый важный? ¦ qaysi qadam eng muhim? ¦ which step matters most?",
      actors: [
        { id: 'f12', icon: '⌨️', label: "F12 ¦ F12 ¦ F12" },
        { id: 'pick', icon: '🖱️', label: "Выбрать элемент ¦ Elementni tanlash ¦ Pick the element" },
        { id: 'edit', icon: '✏️', label: "Поменять стиль ¦ Uslubni o'zgartirish ¦ Edit the style" },
        { id: 'ok', icon: '✅', label: "Работает! ¦ Ishlaydi! ¦ It works!" },
      ],
      steps: [
        { say: "Нажимаем F12 — открывается DevTools. ¦ F12'ni bosamiz — DevTools ochiladi. ¦ Press F12 to open DevTools.", at: { f12: [12, 50] }, pulse: ['f12'] },
        { say: "Стрелкой выбираем сломанный элемент. ¦ Strelka bilan buzilgan elementni tanlaymiz. ¦ Use the arrow to pick the broken element.", at: { pick: [38, 50] }, lines: [['f12', 'pick']] },
        { say: "Справа меняем значение и сразу видим результат. ¦ O'ngda qiymatni o'zgartiramiz va natijani darhol ko'ramiz. ¦ Change a value on the right and see the result instantly.", at: { edit: [64, 50] }, lines: [['f12', 'pick'], ['pick', 'edit']] },
        { say: "Нашли рабочее значение — переносим в свой файл. ¦ Ishlaydigan qiymatni topdik — o'z faylimizga ko'chiramiz. ¦ Found the right value? Copy it into your file.", at: { ok: [88, 50] }, lines: [['f12', 'pick'], ['pick', 'edit'], ['edit', 'ok']], pulse: ['ok'] },
      ],
      takeaway: "Правки в DevTools исчезают после обновления — не забудьте перенести их в код! ¦ DevTools'dagi tuzatishlar yangilangandan keyin yo'qoladi — ularni kodga ko'chirishni unutmang! ¦ DevTools edits vanish on reload — copy them into your code!",
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Изменения в DevTools сохраняются в файл ¦ DevTools'dagi o'zgarishlar faylga saqlanadi ¦ DevTools edits save into your file", truth: false, explain: "Они живут до обновления страницы. ¦ Ular sahifa yangilanguncha yashaydi. ¦ They last until you reload." },
        { text: "DevTools можно открыть на любом сайте ¦ DevTools'ni istalgan saytda ochish mumkin ¦ You can open DevTools on any site", truth: true, explain: "Даже на YouTube — и ничего не сломается. ¦ Hatto YouTube'da ham — va hech narsa buzilmaydi. ¦ Even on YouTube — nothing breaks." },
        { text: "outline не сдвигает блоки ¦ outline bloklarni surmaydi ¦ outline doesn't move blocks", truth: true, explain: "Поэтому им удобно подсвечивать всё. ¦ Shuning uchun u bilan hammasini ajratib ko'rsatish qulay. ¦ That's why it's handy for highlighting everything." },
      ],
      takeaway: "DevTools — безопасная песочница: экспериментируйте смело. ¦ DevTools — xavfsiz qum qutisi: jasorat bilan tajriba qiling. ¦ DevTools is a safe sandbox — experiment freely.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: CSS-детектив ¦ Missiya: CSS detektivi ¦ Mission: CSS detective",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Баг найден и исправлен! ¦ Bug topildi va tuzatildi! ¦ Bug found and fixed!",
      items: [
        { title: "Открыть DevTools ¦ DevTools'ni ochish ¦ Open DevTools", choices: ['F12', 'F5'], correct: 0, explain: "F5 — обновить страницу. ¦ F5 — sahifani yangilash. ¦ F5 just reloads." },
        { title: "Увидеть все коробки ¦ Barcha qutilarni ko'rish ¦ See every box", choices: ['* { outline: 2px solid red }', '* { display: none }'], correct: 0, explain: "outline подсвечивает, ничего не сдвигая. ¦ outline hech narsani surmasdan ajratib ko'rsatadi. ¦ outline highlights without moving anything." },
        { title: "Отступ внутри блока ¦ Blok ichidagi bo'shliq ¦ Space inside a block", choices: ['padding', 'margin'], correct: 0, explain: "margin — снаружи. ¦ margin — tashqarida. ¦ margin is outside." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: отладка CSS ¦ Xulosa: CSS'ni tuzatish ¦ Summary: debugging CSS",
      chat: "какой баг вы найдёте на своём сайте? ¦ saytingizda qanday bugni topasiz? ¦ which bug will you find on your site?",
      answer: "DevTools (F12) — лупа браузера. Красная рамка outline на всех элементах показывает все коробки и того, кто вылез. Стрелкой выбираем элемент и видим его коробку: content, padding, border, margin. Меняем значения прямо в DevTools, находим рабочее и переносим в свой файл — после обновления правки исчезают. ¦ DevTools (F12) — brauzer lupasi. Barcha elementlardagi qizil outline ramkasi barcha qutilarni va kim chiqib ketganini ko'rsatadi. Strelka bilan elementni tanlab, uning qutisini ko'ramiz: content, padding, border, margin. Qiymatlarni to'g'ridan-to'g'ri DevTools'da o'zgartiramiz, ishlaydiganini topib, o'z faylimizga ko'chiramiz — yangilangandan keyin tuzatishlar yo'qoladi. ¦ DevTools (F12) is the browser's magnifying glass. A red outline on everything reveals every box and the one sticking out. Pick an element to see its box: content, padding, border, margin. Tweak values right in DevTools, find what works, then copy it into your file — edits vanish on reload.",
      icon: '🔍',
      badge: "CSS-детектив ¦ CSS detektivi ¦ CSS detective",
      badgeSub: "CSS · техническая 8 ¦ CSS · texnik 8 ¦ CSS · technical 8",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Откройте DevTools на любимом сайте и поменяйте цвет заголовка. ¦ Sevimli saytda DevTools'ni oching va sarlavha rangini o'zgartiring. ¦ Open DevTools on a favourite site and recolour a heading.",
        "Найдите на своей странице элемент с самым большим margin. ¦ Sahifangizda eng katta margin'ga ega elementni toping. ¦ Find the element with the biggest margin on your page.",
      ],
      takeaway: "Дальше: БЭМ — как называть классы, чтобы не запутаться. ¦ Keyingisi: BEM — adashmaslik uchun klasslarni qanday nomlash. ¦ Next: BEM — naming classes so you never get lost.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
