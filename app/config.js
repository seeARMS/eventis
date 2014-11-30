module.exports = function(mode){
	var config = {
	port: 8080,
	session: {
		secret: 'nice'
	},
	fb:{
		id: '579321505535169',
		secret: 'ff58be820ba2090e7a396720279bbfba',
		callback: 'http://104.236.5.205:8080/fbauth/callback'
	}
};
	
	if(mode === 'dev'){
		config.fb.id = '580331165434203';
		config.fb.secret = '5b18ae556d4c61a90bd98465d9bf3e8b';
		config.fb.callback = 'http://localhost:8080/fbauth/callback';
	}

	return config;	
};
