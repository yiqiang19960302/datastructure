function bruteForce(r, c, rows, cols) {
  if (r === rows && c === cols) {
    return 0;
  }
  if (r === rows - 1 && c === cols - 1) {
    return 1;
  }

  return bruteForce(r + 1, c, rows, cols) + bruteForce(r, c + 1, rows, cols);
}

function memoization(r, c, rows, cols, cache) {
  if (r === rows && c === cols) {
    return 0;
  }
  if (cache[r][c] > 0) {
    return cache[r][c];
  }

  if (r === rows - 1 && c === cols - 1) {
    return 1;
  }

  cache[r][c] =
    memoization(r + 1, c, rows, cols, cache) +
    memoization(r, c + 1, rows, cols, cache);
  return cache[r][c];
}

function dp(rows, cols) {
  let prevRow = new Array(cols).fill(0);
  for (let r = rows - 1; r >= 0; r--) {
    let curRow = new Array(cols).fill(0);
    curRow[cols - 1] = 1;
    for (let c = cols - 2; c >= 0; c--) {
      curRow[c] = curRow[c + 1] + prevRow[c];
    }
    prevRow = curRow;
  }
  return prevRow[0];
}
