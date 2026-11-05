import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.list{width:420px;display:grid;gap:8px}
.f{display:flex;align-items:center;gap:12px;padding:10px 16px;border-radius:12px;background:#fff;box-shadow:0 4px 14px #0001;font:700 20px JetBrains Mono,monospace;color:#6b7183}
.f.ok{background:#e8faf7;color:#0f766e}.f b{font-size:26px}`;
const files = (n: number) => `<div class="wrap"><div class="list">${[1, 2, 3, 4, 5].map((i) => `<div class="f ${i <= n ? 'ok' : ''}"><b>${i <= n ? '✅' : '🖼️'}</b>${i <= n ? `trip-${i}.jpg` : `IMG_20${4810 + i * 7}.jpg`}</div>`).join('')}</div></div>`;

export default kit({
  id: 'bootstrap-g03',
  title: "Автоматизация: скучную работу — компьютеру ¦ Avtomatlashtirish: zerikarli ishni — kompyuterga ¦ Automation: boring work goes to the computer",
  question: "Как программисты заставляют компьютер делать рутину за них? ¦ Dasturchilar kompyuterni ular o'rniga muntazam ishni qilishga qanday majbur qiladi? ¦ How do programmers make computers do routine work for them?",
  route: ["Рутина ¦ Muntazam ish ¦ Routine", "Скрипт ¦ Skript ¦ A script", "Что можно ¦ Nima mumkin ¦ What fits", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🤖',
      kicker: "Bootstrap · общая тема 3 ¦ Bootstrap · umumiy mavzu 3 ¦ Bootstrap · general topic 3",
      title: "Компьютер не устаёт ¦ Kompyuter charchamaydi ¦ Computers don't get tired",
      chat: "какое скучное дело вы бы отдали роботу? ¦ qaysi zerikarli ishni robotga bergan bo'lardingiz? ¦ which boring job would you give a robot?",
      lead: "Переименовать 500 фото, разослать 100 приглашений, каждый день собирать отчёт. Человек устанет и ошибётся, а маленькая программа — скрипт — сделает это за секунды. ¦ 500 ta fotoni qayta nomlash, 100 ta taklifnoma yuborish, har kuni hisobot yig'ish. Odam charchaydi va xato qiladi, kichik dastur — skript esa buni soniyalarda qiladi. ¦ Rename 500 photos, send 100 invitations, build a report every day. A person tires and slips up; a small program — a script — does it in seconds.",
      facts: ["Скрипт — маленькая программа ¦ Skript — kichik dastur ¦ A script is a small program", "Делает одно и то же без ошибок ¦ Bir xil ishni xatosiz qiladi ¦ Repeats work without mistakes", "Пишется один раз ¦ Bir marta yoziladi ¦ Written once"],
      takeaway: "Устроим соревнование: человек против скрипта. ¦ Musobaqa o'tkazamiz: odam skriptga qarshi. ¦ Let's race: person vs script.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Человек против скрипта ¦ Odam skriptga qarshi ¦ Person vs script",
      chat: "сколько времени у вас уйдёт на 500 фото? ¦ 500 ta foto sizga qancha vaqt oladi? ¦ how long would 500 photos take you?",
      actors: [
        { id: 'p', icon: '🧑', label: "Человек ¦ Odam ¦ Person" },
        { id: 'r', icon: '🤖', label: "Скрипт ¦ Skript ¦ Script" },
        { id: 'pc', text: "0 / 500" },
        { id: 'rc', text: "0 / 500" },
        { id: 'pt', text: "⏱️ 0" },
        { id: 'rt', text: "⏱️ 0" },
      ],
      steps: [
        { say: "Задача: переименовать 500 фото с поездки. Старт! ¦ Vazifa: sayohatdagi 500 ta fotoni qayta nomlash. Start! ¦ Task: rename 500 trip photos. Go!", at: { p: [22, 30, 1.2], r: [22, 72, 1.2], pc: [52, 30], rc: [52, 72], pt: [80, 30], rt: [80, 72] } },
        { say: "Через минуту: человек сделал 6 фото, скрипт — уже все 500. ¦ Bir daqiqadan keyin: odam 6 ta foto qildi, skript — allaqachon 500 tasini. ¦ After a minute: the person did 6 photos, the script all 500.", set: { pc: { text: "6 / 500" }, rc: { text: "500 / 500 ✅" }, pt: { text: "⏱️ 1 мин ¦ ⏱️ 1 daq ¦ ⏱️ 1 min" }, rt: { text: "⏱️ 2 сек ¦ ⏱️ 2 son ¦ ⏱️ 2 sec" } }, pulse: ['r'] },
        { say: "Через час человек устал и перепутал номера… ¦ Bir soatdan keyin odam charchadi va raqamlarni adashtirdi… ¦ An hour later the person is tired and mixes up numbers…", set: { p: { icon: '😩' }, pc: { text: "300 / 500 ❌" }, pt: { text: "⏱️ 1 час ¦ ⏱️ 1 soat ¦ ⏱️ 1 hour" } }, pulse: ['p'] },
        { say: "А скрипт можно запустить снова завтра — для новых 500 фото. ¦ Skriptni esa ertaga yangi 500 ta foto uchun yana ishga tushirish mumkin. ¦ And the script can run again tomorrow for 500 new photos.", set: { r: { icon: '😎' } }, pulse: ['rc'] },
      ],
      takeaway: "Повторяется — значит, можно поручить скрипту. ¦ Takrorlanadi — demak, skriptga topshirish mumkin. ¦ If it repeats, a script can do it.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Как выглядит скрипт ¦ Skript qanday ko'rinadi ¦ What a script looks like",
      chat: "что поменяем в названии файлов? ¦ fayl nomlarida nimani o'zgartiramiz? ¦ what shall we change in the file names?",
      lang: 'js',
      css: CSS,
      steps: [
        { code: "const photos = getPhotos();\n// 5 photos: IMG_20…", line: 1, html: files(0), say: "Взяли все фото из папки. Названия непонятные. ¦ Papkadagi barcha fotolarni oldik. Nomlar tushunarsiz. ¦ Grab every photo in the folder. The names are a mess." },
        { code: "for (let i = 1; i <= 5; i++) {\n  rename(photos[i], 'trip-' + i);\n}", line: 2, html: files(2), say: "Цикл: для каждого фото — новое имя trip-1, trip-2… ¦ Sikl: har bir foto uchun — yangi nom trip-1, trip-2… ¦ A loop: each photo gets a new name trip-1, trip-2…" },
        { code: "for (let i = 1; i <= 5; i++) {\n  rename(photos[i], 'trip-' + i);\n}", line: 1, html: files(5), say: "Цикл крутится, пока фото не кончатся. Все готовы! ¦ Sikl fotolar tugaguncha aylanadi. Hammasi tayyor! ¦ The loop runs until the photos run out. All done!" },
        { code: "for (let i = 1; i <= 500; i++) {\n  rename(photos[i], 'trip-' + i);\n}", line: 1, html: files(5), say: "Поменяли 5 на 500 — и тот же код справится с 500 фото. ¦ 5 ni 500 ga almashtirdik — o'sha kod 500 ta foto bilan ham uddalaydi. ¦ Change 5 to 500 and the same code handles 500 photos." },
      ],
      takeaway: "Цикл = «повтори это много раз». Основа автоматизации. ¦ Sikl = «buni ko'p marta takrorla». Avtomatlashtirish asosi. ¦ A loop means “repeat this many times” — the heart of automation.",
      notes: { min: 5 },
    },
    {
      type: 'sort',
      stage: 2,
      title: "Поручить скрипту или сделать самому? ¦ Skriptga topshirishmi yoki o'zing qilishmi? ¦ Script it or do it yourself?",
      chat: "пишите: «1 — скрипт» ¦ yozing: «1 — skript» ¦ write: “1 — script”",
      zones: [
        { id: 'bot', label: "Скрипту ¦ Skriptga ¦ Script", icon: '🤖' },
        { id: 'me', label: "Самому ¦ O'zim ¦ Myself", icon: '🧑' },
      ],
      items: [
        { text: "Каждое утро сохранять копию файлов ¦ Har tong fayllar nusxasini saqlash ¦ Back up files every morning", zone: 'bot' },
        { text: "Придумать идею для сайта ¦ Sayt uchun g'oya o'ylab topish ¦ Invent an idea for a site", zone: 'me', why: "Творчество — дело человека. ¦ Ijod — inson ishi. ¦ Creativity is a human job." },
        { text: "Напоминание о дне рождения ¦ Tug'ilgan kun haqida eslatma ¦ A birthday reminder", zone: 'bot' },
        { text: "Сжать 300 картинок для сайта ¦ Sayt uchun 300 ta rasmni siqish ¦ Compress 300 images for a site", zone: 'bot' },
        { text: "Утешить друга ¦ Do'stni yupatish ¦ Comfort a friend", zone: 'me' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Скрипт по расписанию ¦ Jadval bo'yicha skript ¦ A script on a schedule",
      chat: "что бы вы делали каждый день в 9:00 автоматически? ¦ har kuni soat 9:00 da avtomatik nima qilgan bo'lardingiz? ¦ what would you automate every day at 9:00?",
      actors: [
        { id: 'clk', icon: '⏰', label: "9:00" },
        { id: 'bot', icon: '🤖', label: "Скрипт ¦ Skript ¦ Script" },
        { id: 'w', icon: '🌦️', label: "Погода ¦ Ob-havo ¦ Weather" },
        { id: 'msg', icon: '💬', label: "Сообщение вам ¦ Sizga xabar ¦ A message to you" },
      ],
      steps: [
        { say: "Каждое утро в 9:00 будильник запускает скрипт. ¦ Har tong soat 9:00 da budilnik skriptni ishga tushiradi. ¦ Every morning at 9:00 an alarm starts the script.", at: { clk: [12, 50, 1.2], bot: [38, 50] }, lines: [['clk', 'bot']], pulse: ['clk'] },
        { say: "Скрипт узнаёт погоду в интернете. ¦ Skript internetdan ob-havoni bilib oladi. ¦ The script checks the weather online.", at: { w: [64, 26] }, lines: [['clk', 'bot'], ['bot', 'w']] },
        { say: "И присылает вам: «Сегодня дождь — возьмите зонт ☂️». ¦ Va sizga yuboradi: «Bugun yomg'ir — soyabon oling ☂️». ¦ And sends you: “Rain today — take an umbrella ☂️.”", at: { msg: [88, 70] }, lines: [['clk', 'bot'], ['bot', 'w'], ['bot', 'msg']], pulse: ['msg'] },
      ],
      takeaway: "Написали один раз — работает каждый день сам. ¦ Bir marta yozildi — har kuni o'zi ishlaydi. ¦ Write it once and it works every day by itself.",
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Скрипт ошибается, если устал ¦ Skript charchasa xato qiladi ¦ A script makes mistakes when tired", truth: false, explain: "Он не устаёт — но ошибку в коде повторит 500 раз. ¦ U charchamaydi — lekin koddagi xatoni 500 marta takrorlaydi. ¦ It never tires — but repeats a code bug 500 times." },
        { text: "Скрипт лучше сначала проверить на 2–3 файлах ¦ Skriptni avval 2–3 faylda tekshirgan ma'qul ¦ Test a script on 2–3 files first", truth: true, explain: "И сделать копию файлов. ¦ Va fayllar nusxasini olish. ¦ And keep a backup." },
        { text: "Автоматизация — только для больших компаний ¦ Avtomatlashtirish — faqat katta kompaniyalar uchun ¦ Automation is only for big companies", truth: false, explain: "Даже школьник может автоматизировать свои дела. ¦ Hatto maktab o'quvchisi ham o'z ishlarini avtomatlashtira oladi. ¦ Even a student can automate their tasks." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: найди рутину ¦ Missiya: muntazam ishni top ¦ Mission: find the routine",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Компьютер работает, вы отдыхаете! ¦ Kompyuter ishlaydi, siz dam olasiz! ¦ The computer works while you rest!",
      items: [
        { title: "Что можно автоматизировать? ¦ Nimani avtomatlashtirish mumkin? ¦ What can be automated?", choices: ["Повторяющееся дело ¦ Takrorlanadigan ish ¦ A repeating task", "Разовую творческую идею ¦ Bir martalik ijodiy g'oya ¦ A one-off creative idea"], correct: 0, explain: "Повтор — признак автоматизации. ¦ Takror — avtomatlashtirish belgisi. ¦ Repetition is the sign." },
        { title: "Какая часть кода повторяет действие? ¦ Kodning qaysi qismi harakatni takrorlaydi? ¦ Which part of code repeats an action?", choices: ["Цикл for ¦ for sikli ¦ A for loop", "Комментарий ¦ Izoh ¦ A comment"], correct: 0, explain: "Цикл = повтор. ¦ Sikl = takror. ¦ A loop repeats." },
        { title: "Перед запуском на 500 файлах ¦ 500 ta faylda ishga tushirishdan oldin ¦ Before running on 500 files", choices: ["Проверить на 2 файлах ¦ 2 ta faylda tekshirish ¦ Test on 2 files", "Сразу запустить ¦ Darhol ishga tushirish ¦ Run it straight away"], correct: 0, explain: "Ошибка повторится 500 раз. ¦ Xato 500 marta takrorlanadi. ¦ A bug would repeat 500 times." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: автоматизация ¦ Xulosa: avtomatlashtirish ¦ Summary: automation",
      chat: "какое своё дело вы автоматизируете первым? ¦ qaysi ishingizni birinchi avtomatlashtirasiz? ¦ which task will you automate first?",
      answer: "Автоматизация — это когда повторяющуюся работу делает скрипт, маленькая программа. Он не устаёт и делает за секунды то, на что у человека уходят часы. Основа — цикл «повтори много раз», а запускать скрипт можно по расписанию. Перед большим запуском проверяем скрипт на паре файлов, а творческие дела оставляем людям. ¦ Avtomatlashtirish — takrorlanadigan ishni skript, ya'ni kichik dastur bajarganda. U charchamaydi va odamga soatlab vaqt ketadigan ishni soniyalarda qiladi. Asosi — «ko'p marta takrorla» sikli, skriptni esa jadval bo'yicha ishga tushirish mumkin. Katta ishga tushirishdan oldin skriptni bir-ikki faylda tekshiramiz, ijodiy ishlarni esa odamlarga qoldiramiz. ¦ Automation means a script — a small program — does repeating work. It never tires and does in seconds what takes a person hours. The core is a loop (“repeat many times”), and scripts can run on a schedule. Test on a couple of files before a big run, and leave creative work to people.",
      icon: '🤖',
      badge: "Повелитель роботов ¦ Robotlar hukmdori ¦ Robot commander",
      badgeSub: "Bootstrap · общая 3 ¦ Bootstrap · umumiy 3 ¦ Bootstrap · general 3",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Запишите 3 дела, которые вы делаете каждый день одинаково. ¦ Har kuni bir xil qiladigan 3 ta ishingizni yozing. ¦ List 3 things you do the same way every day.",
        "Поставьте в телефоне автоматическое напоминание. ¦ Telefoningizda avtomatik eslatma o'rnating. ¦ Set an automatic reminder on your phone.",
      ],
      takeaway: "Дальше: как устроен ChatGPT. ¦ Keyingisi: ChatGPT qanday tuzilgan. ¦ Next: how ChatGPT works.",
      notes: { min: 2 },
    },
  ],
});
