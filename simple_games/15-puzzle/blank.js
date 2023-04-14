// 빈 칸 좌표. 사용자 입력에 따라 갱신
export const blankPoint = [3, 3];

// 입력한 y, x좌표를 빈 칸으로 만들기
export function setBlank(y, x) {
  const blankBlock = document.querySelector(".blank");
  const newBlankBlock = document.querySelector(`#_${y}${x}`);
  // 숫자 swap
  const temp = blankBlock.innerText;
  blankBlock.innerText = newBlankBlock.innerText;
  newBlankBlock.innerText = temp;
  // blank 클래스 조정
  blankBlock.removeAttribute("class");
  newBlankBlock.setAttribute("class", "blank");
  blankPoint[0] = y;
  blankPoint[1] = x;
}
