// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    progressBar: cc.Sprite,
    label: cc.Label,
    progress: 0,
    time: 15
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {

  },

  update (dt) {
    this.progress -= dt / 16
    this.progressBar.fillRange = this.progress;
    this.time -= dt
    this.label.string = `${Math.round(this.time - this.progress)}s`
  },
});
