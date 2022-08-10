const express = require("express");
const app = express();
const { Contenedor } = require("./contenedor");

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;

const contenedor = new Contenedor("./productos.txt");

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", async (req, res) => {
	const producto = await contenedor.getAll();
	res.render("index", {
		titulo: "Útiles escolares 2022",
		listaProductos: producto,
		hayLista: true,
		producto: true
	});
});

app.get("/productos", async (req, res) => {
	const producto = await contenedor.getAll();
	res.render("partials/productos", {
		titulo: "Útiles escolares 2022",
		listaProductos: producto,
		hayLista: true,
		producto: true
	});
});

app.post("/productos", async (req, res) => {
	const objProducto = req.body;
	contenedor.save(objProducto);
	res.json({ message: "Producto guardado", objProducto });
});

app.listen(port, err => {
	if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
	console.log(`Server is running on port ${port}`);
});
