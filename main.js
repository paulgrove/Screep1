var RoomController = require("RoomController");

var roomController = new RoomController();

module.exports.loop = function () {
   roomController.updatePlans();
}
