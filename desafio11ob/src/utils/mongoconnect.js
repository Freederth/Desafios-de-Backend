require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");

const mongoConnect = async () => {
	try {
		const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}`;
		// mongodb+srv://admin:<password>@cluster0.z9jlepu.mongodb.net/test
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
