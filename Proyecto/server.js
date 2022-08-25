const express = require("express");
const handlebars = require("express-handlebars");
const { Contenedor } = require("./contenedor");
const { ContenedorCarro } = require("./contenedorCarro");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ express: true }));
app.use(express.json()); // función entre

app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use(express.static("public"));

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/views/partials"
	})
);

const admin = true;

// *************** RUTAS -- INICIO *****************************
const { Router } = express;
const routerProductos = Router();
const routerCarrito = Router();

//  *** Rutas para productos ---
// traigo todos los productos
routerProductos.get("/", async (req, res) => {
	const contenedor = new Contenedor("./productos.json");
	const productos = await contenedor.getAll();
	// res.json({ productos });
	res.render("productos", {
		titulo: "Útiles escolares 2022",
		list: productos,
		listExist: true,
		producto: true
	});
});

// trae los productos por id
routerProductos.get("/:id", async (req, res) => {
	const { id } = req.params;
	const contenedor = new Contenedor("./productos.json");
	const producto = await contenedor.getById(parseInt(id));
	res.json({ producto });
});

// agrega productos
routerProductos.post("/", async (req, res) => {
	if (admin) {
		const objProducto = req.body;
		const contenedor = new Contenedor("./productos.json");
		contenedor.save(objProducto);
		res.json({ message: "Producto guardado", objProducto });
	} else {
		res.json({
			error: -1,
			message: "No tienes permisos para agregar productos"
		});
	}
});

// actualiza productos por id
routerProductos.put("/:id", async (req, res) => {
	if (admin) {
		const { id } = req.params;
		const objProducto = req.body;
		// llamo la clase
		const contenedor = new Contenedor("./productos.json");
		contenedor.updateById({ id: parseInt(id), ...objProducto });
		res.json({ message: "Producto actualizado" });
	} else {
		res.json({
			error: -1,
			message: "No tienes permisos para actualizar productos"
		});
	}
});

// elimina productos por id
routerProductos.delete("/:id", async (req, res) => {
	if (admin) {
		const { id } = req.params;
		const contenedor = new Contenedor("./productos.json");
		contenedor.deleteById(parseInt(id));
		res.json({ message: "Producto eliminado" });
	} else {
		res.json({
			error: -1,
			message: "No tienes permisos para eliminar productos"
		});
	}
});

// 404 de productos
routerProductos.get("*", async (req, res) => {
	res.json({
		error: 404,
		description: "Ruta no implementada"
	});
});

// *** Rutas para carrito
// post '/' -> agrega un carrito
routerCarrito.post("/", async (req, res) => {
	const carrito = new ContenedorCarro("./carrito.json");
	const idCarrito = await carrito.save(req.body);
	res.json({ message: "Producto guardado en carrito", idCarrito });
});

// delete '/:id' -> vacía y elimina un carrito
routerCarrito.delete("/:id", async (req, res) => {
	const { id } = req.params;
	await carrito.deleteById(parseInt(id));
});

// get '/:id' -> trae un carrito por id
routerCarrito.get("/:id", async (req, res) => {
	const { id } = req.params;
	const contenedor = new ContenedorCarro("./carrito.json");
	const carrito = await contenedor.getById(parseInt(id));
	// res.json({ carrito });
	res.render("carritos", {
		titulo: `Carrito ${id}`,
		tiempo: carrito.timestamp,
		list: carrito.productos,
		listExist: true,
		carrito: true
	});
});

// trae los productos del carrito :id
routerCarrito.get("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const carrito = new ContenedorCarro("./carrito.json");
	const carritoById = await carrito.getById(parseInt(id));
	listaProductos = carritoById.productos;
	res.json(listaProductos);
});

// agrega un producto al carrito :id
routerCarrito.post("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const objCarrito = req.body;
	console.log(objCarrito);
	const contenedor = new ContenedorCarro("./carrito.json");
	carritoByID = await contenedor.addProductToCart(id, objCarrito);
	res.json({ message: "Producto guardado", carritoByID });
});

// elimina un producto del carrito
routerCarrito.delete("/:idCart/productos/:idProduct", async (req, res) => {
	const { idCart, idProduct } = req.params;
	await carrito.deleteProductById(parseInt(idCart), parseInt(idProduct));
});

// 404 de carritos
routerCarrito.get("*", async (req, res) => {
	res.json({
		error: 404,
		description: "Ruta no implementada"
	});
});

// *************** RUTAS -- FIN *********************************

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

// configuración para el puerto de escucha
app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Server running on port ${PORT}`);
});
