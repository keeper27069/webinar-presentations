import { kit } from '@engine/kit';

const HEAD = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">\n<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>';
const ICONS = `${HEAD}\n<nav class="navbar bg-body-tertiary px-3">\n  <b><i class="bi bi-lightning-charge-fill text-warning"></i> Bit Shop</b>\n  <div class="d-flex gap-3 fs-4">\n    <a href="#" aria-label="Search"><i class="bi bi-search"></i></a>\n    <a href="#" aria-label="Favourites"><i class="bi bi-heart"></i></a>\n    <a href="#" aria-label="Cart"><i class="bi bi-cart3"></i></a>\n  </div>\n</nav>\n<div class="container py-3">\n  <button class="btn btn-success"><i class="bi bi-bag-plus"></i> Add to cart</button>\n</div>`;
const DRAWER = `${HEAD}\n<div class="container py-3">\n  <button class="btn btn-outline-dark" data-bs-toggle="offcanvas" data-bs-target="#filters">\n    <i class="bi bi-funnel"></i> Filters\n  </button>\n</div>\n<div class="offcanvas offcanvas-end" id="filters">\n  <div class="offcanvas-header">\n    <h5><i class="bi bi-sliders"></i> Filters</h5>\n    <button class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>\n  </div>\n  <div class="offcanvas-body">\n    <label class="form-label">Size</label>\n    <select class="form-select mb-3"><option>38</option><option>40</option><option>42</option></select>\n    <div class="form-check"><input class="form-check-input" type="checkbox" id="sale"><label class="form-check-label" for="sale">Only sale</label></div>\n  </div>\n</div>`;

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.row{display:flex;align-items:center;gap:26px;padding:24px 30px;border-radius:20px;background:#fff;box-shadow:0 10px 30px #0001}
.ic{font-size:40px;color:#16181f;line-height:1}
.red .ic.h{color:#ef4b4b}.big .ic{font-size:72px}.btn{display:flex;align-items:center;gap:10px;padding:12px 20px;border-radius:12px;background:#198754;color:#fff;font-size:22px;font-weight:800}
.shop{position:relative;width:520px;height:380px;border-radius:20px;background:#fff;box-shadow:0 10px 30px #0001;overflow:hidden}
.top{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:2px solid #eceef3;font-weight:800;font-size:20px}
.fb{padding:8px 14px;border:2px solid #16181f;border-radius:10px;font-size:18px}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;padding:16px;font-size:56px;text-align:center}
.dim{position:absolute;inset:0;background:#0000}
.dr{position:absolute;top:0;right:0;bottom:0;width:60%;padding:18px;background:#fff;box-shadow:-10px 0 30px #0003;transform:translateX(105%);font-size:18px}
.dr h5{margin:0 0 14px;font-size:22px}.dr .f{padding:10px;border:2px solid #e6e8ee;border-radius:10px;margin-bottom:10px}
.open .dr{transform:none}.open .dim{background:#0005}`;
const icons = (cls: string, btn = false) => `<div class="wrap"><div class="row ${cls}"><span class="ic">⌕</span><span class="ic h">♥</span><span class="ic">🛒︎</span>${btn ? '<span class="btn"><span>＋</span> Add to cart</span>' : ''}</div></div>`;
const shop = (open: boolean) => `<div class="wrap"><div class="shop ${open ? 'open' : ''}"><div class="top"><span>Bit Shop</span><span class="fb">⚙ Filters</span></div><div class="grid"><span>👟</span><span>👞</span><span>🥾</span><span>👟</span><span>🩴</span><span>👠</span></div><div class="dim"></div><div class="dr"><h5>⚙ Filters</h5><div class="f">Size: 40 ▾</div><div class="f">☑ Only sale</div></div></div></div>`;

export default kit({
  id: 'bootstrap-t04',
  title: "Bootstrap Icons и Drawer ¦ Bootstrap Icons va Drawer ¦ Bootstrap Icons and the Drawer",
  question: "Как добавить иконки без картинок и выдвижную панель для фильтров? ¦ Rasmsiz ikonkalar va filtrlar uchun chiqib keladigan panelni qanday qo'shish mumkin? ¦ How do you add icons without images and a slide-out filter panel?",
  route: ["Иконки ¦ Ikonkalar ¦ Icons", "Наборы ¦ To'plamlar ¦ Icon sets", "Drawer", "Ошибки ¦ Xatolar ¦ Bugs", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '⭐',
      kicker: "Bootstrap · техническая тема 4 ¦ Bootstrap · texnik mavzu 4 ¦ Bootstrap · technical topic 4",
      title: "Иконки и выдвижные панели ¦ Ikonkalar va chiqib keladigan panellar ¦ Icons and slide-out panels",
      chat: "сколько иконок на главном экране вашего любимого приложения? ¦ sevimli ilovangizning bosh ekranida nechta ikonka bor? ¦ how many icons are on your favourite app's home screen?",
      lead: "Корзина, лупа, сердечко — интерфейс говорит иконками. А фильтры на телефоне прячут в панель, которая выезжает сбоку. ¦ Savat, lupa, yurakcha — interfeys ikonkalar bilan gapiradi. Telefonda filtrlarni esa yondan chiqadigan panelga yashirishadi. ¦ Cart, magnifier, heart — interfaces speak in icons. Phone filters hide in a panel that slides in from the side.",
      facts: ["Bootstrap Icons — 2000+ иконок ¦ Bootstrap Icons — 2000+ ikonka ¦ Bootstrap Icons: 2000+ icons", "Иконка = буква шрифта ¦ Ikonka = shrift harfi ¦ An icon is a font letter", "Drawer — новое имя Offcanvas в v6 ¦ Drawer — v6'da Offcanvas'ning yangi nomi ¦ Drawer is Offcanvas's new v6 name"],
      takeaway: "Начнём с секрета: иконка — это текст. ¦ Siridan boshlaymiz: ikonka — bu matn. ¦ First, the secret: an icon is text.",
      notes: { say: ["Примеры — Bootstrap 5.3.8 и Bootstrap Icons 1.11.3 с CDN. В Bootstrap 6 alpha Offcanvas переименован в Drawer (на основе <dialog>)."], min: 3 },
    },
    {
      type: 'show',
      stage: 0,
      title: "Иконка ведёт себя как буква ¦ Ikonka harf kabi o'zini tutadi ¦ An icon behaves like a letter",
      chat: "как сделать сердечко красным? ¦ yurakchani qanday qizil qilish mumkin? ¦ how do you make the heart red?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<i class="bi bi-search"></i>\n<i class="bi bi-heart"></i>\n<i class="bi bi-cart3"></i>', html: icons(''), say: "Тег <i> и класс bi bi-название — и иконка на месте. ¦ <i> tegi va bi bi-nom klassi — ikonka joyida. ¦ An <i> tag with bi bi-name and the icon appears." },
        { code: '<i class="bi bi-heart text-danger"></i>', line: 1, html: icons('red'), say: "Иконка — буква, поэтому красим её как текст: text-danger. ¦ Ikonka — harf, shuning uchun uni matn kabi bo'yaymiz: text-danger. ¦ It's a letter, so colour it like text: text-danger." },
        { code: '<div class="fs-1">\n  <i class="bi bi-search"></i> …\n</div>', line: 1, html: icons('red big'), say: "fs-1 — размер шрифта, и иконки выросли. Без потери чёткости! ¦ fs-1 — shrift o'lchami, ikonkalar kattalashdi. Aniqlik yo'qolmaydi! ¦ fs-1 sets font size and the icons grow — still crisp!" },
        { code: '<button class="btn btn-success">\n  <i class="bi bi-bag-plus"></i>\n  Add to cart\n</button>', line: 2, html: icons('red', true), say: "Иконка внутри кнопки — рядом с текстом. ¦ Tugma ichidagi ikonka — matn yonida. ¦ An icon inside a button, next to the text." },
      ],
      takeaway: "Цвет и размер иконки меняются так же, как у текста. ¦ Ikonka rangi va o'lchami matnniki kabi o'zgaradi. ¦ Icon colour and size change just like text.",
      notes: { min: 5 },
    },
    {
      type: 'compare',
      stage: 1,
      title: "Bootstrap Icons и Font Awesome ¦ Bootstrap Icons va Font Awesome ¦ Bootstrap Icons vs Font Awesome",
      chat: "какой набор иконок вы уже использовали? ¦ qaysi ikonkalar to'plamidan foydalangansiz? ¦ which icon set have you used?",
      left: { icon: '🅱️', label: 'Bootstrap Icons', points: ["Бесплатно, 2000+ иконок ¦ Bepul, 2000+ ikonka ¦ Free, 2000+ icons", "Стиль совпадает с Bootstrap ¦ Uslub Bootstrap bilan mos ¦ Matches Bootstrap's style", "Класс: bi bi-cart ¦ Klass: bi bi-cart ¦ Class: bi bi-cart"] },
      right: { icon: '🏳️', label: 'Font Awesome', points: ["Огромный набор, часть платная ¦ Ulkan to'plam, bir qismi pullik ¦ Huge set, partly paid", "Нужна отдельная библиотека ¦ Alohida kutubxona kerak ¦ Needs its own library", "Класс: fa-solid fa-cart-shopping ¦ Klass: fa-solid fa-cart-shopping ¦ Class: fa-solid fa-cart-shopping"] },
      verdict: "Для проекта на Bootstrap удобнее Bootstrap Icons: тот же стиль и бесплатно. ¦ Bootstrap loyihasi uchun Bootstrap Icons qulayroq: o'sha uslub va bepul. ¦ For a Bootstrap project, Bootstrap Icons fit best: same style and free.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Фильтры выезжают справа ¦ Filtrlar o'ngdan chiqadi ¦ Filters slide in from the right",
      chat: "что ещё положить в такую панель? ¦ bunday panelga yana nima qo'yish mumkin? ¦ what else could go in such a panel?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<button data-bs-toggle="offcanvas"\n        data-bs-target="#filters">\n  <i class="bi bi-funnel"></i> Filters\n</button>', line: 2, html: shop(false), say: "Кнопка «Фильтры» знает id панели: #filters. ¦ «Filtrlar» tugmasi panel id'sini biladi: #filters. ¦ The Filters button knows the panel's id: #filters." },
        { code: '<div class="offcanvas offcanvas-end"\n     id="filters">\n  <select>Size</select>\n  <input type="checkbox"> Only sale\n</div>', line: 1, html: shop(true), say: "Нажали — справа выехала панель (offcanvas-end), а товары затемнились. ¦ Bosildi — o'ngdan panel chiqdi (offcanvas-end), mahsulotlar qorong'ilashdi. ¦ Tap: the panel slides in from the right (offcanvas-end) and the products dim." },
        { code: '<button class="btn-close"\n  data-bs-dismiss="offcanvas"\n  aria-label="Close"></button>', line: 2, html: shop(false), say: "Крестик закрывает панель — товары снова видно. ¦ Xoch panelni yopadi — mahsulotlar yana ko'rinadi. ¦ The close button hides the panel again." },
      ],
      takeaway: "В Bootstrap 5 это Offcanvas, в Bootstrap 6 — Drawer. Идея та же. ¦ Bootstrap 5'da bu Offcanvas, Bootstrap 6'da — Drawer. G'oya o'sha. ¦ Bootstrap 5 calls it Offcanvas, Bootstrap 6 calls it Drawer. Same idea.",
      notes: { min: 4 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Найдите ошибку ¦ Xatoni toping ¦ Find the bug",
      chat: "пишите номер строки с ошибкой ¦ xato qatorining raqamini yozing ¦ write the line number of the bug",
      snippets: [
        { title: "Панель не открывается ¦ Panel ochilmayapti ¦ The panel won't open", code: '<button data-bs-toggle="offcanvas"\n        data-bs-target="filters">\n  Filters\n</button>', lang: 'html', line: 2, explain: "Забыли # перед id. ¦ id oldidan # unutilgan. ¦ The # before the id is missing.", fix: 'data-bs-target="#filters"' },
        { title: "Иконки не видно ¦ Ikonka ko'rinmayapti ¦ The icon is invisible", code: '<i class="bi-heart"></i>', lang: 'html', line: 1, explain: "Нужны оба класса: bi и bi-heart. ¦ Ikkala klass kerak: bi va bi-heart. ¦ Both classes are needed: bi and bi-heart.", fix: '<i class="bi bi-heart"></i>' },
        { title: "Кнопка без текста ¦ Matnsiz tugma ¦ A button with no text", code: '<a href="/cart">\n  <i class="bi bi-cart3"></i>\n</a>', lang: 'html', line: 1, explain: "Добавьте aria-label — незрячим нужно знать, что это. ¦ aria-label qo'shing — ko'zi ojizlar bu nima ekanini bilishi kerak. ¦ Add aria-label so screen-reader users know what it is.", fix: '<a href="/cart" aria-label="Cart">' },
      ],
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Живые иконки и Drawer ¦ Jonli ikonkalar va Drawer ¦ Live icons and Drawer",
      chat: "какие иконки нашли на icons.getbootstrap.com? ¦ icons.getbootstrap.com'da qanday ikonkalar topdingiz? ¦ which icons did you find on icons.getbootstrap.com?",
      task: "✍️ Поменяйте иконку bi-heart на bi-star и откройте фильтры ¦ ✍️ bi-heart ikonkasini bi-star'ga almashtiring va filtrlarni oching ¦ ✍️ Swap bi-heart for bi-star and open the filters",
      steps: [
        { label: "Иконки ¦ Ikonkalar ¦ Icons", html: ICONS },
        { label: "Drawer ¦ Drawer ¦ Drawer", html: DRAWER },
      ],
      takeaway: "Иконки ищите на icons.getbootstrap.com и копируйте класс. ¦ Ikonkalarni icons.getbootstrap.com'dan qidiring va klassni nusxalang. ¦ Find icons at icons.getbootstrap.com and copy the class.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: шапка магазина ¦ Missiya: do'kon sarlavhasi ¦ Mission: a shop header",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Шапка с иконками и фильтрами готова! ¦ Ikonkali va filtrli sarlavha tayyor! ¦ The header with icons and filters is ready!",
      items: [
        { title: "Синяя иконка ¦ Ko'k ikonka ¦ A blue icon", choices: ['text-primary', 'bg-primary'], correct: 0, explain: "Иконка — текст, значит text-. ¦ Ikonka — matn, demak text-. ¦ Icons are text, so use text-." },
        { title: "Панель справа ¦ O'ngdagi panel ¦ A panel on the right", choices: ['offcanvas-end', 'offcanvas-start'], correct: 0, explain: "end — справа. ¦ end — o'ng. ¦ end is the right." },
        { title: "Кнопка только с иконкой ¦ Faqat ikonkali tugma ¦ An icon-only button", choices: ["Добавить aria-label ¦ aria-label qo'shish ¦ Add aria-label", "Ничего не нужно ¦ Hech narsa kerak emas ¦ Nothing needed"], correct: 0, explain: "Так кнопку поймут все. ¦ Shunda tugmani hamma tushunadi. ¦ Then everyone understands it." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: иконки и Drawer ¦ Xulosa: ikonkalar va Drawer ¦ Summary: icons and Drawer",
      chat: "какую иконку добавите первой? ¦ qaysi ikonkani birinchi qo'shasiz? ¦ which icon will you add first?",
      answer: "Bootstrap Icons — бесплатный набор из 2000+ иконок-шрифтов: пишем <i class=\"bi bi-heart\"></i> и красим или увеличиваем иконку как текст (text-danger, fs-1). Выдвижная панель — Offcanvas в Bootstrap 5 и Drawer в Bootstrap 6: кнопка с data-bs-toggle и data-bs-target=\"#id\" открывает её, offcanvas-end ставит справа. Кнопкам без текста добавляем aria-label. ¦ Bootstrap Icons — 2000+ shrift-ikonkadan iborat bepul to'plam: <i class=\"bi bi-heart\"></i> yozamiz va ikonkani matn kabi bo'yaymiz yoki kattalashtiramiz (text-danger, fs-1). Chiqib keladigan panel — Bootstrap 5'da Offcanvas, Bootstrap 6'da Drawer: data-bs-toggle va data-bs-target=\"#id\"li tugma uni ochadi, offcanvas-end o'ngga qo'yadi. Matnsiz tugmalarga aria-label qo'shamiz. ¦ Bootstrap Icons is a free set of 2000+ font icons: write <i class=\"bi bi-heart\"></i> and colour or resize it like text (text-danger, fs-1). The slide-out panel is Offcanvas in Bootstrap 5 and Drawer in Bootstrap 6: a button with data-bs-toggle and data-bs-target=\"#id\" opens it, and offcanvas-end puts it on the right. Icon-only buttons get aria-label.",
      icon: '⭐',
      badge: "Мастер иконок ¦ Ikonkalar ustasi ¦ Icon master",
      badgeSub: "Bootstrap · техническая 4 ¦ Bootstrap · texnik 4 ¦ Bootstrap · technical 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте в шапку своего сайта 3 иконки с aria-label. ¦ Saytingiz sarlavhasiga aria-label'li 3 ta ikonka qo'shing. ¦ Add 3 icons with aria-label to your site header.",
        "Сделайте панель фильтров справа. ¦ O'ngda filtrlar panelini yasang. ¦ Build a filter panel on the right.",
      ],
      takeaway: "Дальше: Scrollspy и Stepper. ¦ Keyingisi: Scrollspy va Stepper. ¦ Next: Scrollspy and Stepper.",
      notes: { min: 2 },
    },
  ],
});
