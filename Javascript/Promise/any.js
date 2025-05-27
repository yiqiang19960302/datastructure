Promise.any = function (promises) {
  let errors = new Array(promises.length).fill(null);
  let count = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          errors[idx] = error;
          count += 1;
          if (count === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
};
