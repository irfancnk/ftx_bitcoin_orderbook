module.exports = class Order {
    constructor(quote_currency) {
        this.total = 0;
        this.price = 0;
        this.currency = quote_currency
    }

    setTotal(total) {
        this.total = total;
    }

    setPrice(price) {
        this.price = price;
    }

}


