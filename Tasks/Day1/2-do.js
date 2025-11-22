"use strict";

// Put implementation here

const DoSymbol = Symbol("Do");

function Do(valueOrParent, callback) {
  return {
    bind(cb) {
      return Do(this, cb);
    },
    run() {
      if (valueOrParent[DoSymbol]) {
        return callback(valueOrParent.run());
      }

      return valueOrParent;
    },
    [DoSymbol]: true,
  };
}

Do({ id: 15 })
  .bind(({ id }) => ({ id, name: "marcus", age: 42 }))
  .bind(({ name, age }) => (name === "marcus" ? (log) => log(age) : () => {}))
  .run()(console.log);
