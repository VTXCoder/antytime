antytime
========


Type:
Defines physical characteristics and starting stats. 

Stats

	Strength: 		The stronger you are the more damage you can do and the more you can hold. 

	Speed:			How fast you are.

	Inteligence:	How smart is your ant when you aren't in control and at following orders.

	Fight Skill:	Attack / Defend skill

	Defence:		Depends on type but can be adjusted with special extras such as armour. 


---

Armor 

Wings

Poison

etc.. 

-----------------

Areas (a bit like Dofus)

Easier to scale

Easier to get a 3d effect or make something interesting

Easier to define everything

Terrain

Exit points - like up a tree etc

-------------------

External threats

Animals that eat ants etc

Foraging for food

-----------------------------

What can you collect?

Treasures?

----------------------

Black ants 

Ant hills etc

--------------------

Combat is mostly automatic

bite bite render pincer etc

But you can give directives..

[Keep fighting] [Back down] [Defend] [Go all out]

----------------------

Followers!

Yeah you can get followers that help protect you as you get higher level

-------------------

Building things? 





http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/

http://www.xiconeditor.com/

http://creativejs.com/2012/01/day-10-drawing-rotated-images-into-canvas/

http://findicons.com/search/ant

http://developer.apple.com/library/safari/#documentation/AudioVideo/Conceptual/HTML-canvas-guide/AnimatingtheCanvas/AnimatingtheCanvas.html

---------


To connect to the game server the user must use a gamekey which is temporarily given to them after they login to the website. 



The client must connect to a specific grid. 

Grids have names.


Request a grid.. (later need to check that you have access to the grid)

Your client will be linked to the grid and receive grid updates.

------------

All commands on a specific grid are sequential...

	ant_3873 move to x98 y22



connect-grid   {name:'test'}

-----------------------

All grids process every second minimum..

	Any visual changes are sent to any connected clients


Server side grid representation

- What is where and what are the objects doing



Ant_837833

	Grid: Test
	posX:
	posY:
	state:

	actionQueue

Use redis for objects?

What stays in memory

Can different grids be served by different instances? scalable

Version check between client and server

----------------------------------------------------------------------------

VTX-Matrix-Server

A single instance could support multiple matrix. 

Only 1 instance can be serving a specific matrix at any given time. 

Game > Matrix

All matrix data must be constantly backed up to Redis?


-

Matrix		InstanceID 



************************************************************************************************

Objects

Fixed - defined with grid
	Features		(Logs, Leaves, Holes etc)
	Connections		(If on a connection you can travel through)
					(Ants will not travel into a connection unless that is their destination)
	Obstructions    (Ants can't travel over obstructions)
	Pathways		(Ants will preferably travel along pathways)
	Feeding			(Feeding area - when food is available)

Dynamic - always changing
	Creatures
	Treasures
	Food


Creatures

	State

		- Idle
		- Wondering
		- Going to place
		- Following

Connections

	"Go here"
	"Go to next area"
	"Go down into the undergrowth"
	"Climb up the tree"

Left click for commands 

------------------------------------------------------
grids

grid.test.iteration

grid.test.commandqueue[..]




grid.test.creatures

creature.8637826
	{.grid=test
	.x=
	.y=
	.state}

--------------------------

Command cycle

	All commands are executed in the following cycle from when they are received

	One cycle should take 2 seconds

	A command is broken up into sub-commands / 1 for every cycle

	Ant282 - Move("13/12","14/12")

Send a list of commands to the client at the start of every command cycle in one big set
so they can be executed simulataneously

Effect should be smooth going from one cycle to the next 


CLIENT CYCLE

0s Execute client commands
1s Receive next cycle commands so they can be executed immediately

SERVER CYCLE 

Send commands to all clients

Always be open to receiving commands

Or don't have cycles at all?


Move A - B 

Transiting between POS A and POS B

---------------

Server Grid

	Cycling every second

	History

	1000.1 - Ant1 moving from 9/12 to 10/12
		.2 -  


	Snapshot








Need to receive the next set of commands before the current cycle ends




--------------------------

Feeding Area

	

--------------------------------------


features

https://code.google.com/p/jqueryrotate/wiki/Examples


-----------------------


GridPassCode: 297839826323232
GridServer: i1981.antytime.com 





