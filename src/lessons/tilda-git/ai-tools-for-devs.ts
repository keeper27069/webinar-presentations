import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%}
.ed{width:500px;border-radius:16px;overflow:hidden;background:#1d1f2b;box-shadow:0 10px 30px #0003}
.bar{padding:10px 14px;background:#2a2d3d;color:#9aa0b4;font:700 14px JetBrains Mono,monospace}
.code{padding:18px;font:600 19px/1.6 JetBrains Mono,monospace;color:#e6e8ee;white-space:pre}
.gh{color:#6b7183;font-style:italic}.ok{color:#7ee0b0}
.tip{margin:0 18px 16px;padding:8px 12px;border-radius:10px;background:#2a2d3d;color:#ffd76a;font:700 15px Manrope,system-ui}`;
const ed = (typed: string, ghost: string, tip = '') =>
  `<div class="wrap"><div class="ed"><div class="bar">script.js</div><div class="code">${typed}<span class="gh">${ghost}</span></div>${tip ? `<div class="tip">${tip}</div>` : ''}</div></div>`;

export default kit({
  id: 'tilda-git-g06',
  title: "AI-инструменты для программиста ¦ Dasturchi uchun AI vositalari ¦ AI tools for programmers",
  question: "Как пользоваться AI и при этом не разучиться думать? ¦ AI'dan qanday foydalanish va shu bilan birga o'ylashni unutmaslik kerak? ¦ How do you use AI without forgetting how to think?",
  route: ["Помощники ¦ Yordamchilar ¦ Helpers", "Подсказки ¦ Maslahatlar ¦ Suggestions", "Мозг ¦ Miya ¦ Your brain", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🦾',
      kicker: "Tilda · Git · общая тема 6 ¦ Tilda · Git · umumiy mavzu 6 ¦ Tilda · Git · general topic 6",
      title: "AI — напарник, а не замена ¦ AI — sherik, o'rinbosar emas ¦ AI is a partner, not a replacement",
      chat: "для чего вы уже используете AI? ¦ AI'dan nima uchun allaqachon foydalanasiz? ¦ what do you already use AI for?",
      lead: "Программисты используют AI каждый день: он подсказывает код, объясняет ошибки и помогает с идеями. Но решает и проверяет всегда человек. ¦ Dasturchilar AI'dan har kuni foydalanadi: u kod taklif qiladi, xatolarni tushuntiradi va g'oyalarda yordam beradi. Lekin har doim odam hal qiladi va tekshiradi. ¦ Programmers use AI daily: it suggests code, explains errors and helps with ideas. But a person always decides and checks.",
      facts: ["Подсказки в редакторе ¦ Muharrirdagi takliflar ¦ Suggestions in the editor", "Объяснение ошибок ¦ Xatolarni tushuntirish ¦ Explaining errors", "Понимать каждую строку ¦ Har bir qatorni tushunish ¦ Understand every line"],
      takeaway: "Посмотрим, как AI подсказывает прямо в коде. ¦ AI to'g'ridan-to'g'ri kodda qanday taklif berishini ko'ramiz. ¦ Let's watch AI suggest code right in the editor.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Серая подсказка в редакторе ¦ Muharrirdagi kulrang taklif ¦ The grey suggestion in the editor",
      chat: "принять подсказку или нет? ¦ taklifni qabul qilamizmi yoki yo'qmi? ¦ accept the suggestion or not?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: '// write: sum of 1..10', html: ed('// sum of numbers 1 to 10\n', ''), say: "Вы пишете комментарий: что хотите сделать. ¦ Siz izoh yozasiz: nima qilmoqchisiz. ¦ You write a comment saying what you want." },
        { code: '// AI suggests (grey)', html: ed('// sum of numbers 1 to 10\n', 'let sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  sum += i;\n}'), say: "AI предлагает код серым цветом. ¦ AI kodni kulrang rangda taklif qiladi. ¦ AI offers code in grey." },
        { code: '// read it first 👀', html: ed('// sum of numbers 1 to 10\n', 'let sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  sum += i;\n}', '👀 i <= 10 → 10 ✓'), say: "Прежде чем нажать Tab — читаем и понимаем каждую строку. ¦ Tab'ni bosishdan oldin — har bir qatorni o'qiymiz va tushunamiz. ¦ Before pressing Tab, read and understand every line." },
        { code: '// Tab ✓ → run → 55', html: ed('<span class="ok">// sum of numbers 1 to 10\nlet sum = 0;\nfor (let i = 1; i <= 10; i++) {\n  sum += i;\n}\nconsole.log(sum); // 55</span>', ''), say: "Приняли, запустили, проверили: 55 — верно! ¦ Qabul qildik, ishga tushirdik, tekshirdik: 55 — to'g'ri! ¦ Accept, run, check: 55 — correct!" },
      ],
      takeaway: "Подсказка → прочитать → понять → принять → проверить. ¦ Taklif → o'qish → tushunish → qabul qilish → tekshirish. ¦ Suggestion → read → understand → accept → test.",
      notes: { min: 5 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Навык как мышца ¦ Ko'nikma mushak kabi ¦ Skills are like muscles",
      chat: "что будет, если всё всегда делает AI? ¦ hammasini doim AI qilsa nima bo'ladi? ¦ what happens if AI always does everything?",
      actors: [
        { id: 'a', icon: '🧑', label: "Аня: сразу просит AI ¦ Anya: darhol AI'dan so'raydi ¦ Anya: asks AI straight away" },
        { id: 'b', icon: '🧑', label: "Бек: сначала сам, потом AI ¦ Bek: avval o'zi, keyin AI ¦ Bek: tries first, then AI" },
        { id: 'ma', text: "💪 навык ¦ 💪 ko'nikma ¦ 💪 skill" },
        { id: 'mb', text: "💪 навык ¦ 💪 ko'nikma ¦ 💪 skill" },
      ],
      steps: [
        { say: "Два ученика начинают одинаково. ¦ Ikki o'quvchi bir xil boshlaydi. ¦ Two students start the same.", at: { a: [26, 26], b: [26, 74], ma: [70, 26], mb: [70, 74] } },
        { say: "Аня копирует ответы AI, не разбираясь. Бек сначала пробует сам. ¦ Anya AI javoblarini tushunmasdan ko'chiradi. Bek avval o'zi urinib ko'radi. ¦ Anya copies AI's answers without thinking. Bek tries first himself.", set: { ma: { text: "💪 навык ↓ ¦ 💪 ko'nikma ↓ ¦ 💪 skill ↓" }, mb: { text: "💪 навык ↑ ¦ 💪 ko'nikma ↑ ¦ 💪 skill ↑" } } },
        { say: "На контрольной без AI Аня теряется, а Бек решает. ¦ AI'siz nazoratda Anya adashadi, Bek esa yechadi. ¦ In a test without AI, Anya is stuck and Bek solves it.", set: { a: { icon: '😟' }, b: { icon: '😎' }, ma: { text: "🥀 слабый ¦ 🥀 zaif ¦ 🥀 weak" }, mb: { text: "💪💪 сильный ¦ 💪💪 kuchli ¦ 💪💪 strong" } }, pulse: ['b'] },
      ],
      takeaway: "Сначала думайте сами — AI помогает тем, кто понимает. ¦ Avval o'zingiz o'ylang — AI tushunadiganlarga yordam beradi. ¦ Think first yourself — AI helps people who understand.",
      notes: { min: 4 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Как просить AI ¦ AI'dan qanday so'rash kerak ¦ How to ask AI",
      chat: "какая просьба научит вас большему? ¦ qaysi iltimos sizga ko'proq narsa o'rgatadi? ¦ which request teaches you more?",
      left: { icon: '📋', label: "Сделай за меня ¦ Men uchun qil ¦ Do it for me", points: ["«Напиши всю домашку» ¦ «Butun uy vazifasini yoz» ¦ “Write my whole homework”", "Копирую, не читая ¦ O'qimasdan ko'chiraman ¦ Copy without reading", "Ничего не понял ¦ Hech narsani tushunmadim ¦ Learned nothing"] },
      right: { icon: '🧑‍🏫', label: "Объясни мне ¦ Menga tushuntir ¦ Explain to me", points: ["«Почему тут ошибка?» ¦ «Nega bu yerda xato?» ¦ “Why is this an error?”", "«Дай подсказку, не ответ» ¦ «Javob emas, ishora ber» ¦ “Give a hint, not the answer”", "Понял и запомнил ¦ Tushundim va eslab qoldim ¦ Understood and remembered"] },
      verdict: "«Объясни» и «дай подсказку» делают вас сильнее. ¦ «Tushuntir» va «ishora ber» sizni kuchliroq qiladi. ¦ “Explain” and “give me a hint” make you stronger.",
      notes: { min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Хорошо или плохо использовать AI? ¦ AI'dan foydalanish yaxshimi yoki yomonmi? ¦ Good or bad use of AI?",
      chat: "пишите: «1 — хорошо» ¦ yozing: «1 — yaxshi» ¦ write: “1 — good”",
      zones: [
        { id: 'ok', label: "Хорошо ¦ Yaxshi ¦ Good", icon: '👍' },
        { id: 'no', label: "Плохо ¦ Yomon ¦ Bad", icon: '👎' },
      ],
      items: [
        { text: "Попросить объяснить ошибку ¦ Xatoni tushuntirishni so'rash ¦ Ask it to explain an error", zone: 'ok' },
        { text: "Вставить код, не читая ¦ Kodni o'qimasdan qo'yish ¦ Paste code without reading", zone: 'no' },
        { text: "Попросить 5 идей для проекта ¦ Loyiha uchun 5 ta g'oya so'rash ¦ Ask for 5 project ideas", zone: 'ok' },
        { text: "Отдать AI пароль от аккаунта ¦ AI'ga akkaunt parolini berish ¦ Give AI your account password", zone: 'no', why: "Пароли и личные данные — никому. ¦ Parollar va shaxsiy ma'lumotlar — hech kimga. ¦ Passwords and personal data go to nobody." },
        { text: "Сначала попробовать самому 10 минут ¦ Avval 10 daqiqa o'zing urinib ko'rish ¦ Try yourself for 10 minutes first", zone: 'ok' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "С AI можно не учить основы ¦ AI bilan asoslarni o'rganmasa ham bo'ladi ¦ With AI you don't need the basics", truth: false, explain: "Без основ не проверить, что AI прав. ¦ Asoslarsiz AI to'g'riligini tekshirib bo'lmaydi. ¦ Without basics you can't check AI." },
        { text: "AI может предложить неправильный код ¦ AI noto'g'ri kod taklif qilishi mumkin ¦ AI can suggest wrong code", truth: true, explain: "Поэтому читаем и запускаем. ¦ Shuning uchun o'qiymiz va ishga tushiramiz. ¦ So read and run it." },
        { text: "Профи тоже пользуются AI ¦ Professionallar ham AI'dan foydalanadi ¦ Pros use AI too", truth: true, explain: "Как напарником, а не вместо головы. ¦ Sherik sifatida, bosh o'rniga emas. ¦ As a partner, not instead of their head." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: умный напарник ¦ Missiya: aqlli sherik ¦ Mission: a smart partner",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "AI помогает, а вы растёте! ¦ AI yordam beradi, siz esa o'sasiz! ¦ AI helps and you grow!",
      items: [
        { title: "AI предложил код ¦ AI kod taklif qildi ¦ AI suggested code", choices: ["Прочитать и понять ¦ O'qib, tushunish ¦ Read and understand it", "Сразу Tab ¦ Darhol Tab ¦ Press Tab right away"], correct: 0, explain: "Сначала понять. ¦ Avval tushunish. ¦ Understand first." },
        { title: "Застряли на задаче ¦ Vazifada qotib qoldingiz ¦ Stuck on a task", choices: ["«Дай подсказку, не ответ» ¦ «Javob emas, ishora ber» ¦ “Give me a hint, not the answer”", "«Реши за меня» ¦ «Men uchun yech» ¦ “Solve it for me”"], correct: 0, explain: "Подсказка тренирует голову. ¦ Ishora boshni mashq qildiradi. ¦ Hints train your brain." },
        { title: "Что нельзя отправлять AI? ¦ AI'ga nimani yuborib bo'lmaydi? ¦ What should you never send AI?", choices: ["Пароли и личные данные ¦ Parollar va shaxsiy ma'lumotlar ¦ Passwords and personal data", "Текст ошибки ¦ Xato matni ¦ An error message"], correct: 0, explain: "Личное — только своё. ¦ Shaxsiy — faqat o'zingizniki. ¦ Personal stays personal." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: AI-инструменты ¦ Xulosa: AI vositalari ¦ Summary: AI tools",
      chat: "какое правило работы с AI возьмёте себе? ¦ AI bilan ishlashning qaysi qoidasini o'zingizga olasiz? ¦ which AI rule will you adopt?",
      answer: "AI подсказывает код в редакторе, объясняет ошибки и помогает с идеями. Правило: подсказку сначала читаем и понимаем, потом принимаем и проверяем запуском. Навык — как мышца: если всё делает AI, он слабеет, поэтому сначала пробуем сами и просим «объясни» или «дай подсказку». Пароли и личные данные AI не отправляем. ¦ AI muharrirda kod taklif qiladi, xatolarni tushuntiradi va g'oyalarda yordam beradi. Qoida: taklifni avval o'qiymiz va tushunamiz, keyin qabul qilib, ishga tushirib tekshiramiz. Ko'nikma — mushak kabi: hammasini AI qilsa, u zaiflashadi, shuning uchun avval o'zimiz urinib ko'ramiz va «tushuntir» yoki «ishora ber» deb so'raymiz. Parollar va shaxsiy ma'lumotlarni AI'ga yubormaymiz. ¦ AI suggests code in the editor, explains errors and helps with ideas. The rule: read and understand a suggestion first, then accept it and test it. Skills are like muscles — if AI does everything they weaken, so try first and ask AI to “explain” or “give a hint”. Never send AI passwords or personal data.",
      icon: '🦾',
      badge: "Пилот AI ¦ AI uchuvchisi ¦ AI pilot",
      badgeSub: "Tilda · Git · общая 6 ¦ Tilda · Git · umumiy 6 ¦ Tilda · Git · general 6",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Решите задачу сами, потом попросите AI проверить и объяснить. ¦ Vazifani o'zingiz yeching, keyin AI'dan tekshirib, tushuntirishni so'rang. ¦ Solve a task yourself, then ask AI to check and explain.",
        "Попросите AI «дай подсказку, не ответ» — и доведите до конца сами. ¦ AI'dan «javob emas, ishora ber» deb so'rang — va oxirigacha o'zingiz yetkazing. ¦ Ask AI for a hint, not the answer — and finish it yourself.",
      ],
      takeaway: "Дальше: как понять, что коду от AI можно доверять. ¦ Keyingisi: AI kodiga ishonish mumkinligini qanday tushunish. ¦ Next: how to tell if AI's code can be trusted.",
      notes: { min: 2 },
    },
  ],
});
