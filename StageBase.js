function StageBase (roomCtl) {
	this.roomCtl = roomCtl;
}

StageBase.prototype.compilePlan = function () {
	console.log("Compiling plan for " + this.roomCtl.room.name);
	return this._compilePlan();
};

module.exports = StageBase;
