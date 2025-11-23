"use strict";

const reader = ({ id }) => ({ id, name: "marcus", age: 42 });

const execute =
  (plan) =>
  (reader, log, env = {}) => {
    if (plan.read) {
      const user = reader(plan.read);
      return execute(plan.then)(reader, log, { user });
    }
    if (plan.match) {
      const ok = env.user.name === plan.match.name;
      return execute(ok ? plan.success : plan.fail)(reader, log, env);
    }
    if (plan.effect) {
      if (plan.effect.log) return () => log(env.user[plan.effect.log]);
      if (plan.effect === "noop") return () => {};
    }
  };

execute({
  read: { id: 15 },
  then: {
    match: { name: "marcus" },
    success: { effect: { log: "age" } },
    fail: { effect: "noop" },
  },
})(reader, console.log)();

// 1. Rewrite in OOP style
// 2. Improve data structure inconsistence

class Exec {
  #options;

  constructor(options) {
    this.#options = options;
  }

  run(steps) {
    let currentSteps = steps;

    for (step of currentSteps) {
      switch (steps.op) {
        case "read":
          try {
            this.#options.env = { user: steps.value };
            new Exec(this.#options).run(steps.success);
          } catch {
            new Exec(this.#options).run(steps.fail);
          }

          break;

        case "match":
          break;

        case "log":
          break;

        case "noop":
          break;
      }
    }
  }
}

const options = {
  reader,
  log: console.log,
  env: {},
};

const steps = [
  {
    op: "read",
    value: { id: 15 },
    success: [{ op: "noop" }],
    fail: [{ op: "noop" }],
  },
  {
    op: "match",
    value: "marcus",
    success: [{ op: "log", value: "age" }],
    fail: [{ op: "noop" }],
  },
];

const main = new Exec(options);
main.run(steps);
