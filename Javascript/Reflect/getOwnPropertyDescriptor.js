var myObject = {};
Object.defineProperty(myObject, "hidden", {
  value: true,
  enumerable: false,
});

// 旧写法
var theDescriptor1 = Object.getOwnPropertyDescriptor(myObject, "hidden");

// 新写法
var theDescriptor2 = Reflect.getOwnPropertyDescriptor(myObject, "hidden");
console.log(theDescriptor2);
