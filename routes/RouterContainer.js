const QuoteRouter = require('./Routers/QuoteRouter.js');
const TestRouter = require('./Routers/TestRouter.js');


/**
 * This is the main router container for express app.
 * Routers can be extended in this file. So main
 * entry file is not populates with router instantiations.
 * Router callbacks are gathered from relates callback files.
 */
module.exports = class RouterContainer {

    constructor(serviceContainer) {
        // Router test
        this.testRouter = new TestRouter();
        // Router quote
        this.quoteRouter = new QuoteRouter(serviceContainer);
    }

    getQuoteRouter() {
        return this.quoteRouter.getRouter();
    }

    getTestRouter() {
        return this.testRouter.getRouter();
    }

}


