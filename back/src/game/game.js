import io from "../index.js"
import { state, addCoins } from "../index.js"
import { Perguntas, Usuarios } from '../database/index.js'

const sleep = async (time) => {
  await new Promise((r) => setTimeout(r, time))
}

const ROUNDS = 5

export const setGame = () => {
  state.game = {
    question: {},
    round: 0,
    players: []
  }
}

const endGame = () => {
  console.log("Ending Game...")

  state.game.players.forEach(p => console.log('player: ', p.name, ' - coins earned: ', p.coins))

  const player1 = state.game.players[0]
  const player2 = state.game.players[1]

  if (player1.coins >= player2.coins)
    addCoins(player1.name, player1.coins)

  if (player2.coins >= player1.coins)
    addCoins(player2.name, player2.coins)

  io.sockets.emit("gameEnd", state.game)

  setGame()
}

const setQuestion = async () => {
  console.log("Setting question...")

  const randomQuestions = await Perguntas.aggregate([
    { $match: { level: state.game.round } },
    { $sample: { size: 1 } }
  ]).exec()

  state.game.question = randomQuestions[0]
}

const endRound = async () => {
  console.log("Endind Round...")
  state.game.players.forEach(p => p.answered = false)
}

const startRound = async () => {
  console.log("Setting question...")

  state.game.round += 1
  await setQuestion()

  console.log("Starting Round:", state.game.round)

  await updatePlayers()

  io.sockets.emit("roundStart", state.game)

  await sleep(20000)
}

export const startGame = async () => {
  console.log("Starting Game...")

  state.game.players.forEach(player => player.coins = 0)

  await sleep(2000)

  while (state.game.round < ROUNDS) {
    await startRound()
    endRound()
  }

  endGame()
}

const updatePlayers = async () => {
  console.log("PlayerState:", state.game.players)
  const name0 = state.game.players[0].name
  const coins0 = state.game.players[0].coins

  console.log(state.game.players)

  state.game.players[0] = await Usuarios.findOne({ name: name0 }).exec()
  state.game.players[0].coins = coins0

  const name1 = state.game.players[1].name
  const coins1 = state.game.players[1].coins

  state.game.players[1] = await Usuarios.findOne({ name: name1 }).exec()
  state.game.players[1].coins = coins1
}