import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.site{width:460px;padding:26px;border-radius:18px;background:#fff;box-shadow:0 10px 30px #0001;text-align:center}
.site h1{margin:0;font-size:32px}.site p{margin:8px 0 0;color:#6b7183}
.conf{outline:4px dashed #ef4b4b;outline-offset:6px}.conf h1{color:#ef4b4b;font-size:22px;font-family:JetBrains Mono,monospace;text-align:left;line-height:1.5}
.ok{outline:4px solid #0fb5a6;outline-offset:6px}`;

export default kit({
  id: 'tilda-git-t06',
  title: "Ветки в Git и командная работа ¦ Git'dagi tarmoqlar va jamoaviy ish ¦ Git branches and teamwork",
  question: "Как двое могут менять один сайт одновременно и не сломать его? ¦ Ikki kishi bitta saytni bir vaqtda qanday o'zgartirib, uni buzmasligi mumkin? ¦ How can two people change one site at once without breaking it?",
  route: ["Ветки ¦ Tarmoqlar ¦ Branches", "Команды ¦ Buyruqlar ¦ Commands", "Конфликт ¦ Konflikt ¦ Conflict", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🌿',
      kicker: "Tilda · Git · техническая тема 6 ¦ Tilda · Git · texnik mavzu 6 ¦ Tilda · Git · technical topic 6",
      title: "Параллельные миры для кода ¦ Kod uchun parallel dunyolar ¦ Parallel worlds for code",
      chat: "вы делали групповой проект? как делили работу? ¦ guruh loyihasini qilganmisiz? ishni qanday bo'lishdingiz? ¦ ever done a group project? how did you split the work?",
      lead: "Ветка — отдельная копия проекта, где можно спокойно пробовать новое. Главная версия main не ломается. Готово — вливаем ветку обратно. ¦ Tarmoq — loyihaning alohida nusxasi, unda yangi narsalarni xotirjam sinab ko'rish mumkin. Asosiy main versiya buzilmaydi. Tayyor bo'lsa — tarmoqni qaytarib qo'shamiz. ¦ A branch is a separate copy of the project where you can try things safely. The main version stays unbroken. When ready, you merge the branch back.",
      facts: ["main — главная ветка ¦ main — asosiy tarmoq ¦ main is the main branch", "У каждой задачи своя ветка ¦ Har bir vazifaning o'z tarmog'i ¦ Each task gets its own branch", "merge — влить обратно ¦ merge — qaytarib qo'shish ¦ merge folds it back in"],
      takeaway: "Смотрим, как растут ветки. ¦ Tarmoqlar qanday o'sishini ko'ramiz. ¦ Watch the branches grow.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Две ветки, один сайт ¦ Ikki tarmoq, bitta sayt ¦ Two branches, one site",
      chat: "что будет, если оба поменяют одно и то же? ¦ ikkalasi bir narsani o'zgartirsa nima bo'ladi? ¦ what if both change the same thing?",
      actors: [
        { id: 'm1', icon: '🟢', label: 'main' },
        { id: 'm2', icon: '🟢' },
        { id: 'm3', icon: '🟢', label: "main ✓" },
        { id: 'a', icon: '👧', label: "Лола: форма ¦ Lola: forma ¦ Lola: form" },
        { id: 'b', icon: '👦', label: "Тимур: меню ¦ Timur: menyu ¦ Timur: menu" },
      ],
      steps: [
        { say: "Есть главная ветка main — рабочий сайт. ¦ Asosiy main tarmog'i bor — ishlayotgan sayt. ¦ There's the main branch — the working site.", at: { m1: [10, 50, 1.2] } },
        { say: "Лола делает ветку для формы, Тимур — для меню. ¦ Lola forma uchun, Timur — menyu uchun tarmoq ochadi. ¦ Lola branches off for the form, Timur for the menu.", at: { a: [42, 20], b: [42, 80] }, lines: [['m1', 'a'], ['m1', 'b']] },
        { say: "Каждый работает в своей ветке — они не мешают друг другу. ¦ Har kim o'z tarmog'ida ishlaydi — ular bir-biriga xalaqit bermaydi. ¦ Each works in their own branch without getting in each other's way.", at: { a: [62, 20], b: [62, 80] }, lines: [['m1', 'a'], ['m1', 'b']], pulse: ['a', 'b'] },
        { say: "Готово — обе ветки вливаются (merge) в main. ¦ Tayyor — ikkala tarmoq main'ga qo'shiladi (merge). ¦ Done — both branches merge into main.", at: { m3: [90, 50, 1.3] }, lines: [['m1', 'a'], ['m1', 'b'], ['a', 'm3', 'merge'], ['b', 'm3', 'merge']], pulse: ['m3'] },
      ],
      takeaway: "Ветка = безопасная песочница. merge = соединить работу. ¦ Tarmoq = xavfsiz qum maydoni. merge = ishni birlashtirish. ¦ A branch is a safe sandbox; merge joins the work.",
      notes: { min: 4 },
    },
    {
      type: 'terminal',
      stage: 1,
      title: "Ветка за 5 команд ¦ 5 ta buyruqda tarmoq ¦ A branch in 5 commands",
      chat: "как назовём ветку? ¦ tarmoqni qanday nomlaymiz? ¦ what shall we call the branch?",
      lines: [
        { cmd: 'git branch', out: ['* main'], note: "Пока есть только main. Звёздочка — где мы сейчас. ¦ Hozircha faqat main bor. Yulduzcha — hozir qayerdamiz. ¦ Only main so far. The asterisk shows where we are." },
        { cmd: 'git switch -c feature/form', out: ["Switched to a new branch 'feature/form'"], note: "Создали ветку и сразу перешли в неё. ¦ Tarmoq yaratdik va darhol unga o'tdik. ¦ Created a branch and switched to it." },
        { cmd: 'git commit -am "Add order form"', out: ['[feature/form 8b1d0e2] Add order form'], note: "Коммит попал в ветку feature/form, main не тронут. ¦ Kommit feature/form tarmog'iga tushdi, main tegilmagan. ¦ The commit went to feature/form; main is untouched." },
        { cmd: 'git switch main', out: ["Switched to branch 'main'"], note: "Вернулись в main — формы здесь ещё нет! ¦ main'ga qaytdik — bu yerda forma hali yo'q! ¦ Back on main — the form isn't here yet!" },
        { cmd: 'git merge feature/form', out: ['Updating 3f2a1c9..8b1d0e2', 'Fast-forward', ' index.html | 12 ++++++++++++'], note: "Влили ветку: форма теперь в main. ¦ Tarmoqni qo'shdik: forma endi main'da. ¦ Merged the branch: the form is now in main." },
      ],
      takeaway: "switch -c → работа → commit → switch main → merge. ¦ switch -c → ish → commit → switch main → merge. ¦ switch -c → work → commit → switch main → merge.",
      notes: { min: 6 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Конфликт: оба поменяли одну строку ¦ Konflikt: ikkalasi bitta qatorni o'zgartirdi ¦ A conflict: both changed one line",
      chat: "какой заголовок оставим? ¦ qaysi sarlavhani qoldiramiz? ¦ which heading shall we keep?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<h1>Non House</h1>', html: '<div class="wrap"><div class="site"><h1>Non House</h1><p>Bakery</p></div></div>', say: "В main заголовок «Non House». ¦ main'da sarlavha «Non House». ¦ In main the heading is “Non House”." },
        { code: '<<<<<<< main\n<h1>Non House — Bakery</h1>\n=======\n<h1>Non House 🥖</h1>\n>>>>>>> feature/menu', line: 3, html: '<div class="wrap"><div class="site conf"><h1>&lt;&lt;&lt;&lt;&lt;&lt;&lt; main<br>Non House — Bakery<br>=======<br>Non House 🥖<br>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</h1></div></div>', say: "Лола и Тимур оба поменяли его по-своему. Git не знает, чей вариант верный — это конфликт. ¦ Lola va Timur ikkalasi uni o'zicha o'zgartirdi. Git qaysi variant to'g'riligini bilmaydi — bu konflikt. ¦ Lola and Timur each changed it. Git can't tell which is right — that's a conflict." },
        { code: '<h1>Non House 🥖</h1>', html: '<div class="wrap"><div class="site ok"><h1>Non House 🥖</h1><p>Bakery</p></div></div>', say: "Люди договариваются, оставляют один вариант и стирают значки. Конфликт решён! ¦ Odamlar kelishib, bitta variantni qoldiradi va belgilarni o'chiradi. Konflikt hal qilindi! ¦ People agree, keep one version and delete the markers. Conflict solved!" },
      ],
      takeaway: "Конфликт — не авария: просто выберите, какой вариант оставить. ¦ Konflikt — avariya emas: qaysi variantni qoldirishni tanlang. ¦ A conflict isn't a disaster — just choose which version to keep.",
      notes: { min: 5 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Хорошая привычка или нет? ¦ Yaxshi odatmi yoki yo'q? ¦ Good habit or not?",
      chat: "пишите: «1 — хорошо» ¦ yozing: «1 — yaxshi» ¦ write: “1 — good”",
      zones: [
        { id: 'ok', label: "Хорошо ¦ Yaxshi ¦ Good", icon: '👍' },
        { id: 'no', label: "Плохо ¦ Yomon ¦ Bad", icon: '👎' },
      ],
      items: [
        { text: "Отдельная ветка на каждую задачу ¦ Har bir vazifaga alohida tarmoq ¦ A branch per task", zone: 'ok' },
        { text: "Все работают прямо в main ¦ Hamma to'g'ridan-to'g'ri main'da ishlaydi ¦ Everyone works straight in main", zone: 'no' },
        { text: "Понятное имя: feature/form ¦ Tushunarli nom: feature/form ¦ A clear name: feature/form", zone: 'ok' },
        { text: "Ветка с именем «123» ¦ «123» nomli tarmoq ¦ A branch called “123”", zone: 'no' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: команда без хаоса ¦ Missiya: tartibsizliksiz jamoa ¦ Mission: a team without chaos",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Команда работает дружно! ¦ Jamoa ahil ishlaydi! ¦ The team works smoothly!",
      items: [
        { title: "Создать ветку и перейти в неё ¦ Tarmoq yaratib, unga o'tish ¦ Create a branch and switch to it", choices: ['git switch -c feature/menu', 'git merge feature/menu'], correct: 0, explain: "-c = создать. ¦ -c = yaratish. ¦ -c means create." },
        { title: "Влить ветку в main ¦ Tarmoqni main'ga qo'shish ¦ Merge a branch into main", choices: ['git merge feature/menu', 'git init'], correct: 0, explain: "Сначала перейти в main, потом merge. ¦ Avval main'ga o'tish, keyin merge. ¦ Switch to main first, then merge." },
        { title: "Случился конфликт ¦ Konflikt yuz berdi ¦ A conflict happened", choices: ["Выбрать вариант и убрать значки ¦ Variantni tanlab, belgilarni olib tashlash ¦ Pick a version, remove the markers", "Удалить проект ¦ Loyihani o'chirish ¦ Delete the project"], correct: 0, explain: "Это обычная ситуация в команде. ¦ Bu jamoada odatiy holat. ¦ It's normal in teams." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: ветки ¦ Xulosa: tarmoqlar ¦ Summary: branches",
      chat: "какую задачу сделаете в отдельной ветке? ¦ qaysi vazifani alohida tarmoqda qilasiz? ¦ which task will you do in its own branch?",
      answer: "Ветка — отдельная копия проекта для одной задачи, а main остаётся рабочим. Создаём ветку git switch -c имя, работаем и коммитим, возвращаемся в main и вливаем работу через git merge. Если двое поменяли одну строку, возникает конфликт: люди выбирают нужный вариант и убирают значки <<< === >>>. ¦ Tarmoq — bitta vazifa uchun loyihaning alohida nusxasi, main esa ishlaydigan holda qoladi. git switch -c nom bilan tarmoq yaratamiz, ishlaymiz va kommit qilamiz, main'ga qaytamiz va ishni git merge orqali qo'shamiz. Ikki kishi bitta qatorni o'zgartirsa, konflikt yuz beradi: odamlar kerakli variantni tanlaydi va <<< === >>> belgilarini olib tashlaydi. ¦ A branch is a separate copy of the project for one task, while main stays working. Create one with git switch -c name, work and commit, switch back to main and merge with git merge. If two people change the same line you get a conflict: choose the right version and remove the <<< === >>> markers.",
      icon: '🌿',
      badge: "Командный игрок ¦ Jamoaviy o'yinchi ¦ Team player",
      badgeSub: "Tilda · Git · техническая 6 ¦ Tilda · Git · texnik 6 ¦ Tilda · Git · technical 6",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Создайте ветку feature/footer, сделайте коммит и влейте в main. ¦ feature/footer tarmog'ini yarating, kommit qiling va main'ga qo'shing. ¦ Create feature/footer, commit, and merge it into main.",
        "Нарисуйте схему веток своего проекта. ¦ Loyihangiz tarmoqlari sxemasini chizing. ¦ Sketch your project's branches.",
      ],
      takeaway: "Дальше: отладка, повторы и условия в Blockly. ¦ Keyingisi: Blockly'da xatolarni tuzatish, takrorlar va shartlar. ¦ Next: debugging, repeats and conditions in Blockly.",
      notes: { min: 2 },
    },
  ],
});
