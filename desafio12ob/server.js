const express = require("express");
require("dotenv").config();
const { argv, platform, version, memoryUsage, cwd, pid, execPath } = process;
const handlebars = require("express-handlebars");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const cp = require("cookie-parser");
const { fork } = require("child_process");

const calculoPesado = require("./src/utils/calculo");

const app = express();

// --- WEBSOCKET
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IoServer(httpServer);

// --- middleware ----------------
app.use(cp());
const { generadorProductos } = require("./src/utils/generadorProducto");
const checkAuthentication = require("./src/utils/checkAuthentication");
const passport = require("./src/utils/passportMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

// meter productosRandom en la base datos, en la colección productos
const productosRandoms = generadorProductos();
const { Carrito, Producto, Login, Chat } = require("./src/daos/index.js");

// --- Creación de objetos con DAOS ----------------
const Carritos = new Carrito();
let Productos = new Producto();

const Logins = new Login();
const Chats = new Chat();

const User = new Login();

User.getAll().then(asdas => {
	console.log("estoy intentando obtener mis usuarios: ", asdas);
});

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
			mongoUrl: process.env.MONGODB_URL,
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		}),
		secret: process.env.MONGODB_SECRETO || "secreto",
		resave: false,
		rolling: true,
		saveUninitialized: false,
		cookie: {
			httpOnly: false,
			secure: false,
			maxAge: 90000
		}
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// página de inicio, no dejar si no está logeado
app.get("/", checkAuthentication, async (req, res) => {
	const productos = await Productos.getAll();
	res.render("index", { productos });
});

// -------- LOGIN-INICIO ------------
// render login
app.get("/login", (req, res) => {
	if (req.isAuthenticated()) {
		let user = req.user;
		console.log("usuario logueado");
		res.render("index");
	} else {
		console.log("user no logueado");
		res.render("login");
	}
});
// post de login
app.post(
	"/login",
	passport.authenticate("login", {
		successRedirect: "/",
		failureRedirect: "faillogin"
	}),

	(req, res) => {
		res.render("/", { username: req.body.username });
	}
);
// -------- LOGIN-FIN --------------

// -------- REGISTER-INICIO --------
// render register
app.get("/register", (req, res) => {
	res.render("register");
});
// post para registrarse
app.post(
	"/register",
	passport.authenticate("register", {
		failureRedirect: "failregister",
		successRedirect: "login"
	}),
	(req, res) => {
		res.render("/login", { username: req.body.username });
	}
);
// -------- REGISTER-FIN -----------

// error de registro
app.get("/failregister", (req, res) => {
	console.error("Error de registro");
	// now redirect to failregister.hbs
	res.render("failregister");
});

// error de login
app.get("/faillogin", (req, res) => {
	console.error("Error de login");
	res.render("faillogin");
});

// logout
app.get("/logout", async (req, res = response, next) => {
	req.logout(err => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

// -------- PARTE PRODUCTOS -- INICIO ---------------
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
app.post("/api/productos", checkAuthentication, async (req, res) => {
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
app.put("/api/productos/:id", checkAuthentication, (req, res) => {
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
app.delete("/api/productos/:id", checkAuthentication, async (req, res) => {
	const { id } = req.params;

	Productos.deleteById(id).then(data => {
		res.json({ delete: data });
	});
});
// -------- PARTE PRODUCTOS -- INICIO ---------------

// -------- PARTE CARRITOSS -- INICIO ---------------
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
// -------- PARTE CARRITOSS -- FIN ---------------

/* ------------ CHAT ------------ */
io.on("connection", async socket => {
	let mensajesChat = await Chats.getAll();
	console.log("Se contectó un usuario");

	const text = {
		text: "ok",
		mensajesChat
	};

	socket.emit("mensaje-servidor", text);

	socket.on("mensaje-nuevo", async (msg, cb) => {
		mensajesChat.push(msg);
		const text = {
			text: "mensaje nuevo",
			mensajesChat
		};

		io.sockets.emit("mensaje-servidor", text);
		await Chats.save({
			mail,
			msg,
			fecha
		});
		return (mensajesChat = await Chats.getAll());
	});
});
// ---------------------------- FIN CARRITO -------------

// ----- INFO PAGE ----
app.get("/info", (req, res) => {
	const arguments = argv.slice(2).join(" || ");

	res.render("info", {
		execArgv: arguments.length ? arguments : "Ninguno",
		platform,
		version,
		memoryUsage: memoryUsage().rss,
		cwd: cwd(),
		pid,
		execPath
	});
});

// ----- Random PAGE ----
app.get("/api/randoms", (req, res) => {
	let { cant } = req.query;
	console.log(cant);
	const random = fork("./src/utils/calculo", [cant]);
	random.send("start");
	random.on("message", obj => {
		res.json(obj);
	});
});

//--------- listener
httpServer.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
