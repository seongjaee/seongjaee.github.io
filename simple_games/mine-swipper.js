// 우클릭 방지
document.oncontextmenu = function () {
  return false;
};

window.addEventListener('contextmenu', function (e) {
   e.preventDefault()
}, false);

window.onload = function(){
  initGame()
}

const Y = 10
const X = 12
const DX = [-1, 0, 1, -1, 1, -1, 0, 1]
const DY = [-1, -1, -1, 0, 0, 1, 1, 1] 

const markedImgSrc = 'marker.png'
const table = document.querySelector('table')
const setMineNumber = (y, x) => Math.floor((y * x) / 6)
let mineNumber = setMineNumber(Y, X)

let grid = []
let visited = []
let cells = []
let cellIds = []
let mineIdList = []
let flaggedIdList = []

function initGrid() {
  for (let i=0; i<Y; i++) {
    const row = new Array(X).fill(0)
    const boolRow = new Array(X).fill(false)
    grid.push(row)
    visited.push(boolRow)
  }
}

function makeTable() {
  table.innerHTML = ''
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
    pointTd.innerText = '●'
    setTimeout(() => {
      confirm('Boom!')
      initGame()
    }, 10)
    
  } else if (!grid[y][x]) {

    pointTd.setAttribute('class', 'visited nonclickable')
    for (let i=0; i<8; i++) {
      const ny = y + DY[i]
      const nx = x + DX[i]
      if (0 <= ny && ny < Y && 0 <= nx && nx < X) {
        checkPoint(ny, nx)
      }
    }
  } else {
    pointTd.innerText = grid[y][x]
  }
}

function onClick(event) {
  const yxArr = event.target.id.split('-')
  const y = Number(yxArr[0])
  const x = Number(yxArr[1])
  if (event.target.innerText !== '*'){
    checkPoint(y, x)
  }
  if (isFinish()) {
    setTimeout(() => {
      confirm('Clear!')
      initGame()
    }, 1)
  }
}

function onRightClick(event) {
  event.preventDefault()
  const yxArr = event.target.id.split('-')
  const y = Number(yxArr[0])
  const x = Number(yxArr[1])
  if (visited[y][x]) {
    return
  }
  if (event.target.tagName === 'IMG') {
    event.target.remove()
  }
  if (event.target.children.length) {
    const imgTag = event.target.children[0]
    event.target.removeChild(imgTag)
  } else {
    const markedImgTag = document.createElement('img')
    markedImgTag.setAttribute('src', markedImgSrc)
    event.target.appendChild(markedImgTag)
  }
}

function onDoubleClick(event) {
  const yxArr = event.target.id.split('-') 
  const y = Number(yxArr[0])
  const x = Number(yxArr[1])
  let count = 0
  for (let i=0; i<8; i++) {
    const ny = y + DY[i]
    const nx = x + DX[i]
    if (0 <= ny && ny < Y && 0 <= nx && nx < X) {
      if (document.getElementById(`${ny}-${nx}`).children.length){
        count++
      }
    }
  }
  if (grid[y][x] === count) {
    for (let i=0; i<8; i++) {
      const ny = y + DY[i]
      const nx = x + DX[i]
      if (0 <= ny && ny < Y && 0 <= nx && nx < X) {
        if (!document.getElementById(`${ny}-${nx}`).children.length)
        checkPoint(ny, nx)
      }
    }
  }
  if (isFinish()) {
    setTimeout(() => {
      confirm('Clear!')
      initGame()
    }, 1)
  }
}

function isFinish() {
  let result = 0
  visited.forEach(row => {
    row.forEach(v => {
      if (v) {
        result++
      }
    })
  })
  return result === X * Y - mineNumber
}

function initGame() {
  grid = []
  visited = []
  cells = []
  cellIds = []
  mineIdList = []
  flaggedIdList = []
  initGrid()
  makeTable(Y, X)
  plantMines()
  countMineAround()
  cells = document.querySelectorAll('td')
  cells.forEach(cell => {
    cell.addEventListener('click', event => onClick(event))
    cell.addEventListener('contextmenu', event => onRightClick(event))
    cell.addEventListener('dblclick', event => onDoubleClick(event))
  })
}
