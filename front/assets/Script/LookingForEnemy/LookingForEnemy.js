import { exitLobby } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {},

  giveUp () {
    exitLobby()
    cc.director.loadScene("HomeScreen");
  }
});
