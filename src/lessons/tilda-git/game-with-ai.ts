import { kit } from '@engine/kit';

const GAME_CSS = `body{margin:0;font-family:system-ui;background:#0e1330;color:#fff}
.hud{display:flex;justify-content:space-between;padding:12px 18px;font-size:20px;font-weight:700}
#field{position:relative;height:300px;margin:0 14px;border-radius:16px;background:radial-gradient(circle at 50% 30%,#23306b,#0e1330);overflow:hidden}
#star{position:absolute;font-size:44px;cursor:pointer;user-select:none;transition:transform .1s}
#star:active{transform:scale(.8)}
#msg{text-align:center;padding:10px;font-size:18px;color:#ffd76a}`;
const GAME_HTML = `<div class="hud"><span>⭐ <b id="score">0</b></span><span>⏱️ <b id="time">20</b></span></div>
<div id="field"><div id="star">⭐</div></div>
<p id="msg">Click the star!</p>`;
const V1 = `let score = 0;
const star = document.querySelector('#star');

function moveStar() {
  star.style.left = Math.random() * 85 + '%';
  star.style.top = Math.random() * 80 + '%';
}

star.addEventListener('click', () => {
  score++;
  document.querySelector('#score').textContent = score;
  moveStar();
});
moveStar();`;
const V2 = `${V1}

// Timer — idea from chat
let time = 20;
const timer = setInterval(() => {
  time--;
  document.querySelector('#time').textContent = time;
  if (time === 0) {
    clearInterval(timer);
    star.remove();
    document.querySelector('#msg').textContent = 'Game over! Score: ' + score;
  }
}, 1000);`;

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.g{position:relative;width:460px;height:330px;border-radius:20px;background:radial-gradient(circle at 50% 30%,#23306b,#0e1330);color:#fff;overflow:hidden;box-shadow:0 10px 30px #0003}
.hud{display:flex;justify-content:space-between;padding:12px 18px;font-size:22px;font-weight:800;opacity:0}
.st{position:absolute;left:200px;top:140px;font-size:56px}
.msg{position:absolute;left:0;right:0;bottom:14px;text-align:center;color:#ffd76a;font-size:20px;font-weight:800;opacity:0}
.s2 .hud{opacity:1}.s2 .st{left:320px;top:80px}
.s3 .st{left:90px;top:190px}.s3 .t{color:#ffd76a}
.s4 .st{opacity:0;scale:.3}.s4 .msg{opacity:1}`;
const game = (cls: string, score: number, time: number) => `<div class="wrap"><div class="g ${cls}"><div class="hud"><span>⭐ ${score}</span><span class="t">⏱️ ${time}</span></div><div class="st">⭐</div><div class="msg">Game over! Score: ${score}</div></div></div>`;

export default kit({
  id: 'tilda-git-t04',
  title: "Создаём игру с AI ¦ AI bilan o'yin yaratamiz ¦ Building a game with AI",
  question: "Как с помощью AI за один урок превратить идею в работающую игру? ¦ AI yordamida bir darsda g'oyani ishlaydigan o'yinga qanday aylantirish mumkin? ¦ How do you turn an idea into a working game in one lesson with AI?",
  route: ["Идея ¦ G'oya ¦ Idea", "Промпт ¦ Prompt ¦ Prompt", "Игра ¦ O'yin ¦ Game", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎮',
      kicker: "Tilda · Git · техническая тема 4 ¦ Tilda · Git · texnik mavzu 4 ¦ Tilda · Git · technical topic 4",
      title: "Вы — геймдизайнеры, AI — помощник ¦ Siz — geymdizaynerlar, AI — yordamchi ¦ You're the game designers; AI is the helper",
      chat: "в какую простую игру вы бы сыграли прямо сейчас? ¦ hozir qaysi oddiy o'yinni o'ynagan bo'lardingiz? ¦ what simple game would you play right now?",
      lead: "Сегодня чат придумывает игру и правила, а ментор вместе с AI превращает их в код. Главное — не код от AI, а ваши идеи и проверка. ¦ Bugun chat o'yin va qoidalarni o'ylab topadi, mentor esa AI bilan birga ularni kodga aylantiradi. Asosiysi — AI kodi emas, sizning g'oyalaringiz va tekshiruvingiz. ¦ Today the chat invents a game and its rules; the mentor and AI turn them into code. What matters is your ideas and your checking.",
      facts: ["Идея и правила — от вас ¦ G'oya va qoidalar — sizdan ¦ Idea and rules: from you", "Черновик кода — от AI ¦ Kod qoralamasi — AI'dan ¦ Draft code: from AI", "Проверка — снова вы ¦ Tekshiruv — yana siz ¦ Checking: you again"],
      takeaway: "AI ускоряет работу, но решает человек. ¦ AI ishni tezlashtiradi, lekin odam hal qiladi. ¦ AI speeds things up, but people decide.",
      notes: { say: ["Используйте AI-ассистент, разрешённый на вашей платформе. Не вставляйте в промпты личные данные учеников."], min: 3 },
    },
    {
      type: 'poll',
      stage: 0,
      title: "Какую игру делаем? ¦ Qaysi o'yinni yasaymiz? ¦ Which game do we build?",
      chat: "голосуйте 1–4 ¦ 1–4 ovoz bering ¦ vote 1–4",
      options: [
        { label: "Поймай звезду ⭐ ¦ Yulduzni tut ⭐ ¦ Catch the star ⭐", detail: "Кликаем по прыгающей звезде ¦ Sakrayotgan yulduzga bosamiz ¦ Click the jumping star" },
        { label: "Угадай число 🔢 ¦ Sonni top 🔢 ¦ Guess the number 🔢", detail: "Компьютер загадал 1–100 ¦ Kompyuter 1–100 o'yladi ¦ The computer picks 1–100" },
        { label: "Камень-ножницы-бумага ✂️ ¦ Tosh-qaychi-qog'oz ✂️ ¦ Rock-paper-scissors ✂️" },
        { label: "Викторина ❓ ¦ Viktorina ❓ ¦ Quiz ❓" },
      ],
      result: "Любую можно сделать за урок. Ниже — «Поймай звезду», но схема подойдёт для любой. ¦ Istalganini bir darsda qilish mumkin. Quyida — «Yulduzni tut», lekin sxema har biriga mos. ¦ Any of these fits one lesson. Below is “Catch the star”, but the method works for all.",
      notes: { say: ["Если чат выбрал другую игру — делайте её в AI вживую, а слайды со звездой используйте как пример."], min: 2 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Круг работы с AI ¦ AI bilan ishlash aylanasi ¦ The AI work loop",
      chat: "какой шаг самый важный? ¦ qaysi qadam eng muhim? ¦ which step matters most?",
      actors: [
        { id: 'i', icon: '💡', label: "Идея и правила ¦ G'oya va qoidalar ¦ Idea & rules" },
        { id: 'p', icon: '✍️', label: "Промпт ¦ Prompt ¦ Prompt" },
        { id: 'ai', icon: '🤖', label: "Код от AI ¦ AI kodi ¦ AI's code" },
        { id: 't', icon: '🕹️', label: "Играем и проверяем ¦ O'ynaymiz va tekshiramiz ¦ Play & check" },
        { id: 'n', text: "+ одно улучшение ¦ + bitta yaxshilash ¦ + one improvement" },
      ],
      steps: [
        { say: "Сначала — идея и чёткие правила: «+1 очко за клик, 20 секунд». ¦ Avval — g'oya va aniq qoidalar: «bosish uchun +1 ochko, 20 soniya». ¦ First an idea and clear rules: “+1 per click, 20 seconds”.", at: { i: [50, 14] }, pulse: ['i'] },
        { say: "Из правил пишем промпт. ¦ Qoidalardan prompt yozamiz. ¦ Turn the rules into a prompt.", at: { p: [84, 50] }, lines: [['i', 'p']] },
        { say: "AI присылает черновик кода. ¦ AI kod qoralamasini yuboradi. ¦ AI sends a draft of the code.", at: { ai: [50, 84] }, lines: [['i', 'p'], ['p', 'ai']] },
        { say: "Запускаем и играем: всё ли по правилам? ¦ Ishga tushiramiz va o'ynaymiz: hammasi qoidaga mosmi? ¦ Run it and play: does it follow the rules?", at: { t: [16, 50] }, lines: [['i', 'p'], ['p', 'ai'], ['ai', 't']], pulse: ['t'] },
        { say: "Просим ОДНО улучшение — и круг повторяется. ¦ BITTA yaxshilash so'raymiz — va aylana takrorlanadi. ¦ Ask for ONE improvement and go round again.", at: { n: [50, 50] }, lines: [['i', 'p'], ['p', 'ai'], ['ai', 't'], ['t', 'i']], pulse: ['n'] },
      ],
      takeaway: "Маленькие шаги: одна просьба → проверка → следующая. ¦ Kichik qadamlar: bitta iltimos → tekshiruv → keyingisi. ¦ Small steps: one request → check → the next.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Каждая строка промпта — новая часть игры ¦ Promptning har bir qatori — o'yinning yangi qismi ¦ Each prompt line adds to the game",
      chat: "какое правило добавим? ¦ qaysi qoidani qo'shamiz? ¦ which rule shall we add?",
      lang: 'text',
      css: PCSS,
      steps: [
        { code: 'Browser game "Catch the star".\nOne HTML file, plain JS.', line: 1, html: game('', 0, 20), say: "Что и на чём: игра в одном HTML-файле. Пока просто звезда. ¦ Nima va nimada: bitta HTML fayldagi o'yin. Hozircha shunchaki yulduz. ¦ What and how: a game in one HTML file. Just a star so far." },
        { code: 'Browser game "Catch the star".\nOne HTML file, plain JS.\n+1 point per click, score on top.', line: 3, html: game('s2', 3, 20), say: "Правило очков — появился счёт, звезда прыгает. ¦ Ochko qoidasi — hisob paydo bo'ldi, yulduz sakraydi. ¦ A scoring rule: a score appears and the star jumps." },
        { code: '…\n20-second timer.', line: 2, html: game('s2 s3', 7, 12), say: "Таймер на 20 секунд — время убегает! ¦ 20 soniyalik taymer — vaqt qochmoqda! ¦ A 20-second timer — time is running!" },
        { code: '…\nWhen time is 0: show\n"Game over! Score: N".', line: 2, html: game('s2 s3 s4', 12, 0), say: "Конец игры с итоговым счётом. Чем точнее промпт — тем меньше переделок. ¦ Yakuniy hisob bilan o'yin oxiri. Prompt qancha aniq bo'lsa — shuncha kam qayta ishlash. ¦ A game-over screen with the score. The clearer the prompt, the fewer redos." },
      ],
      takeaway: "Промпт = что + на чём + правила + как выглядит. ¦ Prompt = nima + nimada + qoidalar + qanday ko'rinadi. ¦ Prompt = what + with what + rules + how it looks.",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 2,
      title: "Играем! ¦ O'ynaymiz! ¦ Let's play!",
      chat: "сколько очков набрали? пишите рекорд ¦ necha ochko to'pladingiz? rekordni yozing ¦ how many points? post your record",
      task: "✍️ Кликайте по звезде. Попробуйте поменять 20 на 10 ¦ ✍️ Yulduzga bosing. 20 ni 10 ga o'zgartirib ko'ring ¦ ✍️ Click the star. Try changing 20 to 10",
      steps: [
        { label: "Версия 1 ¦ 1-versiya ¦ Version 1", html: GAME_HTML, css: GAME_CSS, js: V1 },
        { label: "Версия 2: таймер ¦ 2-versiya: taymer ¦ Version 2: timer", html: GAME_HTML, css: GAME_CSS, js: V2 },
      ],
      takeaway: "Вторая версия — та же игра плюс одно улучшение. ¦ Ikkinchi versiya — o'sha o'yin va bitta yaxshilash. ¦ Version 2 is the same game plus one improvement.",
      notes: { min: 6 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Код от AI всегда работает с первого раза ¦ AI kodi doim birinchi martadan ishlaydi ¦ AI code always works first time", truth: false, explain: "Запускаем и проверяем каждое правило. ¦ Ishga tushirib, har bir qoidani tekshiramiz. ¦ Run it and check every rule." },
        { text: "Лучше просить по одному улучшению ¦ Bittadan yaxshilash so'ragan ma'qul ¦ Ask for one improvement at a time", truth: true, explain: "Так легко понять, что сломалось. ¦ Shunda nima buzilganini tushunish oson. ¦ Then it's easy to see what broke." },
        { text: "В промпт можно вставлять личные данные одноклассников ¦ Promptga sinfdoshlarning shaxsiy ma'lumotlarini qo'yish mumkin ¦ It's fine to put classmates' personal data in prompts", truth: false, explain: "Личные данные в промпты не вставляем. ¦ Shaxsiy ma'lumotlarni promptga qo'ymaymiz. ¦ Never put personal data in prompts." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: своя игра ¦ Missiya: o'z o'yining ¦ Mission: your own game",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Игра работает и честно проверена! ¦ O'yin ishlaydi va halol tekshirilgan! ¦ The game works and is properly tested!",
      items: [
        { title: "Какое правило лучше? ¦ Qaysi qoida yaxshiroq? ¦ Which rule is better?", choices: ["«20 секунд» ¦ «20 soniya» ¦ “20 seconds”", "«недолго» ¦ «uzoq emas» ¦ “not too long”"], correct: 0, explain: "Правило должно быть проверяемым. ¦ Qoida tekshirib bo'ladigan bo'lishi kerak. ¦ Rules must be testable." },
        { title: "AI прислал код ¦ AI kod yubordi ¦ AI sent the code", choices: ["Запустить и проверить правила ¦ Ishga tushirib, qoidalarni tekshirish ¦ Run it and check the rules", "Сразу сдать ¦ Darhol topshirish ¦ Hand it in right away"], correct: 0, explain: "Проверка — ваша работа. ¦ Tekshiruv — sizning ishingiz. ¦ Checking is your job." },
        { title: "Хотим уровни и музыку ¦ Bosqichlar va musiqa xohlaymiz ¦ We want levels and music", choices: ["Добавить по одному ¦ Bittadan qo'shish ¦ Add them one at a time", "Попросить всё сразу ¦ Hammasini birdan so'rash ¦ Ask for everything at once"], correct: 0, explain: "Маленькие шаги — меньше поломок. ¦ Kichik qadamlar — kamroq buzilish. ¦ Small steps, fewer breaks." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: игра с AI ¦ Xulosa: AI bilan o'yin ¦ Summary: a game with AI",
      chat: "какую игру сделаете дома? ¦ uyda qanday o'yin yasaysiz? ¦ what game will you make at home?",
      answer: "Игру с AI делают по кругу: идея и чёткие правила → промпт (что, на чём, правила, как выглядит) → черновик кода от AI → запуск и проверка → одно улучшение за раз. AI ускоряет работу, но идеи, проверку и решения делает человек. Личные данные в промпты не вставляем. ¦ AI bilan o'yin aylana bo'yicha yasaladi: g'oya va aniq qoidalar → prompt (nima, nimada, qoidalar, qanday ko'rinadi) → AI'dan kod qoralamasi → ishga tushirish va tekshirish → bir martada bitta yaxshilash. AI ishni tezlashtiradi, lekin g'oyalar, tekshiruv va qarorlarni odam qiladi. Shaxsiy ma'lumotlarni promptga qo'ymaymiz. ¦ A game with AI is made in a loop: an idea and clear rules → a prompt (what, with what, rules, looks) → AI's draft code → run and check → one improvement at a time. AI speeds things up, but people make the ideas, checks and decisions. Never put personal data in prompts.",
      icon: '🎮',
      badge: "Геймдизайнер ¦ Geymdizayner ¦ Game designer",
      badgeSub: "Tilda · Git · техническая 4 ¦ Tilda · Git · texnik 4 ¦ Tilda · Git · technical 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте в игру одно своё правило через AI. ¦ AI orqali o'yinga o'zingizning bitta qoidangizni qo'shing. ¦ Add one rule of your own to the game with AI.",
        "Дайте сыграть другу и запишите, что сломалось. ¦ Do'stingizga o'ynab ko'rishga bering va nima buzilganini yozib oling. ¦ Let a friend play and note what broke.",
      ],
      takeaway: "Дальше: Git и GitHub — как хранить код. ¦ Keyingisi: Git va GitHub — kodni qanday saqlash. ¦ Next: Git and GitHub — how to store code.",
      notes: { min: 2 },
    },
  ],
});
