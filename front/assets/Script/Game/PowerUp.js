import { state, usePowerUp } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    Answers: [cc.Node],
    PowerUpMenu: cc.Node,
    PowerLabel1: cc.Label,  
    PowerLabel2: cc.Label,  
    PowerLabel3: cc.Label,
    SidePower1: cc.Node,
    SidePower2: cc.Node,
    SidePower3: cc.Node,
    PowerUpButton: cc.Node,
  },

  start() {
    this.PowerLabel1.string = state.player.powerup1
    this.PowerLabel2.string = state.player.powerup2
    this.PowerLabel3.string = state.player.powerup3
    this.SidePower1.active = false
    this.SidePower2.active = false
    this.SidePower3.active = false
  },

  openPowerUpMenu () {
    if (state.player.answered) return

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

  disableButton () {
    this.PowerUpButton.active = false
  },

  powerUp2() {
    if (!state.player.powerup2) return

    this.SidePower2.active = true
    this.disableButton()
    this.closePowerUpMenu()

    usePowerUp(2, () => {})
    const correct = state.question.respostacerta - 1;

    let chosen = correct;
    while (chosen === correct) chosen = Math.floor(Math.random() * 4);
    this.eraseAnswer(chosen)

    let chosen2 = correct
    while (chosen2 === correct || chosen2 === chosen ) chosen2 = Math.floor(Math.random() * 4);
    this.eraseAnswer(chosen2)
  },

  eraseAnswer(number) {
    answer = this.Answers[number];
    answer.getComponent(cc.Button).interactable = false;
    cc.tween(answer).to(1, { opacity: 0 }).start();
  },

  powerUp3() {
    if (!state.player.powerup3) return

    this.SidePower3.active = true
    this.disableButton()
    this.closePowerUpMenu()

    usePowerUp(3, () => {})
  },

  powerUp1() {
    if (!state.player.powerup1) return

    this.SidePower1.active = true
    this.disableButton()
    this.closePowerUpMenu()

    usePowerUp(1, () => {})
  }
});