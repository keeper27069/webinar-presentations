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

export default kit({
  id: 'js-g04',
  title: "Кто такие тестировщики ¦ Testerlar kimlar ¦ Who testers are",
  question: "Почему «у меня работает» — ещё не значит, что программа готова? ¦ Nega «menda ishlayapti» — dastur tayyor degani emas? ¦ Why doesn't “it works on my machine” mean the program is ready?",
  route: ["Загадка ¦ Topishmoq ¦ Puzzle", "Виды тестов ¦ Test turlari ¦ Kinds of tests", "Тестируем код ¦ Kodni test qilamiz ¦ Testing code", "Баг-репорт ¦ Bag-hisobot ¦ Bug report", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🧪',
      kicker: "JavaScript · общая тема 4 ¦ JavaScript · umumiy mavzu 4 ¦ JavaScript · general topic 4",
      title: "Профессия: ломать программы ¦ Kasb: dasturlarni buzish ¦ The job: breaking programs",
      chat: "какой самый странный баг вы встречали в приложении? ¦ ilovada duch kelgan eng g'alati bug qanday? ¦ what's the weirdest app bug you've seen?",
      lead: "Тестировщик специально ищет, где программа ошибается: вводит странные данные, нажимает кнопки не по порядку, проверяет на разных телефонах. Всё, чтобы баг нашёл он, а не пользователь. ¦ Tester dastur qayerda xato qilishini ataylab qidiradi: g'alati ma'lumotlar kiritadi, tugmalarni tartibsiz bosadi, turli telefonlarda tekshiradi. Hammasi — bugni foydalanuvchi emas, u topishi uchun. ¦ A tester deliberately hunts for where a program fails: odd inputs, buttons out of order, different phones. All so they find the bug, not the user.",
      facts: ["Думает как пользователь ¦ Foydalanuvchi kabi o'ylaydi ¦ Thinks like a user", "И как «вредный» пользователь ¦ Va «injiq» foydalanuvchi kabi ¦ And like a mischievous one", "Описывает баг так, чтобы его легко починить ¦ Bugni oson tuzatiladigan qilib tasvirlaydi ¦ Reports bugs so they're easy to fix"],
      takeaway: "Тестирование — это не недоверие к программисту, а забота о пользователях. ¦ Testlash — dasturchiga ishonmaslik emas, foydalanuvchilar haqida g'amxo'rlik. ¦ Testing isn't distrust of programmers; it's care for users.",
      notes: { min: 3 },
    },
    {
      type: 'poll',
      stage: 0,
      title: "Когда баг дешевле всего починить? ¦ Bugni qachon tuzatish eng arzon? ¦ When is a bug cheapest to fix?",
      chat: "голосуйте 1–3 ¦ 1–3 bilan ovoz bering ¦ vote 1–3",
      question: "Ошибка в расчёте цены. Когда её дешевле всего исправить? ¦ Narx hisobida xato. Uni qachon tuzatish eng arzon? ¦ A pricing bug. When is it cheapest to fix?",
      options: [
        { label: "Когда программист пишет код ¦ Dasturchi kod yozayotganda ¦ While the programmer writes the code", detail: "Верно ✔ ¦ To'g'ri ✔ ¦ Correct ✔" },
        { label: "Когда тестировщик проверяет ¦ Tester tekshirayotganda ¦ When a tester checks" },
        { label: "Когда пользователи уже платят ¦ Foydalanuvchilar allaqachon to'layotganda ¦ When users are already paying" },
      ],
      correct: 0,
      result: "Чем позже найден баг, тем дороже: после релиза это жалобы, возвраты денег и срочные исправления. Поэтому проверяют рано и часто. ¦ Bug qanchalik kech topilsa, shunchalik qimmat: relizdan keyin bu shikoyatlar, pul qaytarish va shoshilinch tuzatishlar. Shuning uchun erta va tez-tez tekshiriladi. ¦ The later a bug is found, the costlier: after release it means complaints, refunds and urgent fixes. So test early and often.",
      takeaway: "Лучший тестировщик своего кода — вы сами, сразу после написания. ¦ O'z kodingizning eng yaxshi testeri — o'zingiz, yozgandan so'ng darhol. ¦ Your code's best first tester is you, right after writing it.",
      notes: { say: ["Голосование."], min: 3 },
    },
    {
      type: 'cards',
      stage: 1,
      title: "Какие бывают проверки ¦ Qanday tekshiruvlar bo'ladi ¦ Kinds of testing",
      chat: "какой вид тестирования кажется самым интересным? ¦ qaysi test turi eng qiziq tuyuladi? ¦ which kind of testing sounds most fun?",
      cards: [
        { icon: '🖱️', front: "Ручное ¦ Qo'lda ¦ Manual", back: "Человек кликает и проверяет, как пользователь. ¦ Inson foydalanuvchi kabi bosib tekshiradi. ¦ A person clicks through like a user." },
        { icon: '🤖', front: "Автотесты ¦ Avtotestlar ¦ Automated", back: "Код проверяет код: тысячи проверок за секунды. ¦ Kod kodni tekshiradi: soniyalarda minglab tekshiruvlar. ¦ Code tests code: thousands of checks in seconds." },
        { icon: '📱', front: "На устройствах ¦ Qurilmalarda ¦ On devices", back: "Разные телефоны, браузеры, размеры экрана. ¦ Turli telefonlar, brauzerlar, ekran o'lchamlari. ¦ Different phones, browsers, screen sizes." },
        { icon: '🏋️', front: "Нагрузочное ¦ Yuklama ¦ Load", back: "Что будет, если зайдут 100 000 человек сразу? ¦ Birdaniga 100 000 kishi kirsa nima bo'ladi? ¦ What if 100,000 people arrive at once?" },
        { icon: '♿', front: "Доступность ¦ Qulaylik ¦ Accessibility", back: "Можно ли пользоваться с клавиатуры или экранным диктором? ¦ Klaviatura yoki ekran o'quvchisi bilan foydalanish mumkinmi? ¦ Usable by keyboard or a screen reader?" },
        { icon: '🔁', front: "Регрессия ¦ Regressiya ¦ Regression", back: "Новая функция не сломала старые? ¦ Yangi funksiya eskilarini buzmadimi? ¦ Did a new feature break old ones?" },
      ],
      takeaway: "Одного «вроде работает» мало — проверяют с разных сторон. ¦ Bitta «ishlayotganga o'xshaydi» kam — turli tomonlardan tekshiriladi. ¦ “Seems to work” isn't enough; test from many angles.",
      notes: { say: ["Открывайте по выбору чата."], min: 4 },
    },
    {
      type: 'sort',
      stage: 1,
      title: "Какой это тест-кейс? ¦ Bu qanday test-keys? ¦ Which kind of test case?",
      chat: "пишите: «1 — граница» ¦ yozing: «1 — chegara» ¦ write: “1 — edge”",
      zones: [
        { id: 'normal', label: "Обычный ¦ Oddiy ¦ Normal", icon: '🙂' },
        { id: 'edge', label: "Граница ¦ Chegara ¦ Edge", icon: '📏' },
        { id: 'wrong', label: "Неверный ввод ¦ Noto'g'ri kiritish ¦ Wrong input", icon: '🙃' },
      ],
      items: [
        { text: "Возраст 8 для детского билета ¦ Bolalar chiptasi uchun 8 yosh ¦ Age 8 for a child ticket", zone: 'normal' },
        { text: "Возраст ровно 12 ¦ Aynan 12 yosh ¦ Age exactly 12", zone: 'edge', why: "Ровно на границе правила «до 12». ¦ «12 gacha» qoidasining aynan chegarasida. ¦ Right on the “under 12” boundary." },
        { text: "Возраст −5 ¦ −5 yosh ¦ Age −5", zone: 'wrong' },
        { text: "Пустое поле ¦ Bo'sh maydon ¦ An empty field", zone: 'wrong' },
        { text: "Пароль ровно из 8 символов при минимуме 8 ¦ Minimum 8 bo'lganda aynan 8 belgili parol ¦ An 8-char password when the minimum is 8", zone: 'edge' },
      ],
      takeaway: "Баги любят прятаться на границах и в странном вводе. ¦ Buglar chegaralarda va g'alati kiritishlarda yashirinishni yaxshi ko'radi. ¦ Bugs love to hide at edges and in odd inputs.",
      notes: { say: ["Раскладка → «Проверить»."], min: 4 },
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
      type: 'bugs',
      stage: 2,
      title: "Найдите баг на границе ¦ Chegaradagi bugni toping ¦ Find the edge bug",
      chat: "в какой строке ошибка? ¦ xato qaysi qatorda? ¦ which line has the bug?",
      snippets: [
        { title: "Скидка «от 100 000»: ¦ «100 000 dan» chegirma: ¦ Discount “from 100,000”:", lang: 'js', code: `function discount(total) {\n  if (total > 100000) {\n    return total * 0.9;\n  }\n  return total;\n}`, line: 2, explain: "«От 100 000» включает 100 000, а > его не включает. Нужен >=. ¦ «100 000 dan» 100 000 ni o'z ichiga oladi, > esa uni qo'shmaydi. >= kerak. ¦ “From 100,000” includes 100,000, but > excludes it. Use >=.", fix: `if (total >= 100000) {` },
        { title: "Последний товар не считается ¦ Oxirgi mahsulot hisoblanmaydi ¦ The last item isn't counted", lang: 'js', code: `const prices = [12000, 8000, 5000];\nlet sum = 0;\nfor (let i = 0; i < prices.length - 1; i++) {\n  sum += prices[i];\n}`, line: 3, explain: "- 1 лишний: цикл пропускает последний элемент. ¦ - 1 ortiqcha: tsikl oxirgi elementni o'tkazib yuboradi. ¦ The - 1 is extra: the loop skips the last item.", fix: `for (let i = 0; i < prices.length; i++) {` },
      ],
      takeaway: "> вместо >= и «на один меньше» — самые частые баги на границах. ¦ >= o'rniga > va «bittaga kam» — chegaralardagi eng keng tarqalgan buglar. ¦ > instead of >= and off-by-one are the most common edge bugs.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'dialog',
      stage: 3,
      title: "Тестировщик и разработчик ¦ Tester va dasturchi ¦ Tester and developer",
      chat: "чего не хватало в первом сообщении? ¦ birinchi xabarda nima yetishmadi? ¦ what was missing from the first message?",
      a: { name: "Тестировщик ¦ Tester ¦ Tester", icon: '🧪' },
      b: { name: "Разработчик ¦ Dasturchi ¦ Developer", icon: '👩‍💻' },
      messages: [
        { from: 'a', text: "Корзина не работает. ¦ Savat ishlamayapti. ¦ The cart doesn't work.", flag: "Непонятно, что и где ¦ Nima va qayerdaligi noaniq ¦ Unclear what and where" },
        { from: 'b', text: "А что именно? У меня всё работает… ¦ Aniq nima? Menda hammasi ishlayapti… ¦ What exactly? Works for me…" },
        { from: 'a', text: "Шаги: 1) добавить 2 товара, 2) удалить первый. Ожидаю: 1 товар. Вижу: 0. Телефон, Chrome. Скриншот прилагаю. ¦ Qadamlar: 1) 2 ta mahsulot qo'shish, 2) birinchisini o'chirish. Kutaman: 1 mahsulot. Ko'raman: 0. Telefon, Chrome. Skrinshot ilova qilindi. ¦ Steps: 1) add 2 items, 2) remove the first. Expected: 1 item. Actual: 0. Phone, Chrome. Screenshot attached.", good: "Шаги + ожидание + факт + где ¦ Qadamlar + kutilgan + haqiqat + qayerda ¦ Steps + expected + actual + where" },
        { from: 'b', text: "Повторил! Удаляется весь список вместо одного. Чиню. ¦ Takrorladim! Bittasi o'rniga butun ro'yxat o'chyapti. Tuzatyapman. ¦ Reproduced! It deletes the whole list instead of one. Fixing." },
      ],
      takeaway: "Хороший баг-репорт можно повторить с первого раза. ¦ Yaxshi bag-hisobotni birinchi urinishda takrorlash mumkin. ¦ A good bug report can be reproduced on the first try.",
      notes: { say: ["Читайте по ролям."], min: 4 },
    },
    {
      type: 'cheatsheet',
      stage: 3,
      title: "Шаблон баг-репорта ¦ Bag-hisobot shabloni ¦ Bug report template",
      chat: "сохраните скриншот! ¦ skrinshotni saqlang! ¦ save a screenshot!",
      sheetTitle: "Баг-репорт ¦ Bag-hisobot ¦ Bug report",
      items: [
        { icon: '🏷️', text: "Заголовок: что сломалось ¦ Sarlavha: nima buzildi ¦ Title: what broke", code: 'Cart: removing 1 item clears all' },
        { icon: '🪜', text: "Шаги повторения ¦ Takrorlash qadamlari ¦ Steps to reproduce", code: '1) add 2 items 2) remove first' },
        { icon: '🎯', text: "Ожидаемый результат ¦ Kutilgan natija ¦ Expected", code: '1 item left' },
        { icon: '💥', text: "Фактический результат ¦ Haqiqiy natija ¦ Actual", code: '0 items left' },
        { icon: '📱', text: "Где: устройство, браузер ¦ Qayerda: qurilma, brauzer ¦ Where: device, browser", code: 'Phone · Chrome' },
        { icon: '📎', text: "Скриншот или видео ¦ Skrinshot yoki video ¦ Screenshot or video", code: 'cart-bug.png' },
      ],
      notes: { say: ["Дайте время на скриншот."], min: 2 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Если тесты прошли, багов точно нет ¦ Testlar o'tgan bo'lsa, bug aniq yo'q ¦ If tests pass, there are definitely no bugs", truth: false, explain: "Тесты проверяют только то, что в них написали. ¦ Testlar faqat ularga yozilgan narsani tekshiradi. ¦ Tests only check what's written in them." },
        { text: "Тестировщику не нужно знать программирование ¦ Testerga dasturlashni bilish shart emas ¦ Testers don't need to know programming", truth: false, explain: "Для ручных тестов можно начать без кода, но автотесты — это код. ¦ Qo'lda testlar uchun koddan boshlamaslik mumkin, lekin avtotestlar — bu kod. ¦ Manual testing can start without code, but automated tests are code." },
        { text: "Проверять неверный ввод — нормальная часть тестов ¦ Noto'g'ri kiritishni tekshirish — testlarning oddiy qismi ¦ Testing bad input is a normal part of testing", truth: true, explain: "Пользователи вводят что угодно — программа должна это выдержать. ¦ Foydalanuvchilar istalgan narsani kiritadi — dastur bunga bardosh berishi kerak. ¦ Users type anything; programs must survive it." },
      ],
      takeaway: "Тесты снижают риск, но думать продолжает человек. ¦ Testlar xavfni kamaytiradi, lekin o'ylashni inson davom ettiradi. ¦ Tests reduce risk, but humans keep thinking.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'board',
      stage: 3,
      title: "Ломаем форму входа ¦ Kirish formasini buzamiz ¦ Breaking a sign-in form",
      chat: "что бы вы ввели, чтобы сломать форму входа? ¦ kirish formasini buzish uchun nima kiritardingiz? ¦ what would you type to break a sign-in form?",
      seeds: ["Пустой логин ¦ Bo'sh login ¦ An empty username", "Пароль из 500 символов ¦ 500 belgili parol ¦ A 500-character password"],
      placeholder: "Тест-кейс из чата… ¦ Chatdagi test-keys… ¦ A test case from chat…",
      footer: "Хороший тестировщик думает: «а что, если…?» ¦ Yaxshi tester o'ylaydi: «agar… bo'lsa-chi?» ¦ Good testers ask “what if…?”",
      takeaway: "Чем больше странных сценариев придумаете, тем надёжнее программа. ¦ Qanchalik ko'p g'alati ssenariylar o'ylab topsangiz, dastur shunchalik ishonchli. ¦ The more odd scenarios you invent, the sturdier the program.",
      notes: { say: ["Вписывайте идеи чата: эмодзи в логине, пробелы, двойной клик по кнопке, плохая сеть."], min: 4 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: релиз без багов ¦ Missiya: xatosiz reliz ¦ Mission: a bug-free release",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Пользователи довольны — багов нет! ¦ Foydalanuvchilar mamnun — bug yo'q! ¦ Users are happy — no bugs!",
      items: [
        { title: "Правило «до 18 лет». Граничный тест: ¦ «18 yoshgacha» qoidasi. Chegaraviy test: ¦ Rule “under 18”. Edge test:", choices: ['10', '18'], correct: 1, explain: "Ровно на границе. ¦ Aynan chegarada. ¦ Right on the edge." },
        { title: "В баг-репорте обязательно ¦ Bag-hisobotda albatta ¦ A bug report must have", choices: ["Шаги повторения ¦ Takrorlash qadamlari ¦ Steps to reproduce", "Эмодзи злости ¦ Jahl emojisi ¦ An angry emoji"], correct: 0, explain: "Без шагов баг не повторить. ¦ Qadamlarsiz bugni takrorlab bo'lmaydi. ¦ No steps, no reproduction." },
        { title: "Добавили новую кнопку ¦ Yangi tugma qo'shildi ¦ A new button was added", choices: ["Проверить и старые функции ¦ Eski funksiyalarni ham tekshirish ¦ Re-test old features too", "Проверить только кнопку ¦ Faqat tugmani tekshirish ¦ Test only the button"], correct: 0, explain: "Это регрессионное тестирование. ¦ Bu regressiya testi. ¦ That's regression testing." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: тестирование ¦ Xulosa: testlash ¦ Summary: testing",
      chat: "какой тест-кейс вы добавите для своего кода? ¦ kodingiz uchun qanday test-keys qo'shasiz? ¦ which test case will you add to your code?",
      answer: "Тестировщик ищет баги до пользователей: проверяет обычные случаи, границы (ровно 12, ровно 100 000) и неверный ввод (−5, пустое поле, текст вместо числа). Баг дешевле всего чинить сразу, поэтому свой JS-код проверяют на разных сценариях, а не по принципу «вроде работает». Хороший баг-репорт — это шаги, ожидаемый и фактический результат и где это произошло. ¦ Tester buglarni foydalanuvchilardan oldin qidiradi: oddiy holatlarni, chegaralarni (aynan 12, aynan 100 000) va noto'g'ri kiritishni (−5, bo'sh maydon, raqam o'rniga matn) tekshiradi. Bugni darhol tuzatish eng arzon, shuning uchun JS kodni «ishlayotganga o'xshaydi» tamoyili bilan emas, turli ssenariylarda tekshiradilar. Yaxshi bag-hisobot — qadamlar, kutilgan va haqiqiy natija va qayerda sodir bo'lgani. ¦ Testers hunt bugs before users: normal cases, edges (exactly 12, exactly 100,000) and bad input (−5, empty fields, text instead of numbers). Bugs are cheapest fixed right away, so JS code is tested on many scenarios, not on “seems to work”. A good bug report has steps, expected and actual results, and where it happened.",
      icon: '🧪',
      badge: "Охотник за багами ¦ Bug ovchisi ¦ Bug hunter",
      badgeSub: "JavaScript · общая 4 ¦ JavaScript · umumiy 4 ¦ JavaScript · general 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Напишите 5 вызовов check() для своей функции: 2 обычных, 2 граничных, 1 неверный ввод. ¦ O'z funksiyangiz uchun 5 ta check() chaqiruvini yozing: 2 ta oddiy, 2 ta chegaraviy, 1 ta noto'g'ri kiritish. ¦ Write 5 check() calls for your function: 2 normal, 2 edge, 1 bad input.",
        "Найдите баг в любом приложении и опишите его по шаблону баг-репорта. ¦ Istalgan ilovada bug toping va uni bag-hisobot shabloni bo'yicha tasvirlang. ¦ Find a bug in any app and describe it with the bug report template.",
      ],
      takeaway: "Следующая тема — как приложение доставки находит курьера рядом. ¦ Keyingi mavzu — yetkazib berish ilovasi yaqindagi kuryerni qanday topadi. ¦ Next: how a delivery app finds a courier near you.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
