import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#eef2f8;color:#1b2150}
.app{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;padding:14px}
.card{background:#fff;border-radius:14px;padding:14px;text-align:center;box-shadow:0 4px 14px #0001}
.card b{display:block;font-size:30px}.card span{font-size:14px;color:#6b7390}
header{background:#5b3df5;color:#fff;padding:12px 16px;font-weight:800;font-size:18px}
@media (max-width:240px){header{font-size:14px;text-align:center}.card b{font-size:22px}.card span{display:none}.app{padding:6px;gap:6px}}`;
const HTML = `<header>🏃 FitPulse</header><div class="app">
<div class="card"><b>8 214</b><span>steps today</span></div>
<div class="card"><b>72</b><span>heart rate, bpm</span></div>
<div class="card"><b>5.6</b><span>km walked</span></div>
<div class="card"><b>7h 40m</b><span>sleep</span></div></div>`;

export default kit({
  id: 'react-g06',
  title: "Одно приложение на телефоне, часах и телевизоре ¦ Bitta ilova telefonda, soatda va televizorda ¦ One app on a phone, a watch and a TV",
  question: "Как одно приложение подстраивается под экраны совсем разных размеров? ¦ Bitta ilova butunlay turli o'lchamdagi ekranlarga qanday moslashadi? ¦ How does one app adapt to wildly different screens?",
  route: ["Загадка ¦ Topishmoq ¦ The puzzle", "Экраны ¦ Ekranlar ¦ Screens", "Общее ядро ¦ Umumiy yadro ¦ The shared core", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '⌚',
      kicker: "React · общая тема 6 ¦ React · umumiy mavzu 6 ¦ React · general topic 6",
      title: "Один код — много экранов ¦ Bitta kod — ko'p ekran ¦ One code, many screens",
      chat: "на скольких устройствах у вас открыт один и тот же сервис? ¦ bitta xizmat sizda nechta qurilmada ochiq? ¦ on how many devices do you use the same service?",
      lead: "Музыка играет в телефоне, на часах видно трек, а на телевизоре — обложка. Компании не пишут три приложения с нуля: данные и логика общие, а экран собирают из компонентов под каждое устройство. ¦ Musiqa telefonda o'ynaydi, soatda trek ko'rinadi, televizorda esa muqova. Kompaniyalar uchta ilovani noldan yozmaydi: ma'lumotlar va mantiq umumiy, ekran esa har bir qurilma uchun komponentlardan yig'iladi. ¦ Music plays on your phone, the watch shows the track, the TV shows the cover. Companies don't write three apps from scratch: data and logic are shared, and each screen is assembled from components.",
      facts: ["Разные экраны и управление ¦ Turli ekranlar va boshqaruv ¦ Different screens and controls", "Общие данные и логика ¦ Umumiy ma'lumotlar va mantiq ¦ Shared data and logic", "Компоненты — как кубики ¦ Komponentlar — kubiklar kabi ¦ Components are like blocks"],
      takeaway: "Смотрим, как одни данные попадают на три экрана. ¦ Bitta ma'lumot uchta ekranga qanday tushishini ko'ramiz. ¦ Watch one set of data reach three screens.",
      notes: { say: ["Выдуманный фитнес-сервис FitPulse, цифры для примера."], min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Одни данные — три экрана ¦ Bitta ma'lumot — uchta ekran ¦ One dataset, three screens",
      chat: "что покажете на маленьких часах? ¦ kichik soatda nimani ko'rsatasiz? ¦ what would you show on a tiny watch?",
      actors: [
        { id: 'data', icon: '☁️', label: "Данные: 8 214 шагов ¦ Ma'lumot: 8 214 qadam ¦ Data: 8,214 steps" },
        { id: 'ph', icon: '📱', label: "Телефон: всё подробно ¦ Telefon: hammasi batafsil ¦ Phone: full detail" },
        { id: 'wa', icon: '⌚', label: "Часы: только цифра ¦ Soat: faqat raqam ¦ Watch: just the number" },
        { id: 'tv', icon: '📺', label: "ТВ: крупно, для пульта ¦ TV: yirik, pult uchun ¦ TV: big, remote-friendly" },
      ],
      steps: [
        { say: "Все данные — в одном месте, в облаке. ¦ Barcha ma'lumotlar — bitta joyda, bulutda. ¦ All the data lives in one place, the cloud.", at: { data: [50, 16, 1.3] } },
        { say: "Телефон показывает всё: шаги, пульс, карту, графики. ¦ Telefon hammasini ko'rsatadi: qadamlar, puls, xarita, grafiklar. ¦ The phone shows everything: steps, pulse, map, charts.", at: { ph: [16, 70, 1.2] }, lines: [['data', 'ph']] },
        { say: "Часы — крошечный экран: только главное, на один взгляд. ¦ Soat — kichkina ekran: faqat asosiysi, bir qarashda. ¦ The watch is tiny: just the essentials, at a glance.", at: { wa: [50, 70, 1.2] }, lines: [['data', 'ph'], ['data', 'wa']] },
        { say: "Телевизор далеко и с пультом: огромные кнопки, стрелки и «ОК». ¦ Televizor uzoqda va pult bilan: ulkan tugmalar, strelkalar va «OK». ¦ The TV is far away with a remote: huge buttons, arrows and “OK”.", at: { tv: [84, 70, 1.2] }, lines: [['data', 'ph'], ['data', 'wa'], ['data', 'tv']], pulse: ['ph', 'wa', 'tv'] },
      ],
      takeaway: "Данные одни — подача разная. ¦ Ma'lumot bitta — taqdimot har xil. ¦ Same data, different presentation.",
      notes: { min: 4 },
    },
    {
      type: 'browser',
      stage: 1,
      title: "Один интерфейс — три ширины ¦ Bitta interfeys — uchta kenglik ¦ One interface, three widths",
      chat: "что исчезло на «часах»? ¦ «soat»da nima yo'qoldi? ¦ what disappeared on the “watch”?",
      tabs: [
        { label: "Планшет ¦ Planshet ¦ Tablet", url: 'fitpulse.example', css: CSS, html: HTML, note: "Карточки в ряд, есть подписи. ¦ Kartochkalar qatorda, izohlar bor. ¦ Cards in a row, with labels." },
        { label: "Телефон ¦ Telefon ¦ Phone", url: 'fitpulse.example', css: CSS, html: HTML, width: 360, note: "Две колонки — та же разметка, CSS подстроил сетку сам. ¦ Ikki ustun — o'sha belgilash, CSS to'rni o'zi moslashtirdi. ¦ Two columns — same markup; CSS rearranged the grid." },
        { label: "Часы ¦ Soat ¦ Watch", url: 'fitpulse.example', css: CSS, html: HTML, width: 220, note: "Только цифры, крупно. Подписи скрыты media query. ¦ Faqat raqamlar, yirik. Izohlar media query bilan yashirilgan. ¦ Numbers only, big. Labels hidden by a media query." },
      ],
      takeaway: "Адаптивный CSS — первый уровень: один и тот же HTML выглядит по-разному. ¦ Moslashuvchan CSS — birinchi daraja: bir xil HTML turlicha ko'rinadi. ¦ Responsive CSS is level one: the same HTML looks different.",
      notes: { say: ["Выдуманный фитнес-сервис FitPulse, цифры для примера."], min: 4 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Общее ядро и разные «обёртки» ¦ Umumiy yadro va turli «o'ramlar» ¦ A shared core, different wrappers",
      chat: "что меняют под каждое устройство? ¦ har bir qurilma uchun nimani o'zgartirishadi? ¦ what changes per device?",
      actors: [
        { id: 'core', icon: '🧠', label: "Общая логика: считать шаги ¦ Umumiy mantiq: qadamlarni sanash ¦ Shared logic: count steps" },
        { id: 'c1', icon: '🧩', label: '<StepsCard />' },
        { id: 'c2', icon: '🧩', label: '<HeartCard />' },
        { id: 'ph', icon: '📱' }, { id: 'wa', icon: '⌚' }, { id: 'tv', icon: '📺' },
      ],
      steps: [
        { say: "В центре — общая логика: как считать шаги и пульс. Её пишут один раз. ¦ Markazda — umumiy mantiq: qadamlar va pulsni qanday sanash. U bir marta yoziladi. ¦ At the centre: shared logic — how to count steps and pulse. Written once.", at: { core: [50, 16, 1.2] } },
        { say: "Из неё делают компоненты-кубики: карточка шагов, карточка пульса. ¦ Undan kubik-komponentlar yasaladi: qadamlar kartochkasi, puls kartochkasi. ¦ From it come component blocks: a steps card, a pulse card.", at: { c1: [32, 48], c2: [68, 48] }, lines: [['core', 'c1'], ['core', 'c2']] },
        { say: "Каждое устройство собирает свой экран из этих кубиков — разного размера и в разном порядке. ¦ Har bir qurilma o'z ekranini shu kubiklardan yig'adi — turli o'lchamda va turli tartibda. ¦ Each device builds its screen from these blocks — different sizes, different order.", at: { ph: [16, 84, 1.1], wa: [50, 84, 1.1], tv: [84, 84, 1.1] }, lines: [['core', 'c1'], ['core', 'c2'], ['c1', 'ph'], ['c2', 'ph'], ['c1', 'wa'], ['c1', 'tv'], ['c2', 'tv']], pulse: ['ph', 'wa', 'tv'] },
      ],
      takeaway: "Логика — одна, кубики — общие, экраны — разные. ¦ Mantiq — bitta, kubiklar — umumiy, ekranlar — har xil. ¦ One logic, shared blocks, different screens.",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Общее или своё для устройства? ¦ Umumiymi yoki qurilmaga xosmi? ¦ Shared or per device?",
      chat: "пишите: «1 — общее» ¦ yozing: «1 — umumiy» ¦ write: “1 — shared”",
      zones: [
        { id: 'sh', label: "Общее для всех ¦ Hammaga umumiy ¦ Shared by all", icon: '🧠' },
        { id: 'own', label: "Своё у устройства ¦ Qurilmaga xos ¦ Per device", icon: '📱' },
      ],
      items: [
        { text: "Как считать шаги ¦ Qadamlarni qanday sanash ¦ How to count steps", zone: 'sh' },
        { text: "Размер шрифта ¦ Shrift o'lchami ¦ Font size", zone: 'own' },
        { text: "Данные пользователя ¦ Foydalanuvchi ma'lumotlari ¦ The user's data", zone: 'sh' },
        { text: "Управление пультом или пальцем ¦ Pult yoki barmoq bilan boshqarish ¦ Remote vs touch controls", zone: 'own' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: приложение везде ¦ Missiya: hamma joyda ilova ¦ Mission: an app everywhere",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Приложение удобно на любом экране! ¦ Ilova har qanday ekranda qulay! ¦ The app works well on every screen!",
      items: [
        { title: "Что показать на часах? ¦ Soatda nimani ko'rsatish kerak? ¦ What to show on a watch?", choices: ["Одну главную цифру ¦ Bitta asosiy raqam ¦ One key number", "Все графики сразу ¦ Barcha grafiklarni birdan ¦ Every chart at once"], correct: 0, explain: "Маленький экран — только главное. ¦ Kichik ekran — faqat asosiysi. ¦ Small screen, essentials only." },
        { title: "Как управлять на ТВ? ¦ TV'da qanday boshqarish mumkin? ¦ How do you control a TV?", choices: ["Крупные кнопки под пульт ¦ Pult uchun yirik tugmalar ¦ Big remote-friendly buttons", "Мелкие ссылки ¦ Mayda havolalar ¦ Tiny links"], correct: 0, explain: "Стрелки и «ОК». ¦ Strelkalar va «OK». ¦ Arrows and “OK”." },
        { title: "Что пишут один раз для всех? ¦ Hamma uchun nima bir marta yoziladi? ¦ What's written once for all?", choices: ["Логику и данные ¦ Mantiq va ma'lumotlar ¦ Logic and data", "Размер экрана ¦ Ekran o'lchami ¦ The screen size"], correct: 0, explain: "Ядро общее. ¦ Yadro umumiy. ¦ The core is shared." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: одно приложение — много устройств ¦ Xulosa: bitta ilova — ko'p qurilma ¦ Summary: one app, many devices",
      chat: "для какого устройства вы бы сделали своё приложение? ¦ ilovangizni qaysi qurilma uchun qilgan bo'lardingiz? ¦ which device would you build your app for?",
      answer: "Одно приложение работает на телефоне, часах и телевизоре, потому что данные и логика у него общие, а экран собирается из компонентов под каждое устройство. Адаптивный CSS меняет раскладку под ширину, а для часов и ТВ подбирают подачу: на часах — только главное, на ТВ — крупно и под пульт. ¦ Bitta ilova telefonda, soatda va televizorda ishlaydi, chunki uning ma'lumotlari va mantig'i umumiy, ekran esa har bir qurilma uchun komponentlardan yig'iladi. Moslashuvchan CSS joylashuvni kenglikka moslaydi, soat va TV uchun esa taqdimot tanlanadi: soatda — faqat asosiysi, TV'da — yirik va pult uchun. ¦ One app runs on a phone, watch and TV because its data and logic are shared and each screen is assembled from components. Responsive CSS adapts the layout to the width, and watches and TVs get their own presentation: essentials only on a watch, big and remote-friendly on a TV.",
      icon: '⌚',
      badge: "Мастер всех экранов ¦ Barcha ekranlar ustasi ¦ Every-screen master",
      badgeSub: "React · общая 6 ¦ React · umumiy 6 ¦ React · general 6",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Откройте свой сайт на телефоне и компьютере и сравните. ¦ Saytingizni telefonda va kompyuterda ochib, solishtiring. ¦ Open your site on a phone and a computer and compare.",
        "Нарисуйте, как выглядел бы ваш сайт на часах. ¦ Saytingiz soatda qanday ko'rinishini chizing. ¦ Sketch how your site would look on a watch.",
      ],
      takeaway: "Все 78 тем пройдены — вы молодцы! 🎉 ¦ Barcha 78 mavzu tugadi — barakalla! 🎉 ¦ All 78 topics done — well done! 🎉",
      notes: { min: 2 },
    },
  ],
});
