var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/user');


module.exports = function() {
    passport.use(new LocalStrategy(User.authenticate()));
};
    