require("dotenv").config();

const CarritoDaoArchivo = require("./carritos/CarritoDaoArchivo.js");
const CarritoDaoFirebase = require("./carritos/CarritoDaoFirebase.js");
const CarritoDaoMongoDB = require("./carritos/CarritoDaoMongoDB.js");

const ProductoDaoArchivo = require("./productos/ProductoDaoArchivo.js");
const ProductoDaoMongoDB = require("./productos/ProductoDaoMongoDB.js");
const ProductoDaoFirebase = require("./productos/ProductoDaoFirebase.js");

// export condicional a la variable ENVIROMENT DAO

if (process.env.DAO === "FS") {
	exports.Carrito = CarritoDaoArchivo;
	exports.Producto = ProductoDaoArchivo;
} else if (process.env.DAO === "MONGO") {
	exports.Carrito = CarritoDaoMongoDB;
	exports.Producto = ProductoDaoMongoDB;
} else if (process.env.DAO === "FB") {
	exports.Carrito = CarritoDaoFirebase;
	exports.Producto = ProductoDaoFirebase;
} else {
	console.log("Inténtelo de nuevo.");
}
