import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#f4f6fb;color:#1b2150}
header{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;background:#1b2150;color:#fff;position:sticky;top:0}
.cartbtn{background:#22d3c5;color:#1b2150;border:0;border-radius:10px;padding:8px 12px;font-weight:800}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:14px}
.card{background:#fff;border-radius:14px;padding:14px;text-align:center;box-shadow:0 4px 14px #0001}
.card .e{font-size:40px}.card b{display:block;margin:4px 0}
.card button{margin-top:6px;border:0;border-radius:8px;background:#5b3df5;color:#fff;padding:7px 10px;font-weight:700}
.cart{margin:0 14px 14px;background:#fff;border-radius:14px;padding:12px 16px}
.line{display:flex;justify-content:space-between;align-items:center;padding:4px 0}
.line button{border:0;background:#e3e7f3;border-radius:6px;width:26px;height:26px;font-weight:800}
.total{font-weight:900;font-size:18px;border-top:1px solid #eef1f7;margin-top:6px;padding-top:8px}`;
const JS = `const { useState, useEffect } = React;

const PRODUCTS = [
  { id: 1, name: 'Sneakers', price: 450000, e: '👟' },
  { id: 2, name: 'Backpack', price: 280000, e: '🎒' },
  { id: 3, name: 'Headphones', price: 390000, e: '🎧' },
];
const sum = (n) => n.toLocaleString('ru-RU') + ' sum';

function ProductCard({ p, onAdd }) {
  return (
    <div className="card">
      <div className="e">{p.e}</div>
      <b>{p.name}</b>{sum(p.price)}
      <div><button onClick={() => onAdd(p)}>Add to cart</button></div>
    </div>
  );
}

function Cart({ items, onChange }) {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  if (items.length === 0) return <div className="cart">🛒 The cart is empty</div>;
  return (
    <div className="cart">
      {items.map((i) => (
        <div className="line" key={i.id}>
          <span>{i.e} {i.name}</span>
          <span>
            <button onClick={() => onChange(i.id, -1)}>−</button> {i.qty}{' '}
            <button onClick={() => onChange(i.id, 1)}>+</button>
          </span>
        </div>
      ))}
      <div className="line total"><span>Total</span><span>{sum(total)}</span></div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  function add(p) {
    const found = cart.find((i) => i.id === p.id);
    if (found) change(p.id, 1);
    else setCart([...cart, Object.assign({}, p, { qty: 1 })]);
  }
  function change(id, d) {
    setCart(cart
      .map((i) => (i.id === id ? Object.assign({}, i, { qty: i.qty + d }) : i))
      .filter((i) => i.qty > 0));
  }
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <header><b>🛍️ Bit Shop</b><span className="cartbtn">🛒 {count}</span></header>
      <div className="grid">{PRODUCTS.map((p) => <ProductCard key={p.id} p={p} onAdd={add} />)}</div>
      <Cart items={cart} onChange={change} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

export default kit({
  id: 'react-t06',
  title: "Shop app: мини-магазин ¦ Shop app: mini do'kon ¦ Shop app: a mini store",
  question: "Как все темы модуля соединяются в одном настоящем проекте? ¦ Modulning barcha mavzulari bitta haqiqiy loyihada qanday birlashadi? ¦ How do all the module's topics come together in one real project?",
  route: ["План ¦ Reja ¦ Plan", "Компоненты ¦ Komponentlar ¦ Components", "Корзина ¦ Savat ¦ The cart", "Сохранение ¦ Saqlash ¦ Saving", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🛍️',
      kicker: "React · техническая тема 6 ¦ React · texnik mavzu 6 ¦ React · technical topic 6",
      title: "Финальный проект: свой магазин ¦ Yakuniy loyiha: o'z do'koningiz ¦ The final project: your own shop",
      chat: "что будем продавать в нашем магазине? ¦ do'konimizda nima sotamiz? ¦ what shall our shop sell?",
      lead: "Каталог товаров, карточки, корзина с количеством и итоговой суммой, сохранение после перезагрузки. В одном проекте — компоненты, props, useState, useEffect и LocalStorage. ¦ Mahsulotlar katalogi, kartochkalar, soni va umumiy summasi bilan savat, qayta yuklashdan keyin saqlash. Bitta loyihada — komponentlar, props, useState, useEffect va LocalStorage. ¦ A product catalogue, cards, a cart with quantities and a total, saved across reloads. One project with components, props, useState, useEffect and LocalStorage.",
      facts: ["Компоненты: ProductCard, Cart ¦ Komponentlar: ProductCard, Cart ¦ Components: ProductCard, Cart", "Состояние: корзина в App ¦ Holat: App'dagi savat ¦ State: the cart in App", "Эффект: сохранить корзину ¦ Effekt: savatni saqlash ¦ Effect: save the cart"],
      takeaway: "Это уже настоящее приложение — его можно положить в портфолио. ¦ Bu allaqachon haqiqiy ilova — uni portfolioga qo'yish mumkin. ¦ This is a real app — portfolio-worthy.",
      notes: { say: ["Магазин выдуманный (Bit Shop), оплаты нет — только корзина."], min: 3 },
    },
    {
      type: 'flow',
      stage: 0,
      title: "Архитектура магазина ¦ Do'kon arxitekturasi ¦ The shop's architecture",
      chat: "где должно жить состояние корзины? ¦ savat holati qayerda yashashi kerak? ¦ where should the cart state live?",
      nodes: [
        { icon: '📦', label: "PRODUCTS ¦ PRODUCTS ¦ PRODUCTS", text: "Массив товаров (позже — из API). ¦ Mahsulotlar massivi (keyinroq — API'dan). ¦ An array of products (later from an API)." },
        { icon: '🧠', label: "App: cart ¦ App: cart ¦ App: cart", text: "Главное состояние и функции add / change. ¦ Asosiy holat va add / change funksiyalari. ¦ The main state plus add / change." },
        { icon: '🃏', label: 'ProductCard', text: "Показывает товар, вызывает onAdd. ¦ Mahsulotni ko'rsatadi, onAdd'ni chaqiradi. ¦ Shows a product, calls onAdd." },
        { icon: '🛒', label: 'Cart', text: "Показывает строки и сумму, вызывает onChange. ¦ Qatorlar va summani ko'rsatadi, onChange'ni chaqiradi. ¦ Shows lines and the total, calls onChange." },
        { icon: '💾', label: 'useEffect', text: "Сохраняет cart в LocalStorage. ¦ cart'ni LocalStorage'ga saqlaydi. ¦ Saves cart to LocalStorage." },
      ],
      takeaway: "Состояние — наверху (App), а дети получают данные и функции через props. ¦ Holat — yuqorida (App), bolalar esa ma'lumot va funksiyalarni props orqali oladi. ¦ State lives at the top (App); children get data and functions via props.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 1,
      react: true,
      title: "Bit Shop ¦ Bit Shop ¦ Bit Shop",
      chat: "какой товар добавить в каталог? название, цена, эмодзи! ¦ katalogga qanday mahsulot qo'shamiz? nom, narx, emoji! ¦ what product shall we add? name, price, emoji!",
      task: "✍️ Покупайте, меняйте количество, затем ▶ (= перезагрузка) ¦ ✍️ Xarid qiling, sonini o'zgartiring, keyin ▶ (= qayta yuklash) ¦ ✍️ Shop, change quantities, then ▶ (= reload)",
      steps: [
        { label: "Магазин ¦ Do'kon ¦ Shop", html: '<div id="root"></div>', css: CSS, js: JS },
      ],
      takeaway: "Корзина считает количество и сумму сама и переживает «перезагрузку». ¦ Savat soni va summani o'zi hisoblaydi va «qayta yuklash»dan omon qoladi. ¦ The cart counts quantities and totals itself and survives a “reload”.",
      notes: { say: ["Цены условные, в сумах. Добавьте товар в PRODUCTS по заявке чата — карточка появится сама."], min: 10 },
    },
    {
      type: 'walk',
      stage: 2,
      title: "Логика корзины ¦ Savat mantig'i ¦ The cart logic",
      chat: "что происходит, когда qty становится 0? ¦ qty 0 bo'lganda nima bo'ladi? ¦ what happens when qty hits 0?",
      code: `function add(p) {\n  const found = cart.find((i) => i.id === p.id);\n  if (found) change(p.id, 1);\n  else setCart([...cart, { ...p, qty: 1 }]);\n}\n\nfunction change(id, d) {\n  setCart(cart\n    .map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i))\n    .filter((i) => i.qty > 0));\n}`,
      lang: 'js',
      marks: [
        { line: 2, text: "find: такой товар уже в корзине? ¦ find: bunday mahsulot savatda bormi? ¦ find: is this product already in the cart?" },
        { line: 3, text: "Есть — просто +1 к количеству. ¦ Bor — shunchaki soniga +1. ¦ Yes — just +1 to the quantity." },
        { line: 4, text: "Нет — новая строка с qty: 1. ¦ Yo'q — qty: 1 bilan yangi qator. ¦ No — a new line with qty: 1." },
        { line: 10, text: "filter убирает строки с нулём — «−» на последней штуке удаляет товар. ¦ filter nolli qatorlarni olib tashlaydi — oxirgi donada «−» mahsulotni o'chiradi. ¦ filter drops zero lines, so “−” on the last one removes it." },
      ],
      takeaway: "find, map, filter и новый массив — те же инструменты, что в Todo. ¦ find, map, filter va yangi massiv — Todo'dagi o'sha vositalar. ¦ find, map, filter and a new array — the same tools as the Todo.",
      notes: { say: ["В живом коде вместо { ...p } написано Object.assign — результат тот же."], min: 5 },
    },
    {
      type: 'output',
      stage: 2,
      title: "Посчитайте корзину ¦ Savatni hisoblang ¦ Total the cart",
      chat: "пишите ответ до того, как я покажу ¦ men ko'rsatishimdan oldin javob yozing ¦ write your answer before I reveal it",
      snippets: [
        { label: "reduce ¦ reduce ¦ reduce", code: `const cart = [\n  { name: 'Sneakers', price: 450000, qty: 1 },\n  { name: 'Backpack', price: 280000, qty: 2 },\n];\nconst total = cart.reduce((s, i) => s + i.price * i.qty, 0);\nconsole.log(total);`, output: ['1010000'], explain: "450 000 × 1 + 280 000 × 2 = 1 010 000. reduce «сворачивает» массив в одно число. ¦ 450 000 × 1 + 280 000 × 2 = 1 010 000. reduce massivni bitta songa «yig'adi». ¦ 450,000 × 1 + 280,000 × 2 = 1,010,000. reduce folds an array into one number." },
      ],
      takeaway: "reduce — счётчик суммы: начинаем с 0 и прибавляем каждую строку. ¦ reduce — summa hisoblagichi: 0 dan boshlab har bir qatorni qo'shamiz. ¦ reduce is a running total: start at 0 and add each line.",
      notes: { say: ["Сначала ответы чата."], min: 4 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Где хранить состояние ¦ Holatni qayerda saqlash kerak ¦ Where state should live",
      chat: "почему счётчик в шапке знает о корзине? ¦ nega sarlavhadagi hisoblagich savat haqida biladi? ¦ how does the header counter know about the cart?",
      left: { icon: '❌', label: "В каждой карточке ¦ Har bir kartochkada ¦ In each card", points: ["У карточек своя «корзина» ¦ Kartochkalarning o'z «savati» bor ¦ Each card has its own “cart”", "Шапка не знает итог ¦ Sarlavha natijani bilmaydi ¦ The header can't see the total", "Данные разбросаны ¦ Ma'lumotlar tarqoq ¦ Data is scattered"] },
      right: { icon: '✅', label: "В общем родителе App ¦ Umumiy ota-ona App'da ¦ In the shared parent App", points: ["Одна корзина на всё приложение ¦ Butun ilova uchun bitta savat ¦ One cart for the whole app", "Шапка, карточки и Cart видят одно ¦ Sarlavha, kartochkalar va Cart bir xil narsani ko'radi ¦ Header, cards and Cart see the same data", "Легко сохранить ¦ Saqlash oson ¦ Easy to save"] },
      verdict: "Если данные нужны нескольким компонентам — поднимаем состояние в их общего родителя. ¦ Agar ma'lumot bir nechta komponentga kerak bo'lsa — holatni ularning umumiy ota-onasiga ko'taramiz. ¦ If several components need the data, lift state to their common parent.",
      notes: { say: ["Термин: lifting state up."], min: 4 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Баги магазина ¦ Do'kon buglari ¦ Shop bugs",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Товар дублируется ¦ Mahsulot takrorlanadi ¦ Products duplicate", lang: 'js', code: `function add(p) {\n  setCart([...cart, { ...p, qty: 1 }]);\n}`, line: 2, explain: "Нет проверки find: повторное нажатие создаёт вторую строку вместо qty + 1. ¦ find tekshiruvi yo'q: qayta bosish qty + 1 o'rniga ikkinchi qator yaratadi. ¦ No find check: a second click adds another line instead of qty + 1.", fix: `const found = cart.find((i) => i.id === p.id);\nif (found) change(p.id, 1);\nelse setCart([...cart, { ...p, qty: 1 }]);` },
        { title: "Корзина пропадает при перезагрузке ¦ Savat qayta yuklashda yo'qoladi ¦ The cart vanishes on reload", lang: 'js', code: `const [cart, setCart] = useState([]);\nuseEffect(() => {\n  const json = JSON.stringify(cart);\n  localStorage.setItem('cart', json);\n}, [cart]);`, line: 1, explain: "Сохраняем, но при старте не читаем — всегда начинаем с пустой. ¦ Saqlaymiz, lekin boshlanishda o'qimaymiz — doim bo'shdan boshlaymiz. ¦ We save but never read on start, so it always begins empty.", fix: `const [cart, setCart] = useState(\n  () => JSON.parse(localStorage.getItem('cart')) || []\n);` },
      ],
      takeaway: "Проверяйте «уже есть?» и читайте сохранённое при старте. ¦ «Allaqachon bormi?» ni tekshiring va boshlanishda saqlanganini o'qing. ¦ Check “already there?” and read saved data on start.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'cheatsheet',
      stage: 3,
      title: "Весь модуль React в одном проекте ¦ Butun React moduli bitta loyihada ¦ The whole React module in one project",
      chat: "какая тема была самой сложной? ¦ qaysi mavzu eng qiyin edi? ¦ which topic was hardest?",
      sheetTitle: "Что где использовано ¦ Nima qayerda ishlatilgan ¦ What's used where",
      items: [
        { icon: '🧩', text: "Компоненты и props ¦ Komponentlar va props ¦ Components and props", code: '<ProductCard p={p} onAdd={add} />' },
        { icon: '🔄', text: "Состояние ¦ Holat ¦ State", code: 'const [cart, setCart] = useState(…)' },
        { icon: '🗺️', text: "Списки и key ¦ Ro'yxatlar va key ¦ Lists and key", code: 'PRODUCTS.map((p) => <… key={p.id} />)' },
        { icon: '⚡', text: "Эффект ¦ Effekt ¦ Effect", code: 'useEffect(save, [cart])' },
        { icon: '💾', text: 'LocalStorage', code: "JSON.parse(localStorage.getItem('cart'))" },
        { icon: '🌐', text: "Дальше: товары из API ¦ Keyingisi: API'dan mahsulotlar ¦ Next: products from an API", code: "axios.get('/products')" },
      ],
      notes: { say: ["Дайте время на скриншот."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: запуск магазина ¦ Missiya: do'konni ishga tushirish ¦ Mission: launching the shop",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Bit Shop открыт для покупателей! ¦ Bit Shop xaridorlar uchun ochiq! ¦ Bit Shop is open for business!",
      items: [
        { title: "Итоговая сумма корзины ¦ Savatning umumiy summasi ¦ The cart total", choices: ["reduce((s, i) => s + i.price * i.qty, 0)", "cart.length * price"], correct: 0, explain: "Учитываем и цену, и количество. ¦ Narx ham, son ham hisobga olinadi. ¦ Counts both price and quantity." },
        { title: "Шапке нужен счётчик корзины ¦ Sarlavhaga savat hisoblagichi kerak ¦ The header needs the cart count", choices: ["Состояние в App ¦ App'dagi holat ¦ State in App", "Состояние в ProductCard ¦ ProductCard'dagi holat ¦ State in ProductCard"], correct: 0, explain: "Общий родитель — общий доступ. ¦ Umumiy ota-ona — umumiy kirish. ¦ A shared parent gives shared access." },
        { title: "Опубликовать проект ¦ Loyihani e'lon qilish ¦ Publish the project", choices: ["GitHub + хостинг (например, Vercel) ¦ GitHub + xosting (masalan, Vercel) ¦ GitHub + hosting (e.g. Vercel)", "Отправить файл по почте ¦ Faylni pochta orqali yuborish ¦ Email the file"], correct: 0, explain: "Ссылку можно добавить в портфолио. ¦ Havolani portfolioga qo'shish mumkin. ¦ The link goes in your portfolio." },
      ],
      notes: { say: ["Ответы чата → «Проверить». Этот сайт с презентациями тоже опубликован на Vercel из GitHub."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: мини-магазин ¦ Xulosa: mini do'kon ¦ Summary: a mini store",
      chat: "что вы добавите в свой магазин первым? ¦ do'koningizga birinchi nimani qo'shasiz? ¦ what will you add to your shop first?",
      answer: "Магазин собран из всего модуля: компоненты ProductCard и Cart получают данные и функции через props, корзина хранится в useState в общем родителе App, список рисуется через map с key, сумма считается через reduce, а useEffect сохраняет корзину в LocalStorage. Повторное добавление увеличивает qty, а «−» на последней штуке убирает товар. Это готовый проект для портфолио. ¦ Do'kon butun moduldan yig'ilgan: ProductCard va Cart komponentlari ma'lumot va funksiyalarni props orqali oladi, savat umumiy ota-ona App'dagi useState'da saqlanadi, ro'yxat key bilan map orqali chiziladi, summa reduce orqali hisoblanadi, useEffect esa savatni LocalStorage'ga saqlaydi. Qayta qo'shish qty'ni oshiradi, oxirgi donada «−» esa mahsulotni olib tashlaydi. Bu portfolio uchun tayyor loyiha. ¦ The shop uses the whole module: ProductCard and Cart get data and functions via props, the cart lives in useState in the shared parent App, the list renders with map and key, reduce totals it, and useEffect saves it to LocalStorage. Adding again bumps qty, and “−” on the last one removes it. A portfolio-ready project.",
      icon: '🛍️',
      badge: "React-выпускник ¦ React bitiruvchisi ¦ React graduate",
      badgeSub: "React · техническая 6 ¦ React · texnik 6 ¦ React · technical 6",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Перенесите магазин в Vite-проект и загрузите товары через fake API с loading и error. ¦ Do'konni Vite loyihasiga ko'chiring va mahsulotlarni loading va error bilan fake API orqali yuklang. ¦ Move the shop into a Vite project and load products from a fake API with loading and error.",
        "Опубликуйте его на GitHub и пришлите ссылку. ¦ Uni GitHub'da e'lon qiling va havolani yuboring. ¦ Publish it on GitHub and share the link.",
      ],
      takeaway: "Курс пройден! Вы прошли путь от первого тега HTML до приложения на React. 🎉 ¦ Kurs tugadi! Siz birinchi HTML tegidan React ilovasigacha yo'l bosib o'tdingiz. 🎉 ¦ Course complete! You went from your first HTML tag to a React app. 🎉",
      notes: { say: ["Финал всего курса — поздравьте учеников."], min: 2 },
    },
  ],
});
