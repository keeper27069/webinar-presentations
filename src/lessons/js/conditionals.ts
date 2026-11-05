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

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.card{width:360px;padding:26px;border-radius:22px;background:#fff;box-shadow:0 10px 30px #0001;text-align:center}
.card .e{font-size:96px;line-height:1.1}.card b{display:block;margin-top:6px;font-size:26px}.card i{display:block;font-style:normal;color:#6b7183;font-size:18px;margin-top:4px}
.hot{background:#fff6d6}.cold{background:#e7efff}.tk{background:#e8faf7}`;
const card = (cls: string, e: string, b: string, i: string) => `<div class="wrap"><div class="card ${cls}"><div class="e">${e}</div><b>${b}</b><i>${i}</i></div></div>`;
const PRICE = "if (age < 7) {\n  text = 'Free';\n} else if (age < 14) {\n  text = '25 000';\n} else if (age >= 65) {\n  text = '30 000';\n} else {\n  text = '50 000';\n}";

export default kit({
  id: 'js-t02',
  title: "Условные операторы ¦ Shart operatorlari ¦ Conditional statements",
  question: "Как программа выбирает, что делать, — как человек на развилке? ¦ Dastur nima qilishni qanday tanlaydi — chorrahadagi odam kabi? ¦ How does a program choose what to do, like a person at a fork in the road?",
  route: ["Развилка ¦ Ayrilish ¦ The fork", "if / else ¦ if / else ¦ if / else", "Цепочка ¦ Zanjir ¦ The chain", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔀',
      kicker: "JavaScript · техническая тема 2 ¦ JavaScript · texnik mavzu 2 ¦ JavaScript · technical topic 2",
      title: "Если… то… иначе… ¦ Agar… unda… aks holda… ¦ If… then… otherwise…",
      chat: "какое «если» было у вас сегодня утром? ¦ bugun ertalab sizda qanday «agar» bo'ldi? ¦ what “if” did you have this morning?",
      lead: "«Если идёт дождь — возьму зонт, иначе — кепку». Программы думают так же: проверяют условие и выбирают дорогу. ¦ «Agar yomg'ir yog'sa — soyabon olaman, aks holda — kepka». Dasturlar ham shunday o'ylaydi: shartni tekshiradi va yo'lni tanlaydi. ¦ “If it rains I'll take an umbrella, otherwise a cap.” Programs think the same way: check a condition and pick a path.",
      facts: ["if — «если» ¦ if — «agar» ¦ if means “if”", "else — «иначе» ¦ else — «aks holda» ¦ else means “otherwise”", "Условие — true или false ¦ Shart — true yoki false ¦ A condition is true or false"],
      takeaway: "Смотрим на развилку. ¦ Ayrilishga qaraymiz. ¦ Let's look at the fork.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Программа на развилке ¦ Ayrilishdagi dastur ¦ A program at the fork",
      chat: "куда пойдёт 20-летний? ¦ 20 yoshli qayerga boradi? ¦ which way does a 20-year-old go?",
      actors: [
        { id: 'q', text: "age < 14 ?" },
        { id: 'y', icon: '🧒', label: "true → детский билет ¦ true → bolalar chiptasi ¦ true → child ticket" },
        { id: 'n', icon: '🧑', label: "false → взрослый билет ¦ false → kattalar chiptasi ¦ false → adult ticket" },
        { id: 'p', icon: '🙂', label: "age = 10" },
      ],
      steps: [
        { say: "Программа задаёт вопрос: возраст меньше 14? ¦ Dastur savol beradi: yosh 14 dan kichikmi? ¦ The program asks: is age under 14?", at: { q: [50, 20, 1.2], y: [20, 78], n: [80, 78] }, lines: [['q', 'y', 'true'], ['q', 'n', 'false']] },
        { say: "Приходит Лола, ей 10. ¦ Lola keladi, u 10 yoshda. ¦ Lola arrives; she's 10.", at: { p: [50, 50] }, lines: [['q', 'y', 'true'], ['q', 'n', 'false']] },
        { say: "10 < 14 — это true. Идёт налево: детский билет! ¦ 10 < 14 — bu true. Chapga boradi: bolalar chiptasi! ¦ 10 < 14 is true. She goes left: child ticket!", at: { p: [20, 50] }, lines: [['q', 'y', 'true ✓']], pulse: ['y'] },
        { say: "А Тимуру 20: 20 < 14 — false. Направо: взрослый билет. ¦ Timur esa 20 yoshda: 20 < 14 — false. O'ngga: kattalar chiptasi. ¦ Timur is 20: 20 < 14 is false. Right: adult ticket.", at: { p: [80, 50] }, set: { p: { icon: '🧔', label: "age = 20" } }, lines: [['q', 'n', 'false ✓']], pulse: ['n'] },
      ],
      takeaway: "Условие — вопрос с ответом true/false. От ответа зависит дорога. ¦ Shart — true/false javobli savol. Yo'l javobga bog'liq. ¦ A condition is a true/false question; the answer picks the path.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "if / else: что надеть? ¦ if / else: nima kiyish kerak? ¦ if / else: what to wear?",
      chat: "какую температуру поставим? ¦ qanday haroratni qo'yamiz? ¦ what temperature shall we set?",
      lang: 'js',
      css: CSS,
      steps: [
        { code: "let temp = 25;\n\nif (temp > 20) {\n  wear('👕 T-shirt');\n} else {\n  wear('🧥 Jacket');\n}", line: 4, html: card('hot', '😎', 'T-shirt 👕', 'temp = 25 → 25 > 20 → true'), say: "25 > 20 — true. Выполняется блок if: футболка. ¦ 25 > 20 — true. if bloki bajariladi: futbolka. ¦ 25 > 20 is true, so the if block runs: a T-shirt." },
        { code: "let temp = 5;\n\nif (temp > 20) {\n  wear('👕 T-shirt');\n} else {\n  wear('🧥 Jacket');\n}", line: 6, html: card('cold', '🥶', 'Jacket 🧥', 'temp = 5 → 5 > 20 → false'), say: "Поменяли на 5: 5 > 20 — false. Работает else: куртка. ¦ 5 ga o'zgartirdik: 5 > 20 — false. else ishlaydi: kurtka. ¦ Change it to 5: 5 > 20 is false, so else runs: a jacket." },
        { code: "let temp = 20;\n\nif (temp >= 20) {\n  wear('👕 T-shirt');\n} else {\n  wear('🧥 Jacket');\n}", line: 3, html: card('hot', '🙂', 'T-shirt 👕', 'temp = 20 → 20 >= 20 → true'), say: "А ровно 20? С > будет false, а с >= («больше или равно») — true. ¦ Aynan 20-chi? > bilan false bo'ladi, >= («katta yoki teng») bilan — true. ¦ Exactly 20? With > it's false; with >= (“greater or equal”) it's true." },
      ],
      takeaway: "> < >= <= === — сравнения, которые дают true или false. ¦ > < >= <= === — true yoki false beradigan solishtirishlar. ¦ > < >= <= === are comparisons that give true or false.",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Цепочка else if: цена билета ¦ else if zanjiri: chipta narxi ¦ An else if chain: ticket prices",
      chat: "сколько заплатит бабушка 70 лет? ¦ 70 yoshli buvi qancha to'laydi? ¦ how much does a 70-year-old grandma pay?",
      lang: 'js',
      css: CSS,
      steps: [
        { code: '// age = 5\n' + PRICE, line: 2, html: card('tk', '👶', 'Free', 'age = 5 → age < 7 ✓'), say: "5 лет: первая проверка уже true — бесплатно. Остальные даже не смотрим. ¦ 5 yosh: birinchi tekshiruv allaqachon true — bepul. Qolganlariga hatto qaramaymiz. ¦ Age 5: the first check is true — free. The rest are skipped." },
        { code: '// age = 10\n' + PRICE, line: 4, html: card('tk', '🧒', '25 000', 'age = 10 → age < 14 ✓'), say: "10 лет: первая — false, вторая — true. 25 000. ¦ 10 yosh: birinchisi — false, ikkinchisi — true. 25 000. ¦ Age 10: the first is false, the second true. 25,000." },
        { code: '// age = 70\n' + PRICE, line: 6, html: card('tk', '👵', '30 000', 'age = 70 → age >= 65 ✓'), say: "70 лет: дошли до третьей — true. 30 000. ¦ 70 yosh: uchinchisiga yetdik — true. 30 000. ¦ Age 70: we reach the third — true. 30,000." },
        { code: '// age = 30\n' + PRICE, line: 8, html: card('tk', '🧑', '50 000', 'age = 30 → else'), say: "30 лет: всё false — работает else. 50 000. ¦ 30 yosh: hammasi false — else ishlaydi. 50 000. ¦ Age 30: everything is false, so else runs. 50,000." },
      ],
      takeaway: "Проверки идут сверху вниз — срабатывает первая true. ¦ Tekshiruvlar yuqoridan pastga boradi — birinchi true ishlaydi. ¦ Checks run top to bottom; the first true one wins.",
      notes: { min: 6 },
    },
    {
      type: 'live',
      stage: 3,
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
      type: 'truefalse',
      stage: 3,
      title: "true или false? ¦ true yoki false? ¦ true or false?",
      chat: "пишите «true» или «false» ¦ «true» yoki «false» deb yozing ¦ write “true” or “false”",
      statements: [
        { text: '10 > 5', truth: true, explain: "10 больше 5. ¦ 10 5 dan katta. ¦ 10 is greater than 5." },
        { text: '7 >= 8', truth: false, explain: "7 меньше 8. ¦ 7 8 dan kichik. ¦ 7 is less than 8." },
        { text: "'cat' === 'cat'", truth: true, explain: "=== — «точно равно». ¦ === — «aniq teng». ¦ === means “exactly equal”." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: умная программа ¦ Missiya: aqlli dastur ¦ Mission: a smart program",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Программа всегда выбирает правильно! ¦ Dastur doim to'g'ri tanlaydi! ¦ The program always chooses right!",
      items: [
        { title: "score = 100. Что выведет if (score >= 100)? ¦ score = 100. if (score >= 100) nimani chiqaradi? ¦ score = 100. What does if (score >= 100) do?", choices: ["Выполнит блок if ¦ if blokini bajaradi ¦ Runs the if block", "Выполнит else ¦ else'ni bajaradi ¦ Runs else"], correct: 0, explain: "100 >= 100 — true. ¦ 100 >= 100 — true. ¦ 100 >= 100 is true." },
        { title: "Что значит else? ¦ else nimani anglatadi? ¦ What does else mean?", choices: ["«Иначе», если условие false ¦ Shart false bo'lsa, «aks holda» ¦ “Otherwise”, when the condition is false", "«Всегда» ¦ «Doim» ¦ “Always”"], correct: 0, explain: "else ловит все остальные случаи. ¦ else qolgan barcha holatlarni ushlaydi. ¦ else catches everything else." },
        { title: "В цепочке else if сработают… ¦ else if zanjirida ishlaydi… ¦ In an else if chain, what runs?", choices: ["Только первая true ¦ Faqat birinchi true ¦ Only the first true one", "Все true ¦ Barcha true ¦ Every true one"], correct: 0, explain: "Сверху вниз, до первой true. ¦ Yuqoridan pastga, birinchi true gacha. ¦ Top down until the first true." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: условия ¦ Xulosa: shartlar ¦ Summary: conditions",
      chat: "придумайте своё «если… то… иначе» для игры ¦ o'yin uchun o'z «agar… unda… aks holda»ingizni o'ylab toping ¦ invent your own “if… then… else” for a game",
      answer: "Условие — вопрос, на который ответ true или false: temp > 20, age < 14. if выполняет блок, если ответ true, else — если false. Цепочка else if проверяет условия сверху вниз и останавливается на первом true. Сравнения: > < >= <= и === («точно равно»). ¦ Shart — javobi true yoki false bo'lgan savol: temp > 20, age < 14. Javob true bo'lsa, if blokni bajaradi, false bo'lsa — else. else if zanjiri shartlarni yuqoridan pastga tekshiradi va birinchi true'da to'xtaydi. Solishtirishlar: > < >= <= va === («aniq teng»). ¦ A condition is a question answered true or false: temp > 20, age < 14. if runs its block when true; else runs when false. An else if chain checks top to bottom and stops at the first true. Comparisons: > < >= <= and === (“exactly equal”).",
      icon: '🔀',
      badge: "Мастер решений ¦ Qarorlar ustasi ¦ Decision master",
      badgeSub: "JavaScript · техническая 2 ¦ JavaScript · texnik 2 ¦ JavaScript · technical 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Напишите программу «оценка по баллам»: 90+ → 5, 70+ → 4, иначе → «старайся». ¦ «Ball bo'yicha baho» dasturini yozing: 90+ → 5, 70+ → 4, aks holda → «harakat qil». ¦ Write a “grade by points” program: 90+ → A, 70+ → B, else → “keep trying”.",
        "Добавьте в калькулятор билетов своё правило. ¦ Chipta kalkulyatoriga o'z qoidangizni qo'shing. ¦ Add your own rule to the ticket calculator.",
      ],
      takeaway: "Дальше: циклы — как повторять действия. ¦ Keyingisi: sikllar — harakatlarni qanday takrorlash. ¦ Next: loops — how to repeat actions.",
      notes: { min: 2 },
    },
  ],
});
