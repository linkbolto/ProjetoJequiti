cc.Class({
    extends: cc.Component,

    properties: {    
        buttonBack: cc.Button,
        buttonCreateAccount: cc.Button,
        inputUsername: cc.EditBox,
        inputPassword: cc.EditBox,
        inputPasswordConfirmation: cc.EditBox,
        labelMessage: cc.Label,
        successModal: cc.Node
    },

    onLoad: function () {
        this.buttonBack.node.on('click', ()=>{
            cc.director.loadScene("WelcomeScreen");
        }, this);

        this.buttonCreateAccount.node.on('click', ()=>{
            this.successModal.active = true;            
        }, this);
           
    },
});
