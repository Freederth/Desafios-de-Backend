const { MongoClient } = require("mongodb");
const MONGODB_URL = process.env.MONGODB_URL;

const client = new MongoClient(MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

client.connect(err => {
	if (err) {
		console.error(err);
		process.exit(-1);
	}
	console.log("Conectado a MongoDB");
});

module.exports = client;
