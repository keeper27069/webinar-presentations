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
  title: "Одно приложение на телефоне, часах и телевизоре ¦ Telefon, soat va televizordagi bitta ilova ¦ One app on a phone, a watch and a TV",
  question: "Как одно приложение подстраивается под экраны совсем разных размеров? ¦ Bitta ilova butunlay turli o'lchamdagi ekranlarga qanday moslashadi? ¦ How does one app adapt to screens of completely different sizes?",
  route: ["Загадка ¦ Topishmoq ¦ Puzzle", "Экраны ¦ Ekranlar ¦ Screens", "Компоненты ¦ Komponentlar ¦ Components", "Общий код ¦ Umumiy kod ¦ Shared code", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '⌚',
      kicker: "React · общая тема 6 ¦ React · umumiy mavzu 6 ¦ React · general topic 6",
      title: "Один код — много экранов ¦ Bitta kod — ko'p ekranlar ¦ One codebase, many screens",
      chat: "на скольких устройствах у вас открыт один и тот же сервис? ¦ bitta xizmat sizda nechta qurilmada ochiq? ¦ on how many devices do you use the same service?",
      lead: "Музыка играет в телефоне, на часах видно трек, а на телевизоре — обложка. Компании не пишут три разных приложения с нуля: они делят интерфейс на компоненты и собирают из них экран под каждое устройство. ¦ Musiqa telefonda chalinadi, soatda trek ko'rinadi, televizorda esa — muqova. Kompaniyalar uchta turli ilovani noldan yozmaydi: ular interfeysni komponentlarga bo'lib, har bir qurilma uchun ulardan ekran yig'ishadi. ¦ Music plays on the phone, the watch shows the track and the TV shows the cover. Companies don't write three apps from scratch: they split the UI into components and assemble a screen for each device.",
      facts: ["Разные размеры и способы управления ¦ Turli o'lchamlar va boshqarish usullari ¦ Different sizes and controls", "Общие данные и логика ¦ Umumiy ma'lumot va mantiq ¦ Shared data and logic", "Компоненты — как кубики ¦ Komponentlar — kubiklar kabi ¦ Components are like building blocks"],
      takeaway: "Компоненты в React — именно этот способ использовать один код в разных местах. ¦ React'dagi komponentlar — bitta kodni turli joylarda ishlatishning aynan shu usuli. ¦ React components are exactly this way of reusing one codebase.",
      notes: { min: 3 },
    },
    {
      type: 'cards',
      stage: 1,
      title: "Чем отличаются устройства ¦ Qurilmalar nimasi bilan farq qiladi ¦ How devices differ",
      chat: "чем управляют телевизором? ¦ televizor nima bilan boshqariladi? ¦ how do you control a TV?",
      cards: [
        { icon: '📱', front: "Телефон ¦ Telefon ¦ Phone", back: "Экран ~6 дюймов, управление пальцем, вертикально. ¦ ~6 dyuymli ekran, barmoq bilan boshqarish, vertikal. ¦ ~6-inch screen, touch, portrait." },
        { icon: '⌚', front: "Часы ¦ Soat ¦ Watch", back: "Крошечный экран: только главное, крупно, на один взгляд. ¦ Juda kichik ekran: faqat asosiysi, yirik, bir qarashda. ¦ A tiny screen: only the essentials, big, at a glance." },
        { icon: '📺', front: "Телевизор ¦ Televizor ¦ TV", back: "Огромный экран далеко, управление пультом: стрелки и «ОК». ¦ Uzoqdagi ulkan ekran, pult bilan boshqarish: strelkalar va «OK». ¦ A huge screen far away, a remote: arrows and OK." },
        { icon: '💻', front: "Компьютер ¦ Kompyuter ¦ Computer", back: "Мышь и клавиатура, много места для деталей. ¦ Sichqoncha va klaviatura, tafsilotlar uchun ko'p joy. ¦ Mouse and keyboard, room for details." },
      ],
      takeaway: "Разные экраны требуют разной подачи, но данные и смысл одни и те же. ¦ Turli ekranlar turli taqdimotni talab qiladi, lekin ma'lumot va ma'no bir xil. ¦ Different screens need different presentation, but the data and meaning stay the same.",
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
      type: 'flow',
      stage: 2,
      title: "Из чего собран экран ¦ Ekran nimadan yig'ilgan ¦ What a screen is built from",
      chat: "какой компонент нужен на всех трёх устройствах? ¦ uchala qurilmada qaysi komponent kerak? ¦ which component is needed on all three devices?",
      nodes: [
        { icon: '📊', label: "Данные ¦ Ma'lumot ¦ Data", text: "Шаги, пульс, сон — один источник для всех. ¦ Qadamlar, puls, uyqu — hamma uchun bitta manba. ¦ Steps, pulse, sleep — one source for all." },
        { icon: '🧩', label: "Компонент StatCard ¦ StatCard komponenti ¦ StatCard component", text: "Карточка «число + подпись». ¦ «Raqam + izoh» kartochkasi. ¦ A “number + label” card." },
        { icon: '📱', label: "Экран телефона ¦ Telefon ekrani ¦ Phone screen", text: "4 × StatCard + график. ¦ 4 × StatCard + grafik. ¦ 4 × StatCard + a chart." },
        { icon: '⌚', label: "Экран часов ¦ Soat ekrani ¦ Watch screen", text: "1 × StatCard крупно. ¦ 1 × StatCard yirik. ¦ 1 × StatCard, big." },
      ],
      takeaway: "Компонент пишется один раз и используется везде. Меняется только раскладка. ¦ Komponent bir marta yoziladi va hamma joyda ishlatiladi. Faqat joylashuv o'zgaradi. ¦ A component is written once and used everywhere; only the layout changes.",
      notes: { min: 4 },
    },
    {
      type: 'walk',
      stage: 2,
      title: "Компонент — функция, которая возвращает интерфейс ¦ Komponent — interfeysni qaytaradigan funksiya ¦ A component is a function that returns UI",
      chat: "сколько раз используется StatCard? ¦ StatCard necha marta ishlatiladi? ¦ how many times is StatCard used?",
      code: `function StatCard({ value, label }) {\n  return (\n    <div className="card">\n      <b>{value}</b> <span>{label}</span>\n    </div>\n  );\n}\n\nconst Phone = () => <>\n  <StatCard value="8 214" label="steps" />\n  <StatCard value="72" label="bpm" />\n</>;\n\nconst Watch = () => <StatCard value="8 214" label="steps" />;`,
      lang: 'js',
      marks: [
        { line: 1, text: "Компонент принимает данные (props): value и label. ¦ Komponent ma'lumotlarni (props) qabul qiladi: value va label. ¦ The component takes data (props): value and label." },
        { line: 3, text: "И возвращает кусочек интерфейса — похоже на HTML, это JSX. ¦ Va interfeys bo'lagini qaytaradi — HTML'ga o'xshaydi, bu JSX. ¦ And returns a piece of UI — it looks like HTML; it's JSX." },
        { line: 9, text: "На телефоне — несколько карточек. ¦ Telefonda — bir nechta kartochka. ¦ The phone shows several cards." },
        { line: 14, text: "На часах — одна. Тот же компонент! ¦ Soatda — bittasi. O'sha komponent! ¦ The watch shows one. Same component!" },
      ],
      takeaway: "Это первый взгляд на React — подробно разберём на технических темах. ¦ Bu React'ga birinchi nazar — texnik mavzularda batafsil ko'rib chiqamiz. ¦ That's a first look at React — we'll dig in during the technical topics.",
      notes: { min: 5 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "Три приложения или один общий код ¦ Uchta ilovami yoki bitta umumiy kodmi ¦ Three apps or one shared codebase",
      chat: "что выберет маленькая команда? ¦ kichik jamoa nimani tanlaydi? ¦ what would a small team choose?",
      left: { icon: '🧱', label: "Три отдельных ¦ Uchta alohida ¦ Three separate", points: ["Каждое — с нуля ¦ Har biri — noldan ¦ Each from scratch", "Баг чинят три раза ¦ Bug uch marta tuzatiladi ¦ Fix every bug three times", "Нужно в 3 раза больше людей ¦ 3 marta ko'p odam kerak ¦ Three times the people"] },
      right: { icon: '🧩', label: "Общие компоненты ¦ Umumiy komponentlar ¦ Shared components", points: ["Логика и данные — одни ¦ Mantiq va ma'lumot — bitta ¦ One logic and data layer", "Исправили раз — везде ¦ Bir marta tuzatildi — hamma joyda ¦ Fix once, fixed everywhere", "Свой экран под каждое устройство ¦ Har bir qurilmaga o'z ekrani ¦ A tailored screen per device"] },
      verdict: "Так работают React (сайты) и React Native (приложения для телефонов): общие идеи и компоненты на разных платформах. ¦ React (saytlar) va React Native (telefon ilovalari) shunday ishlaydi: turli platformalarda umumiy g'oyalar va komponentlar. ¦ That's how React (web) and React Native (phone apps) work: shared ideas and components across platforms.",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Общее или своё для устройства? ¦ Umumiymi yoki qurilmaga xosmi? ¦ Shared or per device?",
      chat: "пишите: «1 — общее» ¦ yozing: «1 — umumiy» ¦ write: “1 — shared”",
      zones: [
        { id: 'shared', label: "Общее для всех ¦ Hamma uchun umumiy ¦ Shared by all", icon: '🧩' },
        { id: 'own', label: "Своё для устройства ¦ Qurilmaga xos ¦ Per device", icon: '📐' },
      ],
      items: [
        { text: "Подсчёт шагов за день ¦ Kunlik qadamlarni hisoblash ¦ Counting daily steps", zone: 'shared' },
        { text: "Размер шрифта ¦ Shrift o'lchami ¦ Font size", zone: 'own' },
        { text: "Компонент StatCard ¦ StatCard komponenti ¦ The StatCard component", zone: 'shared' },
        { text: "Управление пультом на ТВ ¦ Televizorda pult bilan boshqarish ¦ Remote-control navigation on TV", zone: 'own' },
        { text: "Вход в аккаунт ¦ Akkauntga kirish ¦ Signing in", zone: 'shared' },
      ],
      takeaway: "Логика и компоненты — общие, раскладка и управление — свои. ¦ Mantiq va komponentlar — umumiy, joylashuv va boshqarish — o'ziga xos. ¦ Logic and components are shared; layout and controls are per device.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Для часов достаточно уменьшить сайт ¦ Soat uchun saytni kichraytirish yetarli ¦ For a watch, just shrink the website", truth: false, explain: "На часах нужно другое содержание: только самое важное. ¦ Soatda boshqa mazmun kerak: faqat eng muhimi. ¦ A watch needs different content: just the essentials." },
        { text: "Один компонент можно использовать в разных экранах ¦ Bitta komponentni turli ekranlarda ishlatish mumkin ¦ One component can be used on different screens", truth: true, explain: "Для этого компоненты и придумали. ¦ Komponentlar aynan shuning uchun o'ylab topilgan. ¦ That's what components are for." },
        { text: "Данные синхронизируются через сервер ¦ Ma'lumotlar server orqali sinxronlashadi ¦ Data syncs through a server", truth: true, explain: "Часы и телефон берут данные из одного аккаунта. ¦ Soat va telefon ma'lumotni bitta akkauntdan oladi. ¦ The watch and phone read from the same account." },
      ],
      takeaway: "Хороший мультиплатформенный продукт — одна логика и удобный экран для каждого устройства. ¦ Yaxshi ko'p platformali mahsulot — bitta mantiq va har bir qurilma uchun qulay ekran. ¦ A good cross-platform product has one logic layer and a comfortable screen for each device.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'board',
      stage: 3,
      title: "Ваше приложение на часах ¦ Soatdagi ilovangiz ¦ Your app on a watch",
      chat: "что показать на часах для вашего любимого приложения? ¦ sevimli ilovangiz uchun soatda nimani ko'rsatish kerak? ¦ what would your favourite app show on a watch?",
      seeds: ["Мессенджер: последнее сообщение и кнопка «👍» ¦ Messenjer: oxirgi xabar va «👍» tugmasi ¦ Messenger: the last message and a “👍” button", "Такси: машина и минуты до прибытия ¦ Taksi: mashina va kelishgacha daqiqalar ¦ Taxi: the car and minutes to arrival"],
      placeholder: "Идея из чата… ¦ Chatdagi g'oya… ¦ An idea from chat…",
      footer: "Правило часов: одно главное действие на экран. ¦ Soat qoidasi: ekranga bitta asosiy harakat. ¦ Watch rule: one main action per screen.",
      takeaway: "Проектировать под маленький экран — значит выбирать самое важное. ¦ Kichik ekran uchun loyihalash — eng muhimini tanlash demak. ¦ Designing for small screens means choosing what matters most.",
      notes: { say: ["Вписывайте идеи чата."], min: 4 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: FitPulse везде ¦ Missiya: FitPulse hamma joyda ¦ Mission: FitPulse everywhere",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "FitPulse работает на всех устройствах! ¦ FitPulse barcha qurilmalarda ishlaydi! ¦ FitPulse runs on every device!",
      items: [
        { title: "Карточка с цифрой нужна везде ¦ Raqamli kartochka hamma joyda kerak ¦ A number card is needed everywhere", choices: ["Один компонент StatCard ¦ Bitta StatCard komponenti ¦ One StatCard component", "Три копии кода ¦ Kodning uchta nusxasi ¦ Three copies of the code"], correct: 0, explain: "Пишем раз — используем везде. ¦ Bir marta yozamiz — hamma joyda ishlatamiz. ¦ Write once, use everywhere." },
        { title: "На часах подписи не влезают ¦ Soatda izohlar sig'maydi ¦ Labels don't fit on the watch", choices: ["Скрыть через media query ¦ Media query orqali yashirish ¦ Hide with a media query", "Уменьшить шрифт до 5px ¦ Shriftni 5px gacha kichraytirish ¦ Shrink the font to 5px"], correct: 0, explain: "Лучше убрать, чем сделать нечитаемым. ¦ O'qib bo'lmaydigan qilgandan ko'ra olib tashlagan yaxshi. ¦ Better removed than unreadable." },
        { title: "Компонент в React — это… ¦ React'dagi komponent — bu… ¦ A React component is…", choices: ["Функция, возвращающая интерфейс ¦ Interfeysni qaytaradigan funksiya ¦ A function returning UI", "Картинка ¦ Rasm ¦ A picture"], correct: 0, explain: "Принимает props, возвращает JSX. ¦ Props qabul qiladi, JSX qaytaradi. ¦ Takes props, returns JSX." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: одно приложение — много экранов ¦ Xulosa: bitta ilova — ko'p ekranlar ¦ Summary: one app, many screens",
      chat: "для какого устройства вы бы сделали свой проект? ¦ loyihangizni qaysi qurilma uchun qilgan bo'lardingiz? ¦ which device would you build your project for?",
      answer: "Телефон, часы и телевизор отличаются размером и управлением, но данные и логика у приложения общие. Интерфейс делят на компоненты — функции, которые принимают данные и возвращают кусочек экрана, — и из одних и тех же компонентов собирают свой экран под каждое устройство. Адаптивный CSS подстраивает раскладку, а React и React Native позволяют переиспользовать код. ¦ Telefon, soat va televizor o'lcham va boshqarish bilan farq qiladi, lekin ilovaning ma'lumot va mantig'i umumiy. Interfeys komponentlarga — ma'lumot qabul qilib, ekran bo'lagini qaytaradigan funksiyalarga bo'linadi — va o'sha komponentlardan har bir qurilmaga o'z ekrani yig'iladi. Moslashuvchan CSS joylashuvni moslaydi, React va React Native esa kodni qayta ishlatishga imkon beradi. ¦ Phones, watches and TVs differ in size and controls, but the app's data and logic are shared. The UI is split into components — functions that take data and return a piece of screen — and each device gets its own screen built from the same components. Responsive CSS adapts the layout; React and React Native let you reuse code.",
      icon: '⌚',
      badge: "Мультиплатформер ¦ Ko'p platformachi ¦ Cross-platformer",
      badgeSub: "React · общая 6 ¦ React · umumiy 6 ¦ React · general 6",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Нарисуйте на бумаге экраны своего приложения для телефона и часов. ¦ Ilovangizning telefon va soat uchun ekranlarini qog'ozda chizing. ¦ Sketch your app's phone and watch screens on paper.",
        "Отметьте, какие части будут общими компонентами. ¦ Qaysi qismlar umumiy komponentlar bo'lishini belgilang. ¦ Mark which parts will be shared components.",
      ],
      takeaway: "Общие темы React пройдены! Дальше — практика: Vite и первые компоненты. ¦ React umumiy mavzulari tugadi! Keyingisi — amaliyot: Vite va birinchi komponentlar. ¦ The React general topics are done! Next: practice with Vite and your first components.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
