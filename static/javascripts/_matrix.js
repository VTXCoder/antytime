
// Objects need to be rendered sequentially
// So use a command queue
// command, parameters

var matrixObject=function() {
	this.$c=null;
	this.squareSize=10;
	this.cmd=[];
	this.processing=false;

	this.render=function(c,p) {
		this.cmd.push({c:c,p:p});
		if (!this.processing) {this.processing=true;this.process()};
	}; 

	this.process=function() {
		this.processing=true;
		if (this.cmd.length) {
			var c=this.cmd.shift();
			window.game.matrix.$c[c.c](c.p);
		}
		if (this.cmd.length) this.process();
		this.processing=false;
	};

	// Matrix will be downloaded and created
	this.create=function(name) {
		// Get the matrix
		game.server.getMatrix(name,function(data) {
			console.log("Matrix Received");
			console.log(data);
			game.matrix.init(data);
			//game.matrix.showGrid();
			//game.matrix.showGridPositions();
			//game.matrix.createSprite("ant","anty",20,20);
		});
	};


	this.init=function(data) {
		console.log("Initialising Matrix: "+data.name);
		self=this;
		this.$c=$("#canvas");
		this.$c=$("<canvas />",{id:'canvas'}).attr({width:data.width*this.squareSize,height:data.height*this.squareSize});
		this.$c.scaleCanvas(2);
		$("#game").html("");
		$("#game").append(this.$c);

		// Draw the background
		this.render("drawImage",{
			layer:true,
		  	source: "/game/bg/"+data.bg,
		  	x: 0, y: 0,
		  	width: (data.width*this.squareSize),
		  	height: (data.height*this.squareSize),
		  	fromCenter: false
		});

		/*
		this.$c.drawImage({
		  layer:true,
		  source: "/game/bg/"+data.bg,
		  x: 0, y: 0,
		  width: (data.width*this.squareSize),
		  height: (data.height*this.squareSize),
		  fromCenter: false,
		  //mousemove: function(layer) {
		  	//var dx, dy;
    		//dx = layer.eventX - layer.x;
    		//dy = layer.eventY - layer.y;
    		//posX=Math.ceil(dx/self.squareSize);
    		//posY=Math.ceil(dy/self.squareSize);
    		//self.showGridPosition(posX,posY);
    		//console.log("pos:" +dx+"/"+dy+" ("+posX+"/"+posY+")");
		  //}
		});
		*/

		// Process the features
		if (data.features) {
			_.each(data.features,function(feature) {
				console.log(feature);
				game.feature.create(feature);
			});
		}



	};

	this.drawFeature=function(file,x,y,rotation) {
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
	};

	this.showGridPosition=function(x,y) {
		$("#position").html(x+" "+y);
		//this.$c.on("mouseover",function() {
		//	console.log("over");
		//});
	};

	this.showGrid=function() {
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



/*
var sprite=function(type,name) {
	this.x=null;
	this.y=null;
	this.type=type;
	this.name=name;
	this.state=null;  // walking, running, dead, etc
	this.visible=false;
	this.rotate=0;
	this.frame=null;
	this.index=null;
	this.stateTimer=null;






	this.setPosition=function(x,y) {
		// Need to center the image at that location
		this.x=x*G.posSize;
		this.y=y*G.posSize;
		this.render();
	};

	this.render=function(frame) {
		if (frame) this.frame=frame;

		console.log("----");
		//if (this.index!=null) {
			console.log("Removing layer: "+this.name);
			$("#canvas").removeLayer('s_'+this.name);
		//}

		// Work out the icon

		var icon="icon_"+this.type;
		if (this.state) {
			icon=icon+"_"+this.state;
		}

		if (this.frame) {
			icon=icon+"_"+this.frame;
		}

		//console.log("Rendering icon: "+icon);
		$("#canvas").drawImage({
			layer:true,
			name:'s_'+this.name,
			group:'sg_'+this.name,
		  	source: $("#"+icon)[0],
		  	x: this.x, y: this.y, rotate: this.rotate
		});

		//this.index=$("#canvas").getLayer('s_'+this.name).index;


		console.log("Created layer: "+this.name);
	};

	this.changeState=function(state) {
		console.log(this.name+" changing state to: "+state);
		var self=this;

		if (state=="walking") {
			//this.layer.clearRect(0, 0, this.layer.width, this.layer.height);
			//this.layer.source="/images/sprites/ant1s.png";
			//$("#canvas").drawLayer(this.layer);
			self.frame=1;
			self.state="walking";
			this.stateTimer=setInterval(function() {
				if (self.frame==1) self.render(2); else self.render(1);
			},300);


			//$("#canvas").drawLayers();

		}

	};


	sprites.push(this);
};

*/