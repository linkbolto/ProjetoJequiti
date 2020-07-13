import { state } from "../Client/SocketClient";
import { formatWithDots } from "../common/helpers";

cc.Class({
  extends: cc.Component,

  properties: {
    labelPlayerName: cc.Label,
    labelPlayerCoins: cc.Label,
    labelPowerUp1: cc.Label,
    labelPowerUp2: cc.Label,
    labelPowerUp3: cc.Label,
  },

  start() {
    this.populateHomeScreen();
  },

  populateHomeScreen() {
    this.labelPlayerName.string = state.player.name;
    this.labelPlayerCoins.string = formatWithDots(state.player.totalCoins);
    this.labelPowerUp1.string = formatWithDots(state.player.powerup1);
    this.labelPowerUp2.string = formatWithDots(state.player.powerup2);
    this.labelPowerUp3.string = formatWithDots(state.player.powerup3);
  }

});

