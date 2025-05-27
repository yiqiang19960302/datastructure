function Greeting(name) {
  this.name = name;
}

const instance = new Greeting("zhangsan");

const instance2 = Reflect.construct(Greeting, ["yiqiang"]);

console.log(instance2);
