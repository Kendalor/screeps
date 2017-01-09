module.exports = function(){

	/*
	 * GAME (cannot be edited)
	 */

	/*
	* ROOM
	*/
	
		Object.defineProperties(Room.prototype,{
			
			/** 
			 * Finds all constructionSites, minerals, resources, sources and structures in room to add their ids to room memory
			 */
			'findAll' : {
				value: function() {
					this.findConstructionSites();
					this.findMinerals();
					this.findResources();
					this.findSources();
					this.findStructures();
				},
				writable: true,
				enumerable: false
			},
			
			/** 
			 * Returns array of the constructionSites found in room and saves their id in room memory
			 * @param {filter} filter
			 * @return {[ConstructionSite]} objectArray
			 */
			'findConstructionSites' : {
				value: function(filter) {
					var objectArray = this.find(FIND_CONSTRUCTION_SITES,filter);
					for (let i in objectArray){
						objectArray[i].memory;
					}
					return objectArray;
				},
				writable: true,
				enumerable: false
			},
			
			/** 
			 * Returns array of the constructionSites whose ids are saved in room memory
			 * @return {[constructionSite]} objectArray
			 */
			'constructionSites' : {
				get: function(filter) {
					if (filter) console.log(filter);
					var objectArray = [];
					if (this.memory && this.memory.constructionSites){
						let keys = Object.keys(this.memory.constructionSites);
						for (let i in keys){
							for (let id in this.memory.constructionSites[keys[i]]){
								let obj = Game.getObjectById(id);
								if (obj && ConstructionSite.prototype.isPrototypeOf(obj)){
									objectArray.push(obj);
								}else{
									delete this.memory.constructionSites[keys[i]][id];
								}
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns array of the constructionSites of given structureType whose ids are saved in room memory
			 * @param {String} structureType
			 * @return {[constructionSite]} objectArray
			 */
			'constructionSites' : {
				value: function(structureType) {
					var objectArray = [];
					if (this.memory && this.memory.constructionSites && this.memory.constructionSites[structureType]){
						for (let id in this.memory.constructionSites[structureType]){
							let obj = Game.getObjectById(id);
							if (obj && ConstructionSite.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.constructionSites[structureType][id];
							}
						}
					}
					return objectArray;
				},
				writable: true,
				enumerable: false
			},
			
			/** 
			 * Returns array of the minerals found in room and saves their id in room memory
			 * @param {filter} filter
			 * @return {[Mineral]} objectArray
			 */
			'findMinerals' : {
				value: function(filter) {
					var objectArray = this.find(FIND_MINERALS,filter);
					for (let i in objectArray){
						objectArray[i].memory;
					}
					return objectArray;
				},
				writable: true,
				enumerable: false
			},
			
			/** 
			 * Returns array of the minerals whose ids are saved in room memory
			 * @return {[Mineral]} objectArray
			 */
			'minerals' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.minerals){
						for (let id in this.memory.minerals){
							let obj = Game.getObjectById(id);
							if (obj && Mineral.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.minerals[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns array of the constructionSites found in room and saves their id in room memory
			 * @param {filter} filter
			 * @return {[Resource]} objectArray
			 */
			'findResources' : {
				value: function(filter) {
					var objectArray = this.find(FIND_DROPPED_RESOURCES,filter);
					for (let i in objectArray){
						objectArray[i].memory;
					}
					return objectArray;
				},
				writable: true,
				enumerable: false
			},
			
			/** 
			 * Returns array of the resources whose ids are saved in room memory
			 * @return {[Resource]} objectArray
			 */
			'resources' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.resources){
						for (let id in this.memory.resources){
							let obj = Game.getObjectById(id);
							if (obj && Resource.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.resources[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns array of the sources found in room and saves their id in room memory
			 * @param {filter} filter
			 * @return {[Source]} objectArray
			 */
			'findSources' : {
				value: function(filter) {
					var objectArray = this.find(FIND_SOURCES,filter);
					for (let i in objectArray){
						objectArray[i].memory;
					}
					return objectArray;
				},
				writable: true,
				enumerable: false
			},
			
			/** 
			 * Returns array of the sources whose ids are saved in room memory
			 * @return {[Source]} objectArray
			 */
			'sources' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.sources){
						for (let id in this.memory.sources){
							let obj = Game.getObjectById(id);
							if (obj && Source.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.sources[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns array of the structures found in room and saves their id in room memory
			 * @param {filter} filter
			 * @return {[structure]} objectArray
			 */
			'findStructures' : {
				value: function(filter) {
					var objectArray = this.find(FIND_STRUCTURES,filter);
					for (let i in objectArray){
						objectArray[i].memory;
					}
					return objectArray;
				},
				writable: true,
				enumerable: false
			},
			
			/** 
			 * Returns array of the extensions whose ids are saved in room memory
			 * @return {[StructureExtensions]} objectArray
			 */
			'extensions' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.extension){
						for (let id in this.memory.structures.extension){
							let obj = Game.getObjectById(id);
							if (obj && StructureExtension.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.extension[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the extractor whose ids are saved in room memory
			 * @return {StructureExtractor} obj
			 */
			'extractor' : {
				get: function() {
					let obj;
					if (this.memory && this.memory.structures && this.memory.structures.extractor){
						let keys = Object.keys(this.memory.structures.extractor);
						if(keys >0){
							let obj = Game.getObjectById(keys[0]);
							if (!obj || !StructureExtractor.prototype.isPrototypeOf(obj)){
								delete this.memory.structures.extractor[id];
							}
						}
					}
					return obj;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the keeperLairs whose ids are saved in room memory
			 * @return {StructureKeeperLair} obj
			 */
			'keeperLairs' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.keeperLair){
						for (let id in this.memory.structures.keeperLair){
							let obj = Game.getObjectById(id);
							if (obj && StructureKeeperLair.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.keeperLair[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the labs whose ids are saved in room memory
			 * @return {StructureLab} obj
			 */
			'labs' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.lab){
						for (let id in this.memory.structures.lab){
							let obj = Game.getObjectById(id);
							if (obj && StructureLab.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.lab[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the links whose ids are saved in room memory
			 * @return {StructureLink} obj
			 */
			'links' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.link){
						for (let id in this.memory.structures.link){
							let obj = Game.getObjectById(id);
							if (obj && StructureLink.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.link[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the nuker whose ids are saved in room memory
			 * @return {StructureNuker} obj
			 */
			'nuker' : {
				get: function() {
					let obj;
					if (this.memory && this.memory.structures && this.memory.structures.nuker){
						let keys = Object.keys(this.memory.structures.nuker);
						if(keys >0){
							let obj = Game.getObjectById(keys[0]);
							if (!obj || !StructureNuker.prototype.isPrototypeOf(obj)){
								delete this.memory.structures.nuker[id];
							}
						}
					}
					return obj;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the observer whose ids are saved in room memory
			 * @return {StructureObserver} obj
			 */
			'observer' : {
				get: function() {
					let obj;
					if (this.memory && this.memory.structures && this.memory.structures.observer){
						let keys = Object.keys(this.memory.structures.observer);
						if(keys >0){
							let obj = Game.getObjectById(keys[0]);
							if (!obj || !StructureObserver.prototype.isPrototypeOf(obj)){
								delete this.memory.structures.observer[id];
							}
						}
					}
					return obj;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the powerBank whose ids are saved in room memory
			 * @return {StructurePowerBank} obj
			 */
			'powerBank' : {
				get: function() {
					let obj;
					if (this.memory && this.memory.structures && this.memory.structures.powerBank){
						let keys = Object.keys(this.memory.structures.powerBank);
						if(keys >0){
							let obj = Game.getObjectById(keys[0]);
							if (!obj || !StructurePowerBank.prototype.isPrototypeOf(obj)){
								delete this.memory.structures.powerBank[id];
							}
						}
					}
					return obj;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the powerSpawn whose ids are saved in room memory
			 * @return {StructurePowerSpawn} obj
			 */
			'powerSpawn' : {
				get: function() {
					let obj;
					if (this.memory && this.memory.structures && this.memory.structures.powerSpawn){
						let keys = Object.keys(this.memory.structures.powerSpawn);
						if(keys >0){
							let obj = Game.getObjectById(keys[0]);
							if (!obj || !StructurePowerSpawn.prototype.isPrototypeOf(obj)){
								delete this.memory.structures.powerSpawn[id];
							}
						}
					}
					return obj;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the ramparts whose ids are saved in room memory
			 * @return {[StructureRampart]} objectArray
			 */
			'ramparts' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.rampart){
						for (let id in this.memory.structures.rampart){
							let obj = Game.getObjectById(id);
							if (obj && StructureRampart.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.rampart[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the spawns whose ids are saved in room memory
			 * @return {[StructureSpawn]} objectArray
			 */
			'spawns' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.spawn){
						for (let id in this.memory.structures.spawn){
							let obj = Game.getObjectById(id);
							if (obj && StructureSpawn.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.spawn[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the towers whose ids are saved in room memory
			 * @return {[StructureTower]} objectArray
			 */
			'towers' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.tower){
						for (let id in this.memory.structures.tower){
							let obj = Game.getObjectById(id);
							if (obj && StructureTower.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.tower[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the containers whose ids are saved in room memory
			 * @return {[StructureContainer]} objectArray
			 */
			'containers' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.container){
						for (let id in this.memory.structures.container){
							let obj = Game.getObjectById(id);
							if (obj && StructureContainer.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.container[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the portals whose ids are saved in room memory
			 * @return {[StructurePortal]} objectArray
			 */
			'portals' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.portal){
						for (let id in this.memory.structures.portal){
							let obj = Game.getObjectById(id);
							if (obj && StructurePortal.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.portal[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the roads whose ids are saved in room memory
			 * @return {[StructureRoad]} objectArray
			 */
			'roads' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.road){
						for (let id in this.memory.structures.road){
							let obj = Game.getObjectById(id);
							if (obj && StructureRoad.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.road[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
			/** 
			 * Returns the constructed walls whose ids are saved in room memory
			 * @return {[StructureWall]} objectArray
			 */
			'constructedWalls' : {
				get: function() {
					var objectArray = [];
					if (this.memory && this.memory.structures && this.memory.structures.constructedWall){
						for (let id in this.memory.structures.constructedWall){
							let obj = Game.getObjectById(id);
							if (obj && StructureWall.prototype.isPrototypeOf(obj)){
								objectArray.push(obj);
							}else{
								delete this.memory.structures.constructedWall[id];
							}
						}
					}
					return objectArray;
				},
				configurable: false,
				enumerable: false
			},
			
		});

	/*
	* ROOM_POSITION
	*/

	/*
	* ROOM_OBJECT
	*/

	/*
	* CONTRUCTION_SITE
	*/
		Object.defineProperties(ConstructionSite.prototype,{
			'memory' : {
				get: function() {
					if (this.room.memory.constructionSites === undefined) {
						this.room.memory.constructionSites = {};
					}
					if (this.room.memory.constructionSites[this.structureType] === undefined) {
						this.room.memory.constructionSites[this.structureType] = {};
					}
					if (this.room.memory.constructionSites[this.structureType][this.id] === undefined) {
						this.room.memory.constructionSites[this.structureType][this.id] = {};
					}
					return this.room.memory.constructionSites[this.structureType][this.id];
				},
				set: function(v) {
					return _.set(Memory, this.room.memory.constructionSites[this.structureType][this.id], v);
				},
				configurable: true,
				enumerable: false
			}
		});

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
					if (this.room.memory.minerals === undefined) {
						this.room.memory.minerals = {};
					}
					if (this.room.memory.minerals[this.id] === undefined) {
						this.room.memory.minerals[this.id] = {};
					}
					return this.room.memory.minerals[this.id];
				},
				set: function(v) {
					return _.set(Memory.rooms[this.room.name], 'minerals.' + this.id, v);
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
		Object.defineProperties(Resource.prototype,{
			'memory' : {
				get: function() {
					if (this.room.memory.resource === undefined) {
						this.room.memory.resource = {};
					}
					if (this.room.memory.resource[this.id] === undefined) {
						this.room.memory.resource[this.id] = {};
					}
					return this.room.memory.resource[this.id];
				},
				set: function(v) {
					return _.set(Memory.rooms[this.room.name], 'resource.' + this.id, v);
				},
				configurable: true,
				enumerable: false
			}
		});

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