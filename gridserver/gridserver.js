/*

	A game server will control one or more grids. 

	Each grid is iterating - but not necessarily at the same point in time
	There is a maximum iteration speed (10 its / second)

*/

var app = require('http').createServer(handler)
	, io = require('socket.io').listen(app)
	, _ = require('underscore');


var creatures=require("./core/creatures.js");
var clients=require("./core/clients.js");
var cycle=require("./core/cycle.js");
var grids=require("./core/grids.js");

io.set('log level', 1);

app.listen(4001);


var settings  = require('./../settings/development').settings;
global.settings=settings;


function handler (req, res) {
	res.writeHead(500);
	return res.end('No direct access to server.');
}

// What grids are handled by this gridserver
var manageGridNames=["DeadLeaves-1x1"];
var serverGrids=[];

// Create an array of grid objects
// No timing issues here so fine to hold the thread as everything intialises
_.each(manageGridNames,function(gridName) {
	var newGrid=new grids.grid(gridName);
	serverGrids.push(newGrid);
	newGrid.snapshot(); 
});



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

*/

/*
var creatures=require("./core/creatures.js");
var ant=creatures.create("black-ant");
ant.setGrid("DeadLeaves-1x1");
ant.setLocation(10,10);
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
					//console.log("Attaching client to "+name);
					socket.set("gridName",name,function() {
						_.each(serverGrids,function(grid){
							//console.log("*************** TEST");
							if (grid.name==name) client.setGrid(grid);
						});
						socket.join(name);
						fn({ok:true});
					});
				}); 
 
				/*
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
				*/

				/*
				socket.on("init-creatures",function(data,fn) {
					// DEBUG

					var a=[];
					a.push({
						id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
						type:'small-black-ant',
						state:'still',
						x:20,
						y:20
					},
					{
						id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
						type:'small-black-ant',
						state:'explore',
						x:24,
						y:28
					},
					{
						id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
						type:'small-black-ant',
						state:'explore',
						x:24,
						y:30
					},
					{
						id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
						type:'small-black-ant',
						state:'hide',
						x:24,
						y:40
					},
					{
						id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
						type:'small-black-ant',
						state:'dead',
						x:36,
						y:36
					},
					{
						id:'a83e528b-ab05-4456-90e5-2d691de44dcd',
						type:'small-black-ant',
						state:'still',
						x:36,
						y:30
					}
					);  

					fn(a);
				});
				*/
				
				socket.on('disconnect', function () {
					console.log("Socket Disconnected");
					clients.remove(client.n);
				});


				socket.emit("access-granted");
			} else {
				socket.emit("access-failed");
			}

		});
});





// Start cycling after an initial 5 second delay
setTimeout(function() {
	_.each(serverGrids,function(g) {
		g.processor=new cycle.processor(g);
		g.processor.begin();
	});
},5000); 
