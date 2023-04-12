---
sidebar_position: 2
---

# Funciones

Una función contiene una serie de sentencias que son ejecutadas cuando la función es llamada. Cada función contiene su propio ámbito que es eliminado de la memoria luego de su ejecución.

Las funciones en Quackscript son consideradas ciudadanos de primera clase, pueden ser pasadas a otras funciones, devueltas desde funciones y asignadas a variables.


## Declando una función

Para declarar una función en QuackScript debes indicar el cuerpo de función y 0 o más parámetros. Las funciones necesitan ser asignadas a variables para ser utilizadas.

```
QUACK fnEjemplo <- () > {
    quackprint('Hola mundo')🦆
}🦆
```

## Devolución de valor

Una función sin la sentencia `return` siempre va a devolver `nothing`. Un `return` en una función permite devolver un valor específico.

```js
quack devolverQuack <- () > {
    return 'quack'🦆
}🦆
```

## Parámetros

Una función puede tener 0 o más parámetros. Cuando una función es llamada la misma cantidad de argumentos deben ser pasados.

```js
quack sumar <- (primero, segundo) > {
    return primero + segundo🦆
}🦆


add(1, 2)🦆
```
