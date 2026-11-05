import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.slide{width:520px;aspect-ratio:16/10;border-radius:18px;background:#fff;box-shadow:0 10px 30px #0002;padding:26px;display:flex;flex-direction:column;justify-content:center;gap:10px;overflow:hidden}
.wall{font-size:11px;line-height:1.3;color:#555;text-align:justify}
.h{font-size:40px;font-weight:800;line-height:1.1}
.pic{font-size:80px;text-align:center}
.sub{font-size:20px;color:#6b7183}
.acc{background:linear-gradient(135deg,#fff1ec,#fff)}.acc .h{color:#f2573a}
.btn{align-self:flex-start;padding:10px 22px;border-radius:12px;background:#16181f;color:#fff;font-weight:800;font-size:18px}`;
const wall = 'My project is a website. I made it with HTML and CSS. It has a header and a menu and a footer. It also has pictures. I worked on it for two weeks. The colours are blue and white. There is a contact form. '.repeat(4);
const slide = (inner: string, cls = '') => `<div class="wrap"><div class="slide ${cls}">${inner}</div></div>`;

export default kit({
  id: 'css-g03',
  title: "Как презентовать свой проект ¦ Loyihangizni qanday taqdim etish ¦ How to present your project",
  question: "Как за 2 минуты рассказать о проекте так, чтобы его запомнили? ¦ Loyiha haqida 2 daqiqada qanday aytib berish kerakki, uni eslab qolishsin? ¦ How do you present a project in 2 minutes so people remember it?",
  route: ["Формула ¦ Formula ¦ The formula", "Слайд ¦ Slayd ¦ The slide", "Зал ¦ Zal ¦ The audience", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎤',
      kicker: "CSS · общая тема 3 ¦ CSS · umumiy mavzu 3 ¦ CSS · general topic 3",
      title: "Сделать сайт — половина дела ¦ Sayt yasash — ishning yarmi ¦ Building the site is only half the job",
      chat: "вы когда-нибудь выступали перед людьми? страшно было? ¦ hech odamlar oldida chiqish qilganmisiz? qo'rqinchli bo'lganmi? ¦ have you ever spoken in front of people? was it scary?",
      lead: "Классный проект, который плохо показали, никто не запомнит. Есть простая формула из 4 шагов — она работает и в школе, и на работе. ¦ Yomon ko'rsatilgan zo'r loyihani hech kim eslab qolmaydi. 4 qadamdan iborat oddiy formula bor — u maktabda ham, ishda ham ishlaydi. ¦ A great project shown badly is forgotten. There's a simple 4-step formula that works at school and at work.",
      facts: ["2 минуты — идеально ¦ 2 daqiqa — ideal ¦ 2 minutes is ideal", "Меньше текста, больше показа ¦ Kamroq matn, ko'proq ko'rsatish ¦ Less text, more showing", "Репетиция убирает страх ¦ Mashq qo'rquvni yo'qotadi ¦ Practice removes fear"],
      takeaway: "Начнём с формулы. ¦ Formuladan boshlaymiz. ¦ Let's start with the formula.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Формула: 4 шага за 2 минуты ¦ Formula: 2 daqiqada 4 qadam ¦ The formula: 4 steps in 2 minutes",
      chat: "какой шаг, по-вашему, самый важный? ¦ sizningcha, qaysi qadam eng muhim? ¦ which step do you think matters most?",
      actors: [
        { id: 'a', icon: '👋', label: "Кто я ¦ Men kimman ¦ Who I am" },
        { id: 'b', icon: '😟', label: "Проблема ¦ Muammo ¦ The problem" },
        { id: 'c', icon: '💡', label: "Решение + показ ¦ Yechim + ko'rsatish ¦ Solution + demo" },
        { id: 'd', icon: '🚀', label: "Что дальше ¦ Keyin nima ¦ What's next" },
        { id: 'clock', icon: '⏱️', label: "2:00" },
      ],
      steps: [
        { say: "«Привет, я Лола, мне нравится готовить». 10 секунд. ¦ «Salom, men Lola, menga ovqat pishirish yoqadi». 10 soniya. ¦ “Hi, I'm Lola and I love cooking.” 10 seconds.", at: { a: [14, 50], clock: [50, 14, 0.8] }, pulse: ['a'] },
        { say: "Проблема: «Мама вечно ищет рецепты по разным сайтам». ¦ Muammo: «Onam doim retseptlarni turli saytlardan qidiradi». ¦ The problem: “Mum keeps hunting for recipes on different sites.”", at: { b: [38, 50] }, lines: [['a', 'b']], pulse: ['b'] },
        { say: "Решение: «Я сделала сайт с рецептами» — и сразу ПОКАЗЫВАЕМ его. ¦ Yechim: «Men retseptlar sayti yasadim» — va darhol uni KO'RSATAMIZ. ¦ The solution: “I built a recipe site” — and SHOW it right away.", at: { c: [62, 50, 1.2] }, lines: [['a', 'b'], ['b', 'c']], pulse: ['c'] },
        { say: "Что дальше: «Добавлю поиск и видео». ¦ Keyin nima: «Qidiruv va video qo'shaman». ¦ What's next: “I'll add search and videos.”", at: { d: [86, 50] }, lines: [['a', 'b'], ['b', 'c'], ['c', 'd']], pulse: ['d'] },
        { say: "Самое долгое — показ. Пусть проект говорит сам! ¦ Eng uzuni — ko'rsatish. Loyiha o'zi gapirsin! ¦ The demo takes the longest. Let the project speak!", at: { c: [62, 50, 1.5], clock: [62, 14, 0.8] }, lines: [['a', 'b'], ['b', 'c'], ['c', 'd']] },
      ],
      takeaway: "Кто я → проблема → решение и показ → что дальше. ¦ Men kimman → muammo → yechim va ko'rsatish → keyin nima. ¦ Who I am → problem → solution & demo → what's next.",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Переделываем слайд ¦ Slaydni qayta yasaymiz ¦ Redoing a slide",
      chat: "что не так с первым слайдом? ¦ birinchi slaydda nima noto'g'ri? ¦ what's wrong with the first slide?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<p>My project is a website…\n  (200 words)</p>', html: slide(`<div class="wall">${wall}</div>`), say: "Стена текста. Зал читает, а не слушает вас. ¦ Matn devori. Zal sizni tinglamaydi, o'qiydi. ¦ A wall of text. The audience reads instead of listening." },
        { code: '<h1>Recipes for Mum</h1>', html: slide('<div class="h">Recipes for Mum</div>'), say: "Оставили одну крупную мысль. ¦ Bitta yirik fikr qoldirdik. ¦ We keep one big idea." },
        { code: '<h1>Recipes for Mum</h1>\n<div>🍲</div>', line: 2, html: slide('<div class="h">Recipes for Mum</div><div class="pic">🍲</div>'), say: "Добавили картинку — понятно без слов. ¦ Rasm qo'shdik — so'zsiz tushunarli. ¦ Add a picture — clear without words." },
        { code: '<h1>Recipes for Mum</h1>\n<div>🍲</div>\n<a>Open the site →</a>', line: 3, html: slide('<div class="h">Recipes for Mum</div><div class="pic">🍲</div><span class="btn">Open the site →</span>', 'acc'), say: "Цвет и кнопка «открыть сайт» — дальше живой показ. ¦ Rang va «saytni ochish» tugmasi — keyin jonli ko'rsatish. ¦ Colour and an “open the site” button, then a live demo." },
      ],
      takeaway: "На слайде — 1 мысль, 1 картинка. Остальное говорите голосом. ¦ Slaydda — 1 fikr, 1 rasm. Qolganini ovozda ayting. ¦ One idea and one picture per slide. Say the rest out loud.",
      notes: { min: 5 },
    },
    {
      type: 'animate',
      stage: 3,
      title: "Что чувствует зал ¦ Zal nimani his qiladi ¦ How the audience feels",
      chat: "что вам скучнее всего слушать? ¦ nimani tinglash sizga eng zerikarli? ¦ what's the most boring thing to listen to?",
      actors: [
        { id: 'p1', icon: '🙂' }, { id: 'p2', icon: '🙂' }, { id: 'p3', icon: '🙂' }, { id: 'p4', icon: '🙂' },
        { id: 'sp', icon: '🧑‍💻', label: "Выступающий ¦ Ma'ruzachi ¦ Speaker" },
        { id: 'say', text: "…" },
      ],
      steps: [
        { say: "Зал готов слушать. ¦ Zal tinglashga tayyor. ¦ The audience is ready.", at: { sp: [50, 22], p1: [20, 72], p2: [40, 72], p3: [60, 72], p4: [80, 72] } },
        { say: "Выступающий читает слайд спиной к залу… ¦ Ma'ruzachi zalga orqa o'girib slaydni o'qiydi… ¦ The speaker reads the slide with their back to the room…", at: { say: [50, 46] }, set: { say: { text: "бла-бла-бла… ¦ bla-bla-bla… ¦ blah-blah-blah…" }, p1: { icon: '😴' }, p2: { icon: '📱' }, p3: { icon: '😴' }, p4: { icon: '🥱' } } },
        { say: "А теперь — живой показ: «Смотрите, нажимаю — и рецепт открылся!» ¦ Endi esa — jonli ko'rsatish: «Qarang, bosaman — va retsept ochildi!» ¦ Now a live demo: “Look, I tap and the recipe opens!”", set: { say: { text: "смотрите! 👀 ¦ qarang! 👀 ¦ look! 👀" }, p1: { icon: '😮' }, p2: { icon: '🤩' }, p3: { icon: '😮' }, p4: { icon: '👏' } }, pulse: ['p1', 'p2', 'p3', 'p4'] },
        { say: "В конце — вопросы. Значит, зал было интересно! ¦ Oxirida — savollar. Demak, zal qiziqdi! ¦ Questions at the end mean the audience cared!", set: { say: { text: "❓ ❓ ❓" }, p1: { icon: '🙋' }, p3: { icon: '🙋' } } },
      ],
      takeaway: "Показывайте, а не читайте — и зал проснётся. ¦ O'qimang, ko'rsating — va zal uyg'onadi. ¦ Show, don't read, and the audience wakes up.",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Помогает или мешает? ¦ Yordam beradimi yoki xalaqit beradimi? ¦ Helps or hurts?",
      chat: "пишите: «1 — помогает» ¦ yozing: «1 — yordam beradi» ¦ write: “1 — helps”",
      zones: [
        { id: 'ok', label: "Помогает ¦ Yordam beradi ¦ Helps", icon: '👍' },
        { id: 'no', label: "Мешает ¦ Xalaqit beradi ¦ Hurts", icon: '👎' },
      ],
      items: [
        { text: "Репетиция дома 2–3 раза ¦ Uyda 2–3 marta mashq qilish ¦ Rehearsing 2–3 times at home", zone: 'ok' },
        { text: "Читать всё со слайда ¦ Hammasini slayddan o'qish ¦ Reading everything off the slide", zone: 'no' },
        { text: "Смотреть на зал и улыбаться ¦ Zalga qarash va jilmayish ¦ Looking at the room and smiling", zone: 'ok' },
        { text: "Извиняться: «у меня плохо получилось» ¦ Uzr so'rash: «menda yomon chiqdi» ¦ Apologising: “mine came out badly”", zone: 'no', why: "Не ругайте свою работу — расскажите, что улучшите. ¦ Ishingizni yomonlamang — nimani yaxshilashingizni ayting. ¦ Don't knock your work — say what you'll improve." },
        { text: "Заранее открыть сайт во вкладке ¦ Saytni oldindan tabda ochib qo'yish ¦ Opening the site in a tab beforehand", zone: 'ok' },
      ],
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Волнуются даже профессионалы ¦ Hatto professionallar ham hayajonlanadi ¦ Even pros get nervous", truth: true, explain: "Помогает репетиция и вдох перед стартом. ¦ Mashq va boshlashdan oldin nafas olish yordam beradi. ¦ Practice and a deep breath help." },
        { text: "Чем больше слайдов, тем лучше ¦ Slaydlar qancha ko'p bo'lsa, shuncha yaxshi ¦ More slides are better", truth: false, explain: "3–5 слайдов на 2 минуты хватит. ¦ 2 daqiqaga 3–5 ta slayd yetadi. ¦ 3–5 slides are plenty for 2 minutes." },
        { text: "Если что-то сломалось — можно спокойно сказать об этом ¦ Agar biror narsa buzilsa — bu haqda xotirjam aytish mumkin ¦ If something breaks you can calmly say so", truth: true, explain: "«Упс, сейчас поправлю» — и идём дальше. ¦ «Voy, hozir tuzataman» — va davom etamiz. ¦ “Oops, let me fix that” — and carry on." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: подготовка к выступлению ¦ Missiya: chiqishga tayyorgarlik ¦ Mission: getting ready to present",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Ваш проект запомнили! ¦ Loyihangizni eslab qolishdi! ¦ They remember your project!",
      items: [
        { title: "С чего начать? ¦ Nimadan boshlash kerak? ¦ How to start?", choices: ["Кто я и какая проблема ¦ Men kimman va qanday muammo ¦ Who I am and what problem", "С кода сайта ¦ Sayt kodidan ¦ With the site's code"], correct: 0, explain: "Сначала — зачем, потом — как. ¦ Avval — nima uchun, keyin — qanday. ¦ Why first, then how." },
        { title: "Что должно быть на слайде? ¦ Slaydda nima bo'lishi kerak? ¦ What goes on a slide?", choices: ["1 мысль и 1 картинка ¦ 1 fikr va 1 rasm ¦ 1 idea and 1 picture", "Весь текст выступления ¦ Chiqishning butun matni ¦ The whole speech"], correct: 0, explain: "Слайд помогает, а не заменяет вас. ¦ Slayd yordam beradi, sizni almashtirmaydi. ¦ The slide helps; it doesn't replace you." },
        { title: "Что занимает больше всего времени? ¦ Eng ko'p vaqtni nima oladi? ¦ What takes the most time?", choices: ["Живой показ ¦ Jonli ko'rsatish ¦ The live demo", "Приветствие ¦ Salomlashish ¦ The greeting"], correct: 0, explain: "Пусть проект говорит сам. ¦ Loyiha o'zi gapirsin. ¦ Let the project speak." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: презентация проекта ¦ Xulosa: loyiha taqdimoti ¦ Summary: presenting a project",
      chat: "расскажите о своём проекте одной фразой! ¦ loyihangiz haqida bitta gap bilan aytib bering! ¦ describe your project in one sentence!",
      answer: "Хорошая презентация укладывается в 2 минуты и идёт по формуле: кто я → какая проблема → моё решение с живым показом → что сделаю дальше. На слайде — одна мысль и одна картинка, остальное говорите голосом и смотрите на зал. Перед выступлением порепетируйте 2–3 раза и заранее откройте сайт. ¦ Yaxshi taqdimot 2 daqiqaga sig'adi va formula bo'yicha boradi: men kimman → qanday muammo → jonli ko'rsatish bilan yechimim → keyin nima qilaman. Slaydda — bitta fikr va bitta rasm, qolganini ovozda ayting va zalga qarang. Chiqishdan oldin 2–3 marta mashq qiling va saytni oldindan ochib qo'ying. ¦ A good presentation fits in 2 minutes and follows the formula: who I am → the problem → my solution with a live demo → what's next. One idea and one picture per slide; say the rest and look at the room. Rehearse 2–3 times and open the site in advance.",
      icon: '🎤',
      badge: "Уверенный спикер ¦ Ishonchli ma'ruzachi ¦ Confident speaker",
      badgeSub: "CSS · общая 3 ¦ CSS · umumiy 3 ¦ CSS · general 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Расскажите о своём сайте родным по формуле из 4 шагов. ¦ Saytingiz haqida yaqinlaringizga 4 qadamli formula bo'yicha aytib bering. ¦ Tell your family about your site using the 4-step formula.",
        "Сделайте 3 слайда: проблема, решение, что дальше. ¦ 3 ta slayd yasang: muammo, yechim, keyin nima. ¦ Make 3 slides: problem, solution, what's next.",
      ],
      takeaway: "Дальше: как сделать сайт по дизайну из Figma. ¦ Keyingisi: Figma'dagi dizayn bo'yicha qanday sayt yasash. ¦ Next: building a site from a Figma design.",
      notes: { min: 2 },
    },
  ],
});
