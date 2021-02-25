// PACKAGES
const express = require('express');
// MODULES
const {
    handleOrder,
} = require('./QuoteRouterRes');

module.exports = class QuoteRouter {

    constructor(serviceContainer) {
        this.quoteRouter = express.Router();
        this.serviceContainer = serviceContainer;
        this.initializeRouter();
    }

    initializeRouter() {
        this.quoteRouter.post(
            '/',
            handleOrder(this.serviceContainer)
        );
    }

    getRouter() {
        return this.quoteRouter;
    }
}


