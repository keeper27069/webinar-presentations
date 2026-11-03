import { kit } from '@engine/kit';

const CSS = `body{margin:0;font-family:system-ui;background:#f4f6fb;color:#1b2150}
.box{max-width:420px;margin:16px auto;background:#fff;border-radius:18px;padding:20px;text-align:center;box-shadow:0 8px 24px #0001;display:grid;gap:14px}
.count{font-size:64px;font-weight:900}
.row{display:flex;gap:10px;justify-content:center}
button{padding:10px 18px;border:0;border-radius:10px;background:#5b3df5;color:#fff;font-size:18px;font-weight:800}
input{padding:10px;border:1px solid #cfd5e6;border-radius:10px;font-size:18px}
.dark{background:#1b2150;color:#fff}`;
const COUNTER = `const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="box">
      <div className="count">{count}</div>
      <div className="row">
        <button onClick={() => setCount(count - 1)}>−</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Counter />);`;
const FULL = `const { useState } = React;

function App() {
  const [likes, setLikes] = useState(0);
  const [dark, setDark] = useState(false);
  const [name, setName] = useState('');

  return (
    <div className={dark ? 'box dark' : 'box'}>
      <h2>Hello, {name || 'guest'}! 👋</h2>
      <input value={name} placeholder="Your name"
        onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>
      <button onClick={() => setDark(!dark)}>
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`;

export default kit({
  id: 'react-t02',
  title: "useState ¦ useState ¦ useState",
  question: "Как React узнаёт, что пора обновить экран? ¦ React ekranni yangilash vaqti kelganini qanday biladi? ¦ How does React know it's time to update the screen?",
  route: ["Проблема ¦ Muammo ¦ The problem", "useState ¦ useState ¦ useState", "Счётчик ¦ Hisoblagich ¦ Counter", "Переключатель и поле ¦ Almashtirgich va maydon ¦ Toggle and input", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🔄',
      kicker: "React · техническая тема 2 ¦ React · texnik mavzu 2 ¦ React · technical topic 2",
      title: "Память компонента ¦ Komponent xotirasi ¦ A component's memory",
      chat: "что на экране меняется, когда вы ставите лайк? ¦ layk bosganingizda ekranda nima o'zgaradi? ¦ what changes on screen when you like something?",
      lead: "Счётчик лайков, тёмная тема, текст в поле — всё это данные, которые меняются. В React такие данные хранят в состоянии через useState: поменяли состояние — React сам перерисовал компонент. ¦ Layklar hisoblagichi, qorong'i mavzu, maydondagi matn — bularning hammasi o'zgaradigan ma'lumotlar. React'da bunday ma'lumotlar useState orqali holatda saqlanadi: holatni o'zgartirdik — React komponentni o'zi qayta chizdi. ¦ A like counter, dark mode, text in a field — all data that changes. React keeps it in state with useState: change the state and React redraws the component itself.",
      facts: ["Состояние = данные, которые меняются ¦ Holat = o'zgaradigan ma'lumot ¦ State = data that changes", "setState — единственный способ изменить ¦ setState — o'zgartirishning yagona usuli ¦ setState is the only way to change it", "Изменили — экран обновился ¦ O'zgartirdik — ekran yangilandi ¦ Change it and the screen updates"],
      takeaway: "Сегодня: счётчик, переключатель темы и поле ввода. ¦ Bugun: hisoblagich, mavzu almashtirgich va kiritish maydoni. ¦ Today: a counter, a theme toggle and an input.",
      notes: { min: 3 },
    },
    {
      type: 'compare',
      stage: 0,
      title: "Обычная переменная или состояние ¦ Oddiy o'zgaruvchi yoki holat ¦ A plain variable or state",
      chat: "почему слева число на экране не меняется? ¦ nega chapda ekrandagi raqam o'zgarmaydi? ¦ why doesn't the number change on the left?",
      left: { icon: '❌', label: "let ¦ let ¦ let", code: `function Counter() {\n  let count = 0;\n  return (\n    <button onClick={() => count++}>\n      {count}\n    </button>\n  );\n}`, lang: 'js' },
      right: { icon: '✅', label: 'useState', code: `function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      {count}\n    </button>\n  );\n}`, lang: 'js' },
      verdict: "Слева переменная меняется, но React об этом не знает и не перерисовывает. setCount говорит React: «данные изменились — обнови экран». ¦ Chapda o'zgaruvchi o'zgaradi, lekin React bundan bexabar va qayta chizmaydi. setCount React'ga aytadi: «ma'lumot o'zgardi — ekranni yangila». ¦ On the left the variable changes but React doesn't know, so it doesn't redraw. setCount tells React: “data changed — update the screen”.",
      notes: { min: 4 },
    },
    {
      type: 'walk',
      stage: 1,
      title: "Разбираем useState ¦ useState'ni tahlil qilamiz ¦ Unpacking useState",
      chat: "что хранит count, а что делает setCount? ¦ count nimani saqlaydi, setCount nima qiladi? ¦ what does count hold and what does setCount do?",
      code: `const { useState } = React;\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}`,
      lang: 'js',
      marks: [
        { line: 1, text: "В Vite-проекте это import { useState } from 'react'. ¦ Vite loyihasida bu import { useState } from 'react'. ¦ In a Vite project it's import { useState } from 'react'." },
        { line: 4, text: "useState(0) возвращает пару: текущее значение и функцию для изменения. 0 — начальное значение. ¦ useState(0) juftlik qaytaradi: joriy qiymat va o'zgartirish funksiyasi. 0 — boshlang'ich qiymat. ¦ useState(0) returns a pair: the current value and a setter. 0 is the initial value." },
        { line: 7, text: "Клик → setCount(count + 1) → React вызывает Counter заново с новым count. ¦ Bosish → setCount(count + 1) → React Counter'ni yangi count bilan qayta chaqiradi. ¦ Click → setCount(count + 1) → React calls Counter again with the new count." },
        { line: 8, text: "JSX показывает актуальное значение. ¦ JSX dolzarb qiymatni ko'rsatadi. ¦ JSX shows the current value." },
      ],
      takeaway: "[значение, изменить] = useState(начальное). ¦ [qiymat, o'zgartirish] = useState(boshlang'ich). ¦ [value, setValue] = useState(initial).",
      notes: { min: 5 },
    },
    {
      type: 'live',
      stage: 2,
      react: true,
      title: "Счётчик ¦ Hisoblagich ¦ A counter",
      chat: "какую кнопку добавить? «+10»? ¦ qanday tugma qo'shamiz? «+10»? ¦ which button shall we add? “+10”?",
      task: "✍️ Кликайте, потом добавьте кнопку «+10» ¦ ✍️ Bosing, keyin «+10» tugmasini qo'shing ¦ ✍️ Click around, then add a “+10” button",
      steps: [
        { label: "Счётчик ¦ Hisoblagich ¦ Counter", html: '<div id="root"></div>', css: CSS, js: COUNTER },
      ],
      takeaway: "Каждая кнопка вызывает setCount — React сам меняет число на экране. ¦ Har bir tugma setCount'ni chaqiradi — React raqamni ekranda o'zi o'zgartiradi. ¦ Each button calls setCount and React updates the number itself.",
      notes: { say: ["Предложите чату: запретить уходить ниже нуля (if или Math.max)."], min: 7 },
    },
    {
      type: 'live',
      stage: 3,
      react: true,
      title: "Лайк, тема и поле ввода ¦ Layk, mavzu va kiritish maydoni ¦ Like, theme and input",
      chat: "напишите своё имя в поле! ¦ maydonga ismingizni yozing! ¦ type your name in the field!",
      task: "✍️ Три состояния в одном компоненте — попробуйте все ¦ ✍️ Bitta komponentda uchta holat — hammasini sinab ko'ring ¦ ✍️ Three pieces of state in one component — try them all",
      steps: [
        { label: "Три состояния ¦ Uchta holat ¦ Three states", html: '<div id="root"></div>', css: CSS, js: FULL },
      ],
      takeaway: "Число, логическое значение, строка — useState хранит что угодно. setDark(!dark) — переключатель, onChange + value — управляемое поле. ¦ Raqam, mantiqiy qiymat, satr — useState istalgan narsani saqlaydi. setDark(!dark) — almashtirgich, onChange + value — boshqariladigan maydon. ¦ Number, boolean, string — useState holds anything. setDark(!dark) is a toggle; onChange + value make a controlled input.",
      notes: { say: ["Покажите: {name || 'guest'} — если имя пустое, показываем guest."], min: 8 },
    },
    {
      type: 'output',
      stage: 3,
      title: "Что покажет экран? ¦ Ekran nimani ko'rsatadi? ¦ What will the screen show?",
      chat: "пишите ответ до того, как я покажу ¦ men ko'rsatishimdan oldin javob yozing ¦ write your answer before I reveal it",
      snippets: [
        { label: "Два клика ¦ Ikki bosish ¦ Two clicks", code: `const [n, setN] = useState(5);\n// click "+": setN(n + 1)\n// click "+": setN(n + 1)\n<p>{n}</p>`, output: ['7'], explain: "5 → 6 → 7: каждый клик — новый рендер с новым n. ¦ 5 → 6 → 7: har bir bosish — yangi n bilan yangi render. ¦ 5 → 6 → 7: every click is a new render with a new n." },
        { label: "Переключатель ¦ Almashtirgich ¦ A toggle", code: `const [on, setOn] = useState(false);\n// click: setOn(!on)  ×3\n<p>{on ? 'ON' : 'OFF'}</p>`, output: ['ON'], explain: "false → true → false → true. Нечётное число кликов — ON. ¦ false → true → false → true. Toq sonli bosish — ON. ¦ false → true → false → true. An odd number of clicks gives ON." },
      ],
      takeaway: "Экран всегда показывает текущее состояние. ¦ Ekran doim joriy holatni ko'rsatadi. ¦ The screen always shows the current state.",
      notes: { say: ["Сначала ответы чата."], min: 4 },
    },
    {
      type: 'bugs',
      stage: 3,
      title: "Найдите баг ¦ Xatoni toping ¦ Find the bug",
      chat: "номер строки с ошибкой ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Экран не обновляется ¦ Ekran yangilanmaydi ¦ The screen doesn't update", lang: 'js', code: `const [count, setCount] = useState(0);\n\nfunction add() {\n  count = count + 1;\n}`, line: 4, explain: "Состояние нельзя менять напрямую (и count — const). Только через setCount. ¦ Holatni to'g'ridan-to'g'ri o'zgartirib bo'lmaydi (va count — const). Faqat setCount orqali. ¦ You can't change state directly (and count is const). Only via setCount.", fix: `  setCount(count + 1);` },
        { title: "Бесконечный цикл ¦ Cheksiz tsikl ¦ An infinite loop", lang: 'js', code: `<button onClick={setCount(count + 1)}>\n  +\n</button>`, line: 1, explain: "setCount вызывается сразу при рендере → новый рендер → снова вызов… Нужна стрелочная функция. ¦ setCount render paytida darhol chaqiriladi → yangi render → yana chaqiruv… Strelkali funksiya kerak. ¦ setCount runs during render → re-render → runs again… Use an arrow function.", fix: `<button onClick={() => setCount(count + 1)}>` },
      ],
      takeaway: "Меняем только через setX — и передаём в onClick функцию, а не её вызов. ¦ Faqat setX orqali o'zgartiramiz — va onClick'ga funksiya chaqiruvini emas, funksiyaning o'zini beramiz. ¦ Change state only via setX, and give onClick a function, not a call.",
      notes: { say: ["Это та же ошибка с (), что была в DOM-уроке."], min: 5 },
    },
    {
      type: 'truefalse',
      stage: 3,
      title: "Правда или миф? ¦ Haqiqatmi yoki afsona? ¦ True or myth?",
      chat: "номер и «правда»/«миф» ¦ raqam va «haqiqat»/«afsona» ¦ number and “true”/“myth”",
      statements: [
        { text: "В одном компоненте можно несколько useState ¦ Bitta komponentda bir nechta useState bo'lishi mumkin ¦ A component can have several useState calls", truth: true, explain: "Мы только что сделали три. ¦ Biz hozirgina uchtasini qildik. ¦ We just made three." },
        { text: "useState можно вызвать внутри if ¦ useState'ni if ichida chaqirish mumkin ¦ You can call useState inside an if", truth: false, explain: "Хуки вызывают на верхнем уровне компонента, всегда в одном порядке. ¦ Xuklar komponentning yuqori darajasida, doim bir xil tartibda chaqiriladi. ¦ Hooks go at the component's top level, always in the same order." },
        { text: "У каждой копии компонента своё состояние ¦ Komponentning har bir nusxasining o'z holati bor ¦ Every copy of a component has its own state", truth: true, explain: "Два <Counter /> считают независимо. ¦ Ikkita <Counter /> mustaqil hisoblaydi. ¦ Two <Counter />s count independently." },
      ],
      takeaway: "Хуки — на верхнем уровне, и у каждого компонента своя память. ¦ Xuklar — yuqori darajada, har bir komponentning o'z xotirasi bor. ¦ Hooks stay at the top level, and each component has its own memory.",
      notes: { say: ["Голосуем по пунктам."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: кнопка «В избранное» ¦ Missiya: «Sevimlilarga» tugmasi ¦ Mission: a “Favourite” button",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Кнопка «В избранное» работает! ¦ «Sevimlilarga» tugmasi ishlaydi! ¦ The Favourite button works!",
      items: [
        { title: "Начальное состояние «не в избранном» ¦ «Sevimlilarda emas» boshlang'ich holati ¦ Initial state “not a favourite”", choices: ['useState(false)', 'useState("no")'], correct: 0, explain: "Да/нет — boolean. ¦ Ha/yo'q — boolean. ¦ Yes/no is a boolean." },
        { title: "Переключить по клику ¦ Bosganda almashtirish ¦ Toggle on click", choices: ["onClick={() => setFav(!fav)}", "onClick={fav = !fav}"], correct: 0, explain: "Через setFav и стрелку. ¦ setFav va strelka orqali. ¦ Via setFav and an arrow." },
        { title: "Показать ⭐ или ☆ ¦ ⭐ yoki ☆ ko'rsatish ¦ Show ⭐ or ☆", choices: ["{fav ? '⭐' : '☆'}", "{if (fav) '⭐'}"], correct: 0, explain: "В JSX — тернарный оператор, if там не работает. ¦ JSX'da — ternar operator, if u yerda ishlamaydi. ¦ JSX uses the ternary; if doesn't work there." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: useState ¦ Xulosa: useState ¦ Summary: useState",
      chat: "какое состояние есть в вашем любимом приложении? ¦ sevimli ilovangizda qanday holat bor? ¦ what state does your favourite app have?",
      answer: "useState даёт компоненту память: const [value, setValue] = useState(начальное). Менять состояние можно только через setValue — тогда React перерисует компонент с новым значением. Обычная переменная экран не обновит. В onClick передаём функцию: () => setCount(count + 1). Состояние может быть числом, строкой или true/false, а хуки вызываются на верхнем уровне компонента. ¦ useState komponentga xotira beradi: const [value, setValue] = useState(boshlang'ich). Holatni faqat setValue orqali o'zgartirish mumkin — shunda React komponentni yangi qiymat bilan qayta chizadi. Oddiy o'zgaruvchi ekranni yangilamaydi. onClick'ga funksiya beramiz: () => setCount(count + 1). Holat raqam, satr yoki true/false bo'lishi mumkin, xuklar esa komponentning yuqori darajasida chaqiriladi. ¦ useState gives a component memory: const [value, setValue] = useState(initial). Change it only through setValue, and React re-renders with the new value. A plain variable won't update the screen. Pass onClick a function: () => setCount(count + 1). State can be a number, string or boolean, and hooks are called at the component's top level.",
      icon: '🔄',
      badge: "Повелитель состояния ¦ Holat hukmdori ¦ State master",
      badgeSub: "React · техническая 2 ¦ React · texnik 2 ¦ React · technical 2",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Сделайте счётчик, который не уходит ниже 0 и выше 10. ¦ 0 dan past va 10 dan yuqori chiqmaydigan hisoblagich yarating. ¦ Make a counter that stays between 0 and 10.",
        "Добавьте поле ввода, которое показывает количество введённых символов. ¦ Kiritilgan belgilar sonini ko'rsatadigan kiritish maydonini qo'shing. ¦ Add an input that shows how many characters were typed.",
      ],
      takeaway: "Следующая тема — Todo-list на React: сравним с версией на обычном JS. ¦ Keyingi mavzu — React'dagi Todo-list: oddiy JS versiyasi bilan solishtiramiz. ¦ Next: a Todo list in React, compared with the plain JS version.",
      notes: { say: ["Итог."], min: 2 },
    },
  ],
});
