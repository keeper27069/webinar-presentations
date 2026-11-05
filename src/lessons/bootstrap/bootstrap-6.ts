import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.card{width:440px;padding:24px;border-radius:18px;background:#fff;box-shadow:0 10px 30px #0001;display:grid;gap:14px}
.ver{justify-self:start;padding:4px 12px;border-radius:8px;font:800 16px JetBrains Mono,monospace;background:#ede9ff;color:#5b3fd6}
.box{padding:16px;border-radius:12px;font-size:22px;font-weight:700}
.sub{background:#e7efff;color:#1d4ed8}
.lnk{font-size:22px;color:#3d7bff;text-decoration:underline;text-underline-offset:6px}
.muted{font-size:20px;color:#6b7183}.plain{font-size:20px;color:#16181f}
.broken{outline:3px dashed #ef4b4b;outline-offset:6px;border-radius:6px}
.err{color:#ef4b4b;font-weight:800;font-size:18px}`;
const card = (ver: string, inner: string) => `<div class="wrap"><div class="card"><span class="ver">${ver}</span>${inner}</div></div>`;
const BOX = '<div class="box sub">Subtle blue box</div><a class="lnk">A link with offset</a>';

export default kit({
  id: 'bootstrap-t01',
  title: "Новый Bootstrap 6 ¦ Yangi Bootstrap 6 ¦ The new Bootstrap 6",
  question: "Что изменилось в Bootstrap 6 — и как не запутаться между версиями? ¦ Bootstrap 6'da nima o'zgardi — va versiyalar orasida qanday adashmaslik kerak? ¦ What changed in Bootstrap 6 — and how do you avoid mixing versions up?",
  route: ["История ¦ Tarix ¦ History", "Новое ¦ Yangi ¦ What's new", "Имена ¦ Nomlar ¦ Names", "Не запутаться ¦ Adashmaslik ¦ Stay on track", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🅱️',
      kicker: "Bootstrap · техническая тема 1 ¦ Bootstrap · texnik mavzu 1 ¦ Bootstrap · technical topic 1",
      title: "Версия шесть ¦ Oltinchi versiya ¦ Version six",
      chat: "какую версию Bootstrap вы подключаете сейчас? ¦ hozir Bootstrap'ning qaysi versiyasini ulayapsiz? ¦ which Bootstrap version do you use now?",
      lead: "8 октября 2026 года вышла первая альфа-версия Bootstrap 6. Компоненты те же по смыслу, но часть имён поменялась. ¦ 2026 yil 8 oktyabrda Bootstrap 6'ning birinchi alfa-versiyasi chiqdi. Komponentlar ma'nosi bo'yicha o'sha, lekin ba'zi nomlar o'zgardi. ¦ The first alpha of Bootstrap 6 shipped on 8 October 2026. The components mean the same, but some names changed.",
      facts: ["Это альфа — ещё не финал ¦ Bu alfa — hali yakuniy emas ¦ It's an alpha, not final", "Bootstrap 5 продолжает работать ¦ Bootstrap 5 ishlashda davom etadi ¦ Bootstrap 5 keeps working", "Часть классов переименовали ¦ Ba'zi klasslar qayta nomlandi ¦ Some classes were renamed"],
      takeaway: "Bootstrap 6 alpha — для экспериментов, проекты пока делают на Bootstrap 5. ¦ Bootstrap 6 alpha — tajriba uchun, loyihalar hozircha Bootstrap 5'da qilinadi. ¦ Bootstrap 6 alpha is for experiments; projects still use Bootstrap 5.",
      notes: { say: ["Факты сверены с release notes v6.0.0-alpha.1 на GitHub (8 окт. 2026). До стабильного релиза детали могут измениться."], min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Как рос Bootstrap ¦ Bootstrap qanday o'sdi ¦ How Bootstrap grew",
      chat: "сколько лет Bootstrap? угадайте ¦ Bootstrap necha yoshda? taxmin qiling ¦ how old is Bootstrap? guess",
      actors: [
        { id: 'v1', icon: '🐣', label: "2011 · v1" },
        { id: 'v3', icon: '📱', label: "2013 · v3" },
        { id: 'v4', icon: '📐', label: "2018 · v4" },
        { id: 'v5', icon: '⚡', label: "2021 · v5" },
        { id: 'v6', icon: '🆕', label: "2026 · v6 alpha" },
        { id: 'tip', text: "…" },
      ],
      steps: [
        { say: "2011: двое разработчиков Twitter делают Bootstrap и открывают его всем. ¦ 2011: Twitter'ning ikki dasturchisi Bootstrap'ni yaratadi va uni hammaga ochadi. ¦ 2011: two Twitter developers build Bootstrap and open it to everyone.", at: { v1: [10, 60], tip: [10, 24] }, set: { tip: { text: "Рождение ¦ Tug'ilish ¦ Birth" } } },
        { say: "v3: «сначала телефон» — сайты подстраиваются под мобильные. ¦ v3: «avval telefon» — saytlar mobilga moslashadi. ¦ v3: “mobile first” — sites adapt to phones.", at: { v3: [30, 60], tip: [30, 24] }, set: { tip: { text: "Mobile first" } }, lines: [['v1', 'v3']] },
        { say: "v4: сетка переходит на Flexbox. ¦ v4: to'r Flexbox'ga o'tadi. ¦ v4: the grid moves to Flexbox.", at: { v4: [50, 60], tip: [50, 24] }, set: { tip: { text: "Flexbox" } }, lines: [['v1', 'v3'], ['v3', 'v4']] },
        { say: "v5: убрали jQuery, добавили CSS-переменные и утилиты. ¦ v5: jQuery olib tashlandi, CSS-o'zgaruvchilar va utilitalar qo'shildi. ¦ v5: jQuery dropped, CSS variables and utilities added.", at: { v5: [70, 60], tip: [70, 24] }, set: { tip: { text: "− jQuery" } }, lines: [['v1', 'v3'], ['v3', 'v4'], ['v4', 'v5']] },
        { say: "v6 alpha: новые компоненты, новые имена, CSS-токены. ¦ v6 alpha: yangi komponentlar, yangi nomlar, CSS-tokenlar. ¦ v6 alpha: new components, new names, CSS tokens.", at: { v6: [90, 60, 1.2], tip: [90, 24] }, set: { tip: { text: "Мы здесь! ¦ Biz shu yerdamiz! ¦ We're here!" } }, lines: [['v1', 'v3'], ['v3', 'v4'], ['v4', 'v5'], ['v5', 'v6']], pulse: ['v6'] },
      ],
      takeaway: "Каждая версия подстраивается под то, что умеют браузеры. ¦ Har bir versiya brauzerlar nima qila olishiga moslashadi. ¦ Each version adapts to what browsers can do.",
      notes: { min: 4 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Компоненты меняют имена ¦ Komponentlar nomini o'zgartiradi ¦ Components get new names",
      chat: "какое новое название понятнее? ¦ qaysi yangi nom tushunarliroq? ¦ which new name is clearer?",
      actors: [
        { id: 'off', icon: '🗂️', label: 'Offcanvas' },
        { id: 'dd', icon: '📋', label: 'Dropdown' },
        { id: 'chip', icon: '🏷️', label: "Чипы ¦ Chiplar ¦ Chips" },
        { id: 'otp', icon: '🔢', label: "OTP-поле ¦ OTP-maydon ¦ OTP field" },
        { id: 'tok', icon: '🎨', label: "CSS-токены ¦ CSS-tokenlar ¦ CSS tokens" },
      ],
      steps: [
        { say: "Выдвижная панель Offcanvas… ¦ Chiqib keladigan Offcanvas panel… ¦ The slide-out Offcanvas panel…", at: { off: [20, 30, 1.2] } },
        { say: "…теперь называется Drawer и построена на теге <dialog>. ¦ …endi Drawer deb ataladi va <dialog> tegida qurilgan. ¦ …is now called Drawer and built on the <dialog> tag.", set: { off: { icon: '🗄️', label: "Offcanvas → Drawer" } }, pulse: ['off'] },
        { say: "Dropdown стал Menu — на нём строится поле с подсказками (combobox). ¦ Dropdown Menu'ga aylandi — unda takliflar maydoni (combobox) quriladi. ¦ Dropdown became Menu, which also powers a combobox.", at: { dd: [50, 30, 1.2] }, set: { dd: { label: "Dropdown → Menu" } }, pulse: ['dd'] },
        { say: "Новые чипы — как теги в соцсетях — и поле для кода из SMS. ¦ Yangi chiplar — ijtimoiy tarmoqlardagi teglar kabi — va SMS kodi uchun maydon. ¦ New chips, like social media tags, and a field for SMS codes.", at: { chip: [80, 30], otp: [30, 74] }, pulse: ['chip', 'otp'] },
        { say: "Настройки темы — CSS-переменные: тему можно менять прямо в браузере. ¦ Mavzu sozlamalari — CSS-o'zgaruvchilar: mavzuni to'g'ridan-to'g'ri brauzerda o'zgartirish mumkin. ¦ Theme settings are CSS variables: change the theme right in the browser.", at: { tok: [70, 74] }, pulse: ['tok'] },
      ],
      takeaway: "Идея та же — готовые компоненты. Меняются названия и устройство. ¦ G'oya o'sha — tayyor komponentlar. Nomlar va tuzilish o'zgaradi. ¦ Same idea — ready-made components. Names and internals change.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Тот же вид — новое имя ¦ O'sha ko'rinish — yangi nom ¦ Same look, new name",
      chat: "что будет, если взять класс из другой версии? ¦ boshqa versiyadagi klassni olsak nima bo'ladi? ¦ what if you use a class from another version?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<!-- Bootstrap 5 -->\n<div class="bg-primary-subtle">\n<a class="link-offset-2">', line: 2, html: card('Bootstrap 5', BOX), say: "В Bootstrap 5: цвет в середине имени. ¦ Bootstrap 5'da: rang nom o'rtasida. ¦ In Bootstrap 5 the colour sits in the middle." },
        { code: '<!-- Bootstrap 6 -->\n<div class="bg-subtle-primary">\n<a class="underline-offset-2">', line: 2, html: card('Bootstrap 6 alpha', BOX), say: "В Bootstrap 6: сначала свойство, потом значение. Вид тот же! ¦ Bootstrap 6'da: avval xususiyat, keyin qiymat. Ko'rinish o'sha! ¦ In Bootstrap 6: property first, then value. Same look!" },
        { code: '<!-- Bootstrap 6 -->\n<p class="text-muted">\n  Small grey note\n</p>', line: 2, html: card('Bootstrap 6 alpha', '<p class="plain broken">Small grey note</p><span class="err">✗ .text-muted removed</span>'), say: ".text-muted удалили — текст уже не серый. ¦ .text-muted o'chirildi — matn endi kulrang emas. ¦ .text-muted was removed — the text isn't grey any more." },
        { code: '<!-- 5.3 + 6 -->\n<p class="text-body-secondary">\n  Small grey note\n</p>', line: 2, html: card('Bootstrap 5.3 + 6', '<p class="muted">Small grey note</p>'), say: ".text-body-secondary работает и в 5.3, и в 6 — пишите его уже сейчас. ¦ .text-body-secondary 5.3'da ham, 6'da ham ishlaydi — uni hozirdan yozing. ¦ .text-body-secondary works in both 5.3 and 6 — use it now." },
      ],
      takeaway: "Класс из одной версии может не работать в другой. Сверяйтесь с документацией. ¦ Bir versiyadagi klass boshqasida ishlamasligi mumkin. Hujjatlar bilan tekshiring. ¦ A class from one version may not work in another. Check the docs.",
      notes: { min: 6 },
    },
    {
      type: 'animate',
      stage: 3,
      title: "Путь версии: от альфы к релизу ¦ Versiya yo'li: alfadan relizgacha ¦ A version's path: alpha to release",
      chat: "на какой версии делать сайт для клиента? ¦ mijoz uchun saytni qaysi versiyada qilish kerak? ¦ which version for a client site?",
      actors: [
        { id: 'a', icon: '🧪', label: 'alpha' },
        { id: 'b', icon: '🔧', label: 'beta' },
        { id: 'rc', icon: '🎯', label: 'release candidate' },
        { id: 's', icon: '✅', label: "стабильный ¦ barqaror ¦ stable" },
        { id: 'pin', text: "v6 сейчас ¦ v6 hozir ¦ v6 now" },
      ],
      steps: [
        { say: "Альфа — ранняя версия для тестов: возможны ошибки и смена классов. ¦ Alfa — sinov uchun erta versiya: xatolar va klasslar o'zgarishi mumkin. ¦ Alpha is an early test version: bugs and class changes are possible.", at: { a: [14, 56, 1.2], pin: [14, 22] }, pulse: ['a'] },
        { say: "Бета — всё почти готово, ловят ошибки. ¦ Beta — hammasi deyarli tayyor, xatolar ushlanadi. ¦ Beta: nearly done, bugs get caught.", at: { b: [38, 56] }, lines: [['a', 'b']] },
        { say: "Release candidate — «кандидат в релиз». ¦ Release candidate — «reliz nomzodi». ¦ Release candidate: almost the release.", at: { rc: [62, 56] }, lines: [['a', 'b'], ['b', 'rc']] },
        { say: "Стабильный релиз — на нём уже делают проекты. ¦ Barqaror reliz — unda allaqachon loyihalar qilinadi. ¦ Stable release: ready for real projects.", at: { s: [86, 56, 1.2] }, lines: [['a', 'b'], ['b', 'rc'], ['rc', 's']], pulse: ['s'] },
      ],
      takeaway: "Альфу пробуют, на стабильной версии — работают. ¦ Alfani sinab ko'rishadi, barqaror versiyada — ishlashadi. ¦ Try the alpha; work on the stable version.",
      notes: { min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Переименовано, удалено или новое? ¦ Qayta nomlangan, o'chirilgan yoki yangi? ¦ Renamed, removed or new?",
      chat: "пишите: «Chips — новое» ¦ yozing: «Chips — yangi» ¦ write: “Chips — new”",
      zones: [
        { id: 'ren', label: "Переименовано ¦ Qayta nomlangan ¦ Renamed", icon: '🔁' },
        { id: 'del', label: "Удалено ¦ O'chirilgan ¦ Removed", icon: '🗑️' },
        { id: 'new', label: "Новое ¦ Yangi ¦ New", icon: '🆕' },
      ],
      items: [
        { text: 'Offcanvas → Drawer', zone: 'ren' },
        { text: 'Dropdown → Menu', zone: 'ren' },
        { text: '.text-muted', zone: 'del' },
        { text: '.navbar-dark', zone: 'del' },
        { text: 'Chips', zone: 'new' },
        { text: "OTP-поле ¦ OTP-maydon ¦ OTP field", zone: 'new' },
      ],
      takeaway: "При переходе ищите: что переименовали, удалили и добавили. ¦ O'tishda qidiring: nima qayta nomlandi, o'chirildi va qo'shildi. ¦ When upgrading, look for what was renamed, removed and added.",
      notes: { say: ["Источник — release notes alpha 1."], min: 4 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: не запутаться в версиях ¦ Missiya: versiyalarda adashmaslik ¦ Mission: don't mix up versions",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сайт работает на любой версии! ¦ Sayt istalgan versiyada ishlaydi! ¦ The site works on any version!",
      items: [
        { title: "Сайт для клиента сегодня ¦ Bugun mijoz uchun sayt ¦ A client site today", choices: ['Bootstrap 5', 'Bootstrap 6 alpha'], correct: 0, explain: "Альфа ещё может меняться. ¦ Alfa hali o'zgarishi mumkin. ¦ The alpha can still change." },
        { title: "Серый текст, работает в 5.3 и 6 ¦ 5.3 va 6'da ishlaydigan kulrang matn ¦ Grey text that works in 5.3 and 6", choices: ['.text-body-secondary', '.text-muted'], correct: 0, explain: ".text-muted в 6 удалён. ¦ .text-muted 6'da o'chirilgan. ¦ .text-muted is gone in 6." },
        { title: "Как в 6 называется Offcanvas? ¦ 6'da Offcanvas qanday ataladi? ¦ What is Offcanvas called in 6?", choices: ['Drawer', 'Sidebar'], correct: 0, explain: "И он построен на <dialog>. ¦ Va u <dialog>'da qurilgan. ¦ Built on <dialog>." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Bootstrap 6 ¦ Xulosa: Bootstrap 6 ¦ Summary: Bootstrap 6",
      chat: "какую новинку Bootstrap 6 попробуете первой? ¦ Bootstrap 6'ning qaysi yangiligini birinchi sinab ko'rasiz? ¦ which Bootstrap 6 feature will you try first?",
      answer: "Bootstrap 6 alpha вышел 8 октября 2026: Offcanvas стал Drawer на теге <dialog>, Dropdown — Menu, появились чипы и OTP-поле, а настройки темы переехали в CSS-переменные. Часть утилит переименовали (bg-primary-subtle → bg-subtle-primary), а .text-muted удалили — вместо него .text-body-secondary. Альфа нужна для экспериментов, а проекты для клиентов пока делают на стабильном Bootstrap 5. ¦ Bootstrap 6 alpha 2026 yil 8 oktyabrda chiqdi: Offcanvas <dialog> tegidagi Drawer'ga, Dropdown — Menu'ga aylandi, chiplar va OTP-maydon paydo bo'ldi, mavzu sozlamalari esa CSS-o'zgaruvchilarga ko'chdi. Ba'zi utilitalar qayta nomlandi (bg-primary-subtle → bg-subtle-primary), .text-muted esa o'chirildi — uning o'rniga .text-body-secondary. Alfa tajriba uchun kerak, mijozlar uchun loyihalar esa hozircha barqaror Bootstrap 5'da qilinadi. ¦ Bootstrap 6 alpha shipped on 8 October 2026: Offcanvas became Drawer on the <dialog> tag, Dropdown became Menu, chips and an OTP field arrived, and theme settings moved to CSS variables. Some utilities were renamed (bg-primary-subtle → bg-subtle-primary) and .text-muted was removed in favour of .text-body-secondary. The alpha is for experiments; client projects still use stable Bootstrap 5.",
      icon: '🅱️',
      badge: "Знаток версий ¦ Versiyalar bilimdoni ¦ Version expert",
      badgeSub: "Bootstrap · техническая 1 ¦ Bootstrap · texnik 1 ¦ Bootstrap · technical 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Найдите в своём проекте .text-muted и замените на .text-body-secondary. ¦ Loyihangizda .text-muted'ni toping va .text-body-secondary bilan almashtiring. ¦ Find .text-muted in your project and replace it with .text-body-secondary.",
        "Откройте release notes Bootstrap 6 и найдите одну новинку. ¦ Bootstrap 6 release notes'ni oching va bitta yangilikni toping. ¦ Open the Bootstrap 6 release notes and find one new feature.",
      ],
      takeaway: "Дальше: Accordion, Collapse и Offcanvas. ¦ Keyingisi: Accordion, Collapse va Offcanvas. ¦ Next: Accordion, Collapse and Offcanvas.",
      notes: { min: 2 },
    },
  ],
});
