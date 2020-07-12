import { signUp, login, state } from "../Client/SocketClient";

cc.Class({
  extends: cc.Component,

  properties: {},

  playAsGuest() {
    this.sendSignUp()
  },

  sendSignUp() {
    this.name = `Convidado-${Math.floor(Math.random() * 1000000)}`;
    this.password = `${Math.floor(Math.random() * 100000000)}`;

    const params = {
      userSignup: this.name,
      passwordSignup: this.password,
      confirmSignup: this.password,
    };

    signUp(params, this.sendLogin.bind(this));
  },

  sendLogin() {
    const params = {
      name: this.name,
      password: this.password,
    };

    setTimeout(() => {
      login(params, this.handleResponse.bind(this))
    }, 1000);
  },

  handleResponse(result, message) {
    if(!result) return

    state.player = message;
    cc.director.loadScene("HomeScreen");
  },
});
