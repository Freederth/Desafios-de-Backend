const { ContenedorFirebase } = require("../../contenedores/ContenedorFirebase");

class ChatFirebase extends ContenedorFirebase {
	constructor() {
		super("chat");
	}
}

module.exports = ChatFirebase;
