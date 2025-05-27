const ages = [11, 33, 12, 54, 18, 96];

const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);

console.log(`youngest: ${youngest}`);
console.log(`oldest: ${oldest}`);
console.log(`type: ${type}`);
