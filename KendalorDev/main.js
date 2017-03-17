require('prototypes')();
require('globals')();
const profiler = require('screeps-profiler');

var autoCreep         = require('auto.creep');
var autoMemory        = require('auto.memory');
var autoSpawn         = require('auto.spawn');
var invasionCounter   = require('invasion.counter');

//Kendalor Code
//var operationsHandler = require('operations.handler');


module.exports.loop = function () {

	if (Game.cpu.bucket < 10000){ // To check if accumulated bonus CPU is used sometimes
		console.log("Used additional CPU.\nAccumulated bucket:  "+Game.cpu.bucket+"/10000");
	}

	//Kendalor Code

	//operationsHandler.init();
	//operationsHandler.run();

	if(!Memory.myRooms){
	    Memory.myRooms={};
	    for (var name in Game.rooms){
	        if(Game.rooms[name].controller.my){
	            Memory.myRooms[name]=Memory.rooms[name];
				Game.rooms[name].findMinerals();
				Game.rooms[name].findSources();
            }
	    }
	}
	
	for(var name in Memory.myRooms) {
		var room = Game.rooms[name];
		if (room){

			//autoMemory.fixSourceSlots(room);
			invasionCounter.run(room);

			autoSpawn.run(room.spawns);

			autoCreep.run(room.myCreeps);
		
		}else{
			delete Memory.myRooms[name];
		}
	}

	if(Game.time % 10 == 0){
		autoMemory.clearDeadCreeps();
		//autoMemory.clearFlags();
	}
}