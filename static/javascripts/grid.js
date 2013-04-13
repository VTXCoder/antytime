
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

	this.perfectGridSize=750;
	this.gridSize=0;
	this.gridHoverX=null;
	this.gridHoverY=null;

	this.$g.disableSelection();

	// Matrix will be downloaded and created
	this.create=function() {
		var self=this;
		// Get the matrix
		game.server.getGridData(function(data) {
			self.data=data;
			console.log("Grid Received");
			console.log(self.data);
			game.grid.init();
		});
	};

	this.init=function() {
		console.log("Initialising Grid: "+this.data.name);
		self=this;
		this.gridSize=game.layout.gridSize;
		this.squareSize=this.gridSize/20;
		this.scale=(this.gridSize/this.perfectGridSize)*100;

		this.$g.on("mousemove",function(e) {
			var x=e.pageX-this.offsetLeft;
			var y=e.pageY-this.offsetTop;
			var prevX=self.gridHoverX;
			var prevY=self.gridHoverY;
			self.gridHoverX=parseInt(x/self.squareSize)+1;
			self.gridHoverY=parseInt(y/self.squareSize)+1;
			$('#position').html("CellPos: "+self.gridHoverX +"/"+ self.gridHoverY);
			if (prevX!=self.gridHoverX || prevY!=self.gridHoverY) self.showHoverCell();
		});

		this.$g.on("mouseleave",function(e) {
			self.gridHoverX=null;
			self.gridHoverY=null;
			$('#position').html("");
			self.showHoverCell();
		});

		this.drawBackground();
		//this.showGrid();

		// Process the features
		if (this.data.features) {
			_.each(this.data.features,function(feature) {
				console.log(feature);
				game.feature.create(feature);
			});
		}
		
		$(game).trigger("grid-initialised");
		//game.server.getSnapshot();

	};

	this.showHoverCell=function() {
		if (self.gridHoverX && self.gridHoverY) {
			this.$g.find(".hoverCell").remove();
			var posX=(self.gridHoverX-1)*this.squareSize;
			var posY=(self.gridHoverY-1)*this.squareSize;
			var $h=$("<div />",{"class":"hoverCell"}).css({"width":this.squareSize+1,"height":this.squareSize+1,"top":posY,"left":posX});
			this.$g.append($h);
		} else {
			this.$g.find(".hoverCell").remove();
		}
	}

	this.drawBackground=function() {
		// Scale the background to fit the grid
		this.$g.css({"background-image":"url("+this.data.fullbg+")"});
	};

	this.drawFeature=function(file,width,height,x,y,rotation) {
		var posX=(x-1)*this.squareSize;
		var posY=(y-1)*this.squareSize;
		var $feature=$("<img />",{"src":file,"class":"feature","width":(width*this.scale/100),"height":(height*this.scale/100)});
		$feature.css({left:posX,top:posY}).rotate(parseInt(rotation));
		this.$g.append($feature);
	};

	this.showGrid=function() {
		var x,y;
		for (y=this.squareSize;y < this.gridSize; y=y+this.squareSize) {
			$("<div />",{"class":"gridlines"}).css({top:y,left:"0px",width:"100%",height:"1px"}).appendTo(this.$g);
		}
		for (x=this.squareSize;x < this.gridSize; x=x+this.squareSize) {
			$("<div />",{"class":"gridlines"}).css({top:0,left:x,width:"1px",height:"100%"}).appendTo(this.$g);
		}
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

