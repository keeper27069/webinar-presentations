import { kit } from '@engine/kit';

const MAP_CSS = `body{margin:0;font-family:system-ui;background:#eef2f8}
#map{position:relative;width:420px;height:300px;margin:14px auto;border-radius:16px;background:
linear-gradient(#dfe6f2 1px,transparent 1px) 0 0/42px 30px,linear-gradient(90deg,#dfe6f2 1px,transparent 1px) 0 0/42px 30px,#fff}
.pin{position:absolute;transform:translate(-50%,-50%);font-size:28px;text-align:center;line-height:1}
.pin small{display:block;font-size:12px;font-weight:700;color:#1b2150}
.best{filter:drop-shadow(0 0 8px #22d3c5)}
#info{text-align:center;font-size:18px;font-weight:700;color:#1b2150}`;
const MAP_HTML = `<div id="map"></div><p id="info"></p>`;
const CODE = `const me = { x: 5, y: 5 };
const couriers = [
  { name: 'Aziz', x: 1, y: 2, free: true },
  { name: 'Dina', x: 7, y: 6, free: true },
  { name: 'Timur', x: 6, y: 4, free: false },
  { name: 'Lola', x: 9, y: 1, free: true },
];

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

let best = null;
for (const c of couriers) {
  if (!c.free) continue;               // busy — skip
  if (!best || distance(me, c) < distance(me, best)) best = c;
}

const km = distance(me, best);
const minutes = Math.round(km * 4 + 5);  // 4 min per km + 5 to pick up

// Draw
const map = document.querySelector('#map');
const pin = (p, icon, label, cls = '') =>
  map.insertAdjacentHTML('beforeend',
    '<div class="pin ' + cls + '" style="left:' + p.x * 42 + 'px;top:' + p.y * 30 + 'px">' + icon + '<small>' + label + '</small></div>');
pin(me, '🏠', 'you');
couriers.forEach((c) => pin(c, c.free ? '🛵' : '⛔', c.name, c === best ? 'best' : ''));
document.querySelector('#info').textContent =
  '🛵 ' + best.name + ' · ' + km.toFixed(1) + ' km · ~' + minutes + ' min';`;

export default kit({
  id: 'js-g05',
  title: "Как приложение доставки находит курьера рядом ¦ Yetkazib berish ilovasi yaqindagi kuryerni qanday topadi ¦ How a delivery app finds a courier near you",
  question: "Вы нажали «Заказать» — и через секунду видите курьера и время. Как приложение это посчитало? ¦ Siz «Buyurtma berish»ni bosdingiz — va bir soniyadan keyin kuryer va vaqtni ko'rasiz. Ilova buni qanday hisobladi? ¦ You press “Order” and a second later see a courier and a time. How did the app work that out?",
  route: ["Где вы ¦ Siz qayerdasiz ¦ Where you are", "Поиск курьера ¦ Kuryer qidirish ¦ Finding a courier", "Время ¦ Vaqt ¦ The time", "Приватность ¦ Maxfiylik ¦ Privacy", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🛵',
      kicker: "JavaScript · общая тема 5 ¦ JavaScript · umumiy mavzu 5 ¦ JavaScript · general topic 5",
      title: "Секунда между кликом и курьером ¦ Bosish va kuryer orasidagi bir soniya ¦ The second between click and courier",
      chat: "что вы заказывали с доставкой в последний раз? ¦ oxirgi marta yetkazib berish bilan nima buyurtma qilgansiz? ¦ what did you last order for delivery?",
      lead: "За одну секунду приложение узнаёт, где вы, находит свободных курьеров, выбирает ближайшего и считает время. Внутри — те же переменные, условия, циклы и функции, что вы уже знаете. ¦ Bir soniyada ilova qayerdaligingizni bilib oladi, bo'sh kuryerlarni topadi, eng yaqinini tanlaydi va vaqtni hisoblaydi. Ichida — siz biladigan o'sha o'zgaruvchilar, shartlar, tsikllar va funksiyalar. ¦ In one second the app learns where you are, finds free couriers, picks the nearest and estimates the time. Inside are the same variables, conditions, loops and functions you know.",
      facts: ["Где вы — геолокация ¦ Qayerdasiz — geolokatsiya ¦ Where you are: geolocation", "Кто рядом — цикл и условие ¦ Kim yaqin — tsikl va shart ¦ Who's near: a loop and a condition", "Когда приедет — формула ¦ Qachon keladi — formula ¦ When they'll arrive: a formula"],
      takeaway: "Сегодня соберём упрощённый «мозг» приложения доставки. ¦ Bugun yetkazib berish ilovasining soddalashtirilgan «miyasi»ni yig'amiz. ¦ Today we'll build a simplified delivery-app “brain”.",
      notes: { say: ["Модель упрощённая: настоящие сервисы учитывают дороги, пробки и много другого. Имена курьеров выдуманные."], min: 3 },
    },
    {
      type: 'cards',
      stage: 0,
      title: "Как телефон узнаёт, где вы ¦ Telefon qayerdaligingizni qanday biladi ¦ How a phone knows where you are",
      chat: "какой способ самый точный? ¦ qaysi usul eng aniq? ¦ which method is most accurate?",
      cards: [
        { icon: '🛰️', front: 'GPS', back: "Сигналы спутников. Точно на улице, хуже в здании. ¦ Sun'iy yo'ldosh signallari. Ko'chada aniq, binoda yomonroq. ¦ Satellite signals. Accurate outdoors, weaker indoors." },
        { icon: '📶', front: "Wi-Fi ¦ Wi-Fi ¦ Wi-Fi", back: "Известные сети рядом помогают определить место в городе. ¦ Yaqindagi ma'lum tarmoqlar shahardagi joyni aniqlashga yordam beradi. ¦ Known nearby networks help pinpoint you in a city." },
        { icon: '📡', front: "Вышки связи ¦ Aloqa minoralari ¦ Cell towers", back: "Грубо, но работает почти везде. ¦ Taxminiy, lekin deyarli hamma joyda ishlaydi. ¦ Rough, but works almost everywhere." },
        { icon: '✋', front: "Разрешение ¦ Ruxsat ¦ Permission", back: "Сайт или приложение должно спросить вас. В JS: navigator.geolocation. ¦ Sayt yoki ilova sizdan so'rashi kerak. JS'da: navigator.geolocation. ¦ The site or app must ask you. In JS: navigator.geolocation." },
      ],
      takeaway: "Телефон комбинирует источники и выдаёт координаты: широту и долготу. ¦ Telefon manbalarni birlashtirib koordinatalarni beradi: kenglik va uzunlik. ¦ The phone combines sources and outputs coordinates: latitude and longitude.",
      notes: { say: ["Покажите на своём телефоне запрос разрешения геолокации, если удобно."], min: 4 },
    },
    {
      type: 'flow',
      stage: 1,
      title: "Алгоритм выбора курьера ¦ Kuryer tanlash algoritmi ¦ The courier-picking algorithm",
      chat: "что делать, если свободных курьеров нет? ¦ bo'sh kuryer bo'lmasa nima qilish kerak? ¦ what if no couriers are free?",
      nodes: [
        { icon: '📍', label: "Ваши координаты ¦ Koordinatalaringiz ¦ Your coordinates", text: "me = { x, y } ¦ me = { x, y } ¦ me = { x, y }" },
        { icon: '📋', label: "Список курьеров ¦ Kuryerlar ro'yxati ¦ Courier list", text: "Массив объектов с координатами и статусом. ¦ Koordinata va holatli obyektlar massivi. ¦ An array of objects with coordinates and status." },
        { icon: '🔁', label: "Перебор ¦ Ko'rib chiqish ¦ Loop", text: "Для каждого: занят — пропускаем. ¦ Har biri uchun: band — o'tkazib yuboramiz. ¦ For each one: busy → skip." },
        { icon: '📏', label: "Расстояние ¦ Masofa ¦ Distance", text: "Функция distance(me, c) — запоминаем ближайшего. ¦ distance(me, c) funksiyasi — eng yaqinini eslab qolamiz. ¦ distance(me, c) — remember the nearest." },
        { icon: '⏱️', label: "Время ¦ Vaqt ¦ Time", text: "Минуты = км × скорость + время на сборку. ¦ Daqiqalar = km × tezlik + yig'ish vaqti. ¦ Minutes = km × pace + pick-up time." },
      ],
      takeaway: "Цикл + условие + функция — и у нас поиск ближайшего. ¦ Tsikl + shart + funksiya — va bizda eng yaqinini qidirish bor. ¦ Loop + condition + function = nearest search.",
      notes: { say: ["Ответ на вопрос чата: показать «Ищем курьера…» и повторить поиск позже."], min: 4 },
    },
    {
      type: 'live',
      stage: 1,
      title: "Ищем курьера на карте ¦ Xaritada kuryer qidiramiz ¦ Finding a courier on the map",
      chat: "сделайте Dina занятой — кого выберет программа? ¦ Dina'ni band qiling — dastur kimni tanlaydi? ¦ make Dina busy — who does the program pick?",
      task: "✍️ Меняйте free и координаты курьеров ¦ ✍️ Kuryerlarning free va koordinatalarini o'zgartiring ¦ ✍️ Change couriers' free flags and coordinates",
      steps: [
        { label: "Карта ¦ Xarita ¦ The map", html: MAP_HTML, css: MAP_CSS, js: CODE },
      ],
      takeaway: "Подсвечен ближайший свободный курьер. Timur ближе, но занят — условие его пропустило. ¦ Eng yaqin bo'sh kuryer belgilangan. Timur yaqinroq, lekin band — shart uni o'tkazib yubordi. ¦ The nearest free courier is highlighted. Timur is closer but busy, so the condition skipped him.",
      notes: { say: ["Одна клетка = 1 км условно. Поменяйте по заявкам чата."], min: 8 },
    },
    {
      type: 'walk',
      stage: 1,
      title: "Сердце алгоритма ¦ Algoritm yuragi ¦ The heart of the algorithm",
      chat: "зачем нужен continue? ¦ continue nima uchun kerak? ¦ why is continue there?",
      code: `function distance(a, b) {\n  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);\n}\n\nlet best = null;\nfor (const c of couriers) {\n  if (!c.free) continue;\n  if (!best || distance(me, c) < distance(me, best)) best = c;\n}`,
      lang: 'js',
      marks: [
        { line: 2, text: "Теорема Пифагора: расстояние по прямой между двумя точками. ¦ Pifagor teoremasi: ikki nuqta orasidagi to'g'ri chiziq bo'yicha masofa. ¦ Pythagoras: the straight-line distance between two points." },
        { line: 5, text: "best = null — пока лучшего нет. ¦ best = null — hozircha eng yaxshisi yo'q. ¦ best = null — no best yet." },
        { line: 7, text: "Занятых пропускаем: continue сразу переходит к следующему. ¦ Bandlarni o'tkazib yuboramiz: continue darhol keyingisiga o'tadi. ¦ Skip busy ones: continue jumps to the next." },
        { line: 8, text: "Если лучшего ещё нет или этот ближе — запоминаем его. ¦ Agar eng yaxshisi hali yo'q bo'lsa yoki bu yaqinroq bo'lsa — uni eslab qolamiz. ¦ If there's no best yet or this one is closer, remember it." },
      ],
      takeaway: "«Найти минимум в списке» — одна из самых частых задач в программировании. ¦ «Ro'yxatdan minimumni topish» — dasturlashdagi eng keng tarqalgan vazifalardan biri. ¦ “Find the minimum in a list” is one of programming's most common tasks.",
      notes: { min: 5 },
    },
    {
      type: 'predict',
      stage: 2,
      title: "Сколько ждать? ¦ Qancha kutish kerak? ¦ How long is the wait?",
      chat: "ваш прогноз в минутах! ¦ daqiqalarda bashoratingiz! ¦ your guess in minutes!",
      label: "Курьер в 5 км. Формула: км × 4 + 5. Сколько минут? ¦ Kuryer 5 km uzoqlikda. Formula: km × 4 + 5. Necha daqiqa? ¦ The courier is 5 km away. Formula: km × 4 + 5. How many minutes?",
      min: 0,
      max: 60,
      answer: 25,
      unit: "мин ¦ daq ¦ min",
      result: "5 × 4 + 5 = 25 минут. Настоящие сервисы ещё учитывают пробки, погоду и время готовки. ¦ 5 × 4 + 5 = 25 daqiqa. Haqiqiy xizmatlar tirbandlik, ob-havo va tayyorlash vaqtini ham hisobga oladi. ¦ 5 × 4 + 5 = 25 minutes. Real services also factor in traffic, weather and cooking time.",
      takeaway: "Время доставки — это формула, а не магия. ¦ Yetkazib berish vaqti — sehr emas, formula. ¦ Delivery time is a formula, not magic.",
      notes: { min: 3 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "По прямой или по дорогам? ¦ To'g'ri chiziqdami yoki yo'llar bo'yichami? ¦ Straight line or by road?",
      chat: "почему ближайший по прямой — не всегда самый быстрый? ¦ nega to'g'ri chiziqda eng yaqini har doim eng tezi emas? ¦ why isn't the straight-line nearest always fastest?",
      left: { icon: '📏', label: "По прямой ¦ To'g'ri chiziqda ¦ Straight line", points: ["Просто посчитать ¦ Hisoblash oson ¦ Easy to compute", "Не видит рек и заборов ¦ Daryo va to'siqlarni ko'rmaydi ¦ Ignores rivers and fences", "Хорош для первой прикидки ¦ Birinchi taxmin uchun yaxshi ¦ Good for a first guess"] },
      right: { icon: '🛣️', label: "По дорогам ¦ Yo'llar bo'yicha ¦ By road", points: ["Учитывает мосты и пробки ¦ Ko'priklar va tirbandliklarni hisobga oladi ¦ Accounts for bridges and traffic", "Нужен граф дорог ¦ Yo'llar grafi kerak ¦ Needs a road graph", "Так считают навигаторы ¦ Navigatorlar shunday hisoblaydi ¦ How navigators compute it"] },
      verdict: "Сервисы часто сначала отбирают ближайших по прямой, а потом считают точный маршрут только для них. ¦ Xizmatlar ko'pincha avval to'g'ri chiziq bo'yicha eng yaqinlarini tanlaydi, keyin faqat ular uchun aniq marshrutni hisoblaydi. ¦ Services often shortlist by straight line, then compute exact routes just for those.",
      notes: { say: ["Свяжите с уроком про навигаторы (Bootstrap g2)."], min: 4 },
    },
    {
      type: 'sort',
      stage: 2,
      title: "Какое условие нужно? ¦ Qanday shart kerak? ¦ Which condition fits?",
      chat: "пишите: «1 — if» ¦ yozing: «1 — if» ¦ write: “1 — if”",
      zones: [
        { id: 'skip', label: "Пропустить курьера ¦ Kuryerni o'tkazib yuborish ¦ Skip the courier", icon: '⏭️' },
        { id: 'pick', label: "Можно выбрать ¦ Tanlash mumkin ¦ Can be picked", icon: '✅' },
      ],
      items: [
        { text: "free: false ¦ free: false ¦ free: false", zone: 'skip' },
        { text: "Свободен, 2 км ¦ Bo'sh, 2 km ¦ Free, 2 km", zone: 'pick' },
        { text: "Свободен, но на велосипеде, а заказ — 20 кг ¦ Bo'sh, lekin velosipedda, buyurtma esa — 20 kg ¦ Free, but on a bike and the order is 20 kg", zone: 'skip', why: "Ещё одно условие: груз по силам? ¦ Yana bir shart: yuk ko'tara oladimi? ¦ Another condition: can they carry it?" },
        { text: "Свободен, 4 км, на машине ¦ Bo'sh, 4 km, mashinada ¦ Free, 4 km, by car", zone: 'pick' },
      ],
      takeaway: "Настоящие приложения проверяют много условий: статус, транспорт, вес, рейтинг. ¦ Haqiqiy ilovalar ko'p shartlarni tekshiradi: holat, transport, vazn, reyting. ¦ Real apps check many conditions: status, vehicle, weight, rating.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Сайт может узнать ваше точное место без спроса ¦ Sayt aniq joyingizni so'ramasdan bila oladi ¦ A site can get your exact location without asking", truth: false, explain: "Браузер спрашивает разрешение на геолокацию. ¦ Brauzer geolokatsiya uchun ruxsat so'raydi. ¦ The browser asks permission for geolocation." },
        { text: "Доступ к геолокации можно отключить в настройках ¦ Geolokatsiyaga kirishni sozlamalarda o'chirish mumkin ¦ You can turn off location access in settings", truth: true, explain: "Давайте доступ только приложениям, которым он нужен. ¦ Faqat kerakli ilovalarga ruxsat bering. ¦ Grant it only to apps that need it." },
        { text: "Время доставки всегда точное ¦ Yetkazib berish vaqti har doim aniq ¦ Delivery estimates are always exact", truth: false, explain: "Это прогноз по формуле — пробки и погода его меняют. ¦ Bu formula bo'yicha prognoz — tirbandlik va ob-havo uni o'zgartiradi. ¦ It's a formula's forecast; traffic and weather change it." },
      ],
      takeaway: "Геолокация — полезная, но личная информация. Делитесь ею осознанно. ¦ Geolokatsiya — foydali, lekin shaxsiy ma'lumot. Uni ongli ravishda ulashing. ¦ Location is useful but personal. Share it thoughtfully.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'cheatsheet',
      stage: 3,
      title: "JS внутри доставки ¦ Yetkazib berish ichidagi JS ¦ The JS inside delivery",
      chat: "какое понятие было самым важным? ¦ qaysi tushuncha eng muhim edi? ¦ which concept mattered most?",
      sheetTitle: "5 понятий JS ¦ 5 ta JS tushunchasi ¦ 5 JS concepts",
      items: [
        { icon: '📦', text: "Объект — один курьер ¦ Obyekt — bitta kuryer ¦ Object: one courier", code: "{ name: 'Dina', x: 7, y: 6, free: true }" },
        { icon: '📋', text: "Массив — все курьеры ¦ Massiv — barcha kuryerlar ¦ Array: all couriers", code: 'const couriers = [ … ]' },
        { icon: '🔁', text: "Цикл — перебор ¦ Tsikl — ko'rib chiqish ¦ Loop: go through them", code: 'for (const c of couriers)' },
        { icon: '🔀', text: "Условие — занят? ¦ Shart — bandmi? ¦ Condition: busy?", code: 'if (!c.free) continue;' },
        { icon: '🧮', text: "Функция — расстояние ¦ Funksiya — masofa ¦ Function: distance", code: 'distance(me, c)' },
      ],
      notes: { say: ["Дайте время на скриншот."], min: 2 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: диспетчер доставки ¦ Missiya: yetkazib berish dispetcheri ¦ Mission: delivery dispatcher",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Заказ доставлен вовремя! ¦ Buyurtma o'z vaqtida yetkazildi! ¦ The order arrived on time!",
      items: [
        { title: "Ближайший курьер занят ¦ Eng yaqin kuryer band ¦ The nearest courier is busy", choices: ["Выбрать следующего свободного ¦ Keyingi bo'shini tanlash ¦ Pick the next free one", "Ждать, пока освободится ¦ Bo'shaguncha kutish ¦ Wait for him"], correct: 0, explain: "continue — и ищем дальше. ¦ continue — va davom etib qidiramiz. ¦ continue, and keep looking." },
        { title: "2 км, формула км × 4 + 5 ¦ 2 km, formula km × 4 + 5 ¦ 2 km, formula km × 4 + 5", choices: ["13 мин ¦ 13 daq ¦ 13 min", "8 мин ¦ 8 daq ¦ 8 min"], correct: 0, explain: "2 × 4 + 5 = 13. ¦ 2 × 4 + 5 = 13. ¦ 2 × 4 + 5 = 13." },
        { title: "Что хранит один курьер? ¦ Bitta kuryer nimani saqlaydi? ¦ What does one courier hold?", choices: ["Объект { name, x, y, free } ¦ { name, x, y, free } obyekti ¦ An object { name, x, y, free }", "Одно число ¦ Bitta raqam ¦ One number"], correct: 0, explain: "Объект хранит всё о курьере. ¦ Obyekt kuryer haqida hamma narsani saqlaydi. ¦ The object holds everything about them." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: приложение доставки ¦ Xulosa: yetkazib berish ilovasi ¦ Summary: the delivery app",
      chat: "какое условие вы бы добавили в выбор курьера? ¦ kuryer tanlashga qanday shart qo'shgan bo'lardingiz? ¦ what condition would you add to courier picking?",
      answer: "Приложение получает ваши координаты (GPS, Wi-Fi, вышки — с вашего разрешения), перебирает массив курьеров, условием пропускает занятых, функцией distance считает расстояние и запоминает ближайшего. Время — формула: км × скорость + время на сборку. В реальности расстояние считают по дорогам и учитывают пробки, но основа та же: переменные, объекты, циклы, условия и функции. ¦ Ilova koordinatalaringizni oladi (GPS, Wi-Fi, minoralar — ruxsatingiz bilan), kuryerlar massivini ko'rib chiqadi, shart bilan bandlarni o'tkazib yuboradi, distance funksiyasi bilan masofani hisoblaydi va eng yaqinini eslab qoladi. Vaqt — formula: km × tezlik + yig'ish vaqti. Haqiqatda masofa yo'llar bo'yicha hisoblanadi va tirbandliklar hisobga olinadi, lekin asos o'sha: o'zgaruvchilar, obyektlar, tsikllar, shartlar va funksiyalar. ¦ The app gets your coordinates (GPS, Wi-Fi, towers — with permission), loops through the couriers array, skips busy ones with a condition, measures distance with a distance function and remembers the nearest. Time is a formula: km × pace + pick-up time. Real apps measure by road and factor in traffic, but the core is the same: variables, objects, loops, conditions and functions.",
      icon: '🛵',
      badge: "Диспетчер ¦ Dispetcher ¦ Dispatcher",
      badgeSub: "JavaScript · общая 5 ¦ JavaScript · umumiy 5 ¦ JavaScript · general 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте курьерам поле rating и выбирайте ближайшего с рейтингом от 4.5. ¦ Kuryerlarga rating maydonini qo'shing va reytingi 4.5 dan yuqori eng yaqinini tanlang. ¦ Add a rating field and pick the nearest courier rated 4.5+.",
        "Если свободных нет, выводите «Ищем курьера…». ¦ Bo'sh kuryer bo'lmasa, «Kuryer qidirilmoqda…» deb chiqaring. ¦ If none are free, show “Looking for a courier…”.",
      ],
      takeaway: "Следующая тема — open source: почему программисты делятся кодом бесплатно. ¦ Keyingi mavzu — open source: nega dasturchilar kodni bepul ulashadi. ¦ Next: open source — why programmers share code for free.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
