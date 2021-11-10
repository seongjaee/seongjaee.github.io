let selectedOs = []
let selectedXs = []
let turn = 0
const cells = document.querySelectorAll('td')

const init = function() {
  selectedOs = []
  selectedXs = []
  turn = 0
  cells.forEach(cell => {
    cell.innerText = ''
  })
}

const onClick = function(event) {
  if (!event.target.innerText) {
    if (turn === 0) {
      turn = 1
      event.target.innerText = 'O'
      selectedOs.push(event.target.id)
    } else {
      turn = 0
      event.target.innerText = 'X'
      selectedXs.push(event.target.id)
    }
  } 
}

const isOver = function(selectedCells) {
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


cells.forEach(cell => {
  cell.addEventListener('click', event => {
    onClick(event)
    if (isOver(selectedOs)){
      setTimeout(function() {
        alert('O Win!')
        init()
      }, 150)
      
    } else if (isOver(selectedXs)) {
      setTimeout(function() {
        alert('X Win!')
        init()
      }, 150)
    }
  })
})