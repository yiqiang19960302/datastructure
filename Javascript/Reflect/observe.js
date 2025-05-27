const queuedObservers = new Set();

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach((observer) => observer());
  return result;
}

const observe = (fn) => queuedObservers.add(fn);
const observable = (obj) =>
  new Proxy(obj, {
    set,
  });

const person = observable({
  name: "zhangsan",
  age: 20,
});

function print() {
  console.log(`name: ${person.name}, age: ${person.age}`);
}

observe(print);
person.name = "lisi";
