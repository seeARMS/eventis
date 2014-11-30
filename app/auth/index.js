var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('../config');
var fs = require('fs');

passport.serializeUser(function(user, done){
	delete user.profile._raw;
	console.log(user);
	console.log(user.profile._json.location);
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	done(null, obj);
});

passport.use(new FacebookStrategy({
	clientID: config.fb.id,
	clientSecret: config.fb.secret,
	callbackURL: config.fb.callback
	}, function(accessToken, refreshToken, profile, done){
	var nice = {
		token: accessToken,
		profile: profile
	};
	done(null,nice);
}));

module.exports = passport;
