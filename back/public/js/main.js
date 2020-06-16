//Diz ao client pra usar a porta "localhost:3000"
const socket = io('http://localhost:3000');
const passwordForm = document.getElementById('password_form');

//Eventos que acontecem ao se conectar, de acordo com o código do server
socket.on('connect',(data)=>{
	//exibe no console do browser a mensagem que foi recebida pelo servidor
	socket.on('message',(msg)=> {
		console.log(msg)	
	})
	
})

//exibe no browser a mensagem de sucesso
//socket.on('success', (data)=>{
//	console.log(data)
//})

//Envia ao server a mensagem 'World'
//socket.emit('message','World')

//Função de teste básico para confirmação de password. Alterar no futuro para checagem mais segura
//Adiciona um "listener" pra checar se o evento "submit" ocorreu
passwordForm.addEventListener('submit', (event) => {
	//Previne a execução do 'submit' padrão
	event.preventDefault();

	//Pega o valor do campo username no formulário, usando sua id "username"
	const username = event.target.elements.username.value;
	//Pega o valor do campo password no formulário, usando sua id "password"
	const password = event.target.elements.password.value;
	//Pega o valor do campo password2 no formulário, usando sua id "password2"
	const confirmPassword = event.target.elements.password2.value;

	//Cria um objeto contendo os dados do formulário
	loginData = {
		username,
		password,
		confirmPassword
	}

	//Envia o objeto com os dados para o servidor
	socket.emit('login', loginData)
	


})

