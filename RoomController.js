function Job() {
    this.workers = {};
}

function RoomController() {
    this.updateCounter = 0;
    this.jobId = 0;
    this.jobs = [];
    this.idleWorkers = [];
}

RoomController.prototype.getRoomStage = function (room) {
    var stage = 0;
    if (room.find(FIND_MY_CREEPS) < 2)
        stage = 1;
    return stage;
};

RoomController.prototype.run = function () {
	var donePlanThisTick = false;
    for (var roomName in Game.rooms) {
		if (!donePlanThisTick) {
			var room = Game.rooms[roomName];
			if (room.memory.plan_checked_tick &&
					Game.time <= room.memory.plan_checked_tick + 30)
				continue;
			room.memory.plan_checked_tick = Game.time;
			var stageNum = this.getRoomStage(room, stageNum);
			if (room.memory.plan && room.memory.plan.stage === stageNum)
				continue; // skip rooms which are still on the right stage
			this.updatePlans(room);
			donePlanThisTick = true;
		}
		this.recruitCreeps(room);
	}
}

RoomController.prototype.recruitCreeps function (room) {
};

RoomController.prototype.updatePlans = function (room, stageNum) {
	if (room.memory.plan && room.memory.plan.stage === stageNum)
		continue; // skip rooms which are still on the right stage
	var StageModule = require("Stage" + stageNum);
	var stage = new StageModule(room);
	var plan = stage.compilePlan();
	room.memory.plan = stage.compilePlan();
	console.log(room.memory.plan);
	console.log("Assigned new plan for room " + roomName + " Stage " + stageNum);

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
