import io from "socket.io-client";

let socket = null

export const state = {
  question: {}
}

export const connect = () => {
  socket = io("localhost:3500");

  socket.on("connect", () => {
    socket.emit("joinLobby", {name: 'lucas'}, joinLobbyResponse)
  })

  socket.on("roundStart", respQuestion => {
    state.question = respQuestion
    cc.director.loadScene("Game")
  })
}

//EVENTOS
export const chooseResponse = param => {
  socket.emit("chooseResponse", param, correctAnswer => {
    if(param === correctAnswer) console.log("RESPOSTA CERTA")
    else console.log("RESPOSTA ERRADA")
  })
}

//RESPOSTAS
const joinLobbyResponse = (resp) => {
  if(resp) cc.director.loadScene("LookingForEnemy");
}

/*
      socket.on("bla", param => {
          console.log(param)
      })
*/