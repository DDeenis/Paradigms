'use strict';

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
