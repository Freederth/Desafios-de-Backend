const mongoose = require("mongoose");

const mongoConnect = async () => {
	try {
		const url = "mongodb://localhost:27017/ecommerce";
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("MongoDb conectado");
	} catch (error) {
		console.error(`error de conexion: ${error}`);
	}
};

module.exports = mongoConnect;
