const { Router } = require("express");
const {
	getCart,
	postCart,
	putCart,
	deleteCart
} = require("../controllers/productos.controller");

const routerProductos = Router();

// routers para archivo
routerProductos.get("/fs/producto", getCart);
routerProductos.get("/fs/producto/:id", getCart);
routerProductos.post("/fs/producto", postCart);
routerProductos.put("/fs/producto/:id", putCart);
routerProductos.delete("/fs/producto/:id", deleteCart);

// routers para mongo
routerProductos.get("/mongo/producto", getCart);
routerProductos.get("/mongo/producto/:id", getCart);
routerProductos.post("/mongo/producto", postCart);
routerProductos.put("/mongo/producto/:id", putCart);
routerProductos.delete("/mongo/producto/:id", deleteCart);

// routers para firebase
routerProductos.get("/fb/producto", getCart);
routerProductos.get("/fb/producto/:id", getCart);
routerProductos.post("/fb/producto", postCart);
routerProductos.put("/fb/producto/:id", putCart);
routerProductos.delete("/fb/producto/:id", deleteCart);

module.exports = routerProductos;
