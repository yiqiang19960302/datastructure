var myObject = {
  foo: 1,
};

console.log("foo" in myObject); // true
console.log(Reflect.has(myObject, "foo")); // true
console.log("bar" in myObject); // false
