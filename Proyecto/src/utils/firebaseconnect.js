const { query } = require("express");
var admin = require("firebase-admin");

var serviceAccount = require("./backend-ejemplo-5fafa-firebase-adminsdk-pj5ka-bba89c1f76.json");

const connectFirebase = () => {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount)
	});

	console.log("Firestore conectado");
};

module.exports = connectFirebase;
