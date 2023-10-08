# pipe-async

This package emulates proposed functionality of pipelines in https://github.com/tc39/proposal-pipeline-operator

## Explanation

Some languages offer bash-like pipelines straight out of the box. This allows you to simplify complex operation as you can write

```

5 | firstFn | secondFn | thirdFn

```

instead of the typical

```

thirdFn(secondFn(firstFn(5)))

```

The first example is arguably more natural to read, since the logic goes from left to right.

## Features:

While there are many other packages that add pipeline functionality for JS apps, this one is different:

### Seamless typescript support for any length of pipeline

You can call up to 9 pipings at once, but can call the resulting pipeline again with more params for unlimited and/or conditional piping!

```typescript

import pipe from "pipeline-async";

const basicPipe = pipe(5, x => x + 2, x => x + 1);
const extendedPipe = basicPipe(x => x + 3, x => x + 4); // Does not mutate the original pipe!

```

### Supports, but does not require await/async

You have synchronous pipeline packages, you have asynchronous pipeline packages, but this package supports both.
It has a configurable interface for when you use non-Promise class based promises (```import { setConfig }```),
and you never have to deal with it returning a promise, unless one of the pipes returns one!
This behavior is fully supported by the used TS-typing with conditional types.
Works especially well when you're trying to evaluate request, or requests, to server.

```typescript

const basicPipe = pipe(5, x => x + 2);
console.log(basicPipe()) // prints 7
// You can have multiple asynchronous functions and need only 1 await
const asyncPipe = await basicPipe(async x => x + 4, x => x + 1 /* Does NOT need await/async! */);
console.log(await asyncPipe()) // prints 12

```

### Only evaluates a pipeline when called

Normally, most libraries will simply evaluate a pipeline, which is fine for most cases, but delayed evaluation may be important
for optimization or advanced chaining.

```typescript

const basicPipe = pipe(5, x => x + 5);
// Does not evaluate yet
console.log(basicPipe) // prints a function
console.log(basicPipe()) // prints 10

```


## Footer

If you encounter any bugs, or have ideas for improvement, do not hesitate to add a task or a pull request.
