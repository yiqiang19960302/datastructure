// 174. Dungeon Game

// from bottom up
var calculateMinimumHP = function (dungeon) {
  let ROWS = dungeon.length;
  let COLS = dungeon[0].length;

  let dp = new Array(COLS + 1).fill(Infinity);

  // init first row to avoid corner case
  dp[COLS - 1] =
    dungeon[ROWS - 1][COLS - 1] >= 0 ? 0 : 0 - dungeon[ROWS - 1][COLS - 1];
  for (let c = COLS - 2; c >= 0; c--) {
    if (dungeon[ROWS - 1][c] >= 0) {
      dp[c] = Math.max(dp[c + 1] - dungeon[ROWS - 1][c], 0);
    } else {
      dp[c] = dp[c + 1] - dungeon[ROWS - 1][c];
    }
  }

  for (let r = ROWS - 2; r >= 0; r--) {
    // let newRow = new Array(COLS+1).fill(Infinity)
    for (let c = COLS - 1; c >= 0; c--) {
      if (dungeon[r][c] >= 0) {
        dp[c] = Math.max(Math.min(dp[c], dp[c + 1]) - dungeon[r][c], 0);
      } else {
        dp[c] = -dungeon[r][c] + Math.min(dp[c], dp[c + 1]);
      }
    }
    // dp = newRow
  }
  return dp[0] + 1;
};

//from top down

// newRequired = prevRequired + Math.max(1-(prevCurrent+dungeon[r][c]), 0)
// newCurrent = Math.max(prevCurrent + dungeon[r][c] , 1)

var calculateMinimumHP2 = function (dungeon) {
  let ROWS = dungeon.length;
  let COLS = dungeon[0].length;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r == 0 && c == 0) {
        let required = Math.max(1 - dungeon[r][c], 0);
        let current = Math.max(dungeon[r][c], 1);
        dungeon[r][c] = [required, current];
      } else if (r == 0) {
        let [prevRequired, prevCurr] = dungeon[r][c - 1];
        let newRequired =
          prevRequired + Math.max(1 - (prevCurr + dungeon[r][c]), 0);
        let newCurrent = Math.max(prevCurr + dungeon[r][c], 1);
        dungeon[r][c] = [newRequired, newCurrent];
      } else if (c == 0) {
        let [prevRequired, prevCurr] = dungeon[r - 1][c];
        let newRequired =
          prevRequired + Math.max(1 - (prevCurr + dungeon[r][c]), 0);
        let newCurrent = Math.max(prevCurr + dungeon[r][c], 1);
        dungeon[r][c] = [newRequired, newCurrent];
      } else {
        let [prevRequired, prevCurr] = dungeon[r - 1][c];
        let [prevRequired2, prevCurr2] = dungeon[r][c - 1];
        let newRequired1 =
          prevRequired + Math.max(1 - (prevCurr + dungeon[r][c]), 0);
        let newRequired2 =
          prevRequired2 + Math.max(1 - (prevCurr2 + dungeon[r][c]), 0);
        if (newRequired1 < newRequired2) {
          dungeon[r][c] = [newRequired1, Math.max(prevCurr + dungeon[r][c], 1)];
        } else {
          dungeon[r][c] = [
            newRequired2,
            Math.max(prevCurr2 + dungeon[r][c], 1),
          ];
        }
      }
    }
  }

  return dungeon[ROWS - 1][COLS - 1][0];
};

// some test case cannot pass
// [[1,-3,3],[0,-2,0],[-3,-3,-3]]
// so top down is not correct
// but bottom up is correct
