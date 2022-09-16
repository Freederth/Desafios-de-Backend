const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();

const { Carrito, Producto } = require("./daos/index.js");

const Carritos = new Carrito();
const Productos = new Producto();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- administrador --------- */

const ADMINISTRADOR = true;

/* ---------- api/productos --------- */

// GET trae 1 o todos los productos
app.get("/api/productos/:id?", (req, res) => {
	const { id } = req.params;

	if (id) {
		Productos.getById(id).then(data => {
			res.json(data);
		});
	} else {
		Productos.getAll().then(data => {
			res.json(data);
		});
	}
});

// POST crea 1 producto
app.post("/api/productos", (req, res) => {
	if (ADMINISTRADOR) {
		let timestamp = Date.now();

		Productos.save({ timestamp, ...req.body }).then(data => {
			res.json({ id: data });
		});
	} else {
		res.json({
			error: -1,
			descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`
		});
	}
});

// PUT modifica 1 producto
app.put("/api/productos/:id", (req, res) => {
	if (ADMINISTRADOR) {
		const { id } = req.params;
		let timestamp = Date.now();

		Productos.updateById({ id: id, timestamp, ...req.body }).then(data => {
			res.json({ id: data });
		});
	} else {
		res.json({
			error: -1,
			descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`
		});
	}
});

// DELETE borra 1 producto
app.delete("/api/productos/:id", (req, res) => {
	if (ADMINISTRADOR) {
		const { id } = req.params;

		Productos.deleteById(id).then(data => {
			res.json({ delete: data });
		});
	} else {
		res.json({
			error: -1,
			descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`
		});
	}
});

/* ---------- /api/carrito ---------- */

// POST crea 1 carrito
app.post("/api/carrito", (req, res) => {
	let timestamp = Date.now();

	Carritos.save({ timestamp, productos: [] }).then(data => {
		res.json({
			id: data
		});
	});
});

// Delete borra 1 carrito completo
app.delete("/api/carrito/:id", (req, res) => {
	const { id } = req.params;

	//Carritos.borrarPorId(parseInt(id))
	Carritos.deleteById(id).then(data => {
		res.json({ delete: id });
	});
});

// GET lista de productos de 1 carrito
app.get("/api/carrito/:id/productos", (req, res) => {
	const { id } = req.params;
	Carritos.getById(id).then(data => {
		res.json(data);
	});
});

// POST guardar 1 producto en 1 carrito
app.post("/api/carrito/:id/productos", (req, res) => {
	const { id } = req.params;
	const { id_prod } = req.body;

	Productos.getById(id_prod).then(productoData => {
		Carritos.save(id, productoData).then(data => {
			res.json(data);
		});
	});
});

// DELETE borra 1 producto de 1 carrito
app.delete("/api/carrito/:id/productos/:id_prod", (req, res) => {
	const { id, id_prod } = req.params;

	Carritos.deleteById(id, id_prod).then(data => {
		res.json(data);
	});
});

// cualquier ruta que no exista
app.use("/api/*", (req, res) => {
	res.json({
		error: -2,
		descripcion: `ruta '${req.path}' método '${req.method}' no implementada`
	});
});

// sin este PATH, no podes actualizar las paginas
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/build/index.html"));
});

/* ------------ listener ------------ */

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().PORT}`);
});
