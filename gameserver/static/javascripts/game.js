
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
	this.perfectCellSize=25;  	// This is the default width (25px cell size)
	this.cellCountX=30;		  	// How many cells across
	this.cellCountY=30;	

	this.pageWidth=0;
	this.pageHeight=0;
	this.gridWidth=0;
	this.gridHeight=0;

	this.cellSize=0;
	this.scale=1;

	this.init=function() {
		this.pageHeight=$(window).height()-20;
		console.log("Page Height: "+this.pageHeight);

		this.cellSize=this.perfectCellSize;

		this.gridWidth=this.cellCountX*this.cellSize;
		this.gridHeight=this.cellCountY*this.cellSize;


		//if (this.pageHeight<this.gridSize) {
		//	this.gridSize=this.pageHeight;
		//}



		// Make the grid size divisible by 20 
		//this.gridWidth =parseInt(this.gridWidth/this.cellCountX)*this.cellCountX;
		//this.gridHeight=parseInt(this.gridHeight/this.cellCountX)*this.cellCountY;

		// Work out the cell size
		//this.cellSize=this.gridSize/this.cellCountX;

		// Work out the scaling
		//this.scale=this.gridSize/this.perfectGridSize;



		console.log("Layout Cell Count: "+this.cellCountX+"/"+this.cellCountY);
		console.log("Layout Grid Size: "+this.gridWidth+"/"+this.gridHeight);
		console.log("Layout Cell Size: "+parseInt(this.cellSize)+"px");
		console.log("Layout Scale: "+parseInt(this.scale*100)+"%");

		var $g=$("#grid");
		$g.css({top:10,left:10,width:this.gridWidth,height:this.gridHeight});


		var $p=$("#panel");
		$p.css({left:this.gridWidth+20,width:300,height:this.gridHeight});
	}


}

