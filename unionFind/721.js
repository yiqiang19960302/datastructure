var accountsMerge = function (accounts) {
  let size = accounts.length;
  let parent = Array.from({ length: size }, (_, i) => i);
  let rank = new Array(size).fill(1);

  let formattedAccounts = accounts.map((account) => {
    let [name, ...emails] = account;
    return {
      name,
      emails: new Set([...emails]),
    };
  });

  function find(x) {
    while (x !== parent[x]) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }

    return x;
  }

  function union(x, y) {
    let rootX = find(x);
    let rootY = find(y);
    if (rootX === rootY) {
      return;
    }

    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
      rank[rootY] += rank[rootX];
      formattedAccounts[rootY] = {
        name: formattedAccounts[rootY].name,
        emails: new Set([
          ...formattedAccounts[rootX].emails,
          ...formattedAccounts[rootY].emails,
        ]),
      };
    } else {
      parent[rootY] = rootX;
      rank[rootX] += rank[rootY];
      formattedAccounts[rootX] = {
        name: formattedAccounts[rootX].name,
        emails: new Set([
          ...formattedAccounts[rootX].emails,
          ...formattedAccounts[rootY].emails,
        ]),
      };
    }
  }

  let emailToIdxMap = new Map();
  for (let i = 0; i < accounts.length; i++) {
    let [name, ...emails] = accounts[i];
    for (let email of emails) {
      if (emailToIdxMap.has(email)) {
        union(i, emailToIdxMap.get(email));
      } else {
        emailToIdxMap.set(email, i);
      }
    }
  }

  let res = [];
  for (let i = 0; i < parent.length; i++) {
    if (i === parent[i]) {
      let formattedAccount = formattedAccounts[i];
      let { name, emails } = formattedAccount;
      let sortedEmails = [...emails].sort();
      res.push([name, ...sortedEmails]);
    }
  }

  return res;
};
