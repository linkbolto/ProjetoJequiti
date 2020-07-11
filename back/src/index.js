import socketio from "socket.io"
import { startGame, setGame } from "./game/game.js"
import { Usuarios, PowerUps } from "./database/index.js"
import findPowerUp from "./database/actions.js"

const io = socketio(3500)

export const state = {
	game: {},
}

io.on("connection", (socket) => {
	console.log("client connectado")

	socket.on("login", ({ name, password }, callback) => {
		console.log(name, password)
		//Verifica se o login é válido no banco de dados
		Usuarios.findOne({ name, password }, function (err, obj) {
			if (obj) {
				socket.playerName = obj.name
				if (socket.playerName === "")
					callback(false, "Forneça um nome de usuário")
				else {
					callback(true, obj)
					console.log("Login sucesso")
				}
			} else {
				callback(false, "Usuário ou senha inválidos")
				console.log("Login erro")
			}
		})
	})

	socket.on("signup", (signupData, func) => {
		console.log(signupData)
		if (signupData.passwordSignup === signupData.confirmSignup) {
			//Não deixa se cadastrar com o campo de senha vazio
			if (signupData.passwordSignup === "")
				func(false, "Forneça uma senha válida")
			else{
				Usuarios.findOne({ name: signupData.userSignup }, function (err, obj) {
					//emite mensagem se o usuário já existe
					if (obj) {
						if (obj.name === "")
							func(false, "Forneça um nome de usuário")	
						else
							func(false, "Nome de usuário já cadastrado")
					}
					//se o usuário não existe, realiza o cadastro
					else {
						var item = {
							name: signupData.userSignup,
							password: signupData.passwordSignup,
							coins: 1000,
							powerup1: 10,
							powerup2: 10,
							powerup3: 10,
							compra: false,
						}
						var data = new Usuarios(item)
						data.save()
						func(true, data)
					}
				})
			}
		} else {
			func(false, "passwords não coincidem")
		}
	})

	// função para consumir um power up de acordo com o name do usuário e o número do power up
	socket.on("usePowerup", ({ name, numero }) => {
		console.log("Received powerup event")
		Usuarios.findOne({ name }, function (err, obj) {
			console.log(obj)
			if (obj && obj[`powerup${numero}`]) {
				const count = obj[`powerup${numero}`]
				console.log(count)
				Usuarios.updateOne(
					{ name },
					{ [`powerup${numero}`]: count - 1 },
					() => { }
				)
			} else {
				console.log("Usuário " + name + " não encontrado")
			}
		})
	})

	socket.on("addCoins", ({ name, quantity }) => {
		console.log("adding coins")
		if (quantity && quantity > 0) {
			Usuarios.findOne({ name }, function (err, obj) {
				if (obj) {
					Usuarios.updateOne(
						{ name },
						{ coins: obj.coins + quantity },
						() => { }
					)
				} else {
					console.error("Usuário " + name + " não encontrado")
				}
			})
		} else {
			console.error("A quantidade de moedas é inválida")
		}
	})

	socket.on("sendChatMessage", (emojiName) => {
		socket.broadcast.emit('receiveChatMessage', emojiName);
	})

	socket.on("buyPowerUp", async ({ username, powerUpNumber }) => {
		const user = await Usuarios.findOne({ name: username }).exec();

		if (!user) {
			console.error(`Usuário ${username} não encontrado`);
			return;
		}

		const powerUp = await findPowerUp(powerUpNumber);

		if (!powerUp) {
			console.error(`Número de Power Up ${powerUpNumber} inválido`);
			return;
		}

		if (powerUp.valor > user.coins) {
			console.log("message", "Usuário não possui moedas suficientes");
			return;
		}

		const powerUpCount = user[`powerup${powerUpNumber}`]
		console.log(user)
		await Usuarios.updateOne(
			{ name: username },
			{
				coins: user.coins - powerUp.valor,
				[`powerup${powerUpNumber}`]: powerUpCount + 1,
			}
		)

	})

	socket.on("joinLobby", (user, resp) => {
		if (!state.game || Object.keys(state.game).length === 0)
			setGame()

		if (state.game.players.length >= 2)
			return resp(false)
		else
			state.game.players.push(user)

		resp(true)

		if (state.game.players.length > 1)
			startGame()
	})

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


export default io
