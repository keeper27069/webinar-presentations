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

export default kit({
  id: 'js-g01',
  title: "Как отличить настоящий сайт от поддельного ¦ Haqiqiy saytni soxtasidan qanday ajratish mumkin ¦ How to tell a real site from a fake one",
  question: "Если поддельный сайт выглядит точь-в-точь как настоящий — как не попасться? ¦ Agar soxta sayt xuddi haqiqiysidek ko'rinsa — qanday qilib aldanmaslik kerak? ¦ If a fake site looks exactly like the real one, how do you avoid getting caught?",
  route: ["Загадка ¦ Topishmoq ¦ Puzzle", "Адрес ¦ Manzil ¦ The address", "Признаки ¦ Belgilar ¦ Red flags", "Если попались ¦ Agar aldansangiz ¦ If you fell for it", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎭',
      kicker: "JavaScript · общая тема 1 ¦ JavaScript · umumiy mavzu 1 ¦ JavaScript · general topic 1",
      title: "Сайт можно скопировать за минуту ¦ Saytni bir daqiqada nusxalash mumkin ¦ A site can be copied in a minute",
      chat: "вам приходили странные ссылки или СМС? ¦ sizga g'alati havolalar yoki SMS kelganmi? ¦ ever received weird links or texts?",
      lead: "Вы уже знаете HTML и CSS — значит, понимаете: скопировать вид любой страницы легко. Поэтому по внешнему виду сайту верить нельзя. Учимся смотреть глубже. ¦ Siz HTML va CSS'ni bilasiz — demak, tushunasiz: istalgan sahifa ko'rinishini nusxalash oson. Shuning uchun saytga tashqi ko'rinishiga qarab ishonib bo'lmaydi. Chuqurroq qarashni o'rganamiz. ¦ You know HTML and CSS, so you get it: copying how any page looks is easy. That's why you can't trust a site by its looks. Let's learn to look deeper.",
      facts: ["Логотип и цвета копируются легко ¦ Logotip va ranglar oson nusxalanadi ¦ Logos and colours are easy to copy", "Адрес сайта подделать сложнее ¦ Sayt manzilini qalbakilashtirish qiyinroq ¦ The address is harder to fake", "Спешка — главный инструмент мошенника ¦ Shoshiltirish — firibgarning asosiy quroli ¦ Urgency is a scammer's main tool"],
      takeaway: "Внешний вид — не доказательство. Проверяем адрес, просьбы и спешку. ¦ Tashqi ko'rinish — dalil emas. Manzil, so'rovlar va shoshiltirishni tekshiramiz. ¦ Looks prove nothing. Check the address, the requests and the urgency.",
      notes: { say: ["Все бренды и адреса в уроке выдуманные (Lumo, .example/.test). Формы на демо-страницах выключены и ничего не отправляют."], min: 3 },
    },
    {
      type: 'poll',
      stage: 0,
      title: "Где подделка? ¦ Soxtasi qayerda? ¦ Which one is fake?",
      chat: "голосуйте 1 или 2 ¦ 1 yoki 2 bilan ovoz bering ¦ vote 1 or 2",
      question: "Обе страницы выглядят как вход в выдуманный сервис Lumo. Какая подозрительная? ¦ Ikkala sahifa ham o'ylab topilgan Lumo xizmatiga kirishga o'xshaydi. Qaysi biri shubhali? ¦ Both look like a sign-in for the made-up service Lumo. Which one is suspicious?",
      options: [
        { label: "1 — email и пароль ¦ 1 — email va parol ¦ 1 — email and password" },
        { label: "2 — номер карты, CVV и SMS-код ¦ 2 — karta raqami, CVV va SMS-kod ¦ 2 — card number, CVV and SMS code", detail: "Верно ✔ ¦ To'g'ri ✔ ¦ Correct ✔" },
      ],
      correct: 1,
      result: "Для входа не нужны CVV и SMS-код. Плюс угроза «заблокируем через 10 минут» и опечатка «you account». На следующем слайде — сами страницы. ¦ Kirish uchun CVV va SMS-kod kerak emas. Bundan tashqari «10 daqiqada bloklaymiz» tahdidi va «you account» xatosi. Keyingi slaydda — sahifalarning o'zi. ¦ Signing in never needs a CVV or SMS code. Plus the “blocked in 10 minutes” threat and the typo “you account”. The pages themselves are next.",
      takeaway: "Подозрительно, когда сайт просит больше, чем нужно для задачи. ¦ Sayt vazifa uchun keragidan ko'proq narsani so'rasa — shubhali. ¦ It's suspicious when a site asks for more than the task needs.",
      notes: { say: ["Голосование."], min: 3 },
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
      type: 'walk',
      stage: 1,
      title: "Как читать адрес сайта ¦ Sayt manzilini qanday o'qish kerak ¦ How to read a web address",
      chat: "какой домен на самом деле у второго адреса? ¦ ikkinchi manzilning haqiqiy domeni qaysi? ¦ what's the real domain of the second address?",
      code: `https://lumo.example/login\n\nhttps://lumo.example.account-check.test/login\n\nhttps://lumo-examp1e.test/login`,
      lang: 'text',
      marks: [
        { line: 1, text: "Главное — часть до первого одиночного «/». Читаем её справа налево: example → lumo. Это настоящий адрес. ¦ Asosiysi — birinchi yakka «/» gacha bo'lgan qism. Uni o'ngdan chapga o'qiymiz: example → lumo. Bu haqiqiy manzil. ¦ What matters is the part before the first single “/”. Read it right to left: example → lumo. This is the real one." },
        { line: 3, text: "Справа налево: test → account-check. Всё, что левее, — просто приставка, её может написать кто угодно. ¦ O'ngdan chapga: test → account-check. Chapdagi hammasi — shunchaki qo'shimcha, uni istalgan kishi yozishi mumkin. ¦ Right to left: test → account-check. Everything to the left is just a prefix anyone can write." },
        { line: 5, text: "Подмена букв: «1» вместо «l». С первого взгляда не заметно. ¦ Harflarni almashtirish: «l» o'rniga «1». Birinchi qarashda sezilmaydi. ¦ Swapped letters: “1” instead of “l”. Easy to miss at a glance." },
      ],
      takeaway: "Смотрите на домен перед первым «/» и читайте его справа налево. ¦ Birinchi «/» oldidagi domenga qarang va uni o'ngdan chapga o'qing. ¦ Look at the domain before the first “/” and read it right to left.",
      notes: { say: ["Это главный навык урока — повторите правило ещё раз своими словами."], min: 5 },
    },
    {
      type: 'sort',
      stage: 1,
      title: "Настоящий или подозрительный? ¦ Haqiqiymi yoki shubhalimi? ¦ Real or suspicious?",
      chat: "пишите: «1 — настоящий» ¦ yozing: «1 — haqiqiy» ¦ write: “1 — real”",
      zones: [
        { id: 'ok', label: "Настоящий Lumo ¦ Haqiqiy Lumo ¦ Real Lumo", icon: '✅' },
        { id: 'bad', label: "Подозрительный ¦ Shubhali ¦ Suspicious", icon: '🚩' },
      ],
      items: [
        { text: 'help.lumo.example/faq', zone: 'ok', why: "Поддомен help внутри lumo.example. ¦ lumo.example ichidagi help subdomeni. ¦ The help subdomain inside lumo.example." },
        { text: 'lumo.example.gift-prize.test', zone: 'bad', why: "Настоящий домен — gift-prize.test. ¦ Haqiqiy domen — gift-prize.test. ¦ The real domain is gift-prize.test." },
        { text: 'lumo.example/settings', zone: 'ok' },
        { text: 'lumo-support.test/verify', zone: 'bad', why: "Похоже, но это другой домен. ¦ O'xshash, lekin bu boshqa domen. ¦ Looks similar but it's a different domain." },
        { text: 'lurno.example/login', zone: 'bad', why: "«rn» вместо «m». ¦ «m» o'rniga «rn». ¦ “rn” instead of “m”." },
      ],
      takeaway: "Одна буква или лишняя точка меняют весь адрес. ¦ Bitta harf yoki ortiqcha nuqta butun manzilni o'zgartiradi. ¦ One letter or an extra dot changes the whole address.",
      notes: { say: ["Раскладка → «Проверить»."], min: 4 },
    },
    {
      type: 'cards',
      stage: 2,
      title: "6 красных флагов ¦ 6 ta qizil bayroq ¦ 6 red flags",
      chat: "какой флаг вы видели в жизни? ¦ hayotda qaysi bayroqni ko'rgansiz? ¦ which flag have you seen in real life?",
      cards: [
        { icon: '⏰', front: "Спешка ¦ Shoshiltirish ¦ Urgency", back: "«Срочно!», «Через 10 минут заблокируем». Спешка мешает думать. ¦ «Shoshiling!», «10 daqiqada bloklaymiz». Shoshiltirish o'ylashga xalaqit beradi. ¦ “Urgent!”, “Blocked in 10 minutes”. Rushing stops you thinking." },
        { icon: '🎁', front: "Слишком хорошо ¦ Juda yaxshi ¦ Too good", back: "«Вы выиграли телефон!» — а вы ни в чём не участвовали. ¦ «Siz telefon yutdingiz!» — siz esa hech narsada qatnashmagansiz. ¦ “You won a phone!” — but you never entered anything." },
        { icon: '🔑', front: "Лишние данные ¦ Ortiqcha ma'lumotlar ¦ Extra data", back: "CVV, SMS-код, пароль от почты — для обычной задачи не нужны. ¦ CVV, SMS-kod, pochta paroli — oddiy vazifa uchun kerak emas. ¦ CVV, SMS codes, email passwords aren't needed for normal tasks." },
        { icon: '🔗', front: "Странный адрес ¦ G'alati manzil ¦ An odd address", back: "Лишние слова, цифры вместо букв, чужой домен справа. ¦ Ortiqcha so'zlar, harflar o'rnida raqamlar, o'ngda begona domen. ¦ Extra words, digits for letters, a foreign domain on the right." },
        { icon: '✍️', front: "Ошибки ¦ Xatolar ¦ Mistakes", back: "Опечатки и кривой перевод — частый признак подделки. ¦ Imlo xatolari va noto'g'ri tarjima — soxtaning tez-tez uchraydigan belgisi. ¦ Typos and clumsy translation are common signs of a fake." },
        { icon: '📩', front: "Ссылка из сообщения ¦ Xabardagi havola ¦ A link in a message", back: "Не переходите — откройте сайт сами, набрав адрес. ¦ O'tmang — manzilni yozib, saytni o'zingiz oching. ¦ Don't click — open the site yourself by typing the address." },
      ],
      takeaway: "Один флаг — повод насторожиться, два — повод закрыть страницу. ¦ Bitta bayroq — ehtiyot bo'lish uchun sabab, ikkitasi — sahifani yopish uchun sabab. ¦ One flag means be careful; two means close the page.",
      notes: { say: ["Открывайте карточки по выбору чата."], min: 5 },
    },
    {
      type: 'dialog',
      stage: 2,
      title: "Разбираем сообщение ¦ Xabarni tahlil qilamiz ¦ Taking a message apart",
      chat: "что бы вы ответили на последнее сообщение? ¦ oxirgi xabarga nima deb javob bergan bo'lardingiz? ¦ how would you reply to the last message?",
      a: { name: "Незнакомец ¦ Notanish ¦ Stranger", icon: '❓' },
      b: { name: "Вы ¦ Siz ¦ You", icon: '🙂' },
      messages: [
        { from: 'a', text: "Ваша посылка задержана! Оплатите доставку 1 $ по ссылке: lumo-post.test/pay ¦ Posilkangiz ushlab qolindi! Yetkazishni havola orqali 1 $ to'lang: lumo-post.test/pay ¦ Your parcel is held! Pay $1 delivery here: lumo-post.test/pay", flag: "Вы ничего не заказывали + чужой домен ¦ Siz hech narsa buyurtma qilmagansiz + begona domen ¦ You ordered nothing + a foreign domain" },
        { from: 'b', text: "Я ничего не заказывал. Какой номер посылки? ¦ Men hech narsa buyurtma qilmaganman. Posilka raqami qanday? ¦ I didn't order anything. What's the parcel number?" },
        { from: 'a', text: "Срочно! Через час посылку вернут отправителю! ¦ Shoshiling! Bir soatdan keyin posilka jo'natuvchiga qaytariladi! ¦ Hurry! In an hour it goes back to the sender!", flag: "Спешка вместо ответа ¦ Javob o'rniga shoshiltirish ¦ Urgency instead of an answer" },
        { from: 'b', text: "Не буду переходить. Покажу родителям и проверю в официальном приложении. ¦ O'tmayman. Ota-onamga ko'rsataman va rasmiy ilovada tekshiraman. ¦ Not clicking. I'll show my parents and check in the official app.", good: "Правильная реакция ¦ To'g'ri munosabat ¦ The right move" },
      ],
      takeaway: "Мошенник не отвечает на вопросы — он давит. ¦ Firibgar savollarga javob bermaydi — u bosim o'tkazadi. ¦ A scammer doesn't answer questions — they pressure you.",
      notes: { say: ["Читайте по ролям."], min: 4 },
    },
    {
      type: 'truefalse',
      stage: 2,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Замочек 🔒 в адресной строке = сайт честный ¦ Manzil qatoridagi qulf 🔒 = sayt halol ¦ A 🔒 padlock means the site is honest", truth: false, explain: "Замочек значит только, что соединение шифруется. Мошенники тоже его получают. ¦ Qulf faqat ulanish shifrlanganini bildiradi. Firibgarlar ham uni olishadi. ¦ The padlock only means the connection is encrypted. Scammers get one too." },
        { text: "Банк никогда не просит SMS-код по телефону ¦ Bank hech qachon telefonda SMS-kodni so'ramaydi ¦ A bank never asks for an SMS code by phone", truth: true, explain: "Код — только для вас. Кто его просит — мошенник. ¦ Kod — faqat siz uchun. Uni so'ragan — firibgar. ¦ The code is for you only. Whoever asks is a scammer." },
        { text: "Красивый дизайн говорит о надёжности ¦ Chiroyli dizayn ishonchlilikdan dalolat beradi ¦ A nice design shows it's trustworthy", truth: false, explain: "Дизайн копируется за минуты — вы это умеете сами. ¦ Dizayn bir necha daqiqada nusxalanadi — buni o'zingiz ham qila olasiz. ¦ Design copies in minutes — you can do it yourself." },
        { text: "Надёжнее набрать адрес самому, чем переходить по ссылке ¦ Havoladan o'tgandan ko'ra manzilni o'zingiz yozgan ishonchliroq ¦ Typing the address yourself is safer than clicking a link", truth: true, explain: "Или откройте сохранённую закладку. ¦ Yoki saqlangan xatcho'pni oching. ¦ Or use a saved bookmark." },
      ],
      takeaway: "Замочек — про шифрование, а не про честность. ¦ Qulf — shifrlash haqida, halollik haqida emas. ¦ The padlock is about encryption, not honesty.",
      notes: { say: ["Голосуем по пунктам."], min: 4 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Взгляд программиста ¦ Dasturchi nigohi ¦ A programmer's view",
      chat: "куда уходят данные из второй формы? ¦ ikkinchi formadan ma'lumotlar qayerga ketadi? ¦ where does the second form's data go?",
      left: { icon: '✅', label: "Настоящая форма ¦ Haqiqiy forma ¦ Real form", code: `<form action="https://lumo.example/login"\n      method="post">\n  <input name="email">\n  <input name="password" type="password">\n</form>`, lang: 'html' },
      right: { icon: '🚩', label: "Поддельная форма ¦ Soxta forma ¦ Fake form", code: `<form action="https://collect.test/save"\n      method="post">\n  <input name="card">\n  <input name="cvv">\n</form>`, lang: 'html' },
      verdict: "В коде видно, куда уходят данные: action указывает на чужой сервер. Вы знаете HTML и можете проверить это в DevTools. ¦ Kodda ma'lumotlar qayerga ketishi ko'rinadi: action begona serverni ko'rsatadi. Siz HTML'ni bilasiz va buni DevTools'da tekshira olasiz. ¦ The code shows where the data goes: action points to a foreign server. You know HTML and can check this in DevTools.",
      notes: { say: ["Это защитный навык: посмотреть, а не повторять. Обычному пользователю достаточно проверить адрес."], min: 4 },
    },
    {
      type: 'flow',
      stage: 3,
      title: "Если вы всё-таки ввели данные ¦ Agar baribir ma'lumot kiritgan bo'lsangiz ¦ If you did enter your data",
      chat: "какой шаг самый важный? ¦ qaysi qadam eng muhim? ¦ which step matters most?",
      nodes: [
        { icon: '🗣️', label: "Сказать взрослым ¦ Kattalarga aytish ¦ Tell an adult", text: "Родителям или учителю — сразу, без стыда. ¦ Ota-onaga yoki o'qituvchiga — darhol, uyalmasdan. ¦ Parents or a teacher — right away, no shame." },
        { icon: '🏦', label: "Позвонить в банк ¦ Bankka qo'ng'iroq ¦ Call the bank", text: "По номеру с карты — заблокировать карту. ¦ Kartadagi raqam orqali — kartani bloklash. ¦ Using the number on the card — block the card." },
        { icon: '🔑', label: "Сменить пароль ¦ Parolni almashtirish ¦ Change the password", text: "На настоящем сайте, набрав адрес вручную. ¦ Haqiqiy saytda, manzilni qo'lda yozib. ¦ On the real site, typing the address by hand." },
        { icon: '🛡️', label: "Включить 2FA ¦ 2FA'ni yoqish ¦ Turn on 2FA", text: "Двухфакторная защита — второй замок на аккаунте. ¦ Ikki bosqichli himoya — akkauntdagi ikkinchi qulf. ¦ Two-factor protection is a second lock on the account." },
      ],
      takeaway: "Быстрая реакция спасает деньги и аккаунты. Стыдиться нечего — попадаются и взрослые. ¦ Tez munosabat pul va akkauntlarni qutqaradi. Uyaladigan joyi yo'q — kattalar ham aldanadi. ¦ Acting fast saves money and accounts. No shame — adults get fooled too.",
      notes: { say: ["Подчеркните: ученикам — первым делом сказать родителям."], min: 4 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: детектив ссылок ¦ Missiya: havolalar detektivi ¦ Mission: link detective",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Мошенник остался ни с чем! ¦ Firibgar hech narsasiz qoldi! ¦ The scammer got nothing!",
      items: [
        { title: "Настоящий домен в lumo.example.win-now.test ¦ lumo.example.win-now.test'dagi haqiqiy domen ¦ The real domain in lumo.example.win-now.test", choices: ['lumo.example', 'win-now.test'], correct: 1, explain: "Читаем справа налево. ¦ O'ngdan chapga o'qiymiz. ¦ Read right to left." },
        { title: "Пришла ссылка «Вы выиграли!» ¦ «Siz yutdingiz!» havolasi keldi ¦ A “You won!” link arrives", choices: ["Перейти и проверить ¦ O'tib tekshirish ¦ Click and check", "Не переходить, показать взрослым ¦ O'tmaslik, kattalarga ko'rsatish ¦ Don't click, show an adult"], correct: 1, explain: "Ссылки из таких сообщений не открываем. ¦ Bunday xabarlardagi havolalarni ochmaymiz. ¦ Never open links from such messages." },
        { title: "Сайт просит CVV для входа ¦ Sayt kirish uchun CVV so'raydi ¦ A site wants a CVV to sign in", choices: ["Красный флаг ¦ Qizil bayroq ¦ Red flag", "Нормально ¦ Normal ¦ Normal"], correct: 0, explain: "Для входа CVV не нужен никогда. ¦ Kirish uchun CVV hech qachon kerak emas. ¦ Sign-in never needs a CVV." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: настоящий или поддельный ¦ Xulosa: haqiqiy yoki soxta ¦ Summary: real or fake",
      chat: "какой признак подделки вы запомнили лучше всего? ¦ soxtalikning qaysi belgisini eng yaxshi eslab qoldingiz? ¦ which red flag will you remember best?",
      answer: "Внешний вид сайта легко скопировать, поэтому проверяем глубже: домен перед первым «/», прочитанный справа налево; лишние просьбы вроде CVV и SMS-кода; спешку, «слишком хорошие» призы и ошибки. Ссылки из сообщений не открываем — набираем адрес сами. Замочек значит только шифрование. Если ввели данные — сразу говорим взрослым, блокируем карту и меняем пароль. ¦ Sayt ko'rinishini nusxalash oson, shuning uchun chuqurroq tekshiramiz: birinchi «/» oldidagi, o'ngdan chapga o'qilgan domen; CVV va SMS-kod kabi ortiqcha so'rovlar; shoshiltirish, «juda yaxshi» sovg'alar va xatolar. Xabarlardagi havolalarni ochmaymiz — manzilni o'zimiz yozamiz. Qulf faqat shifrlashni bildiradi. Ma'lumot kiritgan bo'lsangiz — darhol kattalarga aytamiz, kartani bloklaymiz va parolni almashtiramiz. ¦ A site's look is easy to copy, so check deeper: the domain before the first “/”, read right to left; extra requests like a CVV or SMS code; urgency, “too good” prizes and typos. Don't open links from messages — type the address yourself. The padlock only means encryption. If you entered data, tell an adult right away, block the card and change the password.",
      icon: '🕵️',
      badge: "Детектив ссылок ¦ Havolalar detektivi ¦ Link detective",
      badgeSub: "JavaScript · общая 1 ¦ JavaScript · umumiy 1 ¦ JavaScript · general 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Расскажите родителям правило «домен справа налево» и проверьте вместе 3 сайта, которыми вы пользуетесь. ¦ Ota-onangizga «domen o'ngdan chapga» qoidasini aytib bering va birga foydalanadigan 3 ta saytni tekshiring. ¦ Teach your parents the “domain right to left” rule and check 3 sites you use together.",
        "Добавьте важные сайты в закладки, чтобы не искать их по ссылкам. ¦ Muhim saytlarni havolalar orqali qidirmaslik uchun xatcho'plarga qo'shing. ¦ Bookmark important sites so you never reach them through links.",
      ],
      takeaway: "Следующая тема — API: как сайты по-честному получают данные из других сервисов. ¦ Keyingi mavzu — API: saytlar boshqa xizmatlardan ma'lumotni qanday halol olishadi. ¦ Next: APIs — how sites honestly get data from other services.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
