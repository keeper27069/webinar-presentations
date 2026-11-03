import { kit } from '@engine/kit';

const W_HTML = `<div class="app"><h2>🌤️ Weather</h2><select id="city"><option>Tashkent</option><option>Samarkand</option><option>Bukhara</option></select><button id="go">Get weather</button><div id="out">Press the button</div></div>`;
const W_CSS = `body{margin:0;font-family:system-ui;background:linear-gradient(160deg,#3d7bff,#22d3c5);min-height:100vh;display:grid;place-items:center}
.app{background:#fff;border-radius:18px;padding:22px 26px;width:320px;text-align:center;box-shadow:0 10px 30px #0002}
h2{margin:0 0 12px}select,button{font-size:16px;padding:10px;border-radius:10px;border:1px solid #cfd5e6;margin:4px}
button{background:#1b2150;color:#fff;border:0;font-weight:700}#out{margin-top:14px;font-size:20px;min-height:60px}`;
const FAKE_API = `// Demo API: built-in data, works offline
function fakeWeatherApi(city) {
  const data = {
    Tashkent: { temp: 18, sky: '☀️' },
    Samarkand: { temp: 15, sky: '⛅' },
    Bukhara: { temp: 21, sky: '☀️' },
  };
  return new Promise((resolve) =>
    setTimeout(() => resolve({ city, ...data[city] }), 600)
  );
}`;
const W_JS = `${FAKE_API}

const out = document.querySelector('#out');
document.querySelector('#go').addEventListener('click', async () => {
  const city = document.querySelector('#city').value;
  out.textContent = '⏳ Loading…';
  const answer = await fakeWeatherApi(city);   // request → response
  console.log(answer);
  out.textContent = answer.sky + ' ' + answer.city + ': ' + answer.temp + '°C';
});`;

export default kit({
  id: 'js-g02',
  title: "Что такое API: как приложения «разговаривают» ¦ API nima: ilovalar qanday «gaplashadi» ¦ What is an API: how apps “talk”",
  question: "Откуда сайт знает погоду, курс валют или карту, если сам их не хранит? ¦ Sayt ob-havo, valyuta kursi yoki xaritani o'zi saqlamasa, ularni qayerdan biladi? ¦ How does a site know the weather, exchange rates or maps if it doesn't store them?",
  route: ["Загадка ¦ Topishmoq ¦ Puzzle", "Запрос и ответ ¦ So'rov va javob ¦ Request and response", "JSON ¦ JSON ¦ JSON", "Код ¦ Kod ¦ Code", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔌',
      kicker: "JavaScript · общая тема 2 ¦ JavaScript · umumiy mavzu 2 ¦ JavaScript · general topic 2",
      title: "Приложения просят друг у друга данные ¦ Ilovalar bir-biridan ma'lumot so'raydi ¦ Apps ask each other for data",
      chat: "в каком приложении вы сегодня видели погоду или карту? ¦ bugun qaysi ilovada ob-havo yoki xaritani ko'rdingiz? ¦ which app showed you weather or a map today?",
      lead: "Сайт кафе не запускает спутники, но показывает карту. Он просит её у другого сервиса через API — договорённость о том, как задать вопрос и в каком виде придёт ответ. ¦ Kafe sayti sun'iy yo'ldosh uchirmaydi, lekin xarita ko'rsatadi. U uni boshqa xizmatdan API orqali so'raydi — savolni qanday berish va javob qanday ko'rinishda kelishi haqidagi kelishuv. ¦ A café's site doesn't launch satellites, yet shows a map. It asks another service via an API — an agreement on how to ask and what the answer looks like.",
      facts: ["API = меню ресторана для программ ¦ API = dasturlar uchun restoran menyusi ¦ An API is a restaurant menu for programs", "Запрос → ответ ¦ So'rov → javob ¦ Request → response", "Ответ чаще всего в формате JSON ¦ Javob ko'pincha JSON formatida ¦ The answer is usually JSON"],
      takeaway: "Сегодня поймём, как JavaScript отправляет запрос и получает данные. ¦ Bugun JavaScript so'rovni qanday yuborishi va ma'lumotni qanday olishini tushunamiz. ¦ Today: how JavaScript sends a request and gets data back.",
      notes: { say: ["Демо в уроке работает на встроенных данных — интернет и ключи API не нужны."], min: 3 },
    },
    {
      type: 'poll',
      stage: 0,
      title: "Откуда погода в приложении? ¦ Ilovadagi ob-havo qayerdan? ¦ Where does the app's weather come from?",
      chat: "голосуйте 1–3 ¦ 1–3 bilan ovoz bering ¦ vote 1–3",
      question: "Приложение показывает «+18°C». Откуда оно это знает? ¦ Ilova «+18°C» ni ko'rsatadi. U buni qayerdan biladi? ¦ The app shows “+18°C”. How does it know?",
      options: [
        { label: "В телефоне есть градусник ¦ Telefonda termometr bor ¦ The phone has a thermometer" },
        { label: "Спрашивает метеосервис через API ¦ API orqali meteo xizmatidan so'raydi ¦ It asks a weather service via an API", detail: "Верно ✔ ¦ To'g'ri ✔ ¦ Correct ✔" },
        { label: "Программист вписал число вручную ¦ Dasturchi raqamni qo'lda yozgan ¦ A programmer typed it in" },
      ],
      correct: 1,
      result: "Метеосервис собирает данные со станций, а приложения получают их по API. Одно и то же API может использовать тысячи приложений. ¦ Meteo xizmat stansiyalardan ma'lumot to'playdi, ilovalar esa ularni API orqali oladi. Bitta API'dan minglab ilovalar foydalanishi mumkin. ¦ The weather service collects station data, and apps fetch it via an API. Thousands of apps can use the same API.",
      takeaway: "Приложению не нужно знать всё — достаточно знать, у кого спросить. ¦ Ilovaga hamma narsani bilish shart emas — kimdan so'rashni bilish yetarli. ¦ An app needn't know everything — just whom to ask.",
      notes: { say: ["Голосование."], min: 3 },
    },
    {
      type: 'dialog',
      stage: 1,
      title: "Официант между кухней и гостем ¦ Oshxona va mehmon orasidagi ofitsiant ¦ A waiter between kitchen and guest",
      chat: "что спросит приложение следующим? ¦ ilova keyin nimani so'raydi? ¦ what will the app ask next?",
      a: { name: "Приложение ¦ Ilova ¦ App", icon: '📱' },
      b: { name: "API погоды ¦ Ob-havo API ¦ Weather API", icon: '🌤️' },
      messages: [
        { from: 'a', text: "GET /weather?city=Tashkent ¦ GET /weather?city=Tashkent ¦ GET /weather?city=Tashkent", good: "Вопрос по правилам API ¦ API qoidalari bo'yicha savol ¦ A question in the API's format" },
        { from: 'b', text: '200 OK → { "city": "Tashkent", "temp": 18, "sky": "☀️" }' },
        { from: 'a', text: "GET /weather?city=Atlantida ¦ GET /weather?city=Atlantida ¦ GET /weather?city=Atlantis" },
        { from: 'b', text: '404 → { "error": "City not found" }', flag: "Ответ с ошибкой тоже нужно обработать ¦ Xatoli javobni ham qayta ishlash kerak ¦ Error answers must be handled too" },
      ],
      takeaway: "Приложение не знает, как устроена «кухня» сервиса. Оно знает только меню: какие запросы можно отправить. ¦ Ilova xizmat «oshxonasi» qanday tuzilganini bilmaydi. U faqat menyuni biladi: qanday so'rovlar yuborish mumkin. ¦ The app doesn't know how the service's “kitchen” works. It only knows the menu: which requests it can send.",
      notes: { say: ["Метафора: API — официант, меню — документация API."], min: 4 },
    },
    {
      type: 'flow',
      stage: 1,
      title: "Путь запроса ¦ So'rov yo'li ¦ A request's journey",
      chat: "на каком шаге пользователь видит «⏳»? ¦ foydalanuvchi qaysi qadamda «⏳» ni ko'radi? ¦ at which step does the user see “⏳”?",
      nodes: [
        { icon: '👆', label: "Клик ¦ Bosish ¦ Click", text: "Пользователь выбрал город и нажал кнопку. ¦ Foydalanuvchi shaharni tanlab tugmani bosdi. ¦ The user picked a city and pressed the button." },
        { icon: '📤', label: "Запрос ¦ So'rov ¦ Request", text: "JavaScript отправляет запрос на адрес API. ¦ JavaScript API manziliga so'rov yuboradi. ¦ JavaScript sends a request to the API address." },
        { icon: '⏳', label: "Ожидание ¦ Kutish ¦ Waiting", text: "Показываем «Загрузка…» — ответ идёт по сети. ¦ «Yuklanmoqda…» ko'rsatamiz — javob tarmoq orqali kelmoqda. ¦ Show “Loading…” while the answer travels." },
        { icon: '📦', label: "Ответ JSON ¦ JSON javob ¦ JSON response", text: "Сервер присылает данные в JSON. ¦ Server ma'lumotlarni JSON'da yuboradi. ¦ The server sends the data as JSON." },
        { icon: '🖼️', label: "DOM ¦ DOM ¦ DOM", text: "JavaScript вставляет данные на страницу. ¦ JavaScript ma'lumotlarni sahifaga qo'yadi. ¦ JavaScript puts the data on the page." },
      ],
      takeaway: "Клик → запрос → ожидание → JSON → DOM. Это основа почти любого современного сайта. ¦ Bosish → so'rov → kutish → JSON → DOM. Bu deyarli har bir zamonaviy saytning asosi. ¦ Click → request → wait → JSON → DOM. The backbone of nearly every modern site.",
      notes: { say: ["Свяжите с прошлой темой: последний шаг — это DOM, который они уже знают."], min: 4 },
    },
    {
      type: 'walk',
      stage: 2,
      title: "Читаем JSON ¦ JSON'ni o'qiymiz ¦ Reading JSON",
      chat: "как достать температуру завтра? ¦ ertangi haroratni qanday olish mumkin? ¦ how do you get tomorrow's temperature?",
      code: `{\n  "city": "Tashkent",\n  "temp": 18,\n  "sky": "☀️",\n  "wind": { "speed": 3, "unit": "m/s" },\n  "forecast": [19, 21, 17]\n}`,
      lang: 'js',
      marks: [
        { line: 2, text: "Пара «ключ: значение». Ключ всегда в кавычках. ¦ «Kalit: qiymat» jufti. Kalit doim qo'shtirnoqda. ¦ A “key: value” pair. Keys are always in quotes." },
        { line: 3, text: "Число — без кавычек. В JS: data.temp → 18. ¦ Raqam — qo'shtirnoqsiz. JS'da: data.temp → 18. ¦ Numbers have no quotes. In JS: data.temp → 18." },
        { line: 5, text: "Объект внутри объекта: data.wind.speed → 3. ¦ Obyekt ichida obyekt: data.wind.speed → 3. ¦ An object inside an object: data.wind.speed → 3." },
        { line: 6, text: "Массив: data.forecast[0] → 19 — это завтра. ¦ Massiv: data.forecast[0] → 19 — bu ertaga. ¦ An array: data.forecast[0] → 19 — that's tomorrow." },
      ],
      takeaway: "JSON похож на объект JavaScript — поэтому JS читает его так легко. ¦ JSON JavaScript obyektiga o'xshaydi — shuning uchun JS uni oson o'qiydi. ¦ JSON looks like a JavaScript object — that's why JS reads it so easily.",
      notes: { say: ["JSON — JavaScript Object Notation."], min: 5 },
    },
    {
      type: 'output',
      stage: 2,
      title: "Что выведет консоль? ¦ Konsol nimani chiqaradi? ¦ What does the console print?",
      chat: "пишите ответ до того, как я покажу ¦ men ko'rsatishimdan oldin javob yozing ¦ write your answer before I reveal it",
      snippets: [
        { label: "Ключ ¦ Kalit ¦ A key", code: `const data = { city: 'Bukhara', temp: 21 };\nconsole.log(data.city + ': ' + data.temp + '°C');`, output: ['Bukhara: 21°C'], explain: "Точка и имя ключа достают значение. ¦ Nuqta va kalit nomi qiymatni oladi. ¦ A dot plus the key name gets the value." },
        { label: "Вложенность ¦ Ichma-ichlik ¦ Nesting", code: `const data = { wind: { speed: 3 }, forecast: [19, 21, 17] };\nconsole.log(data.wind.speed);\nconsole.log(data.forecast[2]);`, output: ['3', '17'], explain: "Сначала объект wind, потом speed. Индексы массива с 0: [2] — третий. ¦ Avval wind obyekti, keyin speed. Massiv indekslari 0 dan: [2] — uchinchisi. ¦ First the wind object, then speed. Array indexes start at 0: [2] is the third." },
      ],
      takeaway: "Умеете читать объекты — умеете работать с любым API. ¦ Obyektlarni o'qiy olsangiz — istalgan API bilan ishlay olasiz. ¦ Read objects and you can work with any API.",
      notes: { say: ["Сначала ответы чата."], min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Своё мини-приложение погоды ¦ O'z mini ob-havo ilovamiz ¦ Our own mini weather app",
      chat: "какой город добавить в API? ¦ API'ga qaysi shaharni qo'shamiz? ¦ which city shall we add to the API?",
      task: "✍️ Добавьте город в data и в <select> ¦ ✍️ data va <select>'ga shahar qo'shing ¦ ✍️ Add a city to data and to the <select>",
      steps: [
        { label: "Приложение ¦ Ilova ¦ The app", html: W_HTML, css: W_CSS, js: W_JS },
      ],
      takeaway: "await ждёт ответ, а потом мы кладём данные в DOM. С настоящим API меняется только строка запроса — fetch(адрес). ¦ await javobni kutadi, keyin ma'lumotni DOM'ga qo'yamiz. Haqiqiy API bilan faqat so'rov qatori o'zgaradi — fetch(manzil). ¦ await waits for the answer, then we put the data into the DOM. With a real API only the request line changes — fetch(url).",
      notes: { say: ["fakeWeatherApi имитирует сеть задержкой 600 мс. Настоящий запрос: const res = await fetch(url); const data = await res.json(); — покажите на словах, ключи API не вводите в эфире."], min: 8 },
    },
    {
      type: 'cards',
      stage: 3,
      title: "API вокруг вас ¦ Atrofingizdagi API'lar ¦ APIs all around you",
      chat: "каким API вы пользовались, сами того не зная? ¦ o'zingiz bilmagan holda qaysi API'dan foydalangansiz? ¦ which API have you used without knowing?",
      cards: [
        { icon: '🗺️', front: "Карты ¦ Xaritalar ¦ Maps", back: "Сайт доставки показывает карту чужого сервиса. ¦ Yetkazib berish sayti boshqa xizmat xaritasini ko'rsatadi. ¦ A delivery site shows another service's map." },
        { icon: '💱', front: "Курс валют ¦ Valyuta kursi ¦ Exchange rates", back: "Магазин пересчитывает цену по курсу банка. ¦ Do'kon narxni bank kursi bo'yicha qayta hisoblaydi. ¦ A shop converts prices using a bank's rates." },
        { icon: '🔐', front: "«Войти через…» ¦ «...orqali kirish» ¦ “Sign in with…”", back: "Сайт спрашивает у другого сервиса, кто вы, — без вашего пароля. ¦ Sayt boshqa xizmatdan kimligingizni so'raydi — parolingizsiz. ¦ The site asks another service who you are — without your password." },
        { icon: '💳', front: "Оплата ¦ To'lov ¦ Payments", back: "Магазин передаёт оплату платёжному сервису. ¦ Do'kon to'lovni to'lov xizmatiga uzatadi. ¦ The shop hands payment to a payment service." },
        { icon: '🤖', front: "AI в приложениях ¦ Ilovalardagi AI ¦ AI in apps", back: "Многие приложения отправляют текст в AI-сервис по API. ¦ Ko'p ilovalar matnni API orqali AI xizmatiga yuboradi. ¦ Many apps send text to an AI service via an API." },
        { icon: '🎵', front: "Музыка и видео ¦ Musiqa va video ¦ Music and video", back: "Встроенный плеер получает трек с другого сервера. ¦ O'rnatilgan pleyer trekni boshqa serverdan oladi. ¦ An embedded player fetches the track from another server." },
      ],
      takeaway: "Современное приложение — это конструктор из десятков API. ¦ Zamonaviy ilova — o'nlab API'lardan iborat konstruktor. ¦ A modern app is a kit of dozens of APIs.",
      notes: { say: ["Открывайте по выбору чата."], min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "API — это всегда сайт с кнопками ¦ API — har doim tugmali sayt ¦ An API is always a site with buttons", truth: false, explain: "API — для программ: адрес, запрос и данные в ответ. ¦ API — dasturlar uchun: manzil, so'rov va javobda ma'lumot. ¦ APIs are for programs: an address, a request and data back." },
        { text: "Ответ от API может прийти с ошибкой ¦ API javobi xato bilan kelishi mumkin ¦ An API can answer with an error", truth: true, explain: "404, нет сети, лимит запросов — всё это надо обработать. ¦ 404, tarmoq yo'q, so'rovlar limiti — bularning hammasini qayta ishlash kerak. ¦ 404, no network, rate limits — all need handling." },
        { text: "Секретный ключ API можно оставить в публичном коде ¦ Maxfiy API kalitini ochiq kodda qoldirish mumkin ¦ A secret API key can stay in public code", truth: false, explain: "Ключ — как пароль. Его хранят на сервере, а не в коде на GitHub. ¦ Kalit — parol kabi. U GitHub'dagi kodda emas, serverda saqlanadi. ¦ A key is like a password: keep it on a server, not in code on GitHub." },
      ],
      takeaway: "API — мост между программами. Ключи от моста держим в секрете. ¦ API — dasturlar orasidagi ko'prik. Ko'prik kalitlarini sir tutamiz. ¦ An API is a bridge between programs; keep its keys secret.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Запрос или ответ? ¦ So'rovmi yoki javobmi? ¦ Request or response?",
      chat: "пишите: «1 — запрос» ¦ yozing: «1 — so'rov» ¦ write: “1 — request”",
      zones: [
        { id: 'req', label: "Запрос ¦ So'rov ¦ Request", icon: '📤' },
        { id: 'res', label: "Ответ ¦ Javob ¦ Response", icon: '📦' },
      ],
      items: [
        { text: 'GET /rates?from=USD&to=UZS', zone: 'req' },
        { text: '{ "rate": 12500 }', zone: 'res', why: "Число в ответе — пример, не реальный курс. ¦ Javobdagi raqam — misol, haqiqiy kurs emas. ¦ The number is an example, not a real rate." },
        { text: "404 Not Found ¦ 404 Not Found ¦ 404 Not Found", zone: 'res' },
        { text: 'GET /weather?city=Bukhara', zone: 'req' },
      ],
      takeaway: "Запрос задаёт вопрос, ответ приносит данные или ошибку. ¦ So'rov savol beradi, javob ma'lumot yoki xato olib keladi. ¦ A request asks; a response brings data or an error.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: подключаем данные ¦ Missiya: ma'lumotlarni ulaymiz ¦ Mission: wiring up data",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Приложение показывает живые данные! ¦ Ilova jonli ma'lumotlarni ko'rsatadi! ¦ The app shows live data!",
      items: [
        { title: "Ответ: { temp: 18 }. Как вывести 18? ¦ Javob: { temp: 18 }. 18 ni qanday chiqarish mumkin? ¦ Response: { temp: 18 }. How do you show 18?", choices: ['data.temp', 'data[18]'], correct: 0, explain: "Обращаемся по ключу. ¦ Kalit orqali murojaat qilamiz. ¦ Access it by key." },
        { title: "Пока ответа нет, показываем… ¦ Javob kelguncha ko'rsatamiz… ¦ Until the answer arrives, show…", choices: ["Пустой экран ¦ Bo'sh ekran ¦ A blank screen", "«Загрузка…» ¦ «Yuklanmoqda…» ¦ “Loading…”"], correct: 1, explain: "Пользователь видит, что приложение работает. ¦ Foydalanuvchi ilova ishlayotganini ko'radi. ¦ The user sees the app is working." },
        { title: "API ответил 404 ¦ API 404 bilan javob berdi ¦ The API returned 404", choices: ["Показать понятную ошибку ¦ Tushunarli xato ko'rsatish ¦ Show a clear error", "Ничего не делать ¦ Hech narsa qilmaslik ¦ Do nothing"], correct: 0, explain: "«Город не найден» лучше пустоты. ¦ «Shahar topilmadi» bo'shliqdan yaxshiroq. ¦ “City not found” beats a blank." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: API ¦ Xulosa: API ¦ Summary: APIs",
      chat: "какое API вы бы подключили к своему сайту? ¦ saytingizga qaysi API'ni ulagan bo'lardingiz? ¦ which API would you plug into your site?",
      answer: "API — договорённость, по которой одна программа просит у другой данные. JavaScript отправляет запрос (клик → запрос), показывает «Загрузка…», получает ответ в JSON и вставляет данные в DOM. Ответ может прийти с ошибкой — её нужно показать понятно. Секретные ключи API, как пароли, не кладут в публичный код. ¦ API — bitta dastur boshqasidan ma'lumot so'raydigan kelishuv. JavaScript so'rov yuboradi (bosish → so'rov), «Yuklanmoqda…» ni ko'rsatadi, JSON'da javob oladi va ma'lumotni DOM'ga qo'yadi. Javob xato bilan kelishi mumkin — uni tushunarli ko'rsatish kerak. Maxfiy API kalitlari, parollar kabi, ochiq kodga qo'yilmaydi. ¦ An API is an agreement by which one program asks another for data. JavaScript sends a request (click → request), shows “Loading…”, gets a JSON response and puts the data into the DOM. Answers can be errors — show them clearly. Secret API keys, like passwords, never go into public code.",
      icon: '🔌',
      badge: "Связист API ¦ API aloqachisi ¦ API connector",
      badgeSub: "JavaScript · общая 2 ¦ JavaScript · umumiy 2 ¦ JavaScript · general 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте в мини-приложение 2 города и прогноз на завтра из массива forecast. ¦ Mini ilovaga 2 ta shahar va forecast massividan ertangi prognozni qo'shing. ¦ Add 2 cities and tomorrow's forecast from a forecast array to the mini app.",
        "Найдите 3 приложения на своём телефоне, которые явно используют чужие API, и напишите, какие. ¦ Telefoningizda boshqa API'lardan foydalanadigan 3 ta ilovani toping va qaysilar ekanini yozing. ¦ Find 3 apps on your phone that clearly use other services' APIs and list them.",
      ],
      takeaway: "Следующая тема — шифрование: как данные защищают по пути. ¦ Keyingi mavzu — shifrlash: ma'lumotlar yo'lda qanday himoyalanadi. ¦ Next: encryption — how data is protected on the way.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
