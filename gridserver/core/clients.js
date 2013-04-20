/*
Should be a client for every connected client
Provides a reference back to the associated socket
*/

var redis = require("redis");
var uuid = require('node-uuid');
var _ = require('underscore');

var clients=[];

var add=function(username,socket) {
	var c=new client(username,socket);
	clients.push(c);
	c.n=clients.length-1;
	console.log("Client "+clients.length+" Added: "+username+" ("+c.socket.id+")");
	return c;
}

var remove=function(n) {
	console.log("Client "+(n+1)+" Removed: "+clients[n].username);
	clients.splice(n,1);
}

var client=function(username,socket) {
	this.n=null;
	this.type="web";
	this.username=username;
	this.socket=socket;
	this.grid=null;
	this.sentSnapshot=false;
	this.directives=[];

	this.addDirective=function(d,data) {
		var d={directive:d,data:data};
		this.directives.push(d);
	};

	this.sendDirectives=function(cycle) {
		var self=this;
		if (this.directives.length>0) {
			console.log("Sending "+this.directives.length+" directives to "+this.username);
			this.socket.emit("client-directives",{cycle:cycle,directives:this.directives});
			self.directives=[];
		}
	};

	this.setGrid=function(grid) {
		// The first directive will be to request a snapshot
		console.log("Setting client to "+grid.name);
		var self=this;
		this.grid=grid;
		this.grid.getClientSnaphot(function(snap) {
			self.addDirective("snapshot",snap);
			self.sentSnapshot=true;
		});
	};

	 
	
}



exports.add=add;
exports.remove=remove;
exports.clients=clients;