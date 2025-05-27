const myObj = {
  foo: "bar",
};

console.log("before deleting", myObj);
Reflect.deleteProperty(myObj, "foo");
console.log("after deleting", myObj);
