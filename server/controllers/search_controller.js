const swag          = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        if (req.query.category) {
            const filteredSwag = swag.filter(item => item.category == req.query.category);
            res.send(filteredSwag);
        } else {
            res.send(swag);
        }
    }
}