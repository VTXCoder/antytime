
var G={};


$(function() {
	G=new game();
	G.init();


});


var game=function() {

	this.init=function() {
		console.log("Initialising");
		this.createCanvas();
	};

	this.createCanvas=function() {
		//console.log("Creating Canvas");

		//var newCanvas = $('<canvas/>',{'width':700,'height':700,'class':'mainCanvas'});
		//$(document.body).append(newCanvas);

		var ant1=new ant();
		ant1.render();
		//ant1.startWalking();

	};

};


var ant=function() {
	this.x=100;
	this.y=400;
	this.rotate=0;
	this.step=false;
	this.walking=false;
	this.walkingTimer=null;

	this.render=function() {
		$("#canvas").drawImage({
			layer:true,
			name:'ant1',
			group:'ant1group',
		  	source: "/images/sprites/ant1.png",
		  	x: this.x, y: this.y, rotate: this.rotate
		});

		$("#canvas").drawImage({
			layer:true,name:'ant1s',visible:false,
			group:'ant1group',
		  	source: "/images/sprites/ant1s.png",
		  	x: this.x, y: this.y, rotate: this.rotate
		});


	};

	this.move=function(x,y) {

	};

	this.startWalking=function() {
		this.walking=true;
		this.walkingTimer=setInterval(function() {
			//console.log("walking");
			var antLayer=$("#canvas").getLayer("ant1");
			//console.log(antLayer.visible);

			var y=antLayer.y;

			if (antLayer.visible) {
				$("#canvas").setLayer("ant1",{visible:false,y:y-5}).drawLayers();
				$("#canvas").setLayer("ant1s",{visible:true,y:y-5}).drawLayers();
			} else {
				$("#canvas").setLayer("ant1s",{visible:false,y:y-5}).drawLayers();
				$("#canvas").setLayer("ant1",{visible:true,y:y-5}).drawLayers();
			}


		},300);
		//this.$ant.drawImage({source: "/images/sprites/ant1s.png"});
		//$("#canvas").setLayer("ant1",{visible:false,rotate:30}).drawLayers();
		//$("#canvas").setLayer("ant1s",{visible:true});
	};

	this.stopWalking=function() {
		this.walking=false;

	};

};
