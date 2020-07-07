import {state} from '../Client/SocketClient'

cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {
        console.log("state:", state)
    },

    // update (dt) {},
});
