import socketio from "socket.io"
import startGame from "./game/game.js"
import { Usuarios, PowerUps } from "./database/index.js"
import findPowerUp from "./database/actions.js"

const io = socketio(3500)

export const state = {
	game: {},
}

const handlePowerUp = (powerId, name) => {
	if(powerId === 2) {
		state.game.question.level *= 2
		io.sockets.emit("changeQuestionLevel", state.game.question.level)
	} 
	else if(powerId === 3) {
		const player = state.game.players.find(p => p.name === name)
		player.protection = true
	}
}

io.on("connection", (socket) => {
	console.log("client connectado")

	socket.on("login", ({ name, password }, callback) => {
		console.log(name, password)
		//Verifica se o login é válido no banco de dados
		Usuarios.findOne({ name, password }, function (err, obj) {
			if (obj) {
				socket.playerName = obj.name
				callback(true, obj)
				console.log("Login sucesso")
			} else {
				callback(false, "Usuário ou senha inválidos")
				console.log("Login erro")
			}
		})
	})

	socket.on("signup", (signupData, func) => {
		console.log(signupData)
		if (signupData.passwordSignup === signupData.confirmSignup) {
			Usuarios.findOne({ name: signupData.userSignup }, function (err, obj) {
				//emite mensagem se o usuário já existe
				if (obj) {
					func(false, "name de usuário já cadastrado")
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
		} else {
			func(false, "passwords não coincidem")
		}
	})

	// função para consumir um power up de acordo com o name do usuário e o número do power up
	socket.on("usePowerUp", async (id , resp) => {
		console.log(id)
		const name = socket.playerName
		const user = await Usuarios.findOne({ name }).exec()

		if(!user) return resp(false)

		const powerup = user[`powerup${id}`]

		if(!powerup) return resp(false)

		await Usuarios.updateOne({name}, {[`powerup${id}`]: powerup - 1}, () => {})

		resp(true)

		handlePowerUp(id, user.name)
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
		resp(true)

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

	const protection = player.protection
	player.protection = false

	console.log(state.game.question.level)

	if (isCorrect) return player.coins += state.game.question.level * 100
	if (protection) return

	player.coins -= state.game.question.level * 50
	})
})

export default io
