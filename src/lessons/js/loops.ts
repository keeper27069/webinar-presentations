import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.row{display:flex;gap:12px}
.c{width:76px;height:76px;border-radius:18px;display:grid;place-items:center;background:#eceef3;font:800 28px JetBrains Mono,monospace;color:#c3c7d2}
.c.on{background:#e9a400;color:#16181f;box-shadow:0 8px 20px #e9a40055}.c.cur{outline:4px solid #16181f;outline-offset:3px}
.i{margin-top:16px;text-align:center;font:800 24px JetBrains Mono,monospace}
.cd{font:800 120px JetBrains Mono,monospace;text-align:center;line-height:1}
.cd small{display:block;font:700 20px Manrope,system-ui;color:#6b7183}
.list{display:grid;gap:10px;width:320px}.li{padding:12px 18px;border-radius:14px;background:#fff;box-shadow:0 4px 14px #0001;font-size:24px;font-weight:800}`;
const boxes = (n: number, done = false) => `<div class="wrap"><div><div class="row">${[1, 2, 3, 4, 5].map((k) => `<div class="c ${k <= n ? 'on' : ''} ${k === n && !done ? 'cur' : ''}">${k}</div>`).join('')}</div><div class="i">${done ? 'i = 6 → 6 <= 5 false → stop ✋' : `i = ${n}`}</div></div></div>`;
const cd = (v: string, s: string) => `<div class="wrap"><div class="cd">${v}<small>${s}</small></div></div>`;
const list = (items: string[]) => `<div class="wrap"><div class="list">${items.map((t) => `<div class="li">${t}</div>`).join('')}</div></div>`;
const FOR = 'for (let i = 1; i <= 5; i++) {\n  light(i);\n}';

export default kit({
  id: 'js-t03',
  title: "Циклы ¦ Sikllar ¦ Loops",
  question: "Как заставить компьютер повторить действие 5, 100 или 1000 раз одной строчкой? ¦ Kompyuterni harakatni 5, 100 yoki 1000 marta bitta qator bilan qanday takrorlatish mumkin? ¦ How do you make a computer repeat something 5, 100 or 1000 times in one line?",
  route: ["Повтор ¦ Takror ¦ Repeat", "for ¦ for ¦ for", "while и списки ¦ while va ro'yxatlar ¦ while and lists", "Ошибки ¦ Xatolar ¦ Bugs", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔁',
      kicker: "JavaScript · техническая тема 3 ¦ JavaScript · texnik mavzu 3 ¦ JavaScript · technical topic 3",
      title: "Компьютер обожает повторять ¦ Kompyuter takrorlashni yaxshi ko'radi ¦ Computers love repeating",
      chat: "что вы повторяете каждый день? ¦ har kuni nimani takrorlaysiz? ¦ what do you repeat every day?",
      lead: "Написать «Привет» 100 раз руками — скучно. Цикл говорит: «повтори это, пока условие верно». И компьютер сделает это за миг. ¦ «Salom»ni qo'lda 100 marta yozish — zerikarli. Sikl aytadi: «shart to'g'ri ekan, buni takrorla». Kompyuter buni bir zumda qiladi. ¦ Typing “Hi” 100 times by hand is boring. A loop says “repeat this while the condition holds” — and the computer does it instantly.",
      facts: ["for — повтор N раз ¦ for — N marta takror ¦ for: repeat N times", "while — пока условие true ¦ while — shart true ekan ¦ while: as long as it's true", "for…of — по каждому элементу ¦ for…of — har bir element bo'yicha ¦ for…of: over each item"],
      takeaway: "Смотрим, как цикл зажигает лампочки по одной. ¦ Sikl chiroqlarni bittadan qanday yoqishini ko'ramiz. ¦ Watch a loop light the lamps one by one.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "for: счётчик i ¦ for: i hisoblagichi ¦ for: the counter i",
      chat: "сколько раз сработает цикл? ¦ sikl necha marta ishlaydi? ¦ how many times will the loop run?",
      lang: 'js',
      css: CSS,
      steps: [
        { code: FOR, line: 1, html: boxes(1), say: "Старт: i = 1. Проверка 1 <= 5 — true. Зажигаем 1. ¦ Start: i = 1. Tekshiruv 1 <= 5 — true. 1 ni yoqamiz. ¦ Start: i = 1. Check 1 <= 5 — true. Light 1." },
        { code: FOR, line: 2, html: boxes(2), say: "i++ — счётчик стал 2. Снова true — зажигаем 2. ¦ i++ — hisoblagich 2 bo'ldi. Yana true — 2 ni yoqamiz. ¦ i++ makes the counter 2. Still true — light 2." },
        { code: FOR, line: 2, html: boxes(4), say: "…3, 4… Каждый круг: проверка → действие → i++. ¦ …3, 4… Har bir aylana: tekshiruv → harakat → i++. ¦ …3, 4… Each round: check → act → i++." },
        { code: FOR, line: 2, html: boxes(5), say: "i = 5: 5 <= 5 — ещё true, зажигаем последнюю. ¦ i = 5: 5 <= 5 — hali true, oxirgisini yoqamiz. ¦ i = 5: 5 <= 5 is still true — light the last one." },
        { code: FOR, line: 1, html: boxes(5, true), say: "i = 6: 6 <= 5 — false. Цикл остановился. ¦ i = 6: 6 <= 5 — false. Sikl to'xtadi. ¦ i = 6: 6 <= 5 is false. The loop stops." },
      ],
      takeaway: "for (старт; условие; шаг) — три части счётчика. ¦ for (start; shart; qadam) — hisoblagichning uch qismi. ¦ for (start; condition; step) — the three parts of a counter.",
      notes: { min: 6 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Круг цикла ¦ Sikl aylanasi ¦ The loop's circle",
      chat: "что будет, если забыть i++? ¦ i++ ni unutsak nima bo'ladi? ¦ what if we forget i++?",
      actors: [
        { id: 'st', icon: '🏁', label: "let i = 1" },
        { id: 'ch', icon: '❓', label: "i <= 5 ?" },
        { id: 'do', icon: '💡', label: "light(i)" },
        { id: 'pp', icon: '➕', label: "i++" },
        { id: 'end', icon: '✋', label: "Стоп ¦ To'xtash ¦ Stop" },
      ],
      steps: [
        { say: "Один раз в начале: i = 1. ¦ Boshida bir marta: i = 1. ¦ Once at the start: i = 1.", at: { st: [12, 50] } },
        { say: "Проверка условия. ¦ Shartni tekshirish. ¦ Check the condition.", at: { ch: [40, 50] }, lines: [['st', 'ch']] },
        { say: "true → выполняем тело цикла. ¦ true → sikl tanasini bajaramiz. ¦ true → run the loop body.", at: { do: [66, 20] }, lines: [['st', 'ch'], ['ch', 'do', 'true']] },
        { say: "Шаг i++ — и обратно к проверке. ¦ i++ qadami — va tekshiruvga qaytamiz. ¦ Step i++ — and back to the check.", at: { pp: [66, 80] }, lines: [['ch', 'do', 'true'], ['do', 'pp'], ['pp', 'ch', '↺']], pulse: ['pp'] },
        { say: "Когда условие false — выходим. ¦ Shart false bo'lganda — chiqamiz. ¦ When the condition is false, we leave.", at: { end: [90, 50] }, lines: [['ch', 'do', 'true'], ['do', 'pp'], ['pp', 'ch', '↺'], ['ch', 'end', 'false']], pulse: ['end'] },
      ],
      takeaway: "Проверка → тело → шаг → проверка… пока не false. ¦ Tekshiruv → tana → qadam → tekshiruv… false bo'lguncha. ¦ Check → body → step → check… until false.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "while: обратный отсчёт ¦ while: teskari sanoq ¦ while: a countdown",
      chat: "с какого числа начнём отсчёт? ¦ sanoqni qaysi sondan boshlaymiz? ¦ which number shall we count down from?",
      lang: 'js',
      css: CSS,
      steps: [
        { code: "let n = 3;\nwhile (n > 0) {\n  show(n);\n  n--;\n}\nshow('🚀');", line: 3, html: cd('3', 'n = 3 → 3 > 0 ✓'), say: "while крутится, пока условие true. n = 3 — показываем. ¦ while shart true ekan aylanadi. n = 3 — ko'rsatamiz. ¦ while runs as long as the condition is true. n = 3 — show it." },
        { code: "let n = 3;\nwhile (n > 0) {\n  show(n);\n  n--;\n}\nshow('🚀');", line: 4, html: cd('2', 'n-- → 2'), say: "n-- уменьшает на 1: уже 2. ¦ n-- 1 ga kamaytiradi: endi 2. ¦ n-- subtracts 1: now 2." },
        { code: "let n = 3;\nwhile (n > 0) {\n  show(n);\n  n--;\n}\nshow('🚀');", line: 3, html: cd('1', 'n = 1 → 1 > 0 ✓'), say: "1… ¦ 1… ¦ 1…" },
        { code: "let n = 3;\nwhile (n > 0) {\n  show(n);\n  n--;\n}\nshow('🚀');", line: 6, html: cd('🚀', 'n = 0 → 0 > 0 ✗ → stop'), say: "n = 0: условие false — цикл закончился. Пуск! ¦ n = 0: shart false — sikl tugadi. Uchirish! ¦ n = 0: the condition is false — the loop ends. Lift-off!" },
      ],
      takeaway: "while — когда не знаем заранее, сколько повторов. ¦ while — takrorlar sonini oldindan bilmaganimizda. ¦ Use while when you don't know the count in advance.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "for…of: по каждому элементу списка ¦ for…of: ro'yxatning har bir elementi bo'yicha ¦ for…of: over every item in a list",
      chat: "какой фрукт добавим в список? ¦ ro'yxatga qaysi mevani qo'shamiz? ¦ which fruit shall we add?",
      lang: 'js',
      css: CSS,
      steps: [
        { code: "const fruits = ['🍎', '🍌', '🍇'];", line: 1, html: list([]), say: "Список из трёх фруктов. ¦ Uchta mevadan iborat ro'yxat. ¦ A list of three fruits." },
        { code: "for (const fruit of fruits) {\n  add('I like ' + fruit);\n}", line: 2, html: list(['I like 🍎']), say: "Первый круг: fruit = 🍎. ¦ Birinchi aylana: fruit = 🍎. ¦ Round one: fruit = 🍎." },
        { code: "for (const fruit of fruits) {\n  add('I like ' + fruit);\n}", line: 2, html: list(['I like 🍎', 'I like 🍌', 'I like 🍇']), say: "Цикл сам прошёл по всем — три строчки за один код. ¦ Sikl hammasini o'zi aylanib chiqdi — bitta kod bilan uch qator. ¦ The loop visited every item — three lines from one piece of code." },
        { code: "fruits.push('🍓');\n// the same loop", line: 1, html: list(['I like 🍎', 'I like 🍌', 'I like 🍇', 'I like 🍓']), say: "Добавили клубнику — цикл не меняли, а строк стало 4. ¦ Qulupnay qo'shdik — siklni o'zgartirmadik, qatorlar 4 ta bo'ldi. ¦ Add a strawberry: the loop is unchanged, but there are 4 lines now." },
      ],
      takeaway: "for…of берёт элементы по одному — сколько бы их ни было. ¦ for…of elementlarni bittadan oladi — qancha bo'lishidan qat'i nazar. ¦ for…of takes items one by one, however many there are.",
      notes: { min: 4 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Найдите ошибку в цикле ¦ Sikldagi xatoni toping ¦ Find the loop bug",
      chat: "пишите номер строки ¦ qator raqamini yozing ¦ write the line number",
      snippets: [
        { title: "Цикл никогда не заканчивается ¦ Sikl hech qachon tugamaydi ¦ The loop never ends", code: 'for (let i = 1; i <= 5; i--) {\n  console.log(i);\n}', lang: 'js', line: 1, explain: "i-- уменьшает счётчик — он никогда не станет больше 5. ¦ i-- hisoblagichni kamaytiradi — u hech qachon 5 dan katta bo'lmaydi. ¦ i-- counts down, so i never passes 5.", fix: 'for (let i = 1; i <= 5; i++) {' },
        { title: "Не хватает одного повтора ¦ Bitta takror yetishmayapti ¦ One repeat is missing", code: 'for (let i = 1; i < 5; i++) {\n  console.log(i); // 1 2 3 4\n}', lang: 'js', line: 1, explain: "< 5 останавливается на 4. Нужно <= 5. ¦ < 5 4 da to'xtaydi. <= 5 kerak. ¦ < 5 stops at 4; use <= 5.", fix: 'for (let i = 1; i <= 5; i++) {' },
        { title: "while без шага ¦ Qadamsiz while ¦ while without a step", code: 'let n = 3;\nwhile (n > 0) {\n  console.log(n);\n}', lang: 'js', line: 2, explain: "n не меняется — условие всегда true. Добавьте n--. ¦ n o'zgarmaydi — shart doim true. n-- qo'shing. ¦ n never changes, so it's always true. Add n--.", fix: '  n--;' },
      ],
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 3,
      console: true,
      title: "Рисуем циклом ¦ Sikl bilan chizamiz ¦ Drawing with a loop",
      chat: "сколько звёзд нарисовали? ¦ nechta yulduz chizdingiz? ¦ how many stars did you draw?",
      task: "✍️ Поменяйте 5 на 10 и ⭐ на свой эмодзи ¦ ✍️ 5 ni 10 ga va ⭐ ni o'z emojingizga almashtiring ¦ ✍️ Change 5 to 10 and ⭐ to your own emoji",
      steps: [
        { label: "Лесенка ¦ Zinapoya ¦ Staircase", js: "for (let i = 1; i <= 5; i++) {\n  console.log('⭐'.repeat(i));\n}" },
        { label: "Обратный отсчёт ¦ Teskari sanoq ¦ Countdown", js: "let n = 5;\nwhile (n > 0) {\n  console.log(n + '…');\n  n--;\n}\nconsole.log('🚀 Lift-off!');" },
        { label: "Список ¦ Ro'yxat ¦ List", js: "const games = ['Minecraft', 'Roblox', 'Chess'];\nfor (const game of games) {\n  console.log('🎮 I play ' + game);\n}" },
      ],
      takeaway: "Один цикл — сколько угодно строк результата. ¦ Bitta sikl — istalgancha natija qatori. ¦ One loop, as many result lines as you like.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: повелитель повторов ¦ Missiya: takrorlar hukmdori ¦ Mission: master of repeats",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Циклы работают без ошибок! ¦ Sikllar xatosiz ishlaydi! ¦ Loops run without bugs!",
      items: [
        { title: "for (let i = 0; i < 3; i++) — сколько повторов? ¦ for (let i = 0; i < 3; i++) — necha takror? ¦ for (let i = 0; i < 3; i++) — how many repeats?", choices: ['3', '4'], correct: 0, explain: "0, 1, 2 — три раза. ¦ 0, 1, 2 — uch marta. ¦ 0, 1, 2 — three times." },
        { title: "Пройти по всем фото в списке ¦ Ro'yxatdagi barcha fotolardan o'tish ¦ Go through every photo in a list", choices: ['for (const photo of photos)', 'if (photos)'], correct: 0, explain: "for…of — по каждому элементу. ¦ for…of — har bir element bo'yicha. ¦ for…of visits each item." },
        { title: "Цикл завис навсегда. Причина? ¦ Sikl abadiy osilib qoldi. Sababi? ¦ The loop hangs forever. Why?", choices: ["Условие никогда не станет false ¦ Shart hech qachon false bo'lmaydi ¦ The condition never becomes false", "Слишком мало строк ¦ Juda kam qator ¦ Too few lines"], correct: 0, explain: "Проверьте шаг (i++ / n--). ¦ Qadamni tekshiring (i++ / n--). ¦ Check the step (i++ / n--)." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: циклы ¦ Xulosa: sikllar ¦ Summary: loops",
      chat: "что бы вы повторили циклом 1000 раз? ¦ sikl bilan nimani 1000 marta takrorlagan bo'lardingiz? ¦ what would you repeat 1000 times with a loop?",
      answer: "Цикл повторяет действие, пока условие true. for (let i = 1; i <= 5; i++) — счётчик: старт, условие и шаг. while (n > 0) — когда заранее неизвестно, сколько повторов; главное — менять n, иначе цикл бесконечный. for…of проходит по каждому элементу списка. Частые ошибки: неверный шаг (i-- вместо i++) и < вместо <=. ¦ Sikl shart true ekan harakatni takrorlaydi. for (let i = 1; i <= 5; i++) — hisoblagich: start, shart va qadam. while (n > 0) — takrorlar soni oldindan noma'lum bo'lganda; asosiysi — n ni o'zgartirish, aks holda sikl cheksiz. for…of ro'yxatning har bir elementidan o'tadi. Ko'p uchraydigan xatolar: noto'g'ri qadam (i++ o'rniga i--) va <= o'rniga <. ¦ A loop repeats an action while a condition is true. for (let i = 1; i <= 5; i++) is a counter: start, condition and step. while (n > 0) is for when you don't know the count — just remember to change n or it never ends. for…of visits each item in a list. Common bugs: the wrong step (i-- instead of i++) and < instead of <=.",
      icon: '🔁',
      badge: "Повелитель повторов ¦ Takrorlar hukmdori ¦ Loop master",
      badgeSub: "JavaScript · техническая 3 ¦ JavaScript · texnik 3 ¦ JavaScript · technical 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Выведите таблицу умножения на 7 циклом. ¦ Sikl bilan 7 ga ko'paytirish jadvalini chiqaring. ¦ Print the 7 times table with a loop.",
        "Сделайте список любимых игр и выведите каждую через for…of. ¦ Sevimli o'yinlar ro'yxatini tuzing va har birini for…of orqali chiqaring. ¦ Make a list of favourite games and print each with for…of.",
      ],
      takeaway: "Дальше: функции — как упаковать код в одну команду. ¦ Keyingisi: funksiyalar — kodni bitta buyruqqa qanday joylash. ¦ Next: functions — packing code into one command.",
      notes: { min: 2 },
    },
  ],
});
