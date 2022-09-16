const { ContenedorFirebase } = require("../../contenedores/ContenedorFirebase");

class CarritoDaoFirebase extends ContenedorFirebase {
	constructor() {
		super("carritos");
	}
}

module.exports = CarritoDaoFirebase;
