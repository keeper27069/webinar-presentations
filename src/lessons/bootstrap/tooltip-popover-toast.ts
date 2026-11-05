import { kit } from '@engine/kit';

const HEAD = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>';
const LIVE = `${HEAD}\n<div class="p-5 text-center">\n  <button class="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-title="Add to favourites">❤️</button>\n  <button class="btn btn-warning" data-bs-toggle="popover" data-bs-title="Delivery" data-bs-content="Free from $30, 1–2 days.">🚚 Delivery?</button>\n  <button class="btn btn-primary" id="buy">🛒 Buy</button>\n</div>\n<div class="toast-container position-fixed bottom-0 end-0 p-3">\n  <div id="t" class="toast"><div class="toast-body">✅ Added to cart!</div></div>\n</div>\n<script>\n  if (window.bootstrap) {\n  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));\n  document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));\n  buy.onclick = () => bootstrap.Toast.getOrCreateInstance(t).show();\n  }\n</script>`;

const CSS = `.wrap{position:relative;display:grid;place-items:center;height:100%;font-family:Manrope,system-ui;zoom:1.5}
.btn{position:relative;display:inline-block;padding:14px 26px;border-radius:14px;background:#fff;border:3px solid #ef4b4b;font-size:28px}
.btn.y{border-color:#e9a400;background:#fff6d6;font-size:22px;font-weight:800}
.tip{position:absolute;left:50%;bottom:calc(100% + 12px);translate:-50% 0;white-space:nowrap;padding:8px 14px;border-radius:10px;background:#16181f;color:#fff;font-size:18px;font-weight:700;opacity:0;scale:.6}
.tip::after{content:'';position:absolute;left:50%;top:100%;translate:-50% 0;border:8px solid transparent;border-top-color:#16181f}
.hover .tip{opacity:1;scale:1}.hover .btn{background:#fff1f1}
.pop{position:absolute;left:50%;top:calc(100% + 14px);translate:-50% 0;width:300px;border-radius:14px;background:#fff;box-shadow:0 12px 30px #0003;overflow:hidden;opacity:0;scale:.6;text-align:left}
.pop b{display:block;padding:10px 16px;background:#f6f7fa;font-size:18px}.pop p{margin:0;padding:12px 16px;font-size:18px}
.click .pop{opacity:1;scale:1}
.toast{position:absolute;right:30px;bottom:30px;width:300px;padding:16px 18px;border-radius:14px;background:#fff;box-shadow:0 12px 30px #0003;font-size:20px;font-weight:700;opacity:0;translate:0 40px}
.show .toast{opacity:1;translate:0 0}`;
const tipS = (on: boolean) => `<div class="wrap ${on ? 'hover' : ''}"><span class="btn">❤️<span class="tip">Add to favourites</span></span></div>`;
const popS = (on: boolean) => `<div class="wrap ${on ? 'click' : ''}"><span class="btn y">🚚 Delivery?<span class="pop"><b>Delivery</b><p>Free from $30, 1–2 days.</p></span></span></div>`;
const toastS = (on: boolean, buy: boolean) => `<div class="wrap ${on ? 'show' : ''}"><span class="btn y">${buy ? '✅ In cart' : '🛒 Buy'}</span><div class="toast">✅ Added to cart!</div></div>`;

export default kit({
  id: 'bootstrap-t03',
  title: "Tooltip, Popover и Toast ¦ Tooltip, Popover va Toast ¦ Tooltip, Popover and Toast",
  question: "Как подсказать пользователю, не загромождая страницу? ¦ Sahifani to'ldirib yubormasdan foydalanuvchiga qanday maslahat berish mumkin? ¦ How do you give users hints without cluttering the page?",
  route: ["Tooltip ¦ Tooltip ¦ Tooltip", "Popover ¦ Popover ¦ Popover", "Toast ¦ Toast ¦ Toast", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '💬',
      kicker: "Bootstrap · техническая тема 3 ¦ Bootstrap · texnik mavzu 3 ¦ Bootstrap · technical topic 3",
      title: "Три вида подсказок ¦ Maslahatlarning uch turi ¦ Three kinds of hints",
      chat: "что вас бесит больше: нет подсказки или слишком много текста? ¦ sizni nima ko'proq jahlantiradi: maslahat yo'qligimi yoki juda ko'p matnmi? ¦ what's worse: no hint or too much text?",
      lead: "Tooltip — короткая подпись при наведении. Popover — карточка по клику. Toast — уведомление в углу, которое само исчезает. ¦ Tooltip — ustiga olib borganda qisqa yozuv. Popover — bosilganda kartochka. Toast — burchakdagi o'zi yo'qoladigan bildirishnoma. ¦ Tooltip: a short label on hover. Popover: a card on click. Toast: a corner notification that fades away.",
      facts: ["Tooltip — 2–3 слова ¦ Tooltip — 2–3 so'z ¦ Tooltip: 2–3 words", "Popover — заголовок и текст ¦ Popover — sarlavha va matn ¦ Popover: title and text", "Toast — «готово!» после действия ¦ Toast — harakatdan keyin «tayyor!» ¦ Toast: “done!” after an action"],
      takeaway: "Смотрим каждую подсказку в действии. ¦ Har bir maslahatni amalda ko'ramiz. ¦ Let's see each one in action.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 0,
      title: "Tooltip: подпись при наведении ¦ Tooltip: ustiga olib borganda yozuv ¦ Tooltip: a label on hover",
      chat: "что значит кнопка-сердечко без подписи? ¦ yozuvsiz yurakcha-tugma nimani anglatadi? ¦ what does a heart button mean without a label?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<button class="btn">❤️</button>', html: tipS(false), say: "Кнопка-иконка. Непонятно: лайк? избранное? ¦ Ikonka-tugma. Tushunarsiz: layk? sevimlilar? ¦ An icon button. Like? Favourite? Unclear." },
        { code: '<button class="btn"\n  data-bs-toggle="tooltip"\n  data-bs-title="Add to favourites">\n  ❤️\n</button>', line: 3, html: tipS(false), say: "Добавили два атрибута: тип подсказки и её текст. ¦ Ikkita atribut qo'shdik: maslahat turi va uning matni. ¦ Add two attributes: the hint type and its text." },
        { code: '/* 🖱️ hover */', html: tipS(true), say: "Навели мышку — над кнопкой появилась подпись! ¦ Sichqonchani olib keldik — tugma ustida yozuv paydo bo'ldi! ¦ Hover — a label pops up above the button!" },
      ],
      takeaway: "Tooltip объясняет иконку в 2–3 словах. ¦ Tooltip ikonkani 2–3 so'zda tushuntiradi. ¦ A tooltip explains an icon in 2–3 words.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Popover: карточка по клику ¦ Popover: bosilganda kartochka ¦ Popover: a card on click",
      chat: "что ещё можно спрятать в popover? ¦ popover'ga yana nimani yashirish mumkin? ¦ what else could go in a popover?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<button data-bs-toggle="popover"\n  data-bs-title="Delivery"\n  data-bs-content="Free from $30…">\n  🚚 Delivery?\n</button>', line: 1, html: popS(false), say: "У popover есть заголовок и текст. ¦ Popover'da sarlavha va matn bor. ¦ A popover has a title and text." },
        { code: '/* 👆 click */', html: popS(true), say: "Клик — выпала карточка с подробностями. ¦ Bosildi — tafsilotlar bilan kartochka chiqdi. ¦ Click and a card with details drops down." },
        { code: '/* 👆 click again */', html: popS(false), say: "Ещё клик — карточка спряталась. Страница снова чистая. ¦ Yana bosish — kartochka yashirindi. Sahifa yana toza. ¦ Click again and it hides. The page is clean again." },
      ],
      takeaway: "Popover — когда нужно больше пары слов. ¦ Popover — bir-ikki so'zdan ko'proq kerak bo'lganda. ¦ Use a popover when you need more than a few words.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Toast: «Готово!» в углу ¦ Toast: burchakda «Tayyor!» ¦ Toast: “Done!” in the corner",
      chat: "где вы видели такие уведомления? ¦ bunday bildirishnomalarni qayerda ko'rgansiz? ¦ where have you seen notifications like this?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<div class="toast" id="t">\n  ✅ Added to cart!\n</div>', html: toastS(false, false), say: "Toast спрятан, пока ничего не случилось. ¦ Hech narsa bo'lmaguncha toast yashirin. ¦ The toast stays hidden until something happens." },
        { code: "buy.onclick = () =>\n  bootstrap.Toast\n    .getOrCreateInstance(t).show();", lang: 'js', line: 3, html: toastS(true, true), say: "Нажали «Купить» — в углу всплыло «Добавлено!». ¦ «Sotib olish» bosildi — burchakda «Qo'shildi!» chiqdi. ¦ Tap “Buy” and “Added!” pops up in the corner." },
        { code: '/* ⏱️ 5 s */', html: toastS(false, true), say: "Через пару секунд он сам исчезает — ничего не мешает. ¦ Bir necha soniyadan keyin u o'zi yo'qoladi — hech narsa xalaqit bermaydi. ¦ After a few seconds it disappears by itself." },
      ],
      takeaway: "Toast подтверждает действие и не мешает. ¦ Toast harakatni tasdiqlaydi va xalaqit bermaydi. ¦ A toast confirms an action without getting in the way.",
      notes: { min: 4 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "Важная деталь: их нужно «включить» ¦ Muhim tafsilot: ularni «yoqish» kerak ¦ Key detail: they must be “switched on”",
      chat: "почему подсказка может не появиться? ¦ nega maslahat paydo bo'lmasligi mumkin? ¦ why might a hint not appear?",
      left: { icon: '😕', label: "Только HTML ¦ Faqat HTML ¦ HTML only", code: `<button data-bs-toggle="tooltip"\n  data-bs-title="Hi">❤️</button>\n<!-- 😶 … -->`, lang: 'html', points: ["Подсказка молчит ¦ Maslahat jim ¦ The hint stays silent"] },
      right: { icon: '😃', label: "HTML + одна строка JS ¦ HTML + bitta qator JS ¦ HTML + one JS line", code: `document\n  .querySelectorAll('[data-bs-toggle="tooltip"]')\n  .forEach(el => new bootstrap.Tooltip(el));`, lang: 'js', points: ["Работает! ¦ Ishlaydi! ¦ It works!"] },
      verdict: "Tooltip и Popover Bootstrap не включает сам — добавьте эту строку один раз. ¦ Bootstrap Tooltip va Popover'ni o'zi yoqmaydi — bu qatorni bir marta qo'shing. ¦ Bootstrap doesn't switch tooltips and popovers on by itself — add this line once.",
      notes: { min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Что выбрать? ¦ Nimani tanlash kerak? ¦ Which one?",
      chat: "пишите: «1 — Toast» ¦ yozing: «1 — Toast» ¦ write: “1 — Toast”",
      zones: [
        { id: 't', label: 'Tooltip', icon: '🏷️' },
        { id: 'p', label: 'Popover', icon: '🗨️' },
        { id: 's', label: 'Toast', icon: '🍞' },
      ],
      items: [
        { text: "Подпись к иконке 🗑️ ¦ 🗑️ ikonkasiga yozuv ¦ A label for the 🗑️ icon", zone: 't' },
        { text: "«Сообщение отправлено ✓» ¦ «Xabar yuborildi ✓» ¦ “Message sent ✓”", zone: 's' },
        { text: "Правила возврата товара ¦ Mahsulotni qaytarish qoidalari ¦ Return policy details", zone: 'p' },
        { text: "«Сохранено!» после нажатия ¦ Bosilgandan keyin «Saqlandi!» ¦ “Saved!” after a click", zone: 's' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Все три вместе ¦ Uchalasi birga ¦ All three together",
      chat: "поменяйте текст подсказок на свой! ¦ maslahatlar matnini o'zingiznikiga almashtiring! ¦ change the hint texts to your own!",
      task: "✍️ Наведите на ❤️, нажмите «Delivery?» и «Buy» ¦ ✍️ ❤️ ustiga olib boring, «Delivery?» va «Buy»ni bosing ¦ ✍️ Hover ❤️, click “Delivery?” and “Buy”",
      steps: [{ label: "Подсказки ¦ Maslahatlar ¦ Hints", html: LIVE }],
      takeaway: "Три подсказки — и страница остаётся чистой. ¦ Uchta maslahat — va sahifa toza qoladi. ¦ Three hints and the page stays clean.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: подсказки в магазине ¦ Missiya: do'kondagi maslahatlar ¦ Mission: hints in a shop",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Покупателям всё понятно! ¦ Xaridorlarga hammasi tushunarli! ¦ Shoppers understand everything!",
      items: [
        { title: "Tooltip не появляется ¦ Tooltip paydo bo'lmayapti ¦ The tooltip doesn't appear", choices: ["Добавить new bootstrap.Tooltip ¦ new bootstrap.Tooltip qo'shish ¦ Add new bootstrap.Tooltip", "Поменять цвет кнопки ¦ Tugma rangini o'zgartirish ¦ Change the button colour"], correct: 0, explain: "Tooltip нужно включить скриптом. ¦ Tooltip'ni skript bilan yoqish kerak. ¦ Tooltips need a script to switch on." },
        { title: "Где текст подсказки? ¦ Maslahat matni qayerda? ¦ Where does the hint text go?", choices: ['data-bs-title', 'data-bs-target'], correct: 0, explain: "title — что написать. ¦ title — nima yozish. ¦ title holds the text." },
        { title: "Что сообщит «Оплачено»? ¦ «To'landi»ni nima bildiradi? ¦ What should say “Paid”?", choices: ['Toast', 'Tooltip'], correct: 0, explain: "Toast подтверждает действие. ¦ Toast harakatni tasdiqlaydi. ¦ Toasts confirm actions." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Tooltip, Popover, Toast ¦ Xulosa: Tooltip, Popover, Toast ¦ Summary: Tooltip, Popover, Toast",
      chat: "какую подсказку добавите на свой сайт? ¦ saytingizga qaysi maslahatni qo'shasiz? ¦ which hint will you add to your site?",
      answer: "Tooltip — короткая подпись при наведении (data-bs-toggle=\"tooltip\" и data-bs-title). Popover — карточка с заголовком и текстом по клику. Toast — уведомление в углу, которое подтверждает действие и само исчезает. Tooltip и Popover нужно включить одной строкой JavaScript, а Toast показывают методом show(). ¦ Tooltip — ustiga olib borganda qisqa yozuv (data-bs-toggle=\"tooltip\" va data-bs-title). Popover — bosilganda sarlavha va matnli kartochka. Toast — burchakdagi bildirishnoma, u harakatni tasdiqlaydi va o'zi yo'qoladi. Tooltip va Popover'ni bitta qator JavaScript bilan yoqish kerak, Toast esa show() metodi bilan ko'rsatiladi. ¦ A tooltip is a short hover label (data-bs-toggle=\"tooltip\" and data-bs-title). A popover is a click card with a title and text. A toast is a corner notification that confirms an action and fades away. Tooltips and popovers are switched on with one line of JavaScript; toasts are shown with show().",
      icon: '💬',
      badge: "Мастер подсказок ¦ Maslahatlar ustasi ¦ Hint master",
      badgeSub: "Bootstrap · техническая 3 ¦ Bootstrap · texnik 3 ¦ Bootstrap · technical 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте tooltip ко всем кнопкам-иконкам на своём сайте. ¦ Saytingizdagi barcha ikonka-tugmalarga tooltip qo'shing. ¦ Add tooltips to every icon button on your site.",
        "Сделайте toast «Спасибо!» после отправки формы. ¦ Forma yuborilgandan keyin «Rahmat!» toast'ini yasang. ¦ Show a “Thank you!” toast after a form is sent.",
      ],
      takeaway: "Дальше: иконки Bootstrap и выдвижная панель Drawer. ¦ Keyingisi: Bootstrap ikonkalari va Drawer paneli. ¦ Next: Bootstrap Icons and the Drawer panel.",
      notes: { min: 2 },
    },
  ],
});
