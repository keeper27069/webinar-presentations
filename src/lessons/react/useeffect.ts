import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#f4f6fb;color:#1b2150}
.box{max-width:420px;margin:16px auto;background:#fff;border-radius:18px;padding:20px;text-align:center;box-shadow:0 8px 24px #0001;display:grid;gap:12px}
.time{font-size:60px;font-weight:900;font-variant-numeric:tabular-nums}
.row{display:flex;gap:10px;justify-content:center}
button{padding:10px 18px;border:0;border-radius:10px;background:#5b3df5;color:#fff;font-size:17px;font-weight:800}
input{padding:10px;border:1px solid #cfd5e6;border-radius:10px;font-size:17px}`;
const TIMER = `const { useState, useEffect } = React;

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    console.log('▶ timer started');
    return () => {                 // cleanup
      clearInterval(id);
      console.log('⏸ timer stopped');
    };
  }, [running]);

  return (
    <div className="box">
      <div className="time">{seconds}s</div>
      <div className="row">
        <button onClick={() => setRunning(!running)}>{running ? 'Pause' : 'Start'}</button>
        <button onClick={() => setSeconds(0)}>Reset</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Stopwatch />);`;
const SAVE = `const { useState, useEffect } = React;

function Notes() {
  // 1. Load once: saved text or empty
  const [text, setText] = useState(() => localStorage.getItem('note') || '');

  // 2. Save every time text changes
  useEffect(() => {
    localStorage.setItem('note', text);
    console.log('💾 saved:', text);
  }, [text]);

  return (
    <div className="box">
      <h2>📝 Notes</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type, then ▶ Run" />
      <small>Press ▶ Run — the text survives the “reload”</small>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Notes />);`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.tm{width:300px;padding:24px;border-radius:20px;background:#fff;text-align:center;box-shadow:0 10px 30px #0001}
.tm .n{font:900 84px JetBrains Mono,monospace;line-height:1}.tm small{display:block;margin-top:8px;color:#6b7183;font-weight:700}
.two{display:grid;grid-template-columns:1fr 1fr;gap:16px;width:540px}
.p,.s{border-radius:16px;background:#fff;box-shadow:0 8px 24px #0001;overflow:hidden}
.p .h,.s .h{padding:8px 12px;background:#eceef3;font:800 13px JetBrains Mono,monospace;color:#6b7183}
.p .b{padding:14px;font-size:18px;font-weight:700;line-height:1.7}
.s .b{padding:14px;font:700 14px JetBrains Mono,monospace;word-break:break-all}
.flash .s{outline:3px solid #0ea5d9}`;
const tm = (n: number, s: string) => `<div class="wrap"><div class="tm"><div class="n">⏱️ ${n}</div><small>${s}</small></div></div>`;
const two = (items: string[], flash: boolean) => `<div class="wrap"><div class="two ${flash ? 'flash' : ''}"><div class="p"><div class="h">⚛️ tasks</div><div class="b">${items.map((t) => '• ' + t).join('<br>')}</div></div><div class="s"><div class="h">💾 localStorage ${flash ? '✍️' : ''}</div><div class="b">${JSON.stringify(items)}</div></div></div></div>`;
const TM = "useEffect(() => {\n  const id = setInterval(() =>\n    setSec((s) => s + 1), 1000);\n  return () => clearInterval(id);\n}, []);";

export default kit({
  id: 'react-t04',
  title: "useEffect: код после отрисовки ¦ useEffect: chizilgandan keyingi kod ¦ useEffect: code after rendering",
  question: "Как запустить таймер, загрузить данные или сохранить список в нужный момент? ¦ Taymerni ishga tushirish, ma'lumot yuklash yoki ro'yxatni kerakli paytda qanday saqlash mumkin? ¦ How do you start a timer, load data or save a list at the right moment?",
  route: ["Когда ¦ Qachon ¦ When", "Таймер ¦ Taymer ¦ Timer", "Зависимости ¦ Bog'liqliklar ¦ Dependencies", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '⏰',
      kicker: "React · техническая тема 4 ¦ React · texnik mavzu 4 ¦ React · technical topic 4",
      title: "«Сначала нарисуй, потом сделай» ¦ «Avval chiz, keyin qil» ¦ “Draw first, then do”",
      chat: "что сайт делает сам, без вашего клика? ¦ sayt sizning bosishingizsiz o'zi nima qiladi? ¦ what does a site do without you clicking?",
      lead: "Иногда коду нужно сработать не по клику, а когда компонент появился или что-то поменялось: запустить таймер, загрузить данные, сохранить. Для этого есть useEffect. ¦ Ba'zan kod bosish bilan emas, komponent paydo bo'lganda yoki biror narsa o'zgarganda ishlashi kerak: taymerni ishga tushirish, ma'lumot yuklash, saqlash. Buning uchun useEffect bor. ¦ Sometimes code should run not on a click but when a component appears or something changes: start a timer, load data, save. That's useEffect.",
      facts: ["[] — один раз при появлении ¦ [] — paydo bo'lganda bir marta ¦ []: once on appear", "[tasks] — когда tasks изменился ¦ [tasks] — tasks o'zgarganda ¦ [tasks]: when tasks changes", "return — уборка при уходе ¦ return — ketishda tozalash ¦ return: clean up on leave"],
      takeaway: "Смотрим на жизнь компонента. ¦ Komponent hayotiga qaraymiz. ¦ Let's watch a component's life.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Жизнь компонента ¦ Komponent hayoti ¦ A component's life",
      chat: "когда нужно остановить таймер? ¦ taymerni qachon to'xtatish kerak? ¦ when must the timer stop?",
      actors: [
        { id: 'in', icon: '🐣', label: "Появился ¦ Paydo bo'ldi ¦ Appears" },
        { id: 'draw', icon: '🖼️', label: "Нарисован ¦ Chizildi ¦ Rendered" },
        { id: 'eff', icon: '⏱️', label: "useEffect: старт таймера ¦ useEffect: taymer starti ¦ useEffect: start timer" },
        { id: 'upd', icon: '🔄', label: "Обновления ¦ Yangilanishlar ¦ Updates" },
        { id: 'out', icon: '👋', label: "Ушёл: стоп таймера ¦ Ketdi: taymer to'xtadi ¦ Leaves: stop timer" },
      ],
      steps: [
        { say: "Компонент появился на экране… ¦ Komponent ekranda paydo bo'ldi… ¦ The component appears on screen…", at: { in: [10, 50] } },
        { say: "…React его нарисовал… ¦ …React uni chizdi… ¦ …React draws it…", at: { draw: [32, 50] }, lines: [['in', 'draw']] },
        { say: "…и только потом запускает useEffect: таймер пошёл. ¦ …va shundan keyingina useEffect'ni ishga tushiradi: taymer boshlandi. ¦ …and only then runs useEffect: the timer starts.", at: { eff: [56, 22] }, lines: [['in', 'draw'], ['draw', 'eff']], pulse: ['eff'] },
        { say: "Таймер меняет state — компонент обновляется каждую секунду. ¦ Taymer state'ni o'zgartiradi — komponent har soniyada yangilanadi. ¦ The timer changes state — the component updates every second.", at: { upd: [56, 78] }, lines: [['in', 'draw'], ['draw', 'eff'], ['eff', 'upd', '1 c ¦ 1 s ¦ 1 s'], ['upd', 'draw', '↺']] },
        { say: "Компонент убрали — return в useEffect останавливает таймер. ¦ Komponent olib tashlandi — useEffect'dagi return taymerni to'xtatadi. ¦ When it's removed, useEffect's return stops the timer.", at: { out: [88, 50] }, lines: [['eff', 'out', 'clearInterval']], pulse: ['out'] },
      ],
      takeaway: "Появился → нарисован → эффект → … → ушёл → уборка. ¦ Paydo bo'ldi → chizildi → effekt → … → ketdi → tozalash. ¦ Appear → render → effect → … → leave → clean up.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Таймер с useEffect ¦ useEffect bilan taymer ¦ A timer with useEffect",
      chat: "что будет без clearInterval? ¦ clearInterval'siz nima bo'ladi? ¦ what happens without clearInterval?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: TM, line: 1, html: tm(0, 'render → useEffect'), say: "После первой отрисовки useEffect запускает setInterval. ¦ Birinchi chizilishdan keyin useEffect setInterval'ni ishga tushiradi. ¦ After the first render, useEffect starts setInterval." },
        { code: TM, line: 3, html: tm(1, 'setSec(1)'), say: "Каждую секунду setSec прибавляет 1. ¦ Har soniyada setSec 1 qo'shadi. ¦ Every second setSec adds 1." },
        { code: TM, line: 3, html: tm(3, 'setSec(3)'), say: "…2, 3. Экран обновляется сам. ¦ …2, 3. Ekran o'zi yangilanadi. ¦ …2, 3. The screen updates itself." },
        { code: TM, line: 5, html: tm(3, '[] → effect runs once'), say: "[] в конце — «запусти эффект один раз», а не после каждой перерисовки. ¦ Oxiridagi [] — «effektni har qayta chizilishdan keyin emas, bir marta ishga tushir». ¦ The [] at the end means “run once”, not after every render." },
      ],
      takeaway: "useEffect(() => { … ; return уборка }, []) ¦ useEffect(() => { … ; return tozalash }, []) ¦ useEffect(() => { … ; return cleanup }, [])",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "[tasks]: сохранять при каждом изменении ¦ [tasks]: har o'zgarishda saqlash ¦ [tasks]: save on every change",
      chat: "сколько раз сработает сохранение? ¦ saqlash necha marta ishlaydi? ¦ how many times will saving run?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "useEffect(() => {\n  localStorage.setItem('tasks',\n    JSON.stringify(tasks));\n}, [tasks]);", line: 4, html: two(['Bread'], true), say: "[tasks] — «следи за tasks». Изменился список — эффект сохранил его. ¦ [tasks] — «tasks'ni kuzat». Ro'yxat o'zgardi — effekt uni saqladi. ¦ [tasks] means “watch tasks”. The list changed, so the effect saved it." },
        { code: "// + 'Homework'", html: two(['Bread', 'Homework'], true), say: "Добавили дело — эффект снова сохранил. ¦ Ish qo'shdik — effekt yana saqladi. ¦ Add a task and the effect saves again." },
        { code: "// theme changed, tasks didn't", html: two(['Bread', 'Homework'], false), say: "Поменяли тему, а не список — эффект НЕ сработал. Лишней работы нет. ¦ Ro'yxatni emas, mavzuni o'zgartirdik — effekt ISHLAMADI. Ortiqcha ish yo'q. ¦ Change the theme, not the list — the effect does NOT run. No wasted work." },
      ],
      takeaway: "В [] пишем, за чем следить: [] — ни за чем, [tasks] — за tasks. ¦ [] ichiga nimani kuzatishni yozamiz: [] — hech narsani, [tasks] — tasks'ni. ¦ List what to watch in []: [] watches nothing, [tasks] watches tasks.",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 3,
      react: true,
      title: "Секундомер ¦ Sekundomer ¦ A stopwatch",
      chat: "нажмите Start и Pause — что пишет консоль? ¦ Start va Pause'ni bosing — konsol nima yozadi? ¦ press Start and Pause — what does the console say?",
      task: "✍️ Start / Pause / Reset — следите за консолью ¦ ✍️ Start / Pause / Reset — konsolni kuzating ¦ ✍️ Start / Pause / Reset — watch the console",
      steps: [
        { label: "Таймер ¦ Taymer ¦ Timer", html: '<div id="root"></div>', css: CSS, js: TIMER },
      ],
      takeaway: "Эффект запускает интервал, когда running = true, а очистка останавливает его. Без очистки таймеры копились бы и «ускорялись». ¦ Effekt running = true bo'lganda intervalni ishga tushiradi, tozalash esa uni to'xtatadi. Tozalashsiz taymerlar to'planib, «tezlashib» ketardi. ¦ The effect starts an interval when running is true, and cleanup stops it. Without cleanup timers would pile up and “speed up”.",
      notes: { say: ["setSeconds((s) => s + 1) — функциональное обновление: берём самое свежее значение."], min: 8 },
    },
    {
      type: 'live',
      stage: 3,
      react: true,
      title: "Заметки, которые не пропадают ¦ Yo'qolmaydigan qaydlar ¦ Notes that don't vanish",
      chat: "напишите текст и нажмите ▶ — он остался? ¦ matn yozing va ▶ ni bosing — u qoldimi? ¦ type something and press ▶ — is it still there?",
      task: "✍️ Пишите в поле, затем ▶ Запуск (= перезагрузка) ¦ ✍️ Maydonga yozing, keyin ▶ Ishga tushirish (= qayta yuklash) ¦ ✍️ Type in the field, then ▶ Run (= reload)",
      steps: [
        { label: "LocalStorage + useEffect ¦ LocalStorage + useEffect ¦ LocalStorage + useEffect", html: '<div id="root"></div>', css: CSS, js: SAVE },
      ],
      takeaway: "useState(() => …) читает сохранённое один раз, а useEffect с [text] сохраняет при каждом изменении. Тема прошлого модуля — теперь в React. ¦ useState(() => …) saqlanganini bir marta o'qiydi, [text] bilan useEffect esa har bir o'zgarishda saqlaydi. O'tgan modul mavzusi — endi React'da. ¦ useState(() => …) reads the saved value once; useEffect with [text] saves on every change. Last module's topic, now in React.",
      notes: { say: ["▶ в редакторе пересоздаёт страницу — как перезагрузка."], min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: правильный момент ¦ Missiya: to'g'ri payt ¦ Mission: the right moment",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Всё запускается вовремя! ¦ Hammasi o'z vaqtida ishga tushadi! ¦ Everything runs on time!",
      items: [
        { title: "Загрузить данные один раз при открытии ¦ Ochilganda ma'lumotlarni bir marta yuklash ¦ Load data once on open", choices: ['useEffect(…, [])', 'useEffect(…, [tasks])'], correct: 0, explain: "[] — один раз. ¦ [] — bir marta. ¦ [] runs once." },
        { title: "Сохранять список при изменении ¦ Ro'yxatni o'zgarganda saqlash ¦ Save the list when it changes", choices: ['[tasks]', '[]'], correct: 0, explain: "Следим за tasks. ¦ tasks'ni kuzatamiz. ¦ Watch tasks." },
        { title: "Таймер продолжает тикать после ухода ¦ Taymer ketgandan keyin ham ishlamoqda ¦ The timer keeps ticking after leaving", choices: ["Добавить return () => clearInterval ¦ return () => clearInterval qo'shish ¦ Add return () => clearInterval", "Ничего ¦ Hech narsa ¦ Nothing"], correct: 0, explain: "Уборка в return. ¦ Tozalash return'da. ¦ Clean up in return." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: useEffect ¦ Xulosa: useEffect ¦ Summary: useEffect",
      chat: "что ваше приложение должно делать «само»? ¦ ilovangiz «o'zi» nima qilishi kerak? ¦ what should your app do “by itself”?",
      answer: "useEffect запускает код после отрисовки компонента: таймер, загрузку данных, сохранение. Второй аргумент говорит, когда: [] — один раз при появлении, [tasks] — каждый раз, когда изменился tasks. Функция из return — уборка: например, clearInterval, когда компонент уходит с экрана. ¦ useEffect komponent chizilgandan keyin kodni ishga tushiradi: taymer, ma'lumot yuklash, saqlash. Ikkinchi argument qachonligini aytadi: [] — paydo bo'lganda bir marta, [tasks] — tasks har o'zgarganda. return'dagi funksiya — tozalash: masalan, komponent ekrandan ketganda clearInterval. ¦ useEffect runs code after a component renders: timers, data loading, saving. The second argument says when: [] once on appear, [tasks] every time tasks changes. The returned function cleans up — e.g. clearInterval when the component leaves.",
      icon: '⏰',
      badge: "Мастер эффектов ¦ Effektlar ustasi ¦ Effect master",
      badgeSub: "React · техническая 4 ¦ React · texnik 4 ¦ React · technical 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте секундомер с кнопками Старт и Стоп. ¦ Start va Stop tugmalari bilan sekundomer yasang. ¦ Build a stopwatch with Start and Stop.",
        "Сохраняйте свой React-todo в localStorage через useEffect. ¦ React-todo'ingizni useEffect orqali localStorage'da saqlang. ¦ Save your React to-do to localStorage with useEffect.",
      ],
      takeaway: "Дальше: Axios и загрузка данных с сервера. ¦ Keyingisi: Axios va serverdan ma'lumot yuklash. ¦ Next: Axios and loading data from a server.",
      notes: { min: 2 },
    },
  ],
});
