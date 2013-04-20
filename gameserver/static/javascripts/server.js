

// Connect to a game server using a gamekey
var serverObject=function(host) {
	this.host=host;
	this.status="disconnected";
	this.socket=null;

	this.connect=function(gamekey,username) {
		this.status="connecting";
		this.socket=io.connect(this.host);
		
		this.socket.on("access-key-request",function(data,fn) {
			console.log("Receiving access request.");
			fn({gamekey:gamekey,username:username})
		});
		
		this.socket.on("access-granted",function() {
			this.status="connected";
			$(game).trigger("server-connected");
		});

		this.socket.on("access-failed",function() {
			$(game).trigger("access-failed");
		});

		this.socket.on("client-directives",function(directives) {
		
			console.log("Received "+directives.directives.length+ " directives for cycle "+directives.cycle+".");
			_.each(directives.directives,function(d) {
				console.log(d);
				if (d.directive=="snapshot") {
					game.grid.snapshot(d.data);
				};
			});
		});

		this.socket.on("disconnect",function() {
			console.log("Remote Disconnect");
			this.status="disconnected";
			game.grid.disable();
		});
	};

	this.setGridName=function(name,cb) {
		this.socket.emit("set-gridname",name,function(data) {
			cb(data);
		});
	};

}