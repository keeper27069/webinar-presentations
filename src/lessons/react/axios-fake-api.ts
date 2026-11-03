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

export default kit({
  id: 'react-t05',
  title: "Axios и fake API ¦ Axios va fake API ¦ Axios and a fake API",
  question: "Как React-приложение получает «живые» данные с сервера и показывает их? ¦ React ilovasi serverdan «jonli» ma'lumotlarni qanday oladi va ko'rsatadi? ¦ How does a React app get “live” data from a server and show it?",
  route: ["Запрос ¦ So'rov ¦ The request", "Axios ¦ Axios ¦ Axios", "Три состояния ¦ Uch holat ¦ Three states", "Ошибки ¦ Xatolar ¦ Errors", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🌐',
      kicker: "React · техническая тема 5 ¦ React · texnik mavzu 5 ¦ React · technical topic 5",
      title: "Данные приходят из сети ¦ Ma'lumotlar tarmoqdan keladi ¦ Data comes from the network",
      chat: "какие данные в ваших приложениях приходят с сервера? ¦ ilovalaringizda qanday ma'lumotlar serverdan keladi? ¦ what data in your apps comes from a server?",
      lead: "Ленты, товары, пользователи — всё это приложение запрашивает у сервера по API. В React запрос делают в useEffect, а для удобства берут библиотеку Axios. Пока сервера нет, используют fake API — тестовые данные того же формата. ¦ Lentalar, mahsulotlar, foydalanuvchilar — ilova bularning hammasini serverdan API orqali so'raydi. React'da so'rov useEffect'da qilinadi, qulaylik uchun esa Axios kutubxonasi olinadi. Server bo'lmaguncha fake API — xuddi shu formatdagi test ma'lumotlari ishlatiladi. ¦ Feeds, products, users — the app requests them from a server via an API. In React you request in useEffect, usually with the Axios library. Until a server exists you use a fake API with test data of the same shape.",
      facts: ["useEffect + [] — загрузка при открытии ¦ useEffect + [] — ochilganda yuklash ¦ useEffect + []: load on open", "Axios — удобные запросы ¦ Axios — qulay so'rovlar ¦ Axios: convenient requests", "loading / error / data — три состояния ¦ loading / error / data — uch holat ¦ loading / error / data: three states"],
      takeaway: "Сегодня выведем список пользователей «с сервера». ¦ Bugun «server»dan foydalanuvchilar ro'yxatini chiqaramiz. ¦ Today we'll render a user list “from the server”.",
      notes: { say: ["Демо работает на встроенных данных. Кнопка «Real API» — опциональный настоящий запрос к jsonplaceholder.typicode.com с запасным вариантом, если сети нет."], min: 3 },
    },
    {
      type: 'terminal',
      stage: 1,
      title: "Ставим Axios ¦ Axios'ni o'rnatamiz ¦ Installing Axios",
      chat: "сколько загрузок у axios в неделю, как думаете? ¦ sizningcha, axios haftasiga necha marta yuklanadi? ¦ how many weekly downloads does axios have, do you think?",
      lines: [
        { cmd: 'npm install axios', out: ['added 1 package'], note: "Популярный проверенный пакет. Помните урок о безопасности: проверяем имя! ¦ Mashhur tekshirilgan paket. Xavfsizlik darsini eslang: nomni tekshiramiz! ¦ A popular, trusted package. Remember the safety lesson: check the name!" },
      ],
      takeaway: "В Vite-проекте: import axios from 'axios'. В презентации мы используем «fake axios» с тем же API. ¦ Vite loyihasida: import axios from 'axios'. Taqdimotda biz o'sha API'ga ega «fake axios»dan foydalanamiz. ¦ In a Vite project: import axios from 'axios'. Here we use a “fake axios” with the same API.",
      notes: { say: ["Записанный пример. Число загрузок проверьте на npmjs.com вживую, если спросят."], min: 3 },
    },
    {
      type: 'compare',
      stage: 1,
      title: "fetch или axios ¦ fetch yoki axios ¦ fetch or axios",
      chat: "какой вариант короче? ¦ qaysi variant qisqaroq? ¦ which is shorter?",
      left: { icon: '🟨', label: 'fetch', code: `fetch('/api/users')\n  .then((res) => {\n    if (!res.ok) throw new Error(res.status);\n    return res.json();\n  })\n  .then((data) => setUsers(data));`, lang: 'js' },
      right: { icon: '🟦', label: 'axios', code: `axios.get('/api/users')\n  .then((res) => setUsers(res.data));`, lang: 'js' },
      verdict: "fetch встроен в браузер; axios сам разбирает JSON и считает ошибкой ответы 4xx/5xx. Оба подхода нормальны. ¦ fetch brauzerga o'rnatilgan; axios JSON'ni o'zi tahlil qiladi va 4xx/5xx javoblarni xato deb hisoblaydi. Ikkala yondashuv ham normal. ¦ fetch is built into the browser; axios parses JSON itself and treats 4xx/5xx as errors. Both are fine.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 2,
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
      type: 'flow',
      stage: 2,
      title: "Три состояния запроса ¦ So'rovning uch holati ¦ The three states of a request",
      chat: "что видит пользователь в каждом состоянии? ¦ foydalanuvchi har bir holatda nimani ko'radi? ¦ what does the user see in each state?",
      nodes: [
        { icon: '⏳', label: 'loading = true', text: "Запрос отправлен — показываем загрузку. ¦ So'rov yuborildi — yuklanishni ko'rsatamiz. ¦ Request sent — show a loader." },
        { icon: '✅', label: "data ¦ data ¦ data", text: "Ответ пришёл — setUsers(res.data), рисуем список. ¦ Javob keldi — setUsers(res.data), ro'yxatni chizamiz. ¦ Answer arrived — setUsers(res.data), draw the list." },
        { icon: '⚠️', label: 'error', text: "Не получилось — показываем понятное сообщение. ¦ Bo'lmadi — tushunarli xabar ko'rsatamiz. ¦ It failed — show a clear message." },
        { icon: '🏁', label: 'finally', text: "В любом случае loading = false. ¦ Har qanday holatda loading = false. ¦ Either way, loading = false." },
      ],
      takeaway: "Хорошее приложение показывает каждое из трёх состояний, а не только «успех». ¦ Yaxshi ilova faqat «muvaffaqiyat»ni emas, uchala holatning har birini ko'rsatadi. ¦ A good app shows all three states, not just success.",
      notes: { min: 4 },
    },
    {
      type: 'walk',
      stage: 2,
      title: "Загрузка в useEffect ¦ useEffect'da yuklash ¦ Loading in useEffect",
      chat: "зачем здесь пустой массив []? ¦ bu yerda bo'sh [] massivi nima uchun? ¦ why the empty [] here?",
      code: `useEffect(() => {\n  axios.get('/users')\n    .then((res) => setUsers(res.data))\n    .catch(() => setError('Could not load'))\n    .finally(() => setLoading(false));\n}, []);`,
      lang: 'js',
      marks: [
        { line: 2, text: "GET-запрос: «дай список пользователей». ¦ GET so'rovi: «foydalanuvchilar ro'yxatini ber». ¦ A GET request: “give me the users”." },
        { line: 3, text: "Ответ в res.data — кладём в состояние, React перерисует. ¦ Javob res.data'da — holatga solamiz, React qayta chizadi. ¦ The answer is in res.data — put it in state and React redraws." },
        { line: 4, text: "Ошибка сети или сервера — сохраняем сообщение. ¦ Tarmoq yoki server xatosi — xabarni saqlaymiz. ¦ A network or server error — store a message." },
        { line: 6, text: "[] — загрузить один раз при открытии, иначе запросы пойдут бесконечно. ¦ [] — ochilganda bir marta yuklash, aks holda so'rovlar cheksiz ketadi. ¦ [] loads once on open; otherwise requests repeat forever." },
      ],
      takeaway: "Запрос → then (данные) → catch (ошибка) → finally (конец загрузки). ¦ So'rov → then (ma'lumot) → catch (xato) → finally (yuklash tugadi). ¦ Request → then (data) → catch (error) → finally (done loading).",
      notes: { min: 5 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Найдите баг ¦ Xatoni toping ¦ Find the bug",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Пустой список ¦ Bo'sh ro'yxat ¦ An empty list", lang: 'js', code: `axios.get('/users').then((res) => {\n  setUsers(res);\n});`, line: 2, explain: "В axios данные лежат в res.data, а res — это весь ответ (статус, заголовки…). ¦ axios'da ma'lumotlar res.data'da, res esa — butun javob (status, sarlavhalar…). ¦ In axios the data is in res.data; res is the whole response (status, headers…).", fix: `  setUsers(res.data);` },
        { title: "Вечная загрузка при ошибке ¦ Xatoda abadiy yuklanish ¦ Endless loading on error", lang: 'js', code: `axios.get('/users')\n  .then((res) => {\n    setUsers(res.data);\n    setLoading(false);\n  });`, line: 5, explain: "Если запрос упадёт, then не выполнится и loading останется true навсегда. Нужны catch и finally. ¦ So'rov xato bersa, then bajarilmaydi va loading abadiy true qoladi. catch va finally kerak. ¦ If the request fails, then never runs and loading stays true forever. Add catch and finally.", fix: `  .then((res) => setUsers(res.data))\n  .catch(() => setError('Could not load'))\n  .finally(() => setLoading(false));` },
      ],
      takeaway: "res.data — данные; catch и finally — чтобы не зависнуть при ошибке. ¦ res.data — ma'lumotlar; catch va finally — xatoda qotib qolmaslik uchun. ¦ res.data is the data; catch and finally stop you hanging on errors.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Fake API нужен, чтобы делать интерфейс до готового сервера ¦ Fake API server tayyor bo'lgunga qadar interfeys qilish uchun kerak ¦ A fake API lets you build UI before the server exists", truth: true, explain: "Фронтенд и бэкенд работают параллельно. ¦ Frontend va backend parallel ishlaydi. ¦ Front end and back end work in parallel." },
        { text: "Запрос к серверу выполняется мгновенно ¦ Serverga so'rov bir zumda bajariladi ¦ Server requests are instant", truth: false, explain: "Идёт по сети — от миллисекунд до секунд. Поэтому нужен loading. ¦ Tarmoq orqali boradi — millisekundlardan soniyalargacha. Shuning uchun loading kerak. ¦ It travels the network — milliseconds to seconds. Hence loading." },
        { text: "Сеть может пропасть в любой момент ¦ Tarmoq istalgan vaqtda yo'qolishi mumkin ¦ The network can drop at any moment", truth: true, explain: "Поэтому error-состояние обязательно. ¦ Shuning uchun error-holat majburiy. ¦ So an error state is a must." },
      ],
      takeaway: "Сеть медленная и ненадёжная — приложение должно быть к этому готово. ¦ Tarmoq sekin va ishonchsiz — ilova bunga tayyor bo'lishi kerak. ¦ Networks are slow and unreliable — apps must be ready for it.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: каталог из API ¦ Missiya: API'dan katalog ¦ Mission: a catalogue from an API",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Каталог загружается и не ломается! ¦ Katalog yuklanadi va buzilmaydi! ¦ The catalogue loads and never breaks!",
      items: [
        { title: "Где делать запрос? ¦ So'rovni qayerda qilish kerak? ¦ Where does the request go?", choices: ["useEffect(…, []) ¦ useEffect(…, []) ¦ useEffect(…, [])", "Прямо в теле компонента ¦ To'g'ridan-to'g'ri komponent tanasida ¦ Straight in the component body"], correct: 0, explain: "Иначе запрос пойдёт при каждой отрисовке. ¦ Aks holda so'rov har bir chizishda ketadi. ¦ Otherwise it fires on every render." },
        { title: "Данные в axios лежат в… ¦ axios'da ma'lumotlar… da ¦ In axios the data lives in…", choices: ['res.data', 'res'], correct: 0, explain: "res — весь ответ. ¦ res — butun javob. ¦ res is the whole response." },
        { title: "Сервер не отвечает ¦ Server javob bermayapti ¦ The server doesn't answer", choices: ["Показать ошибку ¦ Xatoni ko'rsatish ¦ Show an error", "Вечный спиннер ¦ Abadiy spinner ¦ An eternal spinner"], correct: 0, explain: "catch + finally. ¦ catch + finally. ¦ catch + finally." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Axios и API ¦ Xulosa: Axios va API ¦ Summary: Axios and APIs",
      chat: "какой API вы бы подключили к своему React-проекту? ¦ React loyihangizga qaysi API'ni ulagan bo'lardingiz? ¦ which API would you plug into your React project?",
      answer: "Данные с сервера загружают в useEffect с пустым массивом []. Axios делает запрос короче: axios.get(url).then((res) => setData(res.data)). У каждого запроса три состояния — loading, data и error, — и все три нужно показать; catch и finally не дают приложению зависнуть. Пока сервера нет, используют fake API с данными того же формата. ¦ Serverdan ma'lumotlar bo'sh [] massivi bilan useEffect'da yuklanadi. Axios so'rovni qisqartiradi: axios.get(url).then((res) => setData(res.data)). Har bir so'rovning uch holati bor — loading, data va error — va uchalasini ham ko'rsatish kerak; catch va finally ilovaning qotib qolishiga yo'l qo'ymaydi. Server bo'lmaguncha xuddi shu formatdagi ma'lumotlarga ega fake API ishlatiladi. ¦ Server data is loaded in useEffect with an empty []. Axios shortens it: axios.get(url).then((res) => setData(res.data)). Every request has three states — loading, data and error — and all three need showing; catch and finally stop the app hanging. Until a server exists, use a fake API with the same data shape.",
      icon: '🌐',
      badge: "Связист данных ¦ Ma'lumot aloqachisi ¦ Data connector",
      badgeSub: "React · техническая 5 ¦ React · texnik 5 ¦ React · technical 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте fake API товаров (название, цена, эмодзи) и выведите карточки. ¦ Mahsulotlar fake API'sini yarating (nomi, narxi, emoji) va kartochkalarni chiqaring. ¦ Build a fake products API (name, price, emoji) and render cards.",
        "Добавьте поле поиска, которое фильтрует загруженный список. ¦ Yuklangan ro'yxatni filtrlaydigan qidiruv maydonini qo'shing. ¦ Add a search box that filters the loaded list.",
      ],
      takeaway: "Следующая тема — финальный проект модуля: магазин с корзиной. ¦ Keyingi mavzu — modulning yakuniy loyihasi: savatli do'kon. ¦ Next: the module's final project — a shop with a cart.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
