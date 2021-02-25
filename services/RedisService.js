// PACKAGES
// MODULES

/**
 * This is class used for simulating Redis like
 * in memory, key/value based storage. In deployment scenarios,
 * similar class can be used for communicating with other microservices.
 * This class can be also extended with AMQP libraries for a more
 * proper pub/sub approach, which will increase performance in 
 * inter-process-communications.
 */
module.exports = class RedisService {
    
    constructor() {
        this.orderBook = {
            bids: [],
            asks: []
        }
    }

    /**
     * Method is used to initialize the orderbook bids and asks
     * with first emitted 'partial' event of the websocket.
     * @param {OrderBook} data Orderbook object containing bids and asks
     */
    initializeOrderBook(data) {
        var self = this;
        this.orderBook.bids = data.bids;
        this.orderBook.asks = data.asks;
        setInterval(function () {
            console.log(`====================================`);
            console.log(`Timestamp : ${Date.now()}`);
            console.log(`Min Price : ${self.orderBook.asks[0][0]} Size : ${self.orderBook.asks[0][1]}`);
            console.log(`Max Price : ${self.orderBook.bids[self.orderBook.bids.length - 1][0]} Size : ${self.orderBook.bids[self.orderBook.bids.length - 1][1]}`);
        }, 1000);
    }

    /**
     * Method is used to update orderbook bids and asks on 'update' event of websocket
     * Handles the changes, removes the bids and asks with 0 volume.
     * Adds or updates the bids/asks that have value different than 0.
     * @param {orderbook} data 
     */
    updateOrderBook(data) {
        this._updateAsks(data.asks);
        this._updateBids(data.bids);
    }

    /**
     * Freezes current bids for use in router callbacks
     */
    getBids() {
        return JSON.parse(JSON.stringify(this.orderBook.bids));
    }
    /**
     * Freezes current asks for use in router callbacks
     */
    getAsks() {
        return JSON.parse(JSON.stringify(this.orderBook.asks));
    }

    /**
     * Loops over asks once and creates hashmap of values,
     * Updates the hashmap using the received array from websocket.
     * Recreates the asks array from the Hashmap, has overall 
     * complexity of O(N) where N represents asks pool size
     * @param {Array} asks Array containing updates asks
     */
    _updateAsks(asks) {
        let hash = {};       
        for (let i = 0; i < this.orderBook.asks.length; i++) {
            hash[this.orderBook.asks[i][0]] = this.orderBook.asks[i][1]
        }
        for (let i = 0; i < asks.length; i++) {
            if (asks[i][1] === 0) {
                delete hash[asks[i][0]]
            } else {
                hash[asks[i][0]] = asks[i][1]
            }
        }
        const hashEntries = Object.entries(hash)
        for (let i = 0; i < hashEntries.length; i++) {
            hashEntries[i][0] = parseInt(hashEntries[i][0]);
        }
        this.orderBook.asks = hashEntries;
    }

    /**
     * Loops over bids once and creates hashmap of values,
     * Updates the hashmap using the received array from websocket.
     * Recreates the bids array from the Hashmap, has overall 
     * complexity of O(N) where N represents bids pool size
     * @param {Array} bids Array containing updates bids
     */
    _updateBids(bids) {
        let hash = {};       
        for (let i = 0; i < this.orderBook.bids.length; i++) {
            hash[this.orderBook.bids[i][0]] = this.orderBook.bids[i][1]
        }
        for (let i = 0; i < bids.length; i++) {
            if (bids[i][1] === 0) {
                delete hash[bids[i][0]]
            } else {
                hash[bids[i][0]] = bids[i][1]
            }
        }
        const hashEntries = Object.entries(hash)
        for (let i = 0; i < hashEntries.length; i++) {
            hashEntries[i][0] = parseInt(hashEntries[i][0]);
        }
        this.orderBook.bids = hashEntries;
    }


}


