// 731. My Calendar II
// https://leetcode.com/problems/my-calendar-ii/description/

class TreeNode {
  constructor(startTime, endTime) {
    this.left = null;
    this.right = null;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

var MyCalendarTwo = function () {
  this.root = null;
  this.overlapRoot = null;
};

MyCalendarTwo.prototype.canBook = function (startTime, endTime) {
  function canBookHelper(root, startTime, endTime) {
    if (!root) {
      return true;
    }

    if (startTime >= root.endTime) {
      return canBookHelper(root.right, startTime, endTime);
    } else if (endTime <= root.startTime) {
      return canBookHelper(root.left, startTime, endTime);
    } else {
      return false;
    }
  }

  return canBookHelper(this.overlapRoot, startTime, endTime);
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */

MyCalendarTwo.prototype.bookHelper = function (root, startTime, endTime) {
  if (startTime >= endTime) {
    return root;
  }

  if (!root) {
    return new TreeNode(startTime, endTime);
  }

  if (startTime >= root.endTime) {
    root.right = this.bookHelper(root.right, startTime, endTime);
  } else if (endTime <= root.startTime) {
    root.left = this.bookHelper(root.left, startTime, endTime);
  } else {
    let overlapStart = Math.max(startTime, root.startTime);
    let overlapEnd = Math.min(endTime, root.endTime);
    let smallStart = Math.min(startTime, root.startTime);
    let largeEnd = Math.max(endTime, root.endTime);
    root.left = this.bookHelper(root.left, smallStart, overlapStart);
    root.right = this.bookHelper(root.right, overlapEnd, largeEnd);
    root.startTime = overlapStart;
    root.endTime = overlapEnd;
    // add to overlap tree
    this.overlapRoot = this.bookHelper(
      this.overlapRoot,
      overlapStart,
      overlapEnd
    );
  }
  return root;
};

MyCalendarTwo.prototype.book = function (startTime, endTime) {
  if (!this.canBook(startTime, endTime)) {
    return false;
  } else {
    this.root = this.bookHelper(this.root, startTime, endTime);
    return true;
  }
};

/**
 * Your MyCalendarTwo object will be instantiated and called as such:
 * var obj = new MyCalendarTwo()
 * var param_1 = obj.book(startTime,endTime)
 */

let myCalendar = new MyCalendarTwo();
let bookings = [
  [10, 20],
  [50, 60],
  [10, 40],
  [5, 15],
  [5, 10],
  [25, 55],
];
let results = [];
for (let booking of bookings) {
  let result = myCalendar.book(booking[0], booking[1]);
  results.push(result);
}
console.log(results);
