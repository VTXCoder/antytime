/*
	The grid is not persisted and is snapshotted from other data.

	The map is a reference for all objects at a location. 
	(creature,feature,item,link,block, etc)

	map[0][0].creatures[]
	map[0][0].features[] 
	etc.

	Different types of environment....

		open (default / undefined)
		blocked (can't go here at all)
		leaves (slow and indirect)
		desert 
		wood
		underground
		water (ants can float but not swim)

*/



var redis = require("redis");
var _ = require('underscore');
var creatures=require("./creatures.js");

// This is the server side grid object
var grid=function(name) {
	this.processor=null;
	this.name=name;
	this.definition={};
	this.map=[];
	this.gridCreatures=[];
	this.gridFeatures=[];
	this.gridItems=[];

	// Constructor
	var d=require('./../game/grids/'+name);
	d.fullbg=global.settings.cdn+"bg/"+d.bg;
	this.definition=d;

	// Initialise the map
	for (var x=0;x<50;x++) {this.map[x]=[];for (var y=0;y<50;y++) this.map[x][y]={};}
		
	this.getClientSnaphot=function(cb) {
		var snapshot={};
		
		// Grid background
		snapshot.fullbg=this.definition.fullbg;
		snapshot.name=this.definition.name;


		cb(snapshot);
	}

	// Snapshot the grid from persistant storage
	this.snapshot=function() {
		var self=this;
		console.log("Snapshot Grid: "+this.name);
		var client = redis.createClient();
		client.on("error", function (err) {console.log("Error " + err);});

		client.smembers("grid."+this.name+".creatures",function(err,res) {
			client.quit();
			if (err) console.log(err); else {
				console.log("Loaded "+res.length+" creatures.");
				self.addCreaturesByID(res);
			}
		});
	}

	// Add multiple creatures
	this.addCreaturesByID=function(creatureIDArray) {
		var self=this;
		_.each(creatureIDArray,function(creatureID) {
			creatures.getByID(creatureID,function(err,c) {
				self.gridCreatures.push(c);
				if (c.details.xpos && c.details.ypos) {
					self.mapAdd(c.details.xpos,c.details.ypos,"creature",c);
				} else {
					console.log("Creature has no location: "+c.id)
				}
			});
		});
	};

	this.mapAdd=function(x,y,type,object) {
		console.log(this.name+": Adding "+object.details.type+" to map: "+x+"/"+y);
		var cell=this.map[x-1][y-1];
		if (!cell[type]) cell[type]=[];
		cell[type].push(object);
	};

	this.mapRemove=function(x,y,type,object) {

	};
}

exports.grid=grid; 





