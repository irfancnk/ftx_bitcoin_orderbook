// PACKAGES
// MODULES
const RedisService = require('./RedisService');
const FtxWebSocketService = require('./FtxWebSocketService');
const OrderControlService = require('./OrderControlService');


/**
 * This class is used for connecting used services
 * These service container is then transferred to endpoint 
 * callbacks for use. Each callback can use needed services
 * and it is fully extendable.
 */
module.exports = class ServiceContainer {

    constructor() {
        this.redisService = new RedisService();
        // PRODUCER OF REDIS SERVICE
        this.ftxWebSocketService = new FtxWebSocketService(this.redisService);
        // CONSUMER OF REDIS SERVICE
        this.orderController = new OrderControlService(this.redisService);
    }

    /**
     * Awaitable initializer, used for initializing services
     * before running express server
     */
    initializeServices() {
        var self = this;
        // THIS METHOD CAN BE USED TO INITIALIZE MANY OTHER SERVICES
        // EXTENSIBLE WITH PROMISE.ALL METHOD
        // NOW USED ONLY FOR SOCKET SERVICE INITIALIZATION
        return new Promise(function (resolve, reject) {
            self.ftxWebSocketService.initService().then(function (result) {
                resolve();
            }, function (error) {
                reject(error);
            });
        });
    }

    /**
     * Default getters for service
     */
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

