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

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.app{width:400px;padding:22px;border-radius:20px;background:#fff;box-shadow:0 12px 40px #0002}
.app h3{margin:0 0 12px;font-size:24px}
.in{display:flex;gap:8px;margin-bottom:12px}.in span{flex:1;padding:10px 12px;border:2px solid #e6e8ee;border-radius:10px;font-size:18px;color:#16181f}.in b{padding:10px 14px;border-radius:10px;background:#16181f;color:#fff}
.li{display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:2px solid #eef1f7;font-size:19px}
.li span{flex:1}.li.done span{text-decoration:line-through;color:#9aa1b5}.li i{font-style:normal;padding:2px 10px;border-radius:8px;background:#ff6f91;color:#fff;font-weight:800}
.cnt{margin-top:10px;color:#6b7183;font-weight:700}`;
const app = (typed: string, items: [string, boolean][]) =>
  `<div class="wrap"><div class="app"><h3>📝 My tasks</h3><div class="in"><span>${typed || '&nbsp;'}</span><b>Add</b></div>${items.map(([t, d]) => `<div class="li ${d ? 'done' : ''}"><span>${t}</span><i>✕</i></div>`).join('')}<div class="cnt">${items.filter(([, d]) => !d).length} left</div></div></div>`;

export default kit({
  id: 'js-t06',
  title: "Todo-list: первое настоящее приложение ¦ Todo-list: birinchi haqiqiy ilova ¦ A to-do list: your first real app",
  question: "Как из переменных, функций и DOM собрать работающее приложение? ¦ O'zgaruvchilar, funksiyalar va DOM'dan ishlaydigan ilovani qanday yig'ish mumkin? ¦ How do variables, functions and the DOM combine into a working app?",
  route: ["Устройство ¦ Tuzilishi ¦ How it works", "Действия ¦ Harakatlar ¦ Actions", "Сборка ¦ Yig'ish ¦ Building", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '📝',
      kicker: "JavaScript · техническая тема 6 ¦ JavaScript · texnik mavzu 6 ¦ JavaScript · technical topic 6",
      title: "Собираем всё вместе ¦ Hammasini birga yig'amiz ¦ Putting it all together",
      chat: "какие дела вы бы записали в список? ¦ ro'yxatga qanday ishlarni yozgan bo'lardingiz? ¦ what tasks would you put on the list?",
      lead: "Todo-list — классика: добавить дело, отметить сделанным, удалить. Внутри — всё, что мы уже знаем: список в переменной, функции и DOM. ¦ Todo-list — klassika: ish qo'shish, bajarilgan deb belgilash, o'chirish. Ichida — biz allaqachon biladigan hamma narsa: o'zgaruvchidagi ro'yxat, funksiyalar va DOM. ¦ A to-do list is a classic: add a task, mark it done, delete it. Inside is everything we know: a list in a variable, functions and the DOM.",
      facts: ["Добавить ¦ Qo'shish ¦ Add", "Отметить сделанным ¦ Bajarilgan deb belgilash ¦ Mark done", "Удалить и посчитать ¦ O'chirish va sanash ¦ Delete and count"],
      takeaway: "Смотрим, как данные бегут по приложению. ¦ Ma'lumotlar ilova bo'ylab qanday yugurishini ko'ramiz. ¦ Watch data flow through the app.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Путь одного дела ¦ Bitta ishning yo'li ¦ The journey of one task",
      chat: "где хранится список, пока страница открыта? ¦ sahifa ochiq ekan, ro'yxat qayerda saqlanadi? ¦ where does the list live while the page is open?",
      actors: [
        { id: 'in', icon: '✍️', label: "Поле ввода ¦ Kiritish maydoni ¦ Input" },
        { id: 'arr', icon: '📦', label: "Массив tasks ¦ tasks massivi ¦ tasks array" },
        { id: 'fn', icon: '⚙️', label: 'render()' },
        { id: 'ui', icon: '📋', label: "Список на экране ¦ Ekrandagi ro'yxat ¦ List on screen" },
        { id: 't', text: "🛒 Buy bread" },
      ],
      steps: [
        { say: "Вы пишете «Buy bread» и жмёте Add. ¦ «Buy bread» deb yozib, Add'ni bosasiz. ¦ You type “Buy bread” and press Add.", at: { in: [12, 50], t: [12, 20, 0.8] } },
        { say: "Дело попадает в массив tasks — список в памяти. ¦ Ish tasks massiviga — xotiradagi ro'yxatga tushadi. ¦ The task goes into the tasks array — a list in memory.", at: { arr: [38, 50], t: [38, 20, 0.8] }, lines: [['in', 'arr', 'push']] },
        { say: "Функция render берёт массив и рисует список. ¦ render funksiyasi massivni olib, ro'yxatni chizadi. ¦ The render function takes the array and draws the list.", at: { fn: [64, 50] }, lines: [['in', 'arr', 'push'], ['arr', 'fn']] },
        { say: "Дело появилось на экране! ¦ Ish ekranda paydo bo'ldi! ¦ The task appears on screen!", at: { ui: [88, 50, 1.2], t: [88, 20, 0.8] }, lines: [['in', 'arr', 'push'], ['arr', 'fn'], ['fn', 'ui']], pulse: ['ui'] },
      ],
      takeaway: "Данные (массив) → render() → экран. Меняем данные — перерисовываем. ¦ Ma'lumotlar (massiv) → render() → ekran. Ma'lumotlarni o'zgartiramiz — qayta chizamiz. ¦ Data (array) → render() → screen. Change the data, redraw.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Три действия списка ¦ Ro'yxatning uchta harakati ¦ The list's three actions",
      chat: "какое дело добавим? ¦ qaysi ishni qo'shamiz? ¦ which task shall we add?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "tasks.push({ text: 'Buy bread', done: false });\nrender();", line: 1, html: app('', [['🛒 Buy bread', false]]), say: "Добавить: push кладёт дело в конец массива. ¦ Qo'shish: push ishni massiv oxiriga qo'yadi. ¦ Add: push puts the task at the end of the array." },
        { code: "tasks.push({ text: 'Homework', done: false });\nrender();", line: 1, html: app('', [['🛒 Buy bread', false], ['📚 Homework', false]]), say: "Ещё одно дело — счётчик «2 left». ¦ Yana bitta ish — «2 left» hisoblagichi. ¦ Another task — the counter shows “2 left”." },
        { code: "tasks[0].done = true;\nrender();", line: 1, html: app('', [['🛒 Buy bread', true], ['📚 Homework', false]]), say: "Отметить: done = true — дело зачёркнуто, осталось 1. ¦ Belgilash: done = true — ish chizildi, 1 ta qoldi. ¦ Mark done: done = true strikes it through — 1 left." },
        { code: "tasks.splice(0, 1);\nrender();", line: 1, html: app('', [['📚 Homework', false]]), say: "Удалить: splice убирает дело из массива. ¦ O'chirish: splice ishni massivdan olib tashlaydi. ¦ Delete: splice removes the task from the array." },
      ],
      takeaway: "Каждое действие: изменить массив → вызвать render(). ¦ Har bir harakat: massivni o'zgartirish → render() chaqirish. ¦ Each action: change the array → call render().",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 3,
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
      stage: 3,
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
      type: 'mission',
      stage: 4,
      title: "Миссия: улучшить список ¦ Missiya: ro'yxatni yaxshilash ¦ Mission: improve the list",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Список удобный и без ошибок! ¦ Ro'yxat qulay va xatosiz! ¦ The list is handy and bug-free!",
      items: [
        { title: "Добавить дело в массив ¦ Ishni massivga qo'shish ¦ Add a task to the array", choices: ['tasks.push(task)', 'tasks.remove(task)'], correct: 0, explain: "push — в конец. ¦ push — oxiriga. ¦ push adds to the end." },
        { title: "После изменения массива ¦ Massiv o'zgargandan keyin ¦ After changing the array", choices: ['render()', "Ничего ¦ Hech narsa ¦ Nothing"], correct: 0, explain: "Иначе экран не обновится. ¦ Aks holda ekran yangilanmaydi. ¦ Otherwise the screen won't update." },
        { title: "Страница перезагружается при Add ¦ Add bosilganda sahifa qayta yuklanadi ¦ The page reloads on Add", choices: ['e.preventDefault()', 'e.reload()'], correct: 0, explain: "Отменяем стандартную отправку формы. ¦ Formaning standart yuborilishini bekor qilamiz. ¦ Cancel the form's default submit." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Todo-list ¦ Xulosa: Todo-list ¦ Summary: the to-do list",
      chat: "какую функцию добавите в свой список? ¦ ro'yxatingizga qanday funksiya qo'shasiz? ¦ what feature will you add to your list?",
      answer: "Todo-list соединяет всё изученное: дела хранятся в массиве tasks, функция render() рисует их на экране, а события формы и кнопок меняют массив. Добавить — push, отметить — done = true, удалить — splice, и после каждого изменения снова вызываем render(). e.preventDefault() не даёт форме перезагрузить страницу. ¦ Todo-list o'rganilgan hamma narsani birlashtiradi: ishlar tasks massivida saqlanadi, render() funksiyasi ularni ekranga chizadi, forma va tugmalar hodisalari esa massivni o'zgartiradi. Qo'shish — push, belgilash — done = true, o'chirish — splice, va har bir o'zgarishdan keyin yana render() chaqiramiz. e.preventDefault() formaga sahifani qayta yuklashga yo'l qo'ymaydi. ¦ A to-do list ties everything together: tasks live in the tasks array, render() draws them, and form and button events change the array. Add with push, mark done with done = true, delete with splice, and call render() after every change. e.preventDefault() stops the form reloading the page.",
      icon: '📝',
      badge: "Создатель приложений ¦ Ilovalar yaratuvchisi ¦ App maker",
      badgeSub: "JavaScript · техническая 6 ¦ JavaScript · texnik 6 ¦ JavaScript · technical 6",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте кнопку «Удалить все сделанные». ¦ «Bajarilganlarning hammasini o'chirish» tugmasini qo'shing. ¦ Add a “Clear completed” button.",
        "Не давайте добавлять пустое дело. ¦ Bo'sh ishni qo'shishga yo'l qo'ymang. ¦ Don't allow empty tasks.",
      ],
      takeaway: "Дальше: как сделать, чтобы список не пропадал после перезагрузки. ¦ Keyingisi: ro'yxat qayta yuklangandan keyin yo'qolmasligi uchun nima qilish kerak. ¦ Next: keeping the list after a reload.",
      notes: { min: 2 },
    },
  ],
});
