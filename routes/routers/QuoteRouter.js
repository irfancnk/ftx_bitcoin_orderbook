// PACKAGES
const express = require('express');
// MODULES


module.exports = class QuoteRouter {

    constructor(serviceProvider) {
        this.quoteRouter = express.Router();
        // this.serviceProvider = serviceProvider;
        // this.initializeRouter();
    }

    initializeRouter() {
        // this.userRouter.post(
        //     '/login',
        //     (req, res) => userLogin(req, res, this.serviceProvider)
        // );
    }

    getRouter() {
        return this.quoteRouter;
    }
}


