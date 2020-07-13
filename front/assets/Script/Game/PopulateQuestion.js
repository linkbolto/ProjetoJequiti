import { state, chooseResponse } from "../Client/SocketClient";
import { formatWithDots } from "../common/helpers";

cc.Class({
  extends: cc.Component,

  properties: {
    Question: cc.Label,
    QuestionCoins: cc.Label,
    Answers: [cc.Node],
    correctSprite: cc.SpriteFrame,
    chooseSprite: cc.SpriteFrame,
    wrongSprite: cc.SpriteFrame,
    clicked: false,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.labels = this.Answers.map((a) => {
      return a.getComponentInChildren(cc.Label);
    });

    state.changeQuestionCoins = this.changeQuestionCoins.bind(this)
  },

  start() {
    this.clickHandler();
    const question = state.question;

    this.Question.string = question.pergunta;
    this.QuestionCoins.string = question.level * 100;
    this.labels[0].string = question.resposta1;
    this.labels[1].string = question.resposta2;
    this.labels[2].string = question.resposta3;
    this.labels[3].string = question.resposta4;
  },

  clickHandler() {
    this.Answers.forEach((answer, index) => {
      answer.on(
        cc.Node.EventType.TOUCH_END,
        () => {
          this.processClick(answer, index);
        },
        this
      );
    });
  },

  processClick(answer, index) {
    if (this.clicked) return;
    this.clicked = true;

    chooseResponse(index + 1, this.processAnswer.bind(this));
    this.changeSprite(answer);
    this.disableClick();
  },

  changeSprite(node) {
    node.getComponentInChildren(cc.Sprite).spriteFrame = this.chooseSprite;
  },

  disableClick() {
    this.Answers.forEach((answer) => {
      answer.getComponent(cc.Button).interactable = false;
    });
  },

  processAnswer(chosen, correct) {
    setTimeout(() => {
    this.Answers[chosen - 1].getComponentInChildren(
      cc.Sprite
    ).spriteFrame = this.wrongSprite

    this.Answers[correct - 1].getComponentInChildren(
      cc.Sprite
    ).spriteFrame = this.correctSprite;
    }, 1000)
  },

  changeQuestionCoins(value) {
    this.QuestionCoins.string = formatWithDots(value * 100);
  }
});
