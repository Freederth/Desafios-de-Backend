const { response } = require("express");

const getCart = (req, res = response) => {
	res.json({
		msg: "get carrito"
	});
};

const postCart = (req, res = response) => {
	res.json({
		msg: "post cart"
	});
};

const deleteCart = (req, res = response) => {
	res.json({
		msg: "delete cart"
	});
};

// update cart
const putCart = (req, res = response) => {
	res.json({
		msg: "update cart"
	});
};

module.exports = {
	getCart,
	postCart,
	deleteCart,
	putCart
};
