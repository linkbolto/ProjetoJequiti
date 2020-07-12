cc.Class({
  extends: cc.Component,

  properties: {
    buttonShop: cc.Button,
  },

  start() {
  },

  btnShopOnClick() {
    cc.director.loadScene("Shop");
  }

});
