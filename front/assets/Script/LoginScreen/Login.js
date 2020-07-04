cc.Class({
    extends: cc.Component,

    properties: {    
        buttonBack: cc.Button,
        buttonLogin: cc.Button,
        inputUsername: cc.EditBox,
        inputPassword: cc.EditBox,
        labelMessage: cc.Label
    },

    onLoad: function () {
        this.buttonBack.node.on('click', ()=>{
            cc.director.loadScene("WelcomeScreen");
        }, this);

        this.buttonLogin.node.on('click', ()=>{
            cc.director.loadScene("HomeScreen");
        }, this);
           
    },
});
