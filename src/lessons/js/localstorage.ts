import { kit } from '@engine/kit';

const HTML = `<div class="app">
  <h2>📝 My tasks <small>💾 saved</small></h2>
  <form id="form">
    <input id="input" placeholder="New task…" autocomplete="off">
    <button>Add</button>
  </form>
  <ul id="list"></ul>
  <p id="count"></p>
</div>`;
const CSS = `body{margin:0;font-family:system-ui;min-height:100vh;display:grid;place-items:center;background:linear-gradient(160deg,#1b2150,#5b3df5)}
.app{background:#fff;border-radius:20px;padding:22px;width:380px;box-shadow:0 12px 40px #0004}
h2{margin:0 0 12px}h2 small{font-size:13px;color:#2e9d5b;vertical-align:middle}
form{display:flex;gap:8px}input{flex:1;padding:10px;border:1px solid #cfd5e6;border-radius:10px;font-size:16px}
button{padding:10px 14px;border:0;border-radius:10px;background:#1b2150;color:#fff;font-weight:700}
ul{list-style:none;padding:0;margin:14px 0 0}
li{display:flex;align-items:center;gap:10px;padding:10px;border-bottom:1px solid #eef1f7;font-size:17px}
li span{flex:1;cursor:pointer}li.done span{text-decoration:line-through;color:#9aa1b5}
li button{background:#ff6f91;padding:4px 10px}#count{color:#6b7390;margin:10px 0 0}`;
const TODO = `const form = document.querySelector('#form');
const input = document.querySelector('#input');
const list = document.querySelector('#list');

// 1. Load: saved tasks or an empty list
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 2. Save after every change
function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  list.innerHTML = '';
  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';
    li.innerHTML = '<span></span><button>✕</button>';
    li.querySelector('span').textContent = task.text;
    li.querySelector('span').onclick = () => { task.done = !task.done; save(); render(); };
    li.querySelector('button').onclick = () => { tasks.splice(i, 1); save(); render(); };
    list.append(li);
  });
  document.querySelector('#count').textContent =
    'Left: ' + tasks.filter((t) => !t.done).length;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  input.value = '';
  save();
  render();
});

render();`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.two{display:grid;grid-template-columns:1fr 1fr;gap:18px;width:560px}
.pg,.st{border-radius:18px;background:#fff;box-shadow:0 10px 30px #0001;overflow:hidden}
.pg .h,.st .h{padding:8px 14px;background:#eceef3;font:800 14px JetBrains Mono,monospace;color:#6b7183}
.pg .b{padding:24px 16px;text-align:center;font-size:22px;font-weight:800;min-height:90px}
.st .r{display:grid;grid-template-columns:70px 1fr;gap:8px;padding:10px 14px;border-top:2px solid #eceef3;font:700 15px JetBrains Mono,monospace;word-break:break-all}
.st .r b{color:#e9a400}.st .e{padding:18px 14px;color:#c3c7d2;font:700 15px JetBrains Mono,monospace}
.rl .pg .b{animation:__pop .5s}`;
const view = (page: string, rows: [string, string][], reload = false) =>
  `<div class="wrap"><div class="two ${reload ? 'rl' : ''}"><div class="pg"><div class="h">🌐 page ${reload ? '🔄' : ''}</div><div class="b">${page}</div></div><div class="st"><div class="h">💾 localStorage</div>${rows.length ? rows.map(([k, v]) => `<div class="r"><b>${k}</b><span>${v}</span></div>`).join('') : '<div class="e">(empty)</div>'}</div></div></div>`;

export default kit({
  id: 'js-t07',
  title: "LocalStorage: память браузера ¦ LocalStorage: brauzer xotirasi ¦ LocalStorage: the browser's memory",
  question: "Как сделать, чтобы данные не пропадали после перезагрузки страницы? ¦ Sahifa qayta yuklangandan keyin ma'lumotlar yo'qolmasligi uchun nima qilish kerak? ¦ How do you keep data after a page reload?",
  route: ["Забывчивость ¦ Unutuvchanlik ¦ Forgetting", "Сохранить ¦ Saqlash ¦ Saving", "Списки ¦ Ro'yxatlar ¦ Lists", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '💾',
      kicker: "JavaScript · техническая тема 7 ¦ JavaScript · texnik mavzu 7 ¦ JavaScript · technical topic 7",
      title: "Страница с плохой памятью ¦ Xotirasi yomon sahifa ¦ A page with a bad memory",
      chat: "у вас пропадал список дел после обновления? ¦ yangilangandan keyin ishlar ro'yxatingiz yo'qolganmi? ¦ has your to-do list vanished after a refresh?",
      lead: "Переменные живут, пока открыта страница. Нажали «обновить» — всё забыто. localStorage — маленький блокнот внутри браузера, который помнит данные даже после перезагрузки. ¦ O'zgaruvchilar sahifa ochiq ekan yashaydi. «Yangilash» bosildi — hammasi unutildi. localStorage — brauzer ichidagi kichik daftar, u ma'lumotlarni qayta yuklangandan keyin ham eslab qoladi. ¦ Variables only live while the page is open; refresh and they're gone. localStorage is a little notebook inside the browser that remembers data even after a reload.",
      facts: ["setItem — записать ¦ setItem — yozish ¦ setItem: write", "getItem — прочитать ¦ getItem — o'qish ¦ getItem: read", "Хранит только текст ¦ Faqat matn saqlaydi ¦ Stores text only"],
      takeaway: "Сравним: переменная против localStorage. ¦ Solishtiramiz: o'zgaruvchi localStorage'ga qarshi. ¦ Let's compare a variable with localStorage.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Обновили страницу — что осталось? ¦ Sahifani yangiladik — nima qoldi? ¦ After a refresh, what's left?",
      chat: "что выживет после 🔄? ¦ 🔄 dan keyin nima omon qoladi? ¦ what survives 🔄?",
      actors: [
        { id: 'v', icon: '🧠', label: "Переменная ¦ O'zgaruvchi ¦ Variable" },
        { id: 'ls', icon: '💾', label: 'localStorage' },
        { id: 'a', text: "name = 'Lola'" },
        { id: 'b', text: "name = 'Lola'" },
        { id: 'r', icon: '🔄', label: "Обновить ¦ Yangilash ¦ Refresh" },
      ],
      steps: [
        { say: "Запомнили имя в двух местах. ¦ Ismni ikki joyda eslab qoldik. ¦ We store the name in two places.", at: { v: [24, 40, 1.2], ls: [76, 40, 1.2], a: [24, 76], b: [76, 76] } },
        { say: "Жмём «обновить»… ¦ «Yangilash»ni bosamiz… ¦ Press refresh…", at: { r: [50, 14, 1.2] }, pulse: ['r'] },
        { say: "Переменная всё забыла, а localStorage помнит! ¦ O'zgaruvchi hammasini unutdi, localStorage esa eslab qoldi! ¦ The variable forgot everything; localStorage remembers!", set: { a: { text: "undefined 🤷" }, b: { text: "name = 'Lola' ✅" } }, pulse: ['b'] },
      ],
      takeaway: "Переменная — память на один раз. localStorage — блокнот, который остаётся. ¦ O'zgaruvchi — bir martalik xotira. localStorage — qoladigan daftar. ¦ A variable is one-time memory; localStorage is a notebook that stays.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Записать и прочитать ¦ Yozish va o'qish ¦ Write and read",
      chat: "какое имя сохраним? ¦ qaysi ismni saqlaymiz? ¦ which name shall we save?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "// new visitor", html: view('Hello, guest!', []), say: "Новый посетитель, блокнот пуст. ¦ Yangi tashrif buyuruvchi, daftar bo'sh. ¦ A new visitor; the notebook is empty." },
        { code: "localStorage.setItem('name', 'Lola');", line: 1, html: view('Hello, Lola! 👋', [['name', 'Lola']]), say: "setItem: записали пару «ключ — значение». ¦ setItem: «kalit — qiymat» juftini yozdik. ¦ setItem writes a key–value pair." },
        { code: "// 🔄 refresh\nconst name = localStorage.getItem('name');", line: 2, html: view('Welcome back, Lola! 🎉', [['name', 'Lola']], true), say: "Обновили страницу — getItem достал имя. «С возвращением!» ¦ Sahifani yangiladik — getItem ismni chiqardi. «Xush kelibsiz!» ¦ After a refresh, getItem reads the name back: “Welcome back!”" },
        { code: "localStorage.removeItem('name');", line: 1, html: view('Hello, guest!', []), say: "removeItem — стёрли запись. ¦ removeItem — yozuvni o'chirdik. ¦ removeItem erases the entry." },
      ],
      takeaway: "setItem — записать, getItem — прочитать, removeItem — стереть. ¦ setItem — yozish, getItem — o'qish, removeItem — o'chirish. ¦ setItem writes, getItem reads, removeItem erases.",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Список → текст → список ¦ Ro'yxat → matn → ro'yxat ¦ List → text → list",
      chat: "почему список нельзя положить как есть? ¦ nega ro'yxatni shundayligicha qo'yib bo'lmaydi? ¦ why can't we store a list as it is?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "const tasks = ['Bread', 'Homework'];\nlocalStorage.setItem('tasks', tasks);", line: 2, html: view('2 tasks', [['tasks', 'Bread,Homework 😕']]), say: "localStorage хранит только текст — список превратился в «Bread,Homework». ¦ localStorage faqat matn saqlaydi — ro'yxat «Bread,Homework»ga aylandi. ¦ localStorage stores only text — the list became “Bread,Homework”." },
        { code: "localStorage.setItem('tasks',\n  JSON.stringify(tasks));", line: 2, html: view('2 tasks', [['tasks', '["Bread","Homework"]']]), say: "JSON.stringify аккуратно упаковывает список в текст. ¦ JSON.stringify ro'yxatni matnga tartibli joylaydi. ¦ JSON.stringify packs the list neatly into text." },
        { code: "const saved = JSON.parse(\n  localStorage.getItem('tasks'));", line: 1, html: view('✅ Bread<br>✅ Homework', [['tasks', '["Bread","Homework"]']], true), say: "JSON.parse распаковывает обратно в список — после перезагрузки дела на месте! ¦ JSON.parse uni yana ro'yxatga ochadi — qayta yuklangandan keyin ishlar joyida! ¦ JSON.parse unpacks it into a list — after a refresh the tasks are back!" },
      ],
      takeaway: "Сохранить: JSON.stringify. Прочитать: JSON.parse. ¦ Saqlash: JSON.stringify. O'qish: JSON.parse. ¦ Save with JSON.stringify; read with JSON.parse.",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 3,
      console: true,
      title: "Счётчик визитов ¦ Tashriflar hisoblagichi ¦ A visit counter",
      chat: "нажмите «Запустить» несколько раз — что происходит с числом? ¦ «Ishga tushirish»ni bir necha marta bosing — raqam bilan nima bo'ladi? ¦ press Run a few times — what happens to the number?",
      task: "✍️ ▶ Запуск = перезагрузка страницы. Запустите 3 раза ¦ ✍️ ▶ Ishga tushirish = sahifani qayta yuklash. 3 marta ishga tushiring ¦ ✍️ ▶ Run = a page reload. Run it 3 times",
      steps: [
        { label: "Переменная ¦ O'zgaruvchi ¦ Variable", js: `let visits = 0;\nvisits = visits + 1;\nconsole.log('Visit #' + visits);` },
        { label: "LocalStorage ¦ LocalStorage ¦ LocalStorage", js: `let visits = Number(localStorage.getItem('visits')) || 0;\nvisits = visits + 1;\nlocalStorage.setItem('visits', visits);\nconsole.log('Visit #' + visits);` },
        { label: "Сброс ¦ Tozalash ¦ Reset", js: `localStorage.removeItem('visits');\nconsole.log('🧹 Counter reset:', localStorage.getItem('visits'));` },
      ],
      takeaway: "Переменная каждый раз начинает с нуля, а LocalStorage помнит прошлое значение. ¦ O'zgaruvchi har safar noldan boshlanadi, LocalStorage esa oldingi qiymatni eslab qoladi. ¦ The variable restarts at zero each time; LocalStorage remembers the last value.",
      notes: { say: ["Шаг 1: всегда «Visit #1». Шаг 2: 1, 2, 3… Шаг 3: сброс."], min: 6 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Todo, который помнит ¦ Eslab qoladigan Todo ¦ A Todo that remembers",
      chat: "добавьте задачи и нажмите «Запустить» — они остались? ¦ vazifalar qo'shing va «Ishga tushirish»ni bosing — ular qoldimi? ¦ add tasks and press Run — are they still there?",
      task: "✍️ Добавьте задачи, затем ▶ Запуск (= перезагрузка) ¦ ✍️ Vazifalar qo'shing, keyin ▶ Ishga tushirish (= qayta yuklash) ¦ ✍️ Add tasks, then ▶ Run (= reload)",
      steps: [
        { label: "Todo + LocalStorage ¦ Todo + LocalStorage ¦ Todo + LocalStorage", html: HTML, css: CSS, js: TODO },
      ],
      takeaway: "Две новые строки — load и save() — и задачи переживают перезагрузку. ¦ Ikkita yangi qator — load va save() — va vazifalar qayta yuklashdan omon qoladi. ¦ Two new pieces — load and save() — and tasks survive reloads.",
      notes: { say: ["Это код прошлого урока + две части: загрузка и save(). Сравните с версией без памяти."], min: 8 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "localStorage видят все посетители сайта ¦ localStorage'ni saytning barcha tashrif buyuruvchilari ko'radi ¦ All visitors share localStorage", truth: false, explain: "Он свой у каждого браузера. ¦ U har bir brauzerda o'zgacha. ¦ Each browser has its own." },
        { text: "Пароли можно хранить в localStorage ¦ Parollarni localStorage'da saqlash mumkin ¦ Passwords are fine in localStorage", truth: false, explain: "Нет — его легко прочитать. Только настройки и дела. ¦ Yo'q — uni o'qish oson. Faqat sozlamalar va ishlar. ¦ No — it's easy to read. Use it for settings and tasks only." },
        { text: "После очистки браузера данные пропадут ¦ Brauzer tozalangandan keyin ma'lumotlar yo'qoladi ¦ Clearing the browser erases the data", truth: true, explain: "Это не облако, а память браузера. ¦ Bu bulut emas, brauzer xotirasi. ¦ It's browser memory, not the cloud." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: список, который помнит ¦ Missiya: eslab qoladigan ro'yxat ¦ Mission: a list that remembers",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Дела не пропадают! ¦ Ishlar yo'qolmaydi! ¦ Tasks never vanish!",
      items: [
        { title: "Сохранить тему 'dark' ¦ 'dark' mavzusini saqlash ¦ Save the theme 'dark'", choices: ["localStorage.setItem('theme', 'dark')", "let theme = 'dark'"], correct: 0, explain: "Переменная забудет после 🔄. ¦ O'zgaruvchi 🔄 dan keyin unutadi. ¦ A variable forgets after 🔄." },
        { title: "Сохранить массив дел ¦ Ishlar massivini saqlash ¦ Save an array of tasks", choices: ['JSON.stringify(tasks)', 'tasks.toString()'], correct: 0, explain: "stringify сохраняет структуру. ¦ stringify tuzilmani saqlaydi. ¦ stringify keeps the structure." },
        { title: "Что не кладём в localStorage? ¦ localStorage'ga nimani qo'ymaymiz? ¦ What never goes in localStorage?", choices: ["Пароли ¦ Parollar ¦ Passwords", "Тёмную тему ¦ Qorong'i mavzu ¦ Dark-mode setting"], correct: 0, explain: "Секреты — не в браузере. ¦ Sirlar — brauzerda emas. ¦ Secrets don't belong there." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: LocalStorage ¦ Xulosa: LocalStorage ¦ Summary: LocalStorage",
      chat: "что сохраните в localStorage на своём сайте? ¦ saytingizda localStorage'da nimani saqlaysiz? ¦ what will you keep in localStorage on your site?",
      answer: "Переменные забываются после перезагрузки, а localStorage — блокнот браузера, который помнит. setItem('ключ', 'значение') записывает, getItem читает, removeItem стирает. Хранит он только текст, поэтому списки сохраняем через JSON.stringify и читаем через JSON.parse. Он свой у каждого браузера, и пароли в нём не храним. ¦ O'zgaruvchilar qayta yuklangandan keyin unutiladi, localStorage esa eslab qoladigan brauzer daftari. setItem('kalit', 'qiymat') yozadi, getItem o'qiydi, removeItem o'chiradi. U faqat matn saqlaydi, shuning uchun ro'yxatlarni JSON.stringify orqali saqlab, JSON.parse orqali o'qiymiz. U har bir brauzerda o'zgacha va unda parollarni saqlamaymiz. ¦ Variables are forgotten on reload; localStorage is the browser's notebook that remembers. setItem('key', 'value') writes, getItem reads, removeItem erases. It only holds text, so save lists with JSON.stringify and read them with JSON.parse. Each browser has its own, and passwords never go in it.",
      icon: '💾',
      badge: "Хранитель памяти ¦ Xotira qo'riqchisi ¦ Memory keeper",
      badgeSub: "JavaScript · техническая 7 ¦ JavaScript · texnik 7 ¦ JavaScript · technical 7",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сохраните выбранную тему (светлая/тёмная) в localStorage. ¦ Tanlangan mavzuni (yorug'/qorong'i) localStorage'da saqlang. ¦ Save the chosen theme (light/dark) in localStorage.",
        "Сделайте счётчик посещений: +1 при каждом открытии. ¦ Tashriflar hisoblagichini yasang: har ochilganda +1. ¦ Make a visit counter: +1 on every open.",
      ],
      takeaway: "Технические темы JS пройдены! Дальше — общие темы. ¦ JS texnik mavzulari tugadi! Keyingisi — umumiy mavzular. ¦ JS technical topics done! Next: general topics.",
      notes: { min: 2 },
    },
  ],
});
