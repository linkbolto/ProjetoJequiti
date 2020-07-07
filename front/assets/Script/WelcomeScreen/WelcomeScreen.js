
cc.Class({
    extends: cc.Component,

    properties: {    
        buttonCreateAccount: cc.Button,
        buttonLogin: cc.Button,
        buttonLoginGuest: cc.Button
    },

    onLoad: function () {
        this.buttonCreateAccount.node.on('click', ()=>{
            cc.director.loadScene("CreateAccount");
        }, this);

        this.buttonLogin.node.on('click', ()=>{
            cc.director.loadScene("Login");
        }, this);
           
        this.buttonLoginGuest.node.on('click', ()=>{
            cc.director.loadScene("HomeScreen");
        }, this);
    },
    
});
