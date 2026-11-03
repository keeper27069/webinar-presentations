import { kit } from '@engine/kit';

const PAGE = `<header>Bit Shop</header>\n<main class="grid">\n  <div class="card">👟 Sneakers</div>\n  <div class="card">🎒 Backpack</div>\n  <div class="card">🧢 Cap</div>\n</main>`;
const CSS = `body { margin: 0; font-family: system-ui; }
header { padding: 16px; background: #4d94ff; color: #fff; font-size: 22px; font-weight: 800; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 16px; }
.card { padding: 30px; border-radius: 16px; background: #eef3ff; font-size: 22px; text-align: center; }
@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
  header { text-align: center; }
}`;

export default kit({
  id: 'css-t01',
  title: "Медиазапросы: один сайт для телефона и компьютера ¦ Media so'rovlar: telefon va kompyuter uchun bitta sayt ¦ Media queries: one site for phone and desktop",
  question: "Как одна и та же страница перестраивается под телефон, планшет и компьютер? ¦ Bitta sahifa telefon, planshet va kompyuterga qanday moslashadi? ¦ How does one page rearrange itself for phone, tablet and desktop?",
  route: ["Проблема ¦ Muammo ¦ Problem", "Синтаксис ¦ Sintaksis ¦ Syntax", "Практика ¦ Amaliyot ¦ Practice", "Ошибки ¦ Xatolar ¦ Bugs", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '📱',
      kicker: "CSS · техническая тема 1 ¦ CSS · texnik mavzu 1 ¦ CSS · technical topic 1",
      title: "Сайт на маленьком экране ¦ Kichik ekrandagi sayt ¦ A site on a small screen",
      chat: "с чего вы чаще открываете сайты: телефон или компьютер? ¦ saytlarni ko'proq nimadan ochasiz: telefon yoki kompyuter? ¦ what do you open sites on more: phone or computer?",
      lead: "Больше половины людей открывают сайты с телефона. Три карточки в ряд на экране 375px превращаются в кашу. Как CSS узнаёт ширину экрана? ¦ Odamlarning yarmidan ko'pi saytlarni telefondan ochadi. 375px ekranda uchta kartochka bir qatorda bo'tqaga aylanadi. CSS ekran kengligini qanday biladi? ¦ More than half of people browse on phones. Three cards in a row on a 375px screen turn to mush. How does CSS know the screen width?",
      takeaway: "@media — «если экран такой-то, то примени эти стили». ¦ @media — «agar ekran shunday bo'lsa, bu uslublarni qo'lla». ¦ @media means “if the screen is like this, apply these styles”.",
      notes: { say: ["Спросите чат, с чего смотрят стрим. Большинство — телефон."], min: 3 },
    },
    {
      type: 'browser',
      stage: 0,
      title: "Одна страница — три экрана ¦ Bitta sahifa — uchta ekran ¦ One page, three screens",
      chat: "сколько карточек в ряд на каждом экране? ¦ har bir ekranda bir qatorda nechta kartochka? ¦ how many cards per row on each screen?",
      tabs: [
        { label: "Компьютер ¦ Kompyuter ¦ Desktop", url: 'bit-shop.example', width: 1180, css: CSS, html: PAGE, note: "Шире 900px: три карточки в ряд. ¦ 900px'dan keng: bir qatorda uchta kartochka. ¦ Wider than 900px: three cards per row." },
        { label: "Планшет ¦ Planshet ¦ Tablet", url: 'bit-shop.example', width: 768, css: CSS, html: PAGE, note: "768px: сработал первый медиазапрос — две колонки. ¦ 768px: birinchi media so'rov ishladi — ikki ustun. ¦ 768px: the first media query fires — two columns." },
        { label: "Телефон ¦ Telefon ¦ Phone", url: 'bit-shop.example', width: 375, css: CSS, html: PAGE, note: "375px: сработали оба — одна колонка и шапка по центру. ¦ 375px: ikkalasi ishladi — bitta ustun va markazdagi sarlavha. ¦ 375px: both fire — one column and a centred header." },
      ],
      takeaway: "HTML один, а раскладка меняется по ширине экрана. Это и есть адаптивная вёрстка. ¦ HTML bitta, joylashuv esa ekran kengligiga qarab o'zgaradi. Moslashuvchan vyorstka shu. ¦ One HTML, and the layout changes with screen width. That's responsive design.",
      notes: { say: ["Переключайте 1–3, на вкладке «Код» покажите @media.", "В браузере то же самое: F12 → значок телефона."], min: 4 },
    },
    {
      type: 'walk',
      stage: 1,
      title: "Как читать медиазапрос ¦ Media so'rovni qanday o'qish ¦ How to read a media query",
      chat: "при какой ширине станет одна колонка? ¦ qaysi kenglikda bitta ustun bo'ladi? ¦ at what width does it become one column?",
      lang: 'css',
      code: `.grid {\n  grid-template-columns: repeat(3, 1fr);\n}\n@media (max-width: 900px) {\n  .grid { grid-template-columns: repeat(2, 1fr); }\n}\n@media (max-width: 600px) {\n  .grid { grid-template-columns: 1fr; }\n  header { text-align: center; }\n}`,
      marks: [
        { line: 2, text: "Обычные стили — для всех экранов: три колонки. ¦ Oddiy uslublar — barcha ekranlar uchun: uchta ustun. ¦ Normal styles apply to every screen: three columns." },
        { line: 4, text: "«Если ширина ≤ 900px…» — условие медиазапроса. ¦ «Agar kenglik ≤ 900px bo'lsa…» — media so'rov sharti. ¦ “If the width is ≤ 900px…” — the media query condition." },
        { line: 5, text: "…то колонок две. Это правило перебивает строку 2. ¦ …unda ustunlar ikkita. Bu qoida 2-qatorni bosib o'tadi. ¦ …then two columns. This rule overrides line 2." },
        { line: 7, text: "Ещё уже — ≤ 600px: следующий медиазапрос. ¦ Yanada torroq — ≤ 600px: keyingi media so'rov. ¦ Even narrower — ≤ 600px: the next media query." },
        { line: 8, text: "Одна колонка: карточки друг под другом, как в любом мобильном приложении. ¦ Bitta ustun: kartochkalar ustma-ust, har qanday mobil ilovadagidek. ¦ One column: cards stacked like in any mobile app." },
      ],
      takeaway: "@media (max-width: N) { … } — правила внутри работают, только когда экран не шире N. ¦ @media (max-width: N) { … } — ichidagi qoidalar faqat ekran N'dan keng bo'lmaganda ishlaydi. ¦ @media (max-width: N) { … } — the rules inside apply only when the screen is at most N wide.",
      notes: { say: ["→ по строкам."], answer: "≤ 600px", min: 4 },
    },
    {
      type: 'poll',
      stage: 1,
      title: "Сработает или нет? ¦ Ishlaydimi yoki yo'qmi? ¦ Will it fire?",
      chat: "голосуйте 1–4 ¦ 1–4 bilan ovoz bering ¦ vote 1–4",
      question: "Экран 700px. Какие медиазапросы сработают? ¦ Ekran 700px. Qaysi media so'rovlar ishlaydi? ¦ The screen is 700px. Which media queries fire?",
      options: [
        { label: '(max-width: 600px)', detail: "Нет: 700 > 600 ¦ Yo'q: 700 > 600 ¦ No: 700 > 600" },
        { label: '(max-width: 900px)', detail: "Да: 700 ≤ 900 ✔ ¦ Ha: 700 ≤ 900 ✔ ¦ Yes: 700 ≤ 900 ✔" },
        { label: '(min-width: 1024px)', detail: "Нет: 700 < 1024 ¦ Yo'q: 700 < 1024 ¦ No: 700 < 1024" },
        { label: "Все три ¦ Uchalasi ham ¦ All three" },
      ],
      correct: 1,
      result: "max-width = «не шире», min-width = «не уже». 700px не шире 900 — правило работает. ¦ max-width = «kengroq emas», min-width = «torroq emas». 700px 900'dan keng emas — qoida ishlaydi. ¦ max-width means “at most”, min-width means “at least”. 700px is at most 900, so it fires.",
      takeaway: "max-width — для экранов меньше, min-width — для экранов больше. ¦ max-width — kichikroq ekranlar uchun, min-width — kattaroq ekranlar uchun. ¦ max-width targets smaller screens, min-width targets larger ones.",
      notes: { say: ["Голосование. Нарисуйте на бумаге/в воздухе числовую прямую."], min: 3 },
    },
    {
      type: 'sort',
      stage: 1,
      title: "Какое устройство куда? ¦ Qaysi qurilma qayerga? ¦ Which device goes where?",
      chat: "пишите: «375 — телефон» ¦ yozing: «375 — telefon» ¦ write: “375 — phone”",
      zones: [
        { id: 'phone', label: "Телефон < 600px ¦ Telefon < 600px ¦ Phone < 600px", icon: '📱' },
        { id: 'tab', label: "Планшет 600–1024px ¦ Planshet 600–1024px ¦ Tablet 600–1024px", icon: '📲' },
        { id: 'pc', label: "Компьютер > 1024px ¦ Kompyuter > 1024px ¦ Desktop > 1024px", icon: '🖥️' },
      ],
      items: [
        { text: "iPhone — 390px ¦ iPhone — 390px ¦ iPhone — 390px", zone: 'phone' },
        { text: "Android — 412px ¦ Android — 412px ¦ Android — 412px", zone: 'phone' },
        { text: "iPad — 768px ¦ iPad — 768px ¦ iPad — 768px", zone: 'tab' },
        { text: "Телефон боком — 844px ¦ Yonboshlatilgan telefon — 844px ¦ Phone sideways — 844px", zone: 'tab', why: "Ширина меняется при повороте! ¦ Burilganda kenglik o'zgaradi! ¦ The width changes when you rotate!" },
        { text: "Ноутбук — 1366px ¦ Noutbuk — 1366px ¦ Laptop — 1366px", zone: 'pc' },
        { text: "Монитор — 1920px ¦ Monitor — 1920px ¦ Monitor — 1920px", zone: 'pc' },
      ],
      takeaway: "Точки перелома (breakpoints) примерно 600 и 1024px покрывают большинство устройств. ¦ Taxminan 600 va 1024px'lik burilish nuqtalari (breakpoint) ko'p qurilmalarni qamrab oladi. ¦ Breakpoints around 600 and 1024px cover most devices.",
      notes: { say: ["Раскладка → «Проверить». Ширины — в CSS-пикселях, не в пикселях матрицы."], min: 3 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Mobile first и desktop first ¦ Mobile first va desktop first ¦ Mobile first vs desktop first",
      chat: "с какого экрана вы обычно начинаете верстать? ¦ odatda qaysi ekrandan vyorstka qilishni boshlaysiz? ¦ which screen do you usually start with?",
      left: { icon: '🖥️', label: 'Desktop first', lang: 'css', code: `.grid { columns: 3; }\n\n@media (max-width: 600px) {\n  .grid { columns: 1; }\n}`, points: ["Сначала компьютер, потом «урезаем» ¦ Avval kompyuter, keyin «qisqartiramiz» ¦ Desktop first, then trim down"] },
      right: { icon: '📱', label: 'Mobile first', lang: 'css', code: `.grid { columns: 1; }\n\n@media (min-width: 600px) {\n  .grid { columns: 3; }\n}`, points: ["Сначала телефон, потом «добавляем» ¦ Avval telefon, keyin «qo'shamiz» ¦ Phone first, then add more", "Так делают большинство современных сайтов ¦ Ko'p zamonaviy saytlar shunday qiladi ¦ Most modern sites do this"] },
      verdict: "Оба работают. Mobile first проще: на маленьком экране меньше всего, и вы добавляете, а не удаляете. ¦ Ikkalasi ham ishlaydi. Mobile first osonroq: kichik ekranda eng kam narsa bor va siz o'chirmaysiz, qo'shasiz. ¦ Both work. Mobile first is simpler: small screens have the least, so you add rather than remove.",
      notes: { say: ["→ — правая колонка. Bootstrap, который вы будете учить, тоже mobile first."], min: 3 },
    },
    {
      type: 'live',
      stage: 2,
      title: "Делаем страницу адаптивной ¦ Sahifani moslashuvchan qilamiz ¦ Making the page responsive",
      chat: "какую ширину превью поставим точкой перелома? ¦ qaysi kenglikni burilish nuqtasi qilamiz? ¦ which width shall we use as the breakpoint?",
      task: "✍️ Превью ≈ 850px. Поменяйте 900 на 800 — и увидите, как медиазапрос выключится ¦ ✍️ Prevyu ≈ 850px. 900'ni 800'ga almashtiring — media so'rov o'chganini ko'rasiz ¦ ✍️ The preview is ≈850px. Change 900 to 800 and watch the media query switch off",
      steps: [
        { label: "Без @media ¦ @media'siz ¦ No @media", html: PAGE, css: CSS.split('@media')[0] },
        { label: "С @media ¦ @media bilan ¦ With @media", html: PAGE, css: CSS },
      ],
      takeaway: "Меняя одно число в @media, вы решаете, где телефон, а где компьютер. ¦ @media'dagi bitta sonni o'zgartirib, qayer telefon, qayer kompyuter ekanini hal qilasiz. ¦ By changing one number in @media you decide where “phone” ends and “desktop” begins.",
      notes: { say: ["Шаг 2: поменяйте 900 на 800 и обратно — колонки меняются вживую.", "Предложите чату свой breakpoint."], min: 6 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Почему адаптив не работает? ¦ Nega moslashuv ishlamayapti? ¦ Why isn't responsive working?",
      chat: "номер строки с ошибкой ¦ xato qator raqami ¦ the broken line number",
      snippets: [
        { title: "Забыли единицы ¦ O'lchov birligi unutildi ¦ Missing units", lang: 'css', code: `.menu { display: flex; }\n@media (max-width: 600) {\n  .menu { flex-direction: column; }\n}`, line: 2, explain: "600 без px — браузер не понимает условие. ¦ px'siz 600 — brauzer shartni tushunmaydi. ¦ 600 without px — the browser can't read the condition.", fix: '@media (max-width: 600px) {' },
        { title: "Порядок правил ¦ Qoidalar tartibi ¦ Rule order", lang: 'css', code: `@media (max-width: 600px) {\n  h1 { font-size: 28px; }\n}\nh1 { font-size: 48px; }`, line: 4, explain: "Обычное правило стоит ниже и перебивает медиазапрос. Медиазапросы пишут в конце. ¦ Oddiy qoida pastda turibdi va media so'rovni bosib o'tadi. Media so'rovlar oxirida yoziladi. ¦ The plain rule comes later and overrides the media query. Put media queries last.", fix: "Перенести h1 { … } выше @media ¦ h1 { … }ni @media'dan yuqoriga ko‘chirish ¦ Move h1 { … } above the @media block" },
        { title: "На телефоне всё мелкое ¦ Telefonda hammasi mayda ¦ Everything is tiny on phones", lang: 'html', code: `<head>\n  <meta charset="UTF-8">\n  <title>Bit Shop</title>\n</head>`, line: 2, explain: "Нет meta viewport — телефон «притворяется» компьютером и уменьшает всё. Добавьте её после charset. ¦ meta viewport yo'q — telefon o'zini kompyuterdek ko'rsatib, hammasini kichraytiradi. Uni charset'dan keyin qo'shing. ¦ No meta viewport — the phone pretends to be a desktop and shrinks everything. Add it after charset.", fix: '<meta name="viewport" content="width=device-width, initial-scale=1">' },
      ],
      takeaway: "Три частые ошибки: нет px, медиазапрос выше обычного правила, нет meta viewport. ¦ Uchta keng tarqalgan xato: px yo'q, media so'rov oddiy qoidadan yuqorida, meta viewport yo'q. ¦ Three classic bugs: missing px, the media query above the plain rule, no meta viewport.",
      notes: { say: ["Чат пишет номер строки — вы кликаете."], min: 5 },
    },
    {
      type: 'cheatsheet',
      stage: 4,
      title: "Шпаргалка по медиазапросам ¦ Media so'rovlar shpargalkasi ¦ Media queries cheat sheet",
      sheetTitle: "Адаптив за 4 шага ¦ 4 qadamda moslashuv ¦ Responsive in 4 steps",
      items: [
        { icon: '📱', text: "Обязательно в <head> ¦ <head>'da majburiy ¦ Required in <head>", code: '<meta name="viewport" content="width=device-width, initial-scale=1">' },
        { icon: '⬇️', text: "Для экранов меньше ¦ Kichikroq ekranlar uchun ¦ For smaller screens", code: '@media (max-width: 600px) { … }' },
        { icon: '⬆️', text: "Для экранов больше ¦ Kattaroq ekranlar uchun ¦ For larger screens", code: '@media (min-width: 1024px) { … }' },
        { icon: '📍', text: "Медиазапросы — в конце файла ¦ Media so'rovlar — fayl oxirida ¦ Media queries go last", code: '/* base … */ @media …' },
        { icon: '🔍', text: "Проверка ¦ Tekshiruv ¦ Testing", code: 'F12 → Device toolbar' },
      ],
      columns: 1,
      notes: { say: ["Скриншот на память."], min: 2 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: медиазапросы ¦ Xulosa: media so'rovlar ¦ Summary: media queries",
      chat: "какой блок своего сайта вы сделаете адаптивным первым? ¦ saytingizning qaysi blokini birinchi moslashuvchan qilasiz? ¦ which block of your site will you make responsive first?",
      answer: "@media проверяет ширину экрана и включает нужные стили: max-width — для узких экранов, min-width — для широких. С meta viewport и медиазапросами в конце файла одна страница отлично выглядит и на телефоне, и на компьютере. ¦ @media ekran kengligini tekshirib, kerakli uslublarni yoqadi: max-width — tor ekranlar uchun, min-width — keng ekranlar uchun. meta viewport va fayl oxiridagi media so'rovlar bilan bitta sahifa telefonda ham, kompyuterda ham ajoyib ko'rinadi. ¦ @media checks the screen width and switches on the right styles: max-width for narrow screens, min-width for wide ones. With meta viewport and media queries at the end, one page looks great on phone and desktop.",
      icon: '📱',
      badge: "Адаптивный мастер ¦ Moslashuv ustasi ¦ Responsive master",
      badgeSub: "CSS · техническая 1 ¦ CSS · texnik 1 ¦ CSS · technical 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте в свой проект meta viewport и два медиазапроса. ¦ Loyihangizga meta viewport va ikkita media so'rov qo'shing. ¦ Add meta viewport and two media queries to your project.",
        "Проверьте его в F12 на трёх ширинах: 375, 768, 1366. ¦ Uni F12'da uchta kenglikda tekshiring: 375, 768, 1366. ¦ Test it in F12 at three widths: 375, 768, 1366.",
      ],
      takeaway: "Сначала думайте о телефоне — там сейчас ваши пользователи. ¦ Avval telefon haqida o'ylang — foydalanuvchilaringiz hozir u yerda. ¦ Think phone first — that's where your users are.",
      notes: { say: ["Итог и домашнее задание."], min: 2 },
    },
  ],
});
