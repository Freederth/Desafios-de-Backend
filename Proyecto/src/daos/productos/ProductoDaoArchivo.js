const { ContenedorArchivo } = require("../../contenedores/ContenedorArchivo");

class ProductoDaoArchivo extends ContenedorArchivo {
	constructor() {
		super("../../data/productos.json");
	}

	//agregar método específico de carrito
}

module.exports = { ProductoDaoArchivo };
