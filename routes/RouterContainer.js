const QuoteRouter = require('./Routers/QuoteRouter.js');



module.exports = class RouterContainer {

    constructor(serviceProvider) {
        // Router quote
        this.quoteRouter = new QuoteRouter();
    }

    getQuoteRouter() {
        return this.quoteRouter.getRouter();
    }

}


