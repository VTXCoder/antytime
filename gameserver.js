
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app);

app.listen(4001);

function handler (req, res) {
  res.writeHead(500);
  return res.end('No direct access to server.');
}




io.sockets.on('connection', function (socket) {
	console.log("Socket connection established");

  	socket.emit('debug', { message: 'Connected' });

  	socket.emit('access-key-request',null,function(data) {
  		console.log("RECEIVED KEY");
  		console.log(data);
  	});

  //socket.on('my other event', function (data) {
  //  console.log(data);
  //});
});
