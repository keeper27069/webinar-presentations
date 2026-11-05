import { kit } from '@engine/kit';

const CARD_HTML = `<div id="cards"></div>`;
const CARD_CSS = `body{margin:0;font-family:system-ui;background:#f2f5fb;padding:18px}
#cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.card{background:#fff;border-radius:16px;padding:16px;text-align:center;box-shadow:0 6px 20px #0001}
.card b{display:block;font-size:20px;margin:6px 0}
.card span{color:#5b3df5;font-weight:800;font-size:18px}
.sale{outline:3px solid #ff6f91}`;
const CARD_JS = `function productCard(icon, name, price, sale = false) {
  const finalPrice = sale ? price * 0.8 : price;
  return \`<div class="card \${sale ? 'sale' : ''}">
    <div style="font-size:42px">\${icon}</div>
    <b>\${name}</b>
    <span>\${finalPrice} sum</span>
  </div>\`;
}

const box = document.querySelector('#cards');
box.innerHTML =
  productCard('🍕', 'Pizza', 60000) +
  productCard('🍔', 'Burger', 35000, true) +
  productCard('🥤', 'Juice', 12000);`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.bubs{display:grid;gap:12px;width:360px}
.bub{padding:14px 20px;border-radius:18px 18px 18px 4px;background:#fff;box-shadow:0 6px 18px #0001;font-size:24px;font-weight:800}
.calc{display:grid;gap:10px;width:380px}
.ln{display:flex;justify-content:space-between;padding:12px 18px;border-radius:14px;background:#fff;box-shadow:0 4px 14px #0001;font:700 20px JetBrains Mono,monospace}
.ln.out{background:#fff6d6}`;
const bubs = (names: string[]) => `<div class="wrap"><div class="bubs">${names.map((n) => `<div class="bub">👋 Hi, ${n}!</div>`).join('')}</div></div>`;
const calc = (rows: [string, string][]) => `<div class="wrap"><div class="calc">${rows.map(([a, b]) => `<div class="ln ${b.startsWith('→') ? 'out' : ''}"><span>${a}</span><span>${b}</span></div>`).join('')}</div></div>`;

export default kit({
  id: 'js-t04',
  title: "Функции ¦ Funksiyalar ¦ Functions",
  question: "Как упаковать кусок кода в одну команду и вызывать её сколько угодно раз? ¦ Kod bo'lagini bitta buyruqqa joylab, uni istalgancha qanday chaqirish mumkin? ¦ How do you pack code into one command and call it as often as you like?",
  route: ["Машина ¦ Mashina ¦ The machine", "Параметры ¦ Parametrlar ¦ Parameters", "return ¦ return ¦ return", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '⚙️',
      kicker: "JavaScript · техническая тема 4 ¦ JavaScript · texnik mavzu 4 ¦ JavaScript · technical topic 4",
      title: "Функция — машинка с кнопкой ¦ Funksiya — tugmali mashinka ¦ A function is a machine with a button",
      chat: "какие «машинки» вы используете каждый день? ¦ har kuni qanday «mashinka»lardan foydalanasiz? ¦ what “machines” do you use every day?",
      lead: "Кофемашина: кладёшь зёрна — получаешь кофе. Функция так же: даёшь ей данные, она делает работу и возвращает результат. Написал один раз — используешь сколько угодно. ¦ Kofe mashinasi: don solasan — kofe olasan. Funksiya ham shunday: unga ma'lumot berasan, u ishni qiladi va natijani qaytaradi. Bir marta yozding — istalgancha foydalanasan. ¦ A coffee machine: put beans in, get coffee out. A function is the same: give it data, it does the work and returns a result. Write it once, use it forever.",
      facts: ["function — создать машинку ¦ function — mashinka yaratish ¦ function builds the machine", "Параметры — что кладём внутрь ¦ Parametrlar — ichiga nima solamiz ¦ Parameters: what goes in", "return — что получаем ¦ return — nima olamiz ¦ return: what comes out"],
      takeaway: "Смотрим, как работает машинка. ¦ Mashinka qanday ishlashini ko'ramiz. ¦ Let's watch the machine work.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Вход → функция → выход ¦ Kirish → funksiya → chiqish ¦ Input → function → output",
      chat: "что положим в машинку? ¦ mashinkaga nima solamiz? ¦ what shall we put in the machine?",
      actors: [
        { id: 'in1', text: "🍕 'Pizza' 60000" },
        { id: 'fn', icon: '⚙️', label: 'productCard()' },
        { id: 'out1', icon: '🃏', label: "Карточка пиццы ¦ Pitsa kartochkasi ¦ A pizza card" },
        { id: 'in2', text: "🍔 'Burger' 35000" },
        { id: 'out2', icon: '🃏', label: "Карточка бургера ¦ Burger kartochkasi ¦ A burger card" },
      ],
      steps: [
        { say: "Машинка productCard умеет делать карточку товара. ¦ productCard mashinkasi mahsulot kartochkasini yasay oladi. ¦ The productCard machine makes a product card.", at: { fn: [50, 50, 1.5] } },
        { say: "Кладём данные пиццы… ¦ Pitsa ma'lumotlarini solamiz… ¦ Put in the pizza data…", at: { in1: [14, 30] }, lines: [['in1', 'fn']] },
        { say: "…и получаем готовую карточку. ¦ …va tayyor kartochkani olamiz. ¦ …and get a finished card.", at: { out1: [86, 30] }, lines: [['in1', 'fn'], ['fn', 'out1']], pulse: ['out1'] },
        { say: "Другие данные — та же машинка — другая карточка! ¦ Boshqa ma'lumotlar — o'sha mashinka — boshqa kartochka! ¦ Different data, same machine, different card!", at: { in2: [14, 72], out2: [86, 72] }, lines: [['in1', 'fn'], ['fn', 'out1'], ['in2', 'fn'], ['fn', 'out2']], pulse: ['out2'] },
      ],
      takeaway: "Одна функция — много результатов с разными данными. ¦ Bitta funksiya — turli ma'lumotlar bilan ko'p natija. ¦ One function, many results from different data.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Параметр: что меняется ¦ Parametr: nima o'zgaradi ¦ A parameter: the part that changes",
      chat: "кого поприветствуем? пишите имя! ¦ kim bilan salomlashamiz? ismini yozing! ¦ who shall we greet? write a name!",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "function greet(name) {\n  say('Hi, ' + name + '!');\n}", line: 1, html: bubs([]), say: "Создали функцию greet. name — параметр, «пустое место» для имени. ¦ greet funksiyasini yaratdik. name — parametr, ism uchun «bo'sh joy». ¦ We create greet. name is a parameter — a blank for the name." },
        { code: "greet('Lola');", line: 1, html: bubs(['Lola']), say: "Вызываем с 'Lola' — name стал 'Lola'. ¦ 'Lola' bilan chaqiramiz — name 'Lola' bo'ldi. ¦ Call it with 'Lola' and name becomes 'Lola'." },
        { code: "greet('Lola');\ngreet('Timur');\ngreet('Aziz');", line: 3, html: bubs(['Lola', 'Timur', 'Aziz']), say: "Три вызова — три приветствия, а код функции написан один раз. ¦ Uchta chaqiruv — uchta salom, funksiya kodi esa bir marta yozilgan. ¦ Three calls, three greetings — the function was written once." },
      ],
      takeaway: "Параметр — то, что меняется при каждом вызове. ¦ Parametr — har bir chaqiruvda o'zgaradigan narsa. ¦ A parameter is what changes on each call.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "return: функция отдаёт ответ ¦ return: funksiya javob qaytaradi ¦ return: the function hands back an answer",
      chat: "сколько будет пицца со скидкой 20%? ¦ 20% chegirma bilan pitsa qancha bo'ladi? ¦ what's the pizza with a 20% discount?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "function salePrice(price) {\n  return price * 0.8;\n}", line: 2, html: calc([['salePrice(price)', '= price × 0.8']]), say: "return — «вот ответ, забирай». ¦ return — «mana javob, ol». ¦ return means “here's the answer, take it”." },
        { code: "const pizza = salePrice(60000);", line: 1, html: calc([['salePrice(60000)', '→ 48000']]), say: "Пицца 60 000 → функция вернула 48 000. Кладём в переменную. ¦ Pitsa 60 000 → funksiya 48 000 qaytardi. O'zgaruvchiga solamiz. ¦ Pizza 60,000 → the function returns 48,000, stored in a variable." },
        { code: "salePrice(60000);  // 48000\nsalePrice(35000);  // 28000\nsalePrice(12000);  // 9600", line: 3, html: calc([['salePrice(60000)', '→ 48000'], ['salePrice(35000)', '→ 28000'], ['salePrice(12000)', '→ 9600']]), say: "Любая цена — одна формула. Поменяем 0.8 на 0.7 — изменится везде. ¦ Har qanday narx — bitta formula. 0.8 ni 0.7 ga almashtirsak — hamma joyda o'zgaradi. ¦ Any price, one formula. Change 0.8 to 0.7 and it updates everywhere." },
      ],
      takeaway: "Без return функция делает дело молча. С return — отдаёт результат. ¦ return'siz funksiya ishni jimgina qiladi. return bilan — natijani qaytaradi. ¦ Without return a function works silently; with return it hands back a result.",
      notes: { min: 5 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Копировать или функция? ¦ Nusxalashmi yoki funksiyami? ¦ Copy-paste or a function?",
      chat: "где проще исправить ошибку? ¦ qayerda xatoni tuzatish osonroq? ¦ where is a bug easier to fix?",
      left: { icon: '📋', label: "Копия 3 раза ¦ 3 marta nusxa ¦ Copied 3 times", code: "a = 60000 * 0.8;\nb = 35000 * 0.8;\nc = 12000 * 0.8;", lang: 'js', points: ["Ошибку правим 3 раза ¦ Xatoni 3 marta tuzatamiz ¦ Fix a bug 3 times"] },
      right: { icon: '⚙️', label: "Одна функция ¦ Bitta funksiya ¦ One function", code: "const sale = (p) => p * 0.8;\na = sale(60000);\nb = sale(35000);", lang: 'js', points: ["Правим 1 раз ¦ 1 marta tuzatamiz ¦ Fix it once"] },
      verdict: "Повторяется 2+ раза — пора делать функцию. ¦ 2+ marta takrorlanadi — funksiya qilish vaqti keldi. ¦ Repeated twice or more? Make it a function.",
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Фабрика карточек ¦ Kartochkalar fabrikasi ¦ A card factory",
      chat: "какой товар добавим? название и цена! ¦ qanday mahsulot qo'shamiz? nomi va narxi! ¦ which product shall we add? name and price!",
      task: "✍️ Добавьте ещё один вызов productCard(...) ¦ ✍️ Yana bitta productCard(...) chaqiruvini qo'shing ¦ ✍️ Add another productCard(...) call",
      steps: [
        { label: "Карточки ¦ Kartochkalar ¦ Cards", html: CARD_HTML, css: CARD_CSS, js: CARD_JS },
      ],
      takeaway: "Одна функция — сколько угодно карточек. sale = false — значение по умолчанию, если аргумент не передали. ¦ Bitta funksiya — xohlagancha kartochka. sale = false — argument berilmasa, sukut bo'yicha qiymat. ¦ One function, any number of cards. sale = false is the default when no argument is given.",
      notes: { say: ["Добавляйте товары по заявкам чата; покажите, как true включает скидку 20%."], min: 8 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: свои машинки ¦ Missiya: o'z mashinkalaringiz ¦ Mission: your own machines",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Код короткий и без повторов! ¦ Kod qisqa va takrorlarsiz! ¦ Short code with no repeats!",
      items: [
        { title: "function double(n) { return n * 2 }. double(7) = ?", choices: ['14', '72'], correct: 0, explain: "7 × 2 = 14. ¦ 7 × 2 = 14. ¦ 7 × 2 = 14." },
        { title: "Что такое параметр? ¦ Parametr nima? ¦ What's a parameter?", choices: ["Данные, которые даём функции ¦ Funksiyaga beradigan ma'lumot ¦ Data we give the function", "Имя файла ¦ Fayl nomi ¦ A file name"], correct: 0, explain: "Пустое место для значения. ¦ Qiymat uchun bo'sh joy. ¦ A blank for a value." },
        { title: "Один и тот же код в 3 местах ¦ Bir xil kod 3 joyda ¦ The same code in 3 places", choices: ["Сделать функцию ¦ Funksiya qilish ¦ Make a function", "Оставить как есть ¦ Shundayligicha qoldirish ¦ Leave it"], correct: 0, explain: "Одно место для правок. ¦ Tuzatish uchun bitta joy. ¦ One place to fix." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: функции ¦ Xulosa: funksiyalar ¦ Summary: functions",
      chat: "какую функцию напишете для своей игры? ¦ o'yiningiz uchun qanday funksiya yozasiz? ¦ what function will you write for your game?",
      answer: "Функция — машинка: даём ей данные через параметры, она выполняет код и через return отдаёт результат. Пишем её один раз (function greet(name) { … }) и вызываем сколько угодно: greet('Lola'), greet('Timur'). Если код повторяется — пора сделать функцию: тогда исправлять придётся в одном месте. ¦ Funksiya — mashinka: unga parametrlar orqali ma'lumot beramiz, u kodni bajaradi va return orqali natijani qaytaradi. Uni bir marta yozamiz (function greet(name) { … }) va istalgancha chaqiramiz: greet('Lola'), greet('Timur'). Kod takrorlansa — funksiya qilish vaqti: shunda bitta joyda tuzatish kifoya. ¦ A function is a machine: we pass data in through parameters, it runs the code and hands back a result with return. Write it once (function greet(name) { … }) and call it as often as you like: greet('Lola'), greet('Timur'). When code repeats, make a function so there's only one place to fix.",
      icon: '⚙️',
      badge: "Изобретатель функций ¦ Funksiyalar ixtirochisi ¦ Function inventor",
      badgeSub: "JavaScript · техническая 4 ¦ JavaScript · texnik 4 ¦ JavaScript · technical 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Напишите функцию area(w, h), которая возвращает площадь. ¦ Yuzani qaytaradigan area(w, h) funksiyasini yozing. ¦ Write area(w, h) that returns the area.",
        "Сделайте 3 карточки своих товаров через productCard. ¦ productCard orqali o'z mahsulotlaringizning 3 ta kartochkasini yasang. ¦ Make 3 product cards with productCard.",
      ],
      takeaway: "Дальше: DOM — как JavaScript меняет страницу. ¦ Keyingisi: DOM — JavaScript sahifani qanday o'zgartiradi. ¦ Next: the DOM — how JavaScript changes the page.",
      notes: { min: 2 },
    },
  ],
});
