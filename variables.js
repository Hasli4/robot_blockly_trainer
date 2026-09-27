/* Тренажёр «Робот и переменные». */

const VARIABLE_OPTIONS = [
  ["Шаги", "steps"],
  ["Собрано", "collected"],
  ["Счётчик", "counter"]
];

const VARIABLE_NAMES = {
  steps: "Шаги",
  collected: "Собрано",
  counter: "Счётчик"
};

const VARIABLE_TASKS = [
  {
    title: "Запомни число шагов",
    stage: "Переменная: значение",
    description: "Роботу нужно пройти три клетки. Пусть переменная «Шаги» запомнит это число.",
    goal: "Дойди до финиша, используя переменную «Шаги» со значением 3.",
    hint: "Сначала создай «Шаги», потом задай ей число 3. В команде движения выбери эту переменную.",
    width: 6, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 4, y: 1 },
    bundles: [],
    variable: "steps",
    expectedVariables: { steps: 3 },
    requiredBlocks: ["var_create", "var_set", "move_variable"],
    requiredVariableBlocks: ["var_create", "var_set", "move_variable"],
    blockLimits: { var_create: 1, var_set: 1, move_variable: 1 },
    maxBlocks: 3
  },
  {
    title: "Прибавь к шагам",
    stage: "Переменная: изменение",
    description: "Сначала робот знает только про два шага. Потом нужно прибавить ещё два, и путь станет длиннее.",
    goal: "Дойди до финиша, изменив переменную «Шаги» с 2 на 4.",
    hint: "Задай «Шагам» значение 2, затем измени переменную на 2. Команда движения возьмёт новое число.",
    width: 7, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 5, y: 1 },
    bundles: [],
    variable: "steps",
    expectedVariables: { steps: 4 },
    requiredBlocks: ["var_create", "var_set", "var_change", "move_variable"],
    requiredVariableBlocks: ["var_create", "var_set", "var_change", "move_variable"],
    blockLimits: { var_create: 1, var_set: 1, var_change: 1, move_variable: 1 },
    maxBlocks: 4
  },
  {
    title: "Шаги меняются",
    stage: "Переменная: новое значение",
    description: "В начале робот делает один шаг. Потом переменная меняется, и робот идёт ещё на два шага.",
    goal: "Используй «Шаги» два раза: сначала 1, потом 2.",
    hint: "После первого движения измени «Шаги» на 1. Второй блок движения возьмёт уже новое значение переменной.",
    width: 6, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 4, y: 1 },
    bundles: [],
    variable: "steps",
    expectedVariables: { steps: 2 },
    requiredBlocks: ["var_create", "var_set", "var_change", "move_variable"],
    requiredVariableBlocks: ["var_create", "var_set", "var_change", "move_variable"],
    blockLimits: { var_create: 1, var_set: 1, var_change: 1, move_variable: 2 },
    maxBlocks: 5
  },
  {
    title: "Считаем вручную",
    stage: "Переменная: счётчик",
    description: "В ящике две посылки. Бери их по одной и после каждой увеличивай переменную «Собрано».",
    goal: "Собери две посылки, чтобы «Собрано» стало равно 2, и дойди до финиша.",
    hint: "Перед сбором задай «Собрано» значение 0. После каждой посылки прибавляй к этой переменной 1.",
    width: 6, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 3, y: 1 },
    bundles: [{ id: "t4", x: 1, y: 1, quantity: 2 }],
    variable: "collected",
    expectedVariables: { collected: 2 },
    requiredBlocks: ["var_create", "var_set", "var_change", "take_package", "move_forward"],
    requiredVariableBlocks: ["var_create", "var_set", "var_change"],
    blockLimits: { var_create: 1, var_set: 1, var_change: 2, take_package: 2, move_forward: 1 },
    maxBlocks: 7
  },
  {
    title: "Первый цикл-счётчик",
    stage: "Переменная + цикл",
    description: "В ящике спрятаны три посылки. Их число на ящике не написано, но по плану нужно собрать 3.",
    goal: "Собери 3 посылки с помощью цикла и переменной «Собрано».",
    hint: "Счётчик начинает с нуля. Внутри цикла положи два блока: взять посылку и изменить «Собрано» на 1.",
    width: 5, height: 3,
    start: { x: 2, y: 1, dir: "east" },
    finish: { x: 2, y: 1 },
    bundles: [{ id: "t5", x: 2, y: 1, quantity: 3 }],
    variable: "collected",
    expectedVariables: { collected: 3 },
    requiredBlocks: ["var_create", "var_set", "var_change", "take_package", "var_repeat_until"],
    requiredVariableBlocks: ["var_create", "var_set", "var_change", "var_repeat_until"],
    requiredNesting: [
      { parent: "var_repeat_until", child: "take_package" },
      { parent: "var_repeat_until", child: "var_change" }
    ],
    requiredLoopLimits: [3],
    blockLimits: { var_create: 1, var_set: 1, var_change: 1, take_package: 1, var_repeat_until: 1 },
    maxBlocks: 5
  },
  {
    title: "Пять посылок",
    stage: "Цикл со счётчиком",
    description: "До ящика нужно дойти, а потом собрать из него пять посылок. Количество видно только в плане задания.",
    goal: "Доберись до ящика и собери 5 посылок со счётчиком.",
    hint: "Сначала подойди к ящику. Затем счётчик с нуля будет расти на 1 после каждой взятой посылки.",
    width: 6, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 3, y: 1 },
    bundles: [{ id: "t6", x: 3, y: 1, quantity: 5 }],
    variable: "collected",
    expectedVariables: { collected: 5 },
    requiredBlocks: ["var_create", "var_set", "var_change", "take_package", "var_repeat_until", "move_forward"],
    requiredVariableBlocks: ["var_create", "var_set", "var_change", "var_repeat_until"],
    requiredNesting: [
      { parent: "var_repeat_until", child: "take_package" },
      { parent: "var_repeat_until", child: "var_change" }
    ],
    requiredLoopLimits: [5],
    blockLimits: { var_create: 1, var_set: 1, var_change: 1, take_package: 1, var_repeat_until: 1, move_forward: 1 },
    maxBlocks: 6
  },
  {
    title: "Ящик в конце дороги",
    stage: "Цикл со счётчиком",
    description: "Робот идёт по длинной дорожке к ящику. Внутри лежат шесть посылок, и счётчик должен помочь не ошибиться.",
    goal: "Дойди до ящика и собери ровно 6 посылок.",
    hint: "План здесь простой: движение до ящика, потом цикл. В цикле счётчик должен увеличиваться после каждой посылки.",
    width: 8, height: 3,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 5, y: 1 },
    bundles: [{ id: "t7", x: 5, y: 1, quantity: 6 }],
    variable: "collected",
    expectedVariables: { collected: 6 },
    requiredBlocks: ["var_create", "var_set", "var_change", "take_package", "var_repeat_until", "move_forward"],
    requiredVariableBlocks: ["var_create", "var_set", "var_change", "var_repeat_until"],
    requiredNesting: [
      { parent: "var_repeat_until", child: "take_package" },
      { parent: "var_repeat_until", child: "var_change" }
    ],
    requiredLoopLimits: [6],
    blockLimits: { var_create: 1, var_set: 1, var_change: 1, take_package: 1, var_repeat_until: 1, move_forward: 1 },
    maxBlocks: 6
  },
  {
    title: "Две остановки",
    stage: "Счётчик по маршруту",
    description: "По пути будет два ящика. В первом две посылки, во втором три. Не обнуляй счётчик: пусть он считает всё, что собрал робот.",
    goal: "Собери 5 посылок из двух ящиков, не обнуляя «Собрано».",
    hint: "После первого ящика «Собрано» будет равно 2. Во втором цикле счётчик должен дойти уже до 5, а не начинаться сначала.",
    width: 6, height: 5,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 4, y: 3 },
    bundles: [
      { id: "t8a", x: 4, y: 1, quantity: 2 },
      { id: "t8b", x: 4, y: 3, quantity: 3 }
    ],
    variable: "collected",
    expectedVariables: { collected: 5 },
    requiredBlocks: ["var_create", "var_set", "var_change", "take_package", "var_repeat_until", "move_forward", "turn_right"],
    requiredVariableBlocks: ["var_create", "var_set", "var_change", "var_repeat_until"],
    requiredNesting: [
      { parent: "var_repeat_until", child: "take_package" },
      { parent: "var_repeat_until", child: "var_change" }
    ],
    requiredLoopLimits: [2, 5],
    blockLimits: { var_create: 1, var_set: 1, var_change: 2, take_package: 2, var_repeat_until: 2, move_forward: 2, turn_right: 1 },
    maxBlocks: 11
  },
  {
    title: "Три ящика",
    stage: "Счётчик по маршруту",
    description: "Робот огибает три стороны квадрата. В каждом углу его ждёт ящик с посылками, а один счётчик продолжает считать весь путь.",
    goal: "Собери 7 посылок из трёх ящиков одним счётчиком.",
    hint: "Счётчик должен останавливаться на числах 2, потом 5, потом 7. После каждого ящика робот поворачивает направо.",
    width: 6, height: 6,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 1, y: 4 },
    bundles: [
      { id: "t9a", x: 4, y: 1, quantity: 2 },
      { id: "t9b", x: 4, y: 4, quantity: 3 },
      { id: "t9c", x: 1, y: 4, quantity: 2 }
    ],
    variable: "collected",
    expectedVariables: { collected: 7 },
    requiredBlocks: ["var_create", "var_set", "var_change", "take_package", "var_repeat_until", "move_forward", "turn_right"],
    requiredVariableBlocks: ["var_create", "var_set", "var_change", "var_repeat_until"],
    requiredNesting: [
      { parent: "var_repeat_until", child: "take_package" },
      { parent: "var_repeat_until", child: "var_change" }
    ],
    requiredLoopLimits: [2, 5, 7],
    blockLimits: { var_create: 1, var_set: 1, var_change: 3, take_package: 3, var_repeat_until: 3, move_forward: 3, turn_right: 2 },
    maxBlocks: 16
  },
  {
    title: "Большой маршрут",
    stage: "Итог: переменная и цикл",
    description: "Финальная доставка проходит через три ящика. В них 3, 2 и 4 посылки. Робот должен вести один общий счёт до самого финиша.",
    goal: "Собери 9 посылок из трёх ящиков и доведи «Собрано» до 9.",
    hint: "После первого ящика счётчик равен 3, после второго — 5, а в конце — 9. Это числа в трёх блоках цикла.",
    width: 6, height: 6,
    start: { x: 1, y: 1, dir: "east" },
    finish: { x: 1, y: 4 },
    bundles: [
      { id: "t10a", x: 4, y: 1, quantity: 3 },
      { id: "t10b", x: 4, y: 4, quantity: 2 },
      { id: "t10c", x: 1, y: 4, quantity: 4 }
    ],
    variable: "collected",
    expectedVariables: { collected: 9 },
    requiredBlocks: ["var_create", "var_set", "var_change", "take_package", "var_repeat_until", "move_forward", "turn_right"],
    requiredVariableBlocks: ["var_create", "var_set", "var_change", "var_repeat_until"],
    requiredNesting: [
      { parent: "var_repeat_until", child: "take_package" },
      { parent: "var_repeat_until", child: "var_change" }
    ],
    requiredLoopLimits: [3, 5, 9],
    blockLimits: { var_create: 1, var_set: 1, var_change: 3, take_package: 3, var_repeat_until: 3, move_forward: 3, turn_right: 2 },
    maxBlocks: 16
  }
];

const VAR_DIRS = ["north", "east", "south", "west"];
const VAR_DELTA = {
  north: { dx: 0, dy: -1 },
  east: { dx: 1, dy: 0 },
  south: { dx: 0, dy: 1 },
  west: { dx: -1, dy: 0 }
};
const VAR_ROTATION = { north: -90, east: 0, south: 90, west: 180 };
const VARIABLE_CODE_STORAGE = "robotVariablesCodeByTaskV1";
const VARIABLE_LAST_TASK_STORAGE = "robotVariablesLastTaskV1";
const VARIABLE_COMPLETED_STORAGE = "robotVariablesCompletedV1";
const VARIABLES_WORLD_CELL_SIZES = [42, 46, 50, 54, 58, 62];

let variablesWorkspace = null;
let variablesTaskIndex = 0;
let variablesState = null;
let variablesRunning = false;
let variablesLoading = false;
let variablesCompleted = loadVariablesJson(VARIABLE_COMPLETED_STORAGE, {});
let variablesFailures = {};
let variablesWorldZoomIndex = 2;
let variablesHasRun = false;

function loadVariablesJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function currentVariablesTask() {
  return VARIABLE_TASKS[variablesTaskIndex];
}

function variableName(key) {
  return VARIABLE_NAMES[key] || key;
}

function cloneVariablesState(task) {
  const bundles = {};
  task.bundles.forEach(function (bundle) {
    bundles[bundle.id] = bundle.quantity;
  });
  return {
    x: task.start.x,
    y: task.start.y,
    dir: task.start.dir,
    bundles: bundles,
    variables: {},
    created: {},
    halted: false
  };
}

function saveVariablesProgram() {
  if (!variablesWorkspace || variablesLoading) return;
  const programs = loadVariablesJson(VARIABLE_CODE_STORAGE, {});
  programs[variablesTaskIndex] = Blockly.serialization.workspaces.save(variablesWorkspace);
  localStorage.setItem(VARIABLE_CODE_STORAGE, JSON.stringify(programs));
}

function showVariablesMessage(text, type) {
  const box = document.getElementById("messageBox");
  box.className = "message-box" + (type ? " " + type : "");
  box.textContent = text;
}

function setVariablesStatus(text, type) {
  const status = document.getElementById("runStatus");
  status.className = "status " + (type || "idle");
  status.textContent = text;
}

function isVariablesOutside(task, x, y) {
  return x < 0 || y < 0 || x >= task.width || y >= task.height;
}

function getBundleAt(task, state, x, y) {
  return task.bundles.find(function (bundle) {
    return bundle.x === x && bundle.y === y && state.bundles[bundle.id] > 0;
  });
}

function getVariablesPreview() {
  if (!variablesWorkspace) return {};
  const preview = {};
  variablesWorkspace.getAllBlocks(false).forEach(function (block) {
    if (block.type === "var_create") preview[block.getFieldValue("VAR")] = 0;
  });
  return preview;
}

function updateVariableReadout() {
  const readout = document.getElementById("variableReadout");
  const state = variablesState || cloneVariablesState(currentVariablesTask());
  const values = variablesRunning || variablesHasRun ? state.variables : getVariablesPreview();
  const variables = Object.keys(values);
  readout.replaceChildren();
  if (!variables.length) {
    const empty = document.createElement("span");
    empty.className = "empty-readout";
    empty.textContent = "Переменных пока нет";
    readout.appendChild(empty);
    return;
  }
  variables.forEach(function (key) {
    const chip = document.createElement("div");
    chip.className = "variable-chip";
    const name = document.createElement("span");
    const value = document.createElement("strong");
    name.textContent = variableName(key);
    value.textContent = String(values[key]);
    chip.append(name, value);
    readout.appendChild(chip);
  });
}

function renderVariablesWorld() {
  const task = currentVariablesTask();
  const state = variablesState || cloneVariablesState(task);
  const world = document.getElementById("world");
  const grid = document.createElement("div");
  grid.className = "variables-grid";
  grid.style.gridTemplateColumns = "repeat(" + task.width + ", var(--variables-cell))";

  for (let y = 0; y < task.height; y += 1) {
    for (let x = 0; x < task.width; x += 1) {
      const cell = document.createElement("div");
      cell.className = "variables-cell";
      if (x === task.finish.x && y === task.finish.y) {
        cell.classList.add("finish-cell");
        const finish = document.createElement("div");
        finish.className = "variables-finish";
        finish.textContent = "◆";
        cell.appendChild(finish);
      }

      const bundle = getBundleAt(task, state, x, y);
      if (bundle) {
        const crate = document.createElement("div");
        crate.className = "package-crate";
        crate.title = "Ящик с посылками. Количество не показано.";
        cell.appendChild(crate);
      }

      if (state.x === x && state.y === y) {
        cell.classList.add("has-robot");
        const robot = document.createElement("div");
        robot.className = "variables-robot";
        robot.style.setProperty("--variables-robot-angle", VAR_ROTATION[state.dir] + "deg");
        const image = document.createElement("img");
        image.className = "variables-robot-image";
        image.src = "robot.png";
        image.alt = "Робот";
        image.addEventListener("error", function () {
          robot.classList.add("image-missing");
        });
        robot.appendChild(image);
        cell.appendChild(robot);
      }
      grid.appendChild(cell);
    }
  }
  world.replaceChildren(grid);
  updateVariableReadout();
}

function defineVariableBlocks() {
  Blockly.defineBlocksWithJsonArray([
    {
      type: "program_start",
      message0: "старт %1",
      args0: [{ type: "input_statement", name: "DO" }],
      colour: 230
    },
    {
      type: "move_forward",
      message0: "шагнуть вперёд на %1 клеток",
      args0: [{ type: "field_number", name: "STEPS", value: 1, min: 1, max: 20, precision: 1 }],
      previousStatement: null,
      nextStatement: null,
      colour: 270
    },
    {
      type: "move_variable",
      message0: "шагнуть вперёд на значение %1",
      args0: [{ type: "field_dropdown", name: "VAR", options: VARIABLE_OPTIONS }],
      previousStatement: null,
      nextStatement: null,
      colour: 270
    },
    { type: "turn_left", message0: "повернуть налево", previousStatement: null, nextStatement: null, colour: 270 },
    { type: "turn_right", message0: "повернуть направо", previousStatement: null, nextStatement: null, colour: 270 },
    { type: "take_package", message0: "взять одну посылку", previousStatement: null, nextStatement: null, colour: 270 },
    {
      type: "var_create",
      message0: "создать переменную %1",
      args0: [{ type: "field_dropdown", name: "VAR", options: VARIABLE_OPTIONS }],
      previousStatement: null,
      nextStatement: null,
      colour: 20
    },
    {
      type: "var_set",
      message0: "задать %1 значение %2",
      args0: [
        { type: "field_dropdown", name: "VAR", options: VARIABLE_OPTIONS },
        { type: "field_number", name: "VALUE", value: 0, min: -20, max: 50, precision: 1 }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 20
    },
    {
      type: "var_change",
      message0: "изменить %1 на %2",
      args0: [
        { type: "field_dropdown", name: "VAR", options: VARIABLE_OPTIONS },
        { type: "field_number", name: "VALUE", value: 1, min: -20, max: 20, precision: 1 }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 20
    },
    {
      type: "var_repeat_until",
      message0: "повторять, пока %1 меньше %2 %3",
      args0: [
        { type: "field_dropdown", name: "VAR", options: VARIABLE_OPTIONS },
        { type: "field_number", name: "LIMIT", value: 3, min: 1, max: 50, precision: 1 },
        { type: "input_statement", name: "DO" }
      ],
      previousStatement: null,
      nextStatement: null,
      colour: 35
    }
  ]);
}

function getVariablesToolbox() {
  return {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Программа",
        colour: "#5B72A5",
        contents: [{ kind: "block", type: "program_start" }]
      },
      {
        kind: "category",
        name: "Движение",
        colour: "#7B61A8",
        contents: [
          { kind: "block", type: "move_forward", fields: { STEPS: 1 } },
          { kind: "block", type: "move_variable", fields: { VAR: "steps" } },
          { kind: "block", type: "turn_left" },
          { kind: "block", type: "turn_right" },
          { kind: "block", type: "take_package" }
        ]
      },
      {
        kind: "category",
        name: "Переменные",
        colour: "#C98022",
        contents: [
          { kind: "block", type: "var_create", fields: { VAR: "steps" } },
          { kind: "block", type: "var_set", fields: { VAR: "steps", VALUE: 0 } },
          { kind: "block", type: "var_change", fields: { VAR: "steps", VALUE: 1 } }
        ]
      },
      {
        kind: "category",
        name: "Циклы",
        colour: "#B26B1C",
        contents: [{ kind: "block", type: "var_repeat_until", fields: { VAR: "collected", LIMIT: 3 } }]
      }
    ]
  };
}

function initVariablesBlockly() {
  defineVariableBlocks();
  variablesWorkspace = Blockly.inject("blocklyDiv", {
    toolbox: getVariablesToolbox(),
    renderer: "zelos",
    trashcan: true,
    sounds: false,
    grid: { spacing: 20, length: 3, colour: "#d8dde5", snap: true },
    zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 1.35, minScale: 0.55, scaleSpeed: 1.1 }
  });
  variablesWorkspace.addChangeListener(function (event) {
    if (!variablesLoading && !event.isUiEvent && event.type !== Blockly.Events.FINISHED_LOADING) {
      variablesHasRun = false;
      updateVariableReadout();
      saveVariablesProgram();
    }
  });
}

function updateVariablesTaskUI() {
  const task = currentVariablesTask();
  const totalPackages = task.bundles.reduce(function (sum, bundle) { return sum + bundle.quantity; }, 0);
  document.getElementById("taskNumber").textContent = String(variablesTaskIndex + 1);
  document.getElementById("taskStage").textContent = task.stage;
  document.getElementById("taskTitle").textContent = task.title;
  document.getElementById("taskDescription").textContent = task.description;
  document.getElementById("taskGoal").textContent = task.goal;
  document.getElementById("worldCaption").textContent = totalPackages
    ? "План: собрать " + totalPackages + " " + packageWord(totalPackages)
    : "Робот выполняет блоки сверху вниз";
  updateVariablesHintAvailability();

  const list = document.getElementById("taskList");
  list.replaceChildren();
  VARIABLE_TASKS.forEach(function (item, index) {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "task-item" + (index === variablesTaskIndex ? " active" : "") +
      (variablesCompleted[index] ? " done" : "");
    const name = document.createElement("span");
    const state = document.createElement("span");
    name.textContent = (index + 1) + ". " + item.title;
    state.className = "state";
    state.textContent = variablesCompleted[index] ? "✓" : "";
    row.append(name, state);
    row.addEventListener("click", function () { loadVariablesTask(index); });
    list.appendChild(row);
  });

  document.getElementById("prevTaskBtn").disabled = variablesTaskIndex === 0;
  document.getElementById("nextTaskBtn").disabled = variablesTaskIndex === VARIABLE_TASKS.length - 1;
}

function loadVariablesTask(index, shouldSaveCurrent) {
  if (variablesRunning) return;
  if (shouldSaveCurrent !== false) saveVariablesProgram();
  variablesTaskIndex = Math.max(0, Math.min(VARIABLE_TASKS.length - 1, index));
  localStorage.setItem(VARIABLE_LAST_TASK_STORAGE, String(variablesTaskIndex));
  variablesState = cloneVariablesState(currentVariablesTask());
  variablesHasRun = false;

  let saved = null;
  variablesLoading = true;
  try {
    variablesWorkspace.updateToolbox(getVariablesToolbox());
    variablesWorkspace.clear();
    saved = loadVariablesJson(VARIABLE_CODE_STORAGE, {})[variablesTaskIndex];
    if (saved) {
      try {
        Blockly.serialization.workspaces.load(saved, variablesWorkspace);
      } catch {
        const programs = loadVariablesJson(VARIABLE_CODE_STORAGE, {});
        delete programs[variablesTaskIndex];
        localStorage.setItem(VARIABLE_CODE_STORAGE, JSON.stringify(programs));
        saved = null;
      }
    }
  } finally {
    variablesLoading = false;
  }
  updateVariablesTaskUI();
  renderVariablesWorld();
  setVariablesStatus("Готов", "idle");
  showVariablesMessage(saved ? "Программа этой задачи восстановлена." : "Собери программу из блоков и запусти робота.", "info");
}

function clearVariablesCode() {
  if (variablesRunning) return;
  variablesLoading = true;
  try {
    variablesWorkspace.clear();
    const programs = loadVariablesJson(VARIABLE_CODE_STORAGE, {});
    delete programs[variablesTaskIndex];
    localStorage.setItem(VARIABLE_CODE_STORAGE, JSON.stringify(programs));
  } finally {
    variablesLoading = false;
  }
  variablesHasRun = false;
  updateVariableReadout();
  showVariablesMessage("Программа очищена.", "info");
}

function packageWord(number) {
  const lastTwo = number % 100;
  const last = number % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return "посылок";
  if (last === 1) return "посылку";
  if (last >= 2 && last <= 4) return "посылки";
  return "посылок";
}

function collectVariablesBlocks() {
  const blocks = [];
  const visit = function (block) {
    if (!block || blocks.includes(block)) return;
    blocks.push(block);
    block.inputList.forEach(function (input) {
      if (input.connection) visit(input.connection.targetBlock());
    });
    if (block.nextConnection) visit(block.nextConnection.targetBlock());
  };
  const start = getVariablesProgramStartBlock();
  if (start) visit(start.getInputTargetBlock("DO"));
  return blocks;
}

function getVariablesProgramStartBlocks() {
  return variablesWorkspace.getTopBlocks(true)
    .filter(function (block) { return block.type === "program_start"; })
    .sort(function (first, second) { return first.y - second.y; });
}

function getVariablesProgramStartBlock() {
  return getVariablesProgramStartBlocks()[0] || null;
}

function hasVariablesNesting(parentType, childType) {
  return collectVariablesBlocks().some(function (block) {
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

function variableIsCreated(key) {
  return Boolean(variablesState.created[key]);
}

function requireVariable(key) {
  if (!variableIsCreated(key)) {
    stopVariablesWithError("Сначала создай переменную «" + variableName(key) + "».");
  }
  return Number(variablesState.variables[key]) || 0;
}

function waitForVariables(milliseconds) {
  return new Promise(function (resolve) { setTimeout(resolve, milliseconds); });
}

function stopVariablesWithError(message) {
  variablesState.halted = true;
  throw new Error(message);
}

async function moveVariablesRobot(steps) {
  const task = currentVariablesTask();
  const safeSteps = Math.max(1, Math.min(20, Math.round(Number(steps) || 0)));
  for (let step = 0; step < safeSteps; step += 1) {
    const delta = VAR_DELTA[variablesState.dir];
    const nextX = variablesState.x + delta.dx;
    const nextY = variablesState.y + delta.dy;
    if (isVariablesOutside(task, nextX, nextY)) {
      stopVariablesWithError("Робот вышел за границу поля.");
    }
    variablesState.x = nextX;
    variablesState.y = nextY;
    renderVariablesWorld();
    await waitForVariables(140);
  }
}

async function executeVariablesStatement(firstBlock) {
  let block = firstBlock;
  while (block && !variablesState.halted) {
    if (block.type === "var_create") {
      const key = block.getFieldValue("VAR");
      variablesState.created[key] = true;
      variablesState.variables[key] = 0;
      updateVariableReadout();
      await waitForVariables(120);
    } else if (block.type === "var_set") {
      const key = block.getFieldValue("VAR");
      requireVariable(key);
      variablesState.variables[key] = Number(block.getFieldValue("VALUE")) || 0;
      updateVariableReadout();
      await waitForVariables(120);
    } else if (block.type === "var_change") {
      const key = block.getFieldValue("VAR");
      variablesState.variables[key] = requireVariable(key) + (Number(block.getFieldValue("VALUE")) || 0);
      updateVariableReadout();
      await waitForVariables(120);
    } else if (block.type === "move_forward") {
      await moveVariablesRobot(block.getFieldValue("STEPS"));
    } else if (block.type === "move_variable") {
      const steps = requireVariable(block.getFieldValue("VAR"));
      if (steps < 1) stopVariablesWithError("В переменной должно быть число не меньше 1, чтобы робот мог идти.");
      await moveVariablesRobot(steps);
    } else if (block.type === "turn_left" || block.type === "turn_right") {
      const index = VAR_DIRS.indexOf(variablesState.dir);
      variablesState.dir = VAR_DIRS[(index + (block.type === "turn_left" ? 3 : 1)) % 4];
      renderVariablesWorld();
      await waitForVariables(180);
    } else if (block.type === "take_package") {
      const task = currentVariablesTask();
      const bundle = getBundleAt(task, variablesState, variablesState.x, variablesState.y);
      if (!bundle) stopVariablesWithError("Здесь нет ящика с посылками или ящик уже пуст.");
      variablesState.bundles[bundle.id] -= 1;
      renderVariablesWorld();
      await waitForVariables(160);
    } else if (block.type === "var_repeat_until") {
      const key = block.getFieldValue("VAR");
      const limit = Number(block.getFieldValue("LIMIT")) || 0;
      let safety = 0;
      requireVariable(key);
      while (requireVariable(key) < limit && !variablesState.halted) {
        if (safety >= 80) stopVariablesWithError("Цикл не остановился. Проверь, меняется ли счётчик внутри цикла.");
        safety += 1;
        await executeVariablesStatement(block.getInputTargetBlock("DO"));
      }
    }
    block = block.nextConnection ? block.nextConnection.targetBlock() : null;
  }
}

function validateVariablesTask() {
  const task = currentVariablesTask();
  const blocks = collectVariablesBlocks();
  const types = new Set(blocks.map(function (block) { return block.type; }));
  const labels = {
    var_create: "блок «создать переменную»",
    var_set: "блок «задать значение переменной»",
    var_change: "блок «изменить переменную»",
    var_repeat_until: "цикл со счётчиком",
    move_variable: "движение со значением переменной",
    move_forward: "движение вперёд",
    turn_right: "поворот направо",
    take_package: "блок «взять одну посылку»"
  };

  for (const type of task.requiredBlocks || []) {
    if (!types.has(type)) return { ok: false, text: "В программе не хватает: " + labels[type] + "." };
  }
  for (const rule of task.requiredNesting || []) {
    if (!hasVariablesNesting(rule.parent, rule.child)) {
      return { ok: false, text: "В этой задаче " + labels[rule.child] + " должен быть внутри цикла." };
    }
  }
  for (const type of task.requiredVariableBlocks || []) {
    const wrongVariable = blocks.some(function (block) {
      return block.type === type && block.getFieldValue("VAR") !== task.variable;
    });
    if (wrongVariable) {
      return { ok: false, text: "В этой задаче используй переменную «" + variableName(task.variable) + "»." };
    }
  }
  if (task.requiredLoopLimits) {
    const actualLimits = blocks
      .filter(function (block) { return block.type === "var_repeat_until"; })
      .map(function (block) { return Number(block.getFieldValue("LIMIT")); })
      .sort(function (first, second) { return first - second; });
    const expectedLimits = task.requiredLoopLimits.slice().sort(function (first, second) { return first - second; });
    const hasWrongLimits = actualLimits.length !== expectedLimits.length || actualLimits.some(function (limit, index) {
      return limit !== expectedLimits[index];
    });
    if (hasWrongLimits) {
      return { ok: false, text: "Проверь числа в блоках цикла: счётчик должен остановиться на " + expectedLimits.join(", ") + "." };
    }
  }
  for (const type of Object.keys(task.blockLimits || {})) {
    const count = blocks.filter(function (block) { return block.type === type; }).length;
    if (count > task.blockLimits[type]) {
      return { ok: false, text: "Слишком много блоков: «" + labels[type] + "» можно использовать только " + task.blockLimits[type] + " раз." };
    }
  }
  if (task.maxBlocks && blocks.length > task.maxBlocks) {
    return { ok: false, text: "В этой задаче можно использовать не больше " + task.maxBlocks + " блоков." };
  }
  for (const key of Object.keys(task.expectedVariables || {})) {
    if (!variableIsCreated(key)) {
      return { ok: false, text: "Робот не создал переменную «" + variableName(key) + "»." };
    }
    if (variablesState.variables[key] !== task.expectedVariables[key]) {
      return { ok: false, text: "В конце значение «" + variableName(key) + "» должно быть равно " + task.expectedVariables[key] + "." };
    }
  }
  const packagesLeft = Object.keys(variablesState.bundles).some(function (id) {
    return variablesState.bundles[id] > 0;
  });
  if (packagesLeft) return { ok: false, text: "Собраны не все посылки из ящиков." };
  if (variablesState.x !== task.finish.x || variablesState.y !== task.finish.y) {
    return { ok: false, text: "Робот ещё не на финише." };
  }
  return { ok: true, text: "Задача решена!" };
}

function setVariablesControls(disabled) {
  ["runBtn", "resetCodeBtn", "prevTaskBtn", "nextTaskBtn"].forEach(function (id) {
    document.getElementById(id).disabled = disabled;
  });
}

function setVariablesHintVisible(visible) {
  const hint = document.getElementById("hintText");
  hint.classList.toggle("hidden", !visible);
  document.getElementById("hintBtn").textContent = visible ? "Скрыть подсказку" : "Показать подсказку";
}

function updateVariablesHintAvailability() {
  const canShow = (variablesFailures[variablesTaskIndex] || 0) >= 3;
  document.getElementById("hintBox").classList.toggle("hidden", !canShow);
  if (!canShow) setVariablesHintVisible(false);
}

function openVariablesResult(kind, text) {
  const modal = document.getElementById("resultModal");
  const kicker = document.getElementById("modalKicker");
  const title = document.getElementById("modalTitle");
  const content = document.getElementById("modalText");
  const hintButton = document.getElementById("modalHintBtn");
  const retryButton = document.getElementById("modalRetryBtn");
  const nextButton = document.getElementById("modalNextBtn");
  modal.className = "modal-backdrop " + kind;
  hintButton.classList.add("hidden");
  retryButton.classList.add("hidden");
  nextButton.classList.add("hidden");

  if (kind === "success") {
    kicker.textContent = "Задание выполнено";
    title.textContent = "Получилось!";
    content.textContent = text;
    nextButton.textContent = variablesTaskIndex === VARIABLE_TASKS.length - 1 ? "Завершить" : "Следующая задача";
    nextButton.classList.remove("hidden");
  } else if (kind === "hint") {
    kicker.textContent = "Подсказка";
    title.textContent = currentVariablesTask().title;
    content.textContent = currentVariablesTask().hint;
    retryButton.textContent = "Понятно";
    retryButton.classList.remove("hidden");
  } else {
    const attempts = variablesFailures[variablesTaskIndex] || 0;
    kicker.textContent = "Попытка " + attempts;
    title.textContent = attempts >= 3 ? "Пока не получилось" : "Что-то не так";
    content.textContent = attempts >= 3
      ? "Попробуй ещё раз. Теперь можно взять подсказку."
      : "Что-то не так, попробуй ещё раз.";
    if (attempts >= 3) hintButton.classList.remove("hidden");
    retryButton.textContent = "Попробовать снова";
    retryButton.classList.remove("hidden");
  }
}

function closeVariablesResult() {
  document.getElementById("resultModal").classList.add("hidden");
}

function returnVariablesRobotToStart() {
  variablesState = cloneVariablesState(currentVariablesTask());
  variablesHasRun = false;
  renderVariablesWorld();
  setVariablesStatus("Готов", "idle");
  showVariablesMessage("Робот вернулся на старт. Исправь программу и запусти её снова.", "info");
}

function registerVariablesFailure(reason) {
  variablesFailures[variablesTaskIndex] = (variablesFailures[variablesTaskIndex] || 0) + 1;
  updateVariablesHintAvailability();
  setVariablesStatus("Попробуй ещё", "error");
  showVariablesMessage(reason, "error");
  openVariablesResult("failure", reason);
}

async function runVariablesProgram() {
  if (variablesRunning) return;
  const starts = getVariablesProgramStartBlocks();
  if (!starts.length) {
    registerVariablesFailure("Сначала добавь блок «старт» и присоедини к нему команды.");
    return;
  }
  if (starts.length > 1) {
    registerVariablesFailure("В программе должен быть только один блок «старт».");
    return;
  }
  closeVariablesResult();
  variablesRunning = true;
  variablesHasRun = true;
  setVariablesControls(true);
  variablesState = cloneVariablesState(currentVariablesTask());
  renderVariablesWorld();
  setVariablesStatus("Выполнение...", "running");
  showVariablesMessage("Робот выполняет программу.", "info");

  try {
    await executeVariablesStatement(starts[0].getInputTargetBlock("DO"));
    if (!variablesState.halted) {
      const result = validateVariablesTask();
      if (result.ok) {
        variablesCompleted[variablesTaskIndex] = true;
        localStorage.setItem(VARIABLE_COMPLETED_STORAGE, JSON.stringify(variablesCompleted));
        setVariablesStatus("Выполнено", "success");
        showVariablesMessage(result.text, "success");
        updateVariablesTaskUI();
        openVariablesResult("success", result.text);
      } else {
        registerVariablesFailure(result.text);
      }
    }
  } catch (error) {
    registerVariablesFailure(error.message || "Робот остановился из-за ошибки.");
  } finally {
    variablesRunning = false;
    setVariablesControls(false);
    updateVariablesTaskUI();
  }
}

function updateVariablesWorldZoom() {
  const root = document.documentElement;
  const cellSize = VARIABLES_WORLD_CELL_SIZES[variablesWorldZoomIndex];
  root.style.setProperty("--variables-world-cell", cellSize + "px");
  root.style.setProperty("--variables-robot-size", Math.round(cellSize * 0.82) + "px");
}

function changeVariablesWorldZoom(delta) {
  variablesWorldZoomIndex = Math.max(0, Math.min(VARIABLES_WORLD_CELL_SIZES.length - 1, variablesWorldZoomIndex + delta));
  updateVariablesWorldZoom();
}

function initVariablesPanelResizer() {
  const resizer = document.getElementById("variablesPanelResizer");
  const center = document.getElementById("variablesCenterColumn");
  let startY = 0;
  let startHeight = 0;

  const resizeWorkspace = function () {
    if (variablesWorkspace) Blockly.svgResize(variablesWorkspace);
  };
  const finish = function () {
    document.body.classList.remove("is-resizing-variables-panels");
    resizer.classList.remove("is-dragging");
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", finish);
    resizeWorkspace();
  };
  const move = function (event) {
    const available = center.getBoundingClientRect().height - 282;
    const next = Math.max(240, Math.min(available, startHeight + event.clientY - startY));
    center.style.setProperty("--variables-world-height", next + "px");
    resizeWorkspace();
  };

  resizer.addEventListener("pointerdown", function (event) {
    startY = event.clientY;
    startHeight = document.querySelector(".variables-page .world-panel").getBoundingClientRect().height;
    document.body.classList.add("is-resizing-variables-panels");
    resizer.classList.add("is-dragging");
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", finish, { once: true });
  });
  resizer.addEventListener("keydown", function (event) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const current = document.querySelector(".variables-page .world-panel").getBoundingClientRect().height;
    const delta = event.key === "ArrowUp" ? 30 : -30;
    center.style.setProperty("--variables-world-height", Math.max(240, current + delta) + "px");
    resizeWorkspace();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTask = Number(localStorage.getItem(VARIABLE_LAST_TASK_STORAGE));
  if (Number.isInteger(savedTask) && savedTask >= 0 && savedTask < VARIABLE_TASKS.length) {
    variablesTaskIndex = savedTask;
  }
  initVariablesBlockly();
  loadVariablesTask(variablesTaskIndex, false);
  initVariablesPanelResizer();
  updateVariablesWorldZoom();

  document.getElementById("runBtn").addEventListener("click", runVariablesProgram);
  document.getElementById("resetCodeBtn").addEventListener("click", clearVariablesCode);
  document.getElementById("worldZoomOutBtn").addEventListener("click", function () { changeVariablesWorldZoom(-1); });
  document.getElementById("worldZoomInBtn").addEventListener("click", function () { changeVariablesWorldZoom(1); });
  document.getElementById("prevTaskBtn").addEventListener("click", function () { loadVariablesTask(variablesTaskIndex - 1); });
  document.getElementById("nextTaskBtn").addEventListener("click", function () { loadVariablesTask(variablesTaskIndex + 1); });
  document.getElementById("hintBtn").addEventListener("click", function () {
    setVariablesHintVisible(document.getElementById("hintText").classList.contains("hidden"));
  });
  document.getElementById("modalRetryBtn").addEventListener("click", function () {
    if (this.textContent === "Попробовать снова") returnVariablesRobotToStart();
    closeVariablesResult();
  });
  document.getElementById("modalHintBtn").addEventListener("click", function () {
    openVariablesResult("hint");
  });
  document.getElementById("modalNextBtn").addEventListener("click", function () {
    closeVariablesResult();
    if (variablesTaskIndex < VARIABLE_TASKS.length - 1) loadVariablesTask(variablesTaskIndex + 1);
  });
});
