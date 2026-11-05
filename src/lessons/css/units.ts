import { kit } from '@engine/kit';

const CSS = `.wrap{border:4px dashed #cfd3dc;border-radius:18px;padding:12px;margin:10px auto}
.bar{height:70px;border-radius:14px;background:#3d7bff;color:#fff;display:flex;align-items:center;padding:0 18px;font:800 24px JetBrains Mono,monospace;white-space:nowrap}
.lbl{font:800 18px Manrope,system-ui;color:#8a90a3;margin-bottom:6px}
.txt{font-family:Manrope,system-ui;font-weight:800}`;
const box = (outer: number, inner: string, label: string) =>
  `<div class="lbl">${label}</div><div class="wrap" style="width:${outer}px"><div class="bar" style="width:${inner}">${inner}</div></div>`;

export default kit({
  id: 'css-t06',
  title: "Единицы: px, %, rem, vw ¦ Birliklar: px, %, rem, vw ¦ Units: px, %, rem, vw",
  question: "Почему один блок всегда одного размера, а другой растягивается вместе с экраном? ¦ Nega bir blok doim bir xil o'lchamda, boshqasi esa ekran bilan birga cho'ziladi? ¦ Why does one block keep its size while another stretches with the screen?",
  route: ["Линейки ¦ Chizg'ichlar ¦ Rulers", "px и % ¦ px va % ¦ px and %", "rem ¦ rem ¦ rem", "vw и vh ¦ vw va vh ¦ vw and vh", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '📏',
      kicker: "CSS · техническая тема 6 ¦ CSS · texnik mavzu 6 ¦ CSS · technical topic 6",
      title: "У CSS несколько линеек ¦ CSS'da bir nechta chizg'ich bor ¦ CSS has several rulers",
      chat: "в чём вы измеряете рост — в см или в шагах? ¦ bo'yingizni nimada o'lchaysiz — sm'dami yoki qadamlardami? ¦ do you measure height in cm or in steps?",
      lead: "px — всегда одинаковый. % — часть от родителя. rem — от размера шрифта. vw — часть ширины экрана. ¦ px — doim bir xil. % — ota-onadan qism. rem — shrift o'lchamidan. vw — ekran kengligidan qism. ¦ px never changes. % is part of the parent. rem follows the font size. vw is part of the screen width.",
      facts: ["px — точно ¦ px — aniq ¦ px — exact", "% — от родителя ¦ % — ota-onadan ¦ % — of the parent", "vw — от экрана ¦ vw — ekrandan ¦ vw — of the screen"],
      takeaway: "Посмотрим, как блоки ведут себя, когда коробка меняет размер. ¦ Quti o'lchami o'zgarganda bloklar o'zini qanday tutishini ko'ramiz. ¦ Let's see how blocks behave when their box resizes.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "px не меняется, % — тянется ¦ px o'zgarmaydi, % — cho'ziladi ¦ px stays, % stretches",
      chat: "какой блок вылезет из маленькой коробки? ¦ qaysi blok kichik qutidan chiqib ketadi? ¦ which block will spill out of the small box?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.a { width: 300px; }\n.b { width: 50%; }', html: box(640, '300px', 'px') + box(640, '50%', '%'), say: "Коробка широкая: оба блока помещаются. ¦ Quti keng: ikkala blok ham sig'adi. ¦ A wide box: both blocks fit." },
        { code: '/* коробка уже */ ¦ /* quti torroq */ ¦ /* the box shrinks */', lang: 'css', html: box(320, '300px', 'px') + box(320, '50%', '%'), say: "Коробка сузилась: 300px остался 300px, а 50% стал меньше. ¦ Quti torroq bo'ldi: 300px 300px bo'lib qoldi, 50% esa kichraydi. ¦ The box shrinks: 300px stays 300px, 50% gets smaller." },
        { code: '/* ещё уже */ ¦ /* yana torroq */ ¦ /* even narrower */', lang: 'css', html: box(220, '300px', 'px') + box(220, '50%', '%'), say: "300px уже не влезает, а 50% — всегда половина. ¦ 300px endi sig'maydi, 50% esa — doim yarmi. ¦ 300px no longer fits; 50% is always half." },
      ],
      takeaway: "Для телефонов удобнее %: блок подстраивается сам. ¦ Telefonlar uchun % qulayroq: blok o'zi moslashadi. ¦ % suits phones: the block adapts by itself.",
      notes: { say: ["Обратите внимание на синий блок px — он «вылез» из рамки."], min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "rem: растёт вместе со шрифтом ¦ rem: shrift bilan birga o'sadi ¦ rem grows with the font",
      chat: "людям с плохим зрением что важно? ¦ ko'rishi zaif odamlar uchun nima muhim? ¦ what matters for people with weak eyesight?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: 'html { font-size: 16px; }\nh1 { font-size: 2rem; }\np { font-size: 1rem; }', html: '<div class="txt" style="font-size:16px"><div style="font-size:2em">Hello! 👋</div><div style="font-size:1em;font-weight:500">2rem = 32px · 1rem = 16px</div></div>', say: "1rem = основной размер шрифта (обычно 16px). ¦ 1rem = asosiy shrift o'lchami (odatda 16px). ¦ 1rem = the base font size (usually 16px)." },
        { code: 'html { font-size: 24px; }', line: 1, html: '<div class="txt" style="font-size:24px"><div style="font-size:2em">Hello! 👋</div><div style="font-size:1em;font-weight:500">2rem = 48px · 1rem = 24px</div></div>', say: "Человек увеличил шрифт — всё выросло вместе. ¦ Inson shriftni kattalashtirdi — hammasi birga o'sdi. ¦ The user enlarges the font and everything grows together." },
      ],
      takeaway: "rem уважает настройки пользователя. Им удобно задавать шрифты. ¦ rem foydalanuvchi sozlamalarini hurmat qiladi. Shriftlarni u bilan belgilash qulay. ¦ rem respects the user's settings — great for fonts.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 3,
      title: "vw и vh: от размера экрана ¦ vw va vh: ekran o'lchamidan ¦ vw and vh: from the screen size",
      chat: "как сделать картинку на весь экран? ¦ rasmni butun ekranga qanday qilish mumkin? ¦ how do you make a picture fill the screen?",
      lang: 'css',
      css: CSS + '.scr{margin:0 auto;border:6px solid #16181f;border-radius:20px;height:300px;overflow:hidden;background:#f4f5f8}.hero{height:100%;display:grid;place-items:center;background:linear-gradient(135deg,#f2573a,#e9a400);color:#fff;font:800 30px Manrope,system-ui}',
      steps: [
        { code: '.hero {\n  width: 100vw;\n  height: 100vh;\n}', html: '<div class="scr" style="width:600px"><div class="hero">100vw × 100vh</div></div>', say: "100vw — вся ширина, 100vh — вся высота экрана. ¦ 100vw — butun kenglik, 100vh — ekranning butun balandligi. ¦ 100vw is the full width, 100vh the full height." },
        { code: '/* экран телефона */ ¦ /* telefon ekrani */ ¦ /* a phone screen */', lang: 'css', html: '<div class="scr" style="width:240px"><div class="hero">100vw</div></div>', say: "На телефоне блок всё равно ровно на весь экран. ¦ Telefonda ham blok baribir aynan butun ekranni egallaydi. ¦ On a phone it still fills the screen exactly." },
      ],
      takeaway: "vw и vh — для обложек «на весь экран». ¦ vw va vh — «butun ekranga» muqovalar uchun. ¦ vw and vh are for full-screen covers.",
      notes: { min: 3 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Какая единица подходит? ¦ Qaysi birlik mos keladi? ¦ Which unit fits?",
      chat: "пишите: «1 — rem» ¦ yozing: «1 — rem» ¦ write: “1 — rem”",
      zones: [
        { id: 'px', label: 'px', icon: '📌' },
        { id: 'pc', label: '%', icon: '🔀' },
        { id: 'rem', label: 'rem', icon: '🔤' },
        { id: 'vw', label: 'vw / vh', icon: '🖥️' },
      ],
      items: [
        { text: "Тонкая рамка 1 пиксель ¦ 1 pikselli ingichka ramka ¦ A thin 1-pixel border", zone: 'px' },
        { text: "Колонка — половина блока ¦ Ustun — blokning yarmi ¦ A column half the block wide", zone: 'pc' },
        { text: "Размер шрифта текста ¦ Matn shrifti o'lchami ¦ Text font size", zone: 'rem' },
        { text: "Обложка на весь экран ¦ Butun ekranga muqova ¦ A full-screen cover", zone: 'vw' },
      ],
      takeaway: "Каждая линейка — для своей задачи. ¦ Har bir chizg'ich — o'z vazifasi uchun. ¦ Each ruler has its own job.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: мастер размеров ¦ Missiya: o'lchamlar ustasi ¦ Mission: size master",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Все размеры на своих местах! ¦ Barcha o'lchamlar joyida! ¦ Every size fits!",
      items: [
        { title: "Блок на половину родителя ¦ Ota-onaning yarmiga blok ¦ A block half its parent", choices: ['width: 50%', 'width: 50px'], correct: 0, explain: "% — от родителя. ¦ % — ota-onadan. ¦ % is of the parent." },
        { title: "Шрифт, который растёт с настройками ¦ Sozlamalar bilan o'sadigan shrift ¦ A font that grows with settings", choices: ['1.5rem', '24px'], correct: 0, explain: "rem — от основного шрифта. ¦ rem — asosiy shriftdan. ¦ rem follows the base font." },
        { title: "Высота всего экрана ¦ Butun ekran balandligi ¦ The whole screen's height", choices: ['100vh', '100%'], correct: 0, explain: "vh — высота экрана. ¦ vh — ekran balandligi. ¦ vh = screen height." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: единицы ¦ Xulosa: birliklar ¦ Summary: units",
      chat: "какую единицу вы будете использовать чаще всего? ¦ qaysi birlikdan ko'proq foydalanasiz? ¦ which unit will you use most?",
      answer: "px — точный размер, который не меняется: хорош для рамок. % — часть от родителя: блок подстраивается под коробку. rem — от основного шрифта: текст растёт, если человек увеличил шрифт. vw и vh — часть экрана: 100vh — обложка на всю высоту. ¦ px — o'zgarmaydigan aniq o'lcham: ramkalar uchun yaxshi. % — ota-onadan qism: blok qutiga moslashadi. rem — asosiy shriftdan: inson shriftni kattalashtirsa, matn o'sadi. vw va vh — ekran qismi: 100vh — butun balandlikka muqova. ¦ px is an exact size that never changes — good for borders. % is part of the parent, so blocks adapt to their box. rem follows the base font, so text grows when users enlarge it. vw and vh are parts of the screen: 100vh is a full-height cover.",
      icon: '📏',
      badge: "Мастер размеров ¦ O'lchamlar ustasi ¦ Size master",
      badgeSub: "CSS · техническая 6 ¦ CSS · texnik 6 ¦ CSS · technical 6",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте обложку на весь экран: height: 100vh. ¦ Butun ekranga muqova yarating: height: 100vh. ¦ Make a full-screen cover: height: 100vh.",
        "Переведите шрифты своего сайта с px на rem. ¦ Saytingiz shriftlarini px'dan rem'ga o'tkazing. ¦ Switch your site's fonts from px to rem.",
      ],
      takeaway: "Дальше: фильтры и фигуры — фотошоп прямо в CSS. ¦ Keyingisi: filtrlar va shakllar — to'g'ridan-to'g'ri CSS'da fotoshop. ¦ Next: filters and shapes — Photoshop right in CSS.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
