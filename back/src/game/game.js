import io from "../index.js"
import { state } from "../index.js"
import { question1, question2 } from "../mocks/question.js"
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

let GameState = {}

const setGame = () => {
  GameState = {
    round: 0,
  }
}

const endGame = () => {
  console.log("Ending Game...")
}

const setQuestion = async () => {
  console.log("Setting question...")

  state.currentQuestion = await Perguntas.findOne({
    id: Math.round(Math.random() * 100)
  }).exec()
}

const endRound = async () => {
  console.log("Endind Round...")
}

const startRound = async () => {
  console.log("Setting question...")
  await setQuestion()
  GameState.round += 1

  console.log("Starting Round:", GameState.round)

  io.sockets.emit("roundStart", state.currentQuestion)

  await sleep(5000)
}

const startGame = async () => {
  console.log("Starting Game...")
  setGame()

  await sleep(2000)

  while (GameState.round < ROUNDS) {
    await startRound()
    endRound()
  }

  endGame()
}

export default startGame