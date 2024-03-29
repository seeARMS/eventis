//Require mad shit
var express = require('express');
var app = express();
//middleware
var session = require('express-session');
var cookieParser = require('cookie-parser');
var partials = require('express-partials');
//relative files
var mode = process.argv[2] === 'prod' ? 'prod' : 'dev';
var config = require('./config')(mode);
var auth = require('./auth');
var util = require('./middleware/util');
var routes = require('./routes');

//Set Embedded JavaScript as View Engine
app.set('views', __dirname+'/views');
app.set('view options', {defaultLayout: 'layout'});
app.set('view engine', 'ejs');

//Use express middleware
app.use(partials());
app.use(cookieParser(config.session.secret));
app.use(session({
	secret:config.session.secret
}));
app.use(auth.initialize());
app.use(auth.session());
app.use(express.static(__dirname+'/public'));
app.use(util.authSession);

//App Routes
app.get('/', routes.index);
//API Routes
app.get('/authed', routes.api.authed);
app.get('/me/:query?', routes.api.fbUserQuery);
app.get('/fb/:query', routes.api.fbQuery);

//Facebook Auth
app.get('/fbauth', auth.authenticate('facebook', {
	scope: ['user_events', 'user_friends', 'user_likes', 'user_location', 'user_interests']
}));
app.get('/fbauth/callback', auth.authenticate('facebook', {
	failureRedirect: '/', successRedirect: '/'}));
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.listen(config.port, function(){
	console.log('App listening on '+config.port);
});
