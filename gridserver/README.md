

cycle.js

	Commands sent to clients can proceed forward multiple cycles
	They can also be cancelled

ParentCommand
	
	command {
		command:'move',
		state:0, 
		id:'3987683768353653',
		when:'now',
		speed:'1',
		destination:'11/12',
		persist:1
	}





persist
	0 do not persist if there is an interruption
	1 try and persist and complete the command even after an interruption

state 
	0 Requested
	1 Scheduled
	2 Processing
	3 Complete
	4 Cancelled

Only notify the client if there is a change to the current plan...

-----------------------------

cycle.js

Minimum of a second

Run cycle

Record how long it took

Wait the remainder

Then run again


----------------------

Current Commands
Next Commands

-----------------

command

	create ant


------------------

Cycler only notifies clients when something happens (not every cycle)
Not all clients are notified of everything
Clients could be delayed a bit sometimes and then should catch up

redis

grid.cycle

----


Client Command Queue

Incrementing ID
Command JSON




Cycles are approximately 100ms

When a command is received by the client it will include the current server cycle. 

Most commands will give how many cycles the command should take to complete. 

cc  current cycle
sc  start cycle
ec  end cycle (if not interrupted)

---

Every 5 seconds send a cycle check?


intention vs actual

interruptions

client will always run a bit behind 

Client should run 10 cycles behind server

Client receives commands every 10 cycles

Don't worry about syncing the client

Just receive the command and do it


Before sending command reset current to correct state/location

Creatures


	State (idle,fidgeting,walking,running)
	Direction (facing direction)


Creatures are generally AI and you give them intent but they don't react instantly. 


----

Server can push the commands up every second... 

Received commands will be prepared in the following cycle. 

Not immediately. 

---

Client receives commands for next second while executing the current second. 




















