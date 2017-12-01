# Pauta I2

## Pregunta 1 (25%)

1. La llamada a `add` se ejecuta sin problemas por el _hoisting_ que ocurre, dejando la función ya definida desde el principio del scope en el cual fue declarada.

Sin embargo, la llamada a `subtract` si genera un error. A pesar de que la declaración de la variable igual está sujeta a _hoisting_, la creación y asignación de una función a esa variable sólo ocurre al momento de ejecutar esa línea, por lo que en el momento en que se está intentando llamar en este trozo de código ésta aún no existe.

Nota: en estricto rigor, `var` y `const/let` se comportan de manera ligeramente diferente. La variable comienza a existir desde el principio del _scope_ de su declaración en ambos casos (_hoisting_), pero sólo en el caso de `var` ésta además es inicializada con `undefined`. Esto ocasiona que el error usando `const` sea un `ReferenceError` (por intentar usar una variable no inicializada), mientras que si se cambia esa declaración a `var` será un `TypeError` (por ejecutar algo que no es una función). Lo importante es detectar que es un error, así que se considerará correcto el sólo mencionar error genérico, mencionar `ReferenceError` o mencionar `TypeError`.

  **Pauta**: 0.6 puntos por cada función, repartidos en 0.3 puntos por correctamente indicar si hay o no error y 0.3 puntos por explicación.
  
2. `const` y `var` tienen dos diferencias importantes:

- _scope_: `const` declara variables con _scope_ de bloque, mientras que `var` con _scope_ de función
- reasignación: `const` sólo permite asignar la variable en la misma sentencia de declaración. `var`, en cambio, es similar a `let`, dado que se puede asignar una variabl múltiples veces luego de ser declarada.

  **Pauta**: 0.6 por cada diferencia correcta. No es requisito agregar ejemplos mientras la explicación sea clara.
  
3. Un _closure_ es una técnica que permite a una función acceder a todas las variables existentens en el _scope_ en que la función fue declarada, incluso si se ejecuta fuera de ese _scope_. Ejemplo:

```js
let foo;
if (true) { // nuevo scope para variables let/const
  const a = 10; // `a` sólo existe dentro de este bloque
  foo = function () { // función contiene referencia a `a` en su _closure_
    console.log(a); // por lo tanto, puede referirse a ella
  }
}
foo(); // incluso si se ejecuta fuera del scope en que fue declarada la función
console.log(a); // esto lanza un error pues `a` no existe en este scope.
```
  
  **Pauta**: 0.6 puntos por explicación (no importa si hay alguna impresición leve mientras se entienda la idea importante) y 0.6 puntos por un ejemplo que apoye la explicación.
  
4. El origen de las diferencias es que `a` fue construido a partir de una función constructora `Foo1`, mientras que `b` es un objeto básico de JavaScript (derivado de la "clase" `Object`) retornado desde una llamada normal a una función `Food2`. De aquí se desprende la principal diferencia que es el prototipo que tiene cada uno de estos objetos (`Object.getPrototypeOf(a)` vs `Object.getPrototypeOf(b)`). El primero tiene a `Foo1.prototype` como prototipo (`prototype` de su función constructora) mientras que el segundo tiene `Object.prototype` como prototipo. Otra diferencia de este mismo origen es lo que cada objeto tiene en la propiedad `constructor` (`Foo1` vs `Object`).

Esta diferencia impacta, por ejemplo, en lo que sucede si se asignan propiedades al prototipo de la función en que se originaron ambos objetos. `Foo1.prototype.baz = 1` implicará que `a.baz === 1`, mientras que `Foo2.prototype.baz = 1` no tendrá ningún efecto en `b.baz` (`=== undefined`). Más allá de eso, ambos son objetos similares, tienen las mismas propiedades y funcionamiento.
  
  **Pauta**: No es necesaria una explicación de la extensión de la pauta. Se puede tener el puntaje completo (1.2 puntos) si se explica que ambos objetos tienen diferente prototipo. Si sólo se explica el origin (fn constructora vs Object) se asignan 0.6 puntos. El mencionar la propiedad `constructor` no asigna puntaje adicional. Si se menciona la diferencia correcta (prototype para puntaje completo o fn de origen para mitad de puntaje) pero además se agregan otras diferencias incorrectas, entonces se asigna la mitad de puntaje (ej.: tienen prototipo diferente y además son números => 0.6 puntos).
  
5. Por tres razones principales:
- estos _requests_ pueden suceder asíncronamente, mientras el resto de la aplicación no sólo se sigue mostrando sino que además se puede seguir interactuando con ella (a diferencia de la interrupción total que ocurre al hacer clic en un _link_ que gatilla un _request_ normal).
- normalmente lo que se solicita mediante _requests_ Ajax es sólo parte de una página o simplemente datos que tienden a ser mucho más livianos (tanto en tiempo de ejecución en servidor como en tiempo de transferencia de datos) que _requests_ normales, logrando que la llegada de la información solicitada sea más rápida.
- como consecuencia de la primera razón, una aplicación puede potencialmente tener varios _requests_ Ajax ocurriendo simultáneamente
  
  **Pauta**: Las dos primeras son las principales razones. La tercera es más bien una consecuencia de la primera, pero se agregó a la pauta para incluir otra posible razón que podría ser listada en la respuesta. Con dos de estas 3 razones se puede tener el puntaje completo de 1.2 puntos (0.6 puntos cada una). Si se agregan razones incorrectas junto con razones correctas se obtiene sólo la mitad de puntaje.
  
## Pregunta 2 (25%)

[Aquí](./code/pregunta2/index.js) hay un ejemplo de respuesta correcta en la parte superior del archivo y con todo el código de la pregunta en la parte inferior para que puedas probar otras posibles respuestas.

  **Pauta**: La pregunta misma contiene los criterios de repartición de puntaje dentro de esta pregunta, en la forma de diferentes secciones en que, cumpliendo con los `assert` de esa sección, se obtiene el puntaje de la misma. Notar que es posible obtener el puntaje de la primera sección, luego no obtener el de la segunda, pero luego sí obtener el de las restantes.

## Pregunta 3 (25%)

[Aquí](./code/pregunta3/index.js) hay un ejemplo de respuesta que se puede ejecutar ejecutando `yarn install` y luego `node index.js`.

  **Pauta**:
  - (2 puntos) flujo del middleware: 2 puntos si se ejecuta un `await next()` en el momento correcto, 1.5 puntos si ejecuta `await next()` pero después de decorar la respuesta, o 0.5 puntos si se ejecuta `next()` en el momento correcto pero sin el `await`
  - (3 puntos) respuesta decorada: 0.5 puntos por cada tiempo medido (1 punto en total), 1 punto por la generación de id, 1 punto por reasignar ctx.body

## Pregunta 4 (25%)

  En [esta carpeta](./code/pregunta4/votes-count) puedes encontrar un ejemplo completo que incluye una solución sin y una con bonus. Para ejecutarla tan sólo tienes que ejecutar `yarn install` y luego `yarn start`. Si entras a `http://localhost:3000` verás la solución sin bonus, correspondiente al archivo `src/VotesCount.js`, mientras que si entras a `http://localhost:3000/bonus` podrás ver la solución con bonus, correspondientes a los archivos `src/VotesCountWithBonus.js` (smart) y `src/VotesCountForm.js` (dumb).
  
  **Pauta**: Como en otras preguntas en que es necesario escribir código, errores menores pueden no considerarse; de la misma forma, si es claro que se maneja el concepto pero hay un olvido de, por ejemplo, nombres de métodos, también pueden no considerarse (por ejemplo, usar `componentMounted` en vez de `componentDidMount`). En cada ítem siguente se considera 0 puntos si tiene errores importantes o simplemente no existe, puntaje total si está correcto o contiene errores menores (siempre y cuando sea claro el manejo del tema) y puntaje parcial para una respuesta que demuestre conocimiento pero que contenía errores relevantes.
  - (1.5 puntos) HTML: título, formulario con labels e inputs, y botón para enviarlo.
  - (0.5 puntos) Estructura básica de componente React: clase con método `render` y eventualmente otros métodos de instancia y constructor.
  - (2 puntos) Manejo de los fields: esto puede ser ya sea escuchando y guardando cada cambio en el `state` o bien (aunque no recomendado) mediante acceso de _refs_
  - (2 puntos) Manejo del envío de los datos
  
  Esta pregunta tiene dos bonus, que están especificados en el enunciado.