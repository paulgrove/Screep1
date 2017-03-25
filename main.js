var RoomController = require("RoomController");

var roomController = new RoomController();

module.exports.loop = function () {
	//console.log(Game.time);
	roomController.run();
}
