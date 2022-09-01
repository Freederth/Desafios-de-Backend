const server = io().connect();

const render = mensajesChat => {
	let chat = document.querySelector("#chat");
	let html = mensajesChat.map(mens => {
		return `<li>
        <strong style="color:blue"> ${mens.mail} </strong>
		[<span style="color:brown">${mens.fecha}</span>]:
        <em style="color:green"> ${mens.mensaje} </em>
        </li>`;
	});
	chat.innerHTML = html.join("");
};

const addMessage = evt => {
	const mail = document.querySelector("#mail").value;
	let hora = new Date().toLocaleTimeString();
	const mensaje = document.querySelector("#mensaje").value;

	const chatText = { mail, hora, mensaje };
	// console.log(chatText);
	server.emit("mensaje-nuevo", chatText, id => {
		console.log(id);
	});

	return false;
};

server.on("mensaje-servidor", mensaje => {
	// console.log("mensaje-servidor: ", mensaje);
	render(mensaje.mensajesChat);
});
