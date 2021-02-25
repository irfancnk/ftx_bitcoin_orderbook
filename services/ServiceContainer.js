// PACKAGES
// MODULES
const RedisService = require('./RedisService');
const FtxWebSocketService = require('./FtxWebSocketService');
const OrderControlService = require('./OrderControlService');



module.exports = class ServiceContainer {
    constructor() {
        this.redisService = new RedisService();
        // PRODUCER OF REDIS SERVICE
        this.ftxWebSocketService = new FtxWebSocketService(this.redisService);
        // CONSUMER OF REDIS SERVICE
        this.orderController = new OrderControlService(this.redisService);
    }

    getRedisService() {
        return this.redisService;
    }

    getFtxWebSocketService() {
        return this.ftxWebSocketService;
    }

    getOrderControllerService() {
        return this.orderController;
    }

}

