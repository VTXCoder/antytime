

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





---------------

command

	create ant

	




