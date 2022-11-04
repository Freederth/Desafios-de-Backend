const { Contenedor } = require("./contenedor");

const express = require("express");
const handlebars = require("express-handlebars");

const { optionsMDB } = require("./mariaDB/conexionMariaDB");
const { optionsQLite } = require("./sqlite3/conexionSQLite");

const knexMariaDB = require("knex")(optionsMDB);
const knexSqlite3 = require("knex")(optionsQLite);

const productos = new Contenedor(knexMariaDB, "products");
const comentarios = new Contenedor(knexSqlite3, "messages");

const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port = process.env.PORT || 8080;

// ** Mensajes----------------
// ----------------------------INICIO
io.on("connection", async socket => {
	let mensajesChat = await comentarios.getAll();
	console.log("Se contectó un usuario");

	const mensaje = {
		mensaje: "ok",
		mensajesChat
	};

	socket.emit("mensaje-servidor", mensaje);

	socket.on("mensaje-nuevo", async (msg, cb) => {
		mensajesChat.push(msg);
		const mensaje = {
			mensaje: "mensaje nuevo",
			mensajesChat
		};

		const id = new Date().getTime();
		io.sockets.emit("mensaje-servidor", mensaje);
		cb(id);
		await comentarios.save({
			id,
			mail: msg.mail,
			mensaje: msg.mensaje,
			fecha: msg.hora
		});
	});
});
// ---------------------------- FIN

// -------------------------------- INICIO Mensajes cambios por json.
app.get("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	const productoById = await comentarios.getById(id);
	productoById
		? res.json(productoById)
		: res.json({ error: "Producto no encontrado" });
});

app.put("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	const respuesta = await comentarios.updateById(id, req.body);
	res.json(respuesta);
	mensajes = await comentarios.getAll();
});

app.delete("/api/mensajes/:id", async (req, res) => {
	const { id } = req.params;
	res.json(await comentarios.deleteById(id));
	mensajes = await comentarios.getAll();
});

app.delete("/api/mensajes", async (req, res) => {
	res.json(await comentarios.deleteAll());
	mensajes = await comentarios.getAll();
});
// -------------------------------- FIN Mensajes cambios por json.

// ** Render con handlebars
// ------------------------------ INICIO
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
// ---------------------------- FIN

// ** Productos
// ------------------------------ INICIO
app.get("/", async (req, res) => {
	const producto = await productos.getAll();
	res.render("index", {
		list: producto,
		listExist: true,
		producto: true
	});
});

app.get("/", async (req, res) => {
	const producto = await productos.getAll();
	res.render("productos", {
		titulo: "Útiles escolares 2022",
		list: producto,
		listExist: true,
		producto: true
	});
});

app.post("/", async (req, res) => {
	const objProducto = req.body;
	productos.save(objProducto);
	res.redirect("/");
});

app.put("/api/productos/:id", async (req, res) => {
	const { id } = req.params;
	const respuesta = await productos.updateById(id, req.body);
	res.json(respuesta);
	losProductos = await productos.getAll();
});

app.delete("/api/productos/:id", async (req, res) => {
	const { id } = req.params;
	res.json(await productos.deleteById(id));
	losProductos = await productos.getAll();
});

app.delete("/api/productos", async (req, res) => {
	res.json(await productos.deleteAll());
	productos = await productos.getAll();
});
// ---------------------------- FIN

httpServer.listen(port, err => {
	if (err) throw new Error(`Error al iniciar el servidor: ${err}`);
	console.log(`Server is running on port ${port}`);
});
