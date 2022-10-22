class Usuario {
	constructor(nombre, apellido, libros, mascotas) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.libros = libros; // objeto de libros
		this.mascotas = mascotas; //array de objetos mascota.
	}
	getFullName = () => {
		// método que retorna el nombre y apellido, utilizando templates literales.
		return `${this.nombre} ${this.apellido}`;
	};
	addMascotas = nombreMascota => {
		// método que agrega una mascota al array de mascotas.
		this.mascotas.push(nombreMascota);
	};
	countMascotas = () => {
		// método que cuenta la cantidad de mascotas.
		return this.mascotas.length;
	};
	addBook = (nombreLibro, autorLibro) => {
		// método que agrega un objeto libro al array de libros.
		this.libros.push({
			nombreLibro: nombreLibro,
			autorLibro: autorLibro
		});
	};
	getBookNames = () => {
		// método que retorna los nombres de los libros.
		return this.libros.map(libro => libro.nombreLibro);
	};
}

const elonmusk = new Usuario( // usuario de Elon Musk
	"Elon",
	"Musk",
	[
		{ nombreLibro: "El señor de las moscas", autorLibro: "William Golding" }, // libro 1
		{ nombreLibro: "Fundacion", autorLibro: "Isaac Asimov" } // libro 2
	],
	["Gata Ceniza"] // mascotas
);

console.log("el usuario se llama: ", elonmusk.getFullName()); // el usuario se llama:  Elon Musk
elonmusk.addMascotas("Perro Spike"); // agrega un perro llamado Spike al array de mascotas.
console.log("el usuario tiene: ", elonmusk.countMascotas(), " mascotas"); // el usuario tiene:  2 mascotas
elonmusk.addBook("El señor de los anillos", "J.R.R. Tolkien"); // el usuario tiene el señor de los anillos de J.R.R. Tolkien
console.log("el usuario tiene estos libros: ", elonmusk.getBookNames()); // el usuario tiene estos libros:  ["El señor de las moscas", "Fundacion"]
