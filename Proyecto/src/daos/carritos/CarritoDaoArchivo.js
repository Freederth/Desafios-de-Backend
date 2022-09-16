const { ContenedorArchivo } = require("../../contenedores/ContenedorArchivo");

class CarritoDaoArchivo extends ContenedorArchivo {
	constructor() {
		super("../../data/carritos.json");
	}
	//agregar método específico de carrito
	// actualizar producto por id
	async updateById(id, carrito) {
		carrito.id = id;
		try {
			const carritos = await this.getAll();
			const index = carritos.findIndex(obj => obj.id === id);
			// console.log(index);
			if (index !== -1) {
				carritos[index] = carrito;
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(carritos, null, 2)
				);
				return { mensaje: "Carrito actualizado" };
			} else {
				return { mensaje: "Carrito no encontrado" };
			}
		} catch (error) {
			console.log(error);
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
				return dataArchivo;
			}
		} catch (error) {
			console.log("error de lectura", error);
		}
	}

	//añadir producto a carrito
	async addProductToCart(idCart, product) {
		try {
			const carritoById = await this.getById(parseInt(idCart));
			let timestamp = Date.now();
			if (carritoById.productos.length) {
				let productToAdd = {
					id: carritoById.products[carritoById.productos.length - 1].id + 1,
					timestamp,
					...product
				};
				carritoById.producto.push(productToAdd);
				await this.updateById(parseInt(idCart), carritoById);
				let idProduct =
					carritoById.productos[carritoById.productos.length - 1].id;
				console.log(`El producto agregado tiene el ID: ${idProduct}`);
				return idProduct;
			} else {
				let productToAdd = { id: 1, timestamp, ...product };
				carritoById.productos.push(productToAdd);
				await this.updateById(parseInt(idCart), carritoById);

				console.log(`El producto agregado tiene el ID: 1`);
				return 1;
			}
		} catch (error) {
			console.log(error);
		}
	}

	// eliminar producto por id
	async deleteById(id) {
		try {
			let dataArchivo = await this.readFileFunction(this.ruta);
			let carrito = dataArchivo.find(carrito => carrito.id === id);
			if (carrito) {
				const dataArchParseFiltrado = dataArchivo.filter(
					carrito => carrito.id !== id
				);
				await fs.promises.writeFile(
					this.ruta,
					JSON.stringify(dataArchParseFiltrado, null, 2),
					"utf-8"
				);
				console.log("Carrito eliminado");
			} else {
				console.log("No se encontró el Carrito");
			}
		} catch (error) {
			console.log("No existe el id", error);
		}
	}

	async deleteProductByID(idCart, idProduct) {
		try {
			let dataArchivo = await this.readFileFunction(this.ruta);
			let carrito = dataArchivo.find(carrito => carrito.id === idCart);
			let producto = carrito.productos.find(
				producto => producto.id === idProduct
			);
			console.log(producto);
			if (carrito) {
				let productosFiltrados = carrito.productos.filter(
					producto => producto.id !== idProduct
				);
				carrito.productos = productosFiltrados;
				await this.updateById(idCart, carrito);
				console.log("Producto eliminado");
			} else {
				console.log("No se encontró el Carrito");
			}
		} catch (error) {
			console.log("No existe el id", error);
		}
	}
}

module.exports = { CarritoDaoArchivo };
