import socketio from 'socket.io'
import Lobby from './game/lobby.js'
import {question1, question2} from './mocks/question.js'
import startGame from './game/game.js'

const io = socketio(3500)

export const state = {
  currentQuestion: {}
}

io.on('connection', socket => {
  console.log('client connectado')

//  socket.emit("bla", "testando eventos")

  socket.on('joinLobby', (user, resp) => {
    //if (Lobby.join(user)) {
    resp(true)

    startGame()

    return

    setTimeout(() => {
      state.currentQuestion = question1
      socket.emit('roundStart', question1)
    }, 2000)

    setTimeout(() => {
      state.currentQuestion = question2
      socket.emit('roundStart', question2)
    }, 10000)

    socket.on("chooseResponse", (param, resp) => {
      resp(state.currentQuestion.respostacerta)
    })
/*
      if(Lobby.isFull()) {
        io.sockets.emit("message", 'comecou!!!')
      }
    }
*/
  })

});

export default io
