# Pauta I1

## Parte I: Preguntas teóricas (50%)

### Sección A: Conceptos (50%)

1. **(2 ptos)**
  1. Un método HTTP es idempotente si repeticiones del mismo _request_ no siguen alterando el estado de la aplicación (0.5 ptos). El método DELETE es idempotente: sucesivas repeticiones ya no seguirán eliminando el recurso que ya fue eliminado en el primer _request_ (0.25 ptos). Por otra parte alterando el estado de la aplicación (0.5 ptos). El método DELETE es idempotente: sucesivas repeticiones ya no seguirán eliminando el recurso que ya fue eliminado en el primer _request_ (0.25 ptos). Por otra parte, el método POST no es idempotente pues cada _request_ seguirá agregando un nuevo recurso a la colección identificada en el _request_ (0.25 ptos).
  2. Un método HTTP es _safe_ si un _request_ con ese método no altera el estado de la aplicación (0.5 ptos). GET es un método _safe_ pues _requests_ con este método sólo entregan un recurso (0.25 ptos), mientras que PUT no es _safe_ pues está orientado a reemplazar un recurso por el entregado en el cuerpo del _request_ (0.25 ptos)

  **Pauta**: basta con la explicación general de cada característica y nombrar los métodos de ejemplo; no es necesaria la explicación del método entregado como ejemplo.

2. **(2 ptos)** Los principales elementos de un _request_ HTTP son:
  1. **Método**: indica la operación que se realizará en el _request_ (GET -> obtener, PATCH -> modificar, DELETE -> eliminar, …)
  2. **Path**: indica el recurso sobre el cual se ejecutará la operación (`/photos` -> colección de fotos, `/photos/1` -> la foto de _id_ 1, …)
  3. **Body**: es la entidad necesaria para realizar la operación sobre el recurso (los datos de la nueva foto, los cambios a realizar a una foto existente, …)

  **Pauta**: no es necesario dar ejemplos siempre y cuando la explicación esté correcta. Un elemento correcto -> 0.7 ptos; 2 elementos correctos -> 1.5 ptos; 3 elementos correctos -> 2 ptos.

3. **(2 ptos)** Si bien al tener un único proceso y _single thread_ no es posible para el runtime JavaScript (en Node.js en este caso) ejecutar dos trozos de código JavaScript en paralelo, cada vez que se ejecuta algún llamado a una función asíncrona estará la posibilidad para que el proceso pueda comenzar o continuar otros contextos de ejecución que hayan estado a la espera de ser ejecutados.

  En más detalle:
  - El proceso de Node.js tiene un _stack_ de ejecución, en donde se van apilando llamadas a funciónes y se realiza la operación _pop_ cada vez que una función termina.
  - Las funciones asíncronas, directa o indirectamente, en algún momento terminarán llamando a código que nativamente (a nivel de sistema operativo) genera una operación que ocurre en paralelo (fuera del proceso principal), entregando una función a ser llamada cuando ese proceso termina (_callback_).
  - Cuando el sistema operativo termina esa operación paralela, agregará el _callback_ a una cola de elementos por ejecutar.
  - El proceso Node.js continúa la ejecución de todo el resto de código que pueda ser ejecutado de manera síncrona hasta que el _stack_ de ejecución se vacía.
  - En ese punto, mirará si hay _callbacks_ esperando a ser ejecutados y, si lo hay, tomará el primero y se convertirá en el primer elemento del _stack_.
  - El proceso entonces continuará la ejecución nuevamente, terminando todo lo ejecutable síncronamente hasta que el _stack_ vuelva a vaciarse.
  - Este ciclo de vaciar el _stack_, tomar el primer elemento de la cola y continuar la ejecución es lo que se conoce como el _Event loop_ de JavaScript.

  **Pauta**: una explicación simple en que incluyen el concepto de funciones asíncronas (similar al primer párrafo de esta respuesta) tiene 1.2 ptos. Para llegar a los 2 puntos necesitan incluir conceptos y explicaciones más avanzadas, como las indicadas en el detalle de la respuesta anterior (no necesita ser tan completa, pero sí incluir o explicar conceptos como el _event loop_ o la cola de _callbacks_, aunque no los mencionen con el nombre más apropiado).

### Sección B: koa (50%)

1. **(1.5 ptos)**
  1. El **modelo** se implementa utilizando el _package_ `sequelize`, que provee de un _Object Relational Mapping_ que nos permite representar tablas y tuplas de la base de datos con clases y objetos en JavaScript, y con ellos consultar y modificar la base de datos según necesite nuestra aplicación.
  2. La **vista** es implementada con ayuda de `EJS` (integrado en koa mediante `koa-ejs`) que es un _templating engine_ para poder generar HTML (u otros) de manera dinámica embebiendo pequeños trozos de código JavaScript.
  3. El **controlador** es implementado mediante una estructura de _routers_ basados en el _package_ `koa-router`, que permite asociar a un _handler_ del _request_ (que finalmente contiene el código asociado a un controlador) a un _path_ específico.
  
  **Pauta**: 0.5 puntos por cada uno. No es requisito que digan el nombre exacto del _package_, pero al menos una idea del nombre o descripción clara de lo que hace.

2. (1.5 ptos)
  1. El _request_ llega a la aplicación **koa** y comienza a pasar por una secuencia de _middlewares_, como por ejemplo el que realiza el _parsing_ del _body_ del _request_ o el que expone los datos de sesión a partir de las _cookies_ del _request_.
  2. Uno de estos _middlewares_ es el de _routing_, en donde se determina mediante el _matching_ del _path_ del _request_ con las rutas declaradas cuál _handler_ es el que se ejecutará.
  3. El código del _route handler_ normalmente interactuará con modelos para cargar o actualizar datos de la BD y luego de recopilar toda la información que necesite, hará _render_ de una vista EJS entregándole estos datos.
  4. Finalmente, la aplicación koa escribirá en el _body_ del _request_ el resultado HTML de la vista.

  **Pauta**: lo importante es que hablen de los middlewares, routes, modelos, rendering de templates, y en el orden y delegación correctos (decir que un modelo llama a la vista sería incorrecto, por ejemplo). 0.5 puntos si hay una línea clara pero con errores importantes; 1 punto si la mayor parte está correcto pero hay algunos errores u omisiones menores; 1.5 puntos si está todo correcto y completo.

3. (1.5 ptos) Amigo, si usamos este sistema de migraciones tendremos las siguientes ventajas:
  - quedará registro histórico de cada cambio que se realice al esquema de la base de datos
  - nos permitirá que siempre, en cada _commit_, lo que el código de nuestra aplicación espera de la base de datos esté sinronizado con lo que la base de datos tiene (el mismo _commit_ que supone un nuevo atributo de un modelo tendrá también una migración que agrega ese atributo)
  - tendremos la posibilidad de, en diferentes _branches_ de nuestro código, usar bases de datos con esquemas diferentes fácilmente
  - cada uno puede fácilmente crear su base de datos local (y en una versión diferente si se necesita), sin la necesidad de tener una base de datos remota para mantener la sincronización
  - el mismo historial de cambios del esquema podrá ser aplicado automáticamente cada vez que se realice un _deploy_ al ambiente de producción

  **Pauta**: 0.7 puntos por demostrar con la respuesta que se tiene claro lo que son las migraciones, y 0.8 puntos por al menos dos razones válidas como las anteriores de la respuesta de ejemplo.

4. (1.5 ptos) Únicamente con HTML, un _browser_ sólo puede enviar _requests_ GET o POST. La única manera de que el _router_ vea un método DELETE en el _request_ es enviándole "una pista" que aprovechará un _middleware_ que tiene el template para reasignar el método del _request_ antes de que llegue al _router_. Esta "pista" la espera en la forma de una asignación de `delete` a un valor llamado `_method` en el _body_ del _request_.
  
  Dado que sólo los _requests_ POST puede enviar un _body_, necesitamos que el código HTML que representa este botón sea un formulario que contenga, además de un botón que lo envíe (que gatille el _submit_ del _form_), un elemento _input_ de tipo _hidden_ que agregue este value `delete` al dato `_method` que se enviará. Salvo representar el botón de esta forma en HTML no es necesario ningún cambio adicional en **koa**, más allá de la inclusión de este _middleware_ ya presente en el template usado para construir nuestras aplicaciones.
  
  **Pauta**: La explicación del 1er párrafo no es necesaria, basta con que expliquen que sólo necesitan usar los elementos indicados en un HTML form para tener el puntaje completo.

## Parte II: Preguntas prácticas (50%)

### Sección A: Asynchronous JavaScript without XML (40%)

#### Pregunta 1 (50%)

Esta pregunta tiene muchas soluciones válidas. Lo importante es que todo se ejecute de manera similar al caso de _callbacks_ (nota: para simplificar esta pregunta habla de ejecución "en paralelo", a pesar de que sabemos que no es exactamente eso lo que sucede):
- `prendeParrilla` y `preparaEnsaladas` suceden en paralelo
- sólo después de que `prendeParrilla` termina, se ejecutan `asaElPollo` y `asaLaCarne`
- `asaElPollo` y `asaLaCarne` también ocurren en paralelo
- sólo cuando `asaElPollo`, `asaLaCarne` y `preparaEnsaladas` han terminado de ejecutarse, se llamará a la función `come`, para disfrutar del asado ya listo para comer.

Una primera solución válida, que sólo puede optar a los 4 (por seguir dependiendo de funciones auxiliares y el plato de manera global):

```js
prendeParrilla()
  .then((parrillaEncendida) => {
    parrillaEncendida.asaElPollo().then(agregaAlPlato);
    parrillaEncendida.asaLaCarne().then(agregaAlPlato);
  });
preparaEnsaladas().then(agregaAlPlato);
```

Ahora, para optar a los 6 puntos es necesario no contar con funciones auxiliares ni un arreglo de alimentos global. Utilizando sólo lo básico de promesas, es posible llegar a la siguiente solución:

```js
const promesaDeAlimentosAsados = prendeParrilla()
  .then((parrillaEncendida) => {
    const promesaDePolloAsado = parrillaEncendida.asaElPollo();
    return parrillaEncendida.asaLaCarne()
      .then(carneAsada =>
        promesaDePolloAsado
          .then(polloAsado => [polloAsado, carneAsada])
      );
  });
preparaEnsaladas()
  .then(ensalada =>
    promesaDeAlimentosAsados
      .then(alimentosAsados => alimentosAsados.concat(ensalada))
  )
  .then(come);
```

Nota que, por ejemplo, se llama a la función `asaElPollo` y se guarda la promesa que retorna en una variable, para que el proceso asíncrono de asar el pollo comience en ese momento. Luego, se llama a `asaLaCarne` y sobre esa promesa de ejecuta `then`. Así, se espera el resultado de `asaLaCarne` **mientras** `asaElPollo` se está ejecutando, y cuando termina `asaLaCarne` (se ejecuta el callback pasado a `then`) entonces se ejecuta `then` en la promesa por el pollo. Esto logra que ambos procesos asíncronos se comiencen y se estén ejecutando en paralelo, pero la promesa final sólo se resuelve cuando ambas promesas han podido resolverse. Entre los alimentos de parrilla y las ensaladas se usa la misma técnica.

Ahora, si usamos la función `Promise.all`, que permite recibir un arreglo de promesas y retorna una única promesa que será resuelta, cuando todas las promesas recibidas estén ya resueltas, a un arreglo con cada uno de los valores resueltos en cada una de las promesas recibidas, podemos escribir esto de una manera más simple:

```js
Promise.all([
  prendeParrilla()
    .then((parrillaEncendida) => {
      return Promise.all([
        parrillaEncendida.asaElPollo(),
        parrillaEncendida.asaLaCarne(),
      ]);
    }),
  preparaEnsaladas(),
])
  .then(([[pollo, carne], ensaladas]) => come([pollo, carne, ensaladas]));
```

Aquí también estamos haciendo uso de _destructuración_ de argumentos en una función, para inmediatamente asignar a variables con nombre `pollo`, `carne` y `ensaladas` a cada uno de los argumentos que vienen dentro del arreglo (y dentro del arreglo como primer elemento del arreglo principal). También es posible sin usar esta destructuración con un par de líneas adicionales de código para desarmar y volver a armar el arreglo que recibe `come`.

Finalmente, si te gusta usar `async`/`await`, puedes sacar provecho de esto y escribirlo de una manera que puede parecer aún más simple. Sin embargo, debes tener el mismo cuidado que con la respuesta original de 6 puntos: debes asegurarte que los procesos asíncronos comiencen para que puedan ser ejecutados "en paralelo". Si tienes dos líneas en que directamente le agregas `await` al valor de retorno de una función que te entrega una promesa, entonces la siguiente línea ni siquiera se ejecutará (y, por lo tanto, su proceso asíncrono no comenzará) antes de que se haya resuelto la promesa de la primera. Por lo tanto, necesitas guardar la promesa como en la primera solución de 6 puntos y luego podrás usar `await` en la promesa directamente.

Por último, recuerda que `await` sólo se puede usar dentro de funciones que tengan en su declaración la _keyword_ `async`. Por lo tanto, no puedes usarla en código directo y podrías necesitar crear una IIFE (función anónima invocada inmediatamente) para poder usar `await`. Aquí está una posible solución que cumple con todo lo anterior:

```js
const alimentosAsadosPromise = prendeParrilla()
  .then(async (parrillaEncendida) => {
    const polloPromise = parrillaEncendida.asaElPollo();
    return [await parrillaEncendida.asaLaCarne(), await polloPromise];
  });
(async () => come([await preparaEnsaladas(), ...await alimentosAsadosPromise]))();
```

**Pauta**:
- Cada uno de los 4 criterios descritos inicialmente (qué cosas suceden en paralelo, qué se espera para poder ejecutarse, etc) tienen igual puntaje. Si la respuesta es una que intenta los 4 puntos, entonces cada criterio tiene 1 punto. Si es una respuesta que orientada a los 6 puntos, entonces cada criterio pesará 1.5 puntos.
- Sobre cada criterio:
  - Si el criterio se cumple a cabalidad, entonces se obtiene el puntaje correcto.
  - Si hay un buen indicio de intento de cumplir con el criterio pero hay errores menores que impiden que se cumpla, entonces se obtiene la mitad de puntaje.
  - Si hay errores importantes que impiden que se cumpla con el criterio o no hay un intento claro de cumplirlo, entonces se obtiene 0 puntos en ese criterio.
- Errores de sintaxis menores pueden ignorarse (_typos_ o uso ligeramente incorrecto de elementos del lenguaje como la función `concat`, una _arrow fn_ que retorna implícitamente un objeto pero en que no se incluyeron los paréntesis para que eso funcione, entregar múltiples argumentos en lugar de un arreglo a `Promise.all`, etc). Sin embargo, deben quedar como feedback en la corrección a pesar de no afectar en el puntaje final.
- No importa si el código es mucho más _verboso_ de lo necesario, o mucho más ineficiente, mientras cumpla con los criterios descritos (ej.: crear muchas más promesas de las necesarias, o tener muchos más `then` de los necesarios)

#### Pregunta 2 (50%)

Respuesta correcta:
1. El _output_ es:
  ```
  starting program...
  main
  heatWaterAsync
  heatWaterAsync called
  weightCoffeeSync
  weightCoffeeSync finished
  weightCoffeeSync called
  groundCoffeeAsync
  groundCoffeeAsync called
  heatWaterAsync resolved
  groundCoffeeAsync resolved
  prepareCoffeeAsync
  prepareCoffeeAsync resolved
  coffee prepared
  ```
2. Todo sería muy similar, salvo porque `groundCoffeeAsync` se resuelve antes de `heatWaterAsync` y `prepareCoffeeAsync` se llama antes también de que se resuelva `heatWaterAsync`. Sin embargo, dado que `prepareCoffeeAsync` recibe la promesa de `heatWaterAsync` entonces tendrá que esperar que se resuelva ésta antes de poder terminar su propio proceso asíncrono. El resultado entonces es:
  ```
  starting program...
  main
  heatWaterAsync
  heatWaterAsync called
  weightCoffeeSync
  weightCoffeeSync finished
  weightCoffeeSync called
  groundCoffeeAsync
  groundCoffeeAsync called
  groundCoffeeAsync resolved
  prepareCoffeeAsync
  heatWaterAsync resolved
  prepareCoffeeAsync resolved
  coffee prepared
  ```

**Pauta**: Hay muchos conceptos y detalles que hay que tener claro para poder llegar al _output_ correcto. Por lo tanto, tendremos puntajes parciales por diferentes criterios independientes entre sí que la respuesta debería cumplir, de manera que aunque algunos de ellos no se cumplan sí se puedan cumplir otros. Los criterios y los puntajes respectivos son los siguientes (están incluidas ambas preguntas en estos criterios):
- (0.5 ptos) `starting program...` al principio de todo y `main` como primera línea luego de la anterior
- (0.5 ptos) mostrar `<functionName>` cada vez que se llama a una función síncrona o asíncrona (4 llamadas, 1/4 de puntaje cada una)
- (0.5 ptos) mostrar `<functionName> called` justo después de la línea `<functionName>` por haber llamado a una función asíncrona (2 casos, mitad de puntaje en cada uno)
- (0.5 ptos) mostrar la secuencia `weightCoffeeSync`, `weightCoffeeSync finished` y `weightCoffeeSync called` seguida y sin otros mensajes entre medio
- (0.5 ptos) no mostrar ningún mensaje de `resolved` antes de que se haya ejecutado todo lo que puede ejecutarse de manera síncrona al principio (hasta `groundCoffeeAsync called`)
- (0.5 ptos) `heatWaterAsync resolved` debe ser la primera línea con `resolved` pues es la primera promesa que se resuelve (en caso de pregunta 1 únicamente)
- (0.5 ptos) `prepareCoffeeAsync` aparece **después** (aunque no sea inmediatamente después) de `groundCoffeeAsync resolved`, debido a que es necesario resolver esa primera antes de que se llame a `prepareCoffeeAsync`
- (0.5 ptos) `prepareCoffeeAsync resolved` aparece antes de `coffee prepared` pues se espera (`await`) a su resolución antes de ese log
- (0.5 ptos) `heatWaterAsync resolved` debe aparecer antes que `prepareCoffeeAsync resolved` debido a que la segunda función necesita esperar a la resolución de la primera
- (0.5 ptos) `coffee prepared` aparece al final de todos los logs
- el escenario de la segunda pregunta implica que `heatWaterAsync` se demorará mucho más que todas las otras promesas en resolverse... pero `prepareCoffeeAsync` de todas maneras no puede resolverse antes de ésta, por lo que el único cambio en los logs por este escenario es que:
  - (0.5 ptos) `heatWaterAsync resolved` debe aparecer luego de `groundCoffeeAsync resolved`
  - (0.5 ptos) pero aún antes de `prepareCoffeeAsync resolved` pero aún antes de `prepareCoffeeAsync resolved`

**Nota**: errores tipográficos de las líneas de log pueden ignorarse mientras sea claro a qué ejecución de log se refieren.

### Sección B (60%)

#### Pregunta 1 (60%)

Hay dos criterios importantes a considerar en esta pregunta: que tanto los _paths_ de las rutas como los métodos a los que responden sigan una orientación a recursos como la vista en clases. Así, una respuesta correcta sería la siguiente:

- POST /planetary-systems
- GET /planetary-systems
- DELETE /planetary-systems/:id
- GET /planetary-systems/:id
- POST /planetary-systems/:id/planets
- En esta última aceptamos varias soluciones como correctas:
  - PATCH /planetary-systems/:planetarySystemId/planets/:id
  - PATCH /planets/:id
  - PUT /planetary-systems/:planetarySystemId/planets/:id
  - PUT /planets/:id
  - PUT /planetary-systems/:planetarySystemId/planets/:id/visited
  - PUT /planets/:id/visited

**Pauta**: 1 puntos por cada ruta; dentro de cada ruta, 0.5 puntos por usar el método correcto y 0.5 puntos por un _path_ correcto.

#### Pregunta 2 (40%)

Algunas de las rutas más simples que se podrían elegir:

```js
router.get('/planetary-systems', async (ctx) => {
  const planetarySystems = await ctx.orm.planetarySystem.findAll();
  return ctx.render('planetary-systems/index', { planetarySystems });
});
```

```js
router.get('/planetary-systems/:id', async (ctx) => {
  const planetarySystem = await ctx.orm.planetarySystem.findById(ctx.params.id);
  return ctx.render('planetary-systems/show', { planetarySystem });
});
```

```js
router.delete('/planetary-systems/:id', async (ctx) => {
  await ctx.orm.planetarySystem.destroy({ where: { id: ctx.params.id }});
  ctx.redirect(ctx.router.url('planetarySystems'));
});
```

**Pauta**:
- (2 ptos) uso apropiado de método y _path_ en la ruta (1 pto cada uno)
- (2 ptos) ejecución apropiada del modelo (obtención del sistema planetario, eliminación de un sistema planetario, creación de una nueva entidad, etc.). No es necesario para cumplir con este requisito que se hagan validaciones o manejo de errores (como que no se encuentra la entidad, por ejemplo)
  - 0.5 de esos puntos es por _handling_ apropiado de la(s) promesa(s) asociadas
- (2 ptos) por resolución del _request_, que dependiendo del caso debiera ser un `render` de un template entregándole los datos necesarios o un `redirect` a algún otro _path_. Aquí se pueden aceptar supuestos razonables acerca de qué es lo que se necesita en el template o hacia dónde se redirige después, o a falta de supuestos se debiera esperar lo "normal" para estos casos, como entregar la instancia al template en un GET, o una redirección al listado si se elimina un elemento (también suponiendo que la ruta del listado tiene un nombre que se pueda usar)

Las rutas "más interesantes" son las que crean o modifican instancias, siempre y cuando se intente alcanzar una cierta completitud en ellas. También se deben evaluar los mismos 3 criterios anteriores para obtener los 6 puntos, y el bonus dependerá de:
- 0.5 puntos por validar datos entregados en el _request_
- 1 punto por detectar errores y reaccionar adecuadamente a ellos (error de validación de los datos -> mostrar el template de edición nuevamente, errores de que no se encontró una entidad -> mostrar error en la respuesta (por ejemplo, enviando un string de error a un template del que se hará render)). No es requisito manejar errores más inesperados como de base de datos, por ejemplo. Este ítem igual puede tener puntaje parcial (sólo manejo de errores de validación, pero no de endidades no encontradas, tendrá mitad de puntaje)
- 0.5 puntos si la ruta elegida requiere de interacción adicional a la básica con el _path_ y modelos (y está correcto). Por ejemplo, es necesario cargar un sistema planetario para agregarle un planeta.

Un ejemplo de respuesta que obtiene los 2 puntos de bonus, además de los 6 puntos normales:

```js
router.post('/planetary-systems/:id/planets', async (ctx) => {
  // 0.5 puntos de bonus por interacción adicional con modelo y ruta
  const planetarySystem = await ctx.orm.planetarySystem.findById(ctx.params.id);
  // si no encontramos el planeta, usamos un template genérico para mostrar errores. Esto son 0.5/1 puntos por handling de errores
  if (!planetarySystem) {
    return ctx.render('error', { message: 'Planetary system not found' });
  }
  try {
    const planet = await planetarySystem.createPlanet(ctx.request.body);
    ctx.redirect(ctx.router.url('planetarySystem', planetarySystem.id));
  } catch (validationError) {
    // se puede suponer que el error sólo será de validación, aunque estrictamente deberíamos verificar si es eso u otro tipo de error

    // por el hecho de tener un try/catch que implique que se considera el caso de error de validación, se puede optar a los 0.5 puntos de validar los datos entregados en el request. Otra opción es que la validación ocurra explícitamente, pero no es requisito.

    // este handling de volver a mostrar el template para crear un planeta pero con los errores de validación son otros 0.5/1 puntos por manejo de errores
    return ctx.render('planets/new', {
      planetarySystem,
      planet: ctx.orm.planet.build(ctx.request.body),
      errors: validationError.errors,
    });
  }
});
```

**Nota**: usos incorrectos pero cercanos de la API de sequelize o de koa pueden ser ignorados en cuanto a puntaje. Por ejemplo, usar `find` con el `id` directamente como argumento en lugar de usar `findById`, o usar `find` sin argumentos en lugar de `findAll`, o usar `ctx.url` en lugar de `ctx.router.url` o `ctx.planet` en lugar de `ctx.orm.planet`. Si parece ser más un intento de adivinar que realmente recordar, entonces puede considerarse incorrecto.