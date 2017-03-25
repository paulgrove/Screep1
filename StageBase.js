function StageBase (room) {
	this.room = room;
}

StageBase.prototype.compilePlan = function () {
	console.log("Compiling plan for " + this.room.name);
	return this._compilePlan();
};

module.exports = StageBase;
