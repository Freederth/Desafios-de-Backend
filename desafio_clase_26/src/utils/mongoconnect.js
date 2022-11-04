const mongoose = require("mongoose");
const dotenv = require("dotenv").config({ path: "../../.env" });

const mongoConnect = async () => {
	try {
		const url = process.env.MONGODB_URL;
		mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("MongoDb conectado");
	} catch (error) {
		console.error(`error de conexion: ${error}`);
	}
};

module.exports = mongoConnect;
