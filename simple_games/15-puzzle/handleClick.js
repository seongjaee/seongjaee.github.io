import { setBlank } from "./blank.js";
import { isCleared, handleGameCleared } from "./clear.js";

export function handleClickBlock(block) {
  const y = block.id[1];
  const x = block.id[2];
  const dy = y - blankPoint[0];
  const dx = x - blankPoint[1];
  if ((dy === 0 && Math.abs(dx) === 1) || (dx === 0 && Math.abs(dy) === 1)) {
    setBlank(y, x);
  }
  if (isCleared()) {
    handleGameCleared();
  }
}
