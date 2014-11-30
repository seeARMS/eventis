module.exports.authSession = function(req, res, next){
	req.session.isAuthed = req.session.passport.user !== undefined;
	res.locals.isAuthed = req.session.isAuthed;
	if(req.session.isAuthed){
		res.locals.user = req.session.passport.user.profile;
	}	
	next();
}
