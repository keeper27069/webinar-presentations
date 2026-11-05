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

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.json{width:420px;padding:20px 24px;border-radius:16px;background:#1d1f2b;color:#e6e8ee;font:600 20px/1.6 JetBrains Mono,monospace;white-space:pre}
.json b{color:#7ee0b0;font-weight:600}.json i{color:#ffd76a;font-style:normal}
.wc{width:340px;padding:24px;border-radius:22px;background:linear-gradient(160deg,#3d7bff,#22d3c5);color:#fff;text-align:center;box-shadow:0 10px 30px #3d7bff44}
.wc .e{font-size:80px;line-height:1}.wc b{display:block;font-size:44px}.wc span{font-size:20px;font-weight:700}
.wait{font-size:26px;font-weight:800;color:#6b7183}`;
const json = (city: string, t: number, sky: string) => `<div class="wrap"><div class="json">{\n  <b>"city"</b>: <i>"${city}"</i>,\n  <b>"temp"</b>: <i>${t}</i>,\n  <b>"sky"</b>: <i>"${sky}"</i>\n}</div></div>`;
const wc = (city: string, t: number, e: string) => `<div class="wrap"><div class="wc"><div class="e">${e}</div><b>${t}°</b><span>${city}</span></div></div>`;

export default kit({
  id: 'js-g02',
  title: "Что такое API: как приложения «разговаривают» ¦ API nima: ilovalar qanday «gaplashadi» ¦ What an API is: how apps “talk”",
  question: "Откуда приложение погоды знает температуру в Ташкенте? ¦ Ob-havo ilovasi Toshkentdagi haroratni qayerdan biladi? ¦ How does a weather app know the temperature in Tashkent?",
  route: ["Официант ¦ Ofitsiant ¦ The waiter", "Запрос и ответ ¦ So'rov va javob ¦ Request & response", "Практика ¦ Amaliyot ¦ Practice", "Где API ¦ API qayerda ¦ APIs everywhere", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔌',
      kicker: "JavaScript · общая тема 2 ¦ JavaScript · umumiy mavzu 2 ¦ JavaScript · general topic 2",
      title: "API — официант между программами ¦ API — dasturlar orasidagi ofitsiant ¦ An API is a waiter between programs",
      chat: "какие приложения показывают погоду, карты или курсы валют? ¦ qaysi ilovalar ob-havo, xarita yoki valyuta kurslarini ko'rsatadi? ¦ which apps show weather, maps or exchange rates?",
      lead: "Приложение погоды не меряет температуру само. Оно спрашивает у сервиса погоды по API — договорённому способу «спросить и получить ответ». ¦ Ob-havo ilovasi haroratni o'zi o'lchamaydi. U ob-havo xizmatidan API orqali so'raydi — «so'rash va javob olish»ning kelishilgan usuli. ¦ A weather app doesn't measure temperature itself. It asks a weather service through an API — an agreed way to ask and get an answer.",
      facts: ["Запрос — что хотим ¦ So'rov — nima xohlaymiz ¦ Request: what we want", "Ответ — данные (JSON) ¦ Javob — ma'lumot (JSON) ¦ Response: data (JSON)", "Приложение рисует красиво ¦ Ilova chiroyli chizadi ¦ The app draws it nicely"],
      takeaway: "Смотрим, как работает официант-API. ¦ Ofitsiant-API qanday ishlashini ko'ramiz. ¦ Watch the API waiter at work.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Ресторан и приложение ¦ Restoran va ilova ¦ A restaurant and an app",
      chat: "кто в приложении «кухня»? ¦ ilovada «oshxona» kim? ¦ who is the “kitchen” in an app?",
      actors: [
        { id: 'you', icon: '🙂', label: "Вы ¦ Siz ¦ You" },
        { id: 'w', icon: '🤵', label: "Официант = API ¦ Ofitsiant = API ¦ Waiter = API" },
        { id: 'k', icon: '🍳', label: "Кухня = сервер ¦ Oshxona = server ¦ Kitchen = server" },
        { id: 'o', text: "«Плов, пожалуйста» ¦ «Palov, iltimos» ¦ “Plov, please”" },
        { id: 'f', icon: '🍛' },
      ],
      steps: [
        { say: "В ресторане вы не идёте на кухню — вы говорите официанту. ¦ Restoranda oshxonaga bormaysiz — ofitsiantga aytasiz. ¦ In a restaurant you don't walk into the kitchen — you tell the waiter.", at: { you: [12, 50, 1.2], w: [50, 50, 1.2], k: [88, 50, 1.2], o: [30, 20] }, lines: [['you', 'w']] },
        { say: "Официант передаёт заказ на кухню. ¦ Ofitsiant buyurtmani oshxonaga yetkazadi. ¦ The waiter passes the order to the kitchen.", at: { o: [70, 20] }, lines: [['you', 'w'], ['w', 'k']] },
        { say: "И приносит готовое блюдо. ¦ Va tayyor taomni olib keladi. ¦ And brings back the dish.", hide: ['o'], at: { f: [30, 82] }, lines: [['k', 'w'], ['w', 'you']], pulse: ['f'] },
        { say: "В приложении так же: приложение → API → сервер погоды → данные. ¦ Ilovada ham shunday: ilova → API → ob-havo serveri → ma'lumot. ¦ Apps work the same: app → API → weather server → data.", set: { you: { icon: '📱', label: "Приложение ¦ Ilova ¦ App" }, k: { icon: '🌦️', label: "Сервер погоды ¦ Ob-havo serveri ¦ Weather server" }, f: { icon: '🌡️' } }, lines: [['you', 'w'], ['w', 'k']] },
      ],
      takeaway: "API — правила, как попросить и что получишь в ответ. ¦ API — qanday so'rash va javobda nima olish qoidalari. ¦ An API is the rules for how to ask and what you'll get back.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Запрос → JSON → карточка ¦ So'rov → JSON → kartochka ¦ Request → JSON → card",
      chat: "какой город спросим? ¦ qaysi shaharni so'raymiz? ¦ which city shall we ask about?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "fetch('https://api.weather.example/now?city=Tashkent')", line: 1, html: '<div class="wrap"><div class="wait">⏳ …</div></div>', say: "Запрос: «какая погода в Ташкенте?» — город прямо в адресе. ¦ So'rov: «Toshkentda ob-havo qanday?» — shahar to'g'ridan-to'g'ri manzilda. ¦ The request: “what's the weather in Tashkent?” — the city is in the address." },
        { code: '// response (JSON)', html: json('Tashkent', 24, 'sunny'), say: "Ответ — JSON: данные в фигурных скобках, ключ и значение. ¦ Javob — JSON: jingalak qavslardagi ma'lumot, kalit va qiymat. ¦ The response is JSON: data in curly braces, keys and values." },
        { code: "out.innerHTML = '☀️ ' + data.temp + '°';", line: 1, html: wc('Tashkent', 24, '☀️'), say: "Приложение берёт data.temp и рисует красивую карточку. ¦ Ilova data.temp'ni olib, chiroyli kartochka chizadi. ¦ The app takes data.temp and draws a nice card." },
        { code: "fetch('…/now?city=Samarkand')", line: 1, html: wc('Samarkand', 19, '⛅'), say: "Поменяли город в запросе — пришли другие данные. ¦ So'rovdagi shaharni o'zgartirdik — boshqa ma'lumot keldi. ¦ Change the city in the request and different data comes back." },
      ],
      takeaway: "Спросили → получили JSON → показали. Так работают тысячи приложений. ¦ So'radik → JSON oldik → ko'rsatdik. Minglab ilovalar shunday ishlaydi. ¦ Ask → get JSON → show it. Thousands of apps work this way.",
      notes: { say: ["Адрес api.weather.example — учебный, выдуманный."], min: 5 },
    },
    {
      type: 'live',
      stage: 2,
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
      type: 'sort',
      stage: 3,
      title: "Где тут API? ¦ Bu yerda API qayerda? ¦ Where's the API?",
      chat: "пишите: «1 — API» ¦ yozing: «1 — API» ¦ write: “1 — API”",
      zones: [
        { id: 'api', label: "Через API ¦ API orqali ¦ Via an API", icon: '🔌' },
        { id: 'local', label: "Само на устройстве ¦ Qurilmaning o'zida ¦ On the device", icon: '📱' },
      ],
      items: [
        { text: "Погода в приложении ¦ Ilovadagi ob-havo ¦ Weather in an app", zone: 'api' },
        { text: "Курс доллара в банке ¦ Bankdagi dollar kursi ¦ A bank's dollar rate", zone: 'api' },
        { text: "Калькулятор без интернета ¦ Internetsiz kalkulyator ¦ An offline calculator", zone: 'local' },
        { text: "Карта в приложении доставки ¦ Yetkazib berish ilovasidagi xarita ¦ The map in a delivery app", zone: 'api' },
        { text: "Фонарик ¦ Chiroq ¦ The torch", zone: 'local' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: приложение с данными ¦ Missiya: ma'lumotli ilova ¦ Mission: an app with data",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Приложение получает свежие данные! ¦ Ilova yangi ma'lumot oladi! ¦ The app gets fresh data!",
      items: [
        { title: "API — это… ¦ API — bu… ¦ An API is…", choices: ["Способ попросить данные у другой программы ¦ Boshqa dasturdan ma'lumot so'rash usuli ¦ A way to ask another program for data", "Язык программирования ¦ Dasturlash tili ¦ A programming language"], correct: 0, explain: "Как официант. ¦ Ofitsiant kabi. ¦ Like a waiter." },
        { title: "В каком виде обычно приходит ответ? ¦ Javob odatda qanday ko'rinishda keladi? ¦ What format do answers usually come in?", choices: ['JSON', 'MP3'], correct: 0, explain: "Ключи и значения в { }. ¦ { } ichidagi kalitlar va qiymatlar. ¦ Keys and values in { }." },
        { title: "Как получить погоду Бухары? ¦ Buxoro ob-havosini qanday olish mumkin? ¦ How to get Bukhara's weather?", choices: ["Поменять city в запросе ¦ So'rovdagi city'ni o'zgartirish ¦ Change city in the request", "Перерисовать карточку ¦ Kartochkani qayta chizish ¦ Redraw the card"], correct: 0, explain: "Запрос решает, что придёт. ¦ So'rov nima kelishini hal qiladi. ¦ The request decides what comes back." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: API ¦ Xulosa: API ¦ Summary: APIs",
      chat: "какое API вы бы хотели подключить к своему сайту? ¦ saytingizga qaysi API'ni ulashni xohlardingiz? ¦ which API would you like to connect to your site?",
      answer: "API — договорённый способ, которым одна программа просит данные у другой, как официант между вами и кухней. Приложение отправляет запрос (например, «погода в Ташкенте»), сервер отвечает данными в формате JSON, а приложение превращает их в красивую карточку. Погода, курсы валют, карты в доставке — всё это работает через API. ¦ API — bir dastur boshqasidan ma'lumot so'raydigan kelishilgan usul, siz bilan oshxona orasidagi ofitsiant kabi. Ilova so'rov yuboradi (masalan, «Toshkentda ob-havo»), server JSON formatidagi ma'lumot bilan javob beradi, ilova esa ularni chiroyli kartochkaga aylantiradi. Ob-havo, valyuta kurslari, yetkazib berishdagi xaritalar — bularning hammasi API orqali ishlaydi. ¦ An API is an agreed way for one program to ask another for data, like a waiter between you and the kitchen. The app sends a request (say, “weather in Tashkent”), the server answers with JSON data, and the app turns it into a nice card. Weather, exchange rates, delivery maps — all run on APIs.",
      icon: '🔌',
      badge: "Связной приложений ¦ Ilovalar aloqachisi ¦ App connector",
      badgeSub: "JavaScript · общая 2 ¦ JavaScript · umumiy 2 ¦ JavaScript · general 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Найдите в своём телефоне 3 приложения, которые используют API. ¦ Telefoningizda API'dan foydalanadigan 3 ta ilovani toping. ¦ Find 3 apps on your phone that use APIs.",
        "Добавьте в демо-погоду свой город. ¦ Demo ob-havoga o'z shahringizni qo'shing. ¦ Add your city to the demo weather app.",
      ],
      takeaway: "Дальше: как мессенджеры шифруют переписку. ¦ Keyingisi: messenjerlar yozishmalarni qanday shifrlaydi. ¦ Next: how messengers encrypt chats.",
      notes: { min: 2 },
    },
  ],
});
