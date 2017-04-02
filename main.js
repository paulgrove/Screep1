var RoomController = require("RoomController");

var roomController = new RoomController();

global.memory = require("memory");

//require("StageBase");
require("creep");
require("room-position");

module.exports.loop = function () {
	PathFinder.use(true);
	RawMemory.setActiveSegments([0,1,2,3,4,5,6,7,8,9]);

//	memory.save("test", {a:1});

	/*
	var data = [{"_id":"58dc3a2563cd6d1deb6bd3e0","index":0,"guid":"4f1676aa-d789-422f-81a0-b87daf162857","isActive":true,"balance":"$2,854.27","picture":"http://placehold.it/32x32","age":25,"eyeColor":"brown","name":"Bruce Baird","gender":"male","company":"CHILLIUM","email":"brucebaird@chillium.com","phone":"+1 (947) 448-3956","address":"298 Hazel Court, Beason, Nevada, 3697","about":"Incididunt duis ut nisi occaecat sunt duis. In ea incididunt qui minim exercitation consectetur labore enim amet. Pariatur esse Lorem proident mollit consectetur cupidatat reprehenderit eu. Irure do non ad Lorem esse aute quis laborum esse ullamco enim laborum. Ut occaecat irure duis anim ea excepteur.\r\n","registered":"2016-11-25T03:22:03 -00:00","latitude":-33.649131,"longitude":-86.751811,"tags":["ex","anim","ea","qui","eu","consequat","adipisicing"],"friends":[{"id":0,"name":"Elisa Hardy"},{"id":1,"name":"Long Snyder"},{"id":2,"name":"Luann Lyons"}],"greeting":"Hello, Bruce Baird! You have 10 unread messages.","favoriteFruit":"apple"},{"_id":"58dc3a25969c13673f0a637c","index":1,"guid":"a47101dd-1ba4-4a5e-80be-0c24c296ee66","isActive":false,"balance":"$3,776.70","picture":"http://placehold.it/32x32","age":22,"eyeColor":"blue","name":"Maynard Saunders","gender":"male","company":"ACUSAGE","email":"maynardsaunders@acusage.com","phone":"+1 (913) 598-2219","address":"845 Burnett Street, Gorst, Iowa, 3680","about":"Non incididunt laboris exercitation eiusmod laborum sit et. Et cillum fugiat elit consequat nisi elit adipisicing sit mollit ea laboris ipsum occaecat. Excepteur dolor incididunt eu in mollit ad anim aute cillum eiusmod cupidatat. Deserunt elit nisi aliquip pariatur anim eiusmod ea eu deserunt laboris sint commodo adipisicing. Esse proident exercitation laboris deserunt tempor consectetur commodo duis consectetur aliquip labore quis.\r\n","registered":"2016-07-07T04:02:52 -01:00","latitude":73.879365,"longitude":-19.713268,"tags":["sit","amet","ex","esse","ex","adipisicing","velit"],"friends":[{"id":0,"name":"Ilene Ratliff"},{"id":1,"name":"Sylvia Ross"},{"id":2,"name":"Hope George"}],"greeting":"Hello, Maynard Saunders! You have 1 unread messages.","favoriteFruit":"apple"},{"_id":"58dc3a250b99916878ff5fb4","index":2,"guid":"0eefdc1b-be97-4704-80e5-89abf6c40988","isActive":true,"balance":"$3,887.22","picture":"http://placehold.it/32x32","age":38,"eyeColor":"blue","name":"Bessie Slater","gender":"female","company":"SNORUS","email":"bessieslater@snorus.com","phone":"+1 (933) 539-3424","address":"124 Crooke Avenue, Madrid, Washington, 5086","about":"Sint ex pariatur duis ullamco adipisicing et. Irure sunt culpa sit duis ipsum eiusmod aute. Non incididunt velit ullamco sit laboris ipsum ad fugiat quis.\r\n","registered":"2015-10-14T05:57:32 -01:00","latitude":77.422794,"longitude":116.31868,"tags":["irure","occaecat","labore","Lorem","dolore","nisi","nostrud"],"friends":[{"id":0,"name":"Cervantes Hogan"},{"id":1,"name":"Minnie Crawford"},{"id":2,"name":"Roman Weeks"}],"greeting":"Hello, Bessie Slater! You have 7 unread messages.","favoriteFruit":"apple"},{"_id":"58dc3a25bf5ba5f69ac89862","index":3,"guid":"cb037bbe-9492-4b61-a396-5e84d5079297","isActive":false,"balance":"$3,067.16","picture":"http://placehold.it/32x32","age":38,"eyeColor":"brown","name":"Wilder Sloan","gender":"male","company":"ENTROPIX","email":"wildersloan@entropix.com","phone":"+1 (832) 555-2814","address":"733 Brown Street, Somerset, Puerto Rico, 8493","about":"Occaecat ipsum consectetur sunt nisi reprehenderit qui magna non commodo cupidatat laboris. Magna ut exercitation dolore eiusmod cillum. In laboris veniam id ea esse magna dolore. Ipsum elit dolore laboris cillum dolor.\r\n","registered":"2015-12-26T09:20:58 -00:00","latitude":32.365561,"longitude":-33.525068,"tags":["laboris","eu","amet","est","nulla","nostrud","laboris"],"friends":[{"id":0,"name":"Lesley Green"},{"id":1,"name":"Clark Harrison"},{"id":2,"name":"Rhodes Britt"}],"greeting":"Hello, Wilder Sloan! You have 4 unread messages.","favoriteFruit":"banana"},{"_id":"58dc3a2564b6f80d688eda8c","index":4,"guid":"93a6b87a-0f72-47c7-906a-43cc4318d03b","isActive":false,"balance":"$2,519.36","picture":"http://placehold.it/32x32","age":24,"eyeColor":"green","name":"Burton Daniel","gender":"male","company":"EXOSTREAM","email":"burtondaniel@exostream.com","phone":"+1 (847) 535-2257","address":"873 Harbor Lane, Advance, South Dakota, 1751","about":"Commodo enim laboris id irure consectetur tempor sint cupidatat quis et ea cillum id do. Eu eiusmod cillum id veniam. Quis labore ut duis qui pariatur excepteur id do duis do velit eu cillum duis. Laborum aliquip et est id velit amet occaecat consectetur consequat anim dolor nostrud deserunt. Sunt qui est magna ea. Culpa ullamco dolore dolor do mollit irure consequat commodo nostrud ex irure officia. Culpa id aute esse incididunt dolore id Lorem proident cillum veniam nisi officia excepteur est.\r\n","registered":"2015-03-31T07:20:23 -01:00","latitude":-70.659566,"longitude":-70.91214,"tags":["velit","laborum","nostrud","nulla","proident","voluptate","mollit"],"friends":[{"id":0,"name":"Juanita Kirkland"},{"id":1,"name":"Sarah Hicks"},{"id":2,"name":"Trisha Clemons"}],"greeting":"Hello, Burton Daniel! You have 6 unread messages.","favoriteFruit":"banana"}];
	*/
	
	/*
	var start, end;
	start = Date.now();
	for (var i = 0; i < 1000; i ++) {
		var string = JSON.stringify(data);
	}
	end = Date.now();
	console.log("JSON.stringify", end - start);
	start = Date.now();
	for (var i = 0; i < 1000; i ++) {
		var string = substack(data);
	}
	end = Date.now();
	console.log("substack", end - start);
	start = Date.now();
	for (var i = 0; i < 1000; i ++) {
		var string = fsj(data);
	}
	end = Date.now();
	console.log("fsj", end - start);
	start = Date.now();
	for (var i = 0; i < 1000; i ++) {
		var string = bson.serialize(data);
	}
	end = Date.now();
	console.log("fsj", end - start);
	*/
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
	

	//console.log(Game.time);
	roomController.run();
}
