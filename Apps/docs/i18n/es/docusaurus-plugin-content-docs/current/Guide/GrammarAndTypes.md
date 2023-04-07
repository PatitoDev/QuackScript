---
sidebar_position: 1
---

# Sintáxis y tipos

Este capítulo analiza la gramática básica, declaración de variables, los tipos de datos y los literales de QuackScript.

## Esencial

En QuackScript cada sentencia debe terminar con 🦆

## Comentarios

Un comentario en QuackScript comienza con `//` y llega hasta el final de la línea.
Los comentarios no se ejecutan, existen para hacer anotaciones en su código. Es una buena práctica explicar partes complejas del código con comentarios.

```js
// esto es un comentario
```

También puede escribir comentarios multilínea comenzando con `/*` y terminando con `*/`

```js
/*

esto es un comentario multilínea

*/
```

## Declaraciones

QuackScript soporta dos tipos de declaraciones.

`quack` Declara una variable.

`QUACK` Declara una constante de solo lectura que no puede ser modificada.

### Declaraciones e inicializaciones

Todas las variables deben ser declaradas antes de ser utilizadas, de otra forma se lanzará una excepción.

Puedes usar `quack` y `QUACK` para declarar variables con ámbito de bloque. (Ver *ámbito de variables* debajo.)

Para declarar una variable debes utilizar la siguiente sintáxis:

```js
quack a🦆
```

Una variable puede ser declarada e inicializada en la misma línea usando la siguiente sintáxis:

```js
quack a <- 'hola mundo'🦆
```

Una constante siempre debe inicializarse cuando es declarada.
```js
QUACK a <- 'hola mundo'🦆
```

### Ámbito de variables

En QuackScript las variables pertenecen al ámbito global o al de bloque de código.
 
Un bloque de código es definido como un par de `{:` `:}`

```js
quack a <- 'hola mundo'🦆

QUACK b <- (::) {:
    QUACK c <- 32🦆
    a <- 'adiós mundo'🦆
:}🦆
```

En el ejemplo anterior la variable `a` está en el ámbito global, lo que significa que es accesible desde cualquier lugar del archivo. La variable `c` está declarada dentro de un bloque de código, lo que significa que solamente es accesible dentro de ese mismo bloque de código. Las variables son eliminadas de la memoria luego de que el bloque de código al que pertenecen finaliza su ejecución, entonces tras la ejecución de la función `b` la variable `c` ya no está en la memoria y `a` ha sido cambiada a `'adiós mundo'`.

## Tipos de dato

Quackscript proporciona los siguientes tipos de dato:

1. `boolean` - `true` y `false`.
1. `nothing` - Un tipo de dato que indica la falta de un valor. Una variable no inicializada contiene `nothing` y las funciones que no devuelven un valor devolverán `nothing`
1. `number` - Un número entero o de coma flotante. Ej. `32` o `32.5`
1. `text` - Una secuencia de caracteres. Ej. `'Hola Mundo'`
1. `function` - La definición de una función.
1. `object` - *[no implementado]*
1. `list` - *[no implementado]* Una secuencia de elementos con el mismo tipo de dato
1. `vector2` - *[no implementado]* Un vector de 2 dimensiones que contiene `x` e `y` `número` valores
1. `vector3` - *[no implementado]* Un vector de 3 dimensiones que contiene `x`, `y` y `z` `número` valores
1. `dictionary` - *[no implementado]* Una colección de pares clave valor donde cada clave es unica y del mismo tipo de dato

### Tipado de variables

Cada variable tendrá un tipo de dato asociado a ella. Puede explícitamente definir el tipo de dato luego del nombre de una variable o dejar que QuackScript infiera el tipo de dato por usted.

```js
QUACK a:text <- 'hola mundo'🦆

// esto va a generar el mismo tipo de dato para la variable que el código de abajo
// QuackScript infiere el tipo de dato de la inicialización
QUACK b <- 'hola mundo'🦆
```

QuackScript es un lenguaje fuertemente tipado y de tipado estático lo que significa que una vez que se define el tipo de dato de una variable no podrá ser asignado un valor de otro tipo.

```js
quack a:text <- 'hola mundo'🦆

// La siguiente instrucción lanzará un error
a <- 23🦆
```

Una variable puede ser opcional lo que le permite contener un valor del tipo definido o `nothing`. Puede declarar una variable como opcional agregando un `?` luego del identificador de la variable.
```js
quack puedeSerNothing?:string🦆
// En este punto 'puedeSerNothing' es 'nothing'

couldBeNothing <- 'hola mundo'🦆
// En este punto 'couldBeNothing' es 'hola mundo'
```