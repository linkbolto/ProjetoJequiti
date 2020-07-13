import { exitLobby } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {},

  giveUp() {
    exitLobby((resp) => {
      if (resp) cc.director.loadScene("HomeScreen");
    });
  },
});
