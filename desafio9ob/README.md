# Desafío obligatorio 10: MOCKS Y NORMALIZACIÓN

#### Backend CoderHouse

Para utilizar y probar el programa, se ejecutan los siguientes comandos:

## DEMO:

https://user-images.githubusercontent.com/10873846/191872834-72a8b6d9-348f-41d0-926f-e08b13378f17.mp4

Para utilizar y probar el programa, se ejecutan los siguientes comandos:

```
npm install
nodemon server.js
```

- El endpoint está en puerto 8080.
- Formulario de carga productos en ruta raíz "/".
- Vista de productos cargados (utilizando handlebars) en la ruta "/api/productos-test".
  - Los productos son pedidos desde Faker.
- Mensajes en formato {author:{id,nombre,apellido,edad,alias,avatar}, text}.
  - Al normalizar los mensajes, pasan de 95 bytes a 33 bytes, lo que equivale a un 65% de compresión.
  - IMPORTANTE: El mensaje sale escrito como object Object, pero al pasar 1 segundo, se actualiza y se muestra correctamente, tras normalizar utilizando exec node mensajes.js.
- Los mensajes se guardan en la base de datos de SQLite3, en la ruta ecommerce, la cual puede ser vista como tabla con la extensión SQLite Viewer de VSCode.

### Isabel Achurra, 2022.
