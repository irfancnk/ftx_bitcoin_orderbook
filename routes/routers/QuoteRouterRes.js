// PACKAGES
// MODULES
const Order = require('../../models/Order');

// @route   POST quote/
// @desc    Place order
// @access  Public
function handleOrder(serviceContainer) {
    return function (req, res) {
        if (isValid(req.body)) {
            let result = serviceContainer.getOrderControllerService().handleOrder(
                req.body
            );
            return res.status(200).json(result);
        }
        return res.status(401).json({ error: 'Bad request.' });
    }
}

// Validate request body format
function isValid(body) {
    if (body.action
        && (body.action === 'buy' || body.action === 'sell')
        && body.base_currency
        && (body.base_currency === 'USD' || body.base_currency === 'BTC')
        && body.quote_currency
        && (body.quote_currency === 'USD' || body.quote_currency === 'BTC')
        && body.amount && typeof body.amount === "number"
    ) {
        return true;
    }
    return false;
}


module.exports = {
    handleOrder
}