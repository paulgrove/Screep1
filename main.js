var RoomController = require("RoomController");

var roomController = new RoomController();

module.exports.loop = function () {
	//console.log(Game.time);
	roomController.updatePlans();
	//roomController.recruitCreeps();
	//roomController.hireCreeps();
	//roomController.creepActions();
}
