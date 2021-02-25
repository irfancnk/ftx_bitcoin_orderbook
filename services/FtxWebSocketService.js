// PACKAGES
const WebSocket = require('ws');
const EventEmitter = require('events');
// MODULES

/**
 * This class is used for subscribing the changes of FTX marketplace.
 * Using websocket rather than REST API is a better choice because
 * it avoids handshakes everytime a request is made to our API, 
 * hence speeds up API response time.
 */
module.exports = class FtxWebSocketService extends EventEmitter {

    constructor(redisService) {
        super();
        this.redisService = redisService;
        this.connected = false;
        this.WSendpoint = "ftx.com/ws/";
        this.ws = new WebSocket(`wss://${this.WSendpoint}`);

        this.ws.onmessage = this.handleMessage;
        this.ws.onopen = this.handleOnOpen;
        this.ws.onerror = e => { console.log(e.message); }
        this.ws.onclose = this.handleOnClose;
    }

    /**
     * Simple awaitable timeout function that receives time in ms
     * @param {Integer} ms Time to wait
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Awaitable service initializer that controls 
     * whether the first response is received from FTX websocket
     * Check is made every 200MS
     */
    initService() {
        var self = this;
        return new Promise(async function (resolve, reject) {
            while (!self.connected) {
                await self.sleep(200)
            }
            return resolve();
        });
    }

    /**
     * Callback that is called after handshake with FTX websocket
     * Sends subscribtion command to FTX server for receiving updates
     * on orderbook changes.
     * @param {Event} e 
     */
    handleOnOpen = (e) => {
        this.ws.send(JSON.stringify({ 'op': 'subscribe', 'channel': 'orderbook', 'market': 'BTC/USD' }));
    }

    /**
     * Callback function that is called after a message is received from FTX Websocket
     * Updates the local mirror of orderbook by calling RedisService methods 
     * depending on received event type.
     * @param {Event} e 
     */
    handleMessage = e => {
        // The bids and asks are formatted like so: [[best price, size at price], [next next best price, size at price], ...]
        this.connected = true;
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

// FTX WS DOCUMENTATION
// Establish a websocket connection with wss://ftx.com/ws/ - 
// (Optional) Authenticate with {'op': 'login', 'args': {'key': <api_key>, 'sign': <signature>, 'time': <ts>}} 
// Send pings at regular intervals (every 15 seconds): {'op': 'ping'}. You will see an {'type': 'pong'} response.
// Subscribe to a channel with {'op': 'subscribe', 'channel': 'trades', 'market': 'BTC-PERP'} 
// Receive subscription response {'type': 'subscribed', 'channel': 'trades', 'market': 'BTC-PERP'}
// Receive data {'type': 'update', 'channel': 'trades', 'market': 'BTC-PERP', 'data': {'bid': 5230.5, 'ask': 5231.0, 'ts': 1557133490.4047449, 'last': 5230.5}}
// Unsubscribe {'op': 'unsubscribe', 'channel': 'trades', 'market': 'BTC-PERP'}
// Receive unsubscription response {'type': 'unsubscribed', 'channel': 'trades', 'market': 'BTC-PERP'}
