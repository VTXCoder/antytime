
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

	game.matrix=new matrixObject();
	game.server=new serverObject(game.settings.serverHost);
	game.avatar=new avatarObject();
	game.feature=new featureObject();
	game.server.connect("testkey123");

	// When the server is connected request the grid data
	$(game).on("server-connected",function() {
		//console.log("Connected");

		// Create the test matrix
		game.matrix.create("DeadLeaves-1x1");
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




/*



*/