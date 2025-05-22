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
}
