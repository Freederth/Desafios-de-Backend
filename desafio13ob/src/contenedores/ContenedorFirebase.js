const admin = require("firebase-admin");
const serviceAccount = require("../utils/backend-ejemplo-5fafa-firebase-adminsdk-pj5ka-bba89c1f76.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

class ContenedorFirebase {
	constructor(coll) {
		this.coll = coll;
		this.connexion();
		this.query = db.collection(coll);
	}

	async connexion() {
		console.log("Firestore: base de datos conectada");
	}

	async save(obj) {
		try {
			const doc = this.query.doc(`${obj.id}`);
			let item = await doc.create(obj);
			console.log("Mensaje agregado");
			return item;
		} catch (error) {
			console.log(error);
		}
	}

	// traer producto por id
	async getById(id) {
		try {
			let datos = await this.query.doc(id).get();
			let newDatos = { ...datos.data(), id: datos.id };
			return newDatos;
		} catch (error) {
			return `No se pudo traer producto ${id}. ${error}`;
		} finally {
		}
	}

	//traer todos los productos
	async getAll() {
		try {
			let querySnapshot = await this.query.get();
			let docs = querySnapshot.docs;
			let newDatos = docs.map(doc => ({
				...doc.data(),
				id: doc.id
			}));
			return newDatos;
		} catch (error) {
			console.log(`error al listar: ${error}`);
			return [];
		} finally {
		}
	}

	// eliminar producto por id
	async deleteById(id) {
		try {
			let datos = await this.query.doc(id).delete();
			return datos;
		} catch (error) {
			console.log(`error al eliminar: ${error}`);
		} finally {
		}
	}

	async updateById(obj) {
		try {
			await this.query.doc(obj.id).update(obj);
			return obj.id;
		} catch (error) {
			console.log(`error al actualizar: ${error}`);
		}
	}
}

module.exports = ContenedorFirebase;
