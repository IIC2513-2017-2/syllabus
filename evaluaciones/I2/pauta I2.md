# Pauta I2

## Pregunta 1 (25%)

1. El browser decide qué valor de propiedades aplicar en base al proceso de cascada. Esto sigue diferentes criterios, en orden:
  - importancia: propiedades declaradas con `!important` se aplican por sobre otras sin esa declaración
  - origen: reglas CSS del _author_ (creador de la página web) tienen mayor prioridad que reglas CSS de _user_ y _browser_ (CSS default del browser)
  - especificidad: se le asigna un peso a cada regla en base a los tipos de selectores de su selector. Ese peso se puede considerar como un número de base infinita en que, en orden creciente, sus dígitos son: cantidad de selectores de tipo (o elemento), cantidad de selectores de clase (y similares) y cantidad de selectores de id. La regla con el selector final de mayor peso se aplica por sobre las otras.
  - orden: si todo lo anterior es equivalente, se aplica la regla que esté escrita después de las demás.

  **Pauta**: 0.2 puntos por explicar cada uno de los 3 criterios excepto especificidad, que tiene 0.4 puntos. 0.2 puntos por el orden entre los criterios.
  
2. Hay dos estrategias que son las más comúnmente utilizadas, y ambas se basan en las _HTTP cookies_.
  - Los datos completos de sesión se almacenan en una _cookie_, normalmente encriptada o al menos firmada, que se envía en cada _request_; el servidor la lee y expone toda su información como datos de sesión.
  - La _cookie_ se usa únicamente para almacenar un identificador de sesión, que se envía en cada _request_. El servidor usa ese identificador para obtener los datos de sesión, normalmente de algún sistema de persistencia de información como base de datos, disco duro, key-value storages, etc.

  **Pauta**: 0.6 puntos por cada estrategia. Para cada una considerar 0.3 puntos por una mención, y 0.3 puntos por una explicación más completa.
  
3. El _box model_ es el modelo con el cual el _browser_ representa a un elemento como una caja de 4 capas que, desde dentro hacia fuera, son: área de contenido, área de _padding_, área de borde y área de márgen.
  
  Para separar dos textos en diferentes elementos uno luego del otro es posible utilizar márgen, _padding_ o borde de uno o ambos elementos. Márgen es una distancia que no es parte del elemento, por lo cual siempre será ausente de estilo como por ejemplo de un _background_. El borde puede tener estilos, y éstos serán independientes del área de contenido, aunque no se suele usar para separar elementos sino para delimitar un elemento. El _padding_ tendrá siempre el mismo estilo que el área de contenido del elemento.
  
  **Pauta**: 0.9 puntos por explicar el _box model_, 0.1 puntos por cada manera de separar los elementos (es válido si mencionan como dos maneras diferentes una en que se use el _padding_ de uno sólo de los elementos y otra en que se use mitad de _padding_ de cada uno, o _padding_ de uno y márgen de otro; pero no es válido si sólo mencionan variaciones en cuanto a la proporción del _padding_ de cada elemento).
  
4. Normalmente elegiría una implementación en que los archivos, al ser enviados al servidor, se envíen a algún proveedor de _cloud storage_. Al subirlo a este proveedor puedo obtener una URL pública que puedo utilizar para que usos sucesivos de ese archivo se descarguen directamente del _cloud storage_ y no del servidor de la aplicación.
  
  El download es lo qe cambia en caso de que requiera autenticación para descargar los archivos, debido a que normalmente es el servidor de la aplicación el que tiene la fuente de verdad respecto a autorización. Si eso es muy relevante entonces se hace necesario que la descarga se haga pasando a través del servidor de la aplicación, que actúa de puente entre el _cloud storage_ y el cliente.
  
  **Pauta**: 0.8 puntos por explicar alguna variación en que los archivos se almacenen en algún proveedor de _storage_. 0.4 puntos por hacer una distinción de en qué influye el requerimiento adicional de control de acceso en este sistema.
  
5. - Si la promesa retornada por `doSomething` se resuelve, el _output_ es
  
  5
  6
  
  - Si la promesa se rechaza, el _output_ es

  Ups!
  10
  
  **Pauta**: 0.6 puntos por cada caso (resolución, rechazo), 0.3 puntos por cada línea de log en cada caso. Una línea de log adicional a las que ocurren descuenta 0.2 puntos de la segunda línea de log en caso de estar correcta (o nada si es que la segunda no está correcta).
  
## Pregunta 2 (25%)

Hay un [ejemplo de respuesta completa (incluyendo bonus)](code/pregunta2) para que se vea exactamente como en las figuras del enunciado. Sin embargo, no es necesario un parecido fotográfico. En particular, temas como fuentes y tamaños de letra son ignorables; temas de colores y espaciados no necesitan ser precisos, sólo que se note un intento de acercarse a la imagen. La corrección se realiza con la siguiente rúbrica.

criterio  | Insatisfactorio  | Satisfactorio  |  Excelente
----------|------------------|----------------|-------------
HTML (1 pto) | No usa o casi no usa criterios de semántica en la elección de elementos, clases y ids en el _markup_  (0 pto) | Usa criterios semánticos para escribir el _markup_ (0.7 ptos) | Además del nivel anterior, no abusa de ids o clases en el documento (1 pto)
Selectores CSS (1 pto) | Usa sólo selectores de id y clases o selectores incorrectos (0 ptos) | Usa algunas combinaciones de selectores pero infrecuentemente o sólo selectores combinados básicos (como ancestro simple) (0.7 ptos )| Usa variados selectores combinados, algunos de mediana complejidad hacia arriba, sacando provecho de selectores y de un markup más limpio (sin necesidad de tener clases casi para cada elemento) (1 pto)
Estilo de menú principal (imagen izquierda) (2 ptos) | Incompleto o muy lejano de la imagen o con errores importantes en cuanto a posicionamiento (0 ptos) | Cercano a la imagen aunque con algunos errores menores u omisión del ">" (1.2 ptos) |  Muy cercano a la imagen (2 ptos)
HTML y estilo menú secundario (2 ptos) | HTML y estilos incompletos o muy lejanos a la imagen o con errores importantes (0 ptos) | Cercano a la imagen aunque puede tener algún problema de posicionamiento o algunos errores menores (1.2 ptos) |  Muy similar a la imagen, incluyendo un posicionamiento correcto (2 ptos)
Interacción del menú secundario (1 pto) | Ausencia de interacción (0 ptos) | Intento de interacción aunque con algunos errores menores (0.4 ptos) | Interacción lograda de manera correcta (1 pto)

## Pregunta 3 (25%)

### Solución
#### Middleware

```js
app.use(async (ctx, next) => {
  ctx.state.isXHR = ctx.headers['X-Requested-With'] === 'XMLHttpRequest';
  await next(); // or return
});
```

#### Route Handler

```js
router.get('/initiatives', async (ctx) => {
  if (ctx.state.isXHR) {
    // do something XHR-esque
  } else {
    // do something else
  }
});
```

### Pauta (6 pts.)

* Middleware (4.5 pts.)
  * Escribir y agregar el *middleware* a la aplicación con `app.use()` (1 pts.)
  * Leer el valor de la propiedad `X-Requested-With` de `ctx.headers` (0.5 pts.)
  * Comparar el valor del *header* con `XMLHttpRequest` (1 pts.)
  * Asignar el valor a `ctx.state` (1 pts.)
  * Llamada a `next()` para continuar la cadena de *middlewares* (1 pts.)
* Route Handler (1.5 pts.)
  * Escribir correctamente el *handler* (método, path y acción) (0.5 pts)
  * Recuperar el valor desde `ctx.state` (0.5 pts.)
  * Utilizar el valor recuperado (0.5 pts.)

## Pregunta 4 (25%)

### Parte 1 (3 ptos)

La solución se basa en el manejo de sesión con _cookies_. Cada vez que se cargue una página que contiene un acertijo, un _middleware_ puede ir guardando la URL o _path_ cargado en un arreglo persistido en sesión. El mostrar las páginas de acertijos se realiza entonces de manera normal. Al final, cuando se intenta cargar la página de éxito, el _route handler_ de esa página puede leer desde la sesión el listado de páginas por las que se pasó.

**Pauta**: 1 pto por explicar dónde guardar la información de las páginas visitadas (sesión o _cookies_ son respuestas válidas). 1 pto por explicar un _middleware_ que vaya realizando esta persistencia. 1 pto explicar cómo se obtiene esa información en la página final.

### Parte 2 (3 ptos)

#### Route handler y middleware de páginas de acertijos
```js
router.use(async (ctx, next) => {
  await next();
  ctx.session.visitedPaths = ctx.session.visitedPaths || [];
  ctx.session.visitedPaths.push(ctx.path);
});

// no se necesita nada especial en el route handler de un acertijo
router.get('/acertijoX', (ctx) => {
  ctx.render('acertijoX', { ... });
});
```

#### Route handler de página final

```js
router.get('/paginaFinal', (ctx) => {
  // se entrega el arreglo de páginas visitadas a la vista
  ctx.render('paginaFinal', { visited: ctx.session.visitedPaths });
});
```

**Pauta**: 1 pto por route handler de página de acertijo, 1 pto por route handler de página final y 1 pto por _middleware_ que se encargue de ir almacenando la información de cada página visitada.