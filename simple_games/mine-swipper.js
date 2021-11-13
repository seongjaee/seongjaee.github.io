const table = document.querySelector('table')
const setMineNumber =  (y, x) => Math.floor((y * x) / 8)
let mineNumber = setMineNumber(5, 5)

const grid = []
const cellIds = []
const mineIdList = []

const initGrid = function(h, w) {
  for (let i=0; i<h; i++) {
    const row = new Array(w).fill(0)
    grid.push(row)
  }
}

const makeTable = function(h, w) {
  for (let i=0; i < h; i++){
    const trTag = document.createElement('tr')
    const tr = table.appendChild(trTag)
    for (let j=0; j < w; j++){
      const td = document.createElement('td')
      const id = `${i}-${j}`
      td.setAttribute('id', id)
      tr.appendChild(td)
      cellIds.push(id)
    }
  }
}

const plantMines = function() {
  const idxArr = [...cellIds.keys()]
  for (let i=0; i<mineNumber; i++){
    const randomIdx = Math.floor(Math.random() * (idxArr.length - i))
    const nowTd = document.getElementById(cellIds[randomIdx])
    mineList.push(cellIds[randomIdx])
    nowTd.setAttribute('class', 'mine')
    idxArr.splice(randomIdx, 1)
  }
}

const countMineAround = function() {
  mineList.forEach(minePoint => {
    const yxArr = minePoint.split('-')
    const y = yxArr[0]
    const x = yxArr[1]
  })
}

window.onload = function(){
  makeTable(5, 5)
}

