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
















