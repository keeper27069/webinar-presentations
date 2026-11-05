import { kit } from '@engine/kit';

const page = (main: string, bg: string, radius: number) =>
  `<div style="--main:${main};--bg:${bg};--r:${radius}px" class="site"><header>🍋 Lemon Café</header><div class="cards"><div>☕</div><div>🧁</div><div>🥐</div></div><button>Order</button></div>`;
const CSS = `.site{padding:22px;border-radius:24px;background:var(--bg)}
.site header{padding:16px 20px;border-radius:var(--r);background:var(--main);color:#fff;font:800 28px Manrope,system-ui}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:16px 0}
.cards div{height:110px;display:grid;place-items:center;font-size:54px;border-radius:var(--r);background:#fff;border:4px solid var(--main)}
.site button{padding:14px 30px;border:0;border-radius:var(--r);background:var(--main);color:#fff;font:800 24px Manrope,system-ui}`;

export default kit({
  id: 'css-t04',
  title: "CSS-переменные ¦ CSS o'zgaruvchilari ¦ CSS variables",
  question: "Как поменять цвет всего сайта, исправив одну строчку? ¦ Bitta qatorni tuzatib, butun sayt rangini qanday o'zgartirish mumkin? ¦ How do you recolour a whole site by editing one line?",
  route: ["Проблема ¦ Muammo ¦ The problem", "Переменная ¦ O'zgaruvchi ¦ The variable", "Темы ¦ Mavzular ¦ Themes", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎨',
      kicker: "CSS · техническая тема 4 ¦ CSS · texnik mavzu 4 ¦ CSS · technical topic 4",
      title: "Один цвет — на весь сайт ¦ Bitta rang — butun sayt uchun ¦ One colour for the whole site",
      chat: "сколько раз на сайте повторяется главный цвет? ¦ saytda asosiy rang necha marta takrorlanadi? ¦ how often does the main colour repeat on a site?",
      lead: "Главный цвет стоит в шапке, кнопках и рамках. Переменная хранит его в одном месте — поменяли там, поменялось везде. ¦ Asosiy rang sarlavhada, tugmalarda va ramkalarda turadi. O'zgaruvchi uni bir joyda saqlaydi — u yerda o'zgartirdik, hamma joyda o'zgardi. ¦ The main colour sits in the header, buttons and borders. A variable stores it in one place — change it there and it changes everywhere.",
      facts: ["--main: — создать ¦ --main: — yaratish ¦ --main: creates it", "var(--main) — взять ¦ var(--main) — olish ¦ var(--main) uses it", "Одна правка — весь сайт ¦ Bitta tuzatish — butun sayt ¦ One edit, whole site"],
      takeaway: "Смотрите, как кафе меняет цвет одной строчкой. ¦ Kafe bitta qator bilan rangini qanday o'zgartirishini ko'ring. ¦ Watch a café change colour with one line.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Меняем одну строчку ¦ Bitta qatorni o'zgartiramiz ¦ Changing one line",
      chat: "какой цвет поставим следующим? ¦ keyingi qaysi rangni qo'yamiz? ¦ which colour next?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: ':root {\n  --main: #e9a400;\n}\nheader, button { background: var(--main); }', line: 2, html: page('#e9a400', '#fff8e1', 14), say: "--main — жёлтый. Шапка, кнопка и рамки — жёлтые. ¦ --main — sariq. Sarlavha, tugma va ramkalar — sariq. ¦ --main is yellow: header, button and borders are yellow." },
        { code: ':root {\n  --main: #0fb5a6;\n}', line: 2, html: page('#0fb5a6', '#e8faf7', 14), say: "Поменяли одно значение — всё стало бирюзовым! ¦ Bitta qiymatni o'zgartirdik — hammasi feruza rangga kirdi! ¦ One value changed — everything turns teal!" },
        { code: ':root {\n  --main: #7c5cff;\n}', line: 2, html: page('#7c5cff', '#f1edff', 14), say: "И фиолетовым. Ничего больше не трогали. ¦ Va binafsha. Boshqa hech narsaga tegmadik. ¦ And purple. Nothing else touched." },
      ],
      takeaway: "Переменная = ярлык с цветом: пишем имя, а не цвет. ¦ O'zgaruvchi = rangli yorliq: rangni emas, nomni yozamiz. ¦ A variable is a labelled jar: you write the name, not the colour.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Не только цвета ¦ Faqat ranglar emas ¦ Not just colours",
      chat: "какие углы красивее — острые или круглые? ¦ qaysi burchaklar chiroyliroq — o'tkirmi yoki yumaloqmi? ¦ which corners look nicer — sharp or round?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: ':root {\n  --r: 0px;\n}', line: 2, html: page('#f2573a', '#fff1ec', 0), say: "--r = 0: острые углы — строгий стиль. ¦ --r = 0: o'tkir burchaklar — qat'iy uslub. ¦ --r = 0: sharp corners — a strict look." },
        { code: ':root {\n  --r: 30px;\n}', line: 2, html: page('#f2573a', '#fff1ec', 30), say: "--r = 30px: всё скруглилось сразу! ¦ --r = 30px: hammasi birdaniga yumaloqlandi! ¦ --r = 30px: everything rounds at once!" },
      ],
      takeaway: "В переменных хранят цвета, скругления, отступы и шрифты. ¦ O'zgaruvchilarda ranglar, yumaloqlashlar, bo'shliqlar va shriftlar saqlanadi. ¦ Variables hold colours, roundness, spacing and fonts.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Тёмная тема за секунду ¦ Bir soniyada qorong'i mavzu ¦ Dark mode in a second",
      chat: "вы пользуетесь тёмной темой? ¦ qorong'i mavzudan foydalanasizmi? ¦ do you use dark mode?",
      actors: [
        { id: 'btn', icon: '🌙', label: "Тёмная тема ¦ Qorong'i mavzu ¦ Dark mode" },
        { id: 'vars', text: '--bg: #fff → #111' },
        { id: 'site', icon: '🖥️', label: "Весь сайт ¦ Butun sayt ¦ The whole site" },
      ],
      steps: [
        { say: "Пользователь нажал «тёмная тема». ¦ Foydalanuvchi «qorong'i mavzu»ni bosdi. ¦ The user taps “dark mode”.", at: { btn: [15, 50], site: [85, 50] }, pulse: ['btn'] },
        { say: "Меняются всего пара переменных… ¦ Faqat bir nechta o'zgaruvchi o'zgaradi… ¦ Only a couple of variables change…", at: { vars: [50, 50] }, lines: [['btn', 'vars']], pulse: ['vars'] },
        { say: "…и весь сайт становится тёмным. ¦ …va butun sayt qorong'i bo'ladi. ¦ …and the whole site goes dark.", set: { site: { icon: '🌚' } }, lines: [['btn', 'vars'], ['vars', 'site']], pulse: ['site'] },
      ],
      takeaway: "Так делают тёмную тему в YouTube и Telegram. ¦ YouTube va Telegram'da qorong'i mavzu shunday qilinadi. ¦ That's how YouTube and Telegram do dark mode.",
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Перекрасьте сайт ¦ Saytni qayta bo'yang ¦ Recolour the site",
      chat: "какой цвет предложите? код или название! ¦ qanday rang taklif qilasiz? kod yoki nom! ¦ suggest a colour — code or name!",
      task: "✍️ Поменяйте --main и --r в :root ¦ ✍️ :root'dagi --main va --r'ni o'zgartiring ¦ ✍️ Change --main and --r in :root",
      steps: [{ label: "Кафе ¦ Kafe ¦ Café", html: '<header>🍋 Lemon Café</header>\n<button>Order</button>\n<button>Menu</button>', css: ':root {\n  --main: #e9a400;\n  --r: 14px;\n}\nbody { font-family: Manrope, system-ui; }\nheader {\n  padding: 18px; margin-bottom: 14px;\n  border-radius: var(--r);\n  background: var(--main); color: #fff;\n  font-size: 26px; font-weight: 800;\n}\nbutton {\n  padding: 12px 24px; border: 3px solid var(--main);\n  border-radius: var(--r); background: #fff;\n  font-size: 20px; font-weight: 800;\n}' }],
      takeaway: "Меняете две строчки сверху — меняется весь дизайн. ¦ Yuqoridagi ikki qatorni o'zgartirasiz — butun dizayn o'zgaradi. ¦ Edit two lines at the top and the whole design changes.",
      notes: { min: 6 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: дизайнер тем ¦ Missiya: mavzular dizayneri ¦ Mission: theme designer",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Тема меняется одной строчкой! ¦ Mavzu bitta qator bilan o'zgaradi! ¦ The theme changes in one line!",
      items: [
        { title: "Создать переменную ¦ O'zgaruvchi yaratish ¦ Create a variable", choices: ['--main: red;', 'var main = red;'], correct: 0, explain: "Два дефиса в начале. ¦ Boshida ikkita defis. ¦ Two dashes at the start." },
        { title: "Использовать переменную ¦ O'zgaruvchidan foydalanish ¦ Use a variable", choices: ['color: var(--main);', 'color: --main;'], correct: 0, explain: "Через var(). ¦ var() orqali. ¦ Through var()." },
        { title: "Где хранить общие переменные? ¦ Umumiy o'zgaruvchilarni qayerda saqlash kerak? ¦ Where do shared variables go?", choices: [':root', 'button'], correct: 0, explain: ":root — для всей страницы. ¦ :root — butun sahifa uchun. ¦ :root covers the whole page." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: CSS-переменные ¦ Xulosa: CSS o'zgaruvchilari ¦ Summary: CSS variables",
      chat: "пришлите свою цветовую тему! ¦ o'z rang mavzuingizni yuboring! ¦ share your colour theme!",
      answer: "Переменная хранит значение в одном месте: --main: #e9a400 в :root, а потом var(--main) везде, где нужен этот цвет. Поменяли одну строчку — перекрасились шапка, кнопки и рамки. Так же хранят скругления и отступы, а тёмная тема — это просто другие значения переменных. ¦ O'zgaruvchi qiymatni bir joyda saqlaydi: :root'da --main: #e9a400, keyin esa bu rang kerak bo'lgan hamma joyda var(--main). Bitta qatorni o'zgartirdik — sarlavha, tugmalar va ramkalar qayta bo'yaldi. Yumaloqlash va bo'shliqlar ham shunday saqlanadi, qorong'i mavzu esa shunchaki o'zgaruvchilarning boshqa qiymatlari. ¦ A variable keeps a value in one place: --main: #e9a400 in :root, then var(--main) wherever you need that colour. Change one line and the header, buttons and borders recolour. Roundness and spacing work the same, and dark mode is just different variable values.",
      icon: '🎨',
      badge: "Дизайнер тем ¦ Mavzular dizayneri ¦ Theme designer",
      badgeSub: "CSS · техническая 4 ¦ CSS · texnik 4 ¦ CSS · technical 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Вынесите в переменные цвет, фон и скругление своего сайта. ¦ Saytingizning rangi, foni va yumaloqlashini o'zgaruvchilarga chiqaring. ¦ Move your site's colour, background and roundness into variables.",
        "Сделайте 3 версии темы, меняя только :root. ¦ Faqat :root'ni o'zgartirib, mavzuning 3 ta versiyasini yarating. ¦ Make 3 theme versions by changing only :root.",
      ],
      takeaway: "Дальше: ::before и ::after — украшения без лишних тегов. ¦ Keyingisi: ::before va ::after — ortiqcha teglarsiz bezaklar. ¦ Next: ::before and ::after — decorations without extra tags.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
