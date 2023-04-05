---
sidebar_position: 2
---

# Functions

A function contains a series of statements which are executed when the function is called. Each function contains it own scope which is deleted from memory after its execution.

Functions in Quackscript are considered a first class citizens, they can be passed to other functions, returned from functions and assigned to variables.


## Declaring a function

To declare a function in Quackscript you must provide a function body and 0 or more parameters. Functions need to be assigned to a variable to be used.

```
QUACK fnExample <- (::) :> {:
    quackprint(:'Hello world':)🦆
:}🦆
```

## Return value

A function without a `return` statement it will always return `nothing`. A `return` in a function allows you to return a specific value.

```js
quack returnQuack <- (::) :> {:
    return 'quack'🦆
:}🦆
```

## Parameters

A function can have 0 or more parameters. When calling the function the same number of arguments must be passed.

```js
quack add <- (:first, second:) :> {:
    return first + second🦆
:}🦆


add(:1, 2:)🦆
```
