const RedisService = require('./RedisService').RedisService;
const FtxWebSocketService = require('./FtxWebSocketService').FtxWebSocketService;



class ServiceProvider {
    constructor() {
        this.redisService = new RedisService();
        this.ftxWebSocketService = new FtxWebSocketService(this.redisService);
    }


    getFtxWebSocketService() {
        return this.ftxWebSocketService;
    }


}

module.exports = { ServiceProvider };
