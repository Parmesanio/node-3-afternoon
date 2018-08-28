const express           = require('express'),
      bodyParser        = require('body-parser'),
      session           = require('express-session'),
      checkForSession   = require('./middlewares/checkForSession'),
      swag_controller   = require('./controllers/swag_controller'),
      auth              = require('./controllers/auth_controller'),
      cart              = require('./controllers/cart_controller'),
      search            = require('./controllers/search_controller'),
      app               = express();
      require('dotenv').config();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 3600 * 24 * 14 }
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));

app.get('/api/swag', swag_controller.read);
//AUTH
app.get('/api/user', auth.getUser);
app.post('/api/register', auth.register);
app.post('/api/signout', auth.signout);
//CART
app.post('/api/cart', cart.add);
app.post('/api/cart/checkout', cart.checkout);
app.delete('/api/cart', cart.delete);
//SEARCH
app.get('/api/search', search.search);


app.listen(3000, () => console.log(`Server running on port ${3000}`));

