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

function onSelect(event) {
  if (!event.target.innerText) {
    if (turn === 0) {
      turn = 1
      event.target.innerText = 'O'
      selectedOs.push(event.target.id)
      h2Tag.innerText = "X 's turn"
    } else {
      turn = 0
      event.target.innerText = 'X'
      selectedXs.push(event.target.id)
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

function onClick(event) {
  onSelect(event)
  if (isWinner(selectedOs)){
    setTimeout(function() {
      alert('O Win !')
      init()
    }, 150)
    
  } else if (isWinner(selectedXs)) {
    setTimeout(function() {
      alert('X Win !')
      init()
    }, 150)
  } else if (isOver()) {
    setTimeout(function() {
      alert('Draw !')
      init()
    }, 150)
  }
}

cells.forEach(cell => {
  cell.addEventListener('click', event => onClick(event))
})

