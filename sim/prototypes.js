module.exports = function(){

	/*
	GAME
	*/

	/*
	* ROOM
	*/
	/*
	Object.defineProperties(Room.prototype,{
		'memory' : {
			get: function() {
				if (Memory.rooms === undefined) {
					Memory.rooms = {};
				}
				if (Memory.rooms[this.room.name] === undefined) {
					Memory.rooms[this.room.name] = {};
				}
				return Memory.rooms[this.room.name];
			},
			set: function(v) {
				return _.set(Memory, 'structures.' + this.id, v);
			},
			configurable: true,
			enumerable: false
		}
	});*/

	/*
	* ROOM_POSITION
	*/

	/*
	* ROOM_OBJECT
	*/

	/*
	* CONTRUCTION_SITE
	*/

	/*
	* CREEP
	*/
	Object.defineProperties(Creep.prototype,{
		
		/** NEEDS TESTING
		 * Reserves specific amount of specific resource for set amount of ticks on given container
		 * Uses StructureStorage.prototype.reserveResource = function(objectId,resource,amount,ticks)
		 *  or StructureContainer.prototype.reserveResource = function(objectId,resource,amount,ticks)
		 * @param {Object} container or storage
		 * @param {String} resource
		 * @param {Number} amount
		 * @param {Number} ticks
		 * @return {Number} errorCode
		 */
		"reserveResource" : {
			value: function(container,resource=RESOURCE_ENERGY,amount=this.carryCapacity,ticks=50){
				if (container.structureType && (container.structureType == STRUCTURE_STORAGE || container.structureType == STRUCTURE_CONTAINER)) {
					container.reserveResource(this.id,resource,amount,ticks);
				}else {
					return ERR_INVALID_TARGET;
				}
			},
			writable: true,
			enumerable: true
		},
		
		/** NEEDS TESTING
		 * Creep moves to target container and reserves an amount of resource
		 * Uppon reaching target the creep withdraws the reserved resource amount and cancels the reservation
		 * Used by screep.reserveResource(container,[resource],[amount],[ticks])
		 * @param {Number} objectId of reserver
		 * @param {String} resource
		 * @param {Number} amount
		 * @param {Number} ticks
		 * @return {Number} errorCode
		 */
		"gather" : {
			value: function(container,resource=RESOURCE_ENERGY,amount=this.carryCapacity,ticks=50){
				var errorCode = OK;
				//TODO
				return errorCode;
			},
			writable: true,
			enumerable: true
		},
		
		"chargeController" : {
			value: function(controller){
				var errorCode = OK;
				//TODO
				return errorCode;
			},
			writable: true,
			enumerable: true
		},
		
		"getRandomName" : {
			value: function(){
				var names1 = ["Jackson", "Aiden", "Liam", "Lucas", "Noah", "Mason", "Jayden", "Ethan", "Jacob", "Jack", "Caden", "Logan", "Benjamin", "Michael", "Caleb", "Ryan", "Alexander", "Elijah", "James", "William", "Oliver", "Connor", "Matthew", "Daniel", "Luke", "Brayden", "Jayce", "Henry", "Carter", "Dylan", "Gabriel", "Joshua", "Nicholas", "Isaac", "Owen", "Nathan", "Grayson", "Eli", "Landon", "Andrew", "Max", "Samuel", "Gavin", "Wyatt", "Christian", "Hunter", "Cameron", "Evan", "Charlie", "David", "Sebastian", "Joseph", "Dominic", "Anthony", "Colton", "John", "Tyler", "Zachary", "Thomas", "Julian", "Levi", "Adam", "Isaiah", "Alex", "Aaron", "Parker", "Cooper", "Miles", "Chase", "Muhammad", "Christopher", "Blake", "Austin", "Jordan", "Leo", "Jonathan", "Adrian", "Colin", "Hudson", "Ian", "Xavier", "Camden", "Tristan", "Carson", "Jason", "Nolan", "Riley", "Lincoln", "Brody", "Bentley", "Nathaniel", "Josiah", "Declan", "Jake", "Asher", "Jeremiah", "Cole", "Mateo", "Micah", "Elliot"]
			var names2 = ["Sophia", "Emma", "Olivia", "Isabella", "Mia", "Ava", "Lily", "Zoe", "Emily", "Chloe", "Layla", "Madison", "Madelyn", "Abigail", "Aubrey", "Charlotte", "Amelia", "Ella", "Kaylee", "Avery", "Aaliyah", "Hailey", "Hannah", "Addison", "Riley", "Harper", "Aria", "Arianna", "Mackenzie", "Lila", "Evelyn", "Adalyn", "Grace", "Brooklyn", "Ellie", "Anna", "Kaitlyn", "Isabelle", "Sophie", "Scarlett", "Natalie", "Leah", "Sarah", "Nora", "Mila", "Elizabeth", "Lillian", "Kylie", "Audrey", "Lucy", "Maya", "Annabelle", "Makayla", "Gabriella", "Elena", "Victoria", "Claire", "Savannah", "Peyton", "Maria", "Alaina", "Kennedy", "Stella", "Liliana", "Allison", "Samantha", "Keira", "Alyssa", "Reagan", "Molly", "Alexandra", "Violet", "Charlie", "Julia", "Sadie", "Ruby", "Eva", "Alice", "Eliana", "Taylor", "Callie", "Penelope", "Camilla", "Bailey", "Kaelyn", "Alexis", "Kayla", "Katherine", "Sydney", "Lauren", "Jasmine", "London", "Bella", "Adeline", "Caroline", "Vivian", "Juliana", "Gianna", "Skyler", "Jordyn"]
			var namesCombined = _.flatten(_.map(names1, function(v, i) { return [v, names2[i]]; }));
			if(!Memory.creepindex || Memory.creepindex >= namesCombined.length) {
				Memory.creepindex = 0
			}else{
				Memory.creepindex++
			}
			return namesCombined[Memory.creepindex % namesCombined.length];
			},
			writable: true,
			enumerable: true
		}
	});

	/*
	* FLAG
	*/

	/*
	* MINERAL
	*/
	Object.defineProperties(Mineral.prototype,{
		'memory' : {
			get: function() {
				if (this.room.memory.mineral === undefined) {
					this.room.memory.mineral = {};
				}
				if (this.room.memory.mineral[this.id] === undefined) {
					this.room.memory.mineral[this.id] = {};
				}
				return this.room.memory.mineral[this.id];
			},
			set: function(v) {
				return _.set(Memory.rooms[this.room.name], 'mineral.' + this.id, v);
			},
			configurable: true,
			enumerable: false
		}
	});

	/*
	* NUKE
	*/

	/*
	* RESOURCE
	*/

	/*
	* SOURCE
	*/
	Object.defineProperties(Source.prototype,{
		
		'memory' : {
			get: function() {
				if (this.room.memory.sources === undefined) {
					this.room.memory.sources = {};
				}
				if (this.room.memory.sources[this.id] === undefined) {
					this.room.memory.sources[this.id] = {};
				}
				return this.room.memory.sources[this.id];
			},
			set: function(v) {
				return _.set(Memory.rooms[this.room.name], 'sources.' + this.id, v);
			},
			configurable: true,
			enumerable: false
		},
		
		/**
		 * Checks if source has free slots for creeps to harvest
		 * @return {Boolean} or undefined
		 */
		"hasFreeSlots" : {
			value: function(){
				if (this.room // Check if memory entrys exist
					&& this.room.memory.sources 
					&& this.room.memory.sources[this.id]
					&& this.room.memory.sources[this.id].slots
					&& this.room.memory.sources[this.id].harvesters)
				{
					return this.room.memory.sources[this.id].slots > this.room.memory.sources[this.id].harvesters.length
				}else {
					return undefined;
				}
			},
			writable: true,
			enumerable: true
		},
		
		/**
		 * Adds creepName to room.memory.sources
		 * @param {String} creepName
		 * @return {Boolean} 
		 */
		"occupy" : {
			value: function(creepName){
				if (this.hasFreeSlots()){
					this.room.memory.sources[this.id].harvesters.push(creepName);
					return true;
				}else{
					return false;
				}
			},
			writable: true,
			enumerable: true
		},
		
		/**
		 * Removes creep with given name from room.memory.sources
		 * @param {String} creepName
		 * @return {Boolean} 
		 */
		"deOccupy" : {
			value: function(creepName){
				if (this.room // Check if memory entrys exist
					&& this.room.memory.sources 
					&& this.room.memory.sources[this.id]
					&& this.room.memory.sources[this.id].harvesters)
				{
					this.room.memory.sources[this.id].harvesters.pop(creepName);
					return true;
				}
				else{
					return false;
				}
			},
			writable: true,
			enumerable: true
		}
	});

	/*
	* STUCTURE
	*/
	Object.defineProperties(Structure.prototype,{
		'memory' : {
			get: function() {
				if (this.room.memory.structures === undefined) {
					this.room.memory.structures = {};
				}
				if (this.room.memory.structures[this.structureType] === undefined) {
					this.room.memory.structures[this.structureType] = {};
				}
				if (this.room.memory.structures[this.structureType][this.id] === undefined) {
					this.room.memory.structures[this.structureType][this.id] = {};
				}
				return this.room.memory.structures[this.structureType][this.id];
			},
			set: function(v) {
				return _.set(Memory, this.room.memory.structures[this.structureType][this.id], v);
			},
			configurable: true,
			enumerable: false
		}
	});

	/*
	* OWNED_STRUCTURE
	*/

	/*
	* STRUCTURE_CONTROLLER
	*/

	/*
	* STRUCTURE_EXTENSION
	*/

	/*
	* STRUCTURE_EXTRACTOR
	*/

	/*
	* STRUCTURE_KEEPER_LAIR
	*/

	/*
	* STRUCTURE_LAB
	*/

	/*
	* STRUCTURE_LINK
	*/

	/*
	* STRUCTURE_NUKER
	*/

	/*
	* STRUCTURE_OBSERVER
	*/

	/*
	* STRUCTURE_POWER_BANK
	*/

	/*
	* STRUCTURE_POWER_SPAWN
	*/

	/*
	* STRUCTURE_RAMPART
	*/

	/*
	* STRUCTURE_SPAWN
	*/
	Object.defineProperties(StructureSpawn.prototype,{
		'roomMemory' : {
			get: function() {
				if (this.room.memory.structures === undefined) {
					this.room.memory.structures = {};
				}
				if (this.room.memory.structures[this.structureType] === undefined) {
					this.room.memory.structures[this.structureType] = {};
				}
				if (this.room.memory.structures[this.structureType][this.id] === undefined) {
					this.room.memory.structures[this.structureType][this.id] = {};
				}
				return this.room.memory.structures[this.structureType][this.id];
			},
			set: function(v) {
				return _.set(Memory, this.room.memory.structures[this.structureType][this.id], v);
			},
			configurable: true,
			enumerable: false
		},
		
		"createCustomCreep" : {
			value: function(spawnEnergyCap, creepType){
				//TODO
				return false;
			},
			writable: true,
			enumerable: true
		},
		
		"enQueueCreep" : {
			value: function(body, name,memory,priority){
				//TODO
				return false;
			},
			writable: true,
			enumerable: true
		},
		
		"isCreepInQueue" : {
			value: function(body, name,memory,priority){
				//TODO
				return false;
			},
			writable: true,
			enumerable: true
		},
		
		"deQueueCreep" : {
			value: function(body, name,memory,priority){
				//TODO
				return false;
			},
			writable: true,
			enumerable: true
		}
	});

	/*
	* STRUCTURE_STORAGE
	*/
	Object.defineProperties(StructureStorage.prototype,{
		"reserveResource" : {
			/** NEEDS TESTING
			 * Identical to StructureContainer.prototype.reserveResource
			 * Reserves specific amount of specific resource for set amount of ticks
			 * Used by screep.reserveResource(container,[resource],[amount],[ticks])
			 * @param {Number} objectId (of reserver)
			 * @param {String} resource
			 * @param {Number} amount
			 * @param {Number} ticks
			 * @return {Number} errorCode
			 */
			value: function(objectId,resource,amount,ticks){
				var errorCode = OK;
				//TODO
				return errorCode;
			},
			writable: true,
			enumerable: true
		},
		
		"reserveResource" : {
			/** NEEDS TESTING
			 * Checks for expired reservations and cancels them
			 * Substracts stored resource with reserved resource
			 * Identical to StructureContainer.prototype.availableResource
			 * @param {String} resource
			 * @return {Number} availableRes
			 */
			value: function(resource){
				var availableRes = 0;
				//TODO
				return availableRes;
			},
			writable: true,
			enumerable: true
		}
	});
	
	/*
	* STRUCTURE_TERMINAL
	*/

	/*
	* STRUCTURE_TOWER
	*/

	/*
	* STRUCTURE_CONTAINER
	*/
	Object.defineProperties(StructureContainer.prototype,{
		"reserveResource" : {
			/** NEEDS TESTING
			 * Identical to StructureContainer.prototype.reserveResource
			 * Reserves specific amount of specific resource for set amount of ticks
			 * Used by screep.reserveResource(container,[resource],[amount],[ticks])
			 * @param {Number} objectId (of reserver)
			 * @param {String} resource
			 * @param {Number} amount
			 * @param {Number} ticks
			 * @return {Number} errorCode
			 */
			value: function(objectId,resource,amount,ticks){
				var errorCode = OK;
				//TODO
				return errorCode;
			},
			writable: true,
			enumerable: true
		},
		
		"reserveResource" : {
			/** NEEDS TESTING
			 * Checks for expired reservations and cancels them
			 * Substracts stored resource with reserved resource
			 * Identical to StructureContainer.prototype.availableResource
			 * @param {String} resource
			 * @return {Number} availableRes
			 */
			value: function(resource){
				var availableRes = 0;
				//TODO
				return availableRes;
			},
			writable: true,
			enumerable: true
		}
	});

	/*
	* STRUCTURE_PORTAL
	*/

	/*
	* STRUCTURE_ROAD
	*/

	/*
	* STRUCTURE_WALL
	*/
}