/*

  A game server will control one or more grids. 

  Each grid is iterating - but not necessarily at the same point in time
  There is a maximum iteration speed (10 its / second)

*/

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app);

app.listen(4001);

function handler (req, res) {
  res.writeHead(500);
  return res.end('No direct access to server.');
}


io.sockets.on('connection', function (socket) {
	console.log("Socket connection established");

  	//socket.emit('debug', { message: 'Connected' });

  	socket.emit('access-key-request',null,function(data) {
  		console.log("Checking Gamekey: "+data);

  		if (true) {
  			
  			socket.on("request-matrix-data",function(name,fn) {
          var gridData=require('./game/grids/'+name);
  				fn(gridData);
  			});

  			socket.emit("access-granted");
  		}
  	});




 
  //socket.on('my other event', function (data) {
  //  console.log(data);
  //});
});
