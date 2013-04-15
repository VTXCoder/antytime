
// Track creatures throughout the game
var redis=require("redis");
var uuid = require('node-uuid');


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
		console.log(res);
		client.quit();
		if (err) return cb(err);
		if (!res) return cb(new Error("Creature not found! "+id));
		return cb(null,new creature(id,JSON.parse(res)));
	});

};

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