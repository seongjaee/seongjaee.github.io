import { blankPoint, setBlank } from "./blank.js";
import { isCleared, handleGameCleared } from "./clear.js";

// 키보드 입력에 따른 동작
const funcs = {
  ArrowUp: moveUp,
  ArrowDown: moveDown,
  ArrowLeft: moveLeft,
  ArrowRight: moveRight,
};

function moveUp() {
  if (blankPoint[0] < 3) {
    setBlank(blankPoint[0] + 1, blankPoint[1]);
  }
}

function moveDown() {
  if (blankPoint[0] > 0) {
    setBlank(blankPoint[0] - 1, blankPoint[1]);
  }
}

function moveLeft() {
  if (blankPoint[1] < 3) {
    setBlank(blankPoint[0], blankPoint[1] + 1);
  }
}

function moveRight() {
  if (blankPoint[1] > 0) {
    setBlank(blankPoint[0], blankPoint[1] - 1);
  }
}

function move(keyCode) {
  if (keyCode in funcs) {
    funcs[keyCode]();
    return true;
  }
  return false;
}

export function handleKeyboardInput(event) {
  const keyCode = event.code;
  if (keyCode === "Space") {
    shuffle();
    return;
  }
  const isMoved = move(keyCode);
  if (!isMoved) {
    return;
  }

  if (isCleared()) {
    handleGameCleared();
  }
}
