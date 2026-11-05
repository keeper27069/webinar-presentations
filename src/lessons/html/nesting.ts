import { kit } from '@engine/kit';

const BOX = `.b{position:relative;padding:34px 18px 18px;border-radius:18px;border:4px solid;margin-top:10px}
.b::before{content:attr(data-t);position:absolute;top:6px;left:14px;font:800 18px JetBrains Mono,monospace}
.l1{border-color:#f2573a;background:#fff1ec}.l1::before{color:#f2573a}
.l2{border-color:#3d7bff;background:#eef4ff}.l2::before{color:#3d7bff}
.l3{border-color:#0fb5a6;background:#e8faf7}.l3::before{color:#0fb5a6}
.t{font-size:26px;font-weight:700}`;

export default kit({
  id: 'html-t04',
  title: "Правильная вложенность ¦ To'g'ri ichma-ich joylashtirish ¦ Correct nesting",
  question: "Как класть теги друг в друга, чтобы страница не ломалась? ¦ Sahifa buzilmasligi uchun teglarni bir-birining ichiga qanday qo'yish kerak? ¦ How do you put tags inside each other without breaking the page?",
  route: ["Матрёшка ¦ Matryoshka ¦ Nesting dolls", "Порядок ¦ Tartib ¦ Order", "Запреты ¦ Taqiqlar ¦ Rules", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🪆',
      kicker: "HTML · техническая тема 4 ¦ HTML · texnik mavzu 4 ¦ HTML · technical topic 4",
      title: "Теги как матрёшка ¦ Teglar matryoshka kabi ¦ Tags are like nesting dolls",
      chat: "что внутри матрёшки? ¦ matryoshka ichida nima bor? ¦ what's inside a nesting doll?",
      lead: "Одна коробка лежит в другой, та — в третьей. Так и теги: открыли большую — положили маленькую — закрыли в обратном порядке. ¦ Bitta quti boshqasida, u esa uchinchisida yotadi. Teglar ham shunday: kattasini ochdik — kichigini qo'ydik — teskari tartibda yopdik. ¦ One box sits in another, which sits in a third. Tags work the same: open the big one, put the small one in, close in reverse order.",
      facts: ["Открыли → вложили → закрыли ¦ Ochdik → qo'ydik → yopdik ¦ Open → put in → close", "Закрываем с конца ¦ Oxiridan yopamiz ¦ Close from the inside out", "Отступы помогают видеть ¦ Bo'shliqlar ko'rishga yordam beradi ¦ Indents help you see"],
      takeaway: "Сегодня увидим вложенность как коробки в коробках. ¦ Bugun ichma-ichlikni qutilar ichidagi qutilar sifatida ko'ramiz. ¦ Today we see nesting as boxes inside boxes.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 0,
      title: "Коробка в коробке ¦ Quti ichida quti ¦ A box in a box",
      chat: "сколько коробок получится? ¦ nechta quti hosil bo'ladi? ¦ how many boxes will there be?",
      css: BOX,
      steps: [
        { code: '<article>\n</article>', html: '<div class="b l1" data-t="article"></div>', say: "Большая коробка — статья. ¦ Katta quti — maqola. ¦ The big box: an article." },
        { code: '<article>\n  <div>\n  </div>\n</article>', line: 2, html: '<div class="b l1" data-t="article"><div class="b l2" data-t="div"></div></div>', say: "Внутрь кладём блок. ¦ Ichiga blok qo'yamiz. ¦ Put a block inside." },
        { code: '<article>\n  <div>\n    <p>Hi!</p>\n  </div>\n</article>', line: 3, html: '<div class="b l1" data-t="article"><div class="b l2" data-t="div"><div class="b l3" data-t="p"><span class="t">Hi! 👋</span></div></div></div>', say: "А в блок — абзац с текстом. ¦ Blokka esa — matnli xatboshi. ¦ And inside the block, a paragraph." },
      ],
      takeaway: "Каждый уровень — на два пробела правее. Так вложенность видно сразу. ¦ Har bir daraja — ikki bo'sh joy o'ngroqda. Shunda ichma-ichlik darhol ko'rinadi. ¦ Each level moves two spaces right, so nesting is easy to see.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Закрываем в обратном порядке ¦ Teskari tartibda yopamiz ¦ Close in reverse order",
      chat: "какой тег закрываем первым? ¦ qaysi tegni birinchi yopamiz? ¦ which tag closes first?",
      css: BOX + 'b{color:#f2573a}',
      steps: [
        { code: '<p><b>Важно</b></p> ¦ <p><b>Muhim</b></p> ¦ <p><b>Important</b></p>', html: '<div class="b l1" data-t="p"><div class="b l2" data-t="b"><span class="t">Важно ✅</span></div></div> ¦ <div class="b l1" data-t="p"><div class="b l2" data-t="b"><span class="t">Muhim ✅</span></div></div> ¦ <div class="b l1" data-t="p"><div class="b l2" data-t="b"><span class="t">Important ✅</span></div></div>', say: "Сначала закрыли внутренний b, потом внешний p. Порядок! ¦ Avval ichki b'ni, keyin tashqi p'ni yopdik. Tartib! ¦ Close the inner b first, then the outer p. Tidy!" },
        { code: '<p><b>Важно</p></b> ¦ <p><b>Muhim</p></b> ¦ <p><b>Important</p></b>', line: 1, html: '<div class="b l1" data-t="p" style="transform:rotate(-2deg)"><div class="b l2" data-t="b" style="transform:translateX(40px) rotate(4deg)"><span class="t">Важно ❌</span></div></div> ¦ <div class="b l1" data-t="p" style="transform:rotate(-2deg)"><div class="b l2" data-t="b" style="transform:translateX(40px) rotate(4deg)"><span class="t">Muhim ❌</span></div></div> ¦ <div class="b l1" data-t="p" style="transform:rotate(-2deg)"><div class="b l2" data-t="b" style="transform:translateX(40px) rotate(4deg)"><span class="t">Important ❌</span></div></div>', say: "Перепутали — коробки «перекосились». Браузеру приходится угадывать. ¦ Adashtirdik — qutilar «qiyshaydi». Brauzer taxmin qilishga majbur. ¦ Mixed up — the boxes go crooked and the browser has to guess." },
      ],
      takeaway: "Последний открытый — первый закрытый. ¦ Oxirgi ochilgan — birinchi yopiladi. ¦ Last opened, first closed.",
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 2,
      title: "Можно или нельзя? ¦ Mumkinmi yoki yo'qmi? ¦ Allowed or not?",
      chat: "номер и «можно»/«нельзя» ¦ raqam va «mumkin»/«mumkin emas» ¦ number and “yes”/“no”",
      statements: [
        { text: "<li> внутри <ul> ¦ <ul> ichida <li> ¦ <li> inside <ul>", truth: true, explain: "Пункты живут в списке. ¦ Bandlar ro'yxatda yashaydi. ¦ List items live in lists." },
        { text: "<div> внутри <p> ¦ <p> ichida <div> ¦ A <div> inside a <p>", truth: false, explain: "Абзац — только для текста; браузер его разорвёт. ¦ Xatboshi faqat matn uchun; brauzer uni bo'lib yuboradi. ¦ A paragraph is for text only — the browser splits it." },
        { text: "<a> внутри <h1> ¦ <h1> ichida <a> ¦ An <a> inside an <h1>", truth: true, explain: "Заголовок может быть ссылкой. ¦ Sarlavha havola bo'lishi mumkin. ¦ A heading can be a link." },
        { text: "<li> без <ul> или <ol> ¦ <ul> yoki <ol>'siz <li> ¦ An <li> with no <ul> or <ol>", truth: false, explain: "Пункт списка без списка — ошибка. ¦ Ro'yxatsiz ro'yxat bandi — xato. ¦ A list item without a list is an error." },
      ],
      takeaway: "У тегов есть «семейные правила»: кто может быть внутри кого. ¦ Teglarning «oilaviy qoidalari» bor: kim kimning ichida bo'lishi mumkin. ¦ Tags have family rules about who goes inside whom.",
      notes: { say: ["Голосуем по пунктам."], min: 4 },
    },
    {
      type: 'bugs',
      stage: 2,
      title: "Найдите ошибку ¦ Xatoni toping ¦ Find the bug",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Перепутан порядок ¦ Tartib adashtirilgan ¦ Wrong order", lang: 'html', code: `<ul>\n  <li><a href="#">Menu</li></a>\n</ul>`, line: 2, explain: "Сначала закрываем a, потом li. ¦ Avval a'ni, keyin li'ni yopamiz. ¦ Close a first, then li.", fix: `  <li><a href="#">Menu</a></li>` },
        { title: "Пункт без списка ¦ Ro'yxatsiz band ¦ An item with no list", lang: 'html', code: `<nav>\n  <li>Home</li>\n  <li>About</li>\n</nav>`, line: 2, explain: "li должны лежать внутри ul. ¦ li'lar ul ichida bo'lishi kerak. ¦ li items must sit inside a ul.", fix: `<nav>\n  <ul>\n    <li>Home</li>\n    <li>About</li>\n  </ul>\n</nav>` },
      ],
      takeaway: "Отступы помогают быстро находить такие ошибки. ¦ Bo'shliqlar bunday xatolarni tez topishga yordam beradi. ¦ Indentation helps you spot these bugs fast.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Соберите карточку ¦ Kartochkani yig'ing ¦ Build a card",
      chat: "что положим в карточку ещё? ¦ kartochkaga yana nima qo'yamiz? ¦ what else goes in the card?",
      task: "✍️ Добавьте внутрь .card кнопку <button> ¦ ✍️ .card ichiga <button> tugmasini qo'shing ¦ ✍️ Add a <button> inside .card",
      steps: [{ label: "Карточка ¦ Kartochka ¦ Card", html: '<article class="card">\n  <h2>🍩 Berry donut</h2>\n  <p>Soft and <b>very</b> sweet.</p>\n  <ul>\n    <li>12 000 sum</li>\n    <li>New!</li>\n  </ul>\n</article>', css: 'body{font-family:Manrope,system-ui}.card{max-width:420px;padding:22px;border-radius:22px;background:#fff3e0}h2{margin:0 0 8px}button{padding:10px 18px;border:0;border-radius:12px;background:#f2573a;color:#fff;font-weight:800}' }],
      takeaway: "Внутри article — заголовок, абзац и список. Это и есть правильная вложенность. ¦ article ichida — sarlavha, xatboshi va ro'yxat. Bu to'g'ri ichma-ichlik. ¦ Inside the article: a heading, a paragraph and a list — correct nesting.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: собери матрёшку ¦ Missiya: matryoshkani yig' ¦ Mission: stack the dolls",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Все коробки на своих местах! ¦ Barcha qutilar o'z joyida! ¦ Every box is in place!",
      items: [
        { title: "Правильный порядок ¦ To'g'ri tartib ¦ The right order", choices: ['<p><b>Hi</b></p>', '<p><b>Hi</p></b>'], correct: 0, explain: "Последний открытый — первый закрытый. ¦ Oxirgi ochilgan — birinchi yopiladi. ¦ Last opened, first closed." },
        { title: "Где живут li? ¦ li'lar qayerda yashaydi? ¦ Where do li items live?", choices: ["В ul или ol ¦ ul yoki ol ichida ¦ In ul or ol", "Где угодно ¦ Istalgan joyda ¦ Anywhere"], correct: 0, explain: "Пункт — часть списка. ¦ Band — ro'yxat qismi. ¦ An item belongs to a list." },
        { title: "Что помогает видеть вложенность? ¦ Ichma-ichlikni ko'rishga nima yordam beradi? ¦ What helps you see nesting?", choices: ["Отступы ¦ Bo'shliqlar ¦ Indents", "Большие буквы ¦ Katta harflar ¦ Capital letters"], correct: 0, explain: "Два пробела на уровень. ¦ Har daraja uchun ikki bo'sh joy. ¦ Two spaces per level." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: вложенность ¦ Xulosa: ichma-ichlik ¦ Summary: nesting",
      chat: "нарисуйте свою страницу как коробки в коробках! ¦ sahifangizni qutilar ichidagi qutilar sifatida chizing! ¦ draw your page as boxes in boxes!",
      answer: "Теги кладутся друг в друга как матрёшки: открыли большой, вложили маленький, закрыли в обратном порядке — последний открытый закрывается первым. У тегов есть правила: li живут в ul или ol, а в абзац p нельзя класть блоки вроде div. Отступы по два пробела помогают видеть вложенность и находить ошибки. ¦ Teglar matryoshka kabi bir-birining ichiga qo'yiladi: kattasini ochdik, kichigini qo'ydik, teskari tartibda yopdik — oxirgi ochilgan birinchi yopiladi. Teglarning qoidalari bor: li'lar ul yoki ol ichida yashaydi, p xatboshisiga esa div kabi bloklarni qo'yib bo'lmaydi. Ikki bo'sh joyli chekinishlar ichma-ichlikni ko'rishga va xatolarni topishga yordam beradi. ¦ Tags nest like dolls: open the big one, put the small one in, close in reverse — the last opened closes first. Tags have rules: li lives in ul or ol, and a p can't hold blocks like div. Two-space indents help you see nesting and catch bugs.",
      icon: '🪆',
      badge: "Мастер матрёшек ¦ Matryoshka ustasi ¦ Nesting master",
      badgeSub: "HTML · техническая 4 ¦ HTML · texnik 4 ¦ HTML · technical 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте карточку товара: article → h2, p, ul с двумя li, button. ¦ Mahsulot kartochkasini yarating: article → h2, p, ikkita li'li ul, button. ¦ Make a product card: article → h2, p, ul with two li, button.",
        "Проверьте, что все теги закрыты в правильном порядке. ¦ Barcha teglar to'g'ri tartibda yopilganini tekshiring. ¦ Check every tag closes in the right order.",
      ],
      takeaway: "Модуль HTML пройден! Дальше — CSS: делаем красиво. ¦ HTML moduli tugadi! Keyingisi — CSS: chiroyli qilamiz. ¦ HTML module done! Next: CSS — making it beautiful.",
      notes: { say: ["Итог модуля."], min: 2 },
    },
  ],
});
