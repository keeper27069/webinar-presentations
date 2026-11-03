import { kit } from '@engine/kit';

const HTML = `<div class="app">
  <h2>📝 My tasks</h2>
  <form id="form">
    <input id="input" placeholder="New task…" autocomplete="off">
    <button>Add</button>
  </form>
  <ul id="list"></ul>
  <p id="count"></p>
</div>`;
const CSS = `body{margin:0;font-family:system-ui;min-height:100vh;display:grid;place-items:center;background:linear-gradient(160deg,#5b3df5,#22d3c5)}
.app{background:#fff;border-radius:20px;padding:22px;width:380px;box-shadow:0 12px 40px #0003}
h2{margin:0 0 12px}form{display:flex;gap:8px}
input{flex:1;padding:10px;border:1px solid #cfd5e6;border-radius:10px;font-size:16px}
button{padding:10px 14px;border:0;border-radius:10px;background:#1b2150;color:#fff;font-weight:700}
ul{list-style:none;padding:0;margin:14px 0 0}
li{display:flex;align-items:center;gap:10px;padding:10px;border-bottom:1px solid #eef1f7;font-size:17px}
li span{flex:1;cursor:pointer}li.done span{text-decoration:line-through;color:#9aa1b5}
li button{background:#ff6f91;padding:4px 10px}#count{color:#6b7390;margin:10px 0 0}`;
const STEP1 = `const form = document.querySelector('#form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');

form.addEventListener('submit', (e) => {
  e.preventDefault();                  // don't reload the page
  const li = document.createElement('li');
  li.textContent = input.value;
  list.append(li);
  input.value = '';
});`;
const STEP2 = `const form = document.querySelector('#form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === '') return;             // no empty tasks

  const li = document.createElement('li');
  li.innerHTML = '<span></span><button>✕</button>';
  li.querySelector('span').textContent = text;

  li.querySelector('span').addEventListener('click', () => li.classList.toggle('done'));
  li.querySelector('button').addEventListener('click', () => li.remove());

  list.append(li);
  input.value = '';
});`;
const STEP3 = `const form = document.querySelector('#form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');
let tasks = [
  { text: 'Learn the DOM', done: true },
  { text: 'Build a Todo list', done: false },
];

function render() {
  list.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';
    li.innerHTML = '<span></span><button>✕</button>';
    li.querySelector('span').textContent = task.text;
    li.querySelector('span').onclick = () => { task.done = !task.done; render(); };
    li.querySelector('button').onclick = () => { tasks.splice(i, 1); render(); };
    list.append(li);
  });
  const left = tasks.filter((t) => !t.done).length;
  document.querySelector('#count').textContent = 'Left: ' + left;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  input.value = '';
  render();
});

render();`;

export default kit({
  id: 'js-t06',
  title: "Todo-list ¦ Todo-list ¦ A Todo list",
  question: "Как переменные, функции и DOM работают вместе в одном настоящем проекте? ¦ O'zgaruvchilar, funksiyalar va DOM bitta haqiqiy loyihada qanday birga ishlaydi? ¦ How do variables, functions and the DOM work together in one real project?",
  route: ["План ¦ Reja ¦ Plan", "Добавить ¦ Qo'shish ¦ Add", "Удалить и отметить ¦ O'chirish va belgilash ¦ Delete and tick", "Данные → экран ¦ Ma'lumot → ekran ¦ Data → screen", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '📝',
      kicker: "JavaScript · техническая тема 6 ¦ JavaScript · texnik mavzu 6 ¦ JavaScript · technical topic 6",
      title: "Первое настоящее приложение ¦ Birinchi haqiqiy ilova ¦ Your first real app",
      chat: "какую задачу добавить в список первой? ¦ ro'yxatga birinchi qaysi vazifani qo'shamiz? ¦ which task goes on the list first?",
      lead: "Список задач — классический первый проект программиста. В нём есть всё: ввод, кнопки, данные, условия и функции. Соберём его прямо в эфире за три шага. ¦ Vazifalar ro'yxati — dasturchining klassik birinchi loyihasi. Unda hammasi bor: kiritish, tugmalar, ma'lumotlar, shartlar va funksiyalar. Uni to'g'ridan-to'g'ri efirda uch qadamda yig'amiz. ¦ A to-do list is the classic first project. It has everything: input, buttons, data, conditions and functions. We'll build it live in three steps.",
      facts: ["Шаг 1 — добавлять ¦ 1-qadam — qo'shish ¦ Step 1: add", "Шаг 2 — удалять и отмечать ¦ 2-qadam — o'chirish va belgilash ¦ Step 2: delete and tick", "Шаг 3 — хранить в массиве ¦ 3-qadam — massivda saqlash ¦ Step 3: keep it in an array"],
      takeaway: "Задачи для списка присылает чат! ¦ Ro'yxat uchun vazifalarni chat yuboradi! ¦ Chat supplies the tasks!",
      notes: { min: 3 },
    },
    {
      type: 'flow',
      stage: 0,
      title: "План приложения ¦ Ilova rejasi ¦ The app plan",
      chat: "чего не хватает в плане? ¦ rejada nima yetishmayapti? ¦ what's missing from the plan?",
      nodes: [
        { icon: '⌨️', label: "Ввод ¦ Kiritish ¦ Input", text: "Пользователь пишет задачу и жмёт Add или Enter. ¦ Foydalanuvchi vazifani yozib, Add yoki Enter'ni bosadi. ¦ The user types a task and hits Add or Enter." },
        { icon: '🛡️', label: "Проверка ¦ Tekshiruv ¦ Check", text: "Пустые задачи не добавляем. ¦ Bo'sh vazifalarni qo'shmaymiz. ¦ No empty tasks." },
        { icon: '➕', label: "Добавить ¦ Qo'shish ¦ Add", text: "Создаём <li> и кладём в список. ¦ <li> yaratib, ro'yxatga solamiz. ¦ Create an <li> and put it in the list." },
        { icon: '✅', label: "Отметить / удалить ¦ Belgilash / o'chirish ¦ Tick / delete", text: "Клик по тексту — сделано, ✕ — удалить. ¦ Matnga bosish — bajarildi, ✕ — o'chirish. ¦ Click the text to tick, ✕ to delete." },
        { icon: '🔢', label: "Счётчик ¦ Hisoblagich ¦ Counter", text: "Сколько задач осталось. ¦ Nechta vazifa qoldi. ¦ How many tasks are left." },
      ],
      takeaway: "Сначала план словами — потом код. Так проще не запутаться. ¦ Avval so'z bilan reja — keyin kod. Shunda adashib ketmaslik osonroq. ¦ Plan in words first, then code. That keeps you from getting lost.",
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 1,
      title: "Шаг 1: добавляем задачи ¦ 1-qadam: vazifalarni qo'shamiz ¦ Step 1: adding tasks",
      chat: "присылайте задачи — я добавлю! ¦ vazifalarni yuboring — men qo'shaman! ¦ send tasks — I'll add them!",
      task: "✍️ Пишите задачу и жмите Enter ¦ ✍️ Vazifani yozing va Enter'ni bosing ¦ ✍️ Type a task and press Enter",
      steps: [
        { label: "Шаг 1 ¦ 1-qadam ¦ Step 1", html: HTML, css: CSS, js: STEP1 },
      ],
      takeaway: "Событие submit ловит и кнопку, и Enter. preventDefault не даёт странице перезагрузиться. ¦ submit hodisasi tugmani ham, Enter'ni ham ushlaydi. preventDefault sahifani qayta yuklanishga yo'l qo'ymaydi. ¦ The submit event catches both the button and Enter. preventDefault stops a page reload.",
      notes: { say: ["Попробуйте добавить пустую задачу — она добавится. Это баг, чиним на шаге 2."], min: 7 },
    },
    {
      type: 'live',
      stage: 2,
      title: "Шаг 2: отмечаем и удаляем ¦ 2-qadam: belgilaymiz va o'chiramiz ¦ Step 2: ticking and deleting",
      chat: "кликните задачу — она зачеркнётся? ¦ vazifaga bosing — u chiziladimi? ¦ click a task — does it strike through?",
      task: "✍️ Клик по тексту — сделано, ✕ — удалить ¦ ✍️ Matnga bosish — bajarildi, ✕ — o'chirish ¦ ✍️ Click text to tick, ✕ to delete",
      steps: [
        { label: "Шаг 2 ¦ 2-qadam ¦ Step 2", html: HTML, css: CSS, js: STEP2 },
      ],
      takeaway: "trim() убирает пробелы, return останавливает пустой ввод, classList.toggle и remove() делают остальное. ¦ trim() bo'sh joylarni olib tashlaydi, return bo'sh kiritishni to'xtatadi, classList.toggle va remove() qolganini qiladi. ¦ trim() strips spaces, return stops empty input, classList.toggle and remove() do the rest.",
      notes: { say: ["textContent, а не innerHTML для текста задачи — так пользователь не сможет вставить свой HTML-код."], min: 7 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "Два подхода ¦ Ikki yondashuv ¦ Two approaches",
      chat: "почему справа проще посчитать «осталось»? ¦ nega o'ngda «qoldi»ni hisoblash osonroq? ¦ why is “left” easier to count on the right?",
      left: { icon: '🧱', label: "Правим DOM напрямую ¦ DOM'ni to'g'ridan-to'g'ri tahrirlaymiz ¦ Edit the DOM directly", points: ["Данные живут только в HTML ¦ Ma'lumotlar faqat HTML'da yashaydi ¦ Data lives only in the HTML", "Чтобы посчитать — ищем элементы ¦ Hisoblash uchun — elementlarni qidiramiz ¦ To count, search the elements", "Сложно сохранить ¦ Saqlash qiyin ¦ Hard to save"] },
      right: { icon: '📊', label: "Массив + render() ¦ Massiv + render() ¦ Array + render()", points: ["Данные — в массиве tasks ¦ Ma'lumotlar — tasks massivida ¦ Data lives in a tasks array", "render() рисует экран из массива ¦ render() ekranni massivdan chizadi ¦ render() draws the screen from it", "Легко посчитать и сохранить ¦ Hisoblash va saqlash oson ¦ Easy to count and save"] },
      verdict: "Справа — главный принцип современных интерфейсов: данные → экран. Именно так работает React. ¦ O'ngda — zamonaviy interfeyslarning asosiy tamoyili: ma'lumot → ekran. React aynan shunday ishlaydi. ¦ On the right is the core idea of modern UIs: data → screen. That's exactly how React works.",
      notes: { say: ["Это мост к модулю React."], min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Шаг 3: массив и render() ¦ 3-qadam: massiv va render() ¦ Step 3: an array and render()",
      chat: "сколько задач осталось? следите за счётчиком ¦ nechta vazifa qoldi? hisoblagichni kuzating ¦ how many are left? watch the counter",
      task: "✍️ Добавляйте, отмечайте, удаляйте — счётчик считает сам ¦ ✍️ Qo'shing, belgilang, o'chiring — hisoblagich o'zi hisoblaydi ¦ ✍️ Add, tick, delete — the counter updates itself",
      steps: [
        { label: "Шаг 3 ¦ 3-qadam ¦ Step 3", html: HTML, css: CSS, js: STEP3 },
      ],
      takeaway: "Меняем массив → вызываем render() → экран всегда совпадает с данными. ¦ Massivni o'zgartiramiz → render() ni chaqiramiz → ekran doim ma'lumotlarga mos keladi. ¦ Change the array → call render() → the screen always matches the data.",
      notes: { say: ["Покажите tasks в консоли после нескольких действий: console.log(tasks)."], min: 8 },
    },
    {
      type: 'walk',
      stage: 3,
      title: "Разбираем render() ¦ render()ni tahlil qilamiz ¦ Unpacking render()",
      chat: "зачем первой строкой очищать список? ¦ nega birinchi qatorda ro'yxat tozalanadi? ¦ why clear the list on the first line?",
      code: `function render() {\n  list.innerHTML = '';\n  tasks.forEach((task, i) => {\n    // create <li> for each task\n  });\n  const left = tasks.filter((t) => !t.done).length;\n  count.textContent = 'Left: ' + left;\n}`,
      lang: 'js',
      marks: [
        { line: 2, text: "Стираем старый список, иначе задачи будут дублироваться. ¦ Eski ro'yxatni o'chiramiz, aks holda vazifalar takrorlanadi. ¦ Wipe the old list, or tasks would duplicate." },
        { line: 3, text: "forEach — цикл по массиву: task — задача, i — её номер. ¦ forEach — massiv bo'yicha tsikl: task — vazifa, i — uning raqami. ¦ forEach loops the array: task is the item, i its index." },
        { line: 6, text: "filter оставляет невыполненные, length — их количество. ¦ filter bajarilmaganlarni qoldiradi, length — ularning soni. ¦ filter keeps unfinished ones; length counts them." },
      ],
      takeaway: "render() — одна функция, которая знает, как превратить данные в экран. ¦ render() — ma'lumotlarni ekranga aylantirishni biladigan bitta funksiya. ¦ render() is one function that knows how to turn data into a screen.",
      notes: { min: 4 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Баги Todo-list ¦ Todo-list buglari ¦ Todo-list bugs",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Страница перезагружается ¦ Sahifa qayta yuklanadi ¦ The page reloads", lang: 'js', code: `form.addEventListener('submit', () => {\n  tasks.push({ text: input.value, done: false });\n  render();\n});`, line: 1, explain: "Без e.preventDefault() форма отправляется и страница перезагружается — задача пропадает. ¦ e.preventDefault()siz forma yuboriladi va sahifa qayta yuklanadi — vazifa yo'qoladi. ¦ Without e.preventDefault() the form submits and the page reloads — the task vanishes.", fix: `form.addEventListener('submit', (e) => {\n  e.preventDefault();` },
        { title: "Задачи удваиваются ¦ Vazifalar ikkilanadi ¦ Tasks duplicate", lang: 'js', code: `function render() {\n  tasks.forEach((task) => {\n    const li = document.createElement('li');\n    li.textContent = task.text;\n    list.append(li);\n  });\n}`, line: 1, explain: "Список не очищается перед отрисовкой, и каждый render() добавляет всё заново. ¦ Chizishdan oldin ro'yxat tozalanmaydi va har bir render() hammasini qaytadan qo'shadi. ¦ The list isn't cleared first, so each render() adds everything again.", fix: `function render() {\n  list.innerHTML = '';` },
      ],
      takeaway: "preventDefault и очистка перед render() — две строки, без которых Todo «ломается». ¦ preventDefault va render()dan oldin tozalash — ularsiz Todo «buziladigan» ikki qator. ¦ preventDefault and clearing before render() — two lines a Todo can't live without.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: Todo 2.0 ¦ Missiya: Todo 2.0 ¦ Mission: Todo 2.0",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Todo 2.0 выпущен! ¦ Todo 2.0 chiqarildi! ¦ Todo 2.0 shipped!",
      items: [
        { title: "Не добавлять пустые задачи ¦ Bo'sh vazifalarni qo'shmaslik ¦ Skip empty tasks", choices: ["if (!text) return;", "if (text) return;"], correct: 0, explain: "Пустая строка — false, выходим. ¦ Bo'sh satr — false, chiqamiz. ¦ An empty string is false, so we exit." },
        { title: "Где хранить задачи? ¦ Vazifalarni qayerda saqlash kerak? ¦ Where do tasks live?", choices: ["В массиве tasks ¦ tasks massivida ¦ In a tasks array", "Только в <li> ¦ Faqat <li>da ¦ Only in the <li>s"], correct: 0, explain: "Данные → экран. ¦ Ma'lumot → ekran. ¦ Data → screen." },
        { title: "После изменения массива ¦ Massiv o'zgargandan keyin ¦ After changing the array", choices: ["Вызвать render() ¦ render() ni chaqirish ¦ Call render()", "Перезагрузить страницу ¦ Sahifani qayta yuklash ¦ Reload the page"], correct: 0, explain: "render() перерисует экран. ¦ render() ekranni qayta chizadi. ¦ render() redraws the screen." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Todo-list ¦ Xulosa: Todo-list ¦ Summary: a Todo list",
      chat: "какую функцию добавить в Todo 3.0? ¦ Todo 3.0 ga qanday funksiya qo'shamiz? ¦ what feature goes into Todo 3.0?",
      answer: "Todo собран из всего пройденного: событие submit с preventDefault, проверка пустого ввода, createElement, classList.toggle и remove. Лучший подход — хранить задачи в массиве объектов и рисовать экран функцией render(): поменяли данные — вызвали render(). Это главный принцип, на котором построен React. ¦ Todo o'tilgan barcha narsalardan yig'ilgan: preventDefault bilan submit hodisasi, bo'sh kiritishni tekshirish, createElement, classList.toggle va remove. Eng yaxshi yondashuv — vazifalarni obyektlar massivida saqlash va ekranni render() funksiyasi bilan chizish: ma'lumotni o'zgartirdik — render() ni chaqirdik. Bu React qurilgan asosiy tamoyil. ¦ The Todo uses everything so far: a submit event with preventDefault, an empty-input check, createElement, classList.toggle and remove. The best approach keeps tasks in an array of objects and draws the screen with render(): change the data, call render(). That's the core idea React is built on.",
      icon: '📝',
      badge: "Строитель приложений ¦ Ilova quruvchi ¦ App builder",
      badgeSub: "JavaScript · техническая 6 ¦ JavaScript · texnik 6 ¦ JavaScript · technical 6",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте кнопку «Удалить выполненные». ¦ «Bajarilganlarni o'chirish» tugmasini qo'shing. ¦ Add a “Clear completed” button.",
        "Добавьте фильтры «Все / Активные / Готовые». ¦ «Hammasi / Faol / Tayyor» filtrlarini qo'shing. ¦ Add “All / Active / Done” filters.",
      ],
      takeaway: "Проблема: обновите страницу — задачи пропали. Чиним в следующей теме с LocalStorage! ¦ Muammo: sahifani yangilang — vazifalar yo'qoldi. Keyingi mavzuda LocalStorage bilan tuzatamiz! ¦ The catch: reload and the tasks vanish. We fix that next time with LocalStorage!",
      notes: { say: ["Покажите: перезагрузка стирает задачи — интрига к следующему уроку."], min: 2 },
    },
  ],
});
