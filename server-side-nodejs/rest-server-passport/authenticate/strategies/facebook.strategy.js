var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../../models/user');

module.exports = function() {
    
    passport.use(new FacebookStrategy({
        
        clientID: '1715335918691228',
        clientSecret: 'fb5a6a91476f0f2cf3bc2849bd306970',
        callbackURL: 'http://localhost:3000/users/facebook/callback',
        
    }, function(accessToken, refreshToken, profile, cb) {
            User.findOne({OauthId: profile.id}, function(err, user) {
                if(err) {
                    console.log(err); //handle errors
                }
                if(!err && user) {
                   cb(null, user); 
                }
                else {
                    user = new User({
                        username: profile.displayName
                    });
                    user.OauthId = profile.id;
                    user.OauthToken = accessToken;
                    user.save(function(err) {
                        if(err) {
                            console.log(err);
                        } else {
                            cb(null, user);
                        }
                    });
                }
            });
        }));
};