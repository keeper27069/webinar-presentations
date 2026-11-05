import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#f4f6fb;color:#1b2150}
.top{display:flex;align-items:center;gap:10px;padding:14px 22px;background:#5b3df5;color:#fff;font-weight:800;font-size:22px}
.card{max-width:380px;margin:26px auto;background:#fff;border-radius:16px;padding:22px;box-shadow:0 8px 30px #0001}
.card h2{margin:0 0 12px;font-size:22px}
input{display:block;width:100%;box-sizing:border-box;margin:8px 0;padding:12px;border:1px solid #cfd5e6;border-radius:10px;font-size:15px}
button{width:100%;padding:12px;border:0;border-radius:10px;background:#5b3df5;color:#fff;font-weight:700;font-size:16px}
.warn{background:#fff2c6;color:#7a5200;padding:10px;border-radius:10px;font-size:14px;margin-bottom:10px}
.demo{text-align:center;font-size:13px;color:#8a90a8;margin-top:10px}`;
const REAL = `<div class="top">🟣 Lumo</div><div class="card"><h2>Sign in</h2><input placeholder="Email" disabled><input placeholder="Password" type="password" disabled><button disabled>Sign in</button><p class="demo">Demo page · the form sends nothing</p></div>`;
const FAKE = `<div class="top">🟣 Lumo</div><div class="card"><div class="warn">⚠️ Your account will be BLOCKED in 10 minutes! Confirm your card now.</div><h2>Confirm you account</h2><input placeholder="Card number" disabled><input placeholder="CVV code" disabled><input placeholder="SMS code" disabled><button disabled>Confirm</button><p class="demo">Demo page · the form sends nothing</p></div>`;

const UCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.url{display:flex;align-items:center;gap:0;padding:16px 22px;border-radius:999px;background:#fff;box-shadow:0 10px 30px #0001;font:700 24px JetBrains Mono,monospace;color:#9aa0b4}
.url .d{padding:4px 8px;border-radius:10px;color:#16181f}
.ok .d{background:#d1fae5;color:#0f766e}.bad .d{background:#ffe0e0;color:#c62828}
.v{margin-top:18px;text-align:center;font-size:24px;font-weight:800}.ok .v{color:#0f766e}.bad .v{color:#c62828}`;
const url = (cls: string, a: string, d: string, b: string, v: string) =>
  `<div class="wrap"><div class="${cls}"><div class="url"><span>${a}</span><span class="d">${d}</span><span>${b}</span></div><div class="v">${v}</div></div></div>`;

export default kit({
  id: 'js-g01',
  title: "Как отличить настоящий сайт от поддельного ¦ Haqiqiy saytni soxtasidan qanday ajratish mumkin ¦ How to tell a real site from a fake",
  question: "Как не попасться на сайт-подделку, который выглядит точно как настоящий? ¦ Haqiqiysiga aynan o'xshaydigan soxta saytga qanday aldanmaslik kerak? ¦ How do you avoid a fake site that looks exactly like the real one?",
  route: ["Адрес ¦ Manzil ¦ The address", "Сравнение ¦ Solishtirish ¦ Comparing", "Сигналы ¦ Signallar ¦ Warning signs", "Что делать ¦ Nima qilish ¦ What to do", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎣',
      kicker: "JavaScript · общая тема 1 ¦ JavaScript · umumiy mavzu 1 ¦ JavaScript · general topic 1",
      title: "Подделку выдаёт адрес ¦ Soxtani manzil fosh qiladi ¦ The address gives a fake away",
      chat: "вам приходили сообщения «вы выиграли приз»? ¦ sizga «siz sovrin yutdingiz» xabarlari kelganmi? ¦ have you had “you've won a prize” messages?",
      lead: "Мошенники копируют дизайн настоящих сайтов, чтобы украсть пароли. Скопировать картинку легко, а настоящий адрес — нельзя. Учимся читать адрес и замечать тревожные сигналы. ¦ Firibgarlar parollarni o'g'irlash uchun haqiqiy saytlar dizaynini ko'chiradi. Rasmni ko'chirish oson, haqiqiy manzilni esa — yo'q. Manzilni o'qishni va xavotirli signallarni sezishni o'rganamiz. ¦ Scammers copy real sites' designs to steal passwords. Copying a look is easy; copying the real address isn't. Let's learn to read addresses and spot warning signs.",
      facts: ["Смотрим на адрес, а не на дизайн ¦ Dizaynga emas, manzilga qaraymiz ¦ Check the address, not the design", "Спешка и «приз» — тревога ¦ Shoshiltirish va «sovrin» — xavotir ¦ Urgency and “prizes” are red flags", "Сомневаетесь — спросите взрослого ¦ Ikkilansangiz — kattadan so'rang ¦ Unsure? Ask an adult"],
      takeaway: "Начнём с того, как читать адрес. ¦ Manzilni qanday o'qishdan boshlaymiz. ¦ First: how to read an address.",
      notes: { say: ["Все бренды и адреса в уроке выдуманы (.example, .test). Тема — защита."], min: 3 },
    },
    {
      type: 'show',
      stage: 0,
      title: "Где в адресе настоящее имя сайта ¦ Manzilda saytning haqiqiy nomi qayerda ¦ Where the real site name hides in an address",
      chat: "какой адрес настоящий? ¦ qaysi manzil haqiqiy? ¦ which address is real?",
      lang: 'text',
      css: UCSS,
      steps: [
        { code: 'https://lumo.example/login', html: url('ok', 'https://', 'lumo.example', '/login', '✅ lumo.example'), say: "Имя сайта — часть сразу перед первым «/». Здесь — lumo.example. ¦ Sayt nomi — birinchi «/» dan oldingi qism. Bu yerda — lumo.example. ¦ The site name is the part right before the first “/”: lumo.example." },
        { code: 'https://lumo.example.account-check.test/login', html: url('bad', 'https://lumo.example.', 'account-check.test', '/login', '❌ account-check.test'), say: "Хитрость: начало похоже, но имя сайта — то, что в конце: account-check.test! ¦ Hiyla: boshi o'xshash, lekin sayt nomi — oxiridagi qism: account-check.test! ¦ A trick: the start looks right, but the real name is at the end: account-check.test!" },
        { code: 'https://lurno.example/login', html: url('bad', 'https://', 'lurno.example', '/login', '❌ rn ≠ m'), say: "Подмена букв: «rn» вместо «m» — lurno вместо lumo. ¦ Harflarni almashtirish: «m» o'rniga «rn» — lumo o'rniga lurno. ¦ Swapped letters: “rn” for “m” — lurno instead of lumo." },
        { code: 'https://lumo.example/login', html: url('ok', 'https://', 'lumo.example', '/login', '✅ 🔖 → bookmark'), say: "Надёжный способ — открывать сайт из закладки или приложения, а не по ссылке. ¦ Ishonchli usul — saytni havola orqali emas, xatcho'p yoki ilovadan ochish. ¦ The safe way: open the site from a bookmark or the app, not a link." },
      ],
      takeaway: "Читайте имя сайта перед первым «/» — справа налево. ¦ Sayt nomini birinchi «/» dan oldin o'qing — o'ngdan chapga. ¦ Read the site name before the first “/”, right to left.",
      notes: { min: 5 },
    },
    {
      type: 'browser',
      stage: 1,
      title: "Сравним две страницы ¦ Ikki sahifani solishtiramiz ¦ Comparing the two pages",
      chat: "найдите 3 отличия! ¦ 3 ta farqni toping! ¦ spot 3 differences!",
      tabs: [
        { label: "Настоящий ¦ Haqiqiy ¦ Real", url: 'https://lumo.example/login', css: CSS, html: REAL, note: "Адрес — lumo.example. Просят только то, что нужно для входа. ¦ Manzil — lumo.example. Faqat kirish uchun keraklisini so'rashadi. ¦ The address is lumo.example. Only what sign-in needs." },
        { label: "Поддельный ¦ Soxta ¦ Fake", url: 'https://lumo.example.account-check.test/login', css: CSS, html: FAKE, note: "Адрес только начинается с lumo.example — на самом деле это account-check.test. Плюс спешка и CVV. ¦ Manzil faqat lumo.example bilan boshlanadi — aslida bu account-check.test. Bundan tashqari shoshiltirish va CVV. ¦ The address only starts with lumo.example — it's really account-check.test. Plus urgency and a CVV request." },
      ],
      takeaway: "Дизайн почти одинаковый. Разница — в адресе и в том, что просят. ¦ Dizayn deyarli bir xil. Farq — manzilda va nima so'ralayotganida. ¦ The design is nearly identical. The difference is the address and what's requested.",
      notes: { say: ["Обратите внимание чата на адресную строку — главное отличие."], min: 4 },
    },
    {
      type: 'sort',
      stage: 2,
      title: "Тревожный сигнал или норма? ¦ Xavotirli signalmi yoki normami? ¦ Red flag or normal?",
      chat: "пишите: «1 — тревога» ¦ yozing: «1 — xavotir» ¦ write: “1 — red flag”",
      zones: [
        { id: 'ok', label: "Нормально ¦ Normal ¦ Normal", icon: '🟢' },
        { id: 'red', label: "Тревога ¦ Xavotir ¦ Red flag", icon: '🚩' },
      ],
      items: [
        { text: "«Срочно! Аккаунт заблокируют через 10 минут» ¦ «Shoshiling! Akkaunt 10 daqiqada bloklanadi» ¦ “Urgent! Account blocked in 10 minutes”", zone: 'red' },
        { text: "Просят код из SMS ¦ SMS kodini so'rashadi ¦ They ask for an SMS code", zone: 'red' },
        { text: "Вы сами открыли сайт из закладки ¦ Saytni o'zingiz xatcho'pdan ochdingiz ¦ You opened the site from your bookmark", zone: 'ok' },
        { text: "«Вы выиграли телефон, введите данные карты» ¦ «Siz telefon yutdingiz, karta ma'lumotlarini kiriting» ¦ “You won a phone — enter card details”", zone: 'red' },
        { text: "Адрес точно совпадает с привычным ¦ Manzil odatdagisi bilan aynan mos ¦ The address matches exactly", zone: 'ok' },
      ],
      notes: { min: 4 },
    },
    {
      type: 'animate',
      stage: 3,
      title: "Пришла подозрительная ссылка ¦ Shubhali havola keldi ¦ A suspicious link arrives",
      chat: "что сделаете первым? ¦ birinchi nima qilasiz? ¦ what will you do first?",
      actors: [
        { id: 'msg', icon: '📩', label: "«Срочно! Войдите по ссылке» ¦ «Shoshiling! Havola orqali kiring» ¦ “Urgent! Log in via this link”" },
        { id: 'stop', icon: '✋', label: "Не нажимаю ¦ Bosmayman ¦ Don't tap" },
        { id: 'app', icon: '📱', label: "Сам открываю приложение ¦ Ilovani o'zim ochaman ¦ Open the app myself" },
        { id: 'adult', icon: '🧑‍🏫', label: "Говорю взрослому ¦ Kattaga aytaman ¦ Tell an adult" },
        { id: 'ok', icon: '🛡️', label: "Аккаунт в безопасности ¦ Akkaunt xavfsiz ¦ Account safe" },
      ],
      steps: [
        { say: "Пришло сообщение со ссылкой и спешкой. ¦ Havola va shoshiltirish bilan xabar keldi. ¦ A message arrives with a link and pressure.", at: { msg: [50, 16, 1.2] }, pulse: ['msg'] },
        { say: "Шаг 1: не нажимаем на ссылку. ¦ 1-qadam: havolani bosmaymiz. ¦ Step 1: don't tap the link.", at: { stop: [16, 56] }, lines: [['msg', 'stop']] },
        { say: "Шаг 2: сами открываем приложение или сайт из закладки и проверяем. ¦ 2-qadam: ilovani yoki xatcho'pdan saytni o'zimiz ochib tekshiramiz. ¦ Step 2: open the app or a bookmark yourself and check.", at: { app: [50, 56] }, lines: [['msg', 'stop'], ['stop', 'app']] },
        { say: "Шаг 3: рассказываем взрослому. Всё спокойно! ¦ 3-qadam: kattaga aytamiz. Hammasi joyida! ¦ Step 3: tell an adult. All good!", at: { adult: [84, 56], ok: [50, 90] }, lines: [['msg', 'stop'], ['stop', 'app'], ['app', 'adult'], ['adult', 'ok']], pulse: ['ok'] },
      ],
      takeaway: "Не нажимать → проверить самому → сказать взрослому. ¦ Bosmaslik → o'zing tekshirish → kattaga aytish. ¦ Don't tap → check yourself → tell an adult.",
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Красивый дизайн — значит сайт настоящий ¦ Chiroyli dizayn — demak sayt haqiqiy ¦ A nice design means the site is real", truth: false, explain: "Дизайн легко скопировать. ¦ Dizaynni ko'chirish oson. ¦ Designs are easy to copy." },
        { text: "Настоящий банк не просит код из SMS по ссылке ¦ Haqiqiy bank havola orqali SMS kodini so'ramaydi ¦ Real banks don't ask for SMS codes via links", truth: true, explain: "Код — только для вас. ¦ Kod — faqat siz uchun. ¦ The code is for you only." },
        { text: "Замочек 🔒 гарантирует, что сайт честный ¦ Qulfcha 🔒 saytning halolligini kafolatlaydi ¦ The padlock 🔒 guarantees an honest site", truth: false, explain: "🔒 значит «соединение шифруется», а не «сайт хороший». ¦ 🔒 «ulanish shifrlanadi» degani, «sayt yaxshi» emas. ¦ 🔒 means the connection is encrypted, not that the site is good." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: не попасться ¦ Missiya: aldanmaslik ¦ Mission: don't get caught",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Мошенники остались ни с чем! ¦ Firibgarlar hech narsasiz qoldi! ¦ The scammers got nothing!",
      items: [
        { title: "Какой адрес настоящий у lumo.example? ¦ lumo.example'ning qaysi manzili haqiqiy? ¦ Which is really lumo.example?", choices: ['lumo.example/login', 'lumo.example.win-prize.test'], correct: 0, explain: "Имя сайта — перед первым «/». ¦ Sayt nomi — birinchi «/» dan oldin. ¦ The name is before the first “/”." },
        { title: "Пишут: «Срочно, введите пароль» ¦ Yozishadi: «Shoshiling, parolni kiriting» ¦ “Urgent, enter your password”", choices: ["Не нажимать и сказать взрослому ¦ Bosmaslik va kattaga aytish ¦ Don't tap; tell an adult", "Быстро ввести ¦ Tezda kiritish ¦ Type it quickly"], correct: 0, explain: "Спешка — главный приём мошенников. ¦ Shoshiltirish — firibgarlarning asosiy usuli. ¦ Pressure is the scammer's main trick." },
        { title: "Самый безопасный вход ¦ Eng xavfsiz kirish ¦ The safest way in", choices: ["Из закладки или приложения ¦ Xatcho'p yoki ilovadan ¦ From a bookmark or the app", "По ссылке из сообщения ¦ Xabardagi havola orqali ¦ Via a message link"], correct: 0, explain: "Сами выбираем, куда идти. ¦ Qayerga borishni o'zimiz tanlaymiz. ¦ We choose where to go." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: настоящий или поддельный ¦ Xulosa: haqiqiymi yoki soxtami ¦ Summary: real or fake",
      chat: "какой совет расскажете родным? ¦ yaqinlaringizga qaysi maslahatni aytasiz? ¦ which tip will you share with your family?",
      answer: "Поддельный сайт может выглядеть точь-в-точь как настоящий, поэтому смотрим на адрес: имя сайта — часть прямо перед первым «/», читаем её справа налево и ищем подмену букв. Тревожные сигналы — спешка, «приз», просьба ввести пароль, код из SMS или данные карты. Подозрительную ссылку не открываем: заходим сами из закладки или приложения и рассказываем взрослому. ¦ Soxta sayt haqiqiysiga aynan o'xshashi mumkin, shuning uchun manzilga qaraymiz: sayt nomi — birinchi «/» dan oldingi qism, uni o'ngdan chapga o'qiymiz va harf almashtirishni qidiramiz. Xavotirli signallar — shoshiltirish, «sovrin», parol, SMS kodi yoki karta ma'lumotlarini kiritish iltimosi. Shubhali havolani ochmaymiz: xatcho'p yoki ilovadan o'zimiz kiramiz va kattaga aytamiz. ¦ A fake site can look exactly like the real one, so check the address: the site name is right before the first “/” — read it right to left and watch for swapped letters. Red flags: urgency, “prizes”, requests for passwords, SMS codes or card details. Don't open suspicious links; go in yourself from a bookmark or the app, and tell an adult.",
      icon: '🎣',
      badge: "Антифишинг-агент ¦ Antifishing agenti ¦ Anti-phishing agent",
      badgeSub: "JavaScript · общая 1 ¦ JavaScript · umumiy 1 ¦ JavaScript · general 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте любимые сайты в закладки и входите только через них. ¦ Sevimli saytlarni xatcho'plarga qo'shing va faqat ular orqali kiring. ¦ Bookmark your favourite sites and log in only through them.",
        "Расскажите родным про правило «перед первым /». ¦ Yaqinlaringizga «birinchi / dan oldin» qoidasini aytib bering. ¦ Teach your family the “before the first /” rule.",
      ],
      takeaway: "Дальше: что такое API и как приложения «разговаривают». ¦ Keyingisi: API nima va ilovalar qanday «gaplashadi». ¦ Next: what an API is and how apps “talk”.",
      notes: { min: 2 },
    },
  ],
});
