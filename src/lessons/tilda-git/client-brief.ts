import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.doc{width:470px;padding:24px;border-radius:18px;background:#fff;box-shadow:0 10px 30px #0001}
.doc h3{margin:0 0 12px;font-size:24px}
.row{display:grid;grid-template-columns:120px 1fr;gap:10px;padding:10px 0;border-top:2px solid #eceef3;font-size:18px}
.row b{color:#6b7183}.row span{color:#c3c7d2}
.row.on span{color:#16181f;font-weight:700}`;
const ROWS: [string, string][] = [['Goal', 'Get cake orders online'], ['For whom', 'Mums with kids, Tashkent'], ['Pages', 'Home, Menu, Order form'], ['Deadline', '2 weeks'], ['Done when', 'Order form sends to Telegram']];
const doc = (n: number) => `<div class="wrap"><div class="doc"><h3>📋 Task: “Shirin Tort” site</h3>${ROWS.map(([k, v], i) => `<div class="row ${i < n ? 'on' : ''}"><b>${k}</b><span>${i < n ? v : '…'}</span></div>`).join('')}</div></div>`;

export default kit({
  id: 'tilda-git-g01',
  title: "Разбор заказа: слова клиента → понятная задача ¦ Buyurtma tahlili: mijoz so'zlari → tushunarli vazifa ¦ Breaking down an order: client words → a clear task",
  question: "Как превратить «сделайте красиво и недорого» в задачу, которую можно выполнить? ¦ «Chiroyli va arzon qiling»ni bajarsa bo'ladigan vazifaga qanday aylantirish mumkin? ¦ How do you turn “make it nice and cheap” into a task you can actually do?",
  route: ["Слова ¦ So'zlar ¦ Words", "Вопросы ¦ Savollar ¦ Questions", "Задача ¦ Vazifa ¦ The task", "Проверка ¦ Tekshiruv ¦ Check", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '📋',
      kicker: "Tilda · Git · общая тема 1 ¦ Tilda · Git · umumiy mavzu 1 ¦ Tilda · Git · general topic 1",
      title: "Клиент говорит одно, а имеет в виду другое ¦ Mijoz bir narsani aytadi, boshqasini nazarda tutadi ¦ Clients say one thing and mean another",
      chat: "что значит «сделайте современно»? ¦ «zamonaviy qiling» nimani anglatadi? ¦ what does “make it modern” mean?",
      lead: "«Современно», «быстро», «недорого» — у каждого свой смысл. Наша работа — задать вопросы и записать задачу так, чтобы её понял любой. ¦ «Zamonaviy», «tez», «arzon» — har kimda o'z ma'nosi bor. Bizning ishimiz — savollar berish va vazifani har kim tushunadigan qilib yozish. ¦ “Modern”, “fast”, “cheap” mean different things to everyone. Our job is to ask questions and write the task so anyone understands it.",
      facts: ["Цель — зачем сайт ¦ Maqsad — sayt nima uchun ¦ Goal: why the site", "Для кого ¦ Kim uchun ¦ For whom", "Когда «готово» ¦ Qachon «tayyor» ¦ When it's “done”"],
      takeaway: "Смотрим, как туманные слова превращаются в пункты. ¦ Noaniq so'zlar bandlarga qanday aylanishini ko'ramiz. ¦ Watch fuzzy words turn into clear points.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 0,
      title: "Туман → чёткие пункты ¦ Tuman → aniq bandlar ¦ Fog → clear points",
      chat: "какой вопрос задали бы про «быстро»? ¦ «tez» haqida qanday savol bergan bo'lardingiz? ¦ what would you ask about “fast”?",
      actors: [
        { id: 'cl', icon: '🤵', label: "Клиент ¦ Mijoz ¦ Client" },
        { id: 'a', text: "«современно» ¦ «zamonaviy» ¦ “modern”" },
        { id: 'b', text: "«быстро» ¦ «tez» ¦ “fast”" },
        { id: 'c', text: "«недорого» ¦ «arzon» ¦ “cheap”" },
        { id: 'q', icon: '❓', label: "Ваши вопросы ¦ Savollaringiz ¦ Your questions" },
      ],
      steps: [
        { say: "Клиент описывает сайт тремя туманными словами. ¦ Mijoz saytni uchta noaniq so'z bilan tasvirlaydi. ¦ The client describes the site in three fuzzy words.", at: { cl: [10, 50, 1.2], a: [42, 20], b: [42, 50], c: [42, 80] } },
        { say: "Задаём вопрос к каждому слову… ¦ Har bir so'zga savol beramiz… ¦ We ask about each word…", at: { q: [64, 50] }, lines: [['a', 'q'], ['b', 'q'], ['c', 'q']], pulse: ['q'] },
        { say: "«Современно» → «как у этих 2 сайтов-примеров». ¦ «Zamonaviy» → «mana shu 2 ta misol saytdagidek». ¦ “Modern” → “like these 2 example sites”.", at: { a: [86, 20] }, set: { a: { text: "как эти 2 примера ¦ shu 2 misoldek ¦ like these 2 examples" } }, lines: [['q', 'a']] },
        { say: "«Быстро» → «за 2 недели». «Недорого» → «3 страницы». ¦ «Tez» → «2 haftada». «Arzon» → «3 sahifa». ¦ “Fast” → “in 2 weeks”. “Cheap” → “3 pages”.", at: { b: [86, 50], c: [86, 80] }, set: { b: { text: "за 2 недели ¦ 2 haftada ¦ in 2 weeks" }, c: { text: "3 страницы ¦ 3 sahifa ¦ 3 pages" } }, lines: [['q', 'a'], ['q', 'b'], ['q', 'c']], pulse: ['a', 'b', 'c'] },
      ],
      takeaway: "Туманное слово + вопрос = число, пример или список. ¦ Noaniq so'z + savol = raqam, misol yoki ro'yxat. ¦ Fuzzy word + question = a number, example or list.",
      notes: { min: 4 },
    },
    {
      type: 'dialog',
      stage: 1,
      title: "Разговор с кондитерской ¦ Qandolatxona bilan suhbat ¦ Talking to the cake shop",
      chat: "какой вопрос вы бы добавили? ¦ qaysi savolni qo'shgan bo'lardingiz? ¦ which question would you add?",
      a: { name: "Клиент ¦ Mijoz ¦ Client", icon: '🧁' },
      b: { name: "Вы ¦ Siz ¦ You", icon: '🧑‍💻' },
      messages: [
        { from: 'a', text: "Нужен сайт для тортов, хороший. ¦ Tortlar uchun sayt kerak, yaxshisi. ¦ We need a good site for cakes." },
        { from: 'b', text: "Что человек должен сделать на сайте? ¦ Odam saytda nima qilishi kerak? ¦ What should visitors do on the site?", good: "Цель ¦ Maqsad ¦ Goal" },
        { from: 'a', text: "Заказать торт, не звоня нам. ¦ Bizga qo'ng'iroq qilmasdan tort buyurtma qilsin. ¦ Order a cake without calling us." },
        { from: 'b', text: "Кто ваши покупатели? ¦ Xaridorlaringiz kim? ¦ Who are your customers?", good: "Для кого ¦ Kim uchun ¦ Audience" },
        { from: 'b', text: "Куда должны приходить заказы? ¦ Buyurtmalar qayerga kelishi kerak? ¦ Where should orders arrive?", good: "Когда «готово» ¦ Qachon «tayyor» ¦ Done when" },
        { from: 'a', text: "Нам в Telegram! ¦ Bizga Telegram'ga! ¦ To our Telegram!" },
      ],
      takeaway: "Каждый ответ клиента — строчка в задаче. ¦ Mijozning har bir javobi — vazifadagi bir qator. ¦ Every client answer becomes a line in the task.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 2,
      title: "Задача заполняется ¦ Vazifa to'ldirilmoqda ¦ The task fills in",
      chat: "какой пункт самый важный? ¦ qaysi band eng muhim? ¦ which line matters most?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: 'Goal: ?', html: doc(0), say: "Пустой бланк задачи. ¦ Bo'sh vazifa blanki. ¦ An empty task sheet." },
        { code: 'Goal: get cake orders online\nFor whom: mums with kids', line: 2, html: doc(2), say: "Цель и для кого — уже понятно, что строим. ¦ Maqsad va kim uchun — nima qurayotganimiz tushunarli. ¦ Goal and audience: now we know what we're building." },
        { code: 'Pages: Home, Menu, Order form\nDeadline: 2 weeks', line: 1, html: doc(4), say: "Страницы и срок — понятно, сколько работы. ¦ Sahifalar va muddat — qancha ish borligi tushunarli. ¦ Pages and deadline: we know how much work." },
        { code: 'Done when: the order form\n  sends to Telegram', line: 1, html: doc(5), say: "«Готово, когда…» — и никто не спорит в конце. ¦ «Tayyor, qachonki…» — va oxirida hech kim bahslashmaydi. ¦ “Done when…” — so nobody argues at the end." },
      ],
      takeaway: "Цель + для кого + страницы + срок + «готово, когда». ¦ Maqsad + kim uchun + sahifalar + muddat + «tayyor, qachonki». ¦ Goal + audience + pages + deadline + “done when”.",
      notes: { min: 5 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Понятно или туманно? ¦ Tushunarlimi yoki noaniqmi? ¦ Clear or fuzzy?",
      chat: "пишите: «1 — туманно» ¦ yozing: «1 — noaniq» ¦ write: “1 — fuzzy”",
      zones: [
        { id: 'ok', label: "Понятно ¦ Tushunarli ¦ Clear", icon: '✅' },
        { id: 'fog', label: "Туманно ¦ Noaniq ¦ Fuzzy", icon: '🌫️' },
      ],
      items: [
        { text: "«Сделайте покрасивее» ¦ «Chiroyliroq qiling» ¦ “Make it prettier”", zone: 'fog' },
        { text: "«Кнопка заказа на каждой странице» ¦ «Har sahifada buyurtma tugmasi» ¦ “An order button on every page”", zone: 'ok' },
        { text: "«Как-нибудь побыстрее» ¦ «Qandaydir tezroq» ¦ “Sort of quickly”", zone: 'fog' },
        { text: "«Готово к 15 декабря» ¦ «15 dekabrgacha tayyor» ¦ “Ready by 15 December”", zone: 'ok' },
      ],
      notes: { min: 3 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Задачу лучше записать и отправить клиенту ¦ Vazifani yozib, mijozga yuborgan ma'qul ¦ Write the task down and send it to the client", truth: true, explain: "Он подтвердит — и никаких сюрпризов. ¦ U tasdiqlaydi — va hech qanday kutilmagan hol bo'lmaydi. ¦ They confirm it — no surprises." },
        { text: "Вопросы раздражают клиента ¦ Savollar mijozni jahlantiradi ¦ Questions annoy clients", truth: false, explain: "Клиенту приятно, когда его понимают. ¦ Mijozga uni tushunishganda yoqadi. ¦ Clients like being understood." },
        { text: "«Готово, когда…» помогает не спорить ¦ «Tayyor, qachonki…» bahslashmaslikka yordam beradi ¦ “Done when…” prevents arguments", truth: true, explain: "Понятно, что проверять в конце. ¦ Oxirida nimani tekshirish tushunarli. ¦ You know what to check at the end." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: перевести клиента ¦ Missiya: mijozni tarjima qilish ¦ Mission: translate the client",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Задача понятна всем! ¦ Vazifa hammaga tushunarli! ¦ Everyone understands the task!",
      items: [
        { title: "Клиент: «быстро» ¦ Mijoz: «tez» ¦ Client: “fast”", choices: ["«К какой дате?» ¦ «Qaysi sanagacha?» ¦ “By what date?”", "«Хорошо!» ¦ «Yaxshi!» ¦ “OK!”"], correct: 0, explain: "Нужна дата. ¦ Sana kerak. ¦ You need a date." },
        { title: "Клиент: «современно» ¦ Mijoz: «zamonaviy» ¦ Client: “modern”", choices: ["Попросить примеры сайтов ¦ Sayt misollarini so'rash ¦ Ask for example sites", "Сделать на свой вкус ¦ O'z didingizga ko'ra qilish ¦ Do it your way"], correct: 0, explain: "Примеры лучше слов. ¦ Misollar so'zlardan yaxshiroq. ¦ Examples beat words." },
        { title: "Что делать с записанной задачей? ¦ Yozilgan vazifa bilan nima qilish kerak? ¦ What to do with the written task?", choices: ["Отправить клиенту на подтверждение ¦ Mijozga tasdiqlash uchun yuborish ¦ Send it to the client to confirm", "Спрятать ¦ Yashirish ¦ Hide it"], correct: 0, explain: "Подтверждение = общее понимание. ¦ Tasdiq = umumiy tushunish. ¦ Confirmation = shared understanding." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: разбор заказа ¦ Xulosa: buyurtma tahlili ¦ Summary: breaking down an order",
      chat: "разберите заказ: «хочу сайт для своей футбольной команды» ¦ buyurtmani tahlil qiling: «futbol jamoam uchun sayt xohlayman» ¦ break down: “I want a site for my football team”",
      answer: "Слова клиента вроде «современно», «быстро», «недорого» туманные. Задаём вопросы и превращаем каждое в число, пример или список. Записываем задачу: цель, для кого, страницы, срок и «готово, когда…» — и отправляем клиенту на подтверждение. Так никто не спорит в конце. ¦ «Zamonaviy», «tez», «arzon» kabi mijoz so'zlari noaniq. Savollar beramiz va har birini raqam, misol yoki ro'yxatga aylantiramiz. Vazifani yozamiz: maqsad, kim uchun, sahifalar, muddat va «tayyor, qachonki…» — va mijozga tasdiqlash uchun yuboramiz. Shunda oxirida hech kim bahslashmaydi. ¦ Client words like “modern”, “fast” and “cheap” are fuzzy. Ask questions and turn each into a number, example or list. Write the task: goal, audience, pages, deadline and “done when…”, then send it for confirmation. That way nobody argues at the end.",
      icon: '📋',
      badge: "Переводчик с клиентского ¦ Mijoz tilidan tarjimon ¦ Client translator",
      badgeSub: "Tilda · Git · общая 1 ¦ Tilda · Git · umumiy 1 ¦ Tilda · Git · general 1",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Возьмите у знакомого «заказ» и заполните 5 пунктов задачи. ¦ Tanishingizdan «buyurtma» oling va vazifaning 5 bandini to'ldiring. ¦ Get an “order” from someone you know and fill in the 5 task lines.",
        "Придумайте 5 вопросов для первого клиента. ¦ Birinchi mijoz uchun 5 ta savol o'ylab toping. ¦ Write 5 questions for your first client.",
      ],
      takeaway: "Дальше: как устроены игры. ¦ Keyingisi: o'yinlar qanday tuzilgan. ¦ Next: how games are made.",
      notes: { min: 2 },
    },
  ],
});
