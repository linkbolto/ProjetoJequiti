import { state, usePowerUp } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    Answers: [cc.Node],
  },

  start() {
    window.pu1 = this.powerUp1.bind(this)
    window.pu2 = this.powerUp2.bind(this)
    window.pu3 = this.powerUp3.bind(this)
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
