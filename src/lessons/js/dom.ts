import { kit } from '@engine/kit';

const HTML = `<div class="card" id="card">
  <h2 id="title">Hello, guest!</h2>
  <p id="text">Press a button 👇</p>
  <div class="btns">
    <button id="name">✏️ Name</button>
    <button id="theme">🌙 Theme</button>
    <button id="add">➕ Star</button>
  </div>
  <div id="stars"></div>
</div>`;
const CSS = `body{margin:0;font-family:system-ui;min-height:100vh;display:grid;place-items:center;background:#eef2f8}
.card{background:#fff;color:#1b2150;border-radius:20px;padding:24px 30px;width:360px;text-align:center;box-shadow:0 10px 30px #0002;transition:.3s}
.card.dark{background:#1b2150;color:#fff}
.btns{display:flex;gap:8px;justify-content:center}
button{padding:10px 14px;border:0;border-radius:10px;background:#5b3df5;color:#fff;font-weight:700;font-size:15px}
#stars{font-size:30px;min-height:40px;margin-top:12px}`;
const JS1 = `const title = document.querySelector('#title');
const text = document.querySelector('#text');

title.textContent = 'Hello, Bit Lab!';
text.style.color = '#ff6f91';
text.style.fontSize = '22px';`;
const JS2 = `const card = document.querySelector('#card');
const title = document.querySelector('#title');

document.querySelector('#name').addEventListener('click', () => {
  title.textContent = 'Hello, Lola! 👋';
});

document.querySelector('#theme').addEventListener('click', () => {
  card.classList.toggle('dark');
});

document.querySelector('#add').addEventListener('click', () => {
  const star = document.createElement('span');
  star.textContent = '⭐';
  document.querySelector('#stars').append(star);
});`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.card{width:380px;padding:24px 28px;border-radius:20px;background:#fff;color:#1b2150;text-align:center;box-shadow:0 10px 30px #0002}
.card h2{margin:0 0 6px;font-size:28px}.card p{margin:0 0 14px;color:#6b7183;font-size:18px}
.btn{display:inline-block;padding:10px 16px;border-radius:10px;background:#e9a400;color:#16181f;font-weight:800}
.pink p{color:#ff4f8b;font-size:22px;font-weight:800}
.dark{background:#1b2150;color:#fff}.dark p{color:#c3c7d2}
.stars{min-height:44px;margin-top:12px;font-size:32px;letter-spacing:4px}
.sel{outline:4px dashed #3d7bff;outline-offset:6px;border-radius:6px}`;
const card = (o: { title?: string; cls?: string; stars?: number; sel?: boolean }) =>
  `<div class="wrap"><div class="card ${o.cls ?? ''}"><h2 class="${o.sel ? 'sel' : ''}">${o.title ?? 'Hello, guest!'}</h2><p>Press a button 👇</p><span class="btn">➕ Star</span><div class="stars">${'⭐'.repeat(o.stars ?? 0)}</div></div></div>`;

export default kit({
  id: 'js-t05',
  title: "DOM: JavaScript меняет страницу ¦ DOM: JavaScript sahifani o'zgartiradi ¦ The DOM: JavaScript changes the page",
  question: "Как JavaScript находит кнопку на странице и меняет её прямо на глазах? ¦ JavaScript sahifadagi tugmani qanday topadi va uni ko'z oldida o'zgartiradi? ¦ How does JavaScript find a button and change it before your eyes?",
  route: ["Дерево ¦ Daraxt ¦ The tree", "Найти и изменить ¦ Topish va o'zgartirish ¦ Find & change", "События ¦ Hodisalar ¦ Events", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🌳',
      kicker: "JavaScript · техническая тема 5 ¦ JavaScript · texnik mavzu 5 ¦ JavaScript · technical topic 5",
      title: "Страница — живое дерево ¦ Sahifa — tirik daraxt ¦ A page is a living tree",
      chat: "что на сайте меняется, когда вы нажимаете кнопку? ¦ tugmani bosganingizda saytda nima o'zgaradi? ¦ what changes on a site when you press a button?",
      lead: "Браузер превращает HTML в дерево — DOM. JavaScript может найти в нём любой элемент и поменять текст, цвет или добавить новый — без перезагрузки. ¦ Brauzer HTML'ni daraxtga — DOM'ga aylantiradi. JavaScript undan istalgan elementni topib, matn, rangni o'zgartirishi yoki yangisini qo'shishi mumkin — qayta yuklamasdan. ¦ The browser turns HTML into a tree — the DOM. JavaScript can find any element in it and change text, colour or add new ones — no reload needed.",
      facts: ["querySelector — найти ¦ querySelector — topish ¦ querySelector: find", "textContent, style, classList — изменить ¦ textContent, style, classList — o'zgartirish ¦ textContent, style, classList: change", "addEventListener — реагировать ¦ addEventListener — javob berish ¦ addEventListener: react"],
      takeaway: "Смотрим, как HTML становится деревом. ¦ HTML qanday daraxtga aylanishini ko'ramiz. ¦ Watch HTML become a tree.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "HTML → дерево DOM ¦ HTML → DOM daraxti ¦ HTML → the DOM tree",
      chat: "сколько «веток» у карточки? ¦ kartochkada nechta «shox» bor? ¦ how many “branches” does the card have?",
      actors: [
        { id: 'doc', icon: '📄', label: 'document' },
        { id: 'card', icon: '🗂️', label: 'div#card' },
        { id: 'h2', icon: '🔤', label: 'h2#title' },
        { id: 'p', icon: '📝', label: 'p#text' },
        { id: 'btn', icon: '🔘', label: 'button#add' },
        { id: 'js', icon: '🖐️', label: "JavaScript ¦ JavaScript ¦ JavaScript" },
      ],
      steps: [
        { say: "Корень дерева — document, вся страница. ¦ Daraxt ildizi — document, butun sahifa. ¦ The root is document — the whole page.", at: { doc: [50, 12] } },
        { say: "В нём — карточка, а в карточке — заголовок, текст и кнопка. ¦ Uning ichida — kartochka, kartochkada esa — sarlavha, matn va tugma. ¦ Inside is the card; inside the card, a heading, text and a button.", at: { card: [50, 40], h2: [20, 76], p: [50, 76], btn: [80, 76] }, lines: [['doc', 'card'], ['card', 'h2'], ['card', 'p'], ['card', 'btn']] },
        { say: "JavaScript «дотягивается» до элемента по его id: #title. ¦ JavaScript elementga id bo'yicha «yetib boradi»: #title. ¦ JavaScript reaches an element by its id: #title.", at: { js: [86, 22] }, lines: [['doc', 'card'], ['card', 'h2'], ['card', 'p'], ['card', 'btn'], ['js', 'h2', 'querySelector']], pulse: ['h2'] },
        { say: "И меняет его — страница обновилась мгновенно! ¦ Va uni o'zgartiradi — sahifa bir zumda yangilandi! ¦ And changes it — the page updates instantly!", set: { h2: { icon: '✨', label: "'Hello, Lola!'" } }, lines: [['doc', 'card'], ['card', 'h2'], ['card', 'p'], ['card', 'btn'], ['js', 'h2', 'textContent']], pulse: ['h2'] },
      ],
      takeaway: "DOM — дерево элементов. JS находит ветку и меняет её. ¦ DOM — elementlar daraxti. JS shoxni topadi va uni o'zgartiradi. ¦ The DOM is a tree of elements; JS finds a branch and changes it.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Найти и изменить ¦ Topish va o'zgartirish ¦ Find and change",
      chat: "какой текст поставим в заголовок? ¦ sarlavhaga qanday matn qo'yamiz? ¦ what text shall we put in the heading?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "const title =\n  document.querySelector('#title');", line: 2, html: card({ sel: true }), say: "querySelector нашёл заголовок по id. ¦ querySelector sarlavhani id bo'yicha topdi. ¦ querySelector finds the heading by id." },
        { code: "title.textContent = 'Hello, Lola! 👋';", line: 1, html: card({ title: 'Hello, Lola! 👋' }), say: "textContent — меняем текст. ¦ textContent — matnni o'zgartiramiz. ¦ textContent changes the text." },
        { code: "text.style.color = '#ff4f8b';\ntext.style.fontSize = '22px';", line: 1, html: card({ title: 'Hello, Lola! 👋', cls: 'pink' }), say: "style — меняем CSS прямо из JS. ¦ style — CSS'ni to'g'ridan-to'g'ri JS'dan o'zgartiramiz. ¦ style changes CSS straight from JS." },
        { code: "card.classList.toggle('dark');", line: 1, html: card({ title: 'Hello, Lola! 👋', cls: 'dark' }), say: "classList.toggle — включить/выключить класс. Тёмная тема одной строкой! ¦ classList.toggle — klassni yoqish/o'chirish. Bitta qator bilan qorong'i mavzu! ¦ classList.toggle switches a class on or off — dark mode in one line!" },
      ],
      takeaway: "Найти (querySelector) → изменить (textContent / style / classList). ¦ Topish (querySelector) → o'zgartirish (textContent / style / classList). ¦ Find (querySelector) → change (textContent / style / classList).",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "События: код ждёт клика ¦ Hodisalar: kod bosishni kutadi ¦ Events: code waits for a click",
      chat: "сколько звёзд добавим? ¦ nechta yulduz qo'shamiz? ¦ how many stars shall we add?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "addBtn.addEventListener('click', () => {\n  stars.textContent += '⭐';\n});", line: 1, html: card({ title: 'Hello, Lola! 👋' }), say: "addEventListener: «когда нажмут — выполни это». Пока никто не нажал. ¦ addEventListener: «bosilganda — buni bajar». Hozircha hech kim bosmadi. ¦ addEventListener says “when clicked, do this”. Nobody has clicked yet." },
        { code: "// 👆 click", html: card({ title: 'Hello, Lola! 👋', stars: 1 }), say: "Клик — появилась звезда. ¦ Bosish — yulduz paydo bo'ldi. ¦ Click — a star appears." },
        { code: "// 👆 👆 👆", html: card({ title: 'Hello, Lola! 👋', stars: 4 }), say: "Каждый клик снова запускает тот же код. ¦ Har bir bosish o'sha kodni yana ishga tushiradi. ¦ Each click runs the same code again." },
      ],
      takeaway: "Событие → функция. Так сайты отвечают на клики, ввод и прокрутку. ¦ Hodisa → funksiya. Saytlar bosish, kiritish va aylantirishga shunday javob beradi. ¦ Event → function: that's how sites react to clicks, typing and scrolling.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Меняем страницу кодом ¦ Sahifani kod bilan o'zgartiramiz ¦ Changing the page with code",
      chat: "какой текст и цвет поставить? ¦ qanday matn va rang qo'yamiz? ¦ what text and colour shall we set?",
      task: "✍️ Меняйте текст и стили в JS ¦ ✍️ JS'da matn va uslublarni o'zgartiring ¦ ✍️ Change the text and styles in JS",
      steps: [
        { label: "Найти и изменить ¦ Topish va o'zgartirish ¦ Find and change", html: HTML, css: CSS, js: JS1 },
      ],
      takeaway: "querySelector находит, textContent и style меняют. Сайт изменился без правки HTML. ¦ querySelector topadi, textContent va style o'zgartiradi. Sayt HTML'ni tahrirlamasdan o'zgardi. ¦ querySelector finds; textContent and style change. The page changed without editing the HTML.",
      notes: { say: ["Обратите внимание: в CSS пишем font-size, а в JS — fontSize (camelCase)."], min: 6 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Кнопки, которые работают ¦ Ishlaydigan tugmalar ¦ Buttons that work",
      chat: "что ещё должна делать кнопка? ¦ tugma yana nima qilishi kerak? ¦ what else should a button do?",
      task: "✍️ Нажимайте кнопки, потом добавьте свою ¦ ✍️ Tugmalarni bosing, keyin o'zingiznikini qo'shing ¦ ✍️ Press the buttons, then add your own",
      steps: [
        { label: "События ¦ Hodisalar ¦ Events", html: HTML, css: CSS, js: JS2 },
      ],
      takeaway: "addEventListener ждёт клика и запускает функцию. createElement + append добавляют новые элементы. ¦ addEventListener bosishni kutadi va funksiyani ishga tushiradi. createElement + append yangi elementlar qo'shadi. ¦ addEventListener waits for a click and runs a function. createElement + append add new elements.",
      notes: { say: ["Попросите чат придумать четвёртую кнопку: «удалить звёзды» (stars.innerHTML = '')."], min: 8 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: оживить страницу ¦ Missiya: sahifani jonlantirish ¦ Mission: bring the page to life",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Страница отвечает на каждое действие! ¦ Sahifa har bir harakatga javob beradi! ¦ The page responds to every action!",
      items: [
        { title: "Найти элемент с id=\"score\" ¦ id=\"score\" bo'lgan elementni topish ¦ Find the element with id=\"score\"", choices: ["document.querySelector('#score')", "document.score"], correct: 0, explain: "# — значит id. ¦ # — demak id. ¦ # means id." },
        { title: "Поменять текст ¦ Matnni o'zgartirish ¦ Change the text", choices: ['textContent', 'classList'], correct: 0, explain: "textContent — для текста. ¦ textContent — matn uchun. ¦ textContent is for text." },
        { title: "Сделать что-то по клику ¦ Bosilganda biror narsa qilish ¦ Do something on click", choices: ["addEventListener('click', …)", "console.log('click')"], correct: 0, explain: "Слушаем событие клика. ¦ Bosish hodisasini tinglaymiz. ¦ Listen for the click event." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: DOM ¦ Xulosa: DOM ¦ Summary: the DOM",
      chat: "что оживите на своём сайте? ¦ saytingizda nimani jonlantirasiz? ¦ what will you bring to life on your site?",
      answer: "Браузер превращает HTML в дерево DOM. JavaScript находит элемент через document.querySelector('#id') и меняет его: textContent — текст, style — CSS, classList.toggle — включает класс, например тёмную тему. addEventListener('click', …) запускает код при каждом клике — так сайты отвечают на действия без перезагрузки. ¦ Brauzer HTML'ni DOM daraxtiga aylantiradi. JavaScript document.querySelector('#id') orqali elementni topadi va uni o'zgartiradi: textContent — matn, style — CSS, classList.toggle — klassni, masalan qorong'i mavzuni yoqadi. addEventListener('click', …) har bir bosishda kodni ishga tushiradi — saytlar harakatlarga qayta yuklamasdan shunday javob beradi. ¦ The browser turns HTML into a DOM tree. JavaScript finds an element with document.querySelector('#id') and changes it: textContent for text, style for CSS, classList.toggle to switch a class like dark mode. addEventListener('click', …) runs code on every click — that's how sites react without reloading.",
      icon: '🌳',
      badge: "Укротитель DOM ¦ DOM tarbiyachisi ¦ DOM tamer",
      badgeSub: "JavaScript · техническая 5 ¦ JavaScript · texnik 5 ¦ JavaScript · technical 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте кнопку, которая меняет цвет фона страницы. ¦ Sahifa fonining rangini o'zgartiradigan tugma yasang. ¦ Make a button that changes the page background colour.",
        "Добавьте счётчик кликов. ¦ Bosishlar hisoblagichini qo'shing. ¦ Add a click counter.",
      ],
      takeaway: "Дальше: собираем настоящий Todo-list. ¦ Keyingisi: haqiqiy Todo-list yig'amiz. ¦ Next: building a real to-do list.",
      notes: { min: 2 },
    },
  ],
});
