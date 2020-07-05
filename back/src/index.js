import socketio from "socket.io"
import startGame from "./game/game.js"
import { Usuarios } from './database/index.js'

const io = socketio(3500)

export const state = {
  game: {},
}

io.on("connection", (socket) => {
  console.log("client connectado")

	socket.on('login', ({name, password}, callback) =>{
    console.log(name, password)
		//Verifica se o login é válido no banco de dados
		Usuarios.findOne({name, password}, function(err,obj){
			if (obj){
        socket.playerName = obj.name
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
				Usuarios.findOne({name: signupData.userSignup}, function(err,obj) { 
				//emite mensagem se o usuário já existe
				if(obj){
					func(false, "name de usuário já cadastrado");
				}
				//se o usuário não existe, realiza o cadastro
				else{
					var item = {  
					    name: signupData.userSignup, 
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
			func(false,'passwords não coincidem');
		}
  })


// função para consumir um power up de acordo com o name do usuário e o número do power up
socket.on('usePowerup', ({name, numero}) => {
  console.log('Received powerup event')
  Usuarios.findOne({name}, function(err,obj) {
    console.log(obj) 
      if (obj && obj[`powerup${numero}`]) {
          const count = obj[`powerup${numero}`];
          console.log(count)
          Usuarios.updateOne({name}, { [`powerup${numero}`] : count - 1 }, () => {})
      } else {
          console.log('Usuário ' + name + ' não encontrado')
      }
  });
});

	socket.on('addCoins', ({ name, quantity }) => {
		console.log('adding coins');
		if (quantity && quantity > 0) {
			Usuarios.findOne({ name }, function (err, obj) {
				if (obj) {
					Usuarios.updateOne({ name }, { coins: obj.coins + quantity }, () => { })
				} else {
					console.error('Usuário ' + name + ' não encontrado')
				}
			});
		} else {
			console.error('A quantidade de moedas é inválida')
		}
	})

	socket.on('buyPowerUp', ({ name, powerUp, price }) => {
		if (price && price > 0) {
			Usuarios.findOne({ name }, function (err, obj) {
				if (obj) {
					const coins = obj.coins;
					if (price > coins) {
						console.log('message', 'Usuário não possui moedas suficientes')
					} else {
						const powerUpCount = obj[`powerup${powerUp}`];
						if (powerUpCount) {
							Usuarios.updateOne({ name }, {
                 coins: coins - price, [`powerup${powerUp}`]: powerUpCount + 1 
                }, () => { })
						} else {
							console.error('Número de power up ' + powerUp + " inválido")
						}
					}
				} else {
					console.error('Usuário ' + name + ' não encontrado')
				}
			});
		} else {
			console.error('Preço do power up inválido')
		}
	})


  socket.on("joinLobby", (user, resp) => {
    resp(true)

    startGame()

    socket.on("chooseResponse", async (answer, resp) => {
      const player = state.game.players.find(
        (p) => p.name === socket.playerName
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
