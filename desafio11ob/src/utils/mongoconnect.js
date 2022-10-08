// require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");

const mongoConnect = async () => {
	try {
		const url =
			"mongodb+srv://admin:chmod777@cluster0.z9jlepu.mongodb.net/?retryWrites=true&w=majority";
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
