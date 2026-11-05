import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#f4f6fb;color:#1b2150}
.app{max-width:520px;margin:12px auto;padding:0 12px}
.bar{display:flex;gap:8px;align-items:center;margin-bottom:10px}
button{padding:8px 14px;border:0;border-radius:10px;background:#5b3df5;color:#fff;font-weight:800}
.ghost{background:#e3e7f3;color:#1b2150}
.user{display:flex;gap:12px;align-items:center;background:#fff;border-radius:14px;padding:10px 14px;margin-bottom:8px;box-shadow:0 4px 14px #0001}
.ava{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#22d3c5;color:#fff;font-weight:900}
.user small{display:block;color:#6b7390}.msg{padding:16px;text-align:center;color:#6b7390}
.err{color:#c62828}`;
const JS = `const { useState, useEffect } = React;

// Fake API: built-in data, works offline (same shape as axios)
const USERS = [
  { id: 1, name: 'Aziza N.', email: 'aziza@demo.test' },
  { id: 2, name: 'Bek T.', email: 'bek@demo.test' },
  { id: 3, name: 'Malika Y.', email: 'malika@demo.test' },
];
const axios = {
  get: (url) => new Promise((resolve) => setTimeout(() => resolve({ data: USERS }), 800)),
};

// Optional: a real public test API, with a fallback if offline
async function loadReal() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4');
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/users')
      .then((res) => setUsers(res.data))
      .catch(() => setError('Could not load users'))
      .finally(() => setLoading(false));
  }, []);

  function tryReal() {
    setLoading(true);
    setError('');
    loadReal()
      .then((data) => setUsers(data))
      .catch((e) => setError('No network (' + e.message + ') — showing demo data'))
      .finally(() => setLoading(false));
  }

  return (
    <div className="app">
      <div className="bar">
        <b>👥 Users</b>
        <button className="ghost" onClick={tryReal}>🌐 Real API</button>
      </div>
      {loading && <div className="msg">⏳ Loading…</div>}
      {error && <div className="msg err">{error}</div>}
      {!loading && users.map((u) => (
        <div className="user" key={u.id}>
          <div className="ava">{u.name[0]}</div>
          <div>{u.name}<small>{u.email}</small></div>
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.ls{width:400px;display:grid;gap:8px}
.u{display:flex;gap:12px;align-items:center;padding:10px 14px;border-radius:14px;background:#fff;box-shadow:0 4px 14px #0001;font-weight:800;font-size:18px}
.u b{width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#0ea5d9;color:#fff}
.u small{display:block;color:#6b7183;font-weight:600}
.msg{padding:26px;border-radius:16px;background:#fff;text-align:center;font-size:24px;font-weight:800;box-shadow:0 4px 14px #0001}
.msg.err{color:#c62828;background:#fff1f1}`;
const USERS: [string, string][] = [['Aziza N.', 'aziza@demo.test'], ['Bek T.', 'bek@demo.test'], ['Malika Y.', 'malika@demo.test']];
const list = () => `<div class="wrap"><div class="ls">${USERS.map(([n, e]) => `<div class="u"><b>${n[0]}</b><span>${n}<small>${e}</small></span></div>`).join('')}</div></div>`;
const msg = (t: string, err = false) => `<div class="wrap"><div class="msg ${err ? 'err' : ''}">${t}</div></div>`;
const AX = "useEffect(() => {\n  axios.get('/users')\n    .then((res) => setUsers(res.data))\n    .catch(() => setError('Could not load'))\n    .finally(() => setLoading(false));\n}, []);";

export default kit({
  id: 'react-t05',
  title: "Axios и fake API ¦ Axios va fake API ¦ Axios and a fake API",
  question: "Как React-приложение загружает данные с сервера и что показывать, пока они едут? ¦ React ilovasi serverdan ma'lumotlarni qanday yuklaydi va ular kelguncha nimani ko'rsatish kerak? ¦ How does a React app load data from a server, and what do you show while it's on the way?",
  route: ["Запрос ¦ So'rov ¦ The request", "Три состояния ¦ Uchta holat ¦ Three states", "Код ¦ Kod ¦ The code", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '📡',
      kicker: "React · техническая тема 5 ¦ React · texnik mavzu 5 ¦ React · technical topic 5",
      title: "Данные едут не мгновенно ¦ Ma'lumotlar bir zumda kelmaydi ¦ Data doesn't arrive instantly",
      chat: "что вы видите, пока грузится лента? ¦ lenta yuklanayotganda nimani ko'rasiz? ¦ what do you see while a feed loads?",
      lead: "Axios — помощник для запросов к серверу. Пока ответ в пути, показываем «Загрузка…», пришли данные — рисуем список, случилась ошибка — честно пишем об этом. Сегодня тренируемся на fake API — учебном сервере. ¦ Axios — serverga so'rovlar uchun yordamchi. Javob yo'lda ekan, «Yuklanmoqda…»ni ko'rsatamiz, ma'lumot keldi — ro'yxat chizamiz, xato bo'ldi — bu haqda ochiq yozamiz. Bugun fake API — o'quv serverida mashq qilamiz. ¦ Axios is a helper for server requests. While the answer travels we show “Loading…”; when data arrives we draw the list; if there's an error we say so. Today we practise on a fake API — a training server.",
      facts: ["loading — ждём ¦ loading — kutamiz ¦ loading: waiting", "data — показываем ¦ data — ko'rsatamiz ¦ data: show it", "error — сообщаем ¦ error — xabar beramiz ¦ error: tell the user"],
      takeaway: "Смотрим путь запроса. ¦ So'rov yo'liga qaraymiz. ¦ Follow the request.",
      notes: { say: ["Данные пользователей в примере выдуманы (demo.test)."], min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Запрос туда и обратно ¦ So'rov u yoqqa va bu yoqqa ¦ A request there and back",
      chat: "что делать, если интернет пропал? ¦ internet yo'qolsa nima qilish kerak? ¦ what if the internet drops?",
      actors: [
        { id: 'app', icon: '⚛️', label: "Приложение ¦ Ilova ¦ App" },
        { id: 'srv', icon: '🗄️', label: "Сервер /users ¦ Server /users ¦ Server /users" },
        { id: 'st', text: "⏳ loading" },
        { id: 'pk', icon: '📦' },
      ],
      steps: [
        { say: "Приложение открылось и отправило запрос axios.get('/users'). ¦ Ilova ochildi va axios.get('/users') so'rovini yubordi. ¦ The app opens and sends axios.get('/users').", at: { app: [14, 50, 1.2], srv: [86, 50, 1.2], st: [14, 18] }, lines: [['app', 'srv', 'GET']] },
        { say: "Пока ждём — на экране «Загрузка…». ¦ Kutayotganda — ekranda «Yuklanmoqda…». ¦ While we wait, the screen says “Loading…”.", pulse: ['st'] },
        { say: "Сервер отвечает пакетом с данными. ¦ Server ma'lumotli paket bilan javob beradi. ¦ The server answers with a package of data.", at: { pk: [50, 50] }, lines: [['srv', 'app', 'data']] },
        { say: "Данные пришли — показываем список. ¦ Ma'lumotlar keldi — ro'yxatni ko'rsatamiz. ¦ The data arrives — show the list.", at: { pk: [14, 82] }, set: { st: { text: "✅ 3 users" } }, pulse: ['app'] },
      ],
      takeaway: "Запрос → ожидание → ответ. Экран должен показывать каждый этап. ¦ So'rov → kutish → javob. Ekran har bir bosqichni ko'rsatishi kerak. ¦ Request → wait → response. The screen should show each stage.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Три экрана одного запроса ¦ Bitta so'rovning uchta ekrani ¦ Three screens for one request",
      chat: "какой экран вы видите чаще всего? ¦ qaysi ekranni ko'proq ko'rasiz? ¦ which screen do you see most?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "const [loading, setLoading] = useState(true);\n\nif (loading) return <p>⏳ Loading…</p>;", line: 3, html: msg('⏳ Loading…'), say: "Сначала loading = true — показываем ожидание. ¦ Avval loading = true — kutishni ko'rsatamiz. ¦ At first loading is true — show a waiting message." },
        { code: "setUsers(res.data);\nsetLoading(false);", line: 1, html: list(), say: "Пришли данные — кладём в users, loading = false. Список! ¦ Ma'lumotlar keldi — users'ga qo'yamiz, loading = false. Ro'yxat! ¦ Data arrives: store it in users, set loading false. A list!" },
        { code: "setError('Could not load 😕');\n\nif (error) return <p>{error}</p>;", line: 3, html: msg('😕 Could not load', true), say: "Нет интернета или сервер упал — показываем понятную ошибку, а не пустоту. ¦ Internet yo'q yoki server ishdan chiqdi — bo'shliq emas, tushunarli xatoni ko'rsatamiz. ¦ No internet or a server crash? Show a clear error, not a blank screen." },
      ],
      takeaway: "Всегда три состояния: загрузка, данные, ошибка. ¦ Doim uchta holat: yuklanish, ma'lumot, xato. ¦ Always three states: loading, data, error.",
      notes: { min: 5 },
    },
    {
      type: 'walk',
      stage: 2,
      title: "Читаем код запроса ¦ So'rov kodini o'qiymiz ¦ Reading the request code",
      chat: "зачем здесь []? ¦ bu yerda [] nima uchun? ¦ why is [] here?",
      code: AX,
      lang: 'js',
      marks: [
        { line: 1, text: "useEffect: запрос после первой отрисовки. ¦ useEffect: birinchi chizilishdan keyin so'rov. ¦ useEffect: request after the first render." },
        { line: 2, text: "axios.get — «дай пользователей». ¦ axios.get — «foydalanuvchilarni ber». ¦ axios.get: “give me the users”." },
        { line: 3, text: "then — ответ пришёл, кладём в state. ¦ then — javob keldi, state'ga qo'yamiz. ¦ then: the answer arrived, store it in state." },
        { line: 4, text: "catch — ошибка, сообщаем. ¦ catch — xato, xabar beramiz. ¦ catch: an error, tell the user." },
        { line: 5, text: "finally — в любом случае загрузка закончилась. ¦ finally — har qanday holatda yuklanish tugadi. ¦ finally: loading is over either way." },
        { line: 6, text: "[] — один раз при открытии. ¦ [] — ochilganda bir marta. ¦ []: once when it opens." },
      ],
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      react: true,
      title: "Пользователи «с сервера» ¦ «Server»dan foydalanuvchilar ¦ Users “from the server”",
      chat: "нажмите «Real API» — что пришло? ¦ «Real API»ni bosing — nima keldi? ¦ press “Real API” — what arrived?",
      task: "✍️ Добавьте пользователя в USERS и нажмите ▶ ¦ ✍️ USERS'ga foydalanuvchi qo'shing va ▶ ni bosing ¦ ✍️ Add a user to USERS and press ▶",
      steps: [
        { label: "Fake API ¦ Fake API ¦ Fake API", html: '<div id="root"></div>', css: CSS, js: JS },
      ],
      takeaway: "Сначала «⏳ Загрузка…», через 0.8 с — список. Если сети нет, «Real API» покажет понятную ошибку, а не пустой экран. ¦ Avval «⏳ Yuklanmoqda…», 0.8 s dan keyin — ro'yxat. Tarmoq bo'lmasa, «Real API» bo'sh ekran emas, tushunarli xato ko'rsatadi. ¦ First “⏳ Loading…”, then the list after 0.8 s. Without a network, “Real API” shows a clear error, not a blank screen.",
      notes: { say: ["Имена и почты в демо выдуманные (*.demo.test). Реальный API — публичный тестовый сервис с фейковыми данными."], min: 9 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: надёжная загрузка ¦ Missiya: ishonchli yuklash ¦ Mission: reliable loading",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Пользователь всегда понимает, что происходит! ¦ Foydalanuvchi doim nima bo'layotganini tushunadi! ¦ The user always knows what's going on!",
      items: [
        { title: "Что показать, пока идёт запрос? ¦ So'rov ketayotganda nimani ko'rsatish kerak? ¦ What to show during a request?", choices: ["«Загрузка…» ¦ «Yuklanmoqda…» ¦ “Loading…”", "Пустой экран ¦ Bo'sh ekran ¦ A blank screen"], correct: 0, explain: "Пусть человек видит, что всё идёт. ¦ Odam hammasi ketayotganini ko'rsin. ¦ Let people see it's working." },
        { title: "Где ловят ошибку? ¦ Xato qayerda ushlanadi? ¦ Where are errors caught?", choices: ['.catch()', '.then()'], correct: 0, explain: "catch — для ошибок. ¦ catch — xatolar uchun. ¦ catch is for errors." },
        { title: "Запрос нужен один раз при открытии ¦ So'rov ochilganda bir marta kerak ¦ The request runs once on open", choices: ['useEffect(…, [])', "Прямо в теле компонента ¦ To'g'ridan-to'g'ri komponent tanasida ¦ Straight in the component body"], correct: 0, explain: "Иначе запрос пойдёт при каждой отрисовке. ¦ Aks holda so'rov har chizilishda ketadi. ¦ Otherwise it fires on every render." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Axios ¦ Xulosa: Axios ¦ Summary: Axios",
      chat: "какие данные вы бы загрузили в своё приложение? ¦ ilovangizga qanday ma'lumotlarni yuklagan bo'lardingiz? ¦ what data would you load into your app?",
      answer: "Axios отправляет запрос на сервер: axios.get('/users'). Запрос делают в useEffect с [], чтобы он ушёл один раз при открытии. Экран показывает три состояния: «Загрузка…», пока ждём, список, когда пришли данные (then), и понятную ошибку, если что-то пошло не так (catch). finally выключает загрузку в любом случае. ¦ Axios serverga so'rov yuboradi: axios.get('/users'). So'rov ochilganda bir marta ketishi uchun [] bilan useEffect'da qilinadi. Ekran uchta holatni ko'rsatadi: kutayotganda «Yuklanmoqda…», ma'lumot kelganda ro'yxat (then) va biror narsa noto'g'ri ketsa tushunarli xato (catch). finally har qanday holatda yuklanishni o'chiradi. ¦ Axios sends a request to a server: axios.get('/users'). It runs inside useEffect with [] so it fires once on open. The screen shows three states: “Loading…” while waiting, a list when data arrives (then), and a clear error if something fails (catch). finally switches loading off either way.",
      icon: '📡',
      badge: "Мастер запросов ¦ So'rovlar ustasi ¦ Request master",
      badgeSub: "React · техническая 5 ¦ React · texnik 5 ¦ React · technical 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Покажите в демо красивый спиннер вместо текста «Loading». ¦ Demoda «Loading» matni o'rniga chiroyli spinner ko'rsating. ¦ Show a nice spinner instead of “Loading” in the demo.",
        "Добавьте кнопку «Попробовать снова» при ошибке. ¦ Xato bo'lganda «Qayta urinish» tugmasini qo'shing. ¦ Add a “Try again” button on error.",
      ],
      takeaway: "Дальше: собираем интернет-магазин на React. ¦ Keyingisi: React'da internet-do'kon yig'amiz. ¦ Next: building an online shop in React.",
      notes: { min: 2 },
    },
  ],
});
