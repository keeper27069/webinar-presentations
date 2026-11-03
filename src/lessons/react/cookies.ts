import { kit } from '@engine/kit';

const BANNER_CSS = `body{margin:0;font-family:system-ui;background:#f4f6fb;color:#1b2150;min-height:100vh}
.page{padding:24px}.page h2{margin:0 0 8px}
.banner{position:fixed;left:16px;right:16px;bottom:16px;background:#1b2150;color:#fff;border-radius:16px;padding:18px 20px}
.banner p{margin:0 0 12px;font-size:16px}
.row{display:flex;gap:10px;flex-wrap:wrap}
.banner button{padding:10px 16px;border:0;border-radius:10px;font-weight:700;font-size:15px}
.accept{background:#22d3c5;color:#1b2150}.reject{background:#fff;color:#1b2150}.set{background:transparent;color:#fff;border:1px solid #fff !important}`;
const BANNER_HTML = `<div class="page"><h2>🍪 Cookie Café</h2><p>Demo site · nothing is saved or sent</p></div>
<div class="banner"><p>We use cookies: necessary ones keep you signed in and your cart; analytics and ads are optional.</p>
<div class="row"><button class="accept">Accept all</button><button class="reject">Necessary only</button><button class="set">Settings</button></div></div>`;

export default kit({
  id: 'react-g04',
  title: "Почему сайты спрашивают про cookies ¦ Nega saytlar cookies haqida so'raydi ¦ Why sites ask about cookies",
  question: "Что будет, если нажать «Принять» — и как сайт запоминает вас между посещениями? ¦ «Qabul qilish»ni bossangiz nima bo'ladi — va sayt sizni tashriflar orasida qanday eslab qoladi? ¦ What happens when you press “Accept” — and how does a site remember you between visits?",
  route: ["Что это ¦ Bu nima ¦ What they are", "Как работают ¦ Qanday ishlaydi ¦ How they work", "Виды ¦ Turlari ¦ Kinds", "Ваш выбор ¦ Sizning tanlovingiz ¦ Your choice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🍪',
      kicker: "React · общая тема 4 ¦ React · umumiy mavzu 4 ¦ React · general topic 4",
      title: "Записка, которую сайт оставляет в браузере ¦ Sayt brauzerda qoldiradigan eslatma ¦ A note a site leaves in your browser",
      chat: "вы обычно нажимаете «Принять» не читая? ¦ odatda o'qimasdan «Qabul qilish»ni bosasizmi? ¦ do you usually press “Accept” without reading?",
      lead: "Cookie — маленькая текстовая записка, которую сайт сохраняет в браузере. С каждым запросом браузер отдаёт её обратно, и сайт «узнаёт» вас: вы вошли, в корзине 3 товара, язык — узбекский. ¦ Cookie — sayt brauzerda saqlaydigan kichik matnli eslatma. Har bir so'rov bilan brauzer uni qaytarib beradi va sayt sizni «taniydi»: siz kirgansiz, savatda 3 ta mahsulot, til — o'zbekcha. ¦ A cookie is a small text note a site stores in your browser. With every request the browser hands it back, and the site “recognises” you: signed in, 3 items in the cart, language Uzbek.",
      facts: ["Небольшой текст «ключ=значение» ¦ Kichik «kalit=qiymat» matni ¦ Small “key=value” text", "Отправляется с каждым запросом ¦ Har bir so'rov bilan yuboriladi ¦ Sent with every request", "Бывают нужные и необязательные ¦ Kerakli va ixtiyoriy bo'ladi ¦ Some necessary, some optional"],
      takeaway: "Cookies — это память веб-приложений о пользователе. ¦ Cookies — veb-ilovalarning foydalanuvchi haqidagi xotirasi. ¦ Cookies are web apps' memory of the user.",
      notes: { say: ["Покажите DevTools → Application → Cookies на любом сайте, где вы вошли."], min: 3 },
    },
    {
      type: 'dialog',
      stage: 1,
      title: "Как сайт вас узнаёт ¦ Sayt sizni qanday taniydi ¦ How a site recognises you",
      chat: "что браузер отправит при следующем визите? ¦ keyingi tashrifda brauzer nimani yuboradi? ¦ what will the browser send on the next visit?",
      a: { name: "Браузер ¦ Brauzer ¦ Browser", icon: '🌐' },
      b: { name: "Сервер ¦ Server ¦ Server", icon: '🗄️' },
      messages: [
        { from: 'a', text: "Вход: логин и пароль. ¦ Kirish: login va parol. ¦ Sign in: username and password." },
        { from: 'b', text: "Верно! Сохрани cookie: session=8f3a… ¦ To'g'ri! Cookie'ni saqla: session=8f3a… ¦ Correct! Store this cookie: session=8f3a…", good: "Сайт выдал «пропуск» ¦ Sayt «ruxsatnoma» berdi ¦ The site issued a “pass”" },
        { from: 'a', text: "Открываю корзину. Cookie: session=8f3a… ¦ Savatni ochyapman. Cookie: session=8f3a… ¦ Opening the cart. Cookie: session=8f3a…" },
        { from: 'b', text: "Узнал вас! Вот ваша корзина — пароль больше не нужен. ¦ Sizni tanidim! Mana savatingiz — parol endi kerak emas. ¦ I know you! Here's your cart — no password needed." },
      ],
      takeaway: "Cookie сессии — как браслет на входе: показали — и вас пускают без повторной проверки. ¦ Sessiya cookie'si — kirishdagi bilaguzuk kabi: ko'rsatdingiz — va sizni qayta tekshiruvsiz kiritishadi. ¦ A session cookie is like a wristband: show it and you're let in without re-checking.",
      notes: { say: ["Поэтому чужой cookie сессии нельзя никому передавать — это как ключ от аккаунта."], min: 4 },
    },
    {
      type: 'walk',
      stage: 1,
      title: "Cookie изнутри ¦ Cookie ichidan ¦ Inside a cookie",
      chat: "сколько проживёт эта cookie? ¦ bu cookie qancha yashaydi? ¦ how long will this cookie live?",
      code: `Set-Cookie: lang=uz; Max-Age=31536000; Path=/\nSet-Cookie: session=8f3a…; HttpOnly; Secure; SameSite=Lax\n\n// In JavaScript:\ndocument.cookie = 'theme=dark; max-age=86400';`,
      lang: 'text',
      marks: [
        { line: 1, text: "Сервер просит сохранить lang=uz на год (31 536 000 секунд). ¦ Server lang=uz ni bir yilga (31 536 000 soniya) saqlashni so'raydi. ¦ The server asks to keep lang=uz for a year (31,536,000 seconds)." },
        { line: 2, text: "HttpOnly — JavaScript её не прочитает, Secure — только по HTTPS. Так защищают cookie входа. ¦ HttpOnly — JavaScript uni o'qiy olmaydi, Secure — faqat HTTPS orqali. Kirish cookie'si shunday himoyalanadi. ¦ HttpOnly hides it from JavaScript; Secure sends it only over HTTPS. That's how sign-in cookies are protected." },
        { line: 5, text: "Сайт может поставить cookie и из JS — на сутки (86 400 секунд). ¦ Sayt JS'dan ham cookie qo'yishi mumkin — bir sutkaga (86 400 soniya). ¦ A site can also set one from JS — for a day (86,400 seconds)." },
      ],
      takeaway: "Cookie — это строка с именем, значением и правилами: сколько жить и кому видна. ¦ Cookie — nom, qiymat va qoidalarga ega satr: qancha yashash va kimga ko'rinishi. ¦ A cookie is a string with a name, a value and rules: how long it lives and who sees it.",
      notes: { min: 4 },
    },
    {
      type: 'cards',
      stage: 2,
      title: "Какие бывают cookies ¦ Qanday cookies bo'ladi ¦ Kinds of cookies",
      chat: "какие cookies вы бы оставили включёнными? ¦ qaysi cookies'ni yoqilgan holda qoldirardingiz? ¦ which cookies would you keep on?",
      cards: [
        { icon: '🔑', front: "Необходимые ¦ Zarur ¦ Necessary", back: "Вход в аккаунт, корзина, безопасность. Без них сайт не работает. ¦ Akkauntga kirish, savat, xavfsizlik. Ularsiz sayt ishlamaydi. ¦ Sign-in, cart, security. The site breaks without them." },
        { icon: '⚙️', front: "Настройки ¦ Sozlamalar ¦ Preferences", back: "Язык, тёмная тема, город. ¦ Til, qorong'i mavzu, shahar. ¦ Language, dark mode, city." },
        { icon: '📊', front: "Аналитика ¦ Analitika ¦ Analytics", back: "Сколько людей зашло и куда кликали — чтобы улучшить сайт. ¦ Qancha odam kirdi va qayerga bosdi — saytni yaxshilash uchun. ¦ How many visited and what they clicked — to improve the site." },
        { icon: '🎯', front: "Реклама ¦ Reklama ¦ Advertising", back: "Сторонние cookies следят за вами на разных сайтах и подбирают рекламу. ¦ Uchinchi tomon cookies sizni turli saytlarda kuzatib, reklama tanlaydi. ¦ Third-party cookies follow you across sites to target ads." },
      ],
      takeaway: "«Принять всё» включает и рекламу. «Только необходимые» — сайт работает, слежки меньше. ¦ «Hammasini qabul qilish» reklamani ham yoqadi. «Faqat zarurlari» — sayt ishlaydi, kuzatuv kamroq. ¦ “Accept all” turns ads on too. “Necessary only” keeps the site working with less tracking.",
      notes: { min: 5 },
    },
    {
      type: 'compare',
      stage: 2,
      title: "Cookies и LocalStorage ¦ Cookies va LocalStorage ¦ Cookies vs LocalStorage",
      chat: "где хранить тёмную тему, а где — вход? ¦ qorong'i mavzuni qayerda, kirishni qayerda saqlash kerak? ¦ where does dark mode go, and where does sign-in?",
      left: { icon: '🍪', label: 'Cookies', points: ["Уходят на сервер с каждым запросом ¦ Har bir so'rov bilan serverga ketadi ¦ Go to the server on every request", "Маленькие: ~4 КБ ¦ Kichik: ~4 KB ¦ Small: ~4 KB", "Подходят для входа (HttpOnly) ¦ Kirish uchun mos (HttpOnly) ¦ Good for sign-in (HttpOnly)"] },
      right: { icon: '💾', label: 'LocalStorage', points: ["Остаётся только в браузере ¦ Faqat brauzerda qoladi ¦ Stays in the browser only", "Больше: несколько МБ ¦ Kattaroq: bir necha MB ¦ Bigger: a few MB", "Подходит для настроек и черновиков ¦ Sozlamalar va qoralamalar uchun mos ¦ Good for settings and drafts"] },
      verdict: "Серверу нужно знать — cookie. Нужно только интерфейсу — LocalStorage (тема прошлого модуля). ¦ Serverga bilish kerak — cookie. Faqat interfeysga kerak — LocalStorage (o'tgan modul mavzusi). ¦ If the server needs it: cookie. If only the UI needs it: LocalStorage (from the last module).",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 2,
      title: "Нужная или необязательная? ¦ Zarurmi yoki ixtiyoriymi? ¦ Necessary or optional?",
      chat: "пишите: «1 — нужная» ¦ yozing: «1 — zarur» ¦ write: “1 — necessary”",
      zones: [
        { id: 'need', label: "Необходимая ¦ Zarur ¦ Necessary", icon: '🔑' },
        { id: 'opt', label: "Необязательная ¦ Ixtiyoriy ¦ Optional", icon: '🎯' },
      ],
      items: [
        { text: "Помнить, что вы вошли ¦ Kirganingizni eslab qolish ¦ Remember you're signed in", zone: 'need' },
        { text: "Показывать рекламу кроссовок на других сайтах ¦ Boshqa saytlarda krossovka reklamasini ko'rsatish ¦ Show sneaker ads on other sites", zone: 'opt' },
        { text: "Хранить товары в корзине ¦ Savatdagi mahsulotlarni saqlash ¦ Keep items in the cart", zone: 'need' },
        { text: "Считать, сколько секунд вы читали статью ¦ Maqolani necha soniya o'qiganingizni hisoblash ¦ Count how long you read an article", zone: 'opt' },
      ],
      takeaway: "Необходимые нельзя отключить — без них сайт сломается. Остальные — по вашему выбору. ¦ Zarurlarini o'chirib bo'lmaydi — ularsiz sayt buziladi. Qolganlari — sizning tanlovingiz bo'yicha. ¦ Necessary ones can't be turned off; the rest are your choice.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'browser',
      stage: 3,
      title: "Тот самый баннер ¦ O'sha banner ¦ That banner",
      chat: "какую кнопку вы бы нажали и почему? ¦ qaysi tugmani bosgan bo'lardingiz va nega? ¦ which button would you press, and why?",
      tabs: [
        { label: "Компьютер ¦ Kompyuter ¦ Desktop", url: 'https://cookie-cafe.example', css: BANNER_CSS, html: BANNER_HTML, note: "Честный баннер: кнопки равного размера и понятный выбор. ¦ Halol banner: teng o'lchamdagi tugmalar va tushunarli tanlov. ¦ An honest banner: equal buttons and a clear choice." },
        { label: "Телефон ¦ Telefon ¦ Phone", url: 'https://cookie-cafe.example', css: BANNER_CSS, html: BANNER_HTML, width: 360, note: "На телефоне баннер закрывает пол-экрана — поэтому его хочется скорее нажать. ¦ Telefonda banner ekranning yarmini yopadi — shuning uchun uni tezroq bosgingiz keladi. ¦ On a phone it covers half the screen, so you want to tap it fast." },
      ],
      takeaway: "Не спешите: «Только необходимые» или «Настройки» — нормальный выбор. ¦ Shoshilmang: «Faqat zarurlari» yoki «Sozlamalar» — normal tanlov. ¦ Don't rush: “Necessary only” or “Settings” are fine choices.",
      notes: { say: ["Демо-страница выдуманного кафе: кнопки ничего не сохраняют."], min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Cookie — это вирус ¦ Cookie — bu virus ¦ A cookie is a virus", truth: false, explain: "Это просто текст, он не запускается как программа. ¦ Bu shunchaki matn, u dastur kabi ishga tushmaydi. ¦ It's just text; it doesn't run like a program." },
        { text: "Если очистить cookies, сайты вас «забудут» ¦ Cookies'ni tozalasangiz, saytlar sizni «unutadi» ¦ Clearing cookies makes sites “forget” you", truth: true, explain: "Придётся войти заново, корзина может опустеть. ¦ Qaytadan kirishga to'g'ri keladi, savat bo'shab qolishi mumkin. ¦ You'll have to sign in again; carts may empty." },
        { text: "«Только необходимые» ломает сайт ¦ «Faqat zarurlari» saytni buzadi ¦ “Necessary only” breaks the site", truth: false, explain: "Сайт работает — просто меньше аналитики и рекламы. ¦ Sayt ishlaydi — shunchaki analitika va reklama kamroq. ¦ The site works — just less analytics and ads." },
        { text: "Нельзя никому отправлять свой cookie сессии ¦ O'z sessiya cookie'ingizni hech kimga yuborib bo'lmaydi ¦ Never send anyone your session cookie", truth: true, explain: "С ним можно войти в ваш аккаунт без пароля. ¦ U bilan akkauntingizga parolsiz kirish mumkin. ¦ It lets someone into your account without a password." },
      ],
      takeaway: "Cookies — полезная память сайта, но выбор, что разрешить, — за вами. ¦ Cookies — saytning foydali xotirasi, lekin nimaga ruxsat berishni siz tanlaysiz. ¦ Cookies are useful site memory, but what you allow is your choice.",
      notes: { say: ["Голосуем по пунктам."], min: 4 },
    },
    {
      type: 'flow',
      stage: 3,
      title: "Ваш выбор за 3 шага ¦ 3 qadamda sizning tanlovingiz ¦ Your choice in 3 steps",
      chat: "где в вашем браузере очищаются cookies? ¦ brauzeringizda cookies qayerda tozalanadi? ¦ where do you clear cookies in your browser?",
      nodes: [
        { icon: '👀', label: "Прочитать баннер ¦ Bannerni o'qish ¦ Read the banner", text: "Какие cookies и зачем? ¦ Qanday cookies va nima uchun? ¦ Which cookies and why?" },
        { icon: '⚙️', label: "Настройки ¦ Sozlamalar ¦ Settings", text: "Оставить нужное, выключить рекламу. ¦ Keraklisini qoldirish, reklamani o'chirish. ¦ Keep the necessary, switch off ads." },
        { icon: '🧹', label: "Очистка ¦ Tozalash ¦ Clean-up", text: "В настройках браузера можно удалить cookies сайта. ¦ Brauzer sozlamalarida sayt cookies'ini o'chirish mumkin. ¦ Browser settings let you delete a site's cookies." },
      ],
      takeaway: "Пять секунд на настройки — и меньше слежки. ¦ Sozlamalarga besh soniya — va kuzatuv kamroq. ¦ Five seconds in settings means less tracking.",
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: умный выбор ¦ Missiya: aqlli tanlov ¦ Mission: a smart choice",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Сайт работает, а слежки меньше! ¦ Sayt ishlaydi, kuzatuv esa kamroq! ¦ The site works, with less tracking!",
      items: [
        { title: "Где хранить, что вы вошли? ¦ Kirganingizni qayerda saqlash kerak? ¦ Where's “you're signed in” stored?", choices: ["Cookie с HttpOnly ¦ HttpOnly cookie ¦ A cookie with HttpOnly", "Картинка на сайте ¦ Saytdagi rasm ¦ A picture on the site"], correct: 0, explain: "Сервер видит, JS — нет. ¦ Server ko'radi, JS — yo'q. ¦ The server sees it; JS doesn't." },
        { title: "Не хотите рекламной слежки ¦ Reklama kuzatuvini xohlamaysiz ¦ You don't want ad tracking", choices: ["«Только необходимые» ¦ «Faqat zarurlari» ¦ “Necessary only”", "«Принять всё» ¦ «Hammasini qabul qilish» ¦ “Accept all”"], correct: 0, explain: "Реклама — необязательная. ¦ Reklama — ixtiyoriy. ¦ Ads are optional." },
        { title: "Тёмная тема только для интерфейса ¦ Qorong'i mavzu faqat interfeys uchun ¦ Dark mode for the UI only", choices: ['LocalStorage', "Cookie ¦ Cookie ¦ Cookie"], correct: 0, explain: "Серверу знать не нужно. ¦ Serverga bilish shart emas. ¦ The server doesn't need it." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: cookies ¦ Xulosa: cookies ¦ Summary: cookies",
      chat: "что вы нажмёте на следующем баннере? ¦ keyingi bannerda nimani bosasiz? ¦ what will you press on the next banner?",
      answer: "Cookie — небольшая текстовая записка, которую сайт хранит в браузере; браузер отправляет её с каждым запросом, и так сайт помнит вход, корзину и язык. Необходимые cookies нужны для работы, а аналитика и реклама — по вашему выбору. Cookie входа защищают флагами HttpOnly и Secure и никому не передают. Для настроек только интерфейса подходит LocalStorage. ¦ Cookie — sayt brauzerda saqlaydigan kichik matnli eslatma; brauzer uni har bir so'rov bilan yuboradi va sayt shunday qilib kirish, savat va tilni eslab qoladi. Zarur cookies ish uchun kerak, analitika va reklama esa — sizning tanlovingiz bo'yicha. Kirish cookie'lari HttpOnly va Secure bayroqlari bilan himoyalanadi va hech kimga berilmaydi. Faqat interfeys sozlamalari uchun LocalStorage mos keladi. ¦ A cookie is a small text note a site keeps in your browser; the browser sends it with every request, so the site remembers sign-in, cart and language. Necessary cookies keep it working; analytics and ads are your choice. Sign-in cookies are protected with HttpOnly and Secure and never shared. UI-only settings fit LocalStorage.",
      icon: '🍪',
      badge: "Знаток cookies ¦ Cookies bilimdoni ¦ Cookie expert",
      badgeSub: "React · общая 4 ¦ React · umumiy 4 ¦ React · general 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Откройте DevTools → Application → Cookies на любимом сайте и найдите 3 cookie. Угадайте, зачем они. ¦ Sevimli saytingizda DevTools → Application → Cookies'ni oching va 3 ta cookie toping. Ular nima uchun ekanini taxmin qiling. ¦ Open DevTools → Application → Cookies on a favourite site, find 3 cookies and guess why they exist.",
        "На следующем баннере выберите «Настройки» и посмотрите, что там. ¦ Keyingi bannerda «Sozlamalar»ni tanlang va u yerda nima borligini ko'ring. ¦ On the next banner, choose “Settings” and look inside.",
      ],
      takeaway: "Следующая тема — что внутри смартфона и почему тяжёлые приложения тормозят. ¦ Keyingi mavzu — smartfon ichida nima bor va nega og'ir ilovalar qotadi. ¦ Next: what's inside a smartphone and why heavy apps lag.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
