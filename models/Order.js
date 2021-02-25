module.exports = class Order {
    constructor() {
        this.total = 0;
        this.price = 0;
        this.currency = ''
    }

    setTotal(total) {
        this.total = total;
    }

    setPrice(price) {
        this.price = price;
    }

    setCurrency(currency) {
        this.currency = currency;
    }

}


