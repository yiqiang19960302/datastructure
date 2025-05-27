var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for("baz")]: 3,
  [Symbol.for("bing")]: 4,
};

console.log(Object.getOwnPropertyNames(myObject));

console.log(Object.getOwnPropertySymbols(myObject));

console.log(Reflect.ownKeys(myObject));
