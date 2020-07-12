const { loadShopData, buyPowerUp, state } = require("../Client/SocketClient");


cc.Class({
    extends: cc.Component,

    properties: {
        buttonBack : cc.Button,
        buttonRomoveAds : cc.Button,
        buttonDailyReward : cc.Button,
        modal : cc.Node,
        modalMessage : cc.RichText,
        modalContinueButton : cc.Button,
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
        buyPowerUp({ username: state.player.name, powerUpId}, this.handlePurchaseResponse.bind(this))
    },

    handlePurchaseResponse({success, message}) {
        if(success)
            cc.director.loadScene("Shop");
        else
            this.displayModal(message);
    },

    buttonBack_OnClick(){
        cc.director.loadScene("HomeScreen")
    },

    buttonDailyReward_OnClick(){
       cc.director.loadScene("AdScreen") 
    },

    buttonRemoveAds_OnClick(event, message) {
        this.displayModal(message);
    },

    displayModal(message) {
        this.modalMessage.string = message;
        this.modal.active = true;
    },

    dismissModal() {
        this.modal.active = false;
    },

    populateShop(data) {
        console.log('dados da tela: ', data);

        this.labelUserCoins.string = data.user.totalCoins;
        state.player.coins =  data.user.coins;

        for(let i = 1; i<=3; i++){
            this[`labelPricePowerUp${i}`].string = data[`pricePowerUp${i}`];
            this[`labelCountPowerUp${i}`].string = data.user[`countPowerUp${i}`];
            state.player[`powerup${i}`] =  data.user[`countPowerUp${i}`];
        }

 
    }
});
