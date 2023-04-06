---
sidebar_position: 1
---

# Grammar and types

This chapter discusses Quackscript's basic grammar, variable declaration, data types and literals.

## Basics

In Quackscript each statement must end with a 🦆

## Comments

A comment in quackscript start with `//` until the end of the line.
Comments are not executed, they exist to annotate your code. It is good practice to explain complex parts of your code with comments.

```js
// this is a comment
```

## Declarations

Quackscript supports two types of declarations.

`quack` Declares a variable.

`QUACK` Declares a read-only constant which can't be changed.

### Declaration and initialization

All variables must be declared before they are used, otherwise an exception is thrown.

You can use `quack` and `QUACK` to declare block-scoped variables. (See *variable scope* below.)

To declare a variable you use the following syntax:

```js
quack a🦆
```

A variable can be initialized and declared on the same line using the following syntax:

```js
quack a <- 'hello world'🦆
```

A constant must always be initialized when declared.
```js
QUACK a <- 'hello world'🦆
```

### Variable scope

In quackscript variables belong to the global scope or the code block.

A code block is defined as a pair of `{:` `:}`

```js
quack a <- 'hello world'🦆

QUACK b <- (::) {:
    QUACK c <- 32🦆
    a <- 'bye world'🦆
:}🦆
```

On the example above. The variable `a` is on the global scope, which means is accessible anywhere on this file. Variable `c` is declared inside a code block which means it is only accessible inside such code block. Variables are deleted from memory after the block execution is finished so after the execution of the function `b` the variable `c` is no longer in memory and `a` has been changed to `'bye world'`.

## Data types

Quackscript provides the following data types:

1. `boolean` - `true` and `false`.
1. `nothing` - A data type which denotes the lack of a value. Non initialized variables will contain `nothing` and non returning functions will return `nothing`
1. `number` - An integer or floating point number. Eg. `32` or `32.5`
1. `text` - A sequence of characters. Eg. `'Hello World'`
1. `vector2` - A 2 dimensional vector containing `x` and `y` `number` values
1. `vector3` - A 3 dimensional vector containing `x`, `y` and `z` `number` values
1. `object` - 
1. `function` - A function definition
1. `list` - A sequence of same type elements
1. `dictionary` - A collection of key value pairs where each key is unique and of the same type