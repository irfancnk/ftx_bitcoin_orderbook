const QuoteRouter = require('./Routers/QuoteRouter.js').QuoteRouter;



class RouterContainer {

    constructor(serviceProvider) {
        // Router quote
        this.quoteRouter = new QuoteRouter();
    }

    getQuoteRouter() {
        return this.quoteRouter.getRouter();
    }

}

module.exports = { RouterContainer }
