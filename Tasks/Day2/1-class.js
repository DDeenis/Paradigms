"use strict";

// Rewrite from OOP with mutable state
// to FP using class-based syntax, immutable instance, method chaining

class Adder {
  constructor(initial) {
    this.value = initial;
  }

  static create(initial) {
    return new Adder(initial);
  }

  add(x) {
    return new Adder(this.value + x);
  }

  valueOf() {
    return this.value;
  }
}

const sum1 = new Adder(1).add(9).add(1).add(7);
// TODO: sum1 = Adder.create(1).add(9).add(1).add(7);
console.log("Sum:", +sum1);

const sum2 = Adder.create(1).add(9).add(1).add(7);
console.log("Sum:", +sum2);
