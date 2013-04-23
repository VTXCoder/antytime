
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

	this.$g=$("#grid").disableSelection();
	this.$p=$("#panel");

	this.gridHoverX=null;
	this.gridHoverY=null;

	this.lastClickX=null;
	this.lastClickY=null;

	this.init=function(w,h) {
		var self=this;

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

		// Clear the grid
		this.$g.html("");
		//this.$p.html("");

		// Set the size
		this.$g.css({top:10,left:10,width:this.gridWidth,height:this.gridHeight});
		this.$p.css({left:this.gridWidth+20,width:300,height:this.gridHeight});

		// Clear existing events
		this.$g.off();

		this.$g.on("mousemove",function(e) {
			var x=e.pageX-this.offsetLeft;
			var y=e.pageY-this.offsetTop;
			var prevX=self.gridHoverX;
			var prevY=self.gridHoverY;
			self.gridHoverX=parseInt(x/self.cellSize)+1;
			self.gridHoverY=parseInt(y/self.cellSize)+1;
			$('#position').html("CellPos: "+self.gridHoverX +"/"+ self.gridHoverY);
			if (prevX!=self.gridHoverX || prevY!=self.gridHoverY) self.showHoverCell();
		});

		this.$g.on("mouseleave",function(e) {
			self.gridHoverX=null;
			self.gridHoverY=null;
			$('#position').html("");
			self.showHoverCell();
		});

		this.$g.on("click",function(e) {
			e.stopPropagation();
			game.grid.clicked(self.gridHoverX,self.gridHoverY);
		});
		
	};

	this.showHoverCell=function() {
		var self=this;
		if (self.gridHoverX && self.gridHoverY) {
			this.$g.find(".hoverCell").remove();
			var posX=(self.gridHoverX-1)*game.layout.cellSize;
			var posY=(self.gridHoverY-1)*game.layout.cellSize;
			//console.log(posX+"/"+posY);
			var $h=$("<div />",{"class":"hoverCell"}).css({"width":game.layout.cellSize+1,"height":game.layout.cellSize+1,"top":posY,"left":posX});
			this.$g.append($h);
		} else {
			this.$g.find(".hoverCell").remove();
		}
	};

	



}

