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
			else {
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
							totalCoins: 1000,
							powerup1: 10,
							powerup2: 10,
							powerup3: 10,
							removeAds: false,
						}
						var data = new Usuarios(item)
						data.save()
						func(true, data)
					}
				})
			}
		} else {
			func(false, "Senhas não coincidem")
		}
	})

	// função para consumir um power up de acordo com o name do usuário e o número do power up
	socket.on("usePowerUp", async (id) => {
		const name = socket.playerName

		const player = state.game.players.find(p => p.name === name)
		if (player.answered) return

		const user = await Usuarios.findOne({ name }).exec()
		if (!user) return

		const powerup = user[`powerup${id}`]

		if (!powerup) return resp(false)

		await Usuarios.updateOne({ name }, { [`powerup${id}`]: powerup - 1 }, () => { })

		handlePowerUp(id, user.name)
	})

	socket.on("sendChatMessage", (emojiName) => {
		socket.broadcast.emit('receiveChatMessage', emojiName);
	})

	socket.on("buyPowerUp", async ({ username, powerUpId }, callback) => {
		console.log('back recebeu id ', powerUpId)
		const user = await Usuarios.findOne({ name: username }).exec();

		if (!user) {
			callback({success:false, message:"Username inválido"});
			return;
		}
		
		const powerUp = await findPowerUp(powerUpId);
		console.log(powerUp)
		if (!powerUp) {
			callback({success:false, message:"PowerUp inválido"});
			return;
		}

		if (powerUp.valor > user.totalCoins) {
			callback({success: false, message: "Moedas insuficientes"});
			return;
		}

		const powerUpCount = user[`powerup${powerUpId}`]

		await Usuarios.updateOne(
			{ name: username },
			{
				totalCoins: user.totalCoins - powerUp.valor,
				[`powerup${powerUpId}`]: powerUpCount + 1,
			}
		)
		console.log('comprou powerup')
		callback({success:true, message:"Sucesso"})
	})

	socket.on("joinLobby", (user, resp) => {
		if (!state.game || Object.keys(state.game).length === 0)
			setGame()

		if (state.game.players.length >= 2)
			return resp(false)
		else if (!state.game.players.find(p => p.name === user.name))
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

		const protection = player.protection
		player.protection = false

		resp(correctAnswer)

		if (isCorrect) return player.coins += state.game.question.level * 100

		if (protection) return

		player.coins -= state.game.question.level * 50
	})

	socket.on("loadShopData", async (username, callback) => {
		const user = await Usuarios.findOne({ name: username }).exec();
		const powerUps = await PowerUps.find().exec();

		let data = {
			user: {
				totalCoins: user.totalCoins,
				countPowerUp1: user.powerup1,
				countPowerUp2: user.powerup2,
				countPowerUp3: user.powerup3
			},
			pricePowerUp1: undefined,
			pricePowerUp2: undefined,
			pricePowerUp3: undefined
		}
		
		powerUps.forEach(powerUp => {
			data[`pricePowerUp${powerUp.id}`] = powerUp.valor;
		})
		console.log(data);
		callback(data);
	})

	socket.on("removeAds", async (name) => {
		Usuarios.findOne({ name }, function (err, obj) {
			if (obj) {
				Usuarios.updateOne(
					{ name },
					{ removeAds: true },
					() => { }
				)
			} else {
				console.error("Usuário " + name + " não encontrado")
			}
		})
	})
})

export const addCoins = (name, quantity) => {
	console.log("adding coins")
	if (quantity && quantity > 0) {
		Usuarios.findOne({ name }, function (err, obj) {
			if (obj) {
				Usuarios.updateOne(
					{ name },
					{ totalCoins: obj.totalCoins + quantity },
					() => { }
				)
			} else {
				console.error("Usuário " + name + " não encontrado")
			}
		})
	} else {
		console.error("A quantidade de moedas é inválida")
	}
}

const handlePowerUp = (powerId, name) => {
	if (powerId === 3) {
		state.game.question.level *= 2
		io.sockets.emit("changeQuestionCoins", state.game.question.level)
	}
	else if (powerId === 1) {
		const player = state.game.players.find(p => p.name === name)
		player.protection = true
	}
}

export default io
