import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%}
.cafe{width:480px;padding:34px;text-align:center;font-family:Manrope,system-ui;background:#fff;border-radius:6px;border:2px solid #ddd}
.cafe .e{font-size:70px}.cafe h1{margin:6px 0;font-size:34px}.cafe p{margin:0 0 18px;color:#666}
.cafe span{display:inline-block;padding:12px 28px;background:#333;color:#fff;font-weight:800}
.strict{background:#111;border-color:#111;border-radius:0}.strict h1{color:#fff;letter-spacing:4px;text-transform:uppercase;font-size:28px}.strict p{color:#999}.strict span{background:#fff;color:#111}
.fun{background:#fff3b0;border:4px solid #16181f;border-radius:30px;box-shadow:10px 10px 0 #16181f}.fun h1{color:#f2573a;font-size:40px}.fun p{color:#16181f}.fun span{background:#3d7bff;border-radius:999px;border:3px solid #16181f}
.soft{background:linear-gradient(160deg,#ffe4ec,#f1e8ff);border-color:transparent;border-radius:40px}.soft h1{color:#9b4d7a;font-weight:500}.soft p{color:#a07a92}.soft span{background:#e7a3c3;border-radius:20px}`;
const cafe = (cls: string) => `<div class="wrap"><div class="cafe ${cls}"><div class="e">☕</div><h1>Cafe “Bulut”</h1><p>Coffee & cakes</p><span>Menu</span></div></div>`;

export default kit({
  id: 'css-g05',
  title: "Клиент просит «красивый сайт» ¦ Mijoz «chiroyli sayt» so'raydi ¦ The client wants “a beautiful site”",
  question: "Что делать, если клиент сам не знает, чего хочет? ¦ Mijoz o'zi nima xohlashini bilmasa, nima qilish kerak? ¦ What do you do when the client doesn't know what they want?",
  route: ["Задача ¦ Vazifa ¦ The task", "«Красиво» ¦ «Chiroyli» ¦ “Beautiful”", "Вопросы ¦ Savollar ¦ Questions", "Практика ¦ Amaliyot ¦ Practice", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '✨',
      kicker: "CSS · общая тема 5 ¦ CSS · umumiy mavzu 5 ¦ CSS · general topic 5",
      title: "«Сделай красиво» — это не задание ¦ «Chiroyli qil» — bu vazifa emas ¦ “Make it pretty” isn't a brief",
      chat: "что для вас «красивый сайт»? одним словом ¦ siz uchun «chiroyli sayt» nima? bir so'z bilan ¦ what's a “beautiful site” to you? one word",
      lead: "Для одного красиво — ярко и весело, для другого — строго и чёрно-белое. Профессионал не угадывает, а задаёт вопросы и показывает варианты. ¦ Biri uchun chiroyli — yorqin va quvnoq, boshqasi uchun — qat'iy va oq-qora. Professional taxmin qilmaydi, savol beradi va variantlar ko'rsatadi. ¦ For one person beautiful means bright and fun; for another, strict black and white. A pro doesn't guess — they ask and show options.",
      facts: ["«Красиво» у всех разное ¦ «Chiroyli» hammada har xil ¦ “Beautiful” means different things", "Правильные вопросы экономят недели ¦ To'g'ri savollar haftalarni tejaydi ¦ Good questions save weeks", "Покажите 2–3 варианта ¦ 2–3 ta variant ko'rsating ¦ Show 2–3 options"],
      takeaway: "Сначала посмотрим, как звучит такой заказ. ¦ Avval bunday buyurtma qanday eshitilishini ko'ramiz. ¦ First, let's hear what such an order sounds like.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Одно слово — много смыслов ¦ Bitta so'z — ko'p ma'no ¦ One word, many meanings",
      chat: "какой вариант выбрали бы вы? ¦ siz qaysi variantni tanlagan bo'lardingiz? ¦ which option would you choose?",
      actors: [
        { id: 'cl', icon: '🤵', label: "Клиент ¦ Mijoz ¦ Client" },
        { id: 'w', text: "Хочу красиво! ¦ Chiroyli bo'lsin! ¦ Make it pretty!" },
        { id: 'a', icon: '🌸', label: "Нежно ¦ Nozik ¦ Soft" },
        { id: 'b', icon: '⚡', label: "Ярко ¦ Yorqin ¦ Bright" },
        { id: 'c', icon: '🖤', label: "Строго ¦ Qat'iy ¦ Strict" },
        { id: 'd', icon: '🎈', label: "Весело ¦ Quvnoq ¦ Fun" },
        { id: 'me', icon: '🧑‍💻', label: "Вы ¦ Siz ¦ You" },
      ],
      steps: [
        { say: "Клиент говорит: «Хочу красиво!» ¦ Mijoz aytadi: «Chiroyli bo'lsin!» ¦ The client says: “Make it pretty!”", at: { cl: [16, 50, 1.2], w: [16, 22] } },
        { say: "Но «красиво» может значить что угодно… ¦ Lekin «chiroyli» har narsani anglatishi mumkin… ¦ But “pretty” could mean anything…", at: { a: [50, 20], b: [70, 38], c: [70, 66], d: [50, 84] }, lines: [['cl', 'a'], ['cl', 'b'], ['cl', 'c'], ['cl', 'd']] },
        { say: "Если угадывать — шанс промахнуться 3 из 4. ¦ Taxmin qilsak — adashish ehtimoli 4 dan 3. ¦ If you guess, you'll miss 3 times out of 4.", at: { me: [90, 50] }, set: { me: { icon: '😰' } }, pulse: ['a', 'b', 'c', 'd'] },
        { say: "Задаём вопросы: «Для кого кафе? Какое настроение?» ¦ Savollar beramiz: «Kafe kim uchun? Qanday kayfiyat?» ¦ Ask questions: “Who is the cafe for? What mood?”", hide: ['b', 'c', 'd'], at: { a: [50, 50, 1.4], me: [84, 50] }, set: { me: { icon: '🙂' }, w: { text: "Для мам с детьми ¦ Bolali onalar uchun ¦ For mums with kids" } }, lines: [['cl', 'a'], ['me', 'a', "✓"]] },
      ],
      takeaway: "Вопросы превращают «красиво» в понятное задание. ¦ Savollar «chiroyli»ni tushunarli vazifaga aylantiradi. ¦ Questions turn “pretty” into a clear task.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 1,
      title: "Одно кафе — три настроения ¦ Bitta kafe — uch kayfiyat ¦ One cafe, three moods",
      chat: "какой стиль подойдёт кафе для детей? ¦ bolalar kafesiga qaysi uslub mos keladi? ¦ which style suits a kids' cafe?",
      lang: 'css',
      css: CSS,
      steps: [
        { code: '.cafe {\n  /* ? */\n}', html: cafe(''), say: "Один и тот же HTML. ¦ Bitta va o'sha HTML. ¦ The same HTML." },
        { code: '.cafe.strict {\n  background: black;\n  text-transform: uppercase;\n}', line: 2, html: cafe('strict'), say: "Строго: чёрный фон, заглавные буквы. Для дорогого ресторана. ¦ Qat'iy: qora fon, bosh harflar. Qimmat restoran uchun. ¦ Strict: black background, capitals. For a fancy restaurant." },
        { code: '.cafe.fun {\n  background: yellow;\n  border: 4px solid;\n  border-radius: 30px;\n}', line: 2, html: cafe('fun'), say: "Весело: жёлтый, толстые рамки, круглые кнопки. Для детей! ¦ Quvnoq: sariq, qalin ramkalar, dumaloq tugmalar. Bolalar uchun! ¦ Fun: yellow, thick outlines, round buttons. For kids!" },
        { code: '.cafe.soft {\n  background: pink → lilac;\n  border-radius: 40px;\n}', line: 2, html: cafe('soft'), say: "Нежно: пастельные цвета и мягкие углы. Для кондитерской. ¦ Nozik: pastel ranglar va yumshoq burchaklar. Qandolatxona uchun. ¦ Soft: pastels and gentle corners. For a cake shop." },
      ],
      takeaway: "Покажите клиенту 2–3 таких варианта — и он сам выберет. ¦ Mijozga 2–3 ta shunday variant ko'rsating — u o'zi tanlaydi. ¦ Show the client 2–3 options like these and let them choose.",
      notes: { say: ["Пусть чат голосует за стиль для каждого бизнеса."], min: 5 },
    },
    {
      type: 'dialog',
      stage: 2,
      title: "Разговор с клиентом ¦ Mijoz bilan suhbat ¦ Talking to the client",
      chat: "какой вопрос вы бы задали ещё? ¦ yana qanday savol bergan bo'lardingiz? ¦ what else would you ask?",
      a: { name: "Клиент ¦ Mijoz ¦ Client", icon: '🤵' },
      b: { name: "Вы ¦ Siz ¦ You", icon: '🧑‍💻' },
      messages: [
        { from: 'a', text: "Нужен красивый сайт для кафе. ¦ Kafe uchun chiroyli sayt kerak. ¦ I need a beautiful site for my cafe." },
        { from: 'b', text: "Отлично! Кто чаще всего к вам приходит? ¦ Ajoyib! Sizga kim ko'proq keladi? ¦ Great! Who comes to you most often?", good: "Узнаём, для кого сайт ¦ Sayt kim uchunligini bilamiz ¦ Find out who it's for" },
        { from: 'a', text: "Мамы с детьми, после школы. ¦ Bolali onalar, maktabdan keyin. ¦ Mums with kids, after school." },
        { from: 'b', text: "Какие сайты вам нравятся? Пришлите 2–3 примера. ¦ Sizga qaysi saytlar yoqadi? 2–3 ta misol yuboring. ¦ Which sites do you like? Send me 2–3 examples.", good: "Примеры лучше слов ¦ Misollar so'zlardan yaxshiroq ¦ Examples beat words" },
        { from: 'b', text: "Что человек должен сделать на сайте? ¦ Odam saytda nima qilishi kerak? ¦ What should visitors do on the site?", good: "Главная цель ¦ Asosiy maqsad ¦ The main goal" },
        { from: 'a', text: "Посмотреть меню и позвонить. ¦ Menyuni ko'rish va qo'ng'iroq qilish. ¦ See the menu and call us." },
      ],
      takeaway: "Для кого? Какие примеры нравятся? Что главное сделать? ¦ Kim uchun? Qaysi misollar yoqadi? Asosiy nima qilish kerak? ¦ Who for? Which examples? What's the main action?",
      notes: { min: 4 },
    },
    {
      type: 'sort',
      stage: 2,
      title: "Хороший вопрос или нет? ¦ Yaxshi savolmi yoki yo'q? ¦ A good question or not?",
      chat: "пишите: «1 — хороший» ¦ yozing: «1 — yaxshi» ¦ write: “1 — good”",
      zones: [
        { id: 'ok', label: "Помогает понять ¦ Tushunishga yordam beradi ¦ Helps understand", icon: '👍' },
        { id: 'no', label: "Не помогает ¦ Yordam bermaydi ¦ Doesn't help", icon: '👎' },
      ],
      items: [
        { text: "Кто ваши покупатели? ¦ Xaridorlaringiz kim? ¦ Who are your customers?", zone: 'ok' },
        { text: "Вам красиво или некрасиво? ¦ Sizga chiroylimi yoki xunukmi? ¦ Do you want it pretty or ugly?", zone: 'no', why: "Ответ всегда «красиво» — ничего не узнали. ¦ Javob doim «chiroyli» — hech narsa bilmadik. ¦ The answer is always “pretty” — we learn nothing." },
        { text: "Какие цвета у вашего логотипа? ¦ Logotipingiz qanday rangda? ¦ What colours is your logo?", zone: 'ok' },
        { text: "Покажете сайты, которые вам нравятся? ¦ Sizga yoqadigan saytlarni ko'rsatasizmi? ¦ Can you show sites you like?", zone: 'ok' },
        { text: "Можно я сделаю как хочу? ¦ O'zim xohlagandek qilsam bo'ladimi? ¦ Can I just do whatever I want?", zone: 'no' },
      ],
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 2,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Профессионал угадывает вкус клиента с первого раза ¦ Professional mijoz didini birinchi marta topadi ¦ A pro guesses the client's taste first time", truth: false, explain: "Он спрашивает и показывает варианты. ¦ U so'raydi va variantlar ko'rsatadi. ¦ They ask and show options." },
        { text: "Сайт для детей и для банка выглядят по-разному ¦ Bolalar sayti va bank sayti har xil ko'rinadi ¦ A kids' site and a bank site look different", truth: true, explain: "Стиль зависит от того, для кого сайт. ¦ Uslub sayt kim uchunligiga bog'liq. ¦ Style depends on the audience." },
        { text: "Лучше записать ответы клиента ¦ Mijoz javoblarini yozib olgan ma'qul ¦ It's best to write down the client's answers", truth: true, explain: "Потом можно свериться и не спорить. ¦ Keyin tekshirib ko'rish va bahslashmaslik mumkin. ¦ You can check later and avoid arguments." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'live',
      stage: 3,
      title: "Ваш стиль для кафе ¦ Kafe uchun sizning uslubingiz ¦ Your style for the cafe",
      chat: "какое настроение получилось? ¦ qanday kayfiyat chiqdi? ¦ what mood did you get?",
      task: "✍️ Поменяйте класс на strict, fun или soft — и придумайте свой ¦ ✍️ Klassni strict, fun yoki soft ga almashtiring — va o'zingiznikini o'ylab toping ¦ ✍️ Switch the class to strict, fun or soft — then invent your own",
      steps: [{ label: "Кафе ¦ Kafe ¦ Cafe", html: '<div class="cafe fun">\n  <div class="e">☕</div>\n  <h1>Cafe “Bulut”</h1>\n  <p>Coffee & cakes</p>\n  <span>Menu</span>\n</div>', css: CSS.replace('.wrap{display:grid;place-items:center;height:100%}\n', '') }],
      takeaway: "Один HTML — разные стили. Это сила CSS. ¦ Bitta HTML — turli uslublar. Bu CSS kuchi. ¦ One HTML, many styles: that's the power of CSS.",
      notes: { min: 5 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: понять клиента ¦ Missiya: mijozni tushunish ¦ Mission: understand the client",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Клиент сказал: «То, что нужно!» ¦ Mijoz aytdi: «Aynan kerakli narsa!» ¦ The client says: “Exactly what I wanted!”",
      items: [
        { title: "Клиент: «Сделай красиво» ¦ Mijoz: «Chiroyli qil» ¦ Client: “Make it pretty”", choices: ["Задать вопросы ¦ Savollar berish ¦ Ask questions", "Сразу начать верстать ¦ Darhol yasashni boshlash ¦ Start coding at once"], correct: 0, explain: "Сначала понять, потом делать. ¦ Avval tushunish, keyin qilish. ¦ Understand first, then build." },
        { title: "Как показать идею? ¦ G'oyani qanday ko'rsatish kerak? ¦ How to show the idea?", choices: ["2–3 варианта стиля ¦ 2–3 ta uslub varianti ¦ 2–3 style options", "Один и сразу финальный ¦ Bitta va darhol yakuniy ¦ One final version"], correct: 0, explain: "Выбор помогает клиенту понять себя. ¦ Tanlov mijozga o'zini tushunishga yordam beradi. ¦ Choice helps the client know their taste." },
        { title: "Стиль для банка ¦ Bank uchun uslub ¦ A style for a bank", choices: ["Строгий ¦ Qat'iy ¦ Strict", "Весёлый с шариками ¦ Sharchali quvnoq ¦ Fun with balloons"], correct: 0, explain: "Банку нужно доверие и спокойствие. ¦ Bankka ishonch va xotirjamlik kerak. ¦ A bank needs trust and calm." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: «красивый сайт» ¦ Xulosa: «chiroyli sayt» ¦ Summary: “a beautiful site”",
      chat: "какой стиль подойдёт вашему будущему сайту? ¦ kelajakdagi saytingizga qaysi uslub mos keladi? ¦ which style fits your future site?",
      answer: "«Красиво» у каждого своё, поэтому не угадываем. Задаём вопросы: для кого сайт, какие примеры нравятся, что человек должен сделать на сайте. Потом показываем 2–3 варианта стиля — строгий, весёлый, нежный — и клиент выбирает. Один и тот же HTML можно оформить совсем по-разному с помощью CSS. ¦ «Chiroyli» har kimda o'zgacha, shuning uchun taxmin qilmaymiz. Savollar beramiz: sayt kim uchun, qaysi misollar yoqadi, odam saytda nima qilishi kerak. Keyin 2–3 ta uslub variantini ko'rsatamiz — qat'iy, quvnoq, nozik — va mijoz tanlaydi. Bitta HTML'ni CSS yordamida butunlay har xil bezash mumkin. ¦ “Beautiful” means something different to everyone, so we don't guess. We ask: who the site is for, which examples they like, and what visitors should do. Then we show 2–3 style options — strict, fun, soft — and the client picks. The same HTML can look completely different with CSS.",
      icon: '✨',
      badge: "Понимаю клиента ¦ Mijozni tushunaman ¦ Client whisperer",
      badgeSub: "CSS · общая 5 ¦ CSS · umumiy 5 ¦ CSS · general 5",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Придумайте 5 вопросов, которые зададите первому клиенту. ¦ Birinchi mijozga beradigan 5 ta savolni o'ylab toping. ¦ Write 5 questions for your first client.",
        "Сделайте свою карточку кафе в двух разных стилях. ¦ Kafe kartochkangizni ikki xil uslubda yasang. ¦ Make your cafe card in two different styles.",
      ],
      takeaway: "Дальше: почему языков программирования так много. ¦ Keyingisi: nega dasturlash tillari shunchalik ko'p. ¦ Next: why there are so many programming languages.",
      notes: { min: 2 },
    },
  ],
});
