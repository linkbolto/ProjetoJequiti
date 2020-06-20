import socket from 'socket.io'

const io = socket(3500)

const players = {}

io.on('connection', player => {
  console.log('client connectado')
});

io.on('joinLobby', data => {
  console.log('joinLobby:', data)
});

export default io
