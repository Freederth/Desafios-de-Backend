# Desafíos de Backend

#### Backend CoderHouse

Para utilizar y probar el programa, se ejecutan los siguientes comandos:

```
npm install
npm start
```

## Desafío clase 2: Clases

- Se declaró una clase usuario con nombre, apellido, libros y mascotas.
- Se le dio los métodos getFullName(), addMascota(string), countMascotas(), addBook(string,string), getBookNames().
- Se creó un objeto usuario con valores arbitrarios e invocó sus métodos.

## Desafío clase 4: Manejo de archivos

- Implementada la clase Contenedor(archivo) con los métodos: save, getById, getAll, deleteById y deleteAll.
- save le asigna una id a cada objeto.
- Se formateó como se pide en la consigna

## Desafío clase 6: Servidor con express

El link a glitch es:

```
https://glitch.com/edit/#!/honeysuckle-glorious-barnacle
```

- El endpoint está en puerto 8080 como se pedía.
- Ruta '/productos' devuelve un array con todos los productos disponibles.
- Ruta '/productoRandom' devuelve un producto random.

## Desafío clase 8: API RESTful

- El endpoint está en puerto 8080.
- GET 'api/productos' devuelve un array con todos los productos disponibles.
- GET 'api/productos/:id' devuelve un producto según su id.
- POST 'api/productos/:id' recibe y agrega un producto, y lo devuelve con su id.
- PUT 'api/productos/:id' recive y actualiza un producto según su id.
- DELETE 'api/productos/:id' elimina un producto según su id.
- Puedes subir un objeto con el formulario del index.html

## Desafío clase 10: Motores de plantillas

- El endpoint está en puerto 8080.
- Formulario de de carga productos en ruta raíz "/productos" para recibir POST y redirigir al mismo formulario.
- Vista de productos cargador (utilizando plantillas) en la ruta GET "/productos"
- Ambas páginas con botón que redirigen a la otra.

### Conclusión

Tras haber utilizado las 3 plantillas disponibles para este desafío, el que más gustó fue pug por su sintaxis, que hizo que la tarea de aprender nuevos commands fuese más simple. Además de esto, tanto ejs como pug ofrecen casi la misma variedad de uso. Handlebars fue mi última opción porque versus ejs su latencia era muy alta, casi el doble. Al final entre ejs y pug, me decanté por pug porque su lectura es mucho más limpia, me cuesta trabajo ver ejs y decir sinceramente que entiendo lo que veo.

## Desafío clase 12: Websockets

- El endpoint está en puerto 8080.
- Formulario de de carga productos en ruta raíz "/".
- Vista de productos cargador (utilizando handlebars) en la ruta "/".
- Chat implementado abajo del formulario, los mensajes se guardan en un archivo.

## Desafío clase 16: Nuestra primera BD

- Subir MariaDB en Xampp y ejecutar el archivo

```
node crearTablas.js
```

- El endpoint está en puerto 8080.
- Formulario de carga productos en ruta raíz "/".
- Vista de productos cargador (utilizando handlebars) en la ruta "/".
- Los productos se cargan a MariaDB, para ver la base de datos, se debe ejecutar XAMPP y levantar el servidor de MariaDB.
- Chat implementado abajo del formulario, los mensajes se guardan en la base de datos de SQLite3, en la ruta ecommerce, la cual puede ser vista como tabla con la extensión SQLite Viewer de VSCode.

## Desafío clase 18: MongoDB

- La base de atos ecommerce contiene 2 colecciones: mensajes y productos.
- Se agregaron 10 documentos a la colección productos y mensajes.
- Se listan todos los documentos de cada colección.
- Se muestra la cantidad de documentos almacenados en cada una de ellas.
- Respecto a CRUD:
  - Se creó un nuevo producto y se agregó a la colección productos.
  - Se realiza la consulta por nombre de productos que:
    - Tengan precio menor a 1000.
    - Tengan precio entre 1000 y 3000.
    - Tengan precio mayor a 3000.
    - Sea el tercero más barato.
  - Actualización de todos los productos, agregando un campo stock de 100.
  - Cambiar a 0 el stock de todos los prodcutso mayores a 4000.
  - Eliminación de todos los productos que tengan precio menor a 1000.
- Crear usuario "pepe" con contraseña "asd456" y rol sólo lectura de datos ecommerce. Pepe no puede alterar ninguna información.
- Todas las queries están en el archivo ./queries.md

## Desafío clase 22: Mocks y normalización

- El endpoint está en puerto 8080.
- Formulario de carga productos en ruta raíz "/".
- Vista de productos cargados (utilizando handlebars) en la ruta "/api/productos-test".
  - Los productos son pedidos desde Faker.
- Mensajes en formato {author:{id,nombre,apellido,edad,alias,avatar}, text}.
  - Al normalizar los mensajes, pasan de 95 bytes a 33 bytes, lo que equivale a un 65% de compresión.
  - IMPORTANTE: El mensaje sale escrito como object Object, pero al pasar 1 segundo, se actualiza y se muestra correctamente, tras normalizar utilizando exec node mensajes.js.
- Los mensajes se guardan en la base de datos de SQLite3, en la ruta ecommerce, la cual puede ser vista como tabla con la extensión SQLite Viewer de VSCode.

## Desafío clase 24: LOG-IN POR FORMULARIO

- El endpoint está en puerto 8080.
- Cuando el login coincide con el de la sesión, te entra.

## Desafío clase 26: Inicio de sesión

- El endpoint está en puerto 8080.
- En /register se registra un usuario con su email y contraseña.
  - Se persiste en Mongo, en una colección nueva de Usuarios.
- La clave se encripta con bcrypt.
- En /login se pide email y contraseña y se autentica a través de una strat de passport.
- Tanto en /register como en /login hay un botón para redirigir al otro endpoint.
- Una vez logeado, se redirige a /home, donde se muestra el email y un botón de logout.
- La sesión se mantiene 10 minutos y en cada recarga se reinicia el tiempo.
- Vistas de error de login y register.
  - Registro: Usuario ya registrado.
  - Login: Usuario no registrado o contraseña incorrecta.
- Todo lo demás se mantiene tal y como estaba en la segunda entraga de proyecto.
- Implementado con passport y passport-local.
- Implementado middleware que no te deja pasar si no estás logeado.

## Desafío clase 28: Usando el objeto process

- Sobre el proyecto del último desafío entregable, mover todas las claves y credenciales utilizadas a un archivo .env, y cargarlo mediante la librería dotenv.
  - La única configuración que no va a ser manejada con esta librería va a ser el puerto de escucha del servidor. Éste deberá ser leído de los argumento pasados por línea de comando, usando alguna librería (minimist o yargs). En el caso de no pasar este parámetro por línea de comandos, conectar por defecto al puerto 8080.
- Agregada la ruta "/info", que presenta en una vista sencilla los siguientes datos:
  - Argumentos de entrada
  - Path de ejecución
  - Nombre de la plataforma (sistema operativo)
  - Process id
  - Versión de node.js
  - Carpeta del proyecto
  - Memoria total reservada (rss)
- Agregada ruta '/api/randoms' que calcula un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query).

## Desafío clase 30: Servidor con balance de carga

- Para levantar el modo FORK

```
pm2 start server.js --name="server fork" --watch -- -p 8080
```

- GET /api/randoms/:cant para obtener una cantidad de números aleatorios.
- GET /info ahora muestra la cantidad de núcleos de la máquina.

-Para levantar el resto en modo cluster

```
pm2 start server.js --name="Server Cluster" -i max --watch -- 8080
```

## Desafío clase 32: Loggers, gzip y analisis de performance

- Para levantar el modo FORK

```
pm2 start server.js --name="server fork" --watch -- -p 8080
```

- Incorporar al proyecto de servidor de trabajo la compresión gzip.
- Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.
- Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
  - Ruta y método de todas las peticiones recibidas por el servidor (info)
  - Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
  - Errores lanzados por las apis de mensajes y productos, únicamente (error)
- Considerar el siguiente criterio:
  - Loggear todos los niveles a consola (info, warning y error)
  - Registrar sólo los logs de warning a un archivo llamada warn.log
  - Enviar sólo los logs de error a un archivo llamada error.log
- Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'. Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:
  - El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.
  - Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.
- Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola)
  - El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.
  - El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.
- Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes).
- Se entrega una conclusion a partir del analisis de datos.

```
pm2 start server.js --name="Server Cluster" -i max --watch -- 8080
```

## Desafío clase 34: Desplegar nuestro proyecto en la nube

- Subido el proyecto a Heroku.
- También corre en local.
- Ya no funciona.

## Desafío clase 38: Arquitectura de capas

- Separado en capas, el orden de mi proyecto es:

  - Capa de rutas
  - Capa de controladores
  - Capa de servicios
  - Capa de persistencia

- Los cuales pueden ser visitados de la siguiente manera:
- /src
  - /contenedores
  - /controllers
  - /daos
  - /routes
  - /utils Acá tengo los middlewares y todas las funciones que llamo desde otros lados.
  - /views Acá están mis views en Handlebars.

## Desafío clase 40: Arquictura del servidor: Persistencia

- Agregar persistencia incorporando concepto de DAO y DTO.
- /src
  - /daos
    - index.js tiene el selector de DAOS, que trae: MongoDB para todo menos el Chat, que va en Firebase.
- Si llamo 2 veces a la misma ruta, no se repite el producto, porque ya está en la base de datos.

## Desafío clase 42: Testeamos nuestra API Rest

- Revisar estructura de proyecto, refactorizar si es necesario. Llegar a esquema servidor API RESTFUL en capas.
- Dejar servidor bien estructurado con ruteo, controlador, negocio, validaciones, persistencia y configuraciones.
- Innecesario realiar cliente.
- Cliente HTTP que utilice Axios para enviar peticiones y realizar test de funcionalidad, verificando correcta lectura de productos disponibles, creación de productos, actualización de productos y eliminación de productos.
- Realizar el cliente en módulo independiente, desde código aparte, generar peticiones correspondientes.
- Realizar pruebas a través de código test apropiado, utilizando mocha, chai y supertest, para probar todos los métodos HTTP de la API Restful.
- Escribir una suite de test para verificar si las respuestas de lectura, incorporación, actualización y eliminación de productos son las esperadas. Generar reporte con resultados obtenidos de la salida del test

## Desafío clase 44: Reformar para usar GraphQL

- En base al desafío de la clase 42, reformar capa de ruteo y controlador para que los requests puedan ser realizados a través de GraphQL.
- Si hubiera frontend, debería ser reformado para que utilice GraphQL.
- Utilizar GraphQL para realizar prueba de funcionalidad de queries y mutations.
- En /productGraphql encontrarás la ruta donde está configurada GraphQL.

## Desafío clase 46: Reformar para usar otro framework
- Reformar proyecto para utilizar otro framework, en este caso, utilicé Koa.

### Isabel Achurra, 2022.
