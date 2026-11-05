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

const PCSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.shop{display:grid;grid-template-columns:1fr 170px;gap:14px;width:600px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.pc{padding:12px;border-radius:14px;background:#fff;text-align:center;box-shadow:0 4px 14px #0001;font-weight:800;font-size:15px}
.pc div{font-size:40px}.pc span{display:block;margin-top:6px;padding:6px;border-radius:8px;background:#0ea5d9;color:#fff;font-size:13px}
.pc.hit span{background:#16181f}
.cart{padding:14px;border-radius:14px;background:#fff6d6;box-shadow:0 4px 14px #0001;font-size:15px}
.cart b{display:block;font-size:18px;margin-bottom:8px}.cart i{display:block;font-style:normal;margin:4px 0}
.tot{margin-top:10px;padding-top:8px;border-top:2px dashed #e9a400;font-weight:900}`;
const P: [string, string, number][] = [['👟', 'Sneakers', 450], ['🎒', 'Backpack', 280], ['🎧', 'Headphones', 390]];
const shop = (cart: number[], hit = -1) => {
  const total = cart.reduce((s, i) => s + P[i][2], 0);
  return `<div class="wrap"><div class="shop"><div class="grid">${P.map(([e, n, p], i) => `<div class="pc ${i === hit ? 'hit' : ''}"><div>${e}</div>${n}<br>${p} 000<span>+ Add</span></div>`).join('')}</div><div class="cart"><b>🛒 ${cart.length}</b>${cart.map((i) => `<i>${P[i][0]} ${P[i][1]}</i>`).join('')}<div class="tot">${total ? total + ' 000 sum' : '0'}</div></div></div></div>`;
};

export default kit({
  id: 'react-t06',
  title: "Shop app: интернет-магазин на React ¦ Shop app: React'da internet-do'kon ¦ Shop app: an online store in React",
  question: "Как товары, корзина и сумма «знают» друг о друге в одном приложении? ¦ Bitta ilovada mahsulotlar, savat va summa bir-biri haqida qanday «biladi»? ¦ How do products, cart and total “know” about each other in one app?",
  route: ["Магазин ¦ Do'kon ¦ The shop", "Корзина ¦ Savat ¦ The cart", "Данные ¦ Ma'lumotlar ¦ Data flow", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🛍️',
      kicker: "React · техническая тема 6 ¦ React · texnik mavzu 6 ¦ React · technical topic 6",
      title: "Всё, что выучили, — в одном проекте ¦ O'rganganlarimiz hammasi — bitta loyihada ¦ Everything we've learned in one project",
      chat: "что обязательно должно быть в интернет-магазине? ¦ internet-do'konda albatta nima bo'lishi kerak? ¦ what must an online shop have?",
      lead: "Товары рисуются через map, корзина — это state, а сумма считается сама. Нажали «Добавить» — React обновил корзину и итог. ¦ Mahsulotlar map orqali chiziladi, savat — bu state, summa esa o'zi hisoblanadi. «Qo'shish» bosildi — React savat va jamini yangiladi. ¦ Products are drawn with map, the cart is state, and the total calculates itself. Press “Add” and React updates the cart and total.",
      facts: ["Товары: PRODUCTS.map ¦ Mahsulotlar: PRODUCTS.map ¦ Products: PRODUCTS.map", "Корзина: useState([]) ¦ Savat: useState([]) ¦ Cart: useState([])", "Итог: reduce ¦ Jami: reduce ¦ Total: reduce"],
      takeaway: "Покупаем — и смотрим, что меняется. ¦ Sotib olamiz — va nima o'zgarishini ko'ramiz. ¦ Let's shop and watch what changes.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Корзина наполняется ¦ Savat to'lmoqda ¦ The cart fills up",
      chat: "что купим первым? ¦ birinchi nima sotib olamiz? ¦ what shall we buy first?",
      lang: 'js',
      css: PCSS,
      steps: [
        { code: "const [cart, setCart] = useState([]);", line: 1, html: shop([]), say: "Корзина пустая: cart = []. ¦ Savat bo'sh: cart = []. ¦ The cart is empty: cart = []." },
        { code: "const add = (p) =>\n  setCart([...cart, p]);", line: 2, html: shop([0], 0), say: "«Add» у кроссовок — новый массив с товаром. Корзина: 1. ¦ Krossovkadagi «Add» — mahsulotli yangi massiv. Savat: 1. ¦ “Add” on the sneakers: a new array with the item. Cart: 1." },
        { code: "setCart([...cart, p]);", line: 1, html: shop([0, 2], 2), say: "Добавили наушники — в корзине 2 товара. ¦ Quloqchinlarni qo'shdik — savatda 2 ta mahsulot. ¦ Add headphones — 2 items in the cart." },
        { code: "const total = cart.reduce(\n  (sum, p) => sum + p.price, 0);", line: 2, html: shop([0, 2]), say: "Итог считается сам: 450 000 + 390 000 = 840 000. ¦ Jami o'zi hisoblanadi: 450 000 + 390 000 = 840 000. ¦ The total adds itself up: 450,000 + 390,000 = 840,000." },
      ],
      takeaway: "Меняем только cart — всё остальное (число, итог) React пересчитает. ¦ Faqat cart'ni o'zgartiramiz — qolganini (son, jami) React qayta hisoblaydi. ¦ Change only cart; React recalculates the rest (count, total).",
      notes: { min: 5 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Данные вниз, события вверх ¦ Ma'lumotlar pastga, hodisalar yuqoriga ¦ Data down, events up",
      chat: "почему корзина живёт в App? ¦ nega savat App'da yashaydi? ¦ why does the cart live in App?",
      actors: [
        { id: 'app', icon: '⚛️', label: "App: cart в state ¦ App: state'da cart ¦ App: cart in state" },
        { id: 'list', icon: '🛍️', label: '<ProductCard />' },
        { id: 'cart', icon: '🛒', label: '<Cart />' },
        { id: 'ev', text: "onAdd(👟)" },
      ],
      steps: [
        { say: "Корзина хранится в главном компоненте App. ¦ Savat asosiy App komponentida saqlanadi. ¦ The cart is stored in the main App component.", at: { app: [50, 16, 1.2], list: [24, 74], cart: [76, 74] }, lines: [['app', 'list', 'onAdd'], ['app', 'cart', 'cart']] },
        { say: "App передаёт вниз: карточкам — функцию onAdd, корзине — список cart. ¦ App pastga uzatadi: kartochkalarga — onAdd funksiyasini, savatga — cart ro'yxatini. ¦ App passes down: onAdd to the cards, the cart list to Cart.", pulse: ['list', 'cart'], lines: [['app', 'list', 'onAdd ⬇'], ['app', 'cart', 'cart ⬇']] },
        { say: "Карточка зовёт onAdd — событие поднимается вверх в App. ¦ Kartochka onAdd'ni chaqiradi — hodisa yuqoriga App'ga ko'tariladi. ¦ A card calls onAdd — the event travels up to App.", at: { ev: [24, 44] }, lines: [['list', 'app', '⬆ onAdd(👟)']], pulse: ['app'] },
        { say: "App меняет cart — и Cart внизу сразу показывает новый товар. ¦ App cart'ni o'zgartiradi — pastdagi Cart darhol yangi mahsulotni ko'rsatadi. ¦ App updates cart — and Cart below shows the new item at once.", hide: ['ev'], set: { cart: { label: "<Cart /> 🛒 1" } }, lines: [['app', 'cart', 'cart ⬇']], pulse: ['cart'] },
      ],
      takeaway: "Общие данные держим наверху, вниз — props, вверх — события. ¦ Umumiy ma'lumotlarni yuqorida saqlaymiz, pastga — props, yuqoriga — hodisalar. ¦ Keep shared data at the top: props flow down, events flow up.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 3,
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
      type: 'mission',
      stage: 4,
      title: "Миссия: запуск магазина ¦ Missiya: do'konni ishga tushirish ¦ Mission: launching the shop",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Магазин принимает заказы! ¦ Do'kon buyurtmalarni qabul qilmoqda! ¦ The shop takes orders!",
      items: [
        { title: "Где хранить корзину? ¦ Savatni qayerda saqlash kerak? ¦ Where should the cart live?", choices: ["В App, в useState ¦ App'da, useState'da ¦ In App, in useState", "В каждой карточке ¦ Har bir kartochkada ¦ In each card"], correct: 0, explain: "Общие данные — наверху. ¦ Umumiy ma'lumotlar — yuqorida. ¦ Shared data goes at the top." },
        { title: "Посчитать сумму ¦ Summani hisoblash ¦ Compute the total", choices: ['cart.reduce(…)', 'cart.push(…)'], correct: 0, explain: "reduce складывает всё в одно число. ¦ reduce hammasini bitta songa qo'shadi. ¦ reduce sums everything into one number." },
        { title: "Как карточка сообщает «добавь»? ¦ Kartochka «qo'sh»ni qanday xabar qiladi? ¦ How does a card say “add”?", choices: ["Вызывает onAdd из props ¦ props'dagi onAdd'ni chaqiradi ¦ It calls onAdd from props", "Меняет cart сама ¦ cart'ni o'zi o'zgartiradi ¦ It changes cart itself"], correct: 0, explain: "События идут вверх. ¦ Hodisalar yuqoriga boradi. ¦ Events go up." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Shop app ¦ Xulosa: Shop app ¦ Summary: the shop app",
      chat: "что продавали бы в своём магазине? ¦ do'koningizda nima sotgan bo'lardingiz? ¦ what would your shop sell?",
      answer: "Магазин собирает всё изученное: товары рисуются через PRODUCTS.map, корзина хранится в useState в главном компоненте App, добавление — setCart([...cart, p]), а итог считается через reduce. App передаёт карточкам функцию onAdd, а корзине — список cart: данные идут вниз через props, события — вверх. Меняем только state — React сам обновляет корзину и сумму. ¦ Do'kon o'rganganlarimizning hammasini birlashtiradi: mahsulotlar PRODUCTS.map orqali chiziladi, savat asosiy App komponentida useState'da saqlanadi, qo'shish — setCart([...cart, p]), jami esa reduce orqali hisoblanadi. App kartochkalarga onAdd funksiyasini, savatga esa cart ro'yxatini uzatadi: ma'lumotlar props orqali pastga, hodisalar — yuqoriga boradi. Faqat state'ni o'zgartiramiz — React savat va summani o'zi yangilaydi. ¦ The shop combines everything: products are drawn with PRODUCTS.map, the cart lives in useState in App, adding is setCart([...cart, p]), and the total comes from reduce. App gives cards an onAdd function and Cart the cart list: data flows down via props, events flow up. We change only state; React updates the cart and total.",
      icon: '🛍️',
      badge: "Создатель магазинов ¦ Do'konlar yaratuvchisi ¦ Shop builder",
      badgeSub: "React · техническая 6 ¦ React · texnik 6 ¦ React · technical 6",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте кнопку «Удалить» для товара в корзине. ¦ Savatdagi mahsulot uchun «O'chirish» tugmasini qo'shing. ¦ Add a “Remove” button for cart items.",
        "Сохраняйте корзину в localStorage через useEffect. ¦ Savatni useEffect orqali localStorage'da saqlang. ¦ Save the cart to localStorage with useEffect.",
      ],
      takeaway: "Технические темы React пройдены! Дальше — общие темы. ¦ React texnik mavzulari tugadi! Keyingisi — umumiy mavzular. ¦ React technical topics done! Next: general topics.",
      notes: { min: 2 },
    },
  ],
});
