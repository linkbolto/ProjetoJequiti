// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        buttonBack : cc.Button,
        buttonRomoveAds : cc.Button,
        buttonDailyPowerUp : cc.Button,
        buttonPowerUpJump : cc.Button,
        buttonPowerUpHalf : cc.Button,
        buttonPowerUpDouble : cc.Button 

    },

    // LIFE-CYCLE CALLBACKS:
    clickButtonBack(){
        console.log("cricou")
        cc.director.loadScene("HomeScreen")
    },
    clickButtonAd(){
       cc.director.loadScene("AdScreen") 
    },
    onLoad () {},

    start () {

    },

    // update (dt) {},
});
