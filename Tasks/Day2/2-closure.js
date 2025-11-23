"use strict";

// Rewrite previous example from OOP with mutable state
// to FP using closure-based syntax, immutable instance, method chaining

class Adder {
  constructor(initial) {
    this.value = initial;
  }

  add(x) {
    this.value += x;
    return this;
  }

  valueOf() {
    return this.value;
  }
}

function createAdder(initial) {
  const add = (value) => createAdder(initial + value);
  const valueOf = () => initial;

  return { add, valueOf };
}

const sum1 = new Adder(1).add(9).add(1).add(7);
// TODO: sum1 = createAdder(1).add(9).add(1).add(7);
console.log("Sum:", +sum1);

const sum2 = createAdder(1).add(9).add(1).add(7);
console.log("Sum:", +sum2);
