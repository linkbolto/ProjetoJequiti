cc.Class({
    extends: cc.Component,

    properties: {
        modal: cc.Node,
        modalTitle: cc.Label,
        modalMessage: cc.Label,
        btnCloseModal: cc.Button,

    },
    
    onLoad() {
        this.powerUps = {
            powerUp1: {
                name: "Imunidade",
                description: "Garante imunidade contra penalidade no caso de errar a resposta."
            },
            powerUp2: {
                name: "Meio a meio",
                description: "Remove duas respostas incorretas, deixando apenas duas alternativas."
            },
            powerUp3: {
                name: "Dobro de Moeda",
                description: "Dobra a recompensa da questão. Mas cuidado! A penalidade também é em dobro!"
            }            
        }
    },


    displayPowerUpInfo(event, powerUpId) {
        let powerUp = this.getPowerUpInfo(powerUpId);
        this.displayModal({title: powerUp.name, message: powerUp.description});
    },

    displayModal({title, message}) {
        this.modal.active = true;
        this.modalTitle.string = title;
        this.modalMessage.string = message;
    },

    dismissModal() {
        this.modal.active = false;
    },

    getPowerUpInfo(id) {        
        return this.powerUps[`powerUp${id}`];
    }


});
