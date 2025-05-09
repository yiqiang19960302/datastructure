// You are given two strings word1 and word2, each consisting of lowercase English letters.

// You are allowed to perform three operations on word1 an unlimited number of times:

// Insert a character at any position
// Delete a character at any position
// Replace a character at any position
// Return the minimum number of operations to make word1 equal word2.

// Example 1:

// Input: word1 = "monkeys", word2 = "money"

// Output: 2
// Explanation:
// monkeys -> monkey (remove s)
// monkey -> monkey (remove k)

// Example 2:

// Input: word1 = "neatcdee", word2 = "neetcode"

// Output: 3
// Explanation:
// neatcdee -> neetcdee (replace a with e)
// neetcdee -> neetcde (remove last e)
// neetcde -> neetcode (insert o)

// Constraints:

// 0 <= word1.length, word2.length <= 100
// word1 and word2 consist of lowercase English letters.

class Solution {
  bruteForce(word1, word2) {
    return this._dfs(word1, word2, 0, 0);
  }

  _dfs(word1, word2, i1, i2) {
    if (i1 === word1.length) {
      return word2.length - i2; // insert all remaining characters of word2
    }
    if (i2 === word2.length) {
      return word1.length - i1; // delete all remaining characters of word1
    }

    if (word1[i1] === word2[i2]) {
      return this._dfs(word1, word2, i1 + 1, i2 + 1);
    } else {
      return (
        Math.min(
          this._dfs(word1, word2, i1 + 1, i2),
          this._dfs(word1, word2, i1, i2 + 1),
          this._dfs(word1, word2, i1 + 1, i2 + 1)
        ) + 1
      );
    }
  }
}

let word1 = "monkeys",
  word2 = "money";
let s = new Solution();
console.log(s.bruteForce(word1, word2)); // 2
