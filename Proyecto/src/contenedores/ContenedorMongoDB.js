import * as Mongoose from "mongoose";
import * as dotenv from "dotenv";
import { productosModel, carritosModel } from "../model/all.model.js";
dotenv.config();

let database;
const connect = async () => {
	// Add your own uri below, here my dbname is UserDB
	// and we are using the local mongodb
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

	if (database) {
		return;
	}
	// In order to fix all the deprecation warnings,
	// below are needed while connecting
	Mongoose.connect(url);

	database = Mongoose.connection;

	return {
		productosModel,
		carritosModel
	};
};

// Safer way to get disconnected
const disconnect = () => {
	if (!database) {
		return;
	}

	Mongoose.disconnect();
};

module.exports = { connect, disconnect };
