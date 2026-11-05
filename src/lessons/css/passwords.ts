import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.box{width:460px;padding:26px;border-radius:22px;background:#fff;box-shadow:0 10px 30px #0001}
.lbl{font-size:18px;color:#6b7183;font-weight:700}
.inp{margin:8px 0 18px;padding:14px 16px;border-radius:14px;border:3px solid #e6e8ee;font:700 24px JetBrains Mono,monospace;letter-spacing:1px}
.bar{height:18px;border-radius:9px;background:#eceef3;overflow:hidden}
.fill{height:100%;width:10%;border-radius:9px;background:#ef4b4b}
.res{margin-top:14px;font-size:26px;font-weight:800;color:#ef4b4b}
.l2 .fill{width:35%;background:#ff8a1f}.l2 .res{color:#ff8a1f}
.l3 .fill{width:60%;background:#e9b400}.l3 .res{color:#b38a00}
.l4 .fill{width:100%;background:#0fb5a6}.l4 .res{color:#0f8f84}.l4 .inp{border-color:#0fb5a6}`;
const meter = (lvl: number, pw: string, res: string) =>
  `<div class="wrap"><div class="box l${lvl}"><div class="lbl">Password</div><div class="inp">${pw}</div><div class="bar"><div class="fill"></div></div><div class="res">${res}</div></div></div>`;

export default kit({
  id: 'css-g09',
  title: "Как защитить свои аккаунты ¦ Akkauntlaringizni qanday himoya qilish kerak ¦ How to protect your accounts",
  question: "Почему «123456» взламывают за секунду, а длинную фразу — никогда? ¦ Nega «123456» bir soniyada buziladi, uzun ibora esa — hech qachon? ¦ Why is “123456” cracked in a second but a long phrase never?",
  route: ["Угадайка ¦ Topishmoq ¦ Guessing", "Надёжность ¦ Ishonchlilik ¦ Strength", "Второй замок ¦ Ikkinchi qulf ¦ A second lock", "Привычки ¦ Odatlar ¦ Habits", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔐',
      kicker: "CSS · общая тема 9 ¦ CSS · umumiy mavzu 9 ¦ CSS · general topic 9",
      title: "Пароль — ключ от вашей цифровой жизни ¦ Parol — raqamli hayotingiz kaliti ¦ A password is the key to your digital life",
      chat: "сколько у вас аккаунтов: игры, соцсети, почта? ¦ sizda nechta akkaunt bor: o'yinlar, ijtimoiy tarmoqlar, pochta? ¦ how many accounts do you have: games, social media, email?",
      lead: "Если кто-то узнает ваш пароль, он сможет писать от вашего имени и забрать игровые вещи. Хорошая новость: защититься легко — нужны 3 простые привычки. ¦ Agar kimdir parolingizni bilib olsa, u sizning nomingizdan yozishi va o'yin buyumlaringizni olib qo'yishi mumkin. Yaxshi xabar: himoyalanish oson — 3 ta oddiy odat kerak. ¦ If someone learns your password they can post as you and take your game items. The good news: protection is easy with 3 simple habits.",
      facts: ["Длинный пароль-фраза ¦ Uzun parol-ibora ¦ A long passphrase", "Свой пароль для каждого сайта ¦ Har bir sayt uchun alohida parol ¦ A different password per site", "Второй замок — код в телефоне ¦ Ikkinchi qulf — telefondagi kod ¦ A second lock: a code on your phone"],
      takeaway: "Сначала посмотрим, как пароли угадывают. ¦ Avval parollar qanday topilishini ko'ramiz. ¦ First, let's see how passwords get guessed.",
      notes: { say: ["Тема только про защиту: как беречь свои аккаунты."], min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Робот-угадайка ¦ Topqir robot ¦ The guessing robot",
      chat: "какой пароль робот угадает первым? ¦ robot qaysi parolni birinchi topadi? ¦ which password will the robot guess first?",
      actors: [
        { id: 'bot', icon: '🤖', label: "Программа-угадайка ¦ Topuvchi dastur ¦ Guessing program" },
        { id: 'try', text: "123456?" },
        { id: 'a', icon: '🔓', label: "123456" },
        { id: 'b', icon: '🔓', label: "qwerty" },
        { id: 'c', icon: '🔒', label: "tiger-eats-blue-pizza-7" },
        { id: 't', text: "⏳" },
      ],
      steps: [
        { say: "Плохие люди запускают программу, которая перебирает пароли — миллионы в секунду. ¦ Yomon odamlar parollarni saralaydigan dasturni ishga tushiradi — soniyasiga millionlab. ¦ Bad actors run a program that tries passwords — millions per second.", at: { bot: [14, 50, 1.3], a: [60, 20], b: [60, 50], c: [60, 80] } },
        { say: "Сначала — самые популярные: 123456… Угадан мгновенно! ¦ Avval — eng mashhurlari: 123456… Bir zumda topildi! ¦ First the most popular: 123456… Guessed instantly!", at: { try: [36, 20] }, lines: [['bot', 'a', "0,001 c ¦ 0,001 s ¦ 0.001 s"]], pulse: ['a'] },
        { say: "qwerty — тоже в списке. Угадан! ¦ qwerty — ham ro'yxatda. Topildi! ¦ qwerty is on the list too. Guessed!", set: { try: { text: "qwerty?" } }, at: { try: [36, 50] }, lines: [['bot', 'a'], ['bot', 'b', "0,002 c ¦ 0,002 s ¦ 0.002 s"]], pulse: ['b'] },
        { say: "Длинная фраза из 4 слов… робот перебирает, перебирает… ¦ 4 so'zdan iborat uzun ibora… robot saralaydi, saralaydi… ¦ A long 4-word phrase… the robot tries and tries…", set: { try: { text: "???" } }, at: { try: [36, 80], t: [86, 80] }, lines: [['bot', 'c']], pulse: ['t'] },
        { say: "…и не успеет даже за тысячи лет. Победа! ¦ …va hatto ming yillarda ham ulgurmaydi. G'alaba! ¦ …and wouldn't finish in thousands of years. We win!", set: { t: { text: "⏳ 1000+ лет ¦ ⏳ 1000+ yil ¦ ⏳ 1000+ years" }, c: { icon: '🛡️' } }, lines: [['bot', 'c', "✗"]], pulse: ['c'] },
      ],
      takeaway: "Каждая лишняя буква делает угадывание намного дольше. ¦ Har bir qo'shimcha harf topishni ancha uzaytiradi. ¦ Every extra letter makes guessing far slower.",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Делаем пароль надёжным ¦ Parolni ishonchli qilamiz ¦ Making a password strong",
      chat: "какой пароль придумали бы вы? (не пишите настоящий!) ¦ qanday parol o'ylab topgan bo'lardingiz? (haqiqiysini yozmang!) ¦ what password would you invent? (don't post your real one!)",
      lang: 'text',
      css: CSS,
      steps: [
        { code: '1234', html: meter(1, '1234', 'Very weak 😱'), say: "4 цифры — угадывается мгновенно. ¦ 4 ta raqam — bir zumda topiladi. ¦ 4 digits: guessed instantly." },
        { code: 'lola2010', html: meter(2, 'lola2010', 'Weak 😟'), say: "Имя и год рождения — первое, что попробуют. ¦ Ism va tug'ilgan yil — birinchi sinab ko'riladigan narsa. ¦ A name and birth year are the first things tried." },
        { code: 'Lola2010!', html: meter(3, 'Lola2010!', 'So-so 😐'), say: "Заглавная и знак немного помогают, но фраза всё ещё короткая. ¦ Bosh harf va belgi biroz yordam beradi, lekin ibora hali ham qisqa. ¦ A capital and a symbol help a bit, but it's still short." },
        { code: 'tiger-eats-blue-pizza-7', html: meter(4, 'tiger-eats-blue-pizza-7', 'Very strong 💪'), say: "4 случайных слова — длинно, надёжно и легко запомнить! ¦ 4 ta tasodifiy so'z — uzun, ishonchli va eslab qolish oson! ¦ 4 random words: long, strong and easy to remember!" },
      ],
      takeaway: "Длина важнее сложности: фраза из 4 слов лучше «Lola2010!». ¦ Uzunlik murakkablikdan muhimroq: 4 so'zli ibora «Lola2010!»dan yaxshiroq. ¦ Length beats complexity: a 4-word phrase beats “Lola2010!”.",
      notes: { say: ["Попросите НЕ писать настоящие пароли в чат."], min: 5 },
    },
    {
      type: 'animate',
      stage: 3,
      title: "Второй замок: код в телефоне ¦ Ikkinchi qulf: telefondagi kod ¦ A second lock: a code on your phone",
      chat: "у вас включён вход по коду из SMS или приложения? ¦ sizda SMS yoki ilovadagi kod orqali kirish yoqilganmi? ¦ do you have sign-in codes turned on?",
      actors: [
        { id: 'me', icon: '🙂', label: "Вы ¦ Siz ¦ You" },
        { id: 'pw', icon: '🔑', label: "Пароль ¦ Parol ¦ Password" },
        { id: 'ph', icon: '📱', label: "Код 482 913 ¦ Kod 482 913 ¦ Code 482 913" },
        { id: 'acc', icon: '🎮', label: "Ваш аккаунт ¦ Akkauntingiz ¦ Your account" },
        { id: 'bad', icon: '🦹', label: "Чужой ¦ Begona ¦ Stranger" },
      ],
      steps: [
        { say: "Вы входите: вводите пароль… ¦ Siz kirasiz: parolni kiritasiz… ¦ You sign in: you type your password…", at: { me: [12, 30], pw: [36, 30], acc: [86, 50, 1.3] }, lines: [['me', 'pw']] },
        { say: "…и код, который пришёл на ваш телефон. Вход! ¦ …va telefoningizga kelgan kod. Kirdingiz! ¦ …and the code sent to your phone. You're in!", at: { ph: [60, 30] }, lines: [['me', 'pw'], ['pw', 'ph'], ['ph', 'acc', "✓"]], pulse: ['acc'] },
        { say: "Чужой каким-то образом узнал ваш пароль… ¦ Begona qandaydir yo'l bilan parolingizni bilib oldi… ¦ A stranger somehow learned your password…", at: { bad: [12, 78] }, lines: [['bad', 'pw', "🔑?"]] },
        { say: "…но телефона у него нет. Замок не открылся! ¦ …lekin unda telefon yo'q. Qulf ochilmadi! ¦ …but they don't have your phone. The lock stays shut!", lines: [['bad', 'pw'], ['pw', 'acc', "🚫"]], set: { bad: { icon: '😤' } }, pulse: ['ph'] },
      ],
      takeaway: "Код в телефоне — второй замок. Включите его в настройках! ¦ Telefondagi kod — ikkinchi qulf. Uni sozlamalarda yoqing! ¦ The phone code is a second lock. Turn it on in settings!",
      notes: { say: ["Код из SMS никому не диктуем — даже «службе поддержки»."], min: 4 },
    },
    {
      type: 'sort',
      stage: 4,
      title: "Безопасно или рискованно? ¦ Xavfsizmi yoki xavflimi? ¦ Safe or risky?",
      chat: "пишите: «1 — рискованно» ¦ yozing: «1 — xavfli» ¦ write: “1 — risky”",
      zones: [
        { id: 'ok', label: "Безопасно ¦ Xavfsiz ¦ Safe", icon: '🛡️' },
        { id: 'no', label: "Рискованно ¦ Xavfli ¦ Risky", icon: '⚠️' },
      ],
      items: [
        { text: "Один пароль на все сайты ¦ Barcha saytlarga bitta parol ¦ One password for every site", zone: 'no', why: "Утёк с одного сайта — открыты все. ¦ Bitta saytdan sizib chiqsa — hammasi ochiq. ¦ One leak opens them all." },
        { text: "Менеджер паролей с одной главной фразой ¦ Bitta asosiy iborali parol menejeri ¦ A password manager with one master phrase", zone: 'ok' },
        { text: "Сказать код из SMS «сотруднику банка» ¦ SMS kodini «bank xodimi»ga aytish ¦ Telling an SMS code to a “bank employee”", zone: 'no' },
        { text: "Включить вход по коду ¦ Kod orqali kirishni yoqish ¦ Turning on sign-in codes", zone: 'ok' },
        { text: "Пароль на стикере на мониторе ¦ Monitordagi stikerda parol ¦ A password on a sticky note on the screen", zone: 'no' },
      ],
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 4,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Длинная фраза надёжнее короткого «сложного» пароля ¦ Uzun ibora qisqa «murakkab» paroldan ishonchliroq ¦ A long phrase beats a short “complex” password", truth: true, explain: "Длина — главное оружие. ¦ Uzunlik — asosiy qurol. ¦ Length is the main weapon." },
        { text: "Настоящая поддержка игры может спросить ваш пароль ¦ O'yinning haqiqiy qo'llab-quvvatlash xizmati parolingizni so'rashi mumkin ¦ Real game support may ask for your password", truth: false, explain: "Никогда. Кто спрашивает пароль — обманщик. ¦ Hech qachon. Parol so'ragan — firibgar. ¦ Never. Anyone asking is a scammer." },
        { text: "Если аккаунт взломали — нужно сменить пароль и рассказать взрослым ¦ Akkaunt buzilsa — parolni almashtirish va kattalarga aytish kerak ¦ If hacked, change the password and tell an adult", truth: true, explain: "И включить второй замок. ¦ Va ikkinchi qulfni yoqish. ¦ And turn on the second lock." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: защитить аккаунт ¦ Missiya: akkauntni himoya qilish ¦ Mission: protect the account",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Аккаунт под надёжной защитой! ¦ Akkaunt ishonchli himoyada! ¦ The account is well protected!",
      items: [
        { title: "Какой пароль выбрать? ¦ Qaysi parolni tanlash kerak? ¦ Which password?", choices: ['moon-cactus-jumps-42', 'lola2010'], correct: 0, explain: "Длинная фраза из случайных слов. ¦ Tasodifiy so'zlardan uzun ibora. ¦ A long phrase of random words." },
        { title: "Пишут: «Скажите код из SMS, и получите приз» ¦ Yozishadi: «SMS kodini ayting va sovg'a oling» ¦ “Tell us the SMS code to get a prize”", choices: ["Не отвечать, сказать взрослым ¦ Javob bermaslik, kattalarga aytish ¦ Don't reply, tell an adult", "Отправить код ¦ Kodni yuborish ¦ Send the code"], correct: 0, explain: "Код — только для вас. ¦ Kod — faqat siz uchun. ¦ The code is for you only." },
        { title: "Как не забыть 20 разных паролей? ¦ 20 xil parolni qanday unutmaslik kerak? ¦ How to remember 20 passwords?", choices: ["Менеджер паролей ¦ Parol menejeri ¦ A password manager", "Один на всё ¦ Hammasiga bitta ¦ Use one for all"], correct: 0, explain: "Он помнит всё за вас. ¦ U siz uchun hammasini eslab qoladi. ¦ It remembers them for you." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: защита аккаунтов ¦ Xulosa: akkauntlarni himoya qilish ¦ Summary: protecting accounts",
      chat: "какую привычку включите сегодня? ¦ bugun qaysi odatni yoqasiz? ¦ which habit will you start today?",
      answer: "Пароли угадывают программы, перебирая миллионы вариантов, поэтому «123456» и имя с годом рождения падают мгновенно. Спасают три привычки: длинная фраза из случайных слов, свой пароль для каждого сайта (поможет менеджер паролей) и второй замок — код в телефоне. Пароль и коды никому не сообщаем, даже «поддержке», а при взломе меняем пароль и говорим взрослым. ¦ Parollarni dasturlar millionlab variantlarni saralab topadi, shuning uchun «123456» va ism bilan tug'ilgan yil bir zumda buziladi. Uchta odat qutqaradi: tasodifiy so'zlardan uzun ibora, har bir sayt uchun alohida parol (parol menejeri yordam beradi) va ikkinchi qulf — telefondagi kod. Parol va kodlarni hech kimga, hatto «qo'llab-quvvatlash xizmati»ga ham aytmaymiz, buzilganda esa parolni almashtiramiz va kattalarga aytamiz. ¦ Programs guess passwords by trying millions of options, so “123456” or a name plus birth year falls instantly. Three habits protect you: a long phrase of random words, a different password for every site (a password manager helps) and a second lock — a code on your phone. Never share passwords or codes, even with “support”; if hacked, change the password and tell an adult.",
      icon: '🔐',
      badge: "Хранитель аккаунтов ¦ Akkauntlar qo'riqchisi ¦ Account guardian",
      badgeSub: "CSS · общая 9 ¦ CSS · umumiy 9 ¦ CSS · general 9",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Вместе с родителями включите вход по коду в главном аккаунте. ¦ Ota-onangiz bilan birga asosiy akkauntda kod orqali kirishni yoqing. ¦ With a parent, turn on sign-in codes for your main account.",
        "Придумайте новый пароль-фразу из 4 слов (никому не показывайте!). ¦ 4 so'zdan iborat yangi parol-ibora o'ylab toping (hech kimga ko'rsatmang!). ¦ Make a new 4-word passphrase (show nobody!).",
      ],
      takeaway: "Дальше: как сделать, чтобы сайт нашли в Google. ¦ Keyingisi: saytni Google'da qanday topadigan qilish. ¦ Next: getting your site found on Google.",
      notes: { min: 2 },
    },
  ],
});
