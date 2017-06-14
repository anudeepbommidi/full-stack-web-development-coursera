var passport = require('passport'),
    User = require('../models/user');


module.exports = function(app) {
    
    
    app.use(passport.initialize());
    
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    require('./strategies/local.strategy')();
    require('./strategies/facebook.strategy')();
};




