import io from "../index.js"
import { state } from "../index.js"
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

  await sleep(5000)
}

export const startGame = async () => {
  console.log("Starting Game...")

  await sleep(2000)

  while (state.game.round < ROUNDS) {
    await startRound()
    endRound()
  }

  endGame()
}