import { state } from "../Client/SocketClient";

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},   

    start () {

    },
    click(){
        if (state.shopAd) {
            state.shopAd = false
            cc.director.loadScene("Shop")
        } else if (state.player && Object.keys(state.player).length !== 0) {
            cc.director.loadScene("HomeScreen")
        } else {
            cc.director.loadScene("WelcomeScreen")
        }
    }
    // update (dt) {},
});
