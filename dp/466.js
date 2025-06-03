// We define str = [s, n] as the string str which consists of the string s concatenated n times.

// For example, str == ["abc", 3] =="abcabcabc".
// We define that string s1 can be obtained from string s2 if we can remove some characters from s2 such that it becomes s1.

// For example, s1 = "abc" can be obtained from s2 = "abdbec" based on our definition by removing the bolded underlined characters.
// You are given two strings s1 and s2 and two integers n1 and n2. You have the two strings str1 = [s1, n1] and str2 = [s2, n2].

// Return the maximum integer m such that str = [str2, m] can be obtained from str1.

// Example 1:

// Input: s1 = "acb", n1 = 4, s2 = "ab", n2 = 2
// Output: 2
// Example 2:

// Input: s1 = "acb", n1 = 1, s2 = "acb", n2 = 1
// Output: 1

// Constraints:

// 1 <= s1.length, s2.length <= 100
// s1 and s2 consist of lowercase English letters.
// 1 <= n1, n2 <= 106

/**
 * @param {string} s1
 * @param {number} n1
 * @param {string} s2
 * @param {number} n2
 * @return {number}
 */
var getMaxRepetitions = function (s1, n1, s2, n2) {
  if (n1 === 0 || n2 === 0) return 0;
  let s1Count = 0;
  let s2Count = 0;
  let map = new Map();
  let index = 0;

  while (s1Count < n1) {
    for (let c of s1) {
      if (c === s2[index]) {
        index++;
        if (index === s2.length) {
          s2Count += 1;
          index = 0;
        }
      }
    }
    s1Count += 1;

    if (map.has(index)) {
      let [prevS1Count, prevS2Count] = map.get(index);
      let repeat = Math.floor((n1 - s1Count) / (s1Count - prevS1Count));
      s1Count += repeat * (s1Count - prevS1Count);
      s2Count += repeat * (s2Count - prevS2Count);
    } else {
      map.set(index, [s1Count, s2Count]);
    }
  }

  return Math.floor(s2Count / n2);
};

let s1 = "acb",
  n1 = 4,
  s2 = "ab",
  n2 = 2;
console.log(getMaxRepetitions(s1, n1, s2, n2)); // Output: 2
