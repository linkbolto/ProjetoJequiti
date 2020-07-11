import io from "../index.js"
import { state, addCoins } from "../index.js"
import { Perguntas } from '../database/index.js'

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
  io.sockets.emit("gameEnd", state.game)

  state.game.players.forEach(p => console.log('player: ', p.name, ' - coins earned: ', p.coins))

  const winner = state.game.players.reduce((previous, current) => {
    return previous.coins > current.coins ? previous : current
  })

  addCoins(winner.name, winner.coins)

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

  io.sockets.emit("roundStart", state.game)

  await sleep(10000)
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