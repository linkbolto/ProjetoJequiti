import io from "socket.io-client";

let socket = null

export const state = {
  player: {name: 'lucas'},
  question: {},
  players: []
}

export const connect = () => {
  socket = io("localhost:3500");

  socket.on("connect", () => {
    socket.emit("joinLobby", state.player.name, joinLobbyResponse)
    socket.emit('login', state.player.name)
  })

  socket.on("roundStart", gameState => {
    state.question = gameState.question
    state.players = gameState.players
    cc.director.loadScene("Game")
  })
}

//EVENTOS
export const chooseResponse = (param, func) => {
  socket.emit("chooseResponse", param, correctAnswer => {
    if(param === correctAnswer) console.log("RESPOSTA CERTA")
    else console.log("RESPOSTA ERRADA")

    func(param, correctAnswer)
  })
}

//RESPOSTAS
const joinLobbyResponse = (resp) => {
  if(resp) cc.director.loadScene("LookingForEnemy");
}