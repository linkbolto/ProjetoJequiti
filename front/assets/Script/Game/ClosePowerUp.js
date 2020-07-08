cc.Class({
    extends: cc.Component,

    properties: {
		closepowermenu: cc.Node

    },



    onclick () {
		cc.tween(this.closepowermenu)
    .to(1, { position: cc.v2(0,-850) })
    .start()
    },

});
