

var matrixObject=function() {

	this.$c=null;
	this.posSize=0;

	// Matrix will be downloaded and created
	this.create=function(name) {
		// Get the matrix
		game.server.getMatrix(name,function(data) {
			console.log("Matrix Received");
			console.log(data);
		});
	};


	this.init=function() {
		console.log("Initialising");
		//this.createCanvas();
		this.$c=$("#canvas");
		this.posSize=this.$c.attr("width")/50;
	};




	this.createSprite=function(type,name,xPos,yPos) {
		console.log("Creating Sprite: "+name+" ("+type+") ");
		var s=new sprite(type,name);
		s.setPosition(xPos,yPos);
		return s;
	};

	this.showGrid=function() {
		var x,y,w=this.$c.attr("width"), h=this.$c.attr("height");

		for (x=0;x < w; x=x+w/50) {
			this.$c.drawLine({
				layer:true,
				strokeStyle: "#eee",
				x1: x, y1: 0, x2: x, y2:h 
			});
		}

		for (y=0;y < h; y=y+h/50) {
			this.$c.drawLine({
				layer:true,
				strokeStyle: "#eee",
				x1: 0, y1: y, x2: w, y2:y 
			});
		}
	};

	this.createCanvas=function() {


	};

};




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

