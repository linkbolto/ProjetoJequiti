import socketio from "socket.io"
import startGame from "./game/game.js"

const io = socketio(3500)

export const state = {
  game: {},
}

io.on("connection", (socket) => {
  console.log("client connectado")

  socket.on("login", (name) => {
    socket.playerName = name
  })


  socket.on("joinLobby", (user, resp) => {
    resp(true)

    startGame()

    socket.on("chooseResponse", (answer, resp) => {
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
    /*
      if(Lobby.isFull()) {
        io.sockets.emit("message", 'comecou!!!')
      }
    }
*/
  })
})

export default io
