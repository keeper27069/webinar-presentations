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

export default kit({
  id: 'react-t03',
  title: "Todo-list на React ¦ React'da Todo-list ¦ A Todo list in React",
  question: "Насколько React упрощает работу с интерфейсом по сравнению с обычным JS? ¦ React oddiy JS'ga nisbatan interfeys bilan ishlashni qanchalik osonlashtiradi? ¦ How much simpler does React make UI work compared with plain JS?",
  route: ["Вспоминаем JS ¦ JS'ni eslaymiz ¦ Recalling JS", "Состояние-массив ¦ Massiv-holat ¦ Array state", "Список и key ¦ Ro'yxat va key ¦ Lists and key", "Сравнение ¦ Solishtirish ¦ Comparison", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '✅',
      kicker: "React · техническая тема 3 ¦ React · texnik mavzu 3 ¦ React · technical topic 3",
      title: "Тот же Todo — меньше ручной работы ¦ O'sha Todo — kamroq qo'l mehnati ¦ The same Todo — less manual work",
      chat: "помните, какие строки ломали Todo на JS? ¦ JS'dagi Todo'ni qaysi qatorlar buzganini eslaysizmi? ¦ remember which lines broke the JS Todo?",
      lead: "В модуле JS мы сами создавали <li>, очищали список и вызывали render(). В React мы только меняем массив задач в состоянии — всё остальное React делает сам. ¦ JS modulida biz <li>ni o'zimiz yaratdik, ro'yxatni tozaladik va render()ni chaqirdik. React'da biz faqat holatdagi vazifalar massivini o'zgartiramiz — qolganini React o'zi qiladi. ¦ In the JS module we created <li>s, cleared the list and called render() ourselves. In React we only change the tasks array in state — React does the rest.",
      facts: ["Массив задач — в useState ¦ Vazifalar massivi — useState'da ¦ The tasks array lives in useState", "map превращает данные в <li> ¦ map ma'lumotni <li>ga aylantiradi ¦ map turns data into <li>s", "Каждой строке — свой key ¦ Har bir qatorga — o'z key'i ¦ Every row gets a key"],
      takeaway: "Данные → экран: идея та же, что в render(), только React делает это за нас. ¦ Ma'lumot → ekran: g'oya render()dagi bilan bir xil, faqat React buni biz uchun qiladi. ¦ Data → screen: the same idea as render(), but React does it for us.",
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 1,
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
      type: 'walk',
      stage: 1,
      title: "Как меняем массив ¦ Massivni qanday o'zgartiramiz ¦ How we change the array",
      chat: "почему не tasks.push(…)? ¦ nega tasks.push(…) emas? ¦ why not tasks.push(…)?",
      code: `// add: a NEW array with one more task\nsetTasks([...tasks, newTask]);\n\n// delete: a NEW array without that task\nsetTasks(tasks.filter((t) => t.id !== id));\n\n// toggle: a NEW array, one task replaced\nsetTasks(tasks.map((t) => (t.id === id ? changed : t)));`,
      lang: 'js',
      marks: [
        { line: 2, text: "...tasks копирует старые задачи в новый массив и добавляет новую. ¦ ...tasks eski vazifalarni yangi massivga nusxalaydi va yangisini qo'shadi. ¦ ...tasks copies the old tasks into a new array and adds one." },
        { line: 5, text: "filter оставляет все задачи, кроме удалённой. ¦ filter o'chirilgandan tashqari barcha vazifalarni qoldiradi. ¦ filter keeps every task except the deleted one." },
        { line: 8, text: "map проходит по всем и заменяет одну. ¦ map hammasini aylanib chiqadi va bittasini almashtiradi. ¦ map goes through all and swaps one." },
      ],
      takeaway: "В React состояние не меняют на месте: создают новый массив. Так React замечает изменение. ¦ React'da holat joyida o'zgartirilmaydi: yangi massiv yaratiladi. Shunda React o'zgarishni sezadi. ¦ In React you don't mutate state in place: you create a new array. That's how React notices.",
      notes: { min: 5 },
    },
    {
      type: 'cards',
      stage: 2,
      title: "map и key ¦ map va key ¦ map and key",
      chat: "что будет, если у двух задач один key? ¦ ikki vazifaning key'i bir xil bo'lsa nima bo'ladi? ¦ what if two tasks share a key?",
      cards: [
        { icon: '🗺️', front: "map в JSX ¦ JSX'dagi map ¦ map in JSX", back: "{tasks.map((t) => <TodoItem … />)} — массив данных → массив компонентов. ¦ {tasks.map((t) => <TodoItem … />)} — ma'lumotlar massivi → komponentlar massivi. ¦ {tasks.map((t) => <TodoItem … />)}: data array → component array." },
        { icon: '🔑', front: 'key', back: "Уникальный «паспорт» строки, чтобы React понимал, какая изменилась. ¦ Qatorning noyob «pasporti», React qaysi biri o'zgarganini tushunishi uchun. ¦ A row's unique “passport” so React knows which one changed." },
        { icon: '🆔', front: "id, а не индекс ¦ indeks emas, id ¦ id, not index", back: "Индекс меняется при удалении — лучше постоянный id. ¦ O'chirilganda indeks o'zgaradi — doimiy id yaxshiroq. ¦ Indexes shift on delete — a stable id is better." },
        { icon: '📤', front: "Функции в props ¦ Props'dagi funksiyalar ¦ Functions as props", back: "onToggle и onDelete: ребёнок сообщает родителю о клике. ¦ onToggle va onDelete: bola ota-onaga bosish haqida xabar beradi. ¦ onToggle and onDelete: the child tells the parent about a click." },
      ],
      takeaway: "Данные живут в App, а TodoItem только показывает и сообщает о событиях. ¦ Ma'lumotlar App'da yashaydi, TodoItem esa faqat ko'rsatadi va hodisalar haqida xabar beradi. ¦ Data lives in App; TodoItem only displays and reports events.",
      notes: { min: 5 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "JS и React: удаление задачи ¦ JS va React: vazifani o'chirish ¦ JS vs React: deleting a task",
      chat: "сколько шагов справа? ¦ o'ngda nechta qadam? ¦ how many steps on the right?",
      left: { icon: '🟨', label: "Обычный JS ¦ Oddiy JS ¦ Plain JS", code: `btn.onclick = () => {\n  tasks.splice(i, 1);\n  save();\n  render(); // clears and rebuilds\n};`, lang: 'js' },
      right: { icon: '⚛️', label: 'React', code: `const remove = (id) =>\n  setTasks(tasks.filter((t) => t.id !== id));`, lang: 'js' },
      verdict: "В JS вы отвечаете за данные и за экран. В React — только за данные: экран следует за состоянием. ¦ JS'da siz ma'lumot uchun ham, ekran uchun ham javob berasiz. React'da — faqat ma'lumot uchun: ekran holatga ergashadi. ¦ In JS you own both data and screen. In React you own the data; the screen follows state.",
      notes: { min: 4 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Баги React-Todo ¦ React-Todo buglari ¦ React Todo bugs",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Задача не появляется ¦ Vazifa paydo bo'lmaydi ¦ The task doesn't appear", lang: 'js', code: `function add() {\n  tasks.push({ id: Date.now(), text });\n  setTasks(tasks);\n}`, line: 2, explain: "push меняет тот же массив — React видит «тот же» объект и может не перерисовать. Нужен новый массив. ¦ push o'sha massivni o'zgartiradi — React «o'sha» obyektni ko'radi va qayta chizmasligi mumkin. Yangi massiv kerak. ¦ push mutates the same array — React sees the “same” object and may not re-render. Make a new array.", fix: `setTasks([...tasks, { id: Date.now(), text }]);` },
        { title: "Предупреждение в консоли ¦ Konsolda ogohlantirish ¦ A console warning", lang: 'js', code: `{tasks.map((t) => (\n  <TodoItem task={t} />\n))}`, line: 2, explain: "Нет key — React предупредит и может перепутать строки при изменениях. ¦ key yo'q — React ogohlantiradi va o'zgarishlarda qatorlarni chalkashtirishi mumkin. ¦ No key — React warns and may mix rows up on changes.", fix: `  <TodoItem key={t.id} task={t} />` },
      ],
      takeaway: "Новый массив вместо push и key для каждой строки. ¦ push o'rniga yangi massiv va har bir qator uchun key. ¦ A new array instead of push, and a key on every row.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какой метод массива? ¦ Qaysi massiv metodi? ¦ Which array method?",
      chat: "пишите: «1 — filter» ¦ yozing: «1 — filter» ¦ write: “1 — filter”",
      zones: [
        { id: 'spread', label: '[...arr, x]', icon: '➕' },
        { id: 'filter', label: 'filter', icon: '🗑️' },
        { id: 'map', label: 'map', icon: '🔁' },
      ],
      items: [
        { text: "Добавить задачу ¦ Vazifa qo'shish ¦ Add a task", zone: 'spread' },
        { text: "Удалить задачу ¦ Vazifani o'chirish ¦ Delete a task", zone: 'filter' },
        { text: "Отметить одну задачу ¦ Bitta vazifani belgilash ¦ Tick one task", zone: 'map' },
        { text: "Удалить все выполненные ¦ Barcha bajarilganlarni o'chirish ¦ Clear all completed", zone: 'filter' },
        { text: "Нарисовать список <li> ¦ <li> ro'yxatini chizish ¦ Render the <li> list", zone: 'map' },
      ],
      takeaway: "Три инструмента покрывают почти любой список. ¦ Uchta vosita deyarli istalgan ro'yxatni qamraydi. ¦ Three tools cover almost any list.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: Todo 3.0 ¦ Missiya: Todo 3.0 ¦ Mission: Todo 3.0",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Todo на React готов! ¦ React'dagi Todo tayyor! ¦ The React Todo is ready!",
      items: [
        { title: "Кнопка «Удалить выполненные» ¦ «Bajarilganlarni o'chirish» tugmasi ¦ A “Clear completed” button", choices: ["setTasks(tasks.filter((t) => !t.done))", "tasks.length = 0"], correct: 0, explain: "Новый массив только с невыполненными. ¦ Faqat bajarilmaganlar bilan yangi massiv. ¦ A new array with only unfinished tasks." },
        { title: "key для строки ¦ Qator uchun key ¦ The row's key", choices: ['t.id', 'Math.random()'], correct: 0, explain: "key должен быть постоянным. ¦ key doimiy bo'lishi kerak. ¦ A key must be stable." },
        { title: "Где хранить список? ¦ Ro'yxatni qayerda saqlash kerak? ¦ Where does the list live?", choices: ["useState в App ¦ App'dagi useState ¦ useState in App", "В каждом TodoItem ¦ Har bir TodoItem'da ¦ In each TodoItem"], correct: 0, explain: "Один источник правды — у родителя. ¦ Yagona haqiqat manbai — ota-onada. ¦ One source of truth, in the parent." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Todo на React ¦ Xulosa: React'dagi Todo ¦ Summary: a React Todo",
      chat: "какая версия Todo вам понятнее — JS или React? ¦ Todo'ning qaysi versiyasi sizga tushunarliroq — JS yoki React? ¦ which Todo is clearer to you — JS or React?",
      answer: "В React список задач хранится в useState, а экран строится из него через map с уникальным key. Добавляем — [...tasks, новая], удаляем — filter, отмечаем — map; всегда создаём новый массив, а не меняем старый. Дочерний TodoItem получает данные и функции через props. В итоге мы управляем только данными, а React сам обновляет экран. ¦ React'da vazifalar ro'yxati useState'da saqlanadi, ekran esa undan noyob key bilan map orqali quriladi. Qo'shish — [...tasks, yangi], o'chirish — filter, belgilash — map; eskisini o'zgartirmasdan, doim yangi massiv yaratamiz. Bola TodoItem ma'lumot va funksiyalarni props orqali oladi. Natijada biz faqat ma'lumotlarni boshqaramiz, React esa ekranni o'zi yangilaydi. ¦ In React the task list lives in useState and the screen is built from it with map and a unique key. Add with [...tasks, newTask], delete with filter, tick with map — always a new array, never mutating. The child TodoItem gets data and functions via props. We manage only the data; React updates the screen.",
      icon: '✅',
      badge: "React-разработчик ¦ React dasturchisi ¦ React developer",
      badgeSub: "React · техническая 3 ¦ React · texnik 3 ¦ React · technical 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте кнопку «Удалить выполненные» и фильтры «Все / Активные / Готовые». ¦ «Bajarilganlarni o'chirish» tugmasi va «Hammasi / Faol / Tayyor» filtrlarini qo'shing. ¦ Add “Clear completed” and “All / Active / Done” filters.",
        "Вынесите форму в отдельный компонент AddForm. ¦ Formani alohida AddForm komponentiga chiqaring. ¦ Move the form into its own AddForm component.",
      ],
      takeaway: "Следующая тема — useEffect: код при загрузке, таймеры и сохранение. ¦ Keyingi mavzu — useEffect: yuklanishdagi kod, taymerlar va saqlash. ¦ Next: useEffect — code on load, timers and saving.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
