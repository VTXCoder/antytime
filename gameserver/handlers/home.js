
var handlers 	= require('../logic/handlers');

handlers.addTemplate("home",function(req,res,cb) {
	return cb(null,{page:'home'});
});


