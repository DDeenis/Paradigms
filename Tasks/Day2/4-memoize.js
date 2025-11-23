'use strict';

// implement memoize

const memoize = (f) => f;

const fib = memoize((n) => n <= 1 ? n : fib(n - 1) + fib(n - 2));

console.log(fib(10));
