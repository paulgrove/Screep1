var inherits = require("inherits");
var StageBase = require("StageBase");
var utils = require("utils");
//var WorkerLevel1Generic = require("WorkerLevel1Generic");

function Stage1(room) {
	this._super(room);
}

inherits(Stage1, StageBase);

Stage1.prototype._compilePlan = function () {
	var sources = this.room.find(FIND_SOURCES);
	var plan = {
		stage: 1,
		harvesterJobs: {}
	};
	var i = 0;
	for (var i = 0; i < sources.length; i++) {
		var source = sources[i];
		var sourceTerrain = utils.getTerrain9GridFlatten(source.pos);
		sourceTerrain[4] = "wall";
		var workablePositions = _.filter(sourceTerrain, (pos) => {return pos.terrain !== "wall"}).length;
		for (var i2 = 0; i2 < workablePositions; i2++) {
			var luid = utils.luid();
			plan.harvesterJobs[luid] = {
				role_id: luid,
				role: "stationary_worker",
				design: {
					name: "lazy_employee",
					work: 1,
					carry: 1,
					move: 1
				},
				pos: workablePositions[i2]
			};
		}
	}
	return plan;
};

//Stage1.prototype.compilePlan = function () {
//
//};

module.exports = Stage1;