// solution to leetcdoe 871. Minimum Number of Refueling Stops
// Example 1:

// Input: target = 1, startFuel = 1, stations = []
// Output: 0
// Explanation: We can reach the target without refueling.
// Example 2:

// Input: target = 100, startFuel = 1, stations = [[10,100]]
// Output: -1
// Explanation: We can not reach the target (or even the first gas station).
// Example 3:

// Input: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
// Output: 2
// Explanation: We start with 10 liters of fuel.
// We drive to position 10, expending 10 liters of fuel.  We refuel from 0 liters to 60 liters of gas.
// Then, we drive from position 10 to position 60 (expending 50 liters of fuel),
// and refuel from 10 liters to 50 liters of gas.  We then drive to and reach the target.
// We made 2 refueling stops along the way, so we return 2.

/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */

const { PriorityQueue } = require("@datastructures-js/priority-queue");

var minRefuelStops = function (target, startFuel, stations) {
  let pq = new PriorityQueue((a, b) => b - a);
  let fuel = startFuel;
  let i = 0;
  let stop = 0;

  while (fuel < target) {
    while (i < stations.length && stations[i][0] <= fuel) {
      pq.enqueue(stations[i][1]);
      i++;
    }

    if (pq.isEmpty()) return -1; // cannot go further

    fuel += pq.dequeue();
    stop += 1;
  }

  return stop;
};

let target = 100,
  startFuel = 10,
  stations = [
    [10, 60],
    [20, 30],
    [30, 30],
    [60, 40],
  ];

console.log(minRefuelStops(target, startFuel, stations));
