const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); // función entre
app.use(express.static("public")); // manejo de carpeta estática

// configuración para el puerto de escucha
app.get("/productos", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
