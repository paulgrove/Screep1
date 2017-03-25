var luid_count = 0;
module.exports = {
	getTerrain9Grid: function (x, y, room) {
		if (typeof x === "object") {
			var pos = x;
			x = pos.x;
			y = pos.y;
			room = pos.roomName;
		}
		if (typeof room === "string")
			room = Game.rooms[room];
		function m(x,y) {
			return {
				x: x,
				y: y,
				roomName: room.name,
				terrain: Game.map.getTerrainAt(x, y, room.name)
			}
		}
		return [
			[m(x-1, y-1), m(x, y-1), m(x+1, y-1)],
			[m(x-1, y  ), m(x, y  ), m(x+1, y  )],
			[m(x-1, y+1), m(x, y+1), m(x+1, y+1)]
		]
	},
	getTerrain9GridFlatten: function (x, y, room) {
		if (typeof x === "object") {
			var pos = x;
			x = pos.x;
			y = pos.y;
			room = pos.roomName;
		}
		if (typeof room === "string")
			room = Game.rooms[room];
		function m(x,y) {
			return {
				x: x,
				y: y,
				roomName: room.name,
				terrain: Game.map.getTerrainAt(x, y, room.name)
			}
		}
		return [
			m(x-1, y-1), m(x, y-1), m(x+1, y-1),
			m(x-1, y  ), m(x, y  ), m(x+1, y  ),
			m(x-1, y+1), m(x, y+1), m(x+1, y+1)
		]
	},
	//localy unique identifier
	luid: function luid() {
		return Game.time + "-" + luid_count++;
	}
};
