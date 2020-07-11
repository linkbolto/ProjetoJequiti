cc.Class({
  extends: cc.Component,

  properties: {
    emojiSelector: cc.Node,
    backLayer: cc.Node,
    btnOpenEmojiSelector: cc.Button,
    btnHaha : cc.Button,
    btnDots: cc.Button,
    btnZzz: cc.Button,
    btnAlert: cc.Button,
    balloonHaha: cc.Node,
    balloonDots: cc.Node,
    balloonZzz: cc.Node,
	  balloonAlert: cc.Node,
  },

  start() {

  },

  closeEmojiSelector() {
    this.slideOutEmojiSelector();
    this.slideOutBackLayer();
  },

  openEmojiSelector() {
    this.slideInEmojiSelector();
    this.slideInBackLayer();
  },

  handleEmojiSelection(event, selectedEmojiName) {
    this.slideOutEmojiSelector();
    this.slideOutBackLayer();
    const emojiBalloon = this.retrieveEmojiComponent(selectedEmojiName);
    this.slideInSelectedEmoji(emojiBalloon);
  },
  //--------------------
  // Animation
  //--------------------
  slideOutEmojiSelector() {

        cc.tween(this.emojiSelector)
      .to(0.2, { position: cc.v2(-435.737, -287.956) })
      .start();
  },

  slideInEmojiSelector() {
    console.log(this.emojiSelector)
    cc.tween(this.emojiSelector)
      .to(0.2, { position: cc.v2(8, -298) })
      .start();
  },

  slideInBackLayer() {
    this.backLayer.active = true;
  },
  slideOutBackLayer() {
    this.backLayer.active = false;
  },

  slideInSelectedEmoji(ballonComponent) {
    cc.tween(ballonComponent)
      .to(0.5, { position: cc.v2(30, -300) })
      .to(1.5, { position: cc.v2(30, -300) })
      .to(0.5, { position: cc.v2(30, -420) })
      .start();
  },

  retrieveEmojiComponent(emojiName) {
    console.log(this.balloonAlert)
    switch (emojiName) {
      case "haha":
        return this.balloonHaha;
      case "zzz":
        return this.balloonZzz;
      case "alert":
        return this.balloonAlert;
      case "dots":
        return this.balloonDots;
      default:
        return this.balloonHaha;
    }
  },
});
