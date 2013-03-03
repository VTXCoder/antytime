

// Connect to a geme server using a gamekey
var serverObject=function(host) {
	this.host=host;
	this.status="disconnected";
	this.socket=null;

	this.connect=function(gamekey) {
		this.status="connecting";
		//$(game).trigger("server.status","connecting");
		this.socket=io.connect(this.host);
		this.socket.on("access-key-request",function(data,fn) {fn(gamekey)});
		this.socket.on("access-granted",function() {
			this.status="connected";
			$(game).trigger("server-connected");
		});
	};

	this.getMatrix=function(name,cb) {
		this.socket.emit("request-matrix-data",name,function(data) {
			cb(data);
		});
	};

}