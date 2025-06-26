const crypto = require("crypto");

class ConsistentHashing {
  constructor(virtualNodes = 160) {
    this.virtualNodes = virtualNodes; // number of virtual nodes a physcial node map to
    this.ring = new Map(); // hash ring, store the the map from virtual node to physical node
    this.servers = new Set(); // physical nodes
  }

  // hash function using MD5, should return a 32 character hex string
  hash(key) {
    return crypto.createHash("md5").update(key).digest("hex");
  }

  // generate a 32 integer from the hash string
  hashToInt(hashStr) {
    return parseInt(hashStr.substring(0, 8), 16);
  }

  addServer(server) {
    if (this.servers.has(server)) {
      console.log(`Server ${server} already exists.`);
      return;
    }

    this.servers.add(server);
    // add virtual nodes for the server
    for (let i = 0; i < this.virtualNodes; i++) {
      const virtualNodeKey = `${server}:${i}`;
      const hashValue = this.hashToInt(this.hash(virtualNodeKey));
      this.ring.set(hashValue, server);
    }

    console.log(
      `Server ${server} added with ${this.virtualNodes} virtual nodes.`
    );
  }

  removeServer(server) {
    if (!this.servers.has(server)) {
      console.log(`Server ${server} does not exist.`);
      return;
    }

    this.servers.delete(server);

    // remove virtual nodes for the server
    for (let i = 0; i < this.virtualNodes; i++) {
      const virtualNodeKey = `${server}:${i}`;
      const hashValue = this.hashToInt(this.hash(virtualNodeKey));
      this.ring.delete(hashValue);
    }

    console.log(`Server ${server} removed.`);
  }

  getServer(key) {
    if (this.ring.size === 0) {
      return null;
    }

    const hashValue = this.hashToInt(this.hash(key));

    // get all keys in the ring
    const sortedNodes = Array.from(this.ring.keys()).sort((a, b) => a - b);

    // find the first key that is greater than or equal to the hash value
    // use binary search to find the index
    let left = 0;
    let right = sortedNodes.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (sortedNodes[mid] >= hashValue) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left < sortedNodes.length
      ? this.ring.get(sortedNodes[left])
      : this.ring.get(sortedNodes[0]);
  }

  getStatus() {
    console.log("\n===consistent hashing status===\n");
    console.log(`physical servers: ${Array.from(this.servers).join(", ")}`);
    console.log(`total virtual nodes: ${this.ring.size}`);
    console.log(`virtual nodes per server: ${this.virtualNodes}`);

    const distribution = {};
    this.servers.forEach((server) => {
      distribution[server] = 0;
    });

    // simulate some test data
    const testKeys = [];
    for (let i = 0; i < 1000; i++) {
      testKeys.push(`key_${i}`);
    }

    testKeys.forEach((key) => {
      const server = this.getServer(key);
      distribution[server] = (distribution[server] || 0) + 1;
    });
    console.log("\nData distribution (based on 1000 test keys):");
    Object.entries(distribution).forEach(([server, count]) => {
      const percentage = ((count / 1000) * 100).toFixed(2);
      console.log(`${server}: ${count} keys (${percentage}%)`);
    });
  }

  // simulate data migration
  simulateDataMigration(oldServers, newServers) {
    console.log(`\n===Simulate Data Migration===\n`);
    const testKeys = [];
    for (let i = 0; i < 1000; i++) {
      testKeys.push(`key_${i}`);
    }

    //record the old data distribution
    const oldDistribution = {};
    testKeys.forEach((key) => {
      const server = this.getServer(key);
      if (!oldDistribution[server]) {
        oldDistribution[server] = [];
      }
      oldDistribution[server].push(key);
    });

    console.log("Before migration:");
    Object.entries(oldDistribution).forEach(([server, keys]) => {
      console.log(`  ${server}: ${keys.length} keys`);
    });

    // change the servers configuration
    oldServers.forEach((server) => this.removeServer(server));
    newServers.forEach((server) => this.addServer(server));

    // record the new data distribution
    const newDistribution = {};
    let migrationCount = 0;

    testKeys.forEach((key) => {
      const newServer = this.getServer(key);
      const oldServer = Object.entries(oldDistribution).find(([server, keys]) =>
        keys.includes(key)
      )?.[0];
      if (!newDistribution[newServer]) {
        newDistribution[newServer] = [];
      }
      newDistribution[newServer].push(key);
      if (oldServer && oldServer !== newServer) {
        migrationCount++;
      }
    });

    console.log("After migration:");
    Object.entries(newDistribution).forEach(([server, keys]) => {
      console.log(`${server}: ${keys.length} keys`);
    });

    const migrationPercentage = (
      (migrationCount / testKeys.length) *
      100
    ).toFixed(2);
    console.log(
      `\nData migration count: ${migrationCount} keys (${migrationPercentage}%)`
    );
  }
}

const consistentHash = new ConsistentHashing(150);
console.log("Adding initial servers");
consistentHash.addServer("server1");
consistentHash.addServer("server2");
consistentHash.addServer("server3");

consistentHash.getStatus();

// 测试数据定位
console.log("\n2. Testing data location...");
const testData = [
  "user:1001",
  "user:1002",
  "user:1003",
  "user:1004",
  "user:1005",
];
testData.forEach((key) => {
  const server = consistentHash.getServer(key);
  console.log(`${key} -> ${server}`);
});

// 模拟添加服务器
console.log("\n3. Adding a new server...");
consistentHash.addServer("server4");
consistentHash.getStatus();

// 查看数据重新分布
console.log("\nData location after adding server4:");
testData.forEach((key) => {
  const server = consistentHash.getServer(key);
  console.log(`${key} -> ${server}`);
});

// 模拟完整的数据迁移场景
console.log("\n4. Simulating server replacement...");
consistentHash.simulateDataMigration(["server2"], []);
// 最终状态
consistentHash.getStatus();
