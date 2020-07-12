import { connect } from "../Client/SocketClient";

cc.Class({
    extends: cc.Component,

    properties: {    
        buttonCreateAccount: cc.Button,
        buttonLogin: cc.Button,
    },

    onLoad: function () {
        connect();

        this.buttonCreateAccount.node.on('click', ()=>{
            cc.director.loadScene("CreateAccount");
        }, this);

        this.buttonLogin.node.on('click', ()=>{
            cc.director.loadScene("Login");
        }, this);
    },
});
