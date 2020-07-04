import io from "../index.js"
import { state } from "../index.js"
import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://admin:admin@cluster0-c56tb.gcp.mongodb.net/Jequiti", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
  });

const Perguntas = mongoose.model('Pergunta', {
  id: Number,
  pergunta: String,
  resposta1: String,
  resposta2: String,
  resposta3: String,
  resposta4: String,
  respostacerta: Number,
  level: Number
}, 'Perguntas')

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
      {name: 'jogador2', coins: 1000}
    ]
  }
}

const endGame = () => {
  console.log("Ending Game...")
}

const setQuestion = async () => {
  console.log("Setting question...")

  state.game.question = await Perguntas.findOne({
    id: Math.round(Math.random() * 100)
  }).exec()
}

const endRound = async () => {
  console.log("Endind Round...")
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