import socketio from "socket.io"
import startGame from "./game/game.js"
import { Usuarios } from './database/index.js'

const io = socketio(3500)

export const state = {
  game: {},
}

io.on("connection", (socket) => {
  console.log("client connectado")

	socket.on('login', ({nome, senha}, callback) =>{
    console.log(nome, senha)
		//Verifica se o login é válido no banco de dados
		Usuarios.findOne({nome, senha}, function(err,obj){
			if (obj){
        socket.playerName = obj.nome
        callback(true, obj)
        console.log('Login sucesso')
			}
			else{
        callback(false, 'Usuário ou senha inválidos');
        console.log('Login erro')
			}
		})
  })
  
	socket.on('signup', (signupData, func) =>{
    console.log(signupData)
		if (signupData.passwordSignup === signupData.confirmSignup){
				Usuarios.findOne({nome: signupData.userSignup}, function(err,obj) { 
				//emite mensagem se o usuário já existe
				if(obj){
					func(false, "Nome de usuário já cadastrado");
				}
				//se o usuário não existe, realiza o cadastro
				else{
					var item = {  
					    nome: signupData.userSignup, 
              password: signupData.passwordSignup,
              coins: 1000,
              powerup1: 10,
              powerup2: 10,
              powerup3: 10,
              compra: false,
					  };  
					  var data = new Usuarios(item);  
					  data.save();
					func(true, data);
				}
			});
		}
		else{
			func(false,'Senhas não coincidem');
		}
  })


// função para consumir um power up de acordo com o nome do usuário e o número do power up
socket.on('usepowerup', ({nome, numero}) => {
  console.log('Received powerup event')
  Usuarios.findOne({nome}, function(err,obj) {
    console.log(obj) 
      if (obj && obj[`powerup${numero}`]) {
          const count = obj[`powerup${numero}`];
          console.log(count)
          Usuarios.updateOne({nome}, { [`powerup${numero}`] : count - 1 }, () => {})
      } else {
          console.log('Usuário ' + nome + ' não encontrado')
      }
  });
});


  socket.on("joinLobby", (user, resp) => {
    resp(true)

    startGame()

    socket.on("chooseResponse", async (answer, resp) => {
      const player = state.game.players.find(
        (p) => p.nome === socket.playerName
      )

      if (player.answered) return

      player.answered = true

      const correctAnswer = state.game.question.respostacerta
      const isCorrect = correctAnswer === answer

      resp(correctAnswer)

      if (isCorrect) {
        player.coins += 500
      } else {
        player.coins -= 2000
      }
    })
  })
})

export default io
