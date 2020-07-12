cc.Class({
  extends: cc.Component,

  properties: {
    progressBar: cc.Sprite,
    label: cc.Label,
    progress: 0,
    time: 15
  },

  start () {

  },

  update (dt) {
    this.progress -= dt / 16
    this.progressBar.fillRange = this.progress;
    this.time -= dt

    const screenTime = Math.round(this.time - this.progress)

    if(screenTime >= 0)
     this.label.string = `${screenTime}s`
    else
      this.progressBar.node.color = new cc.Color(248, 79, 93)
  },
});
