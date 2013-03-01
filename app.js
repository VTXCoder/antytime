

var express = require('express');
var app = express();
var engine = require('ejs-locals');

//var database_json = require('./database');



//everyauth.helpExpress(app);

var settings=require('./settings/'+app.settings.env).settings;
global.settings=settings;

//social.configAuth(settings.social);

var db=settings.postgres;
global.conString="tcp://"+db.user+":"+db.password+"@"+db.host+"/"+db.database;



exports.init = function(port) {

		app.configure(function(){
			app.engine('ejs',engine);
			app.set('views', __dirname + '/views');
			app.set('view engine', 'ejs');
			
			 // delete express.bodyParser.parse['multipart/form-data'];

			app.use(express.cookieParser('vortexo13'));
			app.use(express.bodyParser());

			var RedisStore = require('connect-redis')(express);
			
			app.use(express.session({ store: new RedisStore }));
			//app.use(passport.initialize());
			

			app.use(express.methodOverride());
			app.use(express.static(__dirname + '/static'));
			app.use(express.favicon());
				
			//app.use(passport.session());
			

			//app.use(everyauth.middleware());
			app.use(app.router);

			app.enable("jsonp callback");
 
		});

		
		var server=app.listen(port);

		console.log("Antytime - Port: %d - %s", server.address().port, app.settings.env);

		return app;
}



/*
		app.configure('development', function(){
			 

			//  var db=global.settings.postgres;
			//  global.conString="tcp://"+db.user+":"+db.password+"@"+db.host+"/"+db.database;
 

		//app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
				 //app.use(express.logger({ format: ':method :url' }));
		});

		app.configure('staging', function(){
			 //app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
				// app.use(express.logger({ format: ':method :url' }));
		});

		app.configure('production', function(){
		 //app.use(express.errorHandler()); 
		});
		*/

		// We will use formidable instead!
		//delete express.bodyParser.parse['multipart/form-data']

		// For tracking file upload progress
		//global.uploads=[];
