Creep.prototype.findEnergyUnloadTarget = function findEnergyUnloadTarget() {
	var targets = this.room.find(FIND_MY_STRUCTURES, {
		filter: (structure) => {
			return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
				structure.energy < structure.energyCapacity;
		}
	});
	if(targets.length > 0) {
		// TODO sort/filter more
		return targets[0];
		/*
		if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
		}
		*/
	}
};
