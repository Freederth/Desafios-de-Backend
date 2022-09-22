# Desafío obligatorio 10: MOCKS Y NORMALIZACIÓN

#### Backend CoderHouse

Para utilizar y probar el programa, se ejecuta

```
npm install
```

luego ejecutar

```
node crearTablas.js
```

y finalmente

```
nodemon server.js
```

- El endpoint está en puerto 8080.
- Formulario de carga productos en ruta raíz "/".
- Vista de productos cargados (utilizando handlebars) en la ruta "/api/productos-test".
  - Los productos son pedidos desde Faker.
- Mensajes en formato {author:{id,nombre,apellido,edad,alias,avatar}, text}.
  - Al normalizar los mensajes, pasan de 95 bytes a 33 bytes, lo que equivale a un 65% de compresión.
- Los mensajes se guardan en la base de datos de SQLite3, en la ruta ecommerce, la cual puede ser vista como tabla con la extensión SQLite Viewer de VSCode.

### Isabel Achurra, 2022.
