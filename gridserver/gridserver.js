/*

  A game server will control one or more grids. 

  Each grid is iterating - but not necessarily at the same point in time
  There is a maximum iteration speed (10 its / second)

*/

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app);

io.set('log level', 1);

app.listen(4001);


var settings  = require('./../settings/development').settings;
global.settings=settings;


function handler (req, res) {
  res.writeHead(500);
  return res.end('No direct access to server.');
}

// Need to figure out which grid to manage
var Grids=["DeadLeaves-1x1"];

// Start a cycle for each grid

// Testing

var creatures=require("./core/creatures.js");
/*
var ant=creatures.create("black-ant");
ant.setGrid("DeadLeaves-1x1");
*/

creatures.getByID("46b952d5-cfb4-4876-91dd-492a074a145f",function(err,ant) {
    if (err) console.log(err);
    if (!err) {
      //ant.setType("black-ant");
      //ant.setGrid("DeadLeaves-1x1");
      //ant.setLocation(10,10);
      console.log("FOUND "+ant.details.type+" hanging out at "+ant.details.grid+" ("+ant.details.xpos+"/"+ant.details.ypos+")");
 
    }
});



io.sockets.on('connection', function (socket) {
	console.log("Socket connection established");

  	//socket.emit('debug', { message: 'Connected' });

  	socket.emit('access-key-request',null,function(data) {
  		console.log("Checking Gamekey: "+data);

  		if (data=="testkey123") {
  			
        socket.on("set-gridname",function(name,fn) {
          socket.set("gridName",name,function() {
            socket.join(name);
            fn({ok:true});
          });
        });

  			socket.on("request-grid-data",function(fn) {
          socket.get("gridName",function(err,name) {
            var d=require('./game/grids/'+name);
            d.fullbg=global.settings.cdn+"bg/"+d.bg;
    				fn(d);
          });
  			});

        socket.on("get-feature",function(type,fn) {
          var d=require('./game/features/'+type);
          d.fullfile=global.settings.cdn+"features/"+d.file;
          fn(d);
        });



  			socket.emit("access-granted");
  		} else {
        socket.emit("access-failed");
      }

  	});




 
  //socket.on('my other event', function (data) {
  //  console.log(data);
  //});
});
