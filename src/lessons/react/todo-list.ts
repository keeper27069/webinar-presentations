import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;min-height:100vh;display:grid;place-items:center;background:linear-gradient(160deg,#61dafb,#5b3df5)}
.app{background:#fff;border-radius:20px;padding:22px;width:380px;box-shadow:0 12px 40px #0003}
h2{margin:0 0 12px}form{display:flex;gap:8px}
input{flex:1;padding:10px;border:1px solid #cfd5e6;border-radius:10px;font-size:16px}
button{padding:10px 14px;border:0;border-radius:10px;background:#1b2150;color:#fff;font-weight:700}
ul{list-style:none;padding:0;margin:14px 0 0}
li{display:flex;align-items:center;gap:10px;padding:10px;border-bottom:1px solid #eef1f7;font-size:17px}
li span{flex:1;cursor:pointer}li.done span{text-decoration:line-through;color:#9aa1b5}
li button{background:#ff6f91;padding:4px 10px}p{color:#6b7390;margin:10px 0 0}`;
const JS = `const { useState } = React;

function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.done ? 'done' : ''}>
      <span onClick={onToggle}>{task.text}</span>
      <button onClick={onDelete}>✕</button>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn useState', done: true },
    { id: 2, text: 'Build a Todo in React', done: false },
  ]);
  const [text, setText] = useState('');

  function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: text.trim(), done: false }]);
    setText('');
  }
  const toggle = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? Object.assign({}, t, { done: !t.done }) : t)));
  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div className="app">
      <h2>⚛️ React tasks</h2>
      <form onSubmit={add}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New task…" />
        <button>Add</button>
      </form>
      <ul>
        {tasks.map((t) => (
          <TodoItem key={t.id} task={t} onToggle={() => toggle(t.id)} onDelete={() => remove(t.id)} />
        ))}
      </ul>
      <p>Left: {tasks.filter((t) => !t.done).length}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.app{width:400px;padding:22px;border-radius:20px;background:#fff;box-shadow:0 12px 40px #0002}
.app h3{margin:0 0 12px;font-size:24px}
.li{display:flex;align-items:center;gap:10px;padding:10px 4px;border-bottom:2px solid #eef1f7;font-size:19px}
.li span{flex:1}.li.done span{text-decoration:line-through;color:#9aa1b5}.li i{font-style:normal;padding:2px 10px;border-radius:8px;background:#ff6f91;color:#fff;font-weight:800}
.cnt{margin-top:10px;color:#6b7183;font-weight:700}`;
const app = (items: [string, boolean][]) => `<div class="wrap"><div class="app"><h3>⚛️ My tasks</h3>${items.map(([t, d]) => `<div class="li ${d ? 'done' : ''}"><span>${t}</span><i>✕</i></div>`).join('')}<div class="cnt">${items.filter(([, d]) => !d).length} left</div></div></div>`;

export default kit({
  id: 'react-t03',
  title: "Todo-list на React ¦ React'da Todo-list ¦ A to-do list in React",
  question: "Как хранить список дел в состоянии и правильно его менять? ¦ Ishlar ro'yxatini holatda qanday saqlash va uni to'g'ri o'zgartirish mumkin? ¦ How do you keep a task list in state and change it correctly?",
  route: ["Список в state ¦ State'dagi ro'yxat ¦ A list in state", "Действия ¦ Harakatlar ¦ Actions", "Новый массив ¦ Yangi massiv ¦ A new array", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '✅',
      kicker: "React · техническая тема 3 ¦ React · texnik mavzu 3 ¦ React · technical topic 3",
      title: "Тот же список — меньше кода ¦ O'sha ro'yxat — kamroq kod ¦ The same list, less code",
      chat: "помните todo на чистом JS? что было сложнее всего? ¦ sof JS'dagi todo'ni eslaysizmi? eng qiyini nima edi? ¦ remember the plain-JS to-do? what was hardest?",
      lead: "В React список дел лежит в useState. Мы меняем только данные, а React сам рисует список через map. Никаких createElement и ручного удаления! ¦ React'da ishlar ro'yxati useState'da turadi. Biz faqat ma'lumotlarni o'zgartiramiz, React esa ro'yxatni map orqali o'zi chizadi. Hech qanday createElement va qo'lda o'chirish yo'q! ¦ In React the task list lives in useState. We only change data; React draws the list with map. No createElement, no manual removal!",
      facts: ["tasks — массив в state ¦ tasks — state'dagi massiv ¦ tasks: an array in state", "map — нарисовать каждый ¦ map — har birini chizish ¦ map draws each one", "filter — убрать лишний ¦ filter — ortiqchasini olib tashlash ¦ filter removes one"],
      takeaway: "Смотрим, как список меняется. ¦ Ro'yxat qanday o'zgarishini ko'ramiz. ¦ Watch the list change.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Добавить, отметить, удалить ¦ Qo'shish, belgilash, o'chirish ¦ Add, mark done, delete",
      chat: "какую задачу добавим? ¦ qaysi vazifani qo'shamiz? ¦ which task shall we add?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "const [tasks, setTasks] = useState([\n  { text: '🛒 Bread', done: false },\n]);", line: 1, html: app([['🛒 Bread', false]]), say: "Список дел — в state. React рисует его через tasks.map(…). ¦ Ishlar ro'yxati — state'da. React uni tasks.map(…) orqali chizadi. ¦ The task list is in state; React draws it with tasks.map(…)." },
        { code: "setTasks([...tasks,\n  { text: '📚 Homework', done: false }]);", line: 1, html: app([['🛒 Bread', false], ['📚 Homework', false]]), say: "Добавить: новый массив = старые дела + новое. ¦ Qo'shish: yangi massiv = eski ishlar + yangisi. ¦ Add: a new array = old tasks + the new one." },
        { code: "setTasks(tasks.map((t, i) =>\n  i === 0 ? { ...t, done: !t.done } : t));", line: 2, html: app([['🛒 Bread', true], ['📚 Homework', false]]), say: "Отметить: map копирует список и переворачивает done у нужного. ¦ Belgilash: map ro'yxatni nusxalaydi va keraklisining done'ini ag'daradi. ¦ Mark done: map copies the list and flips done on the right one." },
        { code: "setTasks(tasks.filter((t, i) =>\n  i !== 0));", line: 2, html: app([['📚 Homework', false]]), say: "Удалить: filter оставляет всех, кроме удалённого. ¦ O'chirish: filter o'chirilgandan boshqa hammasini qoldiradi. ¦ Delete: filter keeps everything except the removed one." },
      ],
      takeaway: "Добавить — [...tasks, new], отметить — map, удалить — filter. ¦ Qo'shish — [...tasks, new], belgilash — map, o'chirish — filter. ¦ Add with [...tasks, new], mark with map, delete with filter.",
      notes: { min: 6 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Не меняем, а заменяем ¦ O'zgartirmaymiz, almashtiramiz ¦ Replace, don't modify",
      chat: "почему не tasks.push? ¦ nega tasks.push emas? ¦ why not tasks.push?",
      actors: [
        { id: 'old', icon: '📦', label: "Старый массив ¦ Eski massiv ¦ Old array" },
        { id: 'new', icon: '🎁', label: "Новый массив ¦ Yangi massiv ¦ New array" },
        { id: 'r', icon: '⚛️', label: 'React' },
        { id: 'q', text: "Это новая коробка? ¦ Bu yangi qutimi? ¦ Is this a new box?" },
      ],
      steps: [
        { say: "React сравнивает: та же коробка или новая? ¦ React solishtiradi: o'sha qutimi yoki yangimi? ¦ React compares: same box or a new one?", at: { old: [20, 50, 1.2], r: [80, 50, 1.2], q: [80, 18] } },
        { say: "Если сделать push в ту же коробку — React думает «ничего не поменялось». ¦ Agar o'sha qutiga push qilsak — React «hech narsa o'zgarmadi» deb o'ylaydi. ¦ push into the same box and React thinks nothing changed.", set: { q: { text: "Та же коробка 😴 ¦ O'sha quti 😴 ¦ Same box 😴" } }, lines: [['old', 'r', 'push']] },
        { say: "А [...tasks, new] — это новая коробка с копией и новым делом. ¦ [...tasks, new] esa — nusxa va yangi ish bilan yangi quti. ¦ [...tasks, new] is a new box with a copy plus the new task.", at: { new: [50, 82, 1.2] }, set: { q: { text: "Новая! 🎉 ¦ Yangi! 🎉 ¦ New! 🎉" } }, lines: [['old', 'new', 'копия ¦ nusxa ¦ copy'], ['new', 'r', 'setTasks']], pulse: ['new', 'r'] },
      ],
      takeaway: "В state всегда кладём НОВЫЙ массив — тогда React перерисует. ¦ State'ga doim YANGI massiv qo'yamiz — shunda React qayta chizadi. ¦ Always put a NEW array in state so React re-renders.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      react: true,
      title: "Todo на React ¦ React'dagi Todo ¦ The React Todo",
      chat: "присылайте задачи — я добавлю! ¦ vazifalarni yuboring — men qo'shaman! ¦ send tasks — I'll add them!",
      task: "✍️ Добавляйте, отмечайте, удаляйте ¦ ✍️ Qo'shing, belgilang, o'chiring ¦ ✍️ Add, tick, delete",
      steps: [
        { label: "Todo ¦ Todo ¦ Todo", html: '<div id="root"></div>', css: CSS, js: JS },
      ],
      takeaway: "Нет ни createElement, ни innerHTML = '', ни render(). Меняем tasks — экран обновляется сам. ¦ createElement ham, innerHTML = '' ham, render() ham yo'q. tasks'ni o'zgartiramiz — ekran o'zi yangilanadi. ¦ No createElement, no innerHTML = '', no render(). Change tasks and the screen updates itself.",
      notes: { say: ["Object.assign({}, t, { done: !t.done }) — копия задачи с новым done. В проектах чаще пишут { ...t, done: !t.done }."], min: 9 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: React-список ¦ Missiya: React ro'yxati ¦ Mission: a React list",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Список работает без ошибок! ¦ Ro'yxat xatosiz ishlaydi! ¦ The list works perfectly!",
      items: [
        { title: "Добавить дело ¦ Ish qo'shish ¦ Add a task", choices: ['setTasks([...tasks, task])', 'tasks.push(task)'], correct: 0, explain: "Новый массив — React заметит. ¦ Yangi massiv — React sezadi. ¦ A new array — React notices." },
        { title: "Удалить дело ¦ Ishni o'chirish ¦ Delete a task", choices: ['filter', 'push'], correct: 0, explain: "filter оставляет нужные. ¦ filter keraklilarini qoldiradi. ¦ filter keeps the ones you want." },
        { title: "Нарисовать все дела ¦ Barcha ishlarni chizish ¦ Draw every task", choices: ['tasks.map(…)', 'tasks.length'], correct: 0, explain: "map превращает каждый элемент в <li>. ¦ map har bir elementni <li>ga aylantiradi. ¦ map turns each item into an <li>." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Todo на React ¦ Xulosa: React'da Todo ¦ Summary: a React to-do list",
      chat: "что добавите в свой список? ¦ ro'yxatingizga nima qo'shasiz? ¦ what will you add to your list?",
      answer: "В React список дел хранится в state: const [tasks, setTasks] = useState([]). Рисует его tasks.map(…). Добавляем через setTasks([...tasks, новое]), отмечаем через map, удаляем через filter. Важно класть в state новый массив, а не менять старый, — тогда React заметит изменение и перерисует список. ¦ React'da ishlar ro'yxati state'da saqlanadi: const [tasks, setTasks] = useState([]). Uni tasks.map(…) chizadi. setTasks([...tasks, yangi]) orqali qo'shamiz, map orqali belgilaymiz, filter orqali o'chiramiz. State'ga eskisini o'zgartirmasdan yangi massiv qo'yish muhim — shunda React o'zgarishni sezadi va ro'yxatni qayta chizadi. ¦ In React the task list lives in state: const [tasks, setTasks] = useState([]). tasks.map(…) draws it. Add with setTasks([...tasks, newTask]), mark with map, delete with filter. Always put a new array in state rather than changing the old one, so React notices and re-renders.",
      icon: '✅',
      badge: "React-разработчик ¦ React dasturchisi ¦ React developer",
      badgeSub: "React · техническая 3 ¦ React · texnik 3 ¦ React · technical 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте счётчик «осталось N дел». ¦ «N ta ish qoldi» hisoblagichini qo'shing. ¦ Add a “N tasks left” counter.",
        "Сделайте кнопку «Удалить сделанные» через filter. ¦ filter orqali «Bajarilganlarni o'chirish» tugmasini yasang. ¦ Make a “Clear completed” button with filter.",
      ],
      takeaway: "Дальше: useEffect — код «после отрисовки». ¦ Keyingisi: useEffect — «chizilgandan keyin» kod. ¦ Next: useEffect — code that runs after rendering.",
      notes: { min: 2 },
    },
  ],
});
