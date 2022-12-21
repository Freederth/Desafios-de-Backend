require("dotenv").config();
const PORT = process.env.PORT || 4000;

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const productRoutes = require("./routes/product.routes");

const app = new Koa();

app.use(bodyParser());
app.use(productRoutes.routes()).use(productRoutes.allowedMethods());

app.listen(PORT);
console.log(`Servidor corriendo en el puerto ${PORT}`);
