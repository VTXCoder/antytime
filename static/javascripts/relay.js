
/*

	



*/


$(function() {

	// Connect to client
	
	var socket = io.connect('http://localhost:4001');

	socket.on('debug',function(data) {
		console.log(data);
	});

	socket.on('access-key-request',function(data) {
		console.log("Access Key Request");
		return {key:'incomplete1234'};
	});
	
});
