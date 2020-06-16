//Seção de requerimento das bibliotecas
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

//inicialização das variáveis
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Comando que permite "pegar" o conteúdo da pasta public
app.use(express.static(path.join(__dirname, 'public')));

//Roda em uma nova conexão
io.on('connection', (socket) => {
	//Envia a mensagem 'Hello' ao client
	socket.emit('message','Boas Vindas!');

	//Mostra no console a mensagem vinda do client
	//socket.on('message', (msg)=>{
	//	console.log(msg)
	//})

	//Emite "sucesso" no console do broswer caso os outros eventos também ocorram
	//socket.emit('success', 'Event was successful');

	socket.on('login', (loginData) =>{
		//verificação básica para conferir se as senhas são iguais
		if (loginData.password === loginData.confirmPassword){
			//manda a mensagem para todos os clients conectados, se a pessoa logar
			io.emit('message', loginData.username + ' entrou na sala');
		}
		else {
			//manda somente ao client atual que a senha é inválida
			socket.emit('message', 'Senhas não coincidem');
		}
	})

});

//definição da porta externa, caso não exista, usar o padrão "localhost:3000"
const PORT = process.env.PORT || 3000;


//Inicia o server e exibe uma mensagem no console
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})