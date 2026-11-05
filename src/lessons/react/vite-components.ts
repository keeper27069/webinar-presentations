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

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.cards{display:flex;gap:14px}
.card{width:130px;padding:16px;border-radius:16px;background:#fff;text-align:center;box-shadow:0 6px 18px #0001;font-weight:800;font-size:18px}
.card div{font-size:52px}
.card.sale{outline:3px solid #ff6f91}`;
const cards = (items: [string, string, boolean?][]) => `<div class="wrap"><div class="cards">${items.map(([i, t, s]) => `<div class="card ${s ? 'sale' : ''}"><div>${i}</div>${t}</div>`).join('')}</div></div>`;

export default kit({
  id: 'react-t01',
  title: "React (Vite) и компоненты ¦ React (Vite) va komponentlar ¦ React (Vite) and components",
  question: "Как собрать сайт из повторяющихся «кубиков» и не копировать один код десять раз? ¦ Saytni takrorlanadigan «kubiklar»dan qanday yig'ish va bitta kodni o'n marta nusxalamaslik mumkin? ¦ How do you build a site from reusable blocks instead of copying code ten times?",
  route: ["Проект ¦ Loyiha ¦ The project", "Компоненты ¦ Komponentlar ¦ Components", "Пропсы ¦ Props ¦ Props", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '⚛️',
      kicker: "React · техническая тема 1 ¦ React · texnik mavzu 1 ¦ React · technical topic 1",
      title: "Сайт из LEGO-деталей ¦ LEGO detallaridan sayt ¦ A site made of LEGO pieces",
      chat: "какие повторяющиеся блоки вы видите в Instagram? ¦ Instagram'da qanday takrorlanuvchi bloklarni ko'rasiz? ¦ what repeating blocks do you see on Instagram?",
      lead: "React делит страницу на компоненты: шапка, карточка, подвал. Карточку пишем один раз — и используем 3, 10, 100 раз с разными данными. Vite — инструмент, который быстро создаёт и запускает такой проект. ¦ React sahifani komponentlarga bo'ladi: sarlavha, kartochka, pastki qism. Kartochkani bir marta yozamiz — va uni turli ma'lumotlar bilan 3, 10, 100 marta ishlatamiz. Vite — bunday loyihani tez yaratadigan va ishga tushiradigan vosita. ¦ React splits a page into components: header, card, footer. Write a card once and reuse it 3, 10 or 100 times with different data. Vite quickly creates and runs such a project.",
      facts: ["Компонент — функция, которая возвращает разметку ¦ Komponent — belgilashni qaytaradigan funksiya ¦ A component is a function returning markup", "Props — данные для компонента ¦ Props — komponent uchun ma'lumot ¦ Props are a component's data", "Vite — быстрый старт ¦ Vite — tez start ¦ Vite gives a fast start"],
      takeaway: "Создаём проект тремя командами. ¦ Loyihani uchta buyruq bilan yaratamiz. ¦ Create the project in three commands.",
      notes: { min: 3 },
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
      type: 'animate',
      stage: 1,
      title: "Страница → компоненты ¦ Sahifa → komponentlar ¦ Page → components",
      chat: "сколько компонентов на этой странице? ¦ bu sahifada nechta komponent bor? ¦ how many components are on this page?",
      actors: [
        { id: 'app', icon: '🌐', label: '<App />' },
        { id: 'h', icon: '🔝', label: '<Header />' },
        { id: 'c1', icon: '🍩', label: '<Card />' },
        { id: 'c2', icon: '🍫', label: '<Card />' },
        { id: 'c3', icon: '🍓', label: '<Card />' },
        { id: 'f', icon: '🔚', label: '<Footer />' },
      ],
      steps: [
        { say: "Вся страница — один большой компонент App. ¦ Butun sahifa — bitta katta App komponenti. ¦ The whole page is one big App component.", at: { app: [50, 46, 1.6] } },
        { say: "Внутри — Header сверху и Footer снизу. ¦ Ichida — tepada Header va pastda Footer. ¦ Inside: a Header on top and a Footer at the bottom.", at: { app: [50, 12, 0.9], h: [50, 36], f: [50, 88] }, lines: [['app', 'h'], ['app', 'f']] },
        { say: "А в середине — три карточки. Это ОДИН компонент Card, использованный трижды! ¦ O'rtada esa — uchta kartochka. Bu uch marta ishlatilgan BITTA Card komponenti! ¦ In the middle, three cards — ONE Card component used three times!", at: { c1: [22, 62], c2: [50, 62], c3: [78, 62] }, lines: [['app', 'h'], ['app', 'f'], ['app', 'c1'], ['app', 'c2'], ['app', 'c3']], pulse: ['c1', 'c2', 'c3'] },
      ],
      takeaway: "Компоненты вкладываются друг в друга, как матрёшки. ¦ Komponentlar bir-birining ichiga matryoshka kabi joylashadi. ¦ Components nest inside each other like Russian dolls.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Props: одна карточка — разные данные ¦ Props: bitta kartochka — turli ma'lumotlar ¦ Props: one card, different data",
      chat: "какой пончик добавим? ¦ qaysi ponchikni qo'shamiz? ¦ which donut shall we add?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "function Card({ icon, title }) {\n  return <div className=\"card\">\n    <div>{icon}</div>{title}\n  </div>;\n}", line: 1, html: cards([]), say: "Card получает props: icon и title. ¦ Card props'larni oladi: icon va title. ¦ Card receives props: icon and title." },
        { code: '<Card icon="🍩" title="Classic" />', line: 1, html: cards([['🍩', 'Classic']]), say: "Используем как тег и передаём данные. ¦ Teg kabi ishlatamiz va ma'lumot uzatamiz. ¦ Use it like a tag and pass data in." },
        { code: '<Card icon="🍩" title="Classic" />\n<Card icon="🍫" title="Chocolate" />\n<Card icon="🍓" title="Berry" />', line: 3, html: cards([['🍩', 'Classic'], ['🍫', 'Chocolate'], ['🍓', 'Berry']]), say: "Три строчки — три разных карточки. Код Card один! ¦ Uch qator — uchta turli kartochka. Card kodi bitta! ¦ Three lines, three different cards — one Card component!" },
        { code: '<Card icon="🍓" title="Berry" sale />', line: 1, html: cards([['🍩', 'Classic'], ['🍫', 'Chocolate'], ['🍓', 'Berry', true]]), say: "Новый prop sale — и у одной карточки рамка «скидка». ¦ Yangi sale prop — va bitta kartochkada «chegirma» ramkasi. ¦ A new sale prop gives one card a “sale” outline." },
      ],
      takeaway: "Компонент — шаблон, props — что в него подставить. ¦ Komponent — shablon, props — unga nima qo'yish. ¦ A component is a template; props fill it in.",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 3,
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
      type: 'mission',
      stage: 4,
      title: "Миссия: сайт из компонентов ¦ Missiya: komponentlardan sayt ¦ Mission: a site of components",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сайт собран из кубиков! ¦ Sayt kubiklardan yig'ildi! ¦ The site is built from blocks!",
      items: [
        { title: "Как запустить проект Vite? ¦ Vite loyihasini qanday ishga tushirish mumkin? ¦ How do you start a Vite project?", choices: ['npm run dev', 'npm delete'], correct: 0, explain: "Сервер на localhost:5173. ¦ localhost:5173'da server. ¦ A server on localhost:5173." },
        { title: "10 одинаковых карточек с разными товарами ¦ Turli mahsulotli 10 ta bir xil kartochka ¦ 10 identical cards with different products", choices: ["Один Card + props ¦ Bitta Card + props ¦ One Card + props", "10 разных компонентов ¦ 10 ta turli komponent ¦ 10 different components"], correct: 0, explain: "Шаблон один, данные разные. ¦ Shablon bitta, ma'lumotlar turli. ¦ One template, different data." },
        { title: "Имя компонента пишут… ¦ Komponent nomi qanday yoziladi… ¦ Component names start with…", choices: ["С большой буквы: Card ¦ Bosh harf bilan: Card ¦ A capital: Card", "С маленькой: card ¦ Kichik harf bilan: card ¦ Lowercase: card"], correct: 0, explain: "Так React отличает их от HTML-тегов. ¦ Shunda React ularni HTML teglardan ajratadi. ¦ That's how React tells them from HTML tags." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: React и компоненты ¦ Xulosa: React va komponentlar ¦ Summary: React and components",
      chat: "какие компоненты будут на вашем сайте? ¦ saytingizda qanday komponentlar bo'ladi? ¦ which components will your site have?",
      answer: "Vite создаёт React-проект тремя командами: npm create vite@latest, npm install, npm run dev. React делит страницу на компоненты — функции с большой буквы, которые возвращают разметку: Header, Card, Footer. Компоненты вкладываются друг в друга, а props передают им данные, поэтому один Card превращается в любое количество разных карточек. ¦ Vite React loyihasini uchta buyruq bilan yaratadi: npm create vite@latest, npm install, npm run dev. React sahifani komponentlarga bo'ladi — belgilashni qaytaradigan bosh harfli funksiyalar: Header, Card, Footer. Komponentlar bir-birining ichiga joylashadi, props esa ularga ma'lumot uzatadi, shuning uchun bitta Card istalgancha turli kartochkaga aylanadi. ¦ Vite creates a React project in three commands: npm create vite@latest, npm install, npm run dev. React splits a page into components — capitalised functions returning markup: Header, Card, Footer. Components nest, and props pass them data, so one Card becomes any number of different cards.",
      icon: '⚛️',
      badge: "Сборщик компонентов ¦ Komponentlar yig'uvchisi ¦ Component builder",
      badgeSub: "React · техническая 1 ¦ React · texnik 1 ¦ React · technical 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Создайте проект Vite и сделайте компонент Card. ¦ Vite loyihasini yarating va Card komponentini yasang. ¦ Create a Vite project and build a Card component.",
        "Покажите 4 карточки с разными props. ¦ Turli props'li 4 ta kartochkani ko'rsating. ¦ Show 4 cards with different props.",
      ],
      takeaway: "Дальше: useState — как компонент запоминает. ¦ Keyingisi: useState — komponent qanday eslab qoladi. ¦ Next: useState — how a component remembers.",
      notes: { min: 2 },
    },
  ],
});
