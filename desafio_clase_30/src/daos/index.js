require("dotenv").config();

const CarritoDaoMongoDB = require("./carritos/CarritoDaoMongoDB.js");
const ProductoDaoMongoDB = require("./productos/ProductoDaoMongoDB.js");
const LoginDaoMongoDB = require("./login/LoginDaoMongoDB.js");
const ChatDaoFirebase = require("./chat/ChatDaoFirebase.js");

// exports
exports.Carrito = CarritoDaoMongoDB;
exports.Producto = ProductoDaoMongoDB;
exports.Login = LoginDaoMongoDB;
exports.Chat = ChatDaoFirebase;
