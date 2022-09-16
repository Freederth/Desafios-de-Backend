const { query } = require("express");
var admin = require("firebase-admin");

var serviceAccount = require("../utils/backend-ejemplo-5fafa-firebase-adminsdk-pj5ka-bba89c1f76.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

class ContenedorFirebase {
	constructor(coleccion) {
		this.db = getFirestore().collection(coleccion);
	}
}

export { ContenedorFirebase };
