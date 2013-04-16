

// Connect to a game server using a gamekey
var serverObject=function(host) {
	this.host=host;
	this.status="disconnected";
	this.socket=null;

	this.connect=function(gamekey,username) {
		this.status="connecting";
		//$(game).trigger("server.status","connecting");
		this.socket=io.connect(this.host);
		
		this.socket.on("access-key-request",function(data,fn) {
			fn({gamekey:gamekey,username:username})
		});
		
		this.socket.on("access-granted",function() {
			if (this.status!="connected") {
				this.status="connected";
				$(game).trigger("server-connected");
			}
		});

		this.socket.on("access-failed",function() {
			$(game).trigger("access-failed");
		});
	};

	this.setGridName=function(name,cb) {
		this.socket.emit("set-gridname",name,function(data) {
			cb(data);
		});
	};

	this.getGridData=function(cb) {
		this.socket.emit("request-grid-data",function(data) {
			cb(data);
		});
	};

	this.getFeature=function(type,cb) {
		this.socket.emit("get-feature",type,function(data) {
			cb(data);
		});
	};

	this.initCreatures=function(cb) {
		this.socket.emit("init-creatures",null,function(data) {
			cb(data);
		});
	};

}