const { normalize, denormalize, schema } = require("normalizr");
const fs = require("fs");

// **-- Mensajes --**
const messages = [
	{
		author: {
			id: "dcosta@gmail.com",
			nombre: "Diego",
			apellido: "Costa",
			edad: "32",
			alias: "dcosta_32",
			avatar:
				"https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"
		},
		text: "hola"
	},
	{
		author: {
			id: "jaraneda@gmail.com",
			nombre: "Jaime",
			apellido: "Araneda",
			edad: "26",
			alias: "jaraneda_26",
			avatar:
				"https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"
		},
		text: "hola diego, como estás?"
	},
	{
		author: {
			id: "dcosta@gmail.com",
			nombre: "Diego",
			apellido: "Costa",
			edad: "32",
			alias: "dcosta_32",
			avatar:
				"https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"
		},
		text: "hola jaime, todo bien y vos?"
	},
	{
		author: {
			id: "jgaete@gmail.com",
			nombre: "Juan",
			apellido: "Gaete",
			edad: "28",
			alias: "jgaete_28",
			avatar:
				"https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png"
		},
		text: "eh chicos, que onda?"
	},
	{
		author: {
			id: "mfernandez@gmail.com",
			nombre: "Maya",
			apellido: "Fernandez",
			edad: "49",
			alias: "mfernandez_49",
			avatar:
				"https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/woman5-512.png"
		},
		text: "dale dejen de sacar la vuelta, a trabajar!"
	}
];
// console.log(JSON.stringify("tamaño antes: " + messages).length);
//95 bytes

// normalizr de messages
const authorSchema = new schema.Entity("author", {}, { idAttribute: "id" });
const commentSchema = new schema.Entity("text");
const messageSchema = [
	{
		author: authorSchema,
		text: commentSchema
	}
];

const normalizedMessages = normalize(messages, messageSchema);
// console.log(JSON.stringify("tamaño después: " + normalizedMessages).length);
// 33 bytes .

fs.writeFileSync(
	"./normalizedMessage.json",
	JSON.stringify(normalizedMessages)
);

fs.writeFileSync("./chat.json", JSON.stringify(normalizedMessages.result));
