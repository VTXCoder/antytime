

var featureObject=function() {
	this.featureCache={};
/*
	this.create=function(feature) {
		var self=this;
		if (!this.featureCache[feature.type]) {
			game.server.getFeature(feature.type,function(data) {
				self.featureCache[feature.type]=data;
				self.draw(feature);
			});
		} else {
			self.draw(feature);
		}
	};

	this.draw=function(feature) {
		console.log("Drawing Feature: "+this.featureCache[feature.type].fullfile+" "+feature.rotate);
		game.grid.drawFeature(this.featureCache[feature.type].fullfile,this.featureCache[feature.type].width,this.featureCache[feature.type].height,feature.position.split("/")[0],feature.position.split("/")[1],feature.rotate);
	};

	_.bindAll();
	*/
}
