// PACKAGES
const express = require('express');
const bodyParser = require('body-parser');
// MODULES
const RouterContainer = require('./routes/RouterContainer').RouterContainer;
const ServiceProvider = require('./services/ServiceProvider').ServiceProvider;
const PORT = process.env.PORT || 5005;


class FTXServer {

    constructor() {
        this.app = express();
        this.serviceProvider = new ServiceProvider();
        this.routerContainer = new RouterContainer();
    }

    async start() {
        this.app.use(bodyParser.json());
        this.app.use('/quote', this.routerContainer.getQuoteRouter());
        // this.app.listen(PORT, function () {
        //     console.log("Express server listening on port : " + PORT);
        // });
    }

}

// APPLICATION ENTRY POINT
var ftxServer = new FTXServer();
ftxServer.start();
