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
}



exports.add=add;
exports.remove=remove;