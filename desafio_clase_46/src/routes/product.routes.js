const Router = require("koa-router");
const {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct
} = require("../api/products.api");
const { save } = require("../dal/product.dao");

const router = new Router({
	prefix: "/products"
});

router.get("/", async ctx => {
	ctx.body = await getProducts();
});

router.get("/:id", async ctx => {
	const id = ctx.params.id;
	ctx.body = await getProduct(id);
});

router.post("/", async ctx => {
	let product = ctx.request.body;
	product = await createProduct(product);
	ctx.response.status = 200;
	ctx.body = product;
});

router.put("/:id", async ctx => {
	const id = ctx.params.id;
	let product = ctx.request.body;
	product = await updateProduct(id, product);
	ctx.response.status = 200;
	ctx.body = product;
});

router.delete("/:id", async ctx => {
	const id = ctx.params.id;
	await deleteProduct(id);
});

module.exports = router;
