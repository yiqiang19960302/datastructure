/**
 * @param {string[]} matrix
 * @return {number}
 */

const { PriorityQueue } = require("@datastructures-js/priority-queue");

var minMoves = function (matrix) {
  let ROWS = matrix.length;
  let COLS = matrix[0].length;
  let visited = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));

  let queue = [];
  let step = 0;

  let teleportsMap = new Map();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (matrix[r][c] !== "." && matrix[r][c] !== "#") {
        let key = matrix[r][c];
        if (!teleportsMap.has(key)) {
          teleportsMap.set(key, []);
        }
        teleportsMap.get(key).push([r, c]);
      }
    }
  }

  // if the first cell is a teleport, we need to add all the teleports to the queue
  // and mark them as visited
  // otherwise we just add the first cell to the queue
  if (teleportsMap.has(matrix[0][0])) {
    let teleports = teleportsMap.get(matrix[0][0]);
    for (let [newR, newC] of teleports) {
      queue.push([newR, newC]);
      visited[newR][newC] = true;
    }
    teleportsMap.delete(matrix[0][0]);
  } else {
    queue.push([0, 0]);
    visited[0][0] = true;
  }

  while (queue.length > 0) {
    let size = queue.length;
    while (size > 0) {
      let [r, c] = queue.shift();

      if (r === ROWS - 1 && c === COLS - 1) {
        return step;
      }
      size -= 1;

      let neighbors = [
        [r + 1, c],
        [r - 1, c],
        [r, c + 1],
        [r, c - 1],
      ];

      for (let [newR, newC] of neighbors) {
        if (
          newR >= 0 &&
          newR < ROWS &&
          newC >= 0 &&
          newC < COLS &&
          matrix[newR][newC] !== "#" &&
          !visited[newR][newC]
        ) {
          if (teleportsMap.has(matrix[newR][newC])) {
            let teleports = teleportsMap.get(matrix[newR][newC]);
            for (let [teleR, teleC] of teleports) {
              queue.push([teleR, teleC]);
              visited[teleR][teleC] = true;
            }
            teleportsMap.delete(matrix[newR][newC]);
          } else {
            queue.push([newR, newC]);
            visited[newR][newC] = true;
          }
        }
      }
    }

    step += 1;
  }

  return -1;
};

function minMovesWithPQ(matrix) {
  let ROWS = matrix.length;
  let COLS = matrix[0].length;
  let visited = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));

  let queue = new PriorityQueue((a, b) => a[2] - b[2]); //[row, col, step]

  let teleportsMap = new Map();
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (matrix[r][c] !== "." && matrix[r][c] !== "#") {
        let key = matrix[r][c];
        if (!teleportsMap.has(key)) {
          teleportsMap.set(key, []);
        }
        teleportsMap.get(key).push([r, c]);
      }
    }
  }

  // if the first cell is a teleport, we need to add all the teleports to the queue
  // and mark them as visited
  // otherwise we just add the first cell to the queue

  if (teleportsMap.has(matrix[0][0])) {
    let teleports = teleportsMap.get(matrix[0][0]);
    for (let [newR, newC] of teleports) {
      queue.enqueue([newR, newC, 0]);
    }
    teleportsMap.delete(matrix[0][0]);
  } else {
    queue.enqueue([0, 0, 0]);
  }

  while (!queue.isEmpty()) {
    let [r, c, step] = queue.dequeue();

    if (r === ROWS - 1 && c === COLS - 1) {
      return step;
    }
    if (visited[r][c]) {
      continue;
    }

    visited[r][c] = true;

    let neighbors = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ];

    for (let [newR, newC] of neighbors) {
      if (
        newR >= 0 &&
        newR < ROWS &&
        newC >= 0 &&
        newC < COLS &&
        matrix[newR][newC] !== "#" &&
        !visited[newR][newC]
      ) {
        if (teleportsMap.has(matrix[newR][newC])) {
          let teleports = teleportsMap.get(matrix[newR][newC]);
          for (let [teleR, teleC] of teleports) {
            queue.enqueue([teleR, teleC, step + 1]);
            // visited[teleR][teleC] = true;
          }
          teleportsMap.delete(matrix[newR][newC]);
        } else {
          queue.enqueue([newR, newC, step + 1]);
          //   visited[newR][newC] = true;
        }
      }
    }
  }

  return -1;
}

let matrix = ["A..", ".A.", "..."];
console.log(minMovesWithPQ(matrix)); // 2
