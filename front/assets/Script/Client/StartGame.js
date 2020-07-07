import {joinLobby} from './SocketClient';

cc.Class({
  extends: cc.Component,

  properties: {},

  onClick() {
    joinLobby()
  },
});
