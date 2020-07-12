cc.Class({
    extends: cc.Component,

    properties: {
        persistNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.game.addPersistRootNode(this.persistNode);
        this.persistNode.opacity = 0
    },

    update (dt) {
       const pisca = Math.floor(Math.random() * 400) 

       if (pisca == 10) this.piscar()
    },

    piscar() {
        this.persistNode.opacity = 255
        setTimeout(() => {
            this.persistNode.opacity = 0;
        }, 200)
    }
});