import { kit } from '@engine/kit';

const CAESAR = `function caesar(text, shift) {
  const abc = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (const ch of text.toLowerCase()) {
    const i = abc.indexOf(ch);
    result += i === -1 ? ch : abc[(i + shift + 26) % 26];
  }
  return result;
}`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.wd{display:flex;gap:10px;justify-content:center}
.lt{width:64px;height:76px;border-radius:14px;display:grid;place-items:center;background:#fff;box-shadow:0 6px 18px #0001;font:800 34px JetBrains Mono,monospace}
.lt.sh{background:#16181f;color:#7ee0b0;translate:0 -6px}
.cap{margin-top:16px;text-align:center;font-weight:800;font-size:20px;color:#6b7183}`;
const word = (letters: string, shifted: number, cap: string) => `<div class="wrap"><div><div class="wd">${[...letters].map((c, i) => `<div class="lt ${i < shifted ? 'sh' : ''}">${c}</div>`).join('')}</div><div class="cap">${cap}</div></div></div>`;
const shift = (w: string, k: number) => [...w].map((c) => String.fromCharCode(((c.charCodeAt(0) - 97 + k + 26) % 26) + 97)).join('');

export default kit({
  id: 'js-g03',
  title: "Как мессенджеры защищают переписку ¦ Messenjerlar yozishmalarni qanday himoya qiladi ¦ How messengers protect your chats",
  question: "Почему никто, кроме собеседника, не может прочитать ваше сообщение? ¦ Nega suhbatdoshingizdan boshqa hech kim xabaringizni o'qiy olmaydi? ¦ Why can nobody but the other person read your message?",
  route: ["Шифр ¦ Shifr ¦ A cipher", "Код ¦ Kod ¦ Code", "Ключи ¦ Kalitlar ¦ Keys", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔐',
      kicker: "JavaScript · общая тема 3 ¦ JavaScript · umumiy mavzu 3 ¦ JavaScript · general topic 3",
      title: "Секретный язык для сообщений ¦ Xabarlar uchun maxfiy til ¦ A secret language for messages",
      chat: "вы придумывали в детстве тайный шифр? ¦ bolaligingizda maxfiy shifr o'ylab topganmisiz? ¦ did you invent a secret code as a kid?",
      lead: "Шифрование превращает текст в кашу, которую можно прочитать только с ключом. Начнём с шифра Цезаря — ему 2000 лет — и посмотрим, как это работает в мессенджерах. ¦ Shifrlash matnni faqat kalit bilan o'qish mumkin bo'lgan bo'tqaga aylantiradi. 2000 yillik Sezar shifridan boshlaymiz va bu messenjerlarda qanday ishlashini ko'ramiz. ¦ Encryption turns text into a jumble only a key can unlock. We'll start with the 2,000-year-old Caesar cipher and see how messengers do it.",
      facts: ["Шифр — правило превращения ¦ Shifr — aylantirish qoidasi ¦ A cipher is a transforming rule", "Ключ — секрет, чтобы открыть ¦ Kalit — ochish uchun sir ¦ The key is the secret to open it", "Сервер видит только кашу ¦ Server faqat bo'tqani ko'radi ¦ The server sees only the jumble"],
      takeaway: "Сдвигаем буквы — смотрите! ¦ Harflarni siljitamiz — qarang! ¦ Let's shift some letters — watch!",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 0,
      title: "Шифр Цезаря: сдвиг на 3 ¦ Sezar shifri: 3 ga siljish ¦ The Caesar cipher: shift by 3",
      chat: "что получится из «cat»? ¦ «cat»dan nima chiqadi? ¦ what does “cat” become?",
      lang: 'text',
      css: PCSS,
      steps: [
        { code: 'text: meet\nshift: 3', html: word('meet', 0, 'a → d, b → e, c → f …'), say: "Правило: каждую букву сдвигаем на 3 вперёд по алфавиту. ¦ Qoida: har bir harfni alifbo bo'yicha 3 ta oldinga siljitamiz. ¦ The rule: move every letter 3 places forward in the alphabet." },
        { code: 'm → p', html: word('peet', 1, 'm + 3 = p'), say: "m → p. ¦ m → p. ¦ m → p." },
        { code: 'e → h, e → h, t → w', html: word(shift('meet', 3), 4, '🔒 phhw'), say: "Остальные буквы тоже — получилось «phhw». Непонятно! ¦ Qolgan harflar ham — «phhw» chiqdi. Tushunarsiz! ¦ The rest too — we get “phhw”. Unreadable!" },
        { code: 'phhw  shift: -3', html: word('meet', 0, '🔓 meet'), say: "Кто знает ключ (3), сдвигает назад — и читает «meet». ¦ Kalitni (3) biladigan orqaga siljitadi — va «meet»ni o'qiydi. ¦ Whoever knows the key (3) shifts back and reads “meet”." },
      ],
      takeaway: "Шифр + ключ = секрет. Без ключа — каша. ¦ Shifr + kalit = sir. Kalitsiz — bo'tqa. ¦ Cipher + key = secret. Without the key, a jumble.",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 1,
      console: true,
      title: "Пишем шифр на JavaScript ¦ JavaScript'da shifr yozamiz ¦ Writing the cipher in JavaScript",
      chat: "какое слово зашифровать? какой сдвиг? ¦ qaysi so'zni shifrlaymiz? qanday siljish? ¦ which word shall we encrypt? which shift?",
      task: "✍️ Меняйте слово и сдвиг. Минус — расшифровка ¦ ✍️ So'z va siljishni o'zgartiring. Minus — ochish ¦ ✍️ Change the word and shift. Negative = decrypt",
      steps: [
        { label: "Шифруем ¦ Shifrlaymiz ¦ Encrypt", js: `${CAESAR}\n\nconsole.log(caesar('meet at five', 3));` },
        { label: "Расшифровываем ¦ Ochamiz ¦ Decrypt", js: `${CAESAR}\n\nconst secret = caesar('meet at five', 3);\nconsole.log('🔒', secret);\nconsole.log('🔓', caesar(secret, -3));` },
      ],
      takeaway: "indexOf находит букву, % 26 «заворачивает» алфавит по кругу. Тот же код с минусом расшифровывает. ¦ indexOf harfni topadi, % 26 alifboni aylana bo'ylab «o'raydi». Xuddi shu kod minus bilan ochadi. ¦ indexOf finds the letter, % 26 wraps the alphabet around. The same code with a minus decrypts.",
      notes: { say: ["Разберите строку с % 26: после z снова идёт a."], min: 7 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Сквозное шифрование ¦ Uchdan-uchgacha shifrlash ¦ End-to-end encryption",
      chat: "может ли сервер прочитать ваше сообщение? ¦ server xabaringizni o'qiy oladimi? ¦ can the server read your message?",
      actors: [
        { id: 'a', icon: '👧', label: "Лола ¦ Lola ¦ Lola" },
        { id: 's', icon: '🗄️', label: "Сервер мессенджера ¦ Messenjer serveri ¦ Messenger server" },
        { id: 'b', icon: '👦', label: "Тимур ¦ Timur ¦ Timur" },
        { id: 'm', text: "Привет! 👋 ¦ Salom! 👋 ¦ Hi! 👋" },
        { id: 'k1', icon: '🔑' }, { id: 'k2', icon: '🔑' },
        { id: 'spy', icon: '🕵️', label: "Любопытный ¦ Qiziquvchan ¦ Snoop" },
      ],
      steps: [
        { say: "Лола пишет «Привет!». Ключи есть только у Лолы и Тимура. ¦ Lola «Salom!» deb yozadi. Kalitlar faqat Lola va Timurda bor. ¦ Lola types “Hi!”. Only Lola and Timur have the keys.", at: { a: [12, 50, 1.2], s: [50, 50], b: [88, 50, 1.2], m: [12, 18], k1: [12, 84, 0.7], k2: [88, 84, 0.7] } },
        { say: "Телефон Лолы шифрует сообщение — оно превращается в кашу. ¦ Lolaning telefoni xabarni shifrlaydi — u bo'tqaga aylanadi. ¦ Lola's phone encrypts it into a jumble.", set: { m: { text: "🔒 x7#Qp…" } }, pulse: ['m'] },
        { say: "Каша летит через сервер. Сервер и любопытные видят только 🔒. ¦ Bo'tqa server orqali uchadi. Server va qiziquvchanlar faqat 🔒 ni ko'radi. ¦ The jumble passes through the server. It — and any snoop — sees only 🔒.", at: { m: [50, 18], spy: [50, 84] }, lines: [['a', 's'], ['spy', 's', '?']], pulse: ['spy'] },
        { say: "Телефон Тимура открывает своим ключом: «Привет!» ¦ Timurning telefoni o'z kaliti bilan ochadi: «Salom!» ¦ Timur's phone opens it with his key: “Hi!”", at: { m: [88, 18] }, set: { m: { text: "🔓 Привет! 👋 ¦ 🔓 Salom! 👋 ¦ 🔓 Hi! 👋" }, spy: { icon: '🤷' } }, lines: [['a', 's'], ['s', 'b']], pulse: ['b'] },
      ],
      takeaway: "Открыть сообщение могут только концы цепочки — отправитель и получатель. ¦ Xabarni faqat zanjir uchlari — yuboruvchi va qabul qiluvchi ochishi mumkin. ¦ Only the two ends — sender and receiver — can open the message.",
      notes: { say: ["Настоящие мессенджеры используют гораздо более сложные шифры и пары ключей, но идея та же."], min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Шифр Цезаря надёжен и сегодня ¦ Sezar shifri bugun ham ishonchli ¦ The Caesar cipher is still secure today", truth: false, explain: "Всего 25 сдвигов — компьютер переберёт за миг. ¦ Atigi 25 ta siljish — kompyuter bir zumda saralab chiqadi. ¦ Only 25 shifts — a computer tries them instantly." },
        { text: "При сквозном шифровании сервер видит только «кашу» ¦ Uchdan-uchgacha shifrlashda server faqat «bo'tqa»ni ko'radi ¦ With end-to-end encryption the server sees only a jumble", truth: true, explain: "Ключи только на телефонах. ¦ Kalitlar faqat telefonlarda. ¦ The keys live only on the phones." },
        { text: "Шифрование защищает, даже если вы сами отправили фото незнакомцу ¦ Shifrlash, hatto fotoni notanishga o'zingiz yuborsangiz ham himoya qiladi ¦ Encryption protects you even if you send a photo to a stranger", truth: false, explain: "Незнакомец получит и откроет его. Думайте, кому пишете. ¦ Notanish uni oladi va ochadi. Kimga yozayotganingizni o'ylang. ¦ The stranger receives and opens it. Think about who you message." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: тайное послание ¦ Missiya: maxfiy xabar ¦ Mission: a secret message",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Послание дошло, и никто не подсмотрел! ¦ Xabar yetib bordi va hech kim ko'rmadi! ¦ The message arrived and nobody peeked!",
      items: [
        { title: "«abc» со сдвигом 1 ¦ 1 siljish bilan «abc» ¦ “abc” shifted by 1", choices: ['bcd', 'zab'], correct: 0, explain: "Каждую букву на 1 вперёд. ¦ Har bir harfni 1 ta oldinga. ¦ Each letter one forward." },
        { title: "Как расшифровать сдвиг 3? ¦ 3 siljishni qanday ochish mumkin? ¦ How to undo a shift of 3?", choices: ["Сдвиг -3 ¦ -3 siljish ¦ Shift by -3", "Сдвиг +6 ¦ +6 siljish ¦ Shift by +6"], correct: 0, explain: "Назад на столько же. ¦ Shuncha orqaga. ¦ Back by the same amount." },
        { title: "Кто может прочитать сообщение при сквозном шифровании? ¦ Uchdan-uchgacha shifrlashda xabarni kim o'qiy oladi? ¦ Who can read an end-to-end message?", choices: ["Только отправитель и получатель ¦ Faqat yuboruvchi va qabul qiluvchi ¦ Only sender and receiver", "Сервер ¦ Server ¦ The server"], correct: 0, explain: "Ключи только у них. ¦ Kalitlar faqat ularda. ¦ Only they hold keys." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: шифрование ¦ Xulosa: shifrlash ¦ Summary: encryption",
      chat: "зашифруйте своё имя сдвигом 3 и пришлите в чат! ¦ ismingizni 3 siljish bilan shifrlab, chatga yuboring! ¦ encrypt your name with a shift of 3 and post it!",
      answer: "Шифрование превращает текст в кашу, которую можно прочитать только с ключом. В шифре Цезаря каждая буква сдвигается на ключ (например, 3), а сдвиг назад возвращает текст. В мессенджерах со сквозным шифрованием ключи есть только на телефонах собеседников, поэтому сервер и любопытные видят лишь кашу. Но шифр не защитит, если вы сами отправили что-то не тому человеку. ¦ Shifrlash matnni faqat kalit bilan o'qish mumkin bo'lgan bo'tqaga aylantiradi. Sezar shifrida har bir harf kalitga (masalan, 3 ga) siljiydi, orqaga siljitish esa matnni qaytaradi. Uchdan-uchgacha shifrlangan messenjerlarda kalitlar faqat suhbatdoshlar telefonlarida bo'ladi, shuning uchun server va qiziquvchanlar faqat bo'tqani ko'radi. Lekin biror narsani noto'g'ri odamga o'zingiz yuborsangiz, shifr himoya qilmaydi. ¦ Encryption turns text into a jumble that only a key can unlock. In the Caesar cipher every letter shifts by the key (say 3), and shifting back restores it. In end-to-end messengers the keys live only on the two phones, so the server and snoops see only a jumble. But encryption can't help if you send something to the wrong person.",
      icon: '🔐',
      badge: "Мастер шифров ¦ Shifrlar ustasi ¦ Cipher master",
      badgeSub: "JavaScript · общая 3 ¦ JavaScript · umumiy 3 ¦ JavaScript · general 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Зашифруйте фразу для друга и передайте ему ключ устно. ¦ Do'stingiz uchun iborani shifrlang va kalitni og'zaki ayting. ¦ Encrypt a phrase for a friend and tell them the key in person.",
        "Узнайте, есть ли сквозное шифрование в вашем мессенджере. ¦ Messenjeringizda uchdan-uchgacha shifrlash bormi, bilib oling. ¦ Find out if your messenger uses end-to-end encryption.",
      ],
      takeaway: "Дальше: кто такие тестировщики. ¦ Keyingisi: testerlar kim. ¦ Next: who testers are.",
      notes: { min: 2 },
    },
  ],
});
