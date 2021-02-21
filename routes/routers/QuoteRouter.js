// PACKAGES
const express = require('express');
// MODULES
// const {
//     userRegister,
//     userUpdate,
//     userLogin,
//     getUser,
//     getAllUsers,
// } = require('./UserRouterCallback.js');

class QuoteRouter {

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

module.exports = { QuoteRouter };
