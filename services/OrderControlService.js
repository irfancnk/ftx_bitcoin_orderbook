// PACKAGES
// MODULES
const Order = require('../models/Order');


module.exports = class OrderControlService {

    constructor(redisService) {
        this.redisService = redisService;
    }

    handleOrder(order) {
        const orderResponse = new Order();
         

    }



}
