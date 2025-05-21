/**
 * @param {string[]} words
 * @return {string[]}
 */

var findAllConcatenatedWordsInADict = function (words) {
  let sortedWords = [...new Set(words)].sort((a, b) => a.length - b.length);
  let res = [];
  let wordSet = new Set();

  for (let word of sortedWords) {
    if (wordBreak(word, wordSet)) {
      res.push(word);
    }
    wordSet.add(word);
  }

  return res;
};

var wordBreak = function (s, wordSet) {
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
};

let words = [
  "cat",
  "cats",
  "catsdogcats",
  "dog",
  "dogcatsdog",
  "hippopotamuses",
  "rat",
  "ratcatdogcat",
];
let res = findAllConcatenatedWordsInADict(words);
console.log(res); // ["catsdogcats","dogcatsdog","ratcatdogcat"]
