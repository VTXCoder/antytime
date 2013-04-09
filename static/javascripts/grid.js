
// Objects need to be rendered sequentially
// So use a command queue
// command, parameters

/*

Actually z-index is important

divs

cluster (made up of multiple divs)

matrix
sprite

DrawSprite()

GetSpriteDef() - Get the definition f


Underscore templates to store sprites on CDN

Sprites are purely visual.. instructions sent from server.. 

There could be 10000's of sprites but that really doesn't matter

*/

var gridObject=function() {
	this.$g=$("#grid");
	this.squareSize=20;
	this.cmd=[];
	this.processing=false;
	this.scale=100;
	this.data=null;


	// Matrix will be downloaded and created
	this.create=function(name) {
		var self=this;
		// Get the matrix
		game.server.getGrid(name,function(data) {
			self.data=data;
			console.log("Grid Received");
			console.log(self.data);
			game.grid.init();
		});
	};

	this.init=function() {
		console.log("Initialising Grid: "+this.data.name);
		self=this;
		
		var baseGridSize=750;

		this.scale=(this.$g.width()/baseGridSize)*100;
		this.squareSize=this.squareSize*(this.scale/100);

		console.log("Grid Scale: "+this.scale+"%");
		console.log("Square Size: "+this.squareSize+"px");
		
		//this.drawBackground();
		this.showGrid();

		// Process the features
		/*
		if (data.features) {
			_.each(data.features,function(feature) {
				console.log(feature);
				game.feature.create(feature);
			});
		}
		*/


	};

	this.drawBackground=function() {
		// Scale the background to fit the grid
		this.$g.css({"background-image":"url("+this.data.fullbg+")"});
	};

	this.drawFeature=function(file,x,y,rotation) {
		/*
		// Draw the feature
		if (!rotation) rotation=0;
		//this.render("drawLayers");
		this.render("drawImage",{
		  layer:true,
		  source: file,
		  x: x*this.squareSize, y: y*this.squareSize,
		  rotate:rotation
		});
		//this.render("restoreCanvas");
		*/
	};

	this.showGridPosition=function(x,y) {
		$("#position").html(x+" "+y);
		//this.$c.on("mouseover",function() {
		//	console.log("over");
		//});
	};

	this.showGrid=function() {

		var y;

		
		for (y=this.squareSize;y < this.$g.height(); y=y+this.squareSize) {
			$("<div />").css({position:"absolute",top:y,left:"0px",width:"100%",height:"1px","background-color":"#000"}).appendTo(this.$g);
		}

		/*
		var x,y,w=this.$c.width(), h=this.$c.height();

		

		for (x=this.squareSize;x < w; x=x+this.squareSize) {
			this.$c.drawLine({
				layer:true,
				strokeStyle: "#ddd",
				x1: x, 
				y1: 0, 
				x2: x, 
				y2: h 
			});
		}

		for (y=this.squareSize;y < h; y=y+this.squareSize) {
			this.$c.drawLine({layer:true,
				strokeStyle: "#ddd",
				x1: 0, y1: y, x2: w, y2:y 
			});
		}
		*/

	};



	/*
	this.createSprite=function(type,name,xPos,yPos) {
		console.log("Creating Sprite: "+name+" ("+type+") ");
		var s=new sprite(type,name);
		s.setPosition(xPos,yPos);
		return s;
	};
	*/

	_.bindAll();

};


