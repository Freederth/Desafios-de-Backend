const express = require("express");
require("dotenv").config();
const path = require("path");
const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cp = require("cookie-parser");

const app = express();

// --- WEBSOCKET
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

// --- middleware ----------------
const { generadorProductos } = require("./src/utils/generadorProducto");
const loginCheck = require("./src/utils/loginCheck");
const passport = require("./src/utils/passportMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

// --- Creación de objetos con DAOS ----------------
const productosRandoms = generadorProductos();
const { Carrito, Producto, Login, Chat } = require("./src/daos/index.js");

const Carritos = new Carrito();
let Productos = new Producto();

// meter productosRandom en la base datos, en la colección productos

const Logins = new Login();
const Chats = new Chat();

app.set("view engine", "hbs");
app.set("views", "./src/views/layouts");

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "",
		layoutsDir: "",
		partialsDir: __dirname + "/src/views/partials"
	})
);

app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				"mongodb+srv://admin:chmod777@cluster0.z9jlepu.mongodb.net/?retryWrites=true&w=majority",
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		}),
		secret: "emilio",
		resave: false,
		rolling: true,
		cookie: {
			maxAge: 90000
		},
		saveUninitialized: false
	})
);

// Passport
app.use(passport.session());
app.use(passport.initialize());

// página de inicio, no dejar si no está logeado
app.get("/", loginCheck, async (req, res) => {
	const productos = await Productos.getAll();
	res.render("index", { productos });
});

// render login
app.get("/login", (req, res) => {
	if (req.session.name) {
		res.redirect("/");
	} else {
		res.render("login.hbs", {});
	}
});

// render register
app.get("/register", (req, res) => {
	if (req.session.name) {
		res.redirect("/");
	} else {
		res.render("register", {});
	}
});

// error de registro
app.get("/failregister", (req, res) => {
	if (req.session.name) {
		res.redirect("/");
	} else {
		res.render("failregister", {});
	}
});

// error de login
app.get("/faillogin", (req, res) => {
	if (req.session.name) {
		res.redirect("/");
	} else {
		res.render("faillogin", {});
	}
});

// post para registrarse
app.post(
	"/register",
	passport.authenticate("registro", {
		failureRedirect: "/failregister",
		failureMessage: true
	}),
	(req, res) => {
		console.log("en post register");
		const registerSuccess = "Registrado exitosamente. Ir a Login para ingresar";
		res.redirect("/");
	}
);

// post de login
app.post(
	"/login",
	passport.authenticate("autenticacion", {
		failureRedirect: "/faillogin",
		failureMessage: true
	}),
	(req, res) => {
		req.session.name = req.body.username;
		res.redirect("/");
	}
);

app.get("/api/productos", async (req, res) => {
	const producto = await productosRandoms;
	// y también quiero que lea de la base de dato si hay algo
	const productosDB = await Productos.getAll();
	const productosConRandoms = [...producto, ...productosDB];
	res.render("productos", {
		list: productosConRandoms,
		listExist: true,
		producto: true
	});
});

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
app.post("/api/productos", loginCheck, async (req, res) => {
	let timestamp = Date.now();
	let { title, price, thumbnail } = req.body;
	let producto = {
		title,
		price,
		thumbnail,
		timestamp
	};
	await Productos.save(producto);
	res.json({ id: data });
});

// PUT modifica 1 producto
app.put("/api/productos/:id", loginCheck, (req, res) => {
	let timestamp = Date.now();
	let { title, price, thumbnail } = req.body;
	let producto = {
		title,
		price,
		thumbnail,
		timestamp
	};
	Productos.updateById(producto).then(data => {
		res.json({ id: data });
	});
});

// DELETE borra 1 producto
app.delete("/api/productos/:id", loginCheck, async (req, res) => {
	const { id } = req.params;

	Productos.deleteById(id).then(data => {
		res.json({ delete: data });
	});
});

/* ---------- /api/carrito ---------- */

// POST crea 1 carrito
app.post("/api/carrito", (req, res) => {
	let timestamp = Date.now();
	let { title, price, thumbnail } = req.body;
	let producto = {
		title,
		price,
		thumbnail,
		timestamp
	};
	Carritos.save(producto).then(data => {
		res.json({ id: data });
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

/* ------------ CHAT ------------ */
socketServer.on("connection", async socket => {
	socket.emit("messages", await Chats.getAll());
	socket.on("new_message", async mensaje => {
		await Chats.metodoSave(mensaje);
		let mensajes = await Chats.getAll();
		socketServer.sockets.emit("messages", mensajes);
	});
});

//--------- listener
httpServer.listen(PORT, () => {
	console.log(`Corriendo server en el puerto ${PORT}!`);
});
