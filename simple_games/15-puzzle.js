window.onload = function() {
  shuffle()
}

const blocksIds = [
  '_00', '_01', '_02', '_03',
  '_10', '_11', '_12', '_13',
  '_20', '_21', '_22', '_23',
  '_30', '_31', '_32', '_33',
]

// 빈 칸 좌표. 사용자 입력에 따라 갱신됨.
const blankPoint = [3, 3]

// blankBlockPoint에 따라 HTML요소에 class=blank 부여, innerText swap
const setBlank = function(newY, newX) {
  const blankBlock = document.querySelector('.blank')
  const newBlankBlock = document.querySelector(`#_${newY}${newX}`)
  // 숫자 swap
  const temp = blankBlock.innerText
  blankBlock.innerText = newBlankBlock.innerText
  newBlankBlock.innerText = temp
  // blank 클래스 조정
  blankBlock.removeAttribute('class')
  newBlankBlock.setAttribute('class', 'blank')
  blankPoint[0] = newY
  blankPoint[1] = newX
}


// 보드판 섞기
const shuffle = function() {
  // 빈 칸을 맨 아래 오른쪽으로 설정
  setBlank(3, 3)
  blankPoint[0] = 3
  blankPoint[1] = 3
  // 숫자 섞기
  const resultNums = []
  const numbers = [...Array(15).keys()]
  for (let i=14; i>=0; i--){
    const randomIdx = Math.floor(Math.random() * (i + 1))
    resultNums.push(numbers[randomIdx])
    numbers.splice(randomIdx, 1)
  }
  let idIndex14 = 0
  let idIndex15 = 0
  // 보드판에 적용
  for (let i=0; i<15; i++){
    const block = document.getElementById(blocksIds[i])
    block.innerText = resultNums[i] + 1
    if (resultNums[i] + 1 === 14){
      idIndex14 = i
    } else if (resultNums[i] + 1 === 15){
      idIndex15 = i
    }
  }
  document.getElementById('_33').innerText = 16
  // 풀 수 없으면 14와 15 자리 바꿈
  if (!isSolvable()){
    document.getElementById(blocksIds[idIndex14]).innerText = 15
    document.getElementById(blocksIds[idIndex15]).innerText = 14
  }
}

// 클리어 확인
const isCleared = function() {
  for (let i=0; i<16; i++) {
    if (document.getElementById(blocksIds[i]).innerText != i + 1){
      return false
    }
  }
  return true
}

// 클리어 가능한 퍼즐인지 확인
const isSolvable = function() {
  let cnt = 0
  blocksIds.forEach((id, index) => {
    const num = parseInt(document.getElementById(id).innerText)
    cnt += blocksIds.slice(index+1)
      .filter(id => parseInt(document.getElementById(id).innerText) < num).length
  })
  return !(cnt % 2)
}

// 모바일 터치 입력에 따른 동작
const restartBtn = document.querySelector('#restartBtn')
restartBtn.addEventListener('touchend', function(event) {
  shuffle()
})

const blocks = document.querySelectorAll('td')
blocks.forEach(block => {
  block.addEventListener('touchstart', function(event) {
    const y = block.id[1]
    const x = block.id[2]
    const dy = y - blankPoint[0]
    const dx = x - blankPoint[1]
    if ((dy === 0 && Math.abs(dx) === 1) || (dx === 0 && Math.abs(dy) === 1)){
      setBlank(y, x)
    }
    if (isCleared()){
      setTimeout(function() {
        confirm('Clear!')
        shuffle()
      }, 200);
    }
  })
})



// 키보드 입력에 따른 동작
document.addEventListener('keydown', function(event) {
  switch (event.code) {
    case 'ArrowUp': {
      if (blankPoint[0] < 3){
        setBlank(blankPoint[0] + 1, blankPoint[1])
      }
      break
    }
    case 'ArrowDown': {
      if (blankPoint[0] > 0){
        setBlank(blankPoint[0] - 1, blankPoint[1])
      }
      break
    }
    case 'ArrowLeft': {
      if (blankPoint[1] < 3){
        setBlank(blankPoint[0], blankPoint[1] + 1)
      }
      break
    }
    case 'ArrowRight': {
      if (blankPoint[1] > 0){
        setBlank(blankPoint[0], blankPoint[1] - 1)
      }
      break
    }
    case 'Space':{
      shuffle()
    }
  }
  if (isCleared()){
    setTimeout(function() {
      confirm('Clear!')
      shuffle()
    }, 200);
  }
})