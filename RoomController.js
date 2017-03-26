function Job() {
    this.workers = {};
}

function RoomController() {
    this.updateCounter = 0;
    this.jobId = 0;
    this.jobs = [];
    this.idleWorkers = [];
}

RoomController.prototype.getUpdatedStageClass = function () {
    var stageClass = "Stage0";
    if (this.room.find(FIND_MY_CREEPS) < 2)
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
		this.recruitCreeps();
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

RoomController.prototype.recruitCreeps = function () {
};

RoomController.prototype.updatePlan = function () {
	if (!this.checkTime("plan", 30))
		return false;
	console.log(`Checking plan for room ${this.room.name}`);
	var updatedStageClass = this.getUpdatedStageClass();
	if (this.plan() && this.stageClass() === updatedStageClass)
		return false; // skip rooms which are still on the right stage
	this.stageClass(updatedStageClass);
	this.plan(this.stage().compilePlan());
	console.log("Assigned new plan for room " + room.name + " " + updatedStageClass);
	return true;

	/*console.log("Stage: " + this.getRoomStage(room));
	var sources = room.find(FIND_SOURCES);
	for (var i = 0; i < sources.length; i++) {
		var source = sources[i]function guid() {
		console.log("Looking at source " + i + " energy: " + source.energy);
	}
		*/
	/*
    for (var spawnName in Game.spawns) {
        var spawn = Game.spawns[spawnName];
        //console.log("Looking at spawn " + spawnName + " energy: " + spawn.energy);
    }
	*/
    //console.log(this.updateCounter)
};

module.exports = RoomController;
