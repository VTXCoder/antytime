
var _   		= require('underscore');
var moment   	= require('moment');
var flash		= require('./flash');

var templates=[];
var actions=[];

var execTemplate=function(req,res,template,cb) {
	var def={};
	//var action="get";
	def.session=req.session; 	// Send in the session
	def._=_; 					// Send in underscore
	def.moment=moment; 			// Send in moment
	def.req=req;				// And of course the request
	def.flash=flash;
	
	//if (req.query && req.query.action) action=req.query.action;

	if (typeof(templates[template]) == "function") {
		templates[template](req,res,function(err,data) {
			if (err) return cb(err);
			data=_.extend(data,def);
			if (data.template) template=data.template; // Can override the template
			res.render(template,data,function(err,html) {
				if (err) return cb(err);
				return cb(null,html);
			});

		});
	} else {
		res.render(template,def,function(err,html) {
			if (err) return cb(err);
			return cb(null,html);
		});
	}
};

var execAction=function(req,res,action,cb) {
	if (typeof(actions[action]) == "function") {
		actions[action](req,res,function(err,data) {
			if (err) return cb(err);
			return cb(null,data);
		});
	} else {
		return cb(new Error("Action not found: "+action));
	}
};

var addTemplate=function(template,func) {
	if (!templates[template]) templates[template]=func;
};

var addAction=function(action,func) {
	if (!actions[action]) actions[action]=func;
}

var handleTemplateRequest=function(req,res,next,template) {
	execTemplate(req,res,template,function(err,html) {
		if (err) return next(err);
		console.log("Handled Template: "+template);
		res.format({
			'text/html': function() {return res.send(html);},
			'appliation/json': function() {
				res.contentType('json');
				return res.send({ html: html });
			}
		});
	});
};

exports.handleTemplateRequest=handleTemplateRequest;

exports.addTemplate=addTemplate;
exports.execTemplate=execTemplate;

exports.addAction=addAction;
exports.execAction=execAction;
