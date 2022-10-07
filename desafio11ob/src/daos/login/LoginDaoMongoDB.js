const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const mongoose = require("mongoose");
const { mongoConnect } = require("../../utils/mongoconnect.js");

const loginsCollections = "login";

const LoginSchema = new mongoose.Schema({
	email: { type: String, require: true },
	password: { type: String, require: true }
});

const logins = mongoose.model(loginsCollections, LoginSchema);

class LoginDaoMongoDB extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, logins);
	}
}

module.exports = LoginDaoMongoDB;
