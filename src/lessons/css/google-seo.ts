import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Arial,system-ui}
.serp{width:520px;padding:22px 24px;border-radius:18px;background:#fff;box-shadow:0 10px 30px #0001}
.q{padding:10px 18px;border-radius:999px;border:2px solid #e6e8ee;font-size:18px;margin-bottom:18px}
.url{font-size:15px;color:#3c4043}.t{font-size:24px;color:#1a0dab;margin:4px 0}.d{font-size:16px;color:#4d5156;line-height:1.4}
.bad .t{color:#888}.bad .d{color:#aaa;font-style:italic}`;
const serp = (cls: string, t: string, d: string) =>
  `<div class="wrap"><div class="serp ${cls}"><div class="q">🔍 cake shop tashkent</div><div class="url">🧁 shirin-tort.example</div><div class="t">${t}</div><div class="d">${d}</div></div></div>`;

export default kit({
  id: 'css-g10',
  title: "Как сделать, чтобы сайт нашли в Google ¦ Saytni Google'da qanday topadigan qilish ¦ How to get your site found on Google",
  question: "Как Google решает, чей сайт показать первым? ¦ Google kimning saytini birinchi ko'rsatishni qanday hal qiladi? ¦ How does Google decide whose site comes first?",
  route: ["Робот ¦ Robot ¦ The robot", "Сниппет ¦ Snippet ¦ The snippet", "Первое место ¦ Birinchi o'rin ¦ First place", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔎',
      kicker: "CSS · общая тема 10 ¦ CSS · umumiy mavzu 10 ¦ CSS · general topic 10",
      title: "Сайт есть, а людей нет? ¦ Sayt bor, odamlar yo'qmi? ¦ A site but no visitors?",
      chat: "вы часто листаете на вторую страницу Google? ¦ Google'ning ikkinchi sahifasiga tez-tez o'tasizmi? ¦ do you often go to page 2 on Google?",
      lead: "Почти никто не листает дальше первой страницы. Помочь Google понять ваш сайт и показать его выше — это SEO. Хорошая новость: основы — это просто аккуратный HTML. ¦ Deyarli hech kim birinchi sahifadan nariga o'tmaydi. Google'ga saytingizni tushunishga va uni yuqoriroq ko'rsatishga yordam berish — bu SEO. Yaxshi xabar: asoslari — shunchaki tartibli HTML. ¦ Almost nobody goes past page one. Helping Google understand your site and rank it higher is SEO. Good news: the basics are just tidy HTML.",
      facts: ["SEO — «чтобы нашли» ¦ SEO — «topishlari uchun» ¦ SEO means “getting found”", "Google читает сайты роботом ¦ Google saytlarni robot bilan o'qiydi ¦ Google reads sites with a robot", "Важны title, текст и скорость ¦ title, matn va tezlik muhim ¦ Title, text and speed matter"],
      takeaway: "Посмотрим, как робот Google путешествует по сайтам. ¦ Google roboti saytlar bo'ylab qanday sayohat qilishini ko'ramiz. ¦ Let's watch Google's robot travel the web.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Робот, библиотека и поиск ¦ Robot, kutubxona va qidiruv ¦ Robot, library and search",
      chat: "как робот находит новые сайты? ¦ robot yangi saytlarni qanday topadi? ¦ how does the robot find new sites?",
      actors: [
        { id: 'bot', icon: '🤖', label: "Робот Google ¦ Google roboti ¦ Google's robot" },
        { id: 's1', icon: '📄', label: "Сайт 1 ¦ Sayt 1 ¦ Site 1" },
        { id: 's2', icon: '📄', label: "Сайт 2 ¦ Sayt 2 ¦ Site 2" },
        { id: 's3', icon: '🧁', label: "Ваш сайт ¦ Saytingiz ¦ Your site" },
        { id: 'lib', icon: '📚', label: "Библиотека Google ¦ Google kutubxonasi ¦ Google's library" },
        { id: 'user', icon: '🙂', label: "«торт Ташкент» ¦ «tort Toshkent» ¦ “cake Tashkent”" },
      ],
      steps: [
        { say: "Робот Google ходит по сайтам и читает их. ¦ Google roboti saytlarni aylanib, ularni o'qiydi. ¦ Google's robot visits sites and reads them.", at: { bot: [10, 30], s1: [32, 30], s2: [54, 30], s3: [76, 30] }, lines: [['bot', 's1']] },
        { say: "Переходит по ссылкам с сайта на сайт — так находит новые. ¦ Havolalar orqali saytdan saytga o'tadi — yangilarini shunday topadi. ¦ It follows links from site to site and finds new ones.", at: { bot: [54, 14, 0.8] }, lines: [['s1', 's2', "🔗"], ['s2', 's3', "🔗"]] },
        { say: "Всё прочитанное он складывает в огромную библиотеку. ¦ O'qiganlarining hammasini ulkan kutubxonaga joylaydi. ¦ Everything it reads goes into a huge library.", at: { lib: [50, 72, 1.3] }, lines: [['s1', 'lib'], ['s2', 'lib'], ['s3', 'lib']], pulse: ['lib'] },
        { say: "Человек ищет «торт Ташкент» — Google ищет в библиотеке и выдаёт ответ. ¦ Odam «tort Toshkent» deb qidiradi — Google kutubxonadan qidirib, javob beradi. ¦ Someone searches “cake Tashkent” and Google answers from its library.", at: { user: [88, 72] }, lines: [['user', 'lib', "🔍"], ['lib', 's3', "№1?"]], pulse: ['s3'] },
      ],
      takeaway: "Нет ссылок на сайт — робот его не найдёт. ¦ Saytga havola bo'lmasa — robot uni topmaydi. ¦ No links to your site means the robot won't find it.",
      notes: { min: 5 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Как сайт выглядит в поиске ¦ Sayt qidiruvda qanday ko'rinadi ¦ How your site looks in search",
      chat: "на какой результат вы бы нажали? ¦ qaysi natijani bosgan bo'lardingiz? ¦ which result would you click?",
      lang: 'html',
      css: CSS,
      steps: [
        { code: '<title>Document</title>', html: serp('bad', 'Document', 'No description…'), say: "Забыли title — в поиске «Document». Никто не нажмёт. ¦ title unutildi — qidiruvda «Document». Hech kim bosmaydi. ¦ Forgot the title: search shows “Document”. Nobody clicks." },
        { code: '<title>Shirin Tort — cakes\n  to order in Tashkent</title>', line: 1, html: serp('', 'Shirin Tort — cakes to order in Tashkent', 'No description…'), say: "Понятный title с главными словами. ¦ Asosiy so'zlar bilan tushunarli title. ¦ A clear title with the key words." },
        { code: '<meta name="description"\n  content="Birthday cakes in 1 day.\n  Free delivery. Order online!">', line: 2, html: serp('', 'Shirin Tort — cakes to order in Tashkent', 'Birthday cakes in 1 day. Free delivery. Order online!'), say: "Описание — короткая «реклама» под заголовком. ¦ Tavsif — sarlavha ostidagi qisqa «reklama». ¦ The description is a little ad under the title." },
      ],
      takeaway: "title + description = ваша витрина в Google. ¦ title + description = Google'dagi vitrinangiz. ¦ Title + description = your shop window on Google.",
      notes: { min: 5 },
    },
    {
      type: 'animate',
      stage: 3,
      title: "Поднимаемся на первое место ¦ Birinchi o'ringa ko'tarilamiz ¦ Climbing to first place",
      chat: "что важнее всего для Google, как думаете? ¦ sizningcha, Google uchun eng muhimi nima? ¦ what matters most to Google, do you think?",
      actors: [
        { id: 'me', icon: '🧁', label: "Ваш сайт ¦ Saytingiz ¦ Your site" },
        { id: 'r', text: "№ 9" },
        { id: 'f1', text: "📝 полезный текст ¦ 📝 foydali matn ¦ 📝 useful text" },
        { id: 'f2', text: "📱 удобно на телефоне ¦ 📱 telefonda qulay ¦ 📱 phone-friendly" },
        { id: 'f3', text: "⚡ быстро грузится ¦ ⚡ tez yuklanadi ¦ ⚡ loads fast" },
        { id: 'f4', text: "🔗 ссылки с других сайтов ¦ 🔗 boshqa saytlardan havolalar ¦ 🔗 links from other sites" },
      ],
      steps: [
        { say: "Новый сайт — где-то на 9-м месте. ¦ Yangi sayt — taxminan 9-o'rinda. ¦ A new site sits around 9th place.", at: { me: [50, 84], r: [64, 84] } },
        { say: "Пишем полезный текст о тортах — поднялись! ¦ Tortlar haqida foydali matn yozamiz — ko'tarildik! ¦ Write useful text about cakes — up we go!", at: { me: [50, 66], r: [64, 66], f1: [18, 66] }, set: { r: { text: "№ 6" } } },
        { say: "Сайт удобный на телефоне — ещё выше. ¦ Sayt telefonda qulay — yana yuqoriroq. ¦ It works well on phones — higher still.", at: { me: [50, 48], r: [64, 48], f2: [82, 48] }, set: { r: { text: "№ 4" } } },
        { say: "Грузится быстро — картинки сжаты. ¦ Tez yuklanadi — rasmlar siqilgan. ¦ It loads fast — images are compressed.", at: { me: [50, 32], r: [64, 32], f3: [18, 32] }, set: { r: { text: "№ 2" } } },
        { say: "Другие сайты ссылаются на вас — первое место! ¦ Boshqa saytlar sizga havola beradi — birinchi o'rin! ¦ Other sites link to you — first place!", at: { me: [50, 14, 1.3], r: [64, 14], f4: [82, 14] }, set: { r: { text: "№ 1 🏆" } }, pulse: ['me'] },
      ],
      takeaway: "Google любит сайты, полезные и удобные людям. ¦ Google odamlar uchun foydali va qulay saytlarni yaxshi ko'radi. ¦ Google likes sites that are useful and easy for people.",
      notes: { min: 5 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Помогает или мешает? ¦ Yordam beradimi yoki xalaqit beradimi? ¦ Helps or hurts?",
      chat: "пишите: «1 — помогает» ¦ yozing: «1 — yordam beradi» ¦ write: “1 — helps”",
      zones: [
        { id: 'ok', label: "Помогает ¦ Yordam beradi ¦ Helps", icon: '📈' },
        { id: 'no', label: "Мешает ¦ Xalaqit beradi ¦ Hurts", icon: '📉' },
      ],
      items: [
        { text: "Понятный <title> на каждой странице ¦ Har sahifada tushunarli <title> ¦ A clear <title> on every page", zone: 'ok' },
        { text: "Текст только на картинках ¦ Matn faqat rasmlarda ¦ Text only inside images", zone: 'no', why: "Роботу трудно читать текст на картинке. ¦ Robotga rasmdagi matnni o'qish qiyin. ¦ Robots struggle to read text in images." },
        { text: "alt у картинок ¦ Rasmlarda alt ¦ alt on images", zone: 'ok' },
        { text: "Огромные тяжёлые фото ¦ Ulkan og'ir fotolar ¦ Huge heavy photos", zone: 'no' },
        { text: "Один заголовок <h1> о главном ¦ Asosiy haqida bitta <h1> sarlavha ¦ One <h1> about the main topic", zone: 'ok' },
      ],
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Можно заплатить и навсегда стать первым ¦ Pul to'lab, abadiy birinchi bo'lish mumkin ¦ You can pay to be first forever", truth: false, explain: "Реклама помечается отдельно, а обычные места зарабатывают пользой. ¦ Reklama alohida belgilanadi, oddiy o'rinlar esa foyda bilan qo'lga kiritiladi. ¦ Ads are labelled separately; normal spots are earned." },
        { text: "Повторять одно слово 100 раз — хорошая идея ¦ Bitta so'zni 100 marta takrorlash — yaxshi g'oya ¦ Repeating a word 100 times is a good idea", truth: false, explain: "Google за это опускает сайт. ¦ Google buning uchun saytni pastga tushiradi. ¦ Google ranks such sites lower." },
        { text: "Аккуратный HTML уже помогает SEO ¦ Tartibli HTML allaqachon SEO'ga yordam beradi ¦ Tidy HTML already helps SEO", truth: true, explain: "title, h1, alt и семантика — основа. ¦ title, h1, alt va semantika — asos. ¦ title, h1, alt and semantic tags are the base." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: в топ Google ¦ Missiya: Google toplariga ¦ Mission: Google's top spot",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сайт кондитерской на первой странице! ¦ Qandolatxona sayti birinchi sahifada! ¦ The cake shop is on page one!",
      items: [
        { title: "Какой title лучше? ¦ Qaysi title yaxshiroq? ¦ Which title is better?", choices: ["Shirin Tort — cakes in Tashkent", "Home"], correct: 0, explain: "В title — главное слово и город. ¦ title'da — asosiy so'z va shahar. ¦ The key word and city go in the title." },
        { title: "Как роботу найти новый сайт? ¦ Robot yangi saytni qanday topadi? ¦ How does the robot find a new site?", choices: ["По ссылкам с других сайтов ¦ Boshqa saytlardagi havolalar orqali ¦ Via links from other sites", "Сам по себе — никак ¦ O'z-o'zidan — hech qanday ¦ It can't by itself"], correct: 0, explain: "Ссылки — дороги для робота. ¦ Havolalar — robot uchun yo'llar. ¦ Links are roads for the robot." },
        { title: "Сайт медленный ¦ Sayt sekin ¦ The site is slow", choices: ["Сжать картинки ¦ Rasmlarni siqish ¦ Compress the images", "Добавить больше видео ¦ Ko'proq video qo'shish ¦ Add more videos"], correct: 0, explain: "Лёгкие картинки — быстрый сайт. ¦ Yengil rasmlar — tez sayt. ¦ Light images, fast site." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: сайт в Google ¦ Xulosa: Google'da sayt ¦ Summary: your site on Google",
      chat: "какой title вы дадите своему сайту? ¦ saytingizga qanday title berasiz? ¦ what title will you give your site?",
      answer: "Робот Google ходит по ссылкам, читает сайты и складывает их в библиотеку, а на запрос выдаёт самые полезные. В поиске человек видит title и описание — это ваша витрина. Выше поднимают полезный текст, удобство на телефоне, скорость и ссылки с других сайтов, а обман вроде повторения слов только вредит. Основа SEO — аккуратный HTML: title, h1, alt. ¦ Google roboti havolalar bo'ylab yuradi, saytlarni o'qiydi va kutubxonaga joylaydi, so'rovga esa eng foydalilarini beradi. Qidiruvda odam title va tavsifni ko'radi — bu sizning vitrinangiz. Foydali matn, telefonda qulaylik, tezlik va boshqa saytlardan havolalar yuqoriga ko'taradi, so'zlarni takrorlash kabi aldov esa faqat zarar beradi. SEO asosi — tartibli HTML: title, h1, alt. ¦ Google's robot follows links, reads sites and files them in a library, then serves the most useful ones for each search. In results people see your title and description — your shop window. Useful text, phone-friendliness, speed and links from other sites raise you up, while tricks like repeating words only hurt. The base of SEO is tidy HTML: title, h1, alt.",
      icon: '🔎',
      badge: "Друг Google ¦ Google do'sti ¦ Google's friend",
      badgeSub: "CSS · общая 10 ¦ CSS · umumiy 10 ¦ CSS · general 10",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Напишите своему сайту title и description. ¦ Saytingizga title va description yozing. ¦ Write a title and description for your site.",
        "Добавьте alt ко всем картинкам. ¦ Barcha rasmlarga alt qo'shing. ¦ Add alt to all images.",
      ],
      takeaway: "Модуль CSS пройден! Дальше — Bootstrap. ¦ CSS moduli tugadi! Keyingisi — Bootstrap. ¦ CSS module complete! Next: Bootstrap.",
      notes: { min: 2 },
    },
  ],
});
