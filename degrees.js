/* Тренажёр «Робот, повороты и градусы». */

const DEGREE_TASKS = [
  {
    title: "Едем вправо",
    stage: "Градусы: направление",
    description: "Три коробки стоят в один ряд. Роботу нужно ехать вправо и собрать их.",
    goal: "Собери все коробки.",
    hint: "Посмотри на круг: какое число стоит справа от центра?",
    width: 7, height: 5,
    start: { x: 1, y: 3, angle: 90 },
    boxes: [{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }],
    requiredBlocks: ["move_in_direction"]
  },
  {
    title: "Сначала вверх, потом вправо",
    stage: "Градусы: направление",
    description: "Коробки лежат углом. Сначала робот поднимется, а потом поедет вправо.",
    goal: "Собери все коробки.",
    hint: "Команда с направлением каждый раз задаёт новый путь. Найди на круге верх и правую сторону.",
    width: 7, height: 6,
    start: { x: 1, y: 4, angle: 90 },
    boxes: [{ x: 1, y: 3 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }],
    requiredBlocks: ["move_in_direction"]
  },
  {
    title: "По диагонали",
    stage: "Градусы: направление",
    description: "Теперь часть пути идёт по диагонали. На круге это направление находится между верхом и правой стороной.",
    goal: "Собери все коробки.",
    hint: "Диагональ вверх-вправо делит угол между 0° и 90° пополам.",
    width: 7, height: 6,
    start: { x: 1, y: 4, angle: 90 },
    boxes: [{ x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 1 }],
    requiredBlocks: ["move_in_direction"]
  },
  {
    title: "Повтори дорожку",
    stage: "Градусы: направление + цикл",
    description: "Дорожка повторяется два раза: шаг по диагонали, затем шаг вправо. Не собирай одинаковые блоки вручную.",
    goal: "Собери все коробки, используя цикл.",
    hint: "Найди два движения, которые повторяются. Их можно положить внутрь «повторить».",
    width: 7, height: 6,
    start: { x: 1, y: 4, angle: 90 },
    boxes: [{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 2 }, { x: 5, y: 2 }],
    requiredBlocks: ["move_in_direction", "degree_repeat"],
    requiredNesting: [{ parent: "degree_repeat", child: "move_in_direction" }],
    blockLimits: { degree_repeat: 1, move_in_direction: 2 },
    maxBlocks: 3
  },
  {
    title: "Зигзаг влево",
    stage: "Градусы: направление + цикл",
    description: "Коробки лежат змейкой слева от робота. Здесь пригодятся отрицательные градусы и способ вращения «влево-вправо».",
    goal: "Собери все коробки циклом и выбери способ вращения «влево-вправо».",
    hint: "На левой половине круга стоят числа со знаком минус. Чтобы робот не переворачивался, выбери для него способ «влево-вправо».",
    width: 9, height: 7,
    start: { x: 7, y: 5, angle: -90 },
    boxes: [{ x: 6, y: 4 }, { x: 5, y: 4 }, { x: 4, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 2 }, { x: 1, y: 2 }],
    requiredBlocks: ["move_in_direction", "degree_repeat", "set_rotation_mode"],
    requiredNesting: [{ parent: "degree_repeat", child: "move_in_direction" }],
    blockLimits: { degree_repeat: 1, move_in_direction: 2, set_rotation_mode: 1 },
    maxBlocks: 4,
    requiredRotationMode: "flip"
  },
  {
    title: "Поверни направо",
    stage: "Повороты: вправо",
    description: "Робот смотрит вверх. Сначала он соберёт коробки над собой, потом повернёт направо и поедет дальше.",
    goal: "Собери все коробки.",
    hint: "Поворот вправо прибавляет градусы. После четверти круга робот будет смотреть в сторону правого края.",
    width: 7, height: 6,
    start: { x: 2, y: 4, angle: 0 },
    boxes: [{ x: 2, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }],
    requiredBlocks: ["move_forward", "turn_right"]
  },
  {
    title: "Два правых поворота",
    stage: "Повороты: вправо",
    description: "Робот едет по трём сторонам квадрата. Направление меняется, а градусы считаются от того, куда он смотрит сейчас.",
    goal: "Собери все коробки.",
    hint: "После каждого поворота посмотри на маленький круг справа. Он покажет новое направление робота.",
    width: 7, height: 6,
    start: { x: 2, y: 1, angle: 90 },
    boxes: [{ x: 3, y: 1 }, { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 3 }],
    requiredBlocks: ["move_forward", "turn_right"]
  },
  {
    title: "Поверни налево",
    stage: "Повороты: влево",
    description: "Теперь робот поедет вправо, а потом свернёт налево. Коробки покажут, верно ли выбран поворот.",
    goal: "Собери все коробки.",
    hint: "Поворот влево отнимает градусы. Если робот смотрит вправо, после четверти круга он будет смотреть вверх.",
    width: 7, height: 6,
    start: { x: 2, y: 3, angle: 90 },
    boxes: [{ x: 3, y: 3 }, { x: 4, y: 3 }, { x: 4, y: 2 }, { x: 4, y: 1 }],
    requiredBlocks: ["move_forward", "turn_left"]
  },
  {
    title: "Угол 45°",
    stage: "Повороты: 45°",
    description: "Робот начинает путь вправо. Дальше ему нужно пройти по диагонали, а затем снова ехать прямо.",
    goal: "Собери все коробки.",
    hint: "Половина прямого угла — 45°. После такого поворота робот смотрит по диагонали.",
    width: 8, height: 7,
    start: { x: 1, y: 5, angle: 90 },
    boxes: [{ x: 2, y: 5 }, { x: 3, y: 4 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }],
    requiredBlocks: ["move_forward", "turn_left", "turn_right"]
  },
  {
    title: "Повторяющийся зигзаг",
    stage: "Повороты: итог",
    description: "В этой дорожке робот три раза делает одно и то же: едет вперёд, косо вверх и снова выравнивается.",
    goal: "Собери все коробки с помощью цикла.",
    hint: "Вспомни: левый поворот меняет направление в одну сторону, правый — возвращает его обратно. Эта связка повторяется.",
    width: 9, height: 7,
    start: { x: 1, y: 5, angle: 90 },
    boxes: [{ x: 2, y: 5 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 2 }],
    requiredBlocks: ["move_forward", "turn_left", "turn_right", "degree_repeat"],
    requiredNesting: [{ parent: "degree_repeat", child: "turn_left" }],
    blockLimits: { degree_repeat: 1, move_forward: 2, turn_left: 1, turn_right: 1 },
    maxBlocks: 5
  }
];

const DIRECTION_ANGLES = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, -165, -150, -135, -120, -105, -90, -75, -60, -45, -30, -15];
const TURN_ANGLES = [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];
const DIRECTION_OPTIONS = DIRECTION_ANGLES.map(function (angle) {
  return [angle + "°", String(angle)];
});
const TURN_OPTIONS = TURN_ANGLES.map(function (angle) {
  return [angle + "°", String(angle)];
});
const ANGLE_NAMES = {
  0: "вверх",
  45: "вверх-вправо",
  90: "вправо",
  135: "вниз-вправо",
  180: "вниз",
  "-135": "вниз-влево",
  "-90": "влево",
  "-45": "вверх-влево"
};
const ROTATION_MODE_NAMES = {
  rotate: "вращать",
  flip: "влево-вправо",
  none: "не вращать"
};
const DEGREE_CODE_STORAGE = "robotDegreesProgramsV1";
const DEGREE_LAST_TASK_STORAGE = "robotDegreesLastTaskV1";
const DEGREE_COMPLETED_STORAGE = "robotDegreesCompletedV1";

let degreeWorkspace = null;
let degreeTaskIndex = 0;
let degreeState = null;
let degreeRunning = false;
let degreeLoading = false;
let degreeCompleted = loadJson(DEGREE_COMPLETED_STORAGE, {});
let degreeFailures = {};
let activeDegreeField = null;
let selectedDegree = 90;
let degreePickerTracking = false;
let degreePickerDragging = false;
let degreePickerPointerId = null;
const DEGREE_WORLD_CELL_SIZES = [42, 46, 50, 54, 58, 62];
let degreeWorldZoomIndex = 2;

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function normalizeAngle(value) {
  const normalized = ((Number(value) + 180) % 360 + 360) % 360 - 180;
  return normalized === -180 ? 180 : normalized;
}

function angleName(value) {
  return ANGLE_NAMES[normalizeAngle(value)] || normalizeAngle(value) + "°";
}

function angleDelta(angle) {
  const radians = normalizeAngle(angle) * Math.PI / 180;
  return {
    dx: Math.round(Math.sin(radians)),
    dy: -Math.round(Math.cos(radians))
  };
}

function cloneDegreeState(task) {
  return {
    x: task.start.x,
    y: task.start.y,
    angle: task.start.angle,
    rotationMode: "rotate",
    picked: {},
    halted: false
  };
}

function currentDegreeTask() {
  return DEGREE_TASKS[degreeTaskIndex];
}

function getSavedDegreePrograms() {
  return loadJson(DEGREE_CODE_STORAGE, {});
}

function saveDegreeProgram() {
  if (!degreeWorkspace || degreeLoading) return;
  const programs = getSavedDegreePrograms();
  programs[degreeTaskIndex] = Blockly.serialization.workspaces.save(degreeWorkspace);
  localStorage.setItem(DEGREE_CODE_STORAGE, JSON.stringify(programs));
  localStorage.setItem(DEGREE_LAST_TASK_STORAGE, String(degreeTaskIndex));
}

function showDegreeMessage(text, type) {
  const box = document.getElementById("messageBox");
  box.className = "message-box" + (type ? " " + type : "");
  box.textContent = text;
}

function setDegreeStatus(text, type) {
  const status = document.getElementById("runStatus");
  status.className = "status " + (type || "idle");
  status.textContent = text;
}

function isOutside(task, x, y) {
  return x < 0 || y < 0 || x >= task.width || y >= task.height;
}

function boxAt(task, state, x, y) {
  return task.boxes.find(function (box, index) {
    return box.x === x && box.y === y && !state.picked[index];
  });
}

function renderWorldDial() {
  const state = degreeState || cloneDegreeState(currentDegreeTask());
  renderDegreeDial(document.getElementById("headingDial"), state.angle, false);
  document.getElementById("headingValue").textContent = normalizeAngle(state.angle) + "°";
  document.getElementById("headingName").textContent = angleName(state.angle);
  document.getElementById("rotationModeValue").textContent = ROTATION_MODE_NAMES[state.rotationMode];
}

function robotImageTransform(state) {
  if (state.rotationMode === "flip") {
    return state.angle < 0 ? "scaleX(-1)" : "scaleX(1)";
  }
  if (state.rotationMode === "none") {
    return "rotate(0deg)";
  }
  return "rotate(" + normalizeAngle(state.angle - 90) + "deg)";
}

function renderDegreeWorld() {
  const task = currentDegreeTask();
  const state = degreeState || cloneDegreeState(task);
  const world = document.getElementById("world");
  const grid = document.createElement("div");
  grid.className = "degree-grid";
  grid.style.gridTemplateColumns = "repeat(" + task.width + ", var(--degree-cell))";

  for (let y = 0; y < task.height; y += 1) {
    for (let x = 0; x < task.width; x += 1) {
      const cell = document.createElement("div");
      const box = boxAt(task, state, x, y);
      cell.className = "degree-cell" + (box ? " has-box" : "");

      if (box) {
        const boxElement = document.createElement("div");
        boxElement.className = "degree-box";
        boxElement.title = "Коробка";
        cell.appendChild(boxElement);
      }

      if (state.x === x && state.y === y) {
        cell.classList.add("has-robot");

        const robot = document.createElement("div");
        robot.className = "degree-robot";
        robot.style.setProperty("--robot-image-transform", robotImageTransform(state));
        robot.style.setProperty("--robot-arrow-turn", normalizeAngle(state.angle) + "deg");

        const image = document.createElement("img");
        image.className = "degree-robot-image";
        image.src = "robot.png";
        image.alt = "Робот";
        image.addEventListener("error", function () {
          robot.classList.add("image-missing");
        });

        const arrow = document.createElement("span");
        arrow.className = "degree-direction-arrow";
        arrow.textContent = "↑";
        robot.appendChild(image);
        robot.appendChild(arrow);
        cell.appendChild(robot);
      }
      grid.appendChild(cell);
    }
  }

  world.replaceChildren(grid);
  renderWorldDial();
}

function tickLine(angle, radiusInner, radiusOuter, width, color) {
  const radians = angle * Math.PI / 180;
  const x1 = 150 + Math.sin(radians) * radiusInner;
  const y1 = 150 - Math.cos(radians) * radiusInner;
  const x2 = 150 + Math.sin(radians) * radiusOuter;
  const y2 = 150 - Math.cos(radians) * radiusOuter;
  return "<line x1=\"" + x1 + "\" y1=\"" + y1 + "\" x2=\"" + x2 + "\" y2=\"" + y2 +
    "\" stroke=\"" + color + "\" stroke-width=\"" + width + "\" stroke-linecap=\"round\" />";
}

function dialLabel(angle, label) {
  const radians = angle * Math.PI / 180;
  const x = 150 + Math.sin(radians) * 127;
  const y = 150 - Math.cos(radians) * 127 + 4;
  return "<text x=\"" + x + "\" y=\"" + y + "\" fill=\"#4d6d85\" font-size=\"12\" font-weight=\"800\" text-anchor=\"middle\">" + label + "</text>";
}

function degreePointer(angle, radius, color) {
  const radians = angle * Math.PI / 180;
  const x = 150 + Math.sin(radians) * radius;
  const y = 150 - Math.cos(radians) * radius;
  return "<line x1=\"150\" y1=\"150\" x2=\"" + x + "\" y2=\"" + y +
    "\" stroke=\"" + color + "\" stroke-width=\"5\" stroke-linecap=\"round\" />";
}

function degreeFromPointerEvent(event) {
  const dial = document.querySelector("#degreeDial svg");
  if (!dial) return null;

  const rect = dial.getBoundingClientRect();
  const dx = event.clientX - (rect.left + rect.width / 2);
  const dy = event.clientY - (rect.top + rect.height / 2);
  const distance = Math.hypot(dx, dy);
  if (distance > Math.max(rect.width, rect.height) * 0.62) return null;

  const raw = Math.atan2(dx, -dy) * 180 / Math.PI;
  const snapped = normalizeAngle(Math.round(raw / 15) * 15);
  return activeDegreeField && activeDegreeField.degreeKind === "turn"
    ? Math.abs(snapped)
    : snapped;
}

function setSelectedDegree(value) {
  if (value === null || typeof value === "undefined") return;
  selectedDegree = value;
  if (activeDegreeField) activeDegreeField.setValue(String(selectedDegree));
  refreshPickerDial();
}

function handlePickerPointerDown(event) {
  event.preventDefault();
  const value = degreeFromPointerEvent(event);
  if (value === null) return;

  if (degreePickerTracking) {
    degreePickerTracking = false;
    setSelectedDegree(value);
    return;
  }

  degreePickerDragging = true;
  degreePickerPointerId = event.pointerId;
  setSelectedDegree(value);
}

function handlePickerPointerMove(event) {
  const followsCursor = degreePickerTracking;
  const isDragging = degreePickerDragging && event.pointerId === degreePickerPointerId;
  if (!followsCursor && !isDragging) return;

  setSelectedDegree(degreeFromPointerEvent(event));
}

function stopPickerDrag(event) {
  if (!degreePickerDragging || event.pointerId !== degreePickerPointerId) return;
  degreePickerDragging = false;
  degreePickerPointerId = null;
}

function renderDegreeDial(container, angle, interactive) {
  if (!container) return;
  const selected = normalizeAngle(angle);
  let ticks = "";
  let labels = "";
  for (let tick = 0; tick < 360; tick += 15) {
    const major = tick % 45 === 0;
    ticks += tickLine(tick, major ? 97 : 103, 111, major ? 2.4 : 1.2, major ? "#6d96b5" : "#a6bfd2");
  }
  const labelAngles = container.id === "headingDial"
    ? [0, 90, 180, -90]
    : DIRECTION_ANGLES;
  labelAngles.forEach(function (value) {
    labels += dialLabel(value, value + "°");
  });

  const svg = "<svg viewBox=\"0 0 300 300\" role=\"img\" aria-label=\"Круг градусов\">" +
    "<circle cx=\"150\" cy=\"150\" r=\"116\" fill=\"#e7f3fc\" stroke=\"#6a9dc1\" stroke-width=\"3\" />" +
    "<circle cx=\"150\" cy=\"150\" r=\"90\" fill=\"#3f8fc7\" stroke=\"#2d78ad\" stroke-width=\"2\" />" +
    ticks +
    "<path d=\"M150 150 L150 58\" stroke=\"#dceeff\" stroke-width=\"3\" stroke-linecap=\"round\" />" +
    degreePointer(selected, 88, "#e64f4f") +
    "<circle cx=\"150\" cy=\"150\" r=\"7\" fill=\"#ffffff\" stroke=\"#e64f4f\" stroke-width=\"3\" />" +
    labels +
    "</svg>";
  container.innerHTML = svg;
  if (interactive) {
    const svgElement = container.querySelector("svg");
    svgElement.style.cursor = degreePickerTracking ? "crosshair" : "grab";
    svgElement.addEventListener("pointerdown", handlePickerPointerDown);
  }
}

function refreshPickerDial() {
  renderDegreeDial(document.getElementById("degreeDial"), selectedDegree, true);
  document.getElementById("degreeSelectedValue").textContent = selectedDegree + "°";
  document.getElementById("degreeSelectedName").textContent =
    activeDegreeField && activeDegreeField.degreeKind === "turn"
      ? "размер поворота"
      : angleName(selectedDegree);
}

function openDegreePicker(field, kind) {
  activeDegreeField = field;
  selectedDegree = kind === "turn"
    ? Math.abs(Number(field.getValue()))
    : normalizeAngle(field.getValue());
  degreePickerTracking = true;
  degreePickerDragging = false;
  degreePickerPointerId = null;
  const picker = document.getElementById("degreePicker");
  document.getElementById("degreePickerTitle").textContent =
    kind === "direction" ? "Куда едет робот?" : "На сколько градусов повернуть?";
  document.getElementById("degreePickerText").textContent =
    kind === "direction"
      ? "0° — вверх, 90° — вправо, −90° — влево."
      : "Выбери размер поворота: робот повернёт на этот угол от своего направления.";
  picker.classList.remove("hidden");
  refreshPickerDial();
}

function closeDegreePicker() {
  document.getElementById("degreePicker").classList.add("hidden");
  degreePickerTracking = false;
  degreePickerDragging = false;
  degreePickerPointerId = null;
  activeDegreeField = null;
}

class DegreeField extends Blockly.FieldDropdown {
  constructor(value, kind) {
    super(kind === "direction" ? DIRECTION_OPTIONS : TURN_OPTIONS);
    this.degreeKind = kind || "turn";
    this.setValue(String(normalizeAngle(value)));
  }

  showEditor_() {
    openDegreePicker(this, this.degreeKind);
  }
}

function defineDegreeBlocks() {
  Blockly.Blocks.move_in_direction = {
    init: function () {
      this.appendDummyInput()
        .appendField("идти в направлении")
        .appendField(new DegreeField(90, "direction"), "ANGLE")
        .appendField("на")
        .appendField(new Blockly.FieldNumber(1, 1, 12, 1), "STEPS")
        .appendField("клеток");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(205);
      this.setTooltip("Задаёт направление и двигает робота.");
    }
  };

  Blockly.Blocks.move_forward = {
    init: function () {
      this.appendDummyInput()
        .appendField("идти вперёд на")
        .appendField(new Blockly.FieldNumber(1, 1, 12, 1), "STEPS")
        .appendField("клеток");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(205);
      this.setTooltip("Двигает робота туда, куда он уже смотрит.");
    }
  };

  Blockly.Blocks.set_rotation_mode = {
    init: function () {
      this.appendDummyInput()
        .appendField("установить способ вращения")
        .appendField(new Blockly.FieldDropdown([
          ["вращать", "rotate"],
          ["влево-вправо", "flip"],
          ["не вращать", "none"]
        ]), "MODE");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(290);
      this.setTooltip("Меняет только вид робота, а не направление его движения.");
    }
  };

  Blockly.Blocks.turn_left = {
    init: function () {
      this.appendDummyInput()
        .appendField("повернуть влево на")
        .appendField(new DegreeField(90, "turn"), "ANGLE")
        .appendField("градусов");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(205);
      this.setTooltip("Вычитает градусы из текущего направления.");
    }
  };

  Blockly.Blocks.turn_right = {
    init: function () {
      this.appendDummyInput()
        .appendField("повернуть вправо на")
        .appendField(new DegreeField(90, "turn"), "ANGLE")
        .appendField("градусов");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(205);
      this.setTooltip("Прибавляет градусы к текущему направлению.");
    }
  };

  Blockly.Blocks.degree_repeat = {
    init: function () {
      this.appendDummyInput()
        .appendField("повторить")
        .appendField(new Blockly.FieldNumber(2, 1, 10, 1), "TIMES")
        .appendField("раз");
      this.appendStatementInput("DO").appendField("делать");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(35);
      this.setTooltip("Повторяет команды внутри блока.");
    }
  };
}

function degreeToolbox(task) {
  const movement = task.stage.indexOf("Градусы") === 0
    ? [
      { kind: "block", type: "move_in_direction", fields: { ANGLE: "90", STEPS: 1 } },
      { kind: "block", type: "set_rotation_mode", fields: { MODE: "rotate" } }
    ]
    : [
      { kind: "block", type: "move_forward", fields: { STEPS: 1 } },
      { kind: "block", type: "turn_left", fields: { ANGLE: "90" } },
      { kind: "block", type: "turn_right", fields: { ANGLE: "90" } },
      { kind: "block", type: "set_rotation_mode", fields: { MODE: "rotate" } }
    ];
  return {
    kind: "categoryToolbox",
    contents: [
      { kind: "category", name: "Движение", colour: "#368DC7", contents: movement },
      {
        kind: "category",
        name: "Циклы",
        colour: "#B26B1C",
        contents: [{ kind: "block", type: "degree_repeat", fields: { TIMES: 2 } }]
      }
    ]
  };
}

function initDegreeBlockly() {
  defineDegreeBlocks();
  degreeWorkspace = Blockly.inject("blocklyDiv", {
    toolbox: degreeToolbox(currentDegreeTask()),
    renderer: "zelos",
    trashcan: true,
    sounds: false,
    grid: { spacing: 20, length: 3, colour: "#d8dde5", snap: true },
    zoom: { controls: true, wheel: true, startScale: 0.9, maxScale: 1.35, minScale: 0.55, scaleSpeed: 1.1 }
  });
  degreeWorkspace.addChangeListener(function (event) {
    if (!degreeLoading && !event.isUiEvent && event.type !== Blockly.Events.FINISHED_LOADING) {
      saveDegreeProgram();
    }
  });
}

function setDegreeHintVisible(visible) {
  document.getElementById("hintText").classList.toggle("hidden", !visible);
  document.getElementById("hintBtn").textContent = visible ? "Скрыть подсказку" : "Показать подсказку";
}

function updateDegreeHintAvailability() {
  const show = (degreeFailures[degreeTaskIndex] || 0) >= 3;
  document.getElementById("hintBox").classList.toggle("hidden", !show);
  if (!show) setDegreeHintVisible(false);
}

function updateDegreeTaskUI() {
  const task = currentDegreeTask();
  document.getElementById("taskNumber").textContent = String(degreeTaskIndex + 1);
  document.getElementById("taskStage").textContent = task.stage;
  document.getElementById("taskTitle").textContent = task.title;
  document.getElementById("taskDescription").textContent = task.description;
  document.getElementById("taskGoal").textContent = task.goal;
  document.getElementById("hintText").textContent = task.hint;
  document.getElementById("worldCaption").textContent = "Коробок осталось: " +
    task.boxes.filter(function (_, index) {
      return !degreeState || !degreeState.picked[index];
    }).length;
  updateDegreeHintAvailability();

  const list = document.getElementById("taskList");
  list.replaceChildren();
  DEGREE_TASKS.forEach(function (item, index) {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "task-item" + (index === degreeTaskIndex ? " active" : "") +
      (degreeCompleted[index] ? " done" : "");
    row.innerHTML = "<span>" + (index + 1) + ". " + escapeHtml(item.title) +
      "</span><span class=\"state\">" + (degreeCompleted[index] ? "✓" : "") + "</span>";
    row.addEventListener("click", function () { loadDegreeTask(index); });
    list.appendChild(row);
  });
  document.getElementById("prevTaskBtn").disabled = degreeTaskIndex === 0;
  document.getElementById("nextTaskBtn").disabled = degreeTaskIndex === DEGREE_TASKS.length - 1;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (character) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character];
  });
}

function loadDegreeTask(index, saveCurrent) {
  if (degreeRunning) return;
  if (saveCurrent !== false) saveDegreeProgram();
  degreeTaskIndex = Math.max(0, Math.min(DEGREE_TASKS.length - 1, index));
  localStorage.setItem(DEGREE_LAST_TASK_STORAGE, String(degreeTaskIndex));
  degreeState = cloneDegreeState(currentDegreeTask());

  let saved = null;
  degreeLoading = true;
  try {
    degreeWorkspace.updateToolbox(degreeToolbox(currentDegreeTask()));
    degreeWorkspace.clear();
    saved = getSavedDegreePrograms()[degreeTaskIndex];
    if (saved) {
      Blockly.serialization.workspaces.load(saved, degreeWorkspace);
    }
  } catch {
    const programs = getSavedDegreePrograms();
    delete programs[degreeTaskIndex];
    localStorage.setItem(DEGREE_CODE_STORAGE, JSON.stringify(programs));
    saved = null;
  } finally {
    degreeLoading = false;
  }

  updateDegreeTaskUI();
  renderDegreeWorld();
  setDegreeStatus("Готов", "idle");
  showDegreeMessage(saved ? "Программа этой задачи восстановлена." : "Собери программу из блоков и запусти робота.", "info");
}

function clearDegreeCode() {
  if (degreeRunning) return;
  degreeWorkspace.clear();
  const programs = getSavedDegreePrograms();
  delete programs[degreeTaskIndex];
  localStorage.setItem(DEGREE_CODE_STORAGE, JSON.stringify(programs));
  showDegreeMessage("Код очищен. Можно собрать новую программу.", "info");
}

function resizeBlocklyForPanel() {
  requestAnimationFrame(function () {
    if (degreeWorkspace) Blockly.svgResize(degreeWorkspace);
  });
}

function setWorldPanelHeight(nextHeight) {
  const column = document.getElementById("degreeCenterColumn");
  const resizer = document.getElementById("panelResizer");
  const worldPanel = document.querySelector(".degrees-page .world-panel");
  const minimumCodeHeight = 270;
  const maximumWorldHeight = Math.max(
    260,
    column.clientHeight - minimumCodeHeight - resizer.offsetHeight
  );
  const minimumWorldHeight = Math.min(340, maximumWorldHeight);
  const height = Math.round(
    Math.max(minimumWorldHeight, Math.min(maximumWorldHeight, nextHeight))
  );

  column.style.setProperty("--degrees-world-height", height + "px");
  resizer.setAttribute("aria-valuemin", String(minimumWorldHeight));
  resizer.setAttribute("aria-valuemax", String(maximumWorldHeight));
  resizer.setAttribute("aria-valuenow", String(height));
  resizer.setAttribute("aria-valuetext", "Высота поля: " + height + " пикселей");
  resizeBlocklyForPanel();

  return worldPanel;
}

function initPanelResizer() {
  const column = document.getElementById("degreeCenterColumn");
  const resizer = document.getElementById("panelResizer");
  const worldPanel = document.querySelector(".degrees-page .world-panel");
  let activePointerId = null;

  function currentWorldHeight() {
    return worldPanel.getBoundingClientRect().height;
  }

  function resizeFromPointer(clientY) {
    const columnTop = column.getBoundingClientRect().top;
    setWorldPanelHeight(clientY - columnTop);
  }

  resizer.addEventListener("pointerdown", function (event) {
    activePointerId = event.pointerId;
    resizer.setPointerCapture(activePointerId);
    resizer.classList.add("is-dragging");
    document.body.classList.add("is-resizing-panels");
    resizeFromPointer(event.clientY);
  });

  resizer.addEventListener("pointermove", function (event) {
    if (event.pointerId === activePointerId) resizeFromPointer(event.clientY);
  });

  function stopResizing(event) {
    if (event.pointerId !== activePointerId) return;
    activePointerId = null;
    resizer.classList.remove("is-dragging");
    document.body.classList.remove("is-resizing-panels");
  }

  resizer.addEventListener("pointerup", stopResizing);
  resizer.addEventListener("pointercancel", stopResizing);
  resizer.addEventListener("lostpointercapture", function () {
    activePointerId = null;
    resizer.classList.remove("is-dragging");
    document.body.classList.remove("is-resizing-panels");
  });

  resizer.addEventListener("keydown", function (event) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    setWorldPanelHeight(currentWorldHeight() + (event.key === "ArrowUp" ? 40 : -40));
  });

  window.addEventListener("resize", function () {
    if (column.style.getPropertyValue("--degrees-world-height")) {
      setWorldPanelHeight(currentWorldHeight());
    } else {
      resizeBlocklyForPanel();
    }
  });
}

function updateDegreeWorldZoom() {
  const world = document.getElementById("world");
  const zoomOut = document.getElementById("worldZoomOutBtn");
  const zoomIn = document.getElementById("worldZoomInBtn");
  const cellSize = DEGREE_WORLD_CELL_SIZES[degreeWorldZoomIndex];
  const robotSize = cellSize - 8;
  const arrowTop = -Math.round(robotSize * 0.24);
  const arrowSize = Math.round(robotSize * 0.52);

  world.style.setProperty(
    "--degrees-world-cell",
    cellSize + "px"
  );
  world.style.setProperty("--degree-robot-size", robotSize + "px");
  world.style.setProperty("--degree-arrow-top", arrowTop + "px");
  world.style.setProperty("--degree-arrow-size", arrowSize + "px");
  world.style.setProperty(
    "--degree-arrow-origin-y",
    Math.round(robotSize / 2 - arrowTop) + "px"
  );
  world.style.setProperty(
    "--degree-arrow-font-size",
    Math.max(12, Math.round(arrowSize * 0.64)) + "px"
  );
  zoomOut.disabled = degreeWorldZoomIndex === 0;
  zoomIn.disabled = degreeWorldZoomIndex === DEGREE_WORLD_CELL_SIZES.length - 1;
}

function changeDegreeWorldZoom(delta) {
  const nextIndex = Math.max(
    0,
    Math.min(
      DEGREE_WORLD_CELL_SIZES.length - 1,
      degreeWorldZoomIndex + delta
    )
  );

  if (nextIndex === degreeWorldZoomIndex) return;

  degreeWorldZoomIndex = nextIndex;
  updateDegreeWorldZoom();
}

function collectDegreeBlocks() {
  const all = [];
  function visit(block) {
    if (!block || all.includes(block)) return;
    all.push(block);
    block.inputList.forEach(function (input) {
      if (input.connection) visit(input.connection.targetBlock());
    });
    if (block.nextConnection) visit(block.nextConnection.targetBlock());
  }
  degreeWorkspace.getTopBlocks(true).forEach(visit);
  return all;
}

function hasDegreeNesting(parentType, childType) {
  return collectDegreeBlocks().some(function (block) {
    if (block.type !== parentType) return false;
    const inside = [];
    function visit(candidate) {
      if (!candidate || inside.includes(candidate)) return;
      inside.push(candidate);
      candidate.inputList.forEach(function (input) {
        if (input.connection) visit(input.connection.targetBlock());
      });
      if (candidate.nextConnection) visit(candidate.nextConnection.targetBlock());
    }
    block.inputList.forEach(function (input) {
      if (input.connection) visit(input.connection.targetBlock());
    });
    return inside.some(function (candidate) { return candidate.type === childType; });
  });
}

function wait(milliseconds) {
  return new Promise(function (resolve) { setTimeout(resolve, milliseconds); });
}

function stopDegreeRun(message) {
  degreeState.halted = true;
  throw new Error(message);
}

async function walkForward(steps) {
  const task = currentDegreeTask();
  const delta = angleDelta(degreeState.angle);
  for (let step = 0; step < steps; step += 1) {
    const nextX = degreeState.x + delta.dx;
    const nextY = degreeState.y + delta.dy;
    if (isOutside(task, nextX, nextY)) {
      stopDegreeRun("Робот вышел за край поля. Посмотри, куда он был повёрнут.");
    }
    degreeState.x = nextX;
    degreeState.y = nextY;
    const pickedBox = boxAt(task, degreeState, nextX, nextY);
    if (pickedBox) {
      const pickedIndex = task.boxes.indexOf(pickedBox);
      degreeState.picked[pickedIndex] = true;
    }
    renderDegreeWorld();
    updateDegreeTaskUI();
    await wait(160);
  }
}

async function executeDegreeStatement(firstBlock) {
  let block = firstBlock;
  while (block && !degreeState.halted) {
    if (block.type === "move_in_direction") {
      degreeState.angle = normalizeAngle(block.getFieldValue("ANGLE"));
      renderDegreeWorld();
      await wait(150);
      await walkForward(Math.max(1, Number(block.getFieldValue("STEPS")) || 1));
    } else if (block.type === "move_forward") {
      await walkForward(Math.max(1, Number(block.getFieldValue("STEPS")) || 1));
    } else if (block.type === "set_rotation_mode") {
      degreeState.rotationMode = block.getFieldValue("MODE");
      renderDegreeWorld();
      await wait(150);
    } else if (block.type === "turn_left" || block.type === "turn_right") {
      const amount = normalizeAngle(block.getFieldValue("ANGLE"));
      degreeState.angle = normalizeAngle(degreeState.angle + (block.type === "turn_right" ? amount : -amount));
      renderDegreeWorld();
      await wait(220);
    } else if (block.type === "degree_repeat") {
      const times = Math.max(1, Math.min(10, Number(block.getFieldValue("TIMES")) || 1));
      const body = block.getInputTargetBlock("DO");
      for (let index = 0; index < times && !degreeState.halted; index += 1) {
        if (body) await executeDegreeStatement(body);
      }
    }
    block = block.nextConnection ? block.nextConnection.targetBlock() : null;
  }
}

function validateDegreeTask() {
  const task = currentDegreeTask();
  const blocks = collectDegreeBlocks();
  const types = new Set(blocks.map(function (block) { return block.type; }));
  const labels = {
    move_in_direction: "блок «идти в направлении»",
    move_forward: "блок «идти вперёд»",
    turn_left: "поворот влево",
    turn_right: "поворот вправо",
    degree_repeat: "цикл «повторить»",
    set_rotation_mode: "блок «установить способ вращения»"
  };

  for (const type of task.requiredBlocks || []) {
    if (!types.has(type)) return { ok: false, text: "В программе не хватает: " + labels[type] + "." };
  }
  for (const rule of task.requiredNesting || []) {
    if (!hasDegreeNesting(rule.parent, rule.child)) {
      return { ok: false, text: "В этой задаче нужные команды должны быть внутри цикла." };
    }
  }
  for (const type of Object.keys(task.blockLimits || {})) {
    const count = blocks.filter(function (block) { return block.type === type; }).length;
    if (count > task.blockLimits[type]) {
      return { ok: false, text: "В этой задаче блок «" + labels[type] + "» нельзя ставить столько раз. Попробуй сократить программу." };
    }
  }
  if (task.maxBlocks && blocks.length > task.maxBlocks) {
    return { ok: false, text: "Здесь можно использовать не больше " + task.maxBlocks + " блоков." };
  }
  if (task.requiredRotationMode && degreeState.rotationMode !== task.requiredRotationMode) {
    return { ok: false, text: "В этой задаче выбери способ вращения «влево-вправо»." };
  }
  if (Object.keys(degreeState.picked).length !== task.boxes.length) {
    return { ok: false, text: "Собраны не все коробки. Посмотри, где робот свернул не туда." };
  }
  return { ok: true, text: "Все коробки собраны!" };
}

function setDegreeControls(disabled) {
  ["runBtn", "resetCodeBtn", "prevTaskBtn", "nextTaskBtn"].forEach(function (id) {
    document.getElementById(id).disabled = disabled;
  });
}

function openDegreeResult(kind, text) {
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
    nextButton.textContent = degreeTaskIndex === DEGREE_TASKS.length - 1 ? "Завершить" : "Следующая задача";
    nextButton.classList.remove("hidden");
  } else if (kind === "hint") {
    kicker.textContent = "Подсказка";
    title.textContent = currentDegreeTask().title;
    content.textContent = currentDegreeTask().hint;
    retryButton.textContent = "Понятно";
    retryButton.classList.remove("hidden");
  } else {
    const attempts = degreeFailures[degreeTaskIndex] || 0;
    kicker.textContent = "Попытка " + attempts;
    title.textContent = attempts >= 3 ? "Пока не получилось" : "Что-то не так";
    content.textContent = attempts >= 3
      ? "Попробуй ещё раз. Теперь можно взять подсказку."
      : "Попробуй ещё раз и посмотри, куда смотрит робот.";
    if (attempts >= 3) hintButton.classList.remove("hidden");
    retryButton.textContent = "Попробовать снова";
    retryButton.classList.remove("hidden");
  }
}

function closeDegreeResult() {
  document.getElementById("resultModal").classList.add("hidden");
}

function registerDegreeFailure(reason) {
  degreeFailures[degreeTaskIndex] = (degreeFailures[degreeTaskIndex] || 0) + 1;
  updateDegreeHintAvailability();
  setDegreeStatus("Попробуй ещё", "error");
  showDegreeMessage(reason, "error");
  openDegreeResult("failure", reason);
}

async function runDegreeProgram() {
  if (degreeRunning) return;
  if (!degreeWorkspace.getTopBlocks(true).length) {
    registerDegreeFailure("Сначала собери программу из блоков.");
    return;
  }
  closeDegreeResult();
  degreeRunning = true;
  setDegreeControls(true);
  degreeState = cloneDegreeState(currentDegreeTask());
  renderDegreeWorld();
  updateDegreeTaskUI();
  setDegreeStatus("Выполнение...", "running");
  showDegreeMessage("Робот выполняет программу.", "info");

  try {
    const roots = degreeWorkspace.getTopBlocks(true)
      .filter(function (block) { return !block.outputConnection; })
      .sort(function (first, second) { return first.y - second.y; });
    for (const root of roots) {
      await executeDegreeStatement(root);
    }
    if (!degreeState.halted) {
      const result = validateDegreeTask();
      if (result.ok) {
        degreeCompleted[degreeTaskIndex] = true;
        localStorage.setItem(DEGREE_COMPLETED_STORAGE, JSON.stringify(degreeCompleted));
        setDegreeStatus("Выполнено", "success");
        showDegreeMessage(result.text, "success");
        updateDegreeTaskUI();
        openDegreeResult("success", result.text);
      } else {
        registerDegreeFailure(result.text);
      }
    }
  } catch (error) {
    registerDegreeFailure(error.message || "Робот остановился.");
  } finally {
    degreeRunning = false;
    setDegreeControls(false);
    updateDegreeTaskUI();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const savedTask = Number(localStorage.getItem(DEGREE_LAST_TASK_STORAGE));
  if (Number.isInteger(savedTask) && savedTask >= 0 && savedTask < DEGREE_TASKS.length) {
    degreeTaskIndex = savedTask;
  }
  initDegreeBlockly();
  loadDegreeTask(degreeTaskIndex, false);
  initPanelResizer();
  updateDegreeWorldZoom();

  document.getElementById("runBtn").addEventListener("click", runDegreeProgram);
  document.getElementById("resetCodeBtn").addEventListener("click", clearDegreeCode);
  document.getElementById("worldZoomOutBtn").addEventListener("click", function () {
    changeDegreeWorldZoom(-1);
  });
  document.getElementById("worldZoomInBtn").addEventListener("click", function () {
    changeDegreeWorldZoom(1);
  });
  document.getElementById("prevTaskBtn").addEventListener("click", function () {
    loadDegreeTask(degreeTaskIndex - 1);
  });
  document.getElementById("nextTaskBtn").addEventListener("click", function () {
    loadDegreeTask(degreeTaskIndex + 1);
  });
  document.getElementById("hintBtn").addEventListener("click", function () {
    setDegreeHintVisible(document.getElementById("hintText").classList.contains("hidden"));
  });
  document.getElementById("degreePickerClose").addEventListener("click", closeDegreePicker);
  document.getElementById("degreePickerApply").addEventListener("click", function () {
    closeDegreePicker();
  });
  window.addEventListener("pointermove", handlePickerPointerMove);
  window.addEventListener("pointerup", stopPickerDrag);
  window.addEventListener("pointercancel", stopPickerDrag);
  document.getElementById("modalRetryBtn").addEventListener("click", closeDegreeResult);
  document.getElementById("modalHintBtn").addEventListener("click", function () {
    openDegreeResult("hint");
  });
  document.getElementById("modalNextBtn").addEventListener("click", function () {
    closeDegreeResult();
    if (degreeTaskIndex < DEGREE_TASKS.length - 1) loadDegreeTask(degreeTaskIndex + 1);
  });
});




