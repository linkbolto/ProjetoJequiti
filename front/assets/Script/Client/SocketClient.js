import io from "socket.io-client";

let socket = null

export const state = {
  player: {},
  question: {},
  players: []
}

export const connect = () => {
  socket = io("localhost:3500");

  socket.on("connect", () => {
    //socket.emit("joinLobby", state.player.nome, joinLobbyResponse)
    socket.emit('usepowerup', {nome: 'lucas', numero: '1'})

    //socket.emit('login', {nome: 'Victor', senha: '1234'}, loginResponse)
  })

  socket.on("roundStart", gameState => {
    state.question = gameState.question
    state.players = gameState.players
    cc.director.loadScene("Game")
  })

  socket.on('gameEnd', gameState => {
    const players = gameState.players
    const player = state.player

    const myPlayer = players.find(p => p.nome === player.nome)
    const otherPlayer = players.find(p => p.nome !== player.nome)

    if (myPlayer.coins >= otherPlayer.coins) 
      cc.director.loadScene('Ganhou')
    else cc.director.loadScene('Perdeu')
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

export const signUp = params => {
  socket.emit("signup", params)
}

//RESPOSTAS
const joinLobbyResponse = (resp) => {
  if(resp) cc.director.loadScene("LookingForEnemy");
}

const loginResponse = resp => {
  if(resp) state.player = resp
}