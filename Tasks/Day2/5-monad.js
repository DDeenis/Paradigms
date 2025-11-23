"use strict";

// Rewrite previous example using this Monad
// do not change code of Monad

class Monad {
  #value;

  constructor(value) {
    this.#value = value;
  }

  static of(value) {
    return new Monad(value);
  }

  map(fn) {
    return Monad.of(fn(this.#value));
  }

  chain(fn) {
    return fn(this.#value);
  }

  ap(container) {
    const fn = this.#value;
    return container.map(fn);
  }
}

const createAdder = (initial) => Monad.of(initial);
const add = (valueToAdd) => (prevValue) => prevValue + valueToAdd;
const valueOf = (value) => value;

const sum1 = createAdder(1).map(add(9)).map(add(1)).map(add(7));
console.log("Sum:", sum1.chain(valueOf));
