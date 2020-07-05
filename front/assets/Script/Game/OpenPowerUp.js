cc.Class({
    extends: cc.Component,

    properties: {
		powermenu: cc.Node

    },



    onclick () {
		cc.tween(this.powermenu)
    .to(0.7, { position: cc.v2(0, 0) })
    .start()
    },

});
