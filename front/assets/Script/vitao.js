// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
