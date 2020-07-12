cc.Class({
  extends: cc.Component,

  properties: {
    buttonShop: cc.Button,
  },

  start() {
    this.populateHomeScreen();
  },

  btnShopOnClick() {
    cc.director.loadScene("Shop");
  }

});
