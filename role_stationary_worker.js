function stationaryWorker(creep, job) {
	if (!creep.memory.currentGoal) {
		if (creep.carry.energy === 0) {
			if (creep.pos.x === job.harvestPos.x &&
				creep.pos.y === job.harvestPos.y &&
				creep.pos.room === job.harvestPos.room) {
				creep.memory.currentGoal = {
					type: "goal_harvest_source",
					source: sourceId
				};
					new GoalHarvestSource(Game.getObjectById(job.sourceId));
			} else {
				creep.memory.currentGoal = new
			}
		}
	}
	if(creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
		}
	}
	else {
		var targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
					structure.energy < structure.energyCapacity;
			}
		});
		if(targets.length > 0) {
			if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
			}
		}
	}
};

module.exports = stationaryWorker;
