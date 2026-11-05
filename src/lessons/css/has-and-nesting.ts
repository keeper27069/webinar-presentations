import { kit } from '@engine/kit';

const CSS = `.list{width:440px;margin:20px auto;display:grid;gap:10px;font-family:Manrope,system-ui}
.item{display:flex;align-items:center;gap:14px;padding:16px 20px;border-radius:16px;background:#fff;border:3px solid #e6e8ee;font-size:24px;font-weight:700}
.box{width:28px;height:28px;border-radius:8px;border:3px solid #cfd3dc;display:grid;place-items:center;font-size:18px}
.item.checked{background:#e8faf7;border-color:#0fb5a6;text-decoration:line-through;color:#5c6275}
.item.checked .box{background:#0fb5a6;border-color:#0fb5a6;color:#fff}
.form{width:440px;margin:20px auto;padding:20px;border-radius:20px;border:4px solid #e6e8ee;font-family:Manrope,system-ui}
.form.bad{border-color:#ef4b4b;background:#fff1f1}
.form input{width:100%;padding:12px;border-radius:12px;border:2px solid #cfd3dc;font-size:20px}
.form .msg{margin-top:8px;color:#ef4b4b;font-weight:800;opacity:0}.form.bad .msg{opacity:1}`;
const items = (checked: number[]) =>
  `<div class="list">${['🥛 Milk', '🍞 Bread', '🍎 Apples'].map((t, i) => `<div class="item ${checked.includes(i) ? 'checked' : ''}"><span class="box">${checked.includes(i) ? '✓' : ''}</span>${t}</div>`).join('')}</div>`;

export default kit({
  id: 'css-t10',
  title: "Новое в CSS: :has() и вложенность ¦ CSS'dagi yangiliklar: :has() va ichma-ichlik ¦ New in CSS: :has() and nesting",
  question: "Как CSS научился «смотреть внутрь» блока и сам менять его стиль? ¦ CSS blok «ichiga qarashni» va uning uslubini o'zi o'zgartirishni qanday o'rgandi? ¦ How did CSS learn to look inside a block and restyle it by itself?",
  route: ["Новинки ¦ Yangiliklar ¦ What's new", ":has() ¦ :has() ¦ :has()", "Форма ¦ Forma ¦ Forms", "Вложенность ¦ Ichma-ichlik ¦ Nesting", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🆕',
      kicker: "CSS · техническая тема 10 ¦ CSS · texnik mavzu 10 ¦ CSS · technical topic 10",
      title: "CSS стал умнее ¦ CSS aqlliroq bo'ldi ¦ CSS got smarter",
      chat: "что раньше делали только на JavaScript? ¦ ilgari nimani faqat JavaScript'da qilishardi? ¦ what used to need JavaScript?",
      lead: ":has() спрашивает: «есть ли внутри отмеченная галочка?» — и меняет стиль всей карточки. Без JavaScript! ¦ :has() so'raydi: «ichida belgilangan katakcha bormi?» — va butun kartochka uslubini o'zgartiradi. JavaScript'siz! ¦ :has() asks “is there a ticked box inside?” and restyles the whole card. No JavaScript!",
      facts: [":has() — «если внутри есть…» ¦ :has() — «agar ichida … bo'lsa» ¦ :has() — “if it contains…”", "Вложенность — стили внутри стилей ¦ Ichma-ichlik — uslub ichida uslub ¦ Nesting — styles inside styles", "Работает в новых браузерах ¦ Yangi brauzerlarda ishlaydi ¦ Works in modern browsers"],
      takeaway: "Две новинки, которые экономят много кода. ¦ Ko'p kodni tejaydigan ikkita yangilik. ¦ Two new features that save lots of code.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: ":has() — список покупок ¦ :has() — xaridlar ro'yxati ¦ :has() — a shopping list",
      chat: "что отметим купленным? ¦ nimani sotib olingan deb belgilaymiz? ¦ what shall we tick off?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.item:has(input:checked) {\n  background: #e8faf7;\n  text-decoration: line-through;\n}', line: 1, html: items([]), say: "Правило: «пункт, внутри которого стоит галочка». ¦ Qoida: «ichida belgi turgan band». ¦ The rule: “an item that contains a ticked box”." },
        { code: '.item:has(input:checked) {\n  background: #e8faf7;\n  text-decoration: line-through;\n}\n\n/* ✓ Milk */', line: 6, html: items([0]), say: "Поставили галочку — весь пункт стал зелёным и зачёркнутым! ¦ Belgi qo'ydik — butun band yashil va chizilgan bo'ldi! ¦ Tick it and the whole item turns green and struck through!" },
        { code: '.item:has(input:checked) {\n  background: #e8faf7;\n  text-decoration: line-through;\n}\n\n/* ✓ Milk  ✓ Apples */', line: 6, html: items([0, 2]), say: "Работает для каждого пункта отдельно. ¦ Har bir band uchun alohida ishlaydi. ¦ It works for each item separately." },
      ],
      takeaway: ":has() — это «родитель, если внутри есть…». ¦ :has() — bu «agar ichida … bo'lsa, ota-ona». ¦ :has() means “the parent, if it contains…”.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Форма сама подсвечивает ошибку ¦ Forma xatoni o'zi ajratib ko'rsatadi ¦ A form that flags its own error",
      chat: "что будет, если ввести неправильный email? ¦ noto'g'ri email kiritilsa nima bo'ladi? ¦ what happens with a wrong email?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '<input type="email">', lang: 'html', html: '<div class="form"><input placeholder="email"><div class="msg">✗</div></div>', say: "Поле для почты. ¦ Pochta uchun maydon. ¦ An email field." },
        { code: '.form:has(input:invalid) {\n  border-color: red;\n}', line: 1, html: '<div class="form bad"><input value="lola@"><div class="msg">✗ Check the email</div></div>', say: "Ввели «lola@» — вся форма покраснела. ¦ «lola@» kiritildi — butun forma qizardi. ¦ Type “lola@” and the whole form turns red." },
        { code: '.form:has(input:invalid) {\n  border-color: red;\n}\n\n/* lola@mail.uz ✓ */', line: 5, html: '<div class="form"><input value="lola@mail.uz"><div class="msg">✗</div></div>', say: "Исправили — рамка снова спокойная. ¦ Tuzatildi — ramka yana tinch. ¦ Fixed — the frame calms down." },
      ],
      takeaway: "Раньше для этого писали JavaScript. Теперь — одна строка CSS. ¦ Ilgari buning uchun JavaScript yozishardi. Endi — bitta qator CSS. ¦ This used to need JavaScript. Now it's one line of CSS.",
      notes: { min: 4 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "Вложенность: стили внутри стилей ¦ Ichma-ichlik: uslub ichida uslub ¦ Nesting: styles inside styles",
      chat: "какой код короче и понятнее? ¦ qaysi kod qisqaroq va tushunarliroq? ¦ which code is shorter and clearer?",
      left: { icon: '📜', label: "Как раньше ¦ Avvalgidek ¦ The old way", code: `.card { padding: 20px; }\n.card h3 { font-size: 24px; }\n.card p { color: gray; }\n.card:hover { scale: 1.05; }`, lang: 'css' },
      right: { icon: '🪆', label: "С вложенностью ¦ Ichma-ichlik bilan ¦ With nesting", code: `.card {\n  padding: 20px;\n  h3 { font-size: 24px; }\n  p { color: gray; }\n  &:hover { scale: 1.05; }\n}`, lang: 'css' },
      verdict: "Всё про карточку — в одном месте, как вложенность в HTML. & — «сама карточка». ¦ Kartochka haqidagi hamma narsa — bir joyda, HTML'dagi ichma-ichlik kabi. & — «kartochkaning o'zi». ¦ Everything about the card in one place, like nesting in HTML. & means “the card itself”.",
      notes: { min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Список с галочками ¦ Belgili ro'yxat ¦ A checklist",
      chat: "что добавим в список? ¦ ro'yxatga nima qo'shamiz? ¦ what shall we add to the list?",
      task: "✍️ Ставьте галочки и поменяйте цвет в :has() ¦ ✍️ Belgilar qo'ying va :has()'dagi rangni o'zgartiring ¦ ✍️ Tick boxes and change the colour in :has()",
      steps: [{ label: "Список ¦ Ro'yxat ¦ List", html: '<label class="item"><input type="checkbox"> 🥛 Milk</label>\n<label class="item"><input type="checkbox"> 🍞 Bread</label>\n<label class="item"><input type="checkbox"> 🍎 Apples</label>', css: 'body { font-family: Manrope, system-ui; }\n.item {\n  display: block; padding: 14px 18px; margin: 8px 0;\n  border-radius: 14px; background: #f4f5f8;\n  font-size: 22px; transition: all 0.3s;\n  &:has(input:checked) {\n    background: #d1fae5;\n    text-decoration: line-through;\n  }\n}' }],
      takeaway: "Тут сразу и :has(), и вложенность через &. ¦ Bu yerda ham :has(), ham & orqali ichma-ichlik bor. ¦ This uses both :has() and nesting with &.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: умный CSS ¦ Missiya: aqlli CSS ¦ Mission: smart CSS",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "CSS работает без JavaScript! ¦ CSS JavaScript'siz ishlaydi! ¦ CSS works without JavaScript!",
      items: [
        { title: "Карточка, в которой есть картинка ¦ Ichida rasm bor kartochka ¦ A card containing an image", choices: ['.card:has(img)', '.card img'], correct: 0, explain: ".card img — сама картинка, а :has — карточка. ¦ .card img — rasmning o'zi, :has esa — kartochka. ¦ .card img is the image; :has selects the card." },
        { title: "Что значит & во вложенности? ¦ Ichma-ichlikda & nimani anglatadi? ¦ What does & mean in nesting?", choices: ["Сам этот блок ¦ Shu blokning o'zi ¦ The block itself", "Любой тег ¦ Istalgan teg ¦ Any tag"], correct: 0, explain: "&:hover = .card:hover. ¦ &:hover = .card:hover. ¦ &:hover = .card:hover." },
        { title: "Где удобнее хранить стили карточки? ¦ Kartochka uslublarini qayerda saqlash qulayroq? ¦ Where are card styles tidiest?", choices: ["В одном вложенном блоке ¦ Bitta ichma-ich blokda ¦ In one nested block", "По всему файлу ¦ Butun fayl bo'ylab ¦ All over the file"], correct: 0, explain: "Всё в одном месте. ¦ Hammasi bir joyda. ¦ All in one place." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: :has() и вложенность ¦ Xulosa: :has() va ichma-ichlik ¦ Summary: :has() and nesting",
      chat: "где на своём сайте вы примените :has()? ¦ saytingizda :has()'ni qayerda qo'llaysiz? ¦ where will you use :has() on your site?",
      answer: ":has() выбирает блок, если внутри него есть что-то нужное: .item:has(input:checked) красит пункт с галочкой, .form:has(input:invalid) подсвечивает форму с ошибкой — без JavaScript. Вложенность позволяет писать стили внутри стилей: всё про карточку в одном блоке, а & означает сам блок, например &:hover. ¦ :has() blokni, agar uning ichida kerakli narsa bo'lsa, tanlaydi: .item:has(input:checked) belgili bandni bo'yaydi, .form:has(input:invalid) xatoli formani ajratib ko'rsatadi — JavaScript'siz. Ichma-ichlik uslub ichida uslub yozishga imkon beradi: kartochka haqidagi hamma narsa bitta blokda, & esa blokning o'zini anglatadi, masalan &:hover. ¦ :has() selects a block if it contains something: .item:has(input:checked) colours a ticked item, .form:has(input:invalid) flags a form with an error — no JavaScript. Nesting lets you write styles inside styles: everything about the card in one block, and & means the block itself, as in &:hover.",
      icon: '🆕',
      badge: "Современный верстальщик ¦ Zamonaviy maketchi ¦ Modern coder",
      badgeSub: "CSS · техническая 10 ¦ CSS · texnik 10 ¦ CSS · technical 10",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте список дел, где выполненные пункты зачёркиваются через :has(). ¦ Bajarilgan bandlar :has() orqali chiziladigan vazifalar ro'yxatini yarating. ¦ Make a to-do list where :has() strikes through done items.",
        "Перепишите стили одной карточки через вложенность. ¦ Bitta kartochka uslublarini ichma-ichlik orqali qayta yozing. ¦ Rewrite one card's styles with nesting.",
      ],
      takeaway: "Модуль CSS почти пройден! Дальше — Bootstrap. ¦ CSS moduli deyarli tugadi! Keyingisi — Bootstrap. ¦ CSS module almost done! Next: Bootstrap.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
