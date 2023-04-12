---
sidebar_position: 3
---

# Control Flow

Quackscript supports a couple of control flows which provides flexibility in your application.

## If statement

An if statement will execute the statements in the code block if the condition is `true`. The condition can be any expression that evaluates to `true`

```js
    if ( /* condition */ ) {
        // statement
    }
```

If statements allow for a optional `else` which will execute the code block if the condition is false

```js
    if ( /* condition */ ) {
        // this will execute if the condition is true
    } else {
        // this will execute if the condition is false
    }
```