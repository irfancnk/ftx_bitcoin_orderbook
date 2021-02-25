// PACKAGES
const express = require('express');
// MODULES
const {
    handleOrder,
} = require('./QuoteRouterRes');


/**
 * Route container for the quote API.
 * API endpoint can be extended with different HTTP methods
 * like GET/PUT etc.
 */
module.exports = class QuoteRouter {

    constructor(serviceContainer) {
        this.quoteRouter = express.Router();
        this.serviceContainer = serviceContainer;
        this.initializeRouter();
    }

    /**
     * Assigns callback handlers to endpoints
     */
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


