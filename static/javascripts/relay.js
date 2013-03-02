
/*

	



*/


$(function() {

	// Connect to client
	
	var socket = io.connect('http://localhost:4001');

	socket.on('debug',function(data) {
		console.log(data);
	});
	
});
