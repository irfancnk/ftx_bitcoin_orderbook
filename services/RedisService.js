// PACKAGES
// MODULES

module.exports = class RedisService {
    
    constructor() {
        this.orderBook = {
            bids: [],
            asks: []
        }
    }

    initializeOrderBook(data) {
        var self = this;
        this.orderBook.bids = data.bids;
        this.orderBook.asks = data.asks;
        setInterval(function () {
            console.log("***************************************");
            console.log(`Timestamp : ${Date.now()}`);
            console.log(`Min Ask   : ${self.orderBook.asks[0]}`);
            console.log(`Max Bid   : ${self.orderBook.bids[self.orderBook.bids.length - 1]}`);
            console.log("***************************************");
        }, 1000)
    }

    updateOrderBook(data) {
        this._updateAsks(data.asks);
        this._updateBids(data.bids);
    }

    getOrderBook() {
        return JSON.parse(JSON.stringify(this.orderBook));
    }

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


