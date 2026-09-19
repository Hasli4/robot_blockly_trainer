/* Тренажёр «Робот и условные команды». */

const TASKS = [
  {
    title: "Стена впереди",
    description: "Робот идёт к финишу, но дорогу ему преградила стена. Нужно заметить её вовремя и свернуть.",
    goal: "Доберись до финиша. Когда перед роботом окажется стена, он должен повернуть.",
    hint: "Не нужно сворачивать сразу. Сначала робот должен подойти к стене. Как он поймёт, что дальше идти нельзя?",
    width: 6, height: 4,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 2, y: 2 },
    walls: [[3, 1]], cargo: [], expectedPicked: [],
    requiredBlocks: ["robot_if", "front_is_wall"]
  },
  {
    title: "Свободный поворот",
    description: "Перед роботом тоже есть стена. На этот раз свободная дорога находится слева.",
    goal: "Дойди до финиша и поверни только тогда, когда впереди будет стена.",
    hint: "Стена появится не в самом начале. Подумай, в какой момент роботу надо проверить дорогу и куда потом можно повернуть.",
    width: 8, height: 4,
    start: { x: 4, y: 2, dir: "east" },
    finish: { x: 5, y: 1 },
    walls: [[6, 2]], cargo: [], expectedPicked: [],
    requiredBlocks: ["robot_if", "front_is_wall"]
  },
  {
    title: "Проверь груз",
    description: "Рядом лежит груз, но робот пока не знает его цвет. Сначала надо проверить, зелёный ли он. Потом уже решать, брать или нет.",
    goal: "Проверь груз, возьми его и дойди до финиша.",
    hint: "Условие похоже на вопрос. Действие с грузом должно произойти только после ответа «да».",
    width: 7, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 5, y: 1 },
    walls: [],
    cargo: [{ id: "c3", x: 1, y: 1, color: "green", verificationRequired: true }],
    expectedPicked: ["c3"],
    requiredBlocks: ["robot_if", "cargo_is_color"],
    requiresVerification: "c3"
  },
  {
    title: "Зелёный конвейер",
    description: "По дорожке лежат грузы разных цветов. Роботу нужны только зелёные. Блоков мало, так что длинную программу собрать не получится.",
    goal: "Собери все зелёные грузы и уложись в 5 блоков.",
    hint: "На каждой клетке робот делает почти одно и то же: смотрит на груз, а потом едет дальше. Если действие всё время повторяется, что может его сократить?",
    width: 8, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 6, y: 1 },
    walls: [],
    cargo: [
      { id: "c4g1", x: 1, y: 1, color: "green" },
      { id: "c4r", x: 2, y: 1, color: "red" },
      { id: "c4g2", x: 3, y: 1, color: "green" },
      { id: "c4b", x: 4, y: 1, color: "blue" },
      { id: "c4g3", x: 5, y: 1, color: "green" }
    ],
    expectedPicked: ["c4g1", "c4g2", "c4g3"],
    requiredBlocks: ["robot_if", "cargo_is_color", "robot_repeat"],
    requiredNesting: [{ parent: "robot_repeat", child: "robot_if" }],
    blockLimits: { robot_if: 1, cargo_is_color: 1, robot_repeat: 1, move_forward: 1, take_cargo: 1 },
    maxBlocks: 5
  },
  {
    title: "Только синие",
    description: "Робот едет по прямой дорожке. Среди грузов есть синие и не синие. Брать можно только синие.",
    goal: "Собери все синие грузы и доедь до финиша.",
    hint: "На каждой клетке робот отвечает на один и тот же вопрос: брать груз или оставить. Одинаковые действия подряд удобно повторять.",
    width: 9, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 7, y: 1 },
    walls: [],
    cargo: [
      { id: "c5r", x: 1, y: 1, color: "red" },
      { id: "c5b1", x: 2, y: 1, color: "blue" },
      { id: "c5y", x: 4, y: 1, color: "yellow" },
      { id: "c5b2", x: 6, y: 1, color: "blue" }
    ],
    expectedPicked: ["c5b1", "c5b2"],
    requiredBlocks: ["robot_if", "cargo_is_color", "robot_repeat"],
    requiredNesting: [{ parent: "robot_repeat", child: "robot_if" }]
  },
  {
    title: "Красный или зелёный",
    description: "Теперь роботу нужны грузы двух цветов: красные и зелёные. Синие и жёлтые пусть лежат дальше, им сегодня повезло.",
    goal: "Собери красные и зелёные грузы и доедь до финиша.",
    hint: "Одного вопроса про цвет тут мало. Попробуй соединить два вопроса так, чтобы подошёл красный груз или зелёный.",
    width: 9, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 7, y: 1 },
    walls: [],
    cargo: [
      { id: "c6r1", x: 1, y: 1, color: "red" },
      { id: "c6b", x: 2, y: 1, color: "blue" },
      { id: "c6g", x: 3, y: 1, color: "green" },
      { id: "c6y", x: 5, y: 1, color: "yellow" },
      { id: "c6r2", x: 6, y: 1, color: "red" }
    ],
    expectedPicked: ["c6r1", "c6g", "c6r2"],
    requiredBlocks: ["robot_if", "cargo_is_color", "robot_repeat", "logic_or"],
    requiredNesting: [{ parent: "robot_repeat", child: "robot_if" }],
    allowLogic: true
  },
  {
    title: "Красные грузы под стеной",
    description: "На дорожке семь грузов. Нужны только красные грузы, над которыми стоит препятствие. Среди красных есть один лишний: над ним свободно.",
    goal: "Собери красные грузы, над которыми есть препятствие, и дойди до финиша.",
    hint: "На каждой клетке робот сначала делает шаг. Потом он должен ответить на два вопроса: груз красный и есть ли препятствие сверху. Подходят только грузы с двумя ответами «да».",
    width: 9, height: 5,
    start: { x: 0, y: 2, dir: "east" },
    finish: { x: 7, y: 2 },
    walls: [[2, 1], [4, 1], [6, 1]],
    cargo: [
      { id: "c7b", x: 1, y: 2, color: "blue" },
      { id: "c7r1", x: 2, y: 2, color: "red" },
      { id: "c7g", x: 3, y: 2, color: "green" },
      { id: "c7r2", x: 4, y: 2, color: "red" },
      { id: "c7r3", x: 5, y: 2, color: "red" },
      { id: "c7r4", x: 6, y: 2, color: "red" },
      { id: "c7y", x: 7, y: 2, color: "yellow" }
    ],
    expectedPicked: ["c7r1", "c7r2", "c7r4"],
    requiredBlocks: ["robot_if", "cargo_is_color", "front_is_wall", "robot_repeat", "logic_and"],
    requiredNesting: [
      { parent: "robot_repeat", child: "move_forward" },
      { parent: "robot_repeat", child: "robot_if" }
    ],
    requiredRepeatTimes: [7],
    requiredConditionCombination: {
      operator: "logic_and",
      predicates: [
        { type: "cargo_is_color", color: "red" },
        { type: "front_is_wall", position: "above" }
      ]
    },
    blockLimits: { robot_repeat: 1, move_forward: 1, robot_if: 1, logic_and: 1, cargo_is_color: 1, front_is_wall: 1, take_cargo: 1 },
    maxBlocks: 7,
    allowLogic: true
  },
  {
    title: "Три стороны маршрута",
    description: "Робот проходит три стороны квадратной дорожки. На каждой стороне он делает три шага, потом поворачивает направо. Нужны только синие грузы.",
    goal: "Собери синие грузы с помощью цикла внутри цикла.",
    hint: "Сначала придумай маленький цикл из трёх шагов. Затем положи его в большой цикл, который повторяет целую сторону маршрута.",
    width: 6, height: 6,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 1, y: 4 },
    walls: [],
    cargo: [
      { id: "c8b1", x: 2, y: 1, color: "blue" },
      { id: "c8r", x: 3, y: 1, color: "red" },
      { id: "c8b2", x: 4, y: 1, color: "blue" },
      { id: "c8g", x: 4, y: 2, color: "green" },
      { id: "c8b3", x: 4, y: 3, color: "blue" },
      { id: "c8y", x: 4, y: 4, color: "yellow" },
      { id: "c8b4", x: 3, y: 4, color: "blue" },
      { id: "c8r2", x: 2, y: 4, color: "red" },
      { id: "c8b5", x: 1, y: 4, color: "blue" }
    ],
    expectedPicked: ["c8b1", "c8b2", "c8b3", "c8b4", "c8b5"],
    requiredBlocks: ["robot_if", "cargo_is_color", "robot_repeat", "move_forward", "turn_right"],
    requiredNesting: [
      { parent: "robot_repeat", child: "robot_repeat" },
      { parent: "robot_repeat", child: "robot_if" },
      { parent: "robot_repeat", child: "move_forward" }
    ],
    requiredRepeatTimes: [3, 3],
    requiredPredicates: [{ type: "cargo_is_color", color: "blue" }],
    blockLimits: { robot_repeat: 2, move_forward: 1, robot_if: 1, cargo_is_color: 1, take_cargo: 1, turn_right: 1 },
    maxBlocks: 7
  },
  {
    title: "Два цвета на маршруте",
    description: "Робот снова проходит три стороны квадратной дорожки. Теперь ему нужны зелёные и красные грузы. Синие и жёлтые оставь на месте.",
    goal: "Собери зелёные и красные грузы с помощью двух вложенных циклов.",
    hint: "Один вопрос про цвет здесь не справится. Соедини проверку зелёного и красного груза словом «или», а маршрут собери так же, как в прошлой задаче.",
    width: 6, height: 5,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 1, y: 4 },
    walls: [],
    cargo: [
      { id: "c9g1", x: 2, y: 1, color: "green" },
      { id: "c9b", x: 3, y: 1, color: "blue" },
      { id: "c9r1", x: 4, y: 1, color: "red" },
      { id: "c9y", x: 4, y: 2, color: "yellow" },
      { id: "c9g2", x: 4, y: 3, color: "green" },
      { id: "c9r2", x: 4, y: 4, color: "red" },
      { id: "c9y2", x: 3, y: 4, color: "yellow" },
      { id: "c9r3", x: 2, y: 4, color: "red" },
      { id: "c9g3", x: 1, y: 4, color: "green" }
    ],
    expectedPicked: ["c9g1", "c9r1", "c9g2", "c9r2", "c9r3", "c9g3"],
    requiredBlocks: ["robot_if", "cargo_is_color", "robot_repeat", "move_forward", "turn_right", "logic_or"],
    requiredNesting: [
      { parent: "robot_repeat", child: "robot_repeat" },
      { parent: "robot_repeat", child: "robot_if" },
      { parent: "robot_repeat", child: "move_forward" }
    ],
    requiredRepeatTimes: [3, 3],
    requiredConditionCombination: {
      operator: "logic_or",
      predicates: [
        { type: "cargo_is_color", color: "green" },
        { type: "cargo_is_color", color: "red" }
      ]
    },
    blockLimits: { robot_repeat: 2, move_forward: 1, robot_if: 1, logic_or: 1, cargo_is_color: 2, take_cargo: 1, turn_right: 1 },
    maxBlocks: 9,
    allowLogic: true
  },
  {
    title: "Финальный маршрут",
    description: "Последняя дорога: повороты, стены и грузы. Роботу нужны только зелёные, остальные он оставит на месте.",
    goal: "Собери зелёные грузы и доедь до финиша.",
    hint: "Вспомни, какие две проверки уже помогали раньше: одна — про груз, другая — про стену. Их нужно повторять по дороге.",
    width: 6, height: 5,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 1, y: 3 },
    walls: [[5, 1], [4, 4]],
    cargo: [
      { id: "c10g1", x: 3, y: 1, color: "green" },
      { id: "c10r", x: 4, y: 2, color: "red" },
      { id: "c10g2", x: 2, y: 3, color: "green" }
    ],
    expectedPicked: ["c10g1", "c10g2"],
    requiredBlocks: ["robot_if", "cargo_is_color", "front_is_wall", "robot_repeat"],
    requiredNesting: [{ parent: "robot_repeat", child: "robot_if" }],
    allowLogic: true
  }
];

const DIRS = ["north", "east", "south", "west"];
const DELTA = {
  north: { dx: 0, dy: -1 },
  east: { dx: 1, dy: 0 },
  south: { dx: 0, dy: 1 },
  west: { dx: -1, dy: 0 }
};
const COLOR_NAMES = { green: "зелёный", red: "красный", blue: "синий", yellow: "жёлтый" };
const OBSTACLE_POSITION_NAMES = {
  front: "впереди",
  above: "сверху",
  right: "справа",
  below: "снизу",
  left: "слева"
};
const CODE_STORAGE_KEY = "robotBlocklyCodeByTaskV2";
const LAST_TASK_STORAGE_KEY = "robotBlocklyLastTaskV2";
const COMPLETED_STORAGE_KEY = "robotBlocklyCompletedV2";

let currentTaskIndex = 0;
let workspace = null;
let currentState = null;
let isRunning = false;
let isLoadingTask = false;
let completedTasks = loadJson(COMPLETED_STORAGE_KEY, {});
let failedAttempts = {};
const ROBOT_WORLD_CELL_SIZES = [38, 42, 46, 50, 54, 58];
let robotWorldZoomIndex = 2;

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function getSavedPrograms() {
  return loadJson(CODE_STORAGE_KEY, {});
}

function saveCurrentProgram() {
  if (!workspace) return;
  const programs = getSavedPrograms();
  programs[currentTaskIndex] = Blockly.serialization.workspaces.save(workspace);
  localStorage.setItem(CODE_STORAGE_KEY, JSON.stringify(programs));
  localStorage.setItem(LAST_TASK_STORAGE_KEY, String(currentTaskIndex));
}

function clearCode() {
  if (!workspace || isRunning) return;
  workspace.clear();
  const programs = getSavedPrograms();
  delete programs[currentTaskIndex];
  localStorage.setItem(CODE_STORAGE_KEY, JSON.stringify(programs));
  showMessage("Код очищен. Собери программу из блоков.", "info");
}

function resizeBlocklyForConditionPanel() {
  requestAnimationFrame(function () {
    if (workspace) Blockly.svgResize(workspace);
  });
}

function setConditionWorldPanelHeight(nextHeight) {
  const column = document.getElementById("conditionCenterColumn");
  const resizer = document.getElementById("conditionPanelResizer");
  const minimumCodeHeight = 270;
  const maximumWorldHeight = Math.max(
    260,
    column.clientHeight - minimumCodeHeight - resizer.offsetHeight
  );
  const minimumWorldHeight = Math.min(340, maximumWorldHeight);
  const height = Math.round(
    Math.max(minimumWorldHeight, Math.min(maximumWorldHeight, nextHeight))
  );

  column.style.setProperty("--conditions-world-height", height + "px");
  resizer.setAttribute("aria-valuemin", String(minimumWorldHeight));
  resizer.setAttribute("aria-valuemax", String(maximumWorldHeight));
  resizer.setAttribute("aria-valuenow", String(height));
  resizer.setAttribute("aria-valuetext", "Высота поля: " + height + " пикселей");
  resizeBlocklyForConditionPanel();
}

function initConditionPanelResizer() {
  const column = document.getElementById("conditionCenterColumn");
  const resizer = document.getElementById("conditionPanelResizer");
  const worldPanel = document.querySelector(".conditions-page .world-panel");
  let activePointerId = null;

  function currentWorldHeight() {
    return worldPanel.getBoundingClientRect().height;
  }

  function resizeFromPointer(clientY) {
    setConditionWorldPanelHeight(
      clientY - column.getBoundingClientRect().top
    );
  }

  resizer.addEventListener("pointerdown", function (event) {
    activePointerId = event.pointerId;
    resizer.setPointerCapture(activePointerId);
    resizer.classList.add("is-dragging");
    document.body.classList.add("is-resizing-condition-panels");
    resizeFromPointer(event.clientY);
  });

  resizer.addEventListener("pointermove", function (event) {
    if (event.pointerId === activePointerId) resizeFromPointer(event.clientY);
  });

  function stopResizing(event) {
    if (event.pointerId !== activePointerId) return;
    activePointerId = null;
    resizer.classList.remove("is-dragging");
    document.body.classList.remove("is-resizing-condition-panels");
  }

  resizer.addEventListener("pointerup", stopResizing);
  resizer.addEventListener("pointercancel", stopResizing);
  resizer.addEventListener("lostpointercapture", function () {
    activePointerId = null;
    resizer.classList.remove("is-dragging");
    document.body.classList.remove("is-resizing-condition-panels");
  });

  resizer.addEventListener("keydown", function (event) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    setConditionWorldPanelHeight(
      currentWorldHeight() + (event.key === "ArrowUp" ? 40 : -40)
    );
  });

  window.addEventListener("resize", function () {
    if (column.style.getPropertyValue("--conditions-world-height")) {
      setConditionWorldPanelHeight(currentWorldHeight());
    } else {
      resizeBlocklyForConditionPanel();
    }
  });
}

function updateRobotWorldZoom() {
  const world = document.getElementById("world");
  const zoomOut = document.getElementById("worldZoomOutBtn");
  const zoomIn = document.getElementById("worldZoomInBtn");

  world.style.setProperty(
    "--robot-world-cell",
    ROBOT_WORLD_CELL_SIZES[robotWorldZoomIndex] + "px"
  );
  zoomOut.disabled = robotWorldZoomIndex === 0;
  zoomIn.disabled = robotWorldZoomIndex === ROBOT_WORLD_CELL_SIZES.length - 1;
}

function changeRobotWorldZoom(delta) {
  const nextIndex = Math.max(
    0,
    Math.min(
      ROBOT_WORLD_CELL_SIZES.length - 1,
      robotWorldZoomIndex + delta
    )
  );

  if (nextIndex === robotWorldZoomIndex) return;

  robotWorldZoomIndex = nextIndex;
  updateRobotWorldZoom();
}

function cloneTaskState(task) {
  return {
    x: task.start.x,
    y: task.start.y,
    dir: task.start.dir,
    picked: {},
    verified: {},
    wrongPickup: false,
    unverifiedPickup: false,
    halted: false
  };
}

function isWall(task, x, y) {
  return x < 0 || y < 0 || x >= task.width || y >= task.height ||
    task.walls.some(function (wall) { return wall[0] === x && wall[1] === y; });
}

function getCargoAt(task, state) {
  return task.cargo.find(function (cargo) {
    return cargo.x === state.x && cargo.y === state.y && !state.picked[cargo.id];
  });
}

function getCargoById(task, id) {
  return task.cargo.find(function (cargo) { return cargo.id === id; });
}

function showMessage(text, type) {
  const box = document.getElementById("messageBox");
  box.className = "message-box" + (type ? " " + type : "");
  box.textContent = text;
}

function setStatus(text, type) {
  const status = document.getElementById("runStatus");
  status.className = "status " + (type || "idle");
  status.textContent = text;
}

function renderWorld() {
  const task = TASKS[currentTaskIndex];
  const state = currentState || cloneTaskState(task);
  const world = document.getElementById("world");
  const grid = document.createElement("div");
  grid.className = "grid";
  grid.style.gridTemplateColumns = "repeat(" + task.width + ", var(--cell))";

  for (let y = 0; y < task.height; y += 1) {
    for (let x = 0; x < task.width; x += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if (isWall(task, x, y)) cell.classList.add("wall");
      if (x === task.finish.x && y === task.finish.y) {
        cell.classList.add("finish");
        const finish = document.createElement("div");
        finish.className = "finish-mark";
        finish.textContent = "🏁";
        cell.appendChild(finish);
      }

      const cargo = task.cargo.find(function (item) {
        return item.x === x && item.y === y && !state.picked[item.id];
      });
      if (cargo) {
        const cargoElement = document.createElement("div");
        const unverified = cargo.verificationRequired && !state.verified[cargo.id];
        cargoElement.className = "cargo " + (unverified ? "unverified" : cargo.color);
        cargoElement.title = unverified ? "цвет ещё не проверен" : COLOR_NAMES[cargo.color];
        cargoElement.textContent = unverified ? "?" : "";
        cell.appendChild(cargoElement);
      }

      if (x === state.x && y === state.y) {
        const robot = document.createElement("div");
        robot.className = "robot " + state.dir;
        const image = document.createElement("img");
        image.className = "robot-image";
        image.src = "robot.png";
        image.alt = "Робот";
        image.addEventListener("error", function () {
          robot.classList.add("robot-image-missing");
        });
        robot.appendChild(image);
        cell.appendChild(robot);
      }
      grid.appendChild(cell);
    }
  }
  world.replaceChildren(grid);
}

function setHintVisible(visible) {
  const hint = document.getElementById("hintText");
  hint.classList.toggle("hidden", !visible);
  document.getElementById("hintBtn").textContent = visible ? "Скрыть подсказку" : "Показать подсказку";
}

function updateHintAvailability() {
  const canShow = (failedAttempts[currentTaskIndex] || 0) >= 3;
  document.getElementById("hintBox").classList.toggle("hidden", !canShow);
  if (!canShow) setHintVisible(false);
}

function updateTaskUI() {
  const task = TASKS[currentTaskIndex];
  document.getElementById("taskNumber").textContent = String(currentTaskIndex + 1);
  document.getElementById("taskTitle").textContent = task.title;
  document.getElementById("taskDescription").textContent = task.description;
  document.getElementById("taskGoal").textContent = task.goal;
  document.getElementById("hintText").textContent = task.hint;
  updateHintAvailability();

  const list = document.getElementById("taskList");
  list.replaceChildren();
  TASKS.forEach(function (item, index) {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "task-item" + (index === currentTaskIndex ? " active" : "") +
      (completedTasks[index] ? " done" : "");
    row.innerHTML = "<span>" + (index + 1) + ". " + escapeHtml(item.title) +
      "</span><span class=\"state\">" + (completedTasks[index] ? "✓" : "") + "</span>";
    row.addEventListener("click", function () { loadTask(index); });
    list.appendChild(row);
  });
  document.getElementById("prevTaskBtn").disabled = currentTaskIndex === 0;
  document.getElementById("nextTaskBtn").disabled = currentTaskIndex === TASKS.length - 1;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character];
  });
}

function defineBlocks() {
  Blockly.defineBlocksWithJsonArray([
    {
      type: "move_forward", message0: "шагнуть вперёд на %1 клеток",
      args0: [{ type: "field_number", name: "STEPS", value: 1, min: 1, max: 20, precision: 1 }],
      previousStatement: null, nextStatement: null, colour: 270
    },
    { type: "turn_left", message0: "повернуть налево", previousStatement: null, nextStatement: null, colour: 270 },
    { type: "turn_right", message0: "повернуть направо", previousStatement: null, nextStatement: null, colour: 270 },
    { type: "take_cargo", message0: "взять груз", previousStatement: null, nextStatement: null, colour: 270 },
    {
      type: "front_is_wall", message0: "препятствие %1?",
      args0: [{
        type: "field_dropdown", name: "POSITION",
        options: [
          ["впереди", "front"],
          ["сверху", "above"],
          ["справа", "right"],
          ["снизу", "below"],
          ["слева", "left"]
        ]
      }],
      output: "Boolean", colour: 120
    },
    {
      type: "cargo_is_color", message0: "груз %1 цвета?",
      args0: [{
        type: "field_dropdown", name: "COLOR",
        options: [["зелёного", "green"], ["красного", "red"], ["синего", "blue"], ["жёлтого", "yellow"]]
      }],
      output: "Boolean", colour: 120
    },
    {
      type: "logic_and", message0: "%1 и %2",
      args0: [{ type: "input_value", name: "A", check: "Boolean" }, { type: "input_value", name: "B", check: "Boolean" }],
      inputsInline: true, output: "Boolean", colour: 210
    },
    {
      type: "logic_or", message0: "%1 или %2",
      args0: [{ type: "input_value", name: "A", check: "Boolean" }, { type: "input_value", name: "B", check: "Boolean" }],
      inputsInline: true, output: "Boolean", colour: 210
    },
    {
      type: "robot_if", message0: "если %1 то %2",
      args0: [{ type: "input_value", name: "COND", check: "Boolean" }, { type: "input_statement", name: "DO" }],
      previousStatement: null, nextStatement: null, colour: 120
    },
    {
      type: "robot_if_else", message0: "если %1 то %2 иначе %3",
      args0: [
        { type: "input_value", name: "COND", check: "Boolean" },
        { type: "input_statement", name: "DO" },
        { type: "input_statement", name: "ELSE" }
      ],
      previousStatement: null, nextStatement: null, colour: 120
    },
    {
      type: "robot_repeat", message0: "повторить %1 раз %2",
      args0: [
        { type: "field_number", name: "TIMES", value: 3, min: 1, max: 20, precision: 1 },
        { type: "input_statement", name: "DO" }
      ],
      previousStatement: null, nextStatement: null, colour: 35
    }
  ]);
}

function getToolbox(task) {
  const conditionBlocks = [
    { kind: "block", type: "robot_if" },
    { kind: "block", type: "robot_if_else" },
    { kind: "block", type: "front_is_wall" },
    { kind: "block", type: "cargo_is_color" }
  ];
  if (task.allowLogic) {
    conditionBlocks.push({ kind: "block", type: "logic_and" }, { kind: "block", type: "logic_or" });
  }
  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category", name: "Движение", colour: "#7B61A8",
        contents: [
          { kind: "block", type: "move_forward", fields: { STEPS: 1 } },
          { kind: "block", type: "turn_left" },
          { kind: "block", type: "turn_right" },
          { kind: "block", type: "take_cargo" }
        ]
      },
      { kind: "category", name: "Условия", colour: "#2B8A57", contents: conditionBlocks },
      {
        kind: "category", name: "Циклы", colour: "#B26B1C",
        contents: [{ kind: "block", type: "robot_repeat", fields: { TIMES: 3 } }]
      }
    ]
  };
}

function initBlockly() {
  defineBlocks();
  workspace = Blockly.inject("blocklyDiv", {
    toolbox: getToolbox(TASKS[currentTaskIndex]),
    renderer: "zelos",
    trashcan: true,
    sounds: false,
    grid: { spacing: 20, length: 3, colour: "#d8dde5", snap: true },
    zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 1.35, minScale: 0.55, scaleSpeed: 1.1 }
  });
  workspace.addChangeListener(function (event) {
    if (!isLoadingTask && !event.isUiEvent && event.type !== Blockly.Events.FINISHED_LOADING) saveCurrentProgram();
  });
}

function loadTask(index, shouldSaveCurrent) {
  if (isRunning) return;
  if (shouldSaveCurrent !== false) saveCurrentProgram();
  currentTaskIndex = Math.max(0, Math.min(TASKS.length - 1, index));
  localStorage.setItem(LAST_TASK_STORAGE_KEY, String(currentTaskIndex));
  currentState = cloneTaskState(TASKS[currentTaskIndex]);
  let saved = null;
  isLoadingTask = true;
  try {
    workspace.updateToolbox(getToolbox(TASKS[currentTaskIndex]));
    workspace.clear();
    saved = getSavedPrograms()[currentTaskIndex];
    if (saved) {
      try {
        Blockly.serialization.workspaces.load(saved, workspace);
      } catch {
        const programs = getSavedPrograms();
        delete programs[currentTaskIndex];
        localStorage.setItem(CODE_STORAGE_KEY, JSON.stringify(programs));
        saved = null;
      }
    }
  } finally {
    isLoadingTask = false;
  }
  updateTaskUI();
  renderWorld();
  setStatus("Готов", "idle");
  showMessage(saved ? "Программа этой задачи восстановлена." : "Собери программу из блоков и запусти робота.", "info");
}

function collectBlocks() {
  const blocks = [];
  const visit = function (block) {
    if (!block || blocks.includes(block)) return;
    blocks.push(block);
    block.inputList.forEach(function (input) {
      if (input.connection) visit(input.connection.targetBlock());
    });
    if (block.nextConnection) visit(block.nextConnection.targetBlock());
  };
  workspace.getTopBlocks(true).forEach(visit);
  return blocks;
}

function hasNestedBlock(parentType, childType) {
  return collectBlocks().some(function (block) {
    if (block.type !== parentType) return false;
    const descendants = [];
    const visit = function (item) {
      if (!item || descendants.includes(item)) return;
      descendants.push(item);
      item.inputList.forEach(function (input) {
        if (input.connection) visit(input.connection.targetBlock());
      });
      if (item.nextConnection) visit(item.nextConnection.targetBlock());
    };
    block.inputList.forEach(function (input) {
      if (input.connection) visit(input.connection.targetBlock());
    });
    return descendants.some(function (item) { return item.type === childType; });
  });
}

function blockMatchesPredicate(block, predicate) {
  if (!block || block.type !== predicate.type) return false;
  if (predicate.color && block.getFieldValue("COLOR") !== predicate.color) return false;
  if (predicate.position && (block.getFieldValue("POSITION") || "front") !== predicate.position) return false;
  return true;
}

function hasConditionCombination(combination) {
  return collectBlocks().some(function (block) {
    if (block.type !== combination.operator) return false;
    const first = block.getInputTargetBlock("A");
    const second = block.getInputTargetBlock("B");
    const expectedFirst = combination.predicates[0];
    const expectedSecond = combination.predicates[1];
    return (blockMatchesPredicate(first, expectedFirst) && blockMatchesPredicate(second, expectedSecond)) ||
      (blockMatchesPredicate(first, expectedSecond) && blockMatchesPredicate(second, expectedFirst));
  });
}

function predicateLabel(predicate) {
  if (predicate.type === "cargo_is_color") return "«груз " + COLOR_NAMES[predicate.color] + " цвета?»";
  if (predicate.type === "front_is_wall") return "«препятствие " + OBSTACLE_POSITION_NAMES[predicate.position] + "?»";
  return "нужная проверка";
}

function conditionValue(block) {
  if (!block) return false;
  const task = TASKS[currentTaskIndex];
  if (block.type === "front_is_wall") {
    const position = block.getFieldValue("POSITION") || "front";
    const direction = position === "front" ? DELTA[currentState.dir] : DELTA[
      position === "above" ? "north" :
        position === "right" ? "east" :
          position === "below" ? "south" : "west"
    ];
    return isWall(task, currentState.x + direction.dx, currentState.y + direction.dy);
  }
  if (block.type === "cargo_is_color") {
    const cargo = getCargoAt(task, currentState);
    const color = block.getFieldValue("COLOR");
    const match = Boolean(cargo && cargo.color === color);
    if (match && cargo.verificationRequired) {
      currentState.verified[cargo.id] = true;
      renderWorld();
    }
    return match;
  }
  if (block.type === "logic_and") {
    return conditionValue(block.getInputTargetBlock("A")) && conditionValue(block.getInputTargetBlock("B"));
  }
  if (block.type === "logic_or") {
    return conditionValue(block.getInputTargetBlock("A")) || conditionValue(block.getInputTargetBlock("B"));
  }
  return false;
}

function wait(milliseconds) {
  return new Promise(function (resolve) { setTimeout(resolve, milliseconds); });
}

function stopWithError(message) {
  currentState.halted = true;
  throw new Error(message);
}

async function executeStatement(firstBlock) {
  let block = firstBlock;
  while (block && !currentState.halted) {
    const task = TASKS[currentTaskIndex];
    if (block.type === "move_forward") {
      const steps = Math.max(1, Math.min(20, Number(block.getFieldValue("STEPS")) || 1));
      for (let step = 0; step < steps; step += 1) {
        const direction = DELTA[currentState.dir];
        const nextX = currentState.x + direction.dx;
        const nextY = currentState.y + direction.dy;
        if (isWall(task, nextX, nextY)) stopWithError("Робот упёрся в стену или вышел за границу поля.");
        currentState.x = nextX;
        currentState.y = nextY;
        renderWorld();
        await wait(140);
      }
    } else if (block.type === "turn_left" || block.type === "turn_right") {
      const index = DIRS.indexOf(currentState.dir);
      currentState.dir = DIRS[(index + (block.type === "turn_left" ? 3 : 1)) % 4];
      renderWorld();
      await wait(180);
    } else if (block.type === "take_cargo") {
      const cargo = getCargoAt(task, currentState);
      if (!cargo) stopWithError("Здесь нет груза, который можно взять.");
      currentState.picked[cargo.id] = true;
      if (!task.expectedPicked.includes(cargo.id)) currentState.wrongPickup = true;
      if (cargo.verificationRequired && !currentState.verified[cargo.id]) currentState.unverifiedPickup = true;
      renderWorld();
      await wait(180);
    } else if (block.type === "robot_if" || block.type === "robot_if_else") {
      const branch = conditionValue(block.getInputTargetBlock("COND"))
        ? block.getInputTargetBlock("DO")
        : block.getInputTargetBlock("ELSE");
      if (branch) await executeStatement(branch);
    } else if (block.type === "robot_repeat") {
      const times = Math.max(1, Math.min(20, Number(block.getFieldValue("TIMES")) || 1));
      for (let index = 0; index < times && !currentState.halted; index += 1) {
        await executeStatement(block.getInputTargetBlock("DO"));
      }
    }
    block = block.nextConnection ? block.nextConnection.targetBlock() : null;
  }
}

function validateTask() {
  const task = TASKS[currentTaskIndex];
  const blocks = collectBlocks();
  const types = new Set(blocks.map(function (block) { return block.type; }));
  const labels = {
    robot_if: "условный блок «если»",
    front_is_wall: "проверка препятствия",
    cargo_is_color: "проверка цвета груза",
    robot_repeat: "цикл «повторить»",
    logic_and: "логическое «и»",
    logic_or: "логическое «или»"
  };

  for (const type of task.requiredBlocks || []) {
    if (!types.has(type)) return { ok: false, text: "В решении не хватает: " + labels[type] + "." };
  }
  for (const rule of task.requiredNesting || []) {
    if (!hasNestedBlock(rule.parent, rule.child)) {
      return { ok: false, text: "В этой задаче " + labels[rule.child] + " должен быть внутри цикла «повторить»." };
    }
  }
  for (const predicate of task.requiredPredicates || []) {
    if (!blocks.some(function (block) { return blockMatchesPredicate(block, predicate); })) {
      return { ok: false, text: "В решении не хватает проверки " + predicateLabel(predicate) + "." };
    }
  }
  if (task.requiredConditionCombination && !hasConditionCombination(task.requiredConditionCombination)) {
    const predicates = task.requiredConditionCombination.predicates;
    const operator = task.requiredConditionCombination.operator === "logic_and" ? "«и»" : "«или»";
    return {
      ok: false,
      text: "Соедини проверки " + predicateLabel(predicates[0]) + " и " + predicateLabel(predicates[1]) + " словом " + operator + "."
    };
  }
  if (task.requiredRepeatTimes) {
    const expectedCounts = task.requiredRepeatTimes.slice().sort(function (first, second) { return first - second; });
    const actualCounts = blocks
      .filter(function (block) { return block.type === "robot_repeat"; })
      .map(function (block) { return Number(block.getFieldValue("TIMES")); })
      .sort(function (first, second) { return first - second; });
    const hasWrongCount = actualCounts.length !== expectedCounts.length || actualCounts.some(function (count, index) {
      return count !== expectedCounts[index];
    });
    if (hasWrongCount) {
      const repeatText = expectedCounts.length === 1
        ? "повторить " + expectedCounts[0] + " раз"
        : "оба цикла должны повторяться по 3 раза";
      return { ok: false, text: "В этой задаче нужно выбрать: «" + repeatText + "»." };
    }
  }
  for (const type of Object.keys(task.blockLimits || {})) {
    const count = blocks.filter(function (block) { return block.type === type; }).length;
    if (count > task.blockLimits[type]) {
      return { ok: false, text: "Слишком много блоков: «" + labels[type] + "» можно использовать только " + task.blockLimits[type] + " раз." };
    }
  }
  if (task.maxBlocks && blocks.length > task.maxBlocks) {
    return { ok: false, text: "В этой задаче можно использовать не более " + task.maxBlocks + " блоков." };
  }
  if (task.requiresVerification && !currentState.verified[task.requiresVerification]) {
    return { ok: false, text: "Груз доставлен, но его цвет не подтверждён условием. Проверь зелёный груз перед тем, как брать его." };
  }
  if (currentState.unverifiedPickup) {
    return { ok: false, text: "Сначала нужно проверить цвет груза условием, а потом брать его." };
  }
  if (currentState.wrongPickup) {
    return { ok: false, text: "Робот взял груз неподходящего цвета." };
  }
  const missing = task.expectedPicked.filter(function (id) { return !currentState.picked[id]; });
  if (missing.length) return { ok: false, text: "Собраны не все нужные грузы." };
  if (currentState.x !== task.finish.x || currentState.y !== task.finish.y) {
    return { ok: false, text: "Робот ещё не на финише." };
  }
  return { ok: true, text: "Задача решена!" };
}

function setRunControls(disabled) {
  ["runBtn", "resetCodeBtn", "prevTaskBtn", "nextTaskBtn"].forEach(function (id) {
    document.getElementById(id).disabled = disabled;
  });
}

function openModal(kind, text) {
  const modal = document.getElementById("resultModal");
  const title = document.getElementById("modalTitle");
  const kicker = document.getElementById("modalKicker");
  const hintButton = document.getElementById("modalHintBtn");
  const restartButton = document.getElementById("modalRestartBtn");
  const nextButton = document.getElementById("modalNextBtn");
  document.getElementById("modalText").textContent = text;
  modal.className = "modal-backdrop " + kind;
  hintButton.classList.add("hidden");
  restartButton.classList.add("hidden");
  nextButton.classList.add("hidden");

  if (kind === "success") {
    kicker.textContent = "Задание выполнено";
    title.textContent = "Отличная работа!";
    nextButton.textContent = currentTaskIndex === TASKS.length - 1 ? "Завершить" : "Перейти к следующему заданию";
    nextButton.classList.remove("hidden");
  } else if (kind === "hint") {
    kicker.textContent = "Подсказка";
    title.textContent = TASKS[currentTaskIndex].title;
    document.getElementById("modalText").textContent = TASKS[currentTaskIndex].hint;
    restartButton.textContent = "Понятно";
    restartButton.classList.remove("hidden");
  } else {
    const attempts = failedAttempts[currentTaskIndex] || 0;
    kicker.textContent = "Попытка " + attempts;
    title.textContent = attempts >= 3 ? "Пока не получилось" : "Что-то не так";
    document.getElementById("modalText").textContent = attempts >= 3
      ? "Что-то не так, попробуй ещё раз. Уже можно взять подсказку."
      : "Что-то не так, попробуй ещё раз.";
    if (attempts >= 3) hintButton.classList.remove("hidden");
    restartButton.textContent = "Попробовать снова";
    restartButton.classList.remove("hidden");
  }
}

function closeModal() {
  document.getElementById("resultModal").classList.add("hidden");
}

function returnRobotToStart() {
  currentState = cloneTaskState(TASKS[currentTaskIndex]);
  renderWorld();
  setStatus("Готов", "idle");
  showMessage("Робот вернулся на старт. Исправь программу и запусти её снова.", "info");
}

function registerFailure(reason) {
  failedAttempts[currentTaskIndex] = (failedAttempts[currentTaskIndex] || 0) + 1;
  updateHintAvailability();
  setStatus("Попробуй ещё", "error");
  showMessage(reason, "error");
  openModal("failure", reason);
}

async function runProgram() {
  if (isRunning) return;
  if (!workspace.getTopBlocks(true).length) {
    registerFailure("Сначала собери программу из блоков.");
    return;
  }
  closeModal();
  isRunning = true;
  setRunControls(true);
  currentState = cloneTaskState(TASKS[currentTaskIndex]);
  renderWorld();
  setStatus("Выполнение...", "running");
  showMessage("Робот выполняет твою программу.", "info");
  try {
    const roots = workspace.getTopBlocks(true).filter(function (block) {
      return !block.outputConnection;
    }).sort(function (first, second) { return first.y - second.y; });
    for (const root of roots) await executeStatement(root);
    if (!currentState.halted) {
      const result = validateTask();
      if (result.ok) {
        completedTasks[currentTaskIndex] = true;
        localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedTasks));
        setStatus("Выполнено", "success");
        showMessage(result.text, "success");
        updateTaskUI();
        openModal("success", result.text);
      } else {
        registerFailure(result.text);
      }
    }
  } catch (error) {
    registerFailure(error.message || "Робот остановился из-за ошибки.");
  } finally {
    isRunning = false;
    setRunControls(false);
    updateTaskUI();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTask = Number(localStorage.getItem(LAST_TASK_STORAGE_KEY));
  if (Number.isInteger(savedTask) && savedTask >= 0 && savedTask < TASKS.length) currentTaskIndex = savedTask;
  initBlockly();
  loadTask(currentTaskIndex, false);
  initConditionPanelResizer();
  updateRobotWorldZoom();

  document.getElementById("runBtn").addEventListener("click", runProgram);
  document.getElementById("resetCodeBtn").addEventListener("click", clearCode);
  document.getElementById("worldZoomOutBtn").addEventListener("click", function () {
    changeRobotWorldZoom(-1);
  });
  document.getElementById("worldZoomInBtn").addEventListener("click", function () {
    changeRobotWorldZoom(1);
  });
  document.getElementById("prevTaskBtn").addEventListener("click", function () { loadTask(currentTaskIndex - 1); });
  document.getElementById("nextTaskBtn").addEventListener("click", function () { loadTask(currentTaskIndex + 1); });
  document.getElementById("hintBtn").addEventListener("click", function () {
    setHintVisible(document.getElementById("hintText").classList.contains("hidden"));
  });
  document.getElementById("modalHintBtn").addEventListener("click", function () {
    openModal("hint");
  });
  document.getElementById("modalRestartBtn").addEventListener("click", function () {
    if (this.textContent === "Попробовать снова") returnRobotToStart();
    closeModal();
  });
  document.getElementById("modalNextBtn").addEventListener("click", function () {
    closeModal();
    if (currentTaskIndex < TASKS.length - 1) loadTask(currentTaskIndex + 1);
  });
});
