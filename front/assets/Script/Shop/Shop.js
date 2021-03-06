const { loadShopData, buyPowerUp, removeAds, state } = require("../Client/SocketClient");
const { formatWithDots } = require("../common/helpers");


cc.Class({
    extends: cc.Component,

    properties: {
        buttonBack: cc.Button,
        buttonRomoveAds: cc.Button,
        buttonDailyReward: cc.Button,
        modal: cc.Node,
        modalMessage: cc.Label,
        modalContinueButton: cc.Button,
        labelUserCoins: cc.Label,
        labelPricePowerUp1: cc.Label,
        labelPricePowerUp2: cc.Label,
        labelPricePowerUp3: cc.Label,
        labelCountPowerUp1: cc.Label,
        labelCountPowerUp2: cc.Label,
        labelCountPowerUp3: cc.Label,
    },

    start() {
        loadShopData(this.populateShop.bind(this))
    },

    purchasePowerUp(event, powerUpId) {
        buyPowerUp({ username: state.player.name, powerUpId }, this.handlePurchaseResponse.bind(this))
    },

    handlePurchaseResponse({ success, message }) {
        if (success)
            cc.director.loadScene("Shop");
        else
            this.displayModal(message);
    },

    buttonBack_OnClick() {
        cc.director.loadScene("HomeScreen")
    },

    buttonDailyReward_OnClick() {
        state.shopAd = true
        cc.director.loadScene("AdScreen")
    },

    buttonRemoveAds_OnClick(event, message) {
        if (state.player.removeAds) {
            this.buttonRomoveAds.active = false
        } else {
            removeAds()
            state.player.removeAds = true
            this.displayModal(message)
        }
    },

    displayModal(message) {
        this.modalMessage.string = message;
        this.modal.active = true;
    },

    dismissModal() {
        this.modal.active = false;
    },

    populateShop(data) {
        this.labelUserCoins.string = formatWithDots(data.user.totalCoins);
        state.player.totalCoins = data.user.totalCoins;

        for (let i = 1; i <= 3; i++) {
            this[`labelPricePowerUp${i}`].string = formatWithDots(data[`pricePowerUp${i}`]);
            this[`labelCountPowerUp${i}`].string = formatWithDots(data.user[`countPowerUp${i}`]);
            state.player[`powerup${i}`] = data.user[`countPowerUp${i}`];
        }


    }
});
