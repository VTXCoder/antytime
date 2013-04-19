
// Track creatures throughout the game
var redis = require("redis");
var uuid = require('node-uuid');
var _ = require('underscore');

var create=function(type) {
	var id=uuid.v4();
	console.log("Creating "+type+" "+id);
	var c=new creature(id);
	c.setType(type);
	return c;
};

var getByID=function(id,cb) {
	var client = redis.createClient();
		client.on("error", function (err) {console.log("Error " + err);});

	client.get("creature."+id,function(err,res) {
		//console.log(res);
		client.quit();
		if (err) return cb(err);
		if (!res) return cb(new Error("Creature not found! "+id));
		return cb(null,new creature(id,JSON.parse(res)));
	});
};

// May have some issues - not fully tested
var deleteByID=function(id,cb) {
	var client = redis.createClient();
		client.on("error", function (err) {console.log("Error " + err);});
		client.get("creature."+id,function(err,res) {
		
		if (err)  {client.quit();return cb(err);}
		if (!res)  {client.quit();return cb(new Error("Creature not found! "+id));}
		console.log("Found creature for deletion in grid: "+id);
		// First delete it from the grid set
		var multi=client.multi();
		if (res.details && res.details.grid) multi.srem("grid."+res.details.grid+".creatures",id);
		multi.srem("creatures",id);
		multi.del("creature",id,redis.print);
		multi.exec(function(err,res) {
			if (err) console.log(err);
			client.quit();
			return cb();
		});
	});
};

// Return an array of creature objects
var getByGrid=function(gridName,cb) {
	var client = redis.createClient();
		client.on("error", function (err) {console.log("Error " + err);});
	client.smembers("grid."+gridName+".creatures",function(err,res) {
		if (err) {client.quit();return cb(err);}
		var multi=client.multi();
		_.each(res,function(r) {multi.get("creature."+r)});
		multi.exec(function(err,replies) {
			client.quit();
			if (err) {return cb(err);}
			var creatureArray=[];
			for (var i=0;i<replies.length;i++) {
				creatureArray.push(new creature(res[i],replies[i]));
			}
			return cb(null,creatureArray);
		});
	});
};



// A single creature object
var creature=function(id,details) {
	this.id=id;
	this.details=details || {};

	this.previousGrid=null;

	this.setType=function(type) {
		this.details.type=type;
		console.log("Updating ant "+this.id+" type to: "+this.details.type);
		this.save();
	};

	this.setGrid=function(gridName) {
		this.details.previousGrid=this.grid;
		this.details.grid=gridName;
		this.save();
	};

	this.setLocation=function(x,y) {
		this.details.xpos=x;
		this.details.ypos=y;
		this.save();
	};

	/* Do not need to wait for save to complete */
	this.save=function() {
		var self=this;
		var client = redis.createClient();
		client.on("error", function (err) {console.log("Error " + err);});
		var multi=client.multi();
		multi.set("creature."+this.id,JSON.stringify(this.details),redis.print);
		multi.sadd("creatures",this.id,redis.print);
		if (this.previousGrid) {
			multi.srem("grid."+this.previousGrid+".creatures",this.id,redis.print);
			this.previousGrid=null;
		}
		if (this.details.grid) {
			multi.sadd("grid."+this.details.grid+".creatures",this.id,redis.print);
		}
		multi.exec(function(err,replies) {
			client.quit();
			if (err) console.log(err);
				else console.log("Creature Saved: "+self.id);
		});
		// nothing waits for the above to complete saving on purpose
	};

}


exports.create=create;
exports.getByID=getByID;
exports.getByGrid=getByGrid;
exports.deleteByID=deleteByID;