const fs = require("fs");

class Contenedor {
	constructor(ruta) {
		this.ruta = ruta;
	}

	async save(obj) {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			let dataArchParse = JSON.parse(dataArchivo); // convertir en objeto js}
			if (dataArchParse.length) {
				// [].length = 0 -> false
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(
						[...dataArchParse, { ...obj, id: dataArchParse.length + 1 }],
						null,
						2
					)
				);
				// ... spread operator -> copia el array y lo agrega al final
			} else {
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify([{ ...obj, id: dataArchParse.length + 1 }], null, 2)
				);
				console.log(`El archivo tiene id: ${dataArchParse.length + 1}`);
			}
		} catch (error) {
			console.log("error de escritura", error);
		}
	}

	// traer producto por id
	async getById(id) {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			let dataArchParse = JSON.parse(dataArchivo);
			let producto = dataArchParse.find(producto => producto.id === id);
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
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			let dataArchParse = JSON.parse(dataArchivo);
			if (dataArchParse.length) {
				// console.log(dataArchParse);
				return dataArchParse;
			} else {
				console.log("No hay productos");
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	}

	// eliminar producto por id
	async deleteById(id) {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			let dataArchParse = JSON.parse(dataArchivo);
			let producto = dataArchParse.find(producto => producto.id === id);
			if (producto) {
				const dataArchPaseFiltrado = dataArchParse.filter(
					producto => producto.id !== id
				);
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(dataArchPaseFiltrado, null, 2)
				);
				console.log("Producto eliminado");
			} else {
				console.log("No se encontró producto");
				return null;
			}
		} catch (error) {
			console.log("no existe el id", error);
		}
	}

	// eliminar todo los productos
	async deleteAll() {
		try {
			let dataArchivo = await fs.promises.readFile(this.ruta, "utf8");
			let dataArchParse = JSON.parse(dataArchivo);
			if (dataArchParse.length) {
				await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
			} else {
				console.log("No hay productos que borrar");
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	}
}

// el Contenedor  pide un archivo.
const contenedor = new Contenedor("./prueba.txt");

// contenedor.save({
// 	title: "Calculadora",
// 	price: 243.56,
// 	thumbnail: "calculator-math-tool-school-256.png"
// });

// contenedor.save({
// 	title: "Globo Terráqueo",
// 	price: 345.67,
// 	thumbnail: "globe-earth-geograhy-planet-school-256.png"
// });

// contenedor.save({
// 	title: "Regla de medir",
// 	price: 100.67,
// 	thumbnail: "regla-de-medir.png"
// });

// contenedor.save({
// 	title: "Escuadra",
// 	price: 123.67,
// 	thumbnail: "escuadra-de-chiquito.png"
// });

// contenedor.save({
// 	title: "Batallas de gallos",
// 	price: 300,
// 	thumbnail: "peleas-de-gallos.png"
// });

// contenedor.getById(3).then(data => console.log("el producto es: ", data));

// contenedor.getAll().then(data => console.log(data));

// contenedor.deleteById(4); //este es el id del producto Escuadra, que la eliminé.
// contenedor.deleteById(9); // no se encontró producto

// contenedor.deleteAll();
