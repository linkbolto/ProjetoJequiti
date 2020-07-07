cc.Class({
    extends: cc.Component,

    properties: {    
        buttonProceed: cc.Button,
    },

    onLoad: function () {
        this.buttonProceed.node.on('click', ()=>{
            cc.director.loadScene("Login");
        }, this);
           
    },
});
