import io from "../index.js"
import { state } from "../index.js"
import { Perguntas } from '../database/index.js'

const sleep = async (time) => {
  await new Promise((r) => setTimeout(r, time))
}

const ROUNDS = 5

const setGame = () => {
  state.game = {
    question: {},
    round: 0,
    players: [
      {name: 'lucas', coins: 0},
      {name: 'jogador2', coins: 500}
    ]
  }
}

const endGame = () => {
  console.log("Ending Game...")
  io.sockets.emit("gameEnd", state.game)
}

const setQuestion = async () => {
  console.log("Setting question...")

  state.game.question = await Perguntas.findOne({
    id: Math.round(Math.random() * 100)
  }).exec()
}

const endRound = async () => {
  console.log("Endind Round...")
  state.game.players.forEach(p => p.answered = false)
}

const startRound = async () => {
  console.log("Setting question...")
  await setQuestion()
  state.game.round += 1

  console.log("Starting Round:", state.game.round)

  io.sockets.emit("roundStart", state.game)

  await sleep(5000)
}

const startGame = async () => {
  console.log("Starting Game...")
  setGame()

  await sleep(2000)

  while (state.game.round < ROUNDS) {
    await startRound()
    endRound()
  }

  endGame()
}

export default startGame