// solution to leetcode 688 knight probability in chessboard

/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
// dp[k][i][j] represents the probability on position [i, j] after k steps
// dp[k][i][j] = Sum(dp[k-1][ni][nj]/8) where (ni, nj) is the position where can move to (i, j) in one step

var knightProbability = function (n, k, row, column) {
  moves = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
  ];

  // initialized the board
  let board = Array.from({ length: n }, () => new Array(n).fill(0));
  board[row][column] = 1;

  while (k > 0) {
    let newBoard = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        for (let [deltaR, deltaC] of moves) {
          let sourceR = r + deltaR;
          let sourceC = c + deltaC;
          if (sourceR < n && sourceR >= 0 && sourceC < n && sourceC >= 0) {
            newBoard[r][c] += board[sourceR][sourceC] / 8;
          }
        }
      }
    }
    board = newBoard;
    k -= 1;
  }

  let res = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      res += board[r][c];
    }
  }

  return res;
};

let n = 3,
  k = 2,
  row = 0,
  column = 0;
console.log(knightProbability(n, k, row, column));
