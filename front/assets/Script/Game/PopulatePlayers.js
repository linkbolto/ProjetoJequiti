import { state } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    nameP1: cc.Label,
    pontosP1: cc.Label,
    nameP2: cc.Label,
    pontosP2: cc.Label
  },

  // LIFE-CYCLE CALLBACKS:


  start() {
    const players = state.players
    const player = state.player

    const player1 = players.find(p => p.name === player.name)
    const player2 = players.find(p => p.name !== player.name)

    this.nameP1.string = player1.name
    this.nameP2.string = player2.name
    this.pontosP1.string = player1.coins
    this.pontosP2.string = player2.coins
  },
});
