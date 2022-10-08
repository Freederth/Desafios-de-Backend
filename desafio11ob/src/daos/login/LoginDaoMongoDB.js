const mongoose = require("mongoose");
const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js");
const mongoConnect = require("../../utils/mongoconnect.js");

const loginsCollections = "login";

const LoginSchema = new mongoose.Schema({
	mail: { type: String, require: true },
	password: { type: String, require: true }
});

const logins = mongoose.model(loginsCollections, LoginSchema);

class LoginDaoMongoDB extends ContenedorMongodb {
	constructor() {
		super(mongoConnect, logins);
	}

	// getByMail
	async getByMail(mail) {
		const doc = await this.getCollection
			.find({
				mail: mail
			})
			.exec();
		return doc;
	}
}

module.exports = LoginDaoMongoDB;
