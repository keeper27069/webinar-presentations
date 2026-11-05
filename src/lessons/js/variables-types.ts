import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.row{display:flex;gap:18px;flex-wrap:wrap;justify-content:center}
.box{width:150px;border-radius:18px;background:#fff;box-shadow:0 8px 24px #0001;overflow:hidden;text-align:center}
.box b{display:block;padding:8px;background:#e9a400;color:#16181f;font:800 16px JetBrains Mono,monospace}
.box span{display:block;padding:18px 8px;font:800 26px JetBrains Mono,monospace}
.box.c b{background:#16181f;color:#fff}.box.err{outline:4px solid #ef4b4b}
.box.new span{animation:__pop .5s}
.msg{margin-top:16px;text-align:center;font-weight:800;font-size:20px;color:#ef4b4b}
.eq{display:flex;align-items:center;gap:14px;font:800 34px JetBrains Mono,monospace}
.eq .v{padding:10px 18px;border-radius:14px;background:#fff;box-shadow:0 6px 18px #0001}
.eq .s{color:#0f8f84}.eq .n{color:#3d7bff}.eq .r{background:#fff6d6}`;
const boxes = (items: [string, string, string?][], msg = '') => `<div class="wrap"><div><div class="row">${items.map(([n, v, c]) => `<div class="box ${c ?? ''}"><b>${n}</b><span>${v}</span></div>`).join('')}</div>${msg ? `<div class="msg">${msg}</div>` : ''}</div></div>`;
const eq = (a: string, ac: string, b: string, bc: string, r: string) => `<div class="wrap"><div class="eq"><span class="v ${ac}">${a}</span>+<span class="v ${bc}">${b}</span>=<span class="v r">${r}</span></div></div>`;

export default kit({
  id: 'js-t01',
  title: "Переменные и типы данных ¦ O'zgaruvchilar va ma'lumot turlari ¦ Variables and data types",
  question: "Как программа запоминает имя, очки и «онлайн ли игрок»? ¦ Dastur ism, ochkolar va «o'yinchi onlaynmi»ni qanday eslab qoladi? ¦ How does a program remember a name, a score and whether a player is online?",
  route: ["Коробки ¦ Qutilar ¦ Boxes", "let и const ¦ let va const ¦ let and const", "Типы ¦ Turlar ¦ Types", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '📦',
      kicker: "JavaScript · техническая тема 1 ¦ JavaScript · texnik mavzu 1 ¦ JavaScript · technical topic 1",
      title: "Переменная — коробка с подписью ¦ O'zgaruvchi — yorliqli quti ¦ A variable is a labelled box",
      chat: "что игра должна помнить о вас? ¦ o'yin siz haqingizda nimani eslab qolishi kerak? ¦ what should a game remember about you?",
      lead: "Программе нужно где-то хранить данные: имя, очки, уровень. Для этого есть переменные — коробки с названием, куда кладут значение. ¦ Dasturga ma'lumotlarni qayerdadir saqlash kerak: ism, ochkolar, bosqich. Buning uchun o'zgaruvchilar bor — nomli qutilar, ularga qiymat solinadi. ¦ A program needs somewhere to keep data: a name, a score, a level. That's what variables are — named boxes that hold a value.",
      facts: ["let — коробку можно перекладывать ¦ let — qutini qayta to'ldirish mumkin ¦ let: the box can change", "const — коробка с замком ¦ const — qulfli quti ¦ const: a locked box", "Тип — что лежит внутри ¦ Tur — ichida nima borligi ¦ Type: what's inside"],
      takeaway: "Смотрим, как коробки появляются и меняются. ¦ Qutilar qanday paydo bo'lishi va o'zgarishini ko'ramiz. ¦ Watch boxes appear and change.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Коробки let и const ¦ let va const qutilari ¦ let and const boxes",
      chat: "какое имя положим в коробку? ¦ qutiga qanday ism solamiz? ¦ what name shall we put in the box?",
      lang: 'js',
      css: CSS,
      steps: [
        { code: "let name = 'Lola';", line: 1, html: boxes([['name', "'Lola'", 'new']]), say: "Создали коробку name и положили туда 'Lola'. ¦ name qutisini yaratdik va unga 'Lola'ni soldik. ¦ We create a box called name and put 'Lola' in it." },
        { code: "let name = 'Lola';\nlet score = 40;", line: 2, html: boxes([['name', "'Lola'"], ['score', '40', 'new']]), say: "Вторая коробка — score с числом 40. ¦ Ikkinchi quti — 40 soni bilan score. ¦ A second box: score with the number 40." },
        { code: "let name = 'Lola';\nlet score = 40;\nscore = 55;", line: 3, html: boxes([['name', "'Lola'"], ['score', '55', 'new']]), say: "Лола прошла уровень: в коробке score теперь 55. let можно менять! ¦ Lola bosqichdan o'tdi: score qutisida endi 55. let'ni o'zgartirish mumkin! ¦ Lola beats a level: score now holds 55. let can change!" },
        { code: "const city = 'Tashkent';", line: 1, html: boxes([['name', "'Lola'"], ['score', '55'], ['🔒 city', "'Tashkent'", 'c new']]), say: "const — коробка с замком: то, что не меняется. ¦ const — qulfli quti: o'zgarmaydigan narsa uchun. ¦ const is a locked box for things that don't change." },
        { code: "const city = 'Tashkent';\ncity = 'Samarkand'; // ❌", line: 2, html: boxes([['name', "'Lola'"], ['score', '55'], ['🔒 city', "'Tashkent'", 'c err']], 'TypeError: Assignment to constant variable.'), say: "Пытаемся поменять const — ошибка! Замок не открыть. ¦ const'ni o'zgartirishga urinamiz — xato! Qulfni ochib bo'lmaydi. ¦ Try to change a const — error! The lock won't open." },
      ],
      takeaway: "let — меняется, const — нет. Сомневаетесь — начните с const. ¦ let — o'zgaradi, const — yo'q. Ikkilansangiz — const'dan boshlang. ¦ let changes, const doesn't. When unsure, start with const.",
      notes: { min: 6 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Текст и число — это разное ¦ Matn va son — bu har xil ¦ Text and numbers are different",
      chat: "чему равно '5' + 5? угадайте! ¦ '5' + 5 nimaga teng? taxmin qiling! ¦ what is '5' + 5? guess!",
      lang: 'js',
      css: CSS,
      steps: [
        { code: '5 + 5', html: eq('5', 'n', '5', 'n', '10'), say: "Число + число = сложение. 10! ¦ Son + son = qo'shish. 10! ¦ Number + number = addition. 10!" },
        { code: "'5' + 5", html: eq("'5'", 's', '5', 'n', "'55'"), say: "Текст (string) + число = склейка! Получилось '55'. ¦ Matn (string) + son = yopishtirish! '55' chiqdi. ¦ Text (a string) + number = gluing! You get '55'." },
        { code: "'Lola' + ' ⭐'", html: eq("'Lola'", 's', "' ⭐'", 's', "'Lola ⭐'"), say: "Для текста + — это «склеить». Удобно для сообщений. ¦ Matn uchun + — bu «yopishtirish». Xabarlar uchun qulay. ¦ For text, + means “glue together” — handy for messages." },
        { code: 'let isOnline = true;\n// true or false', line: 1, html: boxes([['isOnline', 'true ✅']]), say: "Третий тип — boolean: только true или false, «да» или «нет». ¦ Uchinchi tur — boolean: faqat true yoki false, «ha» yoki «yo'q». ¦ A third type is boolean: only true or false, yes or no." },
      ],
      takeaway: "string — текст в кавычках, number — число, boolean — да/нет. ¦ string — qo'shtirnoqdagi matn, number — son, boolean — ha/yo'q. ¦ string = text in quotes, number = a number, boolean = yes/no.",
      notes: { min: 5 },
    },
    {
      type: 'sort',
      stage: 2,
      title: "Какой это тип? ¦ Bu qaysi tur? ¦ Which type is it?",
      chat: "пишите: «1 — string» ¦ yozing: «1 — string» ¦ write: “1 — string”",
      zones: [
        { id: 's', label: 'string', icon: '🔤' },
        { id: 'n', label: 'number', icon: '🔢' },
        { id: 'b', label: 'boolean', icon: '✅' },
      ],
      items: [
        { text: "'Aziz'", zone: 's' },
        { text: '120', zone: 'n' },
        { text: 'false', zone: 'b' },
        { text: "'120'", zone: 's', why: "В кавычках — значит текст. ¦ Qo'shtirnoqda — demak matn. ¦ In quotes means text." },
        { text: '3.5', zone: 'n' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      console: true,
      title: "Профиль игрока ¦ O'yinchi profili ¦ A player profile",
      chat: "какое имя и сколько очков поставить игроку? ¦ o'yinchiga qanday ism va necha ochko qo'yamiz? ¦ what name and score shall we give the player?",
      task: "✍️ Меняйте значения и смотрите, какой тип покажет typeof ¦ ✍️ Qiymatlarni o'zgartiring va typeof qanday turni ko'rsatishini kuzating ¦ ✍️ Change the values and see what typeof shows",
      steps: [
        { label: "Типы ¦ Turlar ¦ Types", js: `const name = 'Aziz';\nlet score = 120;\nlet isOnline = true;\nlet bonus;\n\nconsole.log(name, typeof name);\nconsole.log(score, typeof score);\nconsole.log(isOnline, typeof isOnline);\nconsole.log(bonus, typeof bonus);` },
        { label: "Шаблонная строка ¦ Shablon satr ¦ Template string", js: `const name = 'Aziz';\nlet score = 120;\nscore = score + 30;\n\nconsole.log(\`🎮 \${name} has \${score} points\`);\nconsole.log(\`Next level at \${200 - score} more\`);` },
      ],
      takeaway: "Обратные кавычки и ${ } вставляют переменные прямо в текст. ¦ Teskari qo'shtirnoq va ${ } o'zgaruvchilarni to'g'ridan-to'g'ri matnga qo'yadi. ¦ Backticks and ${ } drop variables right into text.",
      notes: { say: ["Шаг 2: покажите разницу между 'кавычками' и `обратными кавычками`."], min: 7 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: профиль игрока ¦ Missiya: o'yinchi profili ¦ Mission: a player profile",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Профиль хранит всё правильно! ¦ Profil hammasini to'g'ri saqlaydi! ¦ The profile stores everything right!",
      items: [
        { title: "Дата рождения игрока не меняется ¦ O'yinchining tug'ilgan sanasi o'zgarmaydi ¦ A player's birthday never changes", choices: ['const', 'let'], correct: 0, explain: "Не меняется — const. ¦ O'zgarmaydi — const. ¦ Never changes: const." },
        { title: "Очки растут во время игры ¦ O'yin davomida ochkolar o'sadi ¦ The score grows during the game", choices: ['let', 'const'], correct: 0, explain: "Меняется — let. ¦ O'zgaradi — let. ¦ Changes: let." },
        { title: "'10' + 5 = ?", choices: ["'105'", '15'], correct: 0, explain: "Текст + число = склейка. ¦ Matn + son = yopishtirish. ¦ Text + number glues." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: переменные и типы ¦ Xulosa: o'zgaruvchilar va turlar ¦ Summary: variables and types",
      chat: "какие 3 переменные понадобятся вашей игре? ¦ o'yiningizga qaysi 3 ta o'zgaruvchi kerak bo'ladi? ¦ which 3 variables would your game need?",
      answer: "Переменная — коробка с названием, где хранится значение. let можно менять (очки), const — нет (город, дата рождения). Главные типы: string — текст в кавычках, number — число, boolean — true или false. Важно не путать: '5' + 5 даёт '55', потому что текст плюс число склеиваются. ¦ O'zgaruvchi — qiymat saqlanadigan nomli quti. let'ni o'zgartirish mumkin (ochkolar), const'ni — yo'q (shahar, tug'ilgan sana). Asosiy turlar: string — qo'shtirnoqdagi matn, number — son, boolean — true yoki false. Adashtirmaslik muhim: '5' + 5 '55' beradi, chunki matn va son yopishtiriladi. ¦ A variable is a named box holding a value. let can change (score); const can't (city, birthday). The main types: string (text in quotes), number, and boolean (true or false). Don't mix them up: '5' + 5 gives '55' because text plus a number glue together.",
      icon: '📦',
      badge: "Хранитель данных ¦ Ma'lumotlar qo'riqchisi ¦ Data keeper",
      badgeSub: "JavaScript · техническая 1 ¦ JavaScript · texnik 1 ¦ JavaScript · technical 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Создайте 5 переменных о себе (имя, город, возраст, любимая игра, онлайн ли). ¦ O'zingiz haqingizda 5 ta o'zgaruvchi yarating (ism, shahar, yosh, sevimli o'yin, onlaynmi). ¦ Create 5 variables about yourself (name, city, age, favourite game, online?).",
        "Выведите их в консоль с typeof. ¦ Ularni typeof bilan konsolga chiqaring. ¦ Print them to the console with typeof.",
      ],
      takeaway: "Дальше: условия — как программа принимает решения. ¦ Keyingisi: shartlar — dastur qanday qaror qabul qiladi. ¦ Next: conditions — how programs make decisions.",
      notes: { min: 2 },
    },
  ],
});
