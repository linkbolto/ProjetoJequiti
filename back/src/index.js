import socketio from "socket.io"
import Lobby from "./game/lobby.js"
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

  //  socket.emit("bla", "testando eventos")

  socket.on("joinLobby", (user, resp) => {
    //if (Lobby.join(user)) {
    resp(true)

    startGame()

    socket.on("chooseResponse", (answer, resp) => {
      const correctAnswer = state.game.question.respostacerta
      const isCorrect = correctAnswer === answer

      resp(correctAnswer)

      const player = state.game.players.find(
        (p) => p.name === socket.playerName
      )

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
