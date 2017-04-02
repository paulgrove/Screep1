function RoomController() {
}

RoomController.prototype.getUpdatedStageClass = function () {
    var stageClass = "Stage0";
    if (this.room.find(FIND_MY_CREEPS).length < 2)
        stageClass = "Stage1";
    return stageClass;
};

RoomController.prototype.stageClass = function (value) {
	if (value)
		this.room.memory.stageClass = value;
	return this.room.memory.stageClass;
}

RoomController.prototype.stage = function (value) {
	var stageClass = value ? value.constructor.name : this.stageClass();
	if (value)
		console.log(`Settig stage to ${stageClass}`);
	if (this._stage && stageClass && stageClass === this._stage.constructor.name)
		return this._stage;
	if (!stageClass)
		return;
	var StageClass = require(stageClass);
	this._stage = new StageClass(this);
	return this._stage;
}

RoomController.prototype.plan = function (value) {
	if (value)
		this.room.memory.plan = value;
	return this.room.memory.plan;
}

RoomController.prototype.run = function () {
	var donePlanThisTick = false;
    for (var roomName in Game.rooms) {
		this.room = Game.rooms[roomName];
		if (!donePlanThisTick)
			donePlanThisTick = this.updatePlan();
		if (!this.plan()) {
			console.log(`No plan for room ${this.room.name}`);
			continue;
		}
		this.reclaimDeadCreepJobs();
		this.runCreeps();
		this.runSpawners();
	}
}

RoomController.prototype.runSpawners = function () {
	//console.log("running spawners");
	var spawners = this.room.find(FIND_MY_SPAWNS);
	for (var i = 0; i < spawners.length; i++) {
		//console.log(`spawner ${i}`);
		var spawner = spawners[i];
		if (spawner.spawning)
			continue;
		var unassignedJobs = _.filter(_.values(this.plan().creepJobs),
			(job) => {return !job.creep});

		//console.log(`found ${unassignedJobs.length} unassigned jobs`);
		
		for (var i2 = 0; i2 < unassignedJobs.length; i2++) {
			var job = unassignedJobs[i2];
			if (spawner.canCreateCreep(job.design.body) == OK) {
				spawner.createCreep(job.design.body, null, {
					design: job.design
				});
			}
		}
	}
}

RoomController.prototype.checkTime = function (timerName, timeout) {
	if (!this.room.memory.timers)
		this.room.memory.timers = {};
	if (this.room.memory.timers[timerName] &&
		Game.time <= this.room.memory.timers[timerName])
		return false;
	this.room.memory.timers[timerName] = Game.time + timeout;
	return true;
}

RoomController.prototype.runCreeps = function () {
	//console.log("running creeps");
	var plan = this.plan();
	var creeps = this.room.find(FIND_MY_CREEPS);
	for (var i = 0; i < creeps.length; i++) {
		var creep = creeps[i];
		//console.log("running creep " + creep.name);
		if (!creep.memory.jobId || !plan.creepJobs[creep.memory.jobId]) {
			if (!this.findNewJobForCreep(creep)) {
				creep.suicide();
				continue;
			}
		}
		this.doActionsForCreep(creep);
	}
};

RoomController.prototype.reclaimDeadCreepJobs = function () {
	var plan = this.plan();
	for (var jobId in plan.creepJobs) {
		var job = plan.creepJobs[jobId];
		if (job.creep && !Game.creeps[job.creep])
			job.creep = undefined;
	}
};

RoomController.prototype.findNewJobForCreep = function (creep) {
	var plan = this.plan();
	var unassignedJobs = _.filter(_.values(plan.creepJobs),
		(job) => {return !job.creep});
	for (var i = 0; i < unassignedJobs.length; i++) {
		var jobProspect = unassignedJobs[i];
		if (jobProspect.design.name === creep.memory.design.name) {
			this.employCreep(creep, jobProspect);
			return true;
		}
	}
	return false;
};

RoomController.prototype.employCreep = function (creep, job) {
	console.log(`Employing ${creep.name} to ${job.id}`);
	creep.memory.jobId = job.id;
	//this.plan().creepJobs[job.id].creep = creep.name;
	this.room.memory.plan.creepJobs[job.id].creep = creep.name;
};

RoomController.prototype.getCurrentJobForCreep = function (creep) {
	var plan = this.plan();
	if (plan && creep.memory.jobId)
		return this.plan().creepJobs[creep.memory.jobId];
	return;
};

RoomController.prototype.doActionsForCreep = function (creep) {
	//console.log("Action creep " + creep.name);
	var job = this.getCurrentJobForCreep(creep);
	var roleFunction = require("role_" + job.role);
	roleFunction(creep, job);
};

RoomController.prototype.updatePlan = function () {
	if (!this.checkTime("plan", 30))
		return false;
	//console.log(`Checking plan for room ${this.room.name}`);
	var updatedStageClass = this.getUpdatedStageClass();
	if (this.plan() && this.stageClass() === updatedStageClass)
		return false; // skip rooms which are still on the right stage
	this.stageClass(updatedStageClass);
	this.plan(this.stage().compilePlan());
	//console.log("Assigned new plan for room " + room.name + " " + updatedStageClass);
	return true;
};

module.exports = RoomController;
