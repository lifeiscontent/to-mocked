# @lifeiscontent/to-mocked

## Overview

This repository contains a TypeScript utility function `toMocked`, a tool designed to streamline the creation of mocked data for testing. The main motivation for this package is to address the challenges of creating complicated mock data structures that represent specific types. Instead of manually building an entire object for testing, this function allows you to specify the object type and provide only the necessary data used in the test.

If application code changes and breaks the tests, `toMocked` provides immediate feedback about how those expectations have changed, making it easier to maintain and update your test suite. This function is particularly helpful when used with testing frameworks like [Vitest](https://vitest.dev/).

## Function Overview

```ts
function toMocked<T extends object>(value: any): T;
```

## Function Explanation

The function `toMocked` takes one type argument:

1. `T`: The expected return type which extends an object. It's worth noting that in TypeScript, `object` is a type that represents non-primitive types, thus you can use not only plain objects, but also other complex types like arrays, etc.

And one parameter:

1. `value`: The object that you want to create a proxy for.

The function uses the JavaScript `Proxy` object to define custom behavior for property lookups. In the `get` trap provided to the `Proxy`, we first check if the accessed `property` exists on the `target` object. If it doesn't, an Error is thrown. If it does, the `property` is retrieved from the `target`. If this `property` is an object itself, it's wrapped in another level of proxy by recursively calling `toMocked`.

## Usage

Here's an example of how you could use the `toMocked` function:

```ts
let obj = toMocked({
  prop1: "Hello",
  prop2: {
    nestedProp: "World"
  }
});

console.log(obj.prop1); // "Hello"
console.log(obj.prop2.nestedProp); // "World"
console.log(obj.nonExistentProp); // Throws Error: Property "nonExistentProp" does not exist on...
```

This approach ensures that your test data is as close to the real thing as possible, and that your tests fail fast when expectations change.

Please ensure you have TypeScript installed in your project and the file containing the `toMocked` function is properly imported.

---

Remember, a Proxy object is a very powerful tool. When used wisely, it can streamline your testing process by creating more realistic and maintainable mock data.