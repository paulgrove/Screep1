module.exports = function goalUnloadTo(creep, goal) {
	var target = Game.getObjectById(goal.target);
	var transferResult = creep.transfer(target, RESOURCE_ENERGY);
	if (transferResult === ERR_NOT_IN_RANGE) {
		creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
	} else if (transferResult === OK) {
		return true;
	} else if (transferResult === ERR_FULL) {
		return true;
	}
	return false;
};
