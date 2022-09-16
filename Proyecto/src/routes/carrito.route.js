const { Router } = require("express");
const {
	getCart,
	postCart,
	putCart,
	deleteCart
} = require("../controllers/carritos.controller");

const routerCarrito = Router();

// routers para archivo
routerCarrito.get("/fs/carro", getCart);
routerCarrito.get("/fs/carro/:id", getCart);
routerCarrito.post("/fs/carro", postCart);
routerCarrito.put("/fs/carro/:id", putCart);
routerCarrito.delete("/fs/carro/:id", deleteCart);

// routers para mongo
routerCarrito.get("/mongo/carro", getCart);
routerCarrito.get("/mongo/carro/:id", getCart);
routerCarrito.post("/mongo/carro", postCart);
routerCarrito.put("/mongo/carro/:id", putCart);
routerCarrito.delete("/mongo/carro/:id", deleteCart);

// routers para firebase
routerCarrito.get("/fb/carro", getCart);
routerCarrito.get("/fb/carro/:id", getCart);
routerCarrito.post("/fb/carro", postCart);
routerCarrito.put("/fb/carro/:id", putCart);
routerCarrito.delete("/fb/carro/:id", deleteCart);

module.exports = routerCarrito;
