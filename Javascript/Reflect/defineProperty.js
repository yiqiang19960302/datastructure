function MyDate() {}

// Object.defineProperty(MyDate, 'now', {
//     value: ()=>Date.now()
// })

Reflect.defineProperty(MyDate, "now", {
  value: () => Date.now(),
});

console.log(MyDate.now()); // 当前时间戳

const p = new Proxy(
  {},
  {
    defineProperty(target, prop, descriptor) {
      console.log(descriptor);
      return Reflect.defineProperty(target, prop, descriptor);
    },
  }
);

p.foo = "bar";

console.log(p.foo);
