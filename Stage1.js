var inherits = require("inherits");
var StageBase = require("StageBase");
var utils = require("utils");

function Stage1(roomCtl) {
	this._super(roomCtl);
}

inherits(Stage1, StageBase);

Stage1.prototype._compilePlan = function () {
	var sources = this.roomCtl.room.find(FIND_SOURCES);
	var plan = {
		creepJobs: {}
	};
	var i = 0;
	for (var i = 0; i < sources.length; i++) {
		var source = sources[i];
		var sourceTerrain = utils.getTerrain9GridFlatten(source.pos);
		sourceTerrain[4] = "wall";
		var workablePositions = _.filter(sourceTerrain, (pos) => {return pos.terrain !== "wall"});
		for (var i2 = 0; i2 < workablePositions; i2++) {
			var pos = workablePositions[i2];
			var uid = `stationary_worker_${pos.x}_${pos.y}`;
			plan.creepJobs[uid] = {
				id: uid,
				role: "stationary_worker",
				design: {
					name: "lazy_employee",
					work: 2,
					carry: 1,
					move: 1
				},
				pos: pos
			};
		}
	}
	return plan;
};

//Stage1.prototype.compilePlan = function () {
//
//};

module.exports = Stage1;
