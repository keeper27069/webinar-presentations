import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.ban{width:460px;padding:20px 22px;border-radius:18px;background:#fff;box-shadow:0 10px 30px #0002}
.ban h4{margin:0 0 8px;font-size:22px}.ban p{margin:0 0 14px;color:#6b7183;font-size:16px}
.row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-top:2px solid #eceef3;font-size:17px;font-weight:700}
.sw{width:46px;height:26px;border-radius:13px;background:#d3d7e0;position:relative}.sw::after{content:'';position:absolute;left:3px;top:3px;width:20px;height:20px;border-radius:50%;background:#fff}
.sw.on{background:#0fb5a6}.sw.on::after{left:23px}.sw.lock{opacity:.6}
.btns{display:flex;gap:8px;margin-top:12px}.btns span{flex:1;padding:10px;border-radius:10px;text-align:center;font-weight:800;background:#eceef3}.btns span.hit{background:#16181f;color:#fff}`;
const ban = (an: boolean, ad: boolean, hit: string) => `<div class="wrap"><div class="ban"><h4>🍪 We use cookies</h4><p>Choose what this site may remember.</p><div class="row">Necessary (cart, login)<span class="sw on lock"></span></div><div class="row">Analytics<span class="sw ${an ? 'on' : ''}"></span></div><div class="row">Advertising<span class="sw ${ad ? 'on' : ''}"></span></div><div class="btns"><span class="${hit === 'all' ? 'hit' : ''}">Accept all</span><span class="${hit === 'nec' ? 'hit' : ''}">Necessary only</span></div></div></div>`;

export default kit({
  id: 'react-g04',
  title: "Почему сайты спрашивают про cookies ¦ Nega saytlar cookie haqida so'raydi ¦ Why sites ask about cookies",
  question: "Что на самом деле происходит, когда вы нажимаете «Принять всё»? ¦ «Hammasini qabul qilish»ni bosganingizda aslida nima sodir bo'ladi? ¦ What really happens when you click “Accept all”?",
  route: ["Записка ¦ Yozuvcha ¦ A little note", "Реклама ¦ Reklama ¦ Ads", "Баннер ¦ Banner ¦ The banner", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🍪',
      kicker: "React · общая тема 4 ¦ React · umumiy mavzu 4 ¦ React · general topic 4",
      title: "Cookie — записка сайта в вашем браузере ¦ Cookie — saytning brauzeringizdagi yozuvchasi ¦ A cookie is a site's note in your browser",
      chat: "что вы обычно нажимаете в окне про cookies? ¦ cookie oynasida odatda nimani bosasiz? ¦ what do you usually click on cookie pop-ups?",
      lead: "Cookie — маленькая записка, которую сайт оставляет в браузере: «этот человек вошёл», «в корзине кроссовки». Одни записки нужны для работы сайта, другие — чтобы следить за вами ради рекламы. Поэтому сайт спрашивает разрешения. ¦ Cookie — sayt brauzerda qoldiradigan kichik yozuvcha: «bu odam kirdi», «savatda krossovka». Ba'zi yozuvchalar sayt ishlashi uchun kerak, boshqalari — reklama uchun sizni kuzatish uchun. Shuning uchun sayt ruxsat so'raydi. ¦ A cookie is a tiny note a site leaves in your browser: “this person is logged in”, “sneakers in the cart”. Some are needed for the site to work; others track you for ads. That's why sites ask permission.",
      facts: ["Необходимые — вход, корзина ¦ Zarur — kirish, savat ¦ Necessary: login, cart", "Аналитика — что вы смотрите ¦ Analitika — nimani ko'rasiz ¦ Analytics: what you view", "Реклама — следят между сайтами ¦ Reklama — saytlar orasida kuzatadi ¦ Advertising: tracking across sites"],
      takeaway: "Смотрим, как работает записка. ¦ Yozuvcha qanday ishlashini ko'ramiz. ¦ Watch the note at work.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Сайт вас «помнит» ¦ Sayt sizni «eslab qoladi» ¦ The site “remembers” you",
      chat: "почему корзина не пропала после закрытия вкладки? ¦ nega tab yopilgandan keyin savat yo'qolmadi? ¦ why didn't the cart vanish after closing the tab?",
      actors: [
        { id: 'me', icon: '💻', label: "Ваш браузер ¦ Brauzeringiz ¦ Your browser" },
        { id: 'shop', icon: '🏪', label: 'shop.example' },
        { id: 'c', icon: '🍪', label: "cart = 👟" },
      ],
      steps: [
        { say: "Вы положили кроссовки в корзину. ¦ Krossovkani savatga soldingiz. ¦ You put sneakers in the cart.", at: { me: [16, 50, 1.2], shop: [84, 50, 1.2] }, lines: [['me', 'shop', '👟']] },
        { say: "Сайт отдаёт браузеру записку-cookie: «в корзине 👟». ¦ Sayt brauzerga cookie-yozuvcha beradi: «savatda 👟». ¦ The site hands your browser a cookie: “👟 in the cart”.", at: { c: [50, 22] }, lines: [['shop', 'me', '🍪']], pulse: ['c'] },
        { say: "Браузер хранит её у себя. Вы закрыли вкладку… ¦ Brauzer uni o'zida saqlaydi. Tabni yopdingiz… ¦ The browser keeps it. You close the tab…", at: { c: [16, 18, 0.8] } },
        { say: "Вернулись завтра — браузер показывает записку, и корзина на месте! ¦ Ertaga qaytdingiz — brauzer yozuvchani ko'rsatadi va savat joyida! ¦ Come back tomorrow — the browser shows the note and your cart is still there!", lines: [['me', 'shop', '🍪 cart = 👟']], pulse: ['shop'] },
      ],
      takeaway: "Необходимые cookies делают сайт удобным: вход, корзина, язык. ¦ Zarur cookie'lar saytni qulay qiladi: kirish, savat, til. ¦ Necessary cookies make sites handy: login, cart, language.",
      notes: { min: 4 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Реклама, которая ходит за вами ¦ Sizning ortingizdan yuradigan reklama ¦ Ads that follow you around",
      chat: "вам показывали рекламу того, что вы недавно смотрели? ¦ sizga yaqinda ko'rgan narsangiz reklamasini ko'rsatishganmi? ¦ have you seen ads for something you just looked at?",
      actors: [
        { id: 'me', icon: '💻', label: "Вы ¦ Siz ¦ You" },
        { id: 'a', icon: '👟', label: "Сайт кроссовок ¦ Krossovka sayti ¦ A sneaker site" },
        { id: 'b', icon: '📰', label: "Сайт новостей ¦ Yangiliklar sayti ¦ A news site" },
        { id: 'ad', icon: '📢', label: "Рекламная сеть ¦ Reklama tarmog'i ¦ Ad network" },
        { id: 'c', icon: '🍪', label: "id: 4815" },
      ],
      steps: [
        { say: "На сайте кроссовок есть невидимый кусочек рекламной сети. ¦ Krossovka saytida reklama tarmog'ining ko'rinmas bo'lagi bor. ¦ The sneaker site contains a hidden piece of an ad network.", at: { me: [50, 84], a: [18, 30], ad: [50, 14], b: [82, 30] }, lines: [['me', 'a'], ['a', 'ad']] },
        { say: "Сеть ставит вам свою cookie с номером. ¦ Tarmoq sizga raqamli cookie qo'yadi. ¦ The network gives you its own cookie with a number.", at: { c: [50, 56] }, lines: [['ad', 'me', '🍪']], pulse: ['c'] },
        { say: "Вы открыли новости — там та же рекламная сеть. Она узнаёт ваш номер… ¦ Yangiliklarni ochdingiz — u yerda o'sha reklama tarmog'i. U raqamingizni taniydi… ¦ You open the news site — same ad network. It recognises your number…", lines: [['me', 'b'], ['b', 'ad', '4815?']] },
        { say: "…и показывает рекламу кроссовок. Так за вами «ходят». ¦ …va krossovka reklamasini ko'rsatadi. Sizning ortingizdan shunday «yurishadi». ¦ …and shows sneaker ads. That's how you're followed.", set: { b: { icon: '📰👟' } }, pulse: ['b'] },
      ],
      takeaway: "Рекламные cookies связывают ваши визиты на разных сайтах. ¦ Reklama cookie'lari turli saytlardagi tashriflaringizni bog'laydi. ¦ Advertising cookies link your visits across sites.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Что меняет ваш выбор ¦ Tanlovingiz nimani o'zgartiradi ¦ What your choice changes",
      chat: "что выберете вы? ¦ siz nimani tanlaysiz? ¦ what will you choose?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: 'cookie banner', html: ban(false, false, ''), say: "Окно cookies. Необходимые включены всегда — без них сайт не работает. ¦ Cookie oynasi. Zarurlari doim yoqilgan — ularsiz sayt ishlamaydi. ¦ The cookie pop-up. Necessary ones are always on — the site needs them." },
        { code: '"Accept all"', html: ban(true, true, 'all'), say: "«Принять всё» — включаются и аналитика, и реклама. ¦ «Hammasini qabul qilish» — analitika ham, reklama ham yoqiladi. ¦ “Accept all” turns on analytics and advertising too." },
        { code: '"Necessary only"', html: ban(false, false, 'nec'), say: "«Только необходимые» — сайт работает, но за вами меньше следят. ¦ «Faqat zarurlari» — sayt ishlaydi, lekin sizni kamroq kuzatishadi. ¦ “Necessary only”: the site works, with less tracking." },
      ],
      takeaway: "Сайт работает и без рекламных cookies. Выбор — за вами. ¦ Sayt reklama cookie'larisiz ham ishlaydi. Tanlov — sizda. ¦ Sites work without ad cookies. The choice is yours.",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какая это cookie? ¦ Bu qanday cookie? ¦ Which kind of cookie?",
      chat: "пишите: «1 — реклама» ¦ yozing: «1 — reklama» ¦ write: “1 — advertising”",
      zones: [
        { id: 'n', label: "Необходимая ¦ Zarur ¦ Necessary", icon: '🔧' },
        { id: 'a', label: "Рекламная ¦ Reklama ¦ Advertising", icon: '📢' },
      ],
      items: [
        { text: "Запомнить, что вы вошли ¦ Kirganingizni eslab qolish ¦ Remember you're logged in", zone: 'n' },
        { text: "Показывать рекламу на других сайтах ¦ Boshqa saytlarda reklama ko'rsatish ¦ Show ads on other sites", zone: 'a' },
        { text: "Хранить товары в корзине ¦ Savatdagi mahsulotlarni saqlash ¦ Keep items in the cart", zone: 'n' },
        { text: "Запомнить выбранный язык ¦ Tanlangan tilni eslab qolish ¦ Remember your language", zone: 'n' },
        { text: "Следить, какие сайты вы посещаете ¦ Qaysi saytlarga kirishingizni kuzatish ¦ Track which sites you visit", zone: 'a' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Cookie — это вирус ¦ Cookie — bu virus ¦ A cookie is a virus", truth: false, explain: "Это просто текстовая записка. ¦ Bu shunchaki matnli yozuvcha. ¦ It's just a text note." },
        { text: "Можно отказаться от рекламных cookies ¦ Reklama cookie'laridan voz kechish mumkin ¦ You can refuse advertising cookies", truth: true, explain: "Кнопка «Только необходимые» или настройки. ¦ «Faqat zarurlari» tugmasi yoki sozlamalar. ¦ “Necessary only” or the settings." },
        { text: "Cookies можно удалить в настройках браузера ¦ Cookie'larni brauzer sozlamalarida o'chirish mumkin ¦ You can delete cookies in browser settings", truth: true, explain: "Но тогда сайты «забудут» вход. ¦ Lekin keyin saytlar kirishni «unutadi». ¦ But sites will forget your login." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: осознанный выбор ¦ Missiya: ongli tanlov ¦ Mission: an informed choice",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Вы знаете, что разрешаете! ¦ Nimaga ruxsat berayotganingizni bilasiz! ¦ You know what you're allowing!",
      items: [
        { title: "Не хотите, чтобы реклама ходила за вами ¦ Reklama ortingizdan yurishini xohlamaysiz ¦ You don't want ads following you", choices: ["«Только необходимые» ¦ «Faqat zarurlari» ¦ “Necessary only”", "«Принять всё» ¦ «Hammasini qabul qilish» ¦ “Accept all”"], correct: 0, explain: "Рекламные cookies выключены. ¦ Reklama cookie'lari o'chirilgan. ¦ Ad cookies stay off." },
        { title: "Какая cookie нужна для корзины? ¦ Savat uchun qaysi cookie kerak? ¦ Which cookie does the cart need?", choices: ["Необходимая ¦ Zarur ¦ Necessary", "Рекламная ¦ Reklama ¦ Advertising"], correct: 0, explain: "Без неё корзина пропадёт. ¦ Usiz savat yo'qoladi. ¦ Without it the cart disappears." },
        { title: "Что такое cookie? ¦ Cookie nima? ¦ What's a cookie?", choices: ["Записка сайта в браузере ¦ Saytning brauzerdagi yozuvchasi ¦ A site's note in your browser", "Программа-шпион ¦ Josus dastur ¦ Spyware"], correct: 0, explain: "Маленький кусочек текста. ¦ Kichik matn bo'lagi. ¦ A small piece of text." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: cookies ¦ Xulosa: cookie'lar ¦ Summary: cookies",
      chat: "что нажмёте в следующий раз? ¦ keyingi safar nimani bosasiz? ¦ what will you click next time?",
      answer: "Cookie — маленькая записка, которую сайт сохраняет в браузере. Необходимые cookies запоминают вход, корзину и язык — без них сайт неудобен. Рекламные cookies ставит рекламная сеть, чтобы узнавать вас на разных сайтах и показывать рекламу. «Принять всё» включает и рекламные, «Только необходимые» — нет, а сайт при этом работает. ¦ Cookie — sayt brauzerda saqlaydigan kichik yozuvcha. Zarur cookie'lar kirish, savat va tilni eslab qoladi — ularsiz sayt noqulay. Reklama cookie'larini reklama tarmog'i sizni turli saytlarda tanish va reklama ko'rsatish uchun qo'yadi. «Hammasini qabul qilish» reklamalarini ham yoqadi, «Faqat zarurlari» — yo'q, sayt esa bunda ishlaydi. ¦ A cookie is a small note a site saves in your browser. Necessary cookies remember your login, cart and language. Advertising cookies are set by ad networks to recognise you across sites and show ads. “Accept all” turns those on; “Necessary only” doesn't — and the site still works.",
      icon: '🍪',
      badge: "Хозяин своих данных ¦ O'z ma'lumotlari egasi ¦ Owner of your data",
      badgeSub: "React · общая 4 ¦ React · umumiy 4 ¦ React · general 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Найдите в браузере, где посмотреть cookies сайта. ¦ Brauzerda sayt cookie'larini qayerda ko'rish mumkinligini toping. ¦ Find where your browser shows a site's cookies.",
        "Расскажите родным разницу между «Принять всё» и «Только необходимые». ¦ Yaqinlaringizga «Hammasini qabul qilish» va «Faqat zarurlari» farqini aytib bering. ¦ Explain “Accept all” vs “Necessary only” to your family.",
      ],
      takeaway: "Дальше: что внутри смартфона. ¦ Keyingisi: smartfon ichida nima bor. ¦ Next: what's inside a smartphone.",
      notes: { min: 2 },
    },
  ],
});
