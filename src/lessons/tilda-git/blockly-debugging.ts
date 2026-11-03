import { kit } from '@engine/kit';

/** Code where each line is "ru ¦ uz ¦ en" → one whole block per language */
const blk = (s: string) =>
  [0, 1, 2]
    .map((i) =>
      s
        .split('\n')
        .map((line) => {
          const p = line.split('¦');
          return p.length < 3 ? line : (line.match(/^\s*/)?.[0] ?? '') + (p[i] ?? '').trim();
        })
        .join('\n'),
    )
    .join('\n¦\n');

const BUGGY = blk(`повторить 3 раза: ¦ 3 marta takrorla: ¦ repeat 3 times:
  шаг вперёд ¦ oldinga qadam ¦ move forward
повернуть налево ¦ chapga burilish ¦ turn left
повторить 2 раза: ¦ 2 marta takrorla: ¦ repeat 2 times:
  шаг вперёд ¦ oldinga qadam ¦ move forward`);

const IF_ELSE = blk(`повторять, пока не у цели: ¦ maqsadga yetguncha takrorla: ¦ repeat until at goal:
  если путь впереди: ¦ agar oldinda yo'l bo'lsa: ¦ if path ahead:
    шаг вперёд ¦ oldinga qadam ¦ move forward
  иначе: ¦ aks holda: ¦ else:
    повернуть направо ¦ oʻngga burilish ¦ turn right`);

export default kit({
  id: 'tilda-git-t07',
  title: "Отладка, Repeat и условия (Blockly) ¦ Debugging, Repeat va shartlar (Blockly) ¦ Debugging, Repeat and conditions (Blockly)",
  question: "Как найти ошибку в программе самому и научить её принимать решения? ¦ Dasturdagi xatoni qanday qilib o'zingiz topish va unga qaror qabul qilishni o'rgatish mumkin? ¦ How do you find a bug yourself and teach a program to make decisions?",
  route: ["Что такое баг ¦ Bug nima ¦ What a bug is", "Отладка ¦ Debugging ¦ Debugging", "Repeat ¦ Repeat ¦ Repeat", "if-else ¦ if-else ¦ if-else", "Финал ¦ Yakun ¦ Finale"],
  scenes: [
    {
      type: 'intro',
      stage: 0,
      icon: '🐞',
      kicker: "Tilda · Git · техническая тема 7 ¦ Tilda · Git · texnik mavzu 7 ¦ Tilda · Git · technical topic 7",
      title: "Робот врезался в стену ¦ Robot devorga urildi ¦ The robot hit a wall",
      chat: "почему программа может делать не то, что мы хотели? ¦ dastur nega biz xohlagan narsani qilmasligi mumkin? ¦ why might a program not do what we wanted?",
      lead: "Баг — ошибка в программе. Компьютер не ошибается: он точно выполняет то, что мы написали. Значит, ошибку ищем в своих шагах. ¦ Bug — dasturdagi xato. Kompyuter xato qilmaydi: u biz yozgan narsani aniq bajaradi. Demak, xatoni o'z qadamlarimizdan qidiramiz. ¦ A bug is a mistake in a program. The computer doesn't err: it does exactly what we wrote. So we look for the mistake in our own steps.",
      facts: [
        "Найти, где сломалось ¦ Qayerda buzilganini topish ¦ Find where it broke",
        "Понять почему ¦ Nima uchunligini tushunish ¦ Understand why",
        "Исправить и проверить ¦ Tuzatish va tekshirish ¦ Fix and re-test",
      ],
      takeaway: "Отладка — нормальная часть работы программиста, а не провал. ¦ Debugging — dasturchi ishining oddiy qismi, muvaffaqiyatsizlik emas. ¦ Debugging is a normal part of programming, not a failure.",
      notes: { say: ["Блоки здесь показаны текстом. Для живой отладки откройте Blockly-лабиринт."], switch: "Blockly ¦ Blockly ¦ Blockly", min: 3 },
    },
    {
      type: 'flow',
      stage: 1,
      title: "4 шага отладки ¦ Debuggingning 4 qadami ¦ 4 steps of debugging",
      chat: "какой шаг новички чаще всего пропускают? ¦ yangi boshlovchilar qaysi qadamni ko'proq o'tkazib yuborishadi? ¦ which step do beginners skip most?",
      nodes: [
        { icon: '▶️', label: "Запустить ¦ Ishga tushirish ¦ Run", text: "Смотрим, что делает программа на самом деле. ¦ Dastur aslida nima qilayotganiga qaraymiz. ¦ Watch what the program actually does." },
        { icon: '📍', label: "Найти место ¦ Joyni topish ¦ Locate", text: "На каком шаге робот свернул не туда? ¦ Robot qaysi qadamda noto'g'ri burildi? ¦ At which step did the robot go wrong?" },
        { icon: '🧠', label: "Понять причину ¦ Sababni tushunish ¦ Understand", text: "Не тот блок? Не то число? Не тот порядок? ¦ Noto'g'ri blokmi? Noto'g'ri raqammi? Noto'g'ri tartibmi? ¦ Wrong block? Wrong number? Wrong order?" },
        { icon: '✅', label: "Исправить и запустить ¦ Tuzatish va ishga tushirish ¦ Fix and re-run", text: "Меняем одно — и снова проверяем. ¦ Bittasini o'zgartiramiz — va yana tekshiramiz. ¦ Change one thing and test again." },
      ],
      takeaway: "Меняйте по одной вещи за раз — так понятно, что именно помогло. ¦ Bir vaqtda bitta narsani o'zgartiring — shunda aynan nima yordam bergani tushunarli. ¦ Change one thing at a time so you know what helped.",
      notes: { say: ["Частый пропуск — шаг 3: меняют блоки наугад, не понимая причину."], min: 4 },
    },
    {
      type: 'walk',
      stage: 1,
      title: "Отладка по шагам ¦ Qadamma-qadam debugging ¦ Debugging step by step",
      chat: "на какой строке ошибка? ¦ xato qaysi qatorda? ¦ which line has the bug?",
      code: BUGGY,
      lang: 'text',
      marks: [
        { line: 1, text: "Робот проходит 3 клетки — до поворота как раз 3. Пока всё хорошо. ¦ Robot 3 katak yuradi — burilishgacha aynan 3 ta. Hozircha hammasi yaxshi. ¦ The robot walks 3 cells — exactly 3 to the turn. All good so far." },
        { line: 3, text: "А дорога поворачивает направо! Здесь баг: «налево» → «направо». ¦ Yo'l esa o'ngga buriladi! Xato shu yerda: «chapga» → «o'ngga». ¦ But the road turns right! Here's the bug: “left” → “right”." },
        { line: 4, text: "После исправления проверяем дальше: 2 шага до звезды — верно. ¦ Tuzatgandan keyin davom etib tekshiramiz: yulduzgacha 2 qadam — to'g'ri. ¦ After the fix, keep checking: 2 steps to the star — correct." },
      ],
      takeaway: "Проходите программу по строкам и сравнивайте с тем, что видите на поле. ¦ Dasturni qatorma-qator o'ting va maydonda ko'rganingiz bilan solishtiring. ¦ Step through the program line by line and compare with the board.",
      notes: { say: ["В Blockly включите медленную скорость выполнения — так видно каждый шаг."], min: 5 },
    },
    {
      type: 'bugs',
      stage: 2,
      title: "Найдите баг в Repeat ¦ Repeat'dagi xatoni toping ¦ Find the bug in Repeat",
      chat: "номер строки с багом ¦ xatoli qator raqami ¦ the line number with the bug",
      snippets: [
        { title: "Квадрат не замкнулся ¦ Kvadrat yopilmadi ¦ The square isn't closed", lang: 'js', code: `for (let side = 1; side <= 3; side++) {\n  forward(100);\n  turnRight(90);\n}`, line: 1, explain: "У квадрата 4 стороны, а цикл повторяется 3 раза. ¦ Kvadratning 4 tomoni bor, tsikl esa 3 marta takrorlanadi. ¦ A square has 4 sides, but the loop runs 3 times.", fix: `for (let side = 1; side <= 4; side++) {` },
        { title: "Лишний поворот внутри ¦ Ichkarida ortiqcha burilish ¦ An extra turn inside", lang: 'js', code: `for (let i = 1; i <= 5; i++) {\n  forward(1);\n  turnRight();\n}`, line: 3, explain: "Робот должен пройти 5 клеток прямо, но поворачивает на каждом шаге и крутится на месте. Поворот нужно вынести из цикла. ¦ Robot 5 katak to'g'ri yurishi kerak, lekin har qadamda buriladi va joyida aylanadi. Burilishni tsikldan chiqarish kerak. ¦ The robot should walk 5 cells straight but turns every step and spins. Move the turn out of the loop.", fix: `for (let i = 1; i <= 5; i++) {\n  forward(1);\n}\nturnRight();` },
      ],
      takeaway: "Два частых бага с повтором: неверное число раз и лишний блок внутри. ¦ Takror bilan bog'liq ikki keng tarqalgan xato: noto'g'ri takrorlash soni va ichkaridagi ortiqcha blok. ¦ Two classic repeat bugs: the wrong count and an extra block inside.",
      notes: { say: ["forward/turnRight — условные команды робота (как блоки), не встроенный JS."], min: 5 },
    },
    {
      type: 'compare',
      stage: 3,
      title: "Программа, которая думает ¦ O'ylaydigan dastur ¦ A program that thinks",
      chat: "какая программа пройдёт любой лабиринт? ¦ qaysi dastur istalgan labirintdan o'tadi? ¦ which program can solve any maze?",
      left: { icon: '📜', label: "Жёсткий маршрут ¦ Qat'iy marshrut ¦ A fixed route", code: BUGGY, lang: 'text' },
      right: { icon: '🧠', label: "С условием ¦ Shart bilan ¦ With a condition", code: IF_ELSE, lang: 'text' },
      verdict: "Слева программа работает только для одного лабиринта. Справа робот смотрит, есть ли путь, и сам решает, что делать. ¦ Chapdagi dastur faqat bitta labirint uchun ishlaydi. O'ngda robot yo'l bormi-yo'qmi qaraydi va o'zi qaror qiladi. ¦ The left one works for a single maze. On the right the robot checks for a path and decides itself.",
      notes: { say: ["→ — правая колонка. В Blockly: «повторять до» + «если — иначе»."], min: 4 },
    },
    {
      type: 'live',
      stage: 3,
      console: true,
      title: "if-else на JavaScript ¦ JavaScript'da if-else ¦ if-else in JavaScript",
      chat: "что поменять в карте, чтобы робот повернул 2 раза? ¦ robot 2 marta burilishi uchun xaritada nimani o'zgartirish kerak? ¦ what map change makes the robot turn twice?",
      task: "✍️ Меняйте массив path: 1 — дорога, 0 — стена ¦ ✍️ path massivini o'zgartiring: 1 — yo'l, 0 — devor ¦ ✍️ Edit the path array: 1 is road, 0 is wall",
      steps: [
        { label: "if-else ¦ if-else ¦ if-else", js: `const path = [1, 1, 0, 1, 1];\n\nfor (let i = 0; i < path.length; i++) {\n  if (path[i] === 1) {\n    console.log(i + ': 🤖 move forward');\n  } else {\n    console.log(i + ': ↪️ wall! turn right');\n  }\n}` },
        { label: "+ цель ¦ + maqsad ¦ + goal", js: `const path = [1, 1, 0, 1, 2];\n\nfor (let i = 0; i < path.length; i++) {\n  if (path[i] === 2) {\n    console.log(i + ': ⭐ goal reached!');\n  } else if (path[i] === 1) {\n    console.log(i + ': 🤖 move forward');\n  } else {\n    console.log(i + ': ↪️ wall! turn right');\n  }\n}` },
      ],
      takeaway: "Блок «если — иначе» в Blockly = if / else в JavaScript. Repeat + условие = программа, которая сама принимает решения. ¦ Blockly'dagi «agar — aks holda» bloki = JavaScript'dagi if / else. Repeat + shart = o'zi qaror qabul qiladigan dastur. ¦ Blockly's “if — else” = JavaScript's if / else. Repeat + a condition = a program that decides for itself.",
      notes: { say: ["Попросите чат придумать карту: 1/0/2, и запустите."], min: 6 },
    },
    {
      type: 'output',
      stage: 3,
      title: "Что решит программа? ¦ Dastur nimani hal qiladi? ¦ What will the program decide?",
      chat: "пишите ответ до того, как я покажу ¦ men ko'rsatishimdan oldin javob yozing ¦ write your answer before I reveal it",
      snippets: [
        { label: "Погода ¦ Ob-havo ¦ Weather", code: `const rain = true;\nif (rain) {\n  console.log('☂️ take an umbrella');\n} else {\n  console.log('😎 sunglasses');\n}`, output: ['☂️ take an umbrella'], explain: "rain = true — выполняется первая ветка. ¦ rain = true — birinchi tarmoq bajariladi. ¦ rain is true, so the first branch runs." },
        { label: "Повтор + условие ¦ Takror + shart ¦ Repeat + condition", code: `for (let i = 1; i <= 4; i++) {\n  if (i % 2 === 0) {\n    console.log(i + ' even');\n  } else {\n    console.log(i + ' odd');\n  }\n}`, output: ['1 odd', '2 even', '3 odd', '4 even'], explain: "Условие проверяется на каждом проходе цикла. ¦ Shart tsiklning har bir o'tishida tekshiriladi. ¦ The condition is checked on every pass." },
      ],
      takeaway: "Условие внутри повтора проверяется каждый раз заново. ¦ Takror ichidagi shart har safar qaytadan tekshiriladi. ¦ A condition inside a repeat is checked each time.",
      notes: { say: ["Сначала ответы чата, потом раскрываем."], min: 4 },
    },
    {
      type: 'sort',
      stage: 3,
      title: "Repeat или if-else? ¦ Repeat'mi yoki if-else? ¦ Repeat or if-else?",
      chat: "пишите: «1 — repeat» ¦ yozing: «1 — repeat» ¦ write: “1 — repeat”",
      zones: [
        { id: 'repeat', label: "Repeat ¦ Repeat ¦ Repeat", icon: '🔁' },
        { id: 'if', label: "if-else ¦ if-else ¦ if-else", icon: '🔀' },
      ],
      items: [
        { text: "Пройти 10 клеток вперёд ¦ 10 katak oldinga yurish ¦ Walk 10 cells forward", zone: 'repeat' },
        { text: "Если стена — повернуть ¦ Devor bo'lsa — burilish ¦ If there's a wall, turn", zone: 'if' },
        { text: "Нарисовать 6 звёзд ¦ 6 ta yulduz chizish ¦ Draw 6 stars", zone: 'repeat' },
        { text: "Если пароль верный — войти, иначе — ошибка ¦ Parol to'g'ri bo'lsa — kirish, aks holda — xato ¦ If the password is right, log in; else show an error", zone: 'if' },
      ],
      takeaway: "Repeat — когда делаем одно и то же много раз. if-else — когда выбираем между вариантами. ¦ Repeat — bir xil ishni ko'p marta qilganda. if-else — variantlar orasidan tanlaganda. ¦ Repeat when doing the same thing many times; if-else when choosing between options.",
      notes: { say: ["Раскладка → «Проверить»."], min: 3 },
    },
    {
      type: 'mission',
      stage: 4,
      title: "Миссия: робот-исследователь ¦ Missiya: tadqiqotchi robot ¦ Mission: the explorer robot",
      chat: "номера ответов в чат ¦ javob raqamlarini chatga ¦ answer numbers in the chat",
      goal: "Робот прошёл неизвестный лабиринт! ¦ Robot noma'lum labirintdan o'tdi! ¦ The robot solved an unknown maze!",
      items: [
        { title: "Робот врезался. Первый шаг: ¦ Robot urildi. Birinchi qadam: ¦ The robot crashed. First step:", choices: ["Найти, на каком блоке ¦ Qaysi blokda ekanini topish ¦ Find which block", "Удалить всю программу ¦ Butun dasturni o'chirish ¦ Delete the whole program"], correct: 0, explain: "Сначала место, потом причина. ¦ Avval joy, keyin sabab. ¦ Location first, then cause." },
        { title: "Квадрат не замкнулся ¦ Kvadrat yopilmadi ¦ The square isn't closed", choices: ["Повторить 4, а не 3 ¦ 3 emas, 4 marta takrorlash ¦ Repeat 4, not 3", "Добавить ещё одну стену ¦ Yana bitta devor qo'shish ¦ Add another wall"], correct: 0, explain: "4 стороны — 4 повтора. ¦ 4 tomon — 4 takror. ¦ 4 sides, 4 repeats." },
        { title: "Лабиринт каждый раз разный ¦ Labirint har safar har xil ¦ The maze changes every time", choices: ["Жёсткий маршрут ¦ Qat'iy marshrut ¦ A fixed route", "Repeat + if-else ¦ Repeat + if-else ¦ Repeat + if-else"], correct: 1, explain: "Программа смотрит и решает. ¦ Dastur qaraydi va qaror qiladi. ¦ The program looks and decides." },
      ],
      notes: { say: ["Ответы чата → «Проверить»."], min: 3 },
    },
    {
      type: 'finale',
      stage: 4,
      title: "Итог: отладка и условия ¦ Xulosa: debugging va shartlar ¦ Summary: debugging and conditions",
      chat: "какой самый смешной баг у вас был? ¦ sizda eng kulgili bug qanday bo'lgan? ¦ what's the funniest bug you've had?",
      answer: "Отладка — это 4 шага: запустить, найти место, понять причину, исправить и проверить снова, меняя по одной вещи. Repeat повторяет блоки нужное число раз — частые баги в нём: не то число и лишний блок внутри. if-else позволяет программе выбирать, а Repeat + условие делает робота, который сам проходит любой лабиринт. ¦ Debugging — 4 qadam: ishga tushirish, joyni topish, sababni tushunish, tuzatish va bittadan o'zgartirib qayta tekshirish. Repeat bloklarni kerakli marta takrorlaydi — undagi keng tarqalgan xatolar: noto'g'ri son va ichkaridagi ortiqcha blok. if-else dasturga tanlash imkonini beradi, Repeat + shart esa istalgan labirintdan o'zi o'tadigan robotni yaratadi. ¦ Debugging is 4 steps: run, locate, understand, fix and re-test, one change at a time. Repeat runs blocks a set number of times; its classic bugs are the wrong count and an extra block inside. if-else lets a program choose, and Repeat + a condition makes a robot that solves any maze on its own.",
      icon: '🐞',
      badge: "Охотник за багами ¦ Bug ovchisi ¦ Bug hunter",
      badgeSub: "Tilda · Git · техническая 7 ¦ Tilda · Git · texnik 7 ¦ Tilda · Git · technical 7",
      homeworkTitle: "Дома ¦ Uyda ¦ At home",
      homework: [
        "Пройдите в Blockly-лабиринте уровни с «если — иначе» и «повторять до». ¦ Blockly labirintida «agar — aks holda» va «...guncha takrorla» darajalarini o'ting. ¦ Beat the Blockly maze levels with “if — else” and “repeat until”.",
        "Сделайте в программе специальный баг, дайте другу найти его и запишите, сколько времени ушло. ¦ Dasturda ataylab xato qiling, do'stingizga topishni bering va qancha vaqt ketganini yozib qo'ying. ¦ Plant a bug in a program, have a friend find it, and note how long it took.",
      ],
      takeaway: "Модуль Tilda и Git пройден! Дальше — JavaScript: оживляем сайты. ¦ Tilda va Git moduli tugadi! Keyingisi — JavaScript: saytlarni jonlantiramiz. ¦ The Tilda and Git module is done! Next: JavaScript — bringing sites to life.",
      notes: { say: ["Итог модуля."], min: 2 },
    },
  ],
});
