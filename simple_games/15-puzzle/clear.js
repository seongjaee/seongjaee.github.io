import { blocksIds } from "./constant.js";

// 클리어 확인
export function isCleared() {
  for (let i = 0; i < 16; i++) {
    if (document.getElementById(blocksIds[i]).innerText != i + 1) {
      return false;
    }
  }
  return true;
}

// 클리어 가능한 퍼즐인지 확인
export function isSolvable() {
  let cnt = 0;
  const getNumOfBlock = (id) => parseInt(document.getElementById(id).innerText);

  blocksIds.forEach((id, index) => {
    const num = getNumOfBlock(id);
    const smallerIds = blocksIds.slice(index + 1);
    cnt += smallerIds.filter((smallId) => getNumOfBlock(smallId) < num).length;
  });
  return !(cnt % 2);
}

export function handleGameCleared() {
  setTimeout(function () {
    confirm("Clear!");
    shuffle();
  }, 0);
}
