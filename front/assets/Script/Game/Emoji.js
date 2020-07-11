import {sendChatMessage, state} from '../Client/SocketClient.js';

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
    userAvatar: cc.Node,
  },

  start() {
    state.handleEmojiFunction = this.showEmoji.bind(this);
  },

  closeEmojiSelector() {
    this.slideOutEmojiSelector();
    this.slideOutBackLayer();
  },

  openEmojiSelector() {
    this.slideInEmojiSelector();
    this.slideInBackLayer();
  },

  handleEmojiSelection(event, emojiName) {
    this.slideOutEmojiSelector();
    this.slideOutBackLayer();
    this.showEmoji(emojiName);
    sendChatMessage(emojiName);
  },

  showEmoji(emojiName) {
    console.log('front recebeu broadcast', emojiName);
    const emojiBalloon = this.retrieveEmojiComponent(emojiName);
    this.slideInSelectedEmoji(emojiBalloon);
    this.slideInUserAvatar();
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

  slideInUserAvatar() {
    cc.tween(this.userAvatar)
      .to(0.5, { position: cc.v2(-44, -310) })
      .to(1.5, { position: cc.v2(-44, -310) })
      .to(0.5, { position: cc.v2(-44, -423) })
      .start();
  },

  retrieveEmojiComponent(emojiName) {
    switch (emojiName) {
      case "haha": return this.balloonHaha;
      case "zzz": return this.balloonZzz;
      case "alert": return this.balloonAlert;
      case "dots":return this.balloonDots;
      default: return this.balloonHaha;
    }
  },
});
