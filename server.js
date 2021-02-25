// PACKAGES
const express = require('express');
const bodyParser = require('body-parser');
// MODULES
const RouterContainer = require('./routes/RouterContainer');
const ServiceContainer = require('./services/ServiceContainer');
const PORT = process.env.PORT || 5005;

/**
 * This class is the main entry-point of the API
 * Creates the services used for connection FTX Websocket
 * and express endpoint router containers.
 */
class FTXServer {

    constructor() {
        this.app = express();
        this.serviceContainer = new ServiceContainer();
        this.routerContainer = new RouterContainer(this.serviceContainer);
    }

    async start() {
        this.app.use(bodyParser.json());
        this.app.use('/', this.routerContainer.getTestRouter());
        this.app.use('/api/quote', this.routerContainer.getQuoteRouter());
        try {
            console.log("Initializing FTX WebSocket service.");
            await this.serviceContainer.initializeServices()
        } catch (error) {
            console.warn(error);
            process.exit(1)
        }
        console.log("FTX WebSocket connected!");
        this.app.listen(PORT, function () {
            console.log("Express server listening on port : " + PORT);
        });
    }

}

// APPLICATION ENTRY POINT
var ftxServer = new FTXServer();
ftxServer.start();
