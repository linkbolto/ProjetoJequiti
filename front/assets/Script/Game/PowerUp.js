import { state, usePowerUp } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    Answers: [cc.Node],
    PowerUpMenu: cc.Node,
  },

  start() {
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
  },

  eraseAnswer(number) {
    answer = this.Answers[number];
    answer.getComponent(cc.Button).interactable = false;
    cc.tween(answer).to(1, { opacity: 0 }).start();
  },

  powerUp2() {
    usePowerUp(2, () => {})
  },

  powerUp3() {
    usePowerUp(3, () => {})
  }
});