const { ContenedorFirebase } = require("../../contenedores/ContenedorFirebase");

class ProductosDaoFirebase extends ContenedorFirebase {
	constructor() {
		super("productos");
	}
}

module.exports = ProductosDaoFirebase;
