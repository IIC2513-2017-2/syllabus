# Pauta Examen

## Pregunta 1 (25%)

1. Pueden haber diferentes criterios válidos. Es importante que en al menos una evaluación de estos criterios cada uno de los tipos de aplicación salga "seleccionada". Ejemplos de criterios válidos:
  - actualización de datos: si la aplicación nunca o casi nunca necesita datos frescos, entonces puede convenir una aplicación nativa con los datos embebidos. En cambio, si los datos cambian frecuentemente, necesita que los datos estén centralizados fuera de la aplicación, lo que nos hará seleccionar ya sea una app nativa con API HTTP o una app Web.
  - volumen de datos: de manera similar al criterio anterior, si el volumen de datos es muy grande puede no ser posible embeberlos en una aplicación y, por lo tanto, también tenemos que elegir alguna de las otras dos.
  - interactividad: aunque las aplicaciones web se han acercado bastante a una aplicación nativa, aún hay una diferencia entre la interactividad que provee una nativa vs una aplicación Web que no puede requerir elegir una de las primeras.
  - uso de elementos nativos (APIs, por ejemplo): podríamos necesitar de alguna API nativa que expone el sistema y que aún no esté disponible a través de _browsers_ (ejemplo reciente: API para realidad aumentada) y, por lo tanto, necesitemos de una nativa.
  - facilidad de instalación: una aplicación Web no necesita instalación, por lo que si necesitamos algo que no genere fricción para captar usuarios, puede ser una mucho mejor opción.
  - ubicuidad: una aplicación Web puede ser utilizada desde cualquier dispositivo, desde cualquier lugar, y en cualquier momento. La necesidad de instalación de una aplicación nativa es una desventaja en este sentido (quizá no puedes instalarla en un dispositivo que no es tuyo), y aún más en el caso de una aplicación nativa offline, en que cualquier personalización que pudiera proveer la aplicación sólo estará presente en ese dispositivo (al menos la que tiene una API a su disposición podría almacenar esta información de manera externa a la aplicación).

  **Pauta**: 0.25 puntos por cada criterio, indicando la preferencia de tipo de aplicación que su evaluación indica, y 0.25 puntos por que todos los tipos de aplicación salgan seleccionados en algún criterio (son la mejor opción de acuerdo a ese criterio).
  
2. Lo importante en esta pregunta es que sean restricciones REST válidas, y que la explicación de la que fue difícil o no lograron cumplir sea también razonable. Como ejemplo, la que implica probablemente mayor esfuerzo es _Uniform interface_, espefícicamente la navegabilidad entre las diferentes entidades. Por el otro lado, las que vienen "gratis" por el protocolo HTTP son las que más fácilmente pueden cumplirse, como _Client-server architecture_ y _Layered system_.

  **Pauta**: 0.3 puntos por restricción difícil/no cumplida, 0.3 puntos por cómo cumplirla o qué faltó para ello, y luego 0.2 puntos por cada una de las dos restricciones adicionales que sí se cumplieron o son sencillas de cumplir.
  
3. Suponiendo que se usó lo recomendado en clases (koa-session para Web UI y JSON Web Tokens para API) entonces:
  - similitudes:
    - la información de estado se guarda en el cliente
    - se agrega información acerca del usuario actual (como su id) en la información guardada en el cliente
    - la información en el cliente va firmada digitalmente, de manera que no pueda ser alterada desde el cliente
    - no requiere de base de datos en el servidor para persistir información de sesión
  - diferencias:
    - la primera se basa en _cookies_ para el almacenamiento de la información de sesión en el cliente; la segunda no implica ningún almacenamiento específico
    - la primera usa los _headers_ HTTP de _cookies_ para la transmisión de la información entre el cliente y servidor; la segunda usa el _body_ del response para enviar el _token_ desde el servidor al cliente y el _header_ `Authorization` para enviar el _token_ desde el cliente al servidor
    - aunque similar, la estructura con que se genera la información de sesión firmada es diferente
  
  **Pauta**: No es requisito que sea exaustivo. Puede considerarse correcto desde haber encontrado una similitud y una diferencia correcta (0.5 puntos cada una). Si hay diferencias/similitudes incorrectas, se obtiene la mitad del puntaje.
  
4. Respuestas posibles:
  - Similitudes:
    - en ambos casos se programa con una lógica fuertemente asíncrona (_callbacks_, promesas)
    - parte importante de la API del lenguaje es soportada de la misma manera en _frontend_ y _backend_ (`setTimeout`, `Promise`, `Array`, etc)
    - tanto en _frontend_ como en _backend_ existen múltiples versiones del lenguaje
  - Diferencias:
    - tanto Node.js como el _browser_ proveen extienden la API básica del lenguaje haciendo diverger lo disponible en _backend_ y _frontend_
    - relacionado con lo anterior, el foco del lenguaje en _backend_ es responder _requests_ HTTP mientras que en el _frontend_ es interactuar con y controlar el _browser_
    - aunque existen múltiples versiones del lenguaje en ambos lados, normalmente en _backend_ uno puede simplemente usar la versión (o set de características más bien) soportada en la versión de Node.js que se está ejecutando y además hay control respecto a qué versión usar, mientras que en el _frontend_ se hace necesario o bien programar utilizando sólo las características disponibles en todos los _browsers_ a soportar o bien utilizar un _transpiler_ para utilizar características más recientes y que sean transformadas a algo que _browsers_ más antiguos soporten
  
  **Pauta**: 0.25 puntos por cada similitud y diferencia correcta
  
5. Lo importante en esta pregunta es que sea visible introspección respecto a lo realizado durante el semestre y los consejos sean relevantes.

  **Pauta**: por cada consejo, se obtiene 0.25 puntos si es correcto pero muy poco relevante o la justificación no es convincente, o 0.5 puntos si es correcto, relevante y con justificación convincente.
  Nota: la relevancia es en gran medida determinada por la justificación.
  
6. Respecto a microservicios vs aplicación monolítica:
  - Ventajas posibles:
    - tener diferentes aplicaciones facilita la división de trabajo en diferentes equipos
    - cada microservicio puede evolucionar de manera diferente e indpendiente (incluso cambiando la tecnología usada si fuese necesario)
    - se puede hacer _deploy_ de únicamente los servicios que sufrieron cambios
    - caídas en algún servicio no impactan necesariamente a la aplicación completa
  - Desventajas posibles:
    - mayor complejidad por la interacción entre distintos sistemas
    - posible caída del _performance_ por el hecho de que un _request_ desde el cliente probablemente implica varios otros _requests_ HTTP entre diferentes servicios

  Respecto a dificultades a resolver, ejemplos posibles son:
  - autenticación: es necesario que no sólo el servicio que recibe el _request_ inicial sepa qué usuario está siendo representado, sino que además esta información debe estar disponible para todos los demás servicios que lo requieran. Para ello una posible solución es que el _token_ de usuario también sea entregado entre los distintos servicios que requieran autenticación, y que puedan "resolver" este _token_ a información del usuario mediante un servicio centralizado que lo permita
  - dependencias entre servicios y actualización de APIs: es necesario tener cuidado de no cambiar la API de un microservicio del cual otros servicios dependan, pues podría romper parte del sistema. Una posible solución es similar a lo que debe hacer cualquier API pública: impedir cambios que no sean _backwards compatible_ y forzar la creación de nuevos _endpoints_ si es necesario un cambio que no pueda cumplir con ello, manteniendo los antiguos _endpoints_ al menos por algún tiempo.

  **Pauta**: 0.2 puntos por cada ventaja o desventaja y 0.2 puntos por cada dificultad (0.1 puntos si la dificultad es válida pero la solución no lo es).
  
## Pregunta 2 (25%)

Una posible solución es la siguiente:

### Documentación

#### `POST /elections`

- _Request body_: JSON con todos los atributos necesarios para crear la elección (nombre, fecha, tipo de elección, etc.).

- _Response_:
  - status: `201 Created` si es exitoso
  - _body_: JSON de la entidad recién creada. Incluye atributo `electionUrl`, que contiene la URL de la representación de esta elección.

#### `POST /elections/:id/candidates`

- _Request body_: JSON con todos los atributos necesarios para crear el candidato (nombre, apellido, lista, etc.).

- _Response_:
  - status: `201 Created` si es exitoso
  - _body_: JSON de la entidad recién creada. Incluye atributo `candidateUrl`, que contiene la URL de la representación de este candidato, y `votesCount` con una cuenta de votos, inicialmente en 0.

#### `DELETE /elections/:electionId/candidates/:id`

- _Response_:
  - status: `204 No Content` si es exitoso

#### `PATCH /elections/:electionId/candidates/:id`

- _Request body_: JSON con el atributo `votesCount` indicando la nueva cantidad de votos del candidato
- _Response_: misma respuesta que en la creación de un candidato

#### `POST /candidates/:id/votes-increments` o similar, alternative también considerada válida para el `PATCH` anterior

- _Request body_: cantidad de votos a incrementar, con default en 1
- _Response_: JSON indicando la cantidad actual de votos del candidato, y `candidateUrl` con la referencia al candidato

#### `GET /elections`

- _Response_: JSON array con todas las elecciones. Cada una contiene un atributo `electionUrl` con la referencia a la elección en particular

#### `GET /elections/:id`

- _Response_: JSON con los datos de una elección en particular, incluyendo un arreglo `candidates` que contiene la información de cada candidato previamente agregado. Cada candidato a su vez contiene `candidateUrl` y `votesCount`, además de los datos básicos

### Implementación de un _route handler_

```js
// este router es montado en el path `:electionsId/candidates` del router de elections,
// que a su vez es montado en `/elections`
router.post('/', async (ctx) => {
  // suponemos existencia de middleware anterior a este router que carga la election
  // con id :electiondId en ctx.state.election
  const { election } = ctx.state;
  const candidate = await election.addCandidate(ctx.request.body);
  ctx.body = { ...candidate.toJSON(), candidateUrl: router.url('candidate', election.id, candidate.id) };
})
```

### Implementación de consumo de la API

```js
router.post('/candidates', async (ctx) => {
  const fixedElectionId = 1;
  const response = superagent
    .post(`http://elections.example.org/api/elections/${fixedElectionId}/candidates`)
    .send(ctx.request.body); // se recibe la data para el candidato en la UI de esta otra aplicación
  await ctx.render('someTemplate', { candidate: response.body });
});
```

### Pauta

- Documentación de endpoints (3 puntos): son 6 los endpoints necesarios; por cada uno se obtienen 0.5 puntos, repartidos de acuerdo al siguiente criterio:
  - _path_: 0.2
  - _method_: 0.15
  - request body y response: 0.15; no es necesario ser preciso respecto a status, pero sí descontar parte de 0.1 de este ítem si no se mencionan las URLs en los que deban mencionarse (pues es parte relevante de una API REST)
- Implementación de endpoint (1.5 puntos)
  - 0.5 puntos por estructura del route handler
  - 1 punto por contenido del route handler; esto incluye ya sea implementación o mención de middlewares adicionales, como en la respuesta de ejemplo
- Implementación de consumo de endpoint (1.5 puntos)
  - 0.5 puntos por estructura y respuesta (render) del handler
  - 1 punto por el consumo correcto de la API, utilizando librería a elección

## Pregunta 3 (25%)

En [esta carpeta](./code/pregunta3) y en [Codepen](https://codepen.io/wachunei/full/KyxjEb/) se encuentran dos ejemplos de solución.

  **Pauta:**
  La pauta está compuesta por las siguiente dos rúbricas, una para HTML+CSS y la otra para React.
  
  - HTML y CSS (4 puntos)

Criterio  | Insatisfactorio  | Satisfactorio  |  Excelente
----------|------------------|----------------|-------------
HTML (0.5 puntos) | No usa o casi no usa criterios de semántica en la elección de elementos, clases y ids en el _markup_  (0 puntos) | Usa criterios semánticos para escribir el _markup_ (0.35 ptos) | Además del nivel anterior, no abusa de ids o clases en el documento (0.5 puntos)
Selectores CSS (0.5 puntos) | Usa sólo selectores de id y clases o selectores incorrectos (0 puntos) | Usa selectores elementos con cero o poca combinación de clases (0.4 puntos)| Demuestra un uso correcto de selectores de  elementos, clases, combinados y/o múltiples (0.5 puntos)
Layout (1 punto)| No incluye estilos para generar el layout o usa tablas en el HTML para replicarlo (0 puntos) | Usa técnicas CSS para posicionar aunque puede tener algún problema o errores menores (0.7 puntos) | Logra resultado muy similar a la imagen, sin utilizar técnicas de posicionamiento absoluto ni errores relevantes (1 punto)
Estilo de menú principal (imagen izquierda) (0.5 ptos) | No agrega el estilo del menú (0 ptos) | Agrega estilo, pero con algún detalle importante que olvida aplicar (viñetas, borde, alineación del texto o subrayado) (0.4 ptos) |  Muy cercano a la imagen, sin detalles o con detalles no importantes (márgenes o *padding*) (0.5 ptos)
HTML y estilo de ítem de fruta (1.5 ptos) | HTML y estilos incompletos o muy lejanos a la imagen o con errores importantes (0 ptos) | Cercano a la imagen aunque puede tener algún problema de posicionamiento o algunos errores menores (1 ptos) |  Muy similar a la imagen, incluyendo un posicionamiento correcto (1.5 ptos)

  - React (2 puntos)

Criterio  | Insatisfactorio  | Satisfactorio  |  Excelente
----------|------------------|----------------|-------------
Componente React (0.5 puntos ) | No crea una clase o no extiende de `React.Component` (0 puntos) | Crea una clase que extiende de `React.Component` con constructor, método render, aunque tiene algunos errores (no llama a `super` o no asigna estado inicial correctamente) (0.3 puntos) | Crea una clase que extiende de `React.Component` con constructor, estado inicial y método render, sin errores. (0.5 puntos)
Render Básico (0.5 puntos) | No escribe método render o nunca retorna JSX (0 puntos) | Retorna JSX estático en el método render, o usa las `props` del componente para mostrar las frutas con errores graves (0.3 puntos) | Retorna JSX incluyendo las frutas desde las `props` del componente correctamente o con errores menores (0.5 puntos)
Manejo de Estado (0.5 puntos) | No agrega funcionalidad para responder a evento `onClick` y cambiar el estado del componente | Agrega manejo de evento `onClick` y cambio de estado, pero tiene algunos errores de ejecución o resultado incorrecto (0.3 puntos) | Agrega manejo de evento `onClick` y cambia el estado correctamente (0.5 puntos)
Consumo de Estado (0.5 puntos) | No utiliza el estado del componente para mostrar el carrito de compras (0 puntos) | Utiliza el estado del componente para mostrar el carrito de compras, pero con algunos errores (error en la iteración, falta de índice, error en el cálculo del total, etc.) (0.3 puntos) | Utiliza correctamente el estado del componente para mostrar el carro de compras y el total (0.5 puntos)

## Pregunta 4 (25%)

En esta pregunta es válido suponer el _rate limit_ como cantidad de _requests_ máxima en un mismo minuto (por ejemplo, cantidad máxima desde las 13:07:00.000 a las 13:07:59.999) o como cantidad máxima de _requests_ en una ventana de tiempo de 1 minuto (1er request a las 13:07:04 entonces no puede haber un sexto _request_ hasta después de las 13:08:04).

También son válidas las anternativas de considerar o no considerar un request fallido por rate limit como uno de los que consumen ese rate limit disponible.

En [esta carpeta](./code/pregunta4) se puede encontrar una aplicación koa con un archivo `index.js` y uno `index-with-bonus.js` que contienen solución con y sin bonus para esta pregunta.

  **Pauta**:
  - 1 punto por estructura general del _middleware_ (`app.use` y función que recibe `ctx` y `next`)
  - 2.5 puntos por mantener estado que permita determinar si se alcanzó o no el _rate limit_
    - 2 puntos si hay errores lógicos menores pero la idea es correcta (ej.: un `<` en vez de un `>`)
    - 1.5 puntos si hay una buena idea pero con errores estructurales menores (como no agregar una fecha en el momento adecuado, o no considerar correctamente casos borde como el primer request)
    - 0.5 puntos si hay indicios de una idea correcta pero con errores importantes
  - 1.5 puntos por interrumpir la cadena de middlewares y responder con un error (no importa si no es con un status HTTP adecuado, pero que de alguna forma se note que es un error (JSON con descripción de error en body de response, por ejemplo))
    - notar que lo importante para interrumpir el flujo esto es no llamar `next`, pero además se debe entregar un error en la respuesta, directa o indirectamente (como con `ctx.assert`)
  - 1 punto por continuar cadena de _middlewares_ si no se alcanza rate limit o si el periodo de bloqueo pasó