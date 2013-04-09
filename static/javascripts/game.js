
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
	serverHost:"http://localhost:4001"
};


$(function() {

	console.log("Initialising Game Objects");

	game.layout=new layoutObject();
	game.grid=new gridObject();
	game.server=new serverObject(game.settings.serverHost);
	game.avatar=new avatarObject();
	game.feature=new featureObject();

	// Initialise the layout
	game.layout.init();

	game.server.connect("testkey123");

	// When the server is connected request the grid data
	$(game).on("server-connected",function() {
		game.grid.create("DeadLeaves-1x1");
	});
	



	//var s=new server("http://localhost:4001");
	


	//G=new game();
	//G.init();
	//G.showGrid();

	//spriteAnt=G.createSprite("ant","ant1",3,3);
	//spriteAnt2=G.createSprite("ant","ant2",20,20);

	//spriteAnt.changeState("walking");
	//spriteAnt2.changeState("walking");

});

var layoutObject=function() {
	this.pageWidth=0;
	this.pageHeight=0;
	this.gridWidth=800;
	this.gridHeight=800;

	this.init=function() {
		this.pageWidth=$(window).width();
		this.pageHeight=$(window).height();
		console.log("Page Height: "+this.pageHeight);

		if (this.pageHeight<this.gridHeight) {
			this.gridWidth=this.pageHeight;
			this.gridHeight=this.pageHeight;
		}

		var $g=$("#grid");
		$g.css({top:10,left:10,width:this.gridWidth,height:this.gridHeight-20});

		var $p=$("#panel");
		$p.css({left:this.gridWidth+20,width:300,height:this.gridHeight});
	}


}

