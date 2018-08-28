module.exports = function(req, res, next) {
    req.session.user ? next() : req.session.user = {username: '', cart: [], total: 0 }
    next();
}