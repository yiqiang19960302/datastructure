/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var checkIfPrerequisite = function (numCourses, prerequisites, queries) {
  let adjList = {};
  for (let i = 0; i < numCourses; i++) {
    adjList[i] = new Set();
  }

  for (let [pre, crs] of prerequisites) {
    adjList[crs].add(pre);
  }

  let preMap = {}; //mapping course to its prerequisites

  function dfs(crs) {
    if (!preMap[crs]) {
      preMap[crs] = new Set();
      for (let pre of adjList[crs]) {
        for (let ele of dfs(pre)) {
          preMap[crs].add(ele);
        }
      }
    }
    preMap[crs].add(crs);
    return preMap[crs];
  }

  for (let i = 0; i < numCourses; i++) {
    dfs(i);
  }

  let res = [];
  for (let [pre, crs] of queries) {
    res.push(preMap[crs].has(pre));
  }

  return res;
};
