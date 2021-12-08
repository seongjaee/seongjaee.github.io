window.onload = function() {
  init(0)
}

let selectedOs = []
let selectedXs = []
let graph = [[null, null, null], [null, null, null], [null, null, null]]
let turn = 0
let playState = 0  // 게임 종류 0: 2인, 1: 쉬움, 2: 어려움

const h2Tag = document.querySelector('h2')
const cells = document.querySelectorAll('td')
const twoPBtn = document.getElementById('twoPBtn')
const easyBtn = document.getElementById('easyBtn')
// const hardBtn = document.getElementById('hardBtn')

twoPBtn.addEventListener('click', function() {
  init(0)
})
easyBtn.addEventListener('click', function() {
  init(1)
})
// hardBtn.addEventListener('click',{ playState = 2 } )

function init(state) {
  h2Tag.innerText = "O 's turn"
  selectedOs = []
  selectedXs = []
  graph = [[null, null, null], [null, null, null], [null, null, null]]
  turn = 0
  playState = state
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
      graph[td.id[1]][td.id[2]] = 0
      h2Tag.innerText = "X 's turn"
    } else {
      turn = 0
      td.innerText = 'X'
      selectedXs.push(td.id)
      graph[td.id[1]][td.id[2]] = 1
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
  if (playState === 0) {
    onSelect(td)
    if (checkGame()) {
      return
    }
  } else {
    if (td.innerText || turn === 1) {
      return
    }
    onSelect(td)
    if (checkGame()) {
      return
    }
    setTimeout(function () {
      comRandomSelect()
      if (checkGame()) {
        return
      }
    }, 600)
  }
}

function comRandomSelect() {
  let num = Math.floor(Math.random() * 9)
  let tdId = `_${parseInt(num/3)}${num%3}`
  while (selectedOs.includes(tdId) || selectedXs.includes(tdId)) {
    num = Math.floor(Math.random() * 9)
    tdId = `_${parseInt(num/3)}${num%3}`
  }
  const td = document.getElementById(tdId) 
  onSelect(td)
}

// function comMySelect() {

// }

// // MIN-MAX ALGORITHM
// function comSmartSelect() {
//   const myScores = []
//   for (let i=0; i<3; i++) {
//     for (let j=0; j<3; j++) {
//       if (graph[i][j] === null) {
//         if (turn === 0) {
//           graph[i][j] = 0
//           selectedOs.push(`_${i}${j}`)
//           const yourScores = []
//           for (let k=0; k<3; k++) {
//             for (let l=0; l<3; l++) {
//               if (graph[k][l] === null) {
//                 graph[k][l] = 1
//                 selectedXs.push(`_${k}${l}`)
//                 const score = getScore(graph, selectedOs, selectedXs)
//                 yourScores.push(score)
//                 graph[k][l] = null
//                 selectedXs.pop()
//               }
//             }
//           }
//           myScores.push([Math.min(...yourScores), `_${i}${j}`])
//           graph[i][j] = null
//           selectedOs.pop()
//         } else {
//           graph[i][j] = 1
//           selectedXs.push(`_${i}${j}`)
//           const yourScores = []
//           for (let k=0; k<3; k++) {
//             for (let l=0; l<3; l++) {
//               if (graph[k][l] === null) {
//                 graph[k][l] = 0
//                 selectedXs.push(`_${k}${l}`)
//                 const score = getScore(graph, selectedOs, selectedXs)
//                 yourScores.push(score)
//                 graph[k][l] = null
//                 selectedXs.pop()
//               }
//             }
//           }
//           myScores.push([Math.max(...yourScores), `_${i}${j}`])
//           graph[i][j] = null
//           selectedXs.pop()
//         }
//       }
//     }
//   }
//   myScores.sort((x, y) => x- y)
//   const result = turn ? myScores[0] : myScores[myScores.length - 1]
//   return result
// }

// // 점수 계산
// function getScore(graph, selectedOs, selectedXs) {
//   if (isWinner(selectedOs)) {
//     return 50
//   } else if (isWinner(selectedXs)) {
//     return -50
//   }
//   const scores = [8, 8]
//   // row
//   for (let row=0; row<3; row++) {
//     if (graph[row].some(mark => mark === 0)) {
//       scores[1]--
//     }
//     if (graph[row].some(mark => mark === 1)) {
//       scores[0]--
//     }
//   }
//   // column
//   for (let col=0; col<3; col++) {
//     if ([...Array(3).keys()].some(row => graph[row][col] === 0)) {
//       scores[1]--
//     }
//     if ([...Array(3).keys()].some(row => graph[row][col] === 1)) {
//       scores[0]--
//     }
//   }
//   // dg
//   if ([...Array(3).keys()].some(i => graph[i][i] === 0)) {
//     scores[1]--
//   }
//   if ([...Array(3).keys()].some(i => graph[i][i] === 1)) {
//     scores[0]--
//   }
//   if ([...Array(3).keys()].some(i => graph[i][2-i] === 0)) {
//     scores[1]--
//   }
//   if ([...Array(3).keys()].some(i => graph[i][2-i] === 1)) {
//     scores[0]--
//   }
//   return scores[0] - scores[1]
// }



cells.forEach(cell => {
  cell.addEventListener('click', event => onClick(event.target))
})

