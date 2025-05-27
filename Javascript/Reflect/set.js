var myObject = {
  foo: 1,
  set bar(value) {
    return (this.foo = value);
  },
};

console.log(myObject.foo);

Reflect.set(myObject, "foo", 2);
console.log(myObject.foo);

Reflect.set(myObject, "bar", 3);
console.log(myObject.foo);

// 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。
var myReceiverObject = {
  foo: 56,
};

Reflect.set(myObject, "bar", 4, myReceiverObject);
console.log(myObject.foo); // 3
console.log(myReceiverObject.foo); // 4

let p = {
  a: "a",
};

let handler = {
  set(target, key, value) {
    console.log("set");
    Reflect.set(target, key, value);
  },
  defineProperty(target, key, attribute) {
    console.log("defineProperty");
    Reflect.defineProperty(target, key, attribute);
  },
};

let obj = new Proxy(p, handler);
obj.a = "A";

console.log(p);
console.log(obj);
