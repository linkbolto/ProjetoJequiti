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

//Seção de criação e gerenciamento do BD

//Local: global.db = mongoose.connect('mongodb://localhost:27017/users')
//Nuvem: global.db = mongoose.connect("mongodb+srv://admin:admin@cluster0-c56tb.gcp.mongodb.net/test?retryWrites=true&w=majority")

global.db = mongoose.connect("mongodb+srv://admin:admin@cluster0-c56tb.gcp.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  });

mongoose.connection.on('connected', function () {
 console.log('=====Conexão estabelecida com sucesso=====');
});
mongoose.connection.on('error', function (err) {
 console.log('=====Ocorreu um erro: ' + err);
});

mongoose.connection.on('disconnected', function () {
 console.log('=====Conexão finalizada=====');

}); 


// -------------------------------------------------------------------------------------------------------------------------

//Criação dos Schemas do DB:

//Schema de usuário
let usuario = new Schema({
    nome: {type: String, required: true, max: 100},
    password: {type: String, required: true},
});

var Contatos = mongoose.model('usuario', usuario );  

// -------------------------------------------------------------------------------------------------------------------------

//Comando que permite "pegar" o conteúdo da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------------------------------------------------------------------------------------------------------

//Roda em uma nova conexão
io.on('connection', (socket) => {
	//Envia a mensagem 'Hello' ao client
	socket.emit('message','Boas Vindas!');

	//função para login
	//Loga o usuário no sistema
	socket.on('login', (loginData) =>{
		console.log(loginData)
		//Verifica se o login é válido no banco de dados
		Contatos.findOne({nome: loginData.userLogin, password: loginData.passwordLogin}, function(err,obj){
			if (obj){
				io.emit('message', loginData.userLogin + ' entrou na sala');	
			}
			else{
				socket.emit('message', 'Usuário ou senha inválidos');
			}
		})
	})
	
	//função para cadastro
	//verifica se o usuário já existe, e se não, coloca no banco
	socket.on('signup', (signupData) =>{
		if (signupData.passwordSignup === signupData.confirmSignup){
				Contatos.findOne({nome: signupData.userSignup}, function(err,obj) { 
				//emite mensagem se o usuário já existe
				if(obj){
					socket.emit("message", "Usuário já cadastrado");
				}
				//se o usuário não existe, realiza o cadastro
				else{
					var item = {  
					    nome: signupData.userSignup, 
					    password: signupData.passwordSignup
					  };  
					  var data = new Contatos(item);  
					  data.save();
					socket.emit("message", signupData.userSignup + " se cadastrou!");
				}
			});
		}
		else{
			socket.emit('message','Senhas não coincidem');
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