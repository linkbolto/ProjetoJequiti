import { state, chooseResponse } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    Question: cc.Label,
    QuestionLevel: cc.Label,
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

    state.changeQuestionLevel = this.changeQuestionLevel.bind(this)
  },

  start() {
    this.clickHandler();
    const question = state.question;

    this.Question.string = question.pergunta;

    this.QuestionLevel = this.Question
    this.QuestionLevel.string = question.level.toString();
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
    this.Answers[chosen - 1].getComponentInChildren(
      cc.Sprite
    ).spriteFrame = this.wrongSprite

    this.Answers[correct - 1].getComponentInChildren(
      cc.Sprite
    ).spriteFrame = this.correctSprite;
  },

  changeQuestionLevel(value) {
    this.QuestionLevel.string = value.toString()
  },
});
