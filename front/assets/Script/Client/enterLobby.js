import io from "socket.io-client";

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  // update (dt) {},

  enterLobby() {
    const socket = io("192.168.0.11:3500");
    console.log("CLICK")

    socket.on("connect", (param) => {
      console.log("CONECTADO");

      console.log("param", param);

      socket.emit(
        "joinLobby", {name: 'lucas'},
        (resp) => {
          console.log("resp", resp);
        }
      );
    });

    socket.on("message", (m) => {
      console.log(m);
    });
  },
});
