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
	this.size=30;

	// Constructor
	var d=require('./../game/grids/'+name);
	d.fullbg=global.settings.cdn+"bg/"+d.bg;
	this.definition=d;

	// Initialise the map
	for (var x=0;x<this.size;x++) {this.map[x]=[];for (var y=0;y<this.size;y++) this.map[x][y]={};}
	
	

	this.getClientSnaphot=function(cb) {
		var snapshot={};

		// Grid Name
		snapshot.name=this.definition.name;

		// Grid Size
		snapshot.size=this.definition.size;

		// Grid background
		snapshot.fullbg=this.definition.fullbg;

		// Terrain
		snapshot.defaultTerrain=this.definition.defaultTerrain;

		// Static Features
		snapshot.features=this.gridFeatures;


		// Dynamic Features (later)

		// Send the features and their definitions




		// Items

		// Creatures

		// Links

		cb(snapshot);
	}
     
	// Snapshot the grid from persistant storage
	this.snapshot=function() {
		var self=this;
		console.log("Snapshot Grid: "+this.name);
		
		// Default Terrain
		if (this.definition.defaultTerrain) {
			this.mapTerrain("all",this.definition.defaultTerrain);
		}
  		
		// Static Features
		if (this.definition.features) {
			_.each(this.definition.features,function(feature) {
				self.addStaticFeature(feature);
			});
		}

		// Creatures
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

	this.addStaticFeature=function(feature) {
		var posX=Number(feature.position.split(".")[0]);
		var posY=Number(feature.position.split(".")[1]);
		console.log("Adding feature: "+feature.type+" "+posX+"/"+posY);
		
		feature.x=posX;
		feature.y=posY;

		// Merge in the default feature definition
		var d=require('./../game/features/'+feature.type);
		d.fullfile=global.settings.cdn+"features/"+d.file;
		_.extend(feature,d);

		delete feature.position;
		delete feature.file;

		feature.width=parseInt(feature.width);
		feature.height=parseInt(feature.height);
		feature.rotate=parseInt(feature.rotate);

		// Add to the map
		this.gridFeatures.push(feature);
		this.mapAdd(posX,posY,"feature",feature);
	};



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
		console.log(this.name+": Adding "+type+" to map: "+x+"/"+y);
		var cell=this.map[x-1][y-1];
		if (!cell[type]) cell[type]=[];
		cell[type].push(object);
	};

	this.mapTerrain=function(location,type) {
		if (location=="all") {
			console.log("Mapping all terrain to: "+type);
			for (var x=0;x<this.size;x++) {
				for (var y=0;y<this.size;y++) 
					this.map[x][y].terrain=type;
			}
		}

		// Incomplete
	};


	this.mapRemove=function(x,y,type,object) {

	};
}

exports.grid=grid; 





