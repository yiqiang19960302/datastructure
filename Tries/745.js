/**
 * @param {string[]} words
 */
var TrieNode = function () {
  this.isWord = false;
  this.wordIdx = new Set();
  this.children = new Map();
};

TrieNode.prototype.add = function (word, idx) {
  let cur = this;
  for (let c of word) {
    if (!cur.children.has(c)) {
      cur.children.set(c, new TrieNode());
    }
    cur = cur.children.get(c);
  }
  cur.isWord = true;
  cur.wordIdx = idx;
};

var WordFilter = function (words) {
  this.prefixNode = new TrieNode();
  this.suffixNode = new TrieNode();

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    this.prefixNode.add(word, i);
    this.suffixNode.add(word.split("").reverse().join(""), i);
  }
};

/**
 * @param {string} pref
 * @param {string} suff
 * @return {number}
 */
WordFilter.prototype.f = function (pref, suff) {
  let prefixCur = this.prefixNode;
  let suffixCur = this.suffixNode;

  for (let c of pref) {
    if (prefixCur.children.has(c)) {
      prefixCur = prefixCur.children.get(c);
    } else {
      prefixCur = null;
    }
  }
};

/**
 * Your WordFilter object will be instantiated and called as such:
 * var obj = new WordFilter(words)
 * var param_1 = obj.f(pref,suff)
 */
