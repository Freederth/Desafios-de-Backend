const fs = require("fs");

class ContenedorArchivo {
	constructor(ruta) {
		this.ruta = ruta;
	}

	async readFileFunction(ruta) {
		let archivo = await fs.promises.readFile(ruta, "utf8");
		let archivoParsed = await JSON.parse(archivo);
		return archivoParsed;
	}

	async save(obj) {
		try {
			let dataArchivo = await this.readFileFunction(this.ruta);
			if (dataArchivo.length) {
				// [].length = 0 -> false
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(
						[...dataArchivo, { ...obj, id: dataArchivo.length + 1 }],
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
				console.log(`El archivo tiene id: ${dataArchivo.length + 1}`);
			}
		} catch (error) {
			console.log("error de escritura", error);
		}
	}

	async updateById(obj) {
		try {
			let dataArch = await this.readFileFunction(this.ruta);
			const objIndex = dataArch.findIndex(prod => prod.id === obj.id);
			if (objIndex !== -1) {
				// existe
				dataArch[objIndex] = obj;
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(dataArch, null, 2)
				);
				return { message: "producto actualizado" };
			} else {
				// no existe
				return { error: "producto no encontrado" };
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	}

	// traer producto por id
	async getById(id) {
		try {
			const dataArchivo = await this.readFileFunction(this.ruta);
			const producto = dataArchivo.find(producto => producto.id === id);
			if (producto) {
				return producto;
			} else {
				return { error: "producto no encontrado" };
			}
		} catch (error) {
			console.log("no existe el id", error);
		}
	}

	//traer todos los productos
	async getAll() {
		try {
			const dataArchivo = await this.readFileFunction(this.ruta);
			if (dataArchivo.length) {
				//console.log(dataArchParse);
				return dataArchivo;
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
			const dataArchivo = await this.readFileFunction(this.ruta);
			let producto = dataArchivo.find(producto => producto.id === id);
			if (producto) {
				const dataArchParseFiltrado = dataArchivo.filter(
					prod => prod.id !== id
				);
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(dataArchParseFiltrado, null, 2),
					"utf-8"
				);
				console.log("Producto eliminado");
			} else {
				console.log("No se encontró producto");
			}
		} catch (error) {
			console.log("No existe el id", error);
		}
	}
}

module.exports = { ContenedorArchivo };
