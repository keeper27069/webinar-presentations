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

export default kit({
  id: 'react-t04',
  title: "useEffect ¦ useEffect ¦ useEffect",
  question: "Как в React выполнить код при загрузке компонента или изменении данных? ¦ React'da komponent yuklanganda yoki ma'lumot o'zgarganda kodni qanday bajarish mumkin? ¦ How do you run code in React when a component loads or data changes?",
  route: ["Зачем ¦ Nima uchun ¦ Why", "Массив зависимостей ¦ Bog'liqliklar massivi ¦ The dependency array", "Таймер и очистка ¦ Taymer va tozalash ¦ Timers and cleanup", "Сохранение ¦ Saqlash ¦ Saving", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '⚡',
      kicker: "React · техническая тема 4 ¦ React · texnik mavzu 4 ¦ React · technical topic 4",
      title: "Код «после отрисовки» ¦ «Chizilgandan keyingi» kod ¦ Code that runs “after drawing”",
      chat: "что приложение делает сразу после открытия? ¦ ilova ochilgandan so'ng darhol nima qiladi? ¦ what does an app do right after opening?",
      lead: "Компонент рисует интерфейс. Но иногда нужно что-то ещё: загрузить данные, запустить таймер, сохранить в LocalStorage. Такие «побочные действия» делают в useEffect — он запускается после отрисовки. ¦ Komponent interfeysni chizadi. Lekin ba'zan yana biror narsa kerak: ma'lumot yuklash, taymerni ishga tushirish, LocalStorage'ga saqlash. Bunday «yon harakatlar» useEffect'da qilinadi — u chizilgandan keyin ishga tushadi. ¦ A component draws UI. Sometimes you need more: load data, start a timer, save to LocalStorage. These “side effects” go in useEffect, which runs after drawing.",
      facts: ["Загрузка данных с сервера ¦ Serverdan ma'lumot yuklash ¦ Loading data from a server", "Таймеры и подписки ¦ Taymerlar va obunalar ¦ Timers and subscriptions", "Сохранение и заголовок вкладки ¦ Saqlash va yorliq sarlavhasi ¦ Saving and the tab title"],
      takeaway: "useEffect(функция, [зависимости]) — «сделай это, когда изменится вот это». ¦ useEffect(funksiya, [bog'liqliklar]) — «mana bu o'zgarganda buni qil». ¦ useEffect(fn, [deps]) — “do this when that changes”.",
      notes: { min: 3 },
    },
    {
      type: 'cards',
      stage: 1,
      title: "Три вида useEffect ¦ useEffect'ning uch turi ¦ Three kinds of useEffect",
      chat: "какой вариант нужен для загрузки данных при открытии? ¦ ochilganda ma'lumot yuklash uchun qaysi variant kerak? ¦ which one loads data on open?",
      cards: [
        { icon: '1️⃣', front: "useEffect(fn, []) ¦ useEffect(fn, []) ¦ useEffect(fn, [])", back: "Пустой массив — один раз, при появлении компонента. Загрузка данных. ¦ Bo'sh massiv — bir marta, komponent paydo bo'lganda. Ma'lumot yuklash. ¦ Empty array: once, when the component appears. Loading data." },
        { icon: '🎯', front: "useEffect(fn, [text]) ¦ useEffect(fn, [text]) ¦ useEffect(fn, [text])", back: "Каждый раз, когда изменился text. Сохранение, поиск. ¦ text har safar o'zgarganda. Saqlash, qidirish. ¦ Every time text changes. Saving, searching." },
        { icon: '♾️', front: "useEffect(fn) ¦ useEffect(fn) ¦ useEffect(fn)", back: "Без массива — после каждой отрисовки. Нужно редко. ¦ Massivsiz — har bir chizishdan keyin. Kamdan-kam kerak. ¦ No array: after every render. Rarely needed." },
        { icon: '🧹', front: "return () => … ¦ return () => … ¦ return () => …", back: "Функция очистки: остановить таймер, отписаться. ¦ Tozalash funksiyasi: taymerni to'xtatish, obunani bekor qilish. ¦ A cleanup function: stop timers, unsubscribe." },
      ],
      takeaway: "Массив зависимостей решает, когда запускать эффект. ¦ Bog'liqliklar massivi effektni qachon ishga tushirishni hal qiladi. ¦ The dependency array decides when the effect runs.",
      notes: { min: 5 },
    },
    {
      type: 'walk',
      stage: 1,
      title: "Анатомия эффекта ¦ Effekt anatomiyasi ¦ Anatomy of an effect",
      chat: "когда сработает этот эффект? ¦ bu effekt qachon ishlaydi? ¦ when will this effect run?",
      code: `useEffect(() => {\n  document.title = 'Likes: ' + likes;\n\n  return () => {\n    // cleanup (if needed)\n  };\n}, [likes]);`,
      lang: 'js',
      marks: [
        { line: 1, text: "Первый аргумент — функция-эффект. ¦ Birinchi argument — effekt funksiyasi. ¦ The first argument is the effect function." },
        { line: 2, text: "Побочное действие: меняем заголовок вкладки браузера. ¦ Yon harakat: brauzer yorlig'ining sarlavhasini o'zgartiramiz. ¦ The side effect: change the browser tab's title." },
        { line: 4, text: "Необязательная очистка — React вызовет её перед следующим запуском или при удалении компонента. ¦ Ixtiyoriy tozalash — React uni keyingi ishga tushishdan oldin yoki komponent o'chirilganda chaqiradi. ¦ Optional cleanup — React calls it before the next run or on unmount." },
        { line: 7, text: "[likes] — запускать при первой отрисовке и каждый раз, когда изменились likes. ¦ [likes] — birinchi chizishda va likes har safar o'zgarganda ishga tushirish. ¦ [likes]: run on first render and whenever likes changes." },
      ],
      takeaway: "Эффект = что сделать + когда (зависимости) + как убрать за собой (очистка). ¦ Effekt = nima qilish + qachon (bog'liqliklar) + o'zidan keyin qanday tozalash (tozalash). ¦ An effect = what to do + when (deps) + how to clean up.",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 2,
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
      type: 'bugs',
      stage: 2,
      title: "Найдите баг ¦ Xatoni toping ¦ Find the bug",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Таймер всё быстрее ¦ Taymer tobora tezroq ¦ The timer keeps speeding up", lang: 'js', code: `useEffect(() => {\n  setInterval(() => setSeconds((s) => s + 1), 1000);\n}, [running]);`, line: 2, explain: "Нет очистки: каждый запуск эффекта добавляет ещё один интервал. Нужен return () => clearInterval(id). ¦ Tozalash yo'q: effektning har bir ishga tushishi yana bitta interval qo'shadi. return () => clearInterval(id) kerak. ¦ No cleanup: each run adds another interval. Return () => clearInterval(id).", fix: `const id = setInterval(() => setSeconds((s) => s + 1), 1000);\nreturn () => clearInterval(id);` },
        { title: "Бесконечные запросы ¦ Cheksiz so'rovlar ¦ Endless requests", lang: 'js', code: `useEffect(() => {\n  loadUsers().then((data) => setUsers(data));\n});`, line: 3, explain: "Без массива эффект идёт после каждой отрисовки: загрузили → setUsers → новая отрисовка → снова загрузка… ¦ Massivsiz effekt har bir chizishdan keyin ishlaydi: yukladik → setUsers → yangi chizish → yana yuklash… ¦ Without an array it runs after every render: load → setUsers → re-render → load again…", fix: `}, []);` },
      ],
      takeaway: "Таймеры — с очисткой, загрузка — с пустым массивом []. ¦ Taymerlar — tozalash bilan, yuklash — bo'sh [] massivi bilan. ¦ Timers need cleanup; loading needs an empty [] array.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
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
      type: 'sort',
      stage: 3,
      title: "Какой массив зависимостей? ¦ Qaysi bog'liqliklar massivi? ¦ Which dependency array?",
      chat: "пишите: «1 — []» ¦ yozing: «1 — []» ¦ write: “1 — []”",
      zones: [
        { id: 'empty', label: "[] — один раз ¦ [] — bir marta ¦ [] — once", icon: '1️⃣' },
        { id: 'dep', label: "[x] — при изменении x ¦ [x] — x o'zgarganda ¦ [x] — when x changes", icon: '🎯' },
      ],
      items: [
        { text: "Загрузить список товаров при открытии ¦ Ochilganda mahsulotlar ro'yxatini yuklash ¦ Load products on open", zone: 'empty' },
        { text: "Сохранять корзину при изменении ¦ Savatni o'zgarganda saqlash ¦ Save the cart when it changes", zone: 'dep' },
        { text: "Обновить заголовок вкладки при новом сообщении ¦ Yangi xabarda yorliq sarlavhasini yangilash ¦ Update the tab title on a new message", zone: 'dep' },
        { text: "Показать приветствие один раз ¦ Salomlashuvni bir marta ko'rsatish ¦ Show a greeting once", zone: 'empty' },
      ],
      takeaway: "Спросите себя: «когда это должно происходить?» — ответ и есть массив. ¦ O'zingizdan so'rang: «bu qachon sodir bo'lishi kerak?» — javob massivning o'zi. ¦ Ask “when should this happen?” — the answer is the array.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: таймер Помодоро ¦ Missiya: Pomodoro taymeri ¦ Mission: a Pomodoro timer",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Помодоро тикает правильно! ¦ Pomodoro to'g'ri ishlayapti! ¦ The Pomodoro ticks correctly!",
      items: [
        { title: "Запустить отсчёт при running ¦ running bo'lganda hisobni boshlash ¦ Start counting when running", choices: ["useEffect(…, [running])", "useEffect(…, [])"], correct: 0, explain: "Эффект зависит от running. ¦ Effekt running'ga bog'liq. ¦ The effect depends on running." },
        { title: "Остановить при паузе ¦ Pauzada to'xtatish ¦ Stop on pause", choices: ["return () => clearInterval(id)", "Ничего ¦ Hech narsa ¦ Nothing"], correct: 0, explain: "Очистка убирает старый интервал. ¦ Tozalash eski intervalni olib tashlaydi. ¦ Cleanup removes the old interval." },
        { title: "Время в заголовке вкладки ¦ Vaqt yorliq sarlavhasida ¦ Time in the tab title", choices: ["document.title в useEffect ¦ useEffect'da document.title ¦ document.title inside useEffect", "document.title прямо в JSX ¦ document.title to'g'ridan-to'g'ri JSX'da ¦ document.title right in JSX"], correct: 0, explain: "Изменение вне React — это побочный эффект. ¦ React'dan tashqaridagi o'zgarish — yon effekt. ¦ Changing things outside React is a side effect." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: useEffect ¦ Xulosa: useEffect ¦ Summary: useEffect",
      chat: "какой эффект вы добавите в свой проект? ¦ loyihangizga qanday effekt qo'shasiz? ¦ which effect will you add to your project?",
      answer: "useEffect запускает побочные действия после отрисовки: загрузку данных, таймеры, сохранение, заголовок вкладки. Массив зависимостей решает, когда: [] — один раз, [x] — при изменении x, без массива — после каждой отрисовки. Функция очистки (return) останавливает таймеры и подписки. Частые баги — забытая очистка и эффект без массива, который запускается бесконечно. ¦ useEffect chizilgandan keyin yon harakatlarni ishga tushiradi: ma'lumot yuklash, taymerlar, saqlash, yorliq sarlavhasi. Bog'liqliklar massivi qachonligini hal qiladi: [] — bir marta, [x] — x o'zgarganda, massivsiz — har bir chizishdan keyin. Tozalash funksiyasi (return) taymer va obunalarni to'xtatadi. Keng tarqalgan xatolar — unutilgan tozalash va cheksiz ishlaydigan massivsiz effekt. ¦ useEffect runs side effects after drawing: loading data, timers, saving, the tab title. The dependency array decides when: [] once, [x] when x changes, none after every render. The cleanup (return) stops timers and subscriptions. Classic bugs: a forgotten cleanup and an effect with no array that runs forever.",
      icon: '⚡',
      badge: "Мастер эффектов ¦ Effektlar ustasi ¦ Effect master",
      badgeSub: "React · техническая 4 ¦ React · texnik 4 ¦ React · technical 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте таймер обратного отсчёта на 25 минут с кнопками Start / Pause. ¦ Start / Pause tugmalari bilan 25 daqiqalik teskari hisob taymerini yarating. ¦ Build a 25-minute countdown with Start / Pause.",
        "Показывайте оставшееся время в заголовке вкладки. ¦ Qolgan vaqtni yorliq sarlavhasida ko'rsating. ¦ Show the remaining time in the tab title.",
      ],
      takeaway: "Следующая тема — Axios и API: загрузим данные из «сервера». ¦ Keyingi mavzu — Axios va API: «server»dan ma'lumot yuklaymiz. ¦ Next: Axios and APIs — loading data from a “server”.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
