
cc.Class({
    extends: cc.Component,

    properties: {
	menu: cc.Node,
        	pup: cc.Node,
	return: cc.Node,
	haha: cc.Node,
	zzz: cc.Node,
	alert: cc.Node,
	dots: cc.Node,
    },

    start () {
    
    },

    Emoji_OnClick () {
	cc.tween(this.menu)
    		.to(0.2, { position: cc.v2(158, 10) })
    	.start()

	cc.tween(this.pup)
    		.to(0.2, { position: cc.v2(99999, 0) })
    	.start()

	cc.tween(this.return)
    		.to(0.2, { position: cc.v2(146, 301) })
    	.start()
    },

    Voltar_OnClick () {
	cc.tween(this.menu)
    		.to(0.2, { position: cc.v2(-99999, 10) })
    	.start()

	cc.tween(this.pup)
    		.to(0.2, { position: cc.v2(146, -304) })
    	.start()

	cc.tween(this.return)
    		.to(0.2, { position: cc.v2(-99999, 0) })
    	.start()
    },

    Haha_OnClick () {
	cc.tween(this.menu)
    		.to(0.2, { position: cc.v2(-99999, 10) })
    	.start()

	cc.tween(this.pup)
    		.to(0.2, { position: cc.v2(146, -304) })
    	.start()

	cc.tween(this.return)
    		.to(0.2, { position: cc.v2(-99999, 0) })
    	.start()

	cc.tween(this.haha)
		.to(1, { position: cc.v2(68, 11.5) })
		.to(1.5, { position: cc.v2(68, 11.5) })
		.to(1, { position: cc.v2(68, 500) })
	.start()
	
	
     },

     Zzz_OnClick () {
	cc.tween(this.menu)
    		.to(0.2, { position: cc.v2(-99999, 10) })
    	.start()

	cc.tween(this.pup)
    		.to(0.2, { position: cc.v2(146, -304) })
    	.start()

	cc.tween(this.return)
    		.to(0.2, { position: cc.v2(-99999, 0) })
    	.start()

	cc.tween(this.zzz)
		.to(1, { position: cc.v2(68, 11.5) })
		.to(1.5, { position: cc.v2(68, 11.5) })
		.to(1, { position: cc.v2(68, 500) })
	.start()
	
	
     },

     Alert_OnClick () {
	cc.tween(this.menu)
    		.to(0.2, { position: cc.v2(-99999, 10) })
    	.start()

	cc.tween(this.pup)
    		.to(0.2, { position: cc.v2(146, -304) })
    	.start()

	cc.tween(this.return)
    		.to(0.2, { position: cc.v2(-99999, 0) })
    	.start()

	cc.tween(this.alert)
		.to(1, { position: cc.v2(68, 11.5) })
		.to(1.5, { position: cc.v2(68, 11.5) })
		.to(1, { position: cc.v2(68, 500) })
	.start()
	
	
     },

     Dots_OnClick () {
	cc.tween(this.menu)
    		.to(0.2, { position: cc.v2(-99999, 10) })
    	.start()

	cc.tween(this.pup)
    		.to(0.2, { position: cc.v2(146, -304) })
    	.start()

	cc.tween(this.return)
    		.to(0.2, { position: cc.v2(-99999, 0) })
    	.start()

	cc.tween(this.dots)
		.to(1, { position: cc.v2(68, 11.5) })
		.to(1.5, { position: cc.v2(68, 11.5) })
		.to(1, { position: cc.v2(68, 500) })
	.start()
	
	
     },

});
