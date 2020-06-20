//Seção de requerimento das bibliotecas
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

// -------------------------------------------------------------------------------------------------------------------------

//inicialização das variáveis
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const Schema = mongoose.Schema;

// -------------------------------------------------------------------------------------------------------------------------

//Seção de criaçãeo do e gerenciamento do BD
// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient("mongodb+srv://admin:admin@cluster0-c56tb.gcp.mongodb.net/test?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: true,
//   useCreateIndex: true
// });

// client.connect(err => {
// 	const collection = client.db("test").collection("devices");
// 	client.close();
// });

//usar global.db = mongoose.connect('mongodb://localhost:27017/users') para banco local
//usar global.db = mongoose.connect("mongodb+srv://admin:admin@cluster0-c56tb.gcp.mongodb.net/test?retryWrites=true&w=majority") para banco da nuvem

global.db = mongoose.connect("mongodb+srv://admin:admin@cluster0-c56tb.gcp.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  });

// global.db = mongoose.connect('mongodb://localhost:27017/users');

mongoose.connection.on('connected', function () {
 console.log('=====Conexão estabelecida com sucesso=====');
});
mongoose.connection.on('error', function (err) {
 console.log('=====Ocorreu um erro: ' + err);
});

mongoose.connection.on('disconnected', function () {
 console.log('=====Conexão finalizada=====');

}); 

let usuario = new Schema({
    nome: {type: String, required: true, max: 100},
    marca: {type: Number, required: true},
});

//recebe objetos
var Contatos = mongoose.model('usuario', usuario );  

//teste de inserção
var item = {  
    nome: 'Maria', 
    marca: '1' 
  };  
  var data = new Contatos(item);  
  data.save();
  console.log('ok')



// -------------------------------------------------------------------------------------------------------------------------

//Criação dos Schemas do DB:
// 
// 
// 

// -------------------------------------------------------------------------------------------------------------------------

//Comando que permite "pegar" o conteúdo da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------------------------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------------------------------------------

//definição da porta externa, caso não exista, usar o padrão "localhost:3000"
const PORT = process.env.PORT || 3000;

// -------------------------------------------------------------------------------------------------------------------------

//Inicia o server e exibe uma mensagem no console
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

// -------------------------------------------------------------------------------------------------------------------------