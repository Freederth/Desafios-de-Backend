const {
	save,
	getAll,
	getById,
	update,
	removeById
} = require("../dal/product.dao");

const createProduct = async ({ name, description, qty, price }) => {
	const product = {
		name,
		description,
		qty,
		price
	};
	return await save(product);
};

const getProducts = async () => {
	return await getAll();
};

const getProduct = async id => {
	return await getById(id);
};

const updateProduct = async (id, { name, description, qty, price }) => {
	return await update(id, { name, description, qty, price });
};

const deleteProduct = async id => {
	return await removeById(id);
};

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct
};
