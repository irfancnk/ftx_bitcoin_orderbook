// PACKAGES
const express = require('express');
// MODULES
const {
    handleOrder,
} = require('./QuoteRouterRes');


/**
 * Test endpoint
 */
module.exports = class TestRouter {

    constructor() {
        this.testRouter = express.Router();
        this.initializeRouter();
    }

    /**
     * Assigns callback handlers to endpoints
     */
    initializeRouter() {
        this.testRouter.get('/', function (req, res) {
            res.status(200).json({
                test: "Happy hacking!"
            });
        })

    }

    getRouter() {
        return this.testRouter;
    }
}


