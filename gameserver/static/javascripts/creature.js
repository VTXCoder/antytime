



var creatureObject=function() {
	
	this.creatures=[];

	this.create=function(creature) {
		this.creatures.push(creature);
		if (!creature.state) creature.state='still';
		if (!creature.rotation) creature.rotation=0;
		if (creature.state!="walk") creature.rotation=random(0,359);
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
			'still':'ant-still,2000,ant-still2,400',
			'walk':'ant-walk1,400,ant-walk2,400',
			'fight':'ant-fight1,500,ant-fight2,500',
			'hide':'ant-hide',
			'dead':'ant-dead',
			'explore':'ant-explore1,400,ant-explore2,400'
		}
	}
};