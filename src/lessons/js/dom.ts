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

export default kit({
  id: 'js-t05',
  title: "DOM ¦ DOM ¦ The DOM",
  question: "Как JavaScript меняет текст, цвета и элементы страницы прямо на глазах? ¦ JavaScript sahifadagi matn, rang va elementlarni ko'z oldida qanday o'zgartiradi? ¦ How does JavaScript change a page's text, colours and elements before your eyes?",
  route: ["Что такое DOM ¦ DOM nima ¦ What the DOM is", "Найти ¦ Topish ¦ Find", "Изменить ¦ O'zgartirish ¦ Change", "События ¦ Hodisalar ¦ Events", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🌳',
      kicker: "JavaScript · техническая тема 5 ¦ JavaScript · texnik mavzu 5 ¦ JavaScript · technical topic 5",
      title: "Страница, которая слушается кода ¦ Kodga bo'ysunadigan sahifa ¦ A page that obeys your code",
      chat: "что на сайтах меняется, когда вы нажимаете кнопку? ¦ tugmani bosganingizda saytlarda nima o'zgaradi? ¦ what changes on sites when you press a button?",
      lead: "Браузер превращает HTML в дерево объектов — DOM. JavaScript может найти любую ветку этого дерева и изменить её: текст, цвет, классы — или добавить новые элементы. ¦ Brauzer HTML'ni obyektlar daraxtiga — DOM'ga aylantiradi. JavaScript bu daraxtning istalgan shoxini topib, uni o'zgartira oladi: matn, rang, klasslar — yoki yangi elementlar qo'shadi. ¦ The browser turns HTML into a tree of objects — the DOM. JavaScript can find any branch of it and change it: text, colour, classes — or add new elements.",
      facts: ["Найти элемент ¦ Elementni topish ¦ Find an element", "Изменить его ¦ Uni o'zgartirish ¦ Change it", "Реагировать на клик ¦ Bosishga javob berish ¦ React to a click"],
      takeaway: "Сегодня HTML и CSS «оживут» по нажатию кнопки. ¦ Bugun HTML va CSS tugma bosilganda «jonlanadi». ¦ Today HTML and CSS come alive at the press of a button.",
      notes: { say: ["Покажите DevTools → Elements: это и есть DOM-дерево."], min: 3 },
    },
    {
      type: 'flow',
      stage: 0,
      title: "Из HTML — в дерево ¦ HTML'dan — daraxtga ¦ From HTML to a tree",
      chat: "какой элемент — «родитель» для h2? ¦ h2 uchun qaysi element «ota-ona»? ¦ which element is h2's “parent”?",
      nodes: [
        { icon: '📄', label: 'document', text: "Корень: вся страница. ¦ Ildiz: butun sahifa. ¦ The root: the whole page." },
        { icon: '🧱', label: '<body>', text: "Видимая часть. ¦ Ko'rinadigan qism. ¦ The visible part." },
        { icon: '🗂️', label: '<div class="card">', text: "Карточка-родитель. ¦ Ota-ona kartochka. ¦ The parent card." },
        { icon: '🔤', label: "<h2>, <p>, <button> ¦ <h2>, <p>, <button> ¦ <h2>, <p>, <button>", text: "Дети карточки — их и будем менять. ¦ Kartochka bolalari — ularni o'zgartiramiz. ¦ The card's children — these we'll change." },
      ],
      takeaway: "Каждый тег становится объектом, у которого есть свойства и методы. ¦ Har bir teg xususiyat va metodlarga ega obyektga aylanadi. ¦ Every tag becomes an object with properties and methods.",
      notes: { min: 3 },
    },
    {
      type: 'cheatsheet',
      stage: 1,
      title: "Главные команды DOM ¦ DOM'ning asosiy buyruqlari ¦ The key DOM commands",
      chat: "какую команду попробуем первой? ¦ birinchi qaysi buyruqni sinab ko'ramiz? ¦ which command shall we try first?",
      sheetTitle: "DOM за 6 строк ¦ 6 qatorda DOM ¦ The DOM in 6 lines",
      items: [
        { icon: '🔍', text: "Найти один элемент ¦ Bitta elementni topish ¦ Find one element", code: "document.querySelector('#title')" },
        { icon: '🔎', text: "Найти все ¦ Hammasini topish ¦ Find all", code: "document.querySelectorAll('.item')" },
        { icon: '✏️', text: "Поменять текст ¦ Matnni o'zgartirish ¦ Change text", code: "el.textContent = 'Hi'" },
        { icon: '🎨', text: "Поменять стиль ¦ Uslubni o'zgartirish ¦ Change a style", code: "el.style.color = 'red'" },
        { icon: '🏷️', text: "Класс вкл/выкл ¦ Klassni yoqish/o'chirish ¦ Toggle a class", code: "el.classList.toggle('dark')" },
        { icon: '👂', text: "Слушать клик ¦ Bosishni tinglash ¦ Listen for a click", code: "el.addEventListener('click', fn)" },
      ],
      notes: { say: ["Дайте время на скриншот."], min: 3 },
    },
    {
      type: 'live',
      stage: 2,
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
      type: 'sort',
      stage: 3,
      title: "Какая команда нужна? ¦ Qaysi buyruq kerak? ¦ Which command do you need?",
      chat: "пишите: «1 — classList» ¦ yozing: «1 — classList» ¦ write: “1 — classList”",
      zones: [
        { id: 'text', label: 'textContent', icon: '✏️' },
        { id: 'class', label: 'classList', icon: '🏷️' },
        { id: 'event', label: 'addEventListener', icon: '👂' },
        { id: 'create', label: 'createElement', icon: '➕' },
      ],
      items: [
        { text: "Поменять заголовок на «Корзина (3)» ¦ Sarlavhani «Savat (3)» ga o'zgartirish ¦ Change the heading to “Cart (3)”", zone: 'text' },
        { text: "Включить тёмную тему ¦ Qorong'i mavzuni yoqish ¦ Turn on dark mode", zone: 'class' },
        { text: "Сделать что-то при клике ¦ Bosilganda biror narsa qilish ¦ Do something on click", zone: 'event' },
        { text: "Добавить новую строку в список ¦ Ro'yxatga yangi qator qo'shish ¦ Add a new row to a list", zone: 'create' },
      ],
      takeaway: "Четыре команды — и вы можете сделать почти любой интерфейс. ¦ To'rtta buyruq — va siz deyarli istalgan interfeysni yarata olasiz. ¦ Four commands, and you can build almost any interface.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Почему не работает? ¦ Nega ishlamayapti? ¦ Why doesn't it work?",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Элемент не найден ¦ Element topilmadi ¦ Element not found", lang: 'js', code: `// HTML: <h2 id="title">…</h2>\nconst title = document.querySelector('title');\ntitle.textContent = 'Hi';`, line: 2, explain: "Без # ищется тег <title>, а не id. Для id нужен '#title', для класса — '.title'. ¦ # siz id emas, <title> tegi qidiriladi. id uchun '#title', klass uchun — '.title' kerak. ¦ Without # it looks for a <title> tag, not the id. Use '#title' for ids, '.title' for classes.", fix: `const title = document.querySelector('#title');` },
        { title: "Функция сработала сразу ¦ Funksiya darhol ishladi ¦ The function ran immediately", lang: 'js', code: `function hello() {\n  alert('Hi!');\n}\nbutton.addEventListener('click', hello());`, line: 4, explain: "hello() вызывает функцию сразу. Нужно передать саму функцию — без скобок. ¦ hello() funksiyani darhol chaqiradi. Funksiyaning o'zini — qavslarsiz berish kerak. ¦ hello() calls it right away. Pass the function itself, without brackets.", fix: `button.addEventListener('click', hello);` },
      ],
      takeaway: "Проверяйте селектор (# или .) и не ставьте () у функции в addEventListener. ¦ Selektorni (# yoki .) tekshiring va addEventListener'dagi funksiyaga () qo'ymang. ¦ Check the selector (# or .) and don't put () on the function in addEventListener.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "JavaScript меняет HTML-файл на диске ¦ JavaScript diskdagi HTML faylni o'zgartiradi ¦ JavaScript changes the HTML file on disk", truth: false, explain: "Меняется только DOM в браузере. Обновите страницу — всё вернётся. ¦ Faqat brauzerdagi DOM o'zgaradi. Sahifani yangilang — hammasi qaytadi. ¦ Only the DOM in the browser changes. Reload and it's all back." },
        { text: "querySelector возвращает первый подходящий элемент ¦ querySelector birinchi mos elementni qaytaradi ¦ querySelector returns the first match", truth: true, explain: "Для всех — querySelectorAll. ¦ Hammasi uchun — querySelectorAll. ¦ For all of them use querySelectorAll." },
        { text: "Класс через classList лучше, чем десять строк style ¦ classList orqali klass o'nta style qatoridan yaxshiroq ¦ A class via classList beats ten lines of style", truth: true, explain: "Стили — в CSS, а JS только включает класс. ¦ Uslublar — CSS'da, JS esa faqat klassni yoqadi. ¦ Styles stay in CSS; JS just toggles the class." },
      ],
      takeaway: "HTML — структура, CSS — вид, JS — поведение. DOM их соединяет. ¦ HTML — tuzilma, CSS — ko'rinish, JS — xatti-harakat. DOM ularni bog'laydi. ¦ HTML is structure, CSS is looks, JS is behaviour. The DOM ties them together.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: живая кнопка ¦ Missiya: jonli tugma ¦ Mission: a live button",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Кнопка ожила! ¦ Tugma jonlandi! ¦ The button came alive!",
      items: [
        { title: "Найти <button class=\"buy\"> ¦ <button class=\"buy\"> ni topish ¦ Find <button class=\"buy\">", choices: ["querySelector('.buy')", "querySelector('#buy')"], correct: 0, explain: "Класс — через точку. ¦ Klass — nuqta orqali. ¦ Classes use a dot." },
        { title: "Показать «Куплено!» ¦ «Sotib olindi!» ni ko'rsatish ¦ Show “Bought!”", choices: ["btn.textContent = 'Bought!'", "btn = 'Bought!'"], correct: 0, explain: "Меняем свойство элемента, а не саму переменную. ¦ O'zgaruvchining o'zini emas, element xususiyatini o'zgartiramiz. ¦ Change the element's property, not the variable." },
        { title: "Запуск по клику ¦ Bosish bilan ishga tushirish ¦ Run on click", choices: ["btn.addEventListener('click', buy)", "btn.addEventListener('click', buy())"], correct: 0, explain: "Передаём функцию без (). ¦ Funksiyani () siz beramiz. ¦ Pass the function without ()." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: DOM ¦ Xulosa: DOM ¦ Summary: the DOM",
      chat: "что вы «оживите» на своём сайте первым? ¦ saytingizda birinchi nimani «jonlantirasiz»? ¦ what will you bring to life on your site first?",
      answer: "DOM — дерево объектов, в которое браузер превращает HTML. querySelector находит элемент (# — id, . — класс), textContent и style меняют его, classList включает классы, createElement и append добавляют новые элементы, а addEventListener запускает функцию по клику. Так HTML и CSS оживают — но меняется только страница в браузере, не файл. ¦ DOM — brauzer HTML'ni aylantiradigan obyektlar daraxti. querySelector elementni topadi (# — id, . — klass), textContent va style uni o'zgartiradi, classList klasslarni yoqadi, createElement va append yangi elementlar qo'shadi, addEventListener esa bosilganda funksiyani ishga tushiradi. Shunday qilib HTML va CSS jonlanadi — lekin fayl emas, faqat brauzerdagi sahifa o'zgaradi. ¦ The DOM is the tree of objects the browser builds from HTML. querySelector finds an element (# for id, . for class), textContent and style change it, classList toggles classes, createElement and append add elements, and addEventListener runs a function on click. That's how HTML and CSS come alive — only the page in the browser changes, not the file.",
      icon: '🌳',
      badge: "Укротитель DOM ¦ DOM ustasi ¦ DOM tamer",
      badgeSub: "JavaScript · техническая 5 ¦ JavaScript · texnik 5 ¦ JavaScript · technical 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте счётчик: кнопки «+» и «−» и число между ними. ¦ Hisoblagich yarating: «+» va «−» tugmalari va ular orasida raqam. ¦ Build a counter: “+” and “−” buttons with a number between them.",
        "Добавьте кнопку, которая переключает тёмную тему через classList.toggle. ¦ classList.toggle orqali qorong'i mavzuni almashtiradigan tugma qo'shing. ¦ Add a button that toggles dark mode with classList.toggle.",
      ],
      takeaway: "Следующая тема — Todo-list: соберём всё вместе в один проект. ¦ Keyingi mavzu — Todo-list: hammasini bitta loyihaga yig'amiz. ¦ Next: a Todo list — putting it all together in one project.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
