class Solution {
  merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    let res = [];
    let prevInterval = intervals[0];
    for (let i = 1; i < intervals.length; i++) {
      if (prevInterval[1] < intervals[i][0]) {
        res.push(prevInterval);
        prevInterval = intervals[i];
      } else {
        prevInterval[1] = Math.max(prevInterval[1], intervals[i][1]);
      }
    }

    res.push(prevInterval);
    return res;
  }
}
