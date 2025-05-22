// An attendance record for a student can be represented as a string where each character signifies whether the student was absent, late, or present on that day.
//  The record only contains the following three characters:

// 'A': Absent.
// 'L': Late.
// 'P': Present.
// Any student is eligible for an attendance award if they meet both of the following criteria:

// The student was absent ('A') for strictly fewer than 2 days total.
// The student was never late ('L') for 3 or more consecutive days.
// Given an integer n, return the number of possible attendance records of length n that make a student eligible for an attendance award. The answer may be very large, so return it modulo 109 + 7.

// Example 1:

// Input: n = 2
// Output: 8
// Explanation: There are 8 records with length 2 that are eligible for an award:
// "PP", "AP", "PA", "LP", "PL", "AL", "LA", "LL"
// Only "AA" is not eligible because there are 2 absences (there need to be fewer than 2).
// Example 2:

// Input: n = 1
// Output: 3
// Example 3:

// Input: n = 10101
// Output: 183236316

// dp[i][a][l] = number of valid sequence of length i ending with a 'a' number of A's (0 or 1) and l consecutive L's at the end(0 to 2)
// transition function
// 1. add 'P'
// - it doesn't change a
// - change L count to 0
// dp[i+1][a][0] += dp[i][a][l]

// 2. add 'A'
// - can only do this if a === 0
// - reset L count to 0
// dp[i+1][1][0]+=dp[i][0][l]

// 3. add 'L'
//  - only allowed if l<2
//  - increate l count by 1
//  dp[i+1][a][l+1] +=dp[i][a][l]

// dp[0][0][0] = 1
// we build up dp[i+1] using dp[i]

// since dp[i+1] only related to dp[i], so we only 2 2D array to represent the state, no need to build big 3D array

/**
 * @param {number} n
 * @return {number}
 */

const MOD = 10 ** 9 + 7;

var checkRecord = function (n) {
  let A = 2;
  let L = 3;

  let dp = Array.from({ length: A }, () => new Array(L).fill(0));
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    let nextDp = Array.from({ length: A }, () => new Array(L).fill(0));
    for (let a = 0; a < A; a++) {
      for (let l = 0; l < L; l++) {
        let val = dp[a][l];

        if (val === 0) continue;
        // add 'P'
        nextDp[a][0] = (nextDp[a][0] + val) % MOD;

        // add 'A' only if a==0
        if (a === 0) {
          nextDp[1][0] = (nextDp[1][0] + val) % MOD;
        }

        // add 'L' only if l<2
        if (l < 2) {
          nextDp[a][l + 1] = (nextDp[a][l + 1] + val) % MOD;
        }
      }
    }
    dp = nextDp;
  }

  let sum = 0;
  for (let a = 0; a < A; a++) {
    for (let l = 0; l < L; l++) {
      sum += dp[a][l];
    }
  }

  return sum % MOD;
};

console.log(checkRecord(1));
console.log(checkRecord(2));
console.log(checkRecord(10101));
