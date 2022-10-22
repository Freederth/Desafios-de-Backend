const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
	console.log(`Server listening on port ${server.address().port}`);
});

const fs = require("fs");

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
	}

	// traer producto por id
	async getById(id) {
		try {
			const dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			const dataArchParse = JSON.parse(dataArchivo);
			const producto = dataArchParse.find(producto => producto.id === id);
			if (producto) {
				return producto;
				//	console.log(producto);
			} else {
				console.log("No se encontró producto");
				return null;
			}
		} catch (error) {
			console.log("no existe el id", error);
		}
	}

	//traer todos los productos
	async getAll() {
		try {
			const dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			const dataArchParse = JSON.parse(dataArchivo);
			if (dataArchParse.length) {
				//console.log(dataArchParse);
				return dataArchParse;
			} else {
				console.log("No hay productos");
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	}
}

// el Contenedor  pide un archivo.
const contenedor = new Contenedor("./productos.txt");

const todosLosProductos = contenedor.getAll();

app.get("/productos", (req, res) => {
	todosLosProductos.then(productos => {
		res.json(
			// mostrar productos en formato JSON en el navegador
			productos
		);
	});
});

app.get("/productoRandom", (req, res) => {
	let randomNumber = Math.floor(Math.random() * 3) + 1;
	const productosRandoms = contenedor.getById(randomNumber);
	productosRandoms.then(producto => {
		res.json(
			// mostrar productos en formato JSON en el navegador
			producto
		);
	});
});
