// @route   POST quote/
// @desc    Place order
// @access  Public
function handleOrder(req, res, serviceContainer) {
    console.log(req.body.action);
    return res.status(200).json({});
}




module.exports = {
    handleOrder
}