import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.shop{width:420px;padding:22px;border-radius:24px;background:#fff;box-shadow:0 10px 30px #0001;text-align:center}
.pic{font-size:90px}.name{font-size:26px;font-weight:800}.price{font-size:22px;color:#6b7183;margin:4px 0 16px}
.btn{display:inline-block;padding:4px 8px;border-radius:4px;background:#e9ebf0;color:#b6bac6;font-size:12px}
.big .btn{padding:16px 40px;border-radius:16px;font-size:24px;font-weight:800}
.color .btn{background:#f2573a;color:#fff;box-shadow:0 8px 20px #f2573a55}
.done .btn{background:#0fb5a6;box-shadow:0 8px 20px #0fb5a655}`;
const shop = (cls: string, label: string) =>
  `<div class="wrap"><div class="shop ${cls}"><div class="pic">👟</div><div class="name">Sneakers</div><div class="price">$49</div><span class="btn">${label}</span></div></div>`;

export default kit({
  id: 'css-g01',
  title: "Почему одним приложением удобно, а другим — сложно ¦ Nega bir ilovadan foydalanish qulay, boshqasidan — qiyin ¦ Why some apps feel easy and others hard",
  question: "Что делает приложение удобным, даже если вы видите его впервые? ¦ Ilovani birinchi marta ko'rsangiz ham, uni nima qulay qiladi? ¦ What makes an app easy even the first time you see it?",
  route: ["Кнопка ¦ Tugma ¦ The button", "Путь ¦ Yo'l ¦ The path", "Правила ¦ Qoidalar ¦ Rules", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '👆',
      kicker: "CSS · общая тема 1 ¦ CSS · umumiy mavzu 1 ¦ CSS · general topic 1",
      title: "Удобно — это когда не думаешь ¦ Qulay — bu o'ylamaganingda ¦ Easy means you don't have to think",
      chat: "каким приложением вам пользоваться легче всего? ¦ qaysi ilovadan foydalanish sizga eng oson? ¦ which app is easiest for you to use?",
      lead: "Хорошее приложение само подсказывает, куда нажать. Плохое заставляет искать и злиться. Разница — в мелочах дизайна. ¦ Yaxshi ilova qayerni bosishni o'zi ko'rsatadi. Yomoni esa qidirishga va jahl qilishga majbur qiladi. Farq — dizayn mayda-chuydalarida. ¦ A good app shows you where to tap. A bad one makes you search and get annoyed. The difference is in small design details.",
      facts: ["Заметная главная кнопка ¦ Ko'zga tashlanadigan asosiy tugma ¦ An obvious main button", "Мало шагов до цели ¦ Maqsadgacha kam qadam ¦ Few steps to the goal", "Понятный ответ на нажатие ¦ Bosishga tushunarli javob ¦ Clear feedback on tap"],
      takeaway: "Посмотрим, как одна кнопка становится удобной. ¦ Bitta tugma qanday qulay bo'lishini ko'ramiz. ¦ Let's watch one button become easy to use.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Чиним одну кнопку ¦ Bitta tugmani tuzatamiz ¦ Fixing one button",
      chat: "вы бы нашли кнопку на первом шаге? ¦ birinchi qadamda tugmani topgan bo'larmidingiz? ¦ would you find the button on step one?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.btn {\n  font-size: 12px;\n  color: lightgray;\n}', html: shop('', 'buy'), say: "Кнопка «купить» есть… но её почти не видно. ¦ «Sotib olish» tugmasi bor… lekin u deyarli ko'rinmaydi. ¦ There is a “buy” button… but you can barely see it." },
        { code: '.btn {\n  font-size: 24px;\n  padding: 16px 40px;\n}', line: 3, html: shop('big', 'Buy'), say: "Сделали больше — в неё легко попасть пальцем. ¦ Kattaroq qildik — unga barmoq bilan tegish oson. ¦ Bigger: easy to hit with a finger." },
        { code: '.btn {\n  background: coral;\n  color: white;\n}', line: 2, html: shop('big color', 'Buy now'), say: "Яркий цвет — глаз сразу находит главное. ¦ Yorqin rang — ko'z asosiy narsani darhol topadi. ¦ A bright colour: your eye finds the main thing at once." },
        { code: '.btn:active,\n.btn.done {\n  background: teal;\n}', line: 2, html: shop('big color done', '✓ In cart'), say: "После нажатия кнопка отвечает: «Готово!». Человек спокоен. ¦ Bosilgandan keyin tugma javob beradi: «Tayyor!». Odam xotirjam. ¦ After the tap the button answers “Done!” — the user relaxes." },
      ],
      takeaway: "Заметная, большая и отвечает на нажатие — вот удобная кнопка. ¦ Ko'zga tashlanadigan, katta va bosishga javob beradigan — mana qulay tugma. ¦ Visible, big and responsive: that's an easy button.",
      notes: { min: 6 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Сколько шагов до покупки? ¦ Xaridgacha necha qadam? ¦ How many steps to buy?",
      chat: "сколько нажатий вы готовы сделать, чтобы купить? ¦ sotib olish uchun necha marta bosishga tayyorsiz? ¦ how many taps are you willing to make to buy something?",
      actors: [
        { id: 'me', icon: '🙂', label: "Покупатель ¦ Xaridor ¦ Shopper" },
        { id: 's1', icon: '🏠', label: "Главная ¦ Bosh sahifa ¦ Home" },
        { id: 's2', icon: '📂', label: "Каталог ¦ Katalog ¦ Catalog" },
        { id: 's3', icon: '📂', label: "Подкаталог ¦ Ichki katalog ¦ Sub-catalog" },
        { id: 's4', icon: '📝', label: "Регистрация ¦ Ro'yxatdan o'tish ¦ Sign-up" },
        { id: 's5', icon: '👟', label: "Товар ¦ Mahsulot ¦ Product" },
        { id: 'goal', icon: '🛒', label: "Купил! ¦ Sotib oldi! ¦ Bought!" },
      ],
      steps: [
        { say: "Плохой магазин: человек хочет купить кроссовки. ¦ Yomon do'kon: odam krossovka sotib olmoqchi. ¦ A bad shop: someone wants to buy sneakers.", at: { me: [8, 50], s1: [22, 50], s2: [36, 50], s3: [50, 50], s4: [64, 50], s5: [78, 50], goal: [92, 50] } },
        { say: "Главная → каталог → ещё каталог… ¦ Bosh sahifa → katalog → yana katalog… ¦ Home → catalog → another catalog…", at: { me: [50, 22] }, lines: [['s1', 's2'], ['s2', 's3']] },
        { say: "…а тут ещё и регистрация! Многие уходят прямо здесь. ¦ …bu yerda esa yana ro'yxatdan o'tish! Ko'pchilik shu yerda ketib qoladi. ¦ …and now a sign-up form! Many people leave right here.", at: { me: [64, 22] }, set: { me: { icon: '😤', label: "Ушёл ¦ Ketdi ¦ Left" } }, lines: [['s1', 's2'], ['s2', 's3'], ['s3', 's4']], pulse: ['s4'] },
        { say: "Удобный магазин: товар виден сразу, лишние шаги убраны. ¦ Qulay do'kon: mahsulot darhol ko'rinadi, ortiqcha qadamlar olib tashlangan. ¦ An easy shop: the product is visible at once, extra steps removed.", hide: ['s2', 's3', 's4'], at: { me: [15, 50], s1: [38, 50], s5: [62, 50], goal: [86, 50] }, set: { me: { icon: '🙂', label: "Покупатель ¦ Xaridor ¦ Shopper" } } },
        { say: "Два нажатия — и покупка готова! ¦ Ikki marta bosish — va xarid tayyor! ¦ Two taps and the purchase is done!", at: { me: [86, 22] }, set: { me: { icon: '😍' } }, lines: [['s1', 's5'], ['s5', 'goal']], pulse: ['goal'] },
      ],
      takeaway: "Каждый лишний шаг — это люди, которые ушли. ¦ Har bir ortiqcha qadam — ketib qolgan odamlar. ¦ Every extra step means people who left.",
      notes: { say: ["По шагу, спросите чат, где бы они бросили."], min: 5 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "Каша или порядок? ¦ Tartibsizlik yoki tartib? ¦ Mess or order?",
      chat: "каким экраном вы бы пользовались? ¦ qaysi ekrandan foydalangan bo'lardingiz? ¦ which screen would you use?",
      left: { icon: '🤯', label: "Перегружено ¦ Ortiqcha yuklangan ¦ Overloaded", points: ["10 кнопок одного цвета ¦ Bir xil rangdagi 10 ta tugma ¦ 10 buttons of the same colour", "Мелкий текст ¦ Mayda matn ¦ Tiny text", "Реклама поверх всего ¦ Hamma narsa ustida reklama ¦ Ads on top of everything"] },
      right: { icon: '😌', label: "Спокойно ¦ Xotirjam ¦ Calm", points: ["Одна главная кнопка ¦ Bitta asosiy tugma ¦ One main button", "Крупный текст и воздух ¦ Yirik matn va bo'sh joy ¦ Big text and white space", "Всё на привычных местах ¦ Hammasi odatiy joyida ¦ Everything where you expect"] },
      verdict: "Чем меньше выбора на экране, тем легче сделать главное. ¦ Ekranda tanlov qancha kam bo'lsa, asosiy ishni qilish shuncha oson. ¦ The less choice on screen, the easier the main action.",
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Чем больше кнопок, тем удобнее ¦ Tugmalar qancha ko'p bo'lsa, shuncha qulay ¦ More buttons make an app easier", truth: false, explain: "Много кнопок — человек теряется. ¦ Tugmalar ko'p — odam adashadi. ¦ Too many buttons confuse people." },
        { text: "Корзину лучше ставить туда же, где у других сайтов ¦ Savatni boshqa saytlardagi joyga qo'ygan ma'qul ¦ Put the cart where other sites put it", truth: true, explain: "Люди ищут по привычке — справа сверху. ¦ Odamlar odatga ko'ra qidiradi — yuqori o'ng tomonda. ¦ People look out of habit: top right." },
        { text: "Кнопка должна отвечать на нажатие ¦ Tugma bosishga javob berishi kerak ¦ A button should react to a tap", truth: true, explain: "Иначе человек жмёт снова и снова. ¦ Aks holda odam qayta-qayta bosadi. ¦ Otherwise people tap again and again." },
      ],
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Удобно или неудобно? ¦ Qulaymi yoki noqulaymi? ¦ Easy or annoying?",
      chat: "пишите: «1 — неудобно» ¦ yozing: «1 — noqulay» ¦ write: “1 — annoying”",
      zones: [
        { id: 'good', label: "Удобно ¦ Qulay ¦ Easy", icon: '😌' },
        { id: 'bad', label: "Неудобно ¦ Noqulay ¦ Annoying", icon: '😤' },
      ],
      items: [
        { text: "Поиск сверху на каждой странице ¦ Har sahifada yuqorida qidiruv ¦ Search at the top of every page", zone: 'good' },
        { text: "Окно «подпишитесь!» через 1 секунду ¦ 1 soniyadan keyin «obuna bo'ling!» oynasi ¦ A “subscribe!” pop-up after 1 second", zone: 'bad' },
        { text: "Серый текст на сером фоне ¦ Kulrang fonda kulrang matn ¦ Grey text on a grey background", zone: 'bad' },
        { text: "Большие кнопки на телефоне ¦ Telefonda katta tugmalar ¦ Big buttons on a phone", zone: 'good' },
        { text: "Ошибка в форме подсвечена красным ¦ Formadagi xato qizil bilan ajratilgan ¦ A form error highlighted in red", zone: 'good' },
      ],
      takeaway: "Удобно — когда приложение заботится о человеке. ¦ Qulay — ilova odam haqida qayg'urganda. ¦ Easy means the app takes care of the person.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Сделайте кнопку удобной ¦ Tugmani qulay qiling ¦ Make the button easy",
      chat: "какой цвет кнопки выберем? ¦ tugma uchun qaysi rangni tanlaymiz? ¦ which button colour shall we pick?",
      task: "✍️ Увеличьте кнопку и дайте ей яркий цвет ¦ ✍️ Tugmani kattalashtiring va unga yorqin rang bering ¦ ✍️ Make the button bigger and brighter",
      steps: [{ label: "Кнопка ¦ Tugma ¦ Button", html: '<h2>Sneakers 👟 $49</h2>\n<button class="buy">Buy</button>', css: 'body { font-family: Manrope, system-ui; padding: 30px; }\n.buy {\n  font-size: 12px;\n  padding: 4px 8px;\n  background: #eee;\n  color: #bbb;\n  border: 0;\n  border-radius: 6px;\n  transition: 0.2s;\n}\n.buy:hover {\n  scale: 1.05;\n}' }],
      takeaway: "Пара строк CSS — и кнопку видно с первого взгляда. ¦ Bir-ikki qator CSS — va tugma bir qarashda ko'rinadi. ¦ A couple of CSS lines and the button is visible at a glance.",
      notes: { min: 5 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: спасти приложение ¦ Missiya: ilovani qutqarish ¦ Mission: rescue the app",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Пользователи довольны! ¦ Foydalanuvchilar mamnun! ¦ Users are happy!",
      items: [
        { title: "Люди не находят «Купить» ¦ Odamlar «Sotib olish»ni topa olmayapti ¦ People can't find “Buy”", choices: ["Сделать её крупной и яркой ¦ Uni yirik va yorqin qilish ¦ Make it big and bright", "Добавить ещё 5 кнопок ¦ Yana 5 ta tugma qo'shish ¦ Add 5 more buttons"], correct: 0, explain: "Главное должно бросаться в глаза. ¦ Asosiysi ko'zga tashlanishi kerak. ¦ The main thing must stand out." },
        { title: "Многие уходят на регистрации ¦ Ko'pchilik ro'yxatdan o'tishda ketadi ¦ Many leave at sign-up", choices: ["Убрать лишний шаг ¦ Ortiqcha qadamni olib tashlash ¦ Remove the extra step", "Сделать форму длиннее ¦ Formani uzunroq qilish ¦ Make the form longer"], correct: 0, explain: "Меньше шагов — больше покупок. ¦ Qadamlar kamroq — xaridlar ko'proq. ¦ Fewer steps, more sales." },
        { title: "Жмут кнопку по 5 раз ¦ Tugmani 5 martadan bosishadi ¦ People tap a button 5 times", choices: ["Показать «Готово ✓» ¦ «Tayyor ✓» ko'rsatish ¦ Show “Done ✓”", "Ничего не менять ¦ Hech narsani o'zgartirmaslik ¦ Change nothing"], correct: 0, explain: "Кнопка должна ответить. ¦ Tugma javob berishi kerak. ¦ The button has to answer." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: удобный интерфейс ¦ Xulosa: qulay interfeys ¦ Summary: an easy interface",
      chat: "какое приложение вы бы сделали удобнее и как? ¦ qaysi ilovani qulayroq qilgan bo'lardingiz va qanday? ¦ which app would you make easier, and how?",
      answer: "Удобное приложение не заставляет думать: главная кнопка крупная и яркая, до цели мало шагов, всё лежит на привычных местах, а на каждое нажатие есть понятный ответ. Лишние кнопки, мелкий текст и лишние шаги отпугивают людей. ¦ Qulay ilova o'ylashga majbur qilmaydi: asosiy tugma yirik va yorqin, maqsadgacha kam qadam, hammasi odatiy joyida, har bir bosishga esa tushunarli javob bor. Ortiqcha tugmalar, mayda matn va ortiqcha qadamlar odamlarni qochiradi. ¦ An easy app doesn't make you think: the main button is big and bright, the goal is a few steps away, things sit where you expect, and every tap gets a clear answer. Extra buttons, tiny text and extra steps scare people away.",
      icon: '👆',
      badge: "Друг пользователя ¦ Foydalanuvchi do'sti ¦ User's friend",
      badgeSub: "CSS · общая 1 ¦ CSS · umumiy 1 ¦ CSS · general 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Найдите в любимом приложении одну неудобную вещь и придумайте, как её исправить. ¦ Sevimli ilovangizda bitta noqulay narsani toping va uni qanday tuzatishni o'ylab ko'ring. ¦ Find one annoying thing in your favourite app and think how to fix it.",
        "Сделайте главную кнопку своего сайта крупнее и ярче. ¦ Saytingizning asosiy tugmasini kattaroq va yorqinroq qiling. ¦ Make your site's main button bigger and brighter.",
      ],
      takeaway: "Дальше: заглянем внутрь YouTube через DevTools. ¦ Keyingisi: DevTools orqali YouTube ichiga qaraymiz. ¦ Next: peek inside YouTube with DevTools.",
      notes: { min: 2 },
    },
  ],
});
