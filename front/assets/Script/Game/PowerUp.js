import { state, usePowerUp } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    Answers: [cc.Node],
    PowerUpMenu: cc.Node,
    PowerLabel1: cc.Label,  
    PowerLabel2: cc.Label,  
    PowerLabel3: cc.Label,  
  },

  start() {
    console.log("Power Up", state.player)
    this.PowerLabel1.string = state.player.powerup1
    this.PowerLabel2.string = state.player.powerup2
    this.PowerLabel3.string = state.player.powerup3
  },

  openPowerUpMenu () {
    cc.tween(this.PowerUpMenu)
    .to(0, {position: cc.v2(208, -110)})
    .to(0.25, { position: cc.v2(208, 0)})
    .start()
  },

  closePowerUpMenu() {
    cc.tween(this.PowerUpMenu)
    .to(0.25, { position: cc.v2(208,-110) })
    .to(0, {position: cc.v2(208, -1000)})
    .start()
  },

  powerUp1() {
    const correct = state.question.respostacerta - 1;
    let chosen = correct;

    while (chosen === correct) chosen = Math.floor(Math.random() * 4);

    this.eraseAnswer(chosen)
    if(state.player.powerup1) state.player.powerUp1--
  },

  eraseAnswer(number) {
    answer = this.Answers[number];
    answer.getComponent(cc.Button).interactable = false;
    cc.tween(answer).to(1, { opacity: 0 }).start();
  },

  powerUp2() {
    usePowerUp(2, () => {})

    if(state.player.powerup2) state.player.powerUp2--
  },

  powerUp3() {
    usePowerUp(3, () => {})
    if(state.player.powerup3) state.player.powerUp3--
  }
});