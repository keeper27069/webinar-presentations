import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#f4f6fb;color:#1b2150}
.box{max-width:420px;margin:16px auto;background:#fff;border-radius:18px;padding:20px;text-align:center;box-shadow:0 8px 24px #0001;display:grid;gap:14px}
.count{font-size:64px;font-weight:900}
.row{display:flex;gap:10px;justify-content:center}
button{padding:10px 18px;border:0;border-radius:10px;background:#5b3df5;color:#fff;font-size:18px;font-weight:800}
input{padding:10px;border:1px solid #cfd5e6;border-radius:10px;font-size:18px}
.dark{background:#1b2150;color:#fff}`;
const COUNTER = `const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="box">
      <div className="count">{count}</div>
      <div className="row">
        <button onClick={() => setCount(count - 1)}>−</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Counter />);`;
const FULL = `const { useState } = React;

function App() {
  const [likes, setLikes] = useState(0);
  const [dark, setDark] = useState(false);
  const [name, setName] = useState('');

  return (
    <div className={dark ? 'box dark' : 'box'}>
      <h2>Hello, {name || 'guest'}! 👋</h2>
      <input value={name} placeholder="Your name"
        onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
      <button onClick={() => setDark(!dark)}>
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.box{width:320px;padding:22px;border-radius:20px;background:#fff;text-align:center;box-shadow:0 10px 30px #0001}
.n{font:900 90px JetBrains Mono,monospace;line-height:1}
.row{display:flex;gap:10px;justify-content:center;margin-top:12px}
.row span{padding:10px 18px;border-radius:12px;background:#0ea5d9;color:#fff;font-weight:800;font-size:20px}
.row span.hit{background:#16181f;scale:1.1}
.st{margin-top:12px;font:700 16px JetBrains Mono,monospace;color:#6b7183}`;
const box = (n: number, hit = '') => `<div class="wrap"><div class="box"><div class="n">${n}</div><div class="row">${['−', 'Reset', '+'].map((b) => `<span class="${b === hit ? 'hit' : ''}">${b}</span>`).join('')}</div><div class="st">count = ${n}</div></div></div>`;
const US = "const [count, setCount] = useState(0);\n\n<button onClick={() =>\n  setCount(count + 1)}>+</button>";

export default kit({
  id: 'react-t02',
  title: "useState: память компонента ¦ useState: komponent xotirasi ¦ useState: a component's memory",
  question: "Как кнопка «+» меняет число на экране — и почему обычная переменная не работает? ¦ «+» tugmasi ekrandagi sonni qanday o'zgartiradi — va nega oddiy o'zgaruvchi ishlamaydi? ¦ How does a “+” button change the number on screen — and why doesn't a plain variable work?",
  route: ["Память ¦ Xotira ¦ Memory", "Счётчик ¦ Hisoblagich ¦ The counter", "Перерисовка ¦ Qayta chizish ¦ Re-render", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🧠',
      kicker: "React · техническая тема 2 ¦ React · texnik mavzu 2 ¦ React · technical topic 2",
      title: "Компонент, который помнит ¦ Eslab qoladigan komponent ¦ A component that remembers",
      chat: "что на экране меняется при нажатии ❤️? ¦ ❤️ bosilganda ekranda nima o'zgaradi? ¦ what changes on screen when you tap ❤️?",
      lead: "Лайки, счётчики, тёмная тема — всё это «состояние». useState даёт компоненту память и функцию, которая меняет её. Меняется состояние — React сам перерисовывает экран. ¦ Layklar, hisoblagichlar, qorong'i mavzu — bularning hammasi «holat». useState komponentga xotira va uni o'zgartiradigan funksiya beradi. Holat o'zgaradi — React ekranni o'zi qayta chizadi. ¦ Likes, counters, dark mode — all of these are “state”. useState gives a component memory and a function to change it. When state changes, React redraws the screen.",
      facts: ["count — текущее значение ¦ count — joriy qiymat ¦ count: the current value", "setCount — поменять ¦ setCount — o'zgartirish ¦ setCount: change it", "Поменяли → React перерисовал ¦ O'zgartirdik → React qayta chizdi ¦ Change → React redraws"],
      takeaway: "Смотрим на счётчик. ¦ Hisoblagichga qaraymiz. ¦ Let's look at a counter.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Счётчик с useState ¦ useState bilan hisoblagich ¦ A counter with useState",
      chat: "до скольки досчитаем? ¦ nechagacha sanaymiz? ¦ how high shall we count?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: US, line: 1, html: box(0), say: "useState(0): память count начинается с 0. ¦ useState(0): count xotirasi 0 dan boshlanadi. ¦ useState(0): count starts at 0." },
        { code: US, line: 4, html: box(1, '+'), say: "Нажали «+» → setCount(0 + 1) → на экране 1. ¦ «+» bosildi → setCount(0 + 1) → ekranda 1. ¦ Tap “+” → setCount(0 + 1) → the screen shows 1." },
        { code: US, line: 4, html: box(3, '+'), say: "Ещё дважды — 3. Экран сам успевает за памятью. ¦ Yana ikki marta — 3. Ekran xotiraga o'zi ulgurib boradi. ¦ Twice more: 3. The screen keeps up by itself." },
        { code: "<button onClick={() =>\n  setCount(0)}>Reset</button>", line: 2, html: box(0, 'Reset'), say: "Reset — setCount(0), и снова ноль. ¦ Reset — setCount(0), va yana nol. ¦ Reset calls setCount(0) — back to zero." },
      ],
      takeaway: "[значение, функция-изменитель] = useState(старт). ¦ [qiymat, o'zgartiruvchi funksiya] = useState(start). ¦ [value, setter] = useState(start).",
      notes: { min: 5 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Что происходит после клика ¦ Bosishdan keyin nima bo'ladi ¦ What happens after a click",
      chat: "почему экран обновился сам? ¦ nega ekran o'zi yangilandi? ¦ why did the screen update itself?",
      actors: [
        { id: 'click', icon: '👆', label: "Клик «+» ¦ «+» bosish ¦ Tap “+”" },
        { id: 'set', icon: '✍️', label: 'setCount(1)' },
        { id: 'mem', icon: '🧠', label: "Память: 0 → 1 ¦ Xotira: 0 → 1 ¦ Memory: 0 → 1" },
        { id: 'r', icon: '⚛️', label: "React перерисовывает ¦ React qayta chizadi ¦ React re-renders" },
        { id: 'scr', text: "1" },
      ],
      steps: [
        { say: "Пользователь нажал «+». ¦ Foydalanuvchi «+»ni bosdi. ¦ The user taps “+”.", at: { click: [10, 50, 1.2] }, pulse: ['click'] },
        { say: "Вызывается setCount(1). ¦ setCount(1) chaqiriladi. ¦ setCount(1) is called.", at: { set: [32, 50] }, lines: [['click', 'set']] },
        { say: "React меняет память: было 0, стало 1. ¦ React xotirani o'zgartiradi: 0 edi, 1 bo'ldi. ¦ React updates memory: 0 becomes 1.", at: { mem: [54, 50] }, lines: [['click', 'set'], ['set', 'mem']], pulse: ['mem'] },
        { say: "И сам заново рисует компонент — на экране 1. ¦ Va komponentni o'zi qayta chizadi — ekranda 1. ¦ Then it redraws the component — the screen shows 1.", at: { r: [76, 50], scr: [92, 50, 1.6] }, lines: [['click', 'set'], ['set', 'mem'], ['mem', 'r'], ['r', 'scr']], pulse: ['scr'] },
      ],
      takeaway: "set… → память → перерисовка. Вам не нужно трогать DOM руками. ¦ set… → xotira → qayta chizish. DOM'ni qo'lda o'zgartirish shart emas. ¦ set… → memory → re-render. No manual DOM work needed.",
      notes: { min: 4 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "let или useState? ¦ let'mi yoki useState'mi? ¦ let or useState?",
      chat: "почему с let экран не меняется? ¦ nega let bilan ekran o'zgarmaydi? ¦ why doesn't the screen change with let?",
      left: { icon: '😶', label: 'let count', code: "let count = 0;\n<button onClick={() =>\n  count++}>+</button>", lang: 'js', points: ["Число меняется, а экран — нет ¦ Son o'zgaradi, ekran esa — yo'q ¦ The number changes but the screen doesn't"] },
      right: { icon: '😃', label: 'useState', code: "const [count, setCount] = useState(0);\n<button onClick={() =>\n  setCount(count + 1)}>+</button>", lang: 'js', points: ["React знает об изменении и перерисует ¦ React o'zgarishni biladi va qayta chizadi ¦ React knows and re-renders"] },
      verdict: "React перерисовывает только тогда, когда вы зовёте set…. ¦ React faqat siz set… chaqirganingizda qayta chizadi. ¦ React only re-renders when you call a setter.",
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      react: true,
      title: "Счётчик ¦ Hisoblagich ¦ A counter",
      chat: "какую кнопку добавить? «+10»? ¦ qanday tugma qo'shamiz? «+10»? ¦ which button shall we add? “+10”?",
      task: "✍️ Кликайте, потом добавьте кнопку «+10» ¦ ✍️ Bosing, keyin «+10» tugmasini qo'shing ¦ ✍️ Click around, then add a “+10” button",
      steps: [
        { label: "Счётчик ¦ Hisoblagich ¦ Counter", html: '<div id="root"></div>', css: CSS, js: COUNTER },
      ],
      takeaway: "Каждая кнопка вызывает setCount — React сам меняет число на экране. ¦ Har bir tugma setCount'ni chaqiradi — React raqamni ekranda o'zi o'zgartiradi. ¦ Each button calls setCount and React updates the number itself.",
      notes: { say: ["Предложите чату: запретить уходить ниже нуля (if или Math.max)."], min: 7 },
    },
    {
      type: 'live',
      stage: 3,
      react: true,
      title: "Лайк, тема и поле ввода ¦ Layk, mavzu va kiritish maydoni ¦ Like, theme and input",
      chat: "напишите своё имя в поле! ¦ maydonga ismingizni yozing! ¦ type your name in the field!",
      task: "✍️ Три состояния в одном компоненте — попробуйте все ¦ ✍️ Bitta komponentda uchta holat — hammasini sinab ko'ring ¦ ✍️ Three pieces of state in one component — try them all",
      steps: [
        { label: "Три состояния ¦ Uchta holat ¦ Three states", html: '<div id="root"></div>', css: CSS, js: FULL },
      ],
      takeaway: "Число, логическое значение, строка — useState хранит что угодно. setDark(!dark) — переключатель, onChange + value — управляемое поле. ¦ Raqam, mantiqiy qiymat, satr — useState istalgan narsani saqlaydi. setDark(!dark) — almashtirgich, onChange + value — boshqariladigan maydon. ¦ Number, boolean, string — useState holds anything. setDark(!dark) is a toggle; onChange + value make a controlled input.",
      notes: { say: ["Покажите: {name || 'guest'} — если имя пустое, показываем guest."], min: 8 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: живые кнопки ¦ Missiya: jonli tugmalar ¦ Mission: live buttons",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Кнопки отвечают мгновенно! ¦ Tugmalar bir zumda javob beradi! ¦ Buttons respond instantly!",
      items: [
        { title: "Создать лайки, начиная с 0 ¦ 0 dan boshlanadigan layklar yaratish ¦ Create likes starting at 0", choices: ['const [likes, setLikes] = useState(0)', 'let likes = useState'], correct: 0, explain: "Пара: значение и изменитель. ¦ Juft: qiymat va o'zgartiruvchi. ¦ A pair: value and setter." },
        { title: "Как прибавить лайк? ¦ Laykni qanday qo'shish mumkin? ¦ How to add a like?", choices: ['setLikes(likes + 1)', 'likes = likes + 1'], correct: 0, explain: "Только через set… ¦ Faqat set… orqali. ¦ Only via the setter." },
        { title: "Тёмная тема вкл/выкл ¦ Qorong'i mavzu yoq/o'chir ¦ Dark mode on/off", choices: ['setDark(!dark)', 'dark = true'], correct: 0, explain: "! переворачивает true/false. ¦ ! true/false'ni ag'daradi. ¦ ! flips true/false." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: useState ¦ Xulosa: useState ¦ Summary: useState",
      chat: "какое состояние будет в вашем приложении? ¦ ilovangizda qanday holat bo'ladi? ¦ what state will your app have?",
      answer: "useState даёт компоненту память: const [count, setCount] = useState(0). count — текущее значение, setCount — функция, которая его меняет. После вызова setCount React сам перерисовывает компонент, поэтому экран всегда показывает свежие данные. Обычная переменная let так не умеет: число меняется, а экран — нет. ¦ useState komponentga xotira beradi: const [count, setCount] = useState(0). count — joriy qiymat, setCount — uni o'zgartiradigan funksiya. setCount chaqirilgandan keyin React komponentni o'zi qayta chizadi, shuning uchun ekran doim yangi ma'lumotni ko'rsatadi. Oddiy let o'zgaruvchisi buni qila olmaydi: son o'zgaradi, ekran esa — yo'q. ¦ useState gives a component memory: const [count, setCount] = useState(0). count is the current value; setCount changes it. After setCount, React re-renders the component, so the screen always shows fresh data. A plain let can't do that: the number changes but the screen doesn't.",
      icon: '🧠',
      badge: "Хозяин состояния ¦ Holat egasi ¦ State master",
      badgeSub: "React · техническая 2 ¦ React · texnik 2 ¦ React · technical 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте кнопку ❤️ со счётчиком лайков. ¦ Layklar hisoblagichli ❤️ tugmasini yasang. ¦ Make a ❤️ button with a like counter.",
        "Добавьте переключатель тёмной темы. ¦ Qorong'i mavzu almashtirgichini qo'shing. ¦ Add a dark-mode toggle.",
      ],
      takeaway: "Дальше: Todo-list на React. ¦ Keyingisi: React'da Todo-list. ¦ Next: a to-do list in React.",
      notes: { min: 2 },
    },
  ],
});
