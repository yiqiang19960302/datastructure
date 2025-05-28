// async function fn(args) {
//     // ...
//   }

//   // 等同于

//   function fn(args) {
//     return spawn(function* () {
//       // ...
//     });
//   }

// 所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。

function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF();

    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }

      if (next.done) {
        return resolve(next.value);
      }
      // 如果next.value不是一个Promise对象，则将其包装成一个Promise对象
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v);
          });
        },
        function (e) {
          step(function () {
            return gen.throw(e);
          });
        }
      );
    }

    step(function () {
      return gen.next(undefined);
    });
  });
}
