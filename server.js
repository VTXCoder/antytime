
var express 	= require('express');
var handlers 	= require('./logic/handlers');
var request		= require('./logic/request');
var _   		= require('underscore');
var engine 		= require('ejs-locals');

// Express 3 Framework
var app = express();

app.configure(function(){
	app.engine('ejs',engine);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');

	app.use(express.cookieParser('appAntytime'));
	app.use(express.bodyParser());

	var RedisStore = require('connect-redis')(express);
	app.use(express.session({ store: new RedisStore }));
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/static'));
	app.use(express.favicon());
	app.use(app.router);
	app.enable("jsonp callback");
});

// Settings
var settings	= require('./settings/'+app.settings.env).settings;
global.settings=settings;

var db=settings.postgres;
global.conString="tcp://"+db.user+":"+db.password+"@"+db.host+"/"+db.database;

// Start Server
var port=4000;
var server=app.listen(port);
console.log("Antytime - Port: %d - %s", server.address().port, app.settings.env);

// Start Socket IO
var io = require('socket.io').listen(server);
console.log("Socket I/O Active");

// Load all the handlers 
require("fs").readdirSync("./handlers").forEach(function(file) {
	require("./handlers/" + file);
	console.log("Initialised Handler: "+file);
});
var handleTemplateRequest=handlers.handleTemplateRequest; 

// Session Preparation
app.all('*',function(req,res,next) {
	request.hit(req,res,function(err) {
		if (err) return new next(err);
		return next();
	});
});

// Ajax Requests
app.post('/', function(req,res,next) {
	if (req.query && req.query.call) {
		handlers.execAction(req,res,req.query.call,function(err,data) {
			if (err) return next(err);
			res.format({
				'appliation/json': function() {
					res.contentType('json');
					return res.send(data);
				}
			})
		});
	} else next();
});

// Home
app.get('/', function(req,res,next) {
	handleTemplateRequest(req,res,next,"home");
	//console.log(req.user);
});

// Game
app.get('/game', function(req,res,next) {
	handleTemplateRequest(req,res,next,"game");
	//console.log(req.user);
});

// Page Not Found
app.get('/*', function(req, res){
    res.render('404.ejs');
});

// Error handling
app.use(function(err, req, res, next){
	console.log(req.path);
  	console.log(err.stack);

  	res.format({
  	  'appliation/json': function() {res.contentType('json');res.send(JSON.stringify({error:err.toString()}));},
	  'text/html': function() {res.render('error.ejs', {  error: err ,status: 500});}
	});
});


/*
// Account Subpage
app.get('/account/:subpage', function(req,res,next) {
	handleTemplateRequest(req,res,next,"page/account");
	//console.log(req.user);
});

// New Topic
app.get('/new-topic', function(req,res,next) {
	handleTemplateRequest(req,res,next,"page/new-topic");
});

// List Topics (Admin Only)
app.get('/list-topics', function(req,res,next) {
	handleTemplateRequest(req,res,next,"page/list-topics");
});

// Edit Topic
app.get('/edit-topic/:topic_id', function(req,res,next) {
	handleTemplateRequest(req,res,next,"page/edit-topic");
});



// Previous Topics

// About 

// Privacy Policy

// Terms of Service

// Media Enquiries

// What's New

// Contact Us

// Country

app.get('/country/:cc', function(req,res,next) {
	if (req.params.cc.toUpperCase()!=req.session.country) {
		var i=_.indexOf(global.settings.countries,req.params.cc.toUpperCase());
		if (i>=0) {
			req.session.country=req.params.cc.toUpperCase();
		} else {
			req.session.country="WW";
		}
	} 
	handleTemplateRequest(req,res,next,"page/home");
});
                                 

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});




app.use(function(err, req, res, next){
	console.log(req.path);
  	console.log(err.stack);

  	res.format({
  	  'appliation/json': function() {res.contentType('json');res.send(JSON.stringify({error:err.toString()}));},
	  'text/html': function() {res.render('error.ejs', {  error: err ,status: 500});}
	});
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

/*
var request 		= require('./request'),
	handlers		= require('./modules-base/handlers');

var content 		= require('./modules-site/site-content').getContent();

// Attach all the handlers
var sitePhoto=require('./modules-site/site-photo');
require('./modules-site/site-home');
require('./modules-site/site-about');
require('./modules-site/site-login');
require('./modules-site/site-signup');
require('./modules-site/site-profile');
require('./modules-site/site-topics');
require('./modules-site/site-signup');

// res will be the template
var handleTemplateRequest=function(req,res,next,template) {
	handlers.execTemplate(req,res,template,"layout",function(err,html) {
		if (err) return next(err);
		console.log("Template: "+template);
		res.format({
			'text/html': function() {return res.send(html);},
			'appliation/json': function() {
				res.contentType('json');
				return res.send({ html: html });
			}
		});
	});
};

// Template action calls
handlers.addAction("template",function(req,res,cb) {
	console.log("Action Template: "+req.body.template);
	handlers.execTemplate(req,res,req.body.template,null,function(err,html) {
		if (err) return cb(err);
		res.format({
			'appliation/json': function() {
				res.contentType('json');
				return res.send({ html: html });
			}
		});
	});
});
*/

// Session Preparation
//app.all('*',function(req,res,next) {
	//request.prepare(req,res,function(err) {
	//	if (err) return new next(err);
		//handleTemplateRequest(req,res,next,"page/home");
	//});
//});
  
/*
app.get('/home', function(req,res,next) {
	handleTemplateRequest(req,res,next,"page/home");
});



app.get('/au', function(req,res,next) {
	request.setCountry(req,res,"AU",function() {
		handleTemplateRequest(req,res,next,"page/home");	
	});
});

app.get('/uk', function(req,res,next) {
	request.setCountry(req,res,"GB",function() {
		handleTemplateRequest(req,res,next,"page/home");
	});
});

app.get('/us', function(req,res,next) {
	request.setCountry(req,res,"US",function() {
		handleTemplateRequest(req,res,next,"page/home");
	});
   	
});

app.get('/ww', function(req,res,next) {
	request.setCountry(req,res,"WW",function() {
		handleTemplateRequest(req,res,next,"page/home");
	});
});

app.get('/profile/:profile_id', function(req,res,next) {
    handleTemplateRequest(req,res,next,"page/profile");
});

app.get('/about', function(req,res,next) {
     handleTemplateRequest(req,res,next,"page/about");
});

app.get('/topics', function(req,res,next) {
    handleTemplateRequest(req,res,next,"page/topics");
});

app.get('/new-topic', function(req,res,next) {
    handleTemplateRequest(req,res,next,"page/topics/new-topic");
});


app.get('/signup', function(req,res,next) {
     handleTemplateRequest(req,res,next,"page/signup");
});



app.post('/upload/:id', function(req, res, next) {
	console.log("Receiving File: "+req.params.id);
	sitePhoto.uploadPhoto(req,function(err,data) {
		if (err) return next(err);
		res.send(JSON.stringify(data));
	});
});


app.post('/ajax/:action', express.bodyParser(), function(req, res,next) {
	var action=req.params.action;
	console.log("Action: "+action);
	handlers.execAction(req,res,action,function(err,data) {
		if (err) return next(err);
		res.format({
			'appliation/json': function() {
				res.contentType('json');
				return res.send(data);
			}
		})
	});
});
 



*/