class TrieNode {
  constructor() {
    this.word = false;
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let cur = this.root;
    for (let c of word) {
      if (!cur.children.has(c)) {
        cur.children.set(c, new TrieNode());
      }
      cur = cur.children.get(c);
    }
    cur.word = true;
  }

  search(word) {
    let cur = this.root;
    for (let c of word) {
      if (!cur.children.has(c)) {
        return false;
      }
      cur = cur.children.get(c);
    }
    return cur.word;
  }

  startsWith(prefix) {
    let cur = this.root;
    for (let c of prefix) {
      if (!cur.children.has(c)) {
        return false;
      }
      cur = cur.children.get(c);
    }

    return true;
  }
}
