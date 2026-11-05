import { kit } from '@engine/kit';

const V1 = `// Cinema ticket: under 12 — half price
function ticketPrice(age) {
  if (age < 12) return 25000;
  return 50000;
}`;
const TESTS = `
function check(name, got, expected) {
  console.log((got === expected ? '✅ ' : '❌ ') + name + ' → ' + got);
}

check('age 8', ticketPrice(8), 25000);
check('age 30', ticketPrice(30), 50000);
check('age 12 (edge)', ticketPrice(12), 50000);
check('age -5 (wrong)', ticketPrice(-5), 'error');
check('age "ten" (wrong)', ticketPrice('ten'), 'error');`;
const V2 = `// Cinema ticket: under 12 — half price
function ticketPrice(age) {
  if (typeof age !== 'number' || age < 0 || age > 120) return 'error';
  if (age < 12) return 25000;
  return 50000;
}`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.tests{width:480px;display:grid;gap:8px}
.t{display:grid;grid-template-columns:1fr 100px 40px;align-items:center;padding:10px 16px;border-radius:12px;background:#fff;box-shadow:0 4px 14px #0001;font:700 18px JetBrains Mono,monospace}
.t i{font-style:normal;color:#6b7183;text-align:right}.t b{text-align:right}
.ok{background:#e8faf7}.bad{background:#fff1f1;color:#c62828}.wait{opacity:.4}`;
const ROWS: [string, string, string][] = [['age 8', '25000', '25000'], ['age 30', '50000', '50000'], ['age 12 (edge)', '50000', '50000'], ['age -5', '25000', 'error'], ['age "ten"', '50000', 'error']];
const tests = (n: number, fixed = false) => `<div class="wrap"><div class="tests">${ROWS.map(([name, bug, good], i) => {
  const got = fixed ? good : bug;
  const st = i >= n ? 'wait' : got === good ? 'ok' : 'bad';
  return `<div class="t ${st}"><span>${name}</span><i>${i >= n ? '…' : got}</i><b>${st === 'ok' ? '✅' : st === 'bad' ? '❌' : '⏳'}</b></div>`;
}).join('')}</div></div>`;

export default kit({
  id: 'js-g04',
  title: "Кто такие тестировщики ¦ Testerlar kim ¦ Who testers are",
  question: "Как проверяют приложение перед выпуском, чтобы оно не сломалось у миллионов людей? ¦ Ilova millionlab odamlarda buzilmasligi uchun chiqarishdan oldin qanday tekshiriladi? ¦ How is an app checked before release so it doesn't break for millions?",
  route: ["Профессия ¦ Kasb ¦ The job", "Тесты ¦ Testlar ¦ Tests", "Практика ¦ Amaliyot ¦ Practice", "Баг-репорт ¦ Bag-hisobot ¦ Bug reports", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🧪',
      kicker: "JavaScript · общая тема 4 ¦ JavaScript · umumiy mavzu 4 ¦ JavaScript · general topic 4",
      title: "Тестировщик ломает, чтобы не сломалось ¦ Tester buzmasligi uchun buzadi ¦ Testers break things so they won't break",
      chat: "какая ошибка в приложении бесила вас больше всего? ¦ ilovadagi qaysi xato sizni eng ko'p jahlantirgan? ¦ which app bug annoyed you most?",
      lead: "Тестировщик ищет ошибки раньше пользователей: пробует обычные действия, странные данные и крайние случаи. Нашёл баг — описывает, чтобы программист быстро исправил. ¦ Tester xatolarni foydalanuvchilardan oldin qidiradi: oddiy harakatlarni, g'alati ma'lumotlarni va chegaraviy holatlarni sinab ko'radi. Xato topdi — dasturchi tez tuzatishi uchun tasvirlaydi. ¦ Testers hunt bugs before users do: normal actions, weird data and edge cases. When they find one, they describe it so a developer can fix it fast.",
      facts: ["Обычные случаи ¦ Oddiy holatlar ¦ Normal cases", "Граница: ровно 12 лет ¦ Chegara: aynan 12 yosh ¦ The edge: exactly 12", "Неправильные данные: −5, «ten» ¦ Noto'g'ri ma'lumot: −5, «ten» ¦ Wrong data: −5, “ten”"],
      takeaway: "Посмотрим, как путешествует один баг. ¦ Bitta xato qanday sayohat qilishini ko'ramiz. ¦ Let's follow one bug's journey.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Жизнь одного бага ¦ Bitta xatoning hayoti ¦ The life of a bug",
      chat: "кто должен проверить исправление? ¦ tuzatishni kim tekshirishi kerak? ¦ who should check the fix?",
      actors: [
        { id: 'qa', icon: '🕵️', label: "Тестировщик ¦ Tester ¦ Tester" },
        { id: 'bug', icon: '🐞', label: "−5 лет → 25 000 ¦ −5 yosh → 25 000 ¦ age −5 → 25,000" },
        { id: 'rep', icon: '📝', label: "Баг-репорт ¦ Bag-hisobot ¦ Bug report" },
        { id: 'dev', icon: '🧑‍💻', label: "Программист ¦ Dasturchi ¦ Developer" },
        { id: 'ok', icon: '✅', label: "Перепроверено ¦ Qayta tekshirildi ¦ Re-checked" },
        { id: 'rel', icon: '🚀', label: "Выпуск ¦ Chiqarish ¦ Release" },
      ],
      steps: [
        { say: "Тестировщик вводит возраст −5 — и приложение даёт детскую цену. Баг! ¦ Tester −5 yoshni kiritadi — ilova bolalar narxini beradi. Xato! ¦ The tester enters age −5 and gets the child price. A bug!", at: { qa: [10, 30, 1.2], bug: [34, 30] }, lines: [['qa', 'bug']], pulse: ['bug'] },
        { say: "Пишет баг-репорт: шаги, что ждал, что получил. ¦ Bag-hisobot yozadi: qadamlar, nima kutgani, nima olgani. ¦ They write a bug report: steps, expected, actual.", at: { rep: [58, 30] }, lines: [['qa', 'bug'], ['bug', 'rep']] },
        { say: "Программист исправляет. ¦ Dasturchi tuzatadi. ¦ The developer fixes it.", at: { dev: [84, 30] }, lines: [['qa', 'bug'], ['bug', 'rep'], ['rep', 'dev']] },
        { say: "Тестировщик проверяет снова — работает! ¦ Tester yana tekshiradi — ishlaydi! ¦ The tester checks again — it works!", at: { ok: [58, 78] }, hide: ['bug'], lines: [['rep', 'dev'], ['dev', 'ok']], pulse: ['ok'] },
        { say: "Только теперь — выпуск для всех. ¦ Faqat endi — hamma uchun chiqarish. ¦ Only now is it released to everyone.", at: { rel: [86, 78, 1.2] }, lines: [['dev', 'ok'], ['ok', 'rel']], pulse: ['rel'] },
      ],
      takeaway: "Нашёл → описал → исправили → перепроверил → выпуск. ¦ Topdi → tasvirladi → tuzatishdi → qayta tekshirdi → chiqarish. ¦ Find → report → fix → re-check → release.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Пять тестов для цены билета ¦ Chipta narxi uchun beshta test ¦ Five tests for ticket prices",
      chat: "какой тест вы бы добавили? ¦ qaysi testni qo'shgan bo'lardingiz? ¦ which test would you add?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "function ticketPrice(age) {\n  if (age < 12) return 25000;\n  return 50000;\n}", line: 2, html: tests(0), say: "Правило: до 12 лет — половина цены. ¦ Qoida: 12 yoshgacha — yarim narx. ¦ The rule: under 12 pays half." },
        { code: "check('age 8', …);\ncheck('age 30', …);\ncheck('age 12 (edge)', …);", line: 3, html: tests(3), say: "Обычные случаи и граница (ровно 12) — всё зелёное. ¦ Oddiy holatlar va chegara (aynan 12) — hammasi yashil. ¦ Normal cases and the edge (exactly 12) — all green." },
        { code: "check('age -5', …);\ncheck('age \"ten\"', …);", line: 1, html: tests(5), say: "А неправильные данные — красные: −5 и «ten» дают цену вместо ошибки. ¦ Noto'g'ri ma'lumotlar esa — qizil: −5 va «ten» xato o'rniga narx beradi. ¦ The wrong inputs are red: −5 and “ten” return a price instead of an error." },
        { code: "if (typeof age !== 'number'\n    || age < 0 || age > 120)\n  return 'error';", line: 1, html: tests(5, true), say: "Добавили проверку — все 5 тестов зелёные. ¦ Tekshiruv qo'shdik — barcha 5 ta test yashil. ¦ Add a check and all 5 tests go green." },
      ],
      takeaway: "Тестируйте: обычное, границу и «неправильное». ¦ Sinang: oddiyni, chegarani va «noto'g'ri»ni. ¦ Test the normal, the edge and the wrong.",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 2,
      console: true,
      title: "Тестируем функцию в эфире ¦ Funksiyani efirda test qilamiz ¦ Testing a function live",
      chat: "какой ещё возраст проверить? ¦ yana qanday yoshni tekshiramiz? ¦ which other age should we test?",
      task: "✍️ Добавляйте свои check(...) — найдите, где функция ошибается ¦ ✍️ O'z check(...)laringizni qo'shing — funksiya qayerda xato qilishini toping ¦ ✍️ Add your own check(...) calls — find where it fails",
      steps: [
        { label: "Версия 1 ¦ 1-versiya ¦ Version 1", js: V1 + '\n' + TESTS },
        { label: "Исправлено ¦ Tuzatildi ¦ Fixed", js: V2 + '\n' + TESTS },
      ],
      takeaway: "Версия 1 «работает» на обычных числах, но падает на неверном вводе. Тесты это показали за секунду. ¦ 1-versiya oddiy sonlarda «ishlaydi», lekin noto'g'ri kiritishda xato beradi. Testlar buni bir soniyada ko'rsatdi. ¦ Version 1 “works” for normal numbers but fails on bad input. The tests showed it in a second.",
      notes: { say: ["Цены в сумах условные.", "Спросите чат, что ещё проверить: 0, 120, 12.5."], min: 7 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Хороший баг-репорт или нет? ¦ Yaxshi bag-hisobotmi yoki yo'q? ¦ A good bug report or not?",
      chat: "пишите: «1 — хороший» ¦ yozing: «1 — yaxshi» ¦ write: “1 — good”",
      zones: [
        { id: 'ok', label: "Полезно ¦ Foydali ¦ Useful", icon: '👍' },
        { id: 'no', label: "Бесполезно ¦ Foydasiz ¦ Useless", icon: '👎' },
      ],
      items: [
        { text: "«Ничего не работает!!!» ¦ «Hech narsa ishlamayapti!!!» ¦ “Nothing works!!!”", zone: 'no' },
        { text: "«Ввёл −5 → получил 25 000, ждал ошибку» ¦ «−5 kiritdim → 25 000 oldim, xato kutgandim» ¦ “Entered −5 → got 25,000, expected an error”", zone: 'ok' },
        { text: "Скриншот и шаги по порядку ¦ Skrinshot va tartib bilan qadamlar ¦ A screenshot and ordered steps", zone: 'ok' },
        { text: "«Где-то кнопка какая-то сломалась» ¦ «Qayerdadir qandaydir tugma buzildi» ¦ “Some button somewhere broke”", zone: 'no' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: тестировщик дня ¦ Missiya: kun testeri ¦ Mission: tester of the day",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Ни один баг не дошёл до пользователей! ¦ Birorta xato foydalanuvchilarga yetib bormadi! ¦ Not a single bug reached users!",
      items: [
        { title: "Скидка до 12 лет. Какой тест «граничный»? ¦ 12 yoshgacha chegirma. Qaysi test «chegaraviy»? ¦ Discount under 12. Which test is the edge?", choices: ["Ровно 12 ¦ Aynan 12 ¦ Exactly 12", "30 лет ¦ 30 yosh ¦ Age 30"], correct: 0, explain: "Граница — где правило меняется. ¦ Chegara — qoida o'zgaradigan joy. ¦ The edge is where the rule changes." },
        { title: "Что писать в баг-репорте? ¦ Bag-hisobotga nima yozish kerak? ¦ What goes in a bug report?", choices: ["Шаги, ожидание, результат ¦ Qadamlar, kutilgan, natija ¦ Steps, expected, actual", "«Всё плохо» ¦ «Hammasi yomon» ¦ “It's all bad”"], correct: 0, explain: "Чтобы баг можно было повторить. ¦ Xatoni takrorlab bo'ladigan bo'lishi uchun. ¦ So the bug can be reproduced." },
        { title: "Программист исправил баг ¦ Dasturchi xatoni tuzatdi ¦ The developer fixed the bug", choices: ["Проверить ещё раз ¦ Yana bir marta tekshirish ¦ Check it again", "Сразу выпускать ¦ Darhol chiqarish ¦ Release right away"], correct: 0, explain: "Перепроверка — обязательна. ¦ Qayta tekshirish — majburiy. ¦ Re-checking is a must." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: тестировщики ¦ Xulosa: testerlar ¦ Summary: testers",
      chat: "найдите баг в любом приложении и опишите по формуле! ¦ istalgan ilovada xato toping va formula bo'yicha tasvirlang! ¦ find a bug in any app and describe it with the formula!",
      answer: "Тестировщик ищет ошибки раньше пользователей. Он проверяет обычные случаи, границы (ровно 12 лет) и неправильные данные (−5, «ten»). Найденный баг описывает в баг-репорте: шаги, что ожидал и что получил, — программист исправляет, а тестировщик перепроверяет. Только после этого приложение выпускают. ¦ Tester xatolarni foydalanuvchilardan oldin qidiradi. U oddiy holatlarni, chegaralarni (aynan 12 yosh) va noto'g'ri ma'lumotlarni (−5, «ten») tekshiradi. Topilgan xatoni bag-hisobotda tasvirlaydi: qadamlar, nima kutgani va nima olgani — dasturchi tuzatadi, tester esa qayta tekshiradi. Faqat shundan keyin ilova chiqariladi. ¦ Testers find bugs before users do. They check normal cases, edges (exactly 12) and wrong data (−5, “ten”). They describe each bug in a report — steps, expected, actual — the developer fixes it and the tester re-checks. Only then is the app released.",
      icon: '🧪',
      badge: "Охотник за багами ¦ Xatolar ovchisi ¦ Bug hunter",
      badgeSub: "JavaScript · общая 4 ¦ JavaScript · umumiy 4 ¦ JavaScript · general 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Придумайте 5 тестов для формы регистрации (включая странные). ¦ Ro'yxatdan o'tish formasi uchun 5 ta test o'ylab toping (g'alatilarini ham). ¦ Write 5 tests for a sign-up form, including weird ones.",
        "Напишите баг-репорт по формуле: шаги, ожидание, результат. ¦ Formula bo'yicha bag-hisobot yozing: qadamlar, kutilgan, natija. ¦ Write a bug report: steps, expected, actual.",
      ],
      takeaway: "Дальше: как приложение доставки находит курьера. ¦ Keyingisi: yetkazib berish ilovasi kuryerni qanday topadi. ¦ Next: how a delivery app finds a courier.",
      notes: { min: 2 },
    },
  ],
});
