import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.tb{width:480px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 10px 30px #0001}
.tt{padding:10px 16px;background:#16181f;color:#fff;font:800 16px JetBrains Mono,monospace}
.r{display:grid;grid-template-columns:50px 1fr 90px;padding:10px 16px;border-top:2px solid #eceef3;font-size:19px}
.r.h{background:#f6f7fa;font-weight:800;color:#6b7183;font-size:15px;text-transform:uppercase}
.r.hit{background:#e8faf7;color:#0f766e;font-weight:800}.r.new{background:#fff6d6}.r.dim{opacity:.35}`;
type Row = [number, string, number];
const BASE: Row[] = [[1, 'Lola', 40], [2, 'Timur', 75], [3, 'Aziz', 62]];
const tb = (rows: Row[], o: { hit?: number[]; fresh?: number; dim?: boolean } = {}) =>
  `<div class="wrap"><div class="tb"><div class="tt">🗄️ players</div><div class="r h"><span>id</span><span>name</span><span>score</span></div>${rows.map(([id, n, s]) => `<div class="r ${o.hit?.includes(id) ? 'hit' : o.dim && o.hit ? 'dim' : ''} ${o.fresh === id ? 'new' : ''}"><span>${id}</span><span>${n}</span><span>${s}</span></div>`).join('')}</div></div>`;

export default kit({
  id: 'tilda-git-g05',
  title: "Как программы хранят данные: базы данных ¦ Dasturlar ma'lumotlarni qanday saqlaydi: ma'lumotlar bazalari ¦ How programs store data: databases",
  question: "Где хранятся ваши лайки, очки в игре и заказы? ¦ Layklaringiz, o'yindagi ochkolar va buyurtmalar qayerda saqlanadi? ¦ Where do your likes, game scores and orders live?",
  route: ["Таблица ¦ Jadval ¦ The table", "Команды ¦ Buyruqlar ¦ Commands", "В приложении ¦ Ilovada ¦ In an app", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🗄️',
      kicker: "Tilda · Git · общая тема 5 ¦ Tilda · Git · umumiy mavzu 5 ¦ Tilda · Git · general topic 5",
      title: "База данных — умная таблица ¦ Ma'lumotlar bazasi — aqlli jadval ¦ A database is a smart table",
      chat: "какие данные о вас хранит любимая игра? ¦ sevimli o'yiningiz siz haqingizda qanday ma'lumotlarni saqlaydi? ¦ what data does your favourite game keep about you?",
      lead: "Представьте таблицу: строки — игроки, столбцы — имя и очки. База данных хранит миллионы таких строк и за миг находит нужную, даже если её спрашивают тысячи людей сразу. ¦ Jadvalni tasavvur qiling: qatorlar — o'yinchilar, ustunlar — ism va ochkolar. Ma'lumotlar bazasi millionlab shunday qatorlarni saqlaydi va bir zumda keraklisini topadi, hatto minglab odamlar birdan so'rasa ham. ¦ Picture a table: rows are players, columns are name and score. A database holds millions of rows and finds the right one in a blink, even with thousands asking at once.",
      facts: ["Строка — одна запись ¦ Qator — bitta yozuv ¦ A row is one record", "Столбец — одно свойство ¦ Ustun — bitta xususiyat ¦ A column is one property", "Добавить, найти, изменить, удалить ¦ Qo'shish, topish, o'zgartirish, o'chirish ¦ Add, find, change, delete"],
      takeaway: "Открываем таблицу игроков. ¦ O'yinchilar jadvalini ochamiz. ¦ Let's open the players table.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Четыре главных действия ¦ To'rtta asosiy harakat ¦ The four main actions",
      chat: "кого добавим в таблицу? ¦ jadvalga kimni qo'shamiz? ¦ who shall we add to the table?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: 'SELECT * FROM players;', html: tb(BASE), say: "Показать всё: три игрока, у каждого id, имя и очки. ¦ Hammasini ko'rsatish: uchta o'yinchi, har birida id, ism va ochkolar. ¦ Show everything: three players, each with an id, name and score." },
        { code: "INSERT INTO players\nVALUES (4, 'Malika', 0);", line: 2, html: tb([...BASE, [4, 'Malika', 0]], { fresh: 4 }), say: "Добавить: новая строка — новый игрок. ¦ Qo'shish: yangi qator — yangi o'yinchi. ¦ Add: a new row means a new player." },
        { code: 'SELECT * FROM players\nWHERE score > 50;', line: 2, html: tb([...BASE, [4, 'Malika', 0]], { hit: [2, 3], dim: true }), say: "Найти: только те, у кого больше 50 очков. ¦ Topish: faqat 50 dan ko'p ochkosi borlar. ¦ Find: only players with more than 50 points." },
        { code: "UPDATE players\nSET score = 90\nWHERE name = 'Lola';", line: 2, html: tb([[1, 'Lola', 90], [2, 'Timur', 75], [3, 'Aziz', 62], [4, 'Malika', 0]], { hit: [1] }), say: "Изменить: Лола прошла уровень — теперь 90. ¦ O'zgartirish: Lola bosqichdan o'tdi — endi 90. ¦ Change: Lola beat a level — now 90." },
      ],
      takeaway: "Добавить, найти, изменить, удалить — так работает почти любое приложение. ¦ Qo'shish, topish, o'zgartirish, o'chirish — deyarli har qanday ilova shunday ishlaydi. ¦ Add, find, change, delete — almost every app works this way.",
      notes: { say: ["Это язык SQL — его можно не учить сейчас, важна идея."], min: 6 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Один лайк — путь в базу ¦ Bitta layk — bazaga yo'l ¦ One like's trip to the database",
      chat: "почему друг сразу видит ваш лайк? ¦ nega do'stingiz laykingizni darhol ko'radi? ¦ why does your friend see your like right away?",
      actors: [
        { id: 'me', icon: '📱', label: "Вы ¦ Siz ¦ You" },
        { id: 'srv', icon: '🖥️', label: "Сервер ¦ Server ¦ Server" },
        { id: 'db', icon: '🗄️', label: "База данных ¦ Ma'lumotlar bazasi ¦ Database" },
        { id: 'fr', icon: '📱', label: "Друг ¦ Do'st ¦ Friend" },
        { id: 'lk', text: "❤️ 41" },
      ],
      steps: [
        { say: "Вы нажали ❤️ под фото. ¦ Siz foto ostidagi ❤️ ni bosdingiz. ¦ You tap ❤️ under a photo.", at: { me: [10, 30, 1.2], srv: [40, 30], db: [72, 30, 1.2], fr: [10, 78, 1.2], lk: [72, 64] }, pulse: ['me'] },
        { say: "Приложение отправляет на сервер: «+1 лайк к фото 77». ¦ Ilova serverga yuboradi: «77-fotoga +1 layk». ¦ The app tells the server: “+1 like on photo 77”.", lines: [['me', 'srv', '+1 ❤️']] },
        { say: "Сервер меняет строку в базе: было 41, стало 42. ¦ Server bazadagi qatorni o'zgartiradi: 41 edi, 42 bo'ldi. ¦ The server updates the row: 41 becomes 42.", set: { lk: { text: "❤️ 42" } }, lines: [['me', 'srv', '+1 ❤️'], ['srv', 'db', 'UPDATE']], pulse: ['db', 'lk'] },
        { say: "Друг открывает фото — приложение спрашивает базу и показывает 42. ¦ Do'st fotoni ochadi — ilova bazadan so'raydi va 42 ni ko'rsatadi. ¦ Your friend opens the photo — the app asks the database and shows 42.", lines: [['fr', 'srv', 'SELECT'], ['srv', 'db']], pulse: ['fr'] },
      ],
      takeaway: "Все видят одно и то же, потому что данные лежат в одной базе. ¦ Hamma bir xil narsani ko'radi, chunki ma'lumotlar bitta bazada. ¦ Everyone sees the same thing because the data lives in one database.",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Строка или столбец? ¦ Qatormi yoki ustunmi? ¦ Row or column?",
      chat: "пишите: «1 — строка» ¦ yozing: «1 — qator» ¦ write: “1 — row”",
      zones: [
        { id: 'row', label: "Строка ¦ Qator ¦ Row", icon: '➡️' },
        { id: 'col', label: "Столбец ¦ Ustun ¦ Column", icon: '⬇️' },
      ],
      items: [
        { text: "Один игрок «Timur, 75» ¦ Bitta o'yinchi «Timur, 75» ¦ One player “Timur, 75”", zone: 'row' },
        { text: "«score» у всех игроков ¦ Barcha o'yinchilardagi «score» ¦ “score” for every player", zone: 'col' },
        { text: "Один заказ торта ¦ Bitta tort buyurtmasi ¦ One cake order", zone: 'row' },
        { text: "«Телефон» у всех клиентов ¦ Barcha mijozlardagi «Telefon» ¦ “Phone” for every client", zone: 'col' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "База данных — это почти как большая таблица ¦ Ma'lumotlar bazasi — deyarli katta jadvalga o'xshaydi ¦ A database is a lot like a big table", truth: true, explain: "Строки и столбцы, только умнее и быстрее. ¦ Qatorlar va ustunlar, faqat aqlliroq va tezroq. ¦ Rows and columns, just smarter and faster." },
        { text: "Пароли хранят открытым текстом ¦ Parollar ochiq matn sifatida saqlanadi ¦ Passwords are stored as plain text", truth: false, explain: "Нормальные сайты хранят их зашифрованными. ¦ Oddiy saytlar ularni shifrlangan holda saqlaydi. ¦ Proper sites store them scrambled (hashed)." },
        { text: "Одну базу могут использовать тысячи людей сразу ¦ Bitta bazadan birdan minglab odamlar foydalanishi mumkin ¦ Thousands can use one database at once", truth: true, explain: "Для этого базы и придумали. ¦ Bazalar aynan shuning uchun o'ylab topilgan. ¦ That's what they're built for." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: база для пекарни ¦ Missiya: novvoyxona uchun baza ¦ Mission: a bakery database",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Заказы не теряются! ¦ Buyurtmalar yo'qolmaydi! ¦ No order gets lost!",
      items: [
        { title: "Пришёл новый заказ ¦ Yangi buyurtma keldi ¦ A new order arrives", choices: ['INSERT', 'DELETE'], correct: 0, explain: "Добавляем строку. ¦ Qator qo'shamiz. ¦ Add a row." },
        { title: "Найти заказы на сегодня ¦ Bugungi buyurtmalarni topish ¦ Find today's orders", choices: ['SELECT … WHERE', 'UPDATE'], correct: 0, explain: "SELECT с условием. ¦ Shartli SELECT. ¦ SELECT with a condition." },
        { title: "Клиент сменил телефон ¦ Mijoz telefonini almashtirdi ¦ A client changed their phone", choices: ['UPDATE', 'INSERT'], correct: 0, explain: "Меняем существующую строку. ¦ Mavjud qatorni o'zgartiramiz. ¦ Change an existing row." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: базы данных ¦ Xulosa: ma'lumotlar bazalari ¦ Summary: databases",
      chat: "какую таблицу вы бы сделали для своего приложения? ¦ ilovangiz uchun qanday jadval yasagan bo'lardingiz? ¦ what table would you make for your app?",
      answer: "База данных похожа на умную таблицу: строка — одна запись (игрок, заказ), столбец — одно свойство (имя, очки). Четыре главных действия: добавить (INSERT), найти (SELECT), изменить (UPDATE) и удалить (DELETE). Приложение через сервер меняет строки в базе, поэтому все пользователи видят одни и те же данные, например одинаковое число лайков. ¦ Ma'lumotlar bazasi aqlli jadvalga o'xshaydi: qator — bitta yozuv (o'yinchi, buyurtma), ustun — bitta xususiyat (ism, ochkolar). To'rtta asosiy harakat: qo'shish (INSERT), topish (SELECT), o'zgartirish (UPDATE) va o'chirish (DELETE). Ilova server orqali bazadagi qatorlarni o'zgartiradi, shuning uchun barcha foydalanuvchilar bir xil ma'lumotlarni, masalan bir xil layklar sonini ko'radi. ¦ A database is like a smart table: a row is one record (player, order), a column is one property (name, score). Four main actions: add (INSERT), find (SELECT), change (UPDATE) and delete (DELETE). The app changes rows through a server, so every user sees the same data — like the same number of likes.",
      icon: '🗄️',
      badge: "Хранитель данных ¦ Ma'lumotlar qo'riqchisi ¦ Data keeper",
      badgeSub: "Tilda · Git · общая 5 ¦ Tilda · Git · umumiy 5 ¦ Tilda · Git · general 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Нарисуйте таблицу для своей коллекции (игры, книги, фильмы). ¦ Kolleksiyangiz uchun jadval chizing (o'yinlar, kitoblar, filmlar). ¦ Draw a table for your collection (games, books, films).",
        "Придумайте 2 вопроса к ней в стиле «найти всех, где…». ¦ Unga «… bo'lganlarning hammasini topish» uslubida 2 ta savol o'ylab toping. ¦ Write 2 “find all where…” questions for it.",
      ],
      takeaway: "Дальше: AI-инструменты для программиста. ¦ Keyingisi: dasturchi uchun AI vositalari. ¦ Next: AI tools for programmers.",
      notes: { min: 2 },
    },
  ],
});
