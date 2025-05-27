var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

console.log(Reflect.get(myObject, "baz")); // 3
console.log(Reflect.get(myObject, "foo")); // 1
console.log(Reflect.get(myObject, "bar")); // 2

// 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

console.log(Reflect.get(myObject, "baz", myReceiverObject));
