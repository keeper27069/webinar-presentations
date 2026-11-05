import { kit } from '@engine/kit';

const PIX = (on: number[]) => {
  const cells = Array.from({ length: 64 }, (_, i) => `<i class="${on.includes(i) ? 'on' : ''}"></i>`).join('');
  return `<div class="screen">${cells}</div>`;
};
const SMILE = [18, 21, 26, 29, 41, 46, 50, 51, 52, 53];
const PIX_CSS = '.screen{display:grid;grid-template-columns:repeat(8,1fr);gap:6px;width:440px;margin:20px auto}.screen i{aspect-ratio:1;border-radius:8px;background:#e8eaf0}.screen i.on{background:#f2573a}';

export default kit({
  id: 'html-g01',
  title: "Как думает компьютер ¦ Kompyuter qanday o'ylaydi ¦ How a computer thinks",
  question: "Как из нулей и единиц получается игра в телефоне? ¦ Nol va birlardan telefondagi o'yin qanday paydo bo'ladi? ¦ How do zeros and ones become a game on your phone?",
  route: ["Загадка ¦ Topishmoq ¦ Puzzle", "0 и 1 ¦ 0 va 1 ¦ 0 and 1", "Картинка ¦ Rasm ¦ Pictures", "Программа ¦ Dastur ¦ Programs", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🤖',
      kicker: "HTML · общая тема 1 ¦ HTML · umumiy mavzu 1 ¦ HTML · general topic 1",
      title: "Очень быстрый, но очень послушный ¦ Juda tez, lekin juda itoatkor ¦ Very fast, very obedient",
      chat: "что умеет ваш телефон, чего не умеете вы? ¦ telefoningiz siz qila olmaydigan nimani qila oladi? ¦ what can your phone do that you can't?",
      lead: "Компьютер не думает как мы. Он только очень быстро выполняет команды. ¦ Kompyuter biz kabi o'ylamaydi. U faqat buyruqlarni juda tez bajaradi. ¦ A computer doesn't think like us. It just follows commands very fast.",
      facts: ["Всё внутри — числа ¦ Ichidagi hamma narsa — raqamlar ¦ Everything inside is numbers", "Картинка — тоже числа ¦ Rasm ham — raqamlar ¦ Pictures are numbers too", "Сайт — это команды ¦ Sayt — bu buyruqlar ¦ A site is commands"],
      takeaway: "Сегодня поймём, как компьютер «видит» мир. ¦ Bugun kompyuter dunyoni qanday «ko'rishini» tushunamiz. ¦ Today: how a computer “sees” the world.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Лампочка: включена или выключена ¦ Lampochka: yoniq yoki o'chiq ¦ A lamp: on or off",
      chat: "сколько разных вариантов у двух лампочек? ¦ ikkita lampochkada nechta turli variant bor? ¦ how many combos do two lamps have?",
      actors: [
        { id: 'l1', icon: '💡' },
        { id: 'l2', icon: '💡' },
        { id: 'l3', icon: '💡' },
        { id: 'n1', text: '1' },
        { id: 'n2', text: '0' },
        { id: 'n3', text: '1' },
        { id: 'res', text: "8 лампочек = 1 буква ¦ 8 lampochka = 1 harf ¦ 8 lamps = 1 letter" },
      ],
      steps: [
        { say: "Внутри компьютера — миллиарды крошечных «лампочек». ¦ Kompyuter ichida — milliardlab mitti «lampochkalar». ¦ Inside a computer are billions of tiny “lamps”.", at: { l1: [30, 45], l2: [50, 45], l3: [70, 45] } },
        { say: "Горит — это 1. ¦ Yonib turibdi — bu 1. ¦ On means 1.", at: { n1: [30, 80] }, pulse: ['l1'] },
        { say: "Не горит — это 0. ¦ Yonmayapti — bu 0. ¦ Off means 0.", set: { l2: { icon: '⚫' } }, at: { n2: [50, 80] } },
        { say: "Из нулей и единиц можно составить что угодно. ¦ Nol va birlardan istalgan narsani tuzish mumkin. ¦ Zeros and ones can build anything.", at: { n3: [70, 80] } },
        { say: "Восемь лампочек вместе — это одна буква. Так хранится текст! ¦ Sakkizta lampochka birga — bu bitta harf. Matn shunday saqlanadi! ¦ Eight lamps together make one letter. That's how text is stored!", at: { res: [50, 18, 1.2] }, pulse: ['res'] },
      ],
      takeaway: "Всё в компьютере — это 0 и 1: текст, музыка, игры. ¦ Kompyuterdagi hamma narsa — 0 va 1: matn, musiqa, o'yinlar. ¦ Everything in a computer is 0s and 1s: text, music, games.",
      notes: { say: ["Это «бит». Слово можно назвать, но главное — образ лампочки."], min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Картинка из квадратиков ¦ Kvadratchalardan rasm ¦ A picture made of squares",
      chat: "что сейчас появится? угадайте! ¦ hozir nima paydo bo'ladi? taxmin qiling! ¦ what's about to appear? guess!",
      css: PIX_CSS,
      lang: 'text',
      steps: [
        { code: '0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0', html: PIX([]), say: "Экран — это сетка из точек-пикселей. ¦ Ekran — piksel-nuqtalar to'ri. ¦ A screen is a grid of dots called pixels." },
        { code: '0 0 1 0 0 1 0 0\n0 0 1 0 0 1 0 0', html: PIX([18, 21, 26, 29]), say: "Компьютер зажигает нужные точки… ¦ Kompyuter kerakli nuqtalarni yoqadi… ¦ The computer lights the right dots…" },
        { code: '0 0 1 0 0 1 0 0\n0 0 1 0 0 1 0 0\n0 1 0 0 0 0 1 0\n0 0 1 1 1 1 0 0', html: PIX(SMILE), say: "…и получается картинка! ¦ …va rasm hosil bo'ladi! ¦ …and a picture appears!" },
      ],
      takeaway: "В телефоне миллионы таких точек — поэтому картинка чёткая. ¦ Telefonda millionlab shunday nuqtalar bor — shuning uchun rasm tiniq. ¦ A phone has millions of these dots, so pictures look sharp.",
      notes: { say: ["Попросите чат «нарисовать» нулями и единицами сердечко."], min: 4 },
    },
    {
      type: 'poll',
      stage: 2,
      title: "Из чего состоит фото в телефоне? ¦ Telefondagi foto nimadan iborat? ¦ What is a phone photo made of?",
      chat: "голосуйте 1–3 ¦ 1–3 bilan ovoz bering ¦ vote 1–3",
      options: [
        { label: "Из краски ¦ Bo'yoqdan ¦ Paint" },
        { label: "Из цветных точек-чисел ¦ Rangli nuqta-raqamlardan ¦ Coloured dots stored as numbers", detail: "Верно ✔ ¦ To'g'ri ✔ ¦ Correct ✔" },
        { label: "Из маленьких фотографий ¦ Kichik fotolardan ¦ Tiny photos" },
      ],
      correct: 1,
      result: "Каждая точка — это число, которое говорит, какого она цвета. ¦ Har bir nuqta — u qanday rangda ekanini aytadigan raqam. ¦ Each dot is a number saying what colour it is.",
      takeaway: "Увеличьте фото сильно-сильно — увидите квадратики. ¦ Fotoni juda kattalashtiring — kvadratchalarni ko'rasiz. ¦ Zoom right in on a photo and you'll see the squares.",
      notes: { say: ["Покажите сильное увеличение любой картинки."], min: 2 },
    },
    {
      type: 'animate',
      stage: 3,
      title: "Как работает приложение ¦ Ilova qanday ishlaydi ¦ How an app works",
      chat: "что делает телефон, когда вы ставите лайк? ¦ layk bosganingizda telefon nima qiladi? ¦ what does the phone do when you tap like?",
      actors: [
        { id: 'tap', icon: '👆', label: "Нажали ¦ Bosdingiz ¦ You tap" },
        { id: 'brain', icon: '⚙️', label: "Команды ¦ Buyruqlar ¦ Commands" },
        { id: 'screen', icon: '📱', label: "Экран ¦ Ekran ¦ Screen" },
        { id: 'heart', icon: '🤍' },
      ],
      steps: [
        { say: "Вы нажимаете на сердечко. ¦ Siz yurakchani bosasiz. ¦ You tap the heart.", at: { tap: [15, 55], heart: [15, 20] }, pulse: ['tap'] },
        { say: "Телефон выполняет команды: «покрась сердце, прибавь 1». ¦ Telefon buyruqlarni bajaradi: «yurakni bo'ya, 1 qo'sh». ¦ The phone runs commands: “colour the heart, add 1”.", at: { brain: [50, 55] }, lines: [['tap', 'brain']], pulse: ['brain'] },
        { say: "И показывает результат на экране. ¦ Va natijani ekranda ko'rsatadi. ¦ And shows the result on screen.", at: { screen: [85, 55], heart: [85, 20, 1.3] }, set: { heart: { icon: '❤️' } }, lines: [['tap', 'brain'], ['brain', 'screen']], pulse: ['heart'] },
      ],
      takeaway: "Любое приложение: нажали → команды → новый экран. ¦ Har qanday ilova: bosdingiz → buyruqlar → yangi ekran. ¦ Any app: tap → commands → new screen.",
      notes: { min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Это может компьютер? ¦ Buni kompyuter qila oladimi? ¦ Can a computer do this?",
      chat: "пишите: «1 — может» ¦ yozing: «1 — qila oladi» ¦ write: “1 — can”",
      zones: [
        { id: 'yes', label: "Может сам ¦ O'zi qila oladi ¦ Can do it", icon: '✅' },
        { id: 'no', label: "Нужен человек ¦ Inson kerak ¦ Needs a person", icon: '🙋' },
      ],
      items: [
        { text: "Посчитать 1000 примеров за секунду ¦ Bir soniyada 1000 ta misolni hisoblash ¦ Solve 1,000 sums in a second", zone: 'yes' },
        { text: "Придумать, что нарисовать ¦ Nima chizishni o'ylab topish ¦ Decide what to draw", zone: 'no', why: "Идею даёт человек, компьютер выполняет. ¦ G'oyani inson beradi, kompyuter bajaradi. ¦ People bring the idea; computers carry it out." },
        { text: "Показать миллион точек на экране ¦ Ekranda million nuqtani ko'rsatish ¦ Show a million dots on screen", zone: 'yes' },
        { text: "Написать команды для сайта ¦ Sayt uchun buyruqlar yozish ¦ Write the commands for a site", zone: 'no', why: "Это и есть работа программиста! ¦ Bu dasturchining ishi! ¦ That's a programmer's job!" },
      ],
      takeaway: "Компьютер — быстрые руки, человек — голова. ¦ Kompyuter — tez qo'llar, inson — bosh. ¦ The computer is fast hands; the person is the head.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'show',
      stage: 3,
      title: "Ваша первая команда ¦ Birinchi buyrug'ingiz ¦ Your first command",
      chat: "какое слово написать большими буквами? ¦ qaysi so'zni katta harflar bilan yozamiz? ¦ which word shall we write big?",
      css: 'h1{margin:0;font-size:64px;text-align:center;padding-top:40px}',
      steps: [
        { code: 'Привет! ¦ Salom! ¦ Hello!', html: '<p style="font-size:26px;text-align:center;padding-top:60px">Привет! ¦ Salom! ¦ Hello!</p>', say: "Обычный текст. ¦ Oddiy matn. ¦ Plain text." },
        { code: '<h1>Привет!</h1> ¦ <h1>Salom!</h1> ¦ <h1>Hello!</h1>', html: '<h1>Привет! 👋</h1> ¦ <h1>Salom! 👋</h1> ¦ <h1>Hello! 👋</h1>', say: "Команда h1: «сделай большой заголовок». ¦ h1 buyrug'i: «katta sarlavha qil». ¦ The h1 command: “make a big heading”." },
      ],
      takeaway: "Так выглядит HTML — язык команд для страниц. ¦ HTML shunday ko'rinadi — sahifalar uchun buyruqlar tili. ¦ That's HTML — a command language for pages.",
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: думай как компьютер ¦ Missiya: kompyuter kabi o'yla ¦ Mission: think like a computer",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Вы поняли язык компьютера! ¦ Kompyuter tilini tushundingiz! ¦ You get the computer's language!",
      items: [
        { title: "«Лампочка горит» — это… ¦ «Lampochka yonib turibdi» — bu… ¦ “The lamp is on” is…", choices: ['1', '0'], correct: 0, explain: "1 — да, 0 — нет. ¦ 1 — ha, 0 — yo'q. ¦ 1 is yes, 0 is no." },
        { title: "Экран состоит из… ¦ Ekran… dan iborat ¦ A screen is made of…", choices: ["Точек-пикселей ¦ Piksel-nuqtalardan ¦ Pixels", "Проводов ¦ Simlardan ¦ Wires"], correct: 0, explain: "Миллионы цветных точек. ¦ Millionlab rangli nuqtalar. ¦ Millions of coloured dots." },
        { title: "Кто придумывает команды? ¦ Buyruqlarni kim o'ylab topadi? ¦ Who writes the commands?", choices: ["Программист ¦ Dasturchi ¦ A programmer", "Сам компьютер ¦ Kompyuterning o'zi ¦ The computer itself"], correct: 0, explain: "Скоро это будете вы! ¦ Tez orada bu siz bo'lasiz! ¦ Soon that's you!" },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: язык компьютера ¦ Xulosa: kompyuter tili ¦ Summary: the computer's language",
      chat: "что вас удивило больше всего? ¦ sizni eng ko'p nima hayratlantirdi? ¦ what surprised you most?",
      answer: "Внутри компьютера всё — это 0 и 1, как лампочки «горит / не горит». Из них складываются буквы, цвета точек на экране и целые игры. Компьютер сам не думает: он очень быстро выполняет команды, которые пишет человек. ¦ Kompyuter ichida hamma narsa — 0 va 1, «yonadi / yonmaydi» lampochkalar kabi. Ulardan harflar, ekrandagi nuqtalar ranglari va butun o'yinlar tuziladi. Kompyuter o'zi o'ylamaydi: u inson yozgan buyruqlarni juda tez bajaradi. ¦ Inside a computer everything is 0 and 1, like lamps that are on or off. They make letters, the colours of screen dots and whole games. A computer doesn't think on its own: it runs, very fast, the commands people write.",
      icon: '🤖',
      badge: "Переводчик с компьютерного ¦ Kompyuter tili tarjimoni ¦ Computer translator",
      badgeSub: "HTML · общая 1 ¦ HTML · umumiy 1 ¦ HTML · general 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Нарисуйте на клетчатой бумаге картинку 8×8 из закрашенных клеток. ¦ Katakli qog'ozda bo'yalgan kataklardan 8×8 rasm chizing. ¦ Draw an 8×8 picture on squared paper.",
        "Запишите её нулями и единицами. ¦ Uni nol va birlar bilan yozing. ¦ Write it down as zeros and ones.",
      ],
      takeaway: "Дальше: как сайт прилетает к вам через интернет. ¦ Keyingisi: sayt sizga internet orqali qanday uchib keladi. ¦ Next: how a site flies to you over the internet.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
