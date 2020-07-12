import { connect, login, state } from "../Client/SocketClient";

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
            this.sendLogin()
        }, this);
    },

    start () {
        //connect()
    },

    sendLogin () {
        this.labelMessage.string = ''

        const params = {
            name: this.inputUsername.string,
            password: this.inputPassword.string
        }

        login(params, this.handleResponse.bind(this))
    },

    handleResponse (result, message) {
        console.log(result, message)

        if(!result) return this.labelMessage.string = message

        state.player = message
        cc.director.loadScene("HomeScreen");
    }
});
