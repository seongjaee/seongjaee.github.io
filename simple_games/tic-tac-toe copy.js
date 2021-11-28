window.onload = function() {
  init()
}

let selectedOs = []
let selectedXs = []
let turn = 0

const h2Tag = document.querySelector('h2')
const cells = document.querySelectorAll('td')

function init() {
  h2Tag.innerText = "O 's turn"
  selectedOs = []
  selectedXs = []
  turn = 0
  cells.forEach(cell => {
    cell.innerText = ''
  })
}

function onSelect(td) {
  if (!td.innerText) {
    if (turn === 0) {
      turn = 1
      td.innerText = 'O'
      selectedOs.push(td.id)
      h2Tag.innerText = "X 's turn"
    } else {
      turn = 0
      td.innerText = 'X'
      selectedXs.push(td.id)
      h2Tag.innerText = "O 's turn"
    }
  }
}

function isWinner(selectedCells) {
  const counter = [0, 0, 0, 0, 0, 0, 0, 0]
  for (cell of selectedCells) {
    const row = Number(cell[1])
    const col = Number(cell[2])
    counter[row]++
    counter[col + 3]++
    if (row === col){
      counter[6]++
    }
    if (row + col === 2){
      counter[7]++
    }
  }
  return counter.includes(3)
}

function isOver() {
  return selectedOs.length + selectedXs.length === 9
}

function checkGame() {
  if (isWinner(selectedOs)){
    setTimeout(function() {
      alert('O Win !')
      init()
    }, 150)
    return true
  } else if (isWinner(selectedXs)) {
    setTimeout(function() {
      alert('X Win !')
      init()
    }, 150)
    return true
  } else if (isOver()) {
    setTimeout(function() {
      alert('Draw !')
      init()
    }, 150)
    return true
  }
  return false
}

// turn = 0일 때, O의 차례에만 플레이어가 선택할 수 있도록
function onClick(td) {
  if (td.innerText || turn === 1) {
    return
  }
  onSelect(td)
  if (checkGame()) {
    return
  }
  setTimeout(function () {
    comSelect()
    if (checkGame()) {
      return
    }
  }, 600)
}

function comRandomSelect() {
  let num = Math.floor(Math.random() * 9)
  let tdId = `_${parseInt(num/3)}${num%3}`
  while (selectedOs.includes(tdId) || selectedXs.includes(tdId)) {
    num = Math.floor(Math.random() * 9)
    tdId = `_${parseInt(num/3)}${num%3}`
  }
  const td = document.getElementById(tdId) 
  console.log('COM!', td)
  onSelect(td)
}

// MIN-MAX ALGORITHM
function comSmartSelect() {
  
}



cells.forEach(cell => {
  cell.addEventListener('click', event => onClick(event.target))
})

