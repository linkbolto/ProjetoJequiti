cc.Class({
    extends: cc.Component,

    properties: {
      speed: 0.06
    
    },

    start () {

    },

    update (dt) {
        this.node.angle -= this.speed * dt

    },
});
