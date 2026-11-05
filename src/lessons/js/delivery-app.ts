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

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.tb{width:440px;display:grid;gap:8px}
.r{display:grid;grid-template-columns:40px 1fr 90px 60px;align-items:center;padding:10px 16px;border-radius:12px;background:#fff;box-shadow:0 4px 14px #0001;font-size:19px;font-weight:700}
.r i{font-style:normal;font-family:JetBrains Mono,monospace;color:#6b7183;text-align:right}.r b{text-align:right}
.busy{opacity:.4;text-decoration:line-through}.best{background:#e8faf7;outline:3px solid #0fb5a6}`;
const C: [string, number, boolean][] = [['Aziz', 5.0, true], ['Dina', 2.2, true], ['Timur', 1.4, false], ['Lola', 5.7, true]];
const tb = (n: number, best = false) => `<div class="wrap"><div class="tb">${C.map(([name, d, free], i) => `<div class="r ${!free && n > i ? 'busy' : ''} ${best && name === 'Dina' ? 'best' : ''}"><span>🛵</span><span>${name}</span><i>${n > i ? (free ? d.toFixed(1) + ' km' : 'busy') : '…'}</i><b>${best && name === 'Dina' ? '🏆' : ''}</b></div>`).join('')}</div></div>`;

export default kit({
  id: 'js-g05',
  title: "Как приложение доставки находит курьера рядом ¦ Yetkazib berish ilovasi yaqindagi kuryerni qanday topadi ¦ How a delivery app finds a nearby courier",
  question: "Как из десятков курьеров за секунду выбрать того, кто приедет быстрее? ¦ O'nlab kuryerlar orasidan tezroq keladiganini bir soniyada qanday tanlash mumkin? ¦ How do you pick the fastest courier out of dozens in a second?",
  route: ["Карта ¦ Xarita ¦ The map", "Расстояние ¦ Masofa ¦ Distance", "Практика ¦ Amaliyot ¦ Practice", "Не только км ¦ Faqat km emas ¦ More than km", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🛵',
      kicker: "JavaScript · общая тема 5 ¦ JavaScript · umumiy mavzu 5 ¦ JavaScript · general topic 5",
      title: "Каждый курьер — точка на карте ¦ Har bir kuryer — xaritadagi nuqta ¦ Every courier is a dot on a map",
      chat: "что вы заказывали с доставкой? ¦ yetkazib berish bilan nima buyurtma qilgansiz? ¦ what have you ordered for delivery?",
      lead: "У приложения есть координаты — x и y — у вас и у каждого курьера. Оно считает расстояния, пропускает занятых и выбирает ближайшего свободного. ¦ Ilovada sizning va har bir kuryerning koordinatalari — x va y bor. U masofalarni hisoblaydi, bandlarini o'tkazib yuboradi va eng yaqin bo'sh kuryerni tanlaydi. ¦ The app knows coordinates — x and y — for you and every courier. It works out distances, skips busy couriers and picks the nearest free one.",
      facts: ["Координаты x и y ¦ x va y koordinatalari ¦ x and y coordinates", "Формула расстояния ¦ Masofa formulasi ¦ A distance formula", "Цикл по всем курьерам ¦ Barcha kuryerlar bo'yicha sikl ¦ A loop over every courier"],
      takeaway: "Смотрим на карту. ¦ Xaritaga qaraymiz. ¦ Let's look at the map.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Кто приедет первым? ¦ Kim birinchi keladi? ¦ Who arrives first?",
      chat: "кого бы вы выбрали? ¦ siz kimni tanlagan bo'lardingiz? ¦ who would you choose?",
      actors: [
        { id: 'me', icon: '🏠', label: "Вы ¦ Siz ¦ You" },
        { id: 'az', icon: '🛵', label: 'Aziz' },
        { id: 'di', icon: '🛵', label: 'Dina' },
        { id: 'ti', icon: '🛵', label: "Timur (занят) ¦ Timur (band) ¦ Timur (busy)" },
        { id: 'lo', icon: '🛵', label: 'Lola' },
      ],
      steps: [
        { say: "Вы дома. Вокруг — 4 курьера. ¦ Siz uydasiz. Atrofda — 4 ta kuryer. ¦ You're at home with 4 couriers around.", at: { me: [46, 46, 1.3], az: [12, 80], di: [76, 24], ti: [66, 76], lo: [92, 88] } },
        { say: "Приложение меряет расстояние до каждого. ¦ Ilova har biriga masofani o'lchaydi. ¦ The app measures the distance to each one.", lines: [['me', 'az', '5.0'], ['me', 'di', '2.2'], ['me', 'ti', '1.4'], ['me', 'lo', '5.7']] },
        { say: "Тимур ближе всех, но занят — пропускаем. ¦ Timur eng yaqin, lekin band — o'tkazib yuboramiz. ¦ Timur is closest but busy — skip him.", set: { ti: { icon: '⛔' } }, lines: [['me', 'az', '5.0'], ['me', 'di', '2.2'], ['me', 'lo', '5.7']], pulse: ['ti'] },
        { say: "Из свободных ближе всех Дина — 2.2. Заказ ей! ¦ Bo'shlar orasida eng yaqini Dina — 2.2. Buyurtma unga! ¦ Of the free ones, Dina is nearest at 2.2. She gets the order!", set: { di: { icon: '🏆', label: 'Dina ✓' } }, lines: [['me', 'di', '2.2 ✓']], pulse: ['di'] },
        { say: "Дина едет к вам. ¦ Dina sizga kelmoqda. ¦ Dina heads your way.", at: { di: [58, 36] }, lines: [['me', 'di']] },
      ],
      takeaway: "Посчитать всем → убрать занятых → выбрать минимум. ¦ Hammaga hisoblash → bandlarni olib tashlash → minimumni tanlash. ¦ Measure everyone → drop the busy → pick the minimum.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Цикл ищет лучшего ¦ Sikl eng yaxshisini qidiradi ¦ A loop finds the best",
      chat: "что делает continue? ¦ continue nima qiladi? ¦ what does continue do?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "function distance(a, b) {\n  return Math.sqrt((a.x - b.x) ** 2\n                 + (a.y - b.y) ** 2);\n}", line: 2, html: tb(0), say: "Формула расстояния по координатам (как в школе — теорема Пифагора). ¦ Koordinatalar bo'yicha masofa formulasi (maktabdagidek — Pifagor teoremasi). ¦ The distance formula from coordinates (Pythagoras, like at school)." },
        { code: "for (const c of couriers) {\n  … distance(me, c) …\n}", line: 2, html: tb(2), say: "Цикл идёт по курьерам: Азиз — 5.0, Дина — 2.2… ¦ Sikl kuryerlar bo'yicha boradi: Aziz — 5.0, Dina — 2.2… ¦ The loop goes through couriers: Aziz 5.0, Dina 2.2…" },
        { code: "  if (!c.free) continue; // busy — skip", line: 1, html: tb(4), say: "Тимур занят — continue пропускает его. ¦ Timur band — continue uni o'tkazib yuboradi. ¦ Timur is busy, so continue skips him." },
        { code: "  if (!best || distance(me, c)\n      < distance(me, best)) best = c;", line: 2, html: tb(4, true), say: "Запоминаем самого близкого свободного — Дина! ¦ Eng yaqin bo'shini eslab qolamiz — Dina! ¦ Keep the nearest free one — Dina!" },
      ],
      takeaway: "Цикл + условие + «запомнить лучшее» — классический поиск минимума. ¦ Sikl + shart + «eng yaxshisini eslab qolish» — minimumni qidirishning klassik usuli. ¦ Loop + condition + “remember the best” — the classic minimum search.",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 2,
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
      type: 'sort',
      stage: 3,
      title: "Что ещё учитывает приложение? ¦ Ilova yana nimani hisobga oladi? ¦ What else does the app consider?",
      chat: "пишите: «1 — учитывает» ¦ yozing: «1 — hisobga oladi» ¦ write: “1 — considers”",
      zones: [
        { id: 'y', label: "Учитывает ¦ Hisobga oladi ¦ Considers", icon: '✅' },
        { id: 'n', label: "Не важно ¦ Muhim emas ¦ Doesn't matter", icon: '❌' },
      ],
      items: [
        { text: "Пробки по дороге ¦ Yo'ldagi tirbandliklar ¦ Traffic on the way", zone: 'y' },
        { text: "Курьер свободен или занят ¦ Kuryer bo'sh yoki band ¦ Free or busy", zone: 'y' },
        { text: "Пешком, велосипед или машина ¦ Piyoda, velosiped yoki mashina ¦ On foot, bike or car", zone: 'y' },
        { text: "Любимый цвет курьера ¦ Kuryerning sevimli rangi ¦ The courier's favourite colour", zone: 'n' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: диспетчер ¦ Missiya: dispetcher ¦ Mission: dispatcher",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Заказ доставлен быстро! ¦ Buyurtma tez yetkazildi! ¦ The order arrived fast!",
      items: [
        { title: "Свободные: 3 км, 1 км; занятый: 0.5 км. Кого выбрать? ¦ Bo'shlar: 3 km, 1 km; band: 0.5 km. Kimni tanlash kerak? ¦ Free: 3 km, 1 km; busy: 0.5 km. Who?", choices: ["1 км ¦ 1 km ¦ 1 km", "0.5 км ¦ 0.5 km ¦ 0.5 km"], correct: 0, explain: "Занятого пропускаем. ¦ Bandini o'tkazib yuboramiz. ¦ Skip the busy one." },
        { title: "Как пройти по всем курьерам? ¦ Barcha kuryerlardan qanday o'tish mumkin? ¦ How to go through every courier?", choices: ['for (const c of couriers)', 'if (couriers)'], correct: 0, explain: "Цикл по списку. ¦ Ro'yxat bo'yicha sikl. ¦ Loop over the list." },
        { title: "Что делает continue? ¦ continue nima qiladi? ¦ What does continue do?", choices: ["Пропускает этот круг ¦ Bu aylanani o'tkazib yuboradi ¦ Skips this round", "Останавливает всё ¦ Hammasini to'xtatadi ¦ Stops everything"], correct: 0, explain: "Переходим к следующему. ¦ Keyingisiga o'tamiz. ¦ Move to the next one." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: поиск курьера ¦ Xulosa: kuryer qidiruvi ¦ Summary: finding a courier",
      chat: "где ещё нужен «поиск ближайшего»? ¦ yana qayerda «eng yaqinini qidirish» kerak? ¦ where else is “find the nearest” used?",
      answer: "У вас и у каждого курьера есть координаты x и y. Приложение в цикле считает расстояние до каждого по формуле, пропускает занятых (continue) и запоминает самого близкого свободного. Настоящие приложения учитывают ещё пробки и транспорт, но идея та же: посчитать всех → убрать неподходящих → выбрать лучшего. ¦ Siz va har bir kuryerning x va y koordinatalari bor. Ilova siklda har biriga formula bo'yicha masofani hisoblaydi, bandlarini o'tkazib yuboradi (continue) va eng yaqin bo'shini eslab qoladi. Haqiqiy ilovalar tirbandlik va transportni ham hisobga oladi, lekin g'oya o'sha: hammasini hisoblash → mos kelmaydiganlarni olib tashlash → eng yaxshisini tanlash. ¦ You and every courier have x and y coordinates. In a loop the app computes each distance, skips busy couriers (continue) and remembers the nearest free one. Real apps also weigh traffic and transport, but the idea is the same: measure everyone → drop the unsuitable → pick the best.",
      icon: '🛵',
      badge: "Диспетчер доставки ¦ Yetkazib berish dispetcheri ¦ Delivery dispatcher",
      badgeSub: "JavaScript · общая 5 ¦ JavaScript · umumiy 5 ¦ JavaScript · general 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте в демо пятого курьера и проверьте, кого выберет программа. ¦ Demoga beshinchi kuryerni qo'shing va dastur kimni tanlashini tekshiring. ¦ Add a fifth courier to the demo and see who gets picked.",
        "Нарисуйте свой район как сетку и посчитайте расстояния. ¦ Mahallangizni to'r sifatida chizing va masofalarni hisoblang. ¦ Draw your neighbourhood as a grid and work out distances.",
      ],
      takeaway: "Дальше: open source — почему код раздают бесплатно. ¦ Keyingisi: open source — nega kod bepul tarqatiladi. ¦ Next: open source — why code is shared for free.",
      notes: { min: 2 },
    },
  ],
});
