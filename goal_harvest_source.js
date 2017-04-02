module.exports = function goalHarvestSource(creep, goal) {
	if (creep.harvest(Game.getObjectById(goal.source)) !== OK)
		return true;
	if (creep.carry.energy === creep.carryCapacity)
		return true;
	return false;
}
