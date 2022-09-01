const { optionsMDB } = require("./mariaDB/conexionMariaDB");
const { optionsQLite } = require("./sqlite3/conexionSQLite");

const knexMariaDB = require("knex")(optionsMDB);
const knexSqlite3 = require("knex")(optionsQLite);

const products = [
	{
		title: "Perrito",
		price: "200",
		thumbnail:
			"https://cdn3.iconfinder.com/data/icons/animals-105/150/icon_animal_cachorro-512.png"
	},
	{
		title: "Goma",
		price: "5",
		thumbnail:
			"https://cdn1.iconfinder.com/data/icons/office-171/32/office-04-512.png"
	},
	{
		title: "Wawa",
		price: "50",
		thumbnail:
			"https://cdn3.iconfinder.com/data/icons/fruits-52/150/icon_fruit_cerejas-512.png"
	},
	{
		title: "Espada Camelot",
		price: "540",
		thumbnail: "https://m.media-amazon.com/images/I/51oN9fUB6cL._AC_SX425_.jpg"
	},
	{
		title: "Ratoncito",
		price: "60",
		thumbnail:
			"https://www.elblogdetubebe.com/wp-content/uploads/2020/04/cartas-del-Ratoncito-P%C3%A9rez-768x515.jpg"
	}
];

// **-- Productos --**

const tablaProductos = "products";

const batchMariaDB = async () => {
	try {
		console.log("Creando tabla Products...");
		await knexMariaDB.schema.createTable(tablaProductos, table => {
			table.increments("id");
			table.string("title");
			table.float("price");
			table.string("thumbnail");
		});

		console.log("Insertando productos...");
		await knexMariaDB(tablaProductos).insert(products); // Le podemos pasar un obj o un array
	} catch (error) {
		console.log(`error creando tabla ${error}`);
	} finally {
		knexMariaDB.destroy();
	}
};

// **-- Mensajes --**

const messages = [
	{
		mail: "dcosta@gmail.com",
		mensaje: "hola",
		fecha: "1:57:42 AM"
	},
	{
		mail: "jaraneda@gmail.com",
		mensaje: "hola diego",
		fecha: "1:57:43 AM"
	},
	{
		mail: "dcosta@gmail.com",
		mensaje: "hola jaime",
		fecha: "1:57:44 AM"
	},
	{
		mail: "alo@alo.cl",
		mensaje: "hola diego y jaime",
		fecha: "1:58:45 AM"
	},
	{
		mail: "a@sa.c",
		mensaje: "hola chicos",
		fecha: "2:00:48 AM"
	}
];

const tablaMensajes = "messages";

const batchSqlite3 = async () => {
	try {
		console.log("Creando tabla Mensajes...");
		await knexSqlite3.schema.createTable(tablaMensajes, table => {
			table.increments("id");
			table.string("mail");
			table.float("fecha");
			table.string("mensaje");
		});

		console.log("Insertando mensajes...");
		await knexSqlite3(tablaMensajes).insert(messages); // Le podemos pasar un obj o un array
	} catch (error) {
		console.log(error);
	} finally {
		knexSqlite3.destroy();
	}
};

batchMariaDB();
batchSqlite3();
