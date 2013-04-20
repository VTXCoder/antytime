
/*

game
game.settings
game.matrix
game.server
game.avatar

Each command must increment from the last one... 

If any are skipped then disconnect.

Once a matrix is created then we need to... 

reset to current state



*/




var game={};

game.settings={
	serverHost:"http://localhost:4001",
	cdn:"/"
};


$(function() {

	console.log("Initialising Game Objects");

	game.layout=new layoutObject();
	game.grid=new gridObject();
	game.server=new serverObject(game.settings.serverHost);
	game.creature=new creatureObject();
	game.feature=new featureObject();

	var gridName="DeadLeaves-1x1";

	// Initialise the layout
	game.layout.init();

	game.server.connect("testkey123","staticvortex");
 
	// When the server is connected request the grid data
	$(game).on("server-connected",function() {

		game.server.setGridName(gridName,function(data) {
			console.log("Set grid to "+gridName+" "+data.ok);
			// should make sure we can access that grid here
			if (data.ok) {}
		});

		 
	});

	$(game).on("access-failed",function() {
		alert("ACCESS FAILED");
	});

	/*
	$(game).on("grid-initialised",function() {
		console.log("Grid Initialised");

		game.server.initCreatures(function(data) {
			_.each(data,function(creature) {
				game.creature.create(creature);
			});
		});

	});
	*/

});


// Natural cell size 40x40 pixels
var layoutObject=function() {
	this.pageWidth=0;
	this.pageHeight=0;
	this.gridSize=800;

	this.init=function() {
		this.pageHeight=$(window).height()-20;
		console.log("Page Height: "+this.pageHeight);

		if (this.pageHeight<this.gridSize) {
			this.gridSize=this.pageHeight;
		}

		// Make the grid size divisible by 20 
		this.gridSize=parseInt(this.gridSize/20)*20;


		var $g=$("#grid");
		$g.css({top:10,left:10,width:this.gridSize,height:this.gridSize});


		var $p=$("#panel");
		$p.css({left:this.gridSize+20,width:300,height:this.gridSize});
	}


}

