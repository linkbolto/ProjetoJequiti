import { connect, signUp } from "../Client/SocketClient";

cc.Class({
    extends: cc.Component,

    properties: {    
        buttonBack: cc.Button,
        buttonCreateAccount: cc.Button,
        inputUsername: cc.EditBox,
        inputPassword: cc.EditBox,
        inputPasswordConfirmation: cc.EditBox,
        labelMessage: cc.Label,
        successModal: cc.Node,
        usernameLabel: cc.Label,
    },

    start() {
        connect()        
    },

    onLoad: function () {
        this.buttonBack.node.on('click', ()=>{
            cc.director.loadScene("WelcomeScreen");
        }, this);

        this.buttonCreateAccount.node.on('click', () => {
            this.sendSignUp()
        }, this);
    },

    sendSignUp() {
        this.labelMessage.string = ''

       const params = {
        userSignup: this.inputUsername.string,
        passwordSignup: this.inputPassword.string,
        confirmSignup: this.inputPasswordConfirmation.string,
       }

       signUp(params, this.handleResponse.bind(this))
    },

    handleResponse(result, message) {
        if(!result) return this.labelMessage.string = message

        this.usernameLabel.string = message.nome
        this.successModal.active = true
    }
});
