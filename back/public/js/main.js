//Diz ao client pra usar a porta "localhost:3000"
const socket = io('http://localhost:3000');
const loginForm = document.getElementById('login');
const signupForm = document.getElementById('signup');

//Eventos que acontecem ao se conectar, de acordo com o código do server
socket.on('connect',(data)=>{
	//exibe no console do browser a mensagem que foi recebida pelo servidor
	socket.on('message',(msg)=> {
		console.log(msg)	
	})
	
})

loginFunction();
signupFunction();

//Função de teste básico para confirmação de password. Alterar no futuro para checagem mais segura
//Adiciona um "listener" pra checar se o evento "submit" ocorreu
function loginFunction(){
loginForm.addEventListener('submit', (event) => {
	//Previne a execução do 'submit' padrão
	event.preventDefault();
	//Pega o valor do campo userLogin no formulário
	const userLogin = event.target.elements.userLogin.value;
	//Pega o valor do campo passwordLogin
	const passwordLogin = event.target.elements.passwordLogin.value;

	//Cria um objeto contendo os dados do formulário
	loginData = {
		userLogin,
		passwordLogin,
	}

	//Envia o objeto com os dados para o servidor
	socket.emit('login', loginData);	
})
}

//Função de teste básico para cadastro de usuário
//Adiciona um "listener" pra checar se o evento "submit" ocorreu
function signupFunction(){
	signupForm.addEventListener('submit', (event) => {
		//Previne a execução do 'submit' padrão
		event.preventDefault();
		//Pega o valor do campo userSignup no formulário
		const userSignup = event.target.elements.userSignup.value;
		//Pega o valor do campo passwordSignup
		const passwordSignup = event.target.elements.passwordSignup.value;
		//Pega o valor do campo confirmSignup
		const confirmSignup = event.target.elements.confirmSignup.value;

		//Cria um objeto contendo os dados do formulário
		signupData = {
			userSignup,
			passwordSignup,
			confirmSignup
		}

		//Envia o objeto com os dados para o servidor
		socket.emit('signup', signupData);
	})	
}
