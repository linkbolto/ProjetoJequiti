import { state, sendPowerUp } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    Answers: [cc.Node],
  },

  start() {
  },

  powerUp1() {
    const correct = state.question.respostaCerta;
    let chosen = -1;

    while (chosen === correct) chosen = Math.floor(Math.random * 4);

    this.eraseAnswer(chosen)
  },

  eraseAnswer(number) {
    answer = this.Answers[number];
    answer.getComponent(cc.Button).interactable = false;
    cc.tween(answer).to(1, { opacity: 0 }).start();
  },

  powerUp2() {
    sendPowerUp(2)
  }
});
