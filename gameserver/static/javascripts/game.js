
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

	this.init=function(w,h) {

		this.cellCountX=w || this.cellCountX;	
		this.cellCountY=h || this.cellCountY;	

		this.pageHeight=$(window).height()-20;
		console.log("Page Height: "+this.pageHeight);

		this.cellSize=this.perfectCellSize;
		this.gridWidth=this.cellCountX*this.cellSize;
		this.gridHeight=this.cellCountY*this.cellSize;

		if (this.pageHeight<this.gridHeight) {
			this.scale=this.pageHeight/this.gridHeight;
		}

		// Scale the grid
		if (this.scale!=1) {
			this.cellSize=this.perfectCellSize*this.scale;
			this.gridWidth=this.cellCountX*this.cellSize;
			this.gridHeight=this.cellCountY*this.cellSize;
		}

		console.log("Layout Cell Count: "+this.cellCountX+"/"+this.cellCountY);
		console.log("Layout Grid Size: "+this.gridWidth+"/"+this.gridHeight);
		console.log("Layout Cell Size: "+parseInt(this.cellSize)+"px");
		console.log("Layout Scale: "+parseInt(this.scale*100)+"%");

		var $g=$("#grid");
		var $p=$("#panel");

		$g.css({top:10,left:10,width:this.gridWidth,height:this.gridHeight});
		$p.css({left:this.gridWidth+20,width:300,height:this.gridHeight});

		// Clear the grid
		$g.html("");
		$p.html("");
	}


}

