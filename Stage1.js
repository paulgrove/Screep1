var inherits = require("inherits");
var StageBase = require("StageBase");

function Stage1(roomCtl) {
	this._super(roomCtl);
}

inherits(Stage1, StageBase);

Stage1.prototype._compilePlan = function () {
	var plan = { creepJobs: {} };
	var workablePositions = this.getSourceWorkablePositions();
	for (var i = 0; i < workablePositions.length; i++) {
		var pos = workablePositions[i];
		var job = this.createStationaryWorkerJob(pos, {
			name: "lazy_employee",
			body: [WORK, WORK, CARY, MOVE]
		});
		plan.creepJobs[job.id] = job;
	}
	return plan;
};

module.exports = Stage1;
