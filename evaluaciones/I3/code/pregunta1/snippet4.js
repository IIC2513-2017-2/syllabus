function Foo1() {
  this.bar = 1;
}

function Foo2() {
  return { bar: 1 };
}

const a = new Foo1();
const b = Foo2();