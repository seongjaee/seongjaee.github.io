const body = document.body;
const root = document.getElementById("root");
const firstRow = document.querySelector(".first-row");
const secondRow = document.querySelector(".second-row");
const thirdRow = document.querySelector(".third-row");

body.addEventListener("keydown", (e) => {
  const key = e.key.toUpperCase();
  if (!isKeyOnPressed[key]) {
    isKeyOnPressed[key] = true;
    handleKey(key);
  }
});

body.addEventListener("keyup", (e) => {
  const key = e.key.toUpperCase();
  isKeyOnPressed[key] = false;
  handleKey(key);
});

const isKeyOnPressed = {};
const keys = {};

function handleKey(key) {
  keys[key].classList.toggle("on");
}

function createKeyButtonElement(rowElement, key) {
  isKeyOnPressed[key] = false;

  const keyElement = document.createElement("span");
  keyElement.className = "key";
  keyElement.id = key;
  keyElement.innerText = key;

  keys[key] = keyElement;
  rowElement.appendChild(keyElement);
}

function createKeyBoard() {
  for (let key of "QWERTYUIOP[]") {
    createKeyButtonElement(firstRow, key);
  }
  for (let key of "ASDFGHJKL;'") {
    createKeyButtonElement(secondRow, key);
  }
  for (let key of "ZXCVBNM,./") {
    createKeyButtonElement(thirdRow, key);
  }
}

createKeyBoard();
