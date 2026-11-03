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

export default kit({
  id: 'js-t07',
  title: "LocalStorage ¦ LocalStorage ¦ LocalStorage",
  question: "Как сделать, чтобы список задач не пропадал после перезагрузки страницы? ¦ Vazifalar ro'yxati sahifa qayta yuklangandan keyin yo'qolmasligi uchun nima qilish kerak? ¦ How do you keep a to-do list from vanishing when the page reloads?",
  route: ["Проблема ¦ Muammo ¦ The problem", "setItem / getItem ¦ setItem / getItem ¦ setItem / getItem", "JSON ¦ JSON ¦ JSON", "Todo с памятью ¦ Xotirali Todo ¦ Todo with memory", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '💾',
      kicker: "JavaScript · техническая тема 7 ¦ JavaScript · texnik mavzu 7 ¦ JavaScript · technical topic 7",
      title: "Сайт с памятью ¦ Xotirali sayt ¦ A site with a memory",
      chat: "какие сайты помнят вас после закрытия вкладки? ¦ qaysi saytlar yorliqni yopgandan keyin ham sizni eslab qoladi? ¦ which sites remember you after you close the tab?",
      lead: "Переменные живут, пока открыта страница. Перезагрузили — всё пропало. LocalStorage — маленькое хранилище прямо в браузере: данные остаются даже после перезагрузки и закрытия вкладки. ¦ O'zgaruvchilar sahifa ochiq turganda yashaydi. Qayta yukladik — hammasi yo'qoldi. LocalStorage — to'g'ridan-to'g'ri brauzerdagi kichik ombor: ma'lumotlar qayta yuklash va yorliqni yopgandan keyin ham qoladi. ¦ Variables live while the page is open. Reload and they're gone. LocalStorage is a small store inside the browser: data stays after reloads and closing the tab.",
      facts: ["Ключ → значение ¦ Kalit → qiymat ¦ Key → value", "Хранит только строки ¦ Faqat satrlarni saqlaydi ¦ Stores only strings", "Свой у каждого сайта и браузера ¦ Har bir sayt va brauzerda o'ziniki ¦ Separate per site and browser"],
      takeaway: "Сегодня научим наш Todo-list помнить задачи. ¦ Bugun Todo-list'imizni vazifalarni eslab qolishga o'rgatamiz. ¦ Today we'll teach our Todo list to remember.",
      notes: { say: ["В редакторе урока кнопка «▶ Запустить» работает как перезагрузка страницы — данные хранилища сохраняются между запусками."], min: 3 },
    },
    {
      type: 'cheatsheet',
      stage: 1,
      title: "Четыре команды LocalStorage ¦ LocalStorage'ning to'rtta buyrug'i ¦ Four LocalStorage commands",
      chat: "какой командой удалить одну запись? ¦ bitta yozuvni qaysi buyruq bilan o'chirish mumkin? ¦ which command deletes one entry?",
      sheetTitle: "localStorage ¦ localStorage ¦ localStorage",
      items: [
        { icon: '💾', text: "Сохранить ¦ Saqlash ¦ Save", code: "localStorage.setItem('name', 'Lola')" },
        { icon: '📖', text: "Прочитать ¦ O'qish ¦ Read", code: "localStorage.getItem('name')" },
        { icon: '🗑️', text: "Удалить одну ¦ Bittasini o'chirish ¦ Remove one", code: "localStorage.removeItem('name')" },
        { icon: '🧹', text: "Очистить всё ¦ Hammasini tozalash ¦ Clear all", code: 'localStorage.clear()' },
      ],
      takeaway: "Если ключа нет, getItem вернёт null. ¦ Kalit bo'lmasa, getItem null qaytaradi. ¦ If the key doesn't exist, getItem returns null.",
      notes: { say: ["Покажите DevTools → Application → Local Storage на любом сайте."], min: 3 },
    },
    {
      type: 'live',
      stage: 1,
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
      type: 'output',
      stage: 2,
      title: "Ловушка: только строки ¦ Tuzoq: faqat satrlar ¦ The trap: strings only",
      chat: "пишите ответ до того, как я покажу ¦ men ko'rsatishimdan oldin javob yozing ¦ write your answer before I reveal it",
      snippets: [
        { label: "Массив без JSON ¦ JSON'siz massiv ¦ An array without JSON", code: `localStorage.setItem('tasks', ['milk', 'bread']);\nconsole.log(localStorage.getItem('tasks'));\nconsole.log(typeof localStorage.getItem('tasks'));`, output: ['milk,bread', 'string'], explain: "Массив превратился в строку «milk,bread» — структура потерялась. ¦ Massiv «milk,bread» satriga aylandi — tuzilma yo'qoldi. ¦ The array became the string “milk,bread” — the structure is lost." },
        { label: "С JSON ¦ JSON bilan ¦ With JSON", code: `const tasks = [{ text: 'milk', done: false }];\nlocalStorage.setItem('tasks', JSON.stringify(tasks));\nconst back = JSON.parse(localStorage.getItem('tasks'));\nconsole.log(back[0].text, back[0].done);`, output: ['milk false'], explain: "JSON.stringify — объект в строку, JSON.parse — строку обратно в объект. ¦ JSON.stringify — obyektni satrga, JSON.parse — satrni qaytadan obyektga. ¦ JSON.stringify turns objects into strings; JSON.parse turns them back." },
      ],
      takeaway: "Массивы и объекты сохраняем через JSON.stringify, читаем через JSON.parse. ¦ Massiv va obyektlarni JSON.stringify orqali saqlaymiz, JSON.parse orqali o'qiymiz. ¦ Save arrays and objects with JSON.stringify, read them with JSON.parse.",
      notes: { say: ["Сначала ответы чата."], min: 5 },
    },
    {
      type: 'flow',
      stage: 2,
      title: "Цикл памяти ¦ Xotira tsikli ¦ The memory cycle",
      chat: "на каком шаге задачи переживают перезагрузку? ¦ vazifalar qaysi qadamda qayta yuklashdan omon qoladi? ¦ at which step do tasks survive a reload?",
      nodes: [
        { icon: '📂', label: "Загрузить ¦ Yuklash ¦ Load", text: "При старте: JSON.parse(getItem('tasks')) || []. ¦ Boshlanishda: JSON.parse(getItem('tasks')) || []. ¦ On start: JSON.parse(getItem('tasks')) || []." },
        { icon: '✏️', label: "Изменить ¦ O'zgartirish ¦ Change", text: "Добавили, отметили или удалили задачу. ¦ Vazifani qo'shdik, belgiladik yoki o'chirdik. ¦ Add, tick or delete a task." },
        { icon: '💾', label: "Сохранить ¦ Saqlash ¦ Save", text: "setItem('tasks', JSON.stringify(tasks)). ¦ setItem('tasks', JSON.stringify(tasks)). ¦ setItem('tasks', JSON.stringify(tasks))." },
        { icon: '🖼️', label: "Нарисовать ¦ Chizish ¦ Render", text: "render() показывает актуальный список. ¦ render() dolzarb ro'yxatni ko'rsatadi. ¦ render() shows the current list." },
      ],
      takeaway: "Загрузили один раз → после каждого изменения save() и render(). ¦ Bir marta yukladik → har bir o'zgarishdan keyin save() va render(). ¦ Load once → after every change, save() and render().",
      notes: { min: 3 },
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
      type: 'bugs',
      stage: 3,
      title: "Найдите баг ¦ Xatoni toping ¦ Find the bug",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Первый запуск — ошибка ¦ Birinchi ishga tushirish — xato ¦ Error on first launch", lang: 'js', code: `let tasks = JSON.parse(localStorage.getItem('tasks'));\ntasks.push({ text: 'New', done: false });`, line: 1, explain: "При первом запуске ключа нет → null, и tasks.push падает. Нужен запасной вариант || []. ¦ Birinchi ishga tushirishda kalit yo'q → null, va tasks.push xato beradi. Zaxira variant || [] kerak. ¦ On first launch there's no key → null, and tasks.push crashes. Add a fallback || [].", fix: `let tasks = JSON.parse(localStorage.getItem('tasks')) || [];` },
        { title: "Удалённое возвращается ¦ O'chirilgan qaytib keladi ¦ Deleted items come back", lang: 'js', code: `button.onclick = () => {\n  tasks.splice(i, 1);\n  render();\n};`, line: 2, explain: "Удалили из массива, но не сохранили. После перезагрузки задача вернётся. Нужен save(). ¦ Massivdan o'chirdik, lekin saqlamadik. Qayta yuklagandan keyin vazifa qaytadi. save() kerak. ¦ Removed from the array but never saved, so it returns after a reload. Call save().", fix: `  tasks.splice(i, 1);\n  save();\n  render();` },
      ],
      takeaway: "|| [] при загрузке и save() после каждого изменения. ¦ Yuklashda || [] va har bir o'zgarishdan keyin save(). ¦ || [] on load, save() after every change.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "LocalStorage видят все ваши устройства ¦ LocalStorage'ni barcha qurilmalaringiz ko'radi ¦ All your devices see LocalStorage", truth: false, explain: "Данные лежат только в этом браузере на этом устройстве. ¦ Ma'lumotlar faqat shu qurilmadagi shu brauzerda yotadi. ¦ The data lives only in this browser on this device." },
        { text: "В LocalStorage можно хранить пароли ¦ LocalStorage'da parollarni saqlash mumkin ¦ It's fine to keep passwords in LocalStorage", truth: false, explain: "Это не сейф: любой скрипт на сайте может прочитать данные. Секреты туда не кладут. ¦ Bu seyf emas: saytdagi istalgan skript ma'lumotlarni o'qiy oladi. Sirlar u yerga qo'yilmaydi. ¦ It's not a safe: any script on the site can read it. Keep secrets out." },
        { text: "Пользователь может очистить хранилище сам ¦ Foydalanuvchi omborni o'zi tozalashi mumkin ¦ Users can clear the storage themselves", truth: true, explain: "Очистка данных сайта в браузере удаляет всё. ¦ Brauzerda sayt ma'lumotlarini tozalash hammasini o'chiradi. ¦ Clearing site data in the browser wipes it." },
        { text: "Объём LocalStorage — несколько мегабайт ¦ LocalStorage hajmi — bir necha megabayt ¦ LocalStorage holds a few megabytes", truth: true, explain: "Обычно около 5 МБ на сайт — для настроек и списков хватает. ¦ Odatda har bir sayt uchun taxminan 5 MB — sozlamalar va ro'yxatlar uchun yetarli. ¦ Usually about 5 MB per site — plenty for settings and lists." },
      ],
      takeaway: "LocalStorage — для удобства (тема, черновики, списки), а не для секретов. ¦ LocalStorage — qulaylik uchun (mavzu, qoralamalar, ro'yxatlar), sirlar uchun emas. ¦ LocalStorage is for convenience (themes, drafts, lists), not secrets.",
      notes: { say: ["Голосуем по пунктам. Лимит зависит от браузера — «около 5 МБ» как ориентир."], min: 4 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: запомни тему ¦ Missiya: mavzuni eslab qol ¦ Mission: remember the theme",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сайт помнит выбор пользователя! ¦ Sayt foydalanuvchi tanlovini eslab qoladi! ¦ The site remembers the user's choice!",
      items: [
        { title: "Сохранить тему 'dark' ¦ 'dark' mavzusini saqlash ¦ Save the theme 'dark'", choices: ["localStorage.setItem('theme', 'dark')", "localStorage.getItem('theme', 'dark')"], correct: 0, explain: "setItem — сохранить. ¦ setItem — saqlash. ¦ setItem saves." },
        { title: "Сохранить массив ¦ Massivni saqlash ¦ Save an array", choices: ['JSON.stringify(arr)', 'arr.toString()'], correct: 0, explain: "Только так структура не потеряется. ¦ Faqat shunda tuzilma yo'qolmaydi. ¦ Only this keeps the structure." },
        { title: "Ключа ещё нет — getItem вернёт ¦ Kalit hali yo'q — getItem qaytaradi ¦ No key yet — getItem returns", choices: ['null', "''"], correct: 0, explain: "Поэтому нужен запасной вариант ||. ¦ Shuning uchun zaxira variant || kerak. ¦ Hence the || fallback." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: LocalStorage ¦ Xulosa: LocalStorage ¦ Summary: LocalStorage",
      chat: "что ещё ваш сайт мог бы запоминать? ¦ saytingiz yana nimani eslab qolishi mumkin? ¦ what else could your site remember?",
      answer: "LocalStorage хранит пары «ключ → строка» в браузере, и они переживают перезагрузку. setItem сохраняет, getItem читает (или null), removeItem и clear удаляют. Массивы и объекты сохраняем через JSON.stringify и читаем через JSON.parse с запасным || []. В Todo: загрузили один раз, после каждого изменения — save() и render(). Пароли и секреты в LocalStorage не храним. ¦ LocalStorage brauzerda «kalit → satr» juftlarini saqlaydi va ular qayta yuklashdan omon qoladi. setItem saqlaydi, getItem o'qiydi (yoki null), removeItem va clear o'chiradi. Massiv va obyektlarni JSON.stringify orqali saqlaymiz va || [] zaxirasi bilan JSON.parse orqali o'qiymiz. Todo'da: bir marta yukladik, har bir o'zgarishdan keyin — save() va render(). Parol va sirlarni LocalStorage'da saqlamaymiz. ¦ LocalStorage keeps “key → string” pairs in the browser, and they survive reloads. setItem saves, getItem reads (or null), removeItem and clear delete. Save arrays and objects with JSON.stringify and read them with JSON.parse plus a || [] fallback. In the Todo: load once, then save() and render() after every change. Never keep passwords or secrets in LocalStorage.",
      icon: '💾',
      badge: "Хранитель памяти ¦ Xotira qo'riqchisi ¦ Memory keeper",
      badgeSub: "JavaScript · техническая 7 ¦ JavaScript · texnik 7 ¦ JavaScript · technical 7",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте в свой сайт кнопку тёмной темы, которая запоминает выбор. ¦ Saytingizga tanlovni eslab qoladigan qorong'i mavzu tugmasini qo'shing. ¦ Add a dark-mode button to your site that remembers the choice.",
        "Сохраните в Todo ещё и дату создания каждой задачи. ¦ Todo'da har bir vazifaning yaratilgan sanasini ham saqlang. ¦ Also save each task's creation date in the Todo.",
      ],
      takeaway: "Модуль JavaScript пройден! Дальше — React: те же идеи, но быстрее и удобнее. ¦ JavaScript moduli tugadi! Keyingisi — React: o'sha g'oyalar, lekin tezroq va qulayroq. ¦ The JavaScript module is done! Next: React — the same ideas, faster and easier.",
      notes: { say: ["Итог модуля."], min: 2 },
    },
  ],
});
