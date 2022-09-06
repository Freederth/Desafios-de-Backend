# Queries que se realizaron:

- Listar todos los documentos en cada colección:

  - Mensajes: `db.mensajes.find()`
  - Productos: `db.productos.find()`

- Mostrar la cantidad de docimentos almacenados en cada una de ellas:

  - Mensajes: `db.mensajes.countDocuments()`
  - Productos: `db.productos.countDocuments()`

- Realizar un CRUD sobre la colección de productos:
  - Agregar un producto más en productos: `db.productos.insertOne({nombre: "Disfraz UdeChile", precio: 5000, thumbnail: "imgURL"})`
  - Consultar por nombre de productos que:
    - Tengan precio menor a 1000: `db.productos.find({price: {$lt: 1000}})`
    - Tengan precio entre 1000 y 3000: `db.productos.find({price: {$gt: 1000, $lt: 3000}})`
    - Tengan precio mayor a 3000: `db.productos.find({price: {$gt: 3000}})`
    - Sea el tercero más barato: `db.productos.find().sort({price: 1}).limit(1).skip(2)`
  - Hacer una actualización sobre todos los productos, agregando stock: 100: `db.productos.updateMany({}, {$set: {stock: 100}})`
  - Cambiar a 0 el stock de todos los productos mayores a 4000: `db.productos.updateMany({price: {$gt: 4000}}, {$set: {stock: 0}})`
  - Eliminar todos los productos que tengan precio menor a 1000: `db.productos.deleteMany({price: {$lt: 1000}})`
