const swag          = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        let { id } = req.query;
        let index = (req.session.user.cart).findIndex(item => item.id == id);

        if (index === -1) {
            let item = swag.find(e => e.id == id);
            req.session.user.cart.push(item);
            req.session.user.total += item.price;
        }
        res.send(req.session.user)
    },
    delete: (req, res, next) => {
        const { id } = req.query;
        const { cart } = req.session.user;
        
        const selectedSwag = swag.find( swag => swag.id == id );
        
        if ( selectedSwag ) {
            const i = cart.findIndex( swag => swag.id == id );
            cart.splice(i, 1);
            req.session.user.total -= selectedSwag.price;
        }
        
        res.status(200).send( req.session.user );
        //Mine doesnt work ...?
        // let { id } = req.query;
        // let { cart, total } = req.session.user;
        // const item = swag.find(swag => swag.id == id);
        // if (item) {
        //     let index = cart.findIndex(swag => swag.id == id);
        //     cart.splice((index), 1);
        //     (total -= item.price);
        // }
        // res.send(req.session.user);
        
    },
    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;
        res.send(req.session.user);
    }
}