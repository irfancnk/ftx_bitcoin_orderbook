// PACKAGES
const WebSocket = require('ws');
const EventEmitter = require('events');
// MODULES


module.exports = class FtxWebSocketService extends EventEmitter {

    constructor(redisService) {
        super();
        this.redisService = redisService;
        this.WSendpoint = "ftx.com/ws/";
        this.ws = new WebSocket(`wss://${this.WSendpoint}`);

        this.ws.onmessage = this.handleMessage;
        this.ws.onopen = this.handleOnOpen;
        this.ws.onerror = e => { console.log(e.message); }
        this.ws.onclose = this.handleOnClose;
    }

    handleOnOpen = (e) => {
        this.ws.send(JSON.stringify({ 'op': 'subscribe', 'channel': 'orderbook', 'market': 'BTC/USD' }));
    }

    handleMessage = e => {
        // The bids and asks are formatted like so: [[best price, size at price], [next next best price, size at price], ...]
        const { data } = JSON.parse(e.data);
        if (data) {
            const { action } = data;
            if (action && action === 'partial') {
                this.redisService.initializeOrderBook(data);
            } else if (action && action === 'update') {
                this.redisService.updateOrderBook(data);
            }
        }
    }

    handleOnClose = (e) => {
        console.log(e);
    }



}


// Establish a websocket connection with wss://ftx.com/ws/ - 
// (Optional) Authenticate with {'op': 'login', 'args': {'key': <api_key>, 'sign': <signature>, 'time': <ts>}} 
// Send pings at regular intervals (every 15 seconds): {'op': 'ping'}. You will see an {'type': 'pong'} response.
// Subscribe to a channel with {'op': 'subscribe', 'channel': 'trades', 'market': 'BTC-PERP'} 
// Receive subscription response {'type': 'subscribed', 'channel': 'trades', 'market': 'BTC-PERP'}
// Receive data {'type': 'update', 'channel': 'trades', 'market': 'BTC-PERP', 'data': {'bid': 5230.5, 'ask': 5231.0, 'ts': 1557133490.4047449, 'last': 5230.5}}
// Unsubscribe {'op': 'unsubscribe', 'channel': 'trades', 'market': 'BTC-PERP'}
// Receive unsubscription response {'type': 'unsubscribed', 'channel': 'trades', 'market': 'BTC-PERP'}
