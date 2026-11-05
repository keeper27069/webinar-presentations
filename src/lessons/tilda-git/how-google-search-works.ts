import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.idx{width:500px;display:grid;gap:10px}
.w{display:grid;grid-template-columns:120px 1fr;align-items:center;gap:10px;padding:10px 14px;border-radius:14px;background:#fff;box-shadow:0 4px 14px #0001;font-size:18px}
.w b{font:800 18px JetBrains Mono,monospace}
.pg{display:flex;gap:6px}.pg span{padding:4px 10px;border-radius:8px;background:#eceef3;font-weight:800}
.pg span.hit{background:#0fb5a6;color:#fff}
.w.dim{opacity:.35}.res{padding:12px 16px;border-radius:14px;background:#e8faf7;color:#0f766e;font-weight:800;font-size:20px;opacity:0}
.show .res{opacity:1}`;
const idx = (o: { q?: string[]; hits?: number[]; show?: boolean }) => {
  const rows: [string, number[]][] = [['cake', [2, 5, 9]], ['tashkent', [1, 5, 7, 9]], ['football', [3, 4]], ['recipe', [2, 6]]];
  const q = o.q ?? [];
  return `<div class="wrap"><div class="idx ${o.show ? 'show' : ''}">${rows.map(([w, ps]) => `<div class="w ${q.length && !q.includes(w) ? 'dim' : ''}"><b>${w}</b><div class="pg">${ps.map((p) => `<span class="${o.hits?.includes(p) && q.includes(w) ? 'hit' : ''}">p${p}</span>`).join('')}</div></div>`).join('')}<div class="res">✓ p5, p9 — both words</div></div></div>`;
};

export default kit({
  id: 'tilda-git-g04',
  title: "Как Google за секунду находит ответ ¦ Google bir soniyada javobni qanday topadi ¦ How Google finds an answer in a second",
  question: "Как можно найти нужное среди миллиардов страниц быстрее, чем вы моргнёте? ¦ Milliardlab sahifalar orasidan keraklisini ko'z ochib-yumguncha qanday topish mumkin? ¦ How can you find something among billions of pages faster than a blink?",
  route: ["Указатель ¦ Ko'rsatkich ¦ The index", "Поиск слов ¦ So'z qidirish ¦ Word lookup", "Порядок ¦ Tartib ¦ Ranking", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔎',
      kicker: "Tilda · Git · общая тема 4 ¦ Tilda · Git · umumiy mavzu 4 ¦ Tilda · Git · general topic 4",
      title: "Google не читает интернет в момент поиска ¦ Google qidirish paytida internetni o'qimaydi ¦ Google doesn't read the web when you search",
      chat: "как вы ищете слово в толстой книге? ¦ qalin kitobda so'zni qanday qidirasiz? ¦ how do you find a word in a thick book?",
      lead: "Секрет — указатель, как в конце учебника: для каждого слова заранее записано, на каких страницах оно есть. Google строит такой указатель для всего интернета. ¦ Siri — darslik oxiridagi kabi ko'rsatkich: har bir so'z uchun u qaysi sahifalarda borligi oldindan yozilgan. Google butun internet uchun shunday ko'rsatkich quradi. ¦ The secret is an index, like the one at the back of a textbook: for each word, the pages it appears on are listed in advance. Google builds one for the whole web.",
      facts: ["Робот заранее читает страницы ¦ Robot sahifalarni oldindan o'qiydi ¦ A robot reads pages in advance", "Слово → список страниц ¦ So'z → sahifalar ro'yxati ¦ Word → list of pages", "Лучшие — наверх ¦ Eng yaxshilari — yuqoriga ¦ Best ones go on top"],
      takeaway: "Посмотрим, как работает такой указатель. ¦ Bunday ko'rsatkich qanday ishlashini ko'ramiz. ¦ Let's see how such an index works.",
      notes: { min: 3 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Ищем по указателю ¦ Ko'rsatkich bo'yicha qidiramiz ¦ Searching the index",
      chat: "на каких страницах есть оба слова? ¦ qaysi sahifalarda ikkala so'z bor? ¦ which pages have both words?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: 'index:\n  word → pages', html: idx({}), say: "Указатель: у каждого слова — номера страниц, где оно встречается. ¦ Ko'rsatkich: har bir so'zning u uchraydigan sahifalar raqamlari bor. ¦ The index: every word lists the pages where it appears." },
        { code: 'search: "cake"', line: 1, html: idx({ q: ['cake'], hits: [2, 5, 9] }), say: "Ищем «cake» — сразу видим страницы 2, 5, 9. Читать весь интернет не нужно! ¦ «cake»ni qidiramiz — darhol 2, 5, 9 sahifalarni ko'ramiz. Butun internetni o'qish shart emas! ¦ Search “cake” and pages 2, 5, 9 appear at once — no need to read the whole web!" },
        { code: 'search: "cake tashkent"', line: 1, html: idx({ q: ['cake', 'tashkent'], hits: [5, 9] }), say: "Два слова — берём страницы, где есть оба: 5 и 9. ¦ Ikki so'z — ikkalasi bor sahifalarni olamiz: 5 va 9. ¦ Two words: take the pages that have both — 5 and 9." },
        { code: 'result → p5, p9', line: 1, html: idx({ q: ['cake', 'tashkent'], hits: [5, 9], show: true }), say: "Готово за доли секунды. ¦ Soniyaning bir qismida tayyor. ¦ Done in a fraction of a second." },
      ],
      takeaway: "Указатель построен заранее — поэтому поиск мгновенный. ¦ Ko'rsatkich oldindan qurilgan — shuning uchun qidiruv bir zumda. ¦ The index is built in advance, so search is instant.",
      notes: { min: 5 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Какую страницу показать первой ¦ Qaysi sahifani birinchi ko'rsatish kerak ¦ Which page goes first",
      chat: "что важнее: свежесть или полезность? ¦ nima muhimroq: yangilikmi yoki foydalilikmi? ¦ what matters more: freshness or usefulness?",
      actors: [
        { id: 'p5', icon: '📄', label: "стр. 5 ¦ 5-sahifa ¦ page 5" },
        { id: 'p9', icon: '📄', label: "стр. 9 ¦ 9-sahifa ¦ page 9" },
        { id: 'a', text: "🔗 много ссылок ¦ 🔗 ko'p havola ¦ 🔗 many links" },
        { id: 'b', text: "📱 удобно на телефоне ¦ 📱 telefonda qulay ¦ 📱 phone-friendly" },
        { id: 'c', text: "🐢 грузится долго ¦ 🐢 uzoq yuklanadi ¦ 🐢 loads slowly" },
      ],
      steps: [
        { say: "Подошли две страницы. Кого поставить первой? ¦ Ikki sahifa mos keldi. Qaysi birini birinchi qo'yish kerak? ¦ Two pages match. Which goes first?", at: { p5: [30, 50, 1.2], p9: [70, 50, 1.2] } },
        { say: "На страницу 9 ссылаются многие сайты, и она удобна на телефоне. ¦ 9-sahifaga ko'p saytlar havola beradi va u telefonda qulay. ¦ Many sites link to page 9, and it works well on phones.", at: { a: [70, 16], b: [70, 84] }, pulse: ['p9'] },
        { say: "Страница 5 грузится долго. ¦ 5-sahifa uzoq yuklanadi. ¦ Page 5 loads slowly.", at: { c: [30, 84] }, pulse: ['c'] },
        { say: "Итог: 9 — первая, 5 — ниже. Google оценивает сотни таких признаков. ¦ Natija: 9 — birinchi, 5 — pastroqda. Google yuzlab shunday belgilarni baholaydi. ¦ Result: 9 first, 5 lower. Google weighs hundreds of signals like these.", at: { p9: [50, 22, 1.3], p5: [50, 62, 0.9], a: [86, 22], b: [14, 22], c: [86, 62] }, set: { p9: { label: "№ 1" }, p5: { label: "№ 2" } } },
      ],
      takeaway: "Найти — указатель. Упорядочить — оценка полезности. ¦ Topish — ko'rsatkich. Tartiblash — foydalilik bahosi. ¦ Finding uses the index; ordering uses usefulness scores.",
      notes: { min: 4 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Путь запроса за 0,3 секунды ¦ 0,3 soniyada so'rov yo'li ¦ A query's trip in 0.3 seconds",
      chat: "как думаете, где стоят компьютеры Google? ¦ sizningcha, Google kompyuterlari qayerda turadi? ¦ where do you think Google's computers are?",
      actors: [
        { id: 'me', icon: '📱', label: "«торт Ташкент» ¦ «tort Toshkent» ¦ “cake Tashkent”" },
        { id: 'dc', icon: '🏢', label: "Дата-центр ¦ Ma'lumotlar markazi ¦ Data centre" },
        { id: 'ix', icon: '📚', label: "Указатель ¦ Ko'rsatkich ¦ Index" },
        { id: 'rk', icon: '🏆', label: "Оценка ¦ Baholash ¦ Ranking" },
        { id: 'res', text: "10 ответов ⚡ 0,3 с ¦ 10 ta javob ⚡ 0,3 s ¦ 10 results ⚡ 0.3 s" },
      ],
      steps: [
        { say: "Вы набрали запрос — он летит в ближайший дата-центр. ¦ So'rov yozdingiz — u eng yaqin ma'lumotlar markaziga uchadi. ¦ You type a query and it flies to the nearest data centre.", at: { me: [10, 50, 1.2], dc: [36, 50] }, lines: [['me', 'dc']] },
        { say: "Тысячи компьютеров одновременно смотрят в свои куски указателя. ¦ Minglab kompyuterlar bir vaqtda ko'rsatkichning o'z qismlariga qaraydi. ¦ Thousands of computers search their slices of the index at once.", at: { ix: [62, 26] }, lines: [['me', 'dc'], ['dc', 'ix']], pulse: ['ix'] },
        { say: "Найденное сортируют по полезности… ¦ Topilganlar foydaliligi bo'yicha saralanadi… ¦ Results are sorted by usefulness…", at: { rk: [62, 74] }, lines: [['me', 'dc'], ['dc', 'ix'], ['ix', 'rk']] },
        { say: "…и ответ уже у вас. Меньше чем за секунду! ¦ …va javob allaqachon sizda. Bir soniyadan kamroqda! ¦ …and the answer is back. In under a second!", at: { res: [86, 50] }, lines: [['me', 'dc'], ['dc', 'ix'], ['ix', 'rk'], ['rk', 'res']], pulse: ['res'] },
      ],
      takeaway: "Скорость = указатель заранее + тысячи компьютеров сразу. ¦ Tezlik = oldindan ko'rsatkich + birdan minglab kompyuterlar. ¦ Speed = a ready index + thousands of computers at once.",
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "При каждом поиске Google читает весь интернет ¦ Har bir qidiruvda Google butun internetni o'qiydi ¦ Google reads the whole web on every search", truth: false, explain: "Он смотрит в готовый указатель. ¦ U tayyor ko'rsatkichga qaraydi. ¦ It looks in a ready index." },
        { text: "Новую страницу Google находит не сразу ¦ Google yangi sahifani darhol topmaydi ¦ Google doesn't find new pages instantly", truth: true, explain: "Робот должен до неё дойти. ¦ Robot unga yetib borishi kerak. ¦ The robot has to reach it first." },
        { text: "Первая строчка всегда самая правдивая ¦ Birinchi qator doim eng to'g'ri ¦ The top result is always the most truthful", truth: false, explain: "Проверяйте источник. ¦ Manbani tekshiring. ¦ Check the source." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: инженер поиска ¦ Missiya: qidiruv muhandisi ¦ Mission: search engineer",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Поиск быстрый и точный! ¦ Qidiruv tez va aniq! ¦ Search is fast and accurate!",
      items: [
        { title: "«cake» на стр. 2, 5, 9; «tashkent» на 1, 5, 7, 9. Где оба? ¦ «cake» 2, 5, 9 da; «tashkent» 1, 5, 7, 9 da. Ikkalasi qayerda? ¦ “cake” on 2, 5, 9; “tashkent” on 1, 5, 7, 9. Where are both?", choices: ['5 и 9 ¦ 5 va 9 ¦ 5 and 9', '1 и 2 ¦ 1 va 2 ¦ 1 and 2'], correct: 0, explain: "Общие номера. ¦ Umumiy raqamlar. ¦ The shared numbers." },
        { title: "Почему поиск мгновенный? ¦ Nega qidiruv bir zumda? ¦ Why is search instant?", choices: ["Указатель построен заранее ¦ Ko'rsatkich oldindan qurilgan ¦ The index is built in advance", "Google угадывает ¦ Google taxmin qiladi ¦ Google guesses"], correct: 0, explain: "Работа сделана до вашего вопроса. ¦ Ish savolingizdan oldin qilingan. ¦ The work is done before you ask." },
        { title: "Что поднимает страницу выше? ¦ Sahifani nima yuqoriga ko'taradi? ¦ What ranks a page higher?", choices: ["Полезность и удобство ¦ Foydalilik va qulaylik ¦ Usefulness and ease of use", "Длинное название ¦ Uzun nom ¦ A long title"], correct: 0, explain: "Google ищет лучшее для людей. ¦ Google odamlar uchun eng yaxshisini qidiradi. ¦ Google looks for what's best for people." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: как работает поиск ¦ Xulosa: qidiruv qanday ishlaydi ¦ Summary: how search works",
      chat: "какой запрос вы бы сейчас загуглили? ¦ hozir qaysi so'rovni Google'da qidirgan bo'lardingiz? ¦ what would you google right now?",
      answer: "Google не читает интернет в момент поиска. Его робот заранее читает страницы и строит указатель: для каждого слова — список страниц. На запрос из нескольких слов берутся страницы, где есть все слова, а потом они сортируются по полезности: ссылки, скорость, удобство на телефоне. Тысячи компьютеров в дата-центрах работают одновременно, поэтому ответ приходит меньше чем за секунду. ¦ Google qidirish paytida internetni o'qimaydi. Uning roboti sahifalarni oldindan o'qiydi va ko'rsatkich quradi: har bir so'z uchun — sahifalar ro'yxati. Bir necha so'zli so'rovda barcha so'zlar bor sahifalar olinadi, keyin ular foydaliligi bo'yicha saralanadi: havolalar, tezlik, telefonda qulaylik. Ma'lumotlar markazlaridagi minglab kompyuterlar bir vaqtda ishlaydi, shuning uchun javob bir soniyadan kamroqda keladi. ¦ Google doesn't read the web when you search. Its robot reads pages in advance and builds an index: for each word, a list of pages. For a multi-word query it takes the pages containing every word, then sorts them by usefulness — links, speed, phone-friendliness. Thousands of computers in data centres work at once, so the answer arrives in under a second.",
      icon: '🔎',
      badge: "Знаток поиска ¦ Qidiruv bilimdoni ¦ Search expert",
      badgeSub: "Tilda · Git · общая 4 ¦ Tilda · Git · umumiy 4 ¦ Tilda · Git · general 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте указатель для 3 страниц своей тетради: слово → страницы. ¦ Daftaringizning 3 sahifasi uchun ko'rsatkich yasang: so'z → sahifalar. ¦ Build an index for 3 pages of your notebook: word → pages.",
        "Сравните результаты запроса из 1 слова и из 3 слов. ¦ 1 so'zli va 3 so'zli so'rov natijalarini solishtiring. ¦ Compare results for a 1-word and a 3-word query.",
      ],
      takeaway: "Дальше: как программы хранят данные. ¦ Keyingisi: dasturlar ma'lumotlarni qanday saqlaydi. ¦ Next: how programs store data.",
      notes: { min: 2 },
    },
  ],
});
