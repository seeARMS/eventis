var FB = require('fb');
module.exports = (function(){
	//APP ROUTES
	var index = function(req, res){
		res.render('home');
	};	

	//API ROUTES
	var fbUserQuery = function(req, res){
		var query = '';
		if(req.params.query){
			query ='/'+req.params.query;	
		}	
		if(req.session.passport.user){
			var token = req.session.passport.user.token;
		}
		FB.api('me'+query,{
			access_token: token	
		}, function(fbres){
			res.json(fbres);	
		});
	};	

	var fbQuery = function(req, res){
		var query = req.params.query;
		var token = req.session.passport.user.token;
		FB.api(query,{
			access_token: token
		}, function(fbres){
			res.json(fbres);
		});
	};

	var authed = function(req, res){
		var json = {};
		if(req.session.passport.user){
			json.authed = true;
		} else {
				json.authed = false;
		}
		res.json(json);
	};
	
	return {
		index: index,		
		api: {
			fbUserQuery: fbUserQuery,
			fbQuery: fbQuery,
			authed: authed
		}
	};
}());
