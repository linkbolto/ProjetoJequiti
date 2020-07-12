import { connect, signUp } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {
    User: cc.EditBox,
    Password: cc.EditBox,
    Confirm: cc.EditBox,
  },

  start () {
    //connect()
  },

  onClick() {
    const params = {
      userSignup: this.User.string,
      passwordSignup: this.Password.string,
      confirmSignup: this.Confirm.string,
    };

    console.log(params);

    signUp(params);
  },
});
