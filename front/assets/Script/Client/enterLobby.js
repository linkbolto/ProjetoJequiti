import io from 'socket.io-client'

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  // update (dt) {},

  enterLobby() {
    const socket = io("192.168.0.11:3500")

    socket.on('connect', param => { 
      console.log("CONECTADO")

      console.log("param", param)
    
      socket.emit("joinLobby", {name: `player-${Math.round(Math.random()*100)}`}, () => {})
      
    })

    socket.on('message', (m) => {console.log(m)})

    socket.on('bla', m => console.log(m))

    setTimeout(() => {
      console.log("emitindo lobby...")
    }, 500)
  },
});
