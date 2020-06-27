import {connect} from './SocketClient';

cc.Class({
  extends: cc.Component,

  properties: {},

  onClick() {
    connect()
  },
});
