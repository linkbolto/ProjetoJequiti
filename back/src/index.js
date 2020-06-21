import socketio from 'socket.io'
import Match from './game/match.js'
import Lobby from './game/lobby.js'

const io = socketio(3500)

const players = {}

new Match().generateRounds()

io.on('connection', socket => {
  console.log('client connectado')
  socket.emit("bla", "testando eventos")

  socket.on('joinLobby', (user, resp) => {
    if (Lobby.join(user)) {
      resp(true)

      if(Lobby.isFull()) {
        io.sockets.emit("message", 'comecou!!!')
      }
    }
  })
});

export default io
