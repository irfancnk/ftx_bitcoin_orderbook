// PACKAGES
const WebSocket = require('ws');
const EventEmitter = require('events');
// MODULES


class FtxWebSocketService extends EventEmitter {
    constructor(config = {}) {
        super();
        this.WSendpoint = "ftx.com/ws/";
        this.ws = new WebSocket(`wss://${this.WSendpoint}`);
        this.ws.onmessage = this.handleMessage;
        this.ws.onopen = () => { console.log("connected"); }
        this.ws.onerror = e => { console.log(e.message); }
        this.ws.onclose = async e => {
            // console.log(new Date, '[FTX] CLOSED CON');
            // this.emit('statusChange', 'close');
            // this.authenticated = false;
            // this.connected = false;
            // clearInterval(this.heartbeat);
            // this.reconnect();
        }
    }

    handleWSMessage = e => {
        console.log(e);
    }




}

module.exports = { FtxWebSocketService };
