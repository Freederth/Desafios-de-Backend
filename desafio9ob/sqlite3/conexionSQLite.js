const optionsQLite = {
	client: "sqlite3",
	connection: {
		filename: "../ecommerce/dataBase.sqlite"
	},
	useNullAsDefault: true
};

module.exports = { optionsQLite };
