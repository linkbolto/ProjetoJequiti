import { state, chooseResponse } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    Question: cc.Label,
    Answer1: cc.Label,
    Answer2: cc.Label,
    Answer3: cc.Label,
    Answer4: cc.Label,
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {
    this.clickHandler()
    const question = state.question

    this.Question.string = question.pergunta
    this.Answer1.string = question.resposta1,
    this.Answer2.string = question.resposta2,
    this.Answer3.string = question.resposta3,
    this.Answer4.string = question.resposta4
  },

  clickHandler() {
    this.Answer1.node.on(cc.Node.EventType.TOUCH_START, () => {
      chooseResponse(1)
    }, this);

    this.Answer2.node.on(cc.Node.EventType.TOUCH_START, () => {
      chooseResponse(2)
    }, this)

    this.Answer3.node.on(cc.Node.EventType.TOUCH_START, () => {
      chooseResponse(3)
    }, this)

    this.Answer4.node.on(cc.Node.EventType.TOUCH_START, () => {
      chooseResponse(4)
    }, this)
  }

  // update (dt) {},
});
