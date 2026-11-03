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

export default kit({
  id: 'tilda-git-t04',
  title: "Создаём игру с AI ¦ AI bilan o'yin yaratamiz ¦ Making a game with AI",
  question: "Как с помощью AI за один урок превратить идею в работающую игру? ¦ AI yordamida bir darsda g'oyani ishlaydigan o'yinga qanday aylantirish mumkin? ¦ How can AI turn an idea into a working game in one lesson?",
  route: ["Идея ¦ G'oya ¦ The idea", "Промпт ¦ Prompt ¦ The prompt", "Игра ¦ O'yin ¦ The game", "Проверка ¦ Tekshiruv ¦ Checking", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎮',
      kicker: "Tilda · Git · техническая тема 4 ¦ Tilda · Git · texnik mavzu 4 ¦ Tilda · Git · technical topic 4",
      title: "Вы — геймдизайнеры, AI — помощник ¦ Siz — geymdizaynerlar, AI — yordamchi ¦ You design, AI assists",
      chat: "в какую простую игру вы бы сыграли прямо сейчас? ¦ hozir qanday oddiy o'yinni o'ynagan bo'lardingiz? ¦ what simple game would you play right now?",
      lead: "Сегодня чат придумывает игру и правила, а ментор вместе с AI превращает их в код. Главное — не код от AI, а ваши идеи и проверка. ¦ Bugun chat o'yin va qoidalarni o'ylab topadi, mentor esa AI bilan ularni kodga aylantiradi. Asosiysi — AI kodi emas, sizning g'oyalaringiz va tekshiruv. ¦ Today chat invents the game and rules, and the mentor turns them into code with AI. Your ideas and checking matter more than AI's code.",
      facts: [
        "Идея и правила — от вас ¦ G'oya va qoidalar — sizdan ¦ Idea and rules: from you",
        "Черновик кода — от AI ¦ Kod qoralamasi — AI'dan ¦ Draft code: from AI",
        "Проверка и правки — снова вы ¦ Tekshiruv va tuzatishlar — yana siz ¦ Testing and fixes: you again",
      ],
      takeaway: "AI ускоряет работу, но решает, что получится, человек. ¦ AI ishni tezlashtiradi, lekin nima chiqishini inson hal qiladi. ¦ AI speeds things up, but people decide what gets made.",
      notes: { say: ["Используйте AI-ассистент, который разрешён на вашей платформе. Не вставляйте в промпты личные данные учеников."], min: 3 },
    },
    {
      type: 'poll',
      stage: 0,
      title: "Какую игру делаем? ¦ Qanday o'yin qilamiz? ¦ Which game do we make?",
      chat: "голосуйте 1–4 ¦ 1–4 bilan ovoz bering ¦ vote 1–4",
      question: "Выберите игру на сегодня ¦ Bugungi o'yinni tanlang ¦ Pick today's game",
      options: [
        { label: "Поймай звезду ⭐ ¦ Yulduzni tut ⭐ ¦ Catch the star ⭐", detail: "Кликаем по прыгающей звезде ¦ Sakrab yurgan yulduzga bosamiz ¦ Click a jumping star" },
        { label: "Угадай число 🔢 ¦ Raqamni top 🔢 ¦ Guess the number 🔢", detail: "Компьютер загадал 1–100 ¦ Kompyuter 1–100 ni o'yladi ¦ The computer picks 1–100" },
        { label: "Камень-ножницы-бумага ✂️ ¦ Tosh-qaychi-qog'oz ✂️ ¦ Rock-paper-scissors ✂️" },
        { label: "Викторина ❓ ¦ Viktorina ❓ ¦ Quiz ❓" },
      ],
      result: "Каждую из них можно сделать за урок. Ниже — «Поймай звезду», но промпт подойдёт для любой. ¦ Ularning har birini bir darsda qilish mumkin. Quyida — «Yulduzni tut», lekin prompt istalganiga mos keladi. ¦ Each can be built in one lesson. Below is “Catch the star”, but the prompt works for any.",
      takeaway: "Маленькая игра, которая работает, лучше большой, которая не доделана. ¦ Ishlaydigan kichik o'yin tugallanmagan katta o'yindan yaxshiroq. ¦ A small game that works beats a big one that's unfinished.",
      notes: { say: ["Если чат выбрал другую игру — делайте её в AI вживую, а слайды со звездой используйте как пример."], min: 3 },
    },
    {
      type: 'board',
      stage: 0,
      title: "Правила нашей игры ¦ O'yinimiz qoidalari ¦ Our game's rules",
      chat: "предлагайте правило: время, очки, уровни… ¦ qoida taklif qiling: vaqt, ochkolar, darajalar… ¦ suggest a rule: time, points, levels…",
      seeds: ["За клик по звезде — +1 очко ¦ Yulduzga bosish uchun — +1 ochko ¦ +1 point per star click", "После клика звезда прыгает в новое место ¦ Bosgandan keyin yulduz yangi joyga sakraydi ¦ After a click, the star jumps somewhere new"],
      placeholder: "Правило из чата… ¦ Chatdagi qoida… ¦ A rule from chat…",
      footer: "Хорошее правило можно проверить: «20 секунд» лучше, чем «недолго». ¦ Yaxshi qoidani tekshirish mumkin: «20 soniya» «uzoq emas»dan yaxshiroq. ¦ A good rule is testable: “20 seconds” beats “not long”.",
      takeaway: "Чёткие правила = чёткий промпт = рабочий код. ¦ Aniq qoidalar = aniq prompt = ishlaydigan kod. ¦ Clear rules = a clear prompt = working code.",
      notes: { say: ["Вписывайте правила из чата, выберите 3–4 для первой версии."], min: 4 },
    },
    {
      type: 'cheatsheet',
      stage: 1,
      title: "Формула хорошего промпта ¦ Yaxshi prompt formulasi ¦ The formula for a good prompt",
      chat: "что ещё добавить в промпт? ¦ promptga yana nima qo'shish kerak? ¦ what else should go in the prompt?",
      sheetTitle: "Промпт для игры ¦ O'yin uchun prompt ¦ A game prompt",
      items: [
        { icon: '🎯', text: "Что делаем ¦ Nima qilamiz ¦ What we're making", code: "Browser game “Catch the star”" },
        { icon: '🧰', text: "На чём ¦ Nimada ¦ With what", code: "One HTML file, plain JS, no libraries" },
        { icon: '📏', text: "Правила ¦ Qoidalar ¦ Rules", code: "+1 per click, 20-second timer" },
        { icon: '🎨', text: "Как выглядит ¦ Qanday ko'rinadi ¦ How it looks", code: "Dark background, big star, score on top" },
        { icon: '📝', text: "Как ответить ¦ Qanday javob berish ¦ How to answer", code: "Short code with comments" },
      ],
      takeaway: "Чем конкретнее промпт, тем меньше переделок. ¦ Prompt qanchalik aniq bo'lsa, qayta ishlash shunchalik kam. ¦ The more specific the prompt, the fewer rewrites.",
      notes: { say: ["Соберите промпт из правил на доске и отправьте его в AI в эфире."], switch: "AI-ассистент ¦ AI-yordamchi ¦ AI assistant", min: 4 },
    },
    {
      type: 'dialog',
      stage: 1,
      title: "Разговор с AI ¦ AI bilan suhbat ¦ Talking to AI",
      chat: "что бы вы попросили у AI следующим? ¦ AI'dan keyin nima so'ragan bo'lardingiz? ¦ what would you ask AI for next?",
      a: { name: "Ментор ¦ Mentor ¦ Mentor", icon: '🧑‍💻' },
      b: { name: 'AI', icon: '🤖' },
      messages: [
        { from: 'a', text: "Сделай игру «Поймай звезду» в одном HTML-файле: +1 очко за клик, звезда прыгает. ¦ Bitta HTML faylda «Yulduzni tut» o'yinini qil: bosish uchun +1 ochko, yulduz sakraydi. ¦ Make “Catch the star” in one HTML file: +1 per click, the star jumps." },
        { from: 'b', text: "Готово! Вот код с функцией moveStar() и счётчиком score. ¦ Tayyor! Mana moveStar() funksiyasi va score hisoblagichi bilan kod. ¦ Done! Here's the code with a moveStar() function and a score counter." },
        { from: 'a', text: "Запустил — работает. Добавь таймер на 20 секунд и надпись «Игра окончена». ¦ Ishga tushirdim — ishlaydi. 20 soniyalik taymer va «O'yin tugadi» yozuvini qo'sh. ¦ Ran it — works. Add a 20-second timer and a “Game over” message.", good: "Маленькие шаги ¦ Kichik qadamlar ¦ Small steps" },
        { from: 'b', text: "Добавил setInterval. Когда time = 0, звезда исчезает. ¦ setInterval qo'shdim. time = 0 bo'lganda yulduz yo'qoladi. ¦ Added setInterval. When time hits 0, the star disappears." },
        { from: 'a', text: "Объясни, что делает clearInterval? ¦ clearInterval nima qilishini tushuntir? ¦ What does clearInterval do?", good: "Просим объяснить, а не только код ¦ Faqat kod emas, tushuntirishni so'raymiz ¦ Ask for explanations, not just code" },
      ],
      takeaway: "Работаем итерациями: запустили → проверили → попросили следующее улучшение. ¦ Iteratsiyalar bilan ishlaymiz: ishga tushirdik → tekshirdik → keyingi yaxshilashni so'radik. ¦ Work in iterations: run → check → ask for the next improvement.",
      notes: { say: ["Это пример. Ведите настоящий диалог с AI и показывайте ответы на экране."], min: 4 },
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
      takeaway: "Две итерации — и у нас настоящая игра с очками и временем. ¦ Ikki iteratsiya — va bizda ochko va vaqtli haqiqiy o'yin bor. ¦ Two iterations, and we have a real game with points and time.",
      notes: { say: ["Дайте поиграть, затем предложите чату правило для версии 3 (уровни, скорость, звук)."], min: 7 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "AI тоже ошибается ¦ AI ham xato qiladi ¦ AI makes mistakes too",
      chat: "в какой строке баг? ¦ xato qaysi qatorda? ¦ which line has the bug?",
      snippets: [
        { title: "Таймер уходит в минус ¦ Taymer minusga ketadi ¦ The timer goes negative", code: `const timer = setInterval(() => {\n  time--;\n  timeEl.textContent = time;\n  if (time === 0) {\n    star.remove();\n  }\n}, 1000);`, line: 4, explain: "Звезда пропала, но интервал не остановлен — время идёт −1, −2… Нужен clearInterval(timer). ¦ Yulduz yo'qoldi, lekin interval to'xtatilmadi — vaqt −1, −2… bo'lib ketadi. clearInterval(timer) kerak. ¦ The star is gone but the interval keeps running: −1, −2… You need clearInterval(timer).", fix: `if (time === 0) {\n  clearInterval(timer);\n  star.remove();\n}` },
        { title: "Звезда улетает за край ¦ Yulduz chetdan uchib ketadi ¦ The star flies off the edge", code: `function moveStar() {\n  star.style.left = Math.random() * 100 + '%';\n  star.style.top = Math.random() * 100 + '%';\n}`, line: 2, explain: "При 100% звезда стоит у самого края и её почти не видно. Берём меньше, например 85%. ¦ 100% da yulduz eng chetda turadi va deyarli ko'rinmaydi. Kamroq olamiz, masalan 85%. ¦ At 100% the star sits on the very edge, barely visible. Use less, e.g. 85%.", fix: `star.style.left = Math.random() * 85 + '%';\nstar.style.top = Math.random() * 80 + '%';` },
      ],
      takeaway: "Код от AI нужно запускать и проверять краевые случаи: конец времени, края поля, быстрые клики. ¦ AI kodini ishga tushirish va chegaraviy holatlarni tekshirish kerak: vaqt tugashi, maydon chetlari, tez bosishlar. ¦ Run AI code and test edge cases: time running out, field edges, rapid clicks.",
      notes: { say: ["Найдите баг вместе с чатом, затем покажите исправление."], min: 5 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Если AI написал код, он точно работает ¦ Agar kodni AI yozgan bo'lsa, u albatta ishlaydi ¦ If AI wrote it, it definitely works", truth: false, explain: "Мы только что нашли два бага. ¦ Biz hozirgina ikkita xato topdik. ¦ We just found two bugs." },
        { text: "Лучше просить по одной функции за раз ¦ Bir vaqtda bitta funksiya so'ragan ma'qul ¦ It's better to ask for one feature at a time", truth: true, explain: "Маленькие шаги легче проверить. ¦ Kichik qadamlarni tekshirish osonroq. ¦ Small steps are easier to check." },
        { text: "Можно попросить AI объяснить свой код ¦ AI'dan o'z kodini tushuntirishni so'rash mumkin ¦ You can ask AI to explain its code", truth: true, explain: "Так вы учитесь, а не просто копируете. ¦ Shunday qilib siz shunchaki nusxa ko'chirmaysiz, balki o'rganasiz. ¦ That way you learn instead of just copying." },
        { text: "В промпт можно вставить свой пароль, чтобы AI помог ¦ AI yordam berishi uchun promptga parolingizni qo'yish mumkin ¦ You can paste your password into a prompt so AI can help", truth: false, explain: "Никогда не делитесь паролями и личными данными с AI. ¦ Hech qachon parol va shaxsiy ma'lumotlarni AI bilan baham ko'rmang. ¦ Never share passwords or personal data with AI." },
      ],
      takeaway: "AI — быстрый помощник, но проверка и безопасность — на вас. ¦ AI — tez yordamchi, lekin tekshiruv va xavfsizlik — sizning zimmangizda. ¦ AI is a fast helper, but checking and safety are on you.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: версия 3 ¦ Missiya: 3-versiya ¦ Mission: version 3",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Игра готова к релизу! ¦ O'yin relizga tayyor! ¦ The game is ready to ship!",
      items: [
        { title: "Хотим уровни сложности. Промпт: ¦ Qiyinlik darajalarini xohlaymiz. Prompt: ¦ We want difficulty levels. Prompt:", choices: ["«Сделай игру лучше» ¦ «O'yinni yaxshiroq qil» ¦ “Make the game better”", "«Каждые 5 очков звезда уменьшается на 10%» ¦ «Har 5 ochkoda yulduz 10% ga kichrayadi» ¦ “Every 5 points the star shrinks by 10%”"], correct: 1, explain: "Конкретное правило — конкретный код. ¦ Aniq qoida — aniq kod. ¦ A specific rule gives specific code." },
        { title: "AI прислал код ¦ AI kod yubordi ¦ AI sent code", choices: ["Сразу показать всем ¦ Darhol hammaga ko'rsatish ¦ Show everyone right away", "Запустить и проверить края ¦ Ishga tushirib, chegaralarni tekshirish ¦ Run it and test the edges"], correct: 1, explain: "Сначала проверка. ¦ Avval tekshiruv. ¦ Test first." },
        { title: "Не понимаете строку ¦ Qatorni tushunmayapsiz ¦ You don't understand a line", choices: ["Попросить AI объяснить ¦ AI'dan tushuntirishni so'rash ¦ Ask AI to explain", "Удалить строку ¦ Qatorni o'chirish ¦ Delete the line"], correct: 0, explain: "Понимание — главное, что вы забираете с урока. ¦ Tushunish — darsdan olib ketadigan eng asosiy narsangiz. ¦ Understanding is what you take away." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: игра с AI ¦ Xulosa: AI bilan o'yin ¦ Summary: a game with AI",
      chat: "пришлите свой рекорд и идею для версии 4! ¦ rekordingiz va 4-versiya g'oyasini yuboring! ¦ post your record and an idea for version 4!",
      answer: "Идею и правила придумывает человек, а AI быстро пишет черновик кода. Работаем итерациями: конкретный промпт → запуск → проверка краевых случаев → следующее маленькое улучшение. AI тоже ошибается, поэтому код нужно понимать и проверять, а личные данные в промпты не вставлять. ¦ G'oya va qoidalarni inson o'ylab topadi, AI esa tezda kod qoralamasini yozadi. Iteratsiyalar bilan ishlaymiz: aniq prompt → ishga tushirish → chegaraviy holatlarni tekshirish → keyingi kichik yaxshilash. AI ham xato qiladi, shuning uchun kodni tushunish va tekshirish kerak, shaxsiy ma'lumotlarni esa promptga qo'ymaslik kerak. ¦ People invent the idea and rules; AI quickly drafts the code. Work in iterations: a specific prompt → run → test edge cases → the next small improvement. AI makes mistakes too, so understand and test the code, and keep personal data out of prompts.",
      icon: '🎮',
      badge: "Геймдизайнер ¦ Geymdizayner ¦ Game designer",
      badgeSub: "Tilda · Git · техническая 4 ¦ Tilda · Git · texnik 4 ¦ Tilda · Git · technical 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте с AI одну из игр голосования и добавьте своё правило. ¦ AI bilan ovoz berishdagi o'yinlardan birini yarating va o'z qoidangizni qo'shing. ¦ Build one of the poll games with AI and add your own rule.",
        "Найдите и исправьте хотя бы один баг. Запишите, что это было. ¦ Kamida bitta xatoni toping va tuzating. Nima bo'lganini yozib qo'ying. ¦ Find and fix at least one bug. Write down what it was.",
      ],
      takeaway: "Следующая тема — Git: как сохранять историю проекта, чтобы ничего не потерять. ¦ Keyingi mavzu — Git: hech narsani yo'qotmaslik uchun loyiha tarixini qanday saqlash. ¦ Next: Git — saving your project's history so nothing gets lost.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
