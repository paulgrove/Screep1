module.exports = function goal_move_to(creep, goal) {
	//console.log(JSON.stringify(goal));
	//var pos = RoomPosition(goal.pos.x, goal.pos.y, goal.pos.roomName);
	creep.moveTo(goal.pos.x, goal.pos.y, Game.rooms[goal.pos.roomName]);
	if (creep.pos.isEqualTo(goal.pos.x, goal.pos.y, Game.rooms[goal.pos.roomName]))
		return true;
	return false;
}
