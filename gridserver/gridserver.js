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
var creatures=require("./core/creatures.js");
var clients=require("./core/clients.js");



/*
creatures.getByID("7b9be7a2-b515-4751-87e6-3bb6c6fb58d9",function(err,ant) {
    if (err) console.log(err);
    if (!err) {
      console.log("FOUND "+ant.details.type+" hanging out at "+ant.details.grid+" ("+ant.details.xpos+"/"+ant.details.ypos+")");
    }
});
*/

// Testing
/*

creatures.getByGrid("DeadLeaves-1x1",function(err,res) {
  if (err) console.log(err);
   
  if (!err) {
    console.log(res);
    //creatures.deleteByID("a83e528b-ab05-4456-90e5-2d691de44dcd",function(err) {
    //  if (err) console.log(err);
    //     else console.log("Deleted");
   // });
   }

});


var ant=creatures.create("black-ant");
ant.setGrid("DeadLeaves-1x1");


var creatures=require("./core/creatures.js");
var ant=creatures.create("black-ant");
ant.setGrid("DeadLeaves-1x1");
ant.setLocation(10,10);
*/


/*

*/


io.sockets.on('connection', function (socket) {
	console.log("Socket connection established");

  	//socket.emit('debug', { message: 'Connected' });

  	socket.emit('access-key-request',null,function(data) {
  		console.log("Checking Gamekey for: "+data.username);

  		if (data.gamekey=="testkey123" && data.username=="staticvortex") {
  			
        // Create a client object and attach the socket!
        var client=clients.add(data.username,socket);
       // socket.set("client",client);

        socket.on("set-gridname",function(name,fn) {
          socket.set("gridName",name,function() {
            client.grid=name;
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

        socket.on("init-creatures",function(data,fn) {
          // DEBUG

          var a=[];
          a.push({
            id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
            type:'small-black-ant',
            state:'still',
            x:10,
            y:10
          },
          {
            id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
            type:'small-black-ant',
            state:'walk',
            x:12,
            y:14
          },
          {
            id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
            type:'small-black-ant',
            state:'walk',
            x:13,
            y:14
          },
          {
            id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
            type:'small-black-ant',
            state:'walk',
            x:12,
            y:15
          },
          {
            id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
            type:'small-black-ant',
            state:'hide',
            x:12,
            y:19
          },
          {
            id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
            type:'small-black-ant',
            state:'dead',
            x:17,
            y:17
          }
          );  

          fn(a);
        });

        socket.on('disconnect', function () {
          console.log("Socket Disconnected");
          clients.remove(client.n);
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
