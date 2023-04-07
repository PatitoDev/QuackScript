---
sidebar_position: 3
---

# Control de flujo

QuackScript soporta un par de sentencias de control de flujo que proveen flexibilidad en su aplicación.

## Sentencia If

Una sentencia if ejecutará las sentencias contenidas en el bloque de código si la condición es `true`. La condición puede ser cualquier expresión que evalue a `true`

```js
    if (: /* condición */ :) {:
        // sentencias
    :}
```

La sentencia if permite un `else` opcional cuyo bloque de código se ejecutarási la condición del if es falsa.

```js
    if (: /* condición */ :) {:
        // esto se ejecutará si la condición es verdadera
    :} else {:
        // esto se ejecutará si la condición es falsa
    :}
```