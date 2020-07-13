import { state } from "../Client/SocketClient";
import { formatWithDots } from "../common/helpers";

cc.Class({
    extends: cc.Component,

    properties: {
        labelEarnedCoins: cc.Label        
    },

    onLoad () {
        this.labelEarnedCoins.string = formatWithDots(state.player.coins);
    },

    clickButtonContinue(){
        if (state.player && !state.player.removeAds) {
            cc.director.loadScene("AdScreen")
        } else {
            cc.director.loadScene("HomeScreen")
        }
    },

    ostentar () {
      window.open("https://twitter.com", "_blank");
    }
});
