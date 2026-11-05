import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Arial,system-ui}
.g{width:520px;padding:20px;border-radius:18px;background:#fff;box-shadow:0 10px 30px #0001}
.q{padding:12px 18px;border-radius:999px;border:2px solid #e6e8ee;font-size:18px;margin-bottom:14px}
.r{padding:10px 12px;border-radius:10px;margin-bottom:6px;font-size:17px;color:#888;background:#f6f7fa}
.r b{display:block;color:#666;font-size:18px}
.hit{background:#e8faf7;color:#0f766e}.hit b{color:#1a0dab}`;
const g = (q: string, rows: [string, string, boolean][]) =>
  `<div class="wrap"><div class="g"><div class="q">🔍 ${q}</div>${rows.map(([t, d, hit]) => `<div class="r ${hit ? 'hit' : ''}"><b>${t}</b>${d}</div>`).join('')}</div></div>`;

export default kit({
  id: 'bootstrap-g05',
  title: "Как самому найти решение: Google, документация, AI ¦ Yechimni o'zing qanday topish: Google, hujjatlar, AI ¦ Finding solutions yourself: Google, docs, AI",
  question: "Что делают профи, когда не знают ответа? ¦ Professionallar javobni bilmaganda nima qiladi? ¦ What do pros do when they don't know the answer?",
  route: ["Путь ¦ Yo'l ¦ The path", "Google ¦ Google ¦ Google", "AI ¦ AI ¦ AI", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🧩',
      kicker: "Bootstrap · общая тема 5 ¦ Bootstrap · umumiy mavzu 5 ¦ Bootstrap · general topic 5",
      title: "Профи не помнят всё ¦ Professionallar hammasini eslamaydi ¦ Pros don't remember everything",
      chat: "что вы делаете, когда код не работает? ¦ kod ishlamasa nima qilasiz? ¦ what do you do when code doesn't work?",
      lead: "Секрет программистов — не память, а умение за 5 минут найти ответ: правильно спросить Google, открыть документацию и грамотно попросить AI. ¦ Dasturchilarning siri — xotira emas, 5 daqiqada javob topish mahorati: Google'dan to'g'ri so'rash, hujjatlarni ochish va AI'dan to'g'ri so'rash. ¦ Programmers' secret isn't memory — it's finding answers in 5 minutes: asking Google well, opening the docs and prompting AI properly.",
      facts: ["Прочитать ошибку ¦ Xatoni o'qish ¦ Read the error", "Точный запрос ¦ Aniq so'rov ¦ A precise search", "Проверять ответ AI ¦ AI javobini tekshirish ¦ Check AI's answer"],
      takeaway: "Посмотрим на путь от бага до решения. ¦ Xatodan yechimgacha bo'lgan yo'lni ko'ramiz. ¦ Let's walk the path from bug to fix.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "От бага до решения ¦ Xatodan yechimgacha ¦ From bug to fix",
      chat: "какой шаг вы обычно пропускаете? ¦ odatda qaysi qadamni o'tkazib yuborasiz? ¦ which step do you usually skip?",
      actors: [
        { id: 'bug', icon: '🐞', label: "Не работает! ¦ Ishlamayapti! ¦ It's broken!" },
        { id: 'read', icon: '📖', label: "Читаю ошибку ¦ Xatoni o'qiyman ¦ Read the error" },
        { id: 'goo', icon: '🔍', label: "Google ¦ Google ¦ Google" },
        { id: 'doc', icon: '📘', label: "Документация ¦ Hujjatlar ¦ Docs" },
        { id: 'ai', icon: '🤖', label: "AI ¦ AI ¦ AI" },
        { id: 'ok', icon: '✅', label: "Работает! ¦ Ishlaydi! ¦ Fixed!" },
        { id: 'tm', text: "⏱️ 15 мин → спроси человека ¦ ⏱️ 15 daq → odamdan so'ra ¦ ⏱️ 15 min → ask a person" },
      ],
      steps: [
        { say: "Код сломался. Без паники! ¦ Kod buzildi. Vahima qilmang! ¦ The code broke. Don't panic!", at: { bug: [8, 50, 1.2] }, pulse: ['bug'] },
        { say: "Шаг 1: читаем красный текст ошибки — там часто уже ответ. ¦ 1-qadam: xatoning qizil matnini o'qiymiz — ko'pincha javob o'sha yerda. ¦ Step 1: read the red error text — the answer is often there.", at: { read: [26, 30] }, lines: [['bug', 'read']] },
        { say: "Шаг 2: ищем эту ошибку в Google. ¦ 2-qadam: bu xatoni Google'dan qidiramiz. ¦ Step 2: search the error on Google.", at: { goo: [44, 70] }, lines: [['bug', 'read'], ['read', 'goo']] },
        { say: "Шаг 3: сверяемся с документацией — это официальная инструкция. ¦ 3-qadam: hujjatlar bilan solishtiramiz — bu rasmiy yo'riqnoma. ¦ Step 3: check the docs — the official manual.", at: { doc: [62, 30] }, lines: [['bug', 'read'], ['read', 'goo'], ['goo', 'doc']] },
        { say: "Шаг 4: просим AI объяснить — и проверяем его ответ. ¦ 4-qadam: AI'dan tushuntirishni so'raymiz — va javobini tekshiramiz. ¦ Step 4: ask AI to explain — and check its answer.", at: { ai: [78, 70] }, lines: [['bug', 'read'], ['read', 'goo'], ['goo', 'doc'], ['doc', 'ai']] },
        { say: "Готово! А если 15 минут ничего не помогает — спросите учителя или друга. ¦ Tayyor! Agar 15 daqiqa hech narsa yordam bermasa — o'qituvchi yoki do'stdan so'rang. ¦ Fixed! And if nothing helps in 15 minutes, ask a teacher or friend.", at: { ok: [93, 30, 1.2], tm: [50, 92] }, lines: [['bug', 'read'], ['read', 'goo'], ['goo', 'doc'], ['doc', 'ai'], ['ai', 'ok']], pulse: ['ok'] },
      ],
      takeaway: "Ошибка → Google → документация → AI → человек. ¦ Xato → Google → hujjatlar → AI → odam. ¦ Error → Google → docs → AI → a person.",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Запрос становится точнее ¦ So'rov aniqroq bo'ladi ¦ The search gets sharper",
      chat: "как бы вы загуглили эту проблему? ¦ bu muammoni Google'da qanday qidirgan bo'lardingiz? ¦ how would you google this problem?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: "button doesn't work", html: g("button doesn't work", [['Fix your TV remote', 'Batteries…', false], ['Washing machine button', 'Try…', false], ['Game controller issues', '…', false]]), say: "Слишком общий запрос — ответы про пульт и стиральную машину. ¦ Juda umumiy so'rov — javoblar pult va kir yuvish mashinasi haqida. ¦ Too vague — results about TV remotes and washing machines." },
        { code: "bootstrap 5 modal\nbutton doesn't open", line: 1, html: g('bootstrap 5 modal button doesn’t open', [['Modal · Bootstrap v5.3', 'getbootstrap.com', true], ['Modal not opening — forum', '…', true], ['Bootstrap 3 modal', 'old version', false]]), say: "Добавили технологию и версию — ответы уже по делу. ¦ Texnologiya va versiyani qo'shdik — javoblar endi mavzuga oid. ¦ Add the tool and version — now the results fit." },
        { code: "\"bootstrap is not defined\"\nmodal", line: 1, html: g('"bootstrap is not defined" modal', [['Load bootstrap.bundle.js before your script', 'answer ✓', true], ['Modal · Bootstrap v5.3', 'getbootstrap.com', true], ['Same error, solved', 'forum ✓', true]]), say: "Вставили текст ошибки в кавычках — точное попадание! ¦ Xato matnini qo'shtirnoqda qo'ydik — aniq zarba! ¦ Paste the error text in quotes — bullseye!" },
      ],
      takeaway: "Технология + версия + текст ошибки в кавычках. ¦ Texnologiya + versiya + qo'shtirnoqdagi xato matni. ¦ Tool + version + the error text in quotes.",
      notes: { min: 5 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Как спросить AI ¦ AI'dan qanday so'rash kerak ¦ How to ask AI",
      chat: "какой вопрос получит лучший ответ? ¦ qaysi savol yaxshiroq javob oladi? ¦ which question gets the better answer?",
      left: { icon: '😕', label: "Плохо ¦ Yomon ¦ Bad", points: ["«почини код» ¦ «kodni tuzat» ¦ “fix my code”", "Без кода и без ошибки ¦ Kodsiz va xatosiz ¦ No code, no error", "Непонятно, что нужно ¦ Nima kerakligi tushunarsiz ¦ Unclear what's wanted"] },
      right: { icon: '😃', label: "Хорошо ¦ Yaxshi ¦ Good", points: ["Что делаю: модальное окно в Bootstrap 5 ¦ Nima qilyapman: Bootstrap 5'da modal oyna ¦ What: a Bootstrap 5 modal", "Код + текст ошибки ¦ Kod + xato matni ¦ Code + error text", "«Объясни, почему, а не только исправь» ¦ «Faqat tuzatma, nega ekanini tushuntir» ¦ “Explain why, don't just fix it”"] },
      verdict: "Контекст + код + ошибка + «объясни». И проверяйте ответ! ¦ Kontekst + kod + xato + «tushuntir». Va javobni tekshiring! ¦ Context + code + error + “explain”. Then check the answer!",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Куда смотреть? ¦ Qayerga qarash kerak? ¦ Where to look?",
      chat: "пишите: «1 — документация» ¦ yozing: «1 — hujjatlar» ¦ write: “1 — docs”",
      zones: [
        { id: 'doc', label: "Документация ¦ Hujjatlar ¦ Docs", icon: '📘' },
        { id: 'ai', label: "AI ¦ AI ¦ AI", icon: '🤖' },
        { id: 'p', label: "Спросить человека ¦ Odamdan so'rash ¦ Ask a person", icon: '🙋' },
      ],
      items: [
        { text: "Какие классы есть у кнопок Bootstrap ¦ Bootstrap tugmalarida qanday klasslar bor ¦ Which button classes Bootstrap has", zone: 'doc' },
        { text: "Объясни простыми словами, что такое flex ¦ flex nima ekanini oddiy so'zlar bilan tushuntir ¦ Explain flex simply", zone: 'ai' },
        { text: "Бьюсь уже 30 минут, ничего не помогает ¦ 30 daqiqadan beri urinyapman, hech narsa yordam bermayapti ¦ Stuck for 30 minutes, nothing helps", zone: 'p' },
        { text: "Точный список атрибутов тега <img> ¦ <img> tegining aniq atributlar ro'yxati ¦ The exact attributes of <img>", zone: 'doc' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Хорошие программисты гуглят каждый день ¦ Yaxshi dasturchilar har kuni Google'dan qidiradi ¦ Good programmers google every day", truth: true, explain: "Это нормальная часть работы. ¦ Bu ishning odatiy qismi. ¦ It's a normal part of the job." },
        { text: "Ответ AI можно не проверять ¦ AI javobini tekshirmasa ham bo'ladi ¦ You needn't check AI's answer", truth: false, explain: "AI может ошибаться и выдумывать. ¦ AI xato qilishi va to'qishi mumkin. ¦ AI can be wrong or invent things." },
        { text: "Текст ошибки — подсказка, а не наказание ¦ Xato matni — jazo emas, ishora ¦ An error message is a hint, not a punishment", truth: true, explain: "Там часто написано, что и где сломалось. ¦ Unda ko'pincha nima va qayerda buzilgani yozilgan. ¦ It often says what broke and where." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: детектив багов ¦ Missiya: xatolar detektivi ¦ Mission: bug detective",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Баг найден и исправлен! ¦ Xato topildi va tuzatildi! ¦ Bug found and fixed!",
      items: [
        { title: "Первое, что делаем при ошибке ¦ Xato bo'lganda birinchi qiladigan ish ¦ First thing to do with an error", choices: ["Прочитать текст ошибки ¦ Xato matnini o'qish ¦ Read the error text", "Удалить весь код ¦ Butun kodni o'chirish ¦ Delete all the code"], correct: 0, explain: "Там часто уже подсказка. ¦ Unda ko'pincha allaqachon ishora bor. ¦ It often holds the hint." },
        { title: "Лучший запрос ¦ Eng yaxshi so'rov ¦ The best search", choices: ["\"bootstrap is not defined\" modal", "не работает ¦ ishlamayapti ¦ not working"], correct: 0, explain: "Точный текст ошибки в кавычках. ¦ Qo'shtirnoqdagi aniq xato matni. ¦ The exact error in quotes." },
        { title: "15 минут ничего не помогает ¦ 15 daqiqa hech narsa yordam bermayapti ¦ Nothing helps after 15 minutes", choices: ["Спросить учителя ¦ O'qituvchidan so'rash ¦ Ask a teacher", "Сидеть до ночи ¦ Kechgacha o'tirish ¦ Sit up all night"], correct: 0, explain: "Просить помощь — нормально. ¦ Yordam so'rash — normal. ¦ Asking for help is normal." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: как найти решение ¦ Xulosa: yechimni qanday topish ¦ Summary: finding a solution",
      chat: "какой совет пригодится вам больше всего? ¦ qaysi maslahat sizga ko'proq kerak bo'ladi? ¦ which tip will help you most?",
      answer: "Профи ищут ответы, а не помнят всё. Путь такой: прочитать текст ошибки → поискать в Google (технология, версия и текст ошибки в кавычках) → свериться с документацией → попросить AI объяснить, дав контекст, код и ошибку, и проверить его ответ. Если 15 минут ничего не помогает — спросить человека. ¦ Professionallar hammasini eslamaydi, javob qidiradi. Yo'l shunday: xato matnini o'qish → Google'dan qidirish (texnologiya, versiya va qo'shtirnoqdagi xato matni) → hujjatlar bilan solishtirish → AI'ga kontekst, kod va xatoni berib, tushuntirishni so'rash va javobini tekshirish. Agar 15 daqiqa hech narsa yordam bermasa — odamdan so'rash. ¦ Pros look answers up rather than remembering everything. The path: read the error → search Google (tool, version and the error text in quotes) → check the docs → ask AI to explain, giving context, code and the error, then check its answer. If nothing helps in 15 minutes, ask a person.",
      icon: '🧩',
      badge: "Детектив багов ¦ Xatolar detektivi ¦ Bug detective",
      badgeSub: "Bootstrap · общая 5 ¦ Bootstrap · umumiy 5 ¦ Bootstrap · general 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Найдите в документации Bootstrap компонент, которого вы не знали. ¦ Bootstrap hujjatlaridan siz bilmagan komponentni toping. ¦ Find a Bootstrap component in the docs you didn't know.",
        "Задайте AI хороший вопрос по формуле: контекст + код + ошибка. ¦ AI'ga formula bo'yicha yaxshi savol bering: kontekst + kod + xato. ¦ Ask AI a good question: context + code + error.",
      ],
      takeaway: "Модуль Bootstrap пройден! Дальше — Tilda и Git. ¦ Bootstrap moduli tugadi! Keyingisi — Tilda va Git. ¦ Bootstrap module complete! Next: Tilda and Git.",
      notes: { min: 2 },
    },
  ],
});
