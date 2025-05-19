// In this problem, we are given a scenario where we have n houses in a row,
// and we need to paint each house in such a way that no two adjacent houses have the same color.
// There are three colors available: red, blue, and green. The cost of painting each house with each color is different and is provided to us
// in the form of a n x 3 cost matrix - costs.

// Each row in the costs matrix corresponds to a house, and each column to a color
// (where the first column is red, the second is blue, and the third is green).
// For instance, costs[0][0] represents the cost of painting the first house red, while costs[1][2] represents the cost of painting the second house green.

// Our goal is to find the minimum total cost to paint all the houses while making sure that no two adjacent houses are painted the same color.

// costs = [[17, 2, 17],
//          [16, 16, 5],
//          [14, 3, 19]]

// totalMinCosts = [
//     [17, 2, 17],
//     [18, 33, 7],
//     [21, 10, 37]
// ]

function minCost(paintingCosts) {
  let ROWS = paintingCosts.length;
  let COLS = paintingCosts[0].length;
  let dp = new Array(COLS).fill(0);

  for (let r = 0; r < ROWS; r++) {
    let nextRow = new Array(COLS).fill(0);
    for (let c = 0; c < COLS; c++) {
      let prevMin = Infinity;

      for (let other = 0; other < COLS; other++) {
        if (other === c) {
          continue;
        } else {
          prevMin = Math.min(prevMin, dp[other]);
        }
      }

      nextRow[c] = paintingCosts[r][c] + prevMin;
    }
    console.log(nextRow);
    dp = nextRow;
  }

  return Math.min(...dp);
}

let costs = [
  [17, 2, 17],
  [16, 16, 5],
  [14, 3, 19],
];

console.log(minCost(costs));
