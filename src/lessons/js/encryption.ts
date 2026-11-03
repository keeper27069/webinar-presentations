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

export default kit({
  id: 'js-g03',
  title: "Как мессенджеры защищают переписку: шифрование ¦ Messenjerlar yozishmani qanday himoya qiladi: shifrlash ¦ How messengers protect chats: encryption",
  question: "Сообщение проходит через десятки чужих компьютеров. Почему никто не может его прочитать? ¦ Xabar o'nlab begona kompyuterlardan o'tadi. Nega uni hech kim o'qiy olmaydi? ¦ A message passes through dozens of other computers. Why can't anyone read it?",
  route: ["Путь сообщения ¦ Xabar yo'li ¦ The message's path", "Шифр Цезаря ¦ Sezar shifri ¦ The Caesar cipher", "Взлом ¦ Buzish ¦ Cracking", "Современная защита ¦ Zamonaviy himoya ¦ Modern protection", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔐',
      kicker: "JavaScript · общая тема 3 ¦ JavaScript · umumiy mavzu 3 ¦ JavaScript · general topic 3",
      title: "Письмо, которое не прочитать ¦ O'qib bo'lmaydigan xat ¦ A letter nobody can read",
      chat: "в каких приложениях вы видели надпись «сквозное шифрование»? ¦ qaysi ilovalarda «uchdan-uchga shifrlash» yozuvini ko'rgansiz? ¦ where have you seen “end-to-end encrypted”?",
      lead: "Шифрование превращает «привет» в набор символов вроде «x9#qL». Прочитать его может только тот, у кого есть ключ. Сегодня напишем свой шифр на JavaScript, а чат попробует его взломать. ¦ Shifrlash «salom»ni «x9#qL» kabi belgilar to'plamiga aylantiradi. Uni faqat kaliti borlar o'qiy oladi. Bugun JavaScript'da o'z shifrimizni yozamiz, chat esa uni buzishga harakat qiladi. ¦ Encryption turns “hello” into gibberish like “x9#qL”. Only someone with the key can read it. Today we'll write our own cipher in JavaScript, and chat will try to crack it.",
      facts: ["Текст + ключ = шифр ¦ Matn + kalit = shifr ¦ Text + key = ciphertext", "Шифр + ключ = текст ¦ Shifr + kalit = matn ¦ Ciphertext + key = text", "Без ключа — бессмыслица ¦ Kalitsiz — ma'nosiz narsa ¦ Without the key — nonsense"],
      takeaway: "Защита держится не на секретном способе, а на секретном ключе. ¦ Himoya maxfiy usulga emas, maxfiy kalitga tayanadi. ¦ Protection rests on a secret key, not a secret method.",
      notes: { min: 3 },
    },
    {
      type: 'flow',
      stage: 0,
      title: "Кто видит сообщение по пути? ¦ Yo'lda xabarni kim ko'radi? ¦ Who sees the message on the way?",
      chat: "кто из них мог бы прочитать незашифрованное сообщение? ¦ ulardan qaysi biri shifrlanmagan xabarni o'qiy olardi? ¦ which of them could read an unencrypted message?",
      nodes: [
        { icon: '📱', label: "Ваш телефон ¦ Telefoningiz ¦ Your phone", text: "Пишете «встречаемся в 5». ¦ «Soat 5 da uchrashamiz» deb yozasiz. ¦ You type “meet at 5”." },
        { icon: '📶', label: "Wi-Fi ¦ Wi-Fi ¦ Wi-Fi", text: "Роутер в кафе или дома. ¦ Kafe yoki uydagi router. ¦ A router at a café or home." },
        { icon: '🏢', label: "Провайдер ¦ Provayder ¦ Provider", text: "Компания, которая даёт интернет. ¦ Internet beradigan kompaniya. ¦ The company providing internet." },
        { icon: '🗄️', label: "Сервер мессенджера ¦ Messenjer serveri ¦ Messenger server", text: "Передаёт сообщение дальше. ¦ Xabarni keyinga uzatadi. ¦ Passes the message on." },
        { icon: '📲', label: "Телефон друга ¦ Do'stingiz telefoni ¦ Friend's phone", text: "Получатель читает сообщение. ¦ Qabul qiluvchi xabarni o'qiydi. ¦ The recipient reads it." },
      ],
      takeaway: "Без шифрования каждый узел по пути мог бы прочитать текст. Со сквозным шифрованием — только вы и друг. ¦ Shifrlashsiz yo'ldagi har bir tugun matnni o'qiy olardi. Uchdan-uchga shifrlash bilan — faqat siz va do'stingiz. ¦ Without encryption every hop could read the text. With end-to-end encryption only you and your friend can.",
      notes: { say: ["Спросите чат до последнего шага: кто мог бы подсмотреть?"], min: 4 },
    },
    {
      type: 'cards',
      stage: 1,
      title: "Шифр Цезаря: сдвиг алфавита ¦ Sezar shifri: alifboni siljitish ¦ The Caesar cipher: shifting the alphabet",
      chat: "как зашифровать CAT со сдвигом 1? ¦ CAT ni 1 siljish bilan qanday shifrlash mumkin? ¦ how do you encrypt CAT with shift 1?",
      cards: [
        { icon: '🔤', front: "Правило ¦ Qoida ¦ The rule", back: "Каждую букву сдвигаем на N позиций вперёд по алфавиту. ¦ Har bir harfni alifbo bo'yicha N pozitsiya oldinga siljitamiz. ¦ Move each letter N places forward in the alphabet." },
        { icon: '➡️', front: "Сдвиг 1 ¦ 1 siljish ¦ Shift 1", back: "A → B, B → C, … Z → A. CAT → DBU. ¦ A → B, B → C, … Z → A. CAT → DBU. ¦ A → B, B → C, … Z → A. CAT → DBU." },
        { icon: '🔑', front: "Ключ ¦ Kalit ¦ The key", back: "Число сдвига. Знаешь ключ — расшифруешь, сдвинув назад. ¦ Siljish soni. Kalitni bilsangiz — orqaga siljitib ochasiz. ¦ The shift number. Know it and you decrypt by shifting back." },
        { icon: '🏛️', front: "История ¦ Tarix ¦ History", back: "Таким шифром, по преданию, пользовался Юлий Цезарь больше 2000 лет назад. ¦ Rivoyatlarga ko'ra, bu shifrdan 2000 yildan ko'proq vaqt oldin Yuliy Sezar foydalangan. ¦ Legend says Julius Caesar used it over 2,000 years ago." },
      ],
      takeaway: "Метод известен всем, а секрет — только число сдвига. ¦ Usul hammaga ma'lum, sir esa — faqat siljish soni. ¦ Everyone knows the method; only the shift number is secret.",
      notes: { say: ["Пусть чат зашифрует своё имя со сдвигом 1."], min: 4 },
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
      type: 'output',
      stage: 2,
      title: "Чат, взломай! ¦ Chat, buz! ¦ Chat, crack it!",
      chat: "пишите расшифровку и сдвиг! ¦ ochilgan matn va siljishni yozing! ¦ post the decryption and the shift!",
      snippets: [
        { label: "Загадка 1 ¦ 1-topishmoq ¦ Puzzle 1", code: `caesar('uifsf jt b tfdsfu', -1)`, output: ['there is a secret'], explain: "Сдвиг был 1: каждую букву вернули на одну назад. ¦ Siljish 1 edi: har bir harf bittaga orqaga qaytarildi. ¦ The shift was 1: each letter moved back one." },
        { label: "Загадка 2 ¦ 2-topishmoq ¦ Puzzle 2", code: `caesar('khoor zruog', -3)`, output: ['hello world'], explain: "Классический сдвиг Цезаря — 3. ¦ Sezarning klassik siljishi — 3. ¦ Caesar's classic shift is 3." },
      ],
      takeaway: "Простой шифр взламывается подбором за минуту. ¦ Oddiy shifr bir daqiqada tanlash orqali buziladi. ¦ A simple cipher falls to guessing in a minute.",
      notes: { say: ["Покажите сначала только зашифрованный текст (до раскрытия) и дайте чату время."], min: 5 },
    },
    {
      type: 'predict',
      stage: 2,
      title: "Сколько вариантов перебрать? ¦ Nechta variantni sinash kerak? ¦ How many options to try?",
      chat: "ваш прогноз — число! ¦ bashoratingiz — raqam! ¦ your guess — a number!",
      label: "Сколько разных сдвигов у шифра Цезаря для английского алфавита? ¦ Ingliz alifbosi uchun Sezar shifrida nechta turli siljish bor? ¦ How many different Caesar shifts are there for the English alphabet?",
      min: 0,
      max: 100,
      answer: 25,
      result: "Всего 25 полезных сдвигов (26-й возвращает исходный текст). Компьютер переберёт их за миллисекунды. ¦ Jami 25 ta foydali siljish (26-chisi asl matnni qaytaradi). Kompyuter ularni millisekundlarda sinab chiqadi. ¦ Only 25 useful shifts (the 26th gives back the original). A computer tries them all in milliseconds.",
      takeaway: "Мало ключей = слабая защита. ¦ Kalitlar kam = himoya zaif. ¦ Few keys = weak protection.",
      notes: { min: 3 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "Цезарь и современный шифр ¦ Sezar va zamonaviy shifr ¦ Caesar vs a modern cipher",
      chat: "сколько лет нужно, чтобы перебрать ключи справа? ¦ o'ngdagi kalitlarni sinab chiqish uchun necha yil kerak? ¦ how many years to try every key on the right?",
      left: { icon: '🏛️', label: "Шифр Цезаря ¦ Sezar shifri ¦ Caesar cipher", points: ["25 ключей ¦ 25 ta kalit ¦ 25 keys", "Взлом — доли секунды ¦ Buzish — soniyaning bir qismi ¦ Cracked in a blink", "Хорош для игры ¦ O'yin uchun yaxshi ¦ Fine for games"] },
      right: { icon: '🛡️', label: "AES-256 ¦ AES-256 ¦ AES-256", points: ["2²⁵⁶ ключей — число из 78 цифр ¦ 2²⁵⁶ kalit — 78 xonali son ¦ 2²⁵⁶ keys — a 78-digit number", "Перебор дольше возраста Вселенной ¦ Sinash Koinot yoshidan uzoqroq ¦ Brute force outlasts the age of the universe", "Защищает банки и мессенджеры ¦ Banklar va messenjerlarni himoya qiladi ¦ Protects banks and messengers"] },
      verdict: "Идея та же — текст + ключ. Но ключей так много, что перебрать их невозможно. ¦ G'oya o'sha — matn + kalit. Lekin kalitlar shunchalik ko'pki, ularni sinab chiqish imkonsiz. ¦ Same idea — text + key. But there are so many keys that trying them all is impossible.",
      notes: { say: ["2^256 ≈ 1,16 × 10^77 — это 78-значное число."], min: 4 },
    },
    {
      type: 'cards',
      stage: 3,
      title: "Как защищают переписку сегодня ¦ Bugun yozishma qanday himoyalanadi ¦ How chats are protected today",
      chat: "какая карточка самая неожиданная? ¦ qaysi kartochka eng kutilmagan? ¦ which card surprised you most?",
      cards: [
        { icon: '🔒', front: 'HTTPS', back: "Шифрует связь между браузером и сайтом. Тот самый замочек. ¦ Brauzer va sayt orasidagi aloqani shifrlaydi. O'sha qulf. ¦ Encrypts the link between browser and site. That padlock." },
        { icon: '📬', front: "Открытый ключ ¦ Ochiq kalit ¦ Public key", back: "Как открытый почтовый ящик: положить письмо может любой. ¦ Ochiq pochta qutisi kabi: xatni istalgan kishi solishi mumkin. ¦ Like an open mailbox slot: anyone can drop a letter in." },
        { icon: '🗝️', front: "Закрытый ключ ¦ Yopiq kalit ¦ Private key", back: "Ключ от ящика — только у владельца. Он один достаёт письма. ¦ Quti kaliti — faqat egasida. Faqat u xatlarni oladi. ¦ The mailbox key — only the owner has it and reads the letters." },
        { icon: '↔️', front: "Сквозное шифрование ¦ Uchdan-uchga shifrlash ¦ End-to-end", back: "Ключи только на телефонах собеседников — даже сервер не читает текст. ¦ Kalitlar faqat suhbatdoshlar telefonida — hatto server ham matnni o'qimaydi. ¦ Keys live only on the two phones; even the server can't read the text." },
      ],
      takeaway: "Шифрование защищает в пути, но не защитит, если вы сами отдали код или пароль. ¦ Shifrlash yo'lda himoya qiladi, lekin kod yoki parolni o'zingiz bersangiz himoya qilmaydi. ¦ Encryption protects in transit, not if you hand over a code or password yourself.",
      notes: { say: ["Свяжите с прошлым уроком: мошенники не взламывают шифр — они выманивают коды."], min: 5 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Хороший шифр держит в секрете свой алгоритм ¦ Yaxshi shifr o'z algoritmini sir tutadi ¦ A good cipher keeps its algorithm secret", truth: false, explain: "Алгоритмы вроде AES открыты, секрет — только ключ. ¦ AES kabi algoritmlar ochiq, sir — faqat kalit. ¦ Algorithms like AES are public; only the key is secret." },
        { text: "Сквозное шифрование скрывает текст даже от сервера ¦ Uchdan-uchga shifrlash matnni hatto serverdan ham yashiradi ¦ End-to-end encryption hides the text even from the server", truth: true, explain: "Сервер передаёт только «x9#qL». ¦ Server faqat «x9#qL» ni uzatadi. ¦ The server only relays “x9#qL”." },
        { text: "Если переписка зашифрована, SMS-код можно сообщить кому угодно ¦ Yozishma shifrlangan bo'lsa, SMS-kodni istalgan kishiga aytish mumkin ¦ If chats are encrypted, you can share SMS codes with anyone", truth: false, explain: "Шифр защищает канал, а не вашу доверчивость. ¦ Shifr kanalni himoya qiladi, ishonuvchanligingizni emas. ¦ Encryption guards the channel, not your trust." },
      ],
      takeaway: "Сильная математика + осторожный человек = надёжная защита. ¦ Kuchli matematika + ehtiyotkor inson = ishonchli himoya. ¦ Strong maths + a careful human = solid protection.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Защищено или нет? ¦ Himoyalanganmi yoki yo'qmi? ¦ Protected or not?",
      chat: "пишите: «1 — защищено» ¦ yozing: «1 — himoyalangan» ¦ write: “1 — protected”",
      zones: [
        { id: 'safe', label: "Зашифровано в пути ¦ Yo'lda shifrlangan ¦ Encrypted in transit", icon: '🔒' },
        { id: 'open', label: "Видно по пути ¦ Yo'lda ko'rinadi ¦ Visible on the way", icon: '👀' },
      ],
      items: [
        { text: "Сайт с адресом https:// ¦ https:// manzilli sayt ¦ A site at https://", zone: 'safe' },
        { text: "Сайт с адресом http:// ¦ http:// manzilli sayt ¦ A site at http://", zone: 'open', why: "Без «s» данные идут открытым текстом. ¦ «s»siz ma'lumotlar ochiq matnda ketadi. ¦ Without the “s”, data travels as plain text." },
        { text: "Чат со сквозным шифрованием ¦ Uchdan-uchga shifrlangan chat ¦ An end-to-end encrypted chat", zone: 'safe' },
        { text: "Пароль, написанный на стикере у монитора ¦ Monitor yonidagi stikerga yozilgan parol ¦ A password on a sticky note by the monitor", zone: 'open', why: "Шифр не спасёт, если секрет лежит на виду. ¦ Sir ko'zga ko'rinib tursa, shifr qutqarmaydi. ¦ No cipher helps if the secret is in plain sight." },
      ],
      takeaway: "Ищите https:// и не оставляйте секреты на виду. ¦ https:// ni qidiring va sirlarni ko'zga ko'rinadigan joyda qoldirmang. ¦ Look for https:// and keep secrets out of sight.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: секретный агент ¦ Missiya: maxfiy agent ¦ Mission: secret agent",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сообщение доставлено в безопасности! ¦ Xabar xavfsiz yetkazildi! ¦ The message arrived safely!",
      items: [
        { title: "«DBU» со сдвигом 1 — это… ¦ 1 siljishli «DBU» — bu… ¦ “DBU” with shift 1 is…", choices: ['CAT', 'DOG'], correct: 0, explain: "D→C, B→A, U→T. ¦ D→C, B→A, U→T. ¦ D→C, B→A, U→T." },
        { title: "Что держим в секрете? ¦ Nimani sir tutamiz? ¦ What stays secret?", choices: ["Ключ ¦ Kalit ¦ The key", "Название шифра ¦ Shifr nomi ¦ The cipher's name"], correct: 0, explain: "Алгоритм открыт, ключ — нет. ¦ Algoritm ochiq, kalit — yo'q. ¦ The algorithm is open; the key isn't." },
        { title: "Почему AES не перебрать? ¦ Nega AES'ni sinab chiqib bo'lmaydi? ¦ Why can't AES be brute-forced?", choices: ["Слишком много ключей ¦ Kalitlar juda ko'p ¦ Far too many keys", "Он запрещён ¦ U taqiqlangan ¦ It's banned"], correct: 0, explain: "2²⁵⁶ вариантов. ¦ 2²⁵⁶ variant. ¦ 2²⁵⁶ options." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: шифрование ¦ Xulosa: shifrlash ¦ Summary: encryption",
      chat: "зашифруйте Цезарем фразу для чата — пусть другие разгадают! ¦ chat uchun iborani Sezar bilan shifrlang — boshqalar topsin! ¦ encrypt a phrase with Caesar — let others crack it!",
      answer: "Шифрование превращает текст в бессмыслицу с помощью ключа, а ключ возвращает его обратно. Шифр Цезаря сдвигает буквы и имеет всего 25 ключей — его ломают перебором. Современные шифры вроде AES открыты, но ключей так много, что перебор невозможен. HTTPS защищает связь с сайтом, а сквозное шифрование прячет текст даже от сервера. Но если вы сами отдали код или пароль, никакой шифр не поможет. ¦ Shifrlash kalit yordamida matnni ma'nosiz narsaga aylantiradi, kalit esa uni qaytaradi. Sezar shifri harflarni siljitadi va bor-yo'g'i 25 ta kalitga ega — u sinab chiqish orqali buziladi. AES kabi zamonaviy shifrlar ochiq, lekin kalitlar shunchalik ko'pki, sinab chiqish imkonsiz. HTTPS sayt bilan aloqani himoya qiladi, uchdan-uchga shifrlash esa matnni hatto serverdan yashiradi. Lekin kod yoki parolni o'zingiz bersangiz, hech qanday shifr yordam bermaydi. ¦ Encryption turns text into nonsense with a key, and the key turns it back. Caesar shifts letters and has just 25 keys, so it's brute-forced. Modern ciphers like AES are public, but there are so many keys that brute force is impossible. HTTPS protects your link to a site; end-to-end encryption hides text even from the server. But if you hand over a code or password yourself, no cipher can help.",
      icon: '🔐',
      badge: "Криптограф ¦ Kriptograf ¦ Cryptographer",
      badgeSub: "JavaScript · общая 3 ¦ JavaScript · umumiy 3 ¦ JavaScript · general 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Доработайте функцию caesar, чтобы она сохраняла заглавные буквы. ¦ caesar funksiyasini bosh harflarni saqlaydigan qilib takomillashtiring. ¦ Improve caesar so it keeps capital letters.",
        "Напишите функцию, которая перебирает все 25 сдвигов и печатает варианты. ¦ Barcha 25 siljishni sinab, variantlarni chiqaradigan funksiya yozing. ¦ Write a function that tries all 25 shifts and prints each result.",
      ],
      takeaway: "Следующая тема — тестировщики: как ищут баги до пользователей. ¦ Keyingi mavzu — testerlar: xatolar foydalanuvchilardan oldin qanday topiladi. ¦ Next: testers — finding bugs before users do.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
