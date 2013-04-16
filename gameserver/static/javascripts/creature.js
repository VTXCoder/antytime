


var creatureObject=function() {
	
	this.create=function(creature) {
		if (!creature.state) creature.state='still';
		if (!creature.rotation) creature.rotation=random(1,360);
		game.grid.drawCreature(creature);
	}

	_.bindAll();
}





// Definitions for creatures 
// 40x40 cells

var defCreatures=
{'small-black-ant':
	{
		'template':'ant',
		'still':'ant-still',
		'walk':'ant-walk1,ant-walk2',
		'fight':'ant-fight1,ant-fight2',
		'shape':'1x1',
		'width':20,
		'height':30
	}
};