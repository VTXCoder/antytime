var redis = require("redis");
var _ = require('underscore');
var clients=require("./clients.js");

var cycleMiliseconds=2000;
// The idea is everything should be backed up at the end of each cycle
// So that it restores cleanly!
// Have to consider transactions across grids...

var processor=function(grid) {
	this.grid=grid;
	this.cycle=0;
	this.cTimer=null;

	this.begin=function() {
		var self=this;
		var client = redis.createClient();
		client.on("error", function (err) {console.log("Error " + err);});
		client.get("grid."+this.grid.name+".cycle",function(err,res) {
			client.quit();
			if (err) console.log(err);
			if (!res) self.cycle=0; else self.cycle=res;
			console.log("Start "+self.grid.name+" at cycle: "+self.cycle.toString());
			self.loop();
		});
	};

	this.loop=function() {
		var self=this;
		var date=new Date();
		var s=date.getTime();

		console.log("******************************");
		this.cycle++;
		this.processCycle();

		var client = redis.createClient();
		client.on("error", function (err) {console.log("Error " + err);});
		client.set("grid."+this.grid.name+".cycle",this.cycle);

		var date=new Date();
		var e=date.getTime()-s;

		console.log("Execution time: "+e+"ms");
		if (e<cycleMiliseconds) {
			this.cTimer=setTimeout(function() {self.loop()},cycleMiliseconds-e);
		} else {
			self.loop();
		} 
	};

	this.processCycle=function() {
		var self=this;
		console.log("Process: "+this.grid.name+" "+this.cycle);

		// Send a ping to all the clients for now
		console.log("Connected Clients: "+clients.clients.length);
		_.each(clients.clients,function(client) {
			
			// Make sure all clients have received the snapshot
			//if (!client.sentSnapshot) {
			//	self.grid.getSnapshot();
			//}

			//client.addDirective("ping",null,self.cycle); // temp
			client.sendDirectives(self.cycle);
		});
	};

};


exports.processor=processor;