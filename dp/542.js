//solution to leetcode 542

/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  let ROWS = mat.length;
  let COLS = mat[0].length;

  let queue = [];
  let step = 0;

  let res = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => 0)
  );

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (mat[r][c] === 0) {
        queue.push([r, c]);
        mat[r][c] = -1; //mark as visited
      }
    }
  }

  while (queue.length > 0) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let [r, c] = queue.shift();
      res[r][c] = step;

      let neighbors = [
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      ];
      for (let [nr, nc] of neighbors) {
        if (
          nr >= 0 &&
          nr < ROWS &&
          nc >= 0 &&
          nc < COLS &&
          mat[nr][nc] !== -1
        ) {
          queue.push([nr, nc]);
          mat[nr][nc] = -1; //mark as visited
        }
      }
    }
    step += 1;
  }

  return res;
};

function updateMatrixOptimal(mat) {
  let ROWS = mat.length;
  let COLS = mat[0].length;
  let INF = ROWS + COLS;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (mat[r][c] === 0) continue;
      let top = INF,
        left = INF;
      if (r > 0) top = mat[r - 1][c];
      if (c > 0) left = mat[r][c - 1];

      mat[r][c] = Math.min(top, left) + 1;
    }
  }

  for (let r = ROWS - 1; r >= 0; r--) {
    for (let c = COLS - 1; c >= 0; c--) {
      if (mat[r][c] === 0) continue;
      let right = INF,
        bottom = INF;
      if (r < ROWS - 1) bottom = mat[r + 1][c];
      if (c < COLS - 1) right = mat[r][c + 1];
      mat[r][c] = Math.min(mat[r][c], Math.min(right, bottom) + 1);
    }
  }
  return mat;
}
