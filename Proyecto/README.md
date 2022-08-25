# Primera entrega de proyecto

#### Backend CoderHouse

Para utilizar y probar el programa, se ejecuta

```
nodemon server.js
```

- El endpoint está en puerto 8080.
- Implementado en servidor de aplicación basado en la plataforma Node.js y el módulo express.
- La ruta '/api/productos' implementa los siguientes funciones:
  -- GET '/' devuelve todos los productos disponibles.
  -- GET '/:id' devuelve un producto por id.
  -- POST '/' agrega un producto a la lista (admin only).
  -- PUT '/:id' actualiza un producto por id (admin only).
  -- DELETE '/:id' elimina un producto por id (admin only).
- Ahora veamos la ruta '/api/carrito':
  -- POST '/' Crea un carrotp y devuelve su id.
  -- DELETE '/:id' Vacía un carrito y lo elimina por id.
  -- GET '/:id/productos' Lista todos los productos guardados en ese carrito.
  -- DELETE '/:id/productos/:id_producto' Elimina un producto del carrito por su id.
- Variable booleana de admin para usuario true or false para llegar a las rutas que son sólo admin, está hardcodeada en server.js.

### Isabel Achurra, 2022.
