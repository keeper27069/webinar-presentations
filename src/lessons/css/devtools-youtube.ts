import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.vid{width:440px;border-radius:20px;background:#fff;box-shadow:0 10px 30px #0001;overflow:hidden}
.thumb{height:220px;display:grid;place-items:center;font-size:90px;background:linear-gradient(135deg,#ffd6cc,#ffe9b3)}
.info{padding:16px 20px}.t{font-size:24px;font-weight:800}.v{color:#6b7183;font-size:18px;margin-top:4px}
.sel{outline:4px solid #3d7bff;outline-offset:4px;border-radius:6px;background:#dbeafe}
.tip{display:inline-block;margin-bottom:6px;padding:2px 8px;border-radius:6px;background:#3d7bff;color:#fff;font:700 14px JetBrains Mono,monospace}
.dark .vid{background:#1d1f2b;color:#fff}.dark .v{color:#9aa0b4}`;
const vid = (o: { t: string; v: string; sel?: boolean; tip?: boolean; dark?: boolean; icon?: string }) =>
  `<div class="wrap ${o.dark ? 'dark' : ''}"><div class="vid"><div class="thumb">${o.icon ?? '🐱'}</div><div class="info">${o.tip ? '<span class="tip">h3.title</span>' : ''}<div class="t ${o.sel ? 'sel' : ''}">${o.t}</div><div class="v">${o.v}</div></div></div></div>`;

export default kit({
  id: 'css-g02',
  title: "Заглядываем внутрь сайтов через DevTools ¦ DevTools orqali saytlar ichiga qaraymiz ¦ Peeking inside websites with DevTools",
  question: "Из чего сделан любой сайт — даже YouTube? ¦ Har qanday sayt — hatto YouTube ham — nimadan yasalgan? ¦ What is any website — even YouTube — made of?",
  route: ["Секрет ¦ Sir ¦ The secret", "Меняем ¦ O'zgartiramiz ¦ Editing", "Только у вас ¦ Faqat sizda ¦ Only for you", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔍',
      kicker: "CSS · общая тема 2 ¦ CSS · umumiy mavzu 2 ¦ CSS · general topic 2",
      title: "У каждого сайта есть «изнанка» ¦ Har bir saytning «ichki tomoni» bor ¦ Every site has an “inside”",
      chat: "как думаете, YouTube сделан из того же, что и наши сайты? ¦ sizningcha, YouTube bizning saytlarimiz bilan bir xil narsadan yasalganmi? ¦ do you think YouTube is made of the same stuff as our sites?",
      lead: "Нажмите F12 — и браузер покажет, из чего сделана страница. Это DevTools — «рентген» для сайтов. ¦ F12 ni bosing — brauzer sahifa nimadan yasalganini ko'rsatadi. Bu DevTools — saytlar uchun «rentgen». ¦ Press F12 and the browser shows what the page is made of. That's DevTools, an X-ray for websites.",
      facts: ["F12 или правый клик → «Просмотреть код» ¦ F12 yoki o'ng tugma → «Kodni ko'rish» ¦ F12 or right-click → “Inspect”", "Внутри — HTML и CSS, как у нас ¦ Ichida — HTML va CSS, xuddi biznikidek ¦ Inside: HTML and CSS, like ours", "Менять можно — но только у себя ¦ O'zgartirish mumkin — lekin faqat o'zingizda ¦ You can edit — but only for yourself"],
      takeaway: "Сначала посмотрим, из каких частей собрана страница. ¦ Avval sahifa qaysi qismlardan yig'ilganini ko'ramiz. ¦ First, let's see what parts a page is built from.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Страница разбирается на части ¦ Sahifa qismlarga ajraladi ¦ A page comes apart",
      chat: "какая часть отвечает за цвета? ¦ ranglar uchun qaysi qism javob beradi? ¦ which part is in charge of colours?",
      actors: [
        { id: 'page', icon: '📺', label: "Страница с видео ¦ Video sahifasi ¦ A video page" },
        { id: 'html', icon: '📄', label: "HTML — что есть ¦ HTML — nima bor ¦ HTML — what's there" },
        { id: 'css', icon: '🎨', label: "CSS — как выглядит ¦ CSS — qanday ko'rinadi ¦ CSS — how it looks" },
        { id: 'img', icon: '🖼️', label: "Картинки ¦ Rasmlar ¦ Images" },
        { id: 'js', icon: '⚙️', label: "JS — что делает ¦ JS — nima qiladi ¦ JS — what it does" },
      ],
      steps: [
        { say: "Вот обычная страница с видео. ¦ Mana oddiy video sahifasi. ¦ Here's an ordinary video page.", at: { page: [50, 50, 1.4] } },
        { say: "Нажали F12 — она разбирается на части. ¦ F12 bosildi — u qismlarga ajraladi. ¦ Press F12 and it comes apart.", at: { page: [50, 22, 0.9], html: [14, 68], css: [38, 68], img: [62, 68], js: [86, 68] }, lines: [['page', 'html'], ['page', 'css'], ['page', 'img'], ['page', 'js']] },
        { say: "HTML — заголовки, кнопки, текст. Мы это уже умеем! ¦ HTML — sarlavhalar, tugmalar, matn. Biz buni allaqachon bilamiz! ¦ HTML: headings, buttons, text. We already know this!", at: {}, lines: [['page', 'html']], pulse: ['html'] },
        { say: "CSS — цвета, размеры, тёмная тема. Тоже наше! ¦ CSS — ranglar, o'lchamlar, qorong'i mavzu. Bu ham bizniki! ¦ CSS: colours, sizes, dark mode. Ours too!", at: {}, lines: [['page', 'css']], pulse: ['css'] },
        { say: "Даже огромный YouTube — это те же кирпичики, просто их очень много. ¦ Hatto ulkan YouTube ham — o'sha g'ishtchalar, faqat ular juda ko'p. ¦ Even huge YouTube is the same bricks — just a lot of them.", at: { page: [50, 22, 1.1] }, lines: [['page', 'html'], ['page', 'css'], ['page', 'img'], ['page', 'js']], pulse: ['page'] },
      ],
      takeaway: "Любой сайт — это HTML + CSS + картинки + немного JS. ¦ Har qanday sayt — HTML + CSS + rasmlar + ozgina JS. ¦ Any site is HTML + CSS + images + a bit of JS.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Меняем видео у себя на экране ¦ Videoni o'z ekranimizda o'zgartiramiz ¦ Editing a video on our screen",
      chat: "какое название видео напишем? ¦ videoga qanday nom yozamiz? ¦ what title shall we write?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<h3 class="title">\n  Funny cat compilation\n</h3>', html: vid({ t: 'Funny cat compilation', v: '12K views' }), say: "Обычная карточка видео. ¦ Oddiy video kartochkasi. ¦ An ordinary video card." },
        { code: '<h3 class="title">\n  Funny cat compilation\n</h3>', line: 1, html: vid({ t: 'Funny cat compilation', v: '12K views', sel: true, tip: true }), say: "Стрелкой DevTools нажали на название — оно подсветилось. ¦ DevTools strelkasi bilan nomni bosdik — u ajralib ko'rindi. ¦ Click the title with the DevTools arrow and it lights up." },
        { code: '<h3 class="title">\n  My first channel 🚀\n</h3>', line: 2, html: vid({ t: 'My first channel 🚀', v: '12K views', sel: true, tip: true }), say: "Двойной клик по тексту в коде — пишем своё. ¦ Koddagi matnga ikki marta bosamiz — o'zimiznikini yozamiz. ¦ Double-click the text in the code and type your own." },
        { code: '<p class="views">\n  1 000 000 views\n</p>', line: 2, html: vid({ t: 'My first channel 🚀', v: '1 000 000 views', icon: '🦄' }), say: "Миллион просмотров! Но… это только у нас на экране. ¦ Million ko'rish! Lekin… bu faqat bizning ekranimizda. ¦ A million views! But… only on our screen." },
        { code: 'body {\n  background: #1d1f2b;\n}', lang: 'css', line: 2, html: vid({ t: 'My first channel 🚀', v: '1 000 000 views', icon: '🦄', dark: true }), say: "А в CSS можно перекрасить всё — например, сделать тёмную тему. ¦ CSS'da esa hammasini qayta bo'yash mumkin — masalan, qorong'i mavzu qilish. ¦ In CSS you can recolour everything, like a dark theme." },
      ],
      takeaway: "DevTools — песочница: меняйте что угодно и смотрите результат. ¦ DevTools — qum maydoni: istalgan narsani o'zgartiring va natijani ko'ring. ¦ DevTools is a sandbox: change anything and watch the result.",
      notes: { min: 6 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Кто увидит изменения? ¦ O'zgarishlarni kim ko'radi? ¦ Who sees the changes?",
      chat: "увидит ли ваш друг «миллион просмотров»? ¦ do'stingiz «million ko'rish»ni ko'radimi? ¦ will your friend see “a million views”?",
      actors: [
        { id: 'srv', icon: '🗄️', label: "Сервер сайта ¦ Sayt serveri ¦ The site's server" },
        { id: 'me', icon: '💻', label: "Ваш экран ¦ Sizning ekraningiz ¦ Your screen" },
        { id: 'fr', icon: '📱', label: "Экран друга ¦ Do'stingiz ekrani ¦ Your friend's screen" },
        { id: 'tag', text: "1 000 000 👀" },
        { id: 'orig', text: "12K 👀" },
      ],
      steps: [
        { say: "Сервер раздаёт страницу всем одинаково. ¦ Server sahifani hammaga bir xil tarqatadi. ¦ The server sends the same page to everyone.", at: { srv: [50, 20], me: [24, 68], fr: [76, 68] }, lines: [['srv', 'me'], ['srv', 'fr']] },
        { say: "Вы поменяли текст в DevTools… ¦ Siz DevTools'da matnni o'zgartirdingiz… ¦ You change the text in DevTools…", at: { tag: [24, 92] }, lines: [['srv', 'me'], ['srv', 'fr']], pulse: ['me'] },
        { say: "…а у друга всё по-старому. Сервер ничего не узнал. ¦ …do'stingizda esa hammasi eskicha. Server hech narsani bilmadi. ¦ …but your friend still sees the old page. The server knows nothing.", at: { orig: [76, 92] }, lines: [['srv', 'me'], ['srv', 'fr']], pulse: ['fr'] },
        { say: "Обновили страницу — и ваши изменения исчезли. ¦ Sahifani yangiladik — o'zgarishlaringiz yo'qoldi. ¦ Refresh the page and your changes vanish.", hide: ['tag'], at: { orig: [50, 92] }, set: { me: { icon: '🔄' } }, lines: [['srv', 'me'], ['srv', 'fr']] },
      ],
      takeaway: "DevTools меняет только вашу копию. Это не взлом — это примерка. ¦ DevTools faqat sizning nusxangizni o'zgartiradi. Bu buzish emas — bu kiyib ko'rish. ¦ DevTools only changes your copy. It's not hacking — it's trying things on.",
      notes: { say: ["Подчеркните: скриншот «миллиона» — не доказательство, так легко подделать. Верить только настоящим цифрам."], min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Через DevTools можно взломать YouTube ¦ DevTools orqali YouTube'ni buzish mumkin ¦ You can hack YouTube with DevTools", truth: false, explain: "Меняется только картинка у вас на экране. ¦ Faqat ekraningizdagi tasvir o'zgaradi. ¦ Only the picture on your screen changes." },
        { text: "Скриншот с «миллионом просмотров» легко подделать ¦ «Million ko'rish» skrinshotini soxtalashtirish oson ¦ A “million views” screenshot is easy to fake", truth: true, explain: "Поэтому не верьте скриншотам на слово. ¦ Shuning uchun skrinshotlarga ko'r-ko'rona ishonmang. ¦ So don't trust screenshots blindly." },
        { text: "В DevTools можно примерить новый цвет кнопки ¦ DevTools'da tugmaning yangi rangini sinab ko'rish mumkin ¦ You can try a new button colour in DevTools", truth: true, explain: "Так дизайнеры и программисты проверяют идеи. ¦ Dizaynerlar va dasturchilar g'oyalarni shunday tekshiradi. ¦ That's how designers and developers test ideas." },
      ],
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Ваша карточка видео ¦ Sizning video kartochkangiz ¦ Your video card",
      chat: "покажите, какое название придумали! ¦ qanday nom o'ylab topganingizni ko'rsating! ¦ show us the title you came up with!",
      task: "✍️ Поменяйте название, эмодзи и цвет карточки ¦ ✍️ Kartochka nomini, emojisini va rangini o'zgartiring ¦ ✍️ Change the card's title, emoji and colour",
      steps: [{ label: "Карточка ¦ Kartochka ¦ Card", html: '<div class="vid">\n  <div class="thumb">🐱</div>\n  <h3>Funny cat compilation</h3>\n  <p>12K views</p>\n</div>', css: 'body { font-family: Manrope, system-ui; padding: 24px; }\n.vid {\n  width: 300px; border-radius: 18px;\n  background: white; overflow: hidden;\n  box-shadow: 0 10px 30px #0002;\n}\n.thumb {\n  height: 150px; font-size: 70px;\n  display: grid; place-items: center;\n  background: #ffe0d6;\n}\nh3, p { margin: 10px 16px; }' }],
      takeaway: "Дома попробуйте то же самое на настоящем сайте через F12. ¦ Uyda xuddi shuni haqiqiy saytda F12 orqali sinab ko'ring. ¦ At home, try the same on a real site with F12.",
      notes: { min: 5 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: исследователь сайтов ¦ Missiya: saytlar tadqiqotchisi ¦ Mission: website explorer",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Вы видите сайты насквозь! ¦ Siz saytlarni ichidan ko'rasiz! ¦ You can see right through websites!",
      items: [
        { title: "Как открыть DevTools? ¦ DevTools'ni qanday ochish mumkin? ¦ How do you open DevTools?", choices: ['F12', 'Ctrl + P'], correct: 0, explain: "Или правый клик → «Просмотреть код». ¦ Yoki o'ng tugma → «Kodni ko'rish». ¦ Or right-click → “Inspect”." },
        { title: "Что будет после обновления страницы? ¦ Sahifa yangilangandan keyin nima bo'ladi? ¦ What happens after a refresh?", choices: ["Всё вернётся ¦ Hammasi qaytadi ¦ Everything resets", "Изменения останутся навсегда ¦ O'zgarishlar abadiy qoladi ¦ Changes stay forever"], correct: 0, explain: "Изменения были только у вас в браузере. ¦ O'zgarishlar faqat sizning brauzeringizda edi. ¦ The changes only lived in your browser." },
        { title: "Из чего сделан YouTube? ¦ YouTube nimadan yasalgan? ¦ What is YouTube made of?", choices: ["HTML, CSS, JS и картинки ¦ HTML, CSS, JS va rasmlar ¦ HTML, CSS, JS and images", "Из секретного языка ¦ Maxfiy tildan ¦ A secret language"], correct: 0, explain: "Те же кирпичики, что у нас. ¦ Biznikidek o'sha g'ishtchalar. ¦ The same bricks as ours." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: DevTools ¦ Xulosa: DevTools ¦ Summary: DevTools",
      chat: "какой сайт вы исследуете первым? ¦ qaysi saytni birinchi bo'lib tekshirasiz? ¦ which site will you explore first?",
      answer: "Любой сайт, даже YouTube, сделан из HTML, CSS, картинок и JS. DevTools (F12) показывает этот код, и в нём можно менять тексты и стили. Но изменения видны только вам и пропадают после обновления — сервер о них не знает. Поэтому это примерка, а не взлом, и скриншотам с цифрами нельзя верить на слово. ¦ Har qanday sayt, hatto YouTube ham, HTML, CSS, rasmlar va JS'dan yasalgan. DevTools (F12) bu kodni ko'rsatadi va unda matn va uslublarni o'zgartirish mumkin. Lekin o'zgarishlar faqat sizga ko'rinadi va yangilangandan keyin yo'qoladi — server ular haqida bilmaydi. Shuning uchun bu buzish emas, kiyib ko'rish, raqamli skrinshotlarga esa ko'r-ko'rona ishonib bo'lmaydi. ¦ Every site, even YouTube, is HTML, CSS, images and JS. DevTools (F12) shows that code and lets you change text and styles. But the changes are only visible to you and vanish on refresh — the server never knows. So it's trying things on, not hacking, and screenshots with numbers can't be trusted blindly.",
      icon: '🔍',
      badge: "Исследователь сайтов ¦ Saytlar tadqiqotchisi ¦ Website explorer",
      badgeSub: "CSS · общая 2 ¦ CSS · umumiy 2 ¦ CSS · general 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Откройте любимый сайт, нажмите F12 и поменяйте один заголовок. ¦ Sevimli saytingizni oching, F12 ni bosing va bitta sarlavhani o'zgartiring. ¦ Open a favourite site, press F12 and change one heading.",
        "Найдите в CSS цвет любой кнопки и перекрасьте её. ¦ CSS'da istalgan tugmaning rangini toping va uni qayta bo'yang. ¦ Find a button's colour in the CSS and change it.",
      ],
      takeaway: "Дальше: как красиво презентовать свой проект. ¦ Keyingisi: loyihangizni qanday chiroyli taqdim etish. ¦ Next: how to present your project well.",
      notes: { min: 2 },
    },
  ],
});
