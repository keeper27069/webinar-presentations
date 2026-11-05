import { kit } from '@engine/kit';

const CSS = `.wrap{display:grid;place-items:center;height:100%;font-family:Manrope,system-ui}
.pic{position:relative;width:440px;height:330px;border-radius:22px;background:#fff;box-shadow:0 10px 30px #0002;overflow:hidden}
.pic span{position:absolute;line-height:1}
.c{font-size:120px;left:160px;top:100px}
.space{background:#1b1f3b}.cartoon{background:linear-gradient(160deg,#6a5cff,#ff6fb1)}.water{background:linear-gradient(160deg,#cfe8ff,#ffe3ef);filter:saturate(.7)}
.r{font-size:70px;left:40px;top:200px}.p{font-size:80px;left:320px;top:30px}.s{font-size:40px;left:60px;top:40px}.s2{font-size:34px;left:360px;top:240px}
.big .c{font-size:150px;left:140px;top:80px}`;
const pic = (cls: string, extra: string) => `<div class="wrap"><div class="pic ${cls}"><span class="c">🐱</span>${extra}</div></div>`;

export default kit({
  id: 'css-g07',
  title: "Как нейросеть рисует картинку по предложению ¦ Neyrotarmoq gap bo'yicha qanday rasm chizadi ¦ How AI draws a picture from a sentence",
  question: "Откуда нейросеть знает, как выглядит «кот-космонавт»? ¦ Neyrotarmoq «kosmonavt mushuk» qanday ko'rinishini qayerdan biladi? ¦ How does AI know what a “cat astronaut” looks like?",
  route: ["Учёба ¦ O'qish ¦ Learning", "Из шума ¦ Shovqindan ¦ From noise", "Промпт ¦ Prompt ¦ The prompt", "Честно ¦ Halol ¦ Fair use", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🎨',
      kicker: "CSS · общая тема 7 ¦ CSS · umumiy mavzu 7 ¦ CSS · general topic 7",
      title: "Пишешь словами — получаешь картинку ¦ So'z bilan yozasan — rasm olasan ¦ Type words, get a picture",
      chat: "что бы вы попросили нарисовать нейросеть? ¦ neyrotarmoqdan nima chizishni so'ragan bo'lardingiz? ¦ what would you ask AI to draw?",
      lead: "Нейросеть не рисует кисточкой и не ищет картинку в интернете. Она видела миллионы картинок с подписями и научилась собирать новые. ¦ Neyrotarmoq mo'yqalam bilan chizmaydi va internetdan rasm qidirmaydi. U imzoli millionlab rasmlarni ko'rgan va yangilarini yig'ishni o'rgangan. ¦ AI doesn't paint with a brush or search the internet. It has seen millions of captioned pictures and learned to make new ones.",
      facts: ["Учится на картинках с подписями ¦ Imzoli rasmlarda o'rganadi ¦ Learns from captioned pictures", "Рисует из «шума» ¦ «Shovqin»dan chizadi ¦ Draws out of “noise”", "Результат зависит от ваших слов ¦ Natija so'zlaringizga bog'liq ¦ The result depends on your words"],
      takeaway: "Сначала — как нейросеть учится. ¦ Avval — neyrotarmoq qanday o'rganadi. ¦ First, how the AI learns.",
      notes: { min: 3 },
    },
    {
      type: 'animate',
      stage: 1,
      title: "Миллион картинок с подписями ¦ Imzoli million rasm ¦ A million captioned pictures",
      chat: "сколько котов нужно увидеть, чтобы понять, что такое кот? ¦ mushuk nima ekanini tushunish uchun nechta mushukni ko'rish kerak? ¦ how many cats must you see to know what a cat is?",
      actors: [
        { id: 'p1', icon: '🐱', label: "«кот» ¦ «mushuk» ¦ “cat”" },
        { id: 'p2', icon: '🐈', label: "«кот» ¦ «mushuk» ¦ “cat”" },
        { id: 'p3', icon: '🚀', label: "«ракета» ¦ «raketa» ¦ “rocket”" },
        { id: 'p4', icon: '🌙', label: "«луна» ¦ «oy» ¦ “moon”" },
        { id: 'ai', icon: '🧠', label: "Нейросеть ¦ Neyrotarmoq ¦ AI" },
        { id: 'know', text: "кот = уши + усы + хвост ¦ mushuk = quloq + mo'ylov + dum ¦ cat = ears + whiskers + tail" },
      ],
      steps: [
        { say: "Нейросети показывают картинки и подписи к ним. ¦ Neyrotarmoqqa rasmlar va ularning imzolarini ko'rsatishadi. ¦ The AI is shown pictures and their captions.", at: { p1: [14, 24], p2: [14, 72], p3: [36, 24], p4: [36, 72], ai: [76, 48, 1.3] } },
        { say: "Картинка за картинкой — миллионы раз. ¦ Rasm ketidan rasm — millionlab marta. ¦ Picture after picture, millions of times.", lines: [['p1', 'ai'], ['p2', 'ai'], ['p3', 'ai'], ['p4', 'ai']], pulse: ['ai'] },
        { say: "Постепенно она замечает: у «котов» всегда уши, усы и хвост. ¦ Asta-sekin u payqaydi: «mushuklar»da doim quloq, mo'ylov va dum bor. ¦ Bit by bit it notices: “cats” always have ears, whiskers and a tail.", at: { know: [76, 84] }, lines: [['p1', 'ai'], ['p2', 'ai']], pulse: ['p1', 'p2'] },
        { say: "Теперь она может собрать НОВОГО кота, которого никогда не было. ¦ Endi u hech qachon bo'lmagan YANGI mushukni yig'a oladi. ¦ Now it can build a NEW cat that never existed.", hide: ['p3', 'p4'], at: { ai: [50, 48, 1.3], p1: [86, 30, 1.3] }, set: { p1: { label: "новый кот! ¦ yangi mushuk! ¦ a new cat!" } }, lines: [['ai', 'p1']], pulse: ['p1'] },
      ],
      takeaway: "Нейросеть не копирует, а запоминает «как обычно выглядит». ¦ Neyrotarmoq nusxa ko'chirmaydi, «odatda qanday ko'rinishini» eslab qoladi. ¦ AI doesn't copy; it remembers “what things usually look like”.",
      notes: { min: 4 },
    },
    {
      type: 'animate',
      stage: 2,
      title: "Из шума — к картинке ¦ Shovqindan — rasmga ¦ From noise to picture",
      chat: "на что похож «шум»? ¦ «shovqin» nimaga o'xshaydi? ¦ what does “noise” look like?",
      actors: [
        { id: 'img', text: "▓▒░▓▒░▓▒" },
        { id: 'n', text: "шаг 1 ¦ 1-qadam ¦ step 1" },
      ],
      steps: [
        { say: "Нейросеть начинает с хаоса из точек — как снег на старом телевизоре. ¦ Neyrotarmoq nuqtalar tartibsizligidan boshlaydi — eski televizordagi qor kabi. ¦ It starts from chaos — like snow on an old TV.", at: { img: [50, 46, 1.6], n: [50, 82] } },
        { say: "Шаг за шагом она убирает лишнее — проступают очертания. ¦ Qadam-baqadam u ortiqchasini olib tashlaydi — shakllar paydo bo'ladi. ¦ Step by step it removes the mess and shapes appear.", set: { img: { text: "▒░ 🌫️ ░▒" }, n: { text: "шаг 10 ¦ 10-qadam ¦ step 10" } } },
        { say: "Ещё шаги — и уже видно кота. ¦ Yana qadamlar — va mushuk ko'rina boshlaydi. ¦ More steps and a cat appears.", set: { img: { text: "░ 🐱 ░" }, n: { text: "шаг 30 ¦ 30-qadam ¦ step 30" } } },
        { say: "Готово: кот-космонавт у Луны! ¦ Tayyor: Oy yonida kosmonavt mushuk! ¦ Done: a cat astronaut by the Moon!", set: { img: { text: "🐱🚀🌙" }, n: { text: "шаг 50 ✅ ¦ 50-qadam ✅ ¦ step 50 ✅" } }, pulse: ['img'] },
      ],
      takeaway: "Картинка «проявляется» из шума, как фото. ¦ Rasm shovqindan fotosurat kabi «paydo bo'ladi». ¦ The picture “develops” out of noise, like a photo.",
      notes: { min: 4 },
    },
    {
      type: 'show',
      stage: 3,
      title: "Каждое слово меняет картинку ¦ Har bir so'z rasmni o'zgartiradi ¦ Every word changes the picture",
      chat: "какое слово добавим следующим? ¦ keyingi qaysi so'zni qo'shamiz? ¦ which word shall we add next?",
      lang: 'text',
      css: CSS,
      steps: [
        { code: 'a cat', html: pic('', ''), say: "Одно слово — простой кот на белом фоне. ¦ Bitta so'z — oq fonda oddiy mushuk. ¦ One word: a plain cat on white." },
        { code: 'a cat astronaut\nin space', line: 2, html: pic('space', '<span class="r">🚀</span><span class="p">🪐</span><span class="s">⭐</span>'), say: "Добавили «в космосе» — появились ракета и планета. ¦ «Kosmosda» qo'shdik — raketa va sayyora paydo bo'ldi. ¦ Add “in space” and a rocket and planet appear." },
        { code: 'a cat astronaut\nin space,\ncartoon, bright colors', line: 3, html: pic('cartoon big', '<span class="r">🚀</span><span class="p">🪐</span><span class="s">✨</span><span class="s2">✨</span>'), say: "«Мультяшно, ярко» — сменился стиль и цвета. ¦ «Multfilmdek, yorqin» — uslub va ranglar o'zgardi. ¦ “Cartoon, bright” changes the style and colours." },
        { code: 'a cat astronaut\nin space,\nwatercolor, soft', line: 3, html: pic('water big', '<span class="r">🚀</span><span class="p">🌙</span>'), say: "«Акварель, нежно» — та же идея, другое настроение. ¦ «Akvarel, nozik» — o'sha g'oya, boshqa kayfiyat. ¦ “Watercolour, soft”: same idea, different mood." },
      ],
      takeaway: "Промпт = что + где + какой стиль. ¦ Prompt = nima + qayerda + qanday uslub. ¦ Prompt = what + where + which style.",
      notes: { min: 5 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Хороший промпт или нет? ¦ Yaxshi promptmi yoki yo'q? ¦ A good prompt or not?",
      chat: "пишите: «1 — хороший» ¦ yozing: «1 — yaxshi» ¦ write: “1 — good”",
      zones: [
        { id: 'ok', label: "Понятный ¦ Tushunarli ¦ Clear", icon: '👍' },
        { id: 'no', label: "Слишком размытый ¦ Juda noaniq ¦ Too vague", icon: '🤷' },
      ],
      items: [
        { text: "«красиво» ¦ «chiroyli» ¦ “pretty”", zone: 'no' },
        { text: "«рыжий кот спит на окне, утро, мультяшно» ¦ «sariq mushuk derazada uxlayapti, tong, multfilmdek» ¦ “ginger cat asleep on a window, morning, cartoon”", zone: 'ok' },
        { text: "«что-нибудь» ¦ «biror narsa» ¦ “something”", zone: 'no' },
        { text: "«логотип кафе, чашка кофе, простой, оранжевый» ¦ «kafe logotipi, kofe piyolasi, oddiy, to'q sariq» ¦ “cafe logo, coffee cup, simple, orange”", zone: 'ok' },
      ],
      notes: { min: 4 },
    },
    {
      type: 'truefalse',
      stage: 4,
      title: "Правда или миф? ¦ Rostmi yoki afsona? ¦ True or myth?",
      chat: "пишите «правда» или «миф» ¦ «rost» yoki «afsona» deb yozing ¦ write “true” or “myth”",
      statements: [
        { text: "Нейросеть ищет готовую картинку в Google ¦ Neyrotarmoq Google'dan tayyor rasm qidiradi ¦ AI finds a ready picture on Google", truth: false, explain: "Она собирает новую картинку сама. ¦ U yangi rasmni o'zi yig'adi. ¦ It builds a new picture itself." },
        { text: "Нельзя делать фальшивые фото реальных людей ¦ Haqiqiy odamlarning soxta fotolarini yasash mumkin emas ¦ Don't make fake photos of real people", truth: true, explain: "Это может обидеть и навредить человеку. ¦ Bu odamni xafa qilishi va unga zarar yetkazishi mumkin. ¦ It can hurt and harm someone." },
        { text: "Картинки ИИ можно использовать на своём сайте ¦ Sun'iy intellekt rasmlaridan o'z saytingizda foydalanish mumkin ¦ You can use AI images on your own site", truth: true, explain: "Да, но проверьте правила сервиса. ¦ Ha, lekin servis qoidalarini tekshiring. ¦ Yes, but check the service's rules." },
      ],
      notes: { say: ["Подчеркните этику: никаких подделок людей и чужих лиц."], min: 4 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: картинка для сайта ¦ Missiya: sayt uchun rasm ¦ Mission: a picture for a site",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Картинка готова и честная! ¦ Rasm tayyor va halol! ¦ The picture is ready and fair!",
      items: [
        { title: "Нужна картинка для пекарни ¦ Novvoyxona uchun rasm kerak ¦ A bakery needs a picture", choices: ["«свежий хлеб на столе, утро, тёплый свет» ¦ «stolda yangi non, tong, iliq yorug'lik» ¦ “fresh bread on a table, morning, warm light”", "«еда» ¦ «ovqat» ¦ “food”"], correct: 0, explain: "Что, где и какой свет. ¦ Nima, qayerda va qanday yorug'lik. ¦ What, where and which light." },
        { title: "Как нейросеть рисует? ¦ Neyrotarmoq qanday chizadi? ¦ How does AI draw?", choices: ["Проявляет картинку из шума ¦ Rasmni shovqindan paydo qiladi ¦ Develops it out of noise", "Копирует из интернета ¦ Internetdan nusxa oladi ¦ Copies it from the web"], correct: 0, explain: "Шаг за шагом из хаоса. ¦ Tartibsizlikdan qadam-baqadam. ¦ Step by step out of chaos." },
        { title: "Друг просит фото учителя «в смешном виде» ¦ Do'stingiz o'qituvchining «kulgili» rasmini so'raydi ¦ A friend wants a “funny” photo of a teacher", choices: ["Отказаться ¦ Rad etish ¦ Say no", "Сделать и разослать ¦ Yasab, tarqatish ¦ Make it and share it"], correct: 0, explain: "Подделки реальных людей вредят им. ¦ Haqiqiy odamlarning soxtalari ularga zarar yetkazadi. ¦ Fakes of real people harm them." },
      ],
      notes: { min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: нейросеть-художник ¦ Xulosa: rassom neyrotarmoq ¦ Summary: the AI artist",
      chat: "напишите промпт для картинки своей мечты! ¦ orzuingizdagi rasm uchun prompt yozing! ¦ write a prompt for your dream picture!",
      answer: "Нейросеть посмотрела миллионы картинок с подписями и запомнила, как обычно выглядят вещи. Получив промпт, она начинает с «шума» и шаг за шагом проявляет новую картинку. Чем точнее слова — что, где, в каком стиле, — тем лучше результат. Пользуемся честно: не делаем подделок реальных людей. ¦ Neyrotarmoq imzoli millionlab rasmlarni ko'rgan va narsalar odatda qanday ko'rinishini eslab qolgan. Promptni olgach, u «shovqin»dan boshlaydi va qadam-baqadam yangi rasmni paydo qiladi. So'zlar qancha aniq bo'lsa — nima, qayerda, qaysi uslubda — natija shuncha yaxshi. Halol foydalanamiz: haqiqiy odamlarning soxtasini yasamaymiz. ¦ AI has seen millions of captioned pictures and remembers what things usually look like. Given a prompt, it starts from “noise” and develops a new picture step by step. The more precise the words — what, where, which style — the better the result. Use it fairly: no fakes of real people.",
      icon: '🎨',
      badge: "Мастер промптов ¦ Prompt ustasi ¦ Prompt master",
      badgeSub: "CSS · общая 7 ¦ CSS · umumiy 7 ¦ CSS · general 7",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Придумайте промпт из 3 частей: что, где, стиль. ¦ 3 qismli prompt o'ylab toping: nima, qayerda, uslub. ¦ Write a 3-part prompt: what, where, style.",
        "Сделайте картинку для шапки своего сайта. ¦ Saytingiz sarlavhasi uchun rasm yasang. ¦ Make a header picture for your site.",
      ],
      takeaway: "Дальше: как программисты зарабатывают. ¦ Keyingisi: dasturchilar qanday pul topadi. ¦ Next: how programmers earn money.",
      notes: { min: 2 },
    },
  ],
});
