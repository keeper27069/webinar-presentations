import { kit } from '@engine/kit';

const CARD_HTML = `<div id="cards"></div>`;
const CARD_CSS = `body{margin:0;font-family:system-ui;background:#f2f5fb;padding:18px}
#cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.card{background:#fff;border-radius:16px;padding:16px;text-align:center;box-shadow:0 6px 20px #0001}
.card b{display:block;font-size:20px;margin:6px 0}
.card span{color:#5b3df5;font-weight:800;font-size:18px}
.sale{outline:3px solid #ff6f91}`;
const CARD_JS = `function productCard(icon, name, price, sale = false) {
  const finalPrice = sale ? price * 0.8 : price;
  return \`<div class="card \${sale ? 'sale' : ''}">
    <div style="font-size:42px">\${icon}</div>
    <b>\${name}</b>
    <span>\${finalPrice} sum</span>
  </div>\`;
}

const box = document.querySelector('#cards');
box.innerHTML =
  productCard('🍕', 'Pizza', 60000) +
  productCard('🍔', 'Burger', 35000, true) +
  productCard('🥤', 'Juice', 12000);`;

export default kit({
  id: 'js-t04',
  title: "Функции ¦ Funksiyalar ¦ Functions",
  question: "Как написать код один раз и использовать его сколько угодно? ¦ Kodni qanday qilib bir marta yozib, xohlagancha ishlatish mumkin? ¦ How do you write code once and reuse it as often as you like?",
  route: ["Зачем ¦ Nima uchun ¦ Why", "Параметры ¦ Parametrlar ¦ Parameters", "return ¦ return ¦ return", "Стрелки ¦ Strelkalar ¦ Arrows", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🧩',
      kicker: "JavaScript · техническая тема 4 ¦ JavaScript · texnik mavzu 4 ¦ JavaScript · technical topic 4",
      title: "Функция — рецепт с названием ¦ Funksiya — nomli retsept ¦ A function is a named recipe",
      chat: "какое действие вы повторяете каждый день? ¦ har kuni qanday harakatni takrorlaysiz? ¦ what action do you repeat every day?",
      lead: "Рецепт чая пишут один раз, а заваривают каждый день — с разной водой и сахаром. Функция так же: набор команд с именем, который можно вызвать снова и снова с разными данными. ¦ Choy retsepti bir marta yoziladi, lekin har kuni turli suv va shakar bilan damlanadi. Funksiya ham shunday: qayta-qayta turli ma'lumotlar bilan chaqirish mumkin bo'lgan nomli buyruqlar to'plami. ¦ A tea recipe is written once but brewed daily with different water and sugar. Functions are the same: a named set of commands you call again and again with different data.",
      facts: ["Пишем один раз ¦ Bir marta yozamiz ¦ Write once", "Вызываем много раз ¦ Ko'p marta chaqiramiz ¦ Call many times", "Меняем — в одном месте ¦ Bir joyda o'zgartiramiz ¦ Change in one place"],
      takeaway: "Сегодня сделаем функцию, которая сама рисует карточки товаров. ¦ Bugun mahsulot kartochkalarini o'zi chizadigan funksiya yaratamiz. ¦ Today we'll make a function that draws product cards by itself.",
      notes: { min: 3 },
    },
    {
      type: 'compare',
      stage: 0,
      title: "Копипаст или функция ¦ Nusxa ko'chirish yoki funksiya ¦ Copy-paste or a function",
      chat: "сколько мест придётся менять слева, если поменяется валюта? ¦ valyuta o'zgarsa, chapda nechta joyni o'zgartirish kerak? ¦ how many places change on the left if the currency changes?",
      left: { icon: '📋', label: "Копипаст ¦ Nusxa ¦ Copy-paste", code: `console.log('Pizza: ' + 60000 + ' sum');\nconsole.log('Burger: ' + 35000 + ' sum');\nconsole.log('Juice: ' + 12000 + ' sum');`, lang: 'js' },
      right: { icon: '🧩', label: "Функция ¦ Funksiya ¦ Function", code: `function showPrice(name, price) {\n  console.log(name + ': ' + price + ' sum');\n}\n\nshowPrice('Pizza', 60000);\nshowPrice('Burger', 35000);\nshowPrice('Juice', 12000);`, lang: 'js' },
      verdict: "Слева «sum» придётся менять в трёх местах, справа — в одном. В большом проекте это сотни мест. ¦ Chapda «sum»ni uch joyda o'zgartirish kerak, o'ngda — bitta joyda. Katta loyihada bu yuzlab joylar. ¦ On the left you change “sum” in three places; on the right, in one. In a big project that's hundreds.",
      notes: { say: ["Принцип DRY — Don't Repeat Yourself."], min: 4 },
    },
    {
      type: 'walk',
      stage: 1,
      title: "Анатомия функции ¦ Funksiya anatomiyasi ¦ Anatomy of a function",
      chat: "что вернёт area(3, 4)? ¦ area(3, 4) nimani qaytaradi? ¦ what does area(3, 4) return?",
      code: `function area(width, height) {\n  const result = width * height;\n  return result;\n}\n\nconst room = area(5, 4);\nconsole.log(room); // 20`,
      lang: 'js',
      marks: [
        { line: 1, text: "function + имя + параметры в скобках. width и height — «пустые места» для данных. ¦ function + nom + qavsdagi parametrlar. width va height — ma'lumotlar uchun «bo'sh joylar». ¦ function + name + parameters in brackets. width and height are “slots” for data." },
        { line: 2, text: "Тело функции: что делаем с данными. ¦ Funksiya tanasi: ma'lumotlar bilan nima qilamiz. ¦ The body: what we do with the data." },
        { line: 3, text: "return отдаёт результат наружу и завершает функцию. ¦ return natijani tashqariga beradi va funksiyani tugatadi. ¦ return hands the result out and ends the function." },
        { line: 6, text: "Вызов: 5 и 4 — аргументы. Результат кладём в переменную room. ¦ Chaqiruv: 5 va 4 — argumentlar. Natijani room o'zgaruvchisiga solamiz. ¦ The call: 5 and 4 are arguments. The result goes into room." },
      ],
      takeaway: "Параметры — входы, return — выход. Функция — маленькая машина. ¦ Parametrlar — kirish, return — chiqish. Funksiya — kichik mashina. ¦ Parameters in, return out. A function is a little machine.",
      notes: { say: ["Ответ: area(3, 4) → 12."], min: 5 },
    },
    {
      type: 'live',
      stage: 1,
      title: "Фабрика карточек ¦ Kartochkalar fabrikasi ¦ A card factory",
      chat: "какой товар добавим? название и цена! ¦ qanday mahsulot qo'shamiz? nomi va narxi! ¦ which product shall we add? name and price!",
      task: "✍️ Добавьте ещё один вызов productCard(...) ¦ ✍️ Yana bitta productCard(...) chaqiruvini qo'shing ¦ ✍️ Add another productCard(...) call",
      steps: [
        { label: "Карточки ¦ Kartochkalar ¦ Cards", html: CARD_HTML, css: CARD_CSS, js: CARD_JS },
      ],
      takeaway: "Одна функция — сколько угодно карточек. sale = false — значение по умолчанию, если аргумент не передали. ¦ Bitta funksiya — xohlagancha kartochka. sale = false — argument berilmasa, sukut bo'yicha qiymat. ¦ One function, any number of cards. sale = false is the default when no argument is given.",
      notes: { say: ["Добавляйте товары по заявкам чата; покажите, как true включает скидку 20%."], min: 8 },
    },
    {
      type: 'output',
      stage: 2,
      title: "return или console.log? ¦ return'mi yoki console.log'mi? ¦ return or console.log?",
      chat: "пишите ответ до того, как я покажу ¦ men ko'rsatishimdan oldin javob yozing ¦ write your answer before I reveal it",
      snippets: [
        { label: "Без return ¦ return'siz ¦ Without return", code: `function double(n) {\n  console.log(n * 2);\n}\nconst x = double(5);\nconsole.log(x);`, output: ['10', 'undefined'], explain: "Функция напечатала 10, но ничего не вернула — x стал undefined. ¦ Funksiya 10 ni chiqardi, lekin hech narsa qaytarmadi — x undefined bo'ldi. ¦ It printed 10 but returned nothing, so x is undefined." },
        { label: "С return ¦ return bilan ¦ With return", code: `function double(n) {\n  return n * 2;\n}\nconsole.log(double(5) + 1);\nconsole.log(double(double(3)));`, output: ['11', '12'], explain: "Результат можно использовать дальше: сложить или передать в другой вызов. ¦ Natijani keyin ishlatish mumkin: qo'shish yoki boshqa chaqiruvga berish. ¦ The result can be used further: added or passed to another call." },
      ],
      takeaway: "console.log показывает, return отдаёт. Нужен результат — нужен return. ¦ console.log ko'rsatadi, return beradi. Natija kerak bo'lsa — return kerak. ¦ console.log shows; return gives. Need a result? Use return.",
      notes: { say: ["Самая частая путаница новичков — разберите медленно."], min: 6 },
    },
    {
      type: 'cards',
      stage: 3,
      title: "Три записи одной функции ¦ Bitta funksiyaning uch yozuvi ¦ Three ways to write one function",
      chat: "какая запись вам нравится больше? ¦ qaysi yozuv sizga ko'proq yoqadi? ¦ which style do you like best?",
      cards: [
        { icon: '📜', front: "Объявление ¦ E'lon qilish ¦ Declaration", back: "function greet(name) { return 'Hi, ' + name; } ¦ function greet(name) { return 'Hi, ' + name; } ¦ function greet(name) { return 'Hi, ' + name; }" },
        { icon: '📦', front: "Выражение ¦ Ifoda ¦ Expression", back: "const greet = function (name) { return 'Hi, ' + name; }; ¦ const greet = function (name) { return 'Hi, ' + name; }; ¦ const greet = function (name) { return 'Hi, ' + name; };" },
        { icon: '➡️', front: "Стрелочная ¦ Strelkali ¦ Arrow", back: "const greet = (name) => 'Hi, ' + name; ¦ const greet = (name) => 'Hi, ' + name; ¦ const greet = (name) => 'Hi, ' + name;" },
      ],
      takeaway: "Результат одинаковый. Стрелочные функции короче — в React их используют постоянно. ¦ Natija bir xil. Strelkali funksiyalar qisqaroq — React'da ulardan doim foydalaniladi. ¦ Same result. Arrow functions are shorter — React uses them everywhere.",
      notes: { say: ["Подробно стрелочные функции понадобятся в модуле React."], min: 4 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Найдите баг ¦ Xatoni toping ¦ Find the bug",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Код после return ¦ return'dan keyingi kod ¦ Code after return", lang: 'js', code: `function total(price, qty) {\n  return price * qty;\n  console.log('Calculated!');\n}`, line: 3, explain: "После return функция заканчивается — эта строка не выполнится никогда. ¦ return'dan keyin funksiya tugaydi — bu qator hech qachon bajarilmaydi. ¦ The function ends at return; this line never runs.", fix: `function total(price, qty) {\n  console.log('Calculated!');\n  return price * qty;\n}` },
        { title: "Функцию забыли вызвать ¦ Funksiyani chaqirish unutildi ¦ Forgot to call it", lang: 'js', code: `function sayHi() {\n  return 'Hi!';\n}\nconsole.log(sayHi);`, line: 4, explain: "Без скобок () функция не вызывается — выведется её код, а не 'Hi!'. ¦ () qavslarsiz funksiya chaqirilmaydi — 'Hi!' emas, uning kodi chiqadi. ¦ Without () the function isn't called; it prints the function itself, not 'Hi!'.", fix: `console.log(sayHi());` },
      ],
      takeaway: "return — последнее, что делает функция. А () — то, что её запускает. ¦ return — funksiya qiladigan oxirgi narsa. () esa uni ishga tushiradi. ¦ return is the last thing a function does; () is what runs it.",
      notes: { say: ["Найдите вместе с чатом."], min: 5 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "Функция может вызывать другую функцию ¦ Funksiya boshqa funksiyani chaqira oladi ¦ A function can call another function", truth: true, explain: "Так из маленьких функций собирают большие программы. ¦ Shunday qilib kichik funksiyalardan katta dasturlar yig'iladi. ¦ That's how small functions build big programs." },
        { text: "Переменная внутри функции видна снаружи ¦ Funksiya ichidagi o'zgaruvchi tashqaridan ko'rinadi ¦ A variable inside a function is visible outside", truth: false, explain: "const и let внутри функции живут только в ней. ¦ Funksiya ichidagi const va let faqat unda yashaydi. ¦ const and let inside a function live only there." },
        { text: "Хорошее имя функции начинается с глагола ¦ Yaxshi funksiya nomi fe'l bilan boshlanadi ¦ Good function names start with a verb", truth: true, explain: "getPrice, showCard, addItem — сразу понятно, что делает. ¦ getPrice, showCard, addItem — nima qilishi darhol tushunarli. ¦ getPrice, showCard, addItem — instantly clear." },
      ],
      takeaway: "Функция — отдельная комнатка: свои переменные внутри, результат — через return. ¦ Funksiya — alohida xonacha: ichida o'z o'zgaruvchilari, natija — return orqali. ¦ A function is its own little room: its variables inside, results via return.",
      notes: { say: ["Голосуем по пунктам. Можно упомянуть слово «область видимости» (scope)."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: калькулятор кафе ¦ Missiya: kafe kalkulyatori ¦ Mission: a café calculator",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Калькулятор кафе готов! ¦ Kafe kalkulyatori tayyor! ¦ The café calculator is ready!",
      items: [
        { title: "Нужна сумма заказа для дальнейших расчётов ¦ Keyingi hisob-kitoblar uchun buyurtma summasi kerak ¦ You need the order total for more maths", choices: ["return price * qty", "console.log(price * qty)"], correct: 0, explain: "Результат нужен — значит return. ¦ Natija kerak — demak return. ¦ Need the result → return." },
        { title: "Короткая запись удвоения ¦ Ikki baravarning qisqa yozuvi ¦ A short doubling function", choices: ["const double = (n) => n * 2;", "const double => n * 2;"], correct: 0, explain: "Параметры в скобках, потом =>. ¦ Parametrlar qavsda, keyin =>. ¦ Parameters in brackets, then =>." },
        { title: "Имя для функции подсчёта чаевых ¦ Choy pulini hisoblash funksiyasi nomi ¦ A name for a tip calculator", choices: ['calcTip', 'x2'], correct: 0, explain: "Глагол + что делает. ¦ Fe'l + nima qiladi. ¦ Verb + what it does." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: функции ¦ Xulosa: funksiyalar ¦ Summary: functions",
      chat: "какую функцию вы бы написали для своего сайта? ¦ saytingiz uchun qanday funksiya yozgan bo'lardingiz? ¦ which function would you write for your site?",
      answer: "Функция — именованный набор команд: пишем один раз, вызываем сколько угодно. Параметры — входы, аргументы — конкретные значения при вызове, return отдаёт результат и завершает функцию. console.log только показывает, а return позволяет использовать результат дальше. Есть три записи: объявление, выражение и стрелочная (n) => n * 2. ¦ Funksiya — nomlangan buyruqlar to'plami: bir marta yozamiz, xohlagancha chaqiramiz. Parametrlar — kirish, argumentlar — chaqiruvdagi aniq qiymatlar, return natijani beradi va funksiyani tugatadi. console.log faqat ko'rsatadi, return esa natijani keyin ishlatish imkonini beradi. Uch xil yozuv bor: e'lon qilish, ifoda va strelkali (n) => n * 2. ¦ A function is a named set of commands: write once, call as often as you like. Parameters are inputs, arguments the actual values in a call, and return hands back the result and ends the function. console.log only shows; return lets you reuse the result. Three styles: declaration, expression and arrow (n) => n * 2.",
      icon: '🧩',
      badge: "Мастер функций ¦ Funksiyalar ustasi ¦ Function master",
      badgeSub: "JavaScript · техническая 4 ¦ JavaScript · texnik 4 ¦ JavaScript · technical 4",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Напишите функцию scoreLabel(score), которая возвращает «низкий», «средний» или «высокий» для числа от 0 до 100. ¦ 0 dan 100 gacha son uchun «past», «o'rta» yoki «yuqori» qaytaradigan scoreLabel(score) funksiyasini yozing. ¦ Write scoreLabel(score) returning “low”, “medium” or “high” for a 0–100 number.",
        "Перепишите её стрелочной функцией. ¦ Uni strelkali funksiya bilan qayta yozing. ¦ Rewrite it as an arrow function.",
      ],
      takeaway: "Следующая тема — DOM: функции начнут менять страницу. ¦ Keyingi mavzu — DOM: funksiyalar sahifani o'zgartira boshlaydi. ¦ Next: the DOM — functions start changing the page.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
