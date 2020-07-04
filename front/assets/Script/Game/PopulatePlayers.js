import { state } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    nomeP1: cc.Label,
    pontosP1: cc.Label,
    nomeP2: cc.Label,
    pontosP2: cc.Label
  },

  // LIFE-CYCLE CALLBACKS:


  start() {
    const players = state.players
    const player = state.player

    const player1 = players.find(p => p.nome === player.nome)
    const player2 = players.find(p => p.nome !== player.nome)

    this.nomeP1.string = player1.nome
    this.nomeP2.string = player2.nome
    this.pontosP1.string = player1.coins
    this.pontosP2.string = player2.coins
  },
});
