  let users         = require('../models/users'),
      id            = 1;

module.exports = {
    login: (req, res, next) => {
        let { username, password } = req.body;
        let index = users.find(user => user.username == username && user.password == password);
        index !== -1 ? (username = req.session.user.username, res.status(200).send(req.session.user)) : res.sendStatus(500);

    },
    register: (req, res, next) => {
        let { username, password } = req.body;
        let newUser = {
            id,
            username,
            password
        }
        users.push(newUser);
        req.session.user.username = username;
        id++;
        res.send(req.session.user);
        

    },
    signout: (req, res, next) => {
        req.session.destroy();
        res.send(req.session);
    },
    getUser: (req, res, next) => {
        res.send(req.session.user)
    }
}