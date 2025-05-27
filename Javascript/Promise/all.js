Promise.all = function (promises) {
  let results = new Array(promises.length).fill(null);
  let completed = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((result) => {
          results[idx] = result;
          completed += 1;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
