import { kit } from '@engine/kit';

const VT_HTML = `<header class="top">
  <b class="logo">▶ VideoTube</b>
  <input class="search" placeholder="Search">
</header>
<main class="grid">
  <div class="video"><div class="thumb"></div><p>Learn CSS in 10 minutes</p></div>
  <div class="video"><div class="thumb"></div><p>My first website</p></div>
  <div class="video"><div class="thumb"></div><p>Top 5 VS Code tips</p></div>
</main>
<button class="subscribe">Subscribe</button>`;

const VT_CSS = `body { margin: 0; font-family: system-ui; background: #0f0f0f; color: #fff; }
.top { display: flex; gap: 20px; align-items: center; padding: 12px 20px; }
.logo { color: #ff3b3b; font-size: 22px; }
.search { flex: 1; padding: 8px 14px; border-radius: 20px; border: 1px solid #333; background: #121212; color: #fff; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; padding: 10px 20px; }
.thumb { height: 90px; border-radius: 12px; background: #333; }
.video p { font-size: 15px; margin: 8px 0; }
.subscribe { margin: 10px 20px; padding: 10px 18px; border: 0; border-radius: 18px; background: #ff3b3b; color: #fff; font-weight: 700; }`;

export default kit({
  id: 'css-g02',
  title: "Заглядываем внутрь сайтов через DevTools ¦ DevTools orqali saytlar ichiga qaraymiz ¦ Looking inside websites with DevTools",
  question: "Можно ли увидеть и поменять CSS любого сайта — даже YouTube? ¦ Istalgan saytning — hatto YouTube'ning ham — CSS'ini ko'rish va o'zgartirish mumkinmi? ¦ Can you see and change the CSS of any site — even YouTube?",
  route: ["Загадка ¦ Topishmoq ¦ Puzzle", "Инструменты ¦ Asboblar ¦ Tools", "Эксперимент ¦ Tajriba ¦ Experiment", "Правда о «взломе» ¦ «Buzish» haqida haqiqat ¦ The truth about “hacking”", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔍',
      kicker: "CSS · общая тема 2 ¦ CSS · umumiy mavzu 2 ¦ CSS · general topic 2",
      title: "Рентген для сайтов ¦ Saytlar uchun rentgen ¦ An X-ray for websites",
      chat: "какой сайт вы бы хотели «разобрать» и посмотреть изнутри? ¦ qaysi saytni «ochib» ichidan ko'rishni xohlardingiz? ¦ which site would you like to take apart and look inside?",
      lead: "В каждом браузере спрятан инструмент разработчика. Он показывает HTML и CSS любой страницы — и позволяет менять их прямо на ходу. ¦ Har bir brauzerda dasturchi asbobi yashiringan. U istalgan sahifaning HTML va CSS'ini ko'rsatadi — va ularni darhol o'zgartirishga imkon beradi. ¦ Every browser hides a developer tool. It shows the HTML and CSS of any page — and lets you change them on the fly.",
      facts: ["Открывается клавишей F12 ¦ F12 tugmasi bilan ochiladi ¦ It opens with F12", "Работает на любом сайте ¦ Istalgan saytda ishlaydi ¦ It works on any site", "Им пользуются все веб-разработчики ¦ Uni barcha veb-dasturchilar ishlatadi ¦ Every web developer uses it"],
      takeaway: "CSS есть у каждого сайта — и его можно подсмотреть, чтобы учиться. ¦ CSS har bir saytda bor — o'rganish uchun uni ko'rish mumkin. ¦ Every site has CSS — and you can peek at it to learn.",
      notes: { say: ["→ — главный вопрос. Можно сразу открыть F12 на любом сайте для интриги."], switch: "Браузер ¦ Brauzer ¦ Browser", min: 3 },
    },
    {
      type: 'poll',
      stage: 0,
      title: "Кто увидит изменения? ¦ O'zgarishlarni kim ko'radi? ¦ Who will see the changes?",
      chat: "голосуйте 1–4 ¦ 1–4 bilan ovoz bering ¦ vote 1–4",
      question: "Вы поменяли цвет кнопки на YouTube через DevTools. Кто это увидит? ¦ DevTools orqali YouTube'dagi tugma rangini o'zgartirdingiz. Buni kim ko'radi? ¦ You changed a button colour on YouTube with DevTools. Who will see it?",
      options: [
        { label: "Все пользователи YouTube ¦ YouTube'ning barcha foydalanuvchilari ¦ Every YouTube user" },
        { label: "Только вы, до перезагрузки ¦ Faqat siz, qayta yuklagungacha ¦ Only you, until you reload", detail: "Верно ✔ ¦ To'g'ri ✔ ¦ Correct ✔" },
        { label: "Ваши друзья ¦ Do'stlaringiz ¦ Your friends" },
        { label: "Никто — YouTube запретит ¦ Hech kim — YouTube ruxsat bermaydi ¦ Nobody — YouTube blocks it" },
      ],
      correct: 1,
      result: "DevTools меняет копию страницы в вашем браузере. Сервер YouTube об этом не знает, а после F5 всё вернётся. ¦ DevTools brauzeringizdagi sahifa nusxasini o'zgartiradi. YouTube serveri bundan bexabar, F5'dan keyin hammasi qaytadi. ¦ DevTools edits the copy of the page in your browser. YouTube's server never knows, and after F5 it all comes back.",
      takeaway: "DevTools — безопасная песочница: экспериментируйте сколько угодно. ¦ DevTools — xavfsiz qumdon: xohlagancha tajriba qiling. ¦ DevTools is a safe sandbox: experiment as much as you like.",
      notes: { say: ["Голосование. Многие думают, что «взломают» сайт — разберём это ещё раз в конце."], answer: "Только вы, до перезагрузки.", min: 3 },
    },
    {
      type: 'flow',
      stage: 1,
      title: "Как открыть и пользоваться DevTools ¦ DevTools'ni qanday ochish va ishlatish ¦ Opening and using DevTools",
      chat: "у кого Chrome, у кого другой браузер? ¦ kimda Chrome, kimda boshqa brauzer? ¦ who uses Chrome, who uses something else?",
      nodes: [
        { icon: '⌨️', label: 'F12', text: "Или Ctrl+Shift+I (на Mac — Cmd+Option+I), или правый клик → «Просмотреть код». ¦ Yoki Ctrl+Shift+I (Mac'da — Cmd+Option+I), yoki o'ng tugma → «Kodni ko'rish». ¦ Or Ctrl+Shift+I (Mac: Cmd+Option+I), or right-click → Inspect." },
        { icon: '🖱️', label: "Стрелка ¦ Strelka ¦ Picker", text: "Нажмите значок стрелки и кликните по любому элементу страницы. ¦ Strelka belgisini bosing va sahifaning istalgan elementini bosing. ¦ Click the arrow icon, then click any element on the page." },
        { icon: '🌳', label: 'Elements', text: "Слева подсветится его HTML в дереве. ¦ Chapda uning HTML'i daraxtda belgilanadi. ¦ On the left its HTML is highlighted in the tree." },
        { icon: '🎨', label: 'Styles', text: "Справа — все CSS-правила этого элемента. Зачёркнутые не действуют. ¦ O'ngda — shu elementning barcha CSS qoidalari. Chizilganlari amal qilmaydi. ¦ On the right are all its CSS rules. Crossed-out ones are overridden." },
        { icon: '✏️', label: "Меняем ¦ O'zgartiramiz ¦ Edit", text: "Кликните по значению — например, цвету — и введите своё. Страница меняется сразу. ¦ Qiymatni — masalan, rangni — bosing va o'zingiznikini kiriting. Sahifa darhol o'zgaradi. ¦ Click a value — say, a colour — and type your own. The page updates instantly." },
      ],
      takeaway: "F12 → стрелка → элемент → Styles → меняем. Пять шагов до любого CSS. ¦ F12 → strelka → element → Styles → o'zgartiramiz. Istalgan CSS'gacha besh qadam. ¦ F12 → picker → element → Styles → edit. Five steps to any CSS.",
      notes: { say: ["Покажите каждый шаг вживую на любом сайте."], switch: "Браузер: F12 ¦ Brauzer: F12 ¦ Browser: F12", min: 5 },
    },
    {
      type: 'cards',
      stage: 1,
      title: "Главные вкладки DevTools ¦ DevTools'ning asosiy tablari ¦ The main DevTools tabs",
      chat: "какая вкладка, по-вашему, нужна для телефона? ¦ sizningcha, telefon uchun qaysi tab kerak? ¦ which tab do you think is for phones?",
      cards: [
        { icon: '🌳', front: 'Elements', back: "Дерево HTML: можно менять текст и теги. ¦ HTML daraxti: matn va teglarni o'zgartirish mumkin. ¦ The HTML tree: edit text and tags." },
        { icon: '🎨', front: 'Styles', back: "CSS выбранного элемента: цвета, размеры, отступы. ¦ Tanlangan elementning CSS'i: ranglar, o'lchamlar, bo'shliqlar. ¦ The selected element's CSS: colours, sizes, spacing." },
        { icon: '📦', front: 'Computed', back: "Итоговые значения и схема box model: margin, border, padding. ¦ Yakuniy qiymatlar va box model sxemasi: margin, border, padding. ¦ Final values and the box model diagram: margin, border, padding." },
        { icon: '💬', front: 'Console', back: "Ошибки и сообщения JavaScript. Пригодится в модуле JS. ¦ JavaScript xatolari va xabarlari. JS modulida kerak bo'ladi. ¦ JavaScript errors and messages. Useful in the JS module." },
        { icon: '📡', front: 'Network', back: "Какие файлы грузит страница и сколько они весят. ¦ Sahifa qaysi fayllarni yuklaydi va ular qancha og'irlikda. ¦ Which files the page loads and how heavy they are." },
        { icon: '📱', front: 'Device toolbar', back: "Значок телефона: как сайт выглядит на iPhone или Android. ¦ Telefon belgisi: sayt iPhone yoki Android'da qanday ko'rinadi. ¦ The phone icon: how the site looks on an iPhone or Android." },
      ],
      takeaway: "Elements + Styles — ваши главные инструменты в модуле CSS. ¦ Elements + Styles — CSS modulidagi asosiy asboblaringiz. ¦ Elements + Styles are your main tools in the CSS module.",
      notes: { say: ["Открывайте 1–6 и показывайте каждую вкладку в браузере."], min: 4 },
    },
    {
      type: 'walk',
      stage: 2,
      title: "Читаем стили кнопки «Подписаться» ¦ «Obuna bo'lish» tugmasi uslublarini o'qiymiz ¦ Reading the Subscribe button's styles",
      chat: "какое свойство делает кнопку круглой? ¦ qaysi xususiyat tugmani yumaloq qiladi? ¦ which property makes the button rounded?",
      lang: 'css',
      code: `.subscribe {\n  background: #ff3b3b;\n  color: #fff;\n  border: 0;\n  border-radius: 18px;\n  padding: 10px 18px;\n  font-weight: 700;\n  cursor: pointer;\n}`,
      marks: [
        { line: 1, text: "Селектор: правило для элементов с классом subscribe. ¦ Selektor: subscribe klassli elementlar uchun qoida. ¦ The selector: a rule for elements with class subscribe." },
        { line: 2, text: "Фирменный красный цвет фона. Кликнув по квадратику, можно выбрать любой цвет. ¦ Firma qizil fon rangi. Kvadratchani bosib istalgan rangni tanlash mumkin. ¦ The brand red background. Click the swatch to pick any colour." },
        { line: 5, text: "border-radius скругляет углы. 18px при высоте 36px — «таблетка». ¦ border-radius burchaklarni yumaloqlaydi. 36px balandlikda 18px — «tabletka». ¦ border-radius rounds the corners. 18px on a 36px button makes a pill." },
        { line: 6, text: "padding — внутренний отступ: от него зависит размер кнопки. ¦ padding — ichki bo'shliq: tugma o'lchami shunga bog'liq. ¦ padding is inner spacing — it sets the button's size." },
        { line: 8, text: "cursor: pointer — курсор-рука при наведении. ¦ cursor: pointer — ustiga olib borilganda qo'l kursor. ¦ cursor: pointer shows a hand on hover." },
      ],
      takeaway: "Знакомые свойства — те же, что вы пишете на уроках. Большие сайты сделаны из того же CSS. ¦ Tanish xususiyatlar — darsda yozadiganlaringiz. Katta saytlar ham o'sha CSS'dan yasalgan. ¦ The properties are the same ones you write in class. Big sites are made of the same CSS.",
      notes: { say: ["Это упрощённый пример. На настоящем YouTube классы длиннее, но свойства те же."], min: 4 },
    },
    {
      type: 'live',
      stage: 2,
      title: "Перекрашиваем «VideoTube» ¦ «VideoTube»ni qayta bo'yaymiz ¦ Repainting “VideoTube”",
      chat: "какой цвет дадим логотипу и кнопке? ¦ logotip va tugmaga qanday rang beramiz? ¦ what colour for the logo and the button?",
      task: "✍️ Меняем CSS по заявкам чата, как в DevTools ¦ ✍️ CSS'ni chat so'rovi bo'yicha DevTools'dagidek o'zgartiramiz ¦ ✍️ Change the CSS as the chat asks, like in DevTools",
      steps: [
        { label: "Оригинал ¦ Asl ¦ Original", html: VT_HTML, css: VT_CSS },
        { label: "Светлая тема ¦ Och mavzu ¦ Light theme", html: VT_HTML, css: VT_CSS.replace('background: #0f0f0f; color: #fff;', 'background: #fff; color: #111;').replace('background: #121212; color: #fff;', 'background: #f2f2f2; color: #111;') },
        { label: "Своя тема ¦ O'z mavzusi ¦ Custom theme", html: VT_HTML, css: VT_CSS.replaceAll('#ff3b3b', '#7c5cff').replace('border-radius: 12px; background: #333;', 'border-radius: 24px; background: linear-gradient(135deg,#7c5cff,#3ee6ff);') },
      ],
      takeaway: "Поменяли пару значений — и сайт выглядит совсем иначе. Так дизайнеры пробуют идеи в DevTools. ¦ Bir-ikki qiymatni o'zgartirdik — sayt butunlay boshqacha ko'rinadi. Dizaynerlar g'oyalarni DevTools'da shunday sinaydi. ¦ Change a couple of values and the site looks totally different. Designers try ideas in DevTools this way.",
      notes: { say: ["Это учебная копия-пародия (VideoTube), не настоящий YouTube.", "Потом повторите на реальном сайте в DevTools."], switch: "Браузер: F12 ¦ Brauzer: F12 ¦ Browser: F12", min: 6 },
    },
    {
      type: 'dialog',
      stage: 3,
      title: "«Я взломал YouTube!» ¦ «Men YouTube'ni buzdim!» ¦ “I hacked YouTube!”",
      chat: "что случится после обновления страницы? ¦ sahifani yangilagandan keyin nima bo'ladi? ¦ what happens after a page refresh?",
      a: { name: "Ученик ¦ O'quvchi ¦ Student", icon: '😎' },
      b: { name: "Ментор ¦ Mentor ¦ Mentor", icon: '🧑‍🏫' },
      messages: [
        { from: 'a', text: "Смотрите! Я поменял в DevTools число подписчиков на 10 млн! ¦ Qarang! DevTools'da obunachilar sonini 10 mln'ga o'zgartirdim! ¦ Look! I changed my subscriber count to 10 million in DevTools!" },
        { from: 'b', text: "Отлично. А теперь нажми F5. ¦ Zo'r. Endi F5'ni bos. ¦ Nice. Now press F5." },
        { from: 'a', text: "…Всё вернулось 😢 ¦ …Hammasi qaytdi 😢 ¦ …It all went back 😢", flag: "Изменения были только у тебя ¦ O'zgarishlar faqat senda edi ¦ The change was only on your screen" },
        { from: 'b', text: "DevTools меняет копию страницы в твоём браузере. Настоящие данные лежат на сервере. ¦ DevTools brauzeringdagi sahifa nusxasini o'zgartiradi. Haqiqiy ma'lumotlar serverda. ¦ DevTools edits the copy in your browser. The real data lives on the server.", good: "Это не взлом, а учебный инструмент ¦ Bu buzish emas, o'quv asbobi ¦ It's a learning tool, not a hack" },
        { from: 'b', text: "Кстати, так же делают фейковые «скриншоты» — не верьте им без проверки. ¦ Aytgancha, soxta «skrinshot»lar ham shunday qilinadi — tekshirmasdan ishonmang. ¦ By the way, fake “screenshots” are made the same way — don't trust them blindly." },
      ],
      takeaway: "DevTools не взламывает сайты. Зато он показывает, как легко подделать скриншот. ¦ DevTools saytlarni buzmaydi. Lekin skrinshotni qalbakilashtirish qanchalik osonligini ko'rsatadi. ¦ DevTools doesn't hack sites. But it shows how easy it is to fake a screenshot.",
      notes: { say: ["Важный момент цифровой грамотности: «скриншот переписки/баланса» легко подделать."], min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф о DevTools ¦ DevTools haqida haqiqat yoki afsona ¦ DevTools: true or myth",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Изменения в DevTools сохраняются навсегда ¦ DevTools'dagi o'zgarishlar abadiy saqlanadi ¦ DevTools changes are saved forever", truth: false, explain: "Только до перезагрузки, и только у вас. ¦ Faqat qayta yuklagungacha va faqat sizda. ¦ Only until reload, and only for you." },
        { text: "Можно узнать шрифт и цвет любого сайта ¦ Istalgan saytning shrifti va rangini bilish mumkin ¦ You can find any site's font and colour", truth: true, explain: "Styles и Computed покажут точные значения. ¦ Styles va Computed aniq qiymatlarni ko'rsatadi. ¦ Styles and Computed show the exact values." },
        { text: "Ctrl+U показывает исходный HTML страницы ¦ Ctrl+U sahifaning asl HTML'ini ko'rsatadi ¦ Ctrl+U shows the page's source HTML", truth: true, explain: "Это «Просмотр кода страницы» — как она пришла с сервера. ¦ Bu «Sahifa kodini ko'rish» — serverdan qanday kelgan bo'lsa. ¦ It's View Source — the page as it came from the server." },
        { text: "DevTools есть только у программистов ¦ DevTools faqat dasturchilarda bor ¦ Only programmers have DevTools", truth: false, explain: "Он встроен в Chrome, Edge, Firefox, Safari — у всех. ¦ U Chrome, Edge, Firefox, Safari'ga o'rnatilgan — hammada bor. ¦ It is built into Chrome, Edge, Firefox and Safari — everyone has it." },
      ],
      takeaway: "Подсматривать стили — нормально и полезно. Копировать чужой сайт целиком — нет. ¦ Uslublarni ko'rish — normal va foydali. Boshqaning saytini to'liq ko'chirish — yo'q. ¦ Peeking at styles is normal and useful. Copying someone's whole site is not.",
      notes: { say: ["Голосуем по пунктам. Подчеркните этику: учиться можно, присваивать чужой дизайн — нет."], min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какая вкладка нужна? ¦ Qaysi tab kerak? ¦ Which tab do you need?",
      chat: "пишите: «поменять цвет — Styles» ¦ yozing: «rangni o'zgartirish — Styles» ¦ write: “change a colour — Styles”",
      zones: [
        { id: 'el', label: 'Elements', icon: '🌳' },
        { id: 'st', label: 'Styles', icon: '🎨' },
        { id: 'dev', label: 'Device toolbar', icon: '📱' },
        { id: 'net', label: 'Network', icon: '📡' },
      ],
      items: [
        { text: "Поменять текст заголовка ¦ Sarlavha matnini o'zgartirish ¦ Change a heading's text", zone: 'el' },
        { text: "Найти тег кнопки ¦ Tugma tegini topish ¦ Find the button's tag", zone: 'el' },
        { text: "Узнать цвет фона ¦ Fon rangini bilish ¦ Find the background colour", zone: 'st' },
        { text: "Попробовать другой отступ ¦ Boshqa bo'shliqni sinash ¦ Try a different margin", zone: 'st' },
        { text: "Посмотреть сайт как на iPhone ¦ Saytni iPhone'dagidek ko'rish ¦ See the site as on an iPhone", zone: 'dev' },
        { text: "Узнать, какая картинка тяжёлая ¦ Qaysi rasm og'irligini bilish ¦ Find which image is heavy", zone: 'net' },
      ],
      takeaway: "Каждая вкладка отвечает на свой вопрос: что это, как выглядит, как на телефоне, что грузится. ¦ Har bir tab o'z savoliga javob beradi: bu nima, qanday ko'rinadi, telefonda qanday, nima yuklanadi. ¦ Each tab answers its own question: what is it, how does it look, how on a phone, what loads.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'board',
      stage: 3,
      title: "Охота за стилями ¦ Uslublar ovi ¦ Style hunting",
      chat: "назовите сайт и что хотите у него подсмотреть ¦ sayt nomini va undan nimani ko'rmoqchi ekaningizni yozing ¦ name a site and what you want to peek at",
      seeds: ["Шрифт заголовков на kun.uz ¦ kun.uz'dagi sarlavha shrifti ¦ The heading font on a news site"],
      placeholder: "Заявка из чата… ¦ Chatdagi so'rov… ¦ A request from chat…",
      footer: "Ментор открывает сайт и ищет ответ в DevTools ¦ Mentor saytni ochib, javobni DevTools'da qidiradi ¦ The mentor opens the site and finds the answer in DevTools",
      takeaway: "Видите красивую кнопку — откройте DevTools и узнайте, как она сделана. ¦ Chiroyli tugmani ko'rdingizmi — DevTools'ni oching va qanday yasalganini biling. ¦ See a nice button? Open DevTools and learn how it was made.",
      notes: { say: ["Выполните 2–3 заявки чата вживую."], switch: "Браузер ¦ Brauzer ¦ Browser", min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: детектив DevTools ¦ Missiya: DevTools detektivi ¦ Mission: DevTools detective",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Дело раскрыто! ¦ Ish ochildi! ¦ Case closed!",
      items: [
        { title: "Как открыть DevTools? ¦ DevTools'ni qanday ochish mumkin? ¦ How do you open DevTools?", choices: ['F12', 'Ctrl+S', 'Alt+F4'], correct: 0, explain: "F12 или Ctrl+Shift+I. ¦ F12 yoki Ctrl+Shift+I. ¦ F12 or Ctrl+Shift+I." },
        { title: "Зачёркнутое свойство в Styles… ¦ Styles'dagi chizilgan xususiyat… ¦ A crossed-out property in Styles…", choices: ["Сломано ¦ Buzilgan ¦ Is broken", "Перебито другим правилом ¦ Boshqa qoida bilan bosilgan ¦ Is overridden by another rule", "Секретное ¦ Maxfiy ¦ Is secret"], correct: 1, explain: "Сработало более сильное правило. ¦ Kuchliroq qoida ishladi. ¦ A stronger rule won." },
        { title: "Как посмотреть сайт как на телефоне? ¦ Saytni telefondagidek qanday ko'rish mumkin? ¦ How to preview a site on a phone?", choices: ['Network', 'Device toolbar', 'Console'], correct: 1, explain: "Значок телефона в DevTools. ¦ DevTools'dagi telefon belgisi. ¦ The phone icon in DevTools." },
        { title: "Друг прислал «скриншот» с 10 млн подписчиков ¦ Do'stingiz 10 mln obunachili «skrinshot» yubordi ¦ A friend sends a “screenshot” with 10M subscribers", choices: ["Сразу верю ¦ Darhol ishonaman ¦ Believe it", "Могли подделать в DevTools ¦ DevTools'da qalbakilashtirilgan bo'lishi mumkin ¦ It could be faked in DevTools"], correct: 1, explain: "Проверяйте на самом сайте. ¦ Saytning o'zida tekshiring. ¦ Check on the site itself." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 4 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: DevTools ¦ Xulosa: DevTools ¦ Summary: DevTools",
      chat: "чей CSS вы подсмотрите сегодня вечером? ¦ bugun kechqurun kimning CSS'ini ko'rasiz? ¦ whose CSS will you peek at tonight?",
      answer: "У каждого сайта есть HTML и CSS, и F12 показывает их. В DevTools можно безопасно экспериментировать: изменения видите только вы и только до перезагрузки. ¦ Har bir saytda HTML va CSS bor, F12 ularni ko'rsatadi. DevTools'da xavfsiz tajriba qilish mumkin: o'zgarishlarni faqat siz va faqat qayta yuklagungacha ko'rasiz. ¦ Every site has HTML and CSS, and F12 shows them. DevTools is a safe place to experiment: only you see changes, and only until you reload.",
      icon: '🔍',
      badge: "Детектив стилей ¦ Uslublar detektivi ¦ Style detective",
      badgeSub: "CSS · тема 2 ¦ CSS · mavzu 2 ¦ CSS · topic 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Найдите в DevTools шрифт и главный цвет трёх любимых сайтов. ¦ DevTools'da uchta sevimli saytning shrifti va asosiy rangini toping. ¦ Use DevTools to find the font and main colour of three favourite sites.",
        "Перекрасьте любой сайт и сделайте скриншот «до/после». ¦ Istalgan saytni qayta bo'yang va «oldin/keyin» skrinshot qiling. ¦ Repaint any site and take a before/after screenshot.",
      ],
      takeaway: "Лучший учебник CSS — сайты вокруг вас. ¦ Eng yaxshi CSS darsligi — atrofingizdagi saytlar. ¦ The best CSS textbook is the websites around you.",
      notes: { say: ["Итог, домашнее задание."], min: 3 },
    },
  ],
});
