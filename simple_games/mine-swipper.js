const Y = 10
const X = 12
const DX = [-1, 0, 1, -1, 1, -1, 0, 1]
const DY = [-1, -1, -1, 0, 0, 1, 1, 1] 

const table = document.querySelector('table')
const setMineNumber = (y, x) => Math.floor((y * x) / 8)
let mineNumber = setMineNumber(Y, X)

const grid = []
const visited = []
let cells = []
const cellIds = []
const mineIdList = []

function initGrid() {
  for (let i=0; i<Y; i++) {
    const row = new Array(X).fill(0)
    const boolRow = new Array(X).fill(false)
    grid.push(row)
    visited.push(boolRow)
  }
}

function makeTable() {
  for (let i=0; i < Y; i++) {
    const trTag = document.createElement('tr')
    const tr = table.appendChild(trTag)
    for (let j=0; j < X; j++) {
      const td = document.createElement('td')
      const id = `${i}-${j}`
      td.setAttribute('id', id)
      tr.appendChild(td)
      cellIds.push(id)
    }
  }
}

function plantMines() {
  const idxArr = [...cellIds.keys()] // 0 ~ Y*X
  for (let i=0; i<mineNumber; i++){ 
    // pick random id
    const r = Math.floor(Math.random() * idxArr.length)
    const randomIdx = idxArr[r]
    const minePoint = cellIds[randomIdx]
    idxArr.splice(r, 1)
    // plant into DOM
    const nowTd = document.getElementById(minePoint)
    mineIdList.push(minePoint)
    nowTd.setAttribute('class', 'mine')
    
    // plant into grid
    const yxArr = minePoint.split('-')
    grid[yxArr[0]][yxArr[1]] = -1
  }
}

function countMineAround() {
  mineIdList.forEach(minePoint => {
    const yxArr = minePoint.split('-')
    const y = Number(yxArr[0])
    const x = Number(yxArr[1])
    for (let i=0; i<8; i++) {
      const ny = y + DY[i]
      const nx = x + DX[i]
      if (ny >= 0 && ny < Y && nx >= 0 && nx < X && grid[ny][nx] !== -1) {
        grid[ny][nx]++
      }
    }
  })
}

function checkPoint(y, x) {
  if (y < 0 || y >= Y || x < 0 || x >= X) {
    return
  }
  if (visited[y][x]) {
    return
  }
  visited[y][x] = true
  // 지뢰
  const pointTd = document.getElementById(`${y}-${x}`)
  pointTd.setAttribute('class', 'visited')
  if (grid[y][x] === -1) {
    pointTd.innerText = grid[y][x]
    
  } else if (!grid[y][x]) {
    for (let i=0; i<8; i++) {
      const ny = y + DY[i]
      const nx = x + DX[i]
      if (0 <= ny < Y && 0 < nx <= X) {
        checkPoint(ny, nx)
      }
    }
  } else {
    pointTd.innerText = grid[y][x]
  }
}

document.oncontextmenu = function () {
  return false;
};

window.addEventListener('contextmenu', function (e) {
   e.preventDefault()
}, false);


window.onload = function(){
  initGrid()
  makeTable(Y, X)
  plantMines()
  countMineAround()
  cells = document.querySelectorAll('td')
  cells.forEach(cell => {
    cell.addEventListener('click', function(event) {
      const yxArr = cell.id.split('-')
      const y = Number(yxArr[0])
      const x = Number(yxArr[1])
      checkPoint(y, x)
    })
    cell.addEventListener('contextmenu', function(event) {
      event.preventDefault()
      if (event.target.innerText === '*') {
        event.target.innerText = ''
      } else {
        event.target.innerText = '*'
      }
    })
  })
}








