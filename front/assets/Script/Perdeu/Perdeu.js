import { state } from "../Client/SocketClient";

cc.Class({
    extends: cc.Component,

    properties: {
 
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    clickButtonContinue(){
        if (state.player && !state.player.removeAds) {
            cc.director.loadScene("AdScreen")
        } else {
            cc.director.loadScene("HomeScreen")
        }
    },

    start () {

    },

    // update (dt) {},
});
