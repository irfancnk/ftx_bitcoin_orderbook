const RedisService = require('./RedisService');
const FtxWebSocketService = require('./FtxWebSocketService');



module.exports = class ServiceContainer {
    constructor() {
        this.redisService = new RedisService();
        // this.ftxWebSocketService = new FtxWebSocketService(this.redisService);
    }


    getFtxWebSocketService() {
        return this.ftxWebSocketService;
    }

    getRedisService() {
        return this.redisService;
    }

}

