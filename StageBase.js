var utils = require("utils");

function StageBase (roomCtl) {
	this.roomCtl = roomCtl;
}

StageBase.prototype.compilePlan = function () {
	console.log("Compiling plan for " + this.roomCtl.room.name);
	var plan = this._compilePlan();
	this.assignExistingJobs(plan);
	return plan;
};

StageBase.prototype.assignExistingJobs = function (newPlan) {
	// assign previous creep if old job with same id exists
	var oldPlan = this.roomCtl.plan();
	if (!oldPlan)
		return;
	for (jobId in newPlan.creepJobs)
		if (oldPlan.creepJobs[jobId])
			newPlan.creepJobs[jobId].creep = oldPlan.creepJobs[jobId].creep;
};

StageBase.prototype.createStationaryWorkerJob = function (pos, design) {
	return {
		id: `stationary_worker_${pos.x}_${pos.y}`,
		role: "stationary_worker",
		design: design,
		creep: undefined,
		harvestPos: {
			x: pos.x,
			y: pos.y,
			roomName: pos.roomName
		},
		sourceId: pos.sourceId
	};
};

StageBase.prototype.getSourceWorkablePositions = function () {
	var spawn = this.roomCtl.room.find(FIND_MY_STRUCTURES, {
		filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN}
	})[0];
	var workablePositions = [];
	var sources = this.roomCtl.room.find(FIND_SOURCES);
	for (var i = 0; i < sources.length; i++) {
		var source = sources[i];
		var sourceTerrain = utils.getTerrain9GridFlatten(source.pos);
		sourceTerrain[4] = {terrain: "wall"}; // never use the center tile
		var workablePositions = workablePositions.concat(
			_.map(
				_.filter(sourceTerrain, pos => pos.terrain !== "wall"),
				pos => { pos.sourceId = source.id; return pos; }
			)
		);
	}
	_.sortBy(workablePositions,
		(workable) => {
			var distance = PathFinder.search(
				this.roomCtl.room.getPositionAt(workable.x, workable.y), {
					pos: spawn.pos,
					range: 1
				}
			).length
			workable.distanceToSpawn = distance;
			return distance;
		}
	);
	return workablePositions;
};

module.exports = StageBase;
