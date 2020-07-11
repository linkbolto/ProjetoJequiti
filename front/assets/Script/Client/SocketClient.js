import io from "socket.io-client";

let socket = null

export const state = {
  player: {},
  question: {},
  players: [],
  handleEmojiFunction: () => {}
}

export const connect = () => {
  socket = io("localhost:3500");

  socket.on("connect", () => {
   // socket.emit("addCoins", {name: "1", quantity: 1})
   // socket.emit("buyPowerUp", {name: "1", powerUp: 2, price: 10000})
    //socket.emit("joinLobby", state.player.name, joinLobbyResponse)
    //socket.emit('usePowerup', {name: 'lucas', numero: '1'})

    //socket.emit('login', {name: 'Victor', password: '1234'}, loginResponse)
  })

  socket.on("roundStart", gameState => {
    state.question = gameState.question
    state.players = gameState.players

    console.log(state.player, state.players)
    cc.director.loadScene("Game")
  })

  socket.on('gameEnd', gameState => {
    const players = gameState.players
    const player = state.player

    const myPlayer = players.find(p => p.name === player.name)
    const otherPlayer = players.find(p => p.name !== player.name)

    if (myPlayer.coins >= otherPlayer.coins) 
      cc.director.loadScene('Ganhou')
    else cc.director.loadScene('Perdeu')
  })

  
  //socket.on("receiveChatMessage", emojiName => {
  //  state.handleEmojiFunction(emojiName);
  //})

  socket.on("receiveChatMessage", emojiName => {
    state.handleEmojiFunction(emojiName);
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

export const sendChatMessage = (emojiName) => {
  socket.emit("sendChatMessage", emojiName);
}

export const signUp = (params, func) => {
  socket.emit("signup", params, func)
}

export const login = (params, func) => {
  socket.emit("login", params, func)
}

export const joinLobby = () => {
  socket.emit("joinLobby", '', joinLobbyResponse)
}

//RESPOSTAS
const joinLobbyResponse = (resp) => {
  if(resp) cc.director.loadScene("LookingForEnemy");
}

const loginResponse = resp => {
  if(resp) state.player = resp
}