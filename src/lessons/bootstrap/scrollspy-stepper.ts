import { kit } from '@engine/kit';

const HEAD = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">\n<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>';
const SPY = `${HEAD}\n<div class="row g-0">\n  <nav id="toc" class="col-4 p-3">\n    <div class="nav nav-pills flex-column">\n      <a class="nav-link" href="#about">About</a>\n      <a class="nav-link" href="#lessons">Lessons</a>\n      <a class="nav-link" href="#prices">Prices</a>\n    </div>\n  </nav>\n  <div class="col-8 p-3" data-bs-spy="scroll" data-bs-target="#toc" tabindex="0" style="height: 300px; overflow-y: auto">\n    <h4 id="about">About</h4><p style="height: 260px">Bit Lab teaches kids to code…</p>\n    <h4 id="lessons">Lessons</h4><p style="height: 260px">HTML, CSS, JS, React…</p>\n    <h4 id="prices">Prices</h4><p style="height: 260px">First lesson is free.</p>\n  </div>\n</div>`;
const STEP_HTML = `${HEAD}\n<div class="container py-3" style="max-width: 520px">\n  <div class="progress mb-3" role="progressbar" aria-valuemin="0" aria-valuemax="100">\n    <div class="progress-bar" id="bar" style="width: 33%">Step 1 / 3</div>\n  </div>\n  <div class="step" data-step="1"><label class="form-label">Name</label><input class="form-control"></div>\n  <div class="step d-none" data-step="2"><label class="form-label">Phone</label><input class="form-control"></div>\n  <div class="step d-none" data-step="3"><h5>🎉 All set!</h5></div>\n  <button class="btn btn-primary mt-3" id="next">Next →</button>\n</div>`;
const STEP_JS = `let step = 1;\nconst total = 3;\n\ndocument.getElementById('next').addEventListener('click', () => {\n  if (step === total) return;\n  step++;\n  document.querySelectorAll('.step').forEach((el) => {\n    el.classList.toggle('d-none', Number(el.dataset.step) !== step);\n  });\n  const bar = document.getElementById('bar');\n  bar.style.width = (step / total) * 100 + '%';\n  bar.textContent = 'Step ' + step + ' / ' + total;\n});`;

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.page{display:grid;grid-template-columns:150px 1fr;width:520px;height:330px;border-radius:20px;background:#fff;box-shadow:0 10px 30px #0001;overflow:hidden}
.toc{padding:16px 10px;border-right:2px solid #eceef3;display:grid;align-content:start;gap:8px}
.toc span{padding:8px 12px;border-radius:10px;font-weight:800;font-size:17px;color:#5c6275}
.toc span.on{background:#7c5cff;color:#fff}
.view{position:relative;overflow:hidden}
.feed{position:absolute;left:0;right:0;top:0;padding:0 18px}
.sec{height:300px;padding-top:18px}.sec h4{margin:0 0 8px;font-size:24px}.sec p{margin:0;color:#6b7183;font-size:18px}.sec .e{font-size:60px;margin-top:14px}
.s1 .feed{transform:translateY(-300px)}.s2 .feed{transform:translateY(-600px)}
.form{width:460px;padding:24px;border-radius:20px;background:#fff;box-shadow:0 10px 30px #0001}
.bar{height:26px;border-radius:13px;background:#eceef3;overflow:hidden;margin-bottom:20px}
.fill{height:100%;width:33%;background:#7c5cff;color:#fff;font-weight:800;font-size:14px;display:grid;place-items:center}
.p2 .fill{width:66%}.p3 .fill{width:100%;background:#0fb5a6}
.fld{font-size:18px;font-weight:700;color:#5c6275}.inp{margin-top:6px;padding:12px;border:2px solid #e6e8ee;border-radius:12px;font-size:20px}
.done{font-size:30px;font-weight:800;text-align:center;padding:14px}
.nx{margin-top:18px;display:inline-block;padding:10px 22px;border-radius:12px;background:#7c5cff;color:#fff;font-weight:800}`;
const SECS: [string, string, string][] = [['About', 'Bit Lab teaches kids to code…', '🧑‍💻'], ['Lessons', 'HTML, CSS, JS, React…', '📚'], ['Prices', 'First lesson is free.', '🎁']];
const spy = (n: number) => `<div class="wrap"><div class="page s${n}"><div class="toc">${SECS.map((s, i) => `<span class="${i === n ? 'on' : ''}">${s[0]}</span>`).join('')}</div><div class="view"><div class="feed">${SECS.map((s) => `<div class="sec"><h4>${s[0]}</h4><p>${s[1]}</p><div class="e">${s[2]}</div></div>`).join('')}</div></div></div></div>`;
const step = (n: number) => {
  const body = n === 1 ? '<div class="fld">Name<div class="inp">Lola</div></div>' : n === 2 ? '<div class="fld">Phone<div class="inp">+998 90 …</div></div>' : '<div class="done">🎉 All set!</div>';
  return `<div class="wrap"><div class="form p${n}"><div class="bar"><div class="fill">Step ${n} / 3</div></div>${body}${n < 3 ? '<span class="nx">Next →</span>' : ''}</div></div>`;
};

export default kit({
  id: 'bootstrap-t05',
  title: "Scrollspy и Stepper ¦ Scrollspy va Stepper ¦ Scrollspy and Stepper",
  question: "Как сделать меню «вы здесь» и форму по шагам с прогрессом? ¦ «Siz shu yerdasiz» menyusi va progressli bosqichma-bosqich formani qanday yasash mumkin? ¦ How do you build a “you are here” menu and a step-by-step form with progress?",
  route: ["Scrollspy ¦ Scrollspy ¦ Scrollspy", "Stepper ¦ Stepper ¦ Stepper", "Версии ¦ Versiyalar ¦ Versions", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🧭',
      kicker: "Bootstrap · техническая тема 5 ¦ Bootstrap · texnik mavzu 5 ¦ Bootstrap · technical topic 5",
      title: "Длинные страницы и длинные формы ¦ Uzun sahifalar va uzun formalar ¦ Long pages and long forms",
      chat: "что раздражает в длинных формах регистрации? ¦ uzun ro'yxatdan o'tish formalarida nima jahlni chiqaradi? ¦ what annoys you about long sign-up forms?",
      lead: "На длинной странице легко потеряться, а форма из 15 полей пугает. Решение: меню, которое показывает «вы здесь», и форма по шагам с полоской прогресса. ¦ Uzun sahifada adashish oson, 15 maydonli forma esa qo'rqitadi. Yechim: «siz shu yerdasiz»ni ko'rsatadigan menyu va progress chizig'i bilan bosqichli forma. ¦ Long pages get confusing and 15-field forms scare people. The fix: a “you are here” menu and a step-by-step form with a progress bar.",
      facts: ["Scrollspy — меню следит за прокруткой ¦ Scrollspy — menyu aylantirishni kuzatadi ¦ Scrollspy: the menu follows scrolling", "Stepper — форма по шагам ¦ Stepper — bosqichli forma ¦ Stepper: a form in steps", "В v5 Stepper собирают сами ¦ v5'da Stepper'ni o'zlari yig'ishadi ¦ In v5 you build Stepper yourself"],
      takeaway: "Сначала — меню, которое само знает, где вы. ¦ Avval — qayerdaligingizni o'zi biladigan menyu. ¦ First, a menu that knows where you are.",
      notes: { say: ["Проверено: Scrollspy есть в Bootstrap 5. Готового Stepper в v5 нет — его собирают из progress и JS; в Bootstrap 6 alpha Stepper есть как компонент.", "Примеры — Bootstrap 5.3.8 с CDN, нужен интернет."], min: 3 },
    },
    {
      type: 'show',
      stage: 0,
      title: "Scrollspy: меню следит за прокруткой ¦ Scrollspy: menyu aylantirishni kuzatadi ¦ Scrollspy: the menu follows the scroll",
      chat: "что связывает пункт меню и раздел? ¦ menyu bandi va bo'limni nima bog'laydi? ¦ what links a menu item to a section?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<nav id="toc">\n  <a href="#about">About</a>\n  <a href="#lessons">Lessons</a>\n  <a href="#prices">Prices</a>\n</nav>', line: 2, html: spy(0), say: "Меню с id и ссылками на разделы. Мы в начале — горит «About». ¦ id'li va bo'limlarga havolali menyu. Biz boshidamiz — «About» yonmoqda. ¦ A menu with an id and links to sections. At the top, “About” is lit." },
        { code: '<div data-bs-spy="scroll"\n     data-bs-target="#toc">\n  <h4 id="about">…\n  <h4 id="lessons">…', line: 4, html: spy(1), say: "Прокрутили вниз — меню само подсветило «Lessons»! ¦ Pastga aylantirdik — menyu «Lessons»ni o'zi belgiladi! ¦ Scroll down and the menu lights “Lessons” by itself!" },
        { code: '  <h4 id="prices">…\n</div>', line: 1, html: spy(2), say: "Ещё ниже — горит «Prices». Ни строчки нашего JS. ¦ Yana pastroq — «Prices» yonmoqda. Bizning JS'dan bitta qator ham yo'q. ¦ Further down, “Prices” lights up. Not a line of our JS." },
      ],
      takeaway: "Меню с id → ссылки #раздел → блок с data-bs-spy. ¦ id'li menyu → #bo'lim havolalari → data-bs-spy'li blok. ¦ Menu with an id → #section links → a block with data-bs-spy.",
      notes: { say: ["Блоку нужна высота и overflow — иначе ему нечего прокручивать."], min: 5 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Stepper: форма по шагам ¦ Stepper: bosqichli forma ¦ Stepper: a form in steps",
      chat: "сколько шагов в идеальной форме? ¦ ideal formada nechta qadam bo'ladi? ¦ how many steps make an ideal form?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<div class="progress">\n  <div class="progress-bar"\n       style="width: 33%">\n    Step 1 / 3\n  </div>\n</div>', line: 3, html: step(1), say: "Шаг 1: только имя. Полоска заполнена на треть. ¦ 1-qadam: faqat ism. Chiziq uchdan birga to'lgan. ¦ Step 1: just a name. The bar is a third full." },
        { code: "step++;\nbar.style.width =\n  (step / total) * 100 + '%';", lang: 'js', line: 2, html: step(2), say: "«Далее» — JS прибавил шаг и растянул полоску до 66%. ¦ «Keyingi» — JS qadamni oshirdi va chiziqni 66% gacha cho'zdi. ¦ “Next”: JS adds a step and stretches the bar to 66%." },
        { code: "// step 3 / 3\nbar.style.width = '100%';", lang: 'js', line: 2, html: step(3), say: "Последний шаг — полоска полная и зелёная. Готово! ¦ Oxirgi qadam — chiziq to'liq va yashil. Tayyor! ¦ Last step: the bar is full and green. Done!" },
      ],
      takeaway: "Маленькие шаги + видимый прогресс = форму доходят до конца. ¦ Kichik qadamlar + ko'rinadigan progress = formani oxirigacha to'ldirishadi. ¦ Small steps plus visible progress mean people finish the form.",
      notes: { min: 5 },
    },
    {
      type: 'poll',
      stage: 2,
      title: "Есть ли Stepper в Bootstrap 5? ¦ Bootstrap 5'da Stepper bormi? ¦ Does Bootstrap 5 have a Stepper?",
      chat: "голосуйте 1–3 ¦ 1–3 ovoz bering ¦ vote 1–3",
      options: [
        { label: "Да, готовый компонент ¦ Ha, tayyor komponent ¦ Yes, a ready component" },
        { label: "Нет — собирают из progress, кнопок и JS ¦ Yo'q — progress, tugmalar va JS'dan yig'ishadi ¦ No — you build it from progress, buttons and JS" },
        { label: "Есть только в CSS ¦ Faqat CSS'da bor ¦ Only in CSS" },
      ],
      correct: 1,
      result: "В Bootstrap 5 Stepper собирают сами, а в Bootstrap 6 alpha он появился готовым. ¦ Bootstrap 5'da Stepper'ni o'zlari yig'ishadi, Bootstrap 6 alpha'da esa u tayyor holda paydo bo'ldi. ¦ In Bootstrap 5 you build it yourself; Bootstrap 6 alpha ships one ready-made.",
      notes: { min: 2 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Меню «вы здесь» ¦ «Siz shu yerdasiz» menyusi ¦ The “you are here” menu",
      chat: "какой раздел добавим? ¦ qaysi bo'limni qo'shamiz? ¦ which section shall we add?",
      task: "✍️ Прокручивайте правую колонку и смотрите на меню ¦ ✍️ O'ng ustunni aylantiring va menyuga qarang ¦ ✍️ Scroll the right column and watch the menu",
      steps: [{ label: "Scrollspy ¦ Scrollspy ¦ Scrollspy", html: SPY }],
      takeaway: "Активный пункт подсвечивается сам. ¦ Faol band o'zi belgilanadi. ¦ The active item highlights itself.",
      notes: { say: ["Добавьте раздел «Contacts» по просьбе чата: пункт меню + h4 с id."], min: 5 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Свой Stepper ¦ O'z Stepper'ingiz ¦ Your own Stepper",
      chat: "какой четвёртый шаг добавим? ¦ qaysi to'rtinchi qadamni qo'shamiz? ¦ what fourth step shall we add?",
      task: "✍️ Нажимайте «Next» и смотрите на полоску ¦ ✍️ «Next»ni bosing va chiziqqa qarang ¦ ✍️ Click “Next” and watch the bar",
      steps: [{ label: "Stepper ¦ Stepper ¦ Stepper", html: STEP_HTML, js: STEP_JS }],
      takeaway: "Шаг++ → показать нужный блок → растянуть полоску. ¦ Qadam++ → kerakli blokni ko'rsatish → chiziqni cho'zish. ¦ step++ → show the right block → stretch the bar.",
      notes: { min: 5 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: страница курса ¦ Missiya: kurs sahifasi ¦ Mission: a course page",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Страница понятная, форма короткая! ¦ Sahifa tushunarli, forma qisqa! ¦ Clear page, short form!",
      items: [
        { title: "Scrollspy не работает ¦ Scrollspy ishlamayapti ¦ Scrollspy doesn't work", choices: ["Дать блоку высоту и overflow ¦ Blokka balandlik va overflow berish ¦ Give the block a height and overflow", "Удалить меню ¦ Menyuni o'chirish ¦ Delete the menu"], correct: 0, explain: "Блоку нужно, что прокручивать. ¦ Blokka aylantiradigan narsa kerak. ¦ The block needs something to scroll." },
        { title: "Что связывает ссылку и раздел? ¦ Havola va bo'limni nima bog'laydi? ¦ What links a link and a section?", choices: ["Одинаковый id ¦ Bir xil id ¦ The same id", "Одинаковый цвет ¦ Bir xil rang ¦ The same colour"], correct: 0, explain: "href=\"#about\" → id=\"about\". ¦ href=\"#about\" → id=\"about\". ¦ href=\"#about\" → id=\"about\"." },
        { title: "Шаг 2 из 4 — ширина полоски? ¦ 4 dan 2-qadam — chiziq kengligi? ¦ Step 2 of 4 — bar width?", choices: ['50%', '24%'], correct: 0, explain: "2 / 4 × 100 = 50%. ¦ 2 / 4 × 100 = 50%. ¦ 2 / 4 × 100 = 50%." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: Scrollspy и Stepper ¦ Xulosa: Scrollspy va Stepper ¦ Summary: Scrollspy and Stepper",
      chat: "где на своём сайте используете Scrollspy? ¦ saytingizda Scrollspy'ni qayerda ishlatasiz? ¦ where will you use Scrollspy on your site?",
      answer: "Scrollspy подсвечивает пункт меню того раздела, который сейчас на экране: меню с id, ссылки на #раздел и прокручиваемый блок с data-bs-spy=\"scroll\" и data-bs-target. Stepper делит форму на шаги с полоской прогресса; в Bootstrap 5 его собирают из progress, кнопок и пары строк JS (ширина = шаг / всего × 100%), а в Bootstrap 6 alpha он есть готовым. ¦ Scrollspy hozir ekranda turgan bo'limning menyu bandini belgilaydi: id'li menyu, #bo'lim havolalari va data-bs-spy=\"scroll\" hamda data-bs-target'li aylantiriladigan blok. Stepper formani progress chizig'i bilan qadamlarga bo'ladi; Bootstrap 5'da u progress, tugmalar va bir-ikki qator JS'dan yig'iladi (kenglik = qadam / jami × 100%), Bootstrap 6 alpha'da esa tayyor holda bor. ¦ Scrollspy highlights the menu item for the section on screen: a menu with an id, links to #sections and a scrollable block with data-bs-spy=\"scroll\" and data-bs-target. A stepper splits a form into steps with a progress bar; in Bootstrap 5 you build it from progress, buttons and a few JS lines (width = step / total × 100%), while Bootstrap 6 alpha ships one.",
      icon: '🧭',
      badge: "Навигатор страниц ¦ Sahifalar navigatori ¦ Page navigator",
      badgeSub: "Bootstrap · техническая 5 ¦ Bootstrap · texnik 5 ¦ Bootstrap · technical 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Добавьте Scrollspy на длинную страницу своего сайта. ¦ Saytingizning uzun sahifasiga Scrollspy qo'shing. ¦ Add Scrollspy to a long page on your site.",
        "Разбейте форму записи на 3 шага. ¦ Ro'yxatdan o'tish formasini 3 qadamga bo'ling. ¦ Split a sign-up form into 3 steps.",
      ],
      takeaway: "Технические темы Bootstrap пройдены! Дальше — общие темы. ¦ Bootstrap texnik mavzulari tugadi! Keyingisi — umumiy mavzular. ¦ Bootstrap technical topics done! Next: general topics.",
      notes: { min: 2 },
    },
  ],
});
