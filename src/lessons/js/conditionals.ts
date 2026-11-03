import { kit } from '@engine/kit';

const QUIZ_HTML = `<div class="box"><h2>🎟️ Cinema</h2><label>Age <input id="age" type="number" value="10"></label><label><input id="student" type="checkbox"> Student card</label><button id="go">Check price</button><p id="out"></p></div>`;
const QUIZ_CSS = `body{margin:0;font-family:system-ui;background:#1b2150;min-height:100vh;display:grid;place-items:center;color:#1b2150}
.box{background:#fff;border-radius:18px;padding:22px 28px;width:330px;display:grid;gap:12px;text-align:center}
h2{margin:0}input[type=number]{width:80px;font-size:18px;padding:6px;margin-left:8px}
button{padding:12px;border:0;border-radius:10px;background:#ff6f91;color:#fff;font-size:17px;font-weight:700}
#out{font-size:22px;font-weight:800;margin:0;min-height:30px}`;
const QUIZ_JS = `document.querySelector('#go').addEventListener('click', () => {
  const age = Number(document.querySelector('#age').value);
  const student = document.querySelector('#student').checked;
  let text;

  if (age < 7) {
    text = '👶 Free';
  } else if (age < 14 || student) {
    text = '🧒 25 000 sum';
  } else if (age >= 65) {
    text = '👵 30 000 sum';
  } else {
    text = '🧑 50 000 sum';
  }

  document.querySelector('#out').textContent = text;
});`;

export default kit({
  id: 'js-t02',
  title: "Условные операторы ¦ Shart operatorlari ¦ Conditional statements",
  question: "Как научить программу вести себя по-разному в разных ситуациях? ¦ Dasturni turli vaziyatlarda turlicha harakat qilishga qanday o'rgatish mumkin? ¦ How do you make a program behave differently in different situations?",
  route: ["if ¦ if ¦ if", "Сравнения и логика ¦ Taqqoslash va mantiq ¦ Comparisons and logic", "else if ¦ else if ¦ else if", "switch ¦ switch ¦ switch", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔀',
      kicker: "JavaScript · техническая тема 2 ¦ JavaScript · texnik mavzu 2 ¦ JavaScript · technical topic 2",
      title: "Если… то… иначе… ¦ Agar… unda… aks holda… ¦ If… then… else…",
      chat: "какое решение «если… то…» вы приняли сегодня утром? ¦ bugun ertalab qanday «agar… unda…» qarorini qabul qildingiz? ¦ what “if… then…” decision did you make this morning?",
      lead: "«Если идёт дождь — беру зонт, иначе — очки». Мы постоянно принимаем решения по условиям. В JavaScript для этого есть if, else и switch. ¦ «Agar yomg'ir yog'sa — soyabon olaman, aks holda — ko'zoynak». Biz doim shartlar bo'yicha qaror qabul qilamiz. JavaScript'da buning uchun if, else va switch bor. ¦ “If it rains, I take an umbrella, else sunglasses.” We decide by conditions all the time. JavaScript has if, else and switch for this.",
      facts: ["Условие — вопрос «да или нет?» ¦ Shart — «ha yoki yo'q?» savoli ¦ A condition is a yes-or-no question", "true → выполняем блок ¦ true → blokni bajaramiz ¦ true runs the block", "false → идём дальше ¦ false → davom etamiz ¦ false moves on"],
      takeaway: "Сегодня соберём калькулятор цены билета, который сам решает, сколько стоит вход. ¦ Bugun kirish narxini o'zi hal qiladigan chipta narxi kalkulyatorini yig'amiz. ¦ Today we'll build a ticket-price calculator that decides the price itself.",
      notes: { min: 3 },
    },
    {
      type: 'walk',
      stage: 0,
      title: "Анатомия if ¦ if anatomiyasi ¦ Anatomy of an if",
      chat: "что выведет код, если temp = 30? ¦ temp = 30 bo'lsa, kod nimani chiqaradi? ¦ what does it print if temp = 30?",
      code: `const temp = 12;\n\nif (temp < 15) {\n  console.log('🧥 Wear a jacket');\n} else {\n  console.log('👕 T-shirt weather');\n}`,
      lang: 'js',
      marks: [
        { line: 3, text: "В скобках — условие. temp < 15 — это true или false. ¦ Qavslar ichida — shart. temp < 15 — bu true yoki false. ¦ The condition goes in brackets. temp < 15 is true or false." },
        { line: 4, text: "Если true — выполняется этот блок в фигурных скобках. ¦ Agar true bo'lsa — figurali qavslardagi shu blok bajariladi. ¦ If true, this block in curly braces runs." },
        { line: 5, text: "else — «иначе»: выполняется, только когда условие false. ¦ else — «aks holda»: faqat shart false bo'lganda bajariladi. ¦ else runs only when the condition is false." },
      ],
      takeaway: "Выполняется ровно одна ветка — либо if, либо else. ¦ Faqat bitta tarmoq bajariladi — yoki if, yoki else. ¦ Exactly one branch runs — if or else.",
      notes: { say: ["Ответ: при 30 — «T-shirt weather»."], min: 4 },
    },
    {
      type: 'cards',
      stage: 1,
      title: "Операторы сравнения ¦ Taqqoslash operatorlari ¦ Comparison operators",
      chat: "чему равно 5 === '5'? ¦ 5 === '5' nimaga teng? ¦ what is 5 === '5'?",
      cards: [
        { icon: '🟰', front: '===', back: "Строго равно: и значение, и тип. 5 === 5 → true, 5 === '5' → false. ¦ Qat'iy teng: qiymat ham, tur ham. 5 === 5 → true, 5 === '5' → false. ¦ Strictly equal: value and type. 5 === 5 → true, 5 === '5' → false." },
        { icon: '🚫', front: '!==', back: "Строго не равно. 'yes' !== 'no' → true. ¦ Qat'iy teng emas. 'yes' !== 'no' → true. ¦ Strictly not equal. 'yes' !== 'no' → true." },
        { icon: '↕️', front: "<  >  <=  >=", back: "Меньше, больше, «или равно». 18 >= 18 → true. ¦ Kichik, katta, «yoki teng». 18 >= 18 → true. ¦ Less, greater, “or equal”. 18 >= 18 → true." },
        { icon: '🤝', front: "&& — И ¦ && — VA ¦ && — AND", back: "Оба условия true. age > 12 && age < 18 — подросток. ¦ Ikkala shart true. age > 12 && age < 18 — o'smir. ¦ Both true. age > 12 && age < 18 is a teen." },
        { icon: '🔀', front: "|| — ИЛИ ¦ || — YOKI ¦ || — OR", back: "Хотя бы одно true. isWeekend || isHoliday — можно отдыхать. ¦ Kamida bittasi true. isWeekend || isHoliday — dam olish mumkin. ¦ At least one true. isWeekend || isHoliday means rest." },
        { icon: '❗', front: "! — НЕ ¦ ! — EMAS ¦ ! — NOT", back: "Переворачивает: !true → false. ¦ Teskari qiladi: !true → false. ¦ Flips it: !true → false." },
      ],
      takeaway: "Используйте ===, а не ==: так JavaScript не будет «угадывать» типы. ¦ == emas, === dan foydalaning: shunda JavaScript turlarni «taxmin» qilmaydi. ¦ Use ===, not ==, so JavaScript doesn't “guess” types.",
      notes: { say: ["Открывайте по выбору чата."], min: 5 },
    },
    {
      type: 'live',
      stage: 2,
      title: "Калькулятор цены билета ¦ Chipta narxi kalkulyatori ¦ A ticket-price calculator",
      chat: "какое правило добавить? скидка по средам? ¦ qanday qoida qo'shamiz? chorshanba kuni chegirma? ¦ what rule shall we add? Wednesday discount?",
      task: "✍️ Меняйте возраст и галочку, потом добавьте своё правило ¦ ✍️ Yosh va belgichani o'zgartiring, keyin o'z qoidangizni qo'shing ¦ ✍️ Change the age and checkbox, then add your own rule",
      steps: [
        { label: "Калькулятор ¦ Kalkulyator ¦ Calculator", html: QUIZ_HTML, css: QUIZ_CSS, js: QUIZ_JS },
      ],
      takeaway: "else if проверяется сверху вниз — сработает первое true, остальные пропускаются. ¦ else if yuqoridan pastga tekshiriladi — birinchi true ishlaydi, qolganlari o'tkazib yuboriladi. ¦ else if is checked top to bottom: the first true wins, the rest are skipped.",
      notes: { say: ["Цены условные. Попробуйте: 5, 10, 10 + студент, 20 + студент, 70.", "Спросите: что будет, если поменять местами первые две проверки?"], min: 8 },
    },
    {
      type: 'output',
      stage: 2,
      title: "Что выведет? ¦ Nimani chiqaradi? ¦ What does it print?",
      chat: "пишите ответ до того, как я покажу ¦ men ko'rsatishimdan oldin javob yozing ¦ write your answer before I reveal it",
      snippets: [
        { label: "Порядок важен ¦ Tartib muhim ¦ Order matters", code: `const score = 95;\nif (score > 50) {\n  console.log('Good');\n} else if (score > 90) {\n  console.log('Excellent');\n}`, output: ['Good'], explain: "Первое условие уже true — до «Excellent» дело не дошло. Сначала проверяйте самое строгое. ¦ Birinchi shart allaqachon true — «Excellent»gacha yetib bormadi. Avval eng qat'iy shartni tekshiring. ¦ The first condition is already true, so “Excellent” is never reached. Check the strictest first." },
        { label: "И / ИЛИ ¦ VA / YOKI ¦ AND / OR", code: `const age = 15;\nconst hasTicket = false;\nconsole.log(age >= 12 && hasTicket);\nconsole.log(age >= 12 || hasTicket);`, output: ['false', 'true'], explain: "&& требует оба true, || — хотя бы одно. ¦ && ikkalasining true bo'lishini talab qiladi, || — kamida bittasini. ¦ && needs both true; || needs at least one." },
      ],
      takeaway: "Порядок else if и выбор && или || меняют результат. ¦ else if tartibi va && yoki || tanlovi natijani o'zgartiradi. ¦ else if order and && vs || change the result.",
      notes: { say: ["Сначала ответы чата."], min: 5 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "if-else или switch ¦ if-else yoki switch ¦ if-else or switch",
      chat: "какой вариант читается легче? ¦ qaysi variant osonroq o'qiladi? ¦ which reads more easily?",
      left: { icon: '🔀', label: 'if / else if', code: `if (day === 'sat') {\n  plan = '⚽ football';\n} else if (day === 'sun') {\n  plan = '🎬 cinema';\n} else {\n  plan = '📚 school';\n}`, lang: 'js' },
      right: { icon: '🎛️', label: 'switch', code: `switch (day) {\n  case 'sat':\n    plan = '⚽ football';\n    break;\n  case 'sun':\n    plan = '🎬 cinema';\n    break;\n  default:\n    plan = '📚 school';\n}`, lang: 'js' },
      verdict: "switch удобен, когда одну переменную сравнивают с многими точными значениями. Для диапазонов (< 7, >= 65) — if. ¦ switch bitta o'zgaruvchi ko'p aniq qiymatlar bilan solishtirilganda qulay. Diapazonlar uchun (< 7, >= 65) — if. ¦ switch suits one variable compared with many exact values. For ranges (< 7, >= 65) use if.",
      notes: { say: ["Не забудьте break — следующий слайд как раз об этом."], min: 4 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Найдите баг ¦ Xatoni toping ¦ Find the bug",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Всегда «Admin» ¦ Doim «Admin» ¦ Always “Admin”", lang: 'js', code: `let role = 'guest';\nif (role = 'admin') {\n  console.log('Admin panel');\n}`, line: 2, explain: "Один знак = присваивает значение, а не сравнивает. Условие всегда true. Нужно ===. ¦ Bitta = qiymat beradi, solishtirmaydi. Shart doim true. === kerak. ¦ A single = assigns instead of comparing, so it's always true. Use ===.", fix: `if (role === 'admin') {` },
        { title: "Провал в следующий case ¦ Keyingi case'ga tushib ketish ¦ Falling into the next case", lang: 'js', code: `switch (light) {\n  case 'red':\n    action = 'stop';\n  case 'green':\n    action = 'go';\n    break;\n}`, line: 3, explain: "Нет break после 'red' — код «проваливается» в 'green', и action становится 'go'. ¦ 'red'dan keyin break yo'q — kod 'green'ga «tushib ketadi» va action 'go' bo'lib qoladi. ¦ No break after 'red', so it falls into 'green' and action becomes 'go'.", fix: `    action = 'stop';\n    break;` },
      ],
      takeaway: "= вместо === и забытый break — классика условий. ¦ === o'rniga = va unutilgan break — shartlar klassikasi. ¦ = instead of === and a missing break are condition classics.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какое условие подходит? ¦ Qaysi shart mos keladi? ¦ Which condition fits?",
      chat: "пишите: «1 — &&» ¦ yozing: «1 — &&» ¦ write: “1 — &&”",
      zones: [
        { id: 'and', label: "&& (И) ¦ && (VA) ¦ && (AND)", icon: '🤝' },
        { id: 'or', label: "|| (ИЛИ) ¦ || (YOKI) ¦ || (OR)", icon: '🔀' },
      ],
      items: [
        { text: "Войти: верный логин и верный пароль ¦ Kirish: to'g'ri login va to'g'ri parol ¦ Sign in: correct login and correct password", zone: 'and' },
        { text: "Скидка: студент или пенсионер ¦ Chegirma: talaba yoki nafaqaxo'r ¦ Discount: student or senior", zone: 'or' },
        { text: "Победа: все враги побеждены и время не вышло ¦ G'alaba: barcha dushmanlar yengildi va vaqt tugamadi ¦ Win: all enemies beaten and time left", zone: 'and' },
        { text: "Выходной: суббота или воскресенье ¦ Dam olish kuni: shanba yoki yakshanba ¦ Weekend: Saturday or Sunday", zone: 'or' },
      ],
      takeaway: "«и то, и другое» — &&, «хотя бы одно» — ||. ¦ «ham u, ham bu» — &&, «kamida bittasi» — ||. ¦ “Both” is &&; “at least one” is ||.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: умный светофор ¦ Missiya: aqlli svetofor ¦ Mission: a smart traffic light",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Светофор работает без аварий! ¦ Svetofor avariyasiz ishlaydi! ¦ The traffic light runs with no crashes!",
      items: [
        { title: "Проверка «зелёный?» ¦ «Yashilmi?» tekshiruvi ¦ Checking “green?”", choices: ["if (light === 'green')", "if (light = 'green')"], correct: 0, explain: "Сравнение — тремя знаками. ¦ Taqqoslash — uchta belgi bilan. ¦ Compare with three signs." },
        { title: "Переход: зелёный И нет машин ¦ O'tish: yashil VA mashina yo'q ¦ Cross: green AND no cars", choices: ['&&', '||'], correct: 0, explain: "Нужны оба условия. ¦ Ikkala shart kerak. ¦ Both are needed." },
        { title: "Три цвета, точные значения ¦ Uch rang, aniq qiymatlar ¦ Three colours, exact values", choices: ["switch с break ¦ break bilan switch ¦ switch with break", "switch без break ¦ breaksiz switch ¦ switch without break"], correct: 0, explain: "Без break цвета «смешаются». ¦ Breaksiz ranglar «aralashib ketadi». ¦ Without break the colours mix up." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: условия ¦ Xulosa: shartlar ¦ Summary: conditions",
      chat: "придумайте условие для своей игры! ¦ o'yiningiz uchun shart o'ylab toping! ¦ invent a condition for your own game!",
      answer: "if выполняет блок, когда условие true, else — когда false, а else if проверяет варианты сверху вниз до первого true, поэтому самое строгое условие ставят первым. Сравниваем через === и !==, объединяем через && (оба) и || (хотя бы одно). switch удобен для многих точных значений — с break в каждом case. ¦ if shart true bo'lganda blokni bajaradi, else — false bo'lganda, else if esa variantlarni yuqoridan pastga birinchi true'gacha tekshiradi, shuning uchun eng qat'iy shart birinchi qo'yiladi. === va !== bilan solishtiramiz, && (ikkalasi) va || (kamida bittasi) bilan birlashtiramiz. switch ko'p aniq qiymatlar uchun qulay — har bir case'da break bilan. ¦ if runs a block when the condition is true, else when false, and else if checks options top to bottom until the first true, so the strictest goes first. Compare with === and !==, combine with && (both) and || (at least one). switch suits many exact values — with break in every case.",
      icon: '🔀',
      badge: "Мастер решений ¦ Qarorlar ustasi ¦ Decision maker",
      badgeSub: "JavaScript · техническая 2 ¦ JavaScript · texnik 2 ¦ JavaScript · technical 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте оценщик: балл 0–100 → «отлично», «хорошо», «удовлетворительно» или «попробуй ещё». ¦ Baholovchi yarating: 0–100 ball → «a'lo», «yaxshi», «qoniqarli» yoki «yana urinib ko'r». ¦ Build a grader: 0–100 → “excellent”, “good”, “pass” or “try again”.",
        "Напишите switch, который по номеру дня недели выводит его название. ¦ Hafta kuni raqami bo'yicha uning nomini chiqaradigan switch yozing. ¦ Write a switch that prints the weekday name for its number.",
      ],
      takeaway: "Следующая тема — циклы: компьютер повторяет скучную работу за нас. ¦ Keyingi mavzu — tsikllar: kompyuter zerikarli ishni biz uchun takrorlaydi. ¦ Next: loops — the computer repeats boring work for us.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
