// PACKAGES
// MODULES
const Order = require('../models/Order');


/**
 * This class handles the BTC/USD transactions by using sorted
 * orderbooks of Redis Service
 */
module.exports = class OrderControlService {

    constructor(redisService) {
        this.redisService = redisService;
    }

    /**
     * Methods takes validated order object and handles the request using 
     * orderbook list
     * @param {*} order Object that defines desired BTC/USD - Buy/Sell operation
     */
    handleOrder(order) {
        // Target Currency
        const orderResponse = new Order(order.quote_currency);
        let bids = this.redisService.getBids();
        let asks = this.redisService.getAsks();
        if (order.action === 'buy' && order.base_currency === 'BTC') {
            let buyAmount = 0;
            let payment = 0;
            for (let i = 0; i < bids.length; i++) {
                if (buyAmount === order.amount) {
                    break;
                } else {
                    if (buyAmount + bids[i][1] <= order.amount) {
                        buyAmount = buyAmount + bids[i][1];
                        payment = payment + bids[i][1] * bids[i][0]
                    } else {
                        let percent = order.amount - buyAmount;
                        buyAmount = order.amount;
                        payment = payment + percent * bids[i][0]
                    }
                }
            }
            // Total Price
            orderResponse.setTotal(payment);
            // Average Unit Price
            orderResponse.setPrice(payment / order.amount);
        } else if (order.action === 'sell' && order.base_currency === 'USD') {
            let reachedAmount = 0;
            let cryptoAmount = 0;
            for (let i = 0; i < bids.length; i++) {                
                if (reachedAmount === order.amount) {
                    break;
                } else {
                    if (reachedAmount + bids[i][1] * bids[i][0] <= order.amount) {
                        reachedAmount = reachedAmount + bids[i][1] * bids[i][0];
                        cryptoAmount = cryptoAmount + bids[i][1]
                    } else {
                        let percent = order.amount - reachedAmount;
                        reachedAmount = order.amount;
                        cryptoAmount = cryptoAmount + percent / bids[i][0];
                    }
                }
                // // Total BTC
                orderResponse.setTotal(cryptoAmount);
                // // Average Unit BTC
                orderResponse.setPrice(cryptoAmount / order.amount);
            }
        } else if (order.action === 'sell' && order.base_currency === 'BTC') {
            let sellAmount = 0;
            let income = 0;
            for (let i = asks.length - 1; i >= 0; i--) {
                if (sellAmount === order.amount) {
                    break;
                } else {
                    if (sellAmount + asks[i][1] <= order.amount) {
                        sellAmount = sellAmount + asks[i][1];
                        income = income + asks[i][1] * asks[i][0]
                    } else {
                        let percent = order.amount - sellAmount;
                        sellAmount = order.amount;
                        income = income + percent * asks[i][0];
                    }
                }
                // Total Price
                orderResponse.setTotal(income);
                // Average Unit Price
                orderResponse.setPrice(income / order.amount);
            }
        } else if (order.action === 'buy' && order.base_currency === 'USD') {
            let reachedAmount = 0;
            let cryptoAmount = 0;
            for (let i = asks.length - 1; i >= 0; i--) {
                if (reachedAmount === order.amount) {
                    break;
                } else {
                    if (reachedAmount + asks[i][1] * asks[i][0] <= order.amount) {
                        reachedAmount = reachedAmount + asks[i][1] * asks[i][0];
                        cryptoAmount = cryptoAmount + asks[i][1]
                    } else {
                        let percent = order.amount - reachedAmount;
                        reachedAmount = order.amount;
                        cryptoAmount = cryptoAmount + percent / asks[i][0];
                    }
                }
                // // Total BTC
                orderResponse.setTotal(cryptoAmount);
                // // Average Unit BTC
                orderResponse.setPrice(cryptoAmount / order.amount);
            }
        }
        return orderResponse;
    }



}
