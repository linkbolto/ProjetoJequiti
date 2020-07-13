
cc.Class({
    extends: cc.Component,

    properties: {
        currentScene: null
    },


    start () {
        this.performFontAdjustment()
    },

    /*
    update(dt) {
        if(this.currentScene === cc.Scene.name)
            return;
        
        this.performFontAdjustment()
    },
    */

    performFontAdjustment() {
        this.currentScene = cc.Scene.name;

        cc.game.addPersistRootNode(this.persistNode);
        cc.Canvas.instance.node.getComponentsInChildren(cc.Label).forEach(label => {
            label.fontSize *= 2;
            label.node.width *= 2
            label.node.height *= 2.3
            label.node.scale *= 0.5
            label.lineHeight *= 2
        })
    }
});
