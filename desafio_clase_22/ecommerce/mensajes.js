const { normalize, denormalize, schema } = require("normalizr");
const fs = require("fs");
const mensajesSinNormalizar = require("./mensajesSinNormalizar.json");

// **-- Mensajes --**
const messages = mensajesSinNormalizar;
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
	"./ecommerce/chat.json",
	JSON.stringify(normalizedMessages.result)
);
