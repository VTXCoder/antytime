



var creatureObject=function() {
	
	this.creatures=[];

	this.create=function(creature) {
		this.creatures.push(creature);
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
		'shape':'1x1',
		'width':20,
		'height':30,
		'states':{
			'still':'ant-still',
			'walk':'ant-walk1,500,ant-walk2,500',
			'fight':'ant-fight1,500,ant-fight2,500',
			'hide':'ant-hide',
			'dead':'ant-dead'
		}
	}
};