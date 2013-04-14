
var handlers 	= require('../logic/handlers');

handlers.addTemplate("game",function(req,res,cb) {
	return cb(null,{page:'game'});
});


