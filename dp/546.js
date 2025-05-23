// solution to leetcode 546

// You are given several boxes with different colors represented by different positive numbers.

// You may experience several rounds to remove boxes until there is no box left. Each time you can choose some continuous boxes with the same color (i.e., composed of k boxes, k >= 1), remove them and get k * k points.

// Return the maximum points you can get.

// Example 1:

// Input: boxes = [1,3,2,2,2,3,4,3,1]
// Output: 23
// Explanation:
// [1, 3, 2, 2, 2, 3, 4, 3, 1]
// ----> [1, 3, 3, 4, 3, 1] (3*3=9 points)
// ----> [1, 3, 3, 3, 1] (1*1=1 points)
// ----> [1, 1] (3*3=9 points)
// ----> [] (2*2=4 points)
// Example 2:

// Input: boxes = [1,1,1]
// Output: 9
// Example 3:

// Input: boxes = [1]
// Output: 1

/**
 * @param {number[]} boxes
 * @return {number}
 */

class RemoveBoxes {
  /**
   * @param {number[]} boxes
   * @return {number}
   */
  solution(boxes) {
    let cache = new Map();

    function dfs(boxes) {
      if (boxes.length === 0) return 0;

      let key = boxes.join("");

      if (!cache.has(key)) {
        let res = 0;
        for (let i = 0; i < boxes.length; i++) {
          // skip the repeated case
          if (i > 0 && boxes[i] === boxes[i - 1]) {
            continue;
          }

          let [score, newBoxes] = this.helper(boxes, i);
          res = Math.max(res, score + dfs(newBoxes));
        }
        cache.set(key, res);
      }

      return cache.get(key);
    }

    return dfs(boxes);
  }

  // give the boxes and idx user choosen, return the new arrangement of the boxes and score of the round
  helper(boxes, idx) {
    let end = idx + 1;
    while (end < boxes.length && boxes[end] === boxes[end - 1]) {
      end += 1;
    }
    let score = (end - idx) * (end - idx);
    let newBoxes = boxes.slice(0, idx).concat(boxes.slice(end));

    return [score, newBoxes];
  }

  dpOptimal(boxes) {
    let merged = [];
    let points = [];
    let count = 1;

    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i] !== boxes[i + 1]) {
        merged.push(boxes[i]);
        points.push(count);
        count = 1;
        continue;
      }
      count++;
    }

    let n = merged.length;

    const dp = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => new Array(boxes.length).fill(0))
    );

    // dp[l][r][k] = dp[l][r-1][0] + (k+1)*(k+1) // 直接移除 boxes[r] 和它 k 个相同颜色
    // 尝试将 boxes[r] 与中间的某个 boxes[i] 合并
    // dp[l][r][k] = Math.max(dp[l][r][k], dp[l][i][k+1] + dp[i+1][r-1][0]) for  l<i<r

    function dfs(l, r, k) {
      if (l > r) return 0;
      if (dp[l][r][k] > 0) return dp[l][r][k];

      // 1. 直接移除 boxes[r]及其后缀
      let point = points[r] + k;

      let res = dfs(l, r - 1, 0) + point * point;

      // 2. try to merge boxes[r] with boxes[i] with the same color in the middle
      for (let i = l; i < r; i++) {
        if (merged[i] === merged[r]) {
          res = Math.max(res, dfs(l, i, point) + dfs(i + 1, r - 1, 0));
        }
      }

      dp[l][r][k] = res;

      return res;
    }
    return dfs(0, n - 1, 0);
  }
}

let boxes = [1, 3, 2, 2, 2, 3, 4, 3, 1];
// let boxes = [1, 1, 1];
let removeBoxes = new RemoveBoxes();

console.log(removeBoxes.dpOptimal(boxes));

// var removeBoxesNew = function (boxes) {
//   const merged = []
//   const points = []
//   let count = 1

//   for (let i = 0; i < boxes.length; i++) {
//     if (boxes[i] !== boxes[i + 1]) {
//       merged.push(boxes[i])
//       points.push(count)
//       count = 1
//       continue
//     }
//     count++
//   }

//   const size = merged.length;
//   const dp = Array.from({ length: size }, () => Array.from({ length: size }, () => new Uint16Array(boxes.length)))

//   const calculate = (l, r, p) => {
//     if (l > r) {
//         return 0
//     }

//     if (dp[l][r][p]) {
//         return dp[l][r][p]
//     }

//     let point = points[l] + p
//     let max = point * point + calculate(l + 1, r, 0)

//     for (let i = l + 1; i <= r; i++) {
//       if (merged[i] === merged[l]) {
//         max = Math.max(max, calculate(l + 1, i - 1, 0) + calculate(i, r, point))
//       }
//     }

//     dp[l][r][p] = max
//     return max
//   }

//   return calculate(0, size - 1, 0)
// }
