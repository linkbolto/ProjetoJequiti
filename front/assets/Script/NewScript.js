cc.Class({
    extends: cc.Component,

    properties: {
      speed: 0.06
    
    },


    update (dt) {
      this.node.angle -= this.speed * dt
    },
});
