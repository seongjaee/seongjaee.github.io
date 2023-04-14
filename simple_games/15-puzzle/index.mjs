import { blocksIds } from "./constant.js";
import { blankPoint, setBlank } from "./blank.js";
import { handleKeyboardInput } from "./handleKeyboard.js";
import { isCleared, isSolvable } from "./clear.js";
import { handleClickBlock } from "./handleClick.js";

window.onload = function () {
  shuffle();
};

const suffleBtn = document.querySelector("#suffleBtn");

// 보드판 섞기
function shuffle() {
  // 빈 칸을 맨 아래 오른쪽으로 설정
  setBlank(3, 3);

  // 숫자 섞기
  const resultNums = [];
  const numbers = [...Array(15).keys()];
  for (let i = 14; i >= 0; i--) {
    const randomIdx = Math.floor(Math.random() * (i + 1));
    resultNums.push(numbers[randomIdx]);
    numbers.splice(randomIdx, 1);
  }
  let idIndex14 = 0;
  let idIndex15 = 0;
  // 보드판에 적용
  for (let i = 0; i < 15; i++) {
    const block = document.getElementById(blocksIds[i]);
    block.innerText = resultNums[i] + 1;
    if (resultNums[i] + 1 === 14) {
      idIndex14 = i;
    } else if (resultNums[i] + 1 === 15) {
      idIndex15 = i;
    }
  }
  document.getElementById("_33").innerText = 16;
  // 풀 수 없으면 14와 15 자리 바꿈
  if (!isSolvable()) {
    document.getElementById(blocksIds[idIndex14]).innerText = 15;
    document.getElementById(blocksIds[idIndex15]).innerText = 14;
  }
}

const blocks = document.querySelectorAll("td");
blocks.forEach((block) => {
  block.addEventListener("click", function () {
    handleClickBlock(block);
  });
});

// 마우스 클릭, 모바일 터치 입력에 따른 동작
suffleBtn.addEventListener("click", function () {
  shuffle();
});

document.addEventListener("keydown", function (event) {
  handleKeyboardInput(event);
});
