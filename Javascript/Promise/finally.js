Promise.prototype.finnally = function (callback) {
  let P = this.contructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

let test = async () => {
  let p = await Promise.resolve(1).finally(() => {
    console.log("finally");
  });
  console.log(p);

  let p2 = await Promise.reject(1)
    .finally(() => {
      console.log("finally reject");
    })
    .catch((e) => {
      console.log("catch", e);
    });
  console.log(p2);
};

test();
