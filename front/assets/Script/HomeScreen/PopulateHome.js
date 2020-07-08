import {state} from '../Client/SocketClient'

cc.Class({
    extends: cc.Component,

    properties: {

        labelPlayerName : cc.Label,
        labelPlayerCoins: cc.Label,
        labelPowerUp1 : cc.Label,
        labelPowerUp2 : cc.Label,
        labelPowerUp3 : cc.Label,




    },

    start () {
        console.log("state:", state)

    this.labelPlayerName.string = state.player.name,
    this.labelPlayerCoins.string = state.player.coins,
    this.labelPowerUp1.string = state.player.powerup1,
    this.labelPowerUp2.string = state.player.powerup2,
    this.labelPowerUp3.string = state.player.powerup3



    },

    // update (dt) {},
});
