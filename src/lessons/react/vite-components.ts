import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#f4f6fb;color:#1b2150}
header{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;background:#1b2150;color:#fff}
nav a{color:#9fe8ff;margin-left:14px;text-decoration:none}
.hero{padding:26px 20px;text-align:center}.hero h1{margin:0 0 6px;font-size:30px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:0 20px}
.card{background:#fff;border-radius:14px;padding:14px;text-align:center;box-shadow:0 4px 14px #0001}
.card div{font-size:36px}footer{text-align:center;padding:16px;color:#6b7390;font-size:14px}`;
const JS = `function Header() {
  return (
    <header>
      <b>🍩 Donut Lab</b>
      <nav><a href="#">Menu</a><a href="#">Contacts</a></nav>
    </header>
  );
}

function Card({ icon, title }) {
  return <div className="card"><div>{icon}</div>{title}</div>;
}

function App() {
  return (
    <>
      <Header />
      <section className="hero"><h1>Fresh donuts daily</h1></section>
      <div className="cards">
        <Card icon="🍩" title="Classic" />
        <Card icon="🍫" title="Chocolate" />
        <Card icon="🍓" title="Berry" />
      </div>
      <footer>© Donut Lab</footer>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

export default kit({
  id: 'react-t01',
  title: "React (Vite) и компоненты ¦ React (Vite) va komponentlar ¦ React (Vite) and components",
  question: "Почему большие сайты собирают из маленьких переиспользуемых частей? ¦ Nega katta saytlar kichik qayta ishlatiladigan qismlardan yig'iladi? ¦ Why are big sites built from small reusable parts?",
  route: ["Проект на Vite ¦ Vite'dagi loyiha ¦ A Vite project", "Первый компонент ¦ Birinchi komponent ¦ First component", "props ¦ props ¦ props", "Правила JSX ¦ JSX qoidalari ¦ JSX rules", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '⚛️',
      kicker: "React · техническая тема 1 ¦ React · texnik mavzu 1 ¦ React · technical topic 1",
      title: "Сайт из LEGO-деталей ¦ LEGO detallaridan sayt ¦ A website made of LEGO pieces",
      chat: "на какие части вы бы разрезали главную YouTube? ¦ YouTube bosh sahifasini qaysi qismlarga bo'lgan bo'lardingiz? ¦ what parts would you cut YouTube's home page into?",
      lead: "React — библиотека для интерфейсов. Страницу делят на компоненты: шапка, карточка, кнопка. Каждый компонент — функция, которая возвращает кусочек экрана. Vite за секунды создаёт для этого проект. ¦ React — interfeyslar uchun kutubxona. Sahifa komponentlarga bo'linadi: sarlavha, kartochka, tugma. Har bir komponent — ekran bo'lagini qaytaradigan funksiya. Vite buning uchun loyihani soniyalarda yaratadi. ¦ React is a UI library. A page is split into components: a header, a card, a button. Each is a function returning a piece of screen. Vite creates the project in seconds.",
      facts: ["Vite — быстрый старт проекта ¦ Vite — loyihaning tez boshlanishi ¦ Vite: a fast project start", "Компонент — функция с JSX ¦ Komponent — JSX'li funksiya ¦ A component is a function with JSX", "props — данные для компонента ¦ props — komponent uchun ma'lumot ¦ props: data for a component"],
      takeaway: "Сегодня соберём сайт кафе из пяти компонентов. ¦ Bugun kafe saytini beshta komponentdan yig'amiz. ¦ Today we'll build a café site from five components.",
      notes: { say: ["Перед уроком установите Node.js. В презентации React работает прямо в редакторе — без установки."], min: 3 },
    },
    {
      type: 'terminal',
      stage: 0,
      title: "Создаём проект ¦ Loyiha yaratamiz ¦ Creating the project",
      chat: "как назовём проект? ¦ loyihani qanday nomlaymiz? ¦ what shall we name the project?",
      lines: [
        { cmd: 'npm create vite@latest donut-lab', out: ['✔ Select a framework: › React', '✔ Select a variant: › JavaScript'], note: "Vite спрашивает фреймворк и язык — выбираем React и JavaScript. ¦ Vite freymvork va tilni so'raydi — React va JavaScript'ni tanlaymiz. ¦ Vite asks for a framework and language — pick React and JavaScript." },
        { cmd: 'cd donut-lab && npm install', out: ['added 150+ packages'], note: "Скачиваем зависимости: React и инструменты. ¦ Bog'liqliklarni yuklaymiz: React va vositalar. ¦ Download dependencies: React and tooling." },
        { cmd: 'npm run dev', out: ['VITE ready in 300 ms', '➜  Local:   http://localhost:5173/'], note: "Сервер разработки. Сохранили файл — страница обновилась сама. ¦ Ishlab chiqish serveri. Faylni saqladik — sahifa o'zi yangilandi. ¦ The dev server. Save a file and the page updates itself." },
      ],
      takeaway: "Три команды — и React-проект работает на localhost:5173. ¦ Uchta buyruq — va React loyihasi localhost:5173'da ishlaydi. ¦ Three commands and a React project runs on localhost:5173.",
      notes: { say: ["Повторите вживую; вывод и число пакетов у вас будут немного другими."], switch: "Терминал ¦ Terminal ¦ Terminal", min: 5 },
    },
    {
      type: 'walk',
      stage: 0,
      title: "Что внутри проекта ¦ Loyiha ichida nima bor ¦ What's inside the project",
      chat: "в каком файле мы будем писать код? ¦ qaysi faylda kod yozamiz? ¦ which file will we write code in?",
      code: `donut-lab/\n├── index.html        ← one page, one <div id="root">\n├── package.json      ← project name and packages\n└── src/\n    ├── main.jsx      ← puts <App /> into #root\n    ├── App.jsx       ← the main component\n    └── components/\n        ├── Header.jsx\n        └── Card.jsx`,
      lang: 'text',
      marks: [
        { line: 2, text: "Всего одна HTML-страница — всё остальное React рисует сам. ¦ Bor-yo'g'i bitta HTML sahifa — qolganini React o'zi chizadi. ¦ Just one HTML page — React draws everything else." },
        { line: 5, text: "main.jsx запускает приложение. ¦ main.jsx ilovani ishga tushiradi. ¦ main.jsx starts the app." },
        { line: 6, text: "App.jsx — главный компонент, здесь собираем страницу. ¦ App.jsx — asosiy komponent, sahifani shu yerda yig'amiz. ¦ App.jsx is the main component where we assemble the page." },
        { line: 7, text: "Папку components создаём сами: один компонент — один файл. ¦ components papkasini o'zimiz yaratamiz: bitta komponent — bitta fayl. ¦ We create components ourselves: one component per file." },
      ],
      takeaway: ".jsx — это JavaScript, в котором можно писать HTML-подобную разметку. ¦ .jsx — HTML'ga o'xshash belgilash yozish mumkin bo'lgan JavaScript. ¦ .jsx is JavaScript where you can write HTML-like markup.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 1,
      react: true,
      title: "Сайт из компонентов ¦ Komponentlardan sayt ¦ A site made of components",
      chat: "какой пончик добавить? иконка и название! ¦ qanday ponchik qo'shamiz? belgi va nom! ¦ which donut shall we add? icon and name!",
      task: "✍️ Добавьте ещё одну <Card ... /> и нажмите ▶ ¦ ✍️ Yana bitta <Card ... /> qo'shing va ▶ ni bosing ¦ ✍️ Add another <Card ... /> and press ▶",
      steps: [
        { label: "Donut Lab ¦ Donut Lab ¦ Donut Lab", html: '<div id="root"></div>', css: CSS, js: JS },
      ],
      takeaway: "Header, Card и App — функции. <Card /> вызывает компонент, а icon и title передаются как props. ¦ Header, Card va App — funksiyalar. <Card /> komponentni chaqiradi, icon va title esa props sifatida uzatiladi. ¦ Header, Card and App are functions. <Card /> calls the component, and icon and title arrive as props.",
      notes: { say: ["В настоящем проекте Header и Card лежали бы в отдельных файлах с export/import."], min: 8 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Обычный HTML и компоненты ¦ Oddiy HTML va komponentlar ¦ Plain HTML vs components",
      chat: "сколько строк поменять, если у карточки появится цена? ¦ kartochkada narx paydo bo'lsa, nechta qatorni o'zgartirish kerak? ¦ how many lines change if cards get a price?",
      left: { icon: '📄', label: 'HTML', code: `<div class="card">🍩 Classic</div>\n<div class="card">🍫 Chocolate</div>\n<div class="card">🍓 Berry</div>`, lang: 'html' },
      right: { icon: '⚛️', label: "Компонент ¦ Komponent ¦ Component", code: `function Card({ icon, title }) {\n  return (\n    <div className="card">{icon} {title}</div>\n  );\n}\n\n<Card icon="🍩" title="Classic" />\n<Card icon="🍫" title="Chocolate" />`, lang: 'js' },
      verdict: "Изменили Card один раз — обновились все карточки. В HTML пришлось бы править каждую. ¦ Card'ni bir marta o'zgartirdik — barcha kartochkalar yangilandi. HTML'da har birini tahrirlash kerak bo'lardi. ¦ Change Card once and every card updates. In HTML you'd edit each one.",
      notes: { min: 4 },
    },
    {
      type: 'cards',
      stage: 3,
      title: "Правила JSX ¦ JSX qoidalari ¦ JSX rules",
      chat: "какое правило самое неожиданное? ¦ qaysi qoida eng kutilmagan? ¦ which rule is most surprising?",
      cards: [
        { icon: '🔠', front: "Имя с большой буквы ¦ Bosh harfli nom ¦ Capitalised names", back: "<Card /> — компонент, <card /> — React решит, что это HTML-тег. ¦ <Card /> — komponent, <card /> — React buni HTML-teg deb o'ylaydi. ¦ <Card /> is a component; <card /> is treated as an HTML tag." },
        { icon: '📦', front: "Один корень ¦ Bitta ildiz ¦ One root", back: "Возвращаем один элемент. Несколько — оборачиваем в <>…</>. ¦ Bitta element qaytaramiz. Bir nechtasini <>…</> ga o'raymiz. ¦ Return one element. Wrap several in <>…</>." },
        { icon: '🏷️', front: 'className', back: "Вместо class пишем className — class занято в JavaScript. ¦ class o'rniga className yozamiz — class JavaScript'da band. ¦ Write className instead of class — class is taken in JavaScript." },
        { icon: '🧮', front: "{ } — JavaScript ¦ { } — JavaScript ¦ { } is JavaScript", back: "Внутри фигурных скобок — любое выражение: {price * 2}. ¦ Figurali qavslar ichida — istalgan ifoda: {price * 2}. ¦ Curly braces hold any expression: {price * 2}." },
        { icon: '🔚', front: "Закрывать теги ¦ Teglarni yopish ¦ Close every tag", back: "<img />, <input />, <br /> — со слешем. ¦ <img />, <input />, <br /> — slesh bilan. ¦ <img />, <input />, <br /> — with a slash." },
      ],
      takeaway: "JSX похож на HTML, но это JavaScript — отсюда className и { }. ¦ JSX HTML'ga o'xshaydi, lekin bu JavaScript — shuning uchun className va { }. ¦ JSX looks like HTML but is JavaScript — hence className and { }.",
      notes: { min: 5 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Найдите ошибку ¦ Xatoni toping ¦ Find the bug",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Компонент не появился ¦ Komponent paydo bo'lmadi ¦ The component didn't appear", lang: 'js', code: `function badge() {\n  return <span className="badge">NEW</span>;\n}\n\n<badge />`, line: 1, explain: "Имя с маленькой буквы — React ищет HTML-тег <badge>. Компоненты называют с большой. ¦ Kichik harfli nom — React <badge> HTML-tegini qidiradi. Komponentlar bosh harf bilan nomlanadi. ¦ A lowercase name makes React look for an HTML <badge> tag. Capitalise components.", fix: `function Badge() {` },
        { title: "Два корня ¦ Ikki ildiz ¦ Two roots", lang: 'js', code: `function Hero() {\n  return (\n    <h1>Donuts</h1>\n    <p>Fresh daily</p>\n  );\n}`, line: 3, explain: "Компонент должен вернуть один элемент. Оборачиваем в фрагмент <>…</>. ¦ Komponent bitta element qaytarishi kerak. <>…</> fragmentiga o'raymiz. ¦ A component must return one element. Wrap them in a <>…</> fragment.", fix: `return (\n  <>\n    <h1>Donuts</h1>\n    <p>Fresh daily</p>\n  </>\n);` },
      ],
      takeaway: "Две самые частые ошибки в JSX — маленькая буква и несколько корней. ¦ JSX'dagi ikki eng keng tarqalgan xato — kichik harf va bir nechta ildiz. ¦ The two most common JSX bugs: a lowercase name and multiple roots.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Компонент или нет? ¦ Komponentmi yoki yo'qmi? ¦ Component or not?",
      chat: "пишите: «1 — компонент» ¦ yozing: «1 — komponent» ¦ write: “1 — component”",
      zones: [
        { id: 'yes', label: "Стоит сделать компонентом ¦ Komponent qilish kerak ¦ Worth a component", icon: '🧩' },
        { id: 'no', label: "Простой тег ¦ Oddiy teg ¦ A plain tag", icon: '🏷️' },
      ],
      items: [
        { text: "Карточка товара, которая повторяется 20 раз ¦ 20 marta takrorlanadigan mahsulot kartochkasi ¦ A product card repeated 20 times", zone: 'yes' },
        { text: "Шапка сайта на всех страницах ¦ Barcha sahifalardagi sayt sarlavhasi ¦ A header on every page", zone: 'yes' },
        { text: "Один абзац текста ¦ Bitta matn xatboshisi ¦ A single paragraph", zone: 'no', why: "Не повторяется и прост — хватит <p>. ¦ Takrorlanmaydi va oddiy — <p> yetarli. ¦ It doesn't repeat and is simple — a <p> will do." },
        { text: "Кнопка в едином стиле по всему сайту ¦ Butun saytda bir xil uslubdagi tugma ¦ A button styled the same site-wide", zone: 'yes' },
      ],
      takeaway: "Повторяется или сложное — делаем компонентом. ¦ Takrorlanadi yoki murakkab — komponent qilamiz. ¦ If it repeats or is complex, make it a component.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: страница профиля ¦ Missiya: profil sahifasi ¦ Mission: a profile page",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Страница собрана из компонентов! ¦ Sahifa komponentlardan yig'ildi! ¦ The page is built from components!",
      items: [
        { title: "Запустить сервер разработки ¦ Ishlab chiqish serverini ishga tushirish ¦ Start the dev server", choices: ['npm run dev', 'npm create'], correct: 0, explain: "dev — режим разработки с автообновлением. ¦ dev — avtomatik yangilanadigan ishlab chiqish rejimi. ¦ dev is development mode with live reload." },
        { title: "Передать имя в <Avatar /> ¦ <Avatar />ga ismni uzatish ¦ Pass a name to <Avatar />", choices: ['<Avatar name="Lola" />', '<Avatar>name=Lola</Avatar>'], correct: 0, explain: "Данные идут через props-атрибуты. ¦ Ma'lumotlar props-atributlar orqali boradi. ¦ Data goes through prop attributes." },
        { title: "CSS-класс в JSX ¦ JSX'da CSS-klass ¦ A CSS class in JSX", choices: ['className="card"', 'class="card"'], correct: 0, explain: "class занято в JavaScript. ¦ class JavaScript'da band. ¦ class is reserved in JavaScript." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Vite и компоненты ¦ Xulosa: Vite va komponentlar ¦ Summary: Vite and components",
      chat: "на какие компоненты вы разделите свой сайт? ¦ saytingizni qaysi komponentlarga bo'lasiz? ¦ what components will you split your site into?",
      answer: "Vite создаёт React-проект тремя командами: npm create vite, npm install, npm run dev. Страницу собирают из компонентов — функций с именем с большой буквы, которые возвращают JSX. Данные передают через props: <Card icon=\"🍩\" title=\"Classic\" />. Правила JSX: один корень (или <>…</>), className вместо class, { } для JavaScript и закрытые теги. Изменили компонент один раз — обновился везде. ¦ Vite React loyihasini uchta buyruq bilan yaratadi: npm create vite, npm install, npm run dev. Sahifa komponentlardan — JSX qaytaradigan, bosh harfli nomga ega funksiyalardan yig'iladi. Ma'lumotlar props orqali uzatiladi: <Card icon=\"🍩\" title=\"Classic\" />. JSX qoidalari: bitta ildiz (yoki <>…</>), class o'rniga className, JavaScript uchun { } va yopilgan teglar. Komponentni bir marta o'zgartirdik — hamma joyda yangilandi. ¦ Vite creates a React project in three commands: npm create vite, npm install, npm run dev. Pages are built from components — capitalised functions returning JSX. Data flows through props: <Card icon=\"🍩\" title=\"Classic\" />. JSX rules: one root (or <>…</>), className instead of class, { } for JavaScript, closed tags. Change a component once and it updates everywhere.",
      icon: '⚛️',
      badge: "Сборщик компонентов ¦ Komponent yig'uvchi ¦ Component builder",
      badgeSub: "React · техническая 1 ¦ React · texnik 1 ¦ React · technical 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Создайте проект на Vite и сделайте компоненты Header, Card и Footer. ¦ Vite'da loyiha yarating va Header, Card va Footer komponentlarini yarating. ¦ Create a Vite project with Header, Card and Footer components.",
        "Выведите 4 карточки с разными props. ¦ Turli props bilan 4 ta kartochka chiqaring. ¦ Render 4 cards with different props.",
      ],
      takeaway: "Следующая тема — useState: компоненты начнут меняться на глазах. ¦ Keyingi mavzu — useState: komponentlar ko'z oldida o'zgara boshlaydi. ¦ Next: useState — components start changing before your eyes.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
