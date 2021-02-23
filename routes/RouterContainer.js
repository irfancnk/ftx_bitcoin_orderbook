const QuoteRouter = require('./Routers/QuoteRouter.js');



module.exports = class RouterContainer {

    constructor(serviceContainer) {
        // Router quote
        this.quoteRouter = new QuoteRouter(serviceContainer);
    }

    getQuoteRouter() {
        return this.quoteRouter.getRouter();
    }

}


